create table public.invite_codes (
  user_id uuid not null references public.users (id) on delete cascade,
  code uuid not null,
  expires_at timestamptz not null
);

create index invite_codes_code_idx on public.invite_codes (code);

alter table public.invite_codes enable row level security;

create policy "Users can select their own invite code"
on public.invite_codes for select
to authenticated
using ((select auth.uid()) = user_id);
