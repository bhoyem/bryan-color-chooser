import { useQuery } from "@tanstack/react-query";
import { getMovies } from "./movies";
import { getUser } from "./user";
import { useAuth } from "@/contexts/AuthContext";

export function useMovies() {
  return useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });
}

export function useUser() {
  const { session } = useAuth();
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(session!.user.id),
  });
}