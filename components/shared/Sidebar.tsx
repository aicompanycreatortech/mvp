"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Separator } from "@radix-ui/themes";
import {
  LayoutDashboard,
  User,
  FileText,
  Mail,
  Search,
  History,
  Heart,
  MessageSquare,
  Users,
  CreditCard,
  Settings,
  Bot,
  Bell,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export default function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const getNavItems = (): NavItem[] => {
    if (user.role === "client") {
      return [
        { label: "Inicio", href: "/client", icon: LayoutDashboard },
        { label: "Búsqueda", href: "/client/search", icon: Search },
        { label: "Historial", href: "/client/history", icon: History },
        { label: "Favoritos", href: "/client/favorites", icon: Heart },
        { label: "Contactos", href: "/client/contacts", icon: MessageSquare },
      ];
    }
    if (user.role === "provider") {
      return [
        { label: "Dashboard", href: "/provider", icon: LayoutDashboard },
        { label: "Perfil", href: "/provider/profile", icon: User },
        { label: "Casos de Uso", href: "/provider/use-cases", icon: FileText },
        { label: "Inbox", href: "/provider/inbox", icon: Mail, badge: 3 },
      ];
    }
    if (user.role === "admin") {
      return [
        { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { label: "Usuarios", href: "/admin/users", icon: Users },
        {
          label: "Suscripciones",
          href: "/admin/subscriptions",
          icon: CreditCard,
        },
        {
          label: "Transacciones",
          href: "/admin/transactions",
          icon: CreditCard,
        },
        { label: "Chatbot", href: "/admin/chatbot", icon: Bot },
        { label: "Notificaciones", href: "/admin/notifications", icon: Bell },
      ];
    }
    return [];
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full flex flex-col overflow-hidden flex-shrink-0">
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1 min-h-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-violet-50 text-violet-700 border border-violet-200 shadow-sm"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${
                  isActive
                    ? "text-violet-600"
                    : "text-gray-500 group-hover:text-gray-700"
                }`}
              />
              <span className="text-sm font-medium flex-1">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Info Footer */}
      <div className="p-4 border-t border-gray-200 flex-shrink-0 bg-white overflow-hidden">
        <div className="flex items-center gap-3 min-w-0 w-full">
          <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-violet-700">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0 overflow-hidden max-w-full">
            <p className="text-sm font-semibold text-gray-900 truncate leading-tight w-full">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 truncate leading-tight mt-0.5 w-full">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
