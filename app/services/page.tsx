import { ArrowUpRight, Mail, MapPin, Plus } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import SiteNav from '@/components/site-nav'
import SiteFooter from '@/components/site-footer'

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
      'We define why your brand matters, who it serves, and the singular positioning that makes competitors irrelevant. From visual identity systems and typography to packaging and unboxing.',
    services: [
      'Brand Strategy & Market Positioning',
      'Visual Identity & Logo Systems',
      'Design Systems & Brand Guidelines',
      'Packaging & Product Presentation',
      'Brand Voice, Messaging & Copywriting',
      'Brand Audits & Identity Evolution',
    ],
    value:
      'A brand that commands pricing power, builds unshakeable customer loyalty, and is impossible to ignore.',
  },
  {
    index: '02',
    heading: 'Creative Direction & Content Production',
    tagline: 'High-craft visuals, campaigns & editorial storytelling',
    description:
      'Consistent, campaign-level creative direction and short-form video production that earn genuine attention. We plan, direct, and produce content that keeps your brand relevant and aspirational every single day.',
    services: [
      'Creative Direction & Campaign Concepts',
      'Viral Short-Form Video & Instagram Reels',
      'Editorial Photography & Art Direction',
      'Brand Films & Commercial Video Production',
      'Social Media Visual Frameworks',
      'Motion Design & Kinetic Assets',
    ],
    value:
      'An engaged audience that converts because your content genuinely earns their respect and trust.',
  },
  {
    index: '03',
    heading: 'Digital Experiences & Websites',
    tagline: 'Bespoke digital flagships & interactive web platforms',
    description:
      'Websites and digital experiences built to earn immediate trust and drive commercial action. From micro-interactions to modern App Router architectures, we craft digital platforms that reflect the true caliber of your business.',
    services: [
      'High-Performance Digital Flagships',
      'Bespoke Web Applications (Next.js / React)',
      'Creative E-commerce Stores (Shopify / Headless)',
      'UI/UX Architecture & Design Systems',
      'Interactive 3D & WebGL Experiences',
      'Technical SEO, Core Web Vitals & Accessibility',
    ],
    value:
      'A digital flagship that converts cold visitors into qualified, high-intent client enquiries.',
  },
  {
    index: '04',
    heading: 'Marketing & Business Growth',
    tagline: 'Data-led acquisition, social commerce & funnel telemetry',
    description:
      'Paid media and inbound acquisition architectures that actually convert. We run disciplined, telemetry-backed campaigns across the platforms that matter most — continuously optimized for measurable customer lifetime value.',
    services: [
      'Meta Ads (Instagram & Facebook Growth)',
      'Google Search & High-Intent Performance',
      'Social Commerce & Inbound Funnel Design',
      'Funnel Telemetry & Conversion Rate Optimization (CRO)',
      'Audience Segmentation & Retention Systems',
      'Omnichannel Acquisition Strategy',
    ],
    value:
      'Every rupee tracked. Lower customer acquisition cost. Scalable, repeatable commercial return.',
  },
  {
    index: '05',
    heading: 'Technology & Business Automation',
    tagline: 'Intelligent systems, workflow automation & custom software',
    description:
      'Smart operational pipelines that give your team time back. We eliminate repetitive friction, integrate your CRM and lead databases, and deploy AI assistants that ensure no prospective customer is ever left waiting.',
    services: [
      'Inbound Lead Capture & CRM Routing',
      'WhatsApp & Email Qualification Workflows',
      'AI Assistants & Custom Agentic Workflows',
      'Custom SaaS & Internal Operations Portals',
      'API Integrations & Webhook Telemetry',
      'Automated Reporting & Client Dashboards',
    ],
    value:
      'Zero dropped enquiries. Sub-one-hour lead response times. Scalable infrastructure without bloated headcount.',
  },
]

export default function ServicesPage() {
  return (
    <main className="site-shell">
      <SiteNav />

      {/* Hero */}
      <section className="services-page-hero" style={{ paddingTop: '170px' }}>
        <p className="eyebrow">01 / Capabilities &amp; Services</p>
        <h1 className="services-page-title">
          Many disciplines.
          <br />
          <i>One point of view.</i>
        </h1>
        <p className="services-page-description">
          From brand strategy and visual craft to digital engineering and automated growth pipelines — we build connected brand systems that work with uncompromising authority in the real world.
        </p>
      </section>

      {/* Service Categories */}
      {serviceCategories.map((cat) => (
        <section
          key={cat.index}
          className="section-grid"
          style={{ alignItems: 'start', padding: '100px 4vw' }}
        >
          <div className="section-label">
            <span style={{ fontSize: '13px', fontFamily: 'var(--font-utility)', color: 'var(--brown)', fontWeight: 700 }}>
              {cat.index}
            </span>
          </div>
          <div>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-utility)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>
              {cat.tagline}
            </span>
            <h2 className="services-category-title" style={{ fontSize: 'clamp(32px, 4.5vw, 60px)', margin: '0 0 20px', lineHeight: 1.1 }}>
              {cat.heading}
            </h2>
            <p className="services-category-description" style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--muted)', maxWidth: '640px', margin: '0 0 40px' }}>
              {cat.description}
            </p>

            {/* Service list */}
            <div className="service-list" style={{ borderTop: '1px solid var(--line)', marginBottom: '36px' }}>
              {cat.services.map((service, i) => (
                <div
                  className="service-row"
                  key={service}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '20px 0',
                    borderBottom: '1px solid var(--line)',
                  }}
                >
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-utility)', color: 'var(--brown)', minWidth: '24px' }}>
                    0{i + 1}
                  </span>
                  <h3 style={{ margin: 0, fontSize: 'clamp(18px, 2.2vw, 28px)', fontWeight: 500, flex: 1, fontFamily: 'var(--font-display)' }}>
                    {service}
                  </h3>
                  <Plus size={18} style={{ color: 'var(--muted)' }} />
                </div>
              ))}
            </div>

            {/* Value proposition */}
            <div
              className="service-value"
              style={{
                background: 'var(--cream-deep)',
                border: '1px solid rgba(75, 48, 39, 0.15)',
                borderRadius: '16px',
                padding: '24px 28px',
                maxWidth: '700px',
              }}
            >
              <span
                className="service-value-label"
                style={{
                  fontFamily: 'var(--font-utility)',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--brown)',
                  fontWeight: 700,
                  display: 'block',
                  marginBottom: '6px',
                }}
              >
                The Commercial Impact
              </span>
              <p
                className="service-value-copy"
                style={{
                  margin: 0,
                  fontSize: '15px',
                  lineHeight: 1.6,
                  color: 'var(--dark)',
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{cat.value}&rdquo;
              </p>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="statement services-cta" style={{ background: 'var(--brown)', color: 'var(--cream)', padding: '140px 4vw 120px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-utility)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.8 }}>
          Ready to build something?
        </p>
        <h2 className="services-cta-title" style={{ fontSize: 'clamp(44px, 7vw, 96px)', margin: '24px 0 36px', lineHeight: 1.05 }}>
          Let&apos;s make it{' '}
          <i>enduring.</i>
        </h2>
        <div className="services-cta-actions" style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <Link className="button button-light" href="/contact">
            Start a project <ArrowUpRight size={14} />
          </Link>
          <Link
            className="button button-outline"
            href="/work"
            style={{ color: 'var(--cream)', borderColor: 'rgba(243, 235, 221, 0.4)' }}
          >
            Explore Selected Work <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      {/* Contact detail strip */}
      <section
        style={{
          background: 'var(--dark)',
          color: 'var(--cream)',
          padding: '45px 4vw',
          borderTop: '1px solid rgba(243, 235, 221, 0.12)',
        }}
      >
        <div
          className="contact-details"
          style={{ maxWidth: 1100, margin: 'auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', fontSize: '12px', fontFamily: 'var(--font-utility)' }}
        >
          <a href="mailto:support@soletrustmedia.agency" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit' }}>
            <Mail size={14} /> support@soletrustmedia.agency
          </a>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={14} /> 560066, Whitefield, Bengaluru, India
          </span>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
