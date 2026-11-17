"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react"
import { createClient } from "@supabase/supabase-js"
import { PROJECTS } from "@/lib/data/projects"
import SiteNav from "@/components/site-nav"
import SiteFooter from "@/components/site-footer"
import CaseStudyDrawer, { type CaseDrawerProject } from "@/components/case-study-drawer"
import { MotionWrapper, AnimatedHairline } from "@/components/MotionWrapper"
import { useSound } from "@/components/sound-provider"

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
  const router = useRouter()
  const { playWarmClick } = useSound()
  const [activeCategory, setActiveCategory] = useState<string>("All Work")
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS)
  const [activeDrawerProject, setActiveDrawerProject] = useState<CaseDrawerProject | null>(null)

  const handleBuildLikeThis = (services: string[], projectName: string) => {
    setActiveDrawerProject(null)
    const params = new URLSearchParams()
    if (services.length > 0) params.set("services", services.join(","))
    params.set("project", projectName)
    router.push(`/contact?${params.toString()}`)
  }

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

  const open13isuDrawer = () => {
    setActiveDrawerProject({
      slug: "13isu",
      name: "13ISU — Tiramisu Brand Experience",
      category: "Culinary Identity & Viral Launch",
      image: "/13isu-creative-1.png",
      targetUrl: "/work/13isu",
      isExternal: false,
    })
  }

  const openTrendsDrawer = () => {
    setActiveDrawerProject({
      slug: "trends-are-a-tool",
      name: "Trends Are a Tool, Not a Strategy",
      category: "Strategic Thesis & Social Commerce",
      image: "/assets/work/trends-are-a-tool/trends-cover.svg",
      targetUrl: "/work/trends-are-a-tool",
      isExternal: false,
    })
  }

  return (
    <main className="site-shell">
      <SiteNav />

      {/* 1. Deep Espresso Hero + Featured Vertical Strip */}
      <section
        className="work-hero-espresso"
        style={{
          padding: "clamp(108px, 11vw, 144px) var(--page-gutter) clamp(52px, 6vw, 76px)",
        }}
      >
        <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
          <MotionWrapper>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: "20px",
                marginBottom: "24px",
              }}
            >
              <div>
                <p
                  className="editorial-label"
                  style={{ color: "var(--accent-gold)", marginBottom: "10px", display: "inline-flex", alignItems: "center", gap: "8px" }}
                >
                  <span>*</span> 01 / Complete Portfolio &bull; 20+ Commissions
                </p>
                <h1 className="work-hero-espresso-title" style={{ margin: 0 }}>
                  SELECTED{" "}
                  <i style={{ color: "var(--accent-gold)", fontStyle: "italic", fontFamily: "var(--font-editorial)", fontWeight: 400 }}>
                    WORK.
                  </i>
                </h1>
              </div>
              <p style={{ maxWidth: "440px", fontSize: "15px", lineHeight: 1.6, color: "rgba(246, 241, 233, 0.74)", margin: 0 }}>
                Flagship brand systems, tactile culinary identities, strategic frameworks, and interactive digital platforms built for category authority.
              </p>
            </div>
          </MotionWrapper>

          <AnimatedHairline tone="dark" style={{ marginBottom: "28px" }} />

          {/* Flagship Case Study Spotlights (13ISU Tiramisu + Trends Are a Tool) */}
          <MotionWrapper delay={0.06}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <span className="editorial-label" style={{ color: "var(--accent-gold)" }}>
                * Flagship Case Studies &bull; 01 &amp; 02
              </span>
              <span style={{ fontFamily: "var(--font-utility)", fontSize: "10px", color: "rgba(246, 241, 233, 0.6)" }}>
                CLICK TO INSPECT DOSSIER
              </span>
            </div>

            <div className="stm-flagship-spotlights-grid">
              {/* Flagship Spotlight 01: Tiramisu (13ISU) */}
              <article
                className="stm-spotlight-card tone-parchment"
                data-magnetic-case="true"
                onClick={open13isuDrawer}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    open13isuDrawer()
                  }
                }}
              >
                <div className="stm-spotlight-top">
                  <span className="editorial-label" style={{ color: "var(--accent-terracotta)", fontSize: "10px" }}>
                    01 / Flagship Culinary Brand · 13ISU
                  </span>
                  <span className="stm-spotlight-pill">100K+ Views · 3 Days</span>
                </div>

                <h2 className="stm-spotlight-title">
                  Tiramisu, turned into a{" "}
                  <i style={{ fontFamily: "var(--font-editorial)", fontWeight: 400, color: "var(--accent-terracotta)" }}>
                    sensory ritual.
                  </i>
                </h2>
                <p className="stm-spotlight-desc">
                  End-to-end naming (&ldquo;Terah&rdquo; + ISU), tactile packaging craft, night-market spatial direction, and viral short-form launch reels that ignited organic demand from day one.
                </p>

                {/* 3-Image Gallery Strip */}
                <div className="stm-spotlight-gallery-3">
                  <div className="stm-spotlight-thumb">
                    <img src="/13isu-creative-1.png" alt="13ISU night-market booth activation" loading="lazy" />
                  </div>
                  <div className="stm-spotlight-thumb">
                    <img src="/13isu-creative-2.png" alt="13ISU tactile packaging design" loading="lazy" />
                  </div>
                  <div className="stm-spotlight-thumb">
                    <img src="/13isu-creative-3.png" alt="13ISU large-format event display" loading="lazy" />
                  </div>
                </div>

                <div className="stm-spotlight-actions">
                  <span className="stm-spotlight-link">
                    Inspect Dossier <ArrowRight size={13} />
                  </span>
                  <a
                    href="/work/13isu"
                    onClick={(e) => {
                      e.stopPropagation()
                      playWarmClick()
                    }}
                    className="stm-spotlight-secondary"
                  >
                    Full Spread <ArrowUpRight size={12} />
                  </a>
                </div>
              </article>

              {/* Flagship Spotlight 02: Trends Are a Tool, Not a Strategy */}
              <article
                className="stm-spotlight-card tone-espresso-deep"
                data-magnetic-case="true"
                onClick={openTrendsDrawer}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    openTrendsDrawer()
                  }
                }}
              >
                <div className="stm-spotlight-top">
                  <span className="editorial-label" style={{ color: "var(--accent-gold)", fontSize: "10px" }}>
                    02 / Featured Strategic Thesis
                  </span>
                  <span className="stm-spotlight-pill dark">+140% Enquiry Lift</span>
                </div>

                <h2 className="stm-spotlight-title" style={{ color: "var(--text-cream)" }}>
                  Trends Are a Tool,{" "}
                  <i style={{ fontFamily: "var(--font-editorial)", fontWeight: 400, color: "var(--accent-gold)" }}>
                    Not a Strategy.
                  </i>
                </h2>

                <div className="stm-spotlight-quote-box">
                  <Quote size={14} style={{ color: "var(--accent-gold)", flexShrink: 0, marginTop: "3px" }} />
                  <p>
                    &ldquo;Views are coming. Customers are not. If people only recognise your brand when it uses viral audio, you do not have an identity yet.&rdquo;
                  </p>
                </div>

                <div className="stm-spotlight-thesis-visual">
                  <img
                    src="/assets/work/trends-are-a-tool/trends-cover.svg"
                    alt="Trends Are a Tool, Not a Strategy — Strategic Framework Cover"
                    loading="lazy"
                  />
                </div>

                <div className="stm-spotlight-actions">
                  <span className="stm-spotlight-link" style={{ color: "var(--accent-gold)" }}>
                    Read Strategic Dossier <ArrowRight size={13} />
                  </span>
                  <a
                    href="/work/trends-are-a-tool"
                    onClick={(e) => {
                      e.stopPropagation()
                      playWarmClick()
                    }}
                    className="stm-spotlight-secondary dark"
                  >
                    Full Thesis <ArrowUpRight size={12} />
                  </a>
                </div>
              </article>
            </div>
          </MotionWrapper>

          <AnimatedHairline tone="dark" style={{ margin: "36px 0 24px" }} />

          {/* Rounded 5-Card Vertical Showcase Strip */}
          <MotionWrapper delay={0.1}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <span className="editorial-label" style={{ color: "var(--accent-gold)" }}>
                Signature Commissions &bull; 01—05
              </span>
              <span className="editorial-marker" style={{ color: "var(--accent-gold)" }}>+</span>
            </div>

            <div className="showcase-five-strip">
              {featuredShowcase.map((item) => (
                <a
                  key={item.slug}
                  href={item.href}
                  data-magnetic-case="true"
                  className="showcase-vertical-card"
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveDrawerProject({
                      slug: item.slug,
                      name: item.title,
                      category: item.category,
                      image: item.cover_image,
                      targetUrl: item.href,
                      isExternal: item.isExternal,
                    })
                  }}
                >
                  <div className="showcase-vertical-media">
                    <img src={item.cover_image} alt={`${item.title} showcase`} loading="lazy" />
                    <span className="showcase-vertical-index">{item.index}</span>
                  </div>
                  <div className="showcase-vertical-meta">
                    <div className="showcase-vertical-title-row">
                      <h2 className="showcase-vertical-title">{item.title}</h2>
                      <ArrowUpRight size={13} style={{ color: "var(--accent-gold)", flexShrink: 0 }} />
                    </div>
                    <span className="showcase-vertical-cat">{item.category}</span>
                  </div>
                </a>
              ))}
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* 2. Warm Parchment Filterable Complete Archive Grid */}
      <section
        className="portfolio-section"
        style={{
          background: "var(--bg-parchment)",
          padding: "clamp(48px, 5.5vw, 76px) var(--page-gutter)",
        }}
      >
        <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
          <MotionWrapper>
            <div className="showcase-filter-pills" role="tablist" aria-label="Portfolio filters" style={{ marginBottom: "32px" }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`showcase-pill-btn ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => {
                    playWarmClick()
                    setActiveCategory(cat)
                  }}
                  role="tab"
                  aria-selected={activeCategory === cat}
                >
                  {cat} <span style={{ opacity: 0.65, fontSize: "9px", marginLeft: "4px" }}>({categoryCounts[cat] ?? 0})</span>
                </button>
              ))}
            </div>
          </MotionWrapper>

          {filteredProjects.length === 0 ? (
            <div className="portfolio-empty" style={{ textAlign: "center", padding: "48px 20px" }}>
              <p style={{ color: "var(--muted)", margin: "0 0 16px" }}>No projects found under &ldquo;{activeCategory}&rdquo;.</p>
              <button
                className="stm-btn-terracotta"
                onClick={() => {
                  playWarmClick()
                  setActiveCategory("All Work")
                }}
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
                      data-magnetic-case="true"
                      className="selected-card-image"
                      onClick={(e) => {
                        e.preventDefault()
                        setActiveDrawerProject({
                          slug: project.slug,
                          name: project.title,
                          category: project.category,
                          image: project.cover_image,
                          targetUrl,
                          isExternal,
                          description: project.short_description,
                          services: project.services,
                        })
                      }}
                      aria-label={`Inspect ${project.title} case study`}
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

      {/* 3. Compact Deep Espresso Contact CTA */}
      <section
        className="contact portfolio-contact"
        style={{
          background: "var(--bg-espresso)",
          color: "var(--text-cream)",
          padding: "clamp(56px, 6vw, 88px) var(--page-gutter)",
        }}
      >
        <MotionWrapper>
          <div className="contact-inner">
            <p className="editorial-label" style={{ color: "var(--accent-gold)", marginBottom: "12px" }}>
              * 03 / Have a good one?
            </p>
            <h2 style={{ marginBottom: "24px" }}>
              Let&apos;s make{" "}
              <i style={{ fontFamily: "var(--font-editorial)", fontWeight: 400, color: "var(--accent-gold)" }}>
                something memorable.
              </i>
            </h2>
            <a className="stm-btn-terracotta" href="/contact" onClick={() => playWarmClick()}>
              Start a Similar Project <ArrowUpRight size={14} />
            </a>
          </div>
        </MotionWrapper>
      </section>

      <SiteFooter />

      <CaseStudyDrawer
        project={activeDrawerProject}
        onClose={() => setActiveDrawerProject(null)}
        onBuildLikeThis={handleBuildLikeThis}
      />
    </main>
  )
}
