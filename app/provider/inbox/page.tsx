"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button, TextField, TextArea, Select, Dialog } from "@radix-ui/themes";
import { Mail, Send, Filter, Search, CheckCircle2, MessageSquare, X } from "lucide-react";
import EmptyState from "@/components/shared/EmptyState";

type LeadStatus = "Nuevo" | "Contactado" | "En Negociación" | "Cerrado";

interface Lead {
  id: string;
  clientUserId: string;
  clientName: string;
  providerId: string;
  useCaseId: string;
  useCaseTitle: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
  lastMessage?: string;
}

export default function InboxPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filterStatus, setFilterStatus] = useState<LeadStatus | "all">("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [showReplyDialog, setShowReplyDialog] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "provider") {
      router.replace("/auth");
      return;
    }

    // Mock data
    setLeads([
      {
        id: "lead_001",
        clientUserId: "u_client_1",
        clientName: "HP",
        providerId: "p_aisol",
        useCaseId: "uc_supply_opt",
        useCaseTitle: "Optimización de cadena de suministro",
        message: "Estamos interesados en optimizar logística en EMEA",
        status: "Nuevo",
        createdAt: "2025-01-30T10:15:00Z",
      },
      {
        id: "lead_002",
        clientUserId: "u_client_2",
        clientName: "TechCorp",
        providerId: "p_aisol",
        useCaseId: "uc_fraud",
        useCaseTitle: "Detección de fraude en tiempo real",
        message: "Necesitamos una solución para detectar transacciones fraudulentas",
        status: "Contactado",
        createdAt: "2025-01-29T14:30:00Z",
        lastMessage: "Hemos revisado su solicitud y podemos ayudar...",
      },
    ]);
  }, [user, router]);

  const filteredLeads = leads.filter(
    (lead) => filterStatus === "all" || lead.status === filterStatus
  );

  const updateLeadStatus = (leadId: string, newStatus: LeadStatus) => {
    setLeads(leads.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead)));
  };

  const handleReply = async () => {
    if (!replyText.trim() || !selectedLead) return;

    setSending(true);
    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSending(false);

    // Update lead
    setLeads(
      leads.map((lead) =>
        lead.id === selectedLead.id
          ? { ...lead, status: "Contactado", lastMessage: replyText }
          : lead
      )
    );

    setReplyText("");
    setShowReplyDialog(false);
    setSelectedLead(null);
    alert("Correo enviado exitosamente (mock)");
  };

  const statusColors = {
    Nuevo: "bg-blue-500/20 text-blue-700 border-blue-500/50",
    Contactado: "bg-yellow-500/20 text-yellow-700 border-yellow-500/50",
    "En Negociación": "bg-purple-500/20 text-purple-700 border-purple-500/50",
    Cerrado: "bg-green-500/20 text-green-700 border-green-500/50",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Buzón de Interacciones</h1>
          <p className="text-gray-600">Gestiona tus leads y conversaciones con clientes</p>
        </div>

        <div className="bg-gray-100 border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <TextField.Root
                    placeholder="Buscar leads..."
                    className="pl-10 w-64"
                  />
                </div>
              </div>
              <Select.Root value={filterStatus} onValueChange={(v) => setFilterStatus(v as any)}>
                <Select.Trigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
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
          </div>

          {filteredLeads.length === 0 ? (
            <EmptyState
              icon={MessageSquare}
              title="No hay leads"
              description="Los mensajes de clientes interesados aparecerán aquí"
            />
          ) : (
            <div className="space-y-4">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="bg-gray-100 border border-gray-200 rounded-xl p-6 hover:bg-gray-200 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{lead.clientName}</h3>
                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-medium border ${statusColors[lead.status]}`}
                        >
                          {lead.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        Caso de uso: <span className="text-gray-900">{lead.useCaseTitle}</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(lead.createdAt).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-100 rounded-lg p-4 mb-4 border border-gray-200">
                    <p className="text-sm text-gray-900">{lead.message}</p>
                  </div>

                  {lead.lastMessage && (
                    <div className="bg-blue-500/10 rounded-lg p-4 mb-4 border border-blue-500/20">
                      <p className="text-xs text-blue-700 mb-1">Tu última respuesta:</p>
                      <p className="text-sm text-gray-900">{lead.lastMessage}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Button
                      size="2"
                      variant="soft"
                      onClick={() => {
                        setSelectedLead(lead);
                        setShowReplyDialog(true);
                      }}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Responder
                    </Button>
                    <Select.Root
                      value={lead.status}
                      onValueChange={(v) => updateLeadStatus(lead.id, v as LeadStatus)}
                    >
                      <Select.Trigger className="w-48" variant="soft">
                        Cambiar estado
                      </Select.Trigger>
                      <Select.Content>
                        <Select.Item value="Nuevo">Nuevo</Select.Item>
                        <Select.Item value="Contactado">Contactado</Select.Item>
                        <Select.Item value="En Negociación">En Negociación</Select.Item>
                        <Select.Item value="Cerrado">Cerrado</Select.Item>
                      </Select.Content>
                    </Select.Root>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Dialog.Root open={showReplyDialog} onOpenChange={setShowReplyDialog}>
        <Dialog.Content className="max-w-2xl">
          <Dialog.Title>Responder a {selectedLead?.clientName}</Dialog.Title>
          <Dialog.Description className="mb-4">
            Envía un mensaje al cliente a través de la plataforma (mock)
          </Dialog.Description>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Mensaje</label>
              <TextArea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Escribe tu respuesta..."
                rows={6}
                className="w-full"
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="soft" onClick={() => setShowReplyDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleReply} disabled={sending || !replyText.trim()}>
                <Send className="w-4 h-4 mr-2" />
                {sending ? "Enviando..." : "Enviar correo"}
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}

