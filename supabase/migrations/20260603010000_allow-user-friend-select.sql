create policy "Users can select their friends"
on public.users for select
to authenticated
using (
  exists (
    select 1
    from public.friendships
    where
      (
        user_low = id
        and user_high = (select auth.uid())
      )
      or (
        user_high = id
        and user_low = (select auth.uid())
      )
  )
);
