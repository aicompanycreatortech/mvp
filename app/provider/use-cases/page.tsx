"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { Button, Dialog } from "@radix-ui/themes";
import {
  Plus,
  Edit,
  Trash2,
  Star,
  Eye,
  TrendingUp,
  X,
  Building2,
} from "lucide-react";
import UseCaseCard from "@/components/shared/UseCaseCard";
import EmptyState from "@/components/shared/EmptyState";
import PageLayout from "@/components/shared/PageLayout";
import useCasesData from "@/data/mock/useCases.json";
import providersData from "@/data/mock/providers.json";

interface UseCase {
  id: string;
  title: string;
  providerName: string;
  providerId: string;
  industry: string[];
  technologies: string[];
  results: Record<string, any>;
  kpis: string[];
  views: number;
  featured: boolean;
  problem?: string;
  solution?: string;
}

export default function UseCasesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "provider") {
      router.replace("/auth");
      return;
    }

    // Load use cases for this provider (filter by providerId from user)
    const providerId = "p_aisol"; // Mock - would come from user context
    const providerUseCases = useCasesData
      .filter((uc: any) => uc.providerId === providerId)
      .map((uc: any) => {
        const provider = providersData.find((p: any) => p.id === uc.providerId);
        return {
          id: uc.id,
          title: uc.title,
          providerName: provider?.name || "Unknown",
          providerId: uc.providerId,
          industry: uc.industry,
          technologies: uc.technologies,
          results: uc.results,
          kpis: uc.kpis,
          views: uc.views || 0,
          featured: uc.featured || false,
          problem: uc.problem,
          solution: uc.solution,
        };
      });

    setUseCases(providerUseCases);
  }, [user, router]);

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este caso de uso?")) {
      setUseCases(useCases.filter((uc) => uc.id !== id));
      // In real app would call API
    }
  };

  const toggleFeatured = (id: string) => {
    setUseCases(
      useCases.map((uc) =>
        uc.id === id ? { ...uc, featured: !uc.featured } : uc
      )
    );
    // In real app would call API
  };

  const handlePreview = (useCase: UseCase) => {
    setSelectedUseCase(useCase);
    setShowPreview(true);
  };

  return (
    <PageLayout>
      <div className="bg-gray-50 min-h-screen">
        <div className="mx-auto max-w-7xl px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Mis Casos de Uso
              </h1>
              <p className="text-gray-600">
                Gestiona y publica tus casos de éxito
              </p>
            </div>
            <Link href="/provider/use-cases/new">
              <Button
                size="3"
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white"
              >
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
                <div key={useCase.id} className="group relative">
                  {/* Preview overlay on hover */}
                  <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                    <Button
                      size="3"
                      className="bg-white text-gray-900 hover:bg-gray-100"
                      onClick={() => handlePreview(useCase)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Vista Previa
                    </Button>
                  </div>

                  {/* Card content */}
                  <div
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-violet-300 transition-all duration-200 h-full flex flex-col cursor-pointer"
                    onClick={() => handlePreview(useCase)}
                  >
                    {useCase.featured && (
                      <div className="flex items-center gap-1 mb-3 text-xs text-yellow-600">
                        <Star className="w-3 h-3 fill-yellow-400" />
                        <span className="font-medium">Destacado</span>
                      </div>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {useCase.title}
                    </h3>
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
                      <Link
                        href={`/provider/use-cases/${useCase.id}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button size="2" variant="soft">
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                      </Link>
                      <Button
                        size="2"
                        variant="soft"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFeatured(useCase.id);
                        }}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            useCase.featured
                              ? "fill-yellow-400 text-yellow-400"
                              : ""
                          }`}
                        />
                      </Button>
                      <Button
                        size="2"
                        variant="soft"
                        color="red"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(useCase.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Preview Dialog */}
          <Dialog.Root open={showPreview} onOpenChange={setShowPreview}>
            <Dialog.Content className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <Dialog.Title className="flex items-center justify-between">
                <span>Vista Previa - Como lo verá el cliente</span>
                <Button
                  variant="ghost"
                  size="2"
                  onClick={() => setShowPreview(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </Dialog.Title>

              {selectedUseCase && (
                <div className="mt-6 space-y-6">
                  {/* Header */}
                  <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {selectedUseCase.title}
                    </h2>
                    <div className="flex items-center gap-3 mb-4">
                      <Building2 className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-900 font-medium">
                        {selectedUseCase.providerName}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedUseCase.industry.map((ind) => (
                        <span
                          key={ind}
                          className="px-3 py-1 bg-blue-500/20 text-blue-700 text-sm rounded-lg border border-blue-500/30"
                        >
                          {ind}
                        </span>
                      ))}
                      {selectedUseCase.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-purple-500/20 text-purple-700 text-sm rounded-lg border border-purple-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Problem & Solution */}
                  {selectedUseCase.problem && (
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Problema
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedUseCase.problem}
                      </p>
                    </div>
                  )}

                  {selectedUseCase.solution && (
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Solución
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedUseCase.solution}
                      </p>
                    </div>
                  )}

                  {/* Results */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Resultados
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.entries(selectedUseCase.results).map(
                        ([key, value], idx) => {
                          const kpi = selectedUseCase.kpis[idx] || key;
                          return (
                            <div
                              key={key}
                              className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-4 text-center"
                            >
                              <p className="text-sm text-gray-600 mb-2">
                                {kpi}
                              </p>
                              <p className="text-2xl font-bold text-violet-700">
                                {typeof value === "number"
                                  ? value > 1
                                    ? `${(value * 100).toFixed(0)}%`
                                    : `${value.toFixed(2)}x`
                                  : value}
                              </p>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                    <Button
                      variant="soft"
                      onClick={() => setShowPreview(false)}
                    >
                      Cerrar
                    </Button>
                    <Button
                      onClick={() =>
                        router.push(`/provider/use-cases/${selectedUseCase.id}`)
                      }
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                  </div>
                </div>
              )}
            </Dialog.Content>
          </Dialog.Root>
        </div>
      </div>
    </PageLayout>
  );
}
