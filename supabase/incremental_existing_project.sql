-- Yama: apply on a project that ALREADY has profiles / saved_spots / etc.
-- Run this in the Supabase SQL Editor (not the full schema.sql — that is for empty projects only).
-- Safe to re-run: uses IF NOT EXISTS / DROP POLICY IF EXISTS where needed.

-- ── Profiles: premium flag ───────────────────────────────────
alter table public.profiles
  add column if not exists is_premium boolean default false not null;

-- Backfill in case column was added without default on older PG
update public.profiles set is_premium = false where is_premium is null;

-- ── User Markers ─────────────────────────────────────────────
create table if not exists public.user_markers (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  lat double precision not null,
  lng double precision not null,
  species text,
  status text default 'scouted' not null,
  notes text default '' not null,
  visibility text default 'private' not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.user_markers enable row level security;

drop policy if exists "Users can read own markers" on public.user_markers;
create policy "Users can read own markers"
  on public.user_markers for select
  using (auth.uid() = user_id);

drop policy if exists "Premium users can read shared markers" on public.user_markers;
create policy "Premium users can read shared markers"
  on public.user_markers for select
  using (
    visibility = 'premium_shared'
    and exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.is_premium = true
    )
  );

drop policy if exists "Users can insert own markers" on public.user_markers;
create policy "Users can insert own markers"
  on public.user_markers for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own markers" on public.user_markers;
create policy "Users can update own markers"
  on public.user_markers for update
  using (auth.uid() = user_id);

drop policy if exists "Users can delete own markers" on public.user_markers;
create policy "Users can delete own markers"
  on public.user_markers for delete
  using (auth.uid() = user_id);

-- ── Marker Photos ─────────────────────────────────────────────
create table if not exists public.marker_photos (
  id uuid default gen_random_uuid() primary key,
  marker_id uuid references public.user_markers on delete cascade not null,
  storage_path text not null,
  caption text default '' not null,
  created_at timestamptz default now() not null
);

alter table public.marker_photos enable row level security;

drop policy if exists "Users can read own marker photos" on public.marker_photos;
create policy "Users can read own marker photos"
  on public.marker_photos for select
  using (
    exists (
      select 1 from public.user_markers
      where user_markers.id = marker_photos.marker_id
        and user_markers.user_id = auth.uid()
    )
  );

drop policy if exists "Premium users can read shared marker photos" on public.marker_photos;
create policy "Premium users can read shared marker photos"
  on public.marker_photos for select
  using (
    exists (
      select 1 from public.user_markers
      where user_markers.id = marker_photos.marker_id
        and user_markers.visibility = 'premium_shared'
        and exists (
          select 1 from public.profiles
          where profiles.id = auth.uid() and profiles.is_premium = true
        )
    )
  );

drop policy if exists "Users can insert own marker photos" on public.marker_photos;
create policy "Users can insert own marker photos"
  on public.marker_photos for insert
  with check (
    exists (
      select 1 from public.user_markers
      where user_markers.id = marker_photos.marker_id
        and user_markers.user_id = auth.uid()
    )
  );

drop policy if exists "Users can delete own marker photos" on public.marker_photos;
create policy "Users can delete own marker photos"
  on public.marker_photos for delete
  using (
    exists (
      select 1 from public.user_markers
      where user_markers.id = marker_photos.marker_id
        and user_markers.user_id = auth.uid()
    )
  );

-- ── Journal Entries ───────────────────────────────────────────
create table if not exists public.journal_entries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  marker_id uuid references public.user_markers on delete set null,
  title text not null,
  body text default '' not null,
  entry_date date default current_date not null,
  stage text default 'scouted' not null,
  created_at timestamptz default now() not null
);

alter table public.journal_entries enable row level security;

drop policy if exists "Users can read own journal entries" on public.journal_entries;
create policy "Users can read own journal entries"
  on public.journal_entries for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own journal entries" on public.journal_entries;
create policy "Users can insert own journal entries"
  on public.journal_entries for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own journal entries" on public.journal_entries;
create policy "Users can update own journal entries"
  on public.journal_entries for update
  using (auth.uid() = user_id);

drop policy if exists "Users can delete own journal entries" on public.journal_entries;
create policy "Users can delete own journal entries"
  on public.journal_entries for delete
  using (auth.uid() = user_id);

-- ── Spot Photos ────────────────────────────────────────────────
create table if not exists public.spot_photos (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  spot_id text not null,
  storage_path text not null,
  caption text default '' not null,
  created_at timestamptz default now() not null
);

alter table public.spot_photos enable row level security;

drop policy if exists "Signed-in users can read spot photos" on public.spot_photos;
create policy "Signed-in users can read spot photos"
  on public.spot_photos for select
  using (auth.uid() is not null);

drop policy if exists "Premium users can insert spot photos" on public.spot_photos;
create policy "Premium users can insert spot photos"
  on public.spot_photos for insert
  with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.is_premium = true
    )
  );

drop policy if exists "Users can delete own spot photos" on public.spot_photos;
create policy "Users can delete own spot photos"
  on public.spot_photos for delete
  using (auth.uid() = user_id);
