import { Metadata } from "next"
import { redirect } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { createClient } from "@supabase/supabase-js"
import SiteNav from "@/components/site-nav"
import { PROJECTS, getProjectBySlug } from "@/lib/data/projects"

interface CaseStudyData {
  title: string
  client_name: string
  category: string
  type: string
  cover_image: string
  tagline?: string
  industry?: string
  location?: string
  client_introduction: string
  business_challenge: string
  objectives: string
  strategy: string
  creative_direction: string
  execution: string
  approach?: string[]
  brand_personality?: Array<{ element: string; direction: string }>
  services_delivered: string[]
  results: string
  gallery: Array<{ image_url: string; caption?: string }>
  sources?: Array<{ title: string; description: string; href: string }>
  assets?: Array<{ title: string; fileId: string }>
  live_url?: string
  cta_label?: string
  name?: string
  note?: string
  description?: string
  services?: string[]
  link?: string
  website?: string
  cta?: string
}

const staticData: Record<string, CaseStudyData> = {
  "future-luxe": {
    title: "FUTURE LUXE JEWELRY",
    client_name: "Future Luxe",
    category: "Website Development",
    type: "LUXURY JEWELRY / DIGITAL EXPERIENCE",
    tagline: "Supplied website concept — use as source for the atelier direction.",
    cover_image: "/assets/work/future-luxe/future-luxe-01.png",
    industry: "Luxury Jewelry & Digital Retail",
    location: "Global",
    client_introduction:
      "FUTURE LUXE JEWELRY is a digital atelier experience concept combining cinematic product imagery, luxury interface architecture, and interactive 3D presentations.",
    business_challenge:
      "Luxury digital flagships require seamless presentation of fine craft, high-fidelity 3D interaction, and editorial atmosphere that matches the prestige of an haute joaillerie atelier.",
    objectives:
      "Create an evocative digital atelier showcasing luxury jewellery through interactive 3D, rich typography, and seamless digital purchase pathways.",
    strategy:
      "Atelier digital experience direction, bespoke 3D viewer integration, editorial product storytelling, and high-conversion luxury UI layout.",
    creative_direction:
      "Cinematic lighting, rich dark-room atelier atmosphere, refined high-contrast serif typography, and tactile product focus.",
    execution:
      "Crafted the live interactive digital experience with 3D concepts, smooth atelier exploration, and responsive multi-device design.",
    services_delivered: [
      "Product imagery",
      "Luxury interface",
      "3D concept",
      "Product presentation",
      "Atelier",
    ],
    results: "Concept website deployed and live at future-luxe-jewelry.vercel.app.",
    live_url: "https://future-luxe-jewelry.vercel.app/",
    cta_label: "OPEN LIVE WEBSITE",
    gallery: [
      {
        image_url: "/assets/work/future-luxe/future-luxe-01.png",
        caption: "Future Luxe atelier interface and luxury 3D presentation concept.",
      },
    ],
  },
  "twine": {
    title: "TWINE / FIGMA CONCEPT",
    client_name: "Twine",
    category: "Concepts",
    type: "CONCEPT / FIGMA EXPERIENCE",
    tagline: "A second concept direction for a luxury digital experience, shown as an experiment.",
    cover_image: "/assets/work/twine/twine-01.jpeg",
    industry: "Digital Concept & High Fashion",
    location: "Global",
    client_introduction:
      "Twine is an exploratory Figma concept examining editorial UI layouts, interactive composition, and luxury digital interaction design.",
    business_challenge:
      "Balancing editorial freedom with intuitive digital commerce navigation in a high-fashion, avant-garde digital concept.",
    objectives:
      "Explore boundary-pushing UI layouts, experimental interaction models, and high-fashion editorial digital spaces.",
    strategy:
      "Editorial layout experimentation, bespoke typographic hierarchy, interactive component choreography, and prototype testing.",
    creative_direction:
      "Unconventional grid structures, bold monospace micro-copy, tactile product curation, and fluid micro-interactions.",
    execution:
      "Interactive Figma prototype architecture and responsive design system.",
    services_delivered: [
      "Concept direction",
      "Editorial UI",
      "Interaction",
    ],
    results: "Exploratory design concept published on Figma Site.",
    live_url: "https://twine-dull-31092199.figma.site/",
    cta_label: "OPEN FIGMA CONCEPT",
    gallery: [
      {
        image_url: "/assets/work/twine/twine-01.jpeg",
        caption: "Twine editorial Figma experience and interactive layout.",
      },
    ],
  },
  "aurelia": {
    title: "AURELIA / FIGMA CONCEPT",
    client_name: "Aurelia",
    category: "Branding & Identity",
    type: "LUXURY JEWELRY / BRAND EXPERIENCE",
    tagline: "Supplied Figma concept — clearly marked as concept work.",
    cover_image: "/assets/work/shield/shield-01.jpeg",
    industry: "Luxury Jewelry & Brand Experience",
    location: "Paris & Bengaluru",
    client_introduction:
      "Aurelia is a luxury jewelry brand experience exploring high-craft editorial composition, product presentation, typography, and interactive digital storytelling.",
    business_challenge:
      "Communicating the timeless elegance and value of fine jewelry through digital mediums without traditional showroom physical presence.",
    objectives:
      "Develop an aspirational jewelry brand experience with editorial magazine aesthetics, refined typography, and interactive details.",
    strategy:
      "High-craft luxury brand positioning, editorial art direction, refined typography pairing, and bespoke interactive prototype.",
    creative_direction:
      "Champagne and muted neutral tones, high-contrast serif headlines, controlled studio lighting, and understated gold accents.",
    execution:
      "Complete interactive Figma brand experience with editorial compositions and responsive layouts.",
    services_delivered: [
      "Luxury imagery",
      "Product presentation",
      "Typography",
      "Editorial composition",
      "Interactive details",
    ],
    results: "Concept brand experience published and accessible on Figma Site.",
    live_url: "https://shield-slogan-46223925.figma.site/",
    cta_label: "OPEN FIGMA CONCEPT",
    gallery: [
      {
        image_url: "/assets/work/shield/shield-01.jpeg",
        caption: "Aurelia luxury jewellery brand concept and editorial composition.",
      },
    ],
  },
  "aurelune": {
    title: "AURELIA / FIGMA CONCEPT",
    client_name: "Aurelia",
    category: "Branding & Identity",
    type: "LUXURY JEWELRY / BRAND EXPERIENCE",
    tagline: "Supplied Figma concept — clearly marked as concept work.",
    cover_image: "/assets/work/shield/shield-01.jpeg",
    industry: "Luxury Jewelry & Brand Experience",
    location: "Paris & Bengaluru",
    client_introduction:
      "Aurelia (formerly conceptualized under Aurelune) is a luxury jewelry brand experience exploring high-craft editorial composition, product presentation, typography, and interactive digital storytelling.",
    business_challenge:
      "Communicating the timeless elegance and value of fine jewelry through digital mediums without traditional showroom physical presence.",
    objectives:
      "Develop an aspirational jewelry brand experience with editorial magazine aesthetics, refined typography, and interactive details.",
    strategy:
      "High-craft luxury brand positioning, editorial art direction, refined typography pairing, and bespoke interactive prototype.",
    creative_direction:
      "Champagne and muted neutral tones, high-contrast serif headlines, controlled studio lighting, and understated gold accents.",
    execution:
      "Complete interactive Figma brand experience with editorial compositions and responsive layouts.",
    services_delivered: [
      "Luxury imagery",
      "Product presentation",
      "Typography",
      "Editorial composition",
      "Interactive details",
    ],
    results: "Concept brand experience published and accessible on Figma Site.",
    live_url: "https://shield-slogan-46223925.figma.site/",
    cta_label: "OPEN FIGMA CONCEPT",
    gallery: [
      {
        image_url: "/assets/work/shield/shield-01.jpeg",
        caption: "Aurelia luxury jewellery brand concept and editorial composition.",
      },
    ],
  },
  "psychology-with-mitali": {
    title: "PSYCHOLOGY WITH MITALI",
    client_name: "Psychology with Mitali",
    category: "Website Development",
    type: "WELLNESS / PROFESSIONAL SERVICES / DIGITAL",
    tagline: "Calm editorial imagery, typography, service presentation and mobile experience.",
    cover_image: "/assets/work/psychology-mitali/psychology-mitali-01.jpeg",
    industry: "Wellness & Mental Health",
    location: "India",
    client_introduction:
      "Psychology with Mitali is a professional wellness and mental health digital presence designed to foster calm reassurance, clear service clarity, and accessible consultation booking.",
    business_challenge:
      "Mental wellness practices need digital interfaces that immediately de-escalate anxiety, establish professional clinical credibility, and simplify appointment booking.",
    objectives:
      "Create a soothing, accessible digital home that communicates therapy approaches with clarity, warmth, and trust.",
    strategy:
      "Mindful content hierarchy, warm editorial art direction, streamlined inquiry pathways, and responsive mobile-first experience.",
    creative_direction:
      "Earth tones, soft warm ivory backgrounds, legible serif typography, and grounding editorial imagery.",
    execution:
      "Engineered and deployed a responsive web platform with mobile consultation flows.",
    services_delivered: [
      "Website",
      "Typography",
      "Editorial imagery",
      "Services",
      "Mobile",
    ],
    results: "Live digital platform deployed at psychologywithmitali.vercel.app.",
    live_url: "https://psychologywithmitali.vercel.app/",
    cta_label: "OPEN LIVE WEBSITE",
    gallery: [
      {
        image_url: "/assets/work/psychology-mitali/psychology-mitali-01.jpeg",
        caption: "Psychology with Mitali digital homepage and service overview.",
      },
    ],
  },
  "asha-tiffin": {
    title: "ASHA TIFFINS",
    client_name: "Asha Tiffins",
    category: "Website Development",
    type: "RESTAURANT / FOOD / DIGITAL EXPERIENCE",
    tagline: "Food imagery, menu experience, restaurant identity, mobile layout and ordering flow.",
    cover_image: "/assets/work/asha-tiffins/asha-tiffins-01.jpeg",
    industry: "Food & Hospitality",
    location: "Bengaluru, India",
    client_introduction:
      "Asha Tiffins is an iconic South Indian culinary brand in Bengaluru, celebrated for authentic breakfast traditions and home-style meal subscriptions.",
    business_challenge:
      "Modernizing a beloved traditional restaurant's digital touchpoints to capture hungry mobile diners and power frictionless daily food ordering.",
    objectives:
      "Deliver an appetizing, authentic digital dining and ordering experience highlighting menu specialties and fast mobile ordering.",
    strategy:
      "Culinary brand identity, vibrant food presentation, menu categorization, and mobile-optimized ordering flow.",
    creative_direction:
      "Warm spice tones, authentic culinary photography, clear price hierarchy, and clean typography.",
    execution:
      "Built and launched responsive restaurant digital experience with menu browsing and ordering integrations.",
    services_delivered: [
      "Food imagery",
      "Menu",
      "Identity",
      "Mobile layout",
      "Ordering",
    ],
    results: "Live restaurant platform deployed at asha-tiffin-bengaluru.vercel.app.",
    live_url: "https://asha-tiffin-bengaluru.vercel.app/",
    cta_label: "OPEN LIVE WEBSITE",
    gallery: [
      {
        image_url: "/assets/work/asha-tiffins/asha-tiffins-01.jpeg",
        caption: "Asha Tiffins digital menu and ordering experience.",
      },
    ],
  },
  "asha-tiffins": {
    title: "ASHA TIFFINS",
    client_name: "Asha Tiffins",
    category: "Website Development",
    type: "RESTAURANT / FOOD / DIGITAL EXPERIENCE",
    tagline: "Food imagery, menu experience, restaurant identity, mobile layout and ordering flow.",
    cover_image: "/assets/work/asha-tiffins/asha-tiffins-01.jpeg",
    industry: "Food & Hospitality",
    location: "Bengaluru, India",
    client_introduction:
      "Asha Tiffins is an iconic South Indian culinary brand in Bengaluru, celebrated for authentic breakfast traditions and home-style meal subscriptions.",
    business_challenge:
      "Modernizing a beloved traditional restaurant's digital touchpoints to capture hungry mobile diners and power frictionless daily food ordering.",
    objectives:
      "Deliver an appetizing, authentic digital dining and ordering experience highlighting menu specialties and fast mobile ordering.",
    strategy:
      "Culinary brand identity, vibrant food presentation, menu categorization, and mobile-optimized ordering flow.",
    creative_direction:
      "Warm spice tones, authentic culinary photography, clear price hierarchy, and clean typography.",
    execution:
      "Built and launched responsive restaurant digital experience with menu browsing and ordering integrations.",
    services_delivered: [
      "Food imagery",
      "Menu",
      "Identity",
      "Mobile layout",
      "Ordering",
    ],
    results: "Live restaurant platform deployed at asha-tiffin-bengaluru.vercel.app.",
    live_url: "https://asha-tiffin-bengaluru.vercel.app/",
    cta_label: "OPEN LIVE WEBSITE",
    gallery: [
      {
        image_url: "/assets/work/asha-tiffins/asha-tiffins-01.jpeg",
        caption: "Asha Tiffins digital menu and ordering experience.",
      },
    ],
  },
  "chainmind-ai": {
    title: "CHAINMIND AI",
    client_name: "ChainMind AI",
    category: "Application Development",
    type: "AI / TECHNOLOGY / SUPPLY CHAIN",
    tagline: "AI interface, dashboards, system visuals, technology screens and data experience.",
    cover_image: "/assets/work/chainmind-ai/chainmind-ai-01.jpeg",
    industry: "Artificial Intelligence & Enterprise SaaS",
    location: "Bengaluru & Global",
    client_introduction:
      "ChainMind AI is an enterprise AI supply chain platform providing autonomous decision graphs, real-time workflow telemetry, and intelligent logistical orchestration.",
    business_challenge:
      "Translating complex machine learning pipelines and real-time enterprise telemetry into an intuitive, high-velocity SaaS dashboard.",
    objectives:
      "Architect a data-dense, dark-mode design system with sub-second visual telemetry and modular agent decision chains.",
    strategy:
      "Enterprise SaaS UI architecture, modular design tokens, real-time telemetry charting, and developer-first documentation.",
    creative_direction:
      "Dark-mode interface, neon cyan and emerald data pulses, monospaced metrics, and structural card grids.",
    execution:
      "Engineered the interactive product interface and marketing platform.",
    services_delivered: [
      "AI interface",
      "Dashboards",
      "System visuals",
      "Technology screens",
      "Data experience",
    ],
    results: "Live product application deployed at chainmind-ai-ten.vercel.app.",
    live_url: "https://chainmind-ai-ten.vercel.app/",
    cta_label: "OPEN LIVE PLATFORM",
    gallery: [
      {
        image_url: "/assets/work/chainmind-ai/chainmind-ai-01.jpeg",
        caption: "ChainMind AI dashboard interface and agent telemetry view.",
      },
    ],
  },
  "farmlytics": {
    title: "FARMLYTICS",
    client_name: "Farmlytics",
    category: "Technology & Automation",
    type: "AGRICULTURE / TECHNOLOGY / DIGITAL PLATFORM",
    tagline: "Interface, dashboard, data visualizations, agricultural visuals and responsive screens.",
    cover_image: "/assets/work/farmlytics/farmlytics-01.jpeg",
    industry: "Agriculture Technology / AgriTech",
    location: "Hyderabad & Bengaluru, India",
    client_introduction:
      "Farmlytics is an agricultural intelligence platform that connects IoT soil sensors, satellite crop health indices, and predictive weather models into actionable digital views.",
    business_challenge:
      "Empowering growers and agribusinesses to make timely agronomic decisions without drowning in raw sensor telemetry.",
    objectives:
      "Design a robust, accessible monitoring dashboard that provides real-time field insights across mobile and desktop devices.",
    strategy:
      "User-centric agronomic workflows, clean data visualizations, weather and moisture alerts, and field mapping tools.",
    creative_direction:
      "Rich agricultural greens, high-contrast numeric cards, clean graph layouts, and tactile field photography.",
    execution:
      "Delivered the responsive web application and data visualization interface.",
    services_delivered: [
      "Interface",
      "Dashboard",
      "Data visualization",
      "Agriculture",
      "Responsive screens",
    ],
    results: "Live platform deployed at farmlytics-three.vercel.app.",
    live_url: "https://farmlytics-three.vercel.app/",
    cta_label: "OPEN LIVE PLATFORM",
    gallery: [
      {
        image_url: "/assets/work/farmlytics/farmlytics-01.jpeg",
        caption: "Farmlytics agricultural dashboard and responsive crop monitoring interface.",
      },
    ],
  },
  "ninas-beauty-hub": {
    title: "NINA'S BEAUTY HUB",
    client_name: "Nina's Beauty Hub",
    category: "Website Development",
    type: "BEAUTY / DIGITAL EXPERIENCE",
    tagline: "Website, beauty imagery, service presentation, mobile experience and UI details.",
    cover_image: "/assets/work/nina-beauty/nina-beauty-01.jpeg",
    industry: "Beauty & Salons",
    location: "India",
    client_introduction:
      "Nina's Beauty Hub is an omnichannel beauty destination delivering premium hair, skin, and makeup experiences through an elegant digital flagship.",
    business_challenge:
      "Translating in-salon luxury into an alluring online customer journey that drives online appointments and product discovery.",
    objectives:
      "Create a chic, high-converting beauty website with interactive service menus, treatment booking, and curated product collections.",
    strategy:
      "Editorial beauty art direction, high-intent booking funnels, mobile-first responsive layout, and social proof integration.",
    creative_direction:
      "Blush and nude tones, clean modern typography, luminous beauty imagery, and delicate micro-interactions.",
    execution:
      "Complete website design, development, and mobile booking flow deployment.",
    services_delivered: [
      "Homepage",
      "Beauty imagery",
      "Services",
      "Mobile experience",
      "UI details",
    ],
    results: "Live digital platform deployed at nina-s-beauty-hub.vercel.app.",
    live_url: "https://nina-s-beauty-hub.vercel.app/",
    cta_label: "OPEN LIVE WEBSITE",
    gallery: [
      {
        image_url: "/assets/work/nina-beauty/nina-beauty-01.jpeg",
        caption: "Nina's Beauty Hub digital homepage and mobile experience.",
      },
    ],
  },
  "nina-beauty": {
    title: "NINA'S BEAUTY HUB",
    client_name: "Nina's Beauty Hub",
    category: "Website Development",
    type: "BEAUTY / DIGITAL EXPERIENCE",
    tagline: "Website, beauty imagery, service presentation, mobile experience and UI details.",
    cover_image: "/assets/work/nina-beauty/nina-beauty-01.jpeg",
    industry: "Beauty & Salons",
    location: "India",
    client_introduction:
      "Nina's Beauty Hub is an omnichannel beauty destination delivering premium hair, skin, and makeup experiences through an elegant digital flagship.",
    business_challenge:
      "Translating in-salon luxury into an alluring online customer journey that drives online appointments and product discovery.",
    objectives:
      "Create a chic, high-converting beauty website with interactive service menus, treatment booking, and curated product collections.",
    strategy:
      "Editorial beauty art direction, high-intent booking funnels, mobile-first responsive layout, and social proof integration.",
    creative_direction:
      "Blush and nude tones, clean modern typography, luminous beauty imagery, and delicate micro-interactions.",
    execution:
      "Complete website design, development, and mobile booking flow deployment.",
    services_delivered: [
      "Homepage",
      "Beauty imagery",
      "Services",
      "Mobile experience",
      "UI details",
    ],
    results: "Live digital platform deployed at nina-s-beauty-hub.vercel.app.",
    live_url: "https://nina-s-beauty-hub.vercel.app/",
    cta_label: "OPEN LIVE WEBSITE",
    gallery: [
      {
        image_url: "/assets/work/nina-beauty/nina-beauty-01.jpeg",
        caption: "Nina's Beauty Hub digital homepage and mobile experience.",
      },
    ],
  },
  "lumora": {
    title: "LUMORA",
    client_name: "Lumora",
    category: "Packaging Design",
    type: "BEAUTY / BRANDING / DIGITAL",
    tagline: "A luminous identity built to make everyday rituals feel considered.",
    cover_image: "/assets/work/lumora/lumora-01.png",
    industry: "Beauty, Packaging & Cosmetics",
    location: "Global",
    client_introduction:
      "A complete beauty system spanning identity, packaging and an editorial e-commerce world. Soft edges, sharp hierarchy, tactile details.",
    business_challenge:
      "Creating an unmistakable shelf presence and tactile luxury feel for everyday bath and skincare rituals in a crowded beauty landscape.",
    objectives:
      "Build an enduring beauty brand system with soft edges, sharp hierarchy, tactile details, and modular packaging across multiple cosmetic categories.",
    strategy:
      "Holistic beauty identity, material specification (frosted glass, debossed cartons, matte soft-touch finishes), and editorial digital presence.",
    creative_direction:
      "Warm creamy tones, serene studio lighting, minimal typography, and luminous skin-first photography.",
    execution:
      "Delivered comprehensive packaging artwork for body butter, cream, serum, sheet masks, and handcrafted soap bars.",
    services_delivered: [
      "Brand identity",
      "Product visuals",
      "Packaging",
      "Content",
      "E-commerce",
    ],
    results: "Comprehensive identity system and print-ready packaging artwork finalized.",
    gallery: [
      {
        image_url: "/assets/work/lumora/lumora-01.png",
        caption: "Lumora body butter container packaging and luminous identity.",
      },
      {
        image_url: "/assets/work/lumora/lumora-02.png",
        caption: "Lumora cream, serum dropper and ritual skincare line.",
      },
      {
        image_url: "/assets/work/lumora/lumora-03.png",
        caption: "Lumora sheet mask and artisanal soap box packaging system.",
      },
    ],
  },
  "lumora-beauty": {
    title: "LUMORA",
    client_name: "Lumora",
    category: "Packaging Design",
    type: "BEAUTY / BRANDING / DIGITAL",
    tagline: "A luminous identity built to make everyday rituals feel considered.",
    cover_image: "/assets/work/lumora/lumora-01.png",
    industry: "Beauty, Packaging & Cosmetics",
    location: "Global",
    client_introduction:
      "A complete beauty system spanning identity, packaging and an editorial e-commerce world. Soft edges, sharp hierarchy, tactile details.",
    business_challenge:
      "Creating an unmistakable shelf presence and tactile luxury feel for everyday bath and skincare rituals in a crowded beauty landscape.",
    objectives:
      "Build an enduring beauty brand system with soft edges, sharp hierarchy, tactile details, and modular packaging across multiple cosmetic categories.",
    strategy:
      "Holistic beauty identity, material specification (frosted glass, debossed cartons, matte soft-touch finishes), and editorial digital presence.",
    creative_direction:
      "Warm creamy tones, serene studio lighting, minimal typography, and luminous skin-first photography.",
    execution:
      "Delivered comprehensive packaging artwork for body butter, cream, serum, sheet masks, and handcrafted soap bars.",
    services_delivered: [
      "Brand identity",
      "Product visuals",
      "Packaging",
      "Content",
      "E-commerce",
    ],
    results: "Comprehensive identity system and print-ready packaging artwork finalized.",
    gallery: [
      {
        image_url: "/assets/work/lumora/lumora-01.png",
        caption: "Lumora body butter container packaging and luminous identity.",
      },
      {
        image_url: "/assets/work/lumora/lumora-02.png",
        caption: "Lumora cream, serum dropper and ritual skincare line.",
      },
      {
        image_url: "/assets/work/lumora/lumora-03.png",
        caption: "Lumora sheet mask and artisanal soap box packaging system.",
      },
    ],
  },
  "before-fall": {
    title: "BEFORE FALL",
    client_name: "Before Fall",
    category: "Branding & Identity",
    type: "HAIRCARE / BRAND IDENTITY",
    tagline: "Approved source capture pending — concept direction retained without fabricated visuals.",
    cover_image: "/assets/work/before-fall/before-fall-01.png",
    industry: "Haircare & Scalp Wellness",
    location: "Global",
    client_introduction:
      "A self-initiated haircare identity direction exploring clinical efficacy, natural botanical ingredients, and preventive scalp wellness.",
    business_challenge:
      "Haircare brands often vacillate between cold sterile pharmaceutical looks and generic organic themes. Before Fall bridges science and calm editorial sophistication.",
    objectives:
      "Develop a rigorous haircare brand identity, typographic packaging system, and campaign concept.",
    strategy:
      "Evidence-led brand positioning, clinical yet tactile packaging language, and clean typography.",
    creative_direction:
      "Deep botanical greens, stark off-white packaging, structured grotesque typography, and high-clarity ingredient hierarchy.",
    execution:
      "Crafted bottle labels, outer cartons, and campaign art direction.",
    services_delivered: [
      "Identity",
      "Typography",
      "Packaging",
      "Campaign concepts",
    ],
    results: "Self-initiated concept direction retained and documented.",
    gallery: [
      {
        image_url: "/assets/work/before-fall/before-fall-01.png",
        caption: "Before Fall haircare identity and product presentation.",
      },
      {
        image_url: "/assets/work/before-fall/before-fall-02.png",
        caption: "Before Fall typographic packaging and formulation detail.",
      },
      {
        image_url: "/assets/work/before-fall/before-fall-03.png",
        caption: "Before Fall bottle presentation and editorial art direction.",
      },
    ],
  },
  "raya": {
    title: "RAYA",
    client_name: "Raya Skincare",
    category: "Branding & Identity",
    type: "SKINCARE / BRAND SYSTEM",
    tagline: "A self-initiated skincare brand system exploring identity, packaging, social and digital experience.",
    cover_image: "/assets/work/raya/raya-01.png",
    industry: "Beauty & Personal Care",
    location: "Mumbai, India",
    client_introduction:
      "A skincare brand system prepared across identity, packaging, social and digital experience.",
    business_challenge:
      "The skincare market is crowded with brands using similar packaging, colours, and marketing messages. The challenge was to create a visual identity that stands out in a competitive skincare market, communicates simplicity and trust, and creates a recognizable brand personality.",
    objectives:
      "Develop a coherent brand identity that positions Raya as a trusted, accessible premium skincare ritual — establishing aesthetic differentiation across product packaging and digital channels.",
    strategy:
      "Brand Positioning: Position Raya as a modern skincare brand that combines simplicity, everyday care, and a clean visual experience. Visual Identity: Minimalist logo design, soft, nature-inspired colour palette, clean and modern typography, simple graphic elements, and a consistent packaging system.",
    creative_direction:
      "Developing a cohesive packaging language across skincare products, ensuring consistency in bottle design, labels, typography, and product communication.",
    execution:
      "We articulated the complete brand system: minimal identity mark, cohesive bottle and jar packaging templates, brand style guide, and digital campaign art direction.",
    services_delivered: [
      "Identity",
      "Packaging",
      "Social",
      "Concept",
    ],
    results: "Self-initiated concept project.",
    gallery: [
      {
        image_url: "/assets/work/raya/raya-01.png",
        caption: "Raya core bottle packaging and botanical silhouette.",
      },
      {
        image_url: "/assets/work/raya/raya-02.png",
        caption: "Raya serum dropper bottle and label detail.",
      },
      {
        image_url: "/assets/work/raya/raya-03.png",
        caption: "Raya moisturizing cream jar and packaging presentation.",
      },
    ],
  },
  "raya-skincare": {
    title: "RAYA",
    client_name: "Raya Skincare",
    category: "Branding & Identity",
    type: "SKINCARE / BRAND SYSTEM",
    tagline: "A self-initiated skincare brand system exploring identity, packaging, social and digital experience.",
    cover_image: "/assets/work/raya/raya-01.png",
    industry: "Beauty & Personal Care",
    location: "Mumbai, India",
    client_introduction:
      "A skincare brand system prepared across identity, packaging, social and digital experience.",
    business_challenge:
      "The skincare market is crowded with brands using similar packaging, colours, and marketing messages. The challenge was to create a visual identity that stands out in a competitive skincare market, communicates simplicity and trust, and creates a recognizable brand personality.",
    objectives:
      "Develop a coherent brand identity that positions Raya as a trusted, accessible premium skincare ritual — establishing aesthetic differentiation across product packaging and digital channels.",
    strategy:
      "Brand Positioning: Position Raya as a modern skincare brand that combines simplicity, everyday care, and a clean visual experience. Visual Identity: Minimalist logo design, soft, nature-inspired colour palette, clean and modern typography, simple graphic elements, and a consistent packaging system.",
    creative_direction:
      "Developing a cohesive packaging language across skincare products, ensuring consistency in bottle design, labels, typography, and product communication.",
    execution:
      "We articulated the complete brand system: minimal identity mark, cohesive bottle and jar packaging templates, brand style guide, and digital campaign art direction.",
    services_delivered: [
      "Identity",
      "Packaging",
      "Social",
      "Concept",
    ],
    results: "Self-initiated concept project.",
    gallery: [
      {
        image_url: "/assets/work/raya/raya-01.png",
        caption: "Raya core bottle packaging and botanical silhouette.",
      },
      {
        image_url: "/assets/work/raya/raya-02.png",
        caption: "Raya serum dropper bottle and label detail.",
      },
      {
        image_url: "/assets/work/raya/raya-03.png",
        caption: "Raya moisturizing cream jar and packaging presentation.",
      },
    ],
  },
  "13isu": {
    title: "13ISU",
    client_name: "13ISU",
    category: "Branding & Identity",
    type: "DESSERT / BRAND IDENTITY / SOCIAL CREATIVE",
    tagline: "Turning a Dessert Into a Brand Experience.",
    cover_image: "/13isu-creative-1.png",
    industry: "Food & Beverage / Speciality Dessert",
    location: "Vadodara, Gujarat, India",
    client_introduction:
      "13ISU is a speciality dessert brand built around one signature product: Tiramisu. The ambition was to create more than another dessert business. The brand needed a distinctive identity, an engaging digital presence and a recognisable personality that customers could connect with. Sole Trust Media worked on bringing the brand's identity and creative communication together, helping establish its presence in the local dessert market. Our approach combined brand thinking, visual creativity and social media marketing to create a consistent brand experience.",
    business_challenge:
      "Entering the food and beverage market with a speciality product requires more than simply offering something delicious. The brand needed to capture attention, communicate its speciality and give people a reason to remember it. Key challenges included: building a recognisable identity around a single speciality product, creating a distinctive brand personality, making the product visually appealing through creative presentation, developing consistent social media communication, generating awareness and interest around the brand, and establishing a connection with the local audience. Central challenge: How do we make a speciality dessert brand stand out and become memorable?",
    objectives:
      "Create a distinctive brand experience around Tiramisu, make the product visually appealing, connect brand thinking with social media marketing, and give audiences a memorable reason to connect with the brand.",
    strategy:
      "A cohesive four-stage approach: A) Brand Building: Establishing personality, emotional positioning ('Your sweetest saviour for tough days'), and visual direction. B) Product Presentation: Creative framing that makes Tiramisu visually desirable. C) Social Media Communication: Purposeful content designed to highlight the product, introduce the brand, and encourage interest. D) Digital Visibility: Using Instagram as the key platform to capture audience attention.",
    creative_direction:
      "The Idea Behind the Name: For 13ISU, the idea started with the number 13, known as 'Terah' in Hindi. We combined this number with the letters I-S-U to create the distinctive name 13ISU. In typography, the number 3 is visually interpreted as an M, creating a unique connection between numbers and lettering. The visual identity features a signature lavender and purple palette, dessert-focused visual communication, consistent promotional layouts, and an approachable, youthful tone anchored by the line: 'Your sweetest saviour for tough days.' Rather than positioning Tiramisu as just another dessert, the brand presented it as a little moment of happiness during a difficult day.",
    execution:
      "We developed comprehensive brand communication: opening announcements, product-led promotional creatives, brand introduction collateral, dessert-focused content, occasion-based promotional communication, packaging box presentation, large-format event display boards, and customer-facing video direction.",
    approach: [
      "01 Project Overview & Ambition",
      "02 Speciality Dessert Market Challenge",
      "03 'Terah' + 'ISU' Typographic Concept",
      "04 Lavender & Purple Visual System",
      "05 4-Pillar Integrated Strategy",
      "06 Promotional Campaigns & Viral Reels",
      "07 100K+ Views Digital Impact",
      "08 End-to-End Brand Experience",
    ],
    brand_personality: [
      { element: "Personality", direction: "Playful, indulgent, youthful, comforting" },
      { element: "Emotional Hook", direction: "Your sweetest saviour for tough days" },
      { element: "Visual Palette", direction: "Lavender, rich purple, warm dessert tones" },
      { element: "Typography", direction: "Distinctive display with 3/M typographic interplay" },
      { element: "Core Product", direction: "Single-speciality handcrafted Tiramisu" },
      { element: "Positioning", direction: "A little moment of happiness during a difficult day" },
    ],
    services_delivered: [
      "Brand concept (Naming and positioning direction)",
      "Brand identity (Visual identity development)",
      "Creative direction (Brand visual language)",
      "Packaging design (Packaging concepts and presentation)",
      "Social media creatives (Promotional communication)",
      "Content direction (Product-focused storytelling)",
      "Digital marketing (Instagram visibility & viral reels)",
    ],
    results:
      "100K+ VIEWS IN JUST 3 DAYS. The 13ISU Instagram account achieved over 100,000 views within three days, based on the account dashboard shared with STM. This created significant early digital visibility for the brand, packed night-market activation crowds, and established a unified creative foundation.",
    gallery: [
      {
        image_url: "/13isu-creative-1.png",
        caption: "Night-market activation setup and booth display for the 13ISU tiramisu launch.",
      },
      {
        image_url: "/13isu-creative-2.png",
        caption: "Custom packaging design and product presentation detail from the 13ISU launch.",
      },
      {
        image_url: "/13isu-creative-3.png",
        caption: "The large-format display board used to create a memorable event presence.",
      },
    ],
    sources: [
      {
        title: "Official 13ISU Case Study Document",
        description: "Download or view the official 13ISU Case Study document (PDF).",
        href: "/13ISU.pdf",
      },
    ],
  },
  "trends-are-a-tool": {
    title: "Trends Are a Tool, Not a Strategy",
    client_name: "Sole Trust Media",
    category: "Creative Direction & Strategy",
    type: "STRATEGY / SOCIAL COMMERCE / CONTENT ARCHITECTURE",
    tagline: "People are watching your posts. So why aren’t they buying?",
    cover_image: "/assets/work/trends-are-a-tool/trends-cover.svg",
    industry: "Retail, Hospitality, Direct-to-Consumer & Services",
    location: "Bengaluru, India",
    client_introduction:
      "For any business that sells to customers. Based on two years of watching how businesses use social media. Every business is making content now: good cameras, good editing, trending audios. And still the owner says: 'Views are coming. Customers are not.' Here is what we keep seeing: businesses choose what to post by looking at what is trending, not at who they are posting for. A trend is a good tool. It is a bad strategy.",
    business_challenge:
      "Views are not customers. Take two clothing stores: Store A posts a funny trending Reel and gets 100,000 views from people far away or uninterested, resulting in lots of likes but few enquiries. Store B posts how to choose a comfortable outfit for a family function and gets 8,000 views from local women planning to buy, resulting in fewer views but far more enquiries and paying customers. The challenge: don't only ask 'how many saw it?' Ask: did the right people see it, understand it and message us?",
    objectives:
      "Establish a customer-first content operating system that translates social attention into real commercial revenue, removes friction from customer response pathways, and focuses on enquiries per 1,000 reach rather than vanity metrics.",
    strategy:
      "The 5-Step Strategic Blueprint: 1. Know the business (what it sells, what makes it different, what it wants). 2. Know the customer (not just 'women aged 18 to 35', but what she worries about, who pays, who influences her). 3. Decide what the brand should feel like (warm, premium, funny, helpful — then actually be that in captions and replies). 4. Give every post a reason (solve a problem, tell the story, explain the product, show real customers, and only then promote). 5. Make buying easy, then check the numbers.",
    creative_direction:
      "Customer before content. Personality before production. Relationships before reach. We enforce a 4-question decision gate before using any trend: 1) Does it fit our brand's personality? 2) Will our customers understand it? 3) Can we connect it honestly to our product? 4) Does it support what we want to say? If all four are yes, use it; otherwise, change it or skip it. If people only recognise your brand when it uses a viral audio, you don't have an identity yet.",
    execution:
      "We codified customer-first transformations across business verticals (Kashmiri kurta stores, restaurants, coaching institutes, gyms, beauty brands, online retail), established profile response SOPs (prices, location, WhatsApp button, quick replies within 1 hour), and designed the full-funnel measurement telemetry: Reach → profile visits and saves → DMs and calls per 1,000 reach → enquiries that become sales → customers who come back.",
    approach: [
      "01 The Vanity Metric Paradox (Views vs. Customers)",
      "02 The 5-Step Customer-Centric Framework",
      "03 Cross-Industry Post Transformation Matrix",
      "04 The 4-Question Trend Decision Gate",
      "05 Friction Audit & Rapid DM Response Protocols",
      "06 Enquiries-Per-1,000-Reach Measurement Model",
    ],
    brand_personality: [
      { element: "Axiom 1", direction: "Customer before content" },
      { element: "Axiom 2", direction: "Personality before production" },
      { element: "Axiom 3", direction: "Relationships before reach" },
      { element: "Core Metric", direction: "Enquiries per 1,000 reach (not vanity impressions)" },
      { element: "Conversion Gate", direction: "Under-1-hour inquiry reply speed with saved quick responses" },
      { element: "Trend Policy", direction: "A trend is a useful tool, never a standalone strategy" },
    ],
    services_delivered: [
      "Content Strategy",
      "Creative Direction",
      "Customer Journey Mapping",
      "Social Commerce Optimization",
      "Brand Communication Guidelines",
      "Funnel Analytics & Measurement",
    ],
    results:
      "A tested strategic operating model adopted across Sole Trust Media client campaigns, consistently generating higher customer acquisition and higher revenue with lower vanity ad spend.",
    gallery: [
      {
        image_url: "/assets/work/trends-are-a-tool/trends-cover.svg",
        caption: "Trends Are a Tool, Not a Strategy — Strategic comparison of vanity reach vs. customer conversion.",
      },
    ],
    sources: [
      {
        title: "Download Strategic Paper",
        description: "Download the original strategic docx: 'Trends Are a Tool, Not a Strategy'.",
        href: "/Trends Are a Tool, Not a Strategy.docx",
      },
    ],
  },
  "trends-are-a-tool-not-a-strategy": {
    title: "Trends Are a Tool, Not a Strategy",
    client_name: "Sole Trust Media",
    category: "Creative Direction & Strategy",
    type: "STRATEGY / SOCIAL COMMERCE / CONTENT ARCHITECTURE",
    tagline: "People are watching your posts. So why aren’t they buying?",
    cover_image: "/assets/work/trends-are-a-tool/trends-cover.svg",
    industry: "Retail, Hospitality, Direct-to-Consumer & Services",
    location: "Bengaluru, India",
    client_introduction:
      "For any business that sells to customers. Based on two years of watching how businesses use social media. Every business is making content now: good cameras, good editing, trending audios. And still the owner says: 'Views are coming. Customers are not.' Here is what we keep seeing: businesses choose what to post by looking at what is trending, not at who they are posting for. A trend is a good tool. It is a bad strategy.",
    business_challenge:
      "Views are not customers. Take two clothing stores: Store A posts a funny trending Reel and gets 100,000 views from people far away or uninterested, resulting in lots of likes but few enquiries. Store B posts how to choose a comfortable outfit for a family function and gets 8,000 views from local women planning to buy, resulting in fewer views but far more enquiries and paying customers. The challenge: don't only ask 'how many saw it?' Ask: did the right people see it, understand it and message us?",
    objectives:
      "Establish a customer-first content operating system that translates social attention into real commercial revenue, removes friction from customer response pathways, and focuses on enquiries per 1,000 reach rather than vanity metrics.",
    strategy:
      "The 5-Step Strategic Blueprint: 1. Know the business (what it sells, what makes it different, what it wants). 2. Know the customer (not just 'women aged 18 to 35', but what she worries about, who pays, who influences her). 3. Decide what the brand should feel like (warm, premium, funny, helpful — then actually be that in captions and replies). 4. Give every post a reason (solve a problem, tell the story, explain the product, show real customers, and only then promote). 5. Make buying easy, then check the numbers.",
    creative_direction:
      "Customer before content. Personality before production. Relationships before reach. We enforce a 4-question decision gate before using any trend: 1) Does it fit our brand's personality? 2) Will our customers understand it? 3) Can we connect it honestly to our product? 4) Does it support what we want to say? If all four are yes, use it; otherwise, change it or skip it. If people only recognise your brand when it uses a viral audio, you don't have an identity yet.",
    execution:
      "We codified customer-first transformations across business verticals (Kashmiri kurta stores, restaurants, coaching institutes, gyms, beauty brands, online retail), established profile response SOPs (prices, location, WhatsApp button, quick replies within 1 hour), and designed the full-funnel measurement telemetry: Reach → profile visits and saves → DMs and calls per 1,000 reach → enquiries that become sales → customers who come back.",
    approach: [
      "01 The Vanity Metric Paradox (Views vs. Customers)",
      "02 The 5-Step Customer-Centric Framework",
      "03 Cross-Industry Post Transformation Matrix",
      "04 The 4-Question Trend Decision Gate",
      "05 Friction Audit & Rapid DM Response Protocols",
      "06 Enquiries-Per-1,000-Reach Measurement Model",
    ],
    brand_personality: [
      { element: "Axiom 1", direction: "Customer before content" },
      { element: "Axiom 2", direction: "Personality before production" },
      { element: "Axiom 3", direction: "Relationships before reach" },
      { element: "Core Metric", direction: "Enquiries per 1,000 reach (not vanity impressions)" },
      { element: "Conversion Gate", direction: "Under-1-hour inquiry reply speed with saved quick responses" },
      { element: "Trend Policy", direction: "A trend is a useful tool, never a standalone strategy" },
    ],
    services_delivered: [
      "Content Strategy",
      "Creative Direction",
      "Customer Journey Mapping",
      "Social Commerce Optimization",
      "Brand Communication Guidelines",
      "Funnel Analytics & Measurement",
    ],
    results:
      "A tested strategic operating model adopted across Sole Trust Media client campaigns, consistently generating higher customer acquisition and higher revenue with lower vanity ad spend.",
    gallery: [
      {
        image_url: "/assets/work/trends-are-a-tool/trends-cover.svg",
        caption: "Trends Are a Tool, Not a Strategy — Strategic comparison of vanity reach vs. customer conversion.",
      },
    ],
    sources: [
      {
        title: "Download Strategic Paper",
        description: "Download the original strategic docx: 'Trends Are a Tool, Not a Strategy'.",
        href: "/Trends Are a Tool, Not a Strategy.docx",
      },
    ],
  },
  "stm-music": {
    title: "STM MUSIC GROUP",
    client_name: "STM Music Group",
    category: "Creative & Content",
    type: "MUSIC / ARTIST MANAGEMENT / EVENTS",
    tagline: "Artist management, music marketing, content, release campaigns and events.",
    cover_image: "/assets/work/stm-music/stm-music-01.png",
    industry: "Music, Artist Management & Entertainment",
    location: "Global & India",
    client_introduction:
      "A selected archive of artist-focused creative work, music marketing, content, release campaigns and events created through STM Music Group.",
    business_challenge:
      "Independent musicians need distinctive visual universes and rhythmic social momentum to pierce through streaming noise and build loyal live audiences.",
    objectives:
      "Produce comprehensive release packages, artist image direction, short-form viral reels, and live event production.",
    strategy:
      "Single and album release rollouts, high-velocity Instagram and YouTube short-form content, live concert activation, and community cultivation.",
    creative_direction:
      "High-contrast stage lighting, gritty cinematic camera work, bold typography, and authentic artist storytelling.",
    execution:
      "Executed single launch campaigns, stage presence direction, and short-form video content delivering tens of thousands of organic impressions.",
    services_delivered: [
      "Artist management",
      "Music marketing",
      "Content",
      "Release campaigns",
      "Events",
    ],
    results: "Documented artist releases and high-performing social video campaigns.",
    gallery: [
      {
        image_url: "/assets/work/stm-music/stm-music-01.png",
        caption: "STM Music artist campaign rollout and visual identity.",
      },
      {
        image_url: "/assets/work/stm-music/stm-music-02.png",
        caption: "Live concert event production and stage lighting.",
      },
      {
        image_url: "/assets/work/stm-music/stm-music-03.png",
        caption: "Artist release collateral and digital streaming campaign.",
      },
    ],
  },
  "stm-music-group": {
    title: "STM MUSIC GROUP",
    client_name: "STM Music Group",
    category: "Creative & Content",
    type: "MUSIC / ARTIST MANAGEMENT / EVENTS",
    tagline: "Artist management, music marketing, content, release campaigns and events.",
    cover_image: "/assets/work/stm-music/stm-music-01.png",
    industry: "Music, Artist Management & Entertainment",
    location: "Global & India",
    client_introduction:
      "A selected archive of artist-focused creative work, music marketing, content, release campaigns and events created through STM Music Group.",
    business_challenge:
      "Independent musicians need distinctive visual universes and rhythmic social momentum to pierce through streaming noise and build loyal live audiences.",
    objectives:
      "Produce comprehensive release packages, artist image direction, short-form viral reels, and live event production.",
    strategy:
      "Single and album release rollouts, high-velocity Instagram and YouTube short-form content, live concert activation, and community cultivation.",
    creative_direction:
      "High-contrast stage lighting, gritty cinematic camera work, bold typography, and authentic artist storytelling.",
    execution:
      "Executed single launch campaigns, stage presence direction, and short-form video content delivering tens of thousands of organic impressions.",
    services_delivered: [
      "Artist management",
      "Music marketing",
      "Content",
      "Release campaigns",
      "Events",
    ],
    results: "Documented artist releases and high-performing social video campaigns.",
    gallery: [
      {
        image_url: "/assets/work/stm-music/stm-music-01.png",
        caption: "STM Music artist campaign rollout and visual identity.",
      },
      {
        image_url: "/assets/work/stm-music/stm-music-02.png",
        caption: "Live concert event production and stage lighting.",
      },
      {
        image_url: "/assets/work/stm-music/stm-music-03.png",
        caption: "Artist release collateral and digital streaming campaign.",
      },
    ],
  },
  "sole-trust-media": {
    title: "Sole Trust Media",
    client_name: "Sole Trust Media",
    category: "Website Development",
    type: "Agency identity / Digital experience",
    cover_image: "/assets/work/future-luxe/future-luxe-01.png",
    client_introduction:
      "Sole Trust Media is a creative, technology and business growth agency based in Bengaluru. This project is our own brand — the digital home for our strategy, creativity and technology work.",
    business_challenge:
      "As a new agency, STM needed to establish a credible digital presence that communicated the breadth of our capabilities and attracted the right clients from day one.",
    objectives:
      "Design and develop a website that positions STM as a premium creative and technology agency — one that communicates strategic thinking, creative capability and technical execution.",
    strategy:
      "The strategy centred on building a website that showed, rather than simply told. The focus was on strong editorial design, clear communication of services and an honest representation of the work.",
    creative_direction:
      "Editorial minimalism with strong typographic hierarchy. The cream-and-brown palette communicates warmth and sophistication. The layout draws on the aesthetic of premium creative publications.",
    execution:
      "We designed and developed the complete website using Next.js and Supabase — building a system that can grow with the agency, support case studies and manage client enquiries.",
    services_delivered: [
      "Brand Strategy",
      "UI/UX Design",
      "Website Development",
      "Content Strategy",
      "SEO Foundations",
    ],
    results: "Live digital flagship for Sole Trust Media.",
    gallery: [],
  },
}

export function generateStaticParams() {
  return [
    { slug: "future-luxe" },
    { slug: "twine" },
    { slug: "aurelia" },
    { slug: "aurelune" },
    { slug: "psychology-with-mitali" },
    { slug: "asha-tiffin" },
    { slug: "asha-tiffins" },
    { slug: "chainmind-ai" },
    { slug: "farmlytics" },
    { slug: "ninas-beauty-hub" },
    { slug: "nina-beauty" },
    { slug: "lumora" },
    { slug: "lumora-beauty" },
    { slug: "before-fall" },
    { slug: "raya" },
    { slug: "raya-skincare" },
    { slug: "13isu" },
    { slug: "trends-are-a-tool" },
    { slug: "trends-are-a-tool-not-a-strategy" },
    { slug: "stm-music" },
    { slug: "stm-music-group" },
    { slug: "sole-trust-media" },
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const staticProject = staticData[slug] || getProjectBySlug(slug)
  const title = staticProject ? `${staticProject.title || (staticProject as any).name} — Sole Trust Media` : "Case Study — Sole Trust Media"
  const description =
    staticProject?.client_introduction ??
    (staticProject as any)?.description ??
    "Case study by Sole Trust Media."
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

  // 2. Fall back to static data or lib/data/projects
  const fallbackProject = staticData[slug] || (getProjectBySlug(slug) as any)

  // Return 404-equivalent for unknown slugs: redirect to /work
  if (!dbProject && !fallbackProject) {
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
    fallbackProject?.services_delivered ??
    fallbackProject?.services ??
    []

  const servicesDelivered: string[] = Array.isArray(rawServices)
    ? rawServices
    : typeof rawServices === "string"
    ? rawServices.split(",").map((s: string) => s.trim()).filter(Boolean)
    : []

  const rawGallery =
    dbProject?.project_gallery ??
    caseStudyRel?.gallery ??
    fallbackProject?.gallery ??
    []

  const galleryItems: Array<{ image_url: string; caption?: string }> = Array.isArray(rawGallery)
    ? rawGallery
    : []
  const projectSources = fallbackProject?.sources ?? []
  const projectAssets = fallbackProject?.assets ?? []

  const project: CaseStudyData = {
    title: String(dbProject?.title ?? dbProject?.name ?? fallbackProject?.title ?? fallbackProject?.name ?? ""),
    client_name: String(dbProject?.client_name ?? dbProject?.name ?? fallbackProject?.client_name ?? ""),
    category: String(dbProject?.category ?? fallbackProject?.category ?? "Selected Work"),
    type: String(
      dbProject?.type ??
      caseStudyRel?.type ??
      fallbackProject?.type ??
      dbProject?.category ??
      ""
    ),
    cover_image: String(
      dbProject?.cover_image ??
      dbProject?.image ??
      fallbackProject?.cover_image ??
      "/placeholder.jpg"
    ),
    tagline: fallbackProject?.tagline || fallbackProject?.note,
    brand_personality: fallbackProject?.brand_personality,
    industry: fallbackProject?.industry,
    location: fallbackProject?.location,
    client_introduction: String(
      caseStudyRel?.client_introduction ??
      dbProject?.client_introduction ??
      dbProject?.short_description ??
      dbProject?.overview ??
      fallbackProject?.client_introduction ??
      fallbackProject?.description ??
      ""
    ),
    business_challenge: String(
      caseStudyRel?.business_challenge ??
      dbProject?.business_challenge ??
      fallbackProject?.business_challenge ??
      fallbackProject?.note ??
      ""
    ),
    objectives: String(
      caseStudyRel?.objectives ??
      dbProject?.objectives ??
      fallbackProject?.objectives ??
      ""
    ),
    strategy: String(
      caseStudyRel?.strategy ??
      dbProject?.strategy ??
      fallbackProject?.strategy ??
      ""
    ),
    creative_direction: String(
      caseStudyRel?.creative_direction ??
      dbProject?.creative_direction ??
      fallbackProject?.creative_direction ??
      ""
    ),
    execution: String(
      caseStudyRel?.execution ??
      dbProject?.execution ??
      fallbackProject?.execution ??
      ""
    ),
    services_delivered: servicesDelivered,
    results: String(
      caseStudyRel?.results ??
      dbProject?.results ??
      fallbackProject?.results ??
      "Documented work by Sole Trust Media."
    ),
    gallery: galleryItems,
    sources: projectSources,
    assets: projectAssets,
    live_url: fallbackProject?.live_url || fallbackProject?.link || fallbackProject?.website,
    cta_label: fallbackProject?.cta_label || fallbackProject?.cta || "OPEN LIVE WEBSITE",
  }

  return (
    <main className="site-shell">
      <SiteNav />

      {/* 2. Hero section */}
      <section className="case-hero">
        <a className="text-link" href="/work">
          <ArrowLeft data-icon="inline-start" /> Back to work
        </a>
        <p className="eyebrow">{project.category}</p>
        <h1>{project.title}</h1>
        {project.tagline && (
          <p
            className="case-tagline"
            style={{
              fontStyle: "italic",
              fontSize: "clamp(18px, 2.2vw, 26px)",
              fontFamily: "'Playfair Display', serif",
              margin: "16px 0 24px",
              color: "var(--brown)",
              maxWidth: "760px",
              lineHeight: 1.35,
            }}
          >
            &ldquo;{project.tagline}&rdquo;
          </p>
        )}
        <p>{project.type}</p>
        {project.live_url && (
          <div style={{ marginTop: "28px" }}>
            <a
              className="button button-dark"
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.cta_label || "OPEN LIVE WEBSITE"} <ArrowUpRight data-icon="inline-end" />
            </a>
          </div>
        )}
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
              Year<strong>2026</strong>
            </span>
            <span>
              Discipline<strong>{project.category}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* 6. Challenge & Objectives section */}
      {(project.business_challenge || project.objectives) && (
        <section className="case-challenge section-grid">
          <div className="section-label">02 / Challenge</div>
          <div className="challenge-columns">
            {project.business_challenge && (
              <div>
                <h3>The Challenge</h3>
                <p>{project.business_challenge}</p>
              </div>
            )}
            {project.objectives && (
              <div>
                <h3>The Objectives</h3>
                <p>{project.objectives}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 7. Strategy section */}
      {project.strategy && (
        <section className="case-strategy section-grid">
          <div className="section-label">03 / Strategy</div>
          <div>
            <h3>The Strategic Approach</h3>
            <p>{project.strategy}</p>
          </div>
        </section>
      )}

      {/* 8. Creative Direction & Brand Personality section */}
      {project.creative_direction && (
        <section className="case-creative section-grid">
          <div className="section-label">04 / Creative Direction</div>
          <div>
            <h3>Visual Direction &amp; Systems</h3>
            <p>{project.creative_direction}</p>
          </div>
        </section>
      )}

      {/* 9. Execution & Services Delivered section */}
      <section className="case-execution section-grid">
        <div className="section-label">05 / Execution</div>
        <div>
          <h3>What We Built</h3>
          <p>{project.execution || "Architected and delivered the complete creative and technical system."}</p>
          {project.services_delivered.length > 0 && (
            <div className="services-list">
              <h4>Services Delivered</h4>
              <ul>
                {project.services_delivered.map((service, idx) => (
                  <li key={idx}>{service}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* 10. Results section */}
      <section className="case-results section-grid">
        <div className="section-label">06 / Results</div>
        <div className="results-box">
          <h3>The Outcome</h3>
          <p>{project.results}</p>
          {project.live_url && (
            <div style={{ marginTop: "24px" }}>
              <a
                className="button button-dark"
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.cta_label || "Open Live Website"} <ArrowUpRight data-icon="inline-end" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* 11. Project Gallery section */}
      {project.gallery.length > 0 && (
        <section className="case-gallery">
          <div className="section-label" style={{ padding: "0 4vw 40px" }}>
            07 / Visual Evidence
          </div>
          <div className="gallery-grid">
            {project.gallery.map((item, idx) => (
              <figure key={idx} className="gallery-item">
                <img
                  src={item.image_url}
                  alt={item.caption || `${project.title} preview ${idx + 1}`}
                  loading="lazy"
                />
                {item.caption && <figcaption>{item.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* 12. Sources / External Links */}
      {project.sources && project.sources.length > 0 && (
        <section className="case-sources section-grid">
          <div className="section-label">08 / References</div>
          <div className="sources-list">
            <h3>Verified Documents</h3>
            {project.sources.map((source, idx) => (
              <a
                key={idx}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="source-card"
              >
                <div>
                  <strong>{source.title}</strong>
                  <p>{source.description}</p>
                </div>
                <ArrowUpRight />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* 13. Statement / Contact CTA banner */}
      <section className="statement">
        <div className="statement-inner">
          <p className="eyebrow">Ready to begin?</p>
          <h2>
            Let&apos;s build something<br />
            <i>that endures.</i>
          </h2>
          <a className="button button-dark" href="/#contact">
            Start a conversation <ArrowUpRight data-icon="inline-end" />
          </a>
        </div>
      </section>

      {/* 14. Footer */}
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
