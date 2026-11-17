import { ArrowUpRight, MapPin } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import SiteNav from '@/components/site-nav'
import SiteFooter from '@/components/site-footer'
import { CapabilityMiniDemo } from '@/components/capability-demos'
import { MethodologyProgressBeam } from '@/components/kinetic-scroll-polish'
import { MotionWrapper, AnimatedHairline } from '@/components/MotionWrapper'
import CopyEmailLink from '@/components/copy-email-link'
import ServicesMobileAccordion from '@/components/services-mobile-accordion'

export const metadata: Metadata = {
  title: 'Capabilities',
  description:
    'From brand strategy and visual identity to high-performance web applications and automated growth systems — explore the capabilities of Sole Trust Media.',
}

const serviceCategories = [
  {
    index: '01',
    heading: 'Brand Strategy & Identity',
    tagline: 'Positioning, visual architecture & brand foundations',
    description:
      'We define why your brand matters, who it serves, and the singular positioning that makes competitors irrelevant — from visual identity systems and typography to tactile packaging.',
    services: [
      'Brand Positioning & Strategy',
      'Visual Identity & Logo Systems',
      'Design Systems & Guidelines',
      'Packaging & Product Presentation',
      'Brand Voice & Messaging',
      'Identity Evolution',
    ],
    value:
      'A brand that commands authority, builds unshakeable customer loyalty, and is impossible to ignore.',
    hasDemo: true,
  },
  {
    index: '02',
    heading: 'Creative Direction & Content',
    tagline: 'High-craft visuals, campaigns & editorial storytelling',
    description:
      'Campaign-level creative direction and short-form video production engineered to earn genuine attention and keep your brand culturally aspirational every week.',
    services: [
      'Creative Direction & Campaigns',
      'Viral Short-Form Video & Reels',
      'Editorial Photography',
      'Brand Films & Motion',
      'Social Visual Frameworks',
      'Packaging Art Direction',
    ],
    value:
      'An engaged audience that converts because your content genuinely earns their respect and trust.',
    hasDemo: false,
  },
  {
    index: '03',
    heading: 'Digital Experiences & Websites',
    tagline: 'Bespoke digital flagships & interactive web platforms',
    description:
      'High-contrast websites and Next.js platforms built to earn immediate authority and drive commercial action — blending sub-second performance with editorial craft.',
    services: [
      'High-Performance Flagships',
      'Next.js & React Web Apps',
      'Creative E-Commerce',
      'UI/UX Design Systems',
      'Interactive Motion & 3D',
      'Technical SEO & Web Vitals',
    ],
    value:
      'A digital flagship that converts cold visitors into qualified, high-intent client enquiries.',
    hasDemo: true,
  },
  {
    index: '04',
    heading: 'Marketing & Business Growth',
    tagline: 'Data-led acquisition, social commerce & funnel telemetry',
    description:
      'Disciplined, telemetry-backed paid acquisition and inbound funnel architectures continuously optimized for qualified demand and customer lifetime value.',
    services: [
      'Meta & Instagram Growth',
      'Google High-Intent Search',
      'Social Commerce Funnels',
      'Conversion Optimization (CRO)',
      'Retention Architecture',
      'Omnichannel Telemetry',
    ],
    value:
      'Every metric tracked. Lower acquisition friction. Scalable, repeatable commercial momentum.',
    hasDemo: false,
  },
  {
    index: '05',
    heading: 'Technology & Business Automation',
    tagline: 'Intelligent systems, workflow automation & custom software',
    description:
      'Smart operational pipelines that give your team time back — integrating CRM routing, AI qualification workflows, and custom dashboards so no enquiry is ever dropped.',
    services: [
      'Inbound Lead Capture & CRM',
      'WhatsApp & Email Workflows',
      'AI Assistants & Agent Flows',
      'Custom Operations Portals',
      'API & Webhook Telemetry',
      'Automated Client Dashboards',
    ],
    value:
      'Zero dropped enquiries. Sub-one-hour response times. Scalable infrastructure without bloated headcount.',
    hasDemo: true,
  },
]

export default function ServicesPage() {
  return (
    <main className="site-shell">
      <SiteNav />

      {/* Compact Editorial Hero (Warm Parchment) */}
      <section
        style={{
          padding: 'clamp(110px, 11vw, 144px) var(--page-gutter) clamp(40px, 5vw, 60px)',
          background: 'var(--bg-parchment)',
          color: 'var(--text-ink)',
        }}
      >
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          <MotionWrapper>
            <p className="editorial-label" style={{ color: 'var(--accent-terracotta)', margin: '0 0 12px' }}>
              * 01 / Capabilities &amp; Disciplines
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: '20px',
              }}
            >
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(44px, 6.4vw, 92px)',
                  lineHeight: 0.94,
                  letterSpacing: '-0.04em',
                  margin: 0,
                  color: 'var(--text-ink)',
                }}
              >
                Many disciplines.{' '}
                <i
                  style={{
                    fontFamily: 'var(--font-editorial)',
                    fontWeight: 400,
                    color: 'var(--accent-terracotta)',
                  }}
                >
                  One point of view.
                </i>
              </h1>
              <p style={{ maxWidth: '420px', fontSize: '15px', lineHeight: 1.6, color: 'var(--muted)', margin: 0 }}>
                Five integrated creative-technology disciplines with interactive studio specimens — engineered to move brands from invisible to unforgettable.
              </p>
            </div>
          </MotionWrapper>
          <AnimatedHairline style={{ marginTop: '28px' }} />
        </div>
      </section>

      {/* Mobile (< 768px): Collapsible 5-Pillar Editorial Accordion */}
      <section className="stm-services-mobile-band">
        <ServicesMobileAccordion pillars={serviceCategories} />
      </section>

      {/* Desktop / Tablet (>= 768px): Tight Alternating Warm Parchment & Deep Espresso 5-Pillar Bands */}
      <div className="stm-services-desktop-bands">
      {serviceCategories.map((cat, idx) => {
        const isDark = idx % 2 === 1
        return (
          <section
            key={cat.index}
            style={{
              padding: 'clamp(42px, 5vw, 68px) var(--page-gutter)',
              background: isDark ? 'var(--bg-espresso)' : idx === 0 ? 'var(--bg-parchment)' : 'var(--bg-parchment-alt)',
              color: isDark ? 'var(--text-cream)' : 'var(--text-ink)',
              borderTop: isDark ? '1px solid var(--border-hairline-dark)' : '1px solid var(--border-hairline)',
            }}
          >
            <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
              <MotionWrapper>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: cat.hasDemo ? 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))' : 'minmax(120px, 160px) 1fr',
                    gap: 'clamp(24px, 4vw, 52px)',
                    alignItems: 'start',
                  }}
                >
                  {/* Left Copy Column (or Index + Content) */}
                  {cat.hasDemo ? (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontFamily: 'var(--font-utility)',
                            color: isDark ? 'var(--accent-gold)' : 'var(--accent-terracotta)',
                            fontWeight: 700,
                          }}
                        >
                          {cat.index} / 05
                        </span>
                        <span
                          className="editorial-label"
                          style={{
                            fontSize: '10px',
                            color: isDark ? 'rgba(246, 241, 233, 0.65)' : 'var(--muted)',
                          }}
                        >
                          * {cat.tagline}
                        </span>
                      </div>
                      <h2
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(28px, 3.6vw, 46px)',
                          margin: '0 0 14px',
                          lineHeight: 1.02,
                          letterSpacing: '-0.03em',
                          color: isDark ? 'var(--text-cream)' : 'var(--text-ink)',
                        }}
                      >
                        {cat.heading}
                      </h2>
                      <p
                        style={{
                          fontSize: '14.5px',
                          lineHeight: 1.65,
                          color: isDark ? 'rgba(246, 241, 233, 0.74)' : 'var(--muted)',
                          margin: '0 0 20px',
                        }}
                      >
                        {cat.description}
                      </p>

                      <ul className="capability-pill-list" aria-label={`${cat.heading} deliverables`} style={{ marginBottom: '20px' }}>
                        {cat.services.map((service) => (
                          <li
                            key={service}
                            className="capability-pill-tag"
                            style={
                              isDark
                                ? {
                                    background: 'rgba(246, 241, 233, 0.06)',
                                    borderColor: 'var(--border-hairline-dark)',
                                    color: 'var(--text-cream)',
                                  }
                                : undefined
                            }
                          >
                            <span
                              className="capability-pill-dot"
                              style={isDark ? { background: 'var(--accent-gold)' } : undefined}
                              aria-hidden="true"
                            />
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>

                      <p
                        style={{
                          margin: 0,
                          fontSize: '13.5px',
                          lineHeight: 1.55,
                          fontStyle: 'italic',
                          color: isDark ? 'var(--accent-gold)' : 'var(--text-ink)',
                          borderLeft: `2px solid ${isDark ? 'var(--accent-gold)' : 'var(--accent-terracotta)'}`,
                          paddingLeft: '14px',
                        }}
                      >
                        &ldquo;{cat.value}&rdquo;
                      </p>
                    </div>
                  ) : (
                    <>
                      <div>
                        <span
                          style={{
                            fontSize: '12px',
                            fontFamily: 'var(--font-utility)',
                            color: isDark ? 'var(--accent-gold)' : 'var(--accent-terracotta)',
                            fontWeight: 700,
                            display: 'block',
                          }}
                        >
                          {cat.index} / 05
                        </span>
                      </div>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                          gap: '24px',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          <span
                            className="editorial-label"
                            style={{
                              fontSize: '10px',
                              color: isDark ? 'var(--accent-gold)' : 'var(--muted)',
                              display: 'block',
                              marginBottom: '8px',
                            }}
                          >
                            * {cat.tagline}
                          </span>
                          <h2
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: 'clamp(28px, 3.6vw, 46px)',
                              margin: '0 0 12px',
                              lineHeight: 1.02,
                              letterSpacing: '-0.03em',
                              color: isDark ? 'var(--text-cream)' : 'var(--text-ink)',
                            }}
                          >
                            {cat.heading}
                          </h2>
                          <p
                            style={{
                              fontSize: '14.5px',
                              lineHeight: 1.65,
                              color: isDark ? 'rgba(246, 241, 233, 0.74)' : 'var(--muted)',
                              margin: 0,
                            }}
                          >
                            {cat.description}
                          </p>
                        </div>

                        <div>
                          <ul className="capability-pill-list" aria-label={`${cat.heading} deliverables`} style={{ marginBottom: '16px' }}>
                            {cat.services.map((service) => (
                              <li
                                key={service}
                                className="capability-pill-tag"
                                style={
                                  isDark
                                    ? {
                                        background: 'rgba(246, 241, 233, 0.06)',
                                        borderColor: 'var(--border-hairline-dark)',
                                        color: 'var(--text-cream)',
                                      }
                                    : undefined
                                }
                              >
                                <span
                                  className="capability-pill-dot"
                                  style={isDark ? { background: 'var(--accent-gold)' } : undefined}
                                  aria-hidden="true"
                                />
                                <span>{service}</span>
                              </li>
                            ))}
                          </ul>
                          <p
                            style={{
                              margin: 0,
                              fontSize: '13.5px',
                              lineHeight: 1.55,
                              fontStyle: 'italic',
                              color: isDark ? 'var(--accent-gold)' : 'var(--text-ink)',
                              borderLeft: `2px solid ${isDark ? 'var(--accent-gold)' : 'var(--accent-terracotta)'}`,
                              paddingLeft: '14px',
                            }}
                          >
                            &ldquo;{cat.value}&rdquo;
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Embedded Interactive Live Mini-Demo (Pillars 01, 03, 05) */}
                  {cat.hasDemo && (
                    <div>
                      <CapabilityMiniDemo pillarIndex={cat.index} />
                    </div>
                  )}
                </div>
              </MotionWrapper>
            </div>
          </section>
        )
      })}
      </div>

      {/* Deep Espresso Delivery Architecture & Animated 1px Methodology Progress Beam */}
      <section
        style={{
          background: 'var(--bg-espresso)',
          color: 'var(--text-cream)',
          padding: 'clamp(52px, 6vw, 84px) var(--page-gutter)',
          borderTop: '1px solid var(--border-hairline-dark)',
        }}
      >
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          <MotionWrapper>
            <p className="editorial-label" style={{ color: 'var(--accent-gold)', margin: '0 0 10px' }}>
              * 02 / Studio Delivery Architecture
            </p>
            <h2
              style={{
                fontSize: 'clamp(36px, 4.8vw, 66px)',
                lineHeight: 0.96,
                margin: 0,
                fontFamily: 'var(--font-display)',
                color: 'var(--text-cream)',
              }}
            >
              How strategy becomes{' '}
              <i style={{ fontFamily: 'var(--font-editorial)', fontWeight: 400, color: 'var(--accent-gold)' }}>
                velocity.
              </i>
            </h2>
          </MotionWrapper>
          <MethodologyProgressBeam tone="dark" />
        </div>
      </section>

      {/* Compact Warm Parchment Sand CTA + Direct Studio Contact */}
      <section
        style={{
          background: 'var(--bg-parchment-alt)',
          color: 'var(--text-ink)',
          padding: 'clamp(52px, 6vw, 84px) var(--page-gutter)',
          textAlign: 'center',
          borderTop: '1px solid var(--border-hairline)',
        }}
      >
        <MotionWrapper>
          <p className="editorial-label" style={{ color: 'var(--accent-terracotta)', margin: '0 0 12px' }}>
            * 03 / Ready to build something?
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 6vw, 84px)',
              margin: '0 0 26px',
              lineHeight: 0.98,
              color: 'var(--text-ink)',
            }}
          >
            Let&apos;s make it{' '}
            <i style={{ fontFamily: 'var(--font-editorial)', fontWeight: 400, color: 'var(--accent-terracotta)' }}>
              enduring.
            </i>
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <Link className="stm-btn-terracotta" href="/contact">
              Request Custom Proposal <ArrowUpRight size={14} />
            </Link>
            <Link
              className="button button-outline"
              href="/work"
              style={{ color: 'var(--text-ink)', borderColor: 'var(--border-hairline)' }}
            >
              Explore Selected Work <ArrowUpRight size={14} />
            </Link>
          </div>

          <div
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              paddingTop: '22px',
              borderTop: '1px solid var(--border-hairline)',
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '24px',
              fontSize: '12px',
              fontFamily: 'var(--font-utility)',
              color: 'var(--muted)',
            }}
          >
            <CopyEmailLink tone="light" size="sm" />
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={13} /> 560066, Whitefield, Bengaluru, India
            </span>
          </div>
        </MotionWrapper>
      </section>

      <SiteFooter />
    </main>
  )
}
