# SamsTek Services

A modern, conversion-focused website for tutorial enrollment and Paystack payments.

## Features

- Homepage with hero, tutorials, why choose us, and contact sections
- Enrollment form → Paystack checkout → success page
- Automatic confirmation emails (via Resend + Supabase Edge Function)
- Secure enrollment storage in Supabase PostgreSQL
- Admin dashboard: manage tutorials, view enrollments/payments, search, export CSV

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Environment Setup

1. Copy `.env.example` to `.env` and fill in your keys.
2. Create a [Supabase](https://supabase.com) project.
3. Run the migration in `supabase/migrations/001_initial_schema.sql` via the SQL Editor.
4. Deploy the edge function:

   ```bash
   supabase functions deploy verify-payment
   ```

5. Set edge function secrets: `PAYSTACK_SECRET_KEY`, `RESEND_API_KEY`, `FROM_EMAIL`, etc.
6. Create an admin user in Supabase Auth, then add their UUID to `admin_profiles`:

   ```sql
   insert into admin_profiles (user_id) values ('your-auth-user-uuid');
   ```

7. Add your Paystack public key to `.env` as `VITE_PAYSTACK_PUBLIC_KEY`.

## Demo Mode

Without Supabase configured, the site shows sample tutorials. Admin login uses password `admin123` (or `VITE_ADMIN_DEMO_PASSWORD`). Payments require Paystack keys.

## Build

```bash
npm run build
npm run preview
```

## Brand Colors

| Role       | Hex       |
|------------|-----------|
| Primary    | `#2563EB` |
| Secondary  | `#06B6D4` |
| Background | `#FFFFFF` |
| Text       | `#1E293B` |

Update contact details in `src/lib/site.ts`.
