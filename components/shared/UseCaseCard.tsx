"use client";

import Link from "next/link";
import { Building2, TrendingUp, Star } from "lucide-react";
import { Button } from "@radix-ui/themes";

interface UseCaseCardProps {
  id: string;
  title: string;
  providerName: string;
  providerId: string;
  industry: string[];
  technologies: string[];
  results?: Record<string, any>;
  kpis?: string[];
  score?: number;
  featured?: boolean;
  views?: number;
  onContact?: () => void;
}

export default function UseCaseCard({
  id,
  title,
  providerName,
  providerId,
  industry,
  technologies,
  results,
  kpis,
  score,
  featured,
  views,
  onContact,
}: UseCaseCardProps) {
  const getTopKPI = () => {
    if (!results || !kpis) return null;
    const entries = Object.entries(results);
    if (entries.length === 0) return null;
    const first = entries[0];
    return { label: kpis[0] || first[0], value: first[1] };
  };

  const topKPI = getTopKPI();

  return (
    <Link href={`/client/use-case/${id}`}>
      <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-violet-300 transition-all duration-200 group cursor-pointer h-full flex flex-col shadow-sm">
        {featured && (
          <div className="flex items-center gap-1 mb-3 text-xs text-yellow-400">
            <Star className="w-3 h-3 fill-yellow-400" />
            <span>Destacado</span>
          </div>
        )}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-900 transition-colors">
              {title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <Building2 className="w-4 h-4" />
              <span>{providerName}</span>
            </div>
          </div>
          {score !== undefined && (
            <div className="flex flex-col items-center justify-center min-w-[60px]">
              <div className="text-2xl font-bold bg-gradient-to-br from-violet-600 to-purple-600 bg-clip-text text-transparent">{Math.round(score)}%</div>
              <div className="text-xs text-gray-400 font-medium">match</div>
            </div>
          )}
        </div>

        {topKPI && (
          <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-gray-600">{topKPI.label}:</span>
              <span className="font-semibold text-gray-900">
                {typeof topKPI.value === "number"
                  ? topKPI.value > 1
                    ? `${(topKPI.value * 100).toFixed(0)}%`
                    : `${topKPI.value.toFixed(2)}x`
                  : topKPI.value}
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4 flex-1">
          {industry.slice(0, 2).map((ind) => (
            <span
              key={ind}
              className="px-2.5 py-1 bg-blue-500/20 text-blue-700 text-xs rounded-md border border-blue-500/30"
            >
              {ind}
            </span>
          ))}
          {technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 bg-purple-500/20 text-purple-700 text-xs rounded-md border border-purple-500/30"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
          {views !== undefined && (
            <span className="text-xs text-gray-500">{views} visualizaciones</span>
          )}
          {onContact && (
            <Button
              size="2"
              variant="soft"
              onClick={(e) => {
                e.preventDefault();
                onContact();
              }}
            >
              Contactar
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
}

