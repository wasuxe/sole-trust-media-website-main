import type { Metadata } from 'next'
import ContactForm from './contact-form'
import SiteNav from '@/components/site-nav'
import SiteFooter from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Start a Project',
  description:
    'Tell us about your business and what you want to build. Get in touch with Sole Trust Media — a creative, marketing and technology agency in Bengaluru.',
}

export default function ContactPage() {
  return (
    <main className="site-shell">
      <SiteNav />
      <ContactForm />
      <SiteFooter />
    </main>
  )
}
