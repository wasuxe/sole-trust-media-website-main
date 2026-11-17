'use client'

import { ArrowUpRight, Mail, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SoundTogglePill, useSound } from '@/components/sound-provider'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Capabilities' },
  { href: '/about', label: 'About' },
  { href: '/#insights', label: 'Insights' },
  { href: '/contact', label: 'Contact' },
] as const

export default function SiteNav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { soundOn, toggleSound, playWarmClick } = useSound()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  const handleStartProjectClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    playWarmClick()
    setMenuOpen(false)
    if (pathname === '/' || pathname === '/contact') {
      const targetId = pathname === '/' ? 'contact' : 'contact-inquiry-form'
      const section = document.getElementById(targetId)
      if (section) {
        e.preventDefault()
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.setTimeout(() => {
          const firstInput = section.querySelector<HTMLInputElement>('input[name="full_name"]')
          firstInput?.focus({ preventScroll: true })
        }, 420)
      }
    }
  }

  return (
    <>
      <nav
        className={`nav site-header ${menuOpen ? 'is-menu-open' : ''}`}
        role="navigation"
        aria-label="Main Navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 120,
          background: menuOpen
            ? 'var(--bg-espresso)'
            : scrolled
            ? 'rgba(246, 241, 233, 0.96)'
            : 'rgba(246, 241, 233, 0.9)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: menuOpen
            ? '1px solid var(--border-hairline-dark)'
            : '1px solid var(--border-hairline)',
          transition: 'background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
          boxShadow: scrolled && !menuOpen ? '0 10px 30px rgba(36, 25, 20, 0.06)' : 'none',
        }}
      >
        <Link className="wordmark brand-logo" href="/" aria-label="Sole Trust Media home">
          <img
            src={menuOpen ? '/assets/logo/logo-white.png' : '/assets/logo/logo-brown.png'}
            alt="Sole Trust Media"
            className="brand-logo-img"
            style={{ height: '34px', width: 'auto', maxWidth: '154px', objectFit: 'contain' }}
          />
        </Link>

        {/* Desktop Links (>= 1024px) */}
        <div className="stm-nav-desktop-links">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={playWarmClick}
              className={pathname === link.href ? 'is-active' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="stm-nav-right-controls">
          <div className="stm-nav-sound-desktop">
            <SoundTogglePill
              active={soundOn}
              onClick={toggleSound}
              tone={menuOpen ? 'espresso' : 'parchment'}
              compact
            />
          </div>

          <Link
            href="/contact?focus=true#contact-inquiry-form"
            onClick={handleStartProjectClick}
            className="button button-dark stm-nav-desktop-cta"
            style={{
              padding: '10px 20px',
              fontSize: '10px',
              letterSpacing: '0.08em',
              borderRadius: '999px',
            }}
          >
            Start a Project <ArrowUpRight size={13} />
          </Link>

          {/* Sleek Pill-Shaped MENU = Trigger (< 1024px) */}
          <button
            className={`stm-nav-menu-pill ${menuOpen ? 'is-open' : ''}`}
            onClick={() => {
              playWarmClick()
              setMenuOpen((prev) => !prev)
            }}
            aria-expanded={menuOpen}
            aria-controls="stm-mobile-drawer"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            type="button"
          >
            <span>{menuOpen ? 'CLOSE' : 'MENU'}</span>
            {menuOpen ? (
              <X size={14} strokeWidth={1.8} />
            ) : (
              <span className="stm-menu-equals" aria-hidden="true">
                <span />
                <span />
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Full-Screen Deep Espresso Mobile & Tablet Drawer (< 1024px) */}
      <div
        id="stm-mobile-drawer"
        className={`stm-mobile-drawer ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="stm-mobile-drawer-inner">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <span className="editorial-label" style={{ color: 'var(--accent-gold)', fontSize: '10px' }}>
              * Bengaluru Atelier
            </span>
            <SoundTogglePill
              active={soundOn}
              onClick={toggleSound}
              tone="espresso"
              compact
            />
          </div>

          <div className="stm-mobile-drawer-links">
            {NAV_LINKS.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => {
                  playWarmClick()
                  setMenuOpen(false)
                }}
                className="stm-mobile-drawer-link"
              >
                <span className="stm-mobile-drawer-idx">0{idx + 1}</span>
                <span>{link.label}</span>
                <ArrowUpRight size={18} className="stm-mobile-drawer-arrow" />
              </Link>
            ))}
          </div>

          <div className="stm-mobile-drawer-footer">
            <Link
              href="/contact?focus=true#contact-inquiry-form"
              tabIndex={menuOpen ? 0 : -1}
              onClick={handleStartProjectClick}
              className="stm-btn-terracotta"
              style={{ width: '100%', justifyContent: 'center', minHeight: '48px' }}
            >
              Start a Project <ArrowUpRight size={14} />
            </Link>

            <a
              href="mailto:admin@soletrustmedia.agency"
              tabIndex={menuOpen ? 0 : -1}
              className="stm-mobile-drawer-email"
            >
              <Mail size={13} />
              <span>admin@soletrustmedia.agency</span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
