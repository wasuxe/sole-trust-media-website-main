'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

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
    metric: '3.2x Brand Authority',
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

const MOBILE_DECK_CARDS = [
  ...ATELIER_CARDS,
  {
    id: '13isu',
    index: '04',
    title: '13ISU Tiramisu',
    discipline: 'Culinary Identity · Viral Launch',
    metric: '100K+ Views · 3 Days',
    image: '/13isu-creative-1.png',
    href: '/work/13isu',
  },
] as const

export default function HeroEditorialVisual() {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const touchStartXRef = useRef<number | null>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [mobileIndex, setMobileIndex] = useState<number>(0)
  const [swipeDelta, setSwipeDelta] = useState<number>(0)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 })

  useEffect(() => {
    if (isPaused) return
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ATELIER_CARDS.length)
      setMobileIndex((prev) => (prev + 1) % MOBILE_DECK_CARDS.length)
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

  const handleMobileTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsPaused(true)
    touchStartXRef.current = e.touches[0]?.clientX ?? null
  }

  const handleMobileTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const startX = touchStartXRef.current
    const curX = e.touches[0]?.clientX ?? null
    if (startX !== null && curX !== null) {
      const clamped = Math.max(-70, Math.min(70, curX - startX))
      setSwipeDelta(clamped)
    }
  }

  const handleMobileTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const startX = touchStartXRef.current
    const endX = e.changedTouches[0]?.clientX ?? null
    if (startX !== null && endX !== null) {
      const diff = startX - endX
      if (Math.abs(diff) > 36) {
        if (diff > 0) {
          setMobileIndex((prev) => (prev + 1) % MOBILE_DECK_CARDS.length)
        } else {
          setMobileIndex((prev) => (prev - 1 + MOBILE_DECK_CARDS.length) % MOBILE_DECK_CARDS.length)
        }
      }
    }
    setSwipeDelta(0)
    touchStartXRef.current = null
    window.setTimeout(() => setIsPaused(false), 3200)
  }

  const activeMobileCard = MOBILE_DECK_CARDS[mobileIndex] ?? MOBILE_DECK_CARDS[0]
  const mobileRotateY = (swipeDelta / 70) * 9
  const mobileScale = 1 - Math.abs(swipeDelta) * 0.0006

  return (
    <>
      {/* ====================================================================
          MOBILE (< 768px): CLEAN SWIPEABLE 4:5 3D EDITORIAL CARD DECK
          ==================================================================== */}
      <div
        className="stm-atelier-mobile-deck"
        onTouchStart={handleMobileTouchStart}
        onTouchMove={handleMobileTouchMove}
        onTouchEnd={handleMobileTouchEnd}
        aria-label="Swipeable featured projects deck"
      >
        <div
          className="stm-mobile-deck-card"
          style={{
            transform: `perspective(1200px) translate3d(${(swipeDelta * 0.32).toFixed(1)}px, 0, 0) rotateY(${mobileRotateY.toFixed(2)}deg) scale(${mobileScale.toFixed(3)})`,
            transition: swipeDelta === 0 ? 'transform 0.42s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          }}
        >
          <div className="stm-mobile-deck-media">
            <Image
              key={activeMobileCard.id}
              src={activeMobileCard.image}
              alt={`${activeMobileCard.title} — ${activeMobileCard.discipline}`}
              fill
              sizes="(max-width: 767px) 90vw, 420px"
              priority={mobileIndex === 0}
              style={{ objectFit: 'cover' }}
            />
          </div>

          <Link href={activeMobileCard.href} className="stm-mobile-deck-foot">
            <div>
              <span className="stm-mobile-deck-cat">{activeMobileCard.discipline}</span>
              <strong className="stm-mobile-deck-title">{activeMobileCard.title}</strong>
            </div>
            <span className="stm-mobile-deck-arrow" aria-hidden="true">
              <ArrowUpRight size={15} />
            </span>
          </Link>
        </div>

        {/* Clean Pagination Dots */}
        <div className="stm-mobile-deck-dots" role="tablist" aria-label="Featured commission slides">
          {MOBILE_DECK_CARDS.map((card, idx) => (
            <button
              key={card.id}
              type="button"
              role="tab"
              aria-selected={idx === mobileIndex}
              aria-label={`View ${card.title}`}
              onClick={() => {
                setIsPaused(true)
                setMobileIndex(idx)
              }}
              className={`stm-mobile-deck-dot ${idx === mobileIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* ====================================================================
          DESKTOP / TABLET (>= 768px): 3D ATELIER STAGE WITH PRIORITY HERO LCP
          ==================================================================== */}
      <div
        ref={stageRef}
        className="stm-atelier-stage stm-atelier-desktop-stage"
        onMouseEnter={() => setIsPaused(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-label="Interactive Sole Trust Media Featured Atelier Stack"
      >
        <div className="stm-atelier-meta-top">
          <span className="stm-atelier-vol-tag">
            <span className="stm-atelier-pulse" aria-hidden="true" />
            ATELIER // VOL. 26
          </span>
          <span className="stm-atelier-coord-tag">BENGALURU · GLOBAL</span>
        </div>

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
                <div className="stm-atelier-card-media" style={{ position: 'relative' }}>
                  <Image
                    src={card.image}
                    alt={`${card.title} — ${card.discipline}`}
                    fill
                    sizes="(max-width: 1024px) 45vw, 380px"
                    priority={idx === 0}
                    loading={idx === 0 ? undefined : 'lazy'}
                    style={{ objectFit: 'cover' }}
                  />
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
    </>
  )
}
