import {
  FirebaseAuthTypes,
  getAuth,
  signInWithPhoneNumber,
} from "@react-native-firebase/auth";
import { useState } from "react";

const AUTOMATIC_COUNTRY_CODE = "+1";

export type AuthResult = {
  status: "success" | "failure";
  message?: string;
};

export default function useAuth() {
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  async function sendVerificationCode(
    phoneNumber: string,
  ): Promise<AuthResult> {
    try {
      const fullNumber =
        phoneNumber[0] === "+"
          ? phoneNumber
          : AUTOMATIC_COUNTRY_CODE + phoneNumber;
      const confirmation = await signInWithPhoneNumber(getAuth(), fullNumber);
      setConfirm(confirmation);
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
    if (!confirm) {
      return {
        status: "failure",
        message: "Must send verification code before it can be confirmed",
      };
    }

    try {
      await confirm.confirm(code);
      return { status: "success" };
    } catch {
      return {
        status: "failure",
        message: "Invalid code",
      };
    }
  }

  return {
    sendVerificationCode,
    confirmCode,
  };
}
