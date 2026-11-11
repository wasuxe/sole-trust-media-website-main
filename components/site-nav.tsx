'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="nav" aria-label="Main Navigation">
      <Link className="wordmark" href="/" aria-label="Sole Trust Media home">
        <span>STM</span>
        <small>SOLE TRUST MEDIA</small>
      </Link>
      <div id="site-navigation" className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link href="/work" onClick={() => setMenuOpen(false)}>Work</Link>
        <Link href="/services" onClick={() => setMenuOpen(false)}>Capabilities</Link>
        <Link href="/#pillars" onClick={() => setMenuOpen(false)}>About</Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
      </div>
      <button
        className="menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
    </nav>
  )
}
