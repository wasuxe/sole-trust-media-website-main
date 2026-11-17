'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { CapabilityMiniDemo } from '@/components/capability-demos'
import { useSound } from '@/components/sound-provider'

export interface MobileServicePillar {
  index: string
  heading: string
  tagline: string
  description: string
  services: string[]
  value: string
  hasDemo?: boolean
}

export default function ServicesMobileAccordion({ pillars }: { pillars: MobileServicePillar[] }) {
  const [openIndex, setOpenIndex] = useState<number>(0)
  const { playWarmClick } = useSound()

  return (
    <div className="stm-mobile-pillar-stack">
      {pillars.map((pillar, idx) => {
        const isOpen = idx === openIndex
        const isDark = idx % 2 === 1
        return (
          <div
            key={pillar.index}
            className={`stm-mobile-pillar-card ${isDark ? 'tone-espresso' : 'tone-parchment'} ${isOpen ? 'is-open' : ''}`}
          >
            <button
              type="button"
              className="stm-mobile-acc-trigger"
              aria-expanded={isOpen}
              onClick={() => {
                playWarmClick()
                setOpenIndex(idx)
              }}
            >
              <span className="stm-mobile-acc-num">{pillar.index}</span>
              <span className="stm-mobile-acc-head">
                <strong>{pillar.heading}</strong>
                <small>{pillar.tagline}</small>
              </span>
              <ChevronDown size={16} className="stm-mobile-acc-chevron" />
            </button>

            {isOpen && (
              <div className="stm-mobile-acc-body">
                <p className="stm-mobile-acc-desc">{pillar.description}</p>
                <ul className="stm-mobile-acc-pills">
                  {pillar.services.map((svc) => (
                    <li key={svc}>{svc}</li>
                  ))}
                </ul>
                {pillar.hasDemo && (
                  <div className="stm-mobile-demo-fit" style={{ marginTop: '14px' }}>
                    <CapabilityMiniDemo pillarIndex={pillar.index} />
                  </div>
                )}
                <p className="stm-mobile-acc-quote">&ldquo;{pillar.value}&rdquo;</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
