-- Sole Trust Media - Database Schema Migration
-- Run this in your Supabase SQL Editor

-- ============================================================
-- PROJECTS TABLE
-- ============================================================
create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  client_name text,
  category text not null default 'Branding & Identity',
  short_description text,
  cover_image text,
  featured boolean default false,
  status text default 'draft' check (status in ('draft', 'published')),
  display_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- CASE STUDIES TABLE
-- ============================================================
create table if not exists case_studies (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references projects(id) on delete cascade unique,
  client_introduction text,
  business_challenge text,
  objectives text,
  strategy text,
  creative_direction text,
  execution text,
  services_delivered text[],
  results text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- PROJECT GALLERY TABLE
-- ============================================================
create table if not exists project_gallery (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references projects(id) on delete cascade,
  image_url text not null,
  image_caption text,
  display_order int default 0
);

-- ============================================================
-- ENQUIRIES TABLE
-- ============================================================
create table if not exists enquiries (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  company_name text,
  email text not null,
  phone text,
  services_required text[],
  budget text,
  project_description text,
  status text default 'new' check (status in ('new', 'contacted', 'in_discussion', 'converted', 'closed')),
  internal_notes text,
  created_at timestamptz default now()
);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger projects_updated_at before update on projects
  for each row execute function update_updated_at();

create trigger case_studies_updated_at before update on case_studies
  for each row execute function update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table projects enable row level security;
alter table case_studies enable row level security;
alter table project_gallery enable row level security;
alter table enquiries enable row level security;

-- Drop existing policies if they exist (safe re-run)
drop policy if exists "public_read_projects" on projects;
drop policy if exists "admin_all_projects" on projects;
drop policy if exists "public_read_case_studies" on case_studies;
drop policy if exists "admin_all_case_studies" on case_studies;
drop policy if exists "public_read_gallery" on project_gallery;
drop policy if exists "admin_all_gallery" on project_gallery;
drop policy if exists "public_insert_enquiries" on enquiries;
drop policy if exists "admin_all_enquiries" on enquiries;

-- Public can read published projects only
create policy "public_read_projects" on projects 
  for select using (status = 'published');

-- Authenticated users (admins) have full access to projects
create policy "admin_all_projects" on projects 
  for all using (auth.role() = 'authenticated');

-- Public can read case studies (filtered by project visibility)
create policy "public_read_case_studies" on case_studies 
  for select using (true);

-- Admins have full access to case studies
create policy "admin_all_case_studies" on case_studies 
  for all using (auth.role() = 'authenticated');

-- Public can read gallery images
create policy "public_read_gallery" on project_gallery 
  for select using (true);

-- Admins have full access to gallery
create policy "admin_all_gallery" on project_gallery 
  for all using (auth.role() = 'authenticated');

-- Public can submit enquiries
create policy "public_insert_enquiries" on enquiries 
  for insert with check (true);

-- Admins have full access to enquiries
create policy "admin_all_enquiries" on enquiries 
  for all using (auth.role() = 'authenticated');

-- ============================================================
-- SEED INITIAL PROJECTS
-- ============================================================
insert into projects (title, slug, client_name, category, short_description, cover_image, featured, status, display_order) 
values
  (
    'Raya Skincare',
    'raya-skincare',
    'Raya Skincare',
    'Branding & Identity',
    'Skincare that feels as natural as it looks — a conceptual brand built on simplicity, purity, and everyday care.',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85',
    true,
    'published',
    1
  ),
  (
    'Aurelune',
    'aurelune',
    'Aurelune',
    'Branding & Identity',
    'Elegance is not created. It is revealed — conceptual luxury branding, high-craft art direction, and packaging.',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85',
    true,
    'published',
    2
  ),
  (
    '13ISU', 
    '13isu', 
    '13ISU', 
    'Branding & Identity', 
    'A considered identity and packaging system built to make a new point of view feel unmistakable on shelf and on screen.',
    '/13isu-logo.svg',
    true, 
    'published', 
    3
  ),
  (
    'ChainMind AI',
    'chainmind-ai',
    'ChainMind AI',
    'Application Development',
    'Enterprise AI orchestration platform exploring AI-driven digital workflows, SaaS architecture, and modern tech branding.',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
    true,
    'published',
    4
  ),
  (
    'Farmlytics',
    'farmlytics',
    'Farmlytics',
    'Technology & Automation',
    'Data-driven AgriTech platform exploring the intersection of agricultural analytics, IoT sensors, and intuitive digital experiences.',
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=85',
    true,
    'published',
    5
  ),
  (
    'Nina''s Beauty Hub',
    'ninas-beauty-hub',
    'Nina''s Beauty Hub',
    'Digital Marketing',
    'Beauty industry brand project focused on visual presentation, omnichannel brand communication, and digital presence.',
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85',
    true,
    'published',
    6
  ),
  (
    'Asha Tiffin',
    'asha-tiffin',
    'Asha Tiffin',
    'Creative & Content',
    'Food business project celebrating home-cooked meal subscriptions with authentic brand positioning and customer-facing marketing.',
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=85',
    true,
    'published',
    7
  ),
  (
    'Psychology with Mitali',
    'psychology-with-mitali',
    'Psychology with Mitali',
    'Personal Branding',
    'Personal-brand project communicating psychology, emotional wellbeing, and educational content through an approachable digital identity.',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85',
    true,
    'published',
    8
  ),
  (
    'Lumora Beauty', 
    'lumora-beauty', 
    'Lumora Beauty', 
    'Packaging Design', 
    'A soft, expressive beauty world shaped around clarity, tactility and a confident everyday ritual.',
    'https://drive.google.com/uc?export=download&id=163Z7B0H5mx0OqzKJ-r2oGQZ4AQspqdDf',
    true, 
    'published', 
    9
  ),
  (
    'Sole Trust Media', 
    'sole-trust-media', 
    'Sole Trust Media', 
    'Website Development', 
    'Our own brand system: a digital home for strategy, creativity, marketing and technology.',
    'https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1200&q=85',
    true, 
    'published', 
    10
  )
on conflict (slug) do nothing;

-- ============================================================
-- SEED CASE STUDIES FOR INITIAL PROJECTS
-- ============================================================
insert into case_studies (project_id, client_introduction, business_challenge, objectives, strategy, creative_direction, execution, services_delivered, results)
select 
  p.id,
  'Raya Skincare is a conceptual skincare brand built around the idea of simplicity, natural beauty, and everyday skin nourishment.',
  'The skincare market is crowded with brands using similar packaging, colours, and marketing messages. The challenge was to create a visual identity that stands out in a competitive skincare market, communicates simplicity and trust, and builds a consistent experience.',
  'Create a brand that feels modern, approachable, and premium without appearing overly complicated.',
  'Position Raya as a modern skincare brand combining simplicity, everyday care, and clean visuals.',
  'Minimalist logo design, soft nature-inspired colour palette (sage, ivory, soft beige), clean typography, and a cohesive packaging system.',
  'Developed brand strategy, identity marks, packaging templates for bottles and jars, and digital promotional art direction.',
  array['Brand Strategy', 'Logo & Identity Design', 'Colour System', 'Typography System', 'Packaging Concepts', 'Social Media Art Direction', 'Brand Guidelines'],
  'Conceptual project. No commercial launch, customer acquisition, or business performance metrics are verified.'
from projects p where p.slug = 'raya-skincare'
on conflict (project_id) do nothing;

insert into case_studies (project_id, client_introduction, business_challenge, objectives, strategy, creative_direction, execution, services_delivered, results)
select 
  p.id,
  'Aurelune is a conceptual luxury brand developed around sophistication, exclusivity, and timeless aesthetics. The name combines gold and light with the elegance of the moon.',
  'Many brands attempt to communicate luxury simply by using gold colours and decorative fonts. The challenge was to communicate exclusivity without excessive decoration, sophistication through simplicity, and a timeless aesthetic.',
  'Establish an aspirational luxury brand universe that commands premium positioning through understated craft.',
  'Position Aurelune as an aspirational luxury brand with refined, elegant, and timeless visual identity.',
  'Elegant serif typography, minimalist logo construction, champagne gold and ivory palette, deep black and muted neutrals, and editorial lighting.',
  'Delivered brand positioning, typography and colour guidelines, bespoke fragrance vessel and packaging concepts, and tactile stationery.',
  array['Brand Positioning', 'Brand Identity', 'Logo Design', 'Typography System', 'Colour Palette', 'Art Direction', 'Packaging Concepts', 'Brand Guidelines'],
  'Conceptual branding project. No commercial launch, customer acquisition, or financial performance metrics are verified.'
from projects p where p.slug = 'aurelune'
on conflict (project_id) do nothing;

insert into case_studies (project_id, client_introduction, business_challenge, objectives, strategy, creative_direction, execution, services_delivered, results)
select 
  p.id,
  'ChainMind AI is a technology-focused project exploring AI-driven digital solutions and modern brand positioning for intelligent orchestration systems.',
  'Communicate a technology-focused offering through a clear and modern digital identity, cutting through generic AI noise.',
  'Establish an unmistakable brand identity and SaaS product interface that inspires enterprise trust.',
  'Technology branding, digital product positioning, and creative direction highlighting autonomous workflow transparency and performance.',
  'Dark-mode editorial minimalism with sharp neon accent highlights, monospace code elements, modular node graphs, and clean structural typography.',
  'Designed full brand strategy, technology branding tokens, interactive UI/UX dashboard concepts, and an AI product architecture prototype.',
  array['Brand Strategy', 'Technology Branding', 'UI/UX Concepts', 'AI Product Concepts', 'Interactive Prototyping'],
  'Created a robust technology identity and high-fidelity product interface system tailored for advanced AI applications.'
from projects p where p.slug = 'chainmind-ai'
on conflict (project_id) do nothing;

insert into case_studies (project_id, client_introduction, business_challenge, objectives, strategy, creative_direction, execution, services_delivered, results)
select 
  p.id,
  'Farmlytics is a technology-oriented project exploring the intersection of agriculture, analytics, and digital experiences.',
  'Explore how technology and data-driven experiences can improve agricultural business communication and operations.',
  'Bridge complex agricultural data and human-friendly design by creating a clear product narrative and intuitive data visualizations.',
  'Digital product positioning, technology-focused branding, and digital experience concepts centered on real-time data visibility.',
  'An earthy yet modern digital palette combining deep forest greens with high-visibility data charts and clean monospace telemetry numerals.',
  'Created the brand identity system, SaaS dashboard wireframes, mobile crop monitor concepts, and the product landing page experience.',
  array['Brand Strategy', 'UI/UX Concepts', 'Digital Product Strategy', 'Data Visualization Design', 'Technology Branding'],
  'Successfully translated complex agronomic metrics into an intuitive UI/UX framework and brand identity system.'
from projects p where p.slug = 'farmlytics'
on conflict (project_id) do nothing;

insert into case_studies (project_id, client_introduction, business_challenge, objectives, strategy, creative_direction, execution, services_delivered, results)
select 
  p.id,
  'Nina''s Beauty Hub is an established beauty studio and salon focused on premium personal-care rituals and personalized aesthetic styling.',
  'Develop a recognizable visual identity and improve digital brand presentation in a crowded marketplace.',
  'Elevate the salon''s visual authority, unify appointment communication, and establish a modern social media presence.',
  'Brand presentation, visual communication, and creative marketing direction focused on aesthetic consistency and client-centric storytelling.',
  'A warm, sophisticated palette combining gentle blush and muted neutrals with clean modern typography and behind-the-chair treatment showcases.',
  'Designed unified social media templates, service menu collateral, promotional campaign assets, and localized digital marketing guidelines.',
  array['Branding', 'Creative Direction', 'Social Media Marketing', 'Digital Marketing', 'Print Collateral'],
  'Delivered a cohesive visual presence and streamlined digital marketing communications across all public-facing channels.'
from projects p where p.slug = 'ninas-beauty-hub'
on conflict (project_id) do nothing;

insert into case_studies (project_id, client_introduction, business_challenge, objectives, strategy, creative_direction, execution, services_delivered, results)
select 
  p.id,
  'Asha Tiffin provides wholesome, authentic home-style meal subscription boxes, bringing traditional recipes to busy professionals and students.',
  'Build a recognizable food-service identity and communicate its offering effectively.',
  'Position Asha Tiffin as the trusted, premium everyday culinary partner celebrating hygiene and authentic taste.',
  'Brand positioning, visual communication, and marketing direction highlighting the authenticity, nutrition, and comfort of freshly cooked home food.',
  'Warm mustard and earthen clay tones, appetizing photography direction, clean typographic menu layouts, and approachable packaging marks.',
  'Created meal box packaging labels, weekly menu social templates, WhatsApp customer journey messaging, and local digital ad campaigns.',
  array['Branding', 'Creative Direction', 'Packaging Design', 'Digital Marketing Concepts', 'Social Media Creatives'],
  'Delivered a recognizable food service brand system and enhanced visual marketing communication across digital touchpoints.'
from projects p where p.slug = 'asha-tiffin'
on conflict (project_id) do nothing;

insert into case_studies (project_id, client_introduction, business_challenge, objectives, strategy, creative_direction, execution, services_delivered, results)
select 
  p.id,
  'Psychology with Mitali is an educational and counseling initiative led by psychologist Mitali, focused on destigmatizing mental health and emotional resilience.',
  'Create a professional digital identity that makes educational and psychology-related content approachable and impactful.',
  'Establish an authoritative yet deeply comforting personal brand that encourages open mental health conversations.',
  'Content positioning, visual communication, and personal-brand direction prioritizing emotional safety, warm readability, and relatable psychoeducation.',
  'A calming aesthetic featuring warm neutrals, soft terracotta, legible editorial serif and sans-serif pairings, and thoughtful negative space.',
  'Designed branded carousel templates, newsletter layouts, speaking engagement collaterals, and an educational content calendar.',
  array['Personal Branding', 'Creative Direction', 'Content Strategy', 'Social Media Concepts', 'Brand Guidelines'],
  'Established an approachable, authoritative voice and educational content architecture.'
from projects p where p.slug = 'psychology-with-mitali'
on conflict (project_id) do nothing;

insert into case_studies (project_id, client_introduction, business_challenge, objectives, strategy, creative_direction, execution, services_delivered, results)
select 
  p.id,
  '13ISU is a contemporary brand exploring the intersection of culture, identity and self-expression through considered product design.',
  'The brand needed a visual identity and packaging system that could communicate its point of view clearly — something that felt distinctive on shelf and resonant with a culturally aware audience.',
  'Develop a full brand identity system including logo, visual language and packaging that reflects the brand''s values and stands out in a competitive market.',
  'We began with brand discovery sessions to understand the audience, the competitive landscape and the story 13ISU wanted to tell. The strategy centred on creating a visual identity grounded in clarity and character.',
  'The creative direction drew on editorial minimalism — clean typographic treatments balanced with considered use of colour and texture to communicate quality without excess.',
  'We developed the full identity system: logo mark, typographic system, colour palette, packaging templates and brand guidelines — delivered as a comprehensive brand toolkit.',
  array['Brand Strategy', 'Logo Design', 'Visual Identity', 'Packaging Design', 'Brand Guidelines'],
  'The 13ISU Instagram account recorded 100K+ views in three days.'
from projects p where p.slug = '13isu'
on conflict (project_id) do nothing;

insert into case_studies (project_id, client_introduction, business_challenge, objectives, strategy, creative_direction, execution, services_delivered, results)
select 
  p.id,
  'Lumora Beauty is a modern beauty brand built around everyday rituals, designed for a generation that values simplicity, quality and self-care.',
  'The brand needed to establish a clear identity in a crowded beauty market — one that communicated quality and approachability without competing on price.',
  'Create a brand world that feels personal and premium — an identity that communicates confidence, clarity and care across all brand touchpoints.',
  'The strategy began with understanding the target audience and the gap in the market. We identified an opportunity to position Lumora as a trusted everyday beauty companion rather than an aspirational luxury.',
  'Soft, expressive and tactile. The creative direction prioritised warmth and familiarity — drawing on natural tones, clean typographic hierarchy and an editorial approach to product presentation.',
  'We developed the complete brand identity, packaging system and product marketing materials — creating a cohesive brand experience across all physical and digital touchpoints.',
  array['Brand Strategy', 'Visual Identity', 'Packaging Design', 'Product Marketing', 'Brand Guidelines'],
  'Results not yet documented.'
from projects p where p.slug = 'lumora-beauty'
on conflict (project_id) do nothing;

insert into case_studies (project_id, client_introduction, business_challenge, objectives, strategy, creative_direction, execution, services_delivered, results)
select 
  p.id,
  'Sole Trust Media is a creative, technology and business growth agency based in Bengaluru. This project is our own brand — the digital home for our strategy, creativity and technology work.',
  'As a new agency, STM needed to establish a credible digital presence that communicated the breadth of our capabilities and attracted the right clients from day one.',
  'Design and develop a website that positions STM as a premium creative and technology agency — one that communicates strategic thinking, creative capability and technical execution.',
  'The strategy centred on building a website that showed, rather than simply told. The focus was on strong editorial design, clear communication of services and an honest representation of the work.',
  'Editorial minimalism with strong typographic hierarchy. The cream-and-brown palette communicates warmth and sophistication. The layout draws on the aesthetic of premium creative publications.',
  'We designed and developed the complete website using Next.js and Supabase — building a system that can grow with the agency, support case studies and manage client enquiries.',
  array['Brand Strategy', 'UI/UX Design', 'Website Development', 'Content Strategy', 'SEO Foundations'],
  'Results not yet documented.'
from projects p where p.slug = 'sole-trust-media'
on conflict (project_id) do nothing;

-- ============================================================
-- STORAGE BUCKET (run separately if needed)
-- Note: Create a bucket called 'project-images' in Storage
-- with public read access via Supabase Dashboard
-- ============================================================
