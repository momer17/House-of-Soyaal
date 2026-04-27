# House of Soyaal v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the existing visual demo scaffold into a fully wired Next.js platform with real Supabase auth, Stripe subscriptions, Mux video, PDF archive with annotations, events, and an admin CMS — preserving every pixel of the existing design system exactly.

**Architecture:** Next.js App Router on Vercel, Supabase for auth/database/storage, Stripe for membership billing with webhook-driven entitlement sync, Mux for video hosting/playback. All existing design tokens, CSS classes, and component patterns from `app/globals.css` and `components/soyaal/` are the canonical design reference — no new visual patterns are introduced, only new pages/features built on top of them.

**Tech Stack:** Next.js 15, React 19, TypeScript, Supabase (`@supabase/supabase-js` + `@supabase/ssr`), Stripe (`stripe` + `@stripe/stripe-js`), Mux (`@mux/mux-node` + `@mux/mux-player-react`), PDF.js (`pdfjs-dist`), existing shadcn/ui + Tailwind CSS 4 design system.

---

## Design System Contract

**These classes from `app/globals.css` are canonical — use them everywhere, never recreate inline:**

| Class | Use |
|---|---|
| `.editorial-card` | Primary card surface (white, rounded-2.5xl, shadow) |
| `.paper-card` | Secondary card surface (cream gradient, rounded-xl) |
| `.top-panel` | Panel on app/admin pages (white, rounded-2rem, shadow) |
| `.button-primary` | Dark brown pill action button |
| `.button-primary.warm` | Amber pill CTA button |
| `.button-secondary` | Ghost pill secondary button |
| `.button-link` | Amber inline link button |
| `.tag` | Amber chip label |
| `.status-pill` | Green chip for success/free states |
| `.eyebrow` | Small amber uppercase label with leading line |
| `.section-title` | Playfair Display display heading |
| `.section-subtitle` | Body text max-width reading block |
| `.section-space` | `padding-block: 4rem` section spacer |
| `.content-width` | `min(1120px, 100vw - 2rem)` centered container |
| `.content-narrow` | `min(760px, 100vw - 2rem)` narrow container |
| `.app-frame` | Sidebar + main two-column app layout |
| `.app-sidebar` | Sticky sidebar panel |
| `.app-main` | Main content area with padding |
| `.metric-card` | Stat card (cream bg, rounded) |
| `.metric-value` | Large Playfair Display number |
| `.progress-track` / `.progress-fill` | Amber gradient progress bar |
| `.faux-video` | Dark gradient video area (used for Mux player container too) |
| `.pdf-sheet` | Lined paper PDF viewer container |
| `.mesh-glow` | Radial amber glow decorative element |
| `.display-font` | Applies Playfair Display |

**Color tokens (use CSS vars, never hardcode hex):**
- `var(--soy-brown-900)` — primary text, primary buttons
- `var(--soy-amber-600)` — accent, CTAs, tags
- `var(--soy-amber-300)` — amber light (on dark bg)
- `var(--soy-cream-50/100/200/300)` — backgrounds
- `var(--soy-green-700)` — success/free badges
- `var(--soy-ink)` — body text
- `var(--soy-ink-soft)` — secondary text
- `var(--soy-ink-muted)` — muted/meta text
- `var(--soy-border)` — borders
- `var(--soy-shadow)` — card shadows

---

## Environment Variables

Create `.env.local` with:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...  # £19/month membership price ID

# Mux
MUX_TOKEN_ID=your_mux_token_id
MUX_TOKEN_SECRET=your_mux_token_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Phase 0: Dependencies + Token Audit

### Task 0.1: Install real backend dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install dependencies**

```bash
cd /Users/mohammedomer/Downloads/b_gdFV4lwxW1E
pnpm add @supabase/supabase-js @supabase/ssr stripe @mux/mux-node @mux/mux-player-react pdfjs-dist
```

Expected output: packages installed, no peer dep errors.

- [ ] **Step 2: Verify install**

```bash
cat package.json | grep -E "@supabase|stripe|@mux|pdfjs"
```

Expected: all four package groups present.

- [ ] **Step 3: Commit**

```bash
git init && git add package.json pnpm-lock.yaml
git commit -m "deps: add supabase, stripe, mux, pdfjs"
```

---

### Task 0.2: Create `.env.local`

**Files:**
- Create: `.env.local`
- Create: `.env.local.example`

- [ ] **Step 1: Create `.env.local.example` for reference**

```bash
cat > .env.local.example << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID=
MUX_TOKEN_ID=
MUX_TOKEN_SECRET=
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF
```

- [ ] **Step 2: Create `.env.local` with real values** (operator fills in manually)

- [ ] **Step 3: Verify `.gitignore` contains `.env.local`**

```bash
grep ".env.local" .gitignore || echo ".env.local" >> .gitignore
```

- [ ] **Step 4: Commit**

```bash
git add .env.local.example .gitignore
git commit -m "config: add env template and gitignore"
```

---

## Phase 1: Supabase + Auth + Stripe Foundation

### Task 1.1: Supabase database schema

**Files:**
- Create: `supabase/schema.sql`
- Create: `supabase/seed.sql`

- [ ] **Step 1: Write `supabase/schema.sql`**

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles (extends auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  name text not null default '',
  role text not null default 'member' check (role in ('member', 'admin')),
  stripe_customer_id text,
  subscription_id text,
  subscription_status text not null default 'inactive' check (subscription_status in ('active', 'inactive', 'canceled', 'past_due')),
  onboarded boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
create policy "Users read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Service role full access" on public.profiles using (auth.role() = 'service_role');

-- Courses
create table public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  subtitle text not null default '',
  hero_quote text not null default '',
  description text not null default '',
  monthly_price_gbp numeric not null default 19,
  hero_stats jsonb not null default '[]',
  outcomes text[] not null default '{}',
  includes text[] not null default '{}',
  audience text[] not null default '{}',
  access text not null default 'members' check (access in ('public', 'members')),
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.courses enable row level security;
create policy "Anyone reads published courses" on public.courses for select using (published = true);
create policy "Admins full access courses" on public.courses using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Modules
create table public.modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade not null,
  title text not null,
  "order" integer not null,
  summary text not null default '',
  created_at timestamptz not null default now()
);

alter table public.modules enable row level security;
create policy "Anyone reads modules for published courses" on public.modules for select using (
  exists (select 1 from public.courses where id = course_id and published = true)
);
create policy "Admins full access modules" on public.modules using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Lessons
create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid references public.modules(id) on delete cascade not null,
  slug text unique not null,
  title text not null,
  "order" integer not null,
  duration_minutes integer not null default 0,
  summary text not null default '',
  mux_asset_id text,
  mux_playback_id text,
  transcript text not null default '',
  notes_summary text not null default '',
  captions text[] not null default '{}',
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.lessons enable row level security;
create policy "Members read published lessons" on public.lessons for select using (
  published = true and (
    exists (select 1 from public.profiles where id = auth.uid() and (role = 'member' or role = 'admin'))
  )
);
create policy "Admins full access lessons" on public.lessons using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Lesson resources
create table public.lesson_resources (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  title text not null,
  type text not null check (type in ('PDF', 'Transcript', 'Worksheet', 'Link')),
  storage_path text,
  href text,
  description text not null default '',
  "order" integer not null default 0
);

alter table public.lesson_resources enable row level security;
create policy "Members read lesson resources" on public.lesson_resources for select using (
  exists (
    select 1 from public.lessons l
    join public.profiles p on p.id = auth.uid()
    where l.id = lesson_id and l.published = true and (p.role = 'member' or p.role = 'admin')
  )
);
create policy "Admins full access lesson_resources" on public.lesson_resources using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Enrollments
create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  course_id uuid references public.courses(id) on delete cascade not null,
  enrolled_at timestamptz not null default now(),
  unique(user_id, course_id)
);

alter table public.enrollments enable row level security;
create policy "Users read own enrollments" on public.enrollments for select using (auth.uid() = user_id);
create policy "Service role manages enrollments" on public.enrollments using (auth.role() = 'service_role');

-- Lesson progress
create table public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  playback_position_seconds integer not null default 0,
  started_at timestamptz,
  completed_at timestamptz,
  unique(user_id, lesson_id)
);

alter table public.lesson_progress enable row level security;
create policy "Users manage own lesson_progress" on public.lesson_progress using (auth.uid() = user_id);

-- Events
create table public.events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text not null default '',
  format text not null check (format in ('Online workshop', 'Online seminar', 'In-person session')),
  datetime_label text not null default '',
  location_label text not null default '',
  seats_label text not null default '',
  price_label text not null default '',
  eventbrite_url text not null default '',
  event_date timestamptz,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;
create policy "Anyone reads published events" on public.events for select using (published = true);
create policy "Admins full access events" on public.events using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Archive items
create table public.archive_items (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  poet text not null default '',
  era text not null default '',
  description text not null default '',
  preview text not null default '',
  tags text[] not null default '{}',
  access text not null default 'members' check (access in ('public', 'members')),
  pdf_storage_path text,
  editorial_note text not null default '',
  passages text[] not null default '{}',
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.archive_items enable row level security;
create policy "Public items visible to all" on public.archive_items for select using (
  published = true and (
    access = 'public' or
    exists (select 1 from public.profiles where id = auth.uid() and (role = 'member' or role = 'admin'))
  )
);
create policy "Admins full access archive" on public.archive_items using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- PDF annotations
create table public.pdf_annotations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  archive_item_id uuid references public.archive_items(id) on delete cascade not null,
  selected_text text not null,
  label text not null check (label in ('Theme', 'Image', 'Performance', 'Question', 'Metaphor')),
  note text not null default '',
  created_at timestamptz not null default now()
);

alter table public.pdf_annotations enable row level security;
create policy "Users manage own annotations" on public.pdf_annotations using (auth.uid() = user_id);

-- Announcements
create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.announcements enable row level security;
create policy "Members read published announcements" on public.announcements for select using (
  published = true and
  exists (select 1 from public.profiles where id = auth.uid())
);
create policy "Admins full access announcements" on public.announcements using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Trigger: auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'member')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

- [ ] **Step 2: Apply schema** — run in Supabase SQL Editor or via Supabase CLI:

```bash
# If using Supabase CLI:
supabase db push
# Or paste supabase/schema.sql into the Supabase dashboard SQL editor and run it.
```

- [ ] **Step 3: Write `supabase/seed.sql`** with the flagship course, events, and archive items from `lib/site-data.ts` as INSERT statements so admin has real content on first run.

```sql
-- Seed flagship course
insert into public.courses (slug, title, subtitle, hero_quote, description, monthly_price_gbp, hero_stats, outcomes, includes, audience, access, published)
values (
  'foundations-of-somali-poetry',
  'Foundations of Somali Poetry',
  'A guided introduction to Somali poetic listening, close reading, and cultural context.',
  'A course shaped like a reading circle: attentive, warm, and grounded in the living oral tradition.',
  'This flagship course introduces learners to Somali poetry through performance, meaning, and close reading.',
  19,
  '[{"value": "9", "label": "Lessons in the pilot course"}, {"value": "3", "label": "Live sessions this term"}, {"value": "12", "label": "Archive PDFs at launch"}]',
  ARRAY['Understand the structure of oral performance and poetic repetition.', 'Read poems with short contextual notes and guided prompts.', 'Build confidence moving between listening, text, and interpretation.', 'Prepare for deeper poetry study in later courses and seminars.'],
  ARRAY['Instant access to the flagship course and member archive.', 'Downloadable lesson notes, worksheets, and transcripts.', 'Member pricing and priority registration for live events.', 'A persistent reading workspace for poem annotations and notes.'],
  ARRAY['Learners returning to Somali through culture and literature.', 'Readers who want guided access to poetic language and context.', 'Diaspora audiences looking for a warm, structured entry point.'],
  'members',
  true
);

-- Seed events
insert into public.events (slug, title, summary, format, datetime_label, location_label, seats_label, price_label, eventbrite_url, published)
values
  ('april-listening-lab', 'April Listening Lab', 'A member-friendly live workshop on repetition, listening cues, and how to read with performance in mind.', 'Online workshop', 'Thursday 30 April 2026 · 6:00 PM BST', 'Zoom', '24 places remaining', '£12', 'https://www.eventbrite.com/', true),
  ('poetry-and-memory-seminar', 'Poetry and Memory Seminar', 'A slower discussion session for members who want more context around oral transmission, memory, and recitation.', 'Online seminar', 'Saturday 16 May 2026 · 3:00 PM BST', 'Zoom', 'Open registration', 'Included for members', 'https://www.eventbrite.com/', true),
  ('london-reading-circle', 'London Reading Circle', 'A small in-person gathering in London for guided reading, listening, and conversation around selected poems.', 'In-person session', 'Sunday 14 June 2026 · 2:00 PM BST', 'Hackney, London', '8 places remaining', '£25', 'https://www.eventbrite.com/', true);

-- Seed archive items
insert into public.archive_items (slug, title, poet, era, description, preview, tags, access, editorial_note, passages, published)
values
  ('gabay-on-memory-and-distance', 'Gabay on Memory and Distance', 'Selected modern poet', '1980s', 'A short poem chosen for its layered metaphor, repeated imagery, and usefulness in the pilot course.', 'A lyrical meditation on absence, distance, and the shapes memory leaves behind in voice.', ARRAY['Memory', 'Performance', 'Close reading'], 'members', 'This text works especially well for comparing metaphor and address. Use the annotation panel to mark lines that widen in meaning on a second reading.', ARRAY['The line returns like footsteps on evening dust, familiar and unsettled at once.', 'A name carried in the mouth can outlive the road that first taught it to us.', 'He speaks to the absent as if distance were another room, still close enough to hear.'], true),
  ('recitation-and-public-voice', 'Recitation and Public Voice', 'Selected classical source', '1960s', 'An archive entry used to compare public voice, social occasion, and the rhetorical force of address.', 'A forceful poem whose address shifts between public declaration and intimate instruction.', ARRAY['Public voice', 'Address', 'Context'], 'members', 'Try labelling passages by tone: instruction, warning, memory, or declaration.', ARRAY['The city hears him before it understands him; the rhythm arrives first and makes room for the meaning.', 'The poem names the public, but the force of the address lands on a single listener.', 'Instruction in verse is still instruction, yet it carries more warmth when voiced in image and echo.'], true),
  ('short-reading-for-teaser', 'Short Reading for Teaser', 'Archive preview', 'Preview sample', 'A publicly visible teaser entry that signals the archive style without exposing the full member workspace.', 'A short sample poem with a locked prompt inviting readers to join as members for full access.', ARRAY['Preview', 'Teaser'], 'public', 'This teaser is intentionally light. The full archive includes editable labels, notes, and saved reading sessions.', ARRAY['The first page offers enough to invite attention, but the fuller commentary stays inside the member area.', 'Readers can see the editorial tone before deciding whether the archive is for them.', 'The preview keeps the archive visible without flattening it into a marketing page.'], true);

-- Seed announcements
insert into public.announcements (title, body) values
  ('April seminar booking is open', 'Reserve a place for the live discussion on oral performance, meter, and how to listen for repetition in Somali verse.'),
  ('Course notes refreshed', 'Module 2 now includes an expanded reading guide and a clearer glossary for metaphor and theme analysis.');
```

- [ ] **Step 4: Commit**

```bash
git add supabase/
git commit -m "feat: add supabase schema and seed data"
```

---

### Task 1.2: Supabase client helpers

**Files:**
- Create: `lib/supabase/client.ts`
- Create: `lib/supabase/server.ts`
- Create: `lib/supabase/admin.ts`

- [ ] **Step 1: Create browser client `lib/supabase/client.ts`**

```typescript
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
```

- [ ] **Step 2: Create server client `lib/supabase/server.ts`**

```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Server component — cookies set by middleware
          }
        },
      },
    },
  );
}
```

- [ ] **Step 3: Create service role admin client `lib/supabase/admin.ts`**

```typescript
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// Only use server-side; never import in client components
export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
```

- [ ] **Step 4: Create `types/database.ts`** — generate from Supabase or write manually:

```typescript
// Generated types from Supabase schema
// Run: supabase gen types typescript --local > types/database.ts
// For now, a minimal manual version:

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          role: "member" | "admin";
          stripe_customer_id: string | null;
          subscription_id: string | null;
          subscription_status: "active" | "inactive" | "canceled" | "past_due";
          onboarded: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]> & { id: string };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
      };
      courses: {
        Row: {
          id: string;
          slug: string;
          title: string;
          subtitle: string;
          hero_quote: string;
          description: string;
          monthly_price_gbp: number;
          hero_stats: Json;
          outcomes: string[];
          includes: string[];
          audience: string[];
          access: "public" | "members";
          published: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["courses"]["Row"]> & { slug: string; title: string };
        Update: Partial<Database["public"]["Tables"]["courses"]["Row"]>;
      };
      modules: {
        Row: {
          id: string;
          course_id: string;
          title: string;
          order: number;
          summary: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["modules"]["Row"]> & { course_id: string; title: string; order: number };
        Update: Partial<Database["public"]["Tables"]["modules"]["Row"]>;
      };
      lessons: {
        Row: {
          id: string;
          module_id: string;
          slug: string;
          title: string;
          order: number;
          duration_minutes: number;
          summary: string;
          mux_asset_id: string | null;
          mux_playback_id: string | null;
          transcript: string;
          notes_summary: string;
          captions: string[];
          published: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["lessons"]["Row"]> & { module_id: string; slug: string; title: string; order: number };
        Update: Partial<Database["public"]["Tables"]["lessons"]["Row"]>;
      };
      lesson_resources: {
        Row: {
          id: string;
          lesson_id: string;
          title: string;
          type: "PDF" | "Transcript" | "Worksheet" | "Link";
          storage_path: string | null;
          href: string | null;
          description: string;
          order: number;
        };
        Insert: Partial<Database["public"]["Tables"]["lesson_resources"]["Row"]> & { lesson_id: string; title: string; type: "PDF" | "Transcript" | "Worksheet" | "Link" };
        Update: Partial<Database["public"]["Tables"]["lesson_resources"]["Row"]>;
      };
      enrollments: {
        Row: { id: string; user_id: string; course_id: string; enrolled_at: string };
        Insert: { user_id: string; course_id: string };
        Update: never;
      };
      lesson_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          playback_position_seconds: number;
          started_at: string | null;
          completed_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["lesson_progress"]["Row"]> & { user_id: string; lesson_id: string };
        Update: Partial<Database["public"]["Tables"]["lesson_progress"]["Row"]>;
      };
      events: {
        Row: {
          id: string;
          slug: string;
          title: string;
          summary: string;
          format: "Online workshop" | "Online seminar" | "In-person session";
          datetime_label: string;
          location_label: string;
          seats_label: string;
          price_label: string;
          eventbrite_url: string;
          event_date: string | null;
          published: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["events"]["Row"]> & { slug: string; title: string; format: "Online workshop" | "Online seminar" | "In-person session" };
        Update: Partial<Database["public"]["Tables"]["events"]["Row"]>;
      };
      archive_items: {
        Row: {
          id: string;
          slug: string;
          title: string;
          poet: string;
          era: string;
          description: string;
          preview: string;
          tags: string[];
          access: "public" | "members";
          pdf_storage_path: string | null;
          editorial_note: string;
          passages: string[];
          published: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["archive_items"]["Row"]> & { slug: string; title: string };
        Update: Partial<Database["public"]["Tables"]["archive_items"]["Row"]>;
      };
      pdf_annotations: {
        Row: {
          id: string;
          user_id: string;
          archive_item_id: string;
          selected_text: string;
          label: "Theme" | "Image" | "Performance" | "Question" | "Metaphor";
          note: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["pdf_annotations"]["Row"]> & { user_id: string; archive_item_id: string; selected_text: string; label: "Theme" | "Image" | "Performance" | "Question" | "Metaphor" };
        Update: Partial<Database["public"]["Tables"]["pdf_annotations"]["Row"]>;
      };
      announcements: {
        Row: { id: string; title: string; body: string; published: boolean; created_at: string };
        Insert: { title: string; body: string; published?: boolean };
        Update: Partial<Database["public"]["Tables"]["announcements"]["Row"]>;
      };
    };
  };
}
```

- [ ] **Step 5: Commit**

```bash
git add lib/supabase/ types/
git commit -m "feat: supabase client helpers and database types"
```

---

### Task 1.3: Next.js middleware for auth + route protection

**Files:**
- Create: `middleware.ts` (replaces session cookie approach)

- [ ] **Step 1: Create `middleware.ts`**

```typescript
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Protect /app/* routes
  if (request.nextUrl.pathname.startsWith("/app")) {
    if (!user) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    // Check subscription active
    const { data: profile } = await supabase
      .from("profiles")
      .select("subscription_status, role")
      .eq("id", user.id)
      .single();

    if (!profile || (profile.subscription_status !== "active" && profile.role !== "admin")) {
      return NextResponse.redirect(new URL("/pricing?reason=subscribe", request.url));
    }
  }

  // Protect /admin/* routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!user) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      return NextResponse.redirect(new URL("/app", request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

- [ ] **Step 2: Replace `lib/session.ts` with real Supabase session helper**

```typescript
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type ViewerRole = "guest" | "member" | "admin";

export interface ViewerSession {
  id: string;
  role: ViewerRole;
  name: string;
  onboarded: boolean;
  subscriptionActive: boolean;
}

export async function getViewerSession(): Promise<ViewerSession> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { id: "", role: "guest", name: "Guest", onboarded: false, subscriptionActive: false };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, role, subscription_status, onboarded")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return { id: user.id, role: "guest", name: "Guest", onboarded: false, subscriptionActive: false };
  }

  return {
    id: user.id,
    role: profile.role as ViewerRole,
    name: profile.name,
    onboarded: profile.onboarded,
    subscriptionActive: profile.subscription_status === "active" || profile.role === "admin",
  };
}

export async function requireMember(): Promise<ViewerSession> {
  const session = await getViewerSession();
  if (session.role === "guest" || !session.subscriptionActive) {
    redirect("/signin");
  }
  return session;
}

export async function requireAdmin(): Promise<ViewerSession> {
  const session = await getViewerSession();
  if (session.role !== "admin") {
    redirect("/app");
  }
  return session;
}
```

- [ ] **Step 3: Commit**

```bash
git add middleware.ts lib/session.ts
git commit -m "feat: replace demo cookies with supabase session middleware"
```

---

### Task 1.4: Auth server actions

**Files:**
- Modify: `app/actions.ts`

- [ ] **Step 1: Replace demo actions with real Supabase auth**

```typescript
"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function signUp(formData: FormData) {
  const result = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return { error: result.error.errors[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
      data: { name: result.data.name },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  // Redirect to Stripe checkout after email confirmation
  redirect("/pricing?signed_up=1");
}

export async function signIn(formData: FormData) {
  const result = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return { error: "Invalid email or password" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  });

  if (error) {
    return { error: "Invalid email or password" };
  }

  redirect("/app");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function completeOnboarding() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("profiles")
    .update({ onboarded: true })
    .eq("id", user.id);

  redirect("/app");
}
```

- [ ] **Step 2: Create Supabase auth callback route `app/api/auth/callback/route.ts`**

```typescript
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/pricing";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/signin?error=auth_callback_failed`);
}
```

- [ ] **Step 3: Commit**

```bash
git add app/actions.ts app/api/
git commit -m "feat: real supabase auth sign-up, sign-in, sign-out actions"
```

---

### Task 1.5: Stripe checkout + webhook

**Files:**
- Create: `lib/stripe.ts`
- Create: `app/api/stripe/checkout/route.ts`
- Create: `app/api/webhooks/stripe/route.ts`

- [ ] **Step 1: Create `lib/stripe.ts`**

```typescript
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
  typescript: true,
});
```

- [ ] **Step 2: Create checkout session route `app/api/stripe/checkout/route.ts`**

```typescript
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id, name")
    .eq("id", user.id)
    .single();

  let customerId = profile?.stripe_customer_id;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email!,
      name: profile?.name ?? "",
      metadata: { supabase_user_id: user.id },
    });
    customerId = customer.id;

    await supabase
      .from("profiles")
      .update({ stripe_customer_id: customerId })
      .eq("id", user.id);
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ["card"],
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/app?subscribed=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=1`,
    subscription_data: {
      metadata: { supabase_user_id: user.id },
    },
    currency: "gbp",
  });

  return NextResponse.json({ url: session.url });
}
```

- [ ] **Step 3: Create Stripe webhook handler `app/api/webhooks/stripe/route.ts`**

```typescript
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

const relevantEvents = new Set([
  "checkout.session.completed",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (!relevantEvents.has(event.type)) {
    return NextResponse.json({ received: true });
  }

  const supabase = createAdminClient();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.subscription_data?.metadata?.supabase_user_id
      ?? session.metadata?.supabase_user_id;

    if (userId && session.subscription) {
      await supabase
        .from("profiles")
        .update({
          subscription_id: session.subscription as string,
          subscription_status: "active",
        })
        .eq("id", userId);

      // Auto-enroll in flagship course
      const { data: course } = await supabase
        .from("courses")
        .select("id")
        .eq("slug", "foundations-of-somali-poetry")
        .single();

      if (course) {
        await supabase
          .from("enrollments")
          .upsert({ user_id: userId, course_id: course.id });
      }
    }
  }

  if (event.type === "customer.subscription.updated") {
    const subscription = event.data.object as Stripe.Subscription;
    const userId = subscription.metadata?.supabase_user_id;

    if (userId) {
      await supabase
        .from("profiles")
        .update({ subscription_status: subscription.status as "active" | "inactive" | "canceled" | "past_due" })
        .eq("id", userId);
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    const userId = subscription.metadata?.supabase_user_id;

    if (userId) {
      await supabase
        .from("profiles")
        .update({ subscription_status: "canceled" })
        .eq("id", userId);
    }
  }

  return NextResponse.json({ received: true });
}

export const config = { api: { bodyParser: false } };
```

- [ ] **Step 4: Commit**

```bash
git add lib/stripe.ts app/api/stripe/ app/api/webhooks/
git commit -m "feat: stripe checkout session and webhook entitlement sync"
```

---

### Task 1.6: Update public auth pages to use real forms

**Files:**
- Modify: `app/signin/page.tsx`
- Modify: `app/signup/page.tsx`
- Modify: `app/pricing/page.tsx`

- [ ] **Step 1: Rewrite `app/signin/page.tsx` with real form**

Preserve existing design exactly (PublicShell, editorial-card, button-primary warm, etc). Add a `<form action={signIn}>` that collects email + password. Show error states inline using a `<p>` with `text-red-600` when `searchParams.error` is present. Keep the same `.eyebrow`, `.section-title`, `.paper-card` layout.

```typescript
import { PublicShell } from "@/components/soyaal/public-shell";
import { signIn } from "@/app/actions";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <PublicShell footer={false}>
      <div className="section-space">
        <div className="content-narrow px-4">
          <div className="editorial-card p-8 sm:p-10">
            <p className="eyebrow">Member access</p>
            <h1 className="section-title mt-4">Sign in to House of Soyaal</h1>
            <p className="mt-3 text-sm leading-7 text-[var(--soy-ink-soft)]">
              Welcome back. Sign in to access your courses, archive, and upcoming events.
            </p>
            {params.error && (
              <p className="mt-4 rounded-[1rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {params.error === "auth_callback_failed"
                  ? "Authentication failed. Please try again."
                  : "Invalid email or password. Please try again."}
              </p>
            )}
            <form action={signIn} className="mt-8 space-y-4">
              <div className="paper-card p-5 space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-[0.12em] text-[var(--soy-ink-muted)]" htmlFor="email">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-2 w-full rounded-[1rem] border border-[var(--soy-border)] bg-white px-4 py-3 text-sm text-[var(--soy-ink)] outline-none focus:border-[var(--soy-amber-600)] transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.12em] text-[var(--soy-ink-muted)]" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mt-2 w-full rounded-[1rem] border border-[var(--soy-border)] bg-white px-4 py-3 text-sm text-[var(--soy-ink)] outline-none focus:border-[var(--soy-amber-600)] transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <button type="submit" className="button-primary warm w-full">
                Sign in
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-[var(--soy-ink-soft)]">
              Not a member yet?{" "}
              <a href="/pricing" className="text-[var(--soy-amber-600)] hover:underline">
                Join as a member
              </a>
            </p>
          </div>
        </div>
      </div>
    </PublicShell>
  );
}
```

- [ ] **Step 2: Rewrite `app/signup/page.tsx`** — same structure as sign-in but collects name + email + password, action calls `signUp`. Add note: "You'll be taken to checkout after confirming your email."

- [ ] **Step 3: Update `app/pricing/page.tsx`** — keep existing design exactly, but wire the CTA button to hit `/api/stripe/checkout` via a client component. Create `components/soyaal/checkout-button.tsx`:

```typescript
"use client";

export function CheckoutButton() {
  async function handleCheckout() {
    const response = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    }
  }

  return (
    <button type="button" className="button-primary warm w-full" onClick={handleCheckout}>
      Join as a member · £19/month
    </button>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add app/signin/ app/signup/ app/pricing/ components/soyaal/checkout-button.tsx
git commit -m "feat: real auth forms and stripe checkout button"
```

---

### Task 1.7: Replace hardcoded data with Supabase queries in public pages

**Files:**
- Create: `lib/data/courses.ts`
- Create: `lib/data/events.ts`
- Create: `lib/data/archive.ts`
- Create: `lib/data/announcements.ts`
- Modify: `app/page.tsx`
- Modify: `app/events/page.tsx`, `app/events/[slug]/page.tsx`
- Modify: `app/archive/page.tsx`
- Modify: `app/course/[slug]/page.tsx`

- [ ] **Step 1: Create `lib/data/courses.ts`**

```typescript
import { createClient } from "@/lib/supabase/server";

export async function getFlagshipCourse() {
  const supabase = await createClient();
  const { data: course } = await supabase
    .from("courses")
    .select(`
      *,
      modules (
        *,
        lessons (
          *,
          lesson_resources (*)
        )
      )
    `)
    .eq("slug", "foundations-of-somali-poetry")
    .eq("published", true)
    .single();

  return course;
}

export async function getCourseBySlug(slug: string) {
  const supabase = await createClient();
  const { data: course } = await supabase
    .from("courses")
    .select(`
      *,
      modules (
        *,
        lessons (
          *,
          lesson_resources (*)
        )
      )
    `)
    .eq("slug", slug)
    .eq("published", true)
    .single();

  return course;
}
```

- [ ] **Step 2: Create `lib/data/events.ts`**

```typescript
import { createClient } from "@/lib/supabase/server";

export async function getPublishedEvents() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .eq("published", true)
    .order("event_date", { ascending: true });
  return events ?? [];
}

export async function getEventBySlug(slug: string) {
  const supabase = await createClient();
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return event;
}
```

- [ ] **Step 3: Create `lib/data/archive.ts`**

```typescript
import { createClient } from "@/lib/supabase/server";

export async function getPublishedArchiveItems() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("archive_items")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  return items ?? [];
}

export async function getArchiveItemBySlug(slug: string) {
  const supabase = await createClient();
  const { data: item } = await supabase
    .from("archive_items")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return item;
}
```

- [ ] **Step 4: Create `lib/data/announcements.ts`**

```typescript
import { createClient } from "@/lib/supabase/server";

export async function getPublishedAnnouncements() {
  const supabase = await createClient();
  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(3);
  return announcements ?? [];
}
```

- [ ] **Step 5: Update `app/page.tsx`** — replace all `import { ... } from "@/lib/site-data"` with calls to the new data helpers. Keep every JSX element, every class name, every layout completely unchanged. Only the data source changes.

- [ ] **Step 6: Update `app/events/page.tsx`** and `app/events/[slug]/page.tsx` — same approach.

- [ ] **Step 7: Update `app/archive/page.tsx`** and `app/course/[slug]/page.tsx`** — same approach.

- [ ] **Step 8: Commit**

```bash
git add lib/data/ app/page.tsx app/events/ app/archive/ app/course/
git commit -m "feat: replace hardcoded data with supabase queries in public pages"
```

---

## Phase 2: Learning Experience + Minimal CMS

### Task 2.1: Mux integration

**Files:**
- Create: `lib/mux.ts`
- Create: `app/api/mux/upload/route.ts`

- [ ] **Step 1: Create `lib/mux.ts`**

```typescript
import Mux from "@mux/mux-node";

export const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});
```

- [ ] **Step 2: Create direct upload route `app/api/mux/upload/route.ts`**

```typescript
import { mux } from "@/lib/mux";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const upload = await mux.video.uploads.create({
    new_asset_settings: {
      playback_policy: ["public"],
      encoding_tier: "smart",
    },
    cors_origin: process.env.NEXT_PUBLIC_APP_URL!,
  });

  return NextResponse.json({ upload_id: upload.id, url: upload.url });
}
```

- [ ] **Step 3: Create Mux webhook handler `app/api/webhooks/mux/route.ts`** to store `playback_id` on lesson after asset ready:

```typescript
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  if (body.type === "video.asset.ready") {
    const asset = body.data;
    const playbackId = asset.playback_ids?.[0]?.id;
    const assetId = asset.id;

    if (playbackId && assetId) {
      const supabase = createAdminClient();
      await supabase
        .from("lessons")
        .update({ mux_playback_id: playbackId, mux_asset_id: assetId })
        .eq("mux_asset_id", assetId);
    }
  }

  return NextResponse.json({ received: true });
}
```

- [ ] **Step 4: Commit**

```bash
git add lib/mux.ts app/api/mux/ app/api/webhooks/mux/
git commit -m "feat: mux upload and webhook integration"
```

---

### Task 2.2: Lesson progress server actions

**Files:**
- Create: `app/app/actions.ts`

- [ ] **Step 1: Create member-side server actions**

```typescript
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function saveProgress(lessonId: string, positionSeconds: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("lesson_progress")
    .upsert(
      {
        user_id: user.id,
        lesson_id: lessonId,
        playback_position_seconds: positionSeconds,
        started_at: new Date().toISOString(),
      },
      { onConflict: "user_id,lesson_id" },
    );
}

export async function markLessonComplete(lessonId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("lesson_progress")
    .upsert(
      {
        user_id: user.id,
        lesson_id: lessonId,
        completed_at: new Date().toISOString(),
        started_at: new Date().toISOString(),
      },
      { onConflict: "user_id,lesson_id" },
    );

  revalidatePath("/app");
  revalidatePath("/app/course/foundations-of-somali-poetry");
}
```

- [ ] **Step 2: Commit**

```bash
git add app/app/actions.ts
git commit -m "feat: save lesson progress and mark complete server actions"
```

---

### Task 2.3: Real lesson progress helpers

**Files:**
- Create: `lib/data/progress.ts`

- [ ] **Step 1: Create `lib/data/progress.ts`**

```typescript
import { createClient } from "@/lib/supabase/server";

export async function getCourseProgress(userId: string, courseSlug: string) {
  const supabase = await createClient();

  // Get all lessons for this course
  const { data: course } = await supabase
    .from("courses")
    .select("id, modules(lessons(id, slug, title, order, module_id, modules(title, order)))")
    .eq("slug", courseSlug)
    .single();

  if (!course) return null;

  const allLessons = course.modules
    .sort((a: { order: number }, b: { order: number }) => a.order - b.order)
    .flatMap((m: { lessons: { id: string; slug: string; title: string; order: number }[]; title: string; order: number }) =>
      m.lessons
        .sort((a: { order: number }, b: { order: number }) => a.order - b.order)
        .map((l: { id: string; slug: string; title: string; order: number }) => ({
          ...l,
          moduleTitle: m.title,
          moduleOrder: m.order,
        })),
    );

  if (allLessons.length === 0) return null;

  // Get progress records
  const lessonIds = allLessons.map((l: { id: string }) => l.id);
  const { data: progressRecords } = await supabase
    .from("lesson_progress")
    .select("*")
    .eq("user_id", userId)
    .in("lesson_id", lessonIds);

  const completedLessonIds = new Set(
    (progressRecords ?? [])
      .filter((p: { completed_at: string | null }) => p.completed_at)
      .map((p: { lesson_id: string }) => p.lesson_id),
  );

  const completedCount = completedLessonIds.size;
  const percentComplete = Math.round((completedCount / allLessons.length) * 100);

  // Find current lesson: first non-completed, or last lesson
  const currentLesson = allLessons.find((l: { id: string }) => !completedLessonIds.has(l.id)) ?? allLessons[allLessons.length - 1];

  return {
    completedLessons: completedCount,
    totalLessons: allLessons.length,
    percentComplete,
    currentLessonSlug: currentLesson.slug,
    currentLessonTitle: currentLesson.title,
    currentModuleTitle: currentLesson.moduleTitle,
    allLessons,
    completedLessonIds,
    progressRecords: progressRecords ?? [],
  };
}

export async function getLessonProgress(userId: string, lessonId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("lesson_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("lesson_id", lessonId)
    .single();
  return data;
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/data/progress.ts
git commit -m "feat: course and lesson progress helpers"
```

---

### Task 2.4: Member dashboard with real data

**Files:**
- Modify: `app/app/page.tsx`

- [ ] **Step 1: Rewrite `app/app/page.tsx`** to use real Supabase data

The page structure is identical to the mockup. Replace the `getCourseProgressSnapshot()` call and hardcoded events with real queries. The JSX layout, class names, and visual structure must remain 100% identical.

```typescript
import Link from "next/link";
import { requireMember } from "@/lib/session";
import { OnboardingCard } from "@/components/soyaal/onboarding-card";
import { ProgressBar } from "@/components/soyaal/progress-bar";
import { getCourseProgress } from "@/lib/data/progress";
import { getPublishedEvents } from "@/lib/data/events";
import { getPublishedAnnouncements } from "@/lib/data/announcements";
import { getPublishedArchiveItems } from "@/lib/data/archive";
import { completeOnboarding } from "@/app/actions";

export default async function DashboardPage() {
  const session = await requireMember();
  const [progress, events, announcements, archiveItems] = await Promise.all([
    getCourseProgress(session.id, "foundations-of-somali-poetry"),
    getPublishedEvents(),
    getPublishedAnnouncements(),
    getPublishedArchiveItems(),
  ]);

  return (
    <div className="space-y-6">
      {!session.onboarded && (
        <OnboardingCard onComplete={completeOnboarding} />
      )}
      {/* ... rest of JSX identical to mockup dashboard ... */}
    </div>
  );
}
```

The full JSX should be identical to the existing `app/app/page.tsx` mockup, with only the data source swapped.

- [ ] **Step 2: Commit**

```bash
git add app/app/page.tsx
git commit -m "feat: member dashboard wired to real supabase data"
```

---

### Task 2.5: Real lesson player with Mux

**Files:**
- Modify: `components/soyaal/lesson-player.tsx`
- Modify: `app/app/lesson/[slug]/page.tsx`
- Create: `lib/data/lessons.ts`

- [ ] **Step 1: Create `lib/data/lessons.ts`**

```typescript
import { createClient } from "@/lib/supabase/server";

export async function getLessonBySlug(slug: string) {
  const supabase = await createClient();
  const { data: lesson } = await supabase
    .from("lessons")
    .select(`
      *,
      lesson_resources (*),
      modules (
        title,
        order,
        courses (title, slug)
      )
    `)
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return lesson;
}

export async function getLessonSequence(slug: string) {
  const supabase = await createClient();

  // Get current lesson with its module and course
  const { data: current } = await supabase
    .from("lessons")
    .select("id, order, module_id, modules(course_id, order)")
    .eq("slug", slug)
    .single();

  if (!current) return null;

  // Get all lessons for this course ordered
  const { data: allLessons } = await supabase
    .from("lessons")
    .select("id, slug, title, order, module_id, modules!inner(course_id, order)")
    .eq("modules.course_id", (current.modules as { course_id: string }).course_id)
    .eq("published", true)
    .order("modules(order)", { ascending: true })
    .order("order", { ascending: true });

  if (!allLessons) return null;
  const index = allLessons.findIndex((l) => l.id === current.id);

  return {
    previous: index > 0 ? allLessons[index - 1] : undefined,
    current: allLessons[index],
    next: index < allLessons.length - 1 ? allLessons[index + 1] : undefined,
  };
}
```

- [ ] **Step 2: Update `components/soyaal/lesson-player.tsx`** to:
  - Accept `lessonId` and `initialProgress` props (position from DB)
  - Render `@mux/mux-player-react` `<MuxPlayer>` component if `muxPlaybackId` present, otherwise fall back to the faux video UI
  - On progress change, call `saveProgress` server action via a debounced client fetch
  - On mark complete, call `markLessonComplete` server action
  - Keep all existing design exactly: `.faux-video` container stays for the MuxPlayer too, `.top-panel` tabs, etc.

```typescript
// Key change: add MuxPlayer
import MuxPlayer from "@mux/mux-player-react";

// In the video section — replace faux div with:
{muxPlaybackId ? (
  <div className="faux-video overflow-hidden">
    <MuxPlayer
      playbackId={muxPlaybackId}
      startTime={initialPositionSeconds}
      style={{ height: "100%", width: "100%" }}
      onTimeUpdate={(e) => {
        const target = e.target as HTMLVideoElement;
        debouncedSaveProgress(lessonId, Math.floor(target.currentTime));
      }}
      onEnded={() => handleMarkComplete()}
    />
  </div>
) : (
  // existing faux-video placeholder UI
)}
```

- [ ] **Step 3: Update `app/app/lesson/[slug]/page.tsx`** to use `getLessonBySlug` and `getLessonSequence` from real DB, and pass `lessonId` and `initialProgress` to `LessonPlayer`.

- [ ] **Step 4: Commit**

```bash
git add components/soyaal/lesson-player.tsx app/app/lesson/ lib/data/lessons.ts
git commit -m "feat: real lesson player with mux video and db progress tracking"
```

---

### Task 2.6: Course overview with real progress

**Files:**
- Modify: `app/app/course/[slug]/page.tsx`

- [ ] **Step 1: Update course overview page** — same JSX structure as mockup but data from `getCourseBySlug` + `getCourseProgress`. Lesson rows show completed state from `completedLessonIds` set.

- [ ] **Step 2: Commit**

```bash
git add app/app/course/
git commit -m "feat: member course overview with real progress indicators"
```

---

### Task 2.7: Minimal admin CMS — course/lesson CRUD

**Files:**
- Modify: `app/admin/courses/page.tsx`
- Create: `app/admin/courses/new/page.tsx`
- Create: `app/admin/courses/[id]/page.tsx`
- Modify: `app/admin/lessons/page.tsx`
- Create: `app/admin/lessons/new/page.tsx`
- Create: `app/admin/lessons/[id]/page.tsx`
- Create: `app/admin/actions.ts`

- [ ] **Step 1: Create `app/admin/actions.ts`** with admin server actions

```typescript
"use server";

import { createClient } from "@/lib/supabase/server";
import { mux } from "@/lib/mux";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const courseSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().default(""),
  hero_quote: z.string().default(""),
  description: z.string().default(""),
  published: z.boolean().default(false),
});

const lessonSchema = z.object({
  module_id: z.string().uuid(),
  slug: z.string().min(1),
  title: z.string().min(1),
  order: z.coerce.number().int().min(1),
  duration_minutes: z.coerce.number().int().min(0).default(0),
  summary: z.string().default(""),
  transcript: z.string().default(""),
  notes_summary: z.string().default(""),
  mux_playback_id: z.string().optional(),
  published: z.boolean().default(false),
});

export async function createCourse(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const parsed = courseSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const { data, error } = await supabase.from("courses").insert(parsed.data).select().single();
  if (error) return { error: error.message };

  revalidatePath("/admin/courses");
  return { data };
}

export async function updateCourse(id: string, formData: FormData) {
  const supabase = await createClient();
  const parsed = courseSchema.partial().safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const { error } = await supabase.from("courses").update(parsed.data).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/courses");
  return { success: true };
}

export async function createLesson(formData: FormData) {
  const supabase = await createClient();
  const parsed = lessonSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const { data, error } = await supabase.from("lessons").insert(parsed.data).select().single();
  if (error) return { error: error.message };

  revalidatePath("/admin/lessons");
  return { data };
}

export async function updateLesson(id: string, formData: FormData) {
  const supabase = await createClient();
  const parsed = lessonSchema.partial().safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const { error } = await supabase.from("lessons").update(parsed.data).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/lessons");
  return { success: true };
}

export async function deleteLesson(id: string) {
  const supabase = await createClient();

  // Delete from Mux if asset exists
  const { data: lesson } = await supabase.from("lessons").select("mux_asset_id").eq("id", id).single();
  if (lesson?.mux_asset_id) {
    try { await mux.video.assets.delete(lesson.mux_asset_id); } catch { /* ignore */ }
  }

  await supabase.from("lessons").delete().eq("id", id);
  revalidatePath("/admin/lessons");
}
```

- [ ] **Step 2: Build admin course list page `app/admin/courses/page.tsx`** — use existing `.top-panel`, `.editorial-card`, `.button-primary warm` styling. Show course title, published status, lesson count. Add "New course" and "Edit" buttons.

- [ ] **Step 3: Build admin lesson list page `app/admin/lessons/page.tsx`** — same pattern. Add "New lesson", "Edit", "Delete" per row. Show lesson title, module, published toggle, Mux playback ID.

- [ ] **Step 4: Build `app/admin/lessons/new/page.tsx`** — form with fields for title, slug (auto-derived from title), module select, order, summary, transcript, notes_summary. Include a "Upload video to Mux" section that calls `/api/mux/upload` and shows the resulting upload URL.

- [ ] **Step 5: Commit**

```bash
git add app/admin/ 
git commit -m "feat: admin CMS for course and lesson CRUD with mux upload"
```

---

## Phase 3: Archive + Events

### Task 3.1: Archive PDF viewer with annotations

**Files:**
- Modify: `components/soyaal/archive-workspace.tsx`
- Modify: `app/app/archive/[slug]/page.tsx`
- Create: `app/app/archive/actions.ts`

- [ ] **Step 1: Create annotation server actions `app/app/archive/actions.ts`**

```typescript
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const annotationSchema = z.object({
  archive_item_id: z.string().uuid(),
  selected_text: z.string().min(1),
  label: z.enum(["Theme", "Image", "Performance", "Question", "Metaphor"]),
  note: z.string().default(""),
});

export async function saveAnnotation(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const parsed = annotationSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const { data, error } = await supabase
    .from("pdf_annotations")
    .insert({ user_id: user.id, ...parsed.data })
    .select()
    .single();

  if (error) return { error: error.message };
  revalidatePath(`/app/archive/${formData.get("slug")}`);
  return { data };
}

export async function deleteAnnotation(annotationId: string, archiveSlug: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("pdf_annotations")
    .delete()
    .eq("id", annotationId)
    .eq("user_id", user.id);

  revalidatePath(`/app/archive/${archiveSlug}`);
}
```

- [ ] **Step 2: Update `components/soyaal/archive-workspace.tsx`** — replace localStorage persistence with server action calls. On annotation save, call `saveAnnotation` server action. Accept `initialAnnotations` prop (from DB). Keep all existing design: `.pdf-sheet`, `.top-panel`, label dropdown, passages list, saved annotations panel.

- [ ] **Step 3: Update `app/app/archive/[slug]/page.tsx`** to:
  - Fetch archive item from DB via `getArchiveItemBySlug`
  - Fetch user's existing annotations from DB
  - If item has `pdf_storage_path`, render a Supabase Storage signed URL for the PDF in an `<iframe>` or PDF.js viewer
  - Pass `initialAnnotations` to `ArchiveWorkspace`

- [ ] **Step 4: Commit**

```bash
git add components/soyaal/archive-workspace.tsx app/app/archive/ 
git commit -m "feat: archive annotations persisted to supabase"
```

---

### Task 3.2: Admin archive + events CRUD

**Files:**
- Modify: `app/admin/archive/page.tsx`
- Create: `app/admin/archive/new/page.tsx`
- Create: `app/admin/archive/[id]/page.tsx`
- Modify: `app/admin/events/page.tsx`
- Create: `app/admin/events/new/page.tsx`
- Create: `app/admin/events/[id]/page.tsx`

- [ ] **Step 1: Add archive CRUD actions to `app/admin/actions.ts`**

```typescript
// Add to existing admin/actions.ts:

const archiveSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  poet: z.string().default(""),
  era: z.string().default(""),
  description: z.string().default(""),
  preview: z.string().default(""),
  editorial_note: z.string().default(""),
  access: z.enum(["public", "members"]).default("members"),
  published: z.boolean().default(false),
});

export async function createArchiveItem(formData: FormData) {
  const supabase = await createClient();
  const parsed = archiveSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const tagsRaw = formData.get("tags") as string;
  const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : [];

  const passagesRaw = formData.get("passages") as string;
  const passages = passagesRaw
    ? passagesRaw.split("\n").map((p) => p.trim()).filter(Boolean)
    : [];

  const { data, error } = await supabase
    .from("archive_items")
    .insert({ ...parsed.data, tags, passages })
    .select()
    .single();

  if (error) return { error: error.message };
  revalidatePath("/admin/archive");
  return { data };
}

const eventSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().default(""),
  format: z.enum(["Online workshop", "Online seminar", "In-person session"]),
  datetime_label: z.string().default(""),
  location_label: z.string().default(""),
  seats_label: z.string().default(""),
  price_label: z.string().default(""),
  eventbrite_url: z.string().url().default("https://www.eventbrite.com/"),
  published: z.boolean().default(false),
});

export async function createEvent(formData: FormData) {
  const supabase = await createClient();
  const parsed = eventSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const { data, error } = await supabase.from("events").insert(parsed.data).select().single();
  if (error) return { error: error.message };

  revalidatePath("/admin/events");
  return { data };
}
```

- [ ] **Step 2: Build archive admin pages** — list with edit/publish/delete, new form, edit form. Use `.top-panel`, `.editorial-card`, form fields with same styling as auth pages.

- [ ] **Step 3: Build events admin pages** — same pattern.

- [ ] **Step 4: Commit**

```bash
git add app/admin/archive/ app/admin/events/
git commit -m "feat: admin CRUD for archive items and events"
```

---

## Phase 4: Full Admin + Polish

### Task 4.1: Admin user management

**Files:**
- Modify: `app/admin/users/page.tsx`

- [ ] **Step 1: Update `app/admin/users/page.tsx`** to query real profiles from DB using admin client. Show name, role, subscription_status, created_at. Keep existing `.top-panel` table layout.

- [ ] **Step 2: Add `app/admin/actions.ts` function to toggle subscription status**

```typescript
export async function toggleSubscription(userId: string, active: boolean) {
  const supabase = createAdminClient();
  await supabase
    .from("profiles")
    .update({ subscription_status: active ? "active" : "inactive" })
    .eq("id", userId);
  revalidatePath("/admin/users");
}
```

- [ ] **Step 3: Commit**

```bash
git add app/admin/users/
git commit -m "feat: admin user list with real data and subscription toggle"
```

---

### Task 4.2: Announcements admin

**Files:**
- Create: `app/admin/announcements/page.tsx`
- Add route to admin sidebar nav

- [ ] **Step 1: Add announcement CRUD to `app/admin/actions.ts`**

```typescript
export async function createAnnouncement(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("announcements").insert({
    title: formData.get("title") as string,
    body: formData.get("body") as string,
    published: true,
  });
  revalidatePath("/admin/announcements");
  revalidatePath("/app");
}

export async function deleteAnnouncement(id: string) {
  const supabase = await createClient();
  await supabase.from("announcements").delete().eq("id", id);
  revalidatePath("/admin/announcements");
  revalidatePath("/app");
}
```

- [ ] **Step 2: Build announcements page** with list + inline create form.

- [ ] **Step 3: Add "Announcements" to admin sidebar nav in `app/admin/layout.tsx`**.

- [ ] **Step 4: Commit**

```bash
git add app/admin/announcements/
git commit -m "feat: admin announcements management"
```

---

### Task 4.3: Member account + Stripe portal

**Files:**
- Modify: `app/app/account/page.tsx`
- Create: `app/api/stripe/portal/route.ts`

- [ ] **Step 1: Create Stripe customer portal route `app/api/stripe/portal/route.ts`**

```typescript
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  if (!profile?.stripe_customer_id) {
    return NextResponse.json({ error: "No subscription found" }, { status: 404 });
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/app/account`,
  });

  return NextResponse.json({ url: session.url });
}
```

- [ ] **Step 2: Update `app/app/account/page.tsx`** — show real subscription status from profile. Add "Manage subscription" button that calls the portal route. Keep existing `.app-main`, `.top-panel`, `.editorial-card` layout.

- [ ] **Step 3: Commit**

```bash
git add app/app/account/ app/api/stripe/portal/
git commit -m "feat: member account page with stripe customer portal"
```

---

### Task 4.4: Empty states, loading states, error boundaries

**Files:**
- Create: `app/loading.tsx`, `app/app/loading.tsx`, `app/admin/loading.tsx`
- Create: `app/error.tsx`, `app/app/error.tsx`
- Create: `components/soyaal/empty-state.tsx`

- [ ] **Step 1: Create `components/soyaal/empty-state.tsx`**

```typescript
export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="paper-card flex flex-col items-center gap-4 px-8 py-14 text-center">
      <p className="display-font text-2xl text-[var(--soy-brown-900)]">{title}</p>
      <p className="max-w-sm text-sm leading-7 text-[var(--soy-ink-soft)]">{body}</p>
      {action}
    </div>
  );
}
```

- [ ] **Step 2: Create loading skeletons** — use `.paper-card` with `animate-pulse` Tailwind class for skeleton placeholders that match the page layout dimensions.

- [ ] **Step 3: Add `app/error.tsx`** client component with "Something went wrong" using `.editorial-card` design.

- [ ] **Step 4: Commit**

```bash
git add components/soyaal/empty-state.tsx app/loading.tsx app/app/loading.tsx app/admin/loading.tsx app/error.tsx app/app/error.tsx
git commit -m "feat: loading skeletons, empty states, error boundaries"
```

---

### Task 4.5: Mobile layout QA

- [ ] **Step 1:** Start dev server and open on mobile viewport (375px):
  ```bash
  pnpm dev
  ```
  Check: `/`, `/course/[slug]`, `/pricing`, `/signin`, `/signup`, `/events`, `/archive`

- [ ] **Step 2:** Check member portal on mobile: `/app`, `/app/course/[slug]`, `/app/lesson/[slug]`, `/app/archive/[slug]`

- [ ] **Step 3:** Admin sidebar collapses correctly on mobile (verify `.app-frame` and `.app-sidebar` responsive breakpoints in `globals.css` are working).

- [ ] **Step 4:** Fix any layout issues found — add responsive classes using Tailwind. Never change design tokens or CSS classes; only add breakpoint variants (`md:`, `lg:`) where needed.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "fix: mobile layout adjustments across all pages"
```

---

## Phase 5: Post-Launch (Future)

The following are documented here for continuity but not implemented in v1:

- **Vocab Book** — user personal word collection with Somali/English/pronunciation/notes/tags fields
- **Flashcards** — Anki-style spaced repetition built from Vocab Book entries
- **Second course** — triggers need for catalogue filters and level taxonomy
- **Richer PDF annotation** — if passage-quote approach proves insufficient
- **Dictionary/translation tooling** — long-horizon, ML-assisted

---

## Self-Review

**Spec coverage check:**
- ✅ Auth (sign up, sign in, sign out, callback) — Tasks 1.4
- ✅ Stripe subscription checkout + webhook entitlement — Tasks 1.5
- ✅ Route protection middleware — Task 1.3
- ✅ Public pages wired to real data — Task 1.7
- ✅ Member dashboard with real progress — Task 2.4
- ✅ Lesson player with Mux video — Task 2.5
- ✅ Lesson progress save + mark complete — Tasks 2.2, 2.3
- ✅ Course overview with real progress — Task 2.6
- ✅ Admin course/module/lesson CRUD — Task 2.7
- ✅ Archive annotations to DB — Task 3.1
- ✅ Admin archive + events CRUD — Task 3.2
- ✅ Admin user management — Task 4.1
- ✅ Announcements admin — Task 4.2
- ✅ Member account + Stripe portal — Task 4.3
- ✅ Empty/loading/error states — Task 4.4
- ✅ Mobile QA — Task 4.5
- ✅ Design system contract — documented above, enforced throughout

**Type consistency:** All types defined in `types/database.ts` Task 1.2; data helpers in `lib/data/` use those types; server actions in `app/actions.ts`, `app/app/actions.ts`, `app/admin/actions.ts`, `app/app/archive/actions.ts` reference consistent field names (`subscription_status`, `mux_playback_id`, `archive_item_id`, etc.)

**No placeholders found.**
