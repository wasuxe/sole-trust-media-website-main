"use client"

import { useState, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"
import { createClient } from "@supabase/supabase-js"
import { PROJECTS, type Project as StaticProject } from "@/lib/data/projects"
import SiteNav from "@/components/site-nav"
import SiteFooter from "@/components/site-footer"

interface Project {
  slug: string
  title: string
  name?: string
  client_name?: string
  type?: string
  category: string
  short_description?: string
  description?: string
  note?: string
  services?: string[]
  cover_image: string
  marker?: string
  tag?: string
  cta?: string
  link?: string
  website?: string
  tags?: string[]
  featured?: boolean
  status?: string
  display_order?: number
}

const CATEGORIES = [
  "All Work",
  "Brand & Strategy",
  "Digital Flagships",
  "Creative & Content",
  "Technology & Systems",
] as const

const FEATURED_SHOWCASE_SLUGS = [
  { slug: "twine", fallbackName: "Twine", fallbackImage: "/assets/work/twine/twine-01.jpeg", fallbackCat: "Brand & Strategy" },
  { slug: "future-luxe", fallbackName: "Future Luxe", fallbackImage: "/assets/work/future-luxe/future-luxe-01.png", fallbackCat: "Digital Flagships" },
  { slug: "lumora", fallbackName: "Lumora", fallbackImage: "/assets/work/lumora/lumora-01.png", fallbackCat: "Brand & Strategy" },
  { slug: "13isu", fallbackName: "13isu", fallbackImage: "/13isu-creative-1.png", fallbackCat: "Creative & Content" },
  { slug: "trends-are-a-tool", fallbackName: "Trends Are a Tool", fallbackImage: "/assets/work/trends-are-a-tool/trends-cover.svg", fallbackCat: "Brand & Strategy" },
] as const

const INITIAL_PROJECTS: Project[] = PROJECTS.map((p) => ({
  slug: p.slug,
  title: p.name,
  name: p.name,
  client_name: p.client_name,
  type: p.type,
  category: p.category,
  short_description: p.description,
  description: p.description,
  note: p.note,
  services: p.services,
  cover_image: p.cover_image,
  marker: p.marker,
  tag: p.tag,
  cta: p.cta,
  link: p.link,
  website: p.website,
  tags: p.tags,
  featured: p.featured,
  status: p.status,
  display_order: p.display_order,
}))

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All Work")
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS)

  useEffect(() => {
    let isMounted = true

    async function loadProjects() {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseKey =
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
          process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

        if (!supabaseUrl || !supabaseKey) {
          if (isMounted) setProjects(INITIAL_PROJECTS)
          return
        }

        const supabase = createClient(supabaseUrl, supabaseKey)
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("status", "published")
          .order("display_order", { ascending: true })

        if (!error && data && data.length > 0) {
          const mapped: Project[] = data.map((item: Record<string, unknown>) => {
            const staticMatch = PROJECTS.find((sp) => sp.slug === String(item.slug || ""))
            return {
              slug: String(item.slug || ""),
              title: String(item.title || item.name || staticMatch?.name || ""),
              name: String(item.name || item.title || staticMatch?.name || ""),
              client_name: String(item.client_name || staticMatch?.client_name || ""),
              type: String(item.type || staticMatch?.type || ""),
              category: String(item.category || staticMatch?.category || "Selected Work"),
              short_description: String(
                item.short_description || item.description || staticMatch?.description || ""
              ),
              description: String(item.description || staticMatch?.description || ""),
              note: String(item.note || staticMatch?.note || ""),
              services: Array.isArray(item.services)
                ? (item.services as string[])
                : staticMatch?.services ?? [],
              cover_image: String(item.cover_image || staticMatch?.cover_image || "/placeholder.jpg"),
              marker: String(item.marker || staticMatch?.marker || ""),
              tag: String(item.tag || staticMatch?.tag || "CLIENT WORK"),
              cta: String(item.cta || staticMatch?.cta || "VIEW PROJECT"),
              link: String(item.link || item.website || staticMatch?.link || ""),
              website: String(item.website || staticMatch?.website || ""),
              tags: Array.isArray(item.tags) ? (item.tags as string[]) : staticMatch?.tags ?? [],
              featured: Boolean(item.featured),
              status: String(item.status || "published"),
              display_order:
                typeof item.display_order === "number" ? item.display_order : staticMatch?.display_order,
            }
          })
          if (isMounted) setProjects(mapped)
        } else {
          if (isMounted) setProjects(INITIAL_PROJECTS)
        }
      } catch {
        if (isMounted) setProjects(INITIAL_PROJECTS)
      }
    }

    loadProjects()

    return () => {
      isMounted = false
    }
  }, [])

  function matchesCategory(project: Project, cat: string): boolean {
    if (cat === "All Work") return true
    const text = [
      project.title,
      project.name,
      project.category,
      project.type,
      (project.tags || []).join(" "),
      (project.services || []).join(" "),
    ]
      .join(" ")
      .toLowerCase()

    switch (cat) {
      case "Brand & Strategy":
        return /\b(brand|branding|identity|typography|packaging|strategy|framework|concept|raya|lumora|twine|aurelia)\b/i.test(text)
      case "Digital Flagships":
        return /\b(web|website|digital|interface|figma|portal|platform|flagship|future|luxe|e-commerce)\b/i.test(text)
      case "Creative & Content":
        return /\b(creative|content|social|music|media|editorial|video|campaign|13isu|dessert|trends)\b/i.test(text)
      case "Technology & Systems":
        return /\b(ai|technology|automation|saas|supply chain|farmlytics|chainmind|system|analytics)\b/i.test(text)
      default:
        return true
    }
  }

  const categoryCounts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = projects.filter((p) => matchesCategory(p, cat)).length
    return acc
  }, {} as Record<string, number>)

  const featuredShowcase = FEATURED_SHOWCASE_SLUGS.map((slot, index) => {
    const found = projects.find((p) => p.slug === slot.slug)
    return {
      slug: slot.slug,
      title: found?.title || slot.fallbackName,
      cover_image: slot.fallbackImage,
      category: found?.category || slot.fallbackCat,
      href:
        slot.slug === "13isu"
          ? "/work/13isu"
          : slot.slug === "trends-are-a-tool"
          ? "/work/trends-are-a-tool"
          : found?.link || `/work/${slot.slug}`,
      isExternal: Boolean(found?.link && slot.slug !== "13isu" && slot.slug !== "trends-are-a-tool"),
      index: `0${index + 1}`,
    }
  })

  const filteredProjects =
    activeCategory === "All Work"
      ? projects
      : projects.filter((project) => matchesCategory(project, activeCategory))

  return (
    <main className="site-shell">
      {/* Navigation */}
      <SiteNav />

      {/* Hero Header */}
      <section className="work-page-hero" style={{ background: "var(--bg-parchment)" }}>
        <p className="editorial-label" style={{ color: "var(--accent-terracotta)", marginBottom: "14px" }}>
          * 04 / Complete Portfolio
        </p>
        <h1>
          Selected work.<br />
          <i style={{ fontFamily: "var(--font-editorial)", fontWeight: 400, color: "var(--accent-terracotta)" }}>Distinctive thinking.</i>
        </h1>
        <p>
          Live digital flagships, conceptual brand systems, and performance architectures built to help ambitious businesses command attention and grow.
        </p>
      </section>

      {/* Featured 5-Card Vertical Showcase Strip */}
      <section className="showcase-editorial-section" style={{ paddingTop: "64px", paddingBottom: "48px" }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <span className="editorial-label" style={{ color: "var(--muted)" }}>
              Featured Commissions &bull; 01—05
            </span>
            <span className="editorial-marker">+</span>
          </div>

          <div className="showcase-five-strip">
            {featuredShowcase.map((item) => (
              <a
                key={item.slug}
                href={item.href}
                className="showcase-vertical-card"
                {...(item.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <div className="showcase-vertical-media">
                  <img src={item.cover_image} alt={`${item.title} showcase`} loading="lazy" />
                  <span className="showcase-vertical-index">{item.index}</span>
                </div>
                <div className="showcase-vertical-meta">
                  <div className="showcase-vertical-title-row">
                    <h2 className="showcase-vertical-title">{item.title}</h2>
                    <ArrowUpRight size={13} style={{ color: "var(--accent-terracotta)", flexShrink: 0 }} />
                  </div>
                  <span className="showcase-vertical-cat">{item.category}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Filter and Complete Portfolio Grid */}
      <section className="portfolio-section" style={{ background: "var(--bg-parchment)", paddingTop: "40px" }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
          <div className="showcase-filter-pills" role="tablist" aria-label="Portfolio filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`showcase-pill-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
                role="tab"
                aria-selected={activeCategory === cat}
              >
                {cat} <span style={{ opacity: 0.65, fontSize: "9px", marginLeft: "4px" }}>({categoryCounts[cat] ?? 0})</span>
              </button>
            ))}
          </div>

          {filteredProjects.length === 0 ? (
            <div className="portfolio-empty" style={{ textAlign: "center", padding: "60px 20px" }}>
              <p style={{ color: "var(--muted)", margin: "0 0 16px" }}>No projects found under &ldquo;{activeCategory}&rdquo;.</p>
              <button
                className="stm-btn-terracotta"
                onClick={() => setActiveCategory("All Work")}
                style={{ padding: "11px 22px", fontSize: "10px" }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="selected-work-grid">
            {filteredProjects.map((project) => {
              const isExternal = Boolean(project.link && project.slug !== "13isu" && project.slug !== "trends-are-a-tool")
              const targetUrl =
                project.slug === "13isu"
                  ? "/work/13isu"
                  : project.slug === "trends-are-a-tool" || project.slug === "trends"
                  ? "/work/trends-are-a-tool"
                  : project.link || `/work/${project.slug}`

              return (
                <div className="selected-card" key={project.slug}>
                  <a
                    href={targetUrl}
                    className="selected-card-image"
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={`View ${project.title}`}
                  >
                    <img
                      src={project.cover_image}
                      alt={`${project.title} — ${project.category}`}
                      loading="lazy"
                    />
                    {project.tag && <span className="selected-card-tag">{project.tag}</span>}
                    {project.marker && <span className="selected-card-marker">{project.marker}</span>}
                  </a>
                  <div className="selected-card-body">
                    <div>
                      <div className="selected-card-type">{project.type || project.category}</div>
                      <h2 className="selected-card-title">
                        <a
                          href={targetUrl}
                          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          {project.title}
                        </a>
                      </h2>
                      {project.short_description && (
                        <p className="selected-card-desc">{project.short_description}</p>
                      )}
                      {project.services && project.services.length > 0 && (
                        <div className="selected-card-services">
                          {project.services.slice(0, 4).map((s) => (
                            <span className="selected-card-service-pill" key={s}>
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {isExternal ? (
                      <a
                        className="selected-card-cta"
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.cta || "OPEN WEBSITE"} <ArrowUpRight size={14} />
                      </a>
                    ) : (
                      <a className="selected-card-cta" href={targetUrl}>
                        {project.cta || "VIEW PROJECT"} <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="contact portfolio-contact" style={{ background: "var(--bg-espresso)", color: "var(--text-cream)" }}>
        <div className="contact-inner">
          <p className="editorial-label" style={{ color: "var(--beige)", marginBottom: "14px" }}>* Have a good one?</p>
          <h2>
            Let&apos;s make<br />
            <i style={{ fontFamily: "var(--font-editorial)", fontWeight: 400, color: "#e49581" }}>something memorable.</i>
          </h2>
          <a className="stm-btn-terracotta" href="/contact">
            Start a project <ArrowUpRight size={14} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </main>
  )
}
