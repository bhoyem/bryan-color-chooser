create table public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  name text not null
);

alter table public.users enable row level security;

create policy "Users can select their own record"
on public.users for select
to authenticated
using ((select auth.uid()) = id);

create policy "Users can insert their own record"
on public.users for insert
to authenticated
with check ((select auth.uid()) = id);
