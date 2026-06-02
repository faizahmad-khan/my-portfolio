import { randomUUID } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import {
  getClientIp,
  getFallbackCutoff,
  getIpHash,
  getMongoDbName,
  getVisitorCountryBreakdown,
  getVisitorCookieOptions,
  getVisitorCount,
  VISITOR_COLLECTION,
  VISITOR_COOKIE_NAME,
  VISITOR_COUNTRY_OTHER_CODE,
  resolveCountryFromRequest,
} from '@/lib/visitors'
import type { VisitorApiResponse } from '@/types/visitors'

type VisitorSession = {
  visitorId: string
  sessionId: string
  ipAddress?: string
  firstSeen: Date
  lastSeen: Date
  ipHash?: string
  countryCode?: string
}

const MONGO_TIMEOUT_MS = 30000

function hasUsableIp(ipAddress: string | undefined): ipAddress is string {
  if (!ipAddress) return false
  const normalized = ipAddress.trim()
  if (!normalized || normalized === 'unknown') return false
  if (normalized === '127.0.0.1' || normalized === '::1') return false
  return true
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Mongo operation timed out after ${timeoutMs}ms`))
    }, timeoutMs)
    promise
      .then((value) => { clearTimeout(timer); resolve(value) })
      .catch((error) => { clearTimeout(timer); reject(error) })
  })
}

function buildSession(
  visitorId: string,
  ipAddress: string | undefined,
  ipHash: string | undefined,
  countryCode: string,
): VisitorSession {
  const now = new Date()
  return {
    visitorId,
    sessionId: visitorId,
    firstSeen: now,
    lastSeen: now,
    countryCode,
    ...(hasUsableIp(ipAddress) ? { ipAddress } : {}),
    ...(ipHash ? { ipHash } : {}),
  }
}

export async function POST(req: NextRequest) {
  const existingCookie = req.cookies.get(VISITOR_COOKIE_NAME)?.value
  const fallbackVisitorId = existingCookie || randomUUID()

  try {
    const dbName = getMongoDbName()
    const client = await withTimeout(clientPromise, MONGO_TIMEOUT_MS)
    const db = client.db(dbName)
    const visitors = db.collection<VisitorSession>(VISITOR_COLLECTION)

    const ipAddress = getClientIp(req)
    const ipHash = getIpHash(req)
    const fallbackCutoff = getFallbackCutoff()

    console.log(`[visit] POST — cookie=${existingCookie ?? 'none'} ip=${ipAddress}`)

    // Priority: cookie match first, then ipHash fallback
    let session: VisitorSession | null = null

    if (existingCookie) {
      session = await withTimeout(
        visitors.findOne({ visitorId: existingCookie }),
        MONGO_TIMEOUT_MS
      )
    }

    if (!session) {
      session = await withTimeout(
        visitors.findOne({ ipHash, lastSeen: { $gte: fallbackCutoff } }),
        MONGO_TIMEOUT_MS
      )
    }

    let visitorId: string
    let createdNewVisitor = false

    if (session) {
      visitorId = session.visitorId

      const needsCountryBackfill =
        !session.countryCode || session.countryCode === VISITOR_COUNTRY_OTHER_CODE

      let updatedCountryCode: string | undefined

      if (needsCountryBackfill && hasUsableIp(ipAddress)) {
        console.log(`[visit] backfilling country for ${visitorId}`)
        const resolved = await resolveCountryFromRequest(req)
        if (resolved !== VISITOR_COUNTRY_OTHER_CODE) {
          updatedCountryCode = resolved
          console.log(`[visit] backfilled → ${resolved}`)
        }
      }

      await withTimeout(
        visitors.updateOne(
          { visitorId },
          {
            $set: {
              lastSeen: new Date(),
              ipHash,
              ...(hasUsableIp(ipAddress) ? { ipAddress } : {}),
              ...(updatedCountryCode ? { countryCode: updatedCountryCode } : {}),
            },
          }
        ),
        MONGO_TIMEOUT_MS
      )
    } else {
      visitorId = existingCookie || randomUUID()

      console.log(`[visit] new visitor ${visitorId}, resolving country…`)
      const resolvedCountryCode = await resolveCountryFromRequest(req)
      console.log(`[visit] country resolved → ${resolvedCountryCode}`)

      try {
        const inserted = await withTimeout(
          visitors.insertOne(buildSession(visitorId, ipAddress, ipHash, resolvedCountryCode)),
          MONGO_TIMEOUT_MS
        )
        createdNewVisitor = inserted.acknowledged
      } catch (error) {
        const isDuplicateKey =
          typeof error === 'object' &&
          error !== null &&
          'code' in error &&
          (error as { code?: number }).code === 11000

        if (!isDuplicateKey) throw error

        const racedSession = await withTimeout(visitors.findOne({ visitorId }), MONGO_TIMEOUT_MS)
        if (racedSession) {
          await withTimeout(
            visitors.updateOne(
              { visitorId },
              {
                $set: {
                  lastSeen: new Date(),
                  ipHash,
                  ...(hasUsableIp(ipAddress) ? { ipAddress } : {}),
                  ...(resolvedCountryCode !== VISITOR_COUNTRY_OTHER_CODE
                    ? { countryCode: resolvedCountryCode }
                    : {}),
                },
              }
            ),
            MONGO_TIMEOUT_MS
          )
        }
      }
    }

    const count = await withTimeout(getVisitorCount(db), MONGO_TIMEOUT_MS)
    const countries = await withTimeout(getVisitorCountryBreakdown(db), MONGO_TIMEOUT_MS)

    const response = NextResponse.json<VisitorApiResponse>({
      ok: true,
      visitorId,
      totalUniqueVisitors: count,
      createdNewVisitor,
      visitorSummary: { totalUniqueVisitors: count, countries },
    })

    if (!existingCookie || existingCookie !== visitorId) {
      response.cookies.set(
        VISITOR_COOKIE_NAME,
        visitorId,
        getVisitorCookieOptions(process.env.NODE_ENV === 'production')
      )
    }

    return response
  } catch (error) {
    console.error('[visit] POST error:', error)

    const response = NextResponse.json(
      {
        ok: false,
        degraded: true,
        visitorId: fallbackVisitorId,
        totalUniqueVisitors: 0,
        createdNewVisitor: false,
        visitorSummary: { totalUniqueVisitors: 0, countries: [] },
      },
      { status: 200 }
    )

    if (!existingCookie) {
      response.cookies.set(
        VISITOR_COOKIE_NAME,
        fallbackVisitorId,
        getVisitorCookieOptions(process.env.NODE_ENV === 'production')
      )
    }

    return response
  }
}
