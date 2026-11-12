import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer>
      <div className="footer-top">
        <Link className="wordmark footer-mark" href="/">
          <span>STM</span>
          <small>SOLE TRUST MEDIA</small>
        </Link>
        <p>
          Brand building, creative,
          <br />
          marketing &amp; technology.
        </p>
        <div className="socials">
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
            href="http://www.linkedin.com/in/sole-trust-media-56820a423"
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
