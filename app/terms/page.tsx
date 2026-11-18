import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import SiteNav from '@/components/site-nav'
import SiteFooter from '@/components/site-footer'
import CopyEmailLink from '@/components/copy-email-link'

export const metadata: Metadata = {
  title: 'Terms of Engagement',
  description:
    'Standard studio terms governing creative strategy, design, web engineering, and growth partnerships with Sole Trust Media.',
  alternates: {
    canonical: 'https://soletrustmedia.agency/terms',
  },
}

const TERMS = [
  {
    num: '01',
    title: 'Scope, Proposals & Commencement',
    body: [
      'Every commission with Sole Trust Media begins with a mutually approved written Proposal or Statement of Work (SOW) defining exact deliverables, sprint milestones, review cycles, and timelines.',
      'Project kickoff takes effect upon formal proposal sign-off and receipt of the agreed commencement milestone. Requests outside the defined SOW are scoped transparently as an addendum before execution.',
    ],
  },
  {
    num: '02',
    title: 'Client Collaboration & Timelines',
    body: [
      'Great work relies on clear, timely partnership. Estimated delivery timelines depend on prompt access to brand assets, decision-maker feedback, and required credentials (such as domains, hosting, or ad accounts).',
      'Extended pauses in client feedback may shift subsequent sprint dates proportionally to preserve craft quality across our studio schedule.',
    ],
  },
  {
    num: '03',
    title: 'Intellectual Property & Showcase Rights',
    body: [
      'Upon full settlement of agreed project invoices, full commercial ownership and intellectual property rights for final approved client deliverables transfer cleanly to the client (excluding third-party open-source libraries, licensed typefaces, or pre-existing studio frameworks).',
      'Unless restricted by a mutual Non-Disclosure Agreement (NDA), Sole Trust Media retains the right to showcase completed work and verified case study outcomes within our portfolio and credentials.',
    ],
  },
  {
    num: '04',
    title: 'Confidentiality & Mutual NDA',
    body: [
      'Both Sole Trust Media and the client agree to keep proprietary business information, product roadmaps, unpublished creative assets, and commercial metrics strictly confidential.',
      'We gladly execute standalone mutual NDAs prior to deep strategic discovery upon request.',
    ],
  },
  {
    num: '05',
    title: 'Website Use & Governing Jurisdiction',
    body: [
      'All original copy, typography systems, visual compositions, case studies, and interactive code published on soletrustmedia.agency are the intellectual property of Sole Trust Media and may not be reproduced without written permission.',
      'These terms are governed by the laws of India, with primary jurisdiction in Bengaluru, Karnataka.',
    ],
  },
] as const

export default function TermsOfEngagementPage() {
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
            * Studio Standards &amp; Governance · Effective 2026
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
            Terms of{' '}
            <i style={{ fontFamily: 'var(--font-editorial)', fontWeight: 400, color: 'var(--accent-gold)' }}>
              Engagement.
            </i>
          </h1>
          <p style={{ maxWidth: '620px', fontSize: '15px', lineHeight: 1.65, color: 'rgba(246, 241, 233, 0.76)', margin: 0 }}>
            Clear, founder-friendly principles defining how Sole Trust Media scopes, crafts, delivers, and protects client partnerships.
          </p>
        </div>
      </section>

      {/* Warm Parchment Terms Content */}
      <section
        style={{
          background: 'var(--bg-parchment)',
          color: 'var(--text-ink)',
          padding: 'clamp(48px, 6vw, 84px) var(--page-gutter)',
        }}
      >
        <div style={{ maxWidth: '1040px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0' }}>
          {TERMS.map((item) => (
            <article
              key={item.num}
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
                {item.num} / 05
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
                  {item.title}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '680px' }}>
                  {item.body.map((paragraph) => (
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

          {/* Direct Engagement CTA Box */}
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
                * Ready to Commission Work?
              </span>
              <p style={{ margin: '0 0 12px', fontSize: '15px', color: 'var(--text-ink)', maxWidth: '480px', lineHeight: 1.6 }}>
                Need a custom NDA or Statement of Work before kickoff? Reach our studio desk directly.
              </p>
              <CopyEmailLink tone="light" />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <Link href="/contact" className="stm-btn-terracotta">
                Start a Project <ArrowUpRight size={14} />
              </Link>
              <Link
                href="/privacy"
                className="button button-outline"
                style={{ color: 'var(--text-ink)', borderColor: 'var(--border-hairline)' }}
              >
                Privacy Policy <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
