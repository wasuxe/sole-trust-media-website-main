import { ArrowUpRight, Mail, MapPin, Plus } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import SiteNav from '@/components/site-nav'
import SiteFooter from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'From brand strategy to custom web applications — explore the full range of creative, marketing and technology services offered by Sole Trust Media.',
}

const serviceCategories = [
  {
    index: '01',
    heading: 'Brand Strategy & Identity',
    description:
      'We build the foundations that everything else stands on. A clear brand strategy means you know exactly who you are, who you serve, and why you are the obvious choice.',
    services: [
      'Brand Strategy & Positioning',
      'Visual Identity & Logo Design',
      'Brand Guidelines & Systems',
      'Naming & Messaging',
      'Brand Audits & Refresh',
      'Creative Direction',
    ],
    value:
      'A brand that is impossible to ignore — and impossible to replace.',
  },
  {
    index: '02',
    heading: 'Social Media & Content',
    description:
      'Consistent, creative content that earns attention. We plan, produce and manage your social presence so your brand stays visible and relevant every day.',
    services: [
      'Social Media Strategy',
      'Content Planning & Calendars',
      'Post Design & Copywriting',
      'Community Management',
      'Influencer & Creator Strategy',
      'Photography & Videography',
    ],
    value:
      'An engaged audience that grows because your content genuinely earns it.',
  },
  {
    index: '03',
    heading: 'Performance Marketing',
    description:
      'Paid media that actually converts. We run data-driven campaigns across the platforms that matter most for your business — optimised continuously for maximum return.',
    services: [
      'Meta Ads (Instagram / Facebook)',
      'Google Search & Display',
      'YouTube Advertising',
      'Funnel & Landing Page Strategy',
      'Campaign Analytics & Reporting',
      'Retargeting & Audience Segmentation',
    ],
    value:
      'Every rupee tracked. Every campaign accountable.',
  },
  {
    index: '04',
    heading: 'Web & Digital Experience',
    description:
      'Websites and e-commerce stores built to earn trust and drive action. From architecture to animation, we craft digital experiences that reflect the quality of your brand.',
    services: [
      'Website Design & Development',
      'E-commerce (Shopify / Custom)',
      'UI/UX Design & Prototyping',
      'Landing Pages & Microsites',
      'SEO & AI Search Visibility',
      'Website Audits & Optimisation',
    ],
    value:
      'A digital presence that works as hard as the rest of your business.',
  },
  {
    index: '05',
    heading: 'Business Automation',
    description:
      'Smart systems that give your team time back. We automate the repetitive, connect your tools and build workflows that let you focus on what actually moves the needle.',
    services: [
      'CRM Setup & Automation',
      'Email & WhatsApp Flows',
      'Lead Capture & Nurture Systems',
      'Zapier / Make / n8n Workflows',
      'Internal Tool Integrations',
      'Reporting Dashboards',
    ],
    value:
      'Less busywork. More business.',
  },
  {
    index: '06',
    heading: 'Custom Web Applications',
    description:
      'When off-the-shelf does not cut it, we build it. Custom applications that solve your specific operational problems — designed cleanly, built to scale.',
    services: [
      'Custom SaaS Products',
      'Client & Partner Portals',
      'Internal Operations Tools',
      'API Design & Integration',
      'Database Architecture',
      'Ongoing Development & Support',
    ],
    value:
      'Software that fits your business — not the other way around.',
  },
]

export default function ServicesPage() {
  return (
    <main className="site-shell">
      <SiteNav />

      {/* Hero */}
      <section style={{ padding: '190px 10vw 110px', borderBottom: '1px solid var(--line)' }}>
        <p className="eyebrow">04 / What we do</p>
        <h1
          style={{
            fontSize: 'clamp(70px, 11vw, 150px)',
            lineHeight: 0.88,
            letterSpacing: '-0.08em',
            margin: '30px 0',
            fontWeight: 600,
          }}
        >
          Many disciplines.
          <br />
          <i style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}>One point of view.</i>
        </h1>
        <p style={{ color: 'var(--muted)', maxWidth: 460, lineHeight: 1.7, fontSize: 15, margin: 0 }}>
          From the first spark to the final pixel, we build connected brand systems — creative, digital
          and operational — that work in the real world.
        </p>
      </section>

      {/* Service Categories */}
      {serviceCategories.map((cat) => (
        <section
          key={cat.index}
          className="section-grid"
          style={{ alignItems: 'start' }}
        >
          <div className="section-label">{cat.index}</div>
          <div>
            <h2
              style={{
                fontSize: 'clamp(42px, 5.5vw, 80px)',
                lineHeight: 0.92,
                letterSpacing: '-0.065em',
                marginTop: 0,
                marginBottom: 24,
                fontWeight: 600,
              }}
            >
              {cat.heading}
            </h2>
            <p style={{ color: 'var(--muted)', maxWidth: 540, lineHeight: 1.75, fontSize: 15, margin: '0 0 50px' }}>
              {cat.description}
            </p>

            {/* Service list */}
            <div className="service-list" style={{ maxWidth: 700, marginBottom: 40 }}>
              {cat.services.map((service, i) => (
                <div className="service-row" key={service}>
                  <span>0{i + 1}</span>
                  <h3>{service}</h3>
                  <Plus />
                </div>
              ))}
            </div>

            {/* Value proposition */}
            <div
              style={{
                borderTop: '1px solid var(--line)',
                paddingTop: 28,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <span
                style={{
                  font: "10px 'DM Mono', monospace",
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--muted)',
                  flexShrink: 0,
                }}
              >
                The result
              </span>
              <p
                style={{
                  margin: 0,
                  fontStyle: 'italic',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(18px, 2vw, 26px)',
                  letterSpacing: '-0.03em',
                  color: 'var(--brown)',
                }}
              >
                {cat.value}
              </p>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section
        className="statement"
        style={{ padding: '130px 4vw 115px' }}
      >
        <p>Ready to build something?</p>
        <h2 style={{ fontSize: 'clamp(72px, 10vw, 150px)', margin: '35px 0 0' }}>
          Let&apos;s make it{' '}
          <i style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}>real.</i>
        </h2>
        <div style={{ marginTop: 55, display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link className="button button-light" href="/contact">
            Start a project <ArrowUpRight data-icon="inline-end" />
          </Link>
          <Link
            className="text-link"
            href="/work"
            style={{ color: 'var(--cream)', borderColor: 'rgba(242,236,227,.4)' }}
          >
            See our work <ArrowUpRight data-icon="inline-end" />
          </Link>
        </div>
      </section>

      {/* Contact detail strip */}
      <section
        style={{
          background: 'var(--dark)',
          color: 'var(--cream)',
          padding: '45px 4vw',
          borderTop: '1px solid rgba(242,236,227,.12)',
        }}
      >
        <div
          className="contact-details"
          style={{ maxWidth: 1100, margin: 'auto', marginTop: 0 }}
        >
          <a href="mailto:support@soletrustmedia.agency">
            <Mail /> support@soletrustmedia.agency
          </a>
          <span>
            <MapPin /> 560066, Whitefield, Bengaluru, India
          </span>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
