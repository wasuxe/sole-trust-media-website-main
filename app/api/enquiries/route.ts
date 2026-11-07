import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { full_name, email, project_description } = body
    if (!full_name?.trim() || !email?.trim() || !project_description?.trim()) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    )

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

    if (error) {
      // Fallback to contact_submissions if enquiries table doesn't exist
      const { error: fallbackError } = await supabase.from('contact_submissions').insert({
        name: body.full_name?.trim(),
        email: body.email?.trim(),
        company: body.company_name?.trim() || null,
        budget: body.budget || null,
        message: body.project_description?.trim(),
      })
      if (fallbackError) {
        return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
