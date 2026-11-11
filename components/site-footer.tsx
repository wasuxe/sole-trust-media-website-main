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
        {/* Brand identity column */}
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

        {/* Studio Navigation */}
        <div>
          <span style={{ fontFamily: 'var(--font-utility)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--beige)', display: 'block', marginBottom: '18px' }}>
            Navigation
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
            <Link href="/" style={{ color: 'var(--cream)', textDecoration: 'none', transition: 'opacity 0.2s' }}>Home</Link>
            <Link href="/work" style={{ color: 'var(--cream)', textDecoration: 'none', transition: 'opacity 0.2s' }}>Selected Work</Link>
            <Link href="/services" style={{ color: 'var(--cream)', textDecoration: 'none', transition: 'opacity 0.2s' }}>Capabilities</Link>
            <Link href="/#about" style={{ color: 'var(--cream)', textDecoration: 'none', transition: 'opacity 0.2s' }}>Studio Philosophy</Link>
            <Link href="/#insights" style={{ color: 'var(--cream)', textDecoration: 'none', transition: 'opacity 0.2s' }}>Insights</Link>
            <Link href="/contact" style={{ color: 'var(--cream)', textDecoration: 'none', transition: 'opacity 0.2s' }}>Contact &amp; Inquiries</Link>
          </div>
        </div>

        {/* Capabilities Summary */}
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

        {/* Inquiries & Connect */}
        <div>
          <span style={{ fontFamily: 'var(--font-utility)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--beige)', display: 'block', marginBottom: '18px' }}>
            New Business
          </span>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--beige)', margin: '0 0 16px' }}>
            Ready to build something enduring? Let&apos;s start a conversation.
          </p>
          <Link
            href="/contact"
            className="button button-light"
            style={{
              display: 'inline-flex',
              padding: '12px 22px',
              fontSize: '11px',
              borderRadius: '999px',
              marginBottom: '24px',
            }}
          >
            Start a Project <ArrowUpRight size={13} />
          </Link>
          <div className="socials" style={{ display: 'flex', gap: '16px', fontSize: '12px', fontFamily: 'var(--font-utility)' }}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--beige)', textDecoration: 'underline' }}>
              Instagram ↗
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--beige)', textDecoration: 'underline' }}>
              LinkedIn ↗
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
