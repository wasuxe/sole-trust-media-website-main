"use client"

import { ArrowUpRight, ArrowDown, Mail, MapPin, Plus, Check, Compass, Layers, Sparkles, Globe } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { PROJECTS, type Project } from "@/lib/data/projects"
import SiteNav from "@/components/site-nav"
import SiteFooter from "@/components/site-footer"
import HeroEditorialVisual from "@/components/hero-editorial-visual"

// ============================================================================
// DATA STRUCTURES & DEFINITIONS
// ============================================================================

interface Capability {
  number: string
  title: string
  tagline: string
  description: string
  valueProposition: string
  deliverables: string[]
  href: string
}

const CAPABILITIES: Capability[] = [
  {
    number: "01",
    title: "Brand Strategy & Identity",
    tagline: "Positioning, visual architecture & brand foundations",
    description:
      "We define why your brand matters, who it serves, and the singular positioning that makes competitors irrelevant. From visual identity systems to voice, guidelines and packaging.",
    valueProposition: "Value: Command pricing power, build unshakeable customer loyalty, and stand apart from commodity rivals.",
    deliverables: [
      "Brand Positioning & Strategy",
      "Visual Identity & Logo Systems",
      "Design Systems & Brand Guidelines",
      "Packaging & Unboxing Design",
      "Brand Voice & Messaging Frameworks",
      "Rebranding & Identity Evolution",
    ],
    href: "/services",
  },
  {
    number: "02",
    title: "Creative Direction & Content",
    tagline: "High-craft visuals, campaigns & editorial storytelling",
    description:
      "Campaign-level creative direction, short-form video production, and editorial photography that bring your brand narrative to life with authenticity, cultural prestige, and emotional punch.",
    valueProposition: "Value: Earn genuine attention, elevate cultural cachet, and turn passive scrollers into passionate advocates.",
    deliverables: [
      "Creative Direction & Concepts",
      "Short-Form Video & Viral Reels",
      "Editorial Photography & Art Direction",
      "Brand Campaign Production",
      "Social Media Visual Systems",
      "Motion Design & Visual Assets",
    ],
    href: "/services",
  },
  {
    number: "03",
    title: "Digital Experiences & Websites",
    tagline: "Bespoke digital flagships & interactive web platforms",
    description:
      "Fast, responsive, conversion-engineered digital experiences built with modern technology stacks. We merge aesthetic elegance with fluid interaction design and bulletproof frontend engineering.",
    valueProposition: "Value: Turn cold visitors into qualified, high-intent client enquiries with frictionless digital journeys.",
    deliverables: [
      "High-Performance Digital Flagships",
      "Bespoke Web & Mobile Applications",
      "Creative E-commerce Experiences",
      "UI/UX Design Systems",
      "Interactive 3D & Motion UI",
      "Technical SEO & Core Web Vitals",
    ],
    href: "/services",
  },
  {
    number: "04",
    title: "Marketing & Business Growth",
    tagline: "Data-led acquisition, social commerce & funnel telemetry",
    description:
      "Targeted, outcome-focused growth architectures across search, social, and paid media that deliver predictable customer acquisition, lower CAC, and high customer lifetime value.",
    valueProposition: "Value: Lower customer acquisition costs, build consistent inbound pipeline, and track every rupee spent.",
    deliverables: [
      "Paid Performance Media (Meta & Google)",
      "Social Commerce & Inbound Funnels",
      "Search Engine Optimization (SEO)",
      "Funnel Telemetry & Conversion Rate Optimization",
      "Influencer & Creator Collaborations",
      "Omnichannel Campaign Strategy",
    ],
    href: "/services",
  },
  {
    number: "05",
    title: "Technology & Business Automation",
    tagline: "Intelligent systems, workflow automation & custom software",
    description:
      "Automated operational pipelines, AI-assisted lead qualification, and custom business platforms that eliminate repetitive overhead and streamline customer journeys from enquiry to fulfillment.",
    valueProposition: "Value: Reclaim hundreds of productive hours, eliminate operational bottlenecks, and scale without bloating headcount.",
    deliverables: [
      "Workflow & Inbound Automation",
      "AI Assistants & Agentic Integrations",
      "CRM & Sales Pipeline Systems",
      "Custom SaaS & Business Management Tools",
      "API Integrations & Cloud Infrastructure",
      "Database Architecture & Telemetry",
    ],
    href: "/services",
  },
]

const FRICTION_POINTS = [
  {
    num: "01",
    title: "The Visibility Illusion",
    explanation:
      "Having an online presence is not the same as commanding attention. Views without engagement are vanity; reach without affinity is a squandered budget.",
    consequence: "Suppressed pricing power, commoditisation, and high ad spend with negligible commercial return.",
  },
  {
    num: "02",
    title: "The Disconnected Stack",
    explanation:
      "When branding, social media, paid advertising, and website engineering operate in disconnected silos, customer experience breaks at every handoff.",
    consequence: "Leaky conversion funnels, brand dissonance, and confused prospects who bounce before inquiring.",
  },
  {
    num: "03",
    title: "The Trust Deficit",
    explanation:
      "High-value clients make split-second evaluations based on visual authority and digital polish. Outdated design costs real revenue before you ever speak.",
    consequence: "Lost enterprise deals, lower basket sizes, and prolonged sales cycles that exhaust leadership.",
  },
  {
    num: "04",
    title: "The Growth Ceiling",
    explanation:
      "Tactical hacks, one-off viral trends, and piecemeal design updates cannot fix foundational positioning gaps. Sustainable scale requires an integrated system.",
    consequence: "Plateaued revenue, erratic inbound flow, and constant dependence on expensive outbound efforts.",
  },
]

const PHILOSOPHY_PRINCIPLES = [
  {
    num: "01",
    title: "Strategic Thinking",
    subtitle: "Clarity Before Execution",
    description:
      "We never begin with decoration alone. We start by deconstructing the market, the commercial objective, and the genuine psychological drivers of the customer. Every creative decision must answer a business question.",
  },
  {
    num: "02",
    title: "Creativity With Purpose",
    subtitle: "Distinction Over Noise",
    description:
      "Aesthetics without intent is superficial. We engineer visual identities and digital worlds that command immediate recognition, spark genuine emotion, and establish enduring cultural relevance.",
  },
  {
    num: "03",
    title: "Execution With Precision",
    subtitle: "Refuse to Compromise",
    description:
      "The difference between good and world-class lives in the micro-details: typography kerning, millisecond transition curves, and clean semantic architecture. We obsess over craft because customers feel the difference.",
  },
  {
    num: "04",
    title: "Technology With Intention",
    subtitle: "Speed, Scale & Stability",
    description:
      "We adopt technology to solve real human problems, not to chase ephemeral gimmicks. Our software, websites, and automations are lightweight, resilient, and engineered for sustainable business velocity.",
  },
  {
    num: "05",
    title: "Continuous Improvement",
    subtitle: "Enduring Evolution",
    description:
      "Launching is day one, not the finish line. We monitor real-world telemetry, audit friction points, and iteratively refine every system so your brand stays impossible to ignore and impossible to replace.",
  },
]

const STUDIO_INSIGHTS = [
  {
    id: "trends-vs-strategy",
    num: "01",
    category: "Brand Strategy & Commerce",
    author: "Written by Daksh Bhagat",
    date: "Spring 2026",
    readTime: "6 min read",
    title: "Trends Are a Tool, Not a Strategy",
    deck: "People are watching your posts, so why aren't they buying? An empirical examination of the vanity-reach paradox: why Store A's 100K trending views fail to convert while Store B's 8K customer-centric views drive predictable sales.",
    href: "/work/trends-are-a-tool",
  },
  {
    id: "architecture-of-distinction",
    num: "02",
    category: "Brand Identity",
    date: "Spring 2026",
    readTime: "5 min read",
    title: "The Architecture of Distinction",
    deck: "In an era saturated by AI-generated sameness and cookie-cutter design systems, the only defensible moat for ambitious businesses is visceral taste, tactile typography, and uncompromising craft.",
    href: "/services",
  },
  {
    id: "digital-flagships",
    num: "03",
    category: "Creative Technology",
    date: "Spring 2026",
    readTime: "7 min read",
    title: "Beyond the Template: The Rise of Digital Flagships",
    deck: "Why high-growth consumer brands are abandoning bloated off-the-shelf theme ecosystems for bespoke, high-performance web platforms engineered with Next.js, headless architectures, and micro-interactions.",
    href: "/work",
  },
  {
    id: "systems-and-scale",
    num: "04",
    category: "Technology & Systems",
    date: "Spring 2026",
    readTime: "5 min read",
    title: "Automating the Monotony, Amplifying the Craft",
    deck: "How modern creative studios deploy agentic workflow automations and intelligent lead qualification to eliminate operational friction without sacrificing high-touch human artistry.",
    href: "/contact",
  },
]

const SERVICE_OPTIONS = [
  "Brand Strategy & Identity",
  "Website / Digital Flagship",
  "E-commerce Platform",
  "Creative & Content Direction",
  "Performance Marketing",
  "Technology & Business Automation",
]

const BUDGET_OPTIONS = [
  "₹50,000 – ₹1,50,000",
  "₹1,50,000 – ₹3,50,000",
  "₹3,50,000 – ₹8,00,000",
  "₹8,00,000+",
]

const SHOWCASE_FILTERS = [
  "All Work",
  "Brand & Strategy",
  "Digital Flagships",
  "Creative & Content",
  "Technology & Systems",
] as const

const FEATURED_FIVE_SHOWCASE = [
  {
    slug: "twine",
    name: "Twine",
    category: "Brand & Strategy",
    image: "/assets/work/twine/twine-01.jpeg",
    filterKey: "Brand & Strategy",
  },
  {
    slug: "future-luxe",
    name: "Future Luxe",
    category: "Digital Flagships",
    image: "/assets/work/future-luxe/future-luxe-01.png",
    filterKey: "Digital Flagships",
  },
  {
    slug: "lumora",
    name: "Lumora",
    category: "Brand & Strategy",
    image: "/assets/work/lumora/lumora-01.png",
    filterKey: "Brand & Strategy",
  },
  {
    slug: "13isu",
    name: "13isu",
    category: "Creative & Content",
    image: "/13isu-creative-1.png",
    filterKey: "Creative & Content",
  },
  {
    slug: "trends-are-a-tool",
    name: "Trends Are a Tool",
    category: "Brand & Strategy",
    image: "/assets/work/trends-are-a-tool/trends-cover.svg",
    filterKey: "Brand & Strategy",
  },
] as const

const OLIVE_CLIENT_ROSTER = [
  "13ISU",
  "FARMLYTICS",
  "TWINE",
  "FUTURE LUXE",
  "LUMORA",
  "CHAINMIND AI",
  "RAYA SKINCARE",
  "AURELIA",
] as const

export default function Page() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [budget, setBudget] = useState<string>("")
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [workFilter, setWorkFilter] = useState<string>("All Work")
  const [submittedInfo, setSubmittedInfo] = useState<{
    fullName: string
    mailtoUrl: string
    gmailWebUrl: string
  } | null>(null)
  const [projectsList, setProjectsList] = useState<Project[]>(PROJECTS)

  useEffect(() => {
    let isMounted = true

    async function loadSupabaseProjects() {
      try {
        const client = getSupabaseBrowserClient()
        const { data, error } = await client
          .from("projects")
          .select("*")
          .eq("status", "published")
          .order("display_order", { ascending: true })

        if (!error && data && data.length > 0) {
          const mapped: Project[] = data.map((item: Record<string, unknown>, idx: number) => {
            const staticMatch = PROJECTS.find((sp) => sp.slug === String(item.slug || ""))
            if (staticMatch) {
              return {
                ...staticMatch,
                name: String(item.title || item.name || staticMatch.name),
                client_name: String(item.client_name || staticMatch.client_name || ""),
                category: String(item.category || staticMatch.category),
                description: String(item.description || item.short_description || staticMatch.description),
                cover_image: String(item.cover_image || staticMatch.cover_image),
                featured: Boolean(item.featured ?? staticMatch.featured),
                display_order: Number(item.display_order ?? staticMatch.display_order ?? idx),
              }
            }
            return {
              slug: String(item.slug || `project-${idx}`),
              name: String(item.title || item.name || "Untitled Project"),
              type: String(item.type || item.category || "Creative Direction"),
              category: String(item.category || "Selected Work"),
              note: String(item.note || ""),
              description: String(item.description || item.short_description || ""),
              services: Array.isArray(item.services) ? (item.services as string[]) : [],
              images: Array.isArray(item.images) ? (item.images as string[]) : [String(item.cover_image || "/placeholder.jpg")],
              cover_image: String(item.cover_image || "/placeholder.jpg"),
              marker: String(item.marker || "01"),
              tag: "CLIENT WORK" as const,
              cta: "VIEW PROJECT" as const,
              tags: Array.isArray(item.tags) ? (item.tags as string[]) : [String(item.category || "Work")],
              featured: Boolean(item.featured ?? false),
              display_order: Number(item.display_order ?? idx),
              status: "published" as const,
            }
          })
          if (isMounted) setProjectsList(mapped)
        }
      } catch {
        // Keep static fallback
      }
    }

    loadSupabaseProjects()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    )

    const revealElements = document.querySelectorAll(".reveal")
    revealElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const toggleAccordion = (index: number) => {
    setActiveAccordion((prev) => (prev === index ? null : index))
  }

  const toggleServicePill = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    )
  }

  const submitEnquiry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setFormError(null)

    const form = new FormData(event.currentTarget)
    const fullName = String(form.get("full_name") ?? "").trim()
    const companyName = String(form.get("company_name") ?? "").trim() || null
    const email = String(form.get("email") ?? "").trim()
    const phone = String(form.get("phone") ?? "").trim() || null
    const projectDescription = String(form.get("project_description") ?? "").trim()

    if (!fullName || !email || !projectDescription) {
      setFormError("Please fill in all required fields (Name, Email, and Project Description).")
      setSubmitting(false)
      return
    }

    const mailtoSubject = encodeURIComponent(`Start a Project Query — ${fullName || 'New Client'}`)
    const mailtoBody = encodeURIComponent(
      `Hi Sole Trust Media Team,\n\n` +
      `I would like to start a project with you.\n\n` +
      `• Name: ${fullName}\n` +
      `• Email: ${email}\n` +
      (companyName ? `• Company: ${companyName}\n` : '') +
      (phone ? `• Phone: ${phone}\n` : '') +
      (budget ? `• Budget: ${budget}\n` : '') +
      `• Services: ${(selectedServices || []).join(', ') || 'General Inquiry'}\n\n` +
      `Project Brief:\n${projectDescription}\n\n` +
      `Regards,\n${fullName}`
    )
    const mailtoUrl = `mailto:soletrustmedia@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=soletrustmedia@gmail.com&su=${mailtoSubject}&body=${mailtoBody}`

    try {
      const enquiryPayload = {
        full_name: fullName,
        company_name: companyName,
        email: email,
        phone: phone,
        services_required: selectedServices,
        budget: budget || null,
        project_description: projectDescription,
      }

      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiryPayload),
      })

      if (res.ok) {
        setSubmittedInfo({ fullName, mailtoUrl, gmailWebUrl })
        setSent(true)
        setSelectedServices([])
        event.currentTarget.reset()
      } else {
        const data = await res.json().catch(() => ({}))
        // Attempt client-side Supabase insert as fallback if API failed
        const client = getSupabaseBrowserClient()
        const { error: enquiriesError } = await client
          .from("enquiries")
          .insert(enquiryPayload as never)

        if (!enquiriesError) {
          setSubmittedInfo({ fullName, mailtoUrl, gmailWebUrl })
          setSent(true)
          setSelectedServices([])
          event.currentTarget.reset()
        } else {
          setFormError(
            data.error ||
            "We couldn't submit your enquiry right now. Please email us directly at soletrustmedia@gmail.com"
          )
        }
      }
    } catch {
      setSubmittedInfo({ fullName, mailtoUrl, gmailWebUrl })
      setSent(true)
    } finally {
      setSubmitting(false)
    }
  }

  // Showcase 5-card vertical strip (dynamically filtered & synced with Supabase)
  const showcaseCards =
    workFilter === "All Work"
      ? FEATURED_FIVE_SHOWCASE.map((slot, idx) => {
          const matched = projectsList.find((p) => p.slug === slot.slug)
          const targetUrl =
            slot.slug === "13isu"
              ? "/work/13isu"
              : slot.slug === "trends-are-a-tool"
              ? "/work/trends-are-a-tool"
              : matched?.link || `/work/${slot.slug}`
          const isExternal = Boolean(matched?.link && !targetUrl.startsWith("/work/"))
          return {
            slug: slot.slug,
            name: slot.name,
            category: matched?.category || slot.category,
            image: slot.image,
            targetUrl,
            isExternal,
            index: `0${idx + 1}`,
          }
        })
      : projectsList
          .filter((p) => {
            const text = `${p.name} ${p.category} ${p.type} ${p.tags.join(" ")} ${p.services.join(" ")}`.toLowerCase()
            if (workFilter === "Brand & Strategy") {
              return /\b(brand|branding|identity|typography|packaging|strategy|framework|twine|lumora|raya|aurelia)\b/i.test(text)
            }
            if (workFilter === "Digital Flagships") {
              return /\b(web|website|digital|platform|portal|flagship|future|luxe|interface|figma)\b/i.test(text)
            }
            if (workFilter === "Creative & Content") {
              return /\b(creative|content|social|music|media|editorial|video|campaign|13isu|dessert|trends)\b/i.test(text)
            }
            if (workFilter === "Technology & Systems") {
              return /\b(ai|technology|software|automation|saas|supply|farmlytics|chainmind|analytics)\b/i.test(text)
            }
            return true
          })
          .slice(0, 5)
          .map((project, idx) => {
            const targetUrl =
              project.slug === "13isu"
                ? "/work/13isu"
                : project.slug === "trends-are-a-tool"
                ? "/work/trends-are-a-tool"
                : project.link || `/work/${project.slug}`
            const isExternal = Boolean(project.link && !targetUrl.startsWith("/work/"))
            return {
              slug: project.slug,
              name: project.name,
              category: project.category || project.type,
              image: project.cover_image,
              targetUrl,
              isExternal,
              index: `0${idx + 1}`,
            }
          })

  return (
    <main className="site-shell">
      {/* ====================================================================
          SECTION A: NAVIGATION
          ==================================================================== */}
      <SiteNav />

      {/* ====================================================================
          SECTION B: HERO (EDITORIAL ATELIER + ROTATING STAMP + CIRCULAR MILESTONES)
          ==================================================================== */}
      <section className="hero" id="top" style={{ background: "var(--bg-parchment)" }}>
        <div className="hero-container">
          <div className="hero-copy reveal">
            <p className="eyebrow hero-eyebrow editorial-label" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <span className="editorial-marker">*</span> Independent Creative Technology Studio
            </p>

            <h1 className="hero-headline">
              Ideas into <i style={{ color: "var(--accent-terracotta)" }}>experiences.</i>
              <br />
              Creativity into <i style={{ color: "var(--accent-terracotta)" }}>growth.</i>
            </h1>

            <p className="hero-sub">
              We combine strategy, creativity and technology to build meaningful brands, digital experiences and business opportunities.
            </p>

            <div className="hero-cta-row">
              <div className="hero-cta-buttons">
                <a className="button button-dark" href="#work">
                  Explore Our Work <ArrowDown size={14} />
                </a>
                <a className="stm-btn-terracotta" href="#contact" style={{ padding: "14px 24px" }}>
                  Start a Project <ArrowUpRight size={14} />
                </a>
              </div>

              {/* Rotating Circular Stamp Badge */}
              <a
                href="#contact"
                className="hero-stamp-badge"
                aria-label="Start a Project — Sole Trust Media"
              >
                <svg className="hero-stamp-svg" viewBox="0 0 100 100" aria-hidden="true">
                  <defs>
                    <path
                      id="stmStampCirclePath"
                      d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                    />
                  </defs>
                  <text
                    fill="currentColor"
                    fontSize="7.4"
                    fontWeight="600"
                    letterSpacing="1.65"
                    fontFamily="Space Grotesk, sans-serif"
                  >
                    <textPath href="#stmStampCirclePath" startOffset="0%">
                      START A PROJECT • SOLE TRUST MEDIA •
                    </textPath>
                  </text>
                </svg>
                <span className="hero-stamp-center" aria-hidden="true">
                  <ArrowUpRight size={18} strokeWidth={1.75} />
                </span>
              </a>
            </div>

            {/* 4 Thin-Bordered Circular Milestone Badges with 1px Hairline Dividers */}
            <div className="hero-milestones-bar" aria-label="Agency milestones">
              <div className="hero-milestone-item">
                <span className="hero-milestone-circle" aria-hidden="true">
                  <Compass size={18} strokeWidth={1.4} />
                </span>
                <strong className="hero-milestone-value">50+</strong>
                <span className="hero-milestone-label">Brands Shaped</span>
              </div>
              <div className="hero-milestone-item">
                <span className="hero-milestone-circle" aria-hidden="true">
                  <Layers size={18} strokeWidth={1.4} />
                </span>
                <strong className="hero-milestone-value">100+</strong>
                <span className="hero-milestone-label">Projects Delivered</span>
              </div>
              <div className="hero-milestone-item">
                <span className="hero-milestone-circle" aria-hidden="true">
                  <Sparkles size={18} strokeWidth={1.4} />
                </span>
                <strong className="hero-milestone-value">3+</strong>
                <span className="hero-milestone-label">Years of Craft</span>
              </div>
              <div className="hero-milestone-item">
                <span className="hero-milestone-circle" aria-hidden="true">
                  <Globe size={18} strokeWidth={1.4} />
                </span>
                <strong className="hero-milestone-value">Global</strong>
                <span className="hero-milestone-label">Bengaluru · Worldwide</span>
              </div>
            </div>
          </div>

          {/* Immersive Floating Editorial Visual Composition */}
          <div className="hero-visual reveal">
            <HeroEditorialVisual />
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 03: 01 / STUDIO MANIFESTO (ASYMMETRIC EDITORIAL GRID + WIREFRAME SVG)
          ==================================================================== */}
      <section className="manifesto-editorial-section" id="about">
        <div className="manifesto-asymmetric-grid reveal">
          <div>
            <p
              className="editorial-label"
              style={{
                color: "var(--accent-terracotta)",
                marginBottom: "18px",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span>*</span> 01 / Studio Manifesto
            </p>
            <h2
              style={{
                fontSize: "clamp(42px, 5.5vw, 82px)",
                lineHeight: 0.96,
                letterSpacing: "-0.04em",
                margin: "0 0 28px",
                fontFamily: "var(--font-display)",
                color: "var(--text-ink)",
              }}
            >
              Good ideas deserve<br />
              <i style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", fontWeight: 400, color: "var(--accent-terracotta)" }}>better execution.</i>
            </h2>
            <p
              style={{
                fontSize: "clamp(15px, 1.8vw, 18px)",
                lineHeight: 1.68,
                color: "var(--text-ink)",
                marginBottom: "24px",
                fontWeight: 400,
              }}
            >
              Most ambitious businesses don&apos;t struggle because of poor products. They struggle because their brand execution is fragmented across disconnected silos — a social agency making temporary noise, an off-the-shelf website that leaks conversions, and manual sales bottlenecks.
            </p>
            <blockquote
              style={{
                borderLeft: "2px solid var(--accent-terracotta)",
                paddingLeft: "22px",
                margin: "30px 0",
                fontStyle: "italic",
                color: "var(--muted)",
                fontSize: "15px",
                lineHeight: 1.72,
              }}
            >
              &ldquo;We built Sole Trust Media to eliminate this divide. We combine strategic brand positioning, cinematic visual craft, bespoke digital engineering, and automated systems to build brands people genuinely remember and trust.&rdquo;
            </blockquote>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "20px",
                paddingTop: "26px",
                borderTop: "1px solid var(--border-hairline)",
              }}
            >
              <div>
                <strong style={{ display: "block", fontSize: "13px", fontFamily: "var(--font-display)", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-ink)", marginBottom: "4px" }}>
                  01 · Strategy With Intent
                </strong>
                <span style={{ fontSize: "13px", color: "var(--muted)" }}>Clarity before aesthetic decoration</span>
              </div>
              <div>
                <strong style={{ display: "block", fontSize: "13px", fontFamily: "var(--font-display)", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-ink)", marginBottom: "4px" }}>
                  02 · Visceral Craft
                </strong>
                <span style={{ fontSize: "13px", color: "var(--muted)" }}>Commanding pricing power &amp; distinction</span>
              </div>
              <div>
                <strong style={{ display: "block", fontSize: "13px", fontFamily: "var(--font-display)", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-ink)", marginBottom: "4px" }}>
                  03 · Technology That Scales
                </strong>
                <span style={{ fontSize: "13px", color: "var(--muted)" }}>Fast flagships &amp; automated pipelines</span>
              </div>
            </div>
          </div>

          {/* Vertically Offset Twine Visual Card + 1px Architectural Wireframe Compass SVG Overlay */}
          <div className="manifesto-visual-offset">
            <svg
              className="manifesto-wireframe-overlay"
              viewBox="0 0 160 160"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="80" cy="80" r="64" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" />
              <circle cx="80" cy="80" r="40" stroke="currentColor" strokeWidth="1" />
              <circle cx="80" cy="80" r="5" stroke="currentColor" strokeWidth="1" />
              <line x1="80" y1="4" x2="80" y2="156" stroke="currentColor" strokeWidth="1" />
              <line x1="4" y1="80" x2="156" y2="80" stroke="currentColor" strokeWidth="1" />
              <path d="M80 28 L88 80 L80 132 L72 80 Z" stroke="currentColor" strokeWidth="1" />
              <line x1="28" y1="28" x2="132" y2="132" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
              <line x1="132" y1="28" x2="28" y2="132" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
            </svg>

            <div className="manifesto-visual-frame">
              <img
                src="/assets/work/twine/twine-01.jpeg"
                alt="Sole Trust Media Craft & Visual Direction — Twine"
                loading="lazy"
              />
              <div className="studio-intro-badge">
                <div>
                  <span className="editorial-label" style={{ fontSize: "9.5px", color: "var(--accent-terracotta)", display: "block", marginBottom: "2px" }}>
                    DISCIPLINED ATELIER
                  </span>
                  <strong style={{ fontSize: "14px", color: "var(--text-ink)" }}>
                    Bengaluru Studio · Worldwide Execution
                  </strong>
                </div>
                <Link href="/work" className="stm-btn-terracotta" style={{ padding: "8px 16px", fontSize: "10px" }}>
                  Explore Craft <ArrowUpRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION C: CAPABILITIES (THE 5 PRIMARY SERVICE PILLARS)
          ==================================================================== */}
      <section className="services-section section-grid" id="services">
        <div className="section-label">01 / Capabilities</div>
        <div className="services-content">
          <div className="section-heading reveal">
            <h2>
              Integrated capabilities.<br />
              <i>Singular execution.</i>
            </h2>
            <p>
              We unify brand strategy, visual craft and digital engineering into a cohesive studio practice that eliminates operational fragmentation.
            </p>
          </div>

          <div className="service-category-list reveal">
            {CAPABILITIES.map((cap, index) => {
              const isOpen = activeAccordion === index
              return (
                <article key={cap.number} className={`service-category-card ${isOpen ? "open" : ""}`}>
                  <button
                    type="button"
                    className="service-category-header"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                  >
                    <div className="service-category-header-left">
                      <span className="service-category-index">{cap.number}</span>
                      <h3>{cap.title}</h3>
                    </div>
                    <p>{cap.tagline}</p>
                    <span className="service-category-icon" aria-hidden="true">
                      <Plus size={18} style={{ transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.25s ease" }} />
                    </span>
                  </button>

                  <div className="service-category-body">
                    <p className="service-category-summary">{cap.description}</p>
                    <div className="service-category-value" style={{ fontStyle: "italic", color: "var(--brown)", fontWeight: 500, marginBottom: "20px" }}>
                      {cap.valueProposition}
                    </div>

                    <div style={{ marginTop: "16px" }}>
                      <span className="editorial-label" style={{ fontSize: "10px", color: "var(--muted)", display: "block", marginBottom: "12px" }}>
                        Deliverables &amp; Core Output
                      </span>
                      <ul className="capability-pill-list" aria-label={`${cap.title} offerings`}>
                        {cap.deliverables.map((item) => (
                          <li key={item} className="capability-pill-tag">
                            <span className="capability-pill-dot" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--line)" }}>
                      <Link href={cap.href} className="text-link" style={{ fontSize: "11px", letterSpacing: "0.06em" }}>
                        Explore detailed capability scope <ArrowUpRight size={12} />
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION D: 02 / DIAGNOSTIC — FULL-BLEED ESPRESSO BAND (4-COL HAIRLINE GRID)
          ==================================================================== */}
      <section className="diagnostic-espresso-band" id="friction">
        <div className="diagnostic-espresso-inner">
          <div className="diagnostic-espresso-header reveal">
            <div>
              <p className="editorial-label" style={{ color: "#e49581", margin: "0 0 14px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <span>*</span> 02 / Diagnostic
              </p>
              <h2 style={{ fontSize: "clamp(42px, 5.8vw, 84px)", lineHeight: 0.95, letterSpacing: "-0.04em", margin: 0, color: "var(--text-cream)", fontFamily: "var(--font-display)" }}>
                The friction behind<br />
                <i style={{ fontFamily: "var(--font-editorial)", fontWeight: 400, color: "#e49581" }}>stagnant growth.</i>
              </h2>
            </div>
            <p style={{ maxWidth: "420px", margin: 0, fontSize: "15px", lineHeight: 1.68, color: "rgba(246, 241, 233, 0.74)" }}>
              Most ambitious businesses do not have a product quality issue — they have an articulation, presentation, or conversion disconnect. Here is where the growth engine breaks.
            </p>
          </div>

          <div className="diagnostic-four-grid reveal">
            {FRICTION_POINTS.map((prob) => (
              <article className="diagnostic-col-item" key={prob.num}>
                <div>
                  <span className="diagnostic-col-num">{prob.num}</span>
                  <span className="editorial-label" style={{ fontSize: "9.5px", color: "rgba(246, 241, 233, 0.56)", display: "block", marginBottom: "10px" }}>
                    Diagnosed Hurdle
                  </span>
                  <h3 className="diagnostic-col-title">{prob.title}</h3>
                  <p className="diagnostic-col-desc">{prob.explanation}</p>
                </div>
                <div className="diagnostic-col-consequence">
                  <strong>Commercial Consequence</strong>
                  {prob.consequence}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION E: 03 / TRANSFORMATION & CLIENT BAND — MUTED OLIVE BAND
          ==================================================================== */}
      <section className="transformation-olive-band" id="solutions">
        <div className="transformation-olive-inner">
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "28px" }} className="reveal">
            <div>
              <p className="editorial-label" style={{ color: "rgba(246, 241, 233, 0.78)", margin: "0 0 14px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <span>◆</span> 03 / Transformation &amp; Client Outcomes
              </p>
              <h2 style={{ fontSize: "clamp(42px, 5.8vw, 84px)", lineHeight: 0.95, letterSpacing: "-0.04em", margin: 0, color: "var(--text-cream)", fontFamily: "var(--font-display)" }}>
                Problem to Strategy.<br />
                <i style={{ fontFamily: "var(--font-editorial)", fontWeight: 400 }}>Strategy to Value.</i>
              </h2>
            </div>
            <p style={{ maxWidth: "420px", margin: 0, fontSize: "15px", lineHeight: 1.68, color: "rgba(246, 241, 233, 0.8)" }}>
              We act as an integrated growth consultancy and creative engineering team, turning systemic operational challenges into measurable commercial leverage.
            </p>
          </div>

          {/* Editorial Client Logo & Partner Band with Diamond & Asterisk Dividers */}
          <div className="olive-client-band reveal" aria-label="Selected client partners and commissions">
            {OLIVE_CLIENT_ROSTER.map((client, i) => (
              <span key={client} style={{ display: "inline-flex", alignItems: "center", gap: "24px" }}>
                <span className="olive-client-name">{client}</span>
                {i < OLIVE_CLIENT_ROSTER.length - 1 && (
                  <span className="olive-divider-glyph" aria-hidden="true">
                    {i % 2 === 0 ? "◆" : "*"}
                  </span>
                )}
              </span>
            ))}
          </div>

          <div className="olive-outcomes-grid reveal">
            {[
              {
                step: "01",
                problem: "Commoditised Brand & Pricing Pressure",
                strategy: "Uncompromising positioning, editorial visual identity & brand prestige system",
                value: "Immediate pricing power, unshakeable customer affinity & categorical authority",
              },
              {
                step: "02",
                problem: "High Bounce Rate & Weak Web Conversion",
                strategy: "Bespoke digital flagship engineered with Next.js, fluid UX & high-speed telemetry",
                value: "3x+ enquiry conversion, sub-second load times & seamless client qualification",
              },
              {
                step: "03",
                problem: "Wasted Ad Spend & Vanity Impressions",
                strategy: "Customer-first content architecture, high-intent funnels & performance media",
                value: "Lower customer acquisition cost, consistent inbound pipeline & verifiable ROI",
              },
              {
                step: "04",
                problem: "Manual Sales Bottlenecks & Operational Chaos",
                strategy: "Automated lead intake pipelines, CRM integrations & custom software tools",
                value: "Zero dropped enquiries, rapid <1-hour response cadence & scalable infrastructure",
              },
            ].map((item) => (
              <div key={item.step} className="olive-outcome-card">
                <div className="olive-outcome-stage">
                  <span>STAGE {item.step}</span>
                  <span>◆</span>
                  <span>COMMERCIAL OUTCOME</span>
                </div>
                <div className="olive-outcome-columns">
                  <div className="olive-outcome-row">
                    <span className="olive-outcome-label">01 · Business Friction</span>
                    <h4 style={{ margin: 0, fontSize: "19px", fontWeight: 600, color: "var(--text-cream)", fontFamily: "var(--font-display)" }}>{item.problem}</h4>
                  </div>
                  <div className="olive-outcome-row">
                    <span className="olive-outcome-label">02 · Studio Strategy</span>
                    <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.6, color: "rgba(246, 241, 233, 0.8)" }}>{item.strategy}</p>
                  </div>
                  <div className="olive-outcome-row">
                    <span className="olive-outcome-label">03 · Commercial Value</span>
                    <strong style={{ display: "block", fontSize: "14.5px", lineHeight: 1.55, color: "var(--text-cream)", fontWeight: 600 }}>{item.value}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION F: OUR PHILOSOPHY ("REFUSE TO COMPROMISE")
          ==================================================================== */}
      <section className="pillars-section section-grid" id="philosophy">
        <div className="section-label">04 / Studio Philosophy</div>
        <div className="intro-content">
          <div className="section-heading reveal">
            <h2>
              Refuse to compromise.<br />
              <i>Five core principles.</i>
            </h2>
            <p>
              We believe great brands are not assembled from off-the-shelf templates. They are forged through relentless strategic rigor, artistic fearlessness, and technical obsession.
            </p>
          </div>

          <div
            className="philosophy-principles-grid reveal"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              marginTop: "40px",
            }}
          >
            {PHILOSOPHY_PRINCIPLES.map((principle) => (
              <div
                key={principle.num}
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: "20px",
                  padding: "32px 28px",
                  background: "rgba(243, 235, 221, 0.4)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.3s ease, border-color 0.3s ease",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <span style={{ fontFamily: "var(--font-utility)", fontSize: "12px", color: "var(--brown)", fontWeight: 700 }}>
                      PRINCIPLE {principle.num}
                    </span>
                    <span style={{ fontStyle: "italic", fontSize: "13px", color: "var(--muted)", fontFamily: "var(--font-editorial)" }}>
                      {principle.subtitle}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "clamp(22px, 2.5vw, 28px)", margin: "0 0 14px", lineHeight: 1.2 }}>
                    {principle.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.65, color: "var(--muted)" }}>
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION G: INTERACTIVE STUDIO SHOWCASE (5-CARD VERTICAL STRIP + PILL FILTERS)
          ==================================================================== */}
      <section className="showcase-editorial-section" id="work">
        <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
          <div className="showcase-header-bar reveal">
            <div>
              <p className="editorial-label" style={{ color: "var(--accent-terracotta)", margin: "0 0 14px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <span>*</span> 05 / Selected Work
              </p>
              <h2 style={{ fontSize: "clamp(42px, 5.8vw, 84px)", lineHeight: 0.95, letterSpacing: "-0.04em", margin: 0, color: "var(--text-ink)", fontFamily: "var(--font-display)" }}>
                Selected work.<br />
                <i style={{ fontFamily: "var(--font-editorial)", fontWeight: 400, color: "var(--accent-terracotta)" }}>Distinctive thinking.</i>
              </h2>
            </div>
            <p style={{ maxWidth: "400px", margin: 0, fontSize: "15px", lineHeight: 1.65, color: "var(--muted)" }}>
              An editorial archive of client commissions, digital flagships, and self-initiated concept explorations.
            </p>
          </div>

          {/* Pill-Shaped Category Filter Tabs */}
          <div className="showcase-filter-pills reveal" role="tablist" aria-label="Studio showcase category filters">
            {SHOWCASE_FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={workFilter === filter}
                onClick={() => setWorkFilter(filter)}
                className={`showcase-pill-btn ${workFilter === filter ? "active" : ""}`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Horizontal 5-Card Vertical Showcase Strip (Swipe Carousel on <768px) */}
          <div className="showcase-five-strip reveal">
            {showcaseCards.map((card) => (
              <a
                key={card.slug}
                href={card.targetUrl}
                className="showcase-vertical-card"
                {...(card.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={`View ${card.name}`}
              >
                <div className="showcase-vertical-media">
                  <img src={card.image} alt={`${card.name} preview`} loading="lazy" />
                  <span className="showcase-vertical-index">{card.index}</span>
                </div>
                <div className="showcase-vertical-meta">
                  <div className="showcase-vertical-title-row">
                    <h3 className="showcase-vertical-title">{card.name}</h3>
                    <ArrowUpRight size={13} style={{ color: "var(--accent-terracotta)", flexShrink: 0 }} />
                  </div>
                  <span className="showcase-vertical-cat">{card.category}</span>
                </div>
              </a>
            ))}
          </div>

          {/* Pill-Shaped Explore All Work CTA */}
          <div className="showcase-cta-footer reveal">
            <span className="editorial-marker">*</span>
            <Link href="/work" className="stm-btn-terracotta">
              Explore All Work <ArrowUpRight size={14} />
            </Link>
            <span className="editorial-marker">*</span>
          </div>

          {/* High-Craft Short-Form Video Reel Strip */}
          <div className="video-reel-section reveal" style={{ marginTop: "72px" }}>
            <div className="video-reel-header">
              <div>
                <span className="video-reel-tag">
                  High-Craft Media Production
                </span>
                <h3 className="video-reel-heading">
                  Short-form storytelling &amp; <i>viral craft.</i>
                </h3>
              </div>
              <p className="video-reel-desc">
                Culinary direction, packaging tactile motion, and cultural campaign reels designed for sustained audience attention and organic reach.
              </p>
            </div>

            <div className="video-reel-strip">
              <div className="video-reel-card">
                <video
                  src="/assets/misc/WhatsApp%20Video%202026-09-29%20at%2016.08.31.mp4"
                  playsInline
                  muted
                  loop
                  autoPlay
                  preload="metadata"
                />
                <div className="video-reel-overlay">
                  <span className="video-reel-category">Culinary Direction</span>
                  <strong className="video-reel-title">Dessert Craft &amp; Texture</strong>
                </div>
              </div>

              <div className="video-reel-card">
                <video
                  src="/assets/misc/WhatsApp%20Video%202026-09-29%20at%2016.09.08.mp4"
                  playsInline
                  muted
                  loop
                  autoPlay
                  preload="metadata"
                />
                <div className="video-reel-overlay">
                  <span className="video-reel-category">Product Storytelling</span>
                  <strong className="video-reel-title">Packaging &amp; Unboxing</strong>
                </div>
              </div>

              <div className="video-reel-card">
                <video
                  src="/assets/misc/WhatsApp%20Video%202026-09-29%20at%2016.10.33.mp4"
                  playsInline
                  muted
                  loop
                  autoPlay
                  preload="metadata"
                />
                <div className="video-reel-overlay">
                  <span className="video-reel-category">Social Campaign</span>
                  <strong className="video-reel-title">Community Activation</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION H: CLIENT TESTIMONIALS
          ==================================================================== */}
      <section className="testimonials-section section-grid" id="testimonials">
        <div className="section-label">06 / Client Notes</div>
        <div className="intro-content">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">CLIENT NOTES / 01—03</p>
              <h2>
                GOOD WORK.<br />
                <i>GOOD WORDS.</i>
              </h2>
            </div>
            <p>A few kind words from the people we’ve had the pleasure of working with.</p>
          </div>

          <div className="testimonials-grid reveal">
            <article className="testimonial-card">
              <div className="testimonial-card-meta">
                <span>01 / TESTIMONIAL</span>
                <span>WEBSITE + GROWTH</span>
              </div>
              <blockquote>
                “You designed a very professional and user-friendly website for us with all the key features we needed — crop release directions, farmer marketplace, market analysis tools, and many other useful sections.”
              </blockquote>
              <div className="testimonial-takeaway">
                <span>THE TAKEAWAY</span>
                <p>A purpose-built digital experience bringing essential agricultural resources and market tools together in one clear, user-friendly place.</p>
              </div>
              <div className="testimonial-client">
                <span aria-hidden="true">F</span>
                <strong>FARMLYTICS</strong>
              </div>
            </article>

            <article className="testimonial-card">
              <div className="testimonial-card-meta">
                <span>02 / TESTIMONIAL</span>
                <span>WEBSITE + CONTENT</span>
              </div>
              <blockquote>
                “The website demo you created looks very professional and exactly like what we discussed. The reel you made is also excellent and captures our brand well.”
              </blockquote>
              <div className="testimonial-takeaway">
                <span>THE TAKEAWAY</span>
                <p>Thoughtful execution across both web and video, with the work staying true to the brief and the client’s brand.</p>
              </div>
              <div className="testimonial-client">
                <span aria-hidden="true">V</span>
                <strong>VIVEK / EXAM PREP</strong>
              </div>
            </article>

            <article className="testimonial-card">
              <div className="testimonial-card-meta">
                <span>03 / TESTIMONIAL</span>
                <span>BRANDING + MARKETING</span>
              </div>
              <blockquote>
                “You understood our vision really well and put in a lot of effort to bring it to life.”
              </blockquote>
              <div className="testimonial-takeaway">
                <span>THE TAKEAWAY</span>
                <p>A note about a collaborative process: keeping the client’s vision at the heart of their branding and marketing.</p>
              </div>
              <div className="testimonial-client">
                <span aria-hidden="true">1</span>
                <strong>13ISU</strong>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION I: DOCUMENTED CRAFT. REAL RESULTS.
          ==================================================================== */}
      <section className="featured-case-section section-grid" id="case-studies">
        <div className="section-label">07 / Documented Results</div>
        <div className="intro-content">
          <div className="section-heading reveal">
            <h2>
              Documented craft.<br />
              <i>Real business impact.</i>
            </h2>
            <p>
              We bridge high-craft creative direction with quantifiable commercial outcomes. Explore our comprehensive in-depth case studies.
            </p>
          </div>

          {/* Spotlight 01: 13ISU Speciality Tiramisu */}
          <div className="case-study-spotlight reveal">
            <div className="case-study-spotlight-visual">
              <div className="spotlight-primary-wrap">
                <img
                  src="/13isu-creative-1.png"
                  alt="13ISU Case Study - Night Market Activation"
                  className="spotlight-primary-img"
                />
              </div>
              <div className="spotlight-secondary-grid">
                <img src="/13isu-creative-2.png" alt="13ISU Packaging Detail" />
                <img src="/13isu-creative-3.png" alt="13ISU Event Presence" />
              </div>
            </div>
            <div className="case-study-spotlight-content">
              <div className="spotlight-badge">FEATURED CASE STUDY</div>
              <span className="selected-card-type">SPECIALITY DESSERT / BRAND IDENTITY / VIRAL SOCIAL</span>
              <h3>13ISU Speciality Tiramisu</h3>
              <div className="spotlight-metric">
                <strong>100,000+</strong>
                <span>Organic Instagram Views in 3 Days</span>
              </div>
              <p>
                A single-speciality dessert brand brought to life through playful naming (*13* = Terah + *ISU*), lavender-accented identity, bespoke packaging, and product-led social creative that captivated local dessert culture on launch.
              </p>
              <div className="spotlight-actions">
                <Link className="button button-dark" href="/work/13isu">
                  Read Case Study <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Spotlight 02: Trends Are a Tool, Not a Strategy */}
          <div className="case-study-spotlight reveal" style={{ marginTop: "40px" }}>
            <div className="case-study-spotlight-visual">
              <img
                src="/assets/work/trends-are-a-tool/trends-cover.svg"
                alt="Trends Are a Tool, Not a Strategy Framework"
                className="spotlight-primary-img"
                style={{ width: "100%", height: "auto", aspectRatio: "16/10" }}
              />
            </div>
            <div className="case-study-spotlight-content">
              <div className="spotlight-badge" style={{ background: "var(--brown)" }}>
                STRATEGIC FRAMEWORK &amp; ESSAY
              </div>
              <span className="selected-card-type">
                CONTENT ARCHITECTURE &amp; SOCIAL COMMERCE · WRITTEN BY DAKSH BHAGAT
              </span>
              <h3>Trends Are a Tool, Not a Strategy</h3>
              <div className="spotlight-metric">
                <strong>Enquiries &gt; Views</strong>
                <span>Customer Before Content · Relationships Before Reach</span>
              </div>
              <p>
                People are watching your posts, so why aren&apos;t they buying? A strategic examination of the vanity-reach paradox: why Store A&apos;s 100K trending views fail to convert while Store B&apos;s 8K customer-centric views drive predictable sales.
              </p>
              <div className="spotlight-actions">
                <Link className="button button-dark" href="/work/trends-are-a-tool">
                  Read Strategic Framework <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          <p className="featured-note reveal" style={{ marginTop: "32px", fontSize: "12px", color: "var(--muted)", fontStyle: "italic" }}>
            Results are project-specific and documented honestly. We do not publish fabricated client outcomes. Proprietary growth frameworks, revenue telemetry, and confidential client case studies are shared under NDA upon consultation.
          </p>
        </div>
      </section>

      {/* ====================================================================
          SECTION J: INSIGHTS (MAGAZINE-STYLE EDITORIAL CONTENT)
          ==================================================================== */}
      <section className="insights-section section-grid" id="insights">
        <div className="section-label">08 / Studio Insights</div>
        <div className="intro-content">
          <div className="section-heading reveal">
            <h2>
              Critical perspectives.<br />
              <i>Studio discourse.</i>
            </h2>
            <p>
              Reflections on brand building, creative technology, and commercial psychology from our studio practice.
            </p>
          </div>

          <div className="insights-list reveal">
            {STUDIO_INSIGHTS.map((insight) => (
              <Link href={insight.href} key={insight.id} className="insight-row">
                <span className="insight-num">{insight.num}</span>
                <div className="insight-meta">
                  <span className="insight-category">{insight.category}</span>
                  <span className="insight-date">{insight.date} · {insight.readTime}</span>
                </div>
                <div className="insight-content">
                  <h3>{insight.title}</h3>
                  {insight.author && (
                    <span
                      style={{
                        display: "inline-block",
                        fontFamily: "var(--font-utility)",
                        fontSize: "10.5px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--brown)",
                        fontWeight: 600,
                        margin: "4px 0 6px",
                      }}
                    >
                      {insight.author}
                    </span>
                  )}
                  <p>{insight.deck}</p>
                </div>
                <div className="insight-arrow" aria-hidden="true">
                  <ArrowUpRight size={22} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION K: FINAL CTA & ENQUIRY STUDIO (PILL INPUTS + TERRACOTTA CTA)
          ==================================================================== */}
      <section className="contact" id="contact" style={{ background: "var(--bg-espresso)", color: "var(--text-cream)", padding: "clamp(100px, 11vw, 156px) var(--page-gutter)" }}>
        <div className="contact-inner" style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p
            className="editorial-label"
            style={{
              color: "#e49581",
              marginBottom: "16px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>*</span> 09 / New Business
          </p>
          <h2
            style={{
              fontSize: "clamp(48px, 7.5vw, 112px)",
              lineHeight: 0.94,
              margin: "0 0 24px",
              fontFamily: "var(--font-display)",
              color: "var(--text-cream)",
            }}
          >
            Have an idea?<br />
            <i style={{ fontFamily: "var(--font-editorial)", fontWeight: 400, color: "#e49581" }}>Let&apos;s make it happen.</i>
          </h2>
          <p
            style={{
              maxWidth: "600px",
              color: "rgba(246, 241, 233, 0.74)",
              fontSize: "clamp(15px, 1.8vw, 18px)",
              lineHeight: 1.65,
              marginBottom: "48px",
            }}
          >
            Tell us what you&apos;re building. Together, we can turn an ambitious idea into something meaningful. We review every enquiry within 24 business hours.
          </p>

          <form onSubmit={submitEnquiry} noValidate style={{ maxWidth: "800px" }}>
            {sent ? (
              <div
                className="form-success-box"
                style={{
                  background: "rgba(243, 235, 221, 0.08)",
                  border: "1px solid rgba(243, 235, 221, 0.2)",
                  padding: "40px",
                  borderRadius: "20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", color: "var(--cream)" }}>
                  <Check size={28} />
                  <h3 style={{ margin: 0, fontSize: "24px" }}>Thank you{submittedInfo?.fullName ? `, ${submittedInfo.fullName}` : ''}.</h3>
                </div>
                <p style={{ margin: "0 0 20px", color: "var(--beige)", fontSize: "15px", lineHeight: 1.6 }}>
                  Your project enquiry has been safely received and dispatched to our directors at <strong>soletrustmedia@gmail.com</strong>. We will review your requirements and reach out within 24 business hours.
                </p>
                {submittedInfo && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "24px", paddingTop: "24px", borderTop: "1px solid rgba(243, 235, 221, 0.15)" }}>
                    <a
                      href={submittedInfo.gmailWebUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button button-light"
                      style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", fontSize: "11px", letterSpacing: "0.08em" }}
                    >
                      <Mail size={13} /> Send via Gmail (Web)
                    </a>
                    <a
                      href={submittedInfo.mailtoUrl}
                      className="button button-dark"
                      style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", fontSize: "11px", letterSpacing: "0.08em" }}
                    >
                      <ArrowUpRight size={13} /> Open in Mail App
                    </a>
                    <button
                      type="button"
                      onClick={() => { setSent(false); setSubmittedInfo(null); }}
                      className="button button-dark"
                      style={{ padding: "12px 24px", fontSize: "11px", letterSpacing: "0.08em" }}
                    >
                      Submit another inquiry
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Services Pills Selector */}
                <div style={{ marginBottom: "36px" }}>
                  <label
                    style={{
                      fontFamily: "var(--font-utility)",
                      fontSize: "11px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--beige)",
                      display: "block",
                      marginBottom: "16px",
                    }}
                  >
                    Services You Are Interested In
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {SERVICE_OPTIONS.map((service) => {
                      const active = selectedServices.includes(service)
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleServicePill(service)}
                          style={{
                            padding: "9px 18px",
                            borderRadius: "999px",
                            font: "11px var(--font-utility)",
                            cursor: "pointer",
                            background: active ? "var(--cream)" : "transparent",
                            color: active ? "var(--dark)" : "var(--cream)",
                            border: active ? "1px solid var(--cream)" : "1px solid rgba(243, 235, 221, 0.25)",
                            transition: "all 0.2s ease",
                          }}
                        >
                          {service}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Form fields: Name & Company */}
                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px" }}>
                  <div>
                    <input
                      name="full_name"
                      aria-label="Full Name"
                      className="stm-pill-input"
                      required
                      placeholder="Your Full Name *"
                    />
                  </div>
                  <div>
                    <input
                      name="company_name"
                      aria-label="Company Name"
                      className="stm-pill-input"
                      placeholder="Company / Brand Name"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px", marginTop: "18px" }}>
                  <div>
                    <input
                      type="email"
                      name="email"
                      aria-label="Email"
                      className="stm-pill-input"
                      required
                      placeholder="Email Address *"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      aria-label="Phone Number"
                      className="stm-pill-input"
                      placeholder="Phone Number / WhatsApp"
                    />
                  </div>
                </div>

                {/* Budget selector */}
                <div style={{ marginTop: "32px" }}>
                  <label
                    className="editorial-label"
                    style={{
                      fontSize: "10px",
                      color: "var(--beige)",
                      display: "block",
                      marginBottom: "12px",
                    }}
                  >
                    Expected Investment Scope
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {BUDGET_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setBudget(opt)}
                        style={{
                          padding: "9px 18px",
                          borderRadius: "999px",
                          font: "11px var(--font-utility)",
                          cursor: "pointer",
                          background: budget === opt ? "var(--accent-terracotta)" : "rgba(246, 241, 233, 0.05)",
                          color: "var(--text-cream)",
                          border: budget === opt ? "1px solid var(--accent-terracotta)" : "1px solid var(--border-hairline-dark)",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Description */}
                <div style={{ marginTop: "28px" }}>
                  <textarea
                    name="project_description"
                    aria-label="Project Description"
                    className="stm-pill-textarea"
                    rows={4}
                    required
                    placeholder="Tell us about your brand, what you're building, and what success looks like *"
                  />
                </div>

                {formError && (
                  <p style={{ color: "#F28B82", fontSize: "13px", marginTop: "16px" }}>{formError}</p>
                )}

                <div style={{ marginTop: "32px" }}>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="stm-btn-terracotta"
                  >
                    {submitting ? "Sending..." : "Submit Project Inquiry"} <ArrowUpRight size={14} />
                  </button>
                </div>
              </>
            )}
          </form>

          {/* Contact details footer strip */}
          <div
            className="contact-details"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "36px",
              marginTop: "80px",
              paddingTop: "36px",
              borderTop: "1px solid rgba(243, 235, 221, 0.12)",
              color: "var(--beige)",
              fontSize: "12px",
              fontFamily: "var(--font-utility)",
            }}
          >
            <a href="mailto:soletrustmedia@gmail.com" style={{ display: "flex", alignItems: "center", gap: "8px", color: "inherit" }}>
              <Mail size={14} /> soletrustmedia@gmail.com
            </a>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <MapPin size={14} /> 560066, Whitefield, Bengaluru, India
            </span>
          </div>
        </div>
      </section>

      {/* ====================================================================
          GLOBAL FOOTER
          ==================================================================== */}
      <SiteFooter />
    </main>
  )
}
