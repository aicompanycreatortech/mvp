"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button, Tabs, Dialog, TextArea } from "@radix-ui/themes";
import { Building2, ExternalLink, MessageSquare, Star, Users, Code, Award } from "lucide-react";
import Link from "next/link";
import UseCaseCard from "@/components/shared/UseCaseCard";
import PageLayout from "@/components/shared/PageLayout";

export default function ProviderProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [provider, setProvider] = useState<any>(null);
  const [useCases, setUseCases] = useState<any[]>([]);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [contactMessage, setContactMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "client") {
      router.replace("/auth");
      return;
    }

    // Mock data
    setProvider({
      id: "p_aisol",
      name: "AI Solutions Inc.",
      logoUrl: "/vercel.svg",
      website: "https://example.com",
      social: { linkedin: "https://linkedin.com/company/aisolutions" },
      elevatorPitch:
        "Soluciones de IA de punta a punta para optimizar operaciones y crecimiento.",
      valueProp:
        "Integramos modelos generativos y predictivos con procesos del cliente para ROI rápido.",
      competences: [
        "Procesamiento de Lenguaje Natural",
        "Visión por Computador",
        "Modelos Predictivos",
        "IA Generativa",
      ],
      team: {
        aggregateExperienceYears: 52,
        members: [
          { name: "Ana CEO", role: "CEO", experienceYears: 15 },
          { name: "Luis CTO", role: "CTO", experienceYears: 18 },
          { name: "Sofía DS", role: "Lead Data Scientist", experienceYears: 12 },
        ],
        certifications: ["AWS ML Specialty", "Google Cloud ML"],
        publications: ["Paper X 2023", "Whitepaper Supply Chain 2024"],
      },
      stack: ["Python", "TensorFlow", "AWS SageMaker", "PyTorch", "Docker"],
      clients: [
        { name: "RetailCo", logoUrl: "/globe.svg", testimonial: "+18% en conversión" },
        { name: "BankCo", logoUrl: "/next.svg", testimonial: "-22% fraude" },
      ],
    });

    setUseCases([
      {
        id: "uc_supply_opt",
        title: "Optimización de cadena de suministro con IA predictiva (-15% costes)",
        providerName: "AI Solutions Inc.",
        providerId: "p_aisol",
        industry: ["Manufactura", "Retail"],
        technologies: ["Python", "TensorFlow", "AWS SageMaker"],
        results: { roi: 2.4, costReductionPct: 15 },
        kpis: ["ROI", "Reducción de costes"],
        featured: true,
        views: 128,
      },
      {
        id: "uc_fraud",
        title: "Detección de fraude en tiempo real (-22% pérdidas)",
        providerName: "AI Solutions Inc.",
        providerId: "p_aisol",
        industry: ["Fintech"],
        technologies: ["Python", "XGBoost", "Kafka"],
        results: { fraudLossReductionPct: 22, precision: 0.91 },
        kpis: ["Precision", "Pérdidas evitadas"],
        featured: false,
        views: 86,
      },
    ]);
  }, [user, router, params]);

  const handleContact = async () => {
    if (!contactMessage.trim()) return;

    setSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSending(false);
    setShowContactDialog(false);
    setContactMessage("");
    alert("Mensaje enviado exitosamente (mock)");
  };

  if (!provider) return null;

  return (
    <PageLayout>
      <div className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gray-100 border border-gray-200 rounded-xl p-8 mb-8">
          <div className="flex items-start gap-6">
            {provider.logoUrl ? (
              <img
                src={provider.logoUrl}
                alt={provider.name}
                className="w-20 h-20 rounded-xl object-contain"
              />
            ) : (
              <div className="w-20 h-20 rounded-xl bg-gray-200 border border-gray-200 flex items-center justify-center">
                <Building2 className="w-10 h-10 text-gray-500" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 break-words">{provider.name}</h1>
              <p className="text-gray-600 mb-4 break-words">{provider.elevatorPitch}</p>
              <div className="flex items-center gap-4">
                {provider.website && (
                  <a
                    href={provider.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Sitio web
                  </a>
                )}
                {provider.social?.linkedin && (
                  <a
                    href={provider.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    <ExternalLink className="w-4 h-4" />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
            <Button size="3" highContrast onClick={() => setShowContactDialog(true)}>
              <MessageSquare className="w-4 h-4 mr-2" />
              Contactar
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs.Root defaultValue="summary">
          <Tabs.List className="mb-6">
            <Tabs.Trigger value="summary">Resumen</Tabs.Trigger>
            <Tabs.Trigger value="cases">Casos de Éxito</Tabs.Trigger>
            <Tabs.Trigger value="team">Equipo y Expertise</Tabs.Trigger>
            <Tabs.Trigger value="stack">Stack Tecnológico</Tabs.Trigger>
            <Tabs.Trigger value="validation">Validación y Clientes</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="summary">
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Propuesta de Valor</h2>
              <p className="text-gray-900 leading-relaxed mb-6 break-words">{provider.valueProp}</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Competencias Clave</h3>
              <div className="flex flex-wrap gap-2 overflow-hidden">
                {provider.competences.map((comp: string) => (
                  <span
                    key={comp}
                    className="px-4 py-2 bg-violet-500/20 text-violet-700 rounded-lg border border-violet-500/30 truncate max-w-full"
                    title={comp}
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="cases">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Casos de Éxito</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {useCases.map((useCase) => (
                  <UseCaseCard key={useCase.id} {...useCase} />
                ))}
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="team">
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                <Users className="w-6 h-6 inline mr-2" />
                Equipo y Expertise
              </h2>
              <div className="mb-6 p-4 bg-gray-100 rounded-lg border border-gray-200">
                <p className="text-lg text-gray-900 mb-1">
                  {provider.team.aggregateExperienceYears}+ años de experiencia combinada
                </p>
                <p className="text-sm text-gray-600">en inteligencia artificial</p>
              </div>

              <div className="space-y-4 mb-6">
                {provider.team.members.map((member: any, idx: number) => (
                  <div key={idx} className="p-4 bg-gray-100 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          {member.experienceYears} años
                        </p>
                        <p className="text-xs text-gray-500">experiencia</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Certificaciones
                  </h3>
                  <div className="space-y-2">
                    {provider.team.certifications.map((cert: string, idx: number) => (
                      <div
                        key={idx}
                        className="px-3 py-2 bg-gray-100 rounded-lg border border-gray-200 text-sm text-gray-900"
                      >
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Publicaciones</h3>
                  <div className="space-y-2">
                    {provider.team.publications.map((pub: string, idx: number) => (
                      <div
                        key={idx}
                        className="px-3 py-2 bg-gray-100 rounded-lg border border-gray-200 text-sm text-gray-900"
                      >
                        {pub}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="stack">
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Code className="w-6 h-6" />
                Stack Tecnológico
              </h2>
              <div className="flex flex-wrap gap-3 overflow-hidden">
                {provider.stack.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-purple-500/20 text-purple-700 rounded-lg border border-purple-500/30 text-lg font-medium truncate max-w-full"
                    title={tech}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="validation">
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                <Star className="w-6 h-6 inline mr-2" />
                Validación y Clientes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {provider.clients.map((client: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-6 bg-gray-100 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-4 mb-4 min-w-0">
                      {client.logoUrl ? (
                        <img
                          src={client.logoUrl}
                          alt={client.name}
                          className="w-12 h-12 rounded-lg object-contain flex-shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-200 border border-gray-200 flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-6 h-6 text-gray-500" />
                        </div>
                      )}
                      <h3 className="font-semibold text-gray-900 truncate flex-1 min-w-0">{client.name}</h3>
                    </div>
                    <p className="text-sm text-gray-900 italic break-words whitespace-pre-wrap">"{client.testimonial}"</p>
                  </div>
                ))}
              </div>
            </div>
          </Tabs.Content>
        </Tabs.Root>

        <Dialog.Root open={showContactDialog} onOpenChange={setShowContactDialog}>
          <Dialog.Content className="max-w-2xl">
            <Dialog.Title>Contactar a {provider.name}</Dialog.Title>
            <Dialog.Description className="mb-4">
              Envía un mensaje al proveedor a través de la plataforma
            </Dialog.Description>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Mensaje</label>
                <TextArea
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  rows={6}
                  className="w-full"
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="soft" onClick={() => setShowContactDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleContact} disabled={sending || !contactMessage.trim()}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {sending ? "Enviando..." : "Enviar mensaje"}
                </Button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Root>
        </div>
      </div>
    </PageLayout>
  );
}

