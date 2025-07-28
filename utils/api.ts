import { LocationUpdate } from "@/types/Location";
import { BasicUserProfile, UserProfile } from "@/types/UserProfile";
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

export async function uploadImages(userId: string, images: File[]) {
  const formData = new FormData();
  images.forEach((image) => formData.append("images", image));
  const response = await apiFetch(`/user/${userId}/upload/image`, {
    method: "post",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Image upload network response was not ok");
  }
  return response;
}

export async function syncLocation(coords: {
  x: number;
  y: number;
}): Promise<LocationUpdate[]> {
  const response = await apiFetch("/location/sync", {
    method: "post",
    body: JSON.stringify(coords),
  });
  if (!response.ok) {
    throw new Error("Location sync network response was not OK");
  }
  return response.json();
}

export async function getBasicUserProfile(
  id: string,
): Promise<BasicUserProfile> {
  const response = await apiFetch(`/user/${id}/basic`);
  if (!response.ok) {
    throw new Error("Basic user profile response was not ok");
  }
  return response.json();
}
