-- SamsTek Services database schema

create table if not exists public.tutorials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  price numeric(12, 2) not null check (price >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  tutorial_id uuid not null references public.tutorials(id) on delete restrict,
  full_name text not null,
  email text not null,
  phone text not null,
  amount_paid numeric(12, 2),
  payment_reference text unique,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed')),
  created_at timestamptz not null default now()
);

create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists enrollments_email_idx on public.enrollments (lower(email));
create index if not exists enrollments_status_idx on public.enrollments (status);
create index if not exists enrollments_created_at_idx on public.enrollments (created_at desc);

alter table public.tutorials enable row level security;
alter table public.enrollments enable row level security;
alter table public.admin_profiles enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_profiles
    where user_id = auth.uid()
  );
$$;

-- Tutorials: public read active; admins full access
create policy "Public can view active tutorials"
  on public.tutorials for select
  using (is_active = true);

create policy "Admins manage tutorials"
  on public.tutorials for all
  using (public.is_admin())
  with check (public.is_admin());

-- Enrollments: anyone can create pending; admins read all
create policy "Anyone can create enrollment"
  on public.enrollments for insert
  with check (status = 'pending');

create policy "Admins view enrollments"
  on public.enrollments for select
  using (public.is_admin());

create policy "Admins update enrollments"
  on public.enrollments for update
  using (public.is_admin());

-- Admin profiles: admins read own row
create policy "Admins read admin profiles"
  on public.admin_profiles for select
  using (auth.uid() = user_id);

-- Seed sample tutorials
insert into public.tutorials (name, description, price, is_active) values
  (
    'Web Development Fundamentals',
    'Learn HTML, CSS, and JavaScript to build responsive websites from scratch.',
    150.00,
    true
  ),
  (
    'Python for Beginners',
    'Master Python basics, data structures, and automation with hands-on projects.',
    120.00,
    true
  ),
  (
    'Digital Marketing Essentials',
    'Grow your brand with SEO, social media strategy, and content marketing.',
    99.00,
    true
  ),
  (
    'Cybersecurity Basics',
    'Understand online threats, safe browsing, and essential security practices.',
    180.00,
    true
  );
