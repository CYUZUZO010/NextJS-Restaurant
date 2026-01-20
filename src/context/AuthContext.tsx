"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Role = "admin" | "client" | "waiter";
export type User = {
  name: string;
  email: string;
  role: Role;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (data: { email: string; password: string; role: Role }) => Promise<void>;
  signUp: (data: { name: string; email: string; password: string; role: Role }) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = "demo_users"; 
const CURRENT_KEY = "current_user";

type StoredUser = User & { password: string };

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CURRENT_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to load current user", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp: AuthContextType["signUp"] = async ({ name, email, password, role }) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.error || "Failed to sign up");
    }
    const sessionUser: User = { name: data.name, email: data.email, role: data.role };
    localStorage.setItem(CURRENT_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
  };

  const signIn: AuthContextType["signIn"] = async ({ email, password, role }) => {
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.error || "Failed to sign in");
    }
    const sessionUser: User = { name: data.name, email: data.email, role: data.role };
    localStorage.setItem(CURRENT_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
  };

  const signOut = () => {
    localStorage.removeItem(CURRENT_KEY);
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, signIn, signUp, signOut }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
