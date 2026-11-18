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
      return
    }

    // Skip immediately on repeat navigations within the same session (unless ?intro=true)
    const params = new URLSearchParams(window.location.search)
    const forceIntro = params.get('intro') === 'true'
    try {
      if (sessionStorage.getItem('stm_preloader_seen') && !forceIntro) {
        setActive(false)
        return
      }
    } catch {
      // Safe fallback
    }

    const enterRaf = window.requestAnimationFrame(() => {
      setEntered(true)
    })

    // Ultra-fast 450ms max non-blocking reveal so LCP stays sub-second
    const exitTimer = window.setTimeout(() => {
      try {
        sessionStorage.setItem('stm_preloader_seen', 'true')
      } catch {
        // Safe fallback
      }
      setExiting(true)
    }, 450)

    const unmountTimer = window.setTimeout(() => {
      setActive(false)
    }, 920)

    return () => {
      window.cancelAnimationFrame(enterRaf)
      window.clearTimeout(exitTimer)
      window.clearTimeout(unmountTimer)
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
          width={148}
          height={42}
          decoding="async"
        />
        <div className="stm-clean-loader-track" aria-hidden="true">
          <div className="stm-clean-loader-fill" />
        </div>
      </div>
    </aside>
  )
}
