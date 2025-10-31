"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Users, DollarSign, TrendingUp, MessageSquare, UserPlus, X } from "lucide-react";
import MetricCard from "@/components/shared/MetricCard";
import PageLayout from "@/components/shared/PageLayout";

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [kpis, setKPIs] = useState({
    totalClients: 0,
    totalProviders: 0,
    mrr: 0,
    churnRate: 0,
    interactions: 0,
  });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.replace("/auth");
      return;
    }

    // Mock KPI calculations
    setKPIs({
      totalClients: 45,
      totalProviders: 12,
      mrr: 2388,
      churnRate: 2.5,
      interactions: 128,
    });
  }, [user, router]);

  const recentActivity = [
    { type: "user", text: "Nuevo proveedor registrado: DataAI Corp", time: "Hace 2 horas" },
    { type: "payment", text: "Pago recibido de AI Solutions Inc.", time: "Hace 4 horas" },
    { type: "useCase", text: "Nuevo caso de uso pendiente de revisión", time: "Ayer" },
    { type: "user", text: "Cliente HP actualizó su perfil", time: "Ayer" },
  ];

  return (
    <PageLayout>
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Administrativo</h1>
          <p className="text-gray-600">KPIs de la plataforma y actividad reciente</p>
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <MetricCard
            title="Clientes"
            value={kpis.totalClients}
            icon={Users}
            change={{ value: 5, trend: "up" }}
            subtitle="Total registrados"
          />
          <MetricCard
            title="Proveedores"
            value={kpis.totalProviders}
            icon={Users}
            change={{ value: 2, trend: "up" }}
            subtitle="Total activos"
          />
          <MetricCard
            title="MRR"
            value={`$${kpis.mrr.toLocaleString()}`}
            icon={DollarSign}
            change={{ value: 8, trend: "up" }}
            subtitle="Ingresos mensuales"
          />
          <MetricCard
            title="Churn Rate"
            value={`${kpis.churnRate}%`}
            icon={TrendingUp}
            change={{ value: -0.5, trend: "down" }}
            subtitle="Tasa de cancelación"
          />
          <MetricCard
            title="Interacciones"
            value={kpis.interactions}
            icon={MessageSquare}
            change={{ value: 12, trend: "up" }}
            subtitle="Esta semana"
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-100 border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Actividad Reciente</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 bg-gray-100 rounded-lg border border-gray-200">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.type === "user"
                      ? "bg-blue-500/20"
                      : activity.type === "payment"
                      ? "bg-green-500/20"
                      : "bg-purple-500/20"
                  }`}
                >
                  {activity.type === "user" && <UserPlus className="w-5 h-5 text-blue-400" />}
                  {activity.type === "payment" && <DollarSign className="w-5 h-5 text-green-400" />}
                  {activity.type === "useCase" && <MessageSquare className="w-5 h-5 text-purple-400" />}
                </div>
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
    </PageLayout>
  );
}
