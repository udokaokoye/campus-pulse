import { AuthContext } from "@/Store/AuthContext";
import { Redirect, Slot } from "expo-router";
import { useContext } from "react";

export default function AuthLayout() {
  const isLoggedIn = useContext(AuthContext)?.isLoggedIn;

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return <Slot />;
}
