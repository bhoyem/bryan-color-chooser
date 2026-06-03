create table public.friendships (
  user_low uuid references public.users (id) on delete cascade,
  user_high uuid references public.users (id) on delete cascade,
  primary key (user_low, user_high),
  check (user_low < user_high)
);

create index friendships_user_high_idx on public.friendships (user_high);

alter table public.friendships enable row level security;

create policy "Authenticated users can select friendships"
on public.friendships for select
to authenticated
using (true);
