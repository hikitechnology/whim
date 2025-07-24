import { getUserProfile } from "@/utils/api";
import { queryOptions } from "@tanstack/react-query";

export default function profileQueryOptions(userId: string) {
  return queryOptions({
    queryKey: ["profile", userId],
    queryFn: () => getUserProfile(userId),
  });
}
