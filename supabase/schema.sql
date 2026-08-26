-- MugArchive collection table
-- sort_order preserves the original mugs.js State -> City -> Special ordering,
-- since MugGrid renders in raw fetch order with no client-side sort.

create table if not exists public.mugs (
  id text primary key,
  name text not null,
  category text not null check (category in ('State', 'City', 'Special')),
  state_id text,
  lat double precision,
  lon double precision,
  "group" text,
  sort_order integer not null
);

create index if not exists mugs_sort_order_idx on public.mugs (sort_order);

alter table public.mugs enable row level security;

create policy "Public read access"
  on public.mugs
  for select
  using (true);

-- Required for the realtime postgres_changes subscription in src/hooks/useMugs.js
alter publication supabase_realtime add table public.mugs;
