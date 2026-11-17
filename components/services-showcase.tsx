'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CapabilityMiniDemo } from '@/components/capability-demos'
import { useSound } from '@/components/sound-provider'

export interface ServiceCategoryItem {
  index: string
  shortLabel: string
  heading: string
  tagline: string
  description: string
  services: string[]
  value: string
}

interface ServicesShowcaseProps {
  categories: ServiceCategoryItem[]
}

export default function ServicesShowcase({ categories }: ServicesShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const { playWarmClick } = useSound()
  const active = categories[activeIndex] ?? categories[0]

  return (
    <div className="stm-cap-showcase">
      <div className="stm-cap-tabs" role="tablist" aria-label="Studio capability disciplines">
        {categories.map((cat, idx) => {
          const isActive = idx === activeIndex
          return (
            <button
              key={cat.index}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`stm-cap-tab ${isActive ? 'active' : ''}`}
              onClick={() => {
                playWarmClick()
                setActiveIndex(idx)
              }}
            >
              <span className="stm-cap-tab-idx">{cat.index}</span>
              <span className="stm-cap-tab-label">{cat.shortLabel}</span>
            </button>
          )
        })}
      </div>

      <div className="stm-cap-panel" role="tabpanel" key={active.index}>
        <div className="stm-cap-panel-copy">
          <span className="editorial-label" style={{ color: 'var(--accent-terracotta)', fontSize: '10px' }}>
            {active.index} / 05 &bull; {active.tagline}
          </span>
          <h2 className="stm-cap-panel-title">{active.heading}</h2>
          <p className="stm-cap-panel-desc">{active.description}</p>

          <ul className="capability-pill-list" aria-label={`${active.heading} deliverables`}>
            {active.services.map((service) => (
              <li key={service} className="capability-pill-tag">
                <span className="capability-pill-dot" aria-hidden="true" />
                <span>{service}</span>
              </li>
            ))}
          </ul>

          <div
            style={{
              marginTop: '20px',
              padding: '16px 20px',
              borderRadius: '14px',
              background: 'var(--bg-parchment)',
              border: '1px solid var(--border-hairline)',
            }}
          >
            <span
              className="editorial-label"
              style={{
                fontSize: '9px',
                color: 'var(--accent-terracotta)',
                display: 'block',
                marginBottom: '6px',
                fontWeight: 700,
              }}
            >
              Commercial Impact
            </span>
            <p
              style={{
                margin: 0,
                fontSize: '14px',
                lineHeight: 1.55,
                color: 'var(--text-ink)',
                fontStyle: 'italic',
              }}
            >
              &ldquo;{active.value}&rdquo;
            </p>
          </div>

          <div style={{ marginTop: '20px' }}>
            <Link
              href={`/contact?services=${encodeURIComponent(active.shortLabel)}`}
              className="stm-btn-terracotta"
              style={{ padding: '11px 22px', fontSize: '10px' }}
              onClick={() => playWarmClick()}
            >
              Scope {active.shortLabel} <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        <div className="stm-cap-panel-demo">
          <CapabilityMiniDemo pillarIndex={active.index} />
        </div>
      </div>
    </div>
  )
}
