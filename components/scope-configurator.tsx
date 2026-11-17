'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, Check, Layers, Sparkles } from 'lucide-react'
import { useSound } from '@/components/sound-provider'

const BUSINESS_STAGES = [
  'Launching a New Brand',
  'Rebranding & Scaling',
  'Automating & Optimizing',
] as const

const DISCIPLINES = [
  {
    id: 'Brand Strategy & Identity',
    formService: 'Brand Strategy',
    secondaryService: 'Branding & Visual Identity',
    deliverables: ['Positioning & Brand Architecture', 'Visual Identity & Editorial Guidelines'],
    weeks: 2,
  },
  {
    id: 'Flagship Website / App',
    formService: 'Website & E-commerce',
    secondaryService: 'UI/UX Design',
    deliverables: ['Bespoke Next.js Digital Flagship', 'Core Web Vitals & Conversion UX'],
    weeks: 3,
  },
  {
    id: 'Editorial Content & Reels',
    formService: 'Content Creation',
    secondaryService: 'Creative Direction',
    deliverables: ['Art Direction & Shoot Playbook', 'Short-Form Viral Launch Reels'],
    weeks: 2,
  },
  {
    id: 'Paid Growth & Funnels',
    formService: 'Performance Marketing',
    secondaryService: 'Social Media Management',
    deliverables: ['High-Intent Acquisition Funnels', 'Meta / Google Conversion Telemetry'],
    weeks: 2,
  },
  {
    id: 'AI & CRM Systems',
    formService: 'Business Automation',
    secondaryService: 'Custom Web Applications',
    deliverables: ['Automated Lead Intake & CRM Sync', 'AI Qualification & Booking Pipeline'],
    weeks: 2,
  },
] as const

type BusinessStage = (typeof BUSINESS_STAGES)[number]

export interface LockedScopePayload {
  stage: string
  disciplines: string[]
  formServices: string[]
  recommendedTrack: string
  timeline: string
  deliveryPod: string
  summaryNote: string
}

interface ScopeConfiguratorProps {
  onLockScope: (payload: LockedScopePayload) => void
}

export default function ScopeConfigurator({ onLockScope }: ScopeConfiguratorProps) {
  const { playWarmClick } = useSound()
  const [stage, setStage] = useState<BusinessStage>('Launching a New Brand')
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([
    'Brand Strategy & Identity',
    'Flagship Website / App',
  ])
  const [lockedFeedback, setLockedFeedback] = useState(false)

  const toggleDiscipline = (id: string) => {
    playWarmClick()
    setSelectedDisciplines((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev
        return prev.filter((item) => item !== id)
      }
      return [...prev, id]
    })
  }

  const blueprint = useMemo(() => {
    const activeItems = DISCIPLINES.filter((d) => selectedDisciplines.includes(d.id))
    const count = activeItems.length

    const hasBrand = selectedDisciplines.includes('Brand Strategy & Identity')
    const hasWeb = selectedDisciplines.includes('Flagship Website / App')
    const hasContent = selectedDisciplines.includes('Editorial Content & Reels')
    const hasGrowth = selectedDisciplines.includes('Paid Growth & Funnels')
    const hasAI = selectedDisciplines.includes('AI & CRM Systems')

    // Compute Recommended Sprint Track (strictly price-free)
    let recommendedTrack = 'Brand Foundation & Digital Flagship'
    if (count >= 4) {
      recommendedTrack = 'End-to-End Atelier Transformation Partner'
    } else if (hasBrand && hasWeb) {
      recommendedTrack =
        stage === 'Launching a New Brand'
          ? 'Brand Foundation & Digital Flagship'
          : 'Rebrand & Digital Flagship Acceleration'
    } else if (hasAI && (hasWeb || hasGrowth)) {
      recommendedTrack = 'AI-Powered Revenue & Conversion Engine'
    } else if (hasAI) {
      recommendedTrack = 'Intelligent Operations & CRM Automation Sprint'
    } else if (hasContent && hasGrowth) {
      recommendedTrack = 'Cultural Momentum & Performance Growth Pod'
    } else if (hasBrand && hasContent) {
      recommendedTrack = 'Editorial Identity & Launch Storytelling Suite'
    } else if (hasWeb) {
      recommendedTrack = 'High-Conversion Digital Flagship Architecture'
    } else if (hasBrand) {
      recommendedTrack = 'Strategic Positioning & Visual Identity System'
    } else if (hasGrowth) {
      recommendedTrack = 'High-Intent Acquisition & Funnel Telemetry'
    } else if (hasContent) {
      recommendedTrack = 'Editorial Content & Short-Form Production Sprint'
    }

    // Compute Estimated Timeline
    const baseWeeks = activeItems.reduce((sum, item) => sum + item.weeks, 0)
    const stageModifier = stage === 'Rebranding & Scaling' ? 1 : 0
    const minWeeks = Math.max(2, Math.min(10, Math.round(baseWeeks * 0.75) + stageModifier))
    const maxWeeks = minWeeks + 2
    const timeline = `${minWeeks}–${maxWeeks} Weeks`

    // Dedicated Engagement Model (non-monetary)
    const deliveryPod =
      count >= 4
        ? 'Full Multidisciplinary Atelier'
        : count >= 2
          ? 'Dedicated Strategy + Craft Pod'
          : 'Focused Specialist Sprint'

    const deliverables = activeItems.flatMap((d) => d.deliverables)

    const formServices = Array.from(
      new Set(activeItems.flatMap((d) => [d.formService, d.secondaryService]))
    )

    return {
      recommendedTrack,
      timeline,
      deliveryPod,
      deliverables,
      formServices,
    }
  }, [stage, selectedDisciplines])

  const handleLockIn = () => {
    playWarmClick()
    const summaryNote =
      `Business Stage: ${stage}\n` +
      `Recommended Sprint Track: ${blueprint.recommendedTrack} (${blueprint.timeline})\n` +
      `Engagement Model: ${blueprint.deliveryPod}\n` +
      `Selected Disciplines: ${selectedDisciplines.join(', ')}\n` +
      `Key Deliverables: ${blueprint.deliverables.join(' · ')}\n\n` +
      `Project Goals: `
    onLockScope({
      stage,
      disciplines: selectedDisciplines,
      formServices: blueprint.formServices,
      recommendedTrack: blueprint.recommendedTrack,
      timeline: blueprint.timeline,
      deliveryPod: blueprint.deliveryPod,
      summaryNote,
    })
    setLockedFeedback(true)
    window.setTimeout(() => setLockedFeedback(false), 2400)
  }

  return (
    <section
      className="stm-configurator-section"
      id="configure-scope"
      aria-labelledby="scope-configurator-title"
    >
      <div className="stm-configurator-inner">
        <div className="stm-configurator-header">
          <div>
            <p className="editorial-label" style={{ color: 'var(--accent-terracotta)', margin: '0 0 12px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span>*</span> Engagement Blueprint · Interactive Scope Builder
            </p>
            <h2
              id="scope-configurator-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 5vw, 68px)',
                lineHeight: 0.96,
                letterSpacing: '-0.04em',
                margin: 0,
                color: 'var(--text-ink)',
              }}
            >
              Configure your <i style={{ fontFamily: 'var(--font-editorial)', fontWeight: 400, color: 'var(--accent-terracotta)' }}>engagement.</i>
            </h2>
          </div>
          <p style={{ maxWidth: '420px', margin: 0, fontSize: '14.5px', lineHeight: 1.65, color: 'var(--muted)' }}>
            Select your business stage and required disciplines to assemble your recommended sprint track, estimated timeline, and tailored proposal brief.
          </p>
        </div>

        <div className="stm-configurator-grid">
          {/* Left Controls */}
          <div className="stm-configurator-controls">
            {/* Step 1: Business Stage */}
            <div className="stm-config-step">
              <div className="stm-config-step-label">
                <span className="stm-config-step-num">01</span>
                <span className="editorial-label" style={{ fontSize: '10.5px', color: 'var(--text-ink)' }}>
                  Select Business Stage
                </span>
              </div>
              <div className="stm-config-pill-group" role="radiogroup" aria-label="Business stage">
                {BUSINESS_STAGES.map((item) => {
                  const active = stage === item
                  return (
                    <button
                      key={item}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => {
                        playWarmClick()
                        setStage(item)
                      }}
                      className={`showcase-pill-btn ${active ? 'active' : ''}`}
                      style={{ textTransform: 'none', letterSpacing: '0.02em', fontSize: '12.5px', padding: '11px 20px' }}
                    >
                      {item}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="hairline-x" />

            {/* Step 2: Disciplines */}
            <div className="stm-config-step">
              <div className="stm-config-step-label">
                <span className="stm-config-step-num">02</span>
                <span className="editorial-label" style={{ fontSize: '10.5px', color: 'var(--text-ink)' }}>
                  Select Disciplines (Multi-Select)
                </span>
              </div>
              <div className="stm-config-pill-group" role="group" aria-label="Disciplines">
                {DISCIPLINES.map((disc) => {
                  const active = selectedDisciplines.includes(disc.id)
                  return (
                    <button
                      key={disc.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleDiscipline(disc.id)}
                      className={`stm-config-discipline-pill ${active ? 'active' : ''}`}
                    >
                      <span className="stm-config-check" aria-hidden="true">
                        {active ? <Check size={11} strokeWidth={2.4} /> : '+'}
                      </span>
                      <span>{disc.id}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Live Blueprint Output Panel (Strictly Price-Free) */}
          <div className="stm-blueprint-panel" aria-live="polite">
            <div className="stm-blueprint-top">
              <span className="editorial-label" style={{ fontSize: '10px', color: 'var(--accent-gold)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={11} /> Live Studio Blueprint
              </span>
              <span style={{ fontFamily: 'var(--font-utility)', fontSize: '10px', color: 'rgba(246, 241, 233, 0.65)' }}>
                {selectedDisciplines.length} {selectedDisciplines.length === 1 ? 'DISCIPLINE' : 'DISCIPLINES'}
              </span>
            </div>

            <div className="stm-blueprint-block">
              <span className="stm-blueprint-label">Recommended Sprint Track</span>
              <h3 className="stm-blueprint-track">{blueprint.recommendedTrack}</h3>
              <span style={{ fontFamily: 'var(--font-utility)', fontSize: '11px', color: 'rgba(246, 241, 233, 0.68)' }}>
                Stage: {stage}
              </span>
            </div>

            <div className="stm-blueprint-meta-row">
              <div>
                <span className="stm-blueprint-label">Estimated Timeline</span>
                <strong className="stm-blueprint-stat">{blueprint.timeline}</strong>
              </div>
              <div style={{ borderLeft: '1px solid var(--border-hairline-dark)', paddingLeft: '20px' }}>
                <span className="stm-blueprint-label">Studio Architecture</span>
                <strong className="stm-blueprint-stat" style={{ fontSize: '17px', lineHeight: 1.25 }}>
                  {blueprint.deliveryPod}
                </strong>
              </div>
            </div>

            <div className="stm-blueprint-block" style={{ borderBottom: 'none', paddingBottom: 0 }}>
              <span className="stm-blueprint-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={11} /> Strategic Deliverables
              </span>
              <ul className="stm-blueprint-deliverables">
                {blueprint.deliverables.map((del) => (
                  <li key={del}>
                    <span className="stm-blueprint-dot" aria-hidden="true" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={handleLockIn}
              className="stm-btn-terracotta"
              style={{ width: '100%', marginTop: '24px' }}
            >
              {lockedFeedback ? (
                <>
                  <Check size={14} /> Scope Loaded Into Proposal Form
                </>
              ) : (
                <>
                  Request Custom Proposal <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
