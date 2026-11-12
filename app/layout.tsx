import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import CinematicPreloader from '@/components/cinematic-preloader'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Sole Trust Media — Independent Creative Technology Studio',
    template: '%s | Sole Trust Media',
  },
  description:
    'Sole Trust Media (STM) is an independent creative technology studio in Bengaluru. We combine strategy, brand identity, high-craft digital flagships, and business automation to build meaningful brands and digital experiences.',
  keywords: [
    'creative technology studio',
    'independent creative agency',
    'brand strategy',
    'visual identity',
    'web development',
    'digital flagships',
    'creative direction',
    'business automation',
    'UI/UX design',
    'Bengaluru',
    'India',
  ],
  authors: [{ name: 'Sole Trust Media' }],
  creator: 'Sole Trust Media',
  metadataBase: new URL('https://soletrustmedia.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://soletrustmedia.vercel.app',
    siteName: 'Sole Trust Media',
    title: 'Sole Trust Media — Independent Creative Technology Studio',
    description:
      'We combine strategy, creativity and technology to build meaningful brands, digital experiences and business opportunities.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sole Trust Media — Independent Creative Technology Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sole Trust Media — Independent Creative Technology Studio',
    description: 'We bring strategy, creativity and technology together to build meaningful brands and digital experiences.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f3ebdd',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script
        id="stm-preloader-session-check"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            try {
              if (sessionStorage.getItem('stm_preloader_seen') && !window.location.search.includes('intro=true')) {
                document.documentElement.classList.add('stm-skip-preloader');
              }
            } catch (e) {}
          `,
        }}
      />
      <body className="antialiased">
        <CinematicPreloader />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
