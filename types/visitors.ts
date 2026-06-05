export const VISITOR_COUNTRY_OTHER_CODE = 'ZZ'
export const VISITOR_COUNTRY_OTHER_NAME = 'Other'

export type VisitorCountryBreakdown = {
  countryCode: string
  countryName: string
  flagEmoji: string
  visitorCount: number
  percentage: number
  isOther?: boolean
}

export type VisitorSummary = {
  totalUniqueVisitors: number
  countries: VisitorCountryBreakdown[]
}

export type VisitorApiResponse = {
  ok: boolean
  visitorId: string
  totalUniqueVisitors: number
  createdNewVisitor: boolean
  visitorSummary: VisitorSummary
}

const COUNTRY_NAME_OVERRIDES: Record<string, string> = {
  ZZ: VISITOR_COUNTRY_OTHER_NAME,
}

export const COUNTRY_GRADIENTS: Record<string, string> = {
  IN: 'linear-gradient(90deg, #ff9933 0%, #ffd08a 52%, #138808 100%)',
  US: 'linear-gradient(90deg, #b22234 0%, #ffffff 48%, #3c3b6e 100%)',
  GB: 'linear-gradient(90deg, #cf142b 0%, #ffffff 46%, #00247d 100%)',
  DE: 'linear-gradient(90deg, #000000 0%, #dd0000 50%, #ffce00 100%)',
  NP: 'linear-gradient(90deg, #dc143c 0%, #1a4ba3 100%)',
  CA: 'linear-gradient(90deg, #ff0000 0%, #ffffff 52%, #ff0000 100%)',
  FR: 'linear-gradient(90deg, #0055a4 0%, #ffffff 50%, #ef4135 100%)',
  ZZ: 'linear-gradient(90deg, #64748b 0%, #94a3b8 100%)',
}

export function normalizeCountryCode(countryCode: string | null | undefined): string {
  const normalized = (countryCode || VISITOR_COUNTRY_OTHER_CODE).trim().toUpperCase()

  if (!/^[A-Z]{2}$/.test(normalized)) {
    return VISITOR_COUNTRY_OTHER_CODE
  }

  return normalized
}

export function getCountryDisplayName(countryCode: string): string {
  const normalized = normalizeCountryCode(countryCode)

  if (COUNTRY_NAME_OVERRIDES[normalized]) {
    return COUNTRY_NAME_OVERRIDES[normalized]
  }

  try {
    const displayNames = new Intl.DisplayNames(['en'], { type: 'region' })
    return displayNames.of(normalized) || normalized
  } catch {
    return normalized
  }
}

export function getCountryFlagEmoji(countryCode: string): string {
  const normalized = normalizeCountryCode(countryCode)

  if (normalized === VISITOR_COUNTRY_OTHER_CODE) {
    return '🌍'
  }

  const first = normalized.codePointAt(0)
  const second = normalized.codePointAt(1)

  if (!first || !second) {
    return '🌍'
  }

  return String.fromCodePoint(first + 127397, second + 127397)
}

export function getCountryGradient(countryCode: string): string {
  const normalized = normalizeCountryCode(countryCode)
  return COUNTRY_GRADIENTS[normalized] || COUNTRY_GRADIENTS.ZZ
}
