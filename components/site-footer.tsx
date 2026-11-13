import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function SiteFooter() {
  return (
    <footer
      style={{
        background: 'var(--dark)',
        color: 'var(--cream)',
        padding: '100px 4vw 50px',
        borderTop: '1px solid rgba(243, 235, 221, 0.1)',
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '48px',
          marginBottom: '80px',
        }}
      >
        <div style={{ maxWidth: '340px' }}>
          <Link className="wordmark footer-mark brand-logo" href="/" aria-label="Sole Trust Media home">
            <img
              src="/assets/logo/logo-white.png"
              alt="Sole Trust Media"
              className="footer-brand-logo-img"
              style={{ height: '42px', width: 'auto', maxWidth: '180px', objectFit: 'contain', marginBottom: '20px' }}
            />
          </Link>
          <p
            style={{
              fontSize: '14px',
              lineHeight: 1.65,
              color: 'var(--beige)',
              margin: '0 0 20px',
            }}
          >
            Independent Creative Technology Studio. We bring strategy, creativity and technology together to build meaningful brands and digital experiences.
          </p>
          <span style={{ fontFamily: 'var(--font-utility)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-tan)' }}>
            Bengaluru · Global Delivery
          </span>
        </div>

        <div>
          <span style={{ fontFamily: 'var(--font-utility)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--beige)', display: 'block', marginBottom: '18px' }}>
            Navigation
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
            <Link href="/" style={{ color: 'var(--cream)', textDecoration: 'none', transition: 'opacity 0.2s' }}>Home</Link>
            <Link href="/work" style={{ color: 'var(--cream)', textDecoration: 'none', transition: 'opacity 0.2s' }}>Selected Work</Link>
            <Link href="/services" style={{ color: 'var(--cream)', textDecoration: 'none', transition: 'opacity 0.2s' }}>Capabilities</Link>
            <Link href="/about" style={{ color: 'var(--cream)', textDecoration: 'none', transition: 'opacity 0.2s' }}>About Us</Link>
            <Link href="/#insights" style={{ color: 'var(--cream)', textDecoration: 'none', transition: 'opacity 0.2s' }}>Insights</Link>
            <Link href="/contact" style={{ color: 'var(--cream)', textDecoration: 'none', transition: 'opacity 0.2s' }}>Contact &amp; Inquiries</Link>
          </div>
        </div>

        <div>
          <span style={{ fontFamily: 'var(--font-utility)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--beige)', display: 'block', marginBottom: '18px' }}>
            Core Capabilities
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--beige)' }}>
            <span>Brand Strategy &amp; Identity</span>
            <span>Creative Direction &amp; Content</span>
            <span>Digital Experiences &amp; Web</span>
            <span>Marketing &amp; Growth</span>
            <span>Technology &amp; Automation</span>
            <span>Talent &amp; Creator Management</span>
          </div>
        </div>

        <div>
          <span style={{ fontFamily: 'var(--font-utility)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--beige)', display: 'block', marginBottom: '18px' }}>
            New Business
          </span>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--beige)', margin: '0 0 16px' }}>
            Ready to build something enduring? Let&apos;s start a conversation.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            <Link
              href="/contact"
              className="button button-light"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 22px',
                fontSize: '11px',
                borderRadius: '999px',
                width: 'fit-content',
              }}
            >
              Start a Project <ArrowUpRight size={13} />
            </Link>
            <a
              href="mailto:soletrustmedia@gmail.com"
              style={{
                fontSize: '13px',
                color: 'var(--beige)',
                textDecoration: 'none',
              }}
            >
              soletrustmedia@gmail.com
            </a>
          </div>
          <div className="socials" style={{ display: 'flex', gap: '16px' }}>
            <a
              href="https://www.instagram.com/soletrustmedia?xtok=ZzF4MXZoMDdwYjI4"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm4.5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-3.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/sole-trust-media-56820a423"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.34 7.43a2.06 2.06 0 1 0 0-4.12 2.06 2.06 0 0 0 0 4.12ZM3.56 9h3.56v11.45H3.56V9Zm5.79 0h3.41v1.56h.05c.48-.9 1.65-1.85 3.39-1.85 3.62 0 4.29 2.38 4.29 5.48v6.26h-3.56v-5.55c0-1.32-.02-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.92v5.65H9.35V9Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div
        className="footer-bottom"
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          paddingTop: '28px',
          borderTop: '1px solid rgba(243, 235, 221, 0.1)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          fontSize: '12px',
          fontFamily: 'var(--font-utility)',
          color: 'var(--beige)',
        }}
      >
        <span>&copy; {new Date().getFullYear()} Sole Trust Media. All rights reserved.</span>
        <span style={{ fontStyle: 'italic', letterSpacing: '0.04em' }}>Not Just Seen. Remembered.</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link href="/contact" style={{ color: 'inherit' }}>Privacy Policy</Link>
          <Link href="/contact" style={{ color: 'inherit' }}>Terms of Engagement</Link>
        </div>
      </div>
    </footer>
  )
}
