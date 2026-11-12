'use client'

import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { useState } from 'react'

const allServices = [
  'Brand Strategy',
  'Branding & Visual Identity',
  'Social Media Management',
  'Performance Marketing',
  'Creative Direction',
  'Content Creation',
  'Photography & Videography',
  'Website & E-commerce',
  'UI/UX Design',
  'SEO & AI Search Visibility',
  'Business Automation',
  'Custom Web Applications',
]

const budgetOptions = [
  '₹50,000 – ₹1,50,000',
  '₹1,50,000 – ₹3,50,000',
  '₹3,50,000 – ₹8,00,000',
  '₹8,00,000+',
  'Let’s discuss',
]

export default function ContactForm() {
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [budget, setBudget] = useState<string>('')

  function toggleService(service: string) {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    )
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setFormError('')

    const form = new FormData(event.currentTarget)

    const payload = {
      full_name: String(form.get('full_name') ?? '').trim(),
      email: String(form.get('email') ?? '').trim(),
      company_name: String(form.get('company_name') ?? '').trim() || null,
      phone: String(form.get('phone') ?? '').trim() || null,
      budget: budget || null,
      project_description: String(form.get('project_description') ?? '').trim(),
      services_required: selectedServices,
    }

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        setFormError(data.error || "We couldn't send that. Please email us directly.")
      } else {
        setSent(true)
      }
    } catch {
      setFormError("We couldn't send that just now. Please email us directly instead.")
    }

    setSubmitting(false)
  }

  return (
    <section className="contact" id="contact" style={{ paddingTop: 180, background: 'var(--dark)', color: 'var(--cream)' }}>
      <div className="contact-inner" style={{ maxWidth: 1000, margin: '0 auto' }}>
        <p className="eyebrow" style={{ color: 'var(--beige)', marginBottom: 16 }}>01 / Start a project</p>
        <h1 className="contact-page-title" style={{ fontFamily: 'var(--font-display)', margin: '0 0 20px', lineHeight: 0.95 }}>
          Tell us what
          <br />
          <i style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontWeight: 400 }}>you&apos;re building.</i>
        </h1>
        <p className="contact-page-description" style={{ color: 'var(--beige)', maxWidth: 560, fontSize: 16, lineHeight: 1.6, marginBottom: 44 }}>
          Tell us about your business, what challenges you are facing, and what success looks like. We review every enquiry within 24 business hours.
        </p>

        {sent ? (
          <div style={{ maxWidth: 720, background: 'rgba(243, 235, 221, 0.08)', border: '1px solid rgba(243, 235, 221, 0.2)', padding: 40, borderRadius: 20 }}>
            <p
              style={{
                font: "10px 'DM Mono', monospace",
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--beige)',
                margin: '0 0 16px',
              }}
            >
              Enquiry received
            </p>
            <p
              style={{
                fontSize: 'clamp(28px, 4vw, 42px)',
                letterSpacing: '-0.04em',
                fontWeight: 600,
                margin: '0 0 16px',
                lineHeight: 1.15,
                color: 'var(--cream)',
                fontFamily: 'var(--font-display)',
              }}
            >
              Thank you. We&apos;ll be in touch shortly.
            </p>
            <p style={{ margin: 0, color: 'var(--beige)', fontSize: 15, lineHeight: 1.6 }}>
              Our strategy directors have received your enquiry and will respond within one business day.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ maxWidth: 780 }}>
            {/* Services required */}
            <div style={{ marginBottom: 36 }}>
              <span className="contact-services-label" style={{ color: 'var(--beige)', fontSize: 11, fontFamily: 'var(--font-utility)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 14 }}>
                Services Required (Select all that apply)
              </span>
              <div className="contact-service-options" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {allServices.map((service) => {
                  const active = selectedServices.includes(service)
                  return (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={`contact-service-option ${active ? 'selected' : ''}`}
                      aria-pressed={active}
                      style={{
                        padding: '9px 18px',
                        borderRadius: 999,
                        font: "11px 'DM Mono', monospace",
                        cursor: 'pointer',
                        background: active ? 'var(--cream)' : 'transparent',
                        color: active ? 'var(--dark)' : 'var(--cream)',
                        border: active ? '1px solid var(--cream)' : '1px solid rgba(243, 235, 221, 0.25)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {service}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Name + Email */}
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
              <input
                name="full_name"
                aria-label="Full name"
                required
                minLength={2}
                maxLength={120}
                placeholder="Full name *"
              />
              <input
                name="email"
                aria-label="Email address"
                type="email"
                required
                placeholder="Email address *"
              />
            </div>

            {/* Company + Phone */}
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginTop: 24 }}>
              <input
                name="company_name"
                aria-label="Company or brand name"
                placeholder="Company / brand name"
              />
              <input
                name="phone"
                aria-label="Phone number"
                type="tel"
                placeholder="Phone number (optional)"
              />
            </div>

            {/* Budget options pills */}
            <div style={{ marginTop: 32 }}>
              <span style={{ color: 'var(--beige)', fontSize: 11, fontFamily: 'var(--font-utility)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 12 }}>
                Project Budget Scope
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {budgetOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setBudget(opt)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 999,
                      font: "11px 'DM Mono', monospace",
                      cursor: 'pointer',
                      background: budget === opt ? 'var(--cream)' : 'transparent',
                      color: budget === opt ? 'var(--dark)' : 'var(--cream)',
                      border: budget === opt ? '1px solid var(--cream)' : '1px solid rgba(243, 235, 221, 0.2)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <textarea
              name="project_description"
              aria-label="Project description"
              required
              minLength={10}
              maxLength={5000}
              placeholder="Tell us about your project — what you're building, what challenges you're facing, and what success looks like for you..."
              rows={5}
              style={{ marginTop: 32 }}
            />

            <button
              className="button button-light"
              type="submit"
              disabled={submitting}
              style={{ marginTop: 16, padding: '16px 36px', fontSize: 11, letterSpacing: '0.1em' }}
            >
              {submitting ? (
                'Sending…'
              ) : (
                <>
                  Send enquiry <ArrowUpRight data-icon="inline-end" />
                </>
              )}
            </button>

            {formError && (
              <p className="form-error" role="alert" style={{ marginTop: 14, color: '#f2b2a5' }}>
                {formError}
              </p>
            )}
          </form>
        )}

        <div className="contact-details" style={{ borderTop: '1px solid rgba(243, 235, 221, 0.12)', paddingTop: 36, marginTop: 80 }}>
          <a href="mailto:support@soletrustmedia.agency" style={{ color: 'inherit' }}>
            <Mail size={14} /> support@soletrustmedia.agency
          </a>
          <span>
            <MapPin size={14} /> 560066, Whitefield, Bengaluru, India
          </span>
        </div>
      </div>
    </section>
  )
}
