"use client";

export function MetricCardSkeleton() {
  return (
    <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gray-200"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="h-10 w-32 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-20 bg-gray-200 rounded"></div>
    </div>
  );
}

export function UseCaseCardSkeleton() {
  return (
    <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 animate-pulse">
      <div className="h-6 w-16 bg-gray-200 rounded mb-3"></div>
      <div className="h-6 w-full bg-gray-200 rounded mb-3"></div>
      <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
      <div className="h-20 bg-gray-200 rounded mb-4"></div>
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-20 bg-gray-200 rounded"></div>
        <div className="h-6 w-24 bg-gray-200 rounded"></div>
      </div>
      <div className="h-4 w-24 bg-gray-200 rounded"></div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-4">
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-6 w-16 bg-gray-200 rounded"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 w-20 bg-gray-200 rounded"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-8 w-20 bg-gray-200 rounded"></div>
      </td>
    </tr>
  );
}

