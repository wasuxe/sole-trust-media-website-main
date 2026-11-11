"use client"

import { ArrowUpRight, ArrowRight, Menu, X, Mail, MapPin, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { PROJECTS } from "@/lib/data/projects"

// ============================================================================
// DATA STRUCTURES
// ============================================================================

interface ServiceCategory {
  letter: string
  title: string
  tagline: string
  description: string
  valueProposition: string
  items: string[]
}

const serviceCategories: ServiceCategory[] = [
  {
    letter: "A",
    title: "Branding & Identity",
    tagline: "Unmistakable identity and positioning",
    description:
      "We define and design distinctive brand identities that resonate deeply, differentiate clearly, and endure through changing market conditions.",
    valueProposition: "Value: Command market authority, elevate perceived value, and stand out effortlessly.",
    items: [
      "Brand strategy",
      "Logo design",
      "Visual identity",
      "Brand guidelines",
      "Brand positioning",
      "Rebranding",
    ],
  },
  {
    letter: "B",
    title: "Website Development",
    tagline: "High-performance digital flagships",
    description:
      "Fast, responsive, conversion-engineered websites built with modern web technologies that deliver seamless user journeys and real business performance.",
    valueProposition: "Value: Turn cold visitors into qualified, high-intent client enquiries.",
    items: [
      "Business websites",
      "E-commerce",
      "Landing pages",
      "Custom web apps",
      "UI/UX design",
      "Website maintenance",
    ],
  },
  {
    letter: "C",
    title: "Application Development",
    tagline: "Scalable iOS, Android & SaaS platforms",
    description:
      "From native mobile experiences to complex web portals and SaaS architectures, we build robust software products designed to scale effortlessly.",
    valueProposition: "Value: Power operational efficiency and customer retention with dependable software.",
    items: [
      "Android/iOS apps",
      "Custom business apps",
      "SaaS platforms",
      "Business management systems",
      "Web apps",
    ],
  },
  {
    letter: "D",
    title: "Digital Marketing",
    tagline: "Data-led multi-channel growth systems",
    description:
      "Targeted, outcome-focused marketing strategies across search, social, and paid channels that deliver predictable customer acquisition.",
    valueProposition: "Value: Consistent inbound pipeline, lower CAC, and measurable return on ad spend.",
    items: [
      "Social media marketing",
      "Performance marketing",
      "Google Ads",
      "SEO",
      "Google Business Profile",
      "Marketing strategy",
    ],
  },
  {
    letter: "E",
    title: "Creative & Content Production",
    tagline: "High-craft visuals that stop the scroll",
    description:
      "Campaign-level creative direction, short-form video production, and editorial photography that bring your brand narrative to life with authenticity.",
    valueProposition: "Value: Build strong emotional resonance and retain continuous audience mindshare.",
    items: [
      "Social media creatives",
      "Video editing",
      "Reels/promo videos",
      "Photography",
      "Campaign creatives",
      "Advertising materials",
    ],
  },
  {
    letter: "F",
    title: "Business Automation & Technology",
    tagline: "Streamlined operations & AI integrations",
    description:
      "Intelligent workflow automation, AI assistants, and CRM integrations that eliminate repetitive manual tasks and eliminate friction across your sales funnel.",
    valueProposition: "Value: Reclaim hundreds of productive hours and eliminate operational bottlenecks.",
    items: [
      "Workflow automation",
      "AI integrations",
      "Lead management",
      "CRM integrations",
      "Process optimisation",
      "Custom digital solutions",
    ],
  },
]

const problemsList = [
  {
    num: "01",
    title: "Weak Brand Identity",
    explanation: "Businesses struggle to communicate who they are and why they matter in crowded, noisy markets.",
    consequence: "Lost differentiation, suppressed pricing power, and vulnerability to commoditisation.",
  },
  {
    num: "02",
    title: "Poor Digital Presence",
    explanation: "Outdated, clunky, or slow websites fail to establish immediate credibility with prospective clients.",
    consequence: "High bounce rates, damaged first impressions, and lost client trust before conversations start.",
  },
  {
    num: "03",
    title: "Ineffective Marketing",
    explanation: "Scattered marketing campaigns lack strategic direction, clear targeting, or conversion discipline.",
    consequence: "Wasted capital and ad spend with negligible or unmeasurable revenue return.",
  },
  {
    num: "04",
    title: "Weak Content Strategy",
    explanation: "Generic, disconnected social posts and assets that fail to hook, engage, or move audiences.",
    consequence: "Minimal audience reach, zero engagement, and an invisible brand presence.",
  },
  {
    num: "05",
    title: "Low Lead Generation",
    explanation: "Unable to translate online traffic and social attention into actual inbound commercial enquiries.",
    consequence: "Unpredictable sales cycles, dry pipeline periods, and revenue volatility.",
  },
  {
    num: "06",
    title: "Inefficient Operations",
    explanation: "Manual customer onboarding, spreadsheet chaos, and disconnected tools waste immense team time.",
    consequence: "Operational bottlenecks, costly human mistakes, and slowed organizational growth.",
  },
  {
    num: "07",
    title: "Inconsistent Brand Communication",
    explanation: "Different messaging, visuals, and tones across touchpoints confuse potential buyers.",
    consequence: "Eroded buyer confidence, fragmented perception, and weakened brand recall.",
  },
]

const solutionFlows = [
  {
    problem: "Weak Brand Identity",
    problemSub: "Unclear market position & generic appearance",
    strategies: ["Brand discovery", "Market research", "Brand positioning", "Visual identity", "Brand guidelines"],
    value: "Cohesive, memorable identity that builds instant market trust & premium pricing power",
  },
  {
    problem: "Poor Digital Presence",
    problemSub: "Slow, non-converting or outdated web experience",
    strategies: ["Website strategy", "UI/UX design", "Modern development", "SEO foundations", "Conversion optimisation"],
    value: "High-performance digital flagship that turns visitors into high-intent inbound clients",
  },
  {
    problem: "Ineffective Marketing",
    problemSub: "Unfocused ad spend & disjointed campaigns",
    strategies: ["Audience research", "Campaign strategy", "Creative development", "Paid advertising", "Performance analysis"],
    value: "Targeted, data-backed campaigns with measurable, compounding customer acquisition",
  },
  {
    problem: "Weak Content",
    problemSub: "Inconsistent posting & low engagement assets",
    strategies: ["Content strategy", "Creative direction", "Video production", "Social media creatives", "Publishing systems"],
    value: "Compelling content engine that engages your community & drives continuous demand",
  },
  {
    problem: "Inefficient Operations",
    problemSub: "Manual data entry & disconnected tool stacks",
    strategies: ["Workflow analysis", "Process automation", "AI integration", "Custom software", "Business systems"],
    value: "Streamlined operational workflows that save hundreds of hours and scale smoothly",
  },
]

const pillars = [
  {
    num: "01",
    title: "Strategic Thinking",
    description:
      "We understand the business before recommending a solution. We immerse ourselves in your model, your competitors, and your audience reality before creating.",
  },
  {
    num: "02",
    title: "Creativity With Purpose",
    description:
      "Every creative decision must serve a meaningful objective. Aesthetics are a functional vehicle to earn attention, establish trust, and drive commercial action.",
  },
  {
    num: "03",
    title: "Technology That Works",
    description:
      "Modern technology, useful and scalable solutions. We avoid brittle gimmicks and build clean, maintainable systems that serve real users reliably.",
  },
  {
    num: "04",
    title: "Personalised Approach",
    description:
      "Every business has different needs, constraints, and ambitions. Our solutions are custom-built around your specific trajectory, never forced into fixed formulas.",
  },
  {
    num: "05",
    title: "Business-Focused Execution",
    description:
      "We focus on solving real problems and unlocking genuine opportunities. Everything we build is judged by its enduring contribution to your bottom line.",
  },
]

const serviceOptions = [
  "Branding & Identity",
  "Website Development",
  "Application Development",
  "Digital Marketing",
  "Creative & Content Production",
  "Business Automation",
  "Other",
]

const budgetOptions = [
  "Below ₹25,000",
  "₹25,000–₹50,000",
  "₹50,000–₹1,00,000",
  "₹1,00,000–₹3,00,000",
  "₹3,00,000+",
  "Not decided yet",
]

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState("")

  // Scroll reveal IntersectionObserver
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal")
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index)
  }

  const toggleServiceCheckbox = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((item) => item !== service) : [...prev, service]
    )
  }

  async function submitEnquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setFormError("")

    const form = new FormData(event.currentTarget)
    const fullName = String(form.get("full_name") ?? "").trim()
    const companyName = String(form.get("company_name") ?? "").trim() || null
    const email = String(form.get("email") ?? "").trim()
    const phone = String(form.get("phone") ?? "").trim() || null
    const budget = String(form.get("budget") ?? "").trim() || null
    const projectDescription = String(form.get("project_description") ?? "").trim()

    if (!fullName || !email || !projectDescription) {
      setFormError("Please fill in all required fields (Name, Email, and Project Description).")
      setSubmitting(false)
      return
    }

    try {
      const client = getSupabaseBrowserClient()

      // Primary insertion: enquiries table
      const enquiryPayload = {
        full_name: fullName,
        company_name: companyName,
        email: email,
        phone: phone,
        services_required: selectedServices,
        budget: budget,
        project_description: projectDescription,
      }

      const { error: enquiriesError } = await client
        .from("enquiries")
        .insert(enquiryPayload as never)

      if (enquiriesError) {
        // Fallback: contact_submissions table
        const fallbackPayload = {
          name: fullName,
          company: companyName,
          email: email,
          budget: budget,
          message: `[Phone: ${phone ?? "N/A"}] [Services: ${
            selectedServices.length > 0 ? selectedServices.join(", ") : "None specified"
          }]\n\n${projectDescription}`,
        }

        const { error: fallbackError } = await client
          .from("contact_submissions")
          .insert(fallbackPayload as never)

        if (fallbackError) {
          setFormError(
            "We couldn't submit your enquiry right now. Please email us directly at support@soletrustmedia.agency"
          )
        } else {
          setSent(true)
          setSelectedServices([])
          event.currentTarget.reset()
        }
      } else {
        setSent(true)
        setSelectedServices([])
        event.currentTarget.reset()
      }
    } catch {
      setFormError(
        "A network error occurred. Please contact us directly at support@soletrustmedia.agency"
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="site-shell">
      {/* Navigation */}
      <nav className="nav home-nav" aria-label="Main Navigation">
        <a className="wordmark" href="#top" aria-label="Sole Trust Media home">
          <span>STM</span>
          <small>SOLE TRUST MEDIA<sup>®</sup></small>
        </a>
        <span className="nav-rule" aria-hidden="true" />
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#services" onClick={() => setMenuOpen(false)}>Creative</a>
          <span aria-hidden="true">/</span>
          <a href="#services" onClick={() => setMenuOpen(false)}>Branding</a>
          <span aria-hidden="true">/</span>
          <a href="/work" onClick={() => setMenuOpen(false)}>Digital</a>
          <span aria-hidden="true">/</span>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Growth</a>
        </div>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* ====================================================================
          SECTION 01: HERO
          ==================================================================== */}
      <section className="hero" id="top">
        <div className="hero-copy reveal">
          <h1>
            We Create
            <br />
            <em>Brands</em> That
            <br />
            People
            <br />
            Remember<span className="hero-period">.</span>
          </h1>
          <p className="hero-sub">
            A full-service marketing agency that blends creativity, strategy and technology to build
            powerful brands, drive real growth, and create lasting digital experiences.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#contact">
              Start Your Project <ArrowUpRight data-icon="inline-end" />
            </a>
            <a className="text-link" href="/work">
              See Our Work
            </a>
          </div>
          <div className="hero-stats" aria-label="Agency milestones">
            <div><strong>50+</strong><span>Brands</span></div>
            <div><strong>100+</strong><span>Projects</span></div>
            <div><strong>3+</strong><span>Years</span></div>
            <div><strong>∞</strong><span>Growth focus</span></div>
          </div>
        </div>
        <div className="hero-art reveal" aria-hidden="true">
          <svg className="hero-ribbon" viewBox="0 0 900 760" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="hero-disc" cx="0" cy="0" r="1" gradientTransform="matrix(460 0 0 460 485 372)" gradientUnits="userSpaceOnUse">
                <stop stopColor="#321723" />
                <stop offset="1" stopColor="#100D12" />
              </radialGradient>
              <linearGradient id="ribbon-fire" x1="128" y1="557" x2="760" y2="158" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFB567" />
                <stop offset=".25" stopColor="#FF5D22" />
                <stop offset=".52" stopColor="#3B1935" />
                <stop offset=".72" stopColor="#A62558" />
                <stop offset=".9" stopColor="#FF8A35" />
                <stop offset="1" stopColor="#FFCF87" />
              </linearGradient>
              <linearGradient id="ribbon-blue" x1="144" y1="634" x2="887" y2="290" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F17A45" />
                <stop offset=".26" stopColor="#431C3D" />
                <stop offset=".54" stopColor="#171D3C" />
                <stop offset=".72" stopColor="#69317A" />
                <stop offset="1" stopColor="#F27D8E" />
              </linearGradient>
              <linearGradient id="ribbon-highlight" x1="176" y1="596" x2="758" y2="200" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFE0A4" />
                <stop offset=".35" stopColor="#FF6A35" />
                <stop offset=".67" stopColor="#A23B81" />
                <stop offset="1" stopColor="#FFB780" />
              </linearGradient>
              <filter id="ribbon-glow" x="0" y="0" width="100%" height="100%">
                <feGaussianBlur stdDeviation="13" />
              </filter>
            </defs>
            <circle cx="500" cy="375" r="306" fill="url(#hero-disc)" />
            <circle cx="500" cy="375" r="365" stroke="#B77B5E" strokeOpacity=".55" />
            <path d="M75 594C207 346 348 715 512 497C638 330 718 455 865 104" stroke="url(#ribbon-fire)" strokeWidth="158" strokeLinecap="round" />
            <path d="M120 695C264 445 390 729 546 535C678 371 758 501 908 181" stroke="url(#ribbon-blue)" strokeWidth="122" strokeLinecap="round" />
            <path d="M40 536C208 369 317 623 471 430C630 229 740 398 885 109" stroke="url(#ribbon-fire)" strokeWidth="90" strokeLinecap="round" opacity=".8" />
            <path d="M80 591C219 369 346 686 512 489C646 330 733 441 869 146" stroke="url(#ribbon-highlight)" strokeWidth="10" strokeLinecap="round" opacity=".9" />
            <path d="M157 677C301 454 405 691 553 517C685 362 766 483 904 198" stroke="url(#ribbon-highlight)" strokeWidth="7" strokeLinecap="round" opacity=".72" />
            <path d="M371 91l8 17 18 7-18 8-8 18-8-18-18-8 18-7 8-17Z" fill="#9A5133" />
          </svg>
          <div className="art-card art-card-strategy">
            <svg viewBox="0 0 24 24"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></svg>
            <span>Brand<br />Strategy</span>
          </div>
          <div className="art-card art-card-content">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4V8Z"/></svg>
            <span>Content<br />&amp; Media</span>
          </div>
          <div className="art-card art-card-build">
            <svg viewBox="0 0 24 24"><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 5l-4 14"/></svg>
            <span>Web &amp; App<br />Development</span>
          </div>
          <div className="art-card art-card-growth">
            <svg viewBox="0 0 24 24"><path d="M4 20v-6h4v6H4ZM10 20V9h4v11h-4ZM16 20V4h4v16h-4Z"/></svg>
            <span>Performance<br />Marketing</span>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 02: WHAT WE DO (INTERACTIVE ACCORDION CARDS)
          ==================================================================== */}
      <section className="services-section section-grid" id="services">
        <div className="section-label">02 / What We Do</div>
        <div className="services-content">
          <div className="section-heading reveal">
            <h2>
              Six Disciplines.<br />
              <i>One Cohesive Vision.</i>
            </h2>
            <p>
              We bring brand strategy, high-craft engineering, and performance marketing together under
              one unified roof to eliminate fragmented agency handoffs.
            </p>
          </div>

          <div className="service-category-list reveal">
            {serviceCategories.map((category, index) => {
              const isOpen = activeAccordion === index
              return (
                <article
                  key={category.letter}
                  className={`service-category-card ${isOpen ? "open" : ""}`}
                >
                  <button
                    type="button"
                    className="service-category-header"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                  >
                    <div className="service-category-header-left">
                      <span className="service-category-index">{category.letter}.</span>
                      <h3>{category.title}</h3>
                    </div>
                    <p>{category.tagline}</p>
                    <span className="service-category-icon" aria-hidden="true">
                      <Plus size={18} />
                    </span>
                  </button>

                  <div className="service-category-body">
                    <p className="service-category-summary">{category.description}</p>
                    <div className="service-category-value">{category.valueProposition}</div>
                    <ul className="service-items" aria-label={`${category.title} offerings`}>
                      {category.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 03: PROBLEMS WE SOLVE (7 PROBLEM CARDS)
          ==================================================================== */}
      <section className="problems-section section-grid" id="problems">
        <div className="section-label">03 / Problems We Solve</div>
        <div className="intro-content">
          <div className="section-heading reveal">
            <h2>
              The Friction Behind<br />
              <i>Stagnant Growth.</i>
            </h2>
            <p>
              Most businesses do not have a product problem — they have an articulation, presentation,
              or operational disconnect. Here are the core hurdles we eliminate.
            </p>
          </div>

          <div className="problems-grid reveal">
            {problemsList.map((prob) => (
              <div className="problem-card" key={prob.num}>
                <div>
                  <div className="problem-card-top">
                    <span className="problem-card-num">{prob.num}</span>
                    <span className="eyebrow">Diagnosed</span>
                  </div>
                  <h3>{prob.title}</h3>
                  <p className="problem-card-desc">{prob.explanation}</p>
                </div>
                <div className="problem-card-consequence">
                  <strong>Impact: </strong>
                  {prob.consequence}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 04: HOW WE SOLVE THOSE PROBLEMS (PROBLEM -> STRATEGY -> VALUE)
          ==================================================================== */}
      <section className="solutions-section section-grid" id="solutions">
        <div className="section-label">04 / How We Solve</div>
        <div className="intro-content">
          <div className="section-heading reveal">
            <h2>
              Problem to Strategy.<br />
              <i>Strategy to Value.</i>
            </h2>
            <p>
              We treat creative and technological interventions as structured systems. Every friction
              point is addressed with a direct strategic framework and tangible outcome.
            </p>
          </div>

          <div className="solutions-container reveal">
            {solutionFlows.map((flow, index) => (
              <div className="solution-card" key={index}>
                <div className="solution-flow">
                  {/* Step 1: The Problem */}
                  <div className="solution-step">
                    <span className="solution-step-label">01 / The Problem</span>
                    <h4>{flow.problem}</h4>
                    <p>{flow.problemSub}</p>
                  </div>

                  {/* Flow Arrow */}
                  <div className="solution-arrow" aria-hidden="true">
                    <ArrowRight size={22} />
                  </div>

                  {/* Step 2: STM Strategy */}
                  <div className="solution-step">
                    <span className="solution-step-label">02 / STM Strategy</span>
                    <div className="solution-strategy-list">
                      {flow.strategies.map((strat) => (
                        <span className="solution-strategy-tag" key={strat}>
                          {strat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Flow Arrow */}
                  <div className="solution-arrow" aria-hidden="true">
                    <ArrowRight size={22} />
                  </div>

                  {/* Step 3: Value Delivered */}
                  <div className="solution-step value-step">
                    <span className="solution-step-label">03 / Commercial Value</span>
                    <p>{flow.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 05: WHY WORK WITH US (5 PILLARS)
          ==================================================================== */}
      <section className="pillars-section section-grid" id="pillars">
        <div className="section-label">05 / Why Work With Us</div>
        <div className="intro-content">
          <div className="section-heading reveal">
            <h2>
              The Standards We<br />
              <i>Refuse to Compromise.</i>
            </h2>
            <p>
              We are not an agency that pushes vanity deliverables or bloated hours. Our partnership is
              built on clarity, integrity, and direct commercial relevance.
            </p>
          </div>

          <div className="pillar-grid reveal">
            {pillars.map((pillar) => (
              <div className="pillar-card" key={pillar.num}>
                <div>
                  <div className="pillar-number">{pillar.num}</div>
                  <h3>{pillar.title}</h3>
                </div>
                <p>{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 06: SELECTED WORK (PLACED FIRST)
          ==================================================================== */}
      <section className="work-preview-section section-grid" id="work">
        <div className="section-label">06 / Selected Work</div>
        <div className="work-content">
          <div className="section-heading reveal">
            <h2>
              Made to<br />
              <i>matter.</i>
            </h2>
            <p>
              Live digital platforms, concept directions, and brand systems engineered to elevate ambitious businesses.
            </p>
          </div>

          <div className="selected-work-grid reveal">
            {PROJECTS.map((project) => {
              const isExternal = Boolean(project.link)
              const targetUrl =
                project.link ||
                (project.slug === "13isu" ? "/work/13isu" : `/work/${project.slug}`)

              return (
                <div className="selected-card" key={project.slug}>
                  <div className="selected-card-image">
                    <img
                      src={project.cover_image}
                      alt={`${project.name} preview`}
                      loading="lazy"
                    />
                    <span className="selected-card-tag">{project.tag}</span>
                    <span className="selected-card-marker">{project.marker}</span>
                  </div>
                  <div className="selected-card-body">
                    <div>
                      <div className="selected-card-type">{project.type}</div>
                      <h3 className="selected-card-title">{project.name}</h3>
                      <p className="selected-card-desc">{project.description}</p>
                      <div className="selected-card-services">
                        {project.services.slice(0, 4).map((s) => (
                          <span className="selected-card-service-pill" key={s}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    {isExternal ? (
                      <a
                        className="selected-card-cta"
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.cta} <ArrowUpRight size={14} />
                      </a>
                    ) : (
                      <a className="selected-card-cta" href={targetUrl}>
                        {project.cta} <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="work-preview-cta reveal">
            <a className="button button-dark" href="/work">
              Explore Complete Portfolio ({PROJECTS.length} Projects) <ArrowUpRight data-icon="inline-end" />
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 07: FEATURED CASE STUDIES (PLACED AFTER SELECTED WORK)
          ==================================================================== */}
      <section className="featured-studies section-grid" id="case-studies">
        <div className="section-label">07 / Case Studies</div>
        <div className="intro-content">
          <div className="section-heading reveal">
            <h2>
              Documented Craft.<br />
              <i>Real Results.</i>
            </h2>
            <p>
              In-depth examination of challenges, brand architecture, execution craft, and verified commercial momentum.
            </p>
          </div>

          {/* Flagship Documented Case Study 01: 13ISU */}
          <div className="case-study-spotlight reveal">
            <div className="case-study-spotlight-visual">
              <div className="spotlight-image-grid">
                <img
                  src="/13isu-creative-1.png"
                  alt="13ISU Case Study - Night Market Activation"
                  className="spotlight-primary-img"
                />
                <div className="spotlight-thumb-row">
                  <img src="/13isu-creative-2.png" alt="13ISU Packaging Detail" />
                  <img src="/13isu-creative-3.png" alt="13ISU Event Presence" />
                </div>
              </div>
            </div>
            <div className="case-study-spotlight-content">
              <div className="spotlight-badge">VERIFIED CLIENT CASE STUDY</div>
              <span className="selected-card-type">DESSERT / BRAND IDENTITY &amp; VIRAL SOCIAL</span>
              <h3>13ISU Speciality Tiramisu</h3>
              <div className="spotlight-metric">
                <strong>100,000+</strong>
                <span>Organic Instagram Views in 3 Days</span>
              </div>
              <p>
                A single-speciality dessert brand brought to life through playful naming, lavender-accented identity, bespoke packaging, and product-led social creative that captivated local dessert culture on launch.
              </p>
              <div className="spotlight-actions">
                <a className="button button-dark" href="/work/13isu">
                  Read Case Study <ArrowUpRight size={14} />
                </a>
                <a
                  className="text-link"
                  href="/13ISU.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Case PDF <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>

          {/* Strategic Case Study 02: Trends Are a Tool, Not a Strategy */}
          <div className="case-study-spotlight reveal" style={{ marginTop: "36px" }}>
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
                <a className="button button-dark" href="/work/trends-are-a-tool">
                  Read Framework <ArrowUpRight size={14} />
                </a>
                <a
                  className="text-link"
                  href="/Trends Are a Tool, Not a Strategy.docx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Docx <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>

          <p className="featured-note reveal">
            Results are project-specific and documented honestly. We do not publish fabricated client outcomes. Proprietary growth frameworks, revenue telemetry, and confidential client case studies are shared under NDA upon consultation.
          </p>
        </div>
      </section>

      {/* ====================================================================
          SECTION 08: OUR PROCESS (5 STAGES)
          ==================================================================== */}
      <section className="process section-grid" id="process">
        <div className="section-label">08 / Our Process</div>
        <div className="process-content">
          <div className="section-heading reveal">
            <h2>
              A Rigorous Path From<br />
              <i>Concept to Scale.</i>
            </h2>
            <p>
              We work through a disciplined five-stage methodology that guarantees transparency,
              minimises revisions, and drives predictable delivery.
            </p>
          </div>

          <div className="process-grid reveal">
            <div className="process-step">
              <span>01</span>
              <h3>DISCOVER</h3>
              <p>Understand the client&apos;s business, goals, audience and challenges.</p>
            </div>
            <div className="process-step">
              <span>02</span>
              <h3>STRATEGISE</h3>
              <p>Develop the appropriate strategy, creative proposition, and project direction.</p>
            </div>
            <div className="process-step">
              <span>03</span>
              <h3>CREATE</h3>
              <p>Develop creative concepts, visual systems, and bespoke technical architectures.</p>
            </div>
            <div className="process-step">
              <span>04</span>
              <h3>EXECUTE</h3>
              <p>Build, implement, rigorously test and refine the production-ready solution.</p>
            </div>
            <div className="process-step">
              <span>05</span>
              <h3>GROW</h3>
              <p>Deliver, monitor analytics, improve performance, and support ongoing evolution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 09: CONTACT (COMPREHENSIVE ENQUIRY FORM)
          ==================================================================== */}
      <section className="contact" id="contact">
        <div className="contact-inner">
          <p className="eyebrow">09 / Let&apos;s Build Together</p>
          <h2>
            Have an Idea?<br />
            <i>Let&apos;s Make It Happen.</i>
          </h2>
          <p style={{ maxWidth: "560px", color: "var(--beige)", lineHeight: 1.7, marginBottom: "45px" }}>
            Tell us about your business, your challenges and what you want to build. We review every
            enquiry within 24 business hours.
          </p>

          <form onSubmit={submitEnquiry} noValidate>
            {sent ? (
              <div className="form-success-box">
                <h3>Thank you for reaching out.</h3>
                <p>
                  Your project enquiry has been safely received. Our strategy team will review your
                  requirements and follow up within 24 hours.
                </p>
              </div>
            ) : (
              <>
                {/* Name & Company */}
                <div className="form-row">
                  <div>
                    <input
                      name="full_name"
                      aria-label="Full Name"
                      required
                      minLength={2}
                      maxLength={120}
                      placeholder="Full Name *"
                    />
                  </div>
                  <div>
                    <input
                      name="company_name"
                      aria-label="Company Name"
                      maxLength={120}
                      placeholder="Company / Brand Name"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="form-row">
                  <div>
                    <input
                      name="email"
                      type="email"
                      aria-label="Email Address"
                      required
                      placeholder="Email Address *"
                    />
                  </div>
                  <div>
                    <input
                      name="phone"
                      type="tel"
                      aria-label="Phone Number"
                      maxLength={40}
                      placeholder="Phone Number"
                    />
                  </div>
                </div>

                {/* Services Checkboxes */}
                <div>
                  <span className="form-services-label">Services Required</span>
                  <div className="form-services" role="group" aria-label="Services Required">
                    {serviceOptions.map((service) => {
                      const isSelected = selectedServices.includes(service)
                      return (
                        <label
                          key={service}
                          className={`form-service-check ${isSelected ? "selected" : ""}`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleServiceCheckbox(service)}
                          />
                          <span>{service}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>

                {/* Estimated Budget Select */}
                <div>
                  <select
                    name="budget"
                    aria-label="Estimated Budget"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Estimated Budget (Select a range)
                    </option>
                    {budgetOptions.map((budget) => (
                      <option key={budget} value={budget}>
                        {budget}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Project Description */}
                <div>
                  <textarea
                    name="project_description"
                    aria-label="Project Description"
                    required
                    minLength={10}
                    maxLength={5000}
                    placeholder="Tell us about your business, current challenges, and project goals... *"
                    rows={4}
                  />
                </div>

                {/* Submit CTA */}
                <button
                  className="button button-light"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? "Submitting Enquiry…" : "Start a Project"}
                  {!submitting && <ArrowUpRight data-icon="inline-end" />}
                </button>

                {formError && (
                  <p className="form-error" role="alert" style={{ marginTop: "16px" }}>
                    {formError}
                  </p>
                )}
              </>
            )}
          </form>

          {/* Contact Details */}
          <div className="contact-details">
            <a href="mailto:support@soletrustmedia.agency">
              <Mail /> support@soletrustmedia.agency
            </a>
            <span>
              <MapPin /> 560066, Whitefield, Bengaluru, India
            </span>
          </div>
        </div>
      </section>

      {/* ====================================================================
          FOOTER
          ==================================================================== */}
      <footer>
        <div className="footer-top">
          <a className="wordmark footer-mark" href="#top">
            <span>STM</span>
            <small>SOLE TRUST MEDIA</small>
          </a>
          <p>
            Brand building, creative,
            <br />
            marketing & technology.
          </p>
          <div className="socials">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Sole Trust Media on Instagram"
            >
              IG
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Sole Trust Media on LinkedIn"
            >
              IN
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Sole Trust Media</span>
          <span>Not Just Seen. Remembered.</span>
          <div>
            <a href="#contact">Privacy</a>
            <a href="#contact">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
