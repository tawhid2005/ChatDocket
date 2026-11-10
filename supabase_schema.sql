-- ==============================================================================
-- ChatDocket Supabase PostgreSQL Schema
-- Paste this into your Supabase Dashboard -> SQL Editor -> Click "Run"
-- ==============================================================================

-- 1. Create User Profiles Table (Linked to auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  name text,
  avatar_url text,
  plan text not null default 'free' check (plan in ('free', 'visa_pass', 'agency_pro')),
  license_key text,
  purchased_at timestamptz,
  expires_at timestamptz,
  is_verified boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Create Orders / Payments Ledger Table
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  order_id text unique not null,
  user_id uuid references public.profiles(id) on delete set null,
  user_email text not null,
  user_name text,
  plan_id text not null check (plan_id in ('free', 'visa_pass', 'agency_pro')),
  plan_name text not null,
  amount numeric not null default 0,
  currency text not null default 'USD',
  promo_code text,
  discount numeric not null default 0,
  final_amount numeric not null default 0,
  payment_method text not null default 'polar',
  license_key text not null,
  status text not null default 'completed',
  created_at timestamptz not null default now()
);

-- 3. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.orders enable row level security;

-- 4. RLS Policies for profiles (Users can view & update their own profile)
drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- 5. RLS Policies for orders (Users can view their own orders)
drop policy if exists "Users can view their own orders" on public.orders;
create policy "Users can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id or lower(user_email) = lower(auth.email()));

-- 6. Trigger to automatically create profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, name, avatar_url, plan, is_verified)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url',
    'free',
    true
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

