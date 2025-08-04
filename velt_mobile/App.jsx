import React from "react";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/app/auth/AuthProvider";
import { Provider as PaperProvider } from "react-native-paper";
import RootNavigator from "./navigation/RootNavigator";
import { theme } from '@/app/theme'

export default function App() {
  return (
    <PaperProvider theme={ theme }>
      <AuthProvider>
          <StatusBar style="auto" />
          <RootNavigator />
      </AuthProvider>
    </PaperProvider>
  );
}