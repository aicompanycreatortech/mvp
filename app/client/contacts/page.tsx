"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button, Select } from "@radix-ui/themes";
import { MessageSquare, Building2, Clock, CheckCircle2 } from "lucide-react";
import EmptyState from "@/components/shared/EmptyState";

type ContactStatus = "Nuevo" | "Contactado" | "En Negociación" | "Cerrado";

interface Contact {
  id: string;
  providerName: string;
  providerId: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
}

export default function ContactsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filterStatus, setFilterStatus] = useState<ContactStatus | "all">("all");

  useEffect(() => {
    if (!user || user.role !== "client") {
      router.replace("/auth");
      return;
    }

    // Mock data - in real app would fetch from API
    setContacts([
      {
        id: "c1",
        providerName: "AI Solutions Inc.",
        providerId: "p_aisol",
        message: "Estamos interesados en optimizar logística en EMEA",
        status: "Contactado",
        createdAt: "2025-01-30T10:15:00Z",
      },
    ]);
  }, [user, router]);

  const statusColors = {
    Nuevo: "bg-blue-500/20 text-blue-700 border-blue-500/50",
    Contactado: "bg-yellow-500/20 text-yellow-700 border-yellow-500/50",
    "En Negociación": "bg-purple-500/20 text-purple-700 border-purple-500/50",
    Cerrado: "bg-green-500/20 text-green-700 border-green-500/50",
  };

  const filteredContacts = contacts.filter(
    (contact) => filterStatus === "all" || contact.status === filterStatus
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Estado de Contactos</h1>
          <p className="text-gray-600">Sigue tus conversaciones con proveedores</p>
        </div>

        <div className="mb-6">
          <Select.Root value={filterStatus} onValueChange={(v) => setFilterStatus(v as any)}>
            <Select.Trigger className="w-48">
              {filterStatus === "all" ? "Todos los estados" : filterStatus}
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="all">Todos los estados</Select.Item>
              <Select.Item value="Nuevo">Nuevo</Select.Item>
              <Select.Item value="Contactado">Contactado</Select.Item>
              <Select.Item value="En Negociación">En Negociación</Select.Item>
              <Select.Item value="Cerrado">Cerrado</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>

        {filteredContacts.length === 0 ? (
          <EmptyState
            icon={MessageSquare}
            title="No hay contactos"
            description="Los contactos iniciados con proveedores aparecerán aquí"
          />
        ) : (
          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-gray-100 border border-gray-200 rounded-xl p-6 hover:bg-gray-200 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{contact.providerName}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(contact.createdAt).toLocaleDateString("es-ES")}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-medium border ${statusColors[contact.status]}`}
                  >
                    {contact.status}
                  </span>
                </div>

                <div className="bg-gray-100 rounded-lg p-4 mb-4 border border-gray-200">
                  <p className="text-sm text-gray-900">{contact.message}</p>
                </div>

                <Button
                  size="2"
                  variant="soft"
                  onClick={() => router.push(`/client/provider/${contact.providerId}`)}
                >
                  Ver perfil
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

