"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button } from "@radix-ui/themes";
import { ArrowLeft, Building2, TrendingUp, ExternalLink, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function UseCaseDetailPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [useCase, setUseCase] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);

  useEffect(() => {
    if (!user || user.role !== "client") {
      router.replace("/auth");
      return;
    }

    // Mock data
    setUseCase({
      id: "uc_supply_opt",
      title: "Optimización de cadena de suministro con IA predictiva (-15% costes)",
      problem:
        "Ineficiencias en inventario y tiempos de entrega largos estaban impactando la satisfacción del cliente y aumentando los costos operativos.",
      solution:
        "Modelos de demanda con LSTM + optimización con Programación Lineal en AWS SageMaker. Implementamos un sistema de predicción de demanda que analiza patrones históricos y factores externos para optimizar niveles de inventario y rutas de entrega.",
      results: { roi: 2.4, costReductionPct: 15, leadTimeReductionPct: 22 },
      industry: ["Manufactura", "Retail"],
      technologies: ["Python", "TensorFlow", "AWS SageMaker"],
      kpis: ["ROI", "Reducción de costes", "Lead time"],
    });

    setProvider({
      id: "p_aisol",
      name: "AI Solutions Inc.",
      logoUrl: "/vercel.svg",
    });
  }, [user, router, params]);

  if (!useCase) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Link href="/client">
          <Button size="2" variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </Link>

        <div className="bg-gray-100 border border-gray-200 rounded-xl p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{useCase.title}</h1>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Building2 className="w-5 h-5" />
              <Link
                href={`/client/provider/${provider?.id}`}
                className="hover:text-gray-900 transition-colors"
              >
                {provider?.name}
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {useCase.industry.map((ind: string) => (
              <span
                key={ind}
                className="px-3 py-1 bg-blue-500/20 text-blue-700 text-sm rounded-lg border border-blue-500/30"
              >
                {ind}
              </span>
            ))}
            {useCase.technologies.map((tech: string) => (
              <span
                key={tech}
                className="px-3 py-1 bg-purple-500/20 text-purple-700 text-sm rounded-lg border border-purple-500/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Object.entries(useCase.results).map(([key, value]: any]) => {
            const kpi = useCase.kpis[Object.keys(useCase.results).indexOf(key)] || key;
            return (
              <div
                key={key}
                className="bg-gray-100 border border-gray-200 rounded-xl p-6 text-center"
              >
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {typeof value === "number"
                    ? value > 1
                      ? `${(value * 100).toFixed(0)}%`
                      : `${value.toFixed(2)}x`
                    : value}
                </p>
                <p className="text-sm text-gray-600">{kpi}</p>
              </div>
            );
          })}
        </div>

        <div className="space-y-6">
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Problema del Cliente</h2>
            <p className="text-gray-900 leading-relaxed">{useCase.problem}</p>
          </div>

          <div className="bg-gray-100 border border-gray-200 rounded-xl p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Solución Implementada</h2>
            <p className="text-gray-900 leading-relaxed">{useCase.solution}</p>
          </div>

          <div className="bg-gradient-to-r from-violet-500/20 to-blue-500/20 border border-violet-500/50 rounded-xl p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  ¿Interesado en esta solución?
                </h3>
                <p className="text-gray-600">
                  Contacta con {provider?.name} para discutir cómo pueden ayudarte
                </p>
              </div>
              <Link href={`/client/provider/${provider?.id}`}>
                <Button size="3" highContrast>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contactar Proveedor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

