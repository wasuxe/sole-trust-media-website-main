'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

const ATELIER_CARDS = [
  {
    id: 'future-luxe',
    index: '01',
    title: 'Future Luxe',
    discipline: 'Digital Flagship · Next.js',
    metric: '0.6s LCP · 99 Score',
    image: '/assets/work/future-luxe/future-luxe-01.png',
    href: '/work/future-luxe',
  },
  {
    id: 'lumora',
    index: '02',
    title: 'Lumora',
    discipline: 'Spatial Identity · Packaging',
    metric: '3.2x Pricing Power',
    image: '/assets/work/lumora/lumora-01.png',
    href: '/work/lumora',
  },
  {
    id: 'twine',
    index: '03',
    title: 'Twine',
    discipline: 'Brand Atelier · Art Direction',
    metric: '+140% Conversion Lift',
    image: '/assets/work/twine/twine-01.jpeg',
    href: '/work/twine',
  },
] as const

export default function HeroEditorialVisual() {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 })

  // Smooth auto-cycling unless user hovers/focuses
  useEffect(() => {
    if (isPaused) return
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ATELIER_CARDS.length)
    }, 4500)
    return () => window.clearInterval(timer)
  }, [isPaused])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return

    const rect = stageRef.current.getBoundingClientRect()
    const nx = (event.clientX - rect.left) / rect.width - 0.5
    const ny = (event.clientY - rect.top) / rect.height - 0.5
    setTilt({
      rx: Number((-ny * 11).toFixed(2)),
      ry: Number((nx * 13).toFixed(2)),
    })
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
    setTilt({ rx: 0, ry: 0 })
  }

  return (
    <div
      ref={stageRef}
      className="stm-atelier-stage"
      onMouseEnter={() => setIsPaused(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Interactive Sole Trust Media Featured Atelier Stack"
    >
      {/* Top Volumetric Metadata Pill */}
      <div className="stm-atelier-meta-top">
        <span className="stm-atelier-vol-tag">
          <span className="stm-atelier-pulse" aria-hidden="true" />
          ATELIER // VOL. 26
        </span>
        <span className="stm-atelier-coord-tag">BENGALURU · GLOBAL</span>
      </div>

      {/* Architectural Orbit Hairlines */}
      <svg
        className="stm-atelier-orbit-svg"
        viewBox="0 0 460 460"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="230" cy="230" r="208" stroke="rgba(30,24,21,0.12)" strokeWidth="1" strokeDasharray="3 5" />
        <circle cx="230" cy="230" r="158" stroke="rgba(197,155,109,0.28)" strokeWidth="1" />
        <line x1="22" y1="230" x2="438" y2="230" stroke="rgba(30,24,21,0.08)" strokeWidth="1" />
        <line x1="230" y1="22" x2="230" y2="438" stroke="rgba(30,24,21,0.08)" strokeWidth="1" />
      </svg>

      {/* 3D Interactive Focal Card Stack */}
      <div
        className="stm-atelier-3d-deck"
        style={{
          transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        }}
      >
        {ATELIER_CARDS.map((card, idx) => {
          const offset = (idx - activeIndex + ATELIER_CARDS.length) % ATELIER_CARDS.length
          const isFront = offset === 0
          const isMid = offset === 1

          const layerTransform = isFront
            ? 'translate3d(0px, 0px, 44px) rotate(0deg) scale(1)'
            : isMid
            ? 'translate3d(34px, -22px, -16px) rotate(4.5deg) scale(0.93)'
            : 'translate3d(-30px, 24px, -56px) rotate(-4.5deg) scale(0.88)'

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`stm-atelier-card ${isFront ? 'is-front' : ''}`}
              style={{
                transform: layerTransform,
                zIndex: isFront ? 30 : isMid ? 20 : 10,
                opacity: isFront ? 1 : isMid ? 0.88 : 0.72,
              }}
              aria-label={`Bring ${card.title} to front`}
              aria-pressed={isFront}
            >
              <div className="stm-atelier-card-media">
                <img src={card.image} alt={`${card.title} — ${card.discipline}`} />
                <span className="stm-atelier-card-index">{card.index}</span>
                <span className="stm-atelier-card-metric">{card.metric}</span>
              </div>
              <div className="stm-atelier-card-footer">
                <div>
                  <span className="stm-atelier-card-cat">{card.discipline}</span>
                  <strong className="stm-atelier-card-title">{card.title}</strong>
                </div>
                <span className="stm-atelier-card-arrow" aria-hidden="true">
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Interactive Layer Switcher Bar */}
      <div className="stm-atelier-controls" role="tablist" aria-label="Select featured hero commission">
        {ATELIER_CARDS.map((card, idx) => {
          const active = idx === activeIndex
          return (
            <button
              key={card.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveIndex(idx)}
              className={`stm-atelier-dot-btn ${active ? 'active' : ''}`}
            >
              <span>{card.index}</span>
              <span>{card.title}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
