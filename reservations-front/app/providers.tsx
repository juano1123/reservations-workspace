"use client";

import store from "@/store/store";
import { ThemeProvider } from "next-themes";
import React from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <ThemeProvider attribute="class">
      <Provider store={store}>{children}</Provider>
      <Toaster />
    </ThemeProvider>
  );
}
