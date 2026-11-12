'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

const PROCESS_STAGES = [
  { num: '01', name: 'DISCOVER', desc: 'Context & Diagnosis' },
  { num: '02', name: 'STRATEGIZE', desc: 'Positioning & Intent' },
  { num: '03', name: 'CREATE', desc: 'Visual Architecture' },
  { num: '04', name: 'BUILD', desc: 'Digital Engineering' },
  { num: '05', name: 'LAUNCH', desc: 'Market Activation' },
]

export default function CinematicPreloader() {
  const [active, setActive] = useState(true)
  const [progress, setProgress] = useState(10)
  const [phase, setPhase] = useState<'initial' | 'revealed' | 'complete' | 'exiting' | 'done'>('initial')
  const [statusText, setStatusText] = useState('INITIALIZING ARCHIVE')
  const animationFrameRef = useRef<number | null>(null)
  const targetProgressRef = useRef(15)

  // Compute active process stage index (0 to 4)
  const activeStageIndex = Math.min(
    Math.floor((progress / 100) * PROCESS_STAGES.length),
    PROCESS_STAGES.length - 1
  )

  // Complete and dismiss preloader
  const completeLoader = useCallback(() => {
    setPhase('complete')
    setProgress(100)
    setStatusText('STUDIO READY · ENTERING')

    try {
      sessionStorage.setItem('stm_preloader_seen', 'true')
    } catch {
      // sessionStorage might fail in restricted environments, handled safely
    }

    // Brief hold at 100% to let viewer perceive completion
    const exitTimer = setTimeout(() => {
      setPhase('exiting')
      document.body.style.overflow = ''
      document.body.classList.remove('stm-preloader-locked')

      const doneTimer = setTimeout(() => {
        setPhase('done')
        setActive(false)
      }, 950)

      return () => clearTimeout(doneTimer)
    }, 240)

    return () => clearTimeout(exitTimer)
  }, [])

  // Manual skip handler (Escape key or Skip button)
  const handleSkip = useCallback(() => {
    targetProgressRef.current = 100
    completeLoader()
  }, [completeLoader])

  useEffect(() => {
    // 1. Reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setActive(false)
      document.body.style.overflow = ''
      document.body.classList.remove('stm-preloader-locked')
      return
    }

    // 2. Session check (allow ?intro=true for testing)
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
      // Proceed safely
    }

    // Lock body scroll
    document.body.style.overflow = 'hidden'
    document.body.classList.add('stm-preloader-locked')

    // Phase 1 -> Phase 2 (trigger reveals)
    const revealTimer = setTimeout(() => {
      setPhase('revealed')
    }, 80)

    // Escape listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    // 3. Measurable resource tracking
    let loadedAssetsCount = 0
    const criticalImages = [
      '/assets/logo/logo-brown.png',
      '/assets/work/twine/twine-01.jpeg',
      '/assets/work/future-luxe/future-luxe-01.png',
      '/assets/work/lumora/lumora-01.png',
    ]

    const onImageLoaded = () => {
      loadedAssetsCount++
      const assetRatio = loadedAssetsCount / criticalImages.length
      targetProgressRef.current = Math.max(targetProgressRef.current, Math.floor(25 + assetRatio * 50))
    }

    criticalImages.forEach((src) => {
      const img = new Image()
      img.src = src
      if (img.complete) {
        onImageLoaded()
      } else {
        img.onload = onImageLoaded
        img.onerror = onImageLoaded // Fail gracefully, never block
      }
    })

    // Check fonts readiness
    if ('fonts' in document) {
      document.fonts.ready
        .then(() => {
          targetProgressRef.current = Math.max(targetProgressRef.current, 60)
          setStatusText('TYPOGRAPHIC SYSTEM READY')
        })
        .catch(() => {
          targetProgressRef.current = Math.max(targetProgressRef.current, 50)
        })
    }

    // Check document readiness
    if (document.readyState === 'complete') {
      targetProgressRef.current = Math.max(targetProgressRef.current, 85)
      setStatusText('PAGE ASSETS CALIBRATED')
    } else {
      const handleWindowLoad = () => {
        targetProgressRef.current = Math.max(targetProgressRef.current, 90)
        setStatusText('PAGE ASSETS CALIBRATED')
      }
      window.addEventListener('load', handleWindowLoad, { once: true })
    }

    // 4. Smooth fluid interpolation ticker
    const startTime = performance.now()
    const minDisplayDuration = 1500 // allows viewing the editorial composition
    const maxSafetyDuration = 2800 // safety cap so it never gets stuck

    let current = 10
    const tick = (now: number) => {
      const elapsed = now - startTime

      const target = targetProgressRef.current
      if (current < target) {
        current += (target - current) * 0.12 + 0.35
      }

      // Natural progressive baseline
      const timeRatio = Math.min(elapsed / minDisplayDuration, 1)
      const simulatedBase = Math.floor(timeRatio * 92)
      const displayVal = Math.min(Math.floor(Math.max(current, simulatedBase)), 99)

      setProgress(displayVal)

      // Contextual status messages
      if (displayVal >= 25 && displayVal < 50) {
        setStatusText('01 / ANALYSING ARCHITECTURE')
      } else if (displayVal >= 50 && displayVal < 75) {
        setStatusText('02 / COMPOSING SPATIAL MEDIUMS')
      } else if (displayVal >= 75 && displayVal < 90) {
        setStatusText('03 / SYNCHRONISING DIGITAL CRAFT')
      } else if (displayVal >= 90) {
        setStatusText('04 / RESOLVING ATELIER')
      }

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
      if (revealTimer) clearTimeout(revealTimer)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      document.body.style.overflow = ''
      document.body.classList.remove('stm-preloader-locked')
    }
  }, [completeLoader, handleSkip])

  if (!active || phase === 'done') {
    return null
  }

  const paddedProgress = progress.toString().padStart(3, '0')

  return (
    <aside
      className={`stm-architectural-loader ${phase === 'exiting' ? 'stm-loader-exit' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Sole Trust Media — Creative Technology Studio"
    >
      {/* Paper-like ambient texture and fine architectural grid */}
      <div className="stm-loader-ambient" aria-hidden="true" />
      <div className="stm-loader-grid-lines" aria-hidden="true" />

      {/* ==================================================================
          TOP BAR: BRAND MARK & STUDIO DESCRIPTOR
          ================================================================== */}
      <header className="stm-loader-header">
        <div className="stm-loader-brand">
          <img
            src="/assets/logo/logo-brown.png"
            alt="Sole Trust Media"
            className="stm-loader-logo-img"
            width={160}
            height={38}
          />
          <div className="stm-loader-brand-divider" aria-hidden="true" />
          <span className="stm-loader-descriptor">
            SOLE TRUST MEDIA
          </span>
        </div>

        <div className="stm-loader-coords">
          <span>CREATIVE</span>
          <span className="stm-slash">/</span>
          <span>TECHNOLOGY</span>
          <span className="stm-slash">/</span>
          <span>STUDIO</span>
        </div>
      </header>

      {/* ==================================================================
          MAIN STAGE: 3-COLUMN EDITORIAL COMPOSITION
          ================================================================== */}
      <main className="stm-loader-stage">
        {/* LEFT: Large Editorial Headline */}
        <section className="stm-loader-col stm-loader-left">
          <div className="stm-loader-section-tag">
            <span>01 // EDITORIAL DIRECTION</span>
          </div>

          <h1 className="stm-loader-headline">
            <span className="stm-loader-headline-line">
              <span className={phase !== 'initial' ? 'revealed' : ''}>
                Crafting <i>Experiences</i>
              </span>
            </span>
            <span className="stm-loader-headline-line">
              <span className={phase !== 'initial' ? 'revealed' : ''} style={{ transitionDelay: '0.12s' }}>
                That Move
              </span>
            </span>
            <span className="stm-loader-headline-line">
              <span className={phase !== 'initial' ? 'revealed' : ''} style={{ transitionDelay: '0.24s' }}>
                <i>Brands.</i>
              </span>
            </span>
          </h1>

          <div className={`stm-loader-statement-foot ${phase !== 'initial' ? 'revealed' : ''}`}>
            <span className="stm-loader-mono-pill">ATELIER EST. 2023</span>
            <p>
              Where strategic clarity converges with cinematic craft and high-velocity software engineering.
            </p>
          </div>
        </section>

        {/* CENTRE: Three Overlapping Architectural Image Panels with Orbit Graphic */}
        <section className="stm-loader-col stm-loader-center" aria-hidden="true">
          <div className="stm-loader-panels-wrap">
            {/* Delicate Orbit Line SVG Graphic */}
            <svg
              className="stm-loader-orbit-svg"
              viewBox="0 0 540 540"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="stmOrbitGrad" x1="0" y1="0" x2="540" y2="540" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#B99A78" stopOpacity="0.8" />
                  <stop offset="0.5" stopColor="#4B3027" stopOpacity="0.3" />
                  <stop offset="1" stopColor="#E5D5BE" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              <ellipse
                cx="270"
                cy="270"
                rx="230"
                ry="190"
                transform="rotate(-18 270 270)"
                stroke="url(#stmOrbitGrad)"
                strokeWidth="1.25"
                strokeDasharray="1400"
                className={`stm-orbit-path ${phase !== 'initial' ? 'drawn' : ''}`}
              />
              <circle
                cx="460"
                cy="190"
                r="3.5"
                fill="#4B3027"
                className={`stm-orbit-node ${phase !== 'initial' ? 'pulsing' : ''}`}
              />
            </svg>

            {/* Panel 1: Left / Back Layer (Tactile Textile & Architectural Surface) */}
            <div className={`stm-loader-panel panel-left ${phase !== 'initial' ? 'in' : ''}`}>
              <div className="stm-loader-panel-inner">
                <img
                  src="/assets/work/twine/twine-01.jpeg"
                  alt="Material texture exploration"
                  loading="eager"
                />
                <div className="stm-loader-panel-caption">
                  <span>01</span>
                  <span>MATERIAL CRAFT</span>
                </div>
              </div>
            </div>

            {/* Panel 2: Center / Main Focus Layer (Spatial Architecture & Monolithic Form) */}
            <div className={`stm-loader-panel panel-center ${phase !== 'initial' ? 'in' : ''}`}>
              <div className="stm-loader-panel-inner">
                <img
                  src="/assets/work/future-luxe/future-luxe-01.png"
                  alt="Architectural form & luxury packaging"
                  loading="eager"
                />
                <div className="stm-loader-panel-badge">
                  <span>SPATIAL DESIGN</span>
                </div>
                <div className="stm-loader-panel-caption main">
                  <span>02</span>
                  <span>MONOLITHIC VISUALS</span>
                </div>
              </div>
            </div>

            {/* Panel 3: Right / Forward Layer (Light & Luminescence) */}
            <div className={`stm-loader-panel panel-right ${phase !== 'initial' ? 'in' : ''}`}>
              <div className="stm-loader-panel-inner">
                <img
                  src="/assets/work/lumora/lumora-01.png"
                  alt="Luminescence and shadow balance"
                  loading="eager"
                />
                <div className="stm-loader-panel-caption">
                  <span>03</span>
                  <span>LUMINA EXPERIENCES</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT: Vertical Creative-Process Indicator */}
        <section className="stm-loader-col stm-loader-right">
          <div className="stm-loader-section-tag right-tag">
            <span>02 // METHODOLOGY</span>
          </div>

          <div className="stm-loader-process-list">
            <div className="stm-loader-process-track" aria-hidden="true">
              <div
                className="stm-loader-process-track-fill"
                style={{ height: `${((activeStageIndex + 1) / PROCESS_STAGES.length) * 100}%` }}
              />
            </div>

            {PROCESS_STAGES.map((stage, idx) => {
              const isActive = idx === activeStageIndex
              const isPast = idx < activeStageIndex
              return (
                <div
                  key={stage.num}
                  className={`stm-loader-process-item ${isActive ? 'active' : ''} ${isPast ? 'past' : ''} ${
                    phase !== 'initial' ? 'revealed' : ''
                  }`}
                  style={{ transitionDelay: `${0.1 + idx * 0.08}s` }}
                >
                  <div className="stm-loader-process-item-header">
                    <span className="stm-loader-process-num">{stage.num}</span>
                    <span className="stm-loader-process-dash">—</span>
                    <span className="stm-loader-process-name">{stage.name}</span>
                    {isActive && <span className="stm-loader-active-pulse" aria-hidden="true" />}
                  </div>
                  <span className="stm-loader-process-desc">{stage.desc}</span>
                </div>
              )
            })}
          </div>

          <div className="stm-loader-right-geo">
            <span>BENGALURU HQ · LAT 12.9716° N</span>
          </div>
        </section>
      </main>

      {/* ==================================================================
          BOTTOM BAR: HORIZONTAL LOADING INDICATOR & MEASURED PROGRESS
          ================================================================== */}
      <footer className="stm-loader-footer">
        <div className="stm-loader-footer-left">
          <span className="stm-loader-pulse-dot" aria-hidden="true" />
          <span className="stm-loader-status-msg">{statusText}</span>
        </div>

        <div className="stm-loader-footer-center">
          <span className="stm-loader-progress-label">INITIALISING ASSETS</span>
          <div
            className="stm-loader-hairline-track"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="stm-loader-hairline-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="stm-loader-progress-val" aria-hidden="true">
            {paddedProgress}%
          </span>
        </div>

        <div className="stm-loader-footer-right">
          <button
            type="button"
            onClick={handleSkip}
            className="stm-loader-skip-btn"
            aria-label="Skip to main content"
          >
            <span>SKIP INTRO</span>
            <kbd>[ESC]</kbd>
          </button>
        </div>
      </footer>
    </aside>
  )
}
