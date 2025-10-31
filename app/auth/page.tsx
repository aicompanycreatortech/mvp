"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Theme, Button } from "@radix-ui/themes";
import * as Select from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
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

  return (
    <div className="min-h-dvh grid place-items-center p-6">
      <div className="w-full max-w-md rounded-xl border border-gray-200 p-6 bg-gray-100">
        <h1 className="text-2xl font-semibold mb-4">Accede (Demo)</h1>
        <p className="text-sm text-gray-600 mb-4">Selecciona un rol para navegar por el MVP.</p>

        <div className="space-y-3">
          <label className="text-sm">Rol</label>
          <RoleSelect value={role} onValueChange={setRole} />
        </div>

        <div className="mt-6">
          <Button onClick={onEnter} size="3" highContrast>
            Entrar
          </Button>
        </div>
      </div>
    </div>
  );
}

function RoleSelect(props: { value: string; onValueChange: (v: any) => void }) {
  return (
    <Select.Root value={props.value} onValueChange={props.onValueChange}>
      <Select.Trigger className="inline-flex items-center justify-between rounded-md px-3 py-2 bg-gray-200 border border-gray-200 w-full">
        <Select.Value placeholder="Selecciona un rol" />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content className="rounded-md bg-[--color-background] border border-gray-200">
        <Select.Viewport className="p-1">
          {[
            { value: "client", label: "Cliente" },
            { value: "provider", label: "Proveedor" },
            { value: "admin", label: "Admin" },
          ].map((opt) => (
            <Select.Item
              key={opt.value}
              value={opt.value}
              className="px-2 py-2 rounded-md cursor-pointer hover:bg-gray-200 outline-none"
            >
              <Select.ItemText>{opt.label}</Select.ItemText>
              <Select.ItemIndicator>
                <CheckIcon className="ml-2" />
              </Select.ItemIndicator>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
}


