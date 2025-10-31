"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button, TextField, Slider } from "@radix-ui/themes";
import { Bot, Save } from "lucide-react";
import PageLayout from "@/components/shared/PageLayout";
import chatbotData from "@/data/mock/chatbotData.json";

export default function ChatbotConfigPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [config, setConfig] = useState({
    keywordWeight: chatbotData.scoring.keywordWeight,
    industryWeight: chatbotData.scoring.industryWeight,
    technologyWeight: chatbotData.scoring.technologyWeight,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.replace("/auth");
    }
  }, [user, router]);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    alert("Configuración guardada (mock)");
  };

  const total = config.keywordWeight + config.industryWeight + config.technologyWeight;

  return (
    <PageLayout>
      <div className="bg-gray-50 min-h-screen">
        <div className="mx-auto max-w-4xl px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Bot className="w-6 h-6 text-gray-900" />
            <h1 className="text-3xl font-bold text-gray-900">Configuración del Chatbot</h1>
          </div>
          <p className="text-gray-600">Ajusta los parámetros del algoritmo de matching</p>
        </div>

        <div className="bg-gray-100 border border-gray-200 rounded-xl p-8 space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-4">
              Peso de Keywords: {config.keywordWeight.toFixed(2)} ({((config.keywordWeight / total) * 100).toFixed(0)}%)
            </label>
            <Slider
              value={[config.keywordWeight]}
              onValueChange={(val) =>
                setConfig({ ...config, keywordWeight: val[0] })
              }
              min={0}
              max={1}
              step={0.05}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-4">
              Peso de Industria: {config.industryWeight.toFixed(2)} ({((config.industryWeight / total) * 100).toFixed(0)}%)
            </label>
            <Slider
              value={[config.industryWeight]}
              onValueChange={(val) =>
                setConfig({ ...config, industryWeight: val[0] })
              }
              min={0}
              max={1}
              step={0.05}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-4">
              Peso de Tecnología: {config.technologyWeight.toFixed(2)} ({((config.technologyWeight / total) * 100).toFixed(0)}%)
            </label>
            <Slider
              value={[config.technologyWeight]}
              onValueChange={(val) =>
                setConfig({ ...config, technologyWeight: val[0] })
              }
              min={0}
              max={1}
              step={0.05}
              className="w-full"
            />
          </div>

          <div className="pt-6 border-t border-gray-200">
            <div className="flex justify-end">
              <Button size="3" onClick={handleSave} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Guardando..." : "Guardar cambios"}
              </Button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </PageLayout>
  );
}

