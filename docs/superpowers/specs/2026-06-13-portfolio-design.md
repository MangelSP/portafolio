# Portfolio Personal — Design Spec
**Date:** 2026-06-13
**Owner:** Randy Gonzalez
**Reference:** tamalsen.dev

---

## Context

Randy necesita un portafolio web personal que destaque su perfil como Full-Stack Engineer & Architect. La inspiración visual es tamalsen.dev (single-page, minimalista, secciones claras), pero con una capa de interactividad única: un selector de experiencia que adapta el layout completo a 3 personalidades visuales distintas. El sitio debe ser bilingüe (EN/ES) y todo el contenido editable sin base de datos.

---

## Stack Técnico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 15 (App Router) + TypeScript |
| Estilos | Tailwind CSS v4 + CSS Variables por tema |
| Animaciones | Framer Motion |
| Estado global | Zustand |
| i18n | next-intl (EN/ES) |
| GitHub stats | github-readme-stats (imagen embebida) + GitHub API pública |
| CMS local | `data/portfolioConfig.ts` |

---

## Estructura de Carpetas

```
/portafolio
├── data/
│   └── portfolioConfig.ts
├── public/
│   ├── avatar.png
│   └── projects/
│       ├── xplora-placeholder.png
│       └── bot-placeholder.png
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── api/
│   │       └── github/route.ts       ← GitHub API proxy (evita rate limit)
│   ├── components/
│   │   ├── gate/
│   │   │   └── ExperienceGate.tsx
│   │   ├── nav/
│   │   │   └── Navigation.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Expertise.tsx
│   │   │   ├── Work.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── GitHubStats.tsx
│   │   │   └── Contact.tsx
│   │   └── ui/
│   │       ├── Card.tsx
│   │       ├── Tag.tsx
│   │       └── Button.tsx
│   ├── store/
│   │   └── themeStore.ts             ← Zustand: tema + locale
│   └── styles/
│       └── themes.css                ← CSS variables por tema
├── messages/
│   ├── en.json
│   └── es.json
└── docs/superpowers/specs/
    └── 2026-06-13-portfolio-design.md
```

---

## Flujo de Usuario

```
Primera visita
    └── ExperienceGate (fullscreen oscuro)
            ├── Elige: MODERNO → aplica tema + localStorage → portafolio
            ├── Elige: EMPRESARIAL → aplica tema + localStorage → portafolio
            └── Elige: DINÁMICO → aplica tema + localStorage → portafolio

Visita siguiente
    └── localStorage["preferred-theme"] existe → salta gate → portafolio directo
```

---

## Sección 1: ExperienceGate

**Archivo:** `src/components/gate/ExperienceGate.tsx`

- Fondo `#0a0a0a`, fullscreen, centrado verticalmente
- Nombre "Randy Gonzalez" en tipografía grande (blanco)
- Subtítulo "Full-Stack Engineer & Architect"
- Toggle EN/ES en esquina superior derecha
- 3 cards horizontales con hover scale (Framer Motion `whileHover`)
- Cada card contiene:
  - Nombre del tema (MODERNO / EMPRESARIAL / DINÁMICO)
  - Mini-preview SVG que insinúa el layout
  - Descripción corta de 1 línea
- Al click: `themeStore.setTheme(tema)` + `localStorage.setItem` + animación fade-out gate / fade-in portafolio

**Layout gate:**
```
┌─────────────────────────────────────── [EN | ES] ┐
│                                                   │
│              Randy Gonzalez                       │
│        Full-Stack Engineer & Architect            │
│                                                   │
│  ┌──────────┐   ┌───────────┐   ┌──────────┐     │
│  │ MODERNO  │   │EMPRESARIAL│   │ DINÁMICO │     │
│  │ [preview]│   │ [preview] │   │ [preview]│     │
│  │ Minimal  │   │ Clean &   │   │ Bold &   │     │
│  │ & Clean  │   │ Precise   │   │ Animated │     │
│  └──────────┘   └───────────┘   └──────────┘     │
│                                                   │
│           Choose your experience                  │
└───────────────────────────────────────────────────┘
```

---

## Sección 2: Los 3 Temas

### MODERNO (`data-theme="modern"`)
```css
--bg: #ffffff
--bg-secondary: #f5f5f5
--text: #0a0a0a
--accent: #000000
--font-heading: 'Plus Jakarta Sans'
--font-body: 'Plus Jakarta Sans'
```
- Hero: avatar izquierda, texto derecha, layout 2 columnas
- Work: Bento Grid (tarjetas de tamaños variados, algunas 2x1)
- Animaciones: fade + slide lentos (0.6s ease)

### EMPRESARIAL (`data-theme="corporate"`)
```css
--bg: #f8f9fa
--bg-secondary: #ffffff
--text: #1a1a2e
--accent: #2563eb
--font-heading: 'Inter'
--font-body: 'Inter'
```
- Hero: centrado, métricas debajo (años exp, proyectos, tecnologías) desde `config.metrics`
- Work: lista con filas — imagen pequeña izquierda, descripción + tags derecha
- Animaciones: solo fade (0.3s)

### DINÁMICO (`data-theme="dynamic"`)
```css
--bg: #0f0f1a
--bg-secondary: #1a1a2e
--text: #ffffff
--accent: linear-gradient(135deg, #7c3aed, #06b6d4)
--font-heading: 'Space Grotesk'
--font-body: 'Space Grotesk'
```
- Hero: typewriter effect en el título, avatar con glow púrpura
- Work: grid con hover 3D tilt (Framer Motion `useMotionValue`)
- Animaciones: parallax en scroll, secciones con stagger children

**Transición global de tema:** Al cambiar `data-theme`, Framer Motion anima opacity 0→1 del contenedor principal (300ms).

---

## Sección 3: Navigation

**Archivo:** `src/components/nav/Navigation.tsx`

- Sticky top, fondo semitransparente con backdrop-blur
- Links: Home · Expertise · Work · Experience · GitHub · Contact
- Toggle EN/ES (botón texto)
- En tema DINÁMICO: underline animado con gradiente en hover
- En tema EMPRESARIAL: bordes más definidos, sin efectos hover elaborados
- En tema MODERNO: minimalista, solo color change en hover

---

## Sección 4: Hero

**Archivo:** `src/components/sections/Hero.tsx`

- Lee `config.personalInfo` para nombre, título, bio, avatar
- Layout varía por tema (ver Sección 2)
- CTA buttons: "View Work" → scroll a #work | "Contact Me" → scroll a #contact
- Redes sociales: GitHub, LinkedIn, WhatsApp, Email (íconos desde `config.personalInfo.contact`)

---

## Sección 5: Expertise

**Archivo:** `src/components/sections/Expertise.tsx`

- 3 columnas (Backend & Architecture | Frontend | Mobile)
- Cada skill como `<Tag>` componente
- Lee `config.expertise[]`
- `whileInView` fade + translateY al entrar al viewport

---

## Sección 6: Work

**Archivo:** `src/components/sections/Work.tsx`

- Filtros: All | Web | Mobile | Architecture
- Lee `config.projects[]`
- Placeholders: gradientes generados con CSS por categoría (no imágenes externas)
- En MODERNO: Bento Grid
- En EMPRESARIAL: lista horizontal
- En DINÁMICO: grid con 3D tilt on hover

---

## Sección 7: Experience

**Archivo:** `src/components/sections/Experience.tsx`

- Línea de tiempo vertical
- Lee `config.experience[]`
- Cada entrada: rol, empresa, período, descripción, tech tags
- `whileInView` stagger entre entradas

---

## Sección 8: GitHub Stats

**Archivo:** `src/components/sections/GitHubStats.tsx`

**Subsección A — Stats Card (imagen embebida):**
```html
<img src="https://github-readme-stats.vercel.app/api?username=TU_USERNAME&show_icons=true&theme=..." />
<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=TU_USERNAME&layout=compact" />
```
- El `theme` de la imagen se ajusta según `data-theme` (light para modern/corporate, dark para dynamic)

**Subsección B — Contribution Graph:**
```html
<img src="https://github-readme-activity-graph.vercel.app/graph?username=TU_USERNAME&theme=..." />
```

**Subsección C — Stats en tiempo real (API proxy):**
- `src/app/api/github/route.ts` llama a `api.github.com/users/{username}` con `next: { revalidate: 3600 }`
- Muestra: public repos, followers, following como métricas visuales
- Evita rate limit exponiendo el token solo en el servidor

**El username de GitHub se define en `config.personalInfo.contact.github`**

---

## Sección 9: Contact

**Archivo:** `src/components/sections/Contact.tsx`

- Headline + descripción corta
- Grid de links: Email, LinkedIn, GitHub, WhatsApp
- Cada link como card con ícono (Lucide React)
- Sin formulario — links directos

---

## `portfolioConfig.ts` — Estructura Completa

```typescript
export const config = {
  personalInfo: {
    name: "Randy Gonzalez",
    title: { en: "Full-Stack Software Engineer & Architect", es: "Ingeniero de Software Full-Stack & Arquitecto" },
    bio: { en: "...", es: "..." },
    location: "República Dominicana",
    avatar: "/avatar.png",
    contact: {
      email: "tu@email.com",
      linkedin: "https://linkedin.com/in/...",
      github: "TU_GITHUB_USERNAME",   // solo username, no URL completa
      whatsapp: "+1809...",
    }
  },

  expertise: [
    { category: { en: "Backend & Architecture", es: "Backend & Arquitectura" },
      icon: "server",
      skills: [".NET Core 9", "NestJS", "SQL Server", "Clean Architecture"] },
    { category: { en: "Frontend", es: "Frontend" },
      icon: "monitor",
      skills: ["Next.js", "React", "Tailwind CSS", "TypeScript"] },
    { category: { en: "Mobile", es: "Mobile" },
      icon: "smartphone",
      skills: ["Flutter", "Dart"] }
  ],

  projects: [
    { id: "xplora",
      title: "Xplora Travel",
      description: { en: "Scalable travel & excursions platform.", es: "Plataforma escalable de viajes y excursiones." },
      image: "/projects/xplora-placeholder.png",
      tags: ["Next.js", "NestJS", "SQL Server"],
      category: "web",
      url: "#" },
    { id: "saas-bot",
      title: "SaaS WhatsApp Bot",
      description: { en: "Automation system using NestJS & WPPConnect with worker-brain architecture.", es: "Sistema de automatización con NestJS & WPPConnect, arquitectura worker-brain." },
      image: "/projects/bot-placeholder.png",
      tags: ["NestJS", "WPPConnect", "Architecture"],
      category: "architecture",
      url: "#" }
  ],

  experience: [
    { role: { en: "Full-Stack Engineer", es: "Ingeniero Full-Stack" },
      company: "Tu Empresa",
      period: "2023 – Present",
      location: "República Dominicana",
      description: { en: "...", es: "..." },
      tech: [".NET", "React", "SQL Server"] }
  ],

  testimonials: [
    { quote: { en: "...", es: "..." },
      author: "Nombre Cliente",
      title: { en: "CEO at Company", es: "CEO en Empresa" } }
  ],

  certifications: [
    { name: "...", issuer: "...", year: 2024, url: "#" }
  ],

  metrics: {
    years: 4,
    projects: 10,
    technologies: 8
  }
}
```

---

## Estado Global — `themeStore.ts`

```typescript
interface ThemeStore {
  theme: 'modern' | 'corporate' | 'dynamic' | null
  locale: 'en' | 'es'
  hasChosenTheme: boolean
  setTheme: (theme: Theme) => void
  setLocale: (locale: Locale) => void
}
```

- Inicializa leyendo `localStorage["preferred-theme"]` y `localStorage["preferred-locale"]`
- `setTheme` escribe en localStorage y aplica `document.documentElement.setAttribute('data-theme', tema)`

---

## i18n — next-intl

- `messages/en.json` y `messages/es.json` contienen strings de UI (labels, CTAs, sección titles)
- El contenido dinámico (proyectos, bio, experiencia) viene del `portfolioConfig.ts` con estructura `{ en: string, es: string }`
- El hook `useLocale()` del store determina qué clave leer

---

## Verificación / Testing

1. `npm run dev` → abrir `localhost:3000`
2. Gate aparece en primera visita — verificar los 3 cards con hover
3. Elegir cada tema y confirmar que:
   - El layout Hero cambia (2col / centrado / typewriter)
   - Los colores y fonts cambian correctamente
   - El Work section muestra Bento / lista / 3D grid según tema
4. Cerrar y reabrir → gate NO debe aparecer (localStorage)
5. Toggle EN/ES → todos los textos deben cambiar
6. Sección GitHub Stats → stats card e heatmap cargan
7. `npm run build` → sin errores de TypeScript
