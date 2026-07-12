-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Tracked Keywords Table
create table public.tracked_keywords (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null default auth.uid(),
  keyword text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint unique_user_keyword unique (user_id, keyword)
);

-- Enable RLS
alter table public.tracked_keywords enable row level security;

-- Policies for tracked_keywords
create policy "Users can view their own tracked keywords"
  on public.tracked_keywords for select
  using (auth.uid() = user_id);

create policy "Users can insert their own tracked keywords"
  on public.tracked_keywords for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own tracked keywords"
  on public.tracked_keywords for delete
  using (auth.uid() = user_id);

-- 2. Mentions Table
create table public.mentions (
  id uuid default gen_random_uuid() primary key,
  keyword_id uuid references public.tracked_keywords(id) on delete cascade not null,
  title text not null,
  source text not null, -- 'Twitter/X', 'Reddit', 'News', 'Blog', etc.
  snippet text,
  url text,
  published_at timestamp with time zone not null,
  sentiment text check (sentiment in ('positive', 'neutral', 'negative')),
  summary text,
  ai_metadata jsonb,
  ai_analyzed boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.mentions enable row level security;

-- Policies for mentions
create policy "Users can view mentions of their keywords"
  on public.mentions for select
  using (
    exists (
      select 1 from public.tracked_keywords tk
      where tk.id = mentions.keyword_id
      and tk.user_id = auth.uid()
    )
  );

create policy "Users can insert mentions for their keywords"
  on public.mentions for insert
  with check (
    exists (
      select 1 from public.tracked_keywords tk
      where tk.id = mentions.keyword_id
      and tk.user_id = auth.uid()
    )
  );

create policy "Users can update mentions of their keywords"
  on public.mentions for update
  using (
    exists (
      select 1 from public.tracked_keywords tk
      where tk.id = mentions.keyword_id
      and tk.user_id = auth.uid()
    )
  );

create policy "Users can delete mentions of their keywords"
  on public.mentions for delete
  using (
    exists (
      select 1 from public.tracked_keywords tk
      where tk.id = mentions.keyword_id
      and tk.user_id = auth.uid()
    )
  );
