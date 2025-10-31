"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { TextField, Select } from "@radix-ui/themes";
import { DollarSign, Search, Filter } from "lucide-react";

interface Transaction {
  id: string;
  provider: string;
  plan: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
}

export default function TransactionsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.replace("/auth");
      return;
    }

    // Mock data
    setTransactions([
      {
        id: "t1",
        provider: "AI Solutions Inc.",
        plan: "Pro",
        amount: 199,
        date: "2025-01-30",
        status: "completed",
      },
      {
        id: "t2",
        provider: "DataAI Corp",
        plan: "Básico",
        amount: 99,
        date: "2025-01-29",
        status: "pending",
      },
    ]);
  }, [user, router]);

  const statusColors = {
    completed: "bg-green-500/20 text-green-700 border-green-500/50",
    pending: "bg-yellow-500/20 text-yellow-700 border-yellow-500/50",
    failed: "bg-red-500/20 text-red-300 border-red-500/50",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Transacciones</h1>
          <p className="text-gray-600">Registro de todos los pagos y facturas</p>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <TextField.Root placeholder="Buscar transacciones..." className="pl-10" />
          </div>
          <Select.Root>
            <Select.Trigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              Todos los estados
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="all">Todos</Select.Item>
              <Select.Item value="completed">Completadas</Select.Item>
              <Select.Item value="pending">Pendientes</Select.Item>
              <Select.Item value="failed">Fallidas</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>

        <div className="bg-gray-100 border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Proveedor</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Plan</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Monto</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Fecha</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Estado</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-t border-gray-200 hover:bg-gray-100 transition-colors">
                  <td className="px-6 py-4 text-gray-900">{tx.provider}</td>
                  <td className="px-6 py-4 text-gray-600">{tx.plan}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-900 font-medium">${tx.amount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{tx.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-medium border ${statusColors[tx.status]}`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

