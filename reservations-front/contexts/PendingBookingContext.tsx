"use client";

import { createContext, useContext, useState } from "react";

interface PendingBookingContextType {
  hasPendingBooking: boolean;
  setHasPendingBooking: (v: boolean) => void;
}

const PendingBookingContext = createContext<PendingBookingContextType>({
  hasPendingBooking: false,
  setHasPendingBooking: () => {},
});

export function PendingBookingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hasPendingBooking, setHasPendingBooking] = useState(false);

  return (
    <PendingBookingContext.Provider
      value={{ hasPendingBooking, setHasPendingBooking }}
    >
      {children}
    </PendingBookingContext.Provider>
  );
}

export function usePendingBooking() {
  return useContext(PendingBookingContext);
}
