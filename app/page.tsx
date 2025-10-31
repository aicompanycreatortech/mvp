"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import Sidebar from "@/components/shared/Sidebar";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace("/auth");
      return;
    }
    if (user.role === "client") router.replace("/client");
    if (user.role === "provider") router.replace("/provider");
    if (user.role === "admin") router.replace("/admin");
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">{/* Redirecting... */}</main>
    </div>
  );
}
