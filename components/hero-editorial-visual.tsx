"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"

interface CapabilityItem {
  number: string
  name: string
  tag: string
  href: string
}

const CAPABILITIES_LIST: CapabilityItem[] = [
  { number: "01", name: "Brand & Strategy", tag: "IDENTITY / POSITIONING", href: "/services" },
  { number: "02", name: "Creative & Content", tag: "EDITORIAL / CAMPAIGNS", href: "/services" },
  { number: "03", name: "Digital Experiences", tag: "WEB / INTERACTION", href: "/services" },
  { number: "04", name: "Marketing & Growth", tag: "COMMERCE / FUNNELS", href: "/services" },
  { number: "05", name: "Technology & Systems", tag: "SOFTWARE / AUTOMATION", href: "/services" },
]

export default function HeroEditorialVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [activeCapability, setActiveCapability] = useState<number | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    // Constrain offset to subtle range [-1, 1]
    setMouseOffset({
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMouseOffset({ x: 0, y: 0 })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  // Multipliers for parallax layers (pixels)
  const mx = prefersReducedMotion ? 0 : mouseOffset.x
  const my = prefersReducedMotion ? 0 : mouseOffset.y

  return (
    <div
      ref={containerRef}
      className="hero-editorial-visual-wrapper"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Sole Trust Media interactive editorial studio showcase"
    >
      {/* ====================================================================
          LAYER 0: AMBIENT GLOW & BACKLIGHT
          ==================================================================== */}
      <div className="hero-editorial-glow" aria-hidden="true" />

      {/* ====================================================================
          LAYER 1: ASTRONOMICAL ORBIT LINES & COORDINATE NODES
          ==================================================================== */}
      <svg
        className="hero-editorial-orbit-svg"
        viewBox="0 0 700 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{
          transform: `translate3d(${mx * -6}px, ${my * -6}px, 0)`,
        }}
      >
        <defs>
          <linearGradient id="orbit-grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B99A78" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#4B3027" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#B99A78" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="orbit-grad-secondary" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4B3027" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#B99A78" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FAF7F1" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Primary elliptical orbit */}
        <ellipse
          cx="350"
          cy="350"
          rx="310"
          ry="250"
          transform="rotate(-18 350 350)"
          stroke="url(#orbit-grad-primary)"
          strokeWidth="1.2"
          strokeDasharray="4 8"
          className="hero-orbit-ellipse"
        />

        {/* Secondary counter orbit */}
        <ellipse
          cx="350"
          cy="350"
          rx="275"
          ry="295"
          transform="rotate(32 350 350)"
          stroke="url(#orbit-grad-secondary)"
          strokeWidth="1"
          strokeDasharray="2 10"
          className="hero-orbit-ellipse-counter"
        />

        {/* Outer subtle guide circle */}
        <circle
          cx="350"
          cy="350"
          r="335"
          stroke="#4B3027"
          strokeOpacity="0.12"
          strokeWidth="0.8"
        />

        {/* Orbital Nodes & Celestial Coordinates */}
        <g className="hero-orbit-nodes">
          <circle cx="85" cy="280" r="3.5" fill="#4B3027" />
          <circle cx="85" cy="280" r="8" stroke="#B99A78" strokeWidth="0.8" strokeDasharray="2 2" />
          <circle cx="615" cy="420" r="3" fill="#B99A78" />
          <circle cx="480" cy="105" r="2.5" fill="#4B3027" opacity="0.7" />
          <circle cx="220" cy="600" r="2.5" fill="#4B3027" opacity="0.6" />
        </g>
      </svg>

      {/* ====================================================================
          LAYER 2: BACK ARCHITECTURAL PANEL (LEFT TILT / TACTILE ATELIER)
          ==================================================================== */}
      <div
        className="hero-panel hero-panel-back"
        style={{
          transform: `translate3d(${mx * -10}px, ${my * -10}px, 0) rotate(-4.5deg)`,
        }}
      >
        <div className="hero-panel-frame">
          <img
            src="/assets/work/twine/twine-01.jpeg"
            alt="Tactile Atelier Material Archive"
            className="hero-panel-img"
            loading="eager"
          />
          <div className="hero-panel-overlay" />
          <div className="hero-panel-meta">
            <span className="hero-panel-tag">01 · TACTILE ATELIER</span>
            <span className="hero-panel-coord">BLR // ARCHIVE</span>
          </div>
        </div>
      </div>

      {/* ====================================================================
          LAYER 3: SCULPTURAL 3D VISUAL ELEMENT (CREAM & ESPRESSO MONOLITH)
          ==================================================================== */}
      <div
        className="hero-sculpture-element"
        style={{
          transform: `translate3d(${mx * -16}px, ${my * -16}px, 0) scale(${isHovered ? 1.03 : 1})`,
        }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 380 380"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hero-sculpture-svg"
        >
          <defs>
            <radialGradient id="sculpture-core-glow" cx="0" cy="0" r="1" gradientTransform="matrix(180 0 0 180 190 190)" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4B3027" stopOpacity="0.85" />
              <stop offset="55%" stopColor="#28221F" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#1E1917" stopOpacity="1" />
            </radialGradient>
            <linearGradient id="sculpture-ribbon-gold" x1="40" y1="320" x2="340" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FAF7F1" />
              <stop offset="22%" stopColor="#E5D5BE" />
              <stop offset="48%" stopColor="#B99A78" />
              <stop offset="76%" stopColor="#76513E" />
              <stop offset="92%" stopColor="#4B3027" />
              <stop offset="100%" stopColor="#FAF7F1" />
            </linearGradient>
            <linearGradient id="sculpture-ribbon-espresso" x1="70" y1="340" x2="360" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#B99A78" />
              <stop offset="28%" stopColor="#76513E" />
              <stop offset="60%" stopColor="#4B3027" />
              <stop offset="85%" stopColor="#28221F" />
              <stop offset="100%" stopColor="#E5D5BE" />
            </linearGradient>
            <linearGradient id="sculpture-silk-highlight" x1="80" y1="280" x2="320" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#E5D5BE" stopOpacity="0.8" />
              <stop offset="80%" stopColor="#B99A78" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
            </linearGradient>
            <filter id="sculpture-shadow" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="16" stdDeviation="18" floodColor="#28221F" floodOpacity="0.32" />
            </filter>
          </defs>

          {/* Core volumetric sphere base */}
          <circle
            cx="190"
            cy="190"
            r="128"
            fill="url(#sculpture-core-glow)"
            filter="url(#sculpture-shadow)"
          />

          {/* Fine orbital ring guide */}
          <circle
            cx="190"
            cy="190"
            r="152"
            stroke="#B99A78"
            strokeOpacity="0.3"
            strokeDasharray="3 6"
          />

          {/* Sweeping volumetric 3D sculptural ribbons */}
          <path
            d="M36 264C92 148 152 320 224 220C280 142 316 200 376 44"
            stroke="url(#sculpture-ribbon-gold)"
            strokeWidth="68"
            strokeLinecap="round"
          />
          <path
            d="M56 308C116 194 172 324 240 236C298 162 334 220 394 76"
            stroke="url(#sculpture-ribbon-espresso)"
            strokeWidth="52"
            strokeLinecap="round"
          />
          <path
            d="M20 236C96 156 142 272 210 188C280 100 326 174 388 48"
            stroke="url(#sculpture-ribbon-gold)"
            strokeWidth="38"
            strokeLinecap="round"
            opacity="0.85"
          />
          {/* Hairline silk edge highlight */}
          <path
            d="M38 262C95 158 150 306 224 216C284 142 322 192 378 58"
            stroke="url(#sculpture-silk-highlight)"
            strokeWidth="4.5"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M72 300C132 200 176 308 244 228C302 158 338 212 392 86"
            stroke="url(#sculpture-silk-highlight)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.75"
          />
        </svg>
      </div>

      {/* ====================================================================
          LAYER 4: CENTER MAIN ARCHITECTURAL PANEL (HERO DOMINANT)
          ==================================================================== */}
      <div
        className="hero-panel hero-panel-main"
        style={{
          transform: `translate3d(${mx * -4}px, ${my * -4}px, 0) rotate(0.5deg)`,
        }}
      >
        <div className="hero-panel-frame">
          <img
            src="/assets/work/future-luxe/future-luxe-01.png"
            alt="Sole Trust Media Future Luxe Atelier Architecture"
            className="hero-panel-img"
            loading="eager"
          />
          <div className="hero-panel-overlay" />
          <div className="hero-panel-caption-bar">
            <div>
              <span className="hero-panel-badge-num">FIG. 02</span>
              <strong className="hero-panel-title">Spatial Forms &amp; Atelier</strong>
            </div>
            <span className="hero-panel-marker">CURATED // 2026</span>
          </div>
        </div>
      </div>

      {/* ====================================================================
          LAYER 5: FORWARD FLOATING PANEL (RIGHT TILT / LUMINESCENCE)
          ==================================================================== */}
      <div
        className="hero-panel hero-panel-forward"
        style={{
          transform: `translate3d(${mx * 8}px, ${my * 8}px, 0) rotate(4deg)`,
        }}
      >
        <div className="hero-panel-frame">
          <img
            src="/assets/work/lumora/lumora-01.png"
            alt="Luminescence Spatial Lighting Architecture"
            className="hero-panel-img"
            loading="eager"
          />
          <div className="hero-panel-overlay" />
          <div className="hero-panel-meta">
            <span className="hero-panel-tag">03 · LUMINESCENCE</span>
            <span className="hero-panel-coord">SPATIAL // LIGHT</span>
          </div>
        </div>
      </div>

      {/* ====================================================================
          LAYER 6: TRANSLUCENT CAPABILITIES PANEL (STUDIO DISCIPLINARY MATRIX)
          ==================================================================== */}
      <div
        className="hero-capabilities-panel"
        style={{
          transform: `translate3d(${mx * 12}px, ${my * 12}px, 0)`,
        }}
      >
        <div className="hero-capabilities-header">
          <div className="hero-capabilities-indicator">
            <span className="hero-pulse-dot" />
            <span className="hero-capabilities-title">DISCIPLINARY MATRIX</span>
          </div>
          <span className="hero-capabilities-status">STM // 05</span>
        </div>

        <ul className="hero-capabilities-list" role="list">
          {CAPABILITIES_LIST.map((item, idx) => (
            <li
              key={item.number}
              className={`hero-capability-row ${activeCapability === idx ? "active" : ""}`}
              onMouseEnter={() => setActiveCapability(idx)}
              onMouseLeave={() => setActiveCapability(null)}
            >
              <Link href={item.href} className="hero-capability-link">
                <span className="hero-capability-num">{item.number}</span>
                <span className="hero-capability-name">{item.name}</span>
                <span className="hero-capability-arrow" aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="hero-capabilities-footer">
          <span className="hero-capabilities-footnote">
            STRATEGY · CREATIVITY · TECHNOLOGY
          </span>
          <span className="hero-crosshair" aria-hidden="true">+</span>
        </div>
      </div>

      {/* ====================================================================
          LAYER 7: RESTRAINED EDITORIAL DETAILS & GRAPHIC MARKERS
          ==================================================================== */}
      <div className="hero-editorial-marker marker-top-left" aria-hidden="true">
        <span>+ 12°58&apos;N 77°35&apos;E</span>
      </div>
      <div className="hero-editorial-marker marker-bottom-right" aria-hidden="true">
        <span>VOL. 26 // ATELIER REF.</span>
      </div>
    </div>
  )
}

