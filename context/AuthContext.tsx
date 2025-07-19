import {
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
  signInWithPhoneNumber,
  signOut as firebaseSignOut,
} from "@react-native-firebase/auth";
import { createContext, useState } from "react";

const DEFAULT_COUNTRY_CODE = "+1";

export type AuthResult = {
  status: "success" | "failure";
  message?: string;
};

export type AuthContextType = {
  sendVerificationCode: (phoneNumber: string) => Promise<AuthResult>;
  confirmCode: (code: string) => Promise<AuthResult>;
  signOut: () => Promise<AuthResult>;
  isInitializing: boolean;
  user: FirebaseAuthTypes.User | null;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type ProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: ProviderProps) {
  const auth = getAuth();

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [phoneConfirm, setPhoneConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
    if (isInitializing) setIsInitializing(false);
  });

  async function sendVerificationCode(
    phoneNumber: string,
  ): Promise<AuthResult> {
    try {
      const fullNumber =
        phoneNumber[0] === "+"
          ? phoneNumber
          : DEFAULT_COUNTRY_CODE + phoneNumber;
      const confirmation = await signInWithPhoneNumber(auth, fullNumber);
      setPhoneConfirm(confirmation);
      return { status: "success" };
    } catch (error) {
      return {
        status: "failure",
        message:
          error instanceof Error ? error.message : "Unknown error occured",
      };
    }
  }

  async function confirmCode(code: string): Promise<AuthResult> {
    if (!phoneConfirm) {
      return {
        status: "failure",
        message: "Must send verification code before it can be confirmed",
      };
    }

    try {
      await phoneConfirm.confirm(code);
      return { status: "success" };
    } catch (error) {
      return {
        status: "failure",
        message:
          error instanceof Error ? error.message : "Unknown error occured",
      };
    }
  }

  async function signOut(): Promise<AuthResult> {
    try {
      await firebaseSignOut(auth);
      return { status: "success" };
    } catch (error) {
      return {
        status: "failure",
        message:
          error instanceof Error ? error.message : "Unknown error occured",
      };
    }
  }

  return (
    <AuthContext.Provider
      value={{
        sendVerificationCode,
        confirmCode,
        signOut,
        user,
        isInitializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
