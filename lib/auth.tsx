"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type UserRole = "client" | "provider" | "admin";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  providerId?: string;
  company?: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  loginAs: (role: UserRole) => void;
  logout: () => void;
};

const STORAGE_KEY = "mvp_auth_user";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const loginAs = useCallback((role: UserRole) => {
    const mockUsers: Record<UserRole, AuthUser> = {
      admin: { id: "u_admin_1", name: "Admin Demo", email: "admin@example.com", role: "admin" },
      provider: { id: "u_provider_1", name: "AI Solutions Inc.", email: "provider@example.com", role: "provider", providerId: "p_aisol" },
      client: { id: "u_client_1", name: "HP", email: "client@example.com", role: "client", company: "HP" }
    };
    const selected = mockUsers[role];
    setUser(selected);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
    } catch {}
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  const value = useMemo(() => ({ user, loginAs, logout }), [user, loginAs, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}


