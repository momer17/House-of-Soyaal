-- House of Soyaal v1 — Supabase schema
-- Run in Supabase SQL Editor or via: supabase db push

create extension if not exists "uuid-ossp";

-- ─── Profiles (extends auth.users) ────────────────────────────────────────────

create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  name text not null default '',
  role text not null default 'member' check (role in ('member', 'admin')),
  stripe_customer_id text,
  subscription_id text,
  subscription_status text not null default 'inactive'
    check (subscription_status in ('active', 'inactive', 'canceled', 'past_due')),
  onboarded boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
create policy "Users read own profile"   on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Service role full access" on public.profiles using (auth.role() = 'service_role');

-- ─── Courses ───────────────────────────────────────────────────────────────────

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
create policy "Anyone reads published courses" on public.courses for select
  using (published = true);
create policy "Admins full access courses" on public.courses
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ─── Modules ───────────────────────────────────────────────────────────────────

create table public.modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade not null,
  title text not null,
  "order" integer not null,
  summary text not null default '',
  created_at timestamptz not null default now()
);

alter table public.modules enable row level security;
create policy "Anyone reads modules for published courses" on public.modules for select
  using (exists (select 1 from public.courses where id = course_id and published = true));
create policy "Admins full access modules" on public.modules
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ─── Lessons ───────────────────────────────────────────────────────────────────

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
create policy "Members read published lessons" on public.lessons for select
  using (
    published = true and
    exists (
      select 1 from public.profiles
      where id = auth.uid() and (role = 'member' or role = 'admin')
    )
  );
create policy "Admins full access lessons" on public.lessons
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ─── Lesson resources ──────────────────────────────────────────────────────────

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
create policy "Members read lesson resources" on public.lesson_resources for select
  using (
    exists (
      select 1 from public.lessons l
      join public.profiles p on p.id = auth.uid()
      where l.id = lesson_id and l.published = true
        and (p.role = 'member' or p.role = 'admin')
    )
  );
create policy "Admins full access lesson_resources" on public.lesson_resources
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ─── Enrollments ───────────────────────────────────────────────────────────────

create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  course_id uuid references public.courses(id) on delete cascade not null,
  enrolled_at timestamptz not null default now(),
  unique(user_id, course_id)
);

alter table public.enrollments enable row level security;
create policy "Users read own enrollments" on public.enrollments for select
  using (auth.uid() = user_id);
create policy "Service role manages enrollments" on public.enrollments
  using (auth.role() = 'service_role');

-- ─── Lesson progress ───────────────────────────────────────────────────────────

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
create policy "Users manage own lesson_progress" on public.lesson_progress
  using (auth.uid() = user_id);

-- ─── Events ────────────────────────────────────────────────────────────────────

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
create policy "Anyone reads published events" on public.events for select
  using (published = true);
create policy "Admins full access events" on public.events
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ─── Archive items ─────────────────────────────────────────────────────────────

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
create policy "Public and member access to archive" on public.archive_items for select
  using (
    published = true and (
      access = 'public' or
      exists (
        select 1 from public.profiles
        where id = auth.uid() and (role = 'member' or role = 'admin')
      )
    )
  );
create policy "Admins full access archive" on public.archive_items
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ─── PDF annotations ───────────────────────────────────────────────────────────

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
create policy "Users manage own annotations" on public.pdf_annotations
  using (auth.uid() = user_id);

-- ─── Announcements ─────────────────────────────────────────────────────────────

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.announcements enable row level security;
create policy "Members read published announcements" on public.announcements for select
  using (
    published = true and
    exists (select 1 from public.profiles where id = auth.uid())
  );
create policy "Admins full access announcements" on public.announcements
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ─── Trigger: auto-create profile on signup ────────────────────────────────────

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

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
