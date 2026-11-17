'use client'

import { useEffect, useRef, useState } from 'react'

type CursorVariant = 'default' | 'link' | 'case' | 'lens'

export default function CustomCursor() {
  const auraRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const dotRef = useRef<HTMLDivElement | null>(null)
  const [enabled, setEnabled] = useState(false)
  const [variant, setVariant] = useState<CursorVariant>('default')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!isFinePointer || isCoarsePointer || reducedMotion) return

    setEnabled(true)
    document.documentElement.classList.add('stm-custom-cursor-active')

    let mouseX = -200
    let mouseY = -200
    let targetX = -200
    let targetY = -200
    let ringX = -200
    let ringY = -200
    let dotX = -200
    let dotY = -200
    let auraX = -200
    let auraY = -200
    let prevRingX = -200
    let activeVariant: CursorVariant = 'default'
    let magneticTarget: HTMLElement | null = null
    let isShown = false
    let rafId = 0

    const resolveVariant = (el: HTMLElement | null): { nextVariant: CursorVariant; magEl: HTMLElement | null } => {
      if (!el) return { nextVariant: 'default', magEl: null }

      if (el.closest('[data-cursor-no-magnet="true"]')) {
        return { nextVariant: 'default', magEl: null }
      }

      const caseCard = el.closest<HTMLElement>('[data-magnetic-case="true"]')
      if (caseCard) return { nextVariant: 'case', magEl: null }

      const interactive = el.closest<HTMLElement>(
        'a, button, [role="button"], [role="tab"], input[type="submit"], input[type="range"], label'
      )
      if (interactive) return { nextVariant: 'link', magEl: interactive }

      const editorialText = el.closest<HTMLElement>(
        'h1, h2, blockquote, [data-cursor-lens="true"]'
      )
      if (editorialText) return { nextVariant: 'lens', magEl: null }

      return { nextVariant: 'default', magEl: null }
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY

      if (!isShown) {
        isShown = true
        ringX = mouseX
        ringY = mouseY
        dotX = mouseX
        dotY = mouseY
        auraX = mouseX
        auraY = mouseY
        setVisible(true)
      }

      const targetEl = event.target as HTMLElement | null
      const { nextVariant, magEl } = resolveVariant(targetEl)
      magneticTarget = magEl

      if (nextVariant !== activeVariant) {
        activeVariant = nextVariant
        setVariant(nextVariant)
      }
    }

    const handleMouseLeave = () => {
      isShown = false
      magneticTarget = null
      activeVariant = 'default'
      setVariant('default')
      setVisible(false)
    }

    const animate = () => {
      // Subtle magnetic pull toward link/button center when hovering interactive controls
      if (magneticTarget && activeVariant === 'link') {
        const rect = magneticTarget.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        targetX = mouseX + (centerX - mouseX) * 0.24
        targetY = mouseY + (centerY - mouseY) * 0.24
      } else {
        targetX = mouseX
        targetY = mouseY
      }

      // Spring-smoothed positions
      dotX += (mouseX - dotX) * 0.42
      dotY += (mouseY - dotY) * 0.42
      ringX += (targetX - ringX) * 0.16
      ringY += (targetY - ringY) * 0.16
      auraX += (mouseX - auraX) * 0.08
      auraY += (mouseY - auraY) * 0.08

      // Subtle velocity-based tilt for the EXPLORE CASE pill
      const velX = ringX - prevRingX
      prevRingX = ringX
      const tiltDeg = Math.max(-7, Math.min(7, velX * 0.35))

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`
      }

      if (ringRef.current) {
        const rot = activeVariant === 'case' ? ` rotate(${tiltDeg.toFixed(2)}deg)` : ''
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)${rot}`
      }

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${auraX}px, ${auraY}px, 0) translate(-50%, -50%)`
      }

      rafId = window.requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    rafId = window.requestAnimationFrame(animate)

    return () => {
      document.documentElement.classList.remove('stm-custom-cursor-active')
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.cancelAnimationFrame(rafId)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div
        ref={auraRef}
        className={`stm-cursor-aura ${visible ? 'is-visible' : ''} variant-${variant}`}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`stm-cursor-ring ${visible ? 'is-visible' : ''} variant-${variant}`}
        aria-hidden="true"
      >
        {variant === 'case' && <span className="stm-cursor-pill-text">EXPLORE CASE ↗</span>}
      </div>
      <div
        ref={dotRef}
        className={`stm-cursor-dot ${visible ? 'is-visible' : ''} variant-${variant}`}
        aria-hidden="true"
      />
    </>
  )
}
