"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button, Select } from "@radix-ui/themes";
import { Sparkles, Building2, UserCog } from "lucide-react";
import { useState } from "react";

export default function AuthPage() {
  const router = useRouter();
  const { loginAs } = useAuth();
  const [role, setRole] = useState<"client" | "provider" | "admin">("client");

  const onEnter = () => {
    loginAs(role);
    if (role === "client") router.push("/client");
    if (role === "provider") router.push("/provider");
    if (role === "admin") router.push("/admin");
  };

  const roleOptions = [
    {
      value: "client",
      label: "Cliente",
      icon: Building2,
      description: "Busca soluciones de IA para tu empresa",
    },
    {
      value: "provider",
      label: "Proveedor",
      icon: Sparkles,
      description: "Ofrece tus servicios y casos de uso",
    },
    {
      value: "admin",
      label: "Administrador",
      icon: UserCog,
      description: "Gestiona la plataforma",
    },
  ];

  const selectedOption = roleOptions.find((opt) => opt.value === role);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI COMPANY CREATOR
          </h1>
          <p className="text-gray-600">
            Plataforma de conexión entre empresas y proveedores de IA
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Acceder (Demo)
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Selecciona un rol para navegar por la plataforma
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rol de acceso
              </label>
              <Select.Root
                value={role}
                onValueChange={(v) => setRole(v as any)}
              >
                <Select.Trigger className="w-full h-12 bg-gray-50 border border-gray-200 hover:border-violet-300 focus:border-violet-500 transition-colors">
                  <div className="flex items-center gap-3">
                    {selectedOption && (
                      <>
                        <selectedOption.icon className="w-5 h-5 text-violet-600" />
                        <span className="font-medium">
                          {selectedOption.label}
                        </span>
                      </>
                    )}
                  </div>
                </Select.Trigger>
                <Select.Content className="bg-white border border-gray-200 shadow-lg rounded-lg">
                  {roleOptions.map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <Select.Item
                        key={opt.value}
                        value={opt.value}
                        className="px-4 py-3 rounded-lg hover:bg-violet-50 focus:bg-violet-50 cursor-pointer outline-none data-[highlighted]:bg-violet-50"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-violet-600" />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">
                              {opt.label}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {opt.description}
                            </div>
                          </div>
                        </div>
                      </Select.Item>
                    );
                  })}
                </Select.Content>
              </Select.Root>
            </div>

            <div className="pt-4">
              <Button
                onClick={onEnter}
                size="3"
                className="w-full h-12 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Entrar a la plataforma
              </Button>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Esta es una versión demo. Los datos son simulados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
