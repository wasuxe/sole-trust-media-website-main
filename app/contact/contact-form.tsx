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

export default function ContactForm() {
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [selectedServices, setSelectedServices] = useState<string[]>([])

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
      budget: String(form.get('budget') ?? '').trim() || null,
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
    <section className="contact" id="contact" style={{ paddingTop: 190 }}>
      <div className="contact-inner">
        <p className="eyebrow">Start a project</p>
        <h1
          style={{
            fontSize: 'clamp(65px, 10vw, 140px)',
            lineHeight: 0.88,
            letterSpacing: '-0.08em',
            fontWeight: 600,
            margin: '25px 0 20px',
            color: 'var(--cream)',
          }}
        >
          Tell us what
          <br />
          <i style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}>
            you&apos;re building.
          </i>
        </h1>
        <p
          style={{
            color: 'var(--beige)',
            maxWidth: 480,
            lineHeight: 1.7,
            fontSize: 15,
            margin: '0 0 60px',
            fontFamily: 'Manrope, sans-serif',
          }}
        >
          Tell us about your business and what you want to build. We&apos;ll get back to you within
          one business day.
        </p>

        {sent ? (
          <div style={{ maxWidth: 720 }}>
            <p
              style={{
                font: "10px 'DM Mono', monospace",
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--beige)',
                margin: '0 0 20px',
              }}
            >
              Enquiry received
            </p>
            <p
              style={{
                fontSize: 'clamp(28px, 4vw, 48px)',
                letterSpacing: '-0.05em',
                fontWeight: 500,
                margin: 0,
                lineHeight: 1.1,
                color: 'var(--cream)',
              }}
            >
              Thank you. We&apos;ll be in touch shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ maxWidth: 720 }}>
            {/* Name + Email */}
            <div className="form-row">
              <input
                name="full_name"
                aria-label="Full name"
                required
                minLength={2}
                maxLength={120}
                placeholder="Full name"
              />
              <input
                name="email"
                aria-label="Email address"
                type="email"
                required
                placeholder="Email address"
              />
            </div>

            {/* Company + Phone */}
            <div className="form-row">
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

            {/* Budget */}
            <select name="budget" aria-label="Project budget" defaultValue="">
              <option value="" disabled>
                Project budget
              </option>
              <option value="₹1–3L">₹1–3L</option>
              <option value="₹3–7L">₹3–7L</option>
              <option value="₹7–15L">₹7–15L</option>
              <option value="₹15L+">₹15L+</option>
              <option value="Let's discuss">Let&apos;s discuss</option>
            </select>

            {/* Services */}
            <div style={{ margin: '30px 0 0' }}>
              <p
                style={{
                  font: "10px 'DM Mono', monospace",
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--beige)',
                  margin: '0 0 16px',
                }}
              >
                Services required (optional)
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {allServices.map((service) => {
                  const active = selectedServices.includes(service)
                  return (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      style={{
                        border: `1px solid ${active ? 'var(--cream)' : 'rgba(242,236,227,.3)'}`,
                        borderRadius: 999,
                        background: active ? 'var(--cream)' : 'transparent',
                        color: active ? 'var(--dark)' : 'var(--beige)',
                        padding: '10px 16px',
                        font: "10px 'DM Mono', monospace",
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        letterSpacing: '0.08em',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {service}
                    </button>
                  )
                })}
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
              style={{ marginTop: 30 }}
            />

            <button
              className="button button-light"
              type="submit"
              disabled={submitting}
              style={{ marginTop: 8 }}
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
              <p className="form-error" role="alert" style={{ marginTop: 14 }}>
                {formError}
              </p>
            )}
          </form>
        )}

        <div className="contact-details">
          <a href="mailto:support@soletrustmedia.agency">
            <Mail /> support@soletrustmedia.agency
          </a>
          <span>
            <MapPin /> 560066, Whitefield, Bengaluru, India
          </span>
        </div>
      </div>
    </section>
  )
}
