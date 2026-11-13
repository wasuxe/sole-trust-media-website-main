import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { full_name, email, project_description } = body
    if (!full_name?.trim() || !email?.trim() || !project_description?.trim()) {
      return NextResponse.json({ error: 'Please provide your name, email, and project description.' }, { status: 400 })
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

    let dbSaved = false

    if (supabaseUrl && supabaseKey && !supabaseUrl.includes('placeholder')) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey)

        const { error } = await supabase.from('enquiries').insert({
          full_name: body.full_name?.trim(),
          company_name: body.company_name?.trim() || null,
          email: body.email?.trim(),
          phone: body.phone?.trim() || null,
          services_required: body.services_required || [],
          budget: body.budget || null,
          project_description: body.project_description?.trim(),
          status: 'new',
        })

        if (!error) {
          dbSaved = true
        } else {
          // Fallback to contact_submissions table if enquiries doesn't exist
          const { error: fallbackError } = await supabase.from('contact_submissions').insert({
            name: body.full_name?.trim(),
            email: body.email?.trim(),
            company: body.company_name?.trim() || null,
            budget: body.budget || null,
            message: `[Phone: ${body.phone || 'N/A'}] [Services: ${(body.services_required || []).join(', ')}]\n\n${body.project_description?.trim()}`,
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
      name: body.full_name?.trim(),
      email: body.email?.trim(),
      company: body.company_name?.trim() || null,
      phone: body.phone?.trim() || null,
      services: body.services_required || [],
      budget: body.budget || null,
      persistedToDb: dbSaved,
    })

    return NextResponse.json({ success: true, persisted: dbSaved })
  } catch (err) {
    console.error('Unhandled error in /api/enquiries:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
