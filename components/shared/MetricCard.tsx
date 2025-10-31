"use client";

import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: number;
    trend: "up" | "down" | "neutral";
  };
  subtitle?: string;
}

export default function MetricCard({ title, value, icon: Icon, change, subtitle }: MetricCardProps) {
  const trendColors = {
    up: "text-green-400",
    down: "text-red-400",
    neutral: "text-gray-600",
  };

  const trendIcons = {
    up: "↑",
    down: "↓",
    neutral: "→",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-violet-50 rounded-lg">
            <Icon className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</h3>
            {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
          </div>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-4xl font-bold text-gray-900 mb-2">{value}</p>
          {change && (
            <div className={`flex items-center gap-1.5 text-sm font-medium ${trendColors[change.trend]}`}>
              <span className="text-base">{trendIcons[change.trend]}</span>
              <span>{Math.abs(change.value)}%</span>
              <span className="text-gray-400 text-xs ml-1">vs mes anterior</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

