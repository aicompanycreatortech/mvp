"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button, Tabs, Switch, Dialog, TextField, Select } from "@radix-ui/themes";
import { Users, Edit, CheckCircle2, XCircle, Building2 } from "lucide-react";
import PageLayout from "@/components/shared/PageLayout";

type UserRole = "client" | "provider" | "admin";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
  company?: string;
  providerId?: string;
}

export default function UsersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<UserRole | "all">("all");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.replace("/auth");
      return;
    }

    // Mock data
    setUsers([
      { id: "u1", name: "Admin", email: "admin@example.com", role: "admin", active: true },
      { id: "u_client_1", name: "HP", email: "client@example.com", role: "client", active: true, company: "HP" },
      { id: "u_provider_1", name: "AI Solutions Inc.", email: "provider@example.com", role: "provider", active: true, providerId: "p_aisol" },
    ]);
  }, [user, router]);

  const filteredUsers = users.filter(
    (u) => activeTab === "all" || u.role === activeTab
  );

  const toggleActive = (userId: string) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, active: !u.active } : u)));
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowEditDialog(true);
  };

  return (
    <PageLayout>
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Usuarios</h1>
          <p className="text-gray-600">Administra clientes, proveedores y administradores</p>
        </div>

        <Tabs.Root value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <Tabs.List className="mb-6">
            <Tabs.Trigger value="all">Todos</Tabs.Trigger>
            <Tabs.Trigger value="client">Clientes</Tabs.Trigger>
            <Tabs.Trigger value="provider">Proveedores</Tabs.Trigger>
            <Tabs.Trigger value="admin">Admins</Tabs.Trigger>
          </Tabs.List>

          <div className="bg-gray-100 border border-gray-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Usuario</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rol</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Estado</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr
                      key={u.id}
                      className="border-t border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                            <Users className="w-5 h-5 text-gray-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-gray-900 font-medium truncate">{u.name}</p>
                            {u.company && <p className="text-xs text-gray-500 truncate">{u.company}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <span className="truncate block max-w-[200px]">{u.email}</span>
                      </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-lg text-xs font-medium bg-violet-500/20 text-violet-700 border border-violet-500/50">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={u.active}
                          onCheckedChange={() => toggleActive(u.id)}
                        />
                        {u.active ? (
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Button size="2" variant="soft" onClick={() => handleEdit(u)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </Tabs.Root>

        <Dialog.Root open={showEditDialog} onOpenChange={setShowEditDialog}>
          <Dialog.Content>
            <Dialog.Title>Editar Usuario</Dialog.Title>
            {selectedUser && (
              <div className="space-y-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Nombre</label>
                  <TextField.Root value={selectedUser.name} className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
                  <TextField.Root value={selectedUser.email} className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Rol</label>
                  <Select.Root value={selectedUser.role}>
                    <Select.Trigger className="w-full" />
                    <Select.Content>
                      <Select.Item value="client">Cliente</Select.Item>
                      <Select.Item value="provider">Proveedor</Select.Item>
                      <Select.Item value="admin">Admin</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="soft" onClick={() => setShowEditDialog(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setShowEditDialog(false)}>Guardar</Button>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Root>
        </div>
      </div>
    </PageLayout>
  );
}

