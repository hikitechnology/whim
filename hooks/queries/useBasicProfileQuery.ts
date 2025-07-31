import { UserProfile } from "@/types/UserProfile";
import { getBasicUserProfile } from "@/utils/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function useBasicProfileQuery(userId: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["basicProfile", userId],
    queryFn: () => getBasicUserProfile(userId),
    initialData: () => {
      const existingProfile = queryClient.getQueryData<UserProfile>([
        "profile",
        userId,
      ]);
      if (existingProfile) {
        return {
          name: existingProfile.name,
          pfpId: existingProfile.pfpId,
        };
      }
    },
  });
}
