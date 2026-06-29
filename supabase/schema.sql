create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  headline text not null,
  summary text not null,
  location text,
  email text,
  phone text,
  linkedin_url text,
  github_url text,
  portfolio_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  role text not null,
  start_date date not null,
  end_date date,
  is_current boolean not null default false,
  description text not null,
  achievements text[] not null default '{}',
  technologies text[] not null default '{}',
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  problem text,
  solution text,
  technologies text[] not null default '{}',
  repository_url text,
  demo_url text,
  display_order integer not null default 0,
  is_featured boolean not null default false,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  level integer not null check (level between 1 and 5),
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  institution text not null,
  issue_date date,
  credential_url text,
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.education (
  id uuid primary key default gen_random_uuid(),
  institution text not null,
  degree text not null,
  start_date date,
  end_date date,
  description text,
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value text not null,
  url text,
  display_order integer not null default 0,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role = 'admin'),
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists experiences_set_updated_at on public.experiences;
create trigger experiences_set_updated_at
before update on public.experiences
for each row execute function public.set_updated_at();

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists skills_set_updated_at on public.skills;
create trigger skills_set_updated_at
before update on public.skills
for each row execute function public.set_updated_at();

drop trigger if exists certifications_set_updated_at on public.certifications;
create trigger certifications_set_updated_at
before update on public.certifications
for each row execute function public.set_updated_at();

drop trigger if exists education_set_updated_at on public.education;
create trigger education_set_updated_at
before update on public.education
for each row execute function public.set_updated_at();

drop trigger if exists contacts_set_updated_at on public.contacts;
create trigger contacts_set_updated_at
before update on public.contacts
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.experiences enable row level security;
alter table public.projects enable row level security;
alter table public.skills enable row level security;
alter table public.certifications enable row level security;
alter table public.education enable row level security;
alter table public.contacts enable row level security;
alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
      and role = 'admin'
  );
$$;

drop policy if exists "Public can read published profiles" on public.profiles;
create policy "Public can read published profiles"
on public.profiles for select
using (is_published = true or public.is_admin());

drop policy if exists "Public can read published experiences" on public.experiences;
create policy "Public can read published experiences"
on public.experiences for select
using (is_published = true or public.is_admin());

drop policy if exists "Public can read published projects" on public.projects;
create policy "Public can read published projects"
on public.projects for select
using (is_published = true or public.is_admin());

drop policy if exists "Public can read published skills" on public.skills;
create policy "Public can read published skills"
on public.skills for select
using (is_published = true or public.is_admin());

drop policy if exists "Public can read published certifications" on public.certifications;
create policy "Public can read published certifications"
on public.certifications for select
using (is_published = true or public.is_admin());

drop policy if exists "Public can read published education" on public.education;
create policy "Public can read published education"
on public.education for select
using (is_published = true or public.is_admin());

drop policy if exists "Public can read public contacts" on public.contacts;
create policy "Public can read public contacts"
on public.contacts for select
using (is_public = true or public.is_admin());

drop policy if exists "Admins can read admin users" on public.admin_users;
create policy "Admins can read admin users"
on public.admin_users for select
using (auth.uid() = user_id or public.is_admin());

drop policy if exists "Admins can manage profiles" on public.profiles;
create policy "Admins can manage profiles"
on public.profiles for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can manage experiences" on public.experiences;
create policy "Admins can manage experiences"
on public.experiences for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can manage projects" on public.projects;
create policy "Admins can manage projects"
on public.projects for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can manage skills" on public.skills;
create policy "Admins can manage skills"
on public.skills for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can manage certifications" on public.certifications;
create policy "Admins can manage certifications"
on public.certifications for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can manage education" on public.education;
create policy "Admins can manage education"
on public.education for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can manage contacts" on public.contacts;
create policy "Admins can manage contacts"
on public.contacts for all
using (public.is_admin())
with check (public.is_admin());

insert into public.profiles (
  full_name,
  headline,
  summary,
  location,
  email,
  phone,
  linkedin_url,
  github_url,
  portfolio_url,
  is_published
)
select
  'Manuel Vargas',
  'Data Analyst / Data Engineer / Business Intelligence',
  'Profesional orientado a convertir datos operativos en informacion confiable para la toma de decisiones. Trabajo con SQL Server, Python, Power BI, procesos ETL, Azure, scraping, automatizacion y validacion de informacion en entornos de negocio.',
  'Lima, Peru',
  'manuel@example.com',
  '+51 999 999 999',
  'https://www.linkedin.com/',
  'https://github.com/',
  'https://example.com',
  true
where not exists (select 1 from public.profiles);

insert into public.projects (
  name,
  description,
  problem,
  solution,
  technologies,
  display_order,
  is_featured,
  is_published
)
values
  ('Migracion de datos on-premise a nube', 'Planificacion y ejecucion de migracion usando SQL Server, controles de calidad y validacion posterior.', 'Datos distribuidos en entornos legacy con riesgo de inconsistencias.', 'Flujo reproducible con consultas de control, scripts de carga y conciliacion final.', array['SQL Server', 'Azure', 'ETL', 'Data Quality'], 1, true, true),
  ('Generador de scripts SQL para carga de datos', 'Herramienta para construir scripts INSERT reutilizables en escenarios de pruebas, carga y migracion.', 'Preparar datos de prueba manualmente tomaba demasiado tiempo.', 'Automatizacion para transformar estructuras tabulares en scripts SQL consistentes.', array['SQL Server', 'Python', 'Automation'], 2, true, true),
  ('Automatizacion de procesos con Python', 'Scripts para reducir tareas repetitivas de limpieza, transformacion y validacion de datos.', 'Procesos diarios dependian de pasos manuales.', 'Automatizaciones con Python para estandarizar entradas y salidas.', array['Python', 'Pandas', 'Excel', 'SQL'], 3, true, true)
on conflict do nothing;

insert into public.skills (name, category, level, display_order, is_published)
values
  ('SQL Server', 'Bases de datos', 5, 1, true),
  ('Python', 'Automatizacion', 4, 2, true),
  ('Power BI', 'Business Intelligence', 4, 3, true),
  ('Procesos ETL', 'Data Engineering', 4, 4, true),
  ('Azure', 'Cloud', 3, 5, true)
on conflict do nothing;
