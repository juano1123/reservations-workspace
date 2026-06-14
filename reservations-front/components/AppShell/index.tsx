"use client";

interface Props {
  children: React.ReactNode;
}

export default function AppShell({ children }: Props) {
  return <div className="min-h-screen bg-white">{children}</div>;
}
