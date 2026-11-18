'use client'

import { useRef } from 'react'

interface Tilt3DCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  maxTilt?: number
  onClick?: () => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void
  role?: string
  tabIndex?: number
  magneticCase?: boolean
}

export default function Tilt3DCard({
  children,
  className = '',
  style,
  maxTilt = 6,
  onClick,
  onKeyDown,
  role,
  tabIndex,
  magneticCase = false,
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const glareRef = useRef<HTMLDivElement | null>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (0.5 - py) * maxTilt * 2
    const ry = (px - 0.5) * maxTilt * 2

    el.style.transform = `perspective(1200px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translate3d(0, -3px, 0)`
    if (glareRef.current) {
      glareRef.current.style.opacity = '1'
      glareRef.current.style.background = `radial-gradient(circle 280px at ${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%, rgba(197, 155, 109, 0.2), transparent 72%)`
    }
  }

  const handleMouseLeave = () => {
    const el = cardRef.current
    if (el) {
      el.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)'
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0'
    }
  }

  return (
    <div
      ref={cardRef}
      className={`stm-tilt-3d-shell ${className}`.trim()}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={role}
      tabIndex={tabIndex}
      data-magnetic-case={magneticCase ? 'true' : undefined}
    >
      <div ref={glareRef} className="stm-tilt-3d-glare" aria-hidden="true" />
      {children}
    </div>
  )
}
