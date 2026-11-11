"use client"

import { useState, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"
import { createClient } from "@supabase/supabase-js"
import SiteNav from "@/components/site-nav"

interface Project {
  slug: string
  title: string
  client_name?: string
  category: string
  short_description?: string
  cover_image?: string
  featured?: boolean
  status?: string
  display_order?: number
}

const STATIC_PROJECTS: Project[] = [
  {
    slug: "13isu",
    title: "13ISU",
    client_name: "13ISU",
    category: "Branding & Identity",
    short_description: "A speciality tiramisu brand shaped through identity, product-led creative and social communication.",
    cover_image: "/13isu-logo.svg",
    featured: true,
    status: "published",
  },
  {
    slug: "lumora-beauty",
    title: "Lumora Beauty",
    client_name: "Lumora Beauty",
    category: "Packaging Design",
    short_description: "Product packaging artwork supplied for body butter, cream, serum, sheet mask and soap.",
    cover_image: "https://drive.google.com/uc?export=download&id=163Z7B0H5mx0OqzKJ-r2oGQZ4AQspqdDf",
    featured: true,
    status: "published",
  },
  {
    slug: "sole-trust-media",
    title: "Sole Trust Media",
    client_name: "Sole Trust Media",
    category: "Website Development",
    short_description: "Our own brand system: a digital home for strategy, creativity, marketing and technology.",
    cover_image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1200&q=85",
    featured: true,
    status: "published",
  },
]

const CATEGORIES = [
  "All Projects",
  "Branding & Identity",
  "Packaging Design",
  "Website Development",
  "Application Development",
  "Digital Marketing",
  "Creative & Content",
  "Technology & Automation",
] as const

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1200&q=85"

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All Projects")
  const [projects, setProjects] = useState<Project[]>(STATIC_PROJECTS)

  useEffect(() => {
    let isMounted = true

    async function loadProjects() {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseKey =
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
          process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

        if (!supabaseUrl || !supabaseKey) {
          if (isMounted) setProjects(STATIC_PROJECTS)
          return
        }

        const supabase = createClient(supabaseUrl, supabaseKey)
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("status", "published")
          .order("display_order", { ascending: true })

        if (!error && data && data.length > 0) {
          const mapped: Project[] = data.map((item: Record<string, unknown>) => ({
            slug: String(item.slug || ""),
            title: String(item.title || item.name || ""),
            client_name: String(item.client_name || item.title || item.name || ""),
            category: String(item.category || "Branding & Identity"),
            short_description: String(item.short_description || item.overview || item.description || ""),
            cover_image: String(item.cover_image || item.image || FALLBACK_IMAGE),
            featured: Boolean(item.featured),
            status: String(item.status || "published"),
            display_order: typeof item.display_order === "number" ? item.display_order : undefined,
          }))
          if (isMounted) setProjects(mapped)
        } else {
          if (isMounted) setProjects(STATIC_PROJECTS)
        }
      } catch {
        if (isMounted) setProjects(STATIC_PROJECTS)
      }
    }

    loadProjects()

    return () => {
      isMounted = false
    }
  }, [])

  const filteredProjects =
    activeCategory === "All Projects"
      ? projects
      : projects.filter(
          (project) =>
            project.category.trim().toLowerCase() === activeCategory.trim().toLowerCase()
        )

  return (
    <main className="site-shell">
      <SiteNav />

      {/* Hero Header */}
      <section className="work-page-hero">
        <p className="eyebrow">04 / Complete portfolio</p>
        <h1>
          Selected work.<br />
          <i>Distinctive thinking.</i>
        </h1>
        <p>
          Real work, thoughtful systems and creative direction built to help ambitious businesses move forward.
        </p>
      </section>

      {/* Filter and Portfolio Grid */}
      <section className="portfolio-section">
        <div className="filter-bar" role="tablist" aria-label="Portfolio filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={activeCategory === cat ? "active" : ""}
              onClick={() => setActiveCategory(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="portfolio-empty">
            <p>No projects published under &ldquo;{activeCategory}&rdquo; yet.</p>
          </div>
        ) : (
          <div className="portfolio-grid">
            {filteredProjects.map((project) => {
              const coverUrl = project.cover_image || FALLBACK_IMAGE
              return (
                <a
                  className="portfolio-card"
                  href={`/work/${project.slug}`}
                  key={project.slug}
                >
                  <div className="portfolio-card-image">
                    <img
                      src={coverUrl}
                      alt={`${project.title} — ${project.category}`}
                      loading="lazy"
                    />
                  </div>
                  <div className="portfolio-card-meta">
                    <div>
                      <p>{project.category}</p>
                      <h2>{project.title}</h2>
                      {project.short_description && (
                        <p className="portfolio-card-desc">{project.short_description}</p>
                      )}
                    </div>
                    <ArrowUpRight aria-hidden="true" />
                  </div>
                </a>
              )
            })}
          </div>
        )}
      </section>

      {/* Contact CTA */}
      <section className="contact portfolio-contact">
        <div className="contact-inner">
          <p className="eyebrow">Have a good one?</p>
          <h2>
            Let&apos;s make<br />
            <i>something memorable.</i>
          </h2>
          <a className="button button-light" href="/#contact">
            Start a project <ArrowUpRight data-icon="inline-end" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-top">
          <a className="wordmark footer-mark" href="/">
            <span>STM</span>
            <small>SOLE TRUST MEDIA</small>
          </a>
          <p>
            Brand building, creative,<br />
            marketing &amp; technology.
          </p>
          <div className="socials">
            <a href="/#contact" aria-label="Instagram">
              IG
            </a>
            <a href="/#contact" aria-label="LinkedIn">
              IN
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 Sole Trust Media</span>
          <span>Not Just Seen. Remembered.</span>
          <div>
            <a href="/#contact">Privacy</a>
            <a href="/#contact">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
