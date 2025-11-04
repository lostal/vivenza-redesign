# VIVENZA - Redesign

![Vivenza Preview](https://vivenzaexpo.es/wp-content/uploads/2025/03/Imagen-Principal-VIVENZA.jpg)

Una reinterpretación moderna y creativa de la página web de **Vivenza**, la marca comercial de GRUPOSIETE especializada en exposición de baño y cerámica.

## 🌐 Demo en Vivo

🔗 **[Ver Proyecto en Vivo](https://vivenza.netlify.app/)**

📍 **[Sitio Web Original](https://vivenzaexpo.es/)**

## 📋 Descripción del Proyecto

Este proyecto es una reinterpretación libre y moderna del sitio web de Vivenza, una empresa española especializada en soluciones integrales para baño y hogar. El rediseño se centra en mejorar la experiencia de usuario manteniendo la esencia y el mensaje de la marca original.

### Sobre Vivenza

Vivenza es la marca comercial de GRUPOSIETE, empresa que comercializa y distribuye materiales de:
- Calefacción y Fontanería
- Climatización
- Sanitario y Obra Civil
- Materiales de Construcción
- Energías Renovables

Con **12 exposiciones** en España, Vivenza ofrece espacios de diseño completos que combinan funcionalidad moderna con diseño atemporal.

## 🚀 Tecnologías Utilizadas

- **[Next.js](https://nextjs.org/)** - Framework de React para aplicaciones web
- **React** - Biblioteca de JavaScript para interfaces de usuario
- **CSS3** - Estilos y animaciones
- **JavaScript (ES6+)** - Funcionalidad interactiva
- **Netlify** - Despliegue y hosting

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
- ✅ Performance optimizado (bundle 55% más ligero)
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
