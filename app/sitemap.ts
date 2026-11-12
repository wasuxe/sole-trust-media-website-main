import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import { PROJECTS } from '@/lib/data/projects'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://soletrustmedia.vercel.app'

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/work`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const allStatic = [...staticRoutes, ...projectRoutes]

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return allStatic
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data: projects } = await supabase
      .from('projects')
      .select('slug, updated_at')
      .eq('status', 'published')

    const knownSlugs = new Set(PROJECTS.map((p) => p.slug))
    const dbRoutes: MetadataRoute.Sitemap = (projects || [])
      .filter((p) => !knownSlugs.has(p.slug))
      .map((p) => ({
        url: `${baseUrl}/work/${p.slug}`,
        lastModified: new Date(p.updated_at),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }))

    return [...allStatic, ...dbRoutes]
  } catch {
    return allStatic
  }
}
