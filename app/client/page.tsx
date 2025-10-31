"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { TrendingUp, Star } from "lucide-react";
import Chatbot from "@/components/client/Chatbot";
import UseCaseCard from "@/components/shared/UseCaseCard";
import ProviderCard from "@/components/shared/ProviderCard";
import PageLayout from "@/components/shared/PageLayout";

export default function ClientDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [recommendedUseCases, setRecommendedUseCases] = useState<any[]>([]);
  const [featuredProviders, setFeaturedProviders] = useState<any[]>([]);

  useEffect(() => {
    if (!user || user.role !== "client") {
      router.replace("/auth");
      return;
    }

    // Mock data
    setRecommendedUseCases([
      {
        id: "uc_supply_opt",
        title: "Optimización de cadena de suministro con IA predictiva (-15% costes)",
        providerName: "AI Solutions Inc.",
        providerId: "p_aisol",
        industry: ["Manufactura", "Retail"],
        technologies: ["Python", "TensorFlow", "AWS SageMaker"],
        results: { roi: 2.4, costReductionPct: 15 },
        kpis: ["ROI", "Reducción de costes"],
        featured: true,
        views: 128,
      },
    ]);

    setFeaturedProviders([
      {
        id: "p_aisol",
        name: "AI Solutions Inc.",
        logoUrl: "/vercel.svg",
        elevatorPitch: "Soluciones de IA de punta a punta para optimizar operaciones y crecimiento.",
        competences: [
          "Procesamiento de Lenguaje Natural",
          "Visión por Computador",
          "Modelos Predictivos",
        ],
        featured: true,
      },
    ]);
  }, [user, router]);

  const handleSearch = (query: string) => {
    // Save to history
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    history.unshift({ query, timestamp: new Date().toISOString() });
    localStorage.setItem("searchHistory", JSON.stringify(history.slice(0, 20)));

    // Navigate to results
    router.push(`/client/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <PageLayout>
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Encuentra tu Solución de IA</h1>
          <p className="text-gray-600">
            Describe tu necesidad y encuentra proveedores que puedan ayudarte
          </p>
        </div>

        {/* Chatbot */}
        <div className="mb-12">
          <Chatbot onSearch={handleSearch} />
        </div>

        {/* Recommended Use Cases */}
        {recommendedUseCases.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-gray-900" />
                <h2 className="text-2xl font-semibold text-gray-900">Casos de Uso Recomendados</h2>
              </div>
              <Link href="/client/search" className="text-sm text-gray-600 hover:text-gray-900">
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUseCases.map((useCase) => (
                <UseCaseCard
                  key={useCase.id}
                  {...useCase}
                  onContact={() => {
                    router.push(`/client/provider/${useCase.providerId}`);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Featured Providers */}
        {featuredProviders.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <h2 className="text-2xl font-semibold text-gray-900">Proveedores Destacados</h2>
              </div>
              <Link href="/client/search" className="text-sm text-gray-600 hover:text-gray-900">
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProviders.map((provider) => (
                <ProviderCard key={provider.id} {...provider} />
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
    </PageLayout>
  );
}
