create or replace function public.add_friend(friend_id uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  friend_name text;
begin
  if exists (
    select 1
    from public.friendships
    where
      (user_low = auth.uid() and user_high = friend_id)
      or (user_low = friend_id and user_high = auth.uid())
  ) then
    raise exception 'Already friends';
  end if;

  insert into public.friendships (user_low, user_high)
  values (
    case when auth.uid() < friend_id then auth.uid() else friend_id end,
    case when auth.uid() < friend_id then friend_id else auth.uid() end
  )
  on conflict do nothing;

  select name
  into friend_name
  from public.users
  where id = friend_id;

  return friend_name;
end;
$$;

grant execute on function public.add_friend(uuid) to authenticated;
