import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'

const TARGET_NOTIFICATION_EMAIL =
  process.env.CONTACT_NOTIFICATION_EMAIL || 'soletrustmedia@gmail.com'

interface EnquiryData {
  full_name: string
  company_name?: string | null
  email: string
  phone?: string | null
  services_required?: string[]
  budget?: string | null
  project_description: string
}

function buildHtmlEmail(data: EnquiryData, submittedAt: string) {
  const servicesList = data.services_required?.length
    ? data.services_required
        .map(
          (s) =>
            `<span style="display:inline-block;padding:4px 10px;background:#EDE2D1;color:#1E130F;border-radius:999px;font-size:12px;font-weight:600;margin:2px 4px 2px 0;">${s}</span>`
        )
        .join('')
    : '<span style="color:#888;">None specified</span>'

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Project Query - Sole Trust Media</title>
</head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background-color:#F3EBDD;color:#1E130F;margin:0;padding:24px;">
  <div style="max-width:620px;margin:0 auto;background:#FFFFFF;border-radius:14px;border:1px solid #E2D7C5;overflow:hidden;box-shadow:0 6px 20px rgba(30,19,15,0.06);">
    <div style="background:#1E130F;color:#F3EBDD;padding:28px 32px;">
      <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#B89B88;font-weight:600;">Sole Trust Media &bull; Project Query</p>
      <h1 style="margin:0;font-size:22px;font-weight:600;letter-spacing:-0.02em;color:#F3EBDD;">New Client Inquiry Received</h1>
    </div>

    <div style="padding:32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #F0E6D6;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#766052;font-weight:600;width:140px;">Client Name</td>
          <td style="padding:10px 0;border-bottom:1px solid #F0E6D6;font-size:15px;color:#1E130F;font-weight:600;">${data.full_name}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #F0E6D6;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#766052;font-weight:600;">Client Email</td>
          <td style="padding:10px 0;border-bottom:1px solid #F0E6D6;font-size:15px;color:#1E130F;">
            <a href="mailto:${data.email}" style="color:#4B3027;font-weight:600;text-decoration:underline;">${data.email}</a>
          </td>
        </tr>
        ${
          data.company_name
            ? `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #F0E6D6;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#766052;font-weight:600;">Company</td>
          <td style="padding:10px 0;border-bottom:1px solid #F0E6D6;font-size:15px;color:#1E130F;">${data.company_name}</td>
        </tr>`
            : ''
        }
        ${
          data.phone
            ? `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #F0E6D6;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#766052;font-weight:600;">Phone / WhatsApp</td>
          <td style="padding:10px 0;border-bottom:1px solid #F0E6D6;font-size:15px;color:#1E130F;">
            <a href="tel:${data.phone}" style="color:#4B3027;font-weight:600;">${data.phone}</a>
          </td>
        </tr>`
            : ''
        }
        ${
          data.budget
            ? `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #F0E6D6;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#766052;font-weight:600;">Budget Scope</td>
          <td style="padding:10px 0;border-bottom:1px solid #F0E6D6;font-size:15px;color:#1E130F;font-weight:600;">${data.budget}</td>
        </tr>`
            : ''
        }
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #F0E6D6;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#766052;font-weight:600;">Services</td>
          <td style="padding:10px 0;border-bottom:1px solid #F0E6D6;font-size:14px;color:#1E130F;">${servicesList}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #F0E6D6;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#766052;font-weight:600;">Submitted At</td>
          <td style="padding:10px 0;border-bottom:1px solid #F0E6D6;font-size:13px;color:#766052;">${submittedAt}</td>
        </tr>
      </table>

      <div style="margin-top:24px;">
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#766052;font-weight:600;margin-bottom:8px;">Project Description & Requirements</div>
        <div style="background:#FAF6F0;border-left:3px solid #4B3027;padding:18px 20px;border-radius:0 8px 8px 0;font-size:15px;line-height:1.6;color:#1E130F;white-space:pre-wrap;">${data.project_description}</div>
      </div>

      <div style="text-align:center;margin-top:32px;">
        <a href="mailto:${data.email}?subject=${encodeURIComponent(`Re: Sole Trust Media Project Inquiry — ${data.full_name}`)}" style="display:inline-block;padding:14px 28px;background:#1E130F;color:#F3EBDD;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;letter-spacing:0.04em;">Reply to ${data.full_name}</a>
      </div>
    </div>

    <div style="background:#FAF7F2;border-top:1px solid #F0E6D6;padding:18px 32px;font-size:12px;color:#766052;text-align:center;">
      Sole Trust Media &bull; Inquiries automatically routed to ${TARGET_NOTIFICATION_EMAIL}
    </div>
  </div>
</body>
</html>`
}

async function dispatchEmailNotification(data: EnquiryData, submittedAt: string): Promise<boolean> {
  const targetEmail = TARGET_NOTIFICATION_EMAIL
  let delivered = false

  // 1. Direct Gmail / SMTP via Nodemailer (Zero external third parties or activation links)
  const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS
  if (gmailPass) {
    try {
      const gmailUser = process.env.GMAIL_USER || 'soletrustmedia@gmail.com'
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: gmailUser,
          pass: gmailPass,
        },
      })

      await transporter.sendMail({
        from: `"Sole Trust Media Inquiries" <${gmailUser}>`,
        to: targetEmail,
        replyTo: data.email,
        subject: `[New Project Query] ${data.full_name}${data.company_name ? ` (${data.company_name})` : ''} — ${data.budget || 'Custom Scope'}`,
        html: buildHtmlEmail(data, submittedAt),
        text: `New Project Query from ${data.full_name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\nCompany: ${data.company_name || 'N/A'}\nBudget: ${data.budget || 'N/A'}\nServices: ${(data.services_required || []).join(', ')}\n\nDescription:\n${data.project_description}`,
      })

      console.info(`[EMAIL DISPATCH]: Direct Gmail SMTP delivered to ${targetEmail}`)
      return true
    } catch (err) {
      console.warn('[EMAIL DISPATCH]: Gmail SMTP delivery error:', err)
    }
  }

  // 2. Resend API (if RESEND_API_KEY is configured in environment)
  const resendApiKey = process.env.RESEND_API_KEY
  if (resendApiKey) {
    try {
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'Sole Trust Media <onboarding@resend.dev>'
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [targetEmail],
          reply_to: data.email,
          subject: `[New Project Query] ${data.full_name}${data.company_name ? ` (${data.company_name})` : ''}`,
          html: buildHtmlEmail(data, submittedAt),
          text: `New Project Query from ${data.full_name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\nCompany: ${data.company_name || 'N/A'}\nBudget: ${data.budget || 'N/A'}\nServices: ${(data.services_required || []).join(', ')}\n\nDescription:\n${data.project_description}`,
        }),
      })

      if (resendRes.ok) {
        delivered = true
        console.info(`[EMAIL DISPATCH]: Delivered via Resend to ${targetEmail}`)
        return true
      } else {
        const errorText = await resendRes.text()
        console.warn(`[EMAIL DISPATCH]: Resend returned status ${resendRes.status}: ${errorText}`)
      }
    } catch (err) {
      console.warn('[EMAIL DISPATCH]: Resend delivery error:', err)
    }
  }

  // 2. FormSubmit forwarder (zero-config automatic delivery directly to target email)
  try {
    const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: 'https://soletrustmedia.agency',
        Referer: 'https://soletrustmedia.agency/',
      },
      body: JSON.stringify({
        _subject: `[STM Project Query] ${data.full_name}${data.company_name ? ` (${data.company_name})` : ''} — ${data.budget || 'Custom Scope'}`,
        _replyto: data.email,
        _template: 'table',
        'Client Name': data.full_name,
        'Client Email': data.email,
        Company: data.company_name || 'N/A',
        'Phone / WhatsApp': data.phone || 'N/A',
        'Budget Scope': data.budget || 'Not specified',
        'Services Required': (data.services_required || []).join(', ') || 'None specified',
        'Project Description': data.project_description,
        'Submitted At': submittedAt,
      }),
    })

    if (formSubmitRes.ok) {
      const resJson = await formSubmitRes.json().catch(() => ({}))
      console.info(`[EMAIL DISPATCH]: FormSubmit forwarder delivered to ${targetEmail}:`, resJson)
      delivered = true
      return true
    } else {
      console.warn(`[EMAIL DISPATCH]: FormSubmit returned status ${formSubmitRes.status}`)
    }
  } catch (err) {
    console.warn('[EMAIL DISPATCH]: FormSubmit delivery error:', err)
  }

  // 3. Web3Forms (if WEB3FORMS_ACCESS_KEY is configured in environment)
  const web3Key = process.env.WEB3FORMS_ACCESS_KEY
  if (web3Key && !delivered) {
    try {
      const web3Res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: web3Key,
          subject: `[STM Project Query] ${data.full_name}`,
          from_name: data.full_name,
          reply_to: data.email,
          to: targetEmail,
          ...data,
          services_required: (data.services_required || []).join(', '),
        }),
      })
      if (web3Res.ok) {
        delivered = true
        console.info(`[EMAIL DISPATCH]: Delivered via Web3Forms to ${targetEmail}`)
        return true
      }
    } catch (err) {
      console.warn('[EMAIL DISPATCH]: Web3Forms delivery error:', err)
    }
  }

  return delivered
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { full_name, email, project_description } = body
    if (!full_name?.trim() || !email?.trim() || !project_description?.trim()) {
      return NextResponse.json(
        { error: 'Please provide your name, email, and project description.' },
        { status: 400 }
      )
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    const payload: EnquiryData = {
      full_name: body.full_name?.trim(),
      company_name: body.company_name?.trim() || null,
      email: body.email?.trim(),
      phone: body.phone?.trim() || null,
      services_required: body.services_required || [],
      budget: body.budget || null,
      project_description: body.project_description?.trim(),
    }

    const submittedAt =
      new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST'

    // Dispatch email notification to soletrustmedia@gmail.com
    const emailDelivered = await dispatchEmailNotification(payload, submittedAt)

    // Save to Supabase (if configured)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

    let dbSaved = false

    if (supabaseUrl && supabaseKey && !supabaseUrl.includes('placeholder')) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey)

        const { error } = await supabase.from('enquiries').insert({
          full_name: payload.full_name,
          company_name: payload.company_name,
          email: payload.email,
          phone: payload.phone,
          services_required: payload.services_required,
          budget: payload.budget,
          project_description: payload.project_description,
          status: 'new',
        })

        if (!error) {
          dbSaved = true
        } else {
          // Fallback to contact_submissions table if enquiries doesn't exist
          const { error: fallbackError } = await supabase
            .from('contact_submissions')
            .insert({
              name: payload.full_name,
              email: payload.email,
              company: payload.company_name,
              budget: payload.budget,
              message: `[Phone: ${payload.phone || 'N/A'}] [Services: ${(payload.services_required || []).join(', ')}]\n\n${payload.project_description}`,
            })
          if (!fallbackError) {
            dbSaved = true
          }
        }
      } catch (dbErr) {
        console.warn('Supabase enquiry insertion error:', dbErr)
      }
    }

    // Always log the received lead for server audit trail
    console.info('[LEAD RECORDED]:', {
      timestamp: new Date().toISOString(),
      name: payload.full_name,
      email: payload.email,
      company: payload.company_name,
      phone: payload.phone,
      services: payload.services_required,
      budget: payload.budget,
      routedToEmail: TARGET_NOTIFICATION_EMAIL,
      emailDelivered,
      persistedToDb: dbSaved,
    })

    return NextResponse.json({
      success: true,
      emailed: emailDelivered,
      persisted: dbSaved,
      recipient: TARGET_NOTIFICATION_EMAIL,
    })
  } catch (err) {
    console.error('Unhandled error in /api/enquiries:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
