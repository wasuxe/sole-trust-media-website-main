import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import SiteNav from '@/components/site-nav'
import SiteFooter from '@/components/site-footer'
import CopyEmailLink from '@/components/copy-email-link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Sole Trust Media collects, safeguards, and uses enquiry and client information across soletrustmedia.agency.',
  alternates: {
    canonical: 'https://soletrustmedia.agency/privacy',
  },
}

const SECTIONS = [
  {
    num: '01',
    title: 'Information We Collect',
    body: [
      'When you submit a project brief, configure an engagement scope, or contact Sole Trust Media through soletrustmedia.agency, we collect only the details you voluntarily provide — including your name, business or brand name, email address, phone or WhatsApp number, selected service disciplines, and project description.',
      'We may also collect anonymized, cookieless performance and page-view telemetry via Vercel Analytics to maintain site speed, accessibility, and technical reliability.',
    ],
  },
  {
    num: '02',
    title: 'How We Use Your Information',
    body: [
      'Your enquiry details are used solely to review your brief, prepare tailored strategic proposals, communicate with you regarding potential or active engagements, and improve our studio services.',
      'We never sell, rent, or trade your personal or company information to third-party data brokers or external marketing lists.',
    ],
  },
  {
    num: '03',
    title: 'Infrastructure & Trusted Processors',
    body: [
      'To deliver enquiries reliably to our studio directors, submitted form payloads may be processed through secure infrastructure providers including Vercel, Supabase, and our transactional email forwarders. Each processor handles data strictly to fulfill your request.',
    ],
  },
  {
    num: '04',
    title: 'Data Retention & Confidentiality',
    body: [
      'All project briefs, strategic notes, and brand materials shared during discovery or active engagements are treated as strictly confidential. We retain enquiry records only as long as reasonably required to manage client correspondence, legal obligations, and ongoing studio partnerships.',
    ],
  },
  {
    num: '05',
    title: 'Your Rights & Data Requests',
    body: [
      'You may request access to, correction of, or permanent deletion of any personal information you have submitted to Sole Trust Media at any time by writing directly to admin@soletrustmedia.agency. We honor verified requests promptly within 7 business days.',
    ],
  },
] as const

export default function PrivacyPolicyPage() {
  return (
    <main className="site-shell">
      <SiteNav />

      {/* Deep Espresso Editorial Hero */}
      <section
        style={{
          background: 'var(--bg-espresso)',
          color: 'var(--text-cream)',
          padding: 'clamp(112px, 11vw, 152px) var(--page-gutter) clamp(44px, 5vw, 68px)',
          borderBottom: '1px solid var(--border-hairline-dark)',
        }}
      >
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          <Link
            href="/"
            className="text-link"
            style={{
              color: 'var(--accent-gold)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px',
            }}
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <p className="editorial-label" style={{ color: 'var(--accent-gold)', margin: '0 0 12px' }}>
            * Legal &amp; Data Governance · Effective 2026
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 6vw, 84px)',
              lineHeight: 0.96,
              letterSpacing: '-0.04em',
              margin: '0 0 18px',
              color: 'var(--text-cream)',
            }}
          >
            Privacy{' '}
            <i style={{ fontFamily: 'var(--font-editorial)', fontWeight: 400, color: 'var(--accent-gold)' }}>
              Policy.
            </i>
          </h1>
          <p style={{ maxWidth: '600px', fontSize: '15px', lineHeight: 1.65, color: 'rgba(246, 241, 233, 0.76)', margin: 0 }}>
            Sole Trust Media respects your privacy and safeguards every brand brief, strategy document, and enquiry shared with our Bengaluru studio.
          </p>
        </div>
      </section>

      {/* Warm Parchment Policy Content */}
      <section
        style={{
          background: 'var(--bg-parchment)',
          color: 'var(--text-ink)',
          padding: 'clamp(48px, 6vw, 84px) var(--page-gutter)',
        }}
      >
        <div style={{ maxWidth: '1040px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0' }}>
          {SECTIONS.map((sec) => (
            <article
              key={sec.num}
              className="section-grid"
              style={{
                padding: 'clamp(28px, 4vw, 40px) 0',
                borderBottom: '1px solid var(--border-hairline)',
                alignItems: 'start',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-utility)',
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  color: 'var(--accent-terracotta)',
                  fontWeight: 700,
                }}
              >
                {sec.num} / 05
              </div>
              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(22px, 2.8vw, 32px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.025em',
                    margin: '0 0 14px',
                    color: 'var(--text-ink)',
                  }}
                >
                  {sec.title}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '680px' }}>
                  {sec.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      style={{
                        margin: 0,
                        fontSize: '15px',
                        lineHeight: 1.72,
                        color: 'var(--muted)',
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ))}

          {/* Direct Privacy Contact Box */}
          <div
            style={{
              marginTop: '40px',
              padding: 'clamp(24px, 4vw, 36px)',
              borderRadius: '20px',
              background: 'var(--bg-parchment-alt)',
              border: '1px solid var(--border-hairline)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
            }}
          >
            <div>
              <span className="editorial-label" style={{ color: 'var(--accent-terracotta)', fontSize: '10px', display: 'block', marginBottom: '8px' }}>
                * Privacy Inquiries · Bengaluru HQ
              </span>
              <p style={{ margin: '0 0 12px', fontSize: '15px', color: 'var(--text-ink)', maxWidth: '480px', lineHeight: 1.6 }}>
                Questions regarding data handling or NDA-protected submissions? Contact our directors directly.
              </p>
              <CopyEmailLink tone="light" />
            </div>
            <Link href="/terms" className="stm-btn-terracotta">
              Terms of Engagement <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
