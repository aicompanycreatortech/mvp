"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button, TextArea, Tabs } from "@radix-ui/themes";
import { Mail, Save } from "lucide-react";
import PageLayout from "@/components/shared/PageLayout";

export default function NotificationsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [templates, setTemplates] = useState({
    welcome: "",
    paymentConfirmation: "",
    useCaseApproved: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.replace("/auth");
      return;
    }

    // Mock templates
    setTemplates({
      welcome: "Bienvenido a MatchAI. Estamos emocionados de tenerte aquí.",
      paymentConfirmation: "Tu pago ha sido procesado exitosamente. Gracias por tu suscripción.",
      useCaseApproved: "Tu caso de uso ha sido aprobado y ya está visible para clientes.",
    });
  }, [user, router]);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    alert("Plantillas guardadas (mock)");
  };

  return (
    <PageLayout>
      <div className="bg-gray-50">
        <div className="mx-auto max-w-4xl px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="w-6 h-6 text-gray-900" />
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Notificaciones</h1>
          </div>
          <p className="text-gray-600">Edita las plantillas de correos electrónicos</p>
        </div>

        <Tabs.Root defaultValue="welcome">
          <Tabs.List className="mb-6">
            <Tabs.Trigger value="welcome">Bienvenida</Tabs.Trigger>
            <Tabs.Trigger value="payment">Confirmación de Pago</Tabs.Trigger>
            <Tabs.Trigger value="approval">Caso Aprobado</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="welcome">
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Plantilla de Bienvenida</h2>
              <TextArea
                value={templates.welcome}
                onChange={(e) => setTemplates({ ...templates, welcome: e.target.value })}
                rows={10}
                className="w-full mb-6"
              />
              <Button size="3" onClick={handleSave} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </Tabs.Content>

          <Tabs.Content value="payment">
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Confirmación de Pago</h2>
              <TextArea
                value={templates.paymentConfirmation}
                onChange={(e) =>
                  setTemplates({ ...templates, paymentConfirmation: e.target.value })
                }
                rows={10}
                className="w-full mb-6"
              />
              <Button size="3" onClick={handleSave} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </Tabs.Content>

          <Tabs.Content value="approval">
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Caso de Uso Aprobado</h2>
              <TextArea
                value={templates.useCaseApproved}
                onChange={(e) =>
                  setTemplates({ ...templates, useCaseApproved: e.target.value })
                }
                rows={10}
                className="w-full mb-6"
              />
              <Button size="3" onClick={handleSave} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </Tabs.Content>
        </Tabs.Root>
        </div>
      </div>
    </PageLayout>
  );
}

