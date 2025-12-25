# 🚿 Vivenza - Redesign

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**Reinterpretación moderna y optimizada** de la presencia digital de Vivenza, especializada en exposición de baño y cerámica.

[🌐 Ver Demo en Vivo](https://vivenza-redesign.vercel.app/)

![Vivenza Preview](https://vivenzaexpo.es/wp-content/uploads/2025/03/Imagen-Principal-VIVENZA.jpg)

</div>

---

## 📋 Descripción

Este proyecto es un **rediseño no oficial** y educativo del sitio web de [Vivenza](https://vivenzaexpo.es/). El objetivo principal ha sido mejorar drásticamente la **experiencia de usuario (UX)** y el **rendimiento web**, implementando una arquitectura moderna basada en Next.js App Router.

Se ha logrado una navegación fluida, tiempos de carga instantáneos y una internacionalización completa, reduciendo el peso del bundle en un **58%** respecto a la versión original.

## ✨ Características

- 🎨 **UI/UX Moderna**: Diseño limpio y sofisticado utilizando componentes de **shadcn/ui**.
- 🌍 **Internacionalización**: Soporte nativo para Español (🇪🇸), Inglés (🇬🇧) y Francés (🇫🇷) con routing automático.
- 📱 **100% Responsive**: Adaptación perfecta desde móviles hasta pantallas de gran formato.
- ⚡ **Alto Rendimiento**: Optimización de imágenes y code-splitting (Bundle JS inicial de ~100kB).
- 📍 **Mapa Interactivo**: Localización dinámica de showrooms en España.
- 📧 **Contacto**: Formularios validados con Zod y React Hook Form.

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **Estilos**: Tailwind CSS + Framer Motion
- **Componentes**: Radix UI (vía shadcn)
- **Lenguaje**: TypeScript (Strict Mode)
- **i18n**: `next-intl`
- **Gestor de Paquetes**: pnpm

## 🚀 Instalación y Ejecución

```bash
# 1. Clonar el repositorio
git clone https://github.com/alvarolostal/vivenza-redesign.git
cd vivenza-redesign

# 2. Instalar dependencias (Recomendado usar pnpm por el lockfile)
pnpm install

# 3. Iniciar servidor de desarrollo
pnpm run dev
```

El sitio estará disponible en [http://localhost:3000](http://localhost:3000).

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── [locale]/           # Rutas internacionalizadas (es/en/fr)
│   │   ├── page.tsx        # Landing Page
│   │   ├── contact/        # Página de contacto
│   │   └── locations/      # Buscador de showrooms
│   └── globals.css         # Estilos y variables CSS
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── ui/                 # Componentes reutilizables (shadcn)
│   └── location/           # Mapas y acordeones
├── lib/                    # Utilidades, tipos y datos estáticos
└── messages/               # Archivos de traducción (JSON)
```

## 🚀 Deployment

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/alvarolostal/vivenza-redesign)

Vercel es la plataforma nativa para Next.js. Detecta automáticamente la configuración sin necesidad de archivos adicionales.

**Build Settings (auto-detectados):**

- **Framework Preset**: Next.js
- **Build Command**: `pnpm run build`
- **Output Directory**: `.next`
- **Node.js Version**: 20.x

### Scripts

```bash
pnpm run dev        # Desarrollo
pnpm run build      # Build de producción
pnpm run start      # Iniciar producción
pnpm run lint       # ESLint
pnpm run typecheck  # Verificar TypeScript
```

---

<div align="center">

**Álvaro Lostal**
_Ingeniero Informático | Desarrollador Web_

[![Portafolio](https://img.shields.io/badge/Portafolio-lostal.dev-d5bd37?style=for-the-badge&logo=astro&logoColor=white)](https://lostal.dev)
[![GitHub](https://img.shields.io/badge/GitHub-lostal-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/lostal)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Álvaro%20Lostal-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/alvarolostal)

</div>

---

<div align="center">

**Nota**: Este es un proyecto de portfolio personal. No está afiliado oficialmente con GrupoSiete o Vivenza.

</div>
