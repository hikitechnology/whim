import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import useAuthContext from "./useAuthContext";

export default function useAuthenticatedUser(): FirebaseAuthTypes.User {
  const { user } = useAuthContext();
  if (!user) {
    throw new Error("User must be logged in to access this component");
  }
  return user;
}
