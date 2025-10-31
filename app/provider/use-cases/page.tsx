"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@radix-ui/themes";
import { Plus, Edit, Trash2, Star, Eye, TrendingUp } from "lucide-react";
import UseCaseCard from "@/components/shared/UseCaseCard";
import EmptyState from "@/components/shared/EmptyState";
import PageLayout from "@/components/shared/PageLayout";

interface UseCase {
  id: string;
  title: string;
  industry: string[];
  technologies: string[];
  results: Record<string, any>;
  kpis: string[];
  views: number;
  featured: boolean;
}

export default function UseCasesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [useCases, setUseCases] = useState<UseCase[]>([]);

  useEffect(() => {
    if (!user || user.role !== "provider") {
      router.replace("/auth");
      return;
    }

    // Mock data - in real app would fetch from API
    setUseCases([
      {
        id: "uc_supply_opt",
        title: "Optimización de cadena de suministro con IA predictiva (-15% costes)",
        industry: ["Manufactura", "Retail"],
        technologies: ["Python", "TensorFlow", "AWS SageMaker"],
        results: { roi: 2.4, costReductionPct: 15, leadTimeReductionPct: 22 },
        kpis: ["ROI", "Reducción de costes", "Lead time"],
        views: 128,
        featured: true,
      },
      {
        id: "uc_fraud",
        title: "Detección de fraude en tiempo real (-22% pérdidas)",
        industry: ["Fintech"],
        technologies: ["Python", "XGBoost", "Kafka"],
        results: { fraudLossReductionPct: 22, precision: 0.91 },
        kpis: ["Precision", "Pérdidas evitadas"],
        views: 86,
        featured: false,
      },
    ]);
  }, [user, router]);

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este caso de uso?")) {
      setUseCases(useCases.filter((uc) => uc.id !== id));
      // In real app would call API
    }
  };

  const toggleFeatured = (id: string) => {
    setUseCases(
      useCases.map((uc) => (uc.id === id ? { ...uc, featured: !uc.featured } : uc))
    );
    // In real app would call API
  };

  return (
    <PageLayout>
      <div className="bg-gray-50 min-h-screen">
        <div className="mx-auto max-w-7xl px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Casos de Uso</h1>
            <p className="text-gray-600">Gestiona y publica tus casos de éxito</p>
          </div>
          <Link href="/provider/use-cases/new">
            <Button size="3" highContrast>
              <Plus className="w-4 h-4 mr-2" />
              Añadir caso de uso
            </Button>
          </Link>
        </div>

        {useCases.length === 0 ? (
          <EmptyState
            icon={TrendingUp}
            title="No hay casos de uso publicados"
            description="Comienza creando tu primer caso de uso para mostrar a los clientes potenciales"
            actionLabel="Crear caso de uso"
            onAction={() => router.push("/provider/use-cases/new")}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase) => (
              <div key={useCase.id} className="relative">
                <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 hover:bg-gray-200 hover:border-gray-300 transition-all duration-200 h-full flex flex-col">
                  {useCase.featured && (
                    <div className="flex items-center gap-1 mb-3 text-xs text-yellow-400">
                      <Star className="w-3 h-3 fill-yellow-400" />
                      <span>Destacado</span>
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Eye className="w-4 h-4" />
                    <span>{useCase.views} visualizaciones</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4 flex-1">
                    {useCase.industry.slice(0, 2).map((ind) => (
                      <span
                        key={ind}
                        className="px-2.5 py-1 bg-blue-500/20 text-blue-700 text-xs rounded-md border border-blue-500/30"
                      >
                        {ind}
                      </span>
                    ))}
                    {useCase.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-purple-500/20 text-purple-700 text-xs rounded-md border border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                    <Link href={`/provider/use-cases/${useCase.id}`}>
                      <Button size="2" variant="soft">
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                    </Link>
                    <Button
                      size="2"
                      variant="soft"
                      onClick={() => toggleFeatured(useCase.id)}
                    >
                      <Star
                        className={`w-4 h-4 mr-2 ${useCase.featured ? "fill-yellow-400 text-yellow-400" : ""}`}
                      />
                      {useCase.featured ? "Destacar" : "Destacar"}
                    </Button>
                    <Button
                      size="2"
                      variant="soft"
                      color="red"
                      onClick={() => handleDelete(useCase.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </PageLayout>
  );
}

