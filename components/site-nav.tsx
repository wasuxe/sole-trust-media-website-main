'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="nav" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50, background: 'rgba(242, 236, 227, 0.94)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(75, 53, 40, 0.1)' }}>
      <Link className="wordmark brand-logo" href="/" aria-label="Sole Trust Media home">
        <img
          src="/assets/logo/logo-brown.png"
          alt="Sole Trust Media"
          className="brand-logo-img"
        />
      </Link>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link href="/work" onClick={() => setMenuOpen(false)}>Work</Link>
        <Link href="/services" onClick={() => setMenuOpen(false)}>Capabilities</Link>
        <Link href="/#about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
      </div>
      <button
        className="menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
    </nav>
  )
}
