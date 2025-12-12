-- 1. Tabela Ról Użytkowników (Kluczowa do logowania)
create table public.user_roles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  role text check (role in ('admin', 'moderator', 'user')) not null,
  unique(user_id)
);

-- 2. Włącz RLS (Row Level Security) dla bezpieczeństwa
alter table public.user_roles enable row level security;
create policy "Public roles are viewable by everyone" on public.user_roles for select using (true);
create policy "Only admins can update roles" on public.user_roles for all using (auth.uid() in (select user_id from public.user_roles where role = 'admin'));

-- 3. Tabela Ustawień Strony (Menu, Social Media, Logo)
create table public.site_settings (
  key text primary key,
  value jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 4. Tabela Bloga
create table public.blog_posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  excerpt text,
  content text, -- lub jsonb jeśli używasz zaawansowanego edytora
  featured_image text,
  category text,
  tags text[],
  status text check (status in ('draft', 'published', 'archived')) default 'draft',
  read_time int default 5,
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 5. Tabela Projektów
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  category text,
  image text,
  tags text[],
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 6. Tabela Usług
create table public.services (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  icon text,
  sort_order int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 7. Tabela Doświadczenia
create table public.experiences (
  id uuid default gen_random_uuid() primary key,
  role text not null,
  company text not null,
  period text,
  description text,
  sort_order int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 8. Tabela Stron (Pages)
create table public.pages (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  content text,
  meta_description text,
  status text default 'draft',
  sort_order int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 9. Storage (Bucket na zdjęcia)
insert into storage.buckets (id, name, public) values ('media', 'media', true);

-- Polityka dla Storage (pozwala każdemu oglądać, logowanym wgrywać)
create policy "Public Access" on storage.objects for select using ( bucket_id = 'media' );
create policy "Auth Upload" on storage.objects for insert with check ( bucket_id = 'media' and auth.role() = 'authenticated' );
create policy "Auth Delete" on storage.objects for delete using ( bucket_id = 'media' and auth.role() = 'authenticated' );
