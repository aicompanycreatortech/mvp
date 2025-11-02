# AI COMPANY CREATOR

Plataforma para conectar empresas grandes con proveedores de soluciones de IA. Los proveedores publican sus casos de uso y servicios, mientras que los clientes los buscan mediante un chatbot inteligente.

## 🚀 Características

### Para Clientes
- **Chatbot de Búsqueda**: Interfaz conversacional para encontrar proveedores por necesidad
- **Resultados Inteligentes**: Matching por keywords con scoring y filtros avanzados
- **Perfiles Completos**: Visualización detallada de proveedores con pestañas (Casos de Éxito, Equipo, Stack Tecnológico, Validación)
- **Gestión de Búsquedas**: Historial, favoritos y seguimiento de contactos

### Para Proveedores
- **Dashboard Completo**: Métricas de visualizaciones, búsquedas y leads
- **Gestión de Perfil**: Información completa de la empresa, equipo, stack tecnológico y clientes
- **Casos de Uso**: Publicación y gestión de casos de éxito con KPIs
- **Inbox CRM**: Bandeja de mensajes con estados (Nuevo, Contactado, En Negociación, Cerrado)

### Para Administradores
- **KPIs de Plataforma**: Métricas de clientes, proveedores, MRR y churn rate
- **Gestión de Usuarios**: CRUD completo para clientes, proveedores y admins
- **Gestión Financiera**: Planes de suscripción y transacciones
- **Configuración**: Ajustes del chatbot y plantillas de correos

## 🛠️ Tecnologías

- **Next.js 16**: App Router y React 19
- **Radix UI**: Componentes accesibles y profesionales
- **Tailwind CSS 4**: Diseño moderno y responsive
- **TypeScript**: Type safety completo
- **Lucide React**: Iconografía consistente

## 📦 Instalación

```bash
npm install
```

## 🏃 Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🎨 Diseño

Interfaz moderna inspirada en Google con:
- **Modo claro** limpio y profesional
- **Sidebar** de navegación con estados activos
- **Cards elevadas** con sombras sutiles
- **Gradientes** en elementos clave
- **Animaciones** suaves en hover
- **Tipografía** clara con jerarquía visual

## 📁 Estructura del Proyecto

```
app/
├── admin/          # Módulo de administración
│   ├── chatbot/    # Configuración del chatbot
│   ├── notifications/ # Plantillas de correos
│   ├── subscriptions/ # Planes de suscripción
│   ├── transactions/  # Transacciones
│   └── users/         # Gestión de usuarios
├── client/            # Módulo de cliente
│   ├── contacts/      # Estado de contactos
│   ├── favorites/     # Proveedores favoritos
│   ├── history/       # Historial de búsquedas
│   ├── provider/      # Perfil del proveedor
│   ├── search/        # Resultados de búsqueda
│   └── use-case/      # Detalle de caso de uso
├── provider/          # Módulo de proveedor
│   ├── inbox/         # Bandeja de mensajes
│   ├── profile/       # Gestión de perfil
│   └── use-cases/     # Casos de uso
└── auth/              # Autenticación

components/
├── client/            # Componentes del cliente
├── shared/            # Componentes compartidos
│   ├── Chatbot.tsx
│   ├── EmptyState.tsx
│   ├── LoadingSkeleton.tsx
│   ├── MetricCard.tsx
│   ├── PageLayout.tsx
│   ├── ProviderCard.tsx
│   ├── Sidebar.tsx
│   ├── TopNav.tsx
│   └── UseCaseCard.tsx

data/mock/             # Datos mock para desarrollo
lib/
└── auth.tsx           # Autenticación y contexto de usuario
```

## 🎯 Próximos Pasos

- [ ] Integración con backend real
- [ ] Sistema de autenticación completo
- [ ] Pagos reales con Stripe
- [ ] Chatbot con IA real (OpenAI/Anthropic)
- [ ] Emails transaccionales
- [ ] Analytics avanzado
- [ ] Mobile responsive mejorado
- [ ] Tests automatizados

## 📄 Licencia

MIT TIM