"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { Button, Avatar, Badge } from "@radix-ui/themes";
import { Bell, Search, LogOut, User } from "lucide-react";
import { Sparkles } from "lucide-react";

export default function TopNav() {
  const { user, logout } = useAuth();
  
  return (
    <div className="w-full border-b border-gray-200 bg-white/95 backdrop-blur-md z-50 shadow-sm flex-shrink-0">
      <div className="mx-auto max-w-full px-8 h-16 flex items-center justify-between">
        {/* Left section - Logo and Search */}
        <div className="flex items-center gap-8 flex-1">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              AI COMPANY CREATOR
            </span>
          </Link>
          
          {user && (
            <div className="hidden md:flex flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Buscar proveedores, casos de uso..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-300 transition-all hover:bg-white"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right section - Actions and User */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Notifications */}
              <Button
                variant="ghost"
                size="2"
                className="relative rounded-full w-10 h-10 p-0 hover:bg-gray-100 transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <Badge
                  color="red"
                  variant="solid"
                  size="1"
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center p-0 text-[10px] font-semibold border-2 border-white"
                >
                  3
                </Badge>
              </Button>

              {/* User Menu */}
              <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold text-gray-900 leading-tight">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize leading-tight">
                    {user.role === "client" ? "Cliente" : user.role === "provider" ? "Proveedor" : "Administrador"}
                  </p>
                </div>
                <Avatar
                  fallback={user.name.charAt(0).toUpperCase()}
                  size="3"
                  color="violet"
                  variant="solid"
                  className="cursor-pointer hover:ring-2 hover:ring-violet-300 transition-all shadow-sm"
                />
              </div>

              {/* Logout Button */}
              <Button
                size="2"
                variant="ghost"
                onClick={logout}
                className="rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-1.5" />
                <span className="hidden sm:inline">Salir</span>
              </Button>
            </>
          ) : (
            <Link href="/auth">
              <Button
                size="2"
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-medium shadow-sm hover:shadow-md transition-all rounded-lg"
              >
                <User className="w-4 h-4 mr-1.5" />
                Acceder
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
