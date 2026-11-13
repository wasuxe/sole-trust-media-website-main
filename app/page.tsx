"use client"

import { ArrowUpRight, ArrowRight, ArrowDown, Mail, MapPin, Plus, Check } from "lucide-react"
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

export default function Page() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [budget, setBudget] = useState<string>("")
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [workFilter, setWorkFilter] = useState<string>("All")

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
          setSent(true)
          setSelectedServices([])
          event.currentTarget.reset()
        } else {
          setFormError(
            data.error ||
              "We couldn't submit your enquiry right now. Please email us directly at support@soletrustmedia.agency"
          )
        }
      }
    } catch {
      setFormError(
        "A network error occurred. Please contact us directly at support@soletrustmedia.agency"
      )
    } finally {
      setSubmitting(false)
    }
  }

  // Filter projects for the portfolio section
  const filteredProjects = PROJECTS.filter((p) => {
    if (workFilter === "All") return true
    const text = `${p.name} ${p.category} ${p.type} ${p.tags.join(" ")}`.toLowerCase()
    if (workFilter === "Digital & Web") return /\b(web|website|digital|platform|portal)\b/i.test(text)
    if (workFilter === "Branding") return /\b(brand|branding|identity|typography|packaging)\b/i.test(text)
    if (workFilter === "Concepts") return /\b(concept|self-initiated|figma)\b/i.test(text)
    if (workFilter === "Technology") return /\b(ai|technology|software|automation)\b/i.test(text)
    return true
  }).slice(0, 8)

  return (
    <main className="site-shell">
      {/* ====================================================================
          SECTION A: NAVIGATION
          ==================================================================== */}
      <SiteNav />

      {/* ====================================================================
          SECTION B: HERO (PREMIUM EDITORIAL & CINEMATIC STORYTELLING)
          ==================================================================== */}
      <section className="hero" id="top">
        <div className="hero-container">
          <div className="hero-copy reveal">
            <p className="eyebrow hero-eyebrow">
              Independent Creative Technology Studio
            </p>

            <h1 className="hero-headline">
              Ideas into <i>experiences.</i>
              <br />
              Creativity into <i>growth.</i>
            </h1>

            <p className="hero-sub">
              We combine strategy, creativity and technology to build meaningful brands, digital experiences and business opportunities.
            </p>

            <div className="hero-actions">
              <a className="button button-dark" href="#work">
                Explore Our Work <ArrowDown size={14} />
              </a>
              <a className="button button-outline" href="#contact">
                Start a Project <ArrowUpRight size={14} />
              </a>
            </div>

            <div className="hero-stats" aria-label="Agency milestones">
              <div className="hero-stat-item">
                <strong>50+</strong>
                <span>Brands Shaped</span>
              </div>
              <div className="hero-stat-item">
                <strong>100+</strong>
                <span>Projects Delivered</span>
              </div>
              <div className="hero-stat-item">
                <strong>3+</strong>
                <span>Years of Craft</span>
              </div>
              <div className="hero-stat-item">
                <strong>Global</strong>
                <span>Bengaluru · Worldwide</span>
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
          SECTION 03: STUDIO INTRODUCTION (EDITORIAL SPLIT & MANIFESTO)
          ==================================================================== */}
      <section className="studio-intro-section" id="about">
        <div className="studio-intro-grid reveal">
          <div>
            <p
              className="eyebrow"
              style={{
                fontFamily: "var(--font-utility)",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--brown)",
                fontWeight: 600,
                marginBottom: "16px",
              }}
            >
              01 / Studio Manifesto
            </p>
            <h2
              style={{
                fontSize: "clamp(40px, 5.5vw, 80px)",
                lineHeight: 0.96,
                letterSpacing: "-0.045em",
                margin: "0 0 28px",
                fontFamily: "var(--font-display)",
              }}
            >
              Good ideas deserve<br />
              <i style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", fontWeight: 400 }}>better execution.</i>
            </h2>
            <p
              style={{
                fontSize: "clamp(15px, 1.8vw, 18px)",
                lineHeight: 1.65,
                color: "var(--dark)",
                marginBottom: "24px",
                fontWeight: 400,
              }}
            >
              Most ambitious businesses don&apos;t struggle because of poor products. They struggle because their brand execution is fragmented across disconnected silos — a social agency making temporary noise, an off-the-shelf website that leaks conversions, and manual sales bottlenecks.
            </p>
            <blockquote
              style={{
                borderLeft: "2px solid var(--brown)",
                paddingLeft: "22px",
                margin: "30px 0",
                fontStyle: "italic",
                color: "var(--muted)",
                fontSize: "15px",
                lineHeight: 1.7,
              }}
            >
              &ldquo;We built Sole Trust Media to eliminate this divide. We combine strategic brand positioning, cinematic visual craft, bespoke digital engineering, and automated systems to build brands people genuinely remember and trust.&rdquo;
            </blockquote>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "20px",
                paddingTop: "24px",
                borderTop: "1px solid var(--line)",
              }}
            >
              <div>
                <strong style={{ display: "block", fontSize: "14px", fontFamily: "var(--font-display)", color: "var(--dark)" }}>
                  01 · Strategy With Intent
                </strong>
                <span style={{ fontSize: "13px", color: "var(--muted)" }}>Clarity before aesthetic decoration</span>
              </div>
              <div>
                <strong style={{ display: "block", fontSize: "14px", fontFamily: "var(--font-display)", color: "var(--dark)" }}>
                  02 · Visceral Craft
                </strong>
                <span style={{ fontSize: "13px", color: "var(--muted)" }}>Commanding pricing power &amp; distinction</span>
              </div>
              <div>
                <strong style={{ display: "block", fontSize: "14px", fontFamily: "var(--font-display)", color: "var(--dark)" }}>
                  03 · Technology That Scales
                </strong>
                <span style={{ fontSize: "13px", color: "var(--muted)" }}>Fast flagships &amp; automated pipelines</span>
              </div>
            </div>
          </div>

          <div className="studio-intro-visual-frame">
            <img
              src="/assets/work/twine/twine-01.jpeg"
              alt="Sole Trust Media Craft & Visual Direction"
              loading="lazy"
            />
            <div className="studio-intro-badge">
              <div>
                <span style={{ fontFamily: "var(--font-utility)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--brown)", display: "block" }}>
                  DISCIPLINED ATELIER
                </span>
                <strong style={{ fontSize: "14px", color: "var(--dark)" }}>
                  Bengaluru Studio · Worldwide Execution
                </strong>
              </div>
              <Link href="/work" className="button button-dark" style={{ padding: "8px 16px", fontSize: "10px" }}>
                Explore Craft <ArrowUpRight size={12} />
              </Link>
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
                      <span style={{ fontSize: "10px", fontFamily: "var(--font-utility)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: "12px" }}>
                        Deliverables &amp; Core Output
                      </span>
                      <ul className="service-items" aria-label={`${cap.title} offerings`}>
                        {cap.deliverables.map((item) => (
                          <li key={item}>{item}</li>
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
          SECTION D: THE FRICTION BEHIND STAGNANT GROWTH
          ==================================================================== */}
      <section className="problems-section section-grid" id="friction">
        <div className="section-label">02 / Diagnostic</div>
        <div className="intro-content">
          <div className="section-heading reveal">
            <h2>
              The friction behind<br />
              <i>stagnant growth.</i>
            </h2>
            <p>
              Most ambitious businesses do not have a product quality issue — they have an articulation, presentation, or conversion disconnect. Here is where the growth engine breaks.
            </p>
          </div>

          <div className="problems-grid reveal">
            {FRICTION_POINTS.map((prob) => (
              <div className="problem-card" key={prob.num}>
                <div>
                  <div className="problem-card-top">
                    <span className="problem-card-num">{prob.num}</span>
                    <span className="eyebrow">DIAGNOSED HURDLE</span>
                  </div>
                  <h3>{prob.title}</h3>
                  <p className="problem-card-desc">{prob.explanation}</p>
                </div>
                <div className="problem-card-consequence">
                  <strong>Commercial Consequence: </strong>
                  {prob.consequence}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION E: STRATEGY. STRATEGY TO VALUE.
          ==================================================================== */}
      <section className="solutions-section section-grid" id="solutions">
        <div className="section-label">03 / Transformation</div>
        <div className="intro-content">
          <div className="section-heading reveal">
            <h2>
              Problem to Strategy.<br />
              <i>Strategy to Value.</i>
            </h2>
            <p>
              We act as an integrated growth consultancy and creative engineering team, turning systemic operational challenges into measurable commercial leverage.
            </p>
          </div>

          <div className="solutions-flow reveal">
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
              <div key={item.step} className="solution-step-card">
                <div className="solution-step-header">
                  <span className="solution-step-num">STAGE {item.step}</span>
                </div>
                <div className="solution-step-grid">
                  <div className="solution-step-col">
                    <span className="solution-col-label">01 · Business Friction</span>
                    <h4>{item.problem}</h4>
                  </div>
                  <div className="solution-step-col">
                    <span className="solution-col-label">02 · Studio Strategy</span>
                    <p>{item.strategy}</p>
                  </div>
                  <div className="solution-step-col value-col">
                    <span className="solution-col-label">03 · Commercial Value</span>
                    <strong>{item.value}</strong>
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
      <section className="pillars-section section-grid" id="about">
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
          SECTION G: SELECTED WORK (ASYMMETRIC EDITORIAL PORTFOLIO)
          ==================================================================== */}
      <section className="work-section section-grid" id="work">
        <div className="section-label">05 / Selected Work</div>
        <div className="work-content">
          <div className="section-heading reveal">
            <h2>
              Selected work.<br />
              <i>Distinctive thinking.</i>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
              <p style={{ margin: 0 }}>
                An editorial archive of client commissions, digital flagships, and self-initiated concept explorations.
              </p>
              <Link href="/work" className="text-link" style={{ fontSize: "11px" }}>
                View complete archive (20+ projects) <ArrowUpRight size={12} />
              </Link>
            </div>
          </div>

          {/* Quick Filter Bar */}
          <div
            className="portfolio-filter-row reveal"
            style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "40px" }}
          >
            {["All", "Digital & Web", "Branding", "Concepts", "Technology"].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setWorkFilter(f)}
                className={`button ${workFilter === f ? "button-dark" : "button-outline"}`}
                style={{ padding: "8px 18px", fontSize: "10px" }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Asymmetric Portfolio Grid */}
          <div className="selected-work-grid reveal">
            {filteredProjects.map((project, idx) => {
              const targetUrl =
                project.slug === "13isu"
                  ? "/work/13isu"
                  : project.slug === "trends-are-a-tool"
                  ? "/work/trends-are-a-tool"
                  : project.link || `/work/${project.slug}`
              const isExternal = Boolean(project.link && !targetUrl.startsWith("/work/"))

              return (
                <div className="selected-card" key={project.slug}>
                  <a
                    href={targetUrl}
                    className="selected-card-image"
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={`View ${project.name}`}
                  >
                    <img
                      src={project.cover_image}
                      alt={`${project.name} preview`}
                      loading="lazy"
                    />
                    <span className="selected-card-tag">{project.tag}</span>
                    <span className="selected-card-marker">{project.marker || `0${idx + 1}`}</span>
                  </a>
                  <div className="selected-card-body">
                    <div>
                      <div className="selected-card-type">{project.type}</div>
                      <h3 className="selected-card-title">
                        <a
                          href={targetUrl}
                          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          {project.name}
                        </a>
                      </h3>
                      <p className="selected-card-desc">{project.description}</p>
                      <div className="selected-card-services">
                        {project.services.slice(0, 4).map((s) => (
                          <span key={s} className="selected-card-service-pill">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ marginTop: "24px" }}>
                      <a
                        href={targetUrl}
                        className="selected-card-cta"
                        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {project.cta} <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* High-Craft Short-Form Video Reel Strip */}
          <div className="video-reel-section reveal">
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
          SECTION H: DOCUMENTED CRAFT. REAL RESULTS.
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
              <span className="selected-card-type">CONTENT ARCHITECTURE &amp; SOCIAL COMMERCE</span>
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
          SECTION I: INSIGHTS (MAGAZINE-STYLE EDITORIAL CONTENT)
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
          SECTION J: FINAL CTA & ENQUIRY STUDIO
          ==================================================================== */}
      <section className="contact" id="contact" style={{ background: "var(--dark)", color: "var(--cream)", padding: "160px 4vw" }}>
        <div className="contact-inner" style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p
            className="eyebrow"
            style={{
              fontFamily: "var(--font-utility)",
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--beige)",
              marginBottom: "16px",
            }}
          >
            09 / New Business
          </p>
          <h2
            style={{
              fontSize: "clamp(50px, 8vw, 120px)",
              lineHeight: 0.95,
              margin: "0 0 24px",
              fontFamily: "var(--font-display)",
            }}
          >
            Have an idea?<br />
            <i>Let&apos;s make it happen.</i>
          </h2>
          <p
            style={{
              maxWidth: "600px",
              color: "var(--beige)",
              fontSize: "clamp(15px, 1.8vw, 18px)",
              lineHeight: 1.65,
              marginBottom: "50px",
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
                  <h3 style={{ margin: 0, fontSize: "24px" }}>Thank you for reaching out.</h3>
                </div>
                <p style={{ margin: 0, color: "var(--beige)", fontSize: "15px", lineHeight: 1.6 }}>
                  Your project enquiry has been safely received. Our strategy directors will review your requirements and reach out within 24 hours.
                </p>
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
                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
                  <div>
                    <input
                      name="full_name"
                      aria-label="Full Name"
                      required
                      placeholder="Your Full Name *"
                      style={{
                        background: "transparent",
                        border: 0,
                        borderBottom: "1px solid rgba(243, 235, 221, 0.25)",
                        color: "var(--cream)",
                        padding: "16px 0",
                        fontSize: "15px",
                        width: "100%",
                        outline: "none",
                      }}
                    />
                  </div>
                  <div>
                    <input
                      name="company_name"
                      aria-label="Company Name"
                      placeholder="Company / Brand Name"
                      style={{
                        background: "transparent",
                        border: 0,
                        borderBottom: "1px solid rgba(243, 235, 221, 0.25)",
                        color: "var(--cream)",
                        padding: "16px 0",
                        fontSize: "15px",
                        width: "100%",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginTop: "24px" }}>
                  <div>
                    <input
                      type="email"
                      name="email"
                      aria-label="Email"
                      required
                      placeholder="Email Address *"
                      style={{
                        background: "transparent",
                        border: 0,
                        borderBottom: "1px solid rgba(243, 235, 221, 0.25)",
                        color: "var(--cream)",
                        padding: "16px 0",
                        fontSize: "15px",
                        width: "100%",
                        outline: "none",
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      aria-label="Phone Number"
                      placeholder="Phone Number / WhatsApp"
                      style={{
                        background: "transparent",
                        border: 0,
                        borderBottom: "1px solid rgba(243, 235, 221, 0.25)",
                        color: "var(--cream)",
                        padding: "16px 0",
                        fontSize: "15px",
                        width: "100%",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                {/* Budget selector */}
                <div style={{ marginTop: "32px" }}>
                  <label
                    style={{
                      fontFamily: "var(--font-utility)",
                      fontSize: "11px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
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
                          padding: "8px 16px",
                          borderRadius: "999px",
                          font: "11px var(--font-utility)",
                          cursor: "pointer",
                          background: budget === opt ? "var(--cream)" : "transparent",
                          color: budget === opt ? "var(--dark)" : "var(--cream)",
                          border: budget === opt ? "1px solid var(--cream)" : "1px solid rgba(243, 235, 221, 0.2)",
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Description */}
                <div style={{ marginTop: "32px" }}>
                  <textarea
                    name="project_description"
                    aria-label="Project Description"
                    rows={4}
                    required
                    placeholder="Tell us about your brand, what you're building, and what success looks like *"
                    style={{
                      background: "transparent",
                      border: 0,
                      borderBottom: "1px solid rgba(243, 235, 221, 0.25)",
                      color: "var(--cream)",
                      padding: "16px 0",
                      fontSize: "15px",
                      width: "100%",
                      outline: "none",
                      resize: "vertical",
                    }}
                  />
                </div>

                {formError && (
                  <p style={{ color: "#F28B82", fontSize: "13px", marginTop: "16px" }}>{formError}</p>
                )}

                <div style={{ marginTop: "40px" }}>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="button button-light"
                    style={{ padding: "16px 36px", fontSize: "11px", letterSpacing: "0.1em" }}
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
            <a href="mailto:support@soletrustmedia.agency" style={{ display: "flex", alignItems: "center", gap: "8px", color: "inherit" }}>
              <Mail size={14} /> support@soletrustmedia.agency
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
