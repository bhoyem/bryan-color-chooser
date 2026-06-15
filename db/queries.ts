import { useQuery } from "@tanstack/react-query";
import { getUser } from "./user";
import { getFriends } from "./friends";
import { useAuth } from "@/contexts/AuthContext";

export function useUser() {
  const { session } = useAuth();
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(session!.user.id),
  });
}

export function useFriends() {
  const { data: user } = useUser();
  return useQuery({
    queryKey: ["friends", user?.id],
    queryFn: () => getFriends(user!.id),
    enabled: !!user,
  });
}
