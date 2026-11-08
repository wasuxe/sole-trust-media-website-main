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
  industry?: string
  location?: string
  client_introduction: string
  business_challenge: string
  objectives: string
  strategy: string
  creative_direction: string
  execution: string
  approach?: string[]
  services_delivered: string[]
  results: string
  gallery: Array<{ image_url: string; caption?: string }>
  sources?: Array<{ title: string; description: string; href: string }>
  assets?: Array<{ title: string; fileId: string }>
}

const staticData: Record<string, CaseStudyData> = {
  "13isu": {
    title: "13ISU",
    client_name: "13ISU",
    category: "Branding & Identity",
    type: "Brand identity / Creative direction / Packaging / Social media marketing",
    cover_image: "/13isu-logo.svg",
    industry: "Food & Beverage",
    location: "Vadodara, Gujarat, India",
    client_introduction:
      "13ISU is a speciality dessert brand built around one product: tiramisu. The project brought brand identity and creative communication together to build a distinctive presence in the local dessert market.",
    business_challenge:
      "The brand needed to make a single-speciality dessert memorable: establish a recognisable identity and personality, present the product attractively, communicate consistently on social media, and build awareness with a local audience.",
    objectives:
      "Create a distinctive brand experience around tiramisu, make the product visually appealing, and give audiences a memorable reason to connect with the brand.",
    strategy:
      "The documented approach connected four areas: brand building (name, personality, positioning and visual direction), product presentation, social media communication, and digital visibility through Instagram.",
    creative_direction:
      "The name combines 13 (Terah in Hindi) with I-S-U; the identity further interprets the number 3 as an M. A lavender-and-purple palette, distinctive typography and dessert-focused visuals support the playful line, “Your sweetest saviour for tough days.”",
    execution:
      "The supplied project overview describes opening announcements, product promotions, brand-introduction creatives, dessert-focused content, occasion-led communication and product-focused video direction.",
    approach: [
      "Brand building",
      "Product presentation",
      "Social media communication",
      "Instagram visibility",
    ],
    services_delivered: [
      "Brand concept and positioning",
      "Brand identity",
      "Creative direction",
      "Packaging design",
      "Social media creatives",
      "Content direction",
      "Digital marketing",
    ],
    results:
      "The 13ISU Instagram account recorded 100K+ views in three days, based on the account dashboard shared with STM. Views are not unique reach, conversions or sales; no additional performance metrics are claimed.",
    gallery: [
      {
        image_url: "/13isu-logo.svg",
        caption: "13ISU logo artwork used as the project identity mark.",
      },
      {
        image_url: "/13isu-creative-1.png",
        caption: "Night-market activation setup for the 13ISU tiramisu launch.",
      },
      {
        image_url: "/13isu-creative-2.png",
        caption: "Product packaging and presentation detail from the 13ISU launch materials.",
      },
      {
        image_url: "/13isu-creative-3.png",
        caption: "The large-format display board used to create a memorable event presence.",
      },
      {
        image_url: "https://drive.google.com/uc?export=download&id=1A9zZZC_4OP9RA_u-HndFTgrhKSaSjXC6",
        caption: "13ISU QR sticker artwork — “Scan to get some tea.”",
      },
    ],
    sources: [
      {
        title: "Project overview",
        description: "Read the supplied 13ISU case document.",
        href: "https://docs.google.com/document/d/1lcA5zLsCh9Ka1HP9ijshWWAp-RHuOarEHs4ABrc0U34/edit",
      },
    ],
  },
  "lumora-beauty": {
    title: "Lumora Beauty",
    client_name: "Lumora Beauty",
    category: "Packaging Design",
    type: "Product packaging artwork",
    cover_image: "https://drive.google.com/uc?export=download&id=163Z7B0H5mx0OqzKJ-r2oGQZ4AQspqdDf",
    client_introduction:
      "The supplied Lumora Beauty folder contains product packaging artwork for body butter, cream, serum, sheet mask and soap. No separate project brief or brand background was included in the accessible materials.",
    business_challenge: "",
    objectives: "",
    strategy: "",
    creative_direction: "",
    execution:
      "The available deliverables are product artwork PDFs and PNG previews. The supplied materials do not document the design process, launch, performance or business outcomes.",
    services_delivered: ["Product packaging artwork"],
    results: "No performance or business outcomes were included in the supplied materials.",
    gallery: [
      {
        image_url: "https://drive.google.com/uc?export=download&id=163Z7B0H5mx0OqzKJ-r2oGQZ4AQspqdDf",
        caption: "Lumi Glow 15 radiant glow serum packaging artwork supplied for Lumora Beauty.",
      },
      {
        image_url: "https://drive.google.com/uc?export=download&id=16qHaTxhx1omhhG2E48W9RBnOCp0K2HFK",
        caption: "Sheet mask packaging preview.",
      },
      {
        image_url: "https://drive.google.com/uc?export=download&id=16o9V6U-StYcVzmybmFxFnYgwOZCOZ7ct",
        caption: "Soap packaging preview.",
      },
      {
        image_url: "https://drive.google.com/uc?export=download&id=1zHJ555ZbafXXYGcz41g2uDNnnXwgbQFf",
        caption: "Second soap packaging preview.",
      },
    ],
    assets: [
      { title: "Body butter", fileId: "1yZZioG2-YVcuJKMAXddR5z4i3PQlRKRD" },
      { title: "Cream", fileId: "1O8FFaTWhZMEq0Wu3ugqCfP2vaO3QwHiW" },
      { title: "Serum", fileId: "1e54n_qq9ehFg53jvtD1DLfM7sFSObcKk" },
      { title: "Serum bottle", fileId: "1k_D1UTDUMYTjSe7jfjgpt_in2cjAxmWP" },
      { title: "Sheet mask", fileId: "1gatT8rriQ7YinV8egj6UUuMWWUfkG2P2" },
      { title: "Soap 1", fileId: "12g98h-pZf0lq6VayYY2OlclrvlSRDXfB" },
      { title: "Soap 2", fileId: "1O5WamBxcWmY5pZ6i9UExUnUYBHedkW5-" },
      { title: "Soap 2 — alternate artwork", fileId: "18hADgp7KdwhQ7DZUjMwvSABJUTwzCIMt" },
    ],
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
  const projectSources = staticProject?.sources ?? []
  const projectAssets = staticProject?.assets ?? []

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
    industry: staticProject?.industry,
    location: staticProject?.location,
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
    sources: projectSources,
    assets: projectAssets,
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
            {project.industry && (
              <span>
                Industry<strong>{project.industry}</strong>
              </span>
            )}
            {project.location && (
              <span>
                Location<strong>{project.location}</strong>
              </span>
            )}
            <span>
              Scope<strong>{project.type || project.category}</strong>
            </span>
            <span>
              Studio<strong>Sole Trust Media</strong>
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

      {staticProject?.approach && (
        <section className="case-section section-grid">
          <div className="section-label">Project approach</div>
          <div>
            <h3>Four connected parts.</h3>
            <div className="case-approach">
              {staticProject.approach.map((item, index) => (
                <span key={item}>
                  <small>0{index + 1}</small>
                  {item}
                </span>
              ))}
            </div>
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
              <img
                src={item.image_url}
                alt={item.caption || `${project.title} detail ${idx + 1}`}
                loading="lazy"
              />
              {item.caption && <figcaption>{item.caption}</figcaption>}
            </figure>
          ))}
        </section>
      )}

      {project.assets && project.assets.length > 0 && (
        <section className="case-section section-grid">
          <div className="section-label">Supplied artwork</div>
          <div>
            <h3>Packaging files.</h3>
            <p>
              Preview the supplied PDFs in Google Drive or download them. Editable ZIP archives are
              intentionally not published here.
            </p>
            <div className="case-assets-list">
              {project.assets.map((asset) => {
                const previewUrl = `https://drive.google.com/file/d/${asset.fileId}/preview`
                const downloadUrl = `https://drive.google.com/uc?export=download&id=${asset.fileId}`
                return (
                  <article className="case-asset-row" key={asset.fileId}>
                    <div>
                      <span className="eyebrow">PDF artwork</span>
                      <h4>{asset.title}</h4>
                    </div>
                    <div className="case-asset-actions">
                      <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                        Preview
                      </a>
                      <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                        Download
                      </a>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {project.sources && project.sources.length > 0 && (
        <section className="case-section section-grid">
          <div className="section-label">Source material</div>
          <div>
            <h3>From the project files.</h3>
            <p>
              Selected campaign artwork is shown above. The original photography and video folders
              were reviewed but are not published as bulk archives.
            </p>
            <div className="case-source-grid">
              {project.sources.map((source) => (
                <a
                  className="case-source-card"
                  href={source.href}
                  key={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{source.title}</span>
                  <p>{source.description}</p>
                  <small>Open in Google Drive ↗</small>
                </a>
              ))}
              <a
                className="case-source-card"
                href="https://docs.google.com/document/d/1lcA5zLsCh9Ka1HP9ijshWWAp-RHuOarEHs4ABrc0U34/export?format=pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Download project overview</span>
                <p>PDF export of the supplied 13ISU case document.</p>
                <small>Download PDF ↗</small>
              </a>
            </div>
          </div>
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
