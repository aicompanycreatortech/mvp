"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button, TextField, TextArea } from "@radix-ui/themes";
import { Save, Plus, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
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
];

export default function EditUseCasePage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
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
    },
    kpis: [] as string[],
  });

  useEffect(() => {
    if (!user || user.role !== "provider") {
      router.replace("/auth");
      return;
    }

    // Mock - load use case data
    setFormData({
      title: "Optimización de cadena de suministro con IA predictiva (-15% costes)",
      problem: "Ineficiencias en inventario y tiempos de entrega largos.",
      solution: "Modelos de demanda con LSTM + optimización con Programación Lineal en AWS SageMaker.",
      industry: ["Manufactura", "Retail"],
      technologies: ["Python", "TensorFlow", "AWS SageMaker"],
      results: {
        roi: "2.4",
        costReductionPct: "15",
      },
      kpis: ["ROI", "Reducción de costes", "Lead time"],
    });
  }, [user, router, params]);

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

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    router.push("/provider/use-cases");
  };

  return (
    <PageLayout>
      <div className="bg-gray-50">
        <div className="mx-auto max-w-4xl px-8 py-8">
        <div className="mb-8">
          <Link href="/provider/use-cases">
            <Button size="2" variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Editar Caso de Uso</h1>
          <p className="text-gray-600">Actualiza la información de tu caso de uso</p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Título *</label>
                <TextField.Root
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Problema *</label>
                <TextArea value={formData.problem} onChange={(e) => setFormData({ ...formData, problem: e.target.value })} rows={4} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Solución *</label>
                <TextArea value={formData.solution} onChange={(e) => setFormData({ ...formData, solution: e.target.value })} rows={4} />
              </div>
            </div>
          </div>

          <div className="bg-gray-100 border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Clasificación</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Industria</label>
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
                <label className="block text-sm font-medium text-gray-900 mb-3">Tecnologías</label>
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
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Resultados</h2>
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
                  className="w-full"
                />
              </div>
            </div>
          </div>

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

