'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import type { VisitorApiResponse, VisitorSummary } from '@/types/visitors'
import { useFloating } from '@/context/FloatingContext'

const VisitorCountryModal = dynamic(() => import('./VisitorCountryModal'), {
  ssr: false,
})

export default function VisitorBadge() {
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [summary, setSummary] = useState<VisitorSummary | null>(null)
  const isMountedRef = useRef(true)
  const { openVisitorModal, closeVisitorModal } = useFloating()

  async function loadVisitorCount() {
    try {
      const response = await fetch('/api/visit', {
        method: 'POST',
        credentials: 'same-origin',
      })

      const data = (await response.json()) as VisitorApiResponse
      if (!isMountedRef.current) {
        return
      }

      setCount(typeof data.totalUniqueVisitors === 'number' ? data.totalUniqueVisitors : null)
      setSummary(data.visitorSummary || null)
    } catch {
      if (!isMountedRef.current) {
        return
      }

      setCount(null)
      setSummary(null)
    } finally {
      if (isMountedRef.current) {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    isMountedRef.current = true

    loadVisitorCount().catch(() => {
      if (isMountedRef.current) {
        setLoading(false)
      }
    })

    return () => {
      isMountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (!isModalOpen) {
      return
    }

    // Fetch on open so modal content stays live and reflects latest DB counts.
    loadVisitorCount().catch(() => {
      setLoading(false)
    })
  }, [isModalOpen])

  const formattedCount = count === null ? '...' : new Intl.NumberFormat('en-IN').format(count)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="relative inline-flex self-start"
      >
        <motion.button
          type="button"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={() => {
            setIsModalOpen(true)
            openVisitorModal()
          }}
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-black/70 px-3 py-2 text-xs text-gray-200 shadow-[0_0_30px_rgba(245,166,35,0.12)] backdrop-blur-md transition-colors duration-300 hover:border-amber-400/50 cursor-pointer select-none"
          aria-label="Open visitor geography"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400/10 text-amber-400">
            <Users size={14} />
          </span>

          <div className="flex flex-col leading-tight">
            <span className="uppercase tracking-[0.18em] text-[10px] text-gray-400">Visitors</span>
            <span className="text-[10px] tracking-[0.18em] text-gray-500 sm:hidden">
              Tap for geography
            </span>
            <span className="hidden text-[10px] tracking-[0.18em] text-gray-500 sm:inline">
              Click for geography
            </span>
          </div>

          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="pointer-events-none absolute bottom-full left-0 mb-2 w-max max-w-[220px] rounded-xl border border-amber-400/20 bg-[#101010] px-3 py-2 text-[11px] text-gray-300 shadow-xl"
          >
            <div className="uppercase tracking-[0.18em] text-[10px] text-gray-500">Total visitors</div>
            <div className="mt-1 font-mono text-sm text-white">
              {loading ? 'Loading' : formattedCount}
            </div>
          </motion.div>
        </motion.button>
      </motion.div>

      <VisitorCountryModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          closeVisitorModal()
        }}
        summary={summary}
      />
    </>
  )
}
