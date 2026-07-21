# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # start dev server (localhost:3000)
npm run build   # production build
npm run start   # serve production build
npm run lint    # next lint (ESLint 9, eslint-config-next)
```

There is no test setup in this repo.

## Architecture

Next.js 15 (App Router) + React 19 + TypeScript personal portfolio for Vyshnav Suresh, styled with Tailwind CSS v4. Import alias `@/*` → `src/*`.

The app is two surfaces sharing one codebase:

- **Public site** — `src/app/page.tsx` composes section components (`Hero`, `Skills`, `Timeline`, `Projects`, `Contact`). Project detail pages at `/projects/[slug]`, blog at `/blog` and `/blog/[slug]`. Nav/footer live in the root `src/app/layout.tsx`.
- **Admin CMS** — `src/app/admin/*`, wrapped in `src/app/admin/layout.tsx` (sidebar + `AuthProvider`, marked `noindex`). Manages projects and blog posts via the API routes below.

### Data layer
- **MongoDB via Mongoose is the primary store.** Connect through `connectToDatabase()` from `src/lib/mongodb.ts` (cached global connection — call it at the top of every DB-touching route). Models in `src/models/`: `Project.ts`, `BlogPost.ts`, both using the `models.X || model(...)` guard against hot-reload re-registration.
- CRUD API routes: `src/app/api/projects/route.ts` + `[id]/route.ts`, `src/app/api/blog/route.ts` + `[id]/route.ts`. POST auto-generates a URL `slug` from the name.
- `src/lib/supabaseClient.ts` exists but Mongo is the live store — check for actual usage before assuming Supabase is wired in.

### Auth
NextAuth Credentials provider (`src/app/api/auth/[...nextauth]/route.ts`), JWT sessions, single hardcoded admin (env `ADMIN_USER`/`ADMIN_PASS`, defaulting to `admin`/`admin123`). Sign-in page: `/admin/login`. **Note:** the admin UI is gated client-side, but the `/api/projects` and `/api/blog` mutation routes have no server-side session check — add one there if security matters.

### Images
Uploads go to ImageKit via `POST /api/upload` (`src/lib/imagekit.ts`, needs `IMAGEKIT_PRIVATE_KEY`); it returns the hosted URL, which is stored on the model.

### Styling / theming
Tailwind v4 — **no `tailwind.config.js`**. Theme tokens (`--color-primary`, fonts, etc.) are declared in the `@theme` block of `src/app/globals.css`. Fonts (DM Sans / DM Serif Display) load via `next/font` in the root layout, exposed as `--font-sans` / `--font-display`.

### Env vars
`MONGODB_URI`, `ADMIN_USER`, `ADMIN_PASS`, `NEXTAUTH_SECRET`/`NEXTAUTH_URL`, `IMAGEKIT_PRIVATE_KEY`, and (if Supabase is used) `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## Gotchas
- `openai` is a dependency but `VoiceAssistant.tsx` and `PaletteSwitcher.tsx` are empty/stubbed — a planned voice/theme feature that isn't built. Don't assume it works.
- Active branch is `v2` (also the main branch).
