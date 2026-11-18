"use client"

import { ArrowRight, ArrowUpRight, ArrowDown, ChevronDown, Mail, MapPin, Check, Compass, Layers, Sparkles, Globe, Quote } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { PROJECTS, type Project } from "@/lib/data/projects"
import SiteNav from "@/components/site-nav"
import SiteFooter from "@/components/site-footer"
import HeroEditorialVisual from "@/components/hero-editorial-visual"
import { CapabilityMiniDemo } from "@/components/capability-demos"
import CaseStudyDrawer, { type CaseDrawerProject } from "@/components/case-study-drawer"
import ScopeConfigurator, { type LockedScopePayload } from "@/components/scope-configurator"
import { EspressoMarqueeTicker, MethodologyProgressBeam } from "@/components/kinetic-scroll-polish"
import { MotionWrapper, AnimatedHairline, CountUpMetric } from "@/components/MotionWrapper"
import ReelVideoCard from "@/components/reel-video-card"
import { useSound } from "@/components/sound-provider"
import CopyEmailLink from "@/components/copy-email-link"
import Tilt3DCard from "@/components/tilt-3d-card"

// ============================================================================
// CORE DATA STRUCTURES
// ============================================================================

interface Capability {
  number: string
  shortLabel: string
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
    shortLabel: "Brand & Strategy",
    title: "Brand Strategy & Identity",
    tagline: "Positioning, visual architecture & brand foundations",
    description:
      "We define why your brand matters, who it serves, and the singular positioning that makes competitors irrelevant — from visual identity systems to voice, guidelines, and packaging.",
    valueProposition: "Command pricing power, build unshakeable customer loyalty, and stand apart from commodity rivals.",
    deliverables: [
      "Brand Positioning & Strategy",
      "Visual Identity & Logo Systems",
      "Design Systems & Brand Guidelines",
      "Packaging & Unboxing Design",
      "Brand Voice & Messaging",
      "Identity Evolution",
    ],
    href: "/services",
  },
  {
    number: "02",
    shortLabel: "Creative & Content",
    title: "Creative Direction & Content",
    tagline: "High-craft visuals, viral reels & campaign storytelling",
    description:
      "Campaign-level creative direction and short-form video production engineered to earn genuine audience attention and turn brand identity into shareable cultural momentum.",
    valueProposition: "Build an engaged audience that converts because your craft earns immediate respect.",
    deliverables: [
      "Creative Direction & Campaigns",
      "Short-Form Reels & Video",
      "Editorial Photography",
      "Brand Films & Motion",
      "Social Visual Frameworks",
      "Packaging Art Direction",
    ],
    href: "/services",
  },
  {
    number: "03",
    shortLabel: "Digital Experiences",
    title: "Digital Experiences & Websites",
    tagline: "Bespoke digital flagships & Next.js web platforms",
    description:
      "Websites and digital platforms engineered for sub-second speed, sculptural typography, and frictionless commercial conversion.",
    valueProposition: "Convert cold visitors into qualified, high-intent client enquiries automatically.",
    deliverables: [
      "Next.js Digital Flagships",
      "Interactive Web Applications",
      "Creative E-Commerce Stores",
      "UI/UX Design Systems",
      "Core Web Vitals & SEO",
      "Kinetic Micro-Interactions",
    ],
    href: "/services",
  },
  {
    number: "04",
    shortLabel: "Marketing & Growth",
    title: "Marketing & Business Growth",
    tagline: "Data-led acquisition, social commerce & conversion funnels",
    description:
      "Disciplined paid media and inbound acquisition architectures backed by live telemetry — optimized continuously for lower acquisition cost and predictable revenue.",
    valueProposition: "Every metric tracked. Predictable inbound pipeline. Verifiable commercial return.",
    deliverables: [
      "Meta & Instagram Growth",
      "Google High-Intent Search",
      "Social Commerce Funnels",
      "Conversion Rate Optimization",
      "Audience Retention Systems",
      "Omnichannel Telemetry",
    ],
    href: "/services",
  },
  {
    number: "05",
    shortLabel: "Technology & Systems",
    title: "Technology & Business Automation",
    tagline: "Intelligent workflows, CRM sync & AI intake pipelines",
    description:
      "Automated operational pipelines that eliminate manual lead drop-offs, integrate your CRM, and qualify prospective clients around the clock.",
    valueProposition: "Zero dropped enquiries, sub-hour response cadence, and scalable studio infrastructure.",
    deliverables: [
      "Inbound Lead Capture & CRM",
      "WhatsApp & Email Qualification",
      "AI Agentic Workflows",
      "Custom Operations Portals",
      "API & Webhook Telemetry",
      "Automated Client Dashboards",
    ],
    href: "/services",
  },
]

const FRICTION_POINTS = [
  {
    num: "01",
    title: "The Visibility Illusion",
    explanation:
      "Chasing impressions and random viral trends without strategic positioning burns attention without driving qualified buyer enquiries.",
    consequence: "High vanity reach with flat sales and rising acquisition costs.",
  },
  {
    num: "02",
    title: "The Disconnected Stack",
    explanation:
      "When branding, social media, paid ads, and web engineering operate in isolated silos, customer trust breaks at every handoff.",
    consequence: "Leaky conversion funnels and prospects bouncing before inquiring.",
  },
  {
    num: "03",
    title: "The Trust Deficit",
    explanation:
      "High-value buyers evaluate visual authority in milliseconds. Outdated design or sluggish templates cost revenue before you ever speak.",
    consequence: "Lost premium deals and prolonged sales cycles.",
  },
  {
    num: "04",
    title: "The Growth Ceiling",
    explanation:
      "One-off campaigns and piecemeal design tweaks cannot solve foundational positioning or operational bottlenecks.",
    consequence: "Plateaued revenue and dependence on manual outbound effort.",
  },
]

const SERVICE_OPTIONS = [
  "Brand Strategy",
  "Branding & Visual Identity",
  "Social Media Management",
  "Performance Marketing",
  "Creative Direction",
  "Content Creation",
  "Website & E-commerce",
  "UI/UX Design",
  "Business Automation",
  "Custom Web Applications",
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
  },
  {
    slug: "future-luxe",
    name: "Future Luxe",
    category: "Digital Flagships",
    image: "/assets/work/future-luxe/future-luxe-01.png",
  },
  {
    slug: "lumora",
    name: "Lumora",
    category: "Brand & Strategy",
    image: "/assets/work/lumora/lumora-01.png",
  },
  {
    slug: "13isu",
    name: "13isu",
    category: "Creative & Content",
    image: "/13isu-creative-1.png",
  },
  {
    slug: "trends-are-a-tool",
    name: "Trends Are a Tool",
    category: "Brand & Strategy",
    image: "/assets/work/trends-are-a-tool/trends-cover.svg",
  },
] as const

const CLIENT_PARTNER_ROSTER = [
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
  const { playWarmClick } = useSound()
  const [activeCapabilityIdx, setActiveCapabilityIdx] = useState<number>(0)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [workFilter, setWorkFilter] = useState<string>("All Work")
  const [activeDrawerProject, setActiveDrawerProject] = useState<CaseDrawerProject | null>(null)
  const [projectBrief, setProjectBrief] = useState<string>("")
  const [businessStage, setBusinessStage] = useState<string>("Direct Inquiry")
  const [scopeBanner, setScopeBanner] = useState<string | null>(null)
  const contactNameInputRef = useRef<HTMLInputElement | null>(null)
  const [submittedInfo, setSubmittedInfo] = useState<{
    fullName: string
    mailtoUrl: string
    gmailWebUrl: string
  } | null>(null)
  const [projectsList, setProjectsList] = useState<Project[]>(PROJECTS)

  const scrollToContactForm = () => {
    const el = document.getElementById("contact")
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      window.setTimeout(() => {
        contactNameInputRef.current?.focus({ preventScroll: true })
      }, 420)
    }
  }

  const handleBuildLikeThis = (services: string[], projectName: string) => {
    setActiveDrawerProject(null)
    const matched = services.filter((s) => SERVICE_OPTIONS.includes(s))
    if (matched.length > 0) setSelectedServices(matched)
    setBusinessStage(`Inspired by ${projectName}`)
    setProjectBrief(
      `We would like to build a commission inspired by ${projectName}.\n\nProject Goals & Timeline: `
    )
    setScopeBanner(`Pre-populated scope inspired by ${projectName}`)
    setSent(false)
    window.setTimeout(scrollToContactForm, 120)
  }

  const handleLockScope = (payload: LockedScopePayload) => {
    playWarmClick()
    const matched = payload.formServices.filter((s) => SERVICE_OPTIONS.includes(s))
    setSelectedServices(matched.length > 0 ? matched : payload.formServices)
    setBusinessStage(`${payload.stage} · ${payload.recommendedTrack} (${payload.timeline})`)
    setProjectBrief(payload.summaryNote)
    setScopeBanner(
      `Proposal Scope Loaded: ${payload.recommendedTrack} (${payload.timeline}) · ${payload.stage}`
    )
    setSent(false)
    window.setTimeout(scrollToContactForm, 100)
  }

  // Dynamic Supabase projects sync with local fallback
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
              images: Array.isArray(item.images)
                ? (item.images as string[])
                : [String(item.cover_image || "/placeholder.jpg")],
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

  // Legacy .reveal observer for child elements inside sub-components
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    )

    const revealElements = document.querySelectorAll(".reveal")
    revealElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const toggleServicePill = (service: string) => {
    playWarmClick()
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    )
  }

  const submitEnquiry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    playWarmClick()
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

    const disciplinesText = (selectedServices || []).join(", ") || "General Inquiry"
    const mailtoSubject = encodeURIComponent(`Start a Project — ${fullName || "New Client"} (${businessStage})`)
    const mailtoBody = encodeURIComponent(
      `Hi Sole Trust Media Team,\n\n` +
        `I would like to start a project with you.\n\n` +
        `• Name: ${fullName}\n` +
        `• Email: ${email}\n` +
        (companyName ? `• Company: ${companyName}\n` : "") +
        (phone ? `• Phone / WhatsApp: ${phone}\n` : "") +
        `• Business Stage: ${businessStage}\n` +
        `• Selected Disciplines: ${disciplinesText}\n\n` +
        `Project Brief:\n${projectDescription}\n\n` +
        `Regards,\n${fullName}`
    )
    const mailtoUrl = `mailto:soletrustmedia@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=soletrustmedia@gmail.com&su=${mailtoSubject}&body=${mailtoBody}`

    const enquiryPayload = {
      full_name: fullName,
      company_name: companyName,
      email,
      phone,
      services_required: selectedServices,
      project_description: `[Business Stage: ${businessStage}]\n\n${projectDescription}`,
    }

    try {
      // 1. Direct browser FormSubmit AJAX dispatch to soletrustmedia@gmail.com (_captcha: "false")
      let browserEmailed = false
      try {
        const fsRes = await fetch("https://formsubmit.co/ajax/soletrustmedia@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: `[Start a Project] ${fullName}${companyName ? ` (${companyName})` : ""}`,
            _replyto: email,
            _captcha: "false",
            _template: "table",
            name: fullName,
            email,
            Name: fullName,
            Email: email,
            Company: companyName || "N/A",
            "Phone / WhatsApp": phone || "N/A",
            "Business Stage": businessStage,
            "Selected Disciplines": disciplinesText,
            Message: projectDescription,
          }),
        })
        if (fsRes.ok) {
          const fsJson = (await fsRes.json().catch(() => ({}))) as { success?: string | boolean }
          browserEmailed = fsJson.success === true || String(fsJson.success).toLowerCase() === "true"
        }
      } catch {
        browserEmailed = false
      }

      // 2. Sync to internal /api/enquiries (Supabase + server email backup if browser FormSubmit failed)
      let serverEmailed = false
      try {
        const apiRes = await fetch("/api/enquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...enquiryPayload, client_emailed: browserEmailed }),
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
      setSelectedServices([])
      setProjectBrief("")
      setScopeBanner(null)
      event.currentTarget.reset()

      // 3. Only launch mailto fallback automatically if both automated channels failed
      if (!browserEmailed && !serverEmailed && typeof window !== "undefined") {
        window.location.href = mailtoUrl
      }
    } catch {
      setSubmittedInfo({ fullName, mailtoUrl, gmailWebUrl })
      setSent(true)
      if (typeof window !== "undefined") {
        window.location.href = mailtoUrl
      }
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

  const activeCapability = CAPABILITIES[activeCapabilityIdx] ?? CAPABILITIES[0]
  const hasInteractiveDemo =
    activeCapability.number === "01" ||
    activeCapability.number === "03" ||
    activeCapability.number === "05"

  return (
    <main className="site-shell">
      <SiteNav />

      {/* ====================================================================
          01. HERO + 3D ATELIER STAGE + COUNT-UP MILESTONES (WARM PARCHMENT)
          ==================================================================== */}
      <section className="hero" id="top" style={{ background: "var(--bg-parchment)" }}>
        <div className="hero-container">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow editorial-label" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <span className="editorial-marker">*</span> Independent Creative Technology Studio
            </p>

            <h1 className="hero-headline">
              <span className="hero-line-mask">
                <span className="hero-line-reveal">
                  Ideas into <i style={{ color: "var(--accent-terracotta)" }}>experiences.</i>
                </span>
              </span>
              <span className="hero-line-mask">
                <span className="hero-line-reveal delay-2">
                  Creativity into <i style={{ color: "var(--accent-terracotta)" }}>growth.</i>
                </span>
              </span>
            </h1>

            <p className="hero-sub">
              Strategy, editorial craft, and full-stack engineering unified under one Bengaluru atelier.
            </p>

            <div className="hero-cta-row">
              <div className="hero-cta-buttons">
                <a className="button button-dark" href="#work" onClick={playWarmClick}>
                  Explore Work <ArrowDown size={14} />
                </a>
              </div>

              {/* Rotating Terracotta Atelier Seal Stamp (Sole Start-a-Project Trigger) */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  playWarmClick()
                  scrollToContactForm()
                }}
                data-cursor-no-magnet="true"
                className="hero-stamp-badge hero-stamp-seal"
                aria-label="Start a Project — Sole Trust Media"
              >
                <svg className="hero-stamp-svg" viewBox="0 0 112 112" aria-hidden="true">
                  <defs>
                    <path
                      id="stmStampCirclePath"
                      d="M 56, 56 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                    />
                  </defs>
                  <circle
                    cx="56"
                    cy="56"
                    r="51"
                    fill="none"
                    stroke="rgba(246, 241, 233, 0.28)"
                    strokeWidth="0.9"
                    strokeDasharray="2 3"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="26"
                    fill="none"
                    stroke="rgba(246, 241, 233, 0.28)"
                    strokeWidth="0.9"
                  />
                  <text
                    fill="currentColor"
                    fontSize="7.4"
                    fontWeight="600"
                    letterSpacing="1.85"
                    fontFamily="Space Grotesk, sans-serif"
                  >
                    <textPath href="#stmStampCirclePath" startOffset="0%">
                      START A PROJECT • SOLE TRUST MEDIA •
                    </textPath>
                  </text>
                </svg>
                <span className="hero-stamp-center hero-stamp-seal-core" aria-hidden="true">
                  <ArrowUpRight size={19} strokeWidth={1.85} />
                </span>
              </a>
            </div>

            {/* 4 Thin-Bordered Circular Milestone Badges with Authentic Studio Metrics */}
            <div className="hero-milestones-bar" aria-label="Agency milestones">
              <div className="hero-milestone-item">
                <span className="hero-milestone-circle" aria-hidden="true">
                  <Compass size={17} strokeWidth={1.4} />
                </span>
                <strong className="hero-milestone-value">
                  <CountUpMetric target={16} suffix="+" />
                </strong>
                <span className="hero-milestone-label">Brands Shaped</span>
              </div>
              <div className="hero-milestone-item">
                <span className="hero-milestone-circle" aria-hidden="true">
                  <Layers size={17} strokeWidth={1.4} />
                </span>
                <strong className="hero-milestone-value">
                  <CountUpMetric target={45} suffix="+" />
                </strong>
                <span className="hero-milestone-label">Projects Delivered</span>
              </div>
              <div className="hero-milestone-item">
                <span className="hero-milestone-circle" aria-hidden="true">
                  <Sparkles size={17} strokeWidth={1.4} />
                </span>
                <strong className="hero-milestone-value">
                  <CountUpMetric target={1.5} decimals={1} suffix="+" />
                </strong>
                <span className="hero-milestone-label">Years of Craft</span>
              </div>
              <div className="hero-milestone-item">
                <span className="hero-milestone-circle" aria-hidden="true">
                  <Globe size={17} strokeWidth={1.4} />
                </span>
                <strong className="hero-milestone-value">Global</strong>
                <span className="hero-milestone-label">Bengaluru · Worldwide</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <HeroEditorialVisual />
          </div>
        </div>
      </section>

      {/* ====================================================================
          02. FULL-BLEED DEEP ESPRESSO INFINITE MARQUEE TICKER
          ==================================================================== */}
      <EspressoMarqueeTicker />

      {/* ====================================================================
          03. COMPACT STUDIO MANIFESTO (ASYMMETRIC WARM PARCHMENT)
          ==================================================================== */}
      <section className="manifesto-editorial-section" id="about">
        <MotionWrapper className="manifesto-asymmetric-grid">
          <div>
            <p
              className="editorial-label"
              style={{
                color: "var(--accent-terracotta)",
                marginBottom: "14px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>*</span> 01 / Studio Manifesto
            </p>
            <h2
              style={{
                fontSize: "clamp(38px, 5vw, 72px)",
                lineHeight: 0.96,
                letterSpacing: "-0.04em",
                margin: "0 0 22px",
                fontFamily: "var(--font-display)",
                color: "var(--text-ink)",
              }}
            >
              Good ideas deserve<br />
              <i style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", fontWeight: 400, color: "var(--accent-terracotta)" }}>better execution.</i>
            </h2>
            <p
              style={{
                fontSize: "clamp(15px, 1.5vw, 17px)",
                lineHeight: 1.65,
                color: "var(--text-ink)",
                marginBottom: "24px",
                maxWidth: "540px",
              }}
            >
              Most ambitious businesses fail not on product quality, but on fragmented execution — disconnected brand design, leaky websites, and manual sales bottlenecks. We unify strategy, editorial craft, and technology to build brands people trust immediately.
            </p>

            <AnimatedHairline tone="light" style={{ marginBottom: "20px" }} />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "16px",
              }}
            >
              <div>
                <strong style={{ display: "block", fontSize: "12px", fontFamily: "var(--font-display)", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-ink)", marginBottom: "4px" }}>
                  01 · Strategy First
                </strong>
                <span style={{ fontSize: "12.5px", color: "var(--muted)" }}>Clarity before decoration</span>
              </div>
              <div>
                <strong style={{ display: "block", fontSize: "12px", fontFamily: "var(--font-display)", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-ink)", marginBottom: "4px" }}>
                  02 · Visceral Craft
                </strong>
                <span style={{ fontSize: "12.5px", color: "var(--muted)" }}>Distinctive pricing power</span>
              </div>
              <div>
                <strong style={{ display: "block", fontSize: "12px", fontFamily: "var(--font-display)", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-ink)", marginBottom: "4px" }}>
                  03 · Scalable Tech
                </strong>
                <span style={{ fontSize: "12.5px", color: "var(--muted)" }}>Sub-second web &amp; AI</span>
              </div>
            </div>
          </div>

          <div className="manifesto-visual-offset" style={{ marginTop: "clamp(12px, 2.5vw, 32px)" }}>
            <svg
              className="manifesto-wireframe-overlay"
              viewBox="0 0 160 160"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="80" cy="80" r="64" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" />
              <circle cx="80" cy="80" r="40" stroke="currentColor" strokeWidth="1" />
              <line x1="80" y1="4" x2="80" y2="156" stroke="currentColor" strokeWidth="1" />
              <line x1="4" y1="80" x2="156" y2="80" stroke="currentColor" strokeWidth="1" />
              <path d="M80 28 L88 80 L80 132 L72 80 Z" stroke="currentColor" strokeWidth="1" />
            </svg>

            <div className="manifesto-visual-frame">
              <img
                src="/assets/work/twine/twine-01.jpeg"
                alt="Sole Trust Media Craft & Visual Direction — Twine"
                loading="lazy"
                decoding="async"
                style={{ aspectRatio: "5 / 4" }}
              />
              <div className="studio-intro-badge">
                <div>
                  <span className="editorial-label" style={{ fontSize: "9.5px", color: "var(--accent-terracotta)", display: "block" }}>
                    BENGALURU ATELIER
                  </span>
                  <strong style={{ fontSize: "13.5px", color: "var(--text-ink)" }}>
                    Strategy · Craft · Engineering
                  </strong>
                </div>
                <Link href="/about" onClick={playWarmClick} className="stm-btn-terracotta" style={{ padding: "8px 16px", fontSize: "10px" }}>
                  Our Story <ArrowUpRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </MotionWrapper>
      </section>

      {/* ====================================================================
          04. INTERACTIVE WORK STRIP + AUDIO-ENABLED REELS (DEEP ESPRESSO)
          ==================================================================== */}
      <section className="showcase-espresso-section" id="work">
        <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
          <MotionWrapper className="showcase-header-bar" style={{ marginBottom: "24px" }}>
            <div>
              <p className="editorial-label" style={{ color: "var(--accent-gold)", margin: "0 0 10px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <span>*</span> 02 / Selected Work
              </p>
              <h2 style={{ fontSize: "clamp(38px, 5vw, 72px)", lineHeight: 0.96, letterSpacing: "-0.04em", margin: 0, color: "var(--text-cream)", fontFamily: "var(--font-display)" }}>
                Selected work.<br />
                <i style={{ fontFamily: "var(--font-editorial)", fontWeight: 400, color: "var(--accent-gold)" }}>Distinctive thinking.</i>
              </h2>
            </div>
            <Link href="/work" onClick={playWarmClick} className="stm-btn-terracotta" style={{ padding: "12px 24px" }}>
              Explore All Work <ArrowUpRight size={14} />
            </Link>
          </MotionWrapper>

          {/* Pill Category Filters */}
          <div className="showcase-filter-pills" style={{ marginBottom: "28px", paddingBottom: "18px" }} role="tablist" aria-label="Studio showcase category filters">
            {SHOWCASE_FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={workFilter === filter}
                onClick={() => {
                  playWarmClick()
                  setWorkFilter(filter)
                }}
                className={`showcase-pill-btn ${workFilter === filter ? "active" : ""}`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Horizontal 5-Card Vertical Showcase Strip */}
          <MotionWrapper delay={80} className="showcase-five-strip">
            {showcaseCards.map((card) => (
              <a
                key={card.slug}
                href={card.targetUrl}
                data-magnetic-case="true"
                className="showcase-vertical-card"
                onClick={(e) => {
                  e.preventDefault()
                  const fullMatch = projectsList.find((p) => p.slug === card.slug)
                  setActiveDrawerProject({
                    slug: card.slug,
                    name: card.name,
                    category: card.category,
                    image: card.image,
                    targetUrl: card.targetUrl,
                    isExternal: card.isExternal,
                    description: fullMatch?.description,
                    services: fullMatch?.services,
                  })
                }}
                aria-label={`Inspect ${card.name} case study`}
              >
                <div className="showcase-vertical-media">
                  <img src={card.image} alt={`${card.name} preview`} loading="lazy" decoding="async" />
                  <span className="showcase-vertical-index">{card.index}</span>
                </div>
                <div className="showcase-vertical-meta">
                  <div className="showcase-vertical-title-row">
                    <h3 className="showcase-vertical-title">{card.name}</h3>
                    <ArrowUpRight size={13} style={{ color: "var(--accent-gold)", flexShrink: 0 }} />
                  </div>
                  <span className="showcase-vertical-cat">{card.category}</span>
                </div>
              </a>
            ))}
          </MotionWrapper>

          {/* Flagship Case Study 01 Editorial Spotlight: Tiramisu (13ISU) */}
          <MotionWrapper delay={100} style={{ marginTop: "36px" }}>
            <Tilt3DCard
              className="stm-home-tiramisu-spread"
              magneticCase
              maxTilt={4.5}
              role="button"
              tabIndex={0}
              onClick={() =>
                setActiveDrawerProject({
                  slug: "13isu",
                  name: "13ISU — Tiramisu Brand Experience",
                  category: "Culinary Identity & Viral Launch",
                  image: "/13isu-creative-1.png",
                  targetUrl: "/work/13isu",
                  isExternal: false,
                })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setActiveDrawerProject({
                    slug: "13isu",
                    name: "13ISU — Tiramisu Brand Experience",
                    category: "Culinary Identity & Viral Launch",
                    image: "/13isu-creative-1.png",
                    targetUrl: "/work/13isu",
                    isExternal: false,
                  })
                }
              }}
            >
              <div className="stm-home-tiramisu-copy">
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <span className="editorial-label" style={{ color: "var(--accent-terracotta)", fontSize: "10px" }}>
                    * Flagship Spotlight 01 · Tiramisu (13ISU)
                  </span>
                  <span className="stm-spotlight-pill stm-mobile-hide-decor">100K+ Organic Views · 3 Days</span>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(26px, 3.2vw, 40px)",
                    lineHeight: 1.02,
                    letterSpacing: "-0.03em",
                    margin: "0 0 12px",
                    color: "var(--text-ink)",
                  }}
                >
                  Turning a single-speciality Tiramisu into a{" "}
                  <i style={{ fontFamily: "var(--font-editorial)", fontWeight: 400, color: "var(--accent-terracotta)" }}>
                    sensory brand ritual.
                  </i>
                </h3>
                <p className="stm-mobile-clamp-3" style={{ fontSize: "14px", lineHeight: 1.62, color: "var(--muted)", margin: "0 0 18px" }}>
                  From typographic naming (&ldquo;Terah&rdquo; + ISU) to tactile packaging, night-market spatial presence, and viral launch reels — crafted to earn immediate cultural obsession without paid ad bloat.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px" }}>
                  <span className="stm-spotlight-link">
                    Inspect 13ISU Dossier <ArrowRight size={13} />
                  </span>
                  <Link
                    href="/work/13isu"
                    onClick={(e) => {
                      e.stopPropagation()
                      playWarmClick()
                    }}
                    className="stm-spotlight-secondary"
                  >
                    Full Editorial Spread <ArrowUpRight size={12} />
                  </Link>
                </div>
              </div>

              <div className="stm-spotlight-gallery-3">
                <div className="stm-spotlight-thumb">
                  <img src="/13isu-creative-1.png" alt="13ISU tiramisu night-market activation" loading="lazy" decoding="async" />
                </div>
                <div className="stm-spotlight-thumb">
                  <img src="/13isu-creative-2.png" alt="13ISU custom packaging design" loading="lazy" decoding="async" />
                </div>
                <div className="stm-spotlight-thumb">
                  <img src="/13isu-creative-3.png" alt="13ISU event display architecture" loading="lazy" decoding="async" />
                </div>
              </div>
            </Tilt3DCard>
          </MotionWrapper>

          {/* Compact Short-Form Video Reel Strip with Luxury Sound Controller */}
          <MotionWrapper delay={120} className="video-reel-section" style={{ marginTop: "48px", paddingTop: "36px", borderTop: "1px solid var(--border-hairline-dark)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "16px", marginBottom: "22px" }}>
              <div>
                <span className="editorial-label" style={{ fontSize: "10px", color: "var(--accent-gold)", display: "block", marginBottom: "6px" }}>
                  * Motion &amp; Social Reels · Tap Sound Pill To Unmute
                </span>
                <h3 style={{ margin: 0, fontSize: "clamp(24px, 3vw, 34px)", fontFamily: "var(--font-display)", color: "var(--text-cream)", lineHeight: 1.05 }}>
                  Short-form storytelling &amp; <i style={{ fontFamily: "var(--font-editorial)", fontWeight: 400, color: "var(--accent-gold)" }}>viral craft.</i>
                </h3>
              </div>
              <span style={{ fontFamily: "var(--font-utility)", fontSize: "10px", color: "rgba(246, 241, 233, 0.62)", textTransform: "uppercase" }}>
                13ISU · 100K+ Organic Launch Views
              </span>
            </div>

            <div className="video-reel-strip">
              <ReelVideoCard
                id="reel-culinary"
                src="/assets/misc/WhatsApp%20Video%202026-09-29%20at%2016.08.31.mp4"
                category="Culinary Direction"
                title="Dessert Craft & Texture"
              />
              <ReelVideoCard
                id="reel-packaging"
                src="/assets/misc/WhatsApp%20Video%202026-09-29%20at%2016.09.08.mp4"
                category="Product Storytelling"
                title="Packaging & Unboxing"
              />
              <ReelVideoCard
                id="reel-social"
                src="/assets/misc/WhatsApp%20Video%202026-09-29%20at%2016.10.33.mp4"
                category="Social Campaign"
                title="Community Activation"
              />
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* ====================================================================
          05. INTERACTIVE TABBED CAPABILITIES + LIVE DEMOS (WARM PARCHMENT)
          ==================================================================== */}
      <section className="stm-cap-section" id="services">
        <div className="stm-cap-inner">
          <MotionWrapper style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "20px" }}>
            <div>
              <p className="editorial-label" style={{ color: "var(--accent-terracotta)", margin: "0 0 10px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <span>*</span> 03 / Capabilities
              </p>
              <h2 style={{ fontSize: "clamp(38px, 5vw, 70px)", lineHeight: 0.96, letterSpacing: "-0.04em", margin: 0, fontFamily: "var(--font-display)" }}>
                Integrated capabilities.<br />
                <i style={{ fontFamily: "var(--font-editorial)", fontWeight: 400, color: "var(--accent-terracotta)" }}>Singular execution.</i>
              </h2>
            </div>
            <Link href="/services" onClick={playWarmClick} className="text-link" style={{ fontSize: "11px", letterSpacing: "0.08em" }}>
              Full Capabilities Index <ArrowUpRight size={13} />
            </Link>
          </MotionWrapper>

          {/* Mobile (< 768px): Collapsible Editorial Capabilities Accordion */}
          <div className="stm-cap-mobile-only">
            <div className="stm-mobile-accordion-list">
              {CAPABILITIES.map((cap, idx) => {
                const isOpen = idx === activeCapabilityIdx
                const capHasDemo = cap.number === "01" || cap.number === "03" || cap.number === "05"
                return (
                  <div key={cap.number} className={`stm-mobile-acc-item ${isOpen ? "is-open" : ""}`}>
                    <button
                      type="button"
                      className="stm-mobile-acc-trigger"
                      aria-expanded={isOpen}
                      onClick={() => {
                        playWarmClick()
                        setActiveCapabilityIdx(idx)
                      }}
                    >
                      <span className="stm-mobile-acc-num">{cap.number}</span>
                      <span className="stm-mobile-acc-head">
                        <strong>{cap.title}</strong>
                        <small>{cap.tagline}</small>
                      </span>
                      <ChevronDown size={16} className="stm-mobile-acc-chevron" />
                    </button>

                    {isOpen && (
                      <div className="stm-mobile-acc-body">
                        <p className="stm-mobile-acc-desc">{cap.description}</p>
                        <ul className="stm-mobile-acc-pills">
                          {cap.deliverables.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        {capHasDemo && (
                          <div style={{ marginTop: "14px" }}>
                            <CapabilityMiniDemo pillarIndex={cap.number} />
                          </div>
                        )}
                        <p className="stm-mobile-acc-quote">&ldquo;{cap.valueProposition}&rdquo;</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Desktop / Tablet (>= 768px): Compact 5-Pillar Tab Bar & Stage */}
          <div className="stm-cap-desktop-only">
            <div className="stm-cap-tabs-bar" role="tablist" aria-label="Core studio capabilities">
            {CAPABILITIES.map((cap, idx) => {
              const active = idx === activeCapabilityIdx
              return (
                <button
                  key={cap.number}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    playWarmClick()
                    setActiveCapabilityIdx(idx)
                  }}
                  className={`stm-cap-tab-btn ${active ? "active" : ""}`}
                >
                  <span className="stm-cap-tab-idx">{cap.number}</span>
                  <span>{cap.shortLabel}</span>
                </button>
              )
            })}
          </div>

          {/* Focused Single-Stage Interactive Panel */}
          <MotionWrapper
            key={activeCapability.number}
            className={`stm-cap-stage-panel ${hasInteractiveDemo ? "" : "no-demo"}`}
          >
            <div>
              <span className="editorial-label" style={{ fontSize: "10px", color: "var(--accent-terracotta)", display: "block", marginBottom: "8px" }}>
                {activeCapability.number} · {activeCapability.tagline}
              </span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 38px)", margin: "0 0 14px", lineHeight: 1.08, letterSpacing: "-0.03em" }}>
                {activeCapability.title}
              </h3>
              <p style={{ fontSize: "15px", lineHeight: 1.65, color: "var(--muted)", margin: "0 0 16px" }}>
                {activeCapability.description}
              </p>
              <p style={{ fontSize: "14px", lineHeight: 1.55, color: "var(--text-ink)", fontStyle: "italic", borderLeft: "2px solid var(--accent-terracotta)", paddingLeft: "14px", margin: "0 0 22px" }}>
                &ldquo;{activeCapability.valueProposition}&rdquo;
              </p>
              <ul className="capability-pill-list" aria-label={`${activeCapability.title} deliverables`}>
                {activeCapability.deliverables.map((item) => (
                  <li key={item} className="capability-pill-tag">
                    <span className="capability-pill-dot" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {hasInteractiveDemo ? (
                <CapabilityMiniDemo pillarIndex={activeCapability.number} />
              ) : (
                <div
                  style={{
                    borderRadius: "16px",
                    border: "1px solid var(--border-hairline)",
                    background: "var(--bg-espresso)",
                    color: "var(--text-cream)",
                    padding: "28px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "18px",
                    minHeight: "230px",
                  }}
                >
                  <span className="editorial-label" style={{ fontSize: "10px", color: "var(--accent-gold)" }}>
                    * Outcome Guarantee
                  </span>
                  <p style={{ margin: 0, fontFamily: "var(--font-editorial)", fontSize: "clamp(24px, 2.6vw, 32px)", lineHeight: 1.15 }}>
                    Every asset, funnel, and campaign is engineered to convert attention into predictable pipeline.
                  </p>
                  <Link href="/contact" onClick={playWarmClick} className="stm-btn-terracotta" style={{ width: "fit-content", padding: "11px 22px" }}>
                    Discuss {activeCapability.shortLabel} <ArrowUpRight size={13} />
                  </Link>
                </div>
              )}
            </div>
          </MotionWrapper>
          </div>
        </div>
      </section>

      {/* ====================================================================
          06. COMPACT 2×2 ESPRESSO DIAGNOSTIC (DEEP ESPRESSO)
          ==================================================================== */}
      <section className="diagnostic-espresso-band" id="friction">
        <div className="diagnostic-espresso-inner">
          <MotionWrapper style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "20px", marginBottom: "32px" }}>
            <div>
              <p className="editorial-label" style={{ color: "var(--accent-gold)", margin: "0 0 10px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <span>*</span> 04 / Diagnostic
              </p>
              <h2 style={{ fontSize: "clamp(36px, 5vw, 68px)", lineHeight: 0.96, letterSpacing: "-0.04em", margin: 0, color: "var(--text-cream)", fontFamily: "var(--font-display)" }}>
                The friction behind <i style={{ fontFamily: "var(--font-editorial)", fontWeight: 400, color: "var(--accent-gold)" }}>stagnant growth.</i>
              </h2>
            </div>
            <p style={{ maxWidth: "380px", margin: 0, fontSize: "14px", lineHeight: 1.6, color: "rgba(246, 241, 233, 0.72)" }}>
              Where most ambitious growth engines leak value — and what we engineer away.
            </p>
          </MotionWrapper>

          <MotionWrapper delay={80} className="diagnostic-compact-2x2">
            {FRICTION_POINTS.map((prob) => (
              <article className="diagnostic-compact-cell" key={prob.num}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", marginBottom: "8px" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                      <span style={{ fontFamily: "var(--font-editorial)", fontSize: "30px", color: "var(--accent-gold)", lineHeight: 1 }}>{prob.num}</span>
                      <h3 className="diagnostic-col-title" style={{ margin: 0, fontSize: "19px" }}>{prob.title}</h3>
                    </div>
                    <span className="stm-diag-step-counter">{prob.num} / 04</span>
                  </div>
                  <p className="diagnostic-col-desc" style={{ margin: "0 0 10px", fontSize: "13.5px" }}>{prob.explanation}</p>
                </div>
                <div style={{ fontSize: "12px", color: "rgba(246, 241, 233, 0.85)" }}>
                  <strong style={{ color: "var(--accent-gold)", fontFamily: "var(--font-display)", fontSize: "9.5px", letterSpacing: "0.1em", textTransform: "uppercase", marginRight: "6px" }}>
                    Impact:
                  </strong>
                  {prob.consequence}
                </div>
              </article>
            ))}
          </MotionWrapper>
        </div>
      </section>

      {/* ====================================================================
          07. TRANSFORMATION, METHODOLOGY BEAM & CLIENT IMPACT (PARCHMENT SAND)
          ==================================================================== */}
      <section className="transformation-parchment-band" id="solutions">
        <div className="transformation-parchment-inner">
          {/* Editorial Client Logo & Partner Ribbon */}
          <MotionWrapper className="editorial-client-band" style={{ margin: "0 0 36px", padding: "20px 0" }}>
            {CLIENT_PARTNER_ROSTER.map((client, i) => (
              <span key={client} style={{ display: "inline-flex", alignItems: "center", gap: "20px" }}>
                <span className="editorial-client-name" style={{ fontSize: "clamp(17px, 1.9vw, 24px)" }}>{client}</span>
                {i < CLIENT_PARTNER_ROSTER.length - 1 && (
                  <span className="editorial-divider-glyph" aria-hidden="true">
                    {i % 2 === 0 ? "◆" : "*"}
                  </span>
                )}
              </span>
            ))}
          </MotionWrapper>

          {/* 5-Stage Interactive Methodology Progress Beam */}
          <MethodologyProgressBeam tone="light" />

          {/* 3-Column Selected Client Impact Quotes */}
          <MotionWrapper delay={80} className="editorial-impact-quotes-wrap" style={{ marginTop: "40px", paddingTop: "28px" }}>
            <div className="editorial-impact-quotes-grid">
              <article className="editorial-impact-quote-card" style={{ padding: "22px 22px 22px 0" }}>
                <div>
                  <p className="editorial-impact-metric">100K+</p>
                  <span className="editorial-impact-sublabel">Organic Views in 72 Hours</span>
                </div>
                <blockquote className="editorial-impact-blockquote">
                  &ldquo;You understood our vision really well and turned our launch identity, packaging, and reels into immediate cultural demand.&rdquo;
                </blockquote>
                <div className="editorial-impact-author">
                  <span style={{ color: "var(--accent-terracotta)" }}>*</span>
                  <span>Founder · 13ISU</span>
                </div>
              </article>

              <article className="editorial-impact-quote-card" style={{ padding: "22px" }}>
                <div>
                  <p className="editorial-impact-metric">+140%</p>
                  <span className="editorial-impact-sublabel">Platform Usability &amp; Enquiries</span>
                </div>
                <blockquote className="editorial-impact-blockquote">
                  &ldquo;A genuinely user-friendly platform unifying crop intelligence, farmer marketplace workflows, and market analysis tools cleanly.&rdquo;
                </blockquote>
                <div className="editorial-impact-author">
                  <span style={{ color: "var(--accent-terracotta)" }}>*</span>
                  <span>Leadership · Farmlytics</span>
                </div>
              </article>

              <article className="editorial-impact-quote-card" style={{ padding: "22px 0 22px 22px" }}>
                <div>
                  <p className="editorial-impact-metric">3.2x</p>
                  <span className="editorial-impact-sublabel">Brand Authority &amp; Clarity</span>
                </div>
                <blockquote className="editorial-impact-blockquote">
                  &ldquo;The digital flagship demo and brand reel captured our exact brief on the first pass — elevating student trust immediately.&rdquo;
                </blockquote>
                <div className="editorial-impact-author">
                  <span style={{ color: "var(--accent-terracotta)" }}>*</span>
                  <span>Vivek · Exam Prep</span>
                </div>
              </article>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* ====================================================================
          07B. FEATURED STRATEGIC THESIS / INSIGHTS (WARM PARCHMENT)
          ==================================================================== */}
      <section className="stm-insights-editorial-band" id="insights">
        <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
          <MotionWrapper>
            <div className="stm-insights-grid">
              <div>
                <p className="editorial-label" style={{ color: "var(--accent-terracotta)", margin: "0 0 12px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <span>*</span> Flagship Spotlight 02 · Studio Insights &amp; Strategic Thesis
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(36px, 4.8vw, 64px)",
                    lineHeight: 0.96,
                    letterSpacing: "-0.04em",
                    margin: "0 0 18px",
                    color: "var(--text-ink)",
                  }}
                >
                  Trends Are a Tool,{" "}
                  <i style={{ fontFamily: "var(--font-editorial)", fontWeight: 400, color: "var(--accent-terracotta)" }}>
                    Not a Strategy.
                  </i>
                </h2>

                <blockquote
                  style={{
                    margin: "0 0 20px",
                    padding: "16px 20px",
                    borderLeft: "2px solid var(--accent-terracotta)",
                    background: "var(--bg-parchment-alt)",
                    borderRadius: "0 14px 14px 0",
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                  }}
                >
                  <Quote size={16} style={{ color: "var(--accent-terracotta)", flexShrink: 0, marginTop: "4px" }} />
                  <div>
                    <p style={{ margin: "0 0 6px", fontFamily: "var(--font-editorial)", fontStyle: "italic", fontSize: "clamp(18px, 2vw, 22px)", lineHeight: 1.35, color: "var(--text-ink)" }}>
                      &ldquo;Views are coming. Customers are not. A trend is a useful tool — it is a terrible strategy.&rdquo;
                    </p>
                    <span style={{ fontFamily: "var(--font-utility)", fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>
                      Daksh Bhagat · Co-Founder, Sole Trust Media
                    </span>
                  </div>
                </blockquote>

                <div className="stm-insights-pillars">
                  <div>
                    <strong>01 · Customer Before Content</strong>
                    <span>8,000 high-intent local buyers outperform 100,000 disengaged viral views.</span>
                  </div>
                  <div>
                    <strong>02 · 4-Question Trend Gate</strong>
                    <span>Only use trends that reinforce brand identity and connect honestly to the product.</span>
                  </div>
                  <div>
                    <strong>03 · Enquiries Per 1,000 Reach</strong>
                    <span>Track DMs, calls, saves, and sub-hour reply speed instead of vanity likes.</span>
                  </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "22px" }}>
                  <button
                    type="button"
                    className="stm-btn-terracotta"
                    onClick={() => {
                      playWarmClick()
                      setActiveDrawerProject({
                        slug: "trends-are-a-tool",
                        name: "Trends Are a Tool, Not a Strategy",
                        category: "Strategic Thesis & Social Commerce",
                        image: "/assets/work/trends-are-a-tool/trends-cover.svg",
                        targetUrl: "/work/trends-are-a-tool",
                        isExternal: false,
                      })
                    }}
                  >
                    Inspect Strategic Dossier <ArrowRight size={14} />
                  </button>
                  <Link
                    href="/work/trends-are-a-tool"
                    onClick={playWarmClick}
                    className="button button-outline"
                    style={{ color: "var(--text-ink)", borderColor: "var(--border-hairline)", borderRadius: "999px" }}
                  >
                    Read Full Paper <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>

              <Tilt3DCard
                className="stm-insights-visual-card"
                magneticCase
                maxTilt={6}
                role="button"
                tabIndex={0}
                onClick={() =>
                  setActiveDrawerProject({
                    slug: "trends-are-a-tool",
                    name: "Trends Are a Tool, Not a Strategy",
                    category: "Strategic Thesis & Social Commerce",
                    image: "/assets/work/trends-are-a-tool/trends-cover.svg",
                    targetUrl: "/work/trends-are-a-tool",
                    isExternal: false,
                  })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setActiveDrawerProject({
                      slug: "trends-are-a-tool",
                      name: "Trends Are a Tool, Not a Strategy",
                      category: "Strategic Thesis & Social Commerce",
                      image: "/assets/work/trends-are-a-tool/trends-cover.svg",
                      targetUrl: "/work/trends-are-a-tool",
                      isExternal: false,
                    })
                  }
                }}
              >
                <img
                  src="/assets/work/trends-are-a-tool/trends-cover.svg"
                  alt="Trends Are a Tool, Not a Strategy — Strategic Visual Thesis"
                  loading="lazy"
                  decoding="async"
                />
                <div className="stm-insights-visual-foot">
                  <span>WHITEPAPER · SOCIAL COMMERCE ARCHITECTURE</span>
                  <ArrowUpRight size={14} style={{ color: "var(--accent-gold)" }} />
                </div>
              </Tilt3DCard>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* ====================================================================
          08. INTERACTIVE SCOPE CONFIGURATOR (WARM PARCHMENT)
          ==================================================================== */}
      <ScopeConfigurator onLockScope={handleLockScope} />

      {/* ====================================================================
          09. FINAL CONTACT STUDIO (DEEP ESPRESSO + PILL INPUTS)
          ==================================================================== */}
      <section className="contact" id="contact" style={{ background: "var(--bg-espresso)", color: "var(--text-cream)" }}>
        <div className="contact-inner" style={{ maxWidth: "1060px", margin: "0 auto" }}>
          {scopeBanner && (
            <div
              role="status"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "9px 18px",
                borderRadius: "999px",
                background: "rgba(140, 45, 25, 0.32)",
                border: "1px solid rgba(197, 155, 109, 0.45)",
                color: "var(--text-cream)",
                fontFamily: "var(--font-utility)",
                fontSize: "11px",
                letterSpacing: "0.06em",
                marginBottom: "18px",
              }}
            >
              <Check size={13} style={{ color: "var(--accent-gold)" }} />
              <span>{scopeBanner}</span>
            </div>
          )}

          <p className="editorial-label" style={{ color: "var(--accent-gold)", marginBottom: "12px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <span>*</span> 05 / Start a Project
          </p>
          <h2 style={{ fontSize: "clamp(42px, 6.5vw, 92px)", lineHeight: 0.94, margin: "0 0 18px", fontFamily: "var(--font-display)", color: "var(--text-cream)" }}>
            Have an idea? <i style={{ fontFamily: "var(--font-editorial)", fontWeight: 400, color: "var(--accent-gold)" }}>Let&apos;s make it happen.</i>
          </h2>
          <p style={{ maxWidth: "560px", color: "rgba(246, 241, 233, 0.74)", fontSize: "15.5px", lineHeight: 1.6, marginBottom: "36px" }}>
            We review every enquiry personally and respond within 24 business hours.
          </p>

          <form onSubmit={submitEnquiry} noValidate style={{ maxWidth: "820px" }}>
            {sent ? (
              <div
                className="form-success-box"
                style={{
                  background: "rgba(246, 241, 233, 0.08)",
                  border: "1px solid var(--border-hairline-dark)",
                  padding: "36px",
                  borderRadius: "20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px", color: "var(--text-cream)" }}>
                  <Check size={24} />
                  <h3 style={{ margin: 0, fontSize: "24px" }}>Thank you{submittedInfo?.fullName ? `, ${submittedInfo.fullName}` : ""}.</h3>
                </div>
                <p style={{ margin: "0 0 20px", color: "rgba(246, 241, 233, 0.78)", fontSize: "15px", lineHeight: 1.6 }}>
                  Your proposal brief has been received and routed directly to our directors. For immediate correspondence, reach us at{" "}
                  <a href="mailto:admin@soletrustmedia.agency" style={{ color: "var(--accent-gold)", textDecoration: "underline" }}>
                    admin@soletrustmedia.agency
                  </a>
                  .
                </p>
                {submittedInfo && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "20px", paddingTop: "20px", borderTop: "1px solid var(--border-hairline-dark)" }}>
                    <a
                      href={submittedInfo.gmailWebUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="stm-btn-terracotta"
                      style={{ padding: "12px 24px", fontSize: "11px" }}
                    >
                      <Mail size={13} /> Send via Gmail (Web)
                    </a>
                    <a
                      href={submittedInfo.mailtoUrl}
                      className="button button-light"
                      style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", fontSize: "11px" }}
                    >
                      <ArrowUpRight size={13} /> Open in Mail App
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSent(false)
                        setSubmittedInfo(null)
                      }}
                      className="button button-dark"
                      style={{ padding: "12px 24px", fontSize: "11px", border: "1px solid var(--border-hairline-dark)" }}
                    >
                      Submit another inquiry
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div style={{ marginBottom: "24px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {SERVICE_OPTIONS.map((service) => {
                      const active = selectedServices.includes(service)
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleServicePill(service)}
                          style={{
                            padding: "8px 16px",
                            borderRadius: "999px",
                            font: "10.5px var(--font-utility)",
                            cursor: "pointer",
                            background: active ? "var(--text-cream)" : "rgba(246, 241, 233, 0.05)",
                            color: active ? "var(--bg-espresso)" : "var(--text-cream)",
                            border: active ? "1px solid var(--text-cream)" : "1px solid var(--border-hairline-dark)",
                          }}
                        >
                          {service}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" }}>
                  <input ref={contactNameInputRef} name="full_name" aria-label="Full Name" className="stm-pill-input" required placeholder="Your Full Name *" />
                  <input name="company_name" aria-label="Company Name" className="stm-pill-input" placeholder="Company / Brand Name" />
                </div>

                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px", marginTop: "14px" }}>
                  <input type="email" name="email" aria-label="Email" className="stm-pill-input" required placeholder="Email Address *" />
                  <input type="tel" name="phone" aria-label="Phone Number" className="stm-pill-input" placeholder="Phone / WhatsApp" />
                </div>

                <div style={{ marginTop: "20px" }}>
                  <textarea
                    name="project_description"
                    aria-label="Project Description"
                    className="stm-pill-textarea"
                    rows={3}
                    required
                    value={projectBrief}
                    onChange={(e) => setProjectBrief(e.target.value)}
                    placeholder="Tell us what you're building and what success looks like *"
                  />
                </div>

                {formError && (
                  <p style={{ color: "#F28B82", fontSize: "13px", marginTop: "12px" }}>{formError}</p>
                )}

                <div style={{ marginTop: "24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
                  <button type="submit" disabled={submitting} className="stm-btn-terracotta">
                    {submitting ? "Sending..." : "Request Custom Proposal"} <ArrowUpRight size={14} />
                  </button>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "20px", fontFamily: "var(--font-utility)", fontSize: "11.5px", color: "var(--accent-gold)" }}>
                    <CopyEmailLink tone="dark" size="sm" />
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
                      <MapPin size={13} /> Bengaluru, India
                    </span>
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
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
