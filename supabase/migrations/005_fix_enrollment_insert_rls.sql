-- REQUIRED for gmapwauaducyxldefgby (and any project using email/full_name/status columns).
-- Run in Supabase Dashboard → SQL Editor → Run
-- Fixes: "new row violates row-level security policy for table enrollments"

alter table public.enrollments enable row level security;

drop policy if exists "Anyone can create enrollment" on public.enrollments;

create policy "Anyone can create enrollment"
  on public.enrollments
  for insert
  to anon, authenticated
  with check (status = 'pending');

-- Ensure public can read tutorials (for the homepage)
drop policy if exists "Public can view active tutorials" on public.tutorials;

create policy "Public can view active tutorials"
  on public.tutorials
  for select
  to anon, authenticated
  using (is_active = true);
