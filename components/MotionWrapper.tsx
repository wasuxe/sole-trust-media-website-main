'use client'

import { useEffect, useRef, useState } from 'react'

interface MotionWrapperProps {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'header'
  id?: string
  style?: React.CSSProperties
}

export function MotionWrapper({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
  id,
  style,
}: MotionWrapperProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const rect = el.getBoundingClientRect()
    // If already near or inside viewport on mount, reveal immediately with zero flicker
    if (rect.top < window.innerHeight + 80) {
      setVisible(true)
      return
    }

    // Only animate elements genuinely below the fold, with generous margin & guaranteed fallback
    setVisible(false)

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.01, rootMargin: '120px 0px 120px 0px' }
    )

    observer.observe(el)

    // Scroll fallback check so tall or dynamic sections never stay hidden on any screen height
    const onScrollCheck = () => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight + 120) {
        setVisible(true)
        observer.disconnect()
        window.removeEventListener('scroll', onScrollCheck)
      }
    }
    window.addEventListener('scroll', onScrollCheck, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScrollCheck)
    }
  }, [])

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={`stm-motion-reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{
        ...style,
        transitionDelay: delay ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </Tag>
  )
}

export default MotionWrapper

/* ==========================================================================
   ANIMATED 1PX ARCHITECTURAL HAIRLINE (SCALEX 0 -> 1 ON SCROLL)
   ========================================================================== */
export function AnimatedHairline({
  tone = 'light',
  className = '',
  style,
}: {
  tone?: 'light' | 'dark'
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [expanded, setExpanded] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setExpanded(true)
      return
    }
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight + 80) {
      setExpanded(true)
      return
    }
    setExpanded(false)
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setExpanded(true)
          observer.disconnect()
        }
      },
      { threshold: 0.01, rootMargin: '100px 0px 100px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`stm-animated-hairline tone-${tone} ${expanded ? 'is-expanded' : ''} ${className}`.trim()}
      style={style}
    />
  )
}

/* ==========================================================================
   COUNT-UP METRIC COUNTER (16+, 45+, 1.5+)
   ========================================================================== */
export function CountUpMetric({
  target,
  suffix = '',
  decimals = 0,
  durationMs = 1150,
}: {
  target: number
  suffix?: string
  decimals?: number
  durationMs?: number
}) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [displayVal, setDisplayVal] = useState<number>(target)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayVal(target)
      return
    }

    let rafId = 0

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true
          const start = performance.now()
          const step = (now: number) => {
            const p = Math.min(1, (now - start) / durationMs)
            const eased = 1 - Math.pow(1 - p, 3)
            const raw = target * eased
            if (decimals > 0) {
              const factor = Math.pow(10, decimals)
              setDisplayVal(Math.round(raw * factor) / factor)
            } else {
              setDisplayVal(Math.max(1, Math.round(raw)))
            }
            if (p < 1) {
              rafId = window.requestAnimationFrame(step)
            } else {
              setDisplayVal(target)
            }
          }
          setDisplayVal(0)
          rafId = window.requestAnimationFrame(step)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [target, decimals, durationMs])

  const formatted = decimals > 0 ? displayVal.toFixed(decimals) : String(displayVal)

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  )
}
