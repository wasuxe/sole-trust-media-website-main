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

  return (
    <nav
      className="nav site-header"
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
        background: scrolled ? 'rgba(243, 235, 221, 0.94)' : 'rgba(243, 235, 221, 0.82)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(75, 48, 39, 0.1)',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
        boxShadow: scrolled ? '0 8px 24px rgba(40, 34, 31, 0.05)' : 'none',
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

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link href="/work" onClick={() => setMenuOpen(false)}>Work</Link>
        <Link href="/services" onClick={() => setMenuOpen(false)}>Capabilities</Link>
        <Link href="/#about" onClick={() => setMenuOpen(false)}>Studio</Link>
        <Link href="/#insights" onClick={() => setMenuOpen(false)}>Insights</Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        
        <Link
          href="/contact"
          className="button button-dark nav-cta-mobile"
          onClick={() => setMenuOpen(false)}
          style={{ marginTop: '16px', display: 'none' }}
        >
          Start a Project <ArrowUpRight size={13} />
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link
          href="/contact"
          className="button button-dark nav-cta-desktop"
          style={{
            padding: '11px 20px',
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
          aria-label="Toggle navigation"
          style={{ display: 'none', background: 'none', border: 0, color: 'var(--brown)', padding: '6px' }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  )
}
