import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import LoadingScreen from '@/components/LoadingScreen'
import CustomCursor from '@/components/CustomCursor'
import MobileQuickDock from '@/components/mobile-quick-dock'
import MobileTouchSensor from '@/components/MobileTouchSensor'
import { SoundProvider } from '@/components/sound-provider'
import './globals.css'

const SITE_URL = 'https://soletrustmedia.agency'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'Sole Trust Media',
  title: {
    default: 'Sole Trust Media — Creative Technology & Brand Studio',
    template: '%s | Sole Trust Media',
  },
  description:
    'Independent creative technology studio crafting brand strategy, digital flagships, and automated growth systems for ambitious brands worldwide.',
  keywords: [
    'Sole Trust Media',
    'creative technology studio',
    'independent creative agency',
    'brand strategy',
    'visual identity',
    'digital flagships',
    'web development',
    'creative direction',
    'business automation',
    'Bengaluru',
  ],
  authors: [{ name: 'Sole Trust Media', url: SITE_URL }],
  creator: 'Sole Trust Media',
  publisher: 'Sole Trust Media',
  alternates: {
    canonical: SITE_URL,
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Sole Trust Media',
    title: 'Sole Trust Media — Creative Technology & Brand Studio',
    description:
      'Independent creative technology studio crafting brand strategy, digital flagships, and automated growth systems for ambitious brands worldwide.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sole Trust Media — Creative Technology & Brand Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sole Trust Media — Creative Technology & Brand Studio',
    description:
      'Independent creative technology studio crafting brand strategy, digital flagships, and automated growth systems for ambitious brands worldwide.',
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
  themeColor: '#241914',
  width: 'device-width',
  initialScale: 1,
}

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'Sole Trust Media',
      alternateName: ['Sole Trust', 'STM'],
      description:
        'Independent creative technology studio crafting brand strategy, digital flagships, and automated growth systems for ambitious brands worldwide.',
      inLanguage: 'en',
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Sole Trust Media',
      alternateName: ['Sole Trust', 'STM'],
      url: `${SITE_URL}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/logo/logo-brown.png`,
      },
      email: 'admin@soletrustmedia.agency',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Whitefield',
        addressLocality: 'Bengaluru',
        addressRegion: 'Karnataka',
        postalCode: '560066',
        addressCountry: 'IN',
      },
      sameAs: [
        'https://www.instagram.com/soletrustmedia?xtok=ZzF4MXZoMDdwYjI4',
        'https://www.linkedin.com/in/sole-trust-media-56820a423',
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
        <script
          id="stm-preloader-session-check"
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem('stm_preloader_seen')&&!window.location.search.includes('intro=true')){document.documentElement.classList.add('stm-skip-preloader');}}catch(e){}`,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <SoundProvider>
          <LoadingScreen />
          <CustomCursor />
          <MobileTouchSensor />
          {children}
          <MobileQuickDock />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </SoundProvider>
      </body>
    </html>
  )
}
