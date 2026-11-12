'use client'

import { useEffect } from 'react'

export default function AboutScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-about-reveal]')
    const root = document.documentElement

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('visible'))
      return
    }

    root.classList.add('about-motion-ready')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -36px 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => {
      observer.disconnect()
      root.classList.remove('about-motion-ready')
    }
  }, [])

  return null
}
