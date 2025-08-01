import React from "react";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/app/auth/AuthProvider";
import RootNavigator from "./navigation/RootNavigator";

export default function App() {
  return (
    <AuthProvider>
        <StatusBar style="auto" />
        <RootNavigator />
    </AuthProvider>
  );
}