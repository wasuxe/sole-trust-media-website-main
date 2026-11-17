'use client'

import { useEffect } from 'react'

export default function AboutScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-about-reveal]')
    elements.forEach((element) => element.classList.add('visible'))
    document.documentElement.classList.remove('about-motion-ready')
  }, [])

  return null
}
