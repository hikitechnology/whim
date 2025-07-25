import { UserProfile } from "@/types/UserProfile";
import { getAuth, getIdToken } from "@react-native-firebase/auth";

async function apiFetch(url: string, options: RequestInit = {}) {
  const user = getAuth().currentUser;
  const headers = {
    "Content-Type": "application/json",
    ...(user
      ? { Authorization: `Bearer ${await getIdToken(user, true)}` }
      : {}),
    ...options.headers,
  };
  const response = await fetch(process.env.EXPO_PUBLIC_BASE_URL + url, {
    ...options,
    headers,
  });
  return response;
}

export async function getUserProfile(id: string): Promise<UserProfile> {
  const response = await apiFetch(`/user/${id}`);
  if (!response.ok) {
    throw new Error("User profile network response not ok");
  }
  return response.json();
}

export async function updateUserProfile(
  updatedProfile: Partial<UserProfile> & Pick<UserProfile, "uid">,
) {
  const response = await apiFetch(`/user/${updatedProfile.uid}/update`, {
    body: JSON.stringify(updatedProfile),
    method: "patch",
  });
  if (!response.ok) {
    throw new Error("User profile update network response was not ok");
  }
  return response;
}

export async function getAllUsers(): Promise<UserProfile[]> {
  const response = await apiFetch("/user/all");
  return response.json();
}
