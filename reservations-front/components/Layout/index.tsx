import React from "react";
import Navbar from "../Navbar";
import Navigation from "../Navigation";

interface Props {
  children: React.ReactNode;
  withNavbar?: boolean;
  withNavigation?: boolean;
}

export function Layout({
  children,
  withNavbar = false,
  withNavigation = false,
}: Props) {
  return (
    <>
      <div className="w-full min-h-screen bg-[#e7e8e9] text-[#282f3d]">
        {withNavbar && <Navbar />}
        {withNavigation && <Navigation>{children}</Navigation>}
        {!withNavigation && children}
      </div>
    </>
  );
}
