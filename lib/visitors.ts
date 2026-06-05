import { createHash } from 'crypto'
import { NextRequest } from 'next/server'
import {
  VISITOR_COUNTRY_OTHER_CODE,
  getCountryDisplayName,
  getCountryFlagEmoji,
  getCountryGradient,
  normalizeCountryCode,
} from '@/types/visitors'
import type { VisitorCountryBreakdown, VisitorSummary } from '@/types/visitors'

export const VISITOR_COLLECTION = 'visitors'
export const VISITOR_COOKIE_NAME = 'visitor_id'
export const VISITOR_START_COUNT = 0
export const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 30
export { VISITOR_COUNTRY_OTHER_CODE }

const FALLBACK_RECENT_WINDOW_MS = 1000 * 60 * 60 * 24 * 30
const VISITOR_COUNTRY_LOOKUP_TIMEOUT_MS = 3000

const visitorIndexCache = new WeakMap<object, Promise<void>>()

type CountryAggregateDoc = {
  countryCode: string
  visitorCount: number
  firstSeen: Date
}

export function getMongoDbName(): string {
  return process.env.MONGODB_DB || 'portfolio'
}

export function getClientIp(req: NextRequest): string {
  const stripIpFormatting = (value: string): string => {
    const trimmed = value.trim().replace(/^"|"$/g, '')
    if (!trimmed) return ''

    // [IPv6]:port
    const bracketMatch = trimmed.match(/^\[([^\]]+)\](?::\d+)?$/)
    if (bracketMatch?.[1]) return bracketMatch[1]

    // IPv4:port
    const ipv4PortMatch = trimmed.match(/^(\d+\.\d+\.\d+\.\d+):\d+$/)
    if (ipv4PortMatch?.[1]) return ipv4PortMatch[1]

    return trimmed
  }

  const isPrivateOrLocalIp = (ip: string): boolean => {
    const normalized = ip.toLowerCase()
    if (!normalized) return true

    if (
      normalized === 'unknown' ||
      normalized === '::1' ||
      normalized === '0:0:0:0:0:0:0:1' ||
      normalized.startsWith('127.') ||
      normalized.startsWith('10.') ||
      normalized.startsWith('192.168.') ||
      normalized.startsWith('169.254.') ||
      normalized.startsWith('fc') ||
      normalized.startsWith('fd') ||
      normalized.startsWith('fe80:')
    ) {
      return true
    }

    // 172.16.0.0 - 172.31.255.255
    const match172 = normalized.match(/^172\.(\d{1,3})\./)
    if (match172) {
      const secondOctet = parseInt(match172[1], 10)
      if (secondOctet >= 16 && secondOctet <= 31) return true
    }

    return false
  }

  const xForwardedFor = req.headers.get('x-forwarded-for')
  const forwardedIps = xForwardedFor
    ? xForwardedFor
        .split(',')
        .map((part) => stripIpFormatting(part))
        .filter(Boolean)
    : []

  const directHeaderCandidates = [
    req.headers.get('cf-connecting-ip'),
    req.headers.get('x-real-ip'),
    req.headers.get('x-client-ip'),
    req.headers.get('true-client-ip'),
    req.headers.get('fastly-client-ip'),
    req.headers.get('x-nf-client-connection-ip'),
  ]
    .map((value) => stripIpFormatting(value || ''))
    .filter(Boolean)

  const candidates = [...forwardedIps, ...directHeaderCandidates]

  const firstPublic = candidates.find((candidate) => !isPrivateOrLocalIp(candidate))
  if (firstPublic) {
    return firstPublic
  }

  const firstCandidate = candidates[0]
  if (firstCandidate) {
    return firstCandidate
  }

  return 'unknown'
}

export function getIpHash(req: NextRequest): string {
  const salt = process.env.VISITOR_IP_SALT || 'visitor-ip-salt'
  const userAgent = req.headers.get('user-agent') || 'unknown'
  const ip = getClientIp(req)

  return createHash('sha256').update(`${ip}:${userAgent}:${salt}`).digest('hex')
}

export function ensureVisitorIndexes(db: { collection: (name: string) => any }): Promise<void> {
  const cached = visitorIndexCache.get(db as object)
  if (cached) {
    return cached
  }

  const promise = Promise.all([
    db.collection(VISITOR_COLLECTION).createIndex({ visitorId: 1 }, { unique: true }),
    db.collection(VISITOR_COLLECTION).createIndex({ ipHash: 1, lastSeen: -1 }),
    db.collection(VISITOR_COLLECTION).createIndex({ countryCode: 1, firstSeen: 1 }),
  ]).then(() => undefined)

  visitorIndexCache.set(db as object, promise)
  return promise
}

function buildCountryStatsProjection(doc: CountryAggregateDoc): VisitorCountryBreakdown {
  return {
    countryCode: doc.countryCode,
    countryName: getCountryDisplayName(doc.countryCode),
    flagEmoji: getCountryFlagEmoji(doc.countryCode),
    visitorCount: doc.visitorCount,
    percentage: 0,
  }
}

export function getCountryDisplayData(countryCode: string) {
  const normalized = normalizeCountryCode(countryCode)

  return {
    countryCode: normalized,
    countryName: getCountryDisplayName(normalized),
    flagEmoji: getCountryFlagEmoji(normalized),
    gradient: getCountryGradient(normalized),
  }
}

async function fetchCountryFromIp(ip: string): Promise<string> {
  // Try ipwho.is first (free, no key needed)
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), VISITOR_COUNTRY_LOOKUP_TIMEOUT_MS)

    const response = await fetch(
      `https://ipwho.is/${encodeURIComponent(ip)}?fields=success,country_code`,
      {
        signal: controller.signal,
        headers: { accept: 'application/json' },
      }
    )
    clearTimeout(timeout)

    if (response.ok) {
      const json = (await response.json()) as { success?: boolean; country_code?: string }
      if (json.success && json.country_code) {
        const normalized = normalizeCountryCode(json.country_code)
        console.log(`[visitors] ipwho.is resolved ${ip} → ${normalized}`)
        return normalized
      }
    }
    console.warn(`[visitors] ipwho.is returned no country for ${ip}`)
  } catch (err) {
    console.warn(`[visitors] ipwho.is fetch failed for ${ip}:`, err)
  }

  // Fallback: ip-api.com (also free, no key needed)
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), VISITOR_COUNTRY_LOOKUP_TIMEOUT_MS)

    const response = await fetch(`https://ip-api.com/json/${encodeURIComponent(ip)}`, {
      signal: controller.signal,
      headers: { accept: 'application/json' },
    })
    clearTimeout(timeout)

    if (response.ok) {
      const json = (await response.json()) as { status?: string; countryCode?: string }
      if (json.status === 'success' && json.countryCode) {
        const normalized = normalizeCountryCode(json.countryCode)
        console.log(`[visitors] ip-api.com resolved ${ip} → ${normalized}`)
        return normalized
      }
    }
    console.warn(`[visitors] ip-api.com returned no country for ${ip}`)
  } catch (err) {
    console.warn(`[visitors] ip-api.com fetch failed for ${ip}:`, err)
  }

  return VISITOR_COUNTRY_OTHER_CODE
}

export async function resolveCountryFromRequest(req: NextRequest): Promise<string> {
  // 1. Try CDN/edge-injected country headers first (Vercel, Cloudflare, Netlify)
  const headerSources = [
    { header: 'x-vercel-ip-country', source: 'x-vercel-ip-country' },
    { header: 'cf-ipcountry', source: 'cf-ipcountry' },
    { header: 'x-nf-country', source: 'x-nf-country' },
    { header: 'x-country-code', source: 'x-country-code' },
  ]

  for (const { header, source } of headerSources) {
    const value = req.headers.get(header)
    if (value) {
      const normalized = normalizeCountryCode(value)
      if (normalized !== VISITOR_COUNTRY_OTHER_CODE) {
        console.log(`[visitors] resolved country from ${source}: ${normalized}`)
        return normalized
      }
    }
  }

  // 2. Extract public client IP and geolocate it
  const clientIp = getClientIp(req)
  console.log(`[visitors] resolving country for IP: ${clientIp}`)

  const isUnresolvable =
    !clientIp ||
    clientIp === 'unknown' ||
    clientIp === '127.0.0.1' ||
    clientIp === '::1'

  if (isUnresolvable) {
    console.warn(`[visitors] IP unresolvable: ${clientIp}, returning fallback`)
    return VISITOR_COUNTRY_OTHER_CODE
  }

  return fetchCountryFromIp(clientIp)
}

export async function getVisitorCountryBreakdown(db: { collection: (name: string) => any }): Promise<VisitorCountryBreakdown[]> {
  await ensureVisitorIndexes(db)

  const visitors = db.collection(VISITOR_COLLECTION)
  const totalVisitors = await getVisitorCount(db)
  const aggregate = (await visitors
    .aggregate([
      {
        $group: {
          _id: { $ifNull: ['$countryCode', VISITOR_COUNTRY_OTHER_CODE] },
          visitorCount: { $sum: 1 },
          firstSeen: { $min: '$firstSeen' },
        },
      },
      {
        $project: {
          _id: 0,
          countryCode: '$_id',
          visitorCount: 1,
          firstSeen: 1,
        },
      },
    ])
    .toArray()) as CountryAggregateDoc[]

  const merged = new Map<string, CountryAggregateDoc>()

  for (const doc of aggregate) {
    const key = normalizeCountryCode(doc.countryCode)
    const existing = merged.get(key)

    if (existing) {
      existing.visitorCount += doc.visitorCount
      if (doc.firstSeen < existing.firstSeen) {
        existing.firstSeen = doc.firstSeen
      }
    } else {
      merged.set(key, { ...doc, countryCode: key })
    }
  }

  const namedCountries = Array.from(merged.values())
    .filter((entry) => entry.countryCode !== VISITOR_COUNTRY_OTHER_CODE)
    .sort((a, b) => {
      const countDiff = b.visitorCount - a.visitorCount
      if (countDiff !== 0) return countDiff
      return a.firstSeen.getTime() - b.firstSeen.getTime()
    })
    .map((doc) => buildCountryStatsProjection(doc))

  const topCountries = namedCountries.slice(0, 4)
  const overflowCount = namedCountries
    .slice(4)
    .reduce((sum, entry) => sum + entry.visitorCount, 0)
  const unknownCount = merged.get(VISITOR_COUNTRY_OTHER_CODE)?.visitorCount || 0
  const otherCount = overflowCount + unknownCount

  const withPercentages = topCountries.map((entry) => ({
    ...entry,
    percentage: totalVisitors > 0 ? (entry.visitorCount / totalVisitors) * 100 : 0,
  }))

  if (otherCount > 0) {
    withPercentages.push({
      countryCode: VISITOR_COUNTRY_OTHER_CODE,
      countryName: getCountryDisplayName(VISITOR_COUNTRY_OTHER_CODE),
      flagEmoji: getCountryFlagEmoji(VISITOR_COUNTRY_OTHER_CODE),
      visitorCount: otherCount,
      percentage: totalVisitors > 0 ? (otherCount / totalVisitors) * 100 : 0,
      isOther: true,
    })
  }

  return withPercentages
}

export async function getVisitorCount(db: { collection: (name: string) => any }): Promise<number> {
  await ensureVisitorIndexes(db)

  return db.collection(VISITOR_COLLECTION).countDocuments({})
}

export function getVisitorCookieOptions(isProduction: boolean) {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: isProduction,
    path: '/',
    maxAge: VISITOR_COOKIE_MAX_AGE,
  }
}

export function getFallbackCutoff(): Date {
  return new Date(Date.now() - FALLBACK_RECENT_WINDOW_MS)
}
