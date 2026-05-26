import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID, createHash } from "crypto";

const VISITOR_TABLE = "visitors";
const VISITOR_COOKIE_NAME = "visitor_id";
const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days
const VISITOR_COUNTRY_OTHER_CODE = "ZZ";
const FALLBACK_RECENT_WINDOW_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

function stripIpFormatting(value?: string) {
  if (!value) return "";
  return value.trim().replace(/^\"|\"$/g, "");
}

function isPrivateOrLocalIp(ip: string) {
  if (!ip) return true;
  const normalized = ip.toLowerCase();
  if (!normalized) return true;
  if (
    normalized === "unknown" ||
    normalized === "::1" ||
    normalized === "0:0:0:0:0:0:0:1" ||
    normalized.startsWith("127.") ||
    normalized.startsWith("10.") ||
    normalized.startsWith("192.168.") ||
    normalized.startsWith("169.254.") ||
    normalized.startsWith("fc") ||
    normalized.startsWith("fd") ||
    normalized.startsWith("fe80:")
  ) {
    return true;
  }

  const match172 = normalized.match(/^172\.(\d{1,3})\./);
  if (match172) {
    const n = Number(match172[1]);
    if (n >= 16 && n <= 31) return true;
  }

  return false;
}

function getClientIp(req: NextRequest) {
  const xForwardedFor = req.headers.get("x-forwarded-for");
  const forwardedIps = xForwardedFor
    ? xForwardedFor.split(",").map((p) => stripIpFormatting(p)).filter(Boolean)
    : [];

  const directHeaderCandidates = [
    req.headers.get("cf-connecting-ip"),
    req.headers.get("x-real-ip"),
    req.headers.get("x-client-ip"),
    req.headers.get("true-client-ip"),
    req.headers.get("fastly-client-ip"),
    req.headers.get("x-nf-client-connection-ip"),
  ]
    .map((v) => stripIpFormatting(v || ""))
    .filter(Boolean);

  const candidates = [...forwardedIps, ...directHeaderCandidates];

  const firstPublic = candidates.find((c) => !isPrivateOrLocalIp(c));
  if (firstPublic) return firstPublic;
  if (candidates[0]) return candidates[0];
  return "unknown";
}

function getIpHash(req: NextRequest) {
  const salt = process.env.VISITOR_IP_SALT || "visitor-ip-salt";
  const userAgent = req.headers.get("user-agent") || "unknown";
  const ip = getClientIp(req) || "unknown";
  return createHash("sha256").update(`${ip}:${userAgent}:${salt}`).digest("hex");
}

function getFallbackCutoff() {
  return new Date(Date.now() - FALLBACK_RECENT_WINDOW_MS);
}

async function fetchCountryFromIp(ip: string) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}?fields=success,country_code`, {
      signal: controller.signal,
      headers: { accept: "application/json" },
    });
    clearTimeout(timeout);
    if (res.ok) {
      const json = await res.json();
      if (json && json.success && json.country_code) return String(json.country_code).toUpperCase();
    }
  } catch (err) {
    // ignore and fallback
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,countryCode`, {
      signal: controller.signal,
      headers: { accept: "application/json" },
    });
    clearTimeout(timeout);
    if (res.ok) {
      const json = await res.json();
      if (json && json.status === "success" && json.countryCode) return String(json.countryCode).toUpperCase();
    }
  } catch (err) {
    // ignore
  }

  return VISITOR_COUNTRY_OTHER_CODE;
}

async function resolveCountryFromRequest(req: NextRequest) {
  const headerSources = [
    "x-vercel-ip-country",
    "cf-ipcountry",
    "x-nf-country",
    "x-country-code",
  ];

  for (const header of headerSources) {
    const val = req.headers.get(header);
    if (val && val.trim().length === 2) return val.trim().toUpperCase();
  }

  const clientIp = getClientIp(req);
  if (!clientIp || clientIp === "unknown" || clientIp === "127.0.0.1" || clientIp === "::1") {
    return VISITOR_COUNTRY_OTHER_CODE;
  }

  return fetchCountryFromIp(clientIp);
}

export async function GET() {
  if (!supabase) return NextResponse.json({ ok: false, totalUniqueVisitors: 0 });

  const { count, error } = await supabase.from(VISITOR_TABLE).select("visitor_id", { count: "exact" });
  if (error) {
    console.error("visitors GET count error:", error);
    return NextResponse.json({ ok: false, totalUniqueVisitors: 0 });
  }

  return NextResponse.json({ ok: true, totalUniqueVisitors: count ?? 0 });
}

export async function POST(req: NextRequest) {
  const existingCookie = req.cookies.get(VISITOR_COOKIE_NAME)?.value;
  const fallbackVisitorId = existingCookie || randomUUID();

  if (!supabase) {
    const res = NextResponse.json({ ok: false, visitorId: fallbackVisitorId, totalUniqueVisitors: 0, createdNewVisitor: false, visitorSummary: { totalUniqueVisitors: 0, countries: [] } });
    if (!existingCookie) {
      res.cookies.set(VISITOR_COOKIE_NAME, fallbackVisitorId, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: VISITOR_COOKIE_MAX_AGE });
    }
    return res;
  }

  try {
    const ipAddress = getClientIp(req);
    const ipHash = getIpHash(req);
    const fallbackCutoff = getFallbackCutoff();

    // 1) try cookie match
    let session: any = null;

    if (existingCookie) {
      const { data, error } = await supabase.from(VISITOR_TABLE).select('*').eq('visitor_id', existingCookie).limit(1).maybeSingle();
      if (!error && data) session = data;
    }

    // 2) fallback to recent ipHash match
    if (!session) {
      const { data, error } = await supabase.from(VISITOR_TABLE).select('*').eq('ip_hash', ipHash).gte('last_seen', fallbackCutoff.toISOString()).limit(1).maybeSingle();
      if (!error && data) session = data;
    }

    let visitorId: string;
    let createdNewVisitor = false;

    if (session) {
      visitorId = session.visitor_id;

      const needsCountryBackfill = !session.country_code || session.country_code === VISITOR_COUNTRY_OTHER_CODE;
      let updatedCountryCode: string | undefined;

      if (needsCountryBackfill && !isPrivateOrLocalIp(ipAddress)) {
        const resolved = await resolveCountryFromRequest(req);
        if (resolved !== VISITOR_COUNTRY_OTHER_CODE) {
          updatedCountryCode = resolved;
        }
      }

      const updatePayload: any = { last_seen: new Date().toISOString(), ip_hash: ipHash };
      if (!isPrivateOrLocalIp(ipAddress)) updatePayload.ip_address = ipAddress;
      if (updatedCountryCode) updatePayload.country_code = updatedCountryCode;

      await supabase.from(VISITOR_TABLE).update(updatePayload).eq('visitor_id', visitorId);
    } else {
      visitorId = existingCookie || randomUUID();
      const resolvedCountryCode = await resolveCountryFromRequest(req);

      try {
        const insertPayload = {
          visitor_id: visitorId,
          session_id: visitorId,
          ip_address: isPrivateOrLocalIp(ipAddress) ? null : ipAddress,
          first_seen: new Date().toISOString(),
          last_seen: new Date().toISOString(),
          ip_hash: ipHash,
          country_code: resolvedCountryCode,
        };

        const { error } = await supabase.from(VISITOR_TABLE).insert(insertPayload);
        if (!error) createdNewVisitor = true;
        else {
          // Handle duplicate insert race by updating existing record
          if ((error as any)?.code === '23505' || (error as any)?.message?.includes('duplicate')) {
            await supabase.from(VISITOR_TABLE).update({ last_seen: new Date().toISOString(), ip_hash: ipHash }).eq('visitor_id', visitorId);
          } else {
            console.error('visitors insert error:', error);
          }
        }
      } catch (err) {
        console.error('visitors insert exception:', err);
      }
    }

    // compute totals and country breakdown
    const { count } = await supabase.from(VISITOR_TABLE).select('visitor_id', { count: 'exact' });
    const totalUniqueVisitors = count ?? 0;

    const { data: countriesRows } = await supabase.from(VISITOR_TABLE).select('country_code');
    const map = new Map<string, number>();
    (countriesRows || []).forEach((r: any) => {
      const code = (r.country_code || VISITOR_COUNTRY_OTHER_CODE).toUpperCase();
      map.set(code, (map.get(code) || 0) + 1);
    });

    const countries = Array.from(map.entries()).map(([countryCode, visitorCount]) => ({ countryCode, visitorCount }));

    const response = NextResponse.json({ ok: true, visitorId, totalUniqueVisitors, createdNewVisitor, visitorSummary: { totalUniqueVisitors, countries } });

    if (!existingCookie || existingCookie !== visitorId) {
      response.cookies.set(VISITOR_COOKIE_NAME, visitorId, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: VISITOR_COOKIE_MAX_AGE });
    }

    return response;
  } catch (error) {
    console.error('[visitors] POST error:', error);
    const response = NextResponse.json({ ok: false, degraded: true, visitorId: fallbackVisitorId, totalUniqueVisitors: 0, createdNewVisitor: false, visitorSummary: { totalUniqueVisitors: 0, countries: [] } }, { status: 200 });
    if (!req.cookies.get(VISITOR_COOKIE_NAME)?.value) {
      response.cookies.set(VISITOR_COOKIE_NAME, fallbackVisitorId, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: VISITOR_COOKIE_MAX_AGE });
    }
    return response;
  }
}