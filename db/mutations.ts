import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFriend } from "./friends";

export function useInsertFriend() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });
}

