"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button, TextField } from "@radix-ui/themes";
import { Search, Filter, TrendingUp } from "lucide-react";
import UseCaseCard from "@/components/shared/UseCaseCard";
import PageLayout from "@/components/shared/PageLayout";
import useCasesData from "@/data/mock/useCases.json";
import providersData from "@/data/mock/providers.json";
import chatbotData from "@/data/mock/chatbotData.json";

interface SearchResult {
  id: string;
  title: string;
  providerName: string;
  providerId: string;
  industry: string[];
  technologies: string[];
  results: Record<string, any>;
  kpis: string[];
  score: number;
  featured: boolean;
  views: number;
}

function SearchResultsContent() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [topMatch, setTopMatch] = useState<SearchResult | null>(null);
  const [filters, setFilters] = useState({
    industry: [] as string[],
    technology: [] as string[],
  });

  useEffect(() => {
    if (!user || user.role !== "client") {
      router.replace("/auth");
      return;
    }

    performSearch(query);
  }, [user, router, query]);

  const performSearch = (searchQuery: string) => {
    // Load all use cases from mock data
    const allResults: SearchResult[] = useCasesData.map((uc: any) => {
      const provider = providersData.find((p: any) => p.id === uc.providerId);
      return {
        id: uc.id,
        title: uc.title,
        providerName: provider?.name || "Unknown Provider",
        providerId: uc.providerId,
        industry: uc.industry,
        technologies: uc.technologies,
        results: uc.results,
        kpis: uc.kpis,
        score: searchQuery
          ? calculateScore(uc.id, searchQuery.toLowerCase().split(/\s+/))
          : 50 + Math.random() * 30,
        featured: uc.featured,
        views: uc.views || 0,
      };
    });

    // If there's a query, filter and score
    let filteredResults = allResults;
    if (searchQuery) {
      const keywords = searchQuery.toLowerCase().split(/\s+/);
      filteredResults = allResults.map((result) => ({
        ...result,
        score: calculateScore(result.id, keywords),
      }));
    }

    // Sort by score
    filteredResults.sort((a, b) => b.score - a.score);

    if (filteredResults.length > 0) {
      setTopMatch(filteredResults[0]);
      setResults(filteredResults.slice(1));
    } else {
      setTopMatch(null);
      setResults([]);
    }
  };

  const calculateScore = (useCaseId: string, keywords: string[]): number => {
    let score = 50; // Base score

    // Match keywords from chatbotData
    chatbotData.intents.forEach((intent) => {
      const matchedKeywords = intent.keywords.filter((kw) =>
        keywords.some((k) => k.includes(kw) || kw.includes(k))
      );
      if (
        matchedKeywords.length > 0 &&
        intent.mapping.matchUseCases.includes(useCaseId)
      ) {
        score += matchedKeywords.length * 15;
      }
    });

    // Also check if keywords match title, industry, or technologies
    const useCase = useCasesData.find((uc: any) => uc.id === useCaseId);
    if (useCase) {
      const titleLower = useCase.title.toLowerCase();
      const allText = `${titleLower} ${useCase.industry
        .join(" ")
        .toLowerCase()} ${useCase.technologies.join(" ").toLowerCase()}`;

      keywords.forEach((keyword) => {
        if (allText.includes(keyword)) {
          score += 10;
        }
      });
    }

    // Randomize slightly for demo
    score += Math.random() * 20;

    return Math.min(100, Math.max(0, score));
  };

  const industries = [
    "Fintech",
    "Retail",
    "Manufactura",
    "Healthcare",
    "Logística",
    "SaaS",
    "Customer Service",
    "Industrial",
    "E-commerce",
    "FMCG",
  ];
  const technologies = [
    "Python",
    "TensorFlow",
    "PyTorch",
    "AWS SageMaker",
    "XGBoost",
    "Kafka",
    "Scikit-learn",
    "Azure ML",
    "Transformers",
    "BERT",
    "IoT",
    "LSTM",
  ];

  const toggleIndustryFilter = (ind: string) => {
    setFilters((prev) => ({
      ...prev,
      industry: prev.industry.includes(ind)
        ? prev.industry.filter((i) => i !== ind)
        : [...prev.industry, ind],
    }));
  };

  const toggleTechnologyFilter = (tech: string) => {
    setFilters((prev) => ({
      ...prev,
      technology: prev.technology.includes(tech)
        ? prev.technology.filter((t) => t !== tech)
        : [...prev.technology, tech],
    }));
  };

  const filteredResults = results.filter((result) => {
    if (
      filters.industry.length > 0 &&
      !result.industry.some((ind) => filters.industry.includes(ind))
    ) {
      return false;
    }
    if (
      filters.technology.length > 0 &&
      !result.technologies.some((tech) => filters.technology.includes(tech))
    ) {
      return false;
    }
    return true;
  });

  const filteredTopMatch =
    topMatch &&
    (filters.industry.length === 0 ||
      topMatch.industry.some((ind) => filters.industry.includes(ind))) &&
    (filters.technology.length === 0 ||
      topMatch.technologies.some((tech) => filters.technology.includes(tech)))
      ? topMatch
      : null;

  return (
    <PageLayout>
      <div className="bg-gray-50 min-h-screen">
        <div className="mx-auto max-w-7xl px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Search className="w-6 h-6 text-gray-600" />
              <h1 className="text-3xl font-bold text-gray-900">
                Resultados de Búsqueda
              </h1>
            </div>
            {query ? (
              <p className="text-gray-600">
                Resultados para:{" "}
                <span className="text-gray-900 font-medium">"{query}"</span>
              </p>
            ) : (
              <p className="text-gray-600">
                Explorando todos los casos de uso disponibles
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="w-5 h-5 text-gray-900" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Filtros
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Industria
                    </label>
                    <div className="space-y-2">
                      {industries.map((ind) => (
                        <button
                          key={ind}
                          onClick={() => toggleIndustryFilter(ind)}
                          className={`w-full text-left px-3 py-2 rounded-lg border transition-all ${
                            filters.industry.includes(ind)
                              ? "bg-violet-500/20 border-violet-500/50 text-violet-700 font-medium"
                              : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Tecnología
                    </label>
                    <div className="space-y-2">
                      {technologies.map((tech) => (
                        <button
                          key={tech}
                          onClick={() => toggleTechnologyFilter(tech)}
                          className={`w-full text-left px-3 py-2 rounded-lg border transition-all ${
                            filters.technology.includes(tech)
                              ? "bg-violet-500/20 border-violet-500/50 text-violet-700 font-medium"
                              : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {tech}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-3 space-y-6">
              {/* Top Match */}
              {filteredTopMatch && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-yellow-500" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Mejor Coincidencia
                    </h2>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/50 rounded-xl p-2">
                    <UseCaseCard
                      {...filteredTopMatch}
                      onContact={() =>
                        router.push(
                          `/client/provider/${filteredTopMatch.providerId}`
                        )
                      }
                    />
                  </div>
                </div>
              )}

              {/* Other Results */}
              {filteredResults.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {query ? "Otros Resultados" : "Todos los Casos de Uso"} (
                    {filteredResults.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredResults.map((result) => (
                      <UseCaseCard
                        key={result.id}
                        {...result}
                        onContact={() =>
                          router.push(`/client/provider/${result.providerId}`)
                        }
                      />
                    ))}
                  </div>
                </div>
              )}

              {filteredResults.length === 0 && !filteredTopMatch && (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg mb-2">
                    No se encontraron resultados
                  </p>
                  <p className="text-gray-500 text-sm">
                    Prueba ajustando los filtros o realiza una nueva búsqueda
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-600">Cargando...</p>
        </div>
      }
    >
      <SearchResultsContent />
    </Suspense>
  );
}
