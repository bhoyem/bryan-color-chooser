create or replace function public.create_invite_code()
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_code uuid := gen_random_uuid();
begin
  insert into public.invite_codes (user_id, code, expires_at)
  values (auth.uid(), new_code, now() + interval '24 hours');

  return new_code;
end;
$$;

drop function if exists public.add_friend(uuid);

create function public.add_friend(friend_code uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  friend_id uuid;
  friend_name text;
begin
  select user_id
  into friend_id
  from public.invite_codes
  where code = friend_code
    and expires_at > now()
  order by expires_at desc
  limit 1;

  if friend_id is null then
    raise exception 'Invalid or expired invite code';
  end if;

  if friend_id = auth.uid() then
    raise exception 'Cannot add yourself';
  end if;

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

grant execute on function public.create_invite_code() to authenticated;
grant execute on function public.add_friend(uuid) to authenticated;
