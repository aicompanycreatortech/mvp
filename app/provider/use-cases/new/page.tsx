"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button, TextField, TextArea } from "@radix-ui/themes";
import { Save, Plus, X } from "lucide-react";
import PageLayout from "@/components/shared/PageLayout";

const INDUSTRIES = ["Fintech", "Retail", "Manufactura", "Healthcare", "Logística", "Otro"];
const TECH_OPTIONS = [
  "Python",
  "TensorFlow",
  "PyTorch",
  "AWS SageMaker",
  "Google Cloud ML",
  "Azure ML",
  "XGBoost",
  "Kafka",
  "Spark",
  "Docker",
  "Kubernetes",
];

export default function NewUseCasePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    problem: "",
    solution: "",
    industry: [] as string[],
    technologies: [] as string[],
    results: {
      roi: "",
      costReductionPct: "",
      leadTimeReductionPct: "",
      precision: "",
      fraudLossReductionPct: "",
    },
    kpis: [] as string[],
  });

  useEffect(() => {
    if (!user || user.role !== "provider") {
      router.replace("/auth");
    }
  }, [user, router]);

  const toggleIndustry = (ind: string) => {
    setFormData((prev) => ({
      ...prev,
      industry: prev.industry.includes(ind)
        ? prev.industry.filter((i) => i !== ind)
        : [...prev.industry, ind],
    }));
  };

  const toggleTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter((t) => t !== tech)
        : [...prev.technologies, tech],
    }));
  };

  const addKPI = () => {
    const kpi = prompt("Ingresa el nombre del KPI:");
    if (kpi) {
      setFormData((prev) => ({
        ...prev,
        kpis: [...prev.kpis, kpi],
      }));
    }
  };

  const removeKPI = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      kpis: prev.kpis.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    if (!formData.title || !formData.problem || !formData.solution) {
      alert("Por favor completa todos los campos requeridos");
      return;
    }

    setSaving(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    router.push("/provider/use-cases");
  };

  return (
    <PageLayout>
      <div className="bg-gray-50">
        <div className="mx-auto max-w-4xl px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nuevo Caso de Uso</h1>
          <p className="text-gray-600">Publica un caso de éxito para mostrar a clientes potenciales</p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Información Básica</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Título (Orientado al resultado) *
                </label>
                <TextField.Root
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ej: Optimización de cadena de suministro con IA predictiva (-15% costes)"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Problema del Cliente *
                </label>
                <TextArea
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  placeholder="Describe el desafío que enfrentaba la empresa..."
                  rows={4}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Solución Implementada *
                </label>
                <TextArea
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  placeholder="Detalla la tecnología y metodología de IA utilizada..."
                  rows={4}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-100 border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Clasificación</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Industria/Sector</label>
                <div className="flex flex-wrap gap-2">
                  {INDUSTRIES.map((ind) => (
                    <button
                      key={ind}
                      onClick={() => toggleIndustry(ind)}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        formData.industry.includes(ind)
                          ? "bg-blue-500/20 border-blue-500/50 text-blue-700"
                          : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Tecnologías Utilizadas
                </label>
                <div className="flex flex-wrap gap-2">
                  {TECH_OPTIONS.map((tech) => (
                    <button
                      key={tech}
                      onClick={() => toggleTechnology(tech)}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        formData.technologies.includes(tech)
                          ? "bg-purple-500/20 border-purple-500/50 text-purple-700"
                          : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Resultados y KPIs</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">ROI</label>
                  <TextField.Root
                    type="number"
                    step="0.1"
                    value={formData.results.roi}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        results: { ...formData.results, roi: e.target.value },
                      })
                    }
                    placeholder="2.4"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Reducción de costes (%)
                  </label>
                  <TextField.Root
                    type="number"
                    value={formData.results.costReductionPct}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        results: { ...formData.results, costReductionPct: e.target.value },
                      })
                    }
                    placeholder="15"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Reducción de lead time (%)
                  </label>
                  <TextField.Root
                    type="number"
                    value={formData.results.leadTimeReductionPct}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        results: { ...formData.results, leadTimeReductionPct: e.target.value },
                      })
                    }
                    placeholder="22"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Precisión</label>
                  <TextField.Root
                    type="number"
                    step="0.01"
                    value={formData.results.precision}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        results: { ...formData.results, precision: e.target.value },
                      })
                    }
                    placeholder="0.91"
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-900">KPIs</label>
                  <Button size="2" variant="soft" onClick={addKPI}>
                    <Plus className="w-4 h-4 mr-2" />
                    Añadir KPI
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.kpis.map((kpi, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1.5 bg-gray-200 rounded-lg border border-gray-200 flex items-center gap-2"
                    >
                      <span className="text-sm text-gray-900">{kpi}</span>
                      <button
                        onClick={() => removeKPI(idx)}
                        className="text-gray-500 hover:text-gray-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button size="3" variant="soft" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button size="3" onClick={handleSave} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Guardando..." : "Publicar caso de uso"}
            </Button>
          </div>
        </div>
        </div>
      </div>
    </PageLayout>
  );
}

