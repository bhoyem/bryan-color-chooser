import { supabase } from "@/lib/supabase";

export async function getFriends(id: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .neq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function addFriend(friendCode: string) {
  const { data, error } = await supabase.rpc("add_friend", { friend_code: friendCode });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createInviteCode() {
  const { data, error } = await supabase.rpc("create_invite_code");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
