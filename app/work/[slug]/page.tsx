import { Metadata } from "next"
import { redirect } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { createClient } from "@supabase/supabase-js"

interface CaseStudyData {
  title: string
  client_name: string
  category: string
  type: string
  cover_image: string
  client_introduction: string
  business_challenge: string
  objectives: string
  strategy: string
  creative_direction: string
  execution: string
  services_delivered: string[]
  results: string
  gallery: Array<{ image_url: string; caption?: string }>
}

const staticData: Record<string, CaseStudyData> = {
  "13isu": {
    title: "13ISU",
    client_name: "13ISU",
    category: "Branding & Identity",
    type: "Branding / Packaging / Marketing",
    cover_image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1800&q=85",
    client_introduction: "13ISU is a contemporary brand exploring the intersection of culture, identity and self-expression through considered product design.",
    business_challenge: "The brand needed a visual identity and packaging system that could communicate its point of view clearly — something that felt distinctive on shelf and resonant with a culturally aware audience.",
    objectives: "Develop a full brand identity system including logo, visual language and packaging that reflects the brand's values and stands out in a competitive market.",
    strategy: "We began with brand discovery sessions to understand the audience, the competitive landscape and the story 13ISU wanted to tell. The strategy centred on creating a visual identity grounded in clarity and character.",
    creative_direction: "The creative direction drew on editorial minimalism — clean typographic treatments balanced with considered use of colour and texture to communicate quality without excess.",
    execution: "We developed the full identity system: logo mark, typographic system, colour palette, packaging templates and brand guidelines — delivered as a comprehensive brand toolkit.",
    services_delivered: ["Brand Strategy", "Logo Design", "Visual Identity", "Packaging Design", "Brand Guidelines"],
    results: "Results not yet documented.",
    gallery: [],
  },
  "lumora-beauty": {
    title: "Lumora Beauty",
    client_name: "Lumora Beauty",
    category: "Branding & Identity",
    type: "Beauty branding / Product marketing",
    cover_image: "https://images.unsplash.com/photo-1556229010-6c3f2c9c5c9d?auto=format&fit=crop&w=1800&q=85",
    client_introduction: "Lumora Beauty is a modern beauty brand built around everyday rituals, designed for a generation that values simplicity, quality and self-care.",
    business_challenge: "The brand needed to establish a clear identity in a crowded beauty market — one that communicated quality and approachability without competing on price.",
    objectives: "Create a brand world that feels personal and premium — an identity that communicates confidence, clarity and care across all brand touchpoints.",
    strategy: "The strategy began with understanding the target audience and the gap in the market. We identified an opportunity to position Lumora as a trusted everyday beauty companion rather than an aspirational luxury.",
    creative_direction: "Soft, expressive and tactile. The creative direction prioritised warmth and familiarity — drawing on natural tones, clean typographic hierarchy and an editorial approach to product presentation.",
    execution: "We developed the complete brand identity, packaging system and product marketing materials — creating a cohesive brand experience across all physical and digital touchpoints.",
    services_delivered: ["Brand Strategy", "Visual Identity", "Packaging Design", "Product Marketing", "Brand Guidelines"],
    results: "Results not yet documented.",
    gallery: [],
  },
  "sole-trust-media": {
    title: "Sole Trust Media",
    client_name: "Sole Trust Media",
    category: "Website Development",
    type: "Agency identity / Digital experience",
    cover_image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1800&q=85",
    client_introduction: "Sole Trust Media is a creative, technology and business growth agency based in Bengaluru. This project is our own brand — the digital home for our strategy, creativity and technology work.",
    business_challenge: "As a new agency, STM needed to establish a credible digital presence that communicated the breadth of our capabilities and attracted the right clients from day one.",
    objectives: "Design and develop a website that positions STM as a premium creative and technology agency — one that communicates strategic thinking, creative capability and technical execution.",
    strategy: "The strategy centred on building a website that showed, rather than simply told. The focus was on strong editorial design, clear communication of services and an honest representation of the work.",
    creative_direction: "Editorial minimalism with strong typographic hierarchy. The cream-and-brown palette communicates warmth and sophistication. The layout draws on the aesthetic of premium creative publications.",
    execution: "We designed and developed the complete website using Next.js and Supabase — building a system that can grow with the agency, support case studies and manage client enquiries.",
    services_delivered: ["Brand Strategy", "UI/UX Design", "Website Development", "Content Strategy", "SEO Foundations"],
    results: "Results not yet documented.",
    gallery: [],
  },
}

export function generateStaticParams() {
  return [
    { slug: "13isu" },
    { slug: "lumora-beauty" },
    { slug: "sole-trust-media" },
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const staticProject = staticData[slug]
  const title = staticProject ? `${staticProject.title} — Sole Trust Media` : "Case Study — Sole Trust Media"
  const description = staticProject?.client_introduction ?? "Case study by Sole Trust Media."
  return {
    title,
    description,
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // 1. Try to fetch from Supabase
  let dbProject: Record<string, any> | null = null
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey)
      const { data, error } = await supabase
        .from("projects")
        .select("*, case_studies(*), project_gallery(*)")
        .eq("slug", slug)
        .single()

      if (!error && data) {
        dbProject = data
      }
    } catch {
      // Fall back to static data
    }
  }

  // 2. Fall back to static data
  const staticProject = staticData[slug]

  // Return 404-equivalent for unknown slugs: redirect to /work
  if (!dbProject && !staticProject) {
    redirect("/work")
  }

  // Normalize case study data
  const caseStudyRel = dbProject?.case_studies
    ? Array.isArray(dbProject.case_studies)
      ? dbProject.case_studies[0]
      : dbProject.case_studies
    : null

  const rawServices =
    caseStudyRel?.services_delivered ??
    dbProject?.services_delivered ??
    staticProject?.services_delivered ??
    []

  const servicesDelivered: string[] = Array.isArray(rawServices)
    ? rawServices
    : typeof rawServices === "string"
    ? rawServices.split(",").map((s: string) => s.trim()).filter(Boolean)
    : []

  const rawGallery =
    dbProject?.project_gallery ??
    caseStudyRel?.gallery ??
    staticProject?.gallery ??
    []

  const galleryItems: Array<{ image_url: string; caption?: string }> = Array.isArray(rawGallery)
    ? rawGallery
    : []

  const project: CaseStudyData = {
    title: String(dbProject?.title ?? dbProject?.name ?? staticProject?.title ?? ""),
    client_name: String(dbProject?.client_name ?? dbProject?.name ?? staticProject?.client_name ?? ""),
    category: String(dbProject?.category ?? staticProject?.category ?? "Selected Work"),
    type: String(
      dbProject?.type ??
      caseStudyRel?.type ??
      staticProject?.type ??
      dbProject?.category ??
      ""
    ),
    cover_image: String(
      dbProject?.cover_image ??
      dbProject?.image ??
      staticProject?.cover_image ??
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1800&q=85"
    ),
    client_introduction: String(
      caseStudyRel?.client_introduction ??
      dbProject?.client_introduction ??
      dbProject?.short_description ??
      dbProject?.overview ??
      staticProject?.client_introduction ??
      ""
    ),
    business_challenge: String(
      caseStudyRel?.business_challenge ??
      dbProject?.business_challenge ??
      staticProject?.business_challenge ??
      ""
    ),
    objectives: String(
      caseStudyRel?.objectives ??
      dbProject?.objectives ??
      staticProject?.objectives ??
      ""
    ),
    strategy: String(
      caseStudyRel?.strategy ??
      dbProject?.strategy ??
      staticProject?.strategy ??
      ""
    ),
    creative_direction: String(
      caseStudyRel?.creative_direction ??
      dbProject?.creative_direction ??
      staticProject?.creative_direction ??
      ""
    ),
    execution: String(
      caseStudyRel?.execution ??
      dbProject?.execution ??
      staticProject?.execution ??
      ""
    ),
    services_delivered: servicesDelivered,
    results: String(
      caseStudyRel?.results ??
      dbProject?.results ??
      staticProject?.results ??
      "Results not yet documented."
    ),
    gallery: galleryItems,
  }

  return (
    <main className="site-shell">
      {/* 1. Nav (server-rendered bar) */}
      <nav className="nav">
        <a className="wordmark" href="/" aria-label="Sole Trust Media home">
          <span>STM</span>
          <small>SOLE TRUST MEDIA</small>
        </a>
        <div className="nav-links">
          <a href="/work">Work</a>
          <a href="/#services">Capabilities</a>
          <a href="/#about">About</a>
          <a href="/#contact">Contact</a>
        </div>
      </nav>

      {/* 2. Hero section */}
      <section className="case-hero">
        <a className="text-link" href="/work">
          <ArrowLeft data-icon="inline-start" /> Back to work
        </a>
        <p className="eyebrow">{project.category}</p>
        <h1>{project.title}</h1>
        <p>{project.type}</p>
      </section>

      {/* 3. Full-width cover image */}
      <div className="case-cover">
        <img src={project.cover_image} alt={`${project.title} cover`} />
      </div>

      {/* 4. Project overview section & 5. Facts row */}
      <section className="case-overview section-grid">
        <div className="section-label">01 / Overview</div>
        <div>
          <h2>
            Built with <i>intent.</i>
          </h2>
          <p>{project.client_introduction}</p>
          <div className="case-facts">
            <span>
              Scope<strong>{project.type || project.category}</strong>
            </span>
            <span>
              Studio<strong>Sole Trust Media</strong>
            </span>
            <span>
              Status<strong>Published</strong>
            </span>
          </div>
        </div>
      </section>

      {/* 6. Business Challenge section */}
      {project.business_challenge && (
        <section className="case-section section-grid">
          <div className="section-label">02 / Challenge</div>
          <div>
            <h3>Business Challenge</h3>
            <p>{project.business_challenge}</p>
          </div>
        </section>
      )}

      {/* 7. Objectives section */}
      {project.objectives && (
        <section className="case-section section-grid">
          <div className="section-label">03 / Objectives</div>
          <div>
            <h3>Objectives</h3>
            <p>{project.objectives}</p>
          </div>
        </section>
      )}

      {/* 8. Strategy & Research section */}
      {project.strategy && (
        <section className="case-section section-grid">
          <div className="section-label">04 / Strategy &amp; Research</div>
          <div>
            <h3>Strategy &amp; Research</h3>
            <p>{project.strategy}</p>
          </div>
        </section>
      )}

      {/* 9. Creative Direction section */}
      {project.creative_direction && (
        <section className="case-section section-grid">
          <div className="section-label">05 / Creative Direction</div>
          <div>
            <h3>Creative Direction</h3>
            <p>{project.creative_direction}</p>
          </div>
        </section>
      )}

      {/* 10. Execution section */}
      {project.execution && (
        <section className="case-section section-grid">
          <div className="section-label">06 / Execution</div>
          <div>
            <h3>Execution</h3>
            <p>{project.execution}</p>
          </div>
        </section>
      )}

      {/* 11. Services Delivered: horizontal tags */}
      {project.services_delivered.length > 0 && (
        <section className="case-section section-grid">
          <div className="section-label">07 / Services Delivered</div>
          <div>
            <h3>Services Delivered</h3>
            <div className="services-tags">
              {project.services_delivered.map((service, idx) => (
                <span key={idx} className="service-tag">
                  {service}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 12. Results section */}
      {project.results && (
        <section className="case-section section-grid">
          <div className="section-label">08 / Results &amp; Impact</div>
          <div>
            <h3>Results</h3>
            <p>{project.results}</p>
          </div>
        </section>
      )}

      {/* Project Gallery (if provided) */}
      {project.gallery.length > 0 && (
        <section className="case-gallery">
          {project.gallery.map((item, idx) => (
            <figure key={idx} className="case-gallery-item">
              <img src={item.image_url} alt={item.caption || `${project.title} detail ${idx + 1}`} />
              {item.caption && <figcaption>{item.caption}</figcaption>}
            </figure>
          ))}
        </section>
      )}

      {/* 13. Next Project CTA */}
      <section className="case-next">
        <p className="eyebrow">Explore our portfolio</p>
        <h2>
          See more of <i>our work.</i>
        </h2>
        <a className="button button-dark" href="/work">
          View all projects <ArrowUpRight data-icon="inline-end" />
        </a>
      </section>

      {/* 14. Statement section with 'Start a project' CTA */}
      <section className="statement">
        <p>Want to build something with a point of view?</p>
        <h2>
          Start a <i>project.</i>
        </h2>
        <a className="button button-light" href="/#contact">
          Get in touch <ArrowUpRight data-icon="inline-end" />
        </a>
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
