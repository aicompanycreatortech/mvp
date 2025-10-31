"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button } from "@radix-ui/themes";
import { Search, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import EmptyState from "@/components/shared/EmptyState";

interface SearchHistoryItem {
  query: string;
  timestamp: string;
}

export default function HistoryPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  useEffect(() => {
    if (!user || user.role !== "client") {
      router.replace("/auth");
      return;
    }

    // Load from localStorage
    const stored = localStorage.getItem("searchHistory");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, [user, router]);

  const clearHistory = () => {
    if (confirm("¿Estás seguro de eliminar todo el historial?")) {
      localStorage.removeItem("searchHistory");
      setHistory([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Historial de Búsquedas</h1>
          <p className="text-gray-600">Revisa tus búsquedas anteriores</p>
        </div>

        {history.length === 0 ? (
          <EmptyState
            icon={Clock}
            title="No hay historial"
            description="Las búsquedas que realices aparecerán aquí"
          />
        ) : (
          <>
            <div className="flex justify-end mb-6">
              <Button variant="soft" size="2" onClick={clearHistory}>
                Limpiar historial
              </Button>
            </div>
            <div className="space-y-3">
              {history.map((item, idx) => (
                <Link key={idx} href={`/client/search?q=${encodeURIComponent(item.query)}`}>
                  <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 hover:bg-gray-200 hover:border-gray-300 transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                          <Search className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900 font-medium mb-1">{item.query}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(item.timestamp).toLocaleString("es-ES")}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-500" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

