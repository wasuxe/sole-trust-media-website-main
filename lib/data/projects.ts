export type ProjectTag =
  | "CLIENT WORK"
  | "SELF-INITIATED CONCEPT"
  | "SOURCE ASSET PENDING"

export type ProjectCTA = "OPEN WEBSITE" | "OPEN CONCEPT" | "VIEW PROJECT"

export interface InstagramReel {
  id: string
  thumbnail: string
  url: string
  label?: string
}

export interface Project {
  slug: string
  aliases?: string[]
  name: string
  client_name?: string
  type: string
  category: string
  note: string
  description: string
  services: string[]
  images: string[]
  cover_image: string
  marker: string
  tag: ProjectTag
  cta: ProjectCTA
  link?: string
  website?: string
  tags: string[]
  featured?: boolean
  display_order: number
  status: "published"
  instagramReels?: InstagramReel[]
}

export const PROJECTS: Project[] = [
  {
    slug: "future-luxe",
    aliases: ["future-luxe-jewelry"],
    name: "FUTURE LUXE JEWELRY",
    client_name: "Future Luxe",
    type: "LUXURY JEWELRY / DIGITAL EXPERIENCE",
    category: "Website Development",
    note: "Supplied website concept — use as source for the atelier direction.",
    description:
      "Cinematic product imagery, luxury interface, interactive 3D concept and atelier experience.",
    services: [
      "Product imagery",
      "Luxury interface",
      "3D concept",
      "Product presentation",
      "Atelier",
    ],
    tag: "SOURCE ASSET PENDING",
    cta: "OPEN WEBSITE",
    link: "https://future-luxe-jewelry.vercel.app/",
    website: "https://future-luxe-jewelry.vercel.app/",
    images: ["/assets/work/future-luxe/future-luxe-01.png"],
    cover_image: "/assets/work/future-luxe/future-luxe-01.png",
    marker: "01",
    tags: ["Concepts", "Web / Digital", "Experimental", "Website Development"],
    featured: true,
    display_order: 1,
    status: "published",
  },
  {
    slug: "twine",
    aliases: ["twine-figma-concept"],
    name: "TWINE / FIGMA CONCEPT",
    client_name: "Twine",
    type: "CONCEPT / FIGMA EXPERIENCE",
    category: "Concepts",
    note: "Supplied second Figma concept — exploratory work.",
    description:
      "A second concept direction for a luxury digital experience, shown as an experiment.",
    services: [
      "Concept direction",
      "Editorial UI",
      "Interaction",
    ],
    tag: "SELF-INITIATED CONCEPT",
    cta: "OPEN CONCEPT",
    link: "https://twine-dull-31092199.figma.site/",
    website: "https://twine-dull-31092199.figma.site/",
    images: ["/assets/work/twine/twine-01.jpeg"],
    cover_image: "/assets/work/twine/twine-01.jpeg",
    marker: "02",
    tags: ["Concepts", "Web / Digital", "Experimental"],
    featured: true,
    display_order: 2,
    status: "published",
  },
  {
    slug: "aurelia",
    aliases: ["aurelune", "shield"],
    name: "AURELIA / FIGMA CONCEPT",
    client_name: "Aurelia",
    type: "LUXURY JEWELRY / BRAND EXPERIENCE",
    category: "Branding & Identity",
    note: "Supplied Figma concept — clearly marked as concept work.",
    description:
      "Luxury imagery, product presentation, typography and interactive editorial composition.",
    services: [
      "Luxury imagery",
      "Product presentation",
      "Typography",
      "Editorial composition",
      "Interactive details",
    ],
    tag: "SELF-INITIATED CONCEPT",
    cta: "OPEN CONCEPT",
    link: "https://shield-slogan-46223925.figma.site/",
    website: "https://shield-slogan-46223925.figma.site/",
    images: ["/assets/work/shield/shield-01.jpeg"],
    cover_image: "/assets/work/shield/shield-01.jpeg",
    marker: "03",
    tags: ["Concepts", "Branding", "Web / Digital", "Branding & Identity"],
    featured: true,
    display_order: 3,
    status: "published",
  },
  {
    slug: "psychology-with-mitali",
    aliases: ["psychology-mitali"],
    name: "PSYCHOLOGY WITH MITALI",
    client_name: "Psychology with Mitali",
    type: "WELLNESS / PROFESSIONAL SERVICES / DIGITAL",
    category: "Website Development",
    note: "Source asset slot — connect the approved website capture.",
    description:
      "Calm editorial imagery, typography, service presentation and mobile experience.",
    services: [
      "Website",
      "Typography",
      "Editorial imagery",
      "Services",
      "Mobile",
    ],
    tag: "SOURCE ASSET PENDING",
    cta: "OPEN WEBSITE",
    link: "https://psychologywithmitali.vercel.app/",
    website: "https://psychologywithmitali.vercel.app/",
    images: ["/assets/work/psychology-mitali/psychology-mitali-01.jpeg"],
    cover_image: "/assets/work/psychology-mitali/psychology-mitali-01.jpeg",
    marker: "04",
    tags: ["Web / Digital", "Branding", "Content", "Personal Branding", "Website Development"],
    featured: true,
    display_order: 4,
    status: "published",
  },
  {
    slug: "asha-tiffin",
    aliases: ["asha-tiffins"],
    name: "ASHA TIFFINS",
    client_name: "Asha Tiffins",
    type: "RESTAURANT / FOOD / DIGITAL EXPERIENCE",
    category: "Website Development",
    note: "Source asset slot — connect the approved website capture.",
    description:
      "Food imagery, menu experience, restaurant identity, mobile layout and ordering flow.",
    services: [
      "Food imagery",
      "Menu",
      "Identity",
      "Mobile layout",
      "Ordering",
    ],
    tag: "SOURCE ASSET PENDING",
    cta: "OPEN WEBSITE",
    link: "https://asha-tiffin-bengaluru.vercel.app/",
    website: "https://asha-tiffin-bengaluru.vercel.app/",
    images: ["/assets/work/asha-tiffins/asha-tiffins-01.jpeg"],
    cover_image: "/assets/work/asha-tiffins/asha-tiffins-01.jpeg",
    marker: "05",
    tags: ["Web / Digital", "E-commerce", "Content", "Website Development"],
    featured: true,
    display_order: 5,
    status: "published",
  },
  {
    slug: "chainmind-ai",
    name: "CHAINMIND AI",
    client_name: "ChainMind AI",
    type: "AI / TECHNOLOGY / SUPPLY CHAIN",
    category: "Application Development",
    note: "Source asset slot — connect the approved product capture.",
    description:
      "AI interface, dashboards, system visuals, technology screens and data experience.",
    services: [
      "AI interface",
      "Dashboards",
      "System visuals",
      "Technology screens",
      "Data experience",
    ],
    tag: "SOURCE ASSET PENDING",
    cta: "OPEN WEBSITE",
    link: "https://chainmind-ai-ten.vercel.app/",
    website: "https://chainmind-ai-ten.vercel.app/",
    images: ["/assets/work/chainmind-ai/chainmind-ai-01.jpeg"],
    cover_image: "/assets/work/chainmind-ai/chainmind-ai-01.jpeg",
    marker: "06",
    tags: ["AI / Technology", "Web / Digital", "Data", "Application Development"],
    featured: true,
    display_order: 6,
    status: "published",
  },
  {
    slug: "farmlytics",
    name: "FARMLYTICS",
    client_name: "Farmlytics",
    type: "AGRICULTURE / TECHNOLOGY / DIGITAL PLATFORM",
    category: "Technology & Automation",
    note: "Source asset slot — connect the approved interface capture.",
    description:
      "Interface, dashboard, data visualizations, agricultural visuals and responsive screens.",
    services: [
      "Interface",
      "Dashboard",
      "Data visualization",
      "Agriculture",
      "Responsive screens",
    ],
    tag: "SOURCE ASSET PENDING",
    cta: "OPEN WEBSITE",
    link: "https://farmlytics-three.vercel.app/",
    website: "https://farmlytics-three.vercel.app/",
    images: ["/assets/work/farmlytics/farmlytics-01.jpeg"],
    cover_image: "/assets/work/farmlytics/farmlytics-01.jpeg",
    marker: "07",
    tags: ["Web / Digital", "Technology", "Data", "Technology & Automation"],
    featured: true,
    display_order: 7,
    status: "published",
  },
  {
    slug: "ninas-beauty-hub",
    aliases: ["nina-beauty"],
    name: "NINA'S BEAUTY HUB",
    client_name: "Nina's Beauty Hub",
    type: "BEAUTY / DIGITAL EXPERIENCE",
    category: "Website Development",
    note: "Source asset slot — connect the approved website capture.",
    description:
      "Website, beauty imagery, service presentation, mobile experience and UI details.",
    services: [
      "Homepage",
      "Beauty imagery",
      "Services",
      "Mobile experience",
      "UI details",
    ],
    tag: "SOURCE ASSET PENDING",
    cta: "OPEN WEBSITE",
    link: "https://nina-s-beauty-hub.vercel.app/",
    website: "https://nina-s-beauty-hub.vercel.app/",
    images: ["/assets/work/nina-beauty/nina-beauty-01.jpeg"],
    cover_image: "/assets/work/nina-beauty/nina-beauty-01.jpeg",
    marker: "08",
    tags: ["Web / Digital", "Branding", "Content", "Digital Marketing", "Website Development"],
    featured: true,
    display_order: 8,
    status: "published",
  },
  {
    slug: "lumora",
    aliases: ["lumora-beauty"],
    name: "LUMORA",
    client_name: "Lumora",
    type: "BEAUTY / BRANDING / DIGITAL",
    category: "Packaging Design",
    note: "A luminous identity built to make everyday rituals feel considered.",
    description:
      "A complete beauty system spanning identity, packaging and an editorial e-commerce world. Soft edges, sharp hierarchy, tactile details.",
    services: [
      "Brand identity",
      "Product visuals",
      "Packaging",
      "Content",
      "E-commerce",
    ],
    images: [
      "/assets/work/lumora/lumora-01.png",
      "/assets/work/lumora/lumora-02.png",
      "/assets/work/lumora/lumora-03.png",
    ],
    cover_image: "/assets/work/lumora/lumora-01.png",
    marker: "09",
    tag: "SOURCE ASSET PENDING",
    cta: "VIEW PROJECT",
    tags: ["Branding", "E-commerce", "Content", "Web / Digital", "Packaging Design", "Branding & Identity"],
    featured: true,
    display_order: 9,
    status: "published",
  },
  {
    slug: "before-fall",
    name: "BEFORE FALL",
    client_name: "Before Fall",
    type: "HAIRCARE / BRAND IDENTITY",
    category: "Branding & Identity",
    note: "Approved source capture pending — concept direction retained without fabricated visuals.",
    description:
      "A self-initiated haircare identity direction. Replace the source-pending board with approved concept files when available.",
    services: [
      "Identity",
      "Typography",
      "Packaging",
      "Campaign concepts",
    ],
    images: [
      "/assets/work/before-fall/before-fall-01.png",
      "/assets/work/before-fall/before-fall-02.png",
      "/assets/work/before-fall/before-fall-03.png",
    ],
    cover_image: "/assets/work/before-fall/before-fall-01.png",
    marker: "10",
    tag: "SELF-INITIATED CONCEPT",
    cta: "VIEW PROJECT",
    tags: ["Branding", "Campaigns", "Concepts", "Branding & Identity"],
    featured: true,
    display_order: 10,
    status: "published",
  },
  {
    slug: "raya",
    aliases: ["raya-skincare"],
    name: "RAYA",
    client_name: "Raya Skincare",
    type: "SKINCARE / BRAND SYSTEM",
    category: "Branding & Identity",
    note: "A self-initiated skincare brand system exploring identity, packaging, social and digital experience.",
    description:
      "A skincare brand system prepared across identity, packaging, social and digital experience.",
    services: [
      "Identity",
      "Packaging",
      "Social",
      "Concept",
    ],
    images: [
      "/assets/work/raya/raya-01.png",
      "/assets/work/raya/raya-02.png",
      "/assets/work/raya/raya-03.png",
    ],
    cover_image: "/assets/work/raya/raya-01.png",
    marker: "11",
    tag: "SELF-INITIATED CONCEPT",
    cta: "VIEW PROJECT",
    tags: ["Branding", "Content", "Concepts", "Branding & Identity"],
    featured: true,
    display_order: 11,
    status: "published",
  },
  {
    slug: "13isu",
    name: "13ISU",
    client_name: "13ISU",
    type: "DESSERT / BRAND IDENTITY / SOCIAL CREATIVE",
    category: "Branding & Identity",
    note: "A speciality tiramisu brand shaped through identity, product-led creative and viral social communication.",
    description:
      "A speciality tiramisu brand brought to life through a playful identity, bespoke packaging and product-led social creative — achieving 100K+ organic Instagram views in 3 days.",
    services: [
      "Brand concept & naming",
      "Brand identity",
      "Creative direction",
      "Packaging design",
      "Social media creatives",
      "Content direction",
      "Digital marketing",
    ],
    images: [
      "/13isu-creative-1.png",
      "/13isu-creative-2.png",
      "/13isu-creative-3.png",
    ],
    cover_image: "/13isu-creative-1.png",
    marker: "12",
    tag: "CLIENT WORK",
    cta: "VIEW PROJECT",
    tags: ["Branding", "Content", "Campaigns", "Creative & Content", "Branding & Identity"],
    featured: true,
    display_order: 12,
    status: "published",
  },
  {
    slug: "trends-are-a-tool",
    aliases: ["trends-are-a-tool-not-a-strategy"],
    name: "TRENDS ARE A TOOL, NOT A STRATEGY",
    client_name: "Sole Trust Media",
    type: "STRATEGY / SOCIAL COMMERCE / CONTENT ARCHITECTURE",
    category: "Creative Direction & Strategy",
    note: "People are watching your posts. So why aren’t they buying?",
    description:
      "A strategic case study and framework examining why vanity views fail to generate paying customers, and how customer-led storytelling drives measurable business enquiries.",
    services: [
      "Content strategy",
      "Creative direction",
      "Customer journey mapping",
      "Social commerce",
      "Brand communication",
      "Funnel analytics",
    ],
    images: [
      "/assets/work/trends-are-a-tool/trends-cover.svg",
    ],
    cover_image: "/assets/work/trends-are-a-tool/trends-cover.svg",
    marker: "14",
    tag: "CLIENT WORK",
    cta: "VIEW PROJECT",
    tags: ["Content", "Campaigns", "Concepts", "Creative & Content"],
    featured: true,
    display_order: 14,
    status: "published",
  },
  {
    slug: "stm-music",
    aliases: ["stm-music-group"],
    name: "STM MUSIC GROUP",
    client_name: "STM Music Group",
    type: "MUSIC / ARTIST MANAGEMENT / EVENTS",
    category: "Creative & Content",
    note: "Selected work from STM Music Group — artist management, music marketing, content and events.",
    description:
      "A selected archive of artist-focused creative work, music marketing, content, release campaigns and events created through STM Music Group.",
    services: [
      "Artist management",
      "Music marketing",
      "Content",
      "Release campaigns",
      "Events",
    ],
    images: [
      "/assets/work/stm-music/stm-music-01.png",
      "/assets/work/stm-music/stm-music-02.png",
      "/assets/work/stm-music/stm-music-03.png",
    ],
    cover_image: "/assets/work/stm-music/stm-music-01.png",
    marker: "13",
    tag: "CLIENT WORK",
    cta: "VIEW PROJECT",
    tags: ["Content", "Campaigns", "Social", "Creative & Content"],
    featured: true,
    display_order: 13,
    status: "published",
    instagramReels: [
      {
        id: "stm-reel-01",
        thumbnail: "/assets/work/stm-music/stm-music-01.png",
        url: "https://www.instagram.com/reel/DdcA-vSqmL6/",
        label: "WATCH REEL 01",
      },
      {
        id: "stm-reel-02",
        thumbnail: "/assets/work/stm-music/stm-music-02.png",
        url: "https://www.instagram.com/reel/DZXh-evyo6x/",
        label: "WATCH REEL 02",
      },
      {
        id: "stm-reel-03",
        thumbnail: "/assets/work/stm-music/stm-music-03.png",
        url: "https://www.instagram.com/reel/DYl6wdRsKsl/",
        label: "WATCH REEL 03",
      },
    ],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  const normalized = slug.toLowerCase().trim()
  return PROJECTS.find(
    (p) =>
      p.slug === normalized ||
      p.aliases?.some((a) => a.toLowerCase() === normalized)
  )
}

