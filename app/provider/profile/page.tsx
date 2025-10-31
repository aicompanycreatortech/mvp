"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button, TextField, TextArea } from "@radix-ui/themes";
import { Save, Upload, Plus, X, Link as LinkIcon, Building2 } from "lucide-react";
import PageLayout from "@/components/shared/PageLayout";

interface ProviderProfile {
  name: string;
  logoUrl: string;
  website: string;
  social: {
    linkedin?: string;
    twitter?: string;
  };
  elevatorPitch: string;
  valueProp: string;
  competences: string[];
  team: {
    aggregateExperienceYears: number;
    members: Array<{
      name: string;
      role: string;
      experienceYears: number;
    }>;
    certifications: string[];
    publications: string[];
  };
  stack: string[];
  clients: Array<{
    name: string;
    logoUrl: string;
    testimonial: string;
  }>;
}

const AVAILABLE_COMPETENCES = [
  "Procesamiento de Lenguaje Natural",
  "Visión por Computador",
  "Modelos Predictivos",
  "IA Generativa",
  "Análisis de Datos",
  "Machine Learning",
  "Deep Learning",
  "Computer Vision",
  "NLP",
  "Reinforcement Learning",
];

export default function ProviderProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<ProviderProfile>({
    name: "AI Solutions Inc.",
    logoUrl: "",
    website: "https://example.com",
    social: { linkedin: "https://linkedin.com/company/aisolutions" },
    elevatorPitch: "Soluciones de IA de punta a punta para optimizar operaciones y crecimiento.",
    valueProp: "Integramos modelos generativos y predictivos con procesos del cliente para ROI rápido.",
    competences: ["Procesamiento de Lenguaje Natural", "Visión por Computador"],
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
    stack: ["Python", "TensorFlow", "AWS SageMaker"],
    clients: [
      { name: "RetailCo", logoUrl: "/globe.svg", testimonial: "+18% en conversión" },
      { name: "BankCo", logoUrl: "/next.svg", testimonial: "-22% fraude" },
    ],
  });

  useEffect(() => {
    if (!user || user.role !== "provider") {
      router.replace("/auth");
    }
  }, [user, router]);

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    alert("Perfil guardado exitosamente (mock)");
  };

  const toggleCompetence = (comp: string) => {
    setProfile((prev) => ({
      ...prev,
      competences: prev.competences.includes(comp)
        ? prev.competences.filter((c) => c !== comp)
        : [...prev.competences, comp],
    }));
  };

  const addTeamMember = () => {
    setProfile((prev) => ({
      ...prev,
      team: {
        ...prev.team,
        members: [
          ...prev.team.members,
          { name: "", role: "", experienceYears: 0 },
        ],
      },
    }));
  };

  const removeTeamMember = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      team: {
        ...prev.team,
        members: prev.team.members.filter((_, i) => i !== index),
      },
    }));
  };

  const addClient = () => {
    setProfile((prev) => ({
      ...prev,
      clients: [...prev.clients, { name: "", logoUrl: "", testimonial: "" }],
    }));
  };

  const removeClient = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      clients: prev.clients.filter((_, i) => i !== index),
    }));
  };

  return (
    <PageLayout>
      <div className="bg-gray-50">
        <div className="mx-auto max-w-4xl px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Perfil de Empresa</h1>
          <p className="text-gray-600">Gestiona la información de tu empresa y equipo</p>
        </div>

        <div className="space-y-6">
          {/* Información General */}
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Información General</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Nombre de la empresa</label>
                <TextField.Root
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Nombre de la empresa"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Logo</label>
                <div className="flex items-center gap-4">
                  {profile.logoUrl ? (
                    <img src={profile.logoUrl} alt="Logo" className="w-16 h-16 rounded-lg object-contain" />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-gray-200 border border-gray-200 flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-gray-500" />
                    </div>
                  )}
                  <Button variant="soft" size="2">
                    <Upload className="w-4 h-4 mr-2" />
                    Subir logo
                  </Button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Descripción corta (Elevator Pitch)
                </label>
                <TextArea
                  value={profile.elevatorPitch}
                  onChange={(e) => setProfile({ ...profile, elevatorPitch: e.target.value })}
                  placeholder="Una descripción breve y convincente de tu empresa..."
                  rows={3}
                  className="w-full"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Sitio web</label>
                  <TextField.Root
                    value={profile.website}
                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                    placeholder="https://..."
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">LinkedIn</label>
                  <TextField.Root
                    value={profile.social.linkedin || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        social: { ...profile.social, linkedin: e.target.value },
                      })
                    }
                    placeholder="https://linkedin.com/company/..."
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Propuesta de Valor */}
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Propuesta de Valor</h2>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                ¿Qué te hace único?
              </label>
              <TextArea
                value={profile.valueProp}
                onChange={(e) => setProfile({ ...profile, valueProp: e.target.value })}
                placeholder="Describe qué hace única a tu empresa y por qué los clientes deberían elegirte..."
                rows={4}
                className="w-full"
              />
            </div>
          </div>

          {/* Competencias Clave */}
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Competencias Clave</h2>
            <div className="flex flex-wrap gap-2 overflow-hidden">
              {AVAILABLE_COMPETENCES.map((comp) => (
                <button
                  key={comp}
                  onClick={() => toggleCompetence(comp)}
                  className={`px-4 py-2 rounded-lg border transition-all truncate max-w-full ${
                    profile.competences.includes(comp)
                      ? "bg-violet-500/20 border-violet-500/50 text-violet-700"
                      : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200"
                  }`}
                  title={comp}
                >
                  {comp}
                </button>
              ))}
            </div>
          </div>

          {/* Experiencia del Equipo */}
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Equipo y Experiencia</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Años de experiencia combinada
                </label>
                <TextField.Root
                  type="number"
                  value={profile.team.aggregateExperienceYears}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      team: {
                        ...profile.team,
                        aggregateExperienceYears: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  placeholder="50+"
                  className="w-full"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-900">Miembros del equipo</label>
                  <Button size="2" variant="soft" onClick={addTeamMember}>
                    <Plus className="w-4 h-4 mr-2" />
                    Añadir miembro
                  </Button>
                </div>
                <div className="space-y-3">
                  {profile.team.members.map((member, idx) => (
                    <div key={idx} className="p-4 bg-gray-100 rounded-lg border border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <TextField.Root
                          value={member.name}
                          onChange={(e) => {
                            const newMembers = [...profile.team.members];
                            newMembers[idx].name = e.target.value;
                            setProfile({ ...profile, team: { ...profile.team, members: newMembers } });
                          }}
                          placeholder="Nombre"
                        />
                        <TextField.Root
                          value={member.role}
                          onChange={(e) => {
                            const newMembers = [...profile.team.members];
                            newMembers[idx].role = e.target.value;
                            setProfile({ ...profile, team: { ...profile.team, members: newMembers } });
                          }}
                          placeholder="Rol"
                        />
                        <div className="flex gap-2">
                          <TextField.Root
                            type="number"
                            value={member.experienceYears}
                            onChange={(e) => {
                              const newMembers = [...profile.team.members];
                              newMembers[idx].experienceYears = parseInt(e.target.value) || 0;
                              setProfile({ ...profile, team: { ...profile.team, members: newMembers } });
                            }}
                            placeholder="Años"
                            className="flex-1"
                          />
                          <Button
                            size="2"
                            variant="ghost"
                            color="red"
                            onClick={() => removeTeamMember(idx)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stack Tecnológico */}
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Stack Tecnológico</h2>
            <div className="space-y-4">
              {profile.stack.map((tech, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <TextField.Root
                    value={tech}
                    onChange={(e) => {
                      const newStack = [...profile.stack];
                      newStack[idx] = e.target.value;
                      setProfile({ ...profile, stack: newStack });
                    }}
                    placeholder="Tecnología"
                    className="flex-1"
                  />
                  <Button size="2" variant="ghost" color="red" onClick={() => {
                    setProfile({ ...profile, stack: profile.stack.filter((_, i) => i !== idx) });
                  }}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button size="2" variant="soft" onClick={() => {
                setProfile({ ...profile, stack: [...profile.stack, ""] });
              }}>
                <Plus className="w-4 h-4 mr-2" />
                Añadir tecnología
              </Button>
            </div>
          </div>

          {/* Clientes y Testimonios */}
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Clientes y Testimonios</h2>
              <Button size="2" variant="soft" onClick={addClient}>
                <Plus className="w-4 h-4 mr-2" />
                Añadir cliente
              </Button>
            </div>
            <div className="space-y-4">
              {profile.clients.map((client, idx) => (
                <div key={idx} className="p-4 bg-gray-100 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                    <TextField.Root
                      value={client.name}
                      onChange={(e) => {
                        const newClients = [...profile.clients];
                        newClients[idx].name = e.target.value;
                        setProfile({ ...profile, clients: newClients });
                      }}
                      placeholder="Nombre del cliente"
                    />
                    <TextField.Root
                      value={client.logoUrl}
                      onChange={(e) => {
                        const newClients = [...profile.clients];
                        newClients[idx].logoUrl = e.target.value;
                        setProfile({ ...profile, clients: newClients });
                      }}
                      placeholder="URL del logo"
                    />
                    <Button
                      size="2"
                      variant="ghost"
                      color="red"
                      onClick={() => removeClient(idx)}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Eliminar
                    </Button>
                  </div>
                  <TextArea
                    value={client.testimonial}
                    onChange={(e) => {
                      const newClients = [...profile.clients];
                      newClients[idx].testimonial = e.target.value;
                      setProfile({ ...profile, clients: newClients });
                    }}
                    placeholder="Testimonio del cliente..."
                    rows={2}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <Button size="3" variant="soft" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button size="3" onClick={handleSave} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Guardando..." : "Guardar cambios"}
            </Button>
          </div>
        </div>
        </div>
      </div>
    </PageLayout>
  );
}

