'use client'

import { useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Quote, X } from 'lucide-react'
import { useSound } from '@/components/sound-provider'

export interface CaseDrawerProject {
  slug: string
  name: string
  category: string
  image: string
  targetUrl: string
  isExternal?: boolean
  description?: string
  services?: string[]
}

interface EnrichedCaseDetail {
  subtitle: string
  italicAccent: string
  categories: string[]
  challenge: string
  strategyNote: string
  pullQuote?: { text: string; attribution: string }
  strategicBreakdown?: { label: string; detail: string }[]
  gallery?: { src: string; caption: string }[]
  stack: string[]
  metrics: { value: string; label: string }[]
  mappedServices: string[]
}

const CURATED_CASE_DETAILS: Record<string, EnrichedCaseDetail> = {
  '13isu': {
    subtitle: 'Tiramisu Brand Experience',
    italicAccent: 'Sensory Identity & Launch.',
    categories: ['Flagship Case Study', 'Culinary Identity', 'Packaging & Viral Reels'],
    challenge:
      'Launching a single-speciality tiramisu brand meant turning one signature dessert into an unmistakable cultural ritual — without burning capital on generic ads. Identity, tactile packaging, booth presence, and short-form launch reels had to trigger organic demand from day one.',
    strategyNote:
      'Rooted in "Terah" (13) + "ISU" where the 3 reads visually as an M, we paired tactile packaging and playful editorial art direction ("Your sweetest saviour for tough days") with sensory reels capturing mascarpone texture, espresso soak, and unboxing joy.',
    pullQuote: {
      text: 'A brand is not built through a logo alone — it is built through the way people taste, see, and remember every touchpoint.',
      attribution: '13ISU Launch Direction · Sole Trust Media',
    },
    gallery: [
      { src: '/13isu-creative-1.png', caption: '01 · Night-Market Activation & Booth Identity' },
      { src: '/13isu-creative-2.png', caption: '02 · Tactile Packaging & Unboxing Craft' },
      { src: '/13isu-creative-3.png', caption: '03 · Large-Format Spatial Display Presence' },
    ],
    stack: ['Naming & Brand Identity', 'Tactile Packaging', 'Culinary Art Direction', 'Short-Form Launch Reels', 'Spatial Activation'],
    metrics: [
      { value: '100K+', label: 'Organic Views (3 Days)' },
      { value: '4.8x', label: 'Launch Demand Surge' },
      { value: '100%', label: 'Organic Launch Reach' },
    ],
    mappedServices: ['Branding & Visual Identity', 'Creative Direction', 'Content Creation', 'Social Media Management'],
  },
  'trends-are-a-tool': {
    subtitle: 'Featured Strategic Thesis',
    italicAccent: 'Not a Strategy.',
    categories: ['Strategic Thesis', 'Content Architecture', 'Social Commerce'],
    challenge:
      'Founders routinely mistake viral impressions for commercial traction — racking up 100,000 random views while qualified buyer enquiries stay flat. Chasing trending audio without foundational positioning erodes brand identity and attracts the wrong audience.',
    strategyNote:
      'We codified a repeatable 5-Step Customer-First Content Operating System paired with our 4-Question Trend Decision Gate — shifting brands from vanity impressions to enquiries per 1,000 reach and sub-one-hour response workflows.',
    pullQuote: {
      text: 'A trend is a good tool. It is a bad strategy. If people only recognise your brand when it uses a viral audio, you do not have an identity yet.',
      attribution: 'Daksh Bhagat · Co-Founder, Sole Trust Media',
    },
    strategicBreakdown: [
      {
        label: '01 · Customer Before Content',
        detail: 'Design posts around real buyer anxieties and purchase decisions — 8,000 local buyers outperform 100,000 disengaged scrollers.',
      },
      {
        label: '02 · The 4-Question Trend Gate',
        detail: 'Only adopt a trend if it fits brand tone, resonates with real buyers, links honestly to your product, and reinforces your message.',
      },
      {
        label: '03 · Enquiries Per 1,000 Reach',
        detail: 'Measure profile saves, DMs, calls, and sub-hour reply cadence instead of empty vanity likes.',
      },
    ],
    gallery: [
      { src: '/assets/work/trends-are-a-tool/trends-cover.svg', caption: 'Strategic Comparison · Vanity Reach vs. Customer Conversion' },
    ],
    stack: ['Content Architecture', 'Buyer Psychology', '4-Question Trend Gate', 'Conversion Funnels', 'Retention Telemetry'],
    metrics: [
      { value: '+140%', label: 'Enquiry Conversion' },
      { value: '3.5x', label: 'Qualified Lead Ratio' },
      { value: '<1 Hr', label: 'Lead Response Cadence' },
    ],
    mappedServices: ['Brand Strategy', 'Performance Marketing', 'Content Creation'],
  },
  twine: {
    subtitle: 'Tactile Editorial Experience',
    italicAccent: 'Crafted Identity.',
    categories: ['Brand & Strategy', 'Visual Identity', 'Digital Atelier'],
    challenge:
      'Twine needed to transcend crowded lifestyle templates and establish immediate tactile prestige with design-conscious buyers. Disconnected storytelling and flat product presentation were suppressing perceived brand authority.',
    strategyNote:
      'We re-architected the visual grid, editorial typography, and tactile material direction into a cohesive digital atelier experience.',
    stack: ['Brand Positioning', 'Editorial Typography', 'Art Direction', 'Packaging System', 'Interactive Prototype'],
    metrics: [
      { value: '+140%', label: 'Conversion Lift' },
      { value: '3.2x', label: 'Brand Authority' },
      { value: '<0.8s', label: 'Core Web Vitals' },
    ],
    mappedServices: ['Brand Strategy', 'Branding & Visual Identity', 'Creative Direction'],
  },
  'future-luxe': {
    subtitle: 'Haute Joaillerie Digital Flagship',
    italicAccent: 'Kinetic Precision.',
    categories: ['Digital Flagships', 'Interactive Web', 'Luxury E-Commerce'],
    challenge:
      'Conventional luxury storefronts felt sluggish and indistinguishable, eroding buyer confidence within three seconds. Future Luxe required a kinetic digital flagship engineered for editorial authority and frictionless conversion.',
    strategyNote:
      'Built an atmospheric dark-room luxury interface with bespoke product presentation, refined typography, and sub-second page transitions.',
    stack: ['Next.js App Router', 'UI/UX Architecture', 'Design System', 'Micro-Interactions', 'Performance Telemetry'],
    metrics: [
      { value: '0.6s', label: 'First Contentful Paint' },
      { value: '+165%', label: 'Session Engagement' },
      { value: '99/100', label: 'Lighthouse Score' },
    ],
    mappedServices: ['Website & E-commerce', 'UI/UX Design', 'Branding & Visual Identity'],
  },
  lumora: {
    subtitle: 'Sculptural Beauty System',
    italicAccent: 'Everyday Rituals.',
    categories: ['Brand & Strategy', 'Spatial Identity', 'Packaging'],
    challenge:
      'Lumora entered a saturated contemporary beauty market where visual sameness forces brands into margin-eroding competition. They needed a sculptural identity architecture unmistakable across both packaging and digital touchpoints.',
    strategyNote:
      'Crafted frosted glass, debossed matte cartons, and a serene editorial system unified across every skincare SKU.',
    gallery: [
      { src: '/assets/work/lumora/lumora-01.png', caption: '01 · Body Butter Vessel & Mark' },
      { src: '/assets/work/lumora/lumora-02.png', caption: '02 · Serum & Ritual Cream Line' },
      { src: '/assets/work/lumora/lumora-03.png', caption: '03 · Artisanal Carton & Packaging System' },
    ],
    stack: ['Brand Architecture', 'Logo & Grid System', 'Art Direction', 'Spatial Packaging', 'Brand Guidelines'],
    metrics: [
      { value: '3.2x', label: 'Perceived Value Lift' },
      { value: '+118%', label: 'Direct Recall Rate' },
      { value: '4 Wks', label: 'Concept to Launch' },
    ],
    mappedServices: ['Brand Strategy', 'Branding & Visual Identity', 'Creative Direction'],
  },
}

interface CaseStudyDrawerProps {
  project: CaseDrawerProject | null
  onClose: () => void
  onBuildLikeThis: (services: string[], projectName: string) => void
}

export default function CaseStudyDrawer({
  project,
  onClose,
  onBuildLikeThis,
}: CaseStudyDrawerProps) {
  const drawerRef = useRef<HTMLDivElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const { playWarmChime, playWarmClick } = useSound()

  useEffect(() => {
    if (!project) return
    playWarmChime()

    previousFocusRef.current = document.activeElement as HTMLElement | null
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => {
      const firstFocusable = drawerRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      firstFocusable?.focus()
    }, 30)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key === 'Tab' && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (focusables.length === 0) return

        const first = focusables[0]
        const last = focusables[focusables.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
      previousFocusRef.current?.focus?.()
    }
  }, [project, onClose, playWarmChime])

  if (!project) return null

  const enriched: EnrichedCaseDetail = CURATED_CASE_DETAILS[project.slug] ?? {
    subtitle: project.category || 'Selected Commission',
    italicAccent: 'Editorial Execution.',
    categories: [project.category || 'Selected Work', 'Sole Trust Commission'],
    challenge:
      project.description ||
      `${project.name} required a unified creative-technology system to elevate market positioning and turn cold traffic into qualified enquiries.`,
    strategyNote:
      'Replaced disconnected brand touchpoints with a cohesive Warm Parchment & Deep Espresso editorial standard engineered for commercial conversion.',
    stack:
      project.services && project.services.length > 0
        ? project.services
        : ['Brand Strategy', 'Visual Identity', 'Digital Flagship', 'Conversion Architecture'],
    metrics: [
      { value: '+140%', label: 'Conversion Lift' },
      { value: '3.2x', label: 'Brand Authority' },
      { value: '<0.8s', label: 'Core Web Vitals' },
    ],
    mappedServices:
      project.services && project.services.length > 0
        ? project.services.slice(0, 4)
        : ['Brand Strategy', 'Website & E-commerce', 'UI/UX Design'],
  }

  return (
    <div
      className="stm-drawer-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="presentation"
    >
      <div
        ref={drawerRef}
        className="stm-drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="stm-case-drawer-title"
      >
        {/* Top Bar (Deep Espresso Header Band) */}
        <div
          className="stm-drawer-header"
          style={{
            background: 'var(--bg-espresso)',
            color: 'var(--text-cream)',
            borderBottom: '1px solid var(--border-hairline-dark)',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="stm-drawer-mobile-back"
            aria-label="Back to work"
          >
            <ArrowLeft size={14} />
            <span>BACK TO WORK</span>
          </button>
          <span
            className="editorial-label stm-drawer-desktop-kicker"
            style={{
              fontSize: '10px',
              color: 'var(--accent-gold)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>*</span> Case Study Dossier · {enriched.subtitle}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="stm-drawer-close"
            style={{
              background: 'rgba(246, 241, 233, 0.08)',
              borderColor: 'var(--border-hairline-dark)',
              color: 'var(--text-cream)',
            }}
            aria-label="Close case study drawer"
          >
            <X size={16} />
            <span className="stm-drawer-close-label">CLOSE</span>
          </button>
        </div>

        {/* Scrollable Content with Alternating Deep Espresso & Warm Parchment Bands */}
        <div className="stm-drawer-body" style={{ padding: 0 }}>
          {/* Band 1: Deep Espresso Hero + Oversized Serif Title */}
          <div
            style={{
              background: 'var(--bg-espresso)',
              color: 'var(--text-cream)',
              padding: '24px 28px 30px',
              borderBottom: '1px solid var(--border-hairline-dark)',
            }}
          >
            <div className="stm-drawer-hero" style={{ marginBottom: '20px', borderColor: 'var(--border-hairline-dark)' }}>
              <img src={project.image} alt={`${project.name} case study hero`} />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '14px' }}>
              {enriched.categories.map((cat) => (
                <span
                  key={cat}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 11px',
                    borderRadius: '999px',
                    border: '1px solid var(--border-hairline-dark)',
                    background: 'rgba(246, 241, 233, 0.06)',
                    fontSize: '10px',
                    fontFamily: 'var(--font-utility)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-gold)',
                  }}
                >
                  {cat}
                </span>
              ))}
            </div>

            <h2
              id="stm-case-drawer-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(30px, 4.2vw, 46px)',
                lineHeight: 0.98,
                letterSpacing: '-0.03em',
                margin: 0,
                color: 'var(--text-cream)',
              }}
            >
              {project.name}{' '}
              <i
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontWeight: 400,
                  color: 'var(--accent-gold)',
                  display: 'block',
                  marginTop: '4px',
                  fontSize: '0.86em',
                }}
              >
                {enriched.italicAccent}
              </i>
            </h2>
          </div>

          {/* Band 2: Warm Parchment — The Challenge & Strategic Angle */}
          <div style={{ background: 'var(--bg-parchment)', color: 'var(--text-ink)', padding: '26px 28px' }}>
            <span className="editorial-label" style={{ fontSize: '10px', color: 'var(--accent-terracotta)', display: 'block', marginBottom: '10px' }}>
              01 / The Challenge &amp; Direction
            </span>
            <p style={{ margin: '0 0 14px', fontSize: '14.5px', lineHeight: 1.68, color: 'var(--text-ink)' }}>
              {enriched.challenge}
            </p>
            <p style={{ margin: 0, fontSize: '13.5px', lineHeight: 1.65, color: 'var(--muted)' }}>
              {enriched.strategyNote}
            </p>

            {/* Editorial Pull-Quote (Featured for 13isu & Trends Are a Tool) */}
            {enriched.pullQuote && (
              <blockquote
                style={{
                  margin: '20px 0 0',
                  padding: '18px 20px',
                  borderLeft: '2px solid var(--accent-terracotta)',
                  background: 'var(--bg-parchment-alt)',
                  borderRadius: '0 14px 14px 0',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Quote size={16} style={{ color: 'var(--accent-terracotta)', flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <p
                      style={{
                        margin: '0 0 8px',
                        fontFamily: 'var(--font-editorial)',
                        fontStyle: 'italic',
                        fontSize: '19px',
                        lineHeight: 1.35,
                        color: 'var(--text-ink)',
                      }}
                    >
                      &ldquo;{enriched.pullQuote.text}&rdquo;
                    </p>
                    <span
                      style={{
                        fontFamily: 'var(--font-utility)',
                        fontSize: '10px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--muted)',
                      }}
                    >
                      {enriched.pullQuote.attribution}
                    </span>
                  </div>
                </div>
              </blockquote>
            )}

            {/* Strategic Breakdown Grid (for Trends Are a Tool) */}
            {enriched.strategicBreakdown && (
              <div
                style={{
                  marginTop: '20px',
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '10px',
                }}
              >
                {enriched.strategicBreakdown.map((step) => (
                  <div
                    key={step.label}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-hairline)',
                      background: 'rgba(255, 255, 255, 0.45)',
                    }}
                  >
                    <strong
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-utility)',
                        fontSize: '10.5px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--accent-terracotta)',
                        marginBottom: '4px',
                      }}
                    >
                      {step.label}
                    </strong>
                    <span style={{ fontSize: '13px', lineHeight: 1.55, color: 'var(--text-ink)' }}>
                      {step.detail}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Multi-Image Visual Gallery Strip (for 13isu, Lumora, Trends, etc.) */}
          {enriched.gallery && enriched.gallery.length > 0 && (
            <div
              style={{
                background: 'var(--bg-parchment-alt)',
                padding: '24px 28px',
                borderTop: '1px solid var(--border-hairline)',
                borderBottom: '1px solid var(--border-hairline)',
              }}
            >
              <span className="editorial-label" style={{ fontSize: '10px', color: 'var(--accent-terracotta)', display: 'block', marginBottom: '12px' }}>
                02 / Visual Archive Gallery
              </span>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: enriched.gallery.length > 1 ? 'repeat(auto-fit, minmax(150px, 1fr))' : '1fr',
                  gap: '12px',
                }}
              >
                {enriched.gallery.map((item) => (
                  <figure
                    key={item.src}
                    style={{
                      margin: 0,
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid var(--border-hairline)',
                      background: 'var(--bg-parchment)',
                    }}
                  >
                    <img
                      src={item.src}
                      alt={item.caption}
                      style={{ width: '100%', height: enriched.gallery!.length > 1 ? '140px' : '200px', objectFit: 'cover', display: 'block' }}
                      loading="lazy"
                    />
                    <figcaption
                      style={{
                        padding: '8px 10px',
                        fontSize: '10px',
                        fontFamily: 'var(--font-utility)',
                        color: 'var(--muted)',
                        lineHeight: 1.4,
                      }}
                    >
                      {item.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          )}

          {/* Band 3: Deep Espresso — Architecture & Verified Metrics */}
          <div
            style={{
              background: 'var(--bg-espresso)',
              color: 'var(--text-cream)',
              padding: '24px 28px',
              borderTop: '1px solid var(--border-hairline-dark)',
            }}
          >
            <span className="editorial-label" style={{ fontSize: '10px', color: 'var(--accent-gold)', display: 'block', marginBottom: '12px' }}>
              03 / Deliverables &amp; Commercial Impact
            </span>

            <ul className="capability-pill-list" style={{ marginBottom: '20px' }}>
              {enriched.stack.map((item) => (
                <li
                  key={item}
                  className="capability-pill-tag"
                  style={{
                    background: 'rgba(246, 241, 233, 0.06)',
                    borderColor: 'var(--border-hairline-dark)',
                    color: 'var(--text-cream)',
                  }}
                >
                  <span className="capability-pill-dot" style={{ background: 'var(--accent-gold)' }} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div
              className="stm-drawer-metrics-grid"
              style={{
                borderColor: 'var(--border-hairline-dark)',
                background: 'rgba(246, 241, 233, 0.04)',
              }}
            >
              {enriched.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="stm-drawer-metric-box"
                  style={{ borderColor: 'var(--border-hairline-dark)' }}
                >
                  <strong className="stm-drawer-metric-val" style={{ color: 'var(--accent-gold)' }}>
                    {metric.value}
                  </strong>
                  <span className="stm-drawer-metric-label" style={{ color: 'rgba(246, 241, 233, 0.72)' }}>
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Band 4: Warm Parchment — Action Footer */}
          <div
            className="stm-drawer-footer-cta"
            style={{
              padding: '22px 28px 28px',
              background: 'var(--bg-parchment)',
              borderTop: '1px solid var(--border-hairline)',
              marginTop: 0,
            }}
          >
            <button
              type="button"
              className="stm-btn-terracotta"
              style={{ flex: '1 1 220px' }}
              onClick={() => {
                playWarmClick()
                onBuildLikeThis(enriched.mappedServices, project.name)
              }}
            >
              Build Something Like This <ArrowRight size={14} />
            </button>

            <a
              href={project.targetUrl}
              {...(project.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              onClick={playWarmClick}
              className="button button-outline"
              style={{
                borderRadius: '999px',
                border: '1px solid var(--border-hairline)',
                color: 'var(--text-ink)',
                padding: '14px 20px',
                fontSize: '10.5px',
                letterSpacing: '0.1em',
                justifyContent: 'center',
              }}
            >
              Full Editorial Spread <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
