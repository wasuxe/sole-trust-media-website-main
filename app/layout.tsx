import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Sole Trust Media — Brands People Remember',
    template: '%s | Sole Trust Media',
  },
  description:
    'Sole Trust Media is a creative, technology and business growth agency in Bengaluru. We build brands, digital experiences and technology that help businesses grow.',
  keywords: [
    'branding agency',
    'web development',
    'digital marketing',
    'creative agency',
    'Bengaluru',
    'India',
    'brand strategy',
    'UI/UX design',
  ],
  authors: [{ name: 'Sole Trust Media' }],
  creator: 'Sole Trust Media',
  metadataBase: new URL('https://soletrustmedia.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://soletrustmedia.vercel.app',
    siteName: 'Sole Trust Media',
    title: 'Sole Trust Media — Brands People Remember',
    description:
      'We combine strategy, creativity and technology to help businesses build stronger brands, meaningful digital experiences and sustainable growth.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sole Trust Media — Creative & Technology Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sole Trust Media — Brands People Remember',
    description: 'Strategy, creativity and technology for businesses that want to grow.',
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
  themeColor: '#f2ece3',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
