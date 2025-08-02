import { MessagingContext } from "@/context/MessagingContext";
import { useContext } from "react";

export default function useMessagingContext() {
  const context = useContext(MessagingContext);
  if (!context) {
    throw new Error("Must wrap app with MessagingProvider");
  }
  return context;
}
