-- Yama: Colorado Yamadori Scouting Platform
-- Run this in the Supabase SQL Editor after creating your project.

-- ── Profiles ────────────────────────────────────────────────────
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  avatar_url text,
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
