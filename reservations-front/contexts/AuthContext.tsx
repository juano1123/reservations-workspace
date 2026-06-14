"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  role: string;
  phoneNumber?: string;
  fullName?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, phoneNumber?: string, fullName?: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const stored = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("auth_user");
    if (stored && storedUser) {
      setToken(stored);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message ?? "Login failed");
    }
    const data = await res.json();
    const userData: User = {
      id: data.id,
      email: data.email,
      role: data.role,
      phoneNumber: data.phoneNumber,
      fullName: data.fullName,
    };
    localStorage.setItem("auth_token", data.accessToken);
    localStorage.setItem("auth_refresh_token", data.refreshToken);
    localStorage.setItem("auth_user", JSON.stringify(userData));
    setToken(data.accessToken);
    setUser(userData);
  };

  const register = async (email: string, password: string, phoneNumber?: string, fullName?: string) => {
    const res = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, phoneNumber, fullName }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message ?? "Registration failed");
    }
    const data = await res.json();
    const userData: User = {
      id: data.id,
      email: data.email,
      role: data.role,
      phoneNumber: data.phoneNumber,
      fullName: data.fullName,
    };
    localStorage.setItem("auth_token", data.accessToken);
    localStorage.setItem("auth_refresh_token", data.refreshToken);
    localStorage.setItem("auth_user", JSON.stringify(userData));
    setToken(data.accessToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_refresh_token");
    localStorage.removeItem("auth_user");
    setToken(null);
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
