# Mohammed Ziyad Portfolio

موقع بورتفوليو شخصي لـ محمد زياد — مطوّر ومحترف رقمي. موقع عربي RTL بتصميم أسود مع أخضر نيون (#00E5A0)، أنيميشن framer-motion، وكل الأقسام الكاملة.

## Run & Operate

- `pnpm --filter @workspace/portfolio run dev` — run the portfolio site (port assigned by workflow)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS
- Animations: framer-motion
- Icons: lucide-react, react-icons
- Font: Cairo (Google Fonts)
- RTL: Arabic, dir="rtl"

## Where things live

- `artifacts/portfolio/src/` — main source
- `artifacts/portfolio/src/components/` — Navbar, Hero, About, Services, Methodology, Projects, Stats, Experience, Clients, Certificates, Contact, Footer
- `artifacts/portfolio/src/index.css` — theme variables, Cairo font, particle keyframes, marquee keyframes

## Architecture decisions

- Static frontend (Vite SPA) with Supabase as the backend for the contact form + admin dashboard
- Contact form writes to Supabase `messages` table; admin reads it via RLS-protected queries
- Admin auth uses Supabase Auth (hashed passwords, signed JWT sessions) — see `ADMIN.md` and `supabase/admin-setup.sql`
- All colors derived from #00E5A0 (mint green) accent on #080808 dark background
- framer-motion whileInView for scroll-triggered reveals
- Infinite CSS marquee via @keyframes translateX (no JS)
- Floating badges use framer-motion animate y: [0, -10, 0] infinite loops

## Product

Arabic RTL personal portfolio for Mohammed Ziyad with: Hero, Skills Marquee, About + floating social badges, "أصنع الفارق" section, 6 Services, Methodology timeline, Projects, Stats counters, Experience timeline, Client logos, Certificates, Contact form, Footer CTA.

## User preferences

- Name: Mohammed Ziyad / محمد زياد
- Site is fully Arabic RTL
- Accent color: #00E5A0
- Font will be provided later by user (currently using Cairo as placeholder)

## Gotchas

- react-icons/fa: use FaFacebook (not FaMeta), FaSnapchat (not FaSnapchatGhost), FaMobile (not FaMobileAlt)
- Google Fonts @import must be the VERY FIRST line in index.css before any other @import
- Backend is Supabase — `messages` table must have RLS enabled (run `supabase/admin-setup.sql`) before the admin dashboard can read anything
- `/admin` is a client-side route — SPA rewrite to `/index.html` is required on the host (already configured in `artifact.toml` and `vercel.json`)

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
