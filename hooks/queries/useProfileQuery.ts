import { getUserProfile } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export default function useProfileQuery(userId: string) {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getUserProfile(userId),
  });
}
