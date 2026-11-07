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
insert into projects (title, slug, client_name, category, short_description, featured, status, display_order) 
values
  (
    '13ISU', 
    '13isu', 
    '13ISU', 
    'Branding & Identity', 
    'A considered identity and packaging system built to make a new point of view feel unmistakable on shelf and on screen.',
    true, 
    'published', 
    1
  ),
  (
    'Lumora Beauty', 
    'lumora-beauty', 
    'Lumora Beauty', 
    'Branding & Identity', 
    'A soft, expressive beauty world shaped around clarity, tactility and a confident everyday ritual.',
    true, 
    'published', 
    2
  ),
  (
    'Sole Trust Media', 
    'sole-trust-media', 
    'Sole Trust Media', 
    'Website Development', 
    'Our own brand system: a digital home for strategy, creativity, marketing and technology.',
    true, 
    'published', 
    3
  )
on conflict (slug) do nothing;

-- ============================================================
-- SEED CASE STUDIES FOR INITIAL PROJECTS
-- ============================================================
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
  'Results not yet documented.'
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
