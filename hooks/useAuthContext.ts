import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Must wrap app with AuthProvider");
  }
  return context;
}
