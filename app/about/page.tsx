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
    name: 'Daksh Bahagat',
    role: 'Co-Founder & Marketing Head',
    bio: 'Leading marketing and growth strategies, Daksh focuses on brand positioning, audience engagement and building meaningful connections between businesses and their audiences. His approach combines strategic thinking with creative marketing execution.',
    image: '/assets/daksh-bahagat.png',
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

      <section className="about-hero" aria-labelledby="about-title">
        <div className="about-hero-inner">
          <div className="about-hero-copy about-reveal" data-about-reveal>
            <p className="about-eyebrow"><span /> About Sole Trust Media</p>
            <h1 id="about-title">
              Where Creativity
              <br />
              Meets <i>Strategy.</i>
              <br />
              Where Ideas Become
              <br />
              <i>Impact.</i>
            </h1>
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
