-- Yama: Yamadori Scouting Platform
-- Run this ONLY on a brand-new Supabase project (empty public schema).
--
-- If you already have tables like `profiles`, do NOT run this file — you will get
-- "relation already exists". Use incremental_existing_project.sql instead.

-- ── Profiles ────────────────────────────────────────────────────
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  avatar_url text,
  is_premium boolean default false not null,
  created_at timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', new.raw_user_meta_data ->> 'picture')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── Saved Spots ─────────────────────────────────────────────────
create table public.saved_spots (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  spot_id text not null,
  notes text default '' not null,
  created_at timestamptz default now() not null,
  unique (user_id, spot_id)
);

alter table public.saved_spots enable row level security;

create policy "Users can read their own saved spots"
  on public.saved_spots for select
  using (auth.uid() = user_id);

create policy "Users can insert their own saved spots"
  on public.saved_spots for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own saved spots"
  on public.saved_spots for update
  using (auth.uid() = user_id);

create policy "Users can delete their own saved spots"
  on public.saved_spots for delete
  using (auth.uid() = user_id);

-- ── Trip Plans ──────────────────────────────────────────────────
create table public.trip_plans (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  name text not null,
  region text not null,
  notes text default '' not null,
  planned_date date,
  created_at timestamptz default now() not null
);

alter table public.trip_plans enable row level security;

create policy "Users can read their own trip plans"
  on public.trip_plans for select
  using (auth.uid() = user_id);

create policy "Users can insert their own trip plans"
  on public.trip_plans for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own trip plans"
  on public.trip_plans for update
  using (auth.uid() = user_id);

create policy "Users can delete their own trip plans"
  on public.trip_plans for delete
  using (auth.uid() = user_id);

-- ── Trip Plan Spots (join table) ────────────────────────────────
create table public.trip_plan_spots (
  id uuid default gen_random_uuid() primary key,
  trip_plan_id uuid references public.trip_plans on delete cascade not null,
  spot_id text not null,
  position int default 0 not null,
  unique (trip_plan_id, spot_id)
);

alter table public.trip_plan_spots enable row level security;

create policy "Users can read their own trip plan spots"
  on public.trip_plan_spots for select
  using (
    exists (
      select 1 from public.trip_plans
      where trip_plans.id = trip_plan_spots.trip_plan_id
        and trip_plans.user_id = auth.uid()
    )
  );

create policy "Users can insert their own trip plan spots"
  on public.trip_plan_spots for insert
  with check (
    exists (
      select 1 from public.trip_plans
      where trip_plans.id = trip_plan_spots.trip_plan_id
        and trip_plans.user_id = auth.uid()
    )
  );

create policy "Users can delete their own trip plan spots"
  on public.trip_plan_spots for delete
  using (
    exists (
      select 1 from public.trip_plans
      where trip_plans.id = trip_plan_spots.trip_plan_id
        and trip_plans.user_id = auth.uid()
    )
  );

-- ── User Markers (premium: personal tree pins) ───────────────
create table public.user_markers (
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

create policy "Users can read own markers"
  on public.user_markers for select
  using (auth.uid() = user_id);

create policy "Premium users can read shared markers"
  on public.user_markers for select
  using (
    visibility = 'premium_shared'
    and exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.is_premium = true
    )
  );

create policy "Users can insert own markers"
  on public.user_markers for insert
  with check (auth.uid() = user_id);

create policy "Users can update own markers"
  on public.user_markers for update
  using (auth.uid() = user_id);

create policy "Users can delete own markers"
  on public.user_markers for delete
  using (auth.uid() = user_id);

-- ── Marker Photos ─────────────────────────────────────────────
create table public.marker_photos (
  id uuid default gen_random_uuid() primary key,
  marker_id uuid references public.user_markers on delete cascade not null,
  storage_path text not null,
  caption text default '' not null,
  created_at timestamptz default now() not null
);

alter table public.marker_photos enable row level security;

create policy "Users can read own marker photos"
  on public.marker_photos for select
  using (
    exists (
      select 1 from public.user_markers
      where user_markers.id = marker_photos.marker_id
        and user_markers.user_id = auth.uid()
    )
  );

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

create policy "Users can insert own marker photos"
  on public.marker_photos for insert
  with check (
    exists (
      select 1 from public.user_markers
      where user_markers.id = marker_photos.marker_id
        and user_markers.user_id = auth.uid()
    )
  );

create policy "Users can delete own marker photos"
  on public.marker_photos for delete
  using (
    exists (
      select 1 from public.user_markers
      where user_markers.id = marker_photos.marker_id
        and user_markers.user_id = auth.uid()
    )
  );

-- ── Journal Entries (premium: collection tracking) ────────────
create table public.journal_entries (
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

create policy "Users can read own journal entries"
  on public.journal_entries for select
  using (auth.uid() = user_id);

create policy "Users can insert own journal entries"
  on public.journal_entries for insert
  with check (auth.uid() = user_id);

create policy "Users can update own journal entries"
  on public.journal_entries for update
  using (auth.uid() = user_id);

create policy "Users can delete own journal entries"
  on public.journal_entries for delete
  using (auth.uid() = user_id);

-- ── Spot Photos (premium: photos on public spots) ────────────
create table public.spot_photos (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  spot_id text not null,
  storage_path text not null,
  caption text default '' not null,
  created_at timestamptz default now() not null
);

alter table public.spot_photos enable row level security;

create policy "Signed-in users can read spot photos"
  on public.spot_photos for select
  using (auth.uid() is not null);

create policy "Premium users can insert spot photos"
  on public.spot_photos for insert
  with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.is_premium = true
    )
  );

create policy "Users can delete own spot photos"
  on public.spot_photos for delete
  using (auth.uid() = user_id);

-- ── Storage bucket for photos ─────────────────────────────────
-- Run separately or via dashboard:
-- insert into storage.buckets (id, name, public)
-- values ('marker-photos', 'marker-photos', false);
