'use client'

import { useEffect, useRef, useState } from 'react'

/* ==========================================================================
   1. FULL-BLEED DEEP ESPRESSO INFINITE MARQUEE TICKER (SCROLL-VELOCITY BOOST)
   ========================================================================== */
const MARQUEE_PHRASES = [
  'BRAND STRATEGY',
  'DIGITAL FLAGSHIPS',
  'CREATIVE DIRECTION',
  'AI & AUTOMATION',
  'VISCERAL CRAFT',
] as const

export function EspressoMarqueeTicker() {
  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let offset = 0
    let velocityBoost = 0
    let lastScrollY = window.scrollY
    let rafId = 0

    const onScroll = () => {
      const currentY = window.scrollY
      const delta = Math.abs(currentY - lastScrollY)
      lastScrollY = currentY
      velocityBoost = Math.min(8, velocityBoost + delta * 0.08)
    }

    const tick = () => {
      const track = trackRef.current
      if (track) {
        const halfWidth = track.scrollWidth / 2
        if (halfWidth > 0) {
          offset += 0.65 + velocityBoost
          if (offset >= halfWidth) offset -= halfWidth
          track.style.transform = `translate3d(-${offset.toFixed(1)}px, 0, 0)`
        }
      }
      velocityBoost *= 0.92
      if (velocityBoost < 0.01) velocityBoost = 0
      rafId = window.requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    rafId = window.requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section
      className="stm-espresso-marquee"
      aria-label="Sole Trust Media disciplines ticker"
    >
      <div ref={trackRef} className="stm-espresso-marquee-track">
        {[0, 1].map((dup) => (
          <div key={dup} className="stm-espresso-marquee-group" aria-hidden={dup === 1}>
            {MARQUEE_PHRASES.map((phrase, idx) => (
              <span key={`${dup}-${phrase}`} className="stm-espresso-marquee-item">
                <span className={idx % 2 === 1 ? 'stm-marquee-serif' : 'stm-marquee-sans'}>
                  {phrase}
                </span>
                <span className="stm-marquee-asterisk" aria-hidden="true">*</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ==========================================================================
   2. SCROLL-LINKED PARALLAX DISPLAY TYPOGRAPHY (PURE PARCHMENT & ESPRESSO)
   ========================================================================== */
interface ParallaxDisplayBandProps {
  words?: string[]
  tone?: 'parchment' | 'parchment-alt' | 'espresso' | 'espresso-deep'
  direction?: 1 | -1
}

export function ParallaxDisplayBand({
  words = ['ATELIER', 'STRATEGY', 'ENGINEERING'],
  tone = 'parchment',
  direction = -1,
}: ParallaxDisplayBandProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let isVisible = false
    let rafId = 0

    const updateDrift = () => {
      rafId = 0
      if (!isVisible || !containerRef.current || !trackRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight || 1
      const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height)
      const clamped = Math.max(0, Math.min(1, progress))
      const offsetPx = (clamped - 0.5) * 140 * direction
      trackRef.current.style.transform = `translate3d(${offsetPx.toFixed(1)}px, 0, 0)`
    }

    const handleScroll = () => {
      if (!isVisible || rafId) return
      rafId = window.requestAnimationFrame(updateDrift)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = Boolean(entries[0]?.isIntersecting)
        if (isVisible) updateDrift()
      },
      { rootMargin: '120px 0px' }
    )

    if (containerRef.current) observer.observe(containerRef.current)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [direction])

  const isDark = tone === 'espresso' || tone === 'espresso-deep'
  const bgColor =
    tone === 'espresso-deep'
      ? 'var(--bg-espresso-deep)'
      : tone === 'espresso'
      ? 'var(--bg-espresso)'
      : tone === 'parchment-alt'
      ? 'var(--bg-parchment-alt)'
      : 'var(--bg-parchment)'

  const borderColor = isDark ? 'var(--border-hairline-dark)' : 'var(--border-hairline)'
  const textColor = isDark ? 'rgba(246, 241, 233, 0.1)' : 'rgba(30, 24, 21, 0.08)'

  return (
    <div
      ref={containerRef}
      className="stm-parallax-band"
      style={{
        background: bgColor,
        borderTop: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
      }}
      aria-hidden="true"
    >
      <div ref={trackRef} className="stm-parallax-track">
        {[...words, ...words].map((word, idx) => (
          <span key={`${word}-${idx}`} className="stm-parallax-word" style={{ color: textColor }}>
            <span>{word}</span>
            <span className="stm-parallax-sep">*</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ==========================================================================
   3. INTERACTIVE METHODOLOGY PROGRESS BEAM (STAGES 01 — 05)
   ========================================================================== */
const METHODOLOGY_STAGES = [
  {
    num: '01',
    title: 'Discover',
    summary: 'Audit positioning, conversion leaks, and operational bottlenecks.',
  },
  {
    num: '02',
    title: 'Strategize',
    summary: 'Define category narrative, audience architecture, and commercial goals.',
  },
  {
    num: '03',
    title: 'Create',
    summary: 'Shape editorial typography, visual systems, and high-trust storytelling.',
  },
  {
    num: '04',
    title: 'Build',
    summary: 'Engineer sub-second Next.js flagships, CRM pipelines, and AI workflows.',
  },
  {
    num: '05',
    title: 'Launch',
    summary: 'Activate market momentum, measure conversion lift, and compound growth.',
  },
] as const

export function MethodologyProgressBeam({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [activeStage, setActiveStage] = useState<number>(0)
  const [userPinned, setUserPinned] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === 'undefined' || userPinned) return

    let rafId = 0
    const syncScrollStage = () => {
      rafId = 0
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const vh = window.innerHeight || 1
      if (rect.top < vh * 0.85 && rect.bottom > vh * 0.15) {
        const progress = (vh * 0.78 - rect.top) / (rect.height + vh * 0.35)
        const clamped = Math.max(0, Math.min(1, progress))
        const nextIdx = Math.min(
          METHODOLOGY_STAGES.length - 1,
          Math.floor(clamped * METHODOLOGY_STAGES.length)
        )
        setActiveStage(nextIdx)
      }
    }

    const onScroll = () => {
      if (!rafId) rafId = window.requestAnimationFrame(syncScrollStage)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    syncScrollStage()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [userPinned])

  const progressPercent = (activeStage / (METHODOLOGY_STAGES.length - 1)) * 100

  return (
    <div
      ref={sectionRef}
      className={`stm-methodology-beam-wrap tone-${tone}`}
      onMouseLeave={() => setUserPinned(false)}
      aria-label="Five-stage studio methodology"
    >
      <div className="stm-methodology-top">
        <span className="editorial-label stm-methodology-kicker">
          * Five-Stage Studio Methodology · 01 — 05
        </span>
        <span className="stm-methodology-counter">
          ACTIVE STAGE: 0{activeStage + 1} / 05
        </span>
      </div>

      {/* Continuous 1px Hairline Track Illuminated in Terracotta */}
      <div className="stm-beam-track-bar" aria-hidden="true">
        <div
          className="stm-beam-track-fill"
          style={{ transform: `scaleX(${Math.max(0.06, progressPercent / 100)})` }}
        />
      </div>

      <div className="stm-methodology-five-grid">
        {METHODOLOGY_STAGES.map((stage, idx) => {
          const isLit = idx <= activeStage
          const isCurrent = idx === activeStage
          return (
            <button
              key={stage.num}
              type="button"
              onMouseEnter={() => {
                setUserPinned(true)
                setActiveStage(idx)
              }}
              onFocus={() => {
                setUserPinned(true)
                setActiveStage(idx)
              }}
              onClick={() => {
                setUserPinned(true)
                setActiveStage(idx)
              }}
              className={`stm-methodology-node ${isLit ? 'lit' : ''} ${isCurrent ? 'current' : ''}`}
              aria-pressed={isCurrent}
            >
              <span className="stm-methodology-dot" aria-hidden="true" />
              <span className="stm-methodology-num">{stage.num}</span>
              <strong className="stm-methodology-title">{stage.title}</strong>
              <span className="stm-methodology-desc">{stage.summary}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
