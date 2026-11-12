'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

export default function CinematicPreloader() {
  const [active, setActive] = useState(true)
  const [progress, setProgress] = useState(12)
  const [phase, setPhase] = useState<'revealed' | 'complete' | 'exiting' | 'done'>('revealed')
  const [statusText, setStatusText] = useState('INITIALIZING STUDIO ARCHIVE')
  const animationFrameRef = useRef<number | null>(null)
  const targetProgressRef = useRef(15)

  // Complete and dismiss preloader
  const completeLoader = useCallback(() => {
    setPhase('complete')
    setProgress(100)
    setStatusText('STUDIO READY · ENTERING')

    // Mark as seen in this session
    try {
      sessionStorage.setItem('stm_preloader_seen', 'true')
    } catch {
      // sessionStorage might fail in restricted iframes/incognito, handle gracefully
    }

    // Short cinematic pause at 100% before opening the curtain
    const exitTimer = setTimeout(() => {
      setPhase('exiting')
      // Unlock body scroll smoothly
      document.body.style.overflow = ''
      document.body.classList.remove('stm-preloader-locked')

      // Remove component from DOM after curtain transition finishes
      const doneTimer = setTimeout(() => {
        setPhase('done')
        setActive(false)
      }, 950)

      return () => clearTimeout(doneTimer)
    }, 280)

    return () => clearTimeout(exitTimer)
  }, [])

  // Manual skip handler (Escape or click)
  const handleSkip = useCallback(() => {
    targetProgressRef.current = 100
    completeLoader()
  }, [completeLoader])

  useEffect(() => {
    // 1. Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setActive(false)
      document.body.style.overflow = ''
      document.body.classList.remove('stm-preloader-locked')
      return
    }

    // 2. Check if user already saw the preloader in this session
    const urlParams = new URLSearchParams(window.location.search)
    const forceIntro = urlParams.get('intro') === 'true'

    try {
      const alreadySeen = sessionStorage.getItem('stm_preloader_seen')
      if (alreadySeen && !forceIntro) {
        setActive(false)
        document.body.style.overflow = ''
        document.body.classList.remove('stm-preloader-locked')
        return
      }
    } catch {
      // Continue safely if sessionStorage is restricted
    }

    // Lock body scroll during active preloader
    document.body.style.overflow = 'hidden'
    document.body.classList.add('stm-preloader-locked')

    // Escape key listener to skip intro
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    // 3. Track actual resource loading
    const checkResourceReadiness = async () => {
      // Check document fonts readiness
      if ('fonts' in document) {
        try {
          await document.fonts.ready
          targetProgressRef.current = Math.max(targetProgressRef.current, 55)
          setStatusText('TYPOGRAPHIC SYSTEM LOADED')
        } catch {
          targetProgressRef.current = Math.max(targetProgressRef.current, 45)
        }
      }

      // Check document readyState
      if (document.readyState === 'complete') {
        targetProgressRef.current = Math.max(targetProgressRef.current, 85)
        setStatusText('BRAND ASSETS CALIBRATED')
      } else {
        const handleLoad = () => {
          targetProgressRef.current = Math.max(targetProgressRef.current, 90)
          setStatusText('BRAND ASSETS CALIBRATED')
        }
        window.addEventListener('load', handleLoad, { once: true })
      }

      // Preload primary brand logo
      const logoImg = new Image()
      logoImg.src = '/assets/logo/logo-brown.png'
      logoImg.onload = () => {
        targetProgressRef.current = Math.max(targetProgressRef.current, 75)
      }
    }

    checkResourceReadiness()

    // 4. Fluid progress interpolation ticker using requestAnimationFrame
    const startTime = performance.now()
    const minDisplayDuration = 1450 // minimum time for cinematic readability
    const maxSafetyDuration = 2600 // hard safety timeout so it NEVER gets stuck

    let current = 12
    const tick = (now: number) => {
      const elapsed = now - startTime

      // Smooth step towards targetProgressRef
      const target = targetProgressRef.current
      if (current < target) {
        current += (target - current) * 0.12 + 0.35
      }

      // Natural progressive increment based on elapsed time
      const timeRatio = Math.min(elapsed / minDisplayDuration, 1)
      const simulatedBase = Math.floor(timeRatio * 92)
      const displayVal = Math.min(Math.floor(Math.max(current, simulatedBase)), 99)

      setProgress(displayVal)

      // Dynamic cinematic status updates
      if (displayVal > 30 && displayVal < 60) {
        setStatusText('ALIGNING BRAND MATRIX')
      } else if (displayVal >= 60 && displayVal < 90) {
        setStatusText('CALIBRATING DIGITAL EXPERIENCES')
      } else if (displayVal >= 90) {
        setStatusText('RESOLVING STUDIO ATELIER')
      }

      // Complete when readiness target is reached and minimum cinematic time has elapsed
      const isReady = targetProgressRef.current >= 85 && elapsed >= minDisplayDuration
      const isTimedOut = elapsed >= maxSafetyDuration

      if (isReady || isTimedOut) {
        completeLoader()
      } else {
        animationFrameRef.current = requestAnimationFrame(tick)
      }
    }

    animationFrameRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      document.body.style.overflow = ''
      document.body.classList.remove('stm-preloader-locked')
    }
  }, [completeLoader, handleSkip])

  if (!active || phase === 'done') {
    return null
  }

  // Format 0 to 100 as padded 3-character string: "012%", "048%", "100%"
  const paddedProgress = progress.toString().padStart(3, '0')

  return (
    <aside
      className={`stm-preloader ${phase === 'exiting' ? 'stm-preloader-exit' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Sole Trust Media"
    >
      {/* Background cinematic vignette and hairline grid overlay */}
      <div className="stm-preloader-ambient" aria-hidden="true" />
      <div className="stm-preloader-grid" aria-hidden="true" />

      {/* Top Bar: Editorial Credits & Coordinate Telemetry */}
      <header className="stm-preloader-top">
        <div className="stm-preloader-meta-group">
          <span className="stm-preloader-index">00 / PROLOGUE</span>
          <span className="stm-preloader-sep" aria-hidden="true">·</span>
          <span className="stm-preloader-meta">SOLE TRUST MEDIA</span>
        </div>
        <div className="stm-preloader-meta-group stm-preloader-center-tag">
          <span className="stm-preloader-meta">CREATIVE TECHNOLOGY STUDIO</span>
        </div>
        <div className="stm-preloader-meta-group stm-preloader-right-tag">
          <span className="stm-preloader-meta">BENGALURU · 12.9716° N</span>
          <span className="stm-preloader-sep" aria-hidden="true">·</span>
          <span className="stm-preloader-meta">2026 ARCHIVE</span>
        </div>
      </header>

      {/* Center Stage: The Brand Emblem, Hairline Progress & Cinematic Statement */}
      <main className="stm-preloader-center">
        {/* Studio Eyebrow Descriptor */}
        <p className="stm-preloader-descriptor visible">
          Independent Creative Technology Studio
        </p>

        {/* Brand Logo with Refined Opacity & Clip Unveil */}
        <div className="stm-preloader-logo-frame visible">
          <img
            src="/assets/logo/logo-brown.png"
            alt="Sole Trust Media"
            className="stm-preloader-logo-img"
            width={240}
            height={54}
          />
        </div>

        {/* Thin Hairline Editorial Progress Line */}
        <div className="stm-preloader-track-wrap">
          <div className="stm-preloader-track" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <div
              className="stm-preloader-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="stm-preloader-counter" aria-hidden="true">
            {paddedProgress}%
          </span>
        </div>

        {/* Editorial Brand Statement Reveal */}
        <div className="stm-preloader-statement visible">
          <h2>
            Ideas become <i>experiences.</i>
          </h2>
          <p className="stm-preloader-subtext">
            Strategy · Craft · Digital Engineering
          </p>
        </div>
      </main>

      {/* Bottom Bar: Operational Telemetry & Skip Controller */}
      <footer className="stm-preloader-bottom">
        <div className="stm-preloader-status">
          <span className="stm-preloader-pulse" aria-hidden="true" />
          <span className="stm-preloader-status-text">{statusText}</span>
        </div>

        <button
          type="button"
          onClick={handleSkip}
          className="stm-preloader-skip"
          aria-label="Skip loading intro"
        >
          <span>SKIP INTRO</span>
          <kbd>[ESC]</kbd>
        </button>

        <div className="stm-preloader-geo">
          <span>WORLDWIDE COMMISSIONS · ACTIVE</span>
        </div>
      </footer>
    </aside>
  )
}
