import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Aperture, Plus } from 'lucide-react'
import SiteNav from '@/components/site-nav'
import SiteFooter from '@/components/site-footer'
import AboutScrollReveal from '@/components/about-scroll-reveal'
import { MotionWrapper, AnimatedHairline } from '@/components/MotionWrapper'

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
    bio: 'Driving the vision behind Sole Trust Media, Waseem leads technology and engineering — building powerful digital platforms and turning ambitious ideas into scalable products.',
    founder: true,
    image: '/assets/waseem-raza.png',
    imagePosition: 'center 27%',
  },
  {
    number: '02',
    name: 'Daksh Bhagat',
    role: 'Co-Founder & Creative & Marketing Director',
    bio: 'Leading creative direction, marketing, and growth strategies, Daksh focuses on brand positioning, audience engagement, and turning strategic clarity into measurable commercial momentum.',
    founder: true,
    image: '/assets/daksh-bhagat.png',
  },
  {
    number: '03',
    name: 'Ashmit',
    role: 'Creative Head',
    bio: 'Responsible for the visual craft of Sole Trust Media, Ashmit brings ideas to life through visual storytelling, identity systems, and distinctive editorial design.',
    image: '/assets/ashmit.png',
    imagePosition: 'center 28%',
  },
  {
    number: '04',
    name: 'Udhav',
    role: 'Content Director',
    bio: 'Leading content direction and narrative planning, Udhav ensures every frame and message connects meaningfully with its audience and strengthens brand equity.',
    image: '/assets/udhav.png',
    imagePosition: 'center 32%',
  },
]

const values = [
  {
    number: '01',
    title: 'Strategy First',
    description:
      'Every enduring outcome begins with sharp positioning, audience clarity, and commercial focus.',
  },
  {
    number: '02',
    title: 'Creativity With Purpose',
    description:
      'Editorial craft designed not just to be admired, but to communicate, persuade, and convert.',
  },
  {
    number: '03',
    title: 'Innovation Always',
    description:
      'Modern web engineering, AI workflows, and systems thinking applied with zero bloat.',
  },
  {
    number: '04',
    title: 'Partnership Over Projects',
    description:
      'Long-term creative-technology alliances built to scale alongside category-defining founders.',
  },
]

const milestones = [
  {
    year: '2025 · Q1',
    tag: 'Foundation • Bengaluru',
    desc: 'Founded Sole Trust Media with one conviction: unify brand strategy, editorial craft, and full-stack technology under one roof.',
  },
  {
    year: '2025 · Q3',
    tag: 'First Flagships & Viral Craft',
    desc: 'Launched breakthrough brand identities, packaging systems, and viral campaigns including 13ISU (100K+ organic views in 3 days).',
  },
  {
    year: '2026 · Q1',
    tag: 'Digital Flagships & AI Systems',
    desc: 'Expanded into bespoke Next.js web applications, kinetic UX, and automated CRM/AI lead pipelines for founders worldwide.',
  },
  {
    year: '2026 · NOW',
    tag: '1.5+ Years of Concentrated Craft',
    desc: '16+ brands shaped and 45+ projects delivered across Bengaluru, London, Dubai, Singapore, and New York.',
  },
]

export default function AboutPage() {
  return (
    <main className="site-shell about-page">
      <SiteNav />
      <AboutScrollReveal />

      {/* 1. Overlapping SOLE TRUST Wordmark + Studio Story (Warm Parchment) */}
      <section className="about-overlapping-hero" aria-labelledby="about-wordmark" style={{ paddingBottom: 'clamp(44px, 5vw, 68px)' }}>
        <div className="about-oversized-wordmark-wrap">
          <h1 id="about-wordmark" className="about-oversized-wordmark">
            SOLE TRUST
          </h1>
        </div>
        <div
          className="about-studio-photo-band"
          style={{
            height: 'clamp(300px, 46vw, 480px)',
            background: 'var(--bg-espresso)',
          }}
        >
          <img
            src="/assets/about-atelier-hero.jpg"
            alt="Sole Trust Media Bengaluru Creative Technology Atelier Interior"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
              filter: 'contrast(1.04) brightness(0.92)',
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(36, 25, 20, 0.08) 0%, rgba(36, 25, 20, 0.34) 100%)',
              pointerEvents: 'none',
            }}
          />
          <div className="about-studio-photo-caption">
            <span>Bengaluru Atelier &bull; 12.9716° N, 77.5946° E</span>
            <span>Strategy &bull; Creativity &bull; Technology</span>
          </div>
        </div>

        <div
          id="our-story"
          style={{
            maxWidth: '1360px',
            margin: 'clamp(40px, 5vw, 64px) auto 0',
            padding: '0 var(--page-gutter)',
          }}
        >
          <MotionWrapper>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: 'clamp(28px, 4vw, 64px)',
                alignItems: 'start',
              }}
            >
              <div>
                <p className="editorial-label" style={{ color: 'var(--accent-terracotta)', margin: '0 0 12px' }}>
                  * 01 / About Sole Trust Media
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(36px, 5vw, 68px)',
                    lineHeight: 0.96,
                    letterSpacing: '-0.04em',
                    margin: 0,
                    color: 'var(--text-ink)',
                  }}
                >
                  Where Creativity Meets{' '}
                  <i style={{ fontFamily: 'var(--font-editorial)', fontWeight: 400, color: 'var(--accent-terracotta)' }}>
                    Strategy.
                  </i>
                  <br />
                  Where Ideas Become{' '}
                  <i style={{ fontFamily: 'var(--font-editorial)', fontWeight: 400, color: 'var(--accent-terracotta)' }}>
                    Impact.
                  </i>
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '15px', lineHeight: 1.68, color: 'var(--muted)' }}>
                <p style={{ margin: 0, color: 'var(--text-ink)', fontWeight: 500 }}>
                  Sole Trust Media started with a vision to bring creativity, technology, and strategic thinking together under one roof.
                </p>
                <p style={{ margin: 0 }}>
                  From brand identity and editorial production to bespoke Next.js flagships and automated growth pipelines, we build connected systems that earn immediate trust and compound commercial value.
                </p>
                <p style={{ margin: 0 }}>
                  We don&apos;t just deliver isolated projects — we build enduring partnerships alongside the founders who trust us.
                </p>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* 2. Deep Espresso Chronological Milestone Timeline (2025—2026) + Bengaluru HQ Map */}
      <section
        className="about-timeline-espresso"
        id="milestones"
        aria-labelledby="timeline-title"
        style={{ padding: 'clamp(56px, 6vw, 88px) var(--page-gutter)' }}
      >
        <div className="about-timeline-inner">
          <MotionWrapper>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: '20px',
                paddingBottom: '24px',
                borderBottom: '1px solid var(--border-hairline-dark)',
              }}
            >
              <div>
                <p className="editorial-label" style={{ color: 'var(--accent-gold)', margin: '0 0 10px' }}>
                  * 02 / Our Journey &bull; 2025 — 2026 · 1.5+ Years of Craft
                </p>
                <h2
                  id="timeline-title"
                  className="editorial-serif-display"
                  style={{ fontSize: 'clamp(36px, 5vw, 68px)', margin: 0, color: 'var(--text-cream)' }}
                >
                  Chronology of <i style={{ color: 'var(--accent-gold)' }}>craft &amp; scale.</i>
                </h2>
              </div>
              <p style={{ maxWidth: '380px', margin: 0, fontSize: '14px', lineHeight: 1.6, color: 'rgba(246, 241, 233, 0.72)' }}>
                From our founding desk in Bengaluru to engineering flagship identities and automated platforms worldwide.
              </p>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.08}>
            <div
              className="stm-about-milestones-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '24px',
                margin: '36px 0 40px',
              }}
            >
              {milestones.map((m) => (
                <div
                  key={m.year}
                  className="stm-about-milestone-card"
                  style={{
                    padding: '24px',
                    borderRadius: '18px',
                    border: '1px solid var(--border-hairline-dark)',
                    background: 'rgba(246, 241, 233, 0.03)',
                  }}
                >
                  <span className="about-year-tag" style={{ color: 'var(--accent-gold)' }}>
                    {m.tag}
                  </span>
                  <div
                    className="about-year-call"
                    style={{ fontSize: 'clamp(42px, 4.5vw, 58px)', margin: '8px 0 10px' }}
                  >
                    {m.year}
                  </div>
                  <p className="about-year-desc" style={{ margin: 0, fontSize: '13px', lineHeight: 1.6 }}>
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </MotionWrapper>

          {/* Minimalist Single-Line World & India Map Vector Card */}
          <MotionWrapper delay={0.12}>
            <div className="about-timeline-map-card" style={{ marginTop: 0 }}>
              <div>
                <svg
                  className="stm-about-map-svg"
                  viewBox="0 0 640 300"
                  width="100%"
                  height="auto"
                  fill="none"
                  role="img"
                  aria-label="Minimalist map highlighting Bengaluru HQ at 12.9716 N, 77.5946 E and global client hubs"
                  style={{ display: 'block', maxHeight: '250px' }}
                >
                  <line x1="0" y1="75" x2="640" y2="75" stroke="rgba(246,241,233,0.09)" strokeWidth="1" />
                  <line x1="0" y1="150" x2="640" y2="150" stroke="rgba(246,241,233,0.12)" strokeWidth="1" strokeDasharray="3 5" />
                  <line x1="0" y1="225" x2="640" y2="225" stroke="rgba(246,241,233,0.09)" strokeWidth="1" />
                  <line x1="160" y1="0" x2="160" y2="300" stroke="rgba(246,241,233,0.09)" strokeWidth="1" />
                  <line x1="320" y1="0" x2="320" y2="300" stroke="rgba(246,241,233,0.09)" strokeWidth="1" />
                  <line x1="480" y1="0" x2="480" y2="300" stroke="rgba(246,241,233,0.09)" strokeWidth="1" />

                  <path d="M55 68 L112 58 L148 82 L134 118 L112 132 L126 156 L158 178 L142 238 L122 258 L112 215 L98 176 L86 144 L64 118 Z" stroke="rgba(246,241,233,0.34)" strokeWidth="1" />
                  <path d="M276 64 L322 52 L352 72 L338 98 L302 104 L282 92 Z" stroke="rgba(246,241,233,0.34)" strokeWidth="1" />
                  <path d="M280 116 L334 112 L364 146 L350 202 L322 238 L296 196 L278 152 Z" stroke="rgba(246,241,233,0.34)" strokeWidth="1" />
                  <path d="M356 62 L462 50 L534 74 L554 116 L516 146 L486 140 L462 156 L444 134 L424 142 L386 122 L362 104 Z" stroke="rgba(246,241,233,0.34)" strokeWidth="1" />
                  <path d="M424 134 L452 134 L464 156 L442 198 L420 162 Z" stroke="#F6F1E9" strokeWidth="1.25" fill="rgba(197,155,109,0.22)" />
                  <path d="M518 198 L572 192 L588 228 L546 244 L516 222 Z" stroke="rgba(246,241,233,0.34)" strokeWidth="1" />

                  <path d="M440 178 Q 370 96, 294 82" stroke="#C59B6D" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M440 178 Q 412 146, 384 140" stroke="#C59B6D" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M440 178 Q 478 186, 502 174" stroke="#C59B6D" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M440 178 Q 275 40, 126 102" stroke="rgba(197,155,109,0.65)" strokeWidth="1" strokeDasharray="3 4" />

                  <circle cx="294" cy="82" r="3" fill="#F6F1E9" />
                  <text x="294" y="72" fill="rgba(246,241,233,0.75)" fontSize="8" fontFamily="DM Mono, monospace" textAnchor="middle">LONDON</text>
                  <circle cx="384" cy="140" r="3" fill="#F6F1E9" />
                  <text x="384" y="131" fill="rgba(246,241,233,0.75)" fontSize="8" fontFamily="DM Mono, monospace" textAnchor="middle">DUBAI</text>
                  <circle cx="502" cy="174" r="3" fill="#F6F1E9" />
                  <text x="518" y="170" fill="rgba(246,241,233,0.75)" fontSize="8" fontFamily="DM Mono, monospace">SINGAPORE</text>
                  <circle cx="126" cy="102" r="3" fill="#F6F1E9" />
                  <text x="126" y="92" fill="rgba(246,241,233,0.75)" fontSize="8" fontFamily="DM Mono, monospace" textAnchor="middle">NEW YORK</text>

                  <circle cx="440" cy="178" r="11" stroke="#C59B6D" strokeWidth="1" fill="rgba(197,155,109,0.22)" />
                  <circle cx="440" cy="178" r="4" fill="#C59B6D" stroke="#F6F1E9" strokeWidth="1" />
                  <text x="440" y="212" fill="#F6F1E9" fontSize="9" fontWeight="600" fontFamily="DM Mono, monospace" textAnchor="middle">
                    BENGALURU HQ
                  </text>
                </svg>
              </div>

              <div>
                <span className="editorial-label" style={{ color: 'var(--accent-gold)', display: 'block', marginBottom: '10px' }}>
                  * Studio Coordinates
                </span>
                <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 400, margin: '0 0 10px', color: 'var(--text-cream)', lineHeight: 1.1 }}>
                  Bengaluru HQ. <i style={{ color: 'var(--accent-gold)' }}>Global Execution.</i>
                </h3>
                <p style={{ fontFamily: 'var(--font-utility)', fontSize: '12px', letterSpacing: '0.08em', color: 'var(--accent-gold)', margin: '0 0 14px' }}>
                  12.9716° N, 77.5946° E &bull; Whitefield, India
                </p>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'rgba(246, 241, 233, 0.74)', margin: '0 0 18px' }}>
                  Anchored in India&apos;s technology capital while collaborating seamlessly across London, Dubai, Singapore, and New York.
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
          </MotionWrapper>
        </div>
      </section>

      {/* 3. Unified Our People + Core Principles Band (Warm Parchment) */}
      <section
        className="about-team"
        id="our-people"
        aria-labelledby="team-title"
        style={{ padding: 'clamp(56px, 6vw, 88px) var(--page-gutter)' }}
      >
        <MotionWrapper>
          <div className="about-team-heading" style={{ marginBottom: '36px' }}>
            <div className="about-section-kicker"><span>03</span> / Our People</div>
            <div>
              <h2 id="team-title">Good work is <i>never solo.</i></h2>
              <p>
                A close-knit studio of engineers, strategists, and directors united by one standard: make meaningful work that endures.
              </p>
            </div>
          </div>
        </MotionWrapper>

        <div className="about-team-grid">
          {team.map((member) => (
            <article
              key={member.number}
              className={`about-person-card${member.founder ? ' about-person-founder' : ''}${member.image ? ' about-person-has-image' : ''}`}
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

        <AnimatedHairline style={{ margin: 'clamp(44px, 5vw, 68px) 0 clamp(32px, 4vw, 48px)' }} />

        {/* Compact 4-Value Strip integrated cleanly */}
        <div id="our-values">
          <MotionWrapper>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px', marginBottom: '28px' }}>
              <span className="editorial-label" style={{ color: 'var(--accent-terracotta)' }}>
                * What We Believe
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 44px)', margin: 0, color: 'var(--text-ink)' }}>
                What Drives <i style={{ fontFamily: 'var(--font-editorial)', fontWeight: 400, color: 'var(--accent-terracotta)' }}>Us.</i>
              </h3>
            </div>

            <div className="about-values-grid">
              {values.map((value) => (
                <article className="about-value-card" key={value.number} style={{ opacity: 1, transform: 'none' }}>
                  <span className="about-value-number">{value.number}</span>
                  <div className="about-value-rule" />
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </article>
              ))}
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* 4. Compact Deep Espresso Next Chapter CTA */}
      <section
        className="about-cta"
        aria-labelledby="about-cta-title"
        style={{ padding: 'clamp(56px, 6vw, 88px) var(--page-gutter)' }}
      >
        <MotionWrapper>
          <div className="about-cta-inner">
            <div className="about-section-kicker"><span>04</span> / The Next Chapter</div>
            <h2 id="about-cta-title" style={{ margin: '14px 0 18px' }}>
              Your Vision Deserves <i>More.</i>
            </h2>
            <p className="about-cta-copy" style={{ marginBottom: '28px' }}>
              Let&apos;s turn your next big idea into an enduring brand and digital flagship.
            </p>
            <div className="about-cta-actions">
              <Link className="stm-btn-terracotta" href="/contact">
                Let&apos;s Work Together <ArrowUpRight size={14} />
              </Link>
              <Link className="button about-cta-secondary" href="/services">
                Explore Our Capabilities <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </MotionWrapper>
        <div className="about-cta-mark" aria-hidden="true">STM<span>®</span></div>
      </section>

      <SiteFooter />
    </main>
  )
}
