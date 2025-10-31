"use client";

import Link from "next/link";
import { Building2, Star, ExternalLink } from "lucide-react";

interface ProviderCardProps {
  id: string;
  name: string;
  logoUrl?: string;
  elevatorPitch: string;
  competences: string[];
  featured?: boolean;
  onClick?: () => void;
}

export default function ProviderCard({
  id,
  name,
  logoUrl,
  elevatorPitch,
  competences,
  featured,
  onClick,
}: ProviderCardProps) {
  const content = (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-violet-300 transition-all duration-200 group cursor-pointer h-full flex flex-col shadow-sm">
      {featured && (
        <div className="flex items-center gap-1 mb-3 text-xs text-yellow-400">
          <Star className="w-3 h-3 fill-yellow-400" />
          <span>Destacado</span>
        </div>
      )}
      <div className="flex items-start gap-4 mb-4">
        {logoUrl ? (
          <div className="w-12 h-12 rounded-lg bg-gray-200 border border-gray-200 flex items-center justify-center flex-shrink-0">
            <img src={logoUrl} alt={name} className="w-8 h-8 object-contain" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-lg bg-gray-200 border border-gray-200 flex items-center justify-center flex-shrink-0">
            <Building2 className="w-6 h-6 text-gray-600" />
          </div>
        )}
        <div className="flex-1 min-w-0 overflow-hidden">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-gray-900 transition-colors truncate">
            {name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 break-words">{elevatorPitch}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto overflow-hidden">
        {competences.slice(0, 4).map((comp) => (
          <span
            key={comp}
            className="px-2.5 py-1 bg-violet-500/20 text-violet-700 text-xs rounded-md border border-violet-500/30 truncate max-w-full"
            title={comp}
          >
            {comp}
          </span>
        ))}
        {competences.length > 4 && (
          <span className="px-2.5 py-1 bg-gray-200 text-gray-500 text-xs rounded-md border border-gray-200 flex-shrink-0">
            +{competences.length - 4}
          </span>
        )}
      </div>
    </div>
  );

  if (onClick) {
    return <div onClick={onClick}>{content}</div>;
  }

  return <Link href={`/client/provider/${id}`}>{content}</Link>;
}

