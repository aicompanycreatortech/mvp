"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { Eye, Search, MessageSquare, FileText, User, Bell, Plus, ArrowRight } from "lucide-react";
import MetricCard from "@/components/shared/MetricCard";
import EmptyState from "@/components/shared/EmptyState";
import PageLayout from "@/components/shared/PageLayout";

interface Notification {
  id: string;
  type: "message" | "view" | "lead" | "approval";
  message: string;
  time: string;
  read: boolean;
}

export default function ProviderDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!user || user.role !== "provider") {
      router.replace("/auth");
      return;
    }

    // Mock data
    setNotifications([
      {
        id: "1",
        type: "message",
        message: "Nuevo mensaje de HP sobre optimización logística",
        time: "Hace 2 horas",
        read: false,
      },
      {
        id: "2",
        type: "view",
        message: "Tu perfil fue visto 15 veces esta semana",
        time: "Hace 5 horas",
        read: false,
      },
      {
        id: "3",
        type: "lead",
        message: "Nuevo lead: Interés en caso de uso de detección de fraude",
        time: "Ayer",
        read: true,
      },
    ]);
  }, [user, router]);

  const metrics = {
    profileViews: 342,
    searchAppearances: 128,
    leads: 23,
    useCases: 2,
  };

  const recentActivity = [
    { type: "view", text: "Perfil visto por HP", time: "Hace 1 hora" },
    { type: "search", text: "Apareciste en 3 búsquedas hoy", time: "Hace 3 horas" },
    { type: "lead", text: "Nuevo lead de RetailCo", time: "Ayer" },
  ];

  return (
    <PageLayout>
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Resumen de actividad y métricas clave</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link href="/provider/use-cases/new">
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 hover:bg-gray-200 hover:border-gray-300 transition-all duration-200 cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-violet-500/20 rounded-lg">
                  <Plus className="w-6 h-6 text-violet-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Añadir caso de uso</h3>
                  <p className="text-sm text-gray-600">Publica un nuevo caso de éxito</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
          <Link href="/provider/profile">
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 hover:bg-gray-200 hover:border-gray-300 transition-all duration-200 cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <User className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Actualizar perfil</h3>
                  <p className="text-sm text-gray-600">Completa tu información</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
          <Link href="/provider/inbox">
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 hover:bg-gray-200 hover:border-gray-300 transition-all duration-200 cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Ver mensajes</h3>
                  <p className="text-sm text-gray-600">
                    {notifications.filter((n) => !n.read).length} sin leer
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Visualizaciones de perfil"
            value={metrics.profileViews}
            icon={Eye}
            change={{ value: 12, trend: "up" }}
            subtitle="Este mes"
          />
          <MetricCard
            title="Apariciones en búsqueda"
            value={metrics.searchAppearances}
            icon={Search}
            change={{ value: 8, trend: "up" }}
            subtitle="Últimos 30 días"
          />
          <MetricCard
            title="Leads recibidos"
            value={metrics.leads}
            icon={MessageSquare}
            change={{ value: 5, trend: "up" }}
            subtitle="Total activos"
          />
          <MetricCard
            title="Casos de uso publicados"
            value={metrics.useCases}
            icon={FileText}
            subtitle="Activos"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notifications */}
          <div className="lg:col-span-2">
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-900" />
                  <h2 className="text-xl font-semibold text-gray-900">Notificaciones recientes</h2>
                </div>
                <Link href="/provider/inbox">
                  <Button size="2" variant="ghost">
                    Ver todas
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {notifications.length === 0 ? (
                  <EmptyState
                    icon={Bell}
                    title="No hay notificaciones"
                    description="Las notificaciones aparecerán aquí cuando haya actividad"
                  />
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 rounded-lg border ${
                        notif.read
                          ? "bg-gray-100 border-gray-200"
                          : "bg-gray-200 border-gray-300"
                      } hover:bg-gray-200 transition-all`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            notif.type === "message"
                              ? "bg-blue-500/20"
                              : notif.type === "view"
                              ? "bg-green-500/20"
                              : notif.type === "lead"
                              ? "bg-yellow-500/20"
                              : "bg-purple-500/20"
                          }`}
                        >
                          {notif.type === "message" && (
                            <MessageSquare className="w-4 h-4 text-blue-400" />
                          )}
                          {notif.type === "view" && <Eye className="w-4 h-4 text-green-400" />}
                          {notif.type === "lead" && (
                            <MessageSquare className="w-4 h-4 text-yellow-400" />
                          )}
                          {notif.type === "approval" && (
                            <FileText className="w-4 h-4 text-purple-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p
                            className={`text-sm ${notif.read ? "text-gray-600" : "text-gray-900 font-medium"}`}
                          >
                            {notif.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                        </div>
                        {!notif.read && (
                          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Actividad reciente</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-white/40 mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </PageLayout>
  );
}
