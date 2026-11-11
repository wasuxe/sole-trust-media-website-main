import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer>
      <div className="footer-top">
        <Link className="wordmark footer-mark brand-logo" href="/" aria-label="Sole Trust Media home">
          <img
            src="/assets/logo/logo-white.png"
            alt="Sole Trust Media"
            className="footer-brand-logo-img"
          />
        </Link>
        <p>
          Brand building, creative,
          <br />
          marketing &amp; technology.
        </p>
        <div className="socials">
          <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            IG
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            IN
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Sole Trust Media</span>
        <span>Not Just Seen. Remembered.</span>
        <div>
          <Link href="#">Privacy</Link>
          <Link href="#">Terms</Link>
        </div>
      </div>
    </footer>
  )
}
