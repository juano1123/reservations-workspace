import React from "react";
import Navbar from "../Navbar";

interface Props {
  children: React.ReactNode;
  withNavbar?: boolean;
}

export function Layout({
  children,
  withNavbar = false,
}: Props) {
  return (
    <>
      {withNavbar && <Navbar />}
      {children}
    </>
  );
}
