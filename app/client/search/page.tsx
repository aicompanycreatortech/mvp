"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button, TextField } from "@radix-ui/themes";
import { Search, Filter, TrendingUp } from "lucide-react";
import UseCaseCard from "@/components/shared/UseCaseCard";
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

export default function SearchResultsPage() {
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

    if (query) {
      performSearch(query);
    }
  }, [user, router, query]);

  const performSearch = (searchQuery: string) => {
    // Mock search algorithm based on keywords
    const queryLower = searchQuery.toLowerCase();
    const keywords = queryLower.split(/\s+/);

    // Simple scoring algorithm
    const mockResults: SearchResult[] = [
      {
        id: "uc_supply_opt",
        title: "Optimización de cadena de suministro con IA predictiva (-15% costes)",
        providerName: "AI Solutions Inc.",
        providerId: "p_aisol",
        industry: ["Manufactura", "Retail"],
        technologies: ["Python", "TensorFlow", "AWS SageMaker"],
        results: { roi: 2.4, costReductionPct: 15, leadTimeReductionPct: 22 },
        kpis: ["ROI", "Reducción de costes", "Lead time"],
        score: calculateScore("uc_supply_opt", keywords),
        featured: true,
        views: 128,
      },
      {
        id: "uc_fraud",
        title: "Detección de fraude en tiempo real (-22% pérdidas)",
        providerName: "AI Solutions Inc.",
        providerId: "p_aisol",
        industry: ["Fintech"],
        technologies: ["Python", "XGBoost", "Kafka"],
        results: { fraudLossReductionPct: 22, precision: 0.91 },
        kpis: ["Precision", "Pérdidas evitadas"],
        score: calculateScore("uc_fraud", keywords),
        featured: false,
        views: 86,
      },
    ];

    // Sort by score
    mockResults.sort((a, b) => b.score - a.score);
    setTopMatch(mockResults[0] || null);
    setResults(mockResults.slice(1));
  };

  const calculateScore = (useCaseId: string, keywords: string[]): number => {
    // Simple keyword matching
    let score = 50; // Base score

    // Match keywords from chatbotData
    chatbotData.intents.forEach((intent) => {
      const matchedKeywords = intent.keywords.filter((kw) =>
        keywords.some((k) => k.includes(kw) || kw.includes(k))
      );
      if (matchedKeywords.length > 0 && intent.mapping.matchUseCases.includes(useCaseId)) {
        score += matchedKeywords.length * 15;
      }
    });

    // Randomize slightly for demo
    score += Math.random() * 20;

    return Math.min(100, Math.max(0, score));
  };

  const industries = ["Fintech", "Retail", "Manufactura", "Healthcare", "Logística"];
  const technologies = ["Python", "TensorFlow", "PyTorch", "AWS SageMaker", "XGBoost"];

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
    if (filters.industry.length > 0 && !result.industry.some((ind) => filters.industry.includes(ind))) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Search className="w-6 h-6 text-gray-600" />
            <h1 className="text-3xl font-bold text-gray-900">Resultados de Búsqueda</h1>
          </div>
          {query && (
            <p className="text-gray-600">
              Resultados para: <span className="text-gray-900 font-medium">"{query}"</span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-gray-900" />
                <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">Industria</label>
                  <div className="space-y-2">
                    {industries.map((ind) => (
                      <button
                        key={ind}
                        onClick={() => toggleIndustryFilter(ind)}
                        className={`w-full text-left px-3 py-2 rounded-lg border transition-all ${
                          filters.industry.includes(ind)
                            ? "bg-blue-500/20 border-blue-500/50 text-blue-700"
                            : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">Tecnología</label>
                  <div className="space-y-2">
                    {technologies.map((tech) => (
                      <button
                        key={tech}
                        onClick={() => toggleTechnologyFilter(tech)}
                        className={`w-full text-left px-3 py-2 rounded-lg border transition-all ${
                          filters.technology.includes(tech)
                            ? "bg-purple-500/20 border-purple-500/50 text-purple-700"
                            : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200"
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
            {topMatch && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-yellow-400" />
                  <h2 className="text-xl font-semibold text-gray-900">Mejor Coincidencia</h2>
                </div>
                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/50 rounded-xl p-2">
                  <UseCaseCard
                    {...topMatch}
                    onContact={() => router.push(`/client/provider/${topMatch.providerId}`)}
                  />
                </div>
              </div>
            )}

            {/* Other Results */}
            {filteredResults.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Otros Resultados</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredResults.map((result) => (
                    <UseCaseCard
                      key={result.id}
                      {...result}
                      onContact={() => router.push(`/client/provider/${result.providerId}`)}
                    />
                  ))}
                </div>
              </div>
            )}

            {filteredResults.length === 0 && !topMatch && (
              <div className="text-center py-16">
                <p className="text-gray-600">No se encontraron resultados</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

