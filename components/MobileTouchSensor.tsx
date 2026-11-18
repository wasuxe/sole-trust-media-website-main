'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

interface TouchRipple {
  id: number
  x: number
  y: number
  kind: 'tap' | 'trail'
}

const HOME_SECTIONS = [
  { id: 'top', label: '01 · ATELIER' },
  { id: 'about', label: '02 · MANIFESTO' },
  { id: 'work', label: '03 · WORK' },
  { id: 'services', label: '04 · CAPABILITIES' },
  { id: 'friction', label: '05 · DIAGNOSTIC' },
  { id: 'solutions', label: '06 · PROCESS' },
  { id: 'insights', label: '07 · INSIGHTS' },
  { id: 'configure-scope', label: '08 · SCOPE' },
  { id: 'contact', label: '09 · CONTACT' },
] as const

function getRouteFallbackLabel(pathname: string): string {
  if (pathname.startsWith('/work')) return 'ARCHIVE · WORK'
  if (pathname.startsWith('/services')) return '01 · CAPABILITIES'
  if (pathname.startsWith('/about')) return 'ATELIER · ABOUT'
  if (pathname.startsWith('/contact')) return 'PROPOSAL · CONTACT'
  return '01 · ATELIER'
}

export default function MobileTouchSensor() {
  const pathname = usePathname()
  const [enabled, setEnabled] = useState(false)
  const [ripples, setRipples] = useState<TouchRipple[]>([])
  const [sectionLabel, setSectionLabel] = useState('01 · ATELIER')
  const [badgeVisible, setBadgeVisible] = useState(false)

  const progressRef = useRef<HTMLDivElement | null>(null)
  const rippleIdRef = useRef(0)
  const lastTrailTimeRef = useRef(0)
  const idleTimerRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const checkMobileOrTouch = () => {
      const isNarrow = window.innerWidth < 1024
      const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
      setEnabled(isNarrow || isTouch)
    }

    checkMobileOrTouch()
    window.addEventListener('resize', checkMobileOrTouch, { passive: true })
    return () => window.removeEventListener('resize', checkMobileOrTouch)
  }, [])

  // Tactile Touch Ripple & Trail (GPU-only CSS rings)
  useEffect(() => {
    if (!enabled) return

    const spawnRipple = (x: number, y: number, kind: 'tap' | 'trail') => {
      const id = ++rippleIdRef.current
      setRipples((prev) => [...prev.slice(-7), { id, x, y, kind }])
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id))
      }, kind === 'tap' ? 540 : 400)
    }

    const handleTouchStart = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      spawnRipple(t.clientX, t.clientY, 'tap')
    }

    const handleTouchMove = (e: TouchEvent) => {
      const now = performance.now()
      if (now - lastTrailTimeRef.current < 48) return
      lastTrailTimeRef.current = now
      const t = e.touches[0]
      if (!t) return
      spawnRipple(t.clientX, t.clientY, 'trail')
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [enabled])

  // Edge Scroll Telemetry Filament + Section Compass Pill
  useEffect(() => {
    if (!enabled) return
    setSectionLabel(getRouteFallbackLabel(pathname || '/'))

    let rafId = 0
    const syncScroll = () => {
      rafId = 0
      const scrollTop = window.scrollY
      const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const ratio = Math.max(0, Math.min(1, scrollTop / docHeight))

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${ratio.toFixed(4)})`
      }

      if (scrollTop > 40) {
        setBadgeVisible(true)
        if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current)
        idleTimerRef.current = window.setTimeout(() => {
          setBadgeVisible(false)
        }, 1600)
      } else {
        setBadgeVisible(false)
      }

      if (pathname === '/') {
        const probeY = window.innerHeight * 0.38
        let matched: string = HOME_SECTIONS[0].label
        for (const sec of HOME_SECTIONS) {
          const el = document.getElementById(sec.id)
          if (el && el.getBoundingClientRect().top <= probeY) {
            matched = sec.label
          }
        }
        setSectionLabel(matched)
      } else {
        setSectionLabel(getRouteFallbackLabel(pathname || '/'))
      }
    }

    const onScroll = () => {
      if (!rafId) rafId = window.requestAnimationFrame(syncScroll)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    syncScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) window.cancelAnimationFrame(rafId)
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current)
    }
  }, [enabled, pathname])

  if (!enabled || pathname?.startsWith('/admin')) return null

  return (
    <div className="stm-mobile-sensor-root" aria-hidden="true">
      {/* Razor-thin 2px warm gold / terracotta edge scroll filament */}
      <div className="stm-scroll-filament-track">
        <div ref={progressRef} className="stm-scroll-filament-fill" />
      </div>

      {/* Minimal morphing section compass pill (auto-fades when idle) */}
      <div className={`stm-scroll-compass-pill ${badgeVisible ? 'is-visible' : ''}`}>
        <span className="stm-scroll-compass-dot" />
        <span>{sectionLabel}</span>
      </div>

      {/* Whisper-thin terracotta & warm gold touch ripple / trail layer */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className={`stm-touch-ripple is-${ripple.kind}`}
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
          }}
        />
      ))}
    </div>
  )
}
