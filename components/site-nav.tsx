'use client'

import { ArrowUpRight, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  return (
    <nav
      className="nav site-header"
      role="navigation"
      aria-label="Main Navigation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        height: '84px',
        padding: '0 4vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(243, 235, 221, 0.94)' : 'rgba(243, 235, 221, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(75, 48, 39, 0.1)',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
        boxShadow: scrolled ? '0 10px 30px rgba(40, 34, 31, 0.06)' : 'none',
      }}
    >
      <Link className="wordmark brand-logo" href="/" aria-label="Sole Trust Media home">
        <img
          src="/assets/logo/logo-brown.png"
          alt="Sole Trust Media"
          className="brand-logo-img"
          style={{ height: '38px', width: 'auto', maxWidth: '170px', objectFit: 'contain' }}
        />
      </Link>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`} id="primary-navigation">
        <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link href="/work" onClick={() => setMenuOpen(false)}>Work</Link>
        <Link href="/services" onClick={() => setMenuOpen(false)}>Capabilities</Link>
        <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link href="/#insights" onClick={() => setMenuOpen(false)}>Insights</Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

        <Link
          href="/contact"
          className="button button-dark nav-cta-mobile"
          onClick={() => setMenuOpen(false)}
        >
          Start a Project <ArrowUpRight size={13} />
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <Link
          href="/contact"
          className="button button-dark nav-cta-desktop"
          style={{
            padding: '11px 22px',
            fontSize: '10px',
            letterSpacing: '0.08em',
            borderRadius: '999px',
          }}
        >
          Start a Project <ArrowUpRight size={13} />
        </Link>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          type="button"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </nav>
  )
}
