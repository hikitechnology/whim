import { BASE_URL } from "@/constants";
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

  const response = await fetch(BASE_URL + url, { ...options, headers });
  return response;
}

type ApiResult = {
  status: "success" | "failure";
  response?: {
    code: number;
    body: string;
  };
};

type ApiUser = {
  name: string;
};

export async function updateProfile(
  userId: string,
  updatedInfo: Partial<ApiUser>,
): Promise<ApiResult> {
  const response = await apiFetch(`/user/${userId}/update`, {
    body: JSON.stringify(updatedInfo),
    method: "PATCH",
  });
  if (response.ok) {
    return { status: "success" };
  } else {
    return {
      status: "failure",
      response: {
        code: response.status,
        body: await response.json(),
      },
    };
  }
}
