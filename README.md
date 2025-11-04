# VIVENZA - Redesign

![Vivenza Preview](https://vivenzaexpo.es/wp-content/uploads/2025/03/Imagen-Principal-VIVENZA.jpg)

Una reinterpretación moderna de la página web de **Vivenza**, la marca comercial de GRUPOSIETE especializada en exposición de baño y cerámica.

## 🌐 Demo en Vivo

🔗 **[Ver Proyecto](https://vivenza-redesign.vercel.app/)** *(Vercel recomendado)*

📍 **[Sitio Web Original](https://vivenzaexpo.es/)**

## 📋 Descripción

Rediseño completo con enfoque en experiencia de usuario, rendimiento y mejores prácticas. El proyecto incluye internacionalización completa (español, inglés, francés) y diseño responsive optimizado.

### Sobre Vivenza

Vivenza es la marca comercial de GRUPOSIETE, empresa que comercializa materiales de:
- Calefacción, Fontanería y Climatización
- Sanitario y Obra Civil
- Materiales de Construcción
- Energías Renovables

Con **12 exposiciones** en España, Vivenza ofrece soluciones integrales de diseño para baño y hogar.

## 🚀 Tech Stack

- **Framework**: Next.js 15.2.3 con App Router
- **Styling**: Tailwind CSS 3.4.1 + shadcn/ui
- **Internacionalización**: next-intl 3.11.1
- **Forms**: React Hook Form + Zod
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **TypeScript**: Strict mode enabled

## ✨ Features

- ✅ Diseño responsive completo (mobile, tablet, desktop)
- ✅ Internacionalización (es/en/fr) con routing automático
- ✅ Navegación smooth scroll sin hash en URL
- ✅ Formulario de contacto con validación
- ✅ Acordeón interactivo de showrooms
- ✅ Carrusel de imágenes con autoplay
- ✅ Bundle optimizado (101 kB First Load JS)
- ✅ 215 paquetes (reducción del 58% vs versión inicial)

## 🛠️ Instalación

### Prerrequisitos

- Node.js 20.x o superior
- npm o yarn

### Desarrollo Local

1. Clonar repositorio:
```bash
git clone https://github.com/alvarolostal/vivenza-redesign.git
cd vivenza-redesign
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar servidor de desarrollo:
```bash
npm run dev
```

4. Abrir [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── [locale]/              # Rutas internacionalizadas
│   │   ├── page.tsx           # Homepage
│   │   ├── contact/page.tsx   # Página de contacto
│   │   └── locations/page.tsx # Showrooms
│   ├── globals.css            # Estilos globales
│   └── layout.tsx             # Layout raíz
├── components/
│   ├── layout/                # Navbar, Footer
│   ├── contact/               # Formulario de contacto
│   ├── location/              # Componentes de ubicaciones
│   └── ui/                    # Componentes UI reutilizables
├── lib/                       # Utilidades y datos
├── messages/                  # Traducciones (es/en/fr)
└── i18n.ts                    # Configuración i18n
```

## 🌍 Internacionalización

Soporte para tres idiomas:
- 🇪🇸 Español (por defecto)
- 🇬🇧 Inglés
- 🇫🇷 Francés

Las rutas se prefijan automáticamente con el locale (`/es`, `/en`, `/fr`).

## 🚀 Deployment

### Recomendado: Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/alvarolostal/vivenza-redesign)

El proyecto usa middleware de i18n que requiere un entorno de Node.js (no compatible con static export).

### Scripts

```bash
npm run dev        # Desarrollo
npm run build      # Build de producción
npm start          # Iniciar producción
npm run lint       # ESLint
npm run typecheck  # Verificar TypeScript
```

## 🎯 Mejoras Implementadas

- ✅ Modernización completa de UI/UX
- ✅ Performance optimizado (bundle 58% más ligero)
- ✅ Smooth scroll con JavaScript (sin hash en URL)
- ✅ Internacionalización completa en 3 idiomas
- ✅ TypeScript strict mode
- ✅ Componentes reutilizables con shadcn/ui
- ✅ Formularios con validación robusta
- ✅ Responsive design mobile-first
- ✅ Limpieza de código y dependencias innecesarias

## 🎨 Sistema de Diseño

- **Color Primario**: `#106984` (Teal)
- **Tema**: Dark mode por defecto
- **Tipografía**: System font stack
- **Breakpoints**: 
  - `sm`: 640px
  - `md`: 768px  
  - `lg`: 1024px

## � Licencia

Proyecto educativo. Rediseño no oficial de [Vivenza](https://vivenzaexpo.es/).

## 🔗 Links

- [GrupoSiete](https://gruposiete.es/)
- [Instagram Vivenza](https://www.instagram.com/gruposiete_vivenza/)

---

**Nota**: Proyecto de portfolio personal. No afiliado oficialmente con Vivenza o GrupoSiete.
