'use client'

import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [active, setActive] = useState(true)
  const [entered, setEntered] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(false)
      document.body.style.overflow = ''
      document.body.classList.remove('stm-preloader-locked')
      return
    }

    // Skip on repeat navigations within session (unless ?intro=true)
    const params = new URLSearchParams(window.location.search)
    const forceIntro = params.get('intro') === 'true'
    try {
      if (sessionStorage.getItem('stm_preloader_seen') && !forceIntro) {
        setActive(false)
        document.body.style.overflow = ''
        document.body.classList.remove('stm-preloader-locked')
        return
      }
    } catch {
      // Safe fallback
    }

    document.body.style.overflow = 'hidden'
    document.body.classList.add('stm-preloader-locked')

    // Trigger logo fade-rise & 1px gold hairline sweep immediately on mount
    const enterRaf = window.requestAnimationFrame(() => {
      setEntered(true)
    })

    // ~0.9s total hold while logo rises (500ms) & 1px gold hairline sweeps (650ms)
    const exitTimer = window.setTimeout(() => {
      try {
        sessionStorage.setItem('stm_preloader_seen', 'true')
      } catch {
        // Safe fallback
      }
      setExiting(true)
      document.body.style.overflow = ''
      document.body.classList.remove('stm-preloader-locked')
    }, 880)

    // Unmount cleanly after 550ms upward curtain slide
    const unmountTimer = window.setTimeout(() => {
      setActive(false)
    }, 1480)

    return () => {
      window.cancelAnimationFrame(enterRaf)
      window.clearTimeout(exitTimer)
      window.clearTimeout(unmountTimer)
      document.body.style.overflow = ''
      document.body.classList.remove('stm-preloader-locked')
    }
  }, [])

  if (!active) return null

  return (
    <aside
      className={`stm-clean-loader ${entered ? 'is-entered' : ''} ${exiting ? 'is-exiting' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Sole Trust Media"
    >
      <div className="stm-clean-loader-core">
        <img
          src="/assets/logo/logo-white.png"
          alt="Sole Trust Media"
          className="stm-clean-loader-logo"
          width={156}
          height={44}
        />
        <div className="stm-clean-loader-track" aria-hidden="true">
          <div className="stm-clean-loader-fill" />
        </div>
      </div>
    </aside>
  )
}
