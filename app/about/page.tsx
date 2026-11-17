import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Aperture, CirclePlay, Plus } from 'lucide-react'
import SiteNav from '@/components/site-nav'
import SiteFooter from '@/components/site-footer'
import AboutScrollReveal from '@/components/about-scroll-reveal'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Meet the people and principles behind Sole Trust Media, an independent creative technology studio building meaningful brands and digital experiences.',
}

const team: {
  number: string
  name: string
  role: string
  bio: string
  founder?: boolean
  image?: string
  imagePosition?: string
}[] = [
  {
    number: '01',
    name: 'Waseem Raza',
    role: 'Co-Founder & Tech Head',
    bio: 'Driving the vision behind Sole Trust Media, Waseem leads the technology and development side of the agency. With an interest in innovation, digital products and technology, he focuses on building powerful digital experiences and turning ambitious ideas into practical solutions.',
    founder: true,
    image: '/assets/waseem-raza.png',
    imagePosition: 'center 27%',
  },
  {
    number: '02',
    name: 'Daksh Bhagat',
    role: 'Co-Founder & Creative & Marketing Director',
    bio: 'Leading creative direction, marketing, and growth strategies, Daksh focuses on brand positioning, audience engagement and building meaningful connections between businesses and their audiences. His approach combines strategic thinking with creative marketing execution.',
    founder: true,
    image: '/assets/daksh-bhagat.png',
  },
  {
    number: '03',
    name: 'Ashmit',
    role: 'Creative Head',
    bio: 'Responsible for the creative vision of Sole Trust Media, Ashmit brings ideas to life through visual storytelling, design and creative execution. He focuses on creating distinctive visual identities and experiences that make brands memorable.',
    image: '/assets/ashmit.png',
    imagePosition: 'center 28%',
  },
  {
    number: '04',
    name: 'Udhav',
    role: 'Content Director',
    bio: 'Leading the content direction, Udhav focuses on storytelling, content planning and developing meaningful communication for brands. He ensures that every piece of content has a purpose, connects with its audience and strengthens the brand’s identity.',
    image: '/assets/udhav.png',
    imagePosition: 'center 32%',
  },
]

const values = [
  {
    number: '01',
    title: 'Strategy First',
    description:
      'Every great result begins with understanding the vision, audience and objectives.',
  },
  {
    number: '02',
    title: 'Creativity With Purpose',
    description:
      'We believe creativity should communicate, inspire and deliver measurable value.',
  },
  {
    number: '03',
    title: 'Innovation Always',
    description:
      'We continuously explore new technologies, tools and ideas to create better digital experiences.',
  },
  {
    number: '04',
    title: 'Partnership Over Projects',
    description:
      'We believe in building long-term relationships and growing together with our clients.',
  },
]

export default function AboutPage() {
  return (
    <main className="site-shell about-page">
      <SiteNav />
      <AboutScrollReveal />

      {/* Edge-to-Edge Oversized Overlapping Editorial Header */}
      <section className="about-overlapping-hero" aria-labelledby="about-wordmark">
        <div className="about-oversized-wordmark-wrap">
          <h1 id="about-wordmark" className="about-oversized-wordmark">
            SOLE TRUST
          </h1>
        </div>
        <div className="about-studio-photo-band">
          <img
            src="/assets/work/twine/twine-01.jpeg"
            alt="Sole Trust Media Bengaluru Studio Craft & Direction"
          />
          <div className="about-studio-photo-caption">
            <span>Bengaluru Atelier &bull; 12.9716° N, 77.5946° E</span>
            <span>Strategy &bull; Creativity &bull; Technology</span>
          </div>
        </div>
      </section>

      <section className="about-hero" aria-labelledby="about-title" style={{ paddingTop: 'clamp(72px, 8vw, 110px)' }}>
        <div className="about-hero-inner">
          <div className="about-hero-copy about-reveal" data-about-reveal>
            <p className="about-eyebrow"><span /> About Sole Trust Media</p>
            <h2 id="about-title" style={{ fontSize: 'clamp(44px, 6.5vw, 96px)', lineHeight: 0.94, margin: '18px 0 28px' }}>
              Where Creativity
              <br />
              Meets <i>Strategy.</i>
              <br />
              Where Ideas Become
              <br />
              <i>Impact.</i>
            </h2>
            <p className="about-hero-description">
              We are a team of thinkers, creators, strategists and innovators
              helping brands build their identity, strengthen their digital
              presence and achieve meaningful growth.
            </p>
            <a className="about-scroll-link" href="#our-story">
              Discover our story <ArrowDown size={14} />
            </a>
          </div>

          <div className="about-hero-art about-reveal" data-about-reveal aria-hidden="true">
            <div className="about-art-orbit about-art-orbit-outer" />
            <div className="about-art-orbit about-art-orbit-inner" />
            <div className="about-art-monogram">S<span>T</span>M</div>
            <div className="about-art-caption">
              <span>Independent by nature</span>
              <span>Built to make an impact</span>
            </div>
            <span className="about-art-index">01 — 04</span>
          </div>
        </div>
        <div className="about-hero-foot" aria-hidden="true">
          <span>Bengaluru, India</span>
          <span>Strategy · Creativity · Technology</span>
        </div>
      </section>

      <section className="about-story" id="our-story" aria-labelledby="story-title">
        <div className="about-section-kicker about-reveal" data-about-reveal>
          <span>01</span> / Our Story
        </div>
        <div className="about-story-grid">
          <div className="about-story-copy about-reveal" data-about-reveal>
            <h2 id="story-title">
              Built on Ideas.
              <br />
              Driven by <i>Ambition.</i>
            </h2>
            <p>
              Sole Trust Media started with a vision to bring creativity,
              technology and strategic thinking together under one roof.
            </p>
            <p>
              We believe that every brand has a story worth telling and every
              business deserves a powerful digital presence. What started as an
              ambition to create meaningful digital experiences has evolved
              into a growing creative and technology-driven agency.
            </p>
            <p>
              From social media marketing and brand development to website
              development, digital strategy and creative production, we focus
              on building solutions that create real value.
            </p>
            <p>
              We don&apos;t just want to deliver projects. We want to build
              partnerships, create impact and grow alongside the brands that
              trust us.
            </p>
          </div>

          <div
            className="about-story-art about-reveal"
            data-about-reveal
            role="img"
            aria-label="A visual placeholder for the Sole Trust Media studio film"
          >
            <div className="about-story-art-lines" />
            <div className="about-story-art-word">MAKE<br /><i>meaning.</i></div>
            <div className="about-story-art-bottom">
              <span><CirclePlay size={17} /> Studio film placeholder</span>
              <span>STM / 2026</span>
            </div>
            <div className="about-story-art-label">A studio for what&apos;s next</div>
          </div>
        </div>
      </section>

      {/* Dark Espresso Chronological Milestone Section + Minimalist World/India Map */}
      <section className="about-timeline-espresso" id="milestones" aria-labelledby="timeline-title">
        <div className="about-timeline-inner">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px', paddingBottom: '28px', borderBottom: '1px solid var(--border-hairline-dark)' }}>
            <div>
              <p className="editorial-label" style={{ color: '#e49581', margin: '0 0 12px' }}>
                * Our Journey / 2023 — 2026
              </p>
              <h2 id="timeline-title" className="editorial-serif-display" style={{ fontSize: 'clamp(40px, 5.5vw, 76px)', margin: 0, color: 'var(--text-cream)' }}>
                Chronology of <i style={{ color: '#e49581' }}>craft &amp; scale.</i>
              </h2>
            </div>
            <p style={{ maxWidth: '380px', margin: 0, fontSize: '14px', lineHeight: 1.65, color: 'rgba(246, 241, 233, 0.72)' }}>
              From our founding desk in Bengaluru to engineering flagship identities and automated digital platforms for ambitious brands worldwide.
            </p>
          </div>

          <div className="about-timeline-staggered">
            {/* 2023 — Right Staggered */}
            <div style={{ gridColumn: '1 / 6' }}>
              <div className="about-timeline-circular-media">
                <img src="/assets/work/lumora/lumora-01.png" alt="Sole Trust Media visual craft detail" loading="lazy" />
              </div>
            </div>
            <div style={{ gridColumn: '7 / 13' }}>
              <span className="about-year-tag">Foundation &bull; Bengaluru</span>
              <div className="about-year-call">2023</div>
              <p className="about-year-desc">
                Sole Trust Media is founded with a singular conviction: eliminate the fragmented agency divide by fusing brand strategy, editorial craft, and full-stack technology under one roof.
              </p>
            </div>

            {/* 2024 — Left Staggered */}
            <div style={{ gridColumn: '1 / 7' }}>
              <span className="about-year-tag">Brand &amp; Content Momentum</span>
              <div className="about-year-call">2024</div>
              <p className="about-year-desc">
                Expanded into high-craft identity systems, packaging design, and viral short-form media production — shaping breakthrough consumer brands and crossing 50+ delivered commissions.
              </p>
            </div>
            <div style={{ gridColumn: '8 / 13', display: 'flex', justifyContent: 'center' }}>
              <svg viewBox="0 0 220 120" width="220" height="120" fill="none" aria-hidden="true" style={{ opacity: 0.75 }}>
                <path d="M12 96 Q 68 18, 120 62 T 208 24" stroke="rgba(246,241,233,0.45)" strokeWidth="1" />
                <circle cx="12" cy="96" r="3" fill="#e49581" />
                <circle cx="120" cy="62" r="4" stroke="#F6F1E9" strokeWidth="1" />
                <circle cx="208" cy="24" r="3" fill="#e49581" />
                <line x1="0" y1="62" x2="220" y2="62" stroke="rgba(246,241,233,0.14)" strokeWidth="1" strokeDasharray="3 4" />
              </svg>
            </div>

            {/* 2025 — Right Staggered */}
            <div style={{ gridColumn: '1 / 6' }}>
              <div className="about-timeline-circular-media">
                <img src="/assets/work/future-luxe/future-luxe-01.png" alt="Future Luxe digital flagship craft" loading="lazy" />
              </div>
            </div>
            <div style={{ gridColumn: '7 / 13' }}>
              <span className="about-year-tag">Digital Flagships &amp; Automation</span>
              <div className="about-year-call">2025</div>
              <p className="about-year-desc">
                Launched our Creative Technology practice — shipping bespoke Next.js platforms, AI-assisted lead pipelines, and measurable commercial systems across India, UAE, Europe, and North America.
              </p>
            </div>

            {/* 2026 — Left Staggered */}
            <div style={{ gridColumn: '2 / 11' }}>
              <span className="about-year-tag">Global Creative Technology Atelier</span>
              <div className="about-year-call">2026</div>
              <p className="about-year-desc" style={{ maxWidth: '520px' }}>
                Over 100+ projects delivered and 50+ brands shaped. Sole Trust Media operates as an independent creative-technology studio partnering with category-defining founders worldwide.
              </p>
            </div>

            {/* Minimalist Single-Line World & India Map Vector Card */}
            <div className="about-timeline-map-card">
              <div>
                <svg
                  viewBox="0 0 640 300"
                  width="100%"
                  height="auto"
                  fill="none"
                  role="img"
                  aria-label="Minimalist map highlighting Bengaluru HQ at 12.9716 N, 77.5946 E and global client hubs"
                  style={{ display: 'block', maxHeight: '280px' }}
                >
                  {/* Architectural Coordinate Hairlines */}
                  <line x1="0" y1="75" x2="640" y2="75" stroke="rgba(246,241,233,0.09)" strokeWidth="1" />
                  <line x1="0" y1="150" x2="640" y2="150" stroke="rgba(246,241,233,0.12)" strokeWidth="1" strokeDasharray="3 5" />
                  <line x1="0" y1="225" x2="640" y2="225" stroke="rgba(246,241,233,0.09)" strokeWidth="1" />
                  <line x1="160" y1="0" x2="160" y2="300" stroke="rgba(246,241,233,0.09)" strokeWidth="1" />
                  <line x1="320" y1="0" x2="320" y2="300" stroke="rgba(246,241,233,0.09)" strokeWidth="1" />
                  <line x1="480" y1="0" x2="480" y2="300" stroke="rgba(246,241,233,0.09)" strokeWidth="1" />

                  {/* Minimalist Single-Line World Continent Contours */}
                  {/* Americas */}
                  <path d="M55 68 L112 58 L148 82 L134 118 L112 132 L126 156 L158 178 L142 238 L122 258 L112 215 L98 176 L86 144 L64 118 Z" stroke="rgba(246,241,233,0.34)" strokeWidth="1" />
                  {/* Europe & Africa */}
                  <path d="M276 64 L322 52 L352 72 L338 98 L302 104 L282 92 Z" stroke="rgba(246,241,233,0.34)" strokeWidth="1" />
                  <path d="M280 116 L334 112 L364 146 L350 202 L322 238 L296 196 L278 152 Z" stroke="rgba(246,241,233,0.34)" strokeWidth="1" />
                  {/* Asia & Highlighted India Subcontinent */}
                  <path d="M356 62 L462 50 L534 74 L554 116 L516 146 L486 140 L462 156 L444 134 L424 142 L386 122 L362 104 Z" stroke="rgba(246,241,233,0.34)" strokeWidth="1" />
                  {/* India Peninsula (Crisp Highlighted Stroke) */}
                  <path d="M424 134 L452 134 L464 156 L442 198 L420 162 Z" stroke="#F6F1E9" strokeWidth="1.25" fill="rgba(140,45,25,0.22)" />
                  {/* Oceania */}
                  <path d="M518 198 L572 192 L588 228 L546 244 L516 222 Z" stroke="rgba(246,241,233,0.34)" strokeWidth="1" />

                  {/* Global Connection Arcs from Bengaluru HQ (440, 178) */}
                  <path d="M440 178 Q 370 96, 294 82" stroke="#e49581" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M440 178 Q 412 146, 384 140" stroke="#e49581" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M440 178 Q 478 186, 502 174" stroke="#e49581" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M440 178 Q 275 40, 126 102" stroke="rgba(228,149,129,0.65)" strokeWidth="1" strokeDasharray="3 4" />

                  {/* Client Hub Nodes */}
                  <circle cx="294" cy="82" r="3" fill="#F6F1E9" />
                  <text x="294" y="72" fill="rgba(246,241,233,0.75)" fontSize="8" fontFamily="DM Mono, monospace" textAnchor="middle">LONDON</text>

                  <circle cx="384" cy="140" r="3" fill="#F6F1E9" />
                  <text x="384" y="131" fill="rgba(246,241,233,0.75)" fontSize="8" fontFamily="DM Mono, monospace" textAnchor="middle">DUBAI</text>

                  <circle cx="502" cy="174" r="3" fill="#F6F1E9" />
                  <text x="518" y="170" fill="rgba(246,241,233,0.75)" fontSize="8" fontFamily="DM Mono, monospace">SINGAPORE</text>

                  <circle cx="126" cy="102" r="3" fill="#F6F1E9" />
                  <text x="126" y="92" fill="rgba(246,241,233,0.75)" fontSize="8" fontFamily="DM Mono, monospace" textAnchor="middle">NEW YORK</text>

                  {/* Bengaluru HQ Primary Marker */}
                  <circle cx="440" cy="178" r="11" stroke="#8C2D19" strokeWidth="1" fill="rgba(140,45,25,0.28)" />
                  <circle cx="440" cy="178" r="4" fill="#e49581" stroke="#F6F1E9" strokeWidth="1" />
                  <text x="440" y="212" fill="#F6F1E9" fontSize="9" fontWeight="600" fontFamily="DM Mono, monospace" textAnchor="middle">
                    BENGALURU HQ
                  </text>
                </svg>
              </div>

              <div>
                <span className="editorial-label" style={{ color: '#e49581', display: 'block', marginBottom: '12px' }}>
                  * Studio Coordinates
                </span>
                <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'clamp(28px, 3vw, 38px)', fontWeight: 400, margin: '0 0 12px', color: 'var(--text-cream)', lineHeight: 1.1 }}>
                  Bengaluru HQ.<br /><i>Global Execution.</i>
                </h3>
                <p style={{ fontFamily: 'var(--font-utility)', fontSize: '12px', letterSpacing: '0.08em', color: '#e49581', margin: '0 0 18px' }}>
                  12.9716° N, 77.5946° E &bull; Whitefield, India
                </p>
                <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'rgba(246, 241, 233, 0.74)', margin: '0 0 20px' }}>
                  Anchored in India&apos;s technology capital while collaborating seamlessly across London, Dubai, Singapore, and New York time zones.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Bengaluru HQ', 'London', 'Dubai', 'Singapore', 'New York'].map((hub) => (
                    <span
                      key={hub}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '999px',
                        border: '1px solid var(--border-hairline-dark)',
                        fontSize: '10px',
                        fontFamily: 'var(--font-utility)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: hub === 'Bengaluru HQ' ? '#F6F1E9' : 'rgba(246, 241, 233, 0.72)',
                        background: hub === 'Bengaluru HQ' ? 'var(--accent-terracotta)' : 'transparent',
                      }}
                    >
                      {hub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-team" id="our-people" aria-labelledby="team-title">
        <div className="about-team-heading about-reveal" data-about-reveal>
          <div className="about-section-kicker"><span>02</span> / Our People</div>
          <div>
            <h2 id="team-title">Good work is<br /><i>never solo.</i></h2>
            <p>
              A close-knit team with different perspectives, one shared
              ambition: making meaningful things happen.
            </p>
          </div>
        </div>
        <div className="about-team-grid">
          {team.map((member) => (
            <article
              key={member.number}
              className={`about-person-card${member.founder ? ' about-person-founder' : ''}${member.image ? ' about-person-has-image' : ''} about-reveal`}
              data-about-reveal
            >
              <div
                className="about-person-portrait"
                role="img"
                aria-label={`${member.image ? 'Portrait of' : 'Portrait placeholder for'} ${member.name}`}
              >
                {member.image ? (
                  <Image
                    src={member.image}
                    alt=""
                    fill
                    sizes="(max-width: 460px) 90vw, (max-width: 900px) 45vw, 42vw"
                    className="about-person-image"
                    style={member.imagePosition ? { objectPosition: member.imagePosition } : undefined}
                  />
                ) : (
                  <div className="about-portrait-frame">
                    <Aperture size={26} strokeWidth={1.2} />
                    <span>Portrait coming soon</span>
                    <small>4 : 5</small>
                  </div>
                )}
                <span className="about-person-number">{member.number}</span>
                
              </div>
              <div className="about-person-info">
                <div>
                  <p className="about-person-role">{member.role}</p>
                  <h3>{member.name}</h3>
                </div>
                <Plus className="about-person-mark" size={18} strokeWidth={1.2} aria-hidden="true" />
              </div>
              <p className="about-person-bio">{member.bio}</p>
            </article>
          ))}
        </div>
        <p className="about-team-note">
          The faces behind the work. More portraits coming soon.
        </p>
      </section>

      <section className="about-values" id="our-values" aria-labelledby="values-title">
        <div className="about-values-heading about-reveal" data-about-reveal>
          <div className="about-section-kicker"><span>03</span> / What We Believe</div>
          <h2 id="values-title">What Drives <i>Us.</i></h2>
        </div>
        <div className="about-values-grid">
          {values.map((value) => (
            <article className="about-value-card about-reveal" data-about-reveal key={value.number}>
              <span className="about-value-number">{value.number}</span>
              <div className="about-value-rule" />
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-cta" aria-labelledby="about-cta-title">
        <div className="about-cta-inner about-reveal" data-about-reveal>
          <div className="about-section-kicker"><span>04</span> / The Next Chapter</div>
          <p className="about-cta-overline">Good things start with a conversation.</p>
          <h2 id="about-cta-title">Your Vision<br />Deserves <i>More.</i></h2>
          <p className="about-cta-copy">
            Let&apos;s turn your next big idea into something extraordinary.
            Together, we can build, create and grow.
          </p>
          <div className="about-cta-actions">
            <Link className="button button-light" href="/contact">
              Let&apos;s Work Together <ArrowUpRight size={14} />
            </Link>
            <Link className="button about-cta-secondary" href="/services">
              Explore Our Services <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
        <div className="about-cta-mark" aria-hidden="true">STM<span>®</span></div>
      </section>

      <SiteFooter />
    </main>
  )
}
