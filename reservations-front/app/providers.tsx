"use client";

import store from "@/store/store";
import { ThemeProvider } from "next-themes";
import React from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { PendingBookingProvider } from "@/contexts/PendingBookingContext";

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <ThemeProvider attribute="class">
      <Provider store={store}>
        <AuthProvider>
          <PendingBookingProvider>{children}</PendingBookingProvider>
        </AuthProvider>
      </Provider>
      <Toaster />
    </ThemeProvider>
  );
}
