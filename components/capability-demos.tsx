'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Cpu, Play, RotateCcw, Sparkles, Zap } from 'lucide-react'

/* ==========================================================================
   DEMO 01: INTERACTIVE BRAND DNA SPECIMEN (Brand & Strategy Card)
   ========================================================================== */
const BRAND_SPECIMENS = {
  twine: {
    id: 'twine',
    label: 'Twine — Tactile Atelier',
    shortLabel: 'TWINE ATELIER',
    tagline: 'Editorial Warmth & Material Craft',
    swatches: [
      { name: 'Parchment', hex: '#F6F1E9', darkText: true },
      { name: 'Espresso', hex: '#241914', darkText: false },
      { name: 'Terracotta', hex: '#8C2D19', darkText: false },
      { name: 'Warm Gold', hex: '#C59B6D', darkText: false },
    ],
    serifFont: 'var(--font-editorial)',
    sansFont: 'var(--font-display)',
    serifLabel: 'Instrument Serif Italic',
    sansLabel: 'Space Grotesk 600',
    headline: 'Tactile craft,',
    italicWord: 'woven to endure.',
    specimenNote: 'Grid ratio 1:1.414 · 1px architectural hairlines · Warm monochrome photography',
    surfaceBg: '#F6F1E9',
    surfaceInk: '#1E1815',
    accent: '#8C2D19',
  },
  lumora: {
    id: 'lumora',
    label: 'Lumora — Spatial Light',
    shortLabel: 'LUMORA LIGHT',
    tagline: 'Architectural Minimalism & Kinetic Luminance',
    swatches: [
      { name: 'Obsidian', hex: '#181412', darkText: false },
      { name: 'Alabaster', hex: '#F5F0E6', darkText: true },
      { name: 'Amber Glow', hex: '#C68B59', darkText: false },
      { name: 'Warm Slate', hex: '#3D3732', darkText: false },
    ],
    serifFont: 'var(--font-editorial)',
    sansFont: 'var(--font-display)',
    serifLabel: 'Playfair / Editorial Display',
    sansLabel: 'DM Mono + Space Grotesk',
    headline: 'Sculpting silence,',
    italicWord: 'through pure light.',
    specimenNote: 'Radial luminance scale · 12-column spatial grid · High-contrast chiaroscuro',
    surfaceBg: '#241914',
    surfaceInk: '#F6F1E9',
    accent: '#C68B59',
  },
} as const

type SpecimenKey = keyof typeof BRAND_SPECIMENS

export function BrandDnaSpecimenDemo() {
  const [activeKey, setActiveKey] = useState<SpecimenKey>('twine')
  const spec = BRAND_SPECIMENS[activeKey]

  return (
    <div className="stm-demo-card" aria-label="Interactive Brand DNA Specimen">
      <div className="stm-demo-toolbar">
        <span className="editorial-label" style={{ fontSize: '9.5px', color: 'var(--accent-terracotta)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={11} /> Live Specimen · Brand DNA
        </span>
        <div className="stm-demo-switcher stm-segmented-pill-switcher" role="tablist" aria-label="Toggle brand DNA specimen">
          {(Object.keys(BRAND_SPECIMENS) as SpecimenKey[]).map((key) => {
            const item = BRAND_SPECIMENS[key]
            const active = activeKey === key
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveKey(key)}
                className={`stm-demo-tab ${active ? 'active' : ''}`}
              >
                <span className="stm-demo-label-desktop">{item.label}</span>
                <span className="stm-demo-label-mobile">{item.shortLabel}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div
        className="stm-dna-stage"
        style={{
          background: spec.surfaceBg,
          color: spec.surfaceInk,
          borderColor: activeKey === 'lumora' ? 'rgba(246, 241, 233, 0.16)' : 'var(--border-hairline)',
        }}
      >
        <div className="stm-dna-top">
          <div>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-utility)',
                fontSize: '9.5px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                opacity: 0.72,
                marginBottom: '6px',
              }}
            >
              {spec.tagline}
            </span>
            <div
              style={{
                fontFamily: spec.sansFont,
                fontSize: 'clamp(22px, 2.4vw, 30px)',
                fontWeight: 600,
                lineHeight: 1.04,
                letterSpacing: '-0.03em',
              }}
            >
              {spec.headline}{' '}
              <i style={{ fontFamily: spec.serifFont, fontWeight: 400, color: spec.accent }}>
                {spec.italicWord}
              </i>
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                marginTop: '10px',
                fontFamily: 'var(--font-utility)',
                fontSize: '10px',
                opacity: 0.72,
              }}
            >
              <span>SERIF: {spec.serifLabel}</span>
              <span>·</span>
              <span>SANS: {spec.sansLabel}</span>
            </div>
          </div>

          {/* Live Geometric Grid Mark */}
          <svg
            viewBox="0 0 72 72"
            width="64"
            height="64"
            fill="none"
            aria-hidden="true"
            style={{ flexShrink: 0, color: spec.accent }}
          >
            {activeKey === 'twine' ? (
              <>
                <rect x="6" y="6" width="60" height="60" rx="12" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="36" cy="36" r="22" stroke="currentColor" strokeWidth="1" />
                <path d="M18 36 C 28 20, 44 52, 54 36" stroke="currentColor" strokeWidth="1.25" />
                <path d="M36 14 L36 58 M14 36 L58 36" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
              </>
            ) : (
              <>
                <circle cx="36" cy="36" r="30" stroke="currentColor" strokeWidth="1" />
                <circle cx="36" cy="36" r="18" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
                <circle cx="36" cy="36" r="6" fill="currentColor" />
                <path d="M36 6 L36 66 M6 36 L66 36 M15 15 L57 57 M57 15 L15 57" stroke="currentColor" strokeWidth="0.75" opacity="0.55" />
              </>
            )}
          </svg>
        </div>

        {/* Swatch Token Strip */}
        <div className="stm-dna-swatches">
          {spec.swatches.map((swatch) => (
            <div key={swatch.hex} className="stm-dna-swatch-item">
              <span
                className="stm-dna-swatch-chip"
                style={{
                  background: swatch.hex,
                  borderColor: activeKey === 'lumora' ? 'rgba(246,241,233,0.22)' : 'rgba(30,24,21,0.18)',
                }}
              />
              <div>
                <strong style={{ display: 'block', fontSize: '10px', fontFamily: 'var(--font-display)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {swatch.name}
                </strong>
                <span style={{ fontSize: '9.5px', fontFamily: 'var(--font-utility)', opacity: 0.72 }}>
                  {swatch.hex}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: '14px',
            paddingTop: '12px',
            borderTop: activeKey === 'lumora' ? '1px solid rgba(246, 241, 233, 0.14)' : '1px solid var(--border-hairline)',
            fontFamily: 'var(--font-utility)',
            fontSize: '10px',
            opacity: 0.72,
          }}
        >
          {spec.specimenNote}
        </div>
      </div>
    </div>
  )
}

/* ==========================================================================
   DEMO 02: BEFORE / AFTER FLAGSHIP TOGGLE (Digital Experiences Card)
   ========================================================================== */
export function FlagshipBeforeAfterDemo() {
  const [mode, setMode] = useState<'flagship' | 'template'>('flagship')
  const [splitPercent, setSplitPercent] = useState<number>(100)

  const handleToggle = (nextMode: 'template' | 'flagship') => {
    setMode(nextMode)
    setSplitPercent(nextMode === 'flagship' ? 100 : 0)
  }

  const handleRangeChange = (value: number) => {
    setSplitPercent(value)
    setMode(value >= 50 ? 'flagship' : 'template')
  }

  return (
    <div className="stm-demo-card" aria-label="Interactive Before and After Flagship Comparison">
      <div className="stm-demo-toolbar">
        <span className="editorial-label" style={{ fontSize: '9.5px', color: 'var(--accent-terracotta)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Zap size={11} /> Live Upgrade · Flagship Preview
        </span>
        <div className="stm-demo-switcher stm-segmented-pill-switcher" role="tablist" aria-label="Toggle template versus flagship preview">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'template'}
            onClick={() => handleToggle('template')}
            className={`stm-demo-tab ${mode === 'template' ? 'active' : ''}`}
          >
            <span className="stm-demo-label-desktop">Generic Template</span>
            <span className="stm-demo-label-mobile">TEMPLATE</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'flagship'}
            onClick={() => handleToggle('flagship')}
            className={`stm-demo-tab ${mode === 'flagship' ? 'active' : ''}`}
          >
            <span className="stm-demo-label-desktop">Sole Trust Flagship</span>
            <span className="stm-demo-label-mobile">FLAGSHIP</span>
          </button>
        </div>
      </div>

      {/* Layered Comparison Canvas */}
      <div className="stm-flagship-compare-stage">
        {/* Base Layer: Flat Unstyled Generic Template */}
        <div className="stm-flagship-layer stm-flagship-template" aria-hidden={splitPercent > 85}>
          <div className="stm-flagship-bar">
            <span className="stm-wire-pill" style={{ width: '64px' }} />
            <div style={{ display: 'flex', gap: '6px' }}>
              <span className="stm-wire-pill" style={{ width: '32px' }} />
              <span className="stm-wire-pill" style={{ width: '32px' }} />
            </div>
          </div>
          <div style={{ marginTop: '18px' }}>
            <span style={{ fontSize: '9.5px', fontFamily: 'monospace', color: '#8a857e', display: 'block', marginBottom: '6px' }}>
              TEMPLATE_V1 · 4.2s LCP · 62% BOUNCE
            </span>
            <div style={{ fontSize: '18px', fontWeight: 500, color: '#6b6761', fontFamily: 'Arial, sans-serif', marginBottom: '10px' }}>
              Welcome to Our Company Website
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '300px' }}>
              <span className="stm-wire-line" style={{ width: '100%' }} />
              <span className="stm-wire-line" style={{ width: '74%' }} />
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
              <span style={{ padding: '6px 12px', background: '#d4d0c8', color: '#5c5852', fontSize: '10px', borderRadius: '3px' }}>
                Learn More
              </span>
            </div>
          </div>
        </div>

        {/* Overlay Layer: High-Contrast Bespoke Mini-Website Showcase */}
        <div
          className="stm-flagship-layer stm-flagship-upgraded stm-flagship-mini-browser"
          style={{ clipPath: `inset(0 ${100 - splitPercent}% 0 0)` }}
          aria-hidden={splitPercent < 15}
        >
          {/* Ambient Warm Gold Radial Glow */}
          <div className="stm-flagship-ambient-glow" aria-hidden="true" />

          {/* Top Atelier / Browser Bar */}
          <div className="stm-flagship-bar" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontFamily: 'var(--font-editorial)', fontSize: '14px', letterSpacing: '0.06em', color: '#F6F1E9' }}>
                SOLE TRUST
              </span>
              <span className="stm-flagship-blr-tag">BLR // GLOBAL</span>
            </div>
            <span className="stm-flagship-perf-badge">
              <Zap size={10} /> 0.6s LCP · 99 Lighthouse
            </span>
          </div>

          {/* Rich Split-Grid Mini-Website Composition (Zero Empty Void) */}
          <div className="stm-flagship-split-body">
            {/* Left Side: Editorial Micro-Nav + Headline + Terracotta CTA */}
            <div className="stm-flagship-split-left">
              <span className="stm-flagship-micronav">WORK · STUDIO · CONTACT</span>
              <div className="stm-flagship-headline">
                Built to earn{' '}
                <i style={{ fontFamily: 'var(--font-editorial)', fontWeight: 400, color: '#C59B6D' }}>
                  immediate authority.
                </i>
              </div>
              <span className="stm-flagship-cta-pill">
                3.1x Enquiries ↗
              </span>
            </div>

            {/* Right Side: Layered Floating Miniature Visual Card + Telemetry Badge */}
            <div className="stm-flagship-split-right">
              <div className="stm-flagship-mini-preview-card">
                <img
                  src="/assets/work/future-luxe/future-luxe-01.png"
                  alt="Sole Trust Flagship miniature website showcase"
                  loading="lazy"
                  decoding="async"
                />
                <div className="stm-flagship-mini-telemetry">
                  <span>CONVERSION +142%</span>
                  <span className="stm-flagship-mini-dot" aria-hidden="true" />
                  <span>0.6s LCP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hairline Divider Indicator */}
        {splitPercent > 2 && splitPercent < 98 && (
          <div
            className="stm-flagship-divider-line"
            style={{ left: `${splitPercent}%` }}
            aria-hidden="true"
          />
        )}
      </div>

      <div className="stm-flagship-slider-row">
        <span style={{ fontFamily: 'var(--font-utility)', fontSize: '9.5px', color: 'var(--muted)', textTransform: 'uppercase' }}>
          Template
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={splitPercent}
          onChange={(e) => handleRangeChange(Number(e.target.value))}
          aria-label="Slide to compare Generic Template versus Sole Trust Flagship"
          className="stm-flagship-range"
        />
        <span style={{ fontFamily: 'var(--font-utility)', fontSize: '9.5px', color: 'var(--accent-terracotta)', textTransform: 'uppercase', fontWeight: 600 }}>
          Flagship ({splitPercent}%)
        </span>
      </div>
    </div>
  )
}

/* ==========================================================================
   DEMO 03: LIVE AI INBOUND PIPELINE SIMULATOR (Technology & Systems Card)
   ========================================================================== */
const PIPELINE_STEPS = [
  { num: '01', title: 'Lead Captured', detail: 'Form / WhatsApp webhook ingested' },
  { num: '02', title: 'AI Intent Scored', detail: 'Priority & scope classified (94/100)' },
  { num: '03', title: 'CRM Synced', detail: 'Supabase + Director alert routed' },
  { num: '04', title: 'Discovery Call Booked', detail: 'Calendar slot confirmed automatically' },
] as const

export function InboundPipelineSimulatorDemo() {
  const [stepIndex, setStepIndex] = useState<number>(-1)
  const [running, setRunning] = useState<boolean>(false)
  const timersRef = useRef<number[]>([])

  const clearAllTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id))
    timersRef.current = []
  }

  useEffect(() => {
    return () => clearAllTimers()
  }, [])

  const runSimulation = () => {
    clearAllTimers()
    setRunning(true)
    setStepIndex(0)

    // Smooth 2.5-second 4-step sequence (0ms, 650ms, 1300ms, 1950ms -> complete at 2500ms)
    const schedule = [650, 1300, 1950, 2500]
    schedule.forEach((delay, idx) => {
      const id = window.setTimeout(() => {
        if (idx < 3) {
          setStepIndex(idx + 1)
        } else {
          setStepIndex(4)
          setRunning(false)
        }
      }, delay)
      timersRef.current.push(id)
    })
  }

  const completed = stepIndex === 4

  return (
    <div className="stm-demo-card" aria-label="Live AI Inbound Pipeline Simulator">
      <div className="stm-demo-toolbar">
        <span className="editorial-label" style={{ fontSize: '9.5px', color: 'var(--accent-terracotta)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Cpu size={11} /> Live Simulator · AI Inbound Engine
        </span>
        <button
          type="button"
          onClick={runSimulation}
          disabled={running}
          className="stm-btn-terracotta"
          style={{ padding: '7px 14px', fontSize: '9.5px', gap: '6px' }}
        >
          {running ? (
            'Simulating…'
          ) : completed ? (
            <>
              <RotateCcw size={11} /> Replay Simulation
            </>
          ) : (
            <>
              <Play size={11} /> Simulate Inbound Lead
            </>
          )}
        </button>
      </div>

      <div className="stm-pipeline-grid" aria-live="polite">
        {PIPELINE_STEPS.map((step, idx) => {
          const isDone = stepIndex > idx
          const isActive = stepIndex === idx && running
          return (
            <div
              key={step.num}
              className={`stm-pipeline-node ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}
            >
              <div className="stm-pipeline-node-top">
                <span className="stm-pipeline-num">{step.num}</span>
                <span className="stm-pipeline-status">
                  {isDone ? (
                    <Check size={11} strokeWidth={2.4} />
                  ) : isActive ? (
                    <span className="stm-pipeline-pulse" />
                  ) : (
                    'IDLE'
                  )}
                </span>
              </div>
              <strong className="stm-pipeline-title">{step.title}</strong>
              <span className="stm-pipeline-detail">{step.detail}</span>
            </div>
          )
        })}
      </div>

      <div className="stm-pipeline-footer">
        <span>
          {completed
            ? '✓ Pipeline completed in 2.5s · 0 dropped enquiries · Ready for discovery call'
            : running
            ? `Processing stage 0${Math.min(stepIndex + 1, 4)} of 04…`
            : 'Click "Simulate Inbound Lead" to watch an automated client intake run live.'}
        </span>
      </div>
    </div>
  )
}

/* Unified Renderer by Capability Pillar Number */
export function CapabilityMiniDemo({ pillarIndex }: { pillarIndex: string }) {
  if (pillarIndex === '01') return <BrandDnaSpecimenDemo />
  if (pillarIndex === '03') return <FlagshipBeforeAfterDemo />
  if (pillarIndex === '05') return <InboundPipelineSimulatorDemo />
  return null
}
