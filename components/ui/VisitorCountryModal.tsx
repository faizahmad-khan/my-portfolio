'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { VisitorSummary } from '@/types/visitors'
import {
  VISITOR_COUNTRY_OTHER_CODE,
  normalizeCountryCode,
  getCountryDisplayName,
  getCountryFlagEmoji,
  getCountryGradient,
} from '@/types/visitors'

type VisitorCountryModalProps = {
  open: boolean
  onClose: () => void
  summary: VisitorSummary | null
}

export default function VisitorCountryModal({ open, onClose, summary }: VisitorCountryModalProps) {
  useEffect(() => {
    if (!open) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [onClose, open])

  const countries = summary?.countries || []
  const totalVisitors = summary?.totalUniqueVisitors || 0

  const getFlagImageUrl = (countryCode: string) => {
    const normalized = normalizeCountryCode(countryCode)
    if (normalized === VISITOR_COUNTRY_OTHER_CODE) {
      return null
    }

    return `https://flagcdn.com/w40/${normalized.toLowerCase()}.png`
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-2 py-2 sm:px-3 sm:py-3"
        >
          <motion.button
            type="button"
            aria-label="Close visitor geography"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="visitor-geography-title"
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 14 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-[720px] overflow-hidden rounded-[22px] border border-white/10 bg-[#0a0a0a]/95 shadow-2xl shadow-black/45 backdrop-blur-xl sm:max-w-[760px]"
            style={{ maxHeight: 'calc(100vh - 0.75rem)' }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-white/8 px-3 py-2.5 sm:px-4 sm:py-3">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#f5a623]/75">
                  Visitor geography
                </div>
                <h2 id="visitor-geography-title" className="mt-1 text-[24px] font-semibold text-white sm:text-[28px]">
                  Top countries
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-colors hover:border-white/20 hover:text-white"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid gap-2.5 overflow-y-auto p-2.5 sm:p-3.5 lg:grid-cols-[0.88fr_1.12fr]">
              <section className="min-w-0 rounded-[20px] border border-white/8 bg-white/4 p-2.5 sm:p-3">
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
                      Total visitors
                    </div>
                    <div className="mt-2 text-[36px] font-semibold leading-none text-white sm:text-[40px]">
                      {new Intl.NumberFormat('en-IN').format(totalVisitors)}
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 rounded-[18px] border border-white/8 bg-[#08111d] p-2 sm:p-2.5">
                  <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.28em] text-slate-500">
                    <span>World map</span>
                  </div>

                  <div className="mt-2 overflow-hidden rounded-[16px] border border-white/6 bg-[#09101a]">
                    <img
                      src="/assets/world-map-adobe.jpg"
                      alt="World map"
                      className="h-36 w-full object-cover sm:h-44 lg:h-[220px]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </section>

              <section className="min-w-0 rounded-[20px] border border-white/8 bg-white/4 p-2.5 sm:p-3">
                <div className="flex items-center justify-between gap-3 pb-2">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
                      Distribution
                    </div>
                    <p className="mt-1 text-[12px] text-slate-400">Top 4 + other</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {countries.length === 0 ? (
                    <div className="rounded-[16px] border border-white/8 bg-white/5 px-4 py-4 text-sm text-slate-400">
                      Loading visitor geography...
                    </div>
                  ) : (
                    countries.map((country, index) => (
                      <motion.div
                        key={country.countryCode}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.22, delay: index * 0.04 }}
                        className="rounded-[16px] border border-white/8 bg-white/5 px-3 py-2 sm:px-3.5"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="relative flex h-5.5 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/10 bg-white/8 text-[12px] leading-none">
                            <span className="select-none">{country.flagEmoji || getCountryFlagEmoji(country.countryCode)}</span>
                            {getFlagImageUrl(country.countryCode) && (
                              <img
                                src={getFlagImageUrl(country.countryCode) || ''}
                                alt={`${getCountryDisplayName(country.countryCode)} flag`}
                                className="absolute inset-0 h-full w-full object-cover"
                                loading="lazy"
                                decoding="async"
                                onError={(event) => {
                                  event.currentTarget.style.display = 'none'
                                }}
                              />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2.5">
                              <div className="min-w-0">
                                <div className="text-[12px] font-medium text-white">
                                  {country.countryName}
                                </div>
                                <div className="text-[11px] text-slate-400">
                                  {new Intl.NumberFormat('en-IN').format(country.visitorCount)} {country.visitorCount === 1 ? 'visitor' : 'visitors'}
                                </div>
                              </div>

                              <div className="text-right">
                                <div className="text-[12px] font-semibold text-white">
                                  {country.percentage.toFixed(1)}%
                                </div>
                              </div>
                            </div>

                            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/6">
                              <motion.div
                                initial={{ width: '0%' }}
                                animate={{ width: `${Math.max(country.percentage, 2)}%` }}
                                transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
                                className="h-full rounded-full"
                                style={{ background: getCountryGradient(country.countryCode) }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
