-- Fix admin permissions and add coming_soon flag for enrollment control

alter table public.tutorials
  add column if not exists coming_soon boolean not null default false;

update public.tutorials
set coming_soon = true
where name is distinct from 'Master Web Development';

update public.tutorials
set coming_soon = false
where name = 'Master Web Development';

-- Replace combined policy with explicit admin policies
drop policy if exists "Admins manage tutorials" on public.tutorials;

drop policy if exists "Admins select all tutorials" on public.tutorials;
create policy "Admins select all tutorials"
  on public.tutorials for select
  to authenticated
  using (public.is_admin());

drop policy if exists "Admins insert tutorials" on public.tutorials;
create policy "Admins insert tutorials"
  on public.tutorials for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "Admins update tutorials" on public.tutorials;
create policy "Admins update tutorials"
  on public.tutorials for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins delete tutorials" on public.tutorials;
create policy "Admins delete tutorials"
  on public.tutorials for delete
  to authenticated
  using (public.is_admin());

grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_admin() to anon;
