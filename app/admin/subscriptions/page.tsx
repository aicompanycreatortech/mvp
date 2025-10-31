"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button, TextField, Dialog } from "@radix-ui/themes";
import { DollarSign, Plus, Edit, Trash2 } from "lucide-react";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
}

export default function SubscriptionsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.replace("/auth");
      return;
    }

    // Mock data
    setPlans([
      { id: "1", name: "Básico", price: 99, features: ["3 casos de uso", "Soporte básico"] },
      { id: "2", name: "Pro", price: 199, features: ["Casos ilimitados", "Soporte prioritario", "Analytics"] },
      { id: "3", name: "Enterprise", price: 499, features: ["Todo incluido", "Soporte 24/7", "API access"] },
    ]);
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Planes de Suscripción</h1>
            <p className="text-gray-600">Gestiona los planes disponibles para proveedores</p>
          </div>
          <Button size="3" onClick={() => setShowDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Crear Plan
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-gray-100 border border-gray-200 rounded-xl p-8 hover:bg-gray-200 transition-all"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600">/mes</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-900">
                    <div className="w-2 h-2 rounded-full bg-violet-400"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex gap-2">
                <Button
                  size="2"
                  variant="soft"
                  onClick={() => {
                    setEditingPlan(plan);
                    setShowDialog(true);
                  }}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button size="2" variant="soft" color="red" className="flex-1">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog.Root open={showDialog} onOpenChange={setShowDialog}>
        <Dialog.Content>
          <Dialog.Title>{editingPlan ? "Editar Plan" : "Crear Plan"}</Dialog.Title>
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Nombre</label>
              <TextField.Root placeholder="Ej: Pro" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Precio (USD/mes)</label>
              <TextField.Root type="number" placeholder="199" className="w-full" />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="soft" onClick={() => setShowDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setShowDialog(false)}>Guardar</Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}

