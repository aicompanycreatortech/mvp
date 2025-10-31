"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Star, Heart } from "lucide-react";
import ProviderCard from "@/components/shared/ProviderCard";
import EmptyState from "@/components/shared/EmptyState";

export default function FavoritesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    if (!user || user.role !== "client") {
      router.replace("/auth");
      return;
    }

    // Load from localStorage
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, [user, router]);

  const removeFavorite = (id: string) => {
    const updated = favorites.filter((fav) => fav.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-6 h-6 text-red-400 fill-red-400" />
            <h1 className="text-3xl font-bold text-gray-900">Proveedores Guardados</h1>
          </div>
          <p className="text-gray-600">Tus proveedores favoritos para comparar más tarde</p>
        </div>

        {favorites.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="No hay favoritos"
            description="Guarda proveedores que te interesen para acceder a ellos fácilmente"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((provider) => (
              <div key={provider.id} className="relative">
                <ProviderCard {...provider} />
                <button
                  onClick={() => removeFavorite(provider.id)}
                  className="absolute top-4 right-4 p-2 bg-gray-200 hover:bg-white/20 rounded-lg transition-all"
                >
                  <Heart className="w-5 h-5 text-red-400 fill-red-400" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

