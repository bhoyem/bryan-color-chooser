import { supabase } from "@/lib/supabase";

export async function getUser(id: string) {
  const { data, error } = await supabase.from("users").select("*").eq("id", id).single();
  console.log(data, error);
  if (error) {
    throw new Error(error.message);
  }

  return data;
}