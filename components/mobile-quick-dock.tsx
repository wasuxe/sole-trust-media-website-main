'use client'

import { ArrowUpRight, Layers } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSound } from '@/components/sound-provider'

export default function MobileQuickDock() {
  const pathname = usePathname()
  const { playWarmClick } = useSound()
  const [hiddenAtContact, setHiddenAtContact] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const contactEl =
      document.getElementById('contact') ||
      document.getElementById('contact-inquiry-form')

    if (!contactEl) {
      setHiddenAtContact(false)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setHiddenAtContact(Boolean(entries[0]?.isIntersecting))
      },
      { threshold: 0.08 }
    )

    observer.observe(contactEl)
    return () => observer.disconnect()
  }, [pathname])

  const handleStartProject = (e: React.MouseEvent<HTMLAnchorElement>) => {
    playWarmClick()
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

  // Do not show dock inside admin pages
  if (pathname?.startsWith('/admin')) return null

  return (
    <div
      className={`stm-mobile-quick-dock ${hiddenAtContact ? 'is-hidden' : ''}`}
      role="navigation"
      aria-label="Mobile quick actions"
    >
      <Link href="/work" onClick={playWarmClick} className="stm-dock-btn stm-dock-work">
        <Layers size={14} />
        <span>Work</span>
      </Link>
      <Link
        href="/contact?focus=true#contact-inquiry-form"
        onClick={handleStartProject}
        className="stm-dock-btn stm-dock-cta"
      >
        <span>Start Project</span>
        <ArrowUpRight size={14} />
      </Link>
    </div>
  )
}
