'use client'

import { ArrowUpRight, Check, Mail, MapPin } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import ScopeConfigurator, { type LockedScopePayload } from '@/components/scope-configurator'
import { MotionWrapper } from '@/components/MotionWrapper'
import { useSound } from '@/components/sound-provider'
import CopyEmailLink from '@/components/copy-email-link'

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
  const { playWarmClick } = useSound()
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [businessStage, setBusinessStage] = useState<string>('Direct Inquiry')
  const [projectBrief, setProjectBrief] = useState<string>('')
  const [scopeBanner, setScopeBanner] = useState<string | null>(null)
  const nameInputRef = useRef<HTMLInputElement | null>(null)
  const [submittedInfo, setSubmittedInfo] = useState<{
    fullName: string
    mailtoUrl: string
    gmailWebUrl: string
  } | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const servicesParam = params.get('services')
    const projectParam = params.get('project')
    const shouldFocus = params.get('focus') === 'true' || window.location.hash === '#contact-inquiry-form'
    if (servicesParam) {
      const requested = servicesParam
        .split(',')
        .map((s) => s.trim())
        .filter((s) => allServices.includes(s))
      if (requested.length > 0) setSelectedServices(requested)
    }
    if (projectParam) {
      setBusinessStage(`Inspired by ${projectParam}`)
      setProjectBrief(
        `Interested in building a commission inspired by ${projectParam}.\n\nProject Goals & Timeline: `
      )
      setScopeBanner(`Pre-populated scope inspired by ${projectParam}`)
    }
    if (shouldFocus || projectParam || servicesParam) {
      window.setTimeout(() => {
        const formEl = document.getElementById('contact-inquiry-form')
        if (formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.setTimeout(() => {
          nameInputRef.current?.focus({ preventScroll: true })
        }, 420)
      }, 120)
    }
  }, [])

  function toggleService(service: string) {
    playWarmClick()
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    )
  }

  function handleLockScope(payload: LockedScopePayload) {
    playWarmClick()
    const matched = payload.formServices.filter((s) => allServices.includes(s))
    setSelectedServices(matched.length > 0 ? matched : payload.formServices)
    setBusinessStage(`${payload.stage} · ${payload.recommendedTrack} (${payload.timeline})`)
    setProjectBrief(payload.summaryNote)
    setScopeBanner(
      `Proposal Scope Loaded: ${payload.recommendedTrack} (${payload.timeline}) · ${payload.stage}`
    )
    setSent(false)
    const formEl = document.getElementById('contact-inquiry-form')
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.setTimeout(() => {
        nameInputRef.current?.focus({ preventScroll: true })
      }, 420)
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    playWarmClick()
    setSubmitting(true)
    setFormError('')

    const form = new FormData(event.currentTarget)

    const fullName = String(form.get('full_name') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const companyName = String(form.get('company_name') ?? '').trim() || null
    const phone = String(form.get('phone') ?? '').trim() || null
    const projectDesc = String(form.get('project_description') ?? '').trim()
    const disciplinesText = (selectedServices || []).join(', ') || 'General Inquiry'

    const mailtoSubject = encodeURIComponent(`Start a Project — ${fullName || 'New Client'} (${businessStage})`)
    const mailtoBody = encodeURIComponent(
      `Hi Sole Trust Media Team,\n\n` +
        `I would like to start a project with you.\n\n` +
        `• Name: ${fullName}\n` +
        `• Email: ${email}\n` +
        (companyName ? `• Company: ${companyName}\n` : '') +
        (phone ? `• Phone / WhatsApp: ${phone}\n` : '') +
        `• Business Stage: ${businessStage}\n` +
        `• Selected Disciplines: ${disciplinesText}\n\n` +
        `Project Brief:\n${projectDesc}\n\n` +
        `Regards,\n${fullName}`
    )
    const mailtoUrl = `mailto:soletrustmedia@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=soletrustmedia@gmail.com&su=${mailtoSubject}&body=${mailtoBody}`

    const payload = {
      full_name: fullName,
      email,
      company_name: companyName,
      phone,
      project_description: `[Business Stage: ${businessStage}]\n\n${projectDesc}`,
      services_required: selectedServices,
    }

    try {
      // 1. Direct browser FormSubmit AJAX dispatch to soletrustmedia@gmail.com (_captcha: "false")
      let browserEmailed = false
      try {
        const fsRes = await fetch('https://formsubmit.co/ajax/soletrustmedia@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            _subject: `[Start a Project] ${fullName}${companyName ? ` (${companyName})` : ''}`,
            _replyto: email,
            _captcha: 'false',
            _template: 'table',
            name: fullName,
            email,
            Name: fullName,
            Email: email,
            Company: companyName || 'N/A',
            'Phone / WhatsApp': phone || 'N/A',
            'Business Stage': businessStage,
            'Selected Disciplines': disciplinesText,
            Message: projectDesc,
          }),
        })
        if (fsRes.ok) {
          const fsJson = (await fsRes.json().catch(() => ({}))) as { success?: string | boolean }
          browserEmailed = fsJson.success === true || String(fsJson.success).toLowerCase() === 'true'
        }
      } catch {
        browserEmailed = false
      }

      // 2. Sync to internal /api/enquiries (Supabase + server backup if browser FormSubmit failed)
      let serverEmailed = false
      try {
        const apiRes = await fetch('/api/enquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, client_emailed: browserEmailed }),
        })
        if (apiRes.ok) {
          const apiJson = (await apiRes.json().catch(() => ({}))) as { emailed?: boolean }
          serverEmailed = Boolean(apiJson.emailed)
        }
      } catch {
        serverEmailed = false
      }

      setSubmittedInfo({ fullName, mailtoUrl, gmailWebUrl })
      setSent(true)
      setProjectBrief('')
      setScopeBanner(null)

      // 3. Only trigger automatic mailto fallback if both automated channels failed
      if (!browserEmailed && !serverEmailed && typeof window !== 'undefined') {
        window.location.href = mailtoUrl
      }
    } catch {
      setSubmittedInfo({ fullName, mailtoUrl, gmailWebUrl })
      setSent(true)
      if (typeof window !== 'undefined') window.location.href = mailtoUrl
    }

    setSubmitting(false)
  }

  return (
    <div style={{ background: 'var(--bg-parchment)', color: 'var(--text-ink)' }}>
      {/* Interactive Price-Free Scope Configurator at Top of /contact */}
      <div style={{ paddingTop: '68px' }}>
        <ScopeConfigurator onLockScope={handleLockScope} />
      </div>

      {/* Tactile Warm Parchment Proposal & Inquiry Form */}
      <section
        id="contact-inquiry-form"
        style={{
          padding: 'clamp(48px, 6vw, 80px) var(--page-gutter) clamp(64px, 7vw, 96px)',
          background: 'var(--bg-parchment-alt)',
          color: 'var(--text-ink)',
          borderTop: '1px solid var(--border-hairline)',
        }}
      >
        <div className="contact-inner" style={{ maxWidth: 1000, margin: '0 auto' }}>
          <MotionWrapper>
            {scopeBanner && (
              <div
                role="status"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '9px 18px',
                  borderRadius: 999,
                  background: 'rgba(140, 45, 25, 0.1)',
                  border: '1px solid rgba(140, 45, 25, 0.35)',
                  color: 'var(--accent-terracotta)',
                  fontFamily: 'var(--font-utility)',
                  fontSize: 11,
                  letterSpacing: '0.06em',
                  marginBottom: 20,
                }}
              >
                <Check size={13} />
                <span>{scopeBanner}</span>
              </div>
            )}

            <p
              className="editorial-label"
              style={{
                color: 'var(--accent-terracotta)',
                marginBottom: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span>*</span> 02 / Request a Custom Proposal
            </p>
            <h1
              className="contact-page-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(42px, 6.6vw, 96px)',
                margin: '0 0 18px',
                lineHeight: 0.94,
                letterSpacing: '-0.04em',
                color: 'var(--text-ink)',
              }}
            >
              Tell us what{' '}
              <i
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: 'var(--accent-terracotta)',
                }}
              >
                you&apos;re building.
              </i>
            </h1>
            <p
              className="contact-page-description"
              style={{
                color: 'var(--muted)',
                maxWidth: 560,
                fontSize: 15,
                lineHeight: 1.62,
                marginBottom: 32,
              }}
            >
              Share your vision, selected disciplines, and timeline. Our directors personally review every brief and respond within 24 business hours.
            </p>
          </MotionWrapper>

          {sent ? (
            <div
              style={{
                maxWidth: 740,
                background: 'var(--bg-espresso)',
                color: 'var(--text-cream)',
                border: '1px solid var(--border-hairline-dark)',
                padding: 36,
                borderRadius: 22,
              }}
            >
              <p
                className="editorial-label"
                style={{
                  fontSize: 10,
                  color: 'var(--accent-gold)',
                  margin: '0 0 14px',
                }}
              >
                Proposal brief received &bull; Routed directly to our studio desk
              </p>
              <p
                style={{
                  fontSize: 'clamp(26px, 3.8vw, 40px)',
                  letterSpacing: '-0.04em',
                  fontWeight: 600,
                  margin: '0 0 14px',
                  lineHeight: 1.12,
                  color: 'var(--text-cream)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                Thank you{submittedInfo?.fullName ? `, ${submittedInfo.fullName}` : ''}. Your brief is with our directors.
              </p>
              <p
                style={{
                  margin: '0 0 22px',
                  color: 'rgba(246, 241, 233, 0.78)',
                  fontSize: 14.5,
                  lineHeight: 1.6,
                }}
              >
                We&apos;ll reply within 24 business hours with a tailored strategic roadmap. For direct correspondence, reach us at{' '}
                <a href="mailto:admin@soletrustmedia.agency" style={{ color: 'var(--accent-gold)', textDecoration: 'underline' }}>
                  admin@soletrustmedia.agency
                </a>
                .
              </p>
              {submittedInfo && (
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 12,
                    marginTop: 20,
                    paddingTop: 20,
                    borderTop: '1px solid var(--border-hairline-dark)',
                  }}
                >
                  <a
                    href={submittedInfo.gmailWebUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="stm-btn-terracotta"
                    style={{ padding: '12px 22px', fontSize: 11 }}
                  >
                    <Mail size={13} /> Open Copy in Gmail
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false)
                      setSubmittedInfo(null)
                    }}
                    className="button button-outline"
                    style={{
                      padding: '12px 22px',
                      fontSize: 11,
                      letterSpacing: '0.08em',
                      color: 'var(--text-cream)',
                      borderColor: 'var(--border-hairline-dark)',
                    }}
                  >
                    Submit another brief
                  </button>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ maxWidth: 820 }}>
              {/* Selected Scope */}
              <div style={{ marginBottom: 28 }}>
                <span
                  className="editorial-label"
                  style={{
                    color: 'var(--muted)',
                    fontSize: 10,
                    display: 'block',
                    marginBottom: 12,
                  }}
                >
                  Selected Scope (Choose all that apply)
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
                  {allServices.map((service) => {
                    const active = selectedServices.includes(service)
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        aria-pressed={active}
                        style={{
                          padding: '9px 17px',
                          minHeight: '40px',
                          borderRadius: 999,
                          font: "11px 'DM Mono', monospace",
                          cursor: 'pointer',
                          background: active ? 'var(--bg-espresso)' : 'rgba(255, 255, 255, 0.55)',
                          color: active ? 'var(--text-cream)' : 'var(--text-ink)',
                          border: active
                            ? '1px solid var(--bg-espresso)'
                            : '1px solid var(--border-hairline)',
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
              <div
                className="form-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: 16,
                }}
              >
                <input
                  ref={nameInputRef}
                  name="full_name"
                  aria-label="Full name"
                  className="stm-pill-input-light"
                  required
                  minLength={2}
                  maxLength={120}
                  placeholder="Full name *"
                />
                <input
                  name="email"
                  aria-label="Email address"
                  className="stm-pill-input-light"
                  type="email"
                  required
                  placeholder="Email address *"
                />
              </div>

              {/* Company + Phone / WhatsApp */}
              <div
                className="form-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: 16,
                  marginTop: 16,
                }}
              >
                <input
                  name="company_name"
                  aria-label="Company or brand name"
                  className="stm-pill-input-light"
                  placeholder="Company / brand name"
                />
                <input
                  name="phone"
                  aria-label="Phone or WhatsApp"
                  className="stm-pill-input-light"
                  type="tel"
                  placeholder="WhatsApp / Phone number"
                />
              </div>

              {/* Project Brief */}
              <textarea
                name="project_description"
                aria-label="Project brief"
                className="stm-pill-textarea-light"
                required
                minLength={10}
                maxLength={5000}
                value={projectBrief}
                onChange={(e) => setProjectBrief(e.target.value)}
                placeholder="Tell us about your project — what you're building, target audience, and desired timeline..."
                rows={5}
                style={{ marginTop: 22 }}
              />

              <button
                className="stm-btn-terracotta"
                type="submit"
                disabled={submitting}
                style={{ marginTop: 14 }}
              >
                {submitting ? (
                  'Sending…'
                ) : (
                  <>
                    Request Custom Proposal <ArrowUpRight size={14} />
                  </>
                )}
              </button>

              {formError && (
                <p
                  className="form-error"
                  role="alert"
                  style={{ marginTop: 14, color: 'var(--accent-terracotta)', fontWeight: 500 }}
                >
                  {formError}
                </p>
              )}
            </form>
          )}

          <div
            className="contact-details"
            style={{
              borderTop: '1px solid var(--border-hairline)',
              paddingTop: 28,
              marginTop: 52,
              color: 'var(--muted)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            <CopyEmailLink tone="light" />
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
              <MapPin size={14} /> 560066, Whitefield, Bengaluru, India
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
