-- Run this in Supabase SQL Editor if you see:
-- "Could not find the 'coming_soon' column of 'tutorials'"

alter table public.tutorials
  add column if not exists coming_soon boolean not null default false;

update public.tutorials
set coming_soon = true
where name is distinct from 'Master Web Development';

update public.tutorials
set coming_soon = false
where name = 'Master Web Development';
