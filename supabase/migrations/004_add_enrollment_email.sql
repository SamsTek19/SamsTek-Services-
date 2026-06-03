-- Optional: align enrollments with app migration names (if you prefer email over student_email).
-- Your live project already uses student_email — the app maps that automatically.
-- Run only if you want BOTH column sets:

alter table public.enrollments
  add column if not exists full_name text,
  add column if not exists email text,
  add column if not exists phone text,
  add column if not exists status text default 'pending';

update public.enrollments
set
  full_name = coalesce(full_name, student_name),
  email = coalesce(email, student_email),
  phone = coalesce(phone, student_phone),
  status = coalesce(status, payment_status)
where student_name is not null
   or student_email is not null;
