'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="nav" style={{ position: 'fixed' }}>
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
