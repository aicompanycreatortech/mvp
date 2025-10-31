"use client";

import { LucideIcon } from "lucide-react";
import { Button } from "@radix-ui/themes";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-gray-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center max-w-md mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button size="3" variant="soft" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

