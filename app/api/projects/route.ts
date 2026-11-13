import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { PROJECTS } from '@/lib/data/projects'

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

    if (supabaseUrl && supabaseKey && !supabaseUrl.includes('placeholder')) {
      const supabase = createClient(supabaseUrl, supabaseKey)
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'published')
        .order('display_order', { ascending: true })

      if (!error && data && data.length > 0) {
        return NextResponse.json({ projects: data, source: 'supabase' })
      }
    }

    // Resilient fallback to verified local PROJECTS archive
    return NextResponse.json({ projects: PROJECTS, source: 'static' })
  } catch (err) {
    console.error('Error fetching projects in API route:', err)
    return NextResponse.json({ projects: PROJECTS, source: 'fallback' })
  }
}
