"use client";

import { useAuth } from "@/lib/auth";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) return <>{children}</>;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden max-w-full">
        <TopNav />
        <main className="flex-1 overflow-y-auto overflow-x-hidden w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

