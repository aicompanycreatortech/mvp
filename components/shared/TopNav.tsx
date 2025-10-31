"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { Button, Separator } from "@radix-ui/themes";
import { Bell, Search } from "lucide-react";

export default function TopNav() {
  const { user, logout } = useAuth();
  return (
    <div className="w-full border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="mx-auto max-w-full px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-bold text-gray-900">
            AI COMPANY CREATOR
          </Link>
          {user && (
            <>
              <Separator orientation="vertical" className="h-6" />
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                />
              </div>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <>
              <Button variant="ghost" size="2" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                  <span className="text-xs font-semibold text-violet-700">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </>
          )}
          {user ? (
            <Button size="2" variant="soft" onClick={logout}>
              Salir
            </Button>
          ) : (
            <Link href="/auth">
              <Button size="2">Acceder</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
