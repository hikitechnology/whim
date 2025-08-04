import { getFriendCode } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export default function useFriendCodeQuery() {
  return useQuery({
    queryKey: ["friendCode"],
    queryFn: getFriendCode,
  });
}
