import { FormUserProfile, UserProfile } from "@/types/UserProfile";

function flatArrayToObjArray<T>(flatArray: T[]): { value: T }[] {
  return flatArray.map((item) => ({ value: item }));
}

function objArrayToFlatArray<T>(objArray: { value: T }[]): T[] {
  return objArray.map((item) => item.value);
}

export function normalProfileToFormProfile(
  normalProfile: UserProfile,
): FormUserProfile {
  return {
    ...normalProfile,
    interests: normalProfile.interests
      ? flatArrayToObjArray(normalProfile.interests)
      : undefined,
    conversationStarters: normalProfile.conversationStarters
      ? flatArrayToObjArray(normalProfile.conversationStarters)
      : undefined,
  };
}

export function formProfileToNormalProfile(
  formProfile: FormUserProfile,
): UserProfile {
  return {
    ...formProfile,
    interests: formProfile.interests
      ? objArrayToFlatArray(formProfile.interests)
      : undefined,
    conversationStarters: formProfile.conversationStarters
      ? objArrayToFlatArray(formProfile.conversationStarters)
      : undefined,
  };
}
