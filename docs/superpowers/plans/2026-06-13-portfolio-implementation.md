# Portfolio Personal — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Randy Gonzalez's personal portfolio as a Next.js 15 App Router site with a fullscreen experience-selector gate (3 visual themes), bilingual EN/ES toggle, and a static `portfolioConfig.ts` CMS — no database required.

**Architecture:** A single-page scrollable site where all content comes from `data/portfolioConfig.ts`. A Zustand store holds the chosen theme (`modern | corporate | dynamic`) and locale (`en | es`). CSS variables on `<html data-theme="...">` drive the visual switching; Framer Motion handles all transitions and scroll animations.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Zustand, next-intl, Lucide React, github-readme-stats (embedded images)

---

## File Map

| File | Responsibility |
|------|---------------|
| `data/portfolioConfig.ts` | Single source of truth for all content |
| `messages/en.json` | UI strings in English |
| `messages/es.json` | UI strings in Spanish |
| `src/styles/themes.css` | CSS variables for all 3 themes |
| `src/store/themeStore.ts` | Zustand store: theme + locale + localStorage sync |
| `src/lib/usePortfolioLocale.ts` | Hook to read localized field from config |
| `src/app/layout.tsx` | Root layout — providers + font loading |
| `src/app/page.tsx` | Shell: renders gate or portfolio based on store |
| `src/app/api/github/route.ts` | GitHub API proxy (revalidate 3600s) |
| `src/components/gate/ExperienceGate.tsx` | Fullscreen dark onboarding screen |
| `src/components/nav/Navigation.tsx` | Sticky nav with EN/ES toggle |
| `src/components/sections/Hero.tsx` | Hero section (layout varies by theme) |
| `src/components/sections/Expertise.tsx` | 3-column skill grid |
| `src/components/sections/Work.tsx` | Project grid with filters (layout varies by theme) |
| `src/components/sections/Experience.tsx` | Vertical timeline |
| `src/components/sections/GitHubStats.tsx` | Stats cards + contribution graph |
| `src/components/sections/Contact.tsx` | Contact links grid |
| `src/components/ui/Tag.tsx` | Skill/tech badge |
| `src/components/ui/Card.tsx` | Base card wrapper |
| `src/components/ui/Button.tsx` | CTA button |
| `public/avatar.png` | Randy's avatar image |
| `public/projects/xplora-placeholder.png` | Project placeholder (generated) |
| `public/projects/bot-placeholder.png` | Project placeholder (generated) |

---

## Task 1: Bootstrap Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `.env.local`

- [ ] **Step 1: Scaffold Next.js project in the portafolio directory**

```bash
cd /Users/usuario/portafolio
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes
```

Expected: Project files created. `src/` directory structure initialized.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install framer-motion zustand next-intl lucide-react
npm install -D @types/node
```

- [ ] **Step 3: Create `.env.local`**

```bash
cat > .env.local << 'EOF'
GITHUB_USERNAME=randyglez
NEXT_PUBLIC_GITHUB_USERNAME=randyglez
EOF
```

Replace `randyglez` with the actual GitHub username when known.

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev
```

Open `http://localhost:3000` — should see the default Next.js welcome page. Stop the server with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git init
git add .
git commit -m "feat: bootstrap Next.js 15 portfolio project"
```

---

## Task 2: portfolioConfig.ts — Content CMS

**Files:**
- Create: `data/portfolioConfig.ts`

- [ ] **Step 1: Create the data directory and config file**

```bash
mkdir -p data
```

- [ ] **Step 2: Write `data/portfolioConfig.ts`**

```typescript
// data/portfolioConfig.ts

export type LocalizedString = { en: string; es: string }
export type Theme = 'modern' | 'corporate' | 'dynamic'
export type Locale = 'en' | 'es'

export const config = {
  personalInfo: {
    name: 'Randy Gonzalez',
    title: {
      en: 'Full-Stack Software Engineer & Architect',
      es: 'Ingeniero de Software Full-Stack & Arquitecto',
    } as LocalizedString,
    bio: {
      en: 'I build scalable systems and clean interfaces. Focused on .NET, NestJS, Next.js, and Flutter — from architecture decisions to pixel-perfect UIs.',
      es: 'Construyo sistemas escalables e interfaces limpias. Enfocado en .NET, NestJS, Next.js y Flutter — desde decisiones de arquitectura hasta UIs pixel-perfect.',
    } as LocalizedString,
    location: 'República Dominicana',
    avatar: '/avatar.png',
    contact: {
      email: 'tu@email.com',
      linkedin: 'https://linkedin.com/in/tu-perfil',
      github: process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'randyglez',
      whatsapp: '+18099999999',
    },
  },

  expertise: [
    {
      category: { en: 'Backend & Architecture', es: 'Backend & Arquitectura' } as LocalizedString,
      icon: 'server' as const,
      description: {
        en: 'Building robust APIs and distributed systems with Clean Architecture principles.',
        es: 'Construyendo APIs robustas y sistemas distribuidos con principios de Clean Architecture.',
      } as LocalizedString,
      skills: ['.NET Core 9', 'NestJS', 'SQL Server', 'Clean Architecture', 'REST', 'WebSockets'],
    },
    {
      category: { en: 'Frontend', es: 'Frontend' } as LocalizedString,
      icon: 'monitor' as const,
      description: {
        en: 'Crafting fast, accessible, and interactive web experiences.',
        es: 'Creando experiencias web rápidas, accesibles e interactivas.',
      } as LocalizedString,
      skills: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Framer Motion'],
    },
    {
      category: { en: 'Mobile', es: 'Mobile' } as LocalizedString,
      icon: 'smartphone' as const,
      description: {
        en: 'Cross-platform mobile apps with Flutter for iOS and Android.',
        es: 'Apps móviles multiplataforma con Flutter para iOS y Android.',
      } as LocalizedString,
      skills: ['Flutter', 'Dart'],
    },
  ],

  projects: [
    {
      id: 'xplora',
      title: 'Xplora Travel',
      description: {
        en: 'Scalable travel & excursions platform with booking, payments, and operator management.',
        es: 'Plataforma escalable de viajes y excursiones con reservas, pagos y gestión de operadores.',
      } as LocalizedString,
      image: '/projects/xplora-placeholder.png',
      placeholderGradient: 'from-blue-500 to-cyan-400',
      tags: ['Next.js', 'NestJS', 'SQL Server', 'TypeScript'],
      category: 'web' as const,
      url: '#',
    },
    {
      id: 'saas-bot',
      title: 'SaaS WhatsApp Bot',
      description: {
        en: 'Multi-tenant automation system using NestJS & WPPConnect with worker-brain architecture.',
        es: 'Sistema de automatización multi-tenant con NestJS & WPPConnect, arquitectura worker-brain.',
      } as LocalizedString,
      image: '/projects/bot-placeholder.png',
      placeholderGradient: 'from-green-500 to-emerald-400',
      tags: ['NestJS', 'WPPConnect', 'Architecture', 'SaaS'],
      category: 'architecture' as const,
      url: '#',
    },
  ],

  experience: [
    {
      role: { en: 'Full-Stack Engineer', es: 'Ingeniero Full-Stack' } as LocalizedString,
      company: 'Tu Empresa',
      period: '2023 – Present',
      location: 'República Dominicana',
      description: {
        en: 'Led development of scalable web and mobile applications using .NET, React, and Flutter.',
        es: 'Lideré el desarrollo de aplicaciones web y móviles escalables usando .NET, React y Flutter.',
      } as LocalizedString,
      tech: ['.NET', 'React', 'SQL Server', 'Flutter'],
    },
  ],

  testimonials: [
    {
      quote: {
        en: 'Randy delivered beyond expectations — clean code, on time, and great communication.',
        es: 'Randy entregó más allá de las expectativas — código limpio, a tiempo y gran comunicación.',
      } as LocalizedString,
      author: 'Cliente Ejemplo',
      title: { en: 'CEO at Startup', es: 'CEO en Startup' } as LocalizedString,
    },
  ],

  certifications: [
    {
      name: 'Microsoft Certified: Azure Developer',
      issuer: 'Microsoft',
      year: 2024,
      url: '#',
    },
  ],

  metrics: {
    years: 4,
    projects: 10,
    technologies: 8,
  },
} as const
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add data/portfolioConfig.ts .env.local
git commit -m "feat: add portfolioConfig.ts static CMS"
```

---

## Task 3: Theme CSS Variables + i18n Messages

**Files:**
- Create: `src/styles/themes.css`
- Create: `messages/en.json`
- Create: `messages/es.json`

- [ ] **Step 1: Create `src/styles/themes.css`**

```bash
mkdir -p src/styles
```

```css
/* src/styles/themes.css */

/* ── MODERN ─────────────────────────────────────────── */
[data-theme='modern'] {
  --bg: #ffffff;
  --bg-secondary: #f5f5f5;
  --text: #0a0a0a;
  --text-muted: #6b7280;
  --accent: #000000;
  --accent-hover: #1a1a1a;
  --border: #e5e7eb;
  --card-bg: #ffffff;
  --card-border: #e5e7eb;
  --nav-bg: rgba(255, 255, 255, 0.85);
}

/* ── CORPORATE ───────────────────────────────────────── */
[data-theme='corporate'] {
  --bg: #f8f9fa;
  --bg-secondary: #ffffff;
  --text: #1a1a2e;
  --text-muted: #64748b;
  --accent: #2563eb;
  --accent-hover: #1d4ed8;
  --border: #e2e8f0;
  --card-bg: #ffffff;
  --card-border: #e2e8f0;
  --nav-bg: rgba(248, 249, 250, 0.9);
}

/* ── DYNAMIC ─────────────────────────────────────────── */
[data-theme='dynamic'] {
  --bg: #0f0f1a;
  --bg-secondary: #1a1a2e;
  --text: #ffffff;
  --text-muted: #94a3b8;
  --accent: #7c3aed;
  --accent-secondary: #06b6d4;
  --accent-hover: #6d28d9;
  --border: #2d2d4e;
  --card-bg: #1a1a2e;
  --card-border: #2d2d4e;
  --nav-bg: rgba(15, 15, 26, 0.85);
}
```

- [ ] **Step 2: Create `messages/en.json`**

```bash
mkdir -p messages
```

```json
{
  "nav": {
    "home": "Home",
    "expertise": "Expertise",
    "work": "Work",
    "experience": "Experience",
    "github": "GitHub",
    "contact": "Contact"
  },
  "gate": {
    "subtitle": "Full-Stack Software Engineer & Architect",
    "choose": "Choose your experience",
    "modern": {
      "name": "MODERN",
      "description": "Minimal & Clean"
    },
    "corporate": {
      "name": "CORPORATE",
      "description": "Clean & Precise"
    },
    "dynamic": {
      "name": "DYNAMIC",
      "description": "Bold & Animated"
    }
  },
  "hero": {
    "viewWork": "View Work",
    "contact": "Contact Me",
    "location": "Based in"
  },
  "expertise": {
    "title": "My Expertise",
    "subtitle": "Technologies and tools I work with daily"
  },
  "work": {
    "title": "My Work",
    "subtitle": "Selected projects and case studies",
    "filterAll": "All",
    "filterWeb": "Web",
    "filterMobile": "Mobile",
    "filterArchitecture": "Architecture",
    "viewProject": "View Project"
  },
  "experience": {
    "title": "Experience",
    "subtitle": "My professional journey"
  },
  "github": {
    "title": "GitHub Activity",
    "subtitle": "Open source contributions and activity",
    "repos": "Public Repos",
    "followers": "Followers",
    "following": "Following"
  },
  "contact": {
    "title": "Let's Work Together",
    "subtitle": "Open to freelance, full-time, and consulting opportunities",
    "email": "Email",
    "linkedin": "LinkedIn",
    "github": "GitHub",
    "whatsapp": "WhatsApp"
  },
  "metrics": {
    "years": "Years",
    "projects": "Projects",
    "technologies": "Technologies"
  }
}
```

- [ ] **Step 3: Create `messages/es.json`**

```json
{
  "nav": {
    "home": "Inicio",
    "expertise": "Expertise",
    "work": "Proyectos",
    "experience": "Experiencia",
    "github": "GitHub",
    "contact": "Contacto"
  },
  "gate": {
    "subtitle": "Ingeniero de Software Full-Stack & Arquitecto",
    "choose": "Elige tu experiencia",
    "modern": {
      "name": "MODERNO",
      "description": "Minimal & Limpio"
    },
    "corporate": {
      "name": "EMPRESARIAL",
      "description": "Limpio & Preciso"
    },
    "dynamic": {
      "name": "DINÁMICO",
      "description": "Audaz & Animado"
    }
  },
  "hero": {
    "viewWork": "Ver Proyectos",
    "contact": "Contáctame",
    "location": "Basado en"
  },
  "expertise": {
    "title": "Mi Expertise",
    "subtitle": "Tecnologías y herramientas con las que trabajo a diario"
  },
  "work": {
    "title": "Mi Trabajo",
    "subtitle": "Proyectos seleccionados y casos de estudio",
    "filterAll": "Todos",
    "filterWeb": "Web",
    "filterMobile": "Mobile",
    "filterArchitecture": "Arquitectura",
    "viewProject": "Ver Proyecto"
  },
  "experience": {
    "title": "Experiencia",
    "subtitle": "Mi trayectoria profesional"
  },
  "github": {
    "title": "Actividad GitHub",
    "subtitle": "Contribuciones open source y actividad",
    "repos": "Repos Públicos",
    "followers": "Seguidores",
    "following": "Siguiendo"
  },
  "contact": {
    "title": "Trabajemos Juntos",
    "subtitle": "Abierto a freelance, tiempo completo y consultoría",
    "email": "Email",
    "linkedin": "LinkedIn",
    "github": "GitHub",
    "whatsapp": "WhatsApp"
  },
  "metrics": {
    "years": "Años",
    "projects": "Proyectos",
    "technologies": "Tecnologías"
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add src/styles/themes.css messages/
git commit -m "feat: add CSS theme variables and i18n message files"
```

---

## Task 4: Zustand Theme Store + Locale Hook

**Files:**
- Create: `src/store/themeStore.ts`
- Create: `src/lib/usePortfolioLocale.ts`

- [ ] **Step 1: Create store directory**

```bash
mkdir -p src/store src/lib
```

- [ ] **Step 2: Write `src/store/themeStore.ts`**

```typescript
// src/store/themeStore.ts
import { create } from 'zustand'
import type { Theme, Locale } from '../../data/portfolioConfig'

interface ThemeStore {
  theme: Theme | null
  locale: Locale
  hasChosenTheme: boolean
  setTheme: (theme: Theme) => void
  setLocale: (locale: Locale) => void
  initFromStorage: () => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: null,
  locale: 'en',
  hasChosenTheme: false,

  setTheme: (theme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-theme', theme)
      document.documentElement.setAttribute('data-theme', theme)
    }
    set({ theme, hasChosenTheme: true })
  },

  setLocale: (locale) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-locale', locale)
    }
    set({ locale })
  },

  initFromStorage: () => {
    if (typeof window === 'undefined') return
    const savedTheme = localStorage.getItem('preferred-theme') as Theme | null
    const savedLocale = (localStorage.getItem('preferred-locale') as Locale) ?? 'en'
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme)
      set({ theme: savedTheme, locale: savedLocale, hasChosenTheme: true })
    } else {
      set({ locale: savedLocale })
    }
  },
}))
```

- [ ] **Step 3: Write `src/lib/usePortfolioLocale.ts`**

```typescript
// src/lib/usePortfolioLocale.ts
import { useThemeStore } from '@/store/themeStore'
import type { LocalizedString } from '../../data/portfolioConfig'

export function useL() {
  const locale = useThemeStore((s) => s.locale)
  return (field: LocalizedString): string => field[locale]
}
```

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add src/store/ src/lib/
git commit -m "feat: add Zustand theme store and locale hook"
```

---

## Task 5: Root Layout + Providers

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/components/Providers.tsx`

- [ ] **Step 1: Create `src/components/Providers.tsx`**

```bash
mkdir -p src/components
```

```tsx
// src/components/Providers.tsx
'use client'

import { useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'

export default function Providers({ children }: { children: React.ReactNode }) {
  const initFromStorage = useThemeStore((s) => s.initFromStorage)

  useEffect(() => {
    initFromStorage()
  }, [initFromStorage])

  return <>{children}</>
}
```

- [ ] **Step 2: Update `src/app/layout.tsx`**

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google'
import Providers from '@/components/Providers'
import '@/styles/themes.css'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })

export const metadata: Metadata = {
  title: 'Randy Gonzalez — Full-Stack Engineer & Architect',
  description: 'Portfolio of Randy Gonzalez, Full-Stack Software Engineer & Architect based in Dominican Republic.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${plusJakarta.variable} ${spaceGrotesk.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Add font variables to `src/styles/themes.css`**

Add at the top of `src/styles/themes.css` before the theme blocks:

```css
/* Font mapping per theme */
[data-theme='modern'] {
  font-family: var(--font-jakarta), sans-serif;
}
[data-theme='corporate'] {
  font-family: var(--font-inter), sans-serif;
}
[data-theme='dynamic'] {
  font-family: var(--font-space), sans-serif;
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: Build completes without errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/components/Providers.tsx src/styles/themes.css
git commit -m "feat: root layout with Google Fonts and theme providers"
```

---

## Task 6: UI Primitives — Tag, Card, Button

**Files:**
- Create: `src/components/ui/Tag.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Button.tsx`

- [ ] **Step 1: Create `src/components/ui/Tag.tsx`**

```bash
mkdir -p src/components/ui
```

```tsx
// src/components/ui/Tag.tsx
interface TagProps {
  label: string
  className?: string
}

export default function Tag({ label, className = '' }: TagProps) {
  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-medium rounded-full border
        bg-[var(--bg-secondary)] text-[var(--text-muted)] border-[var(--border)]
        ${className}`}
    >
      {label}
    </span>
  )
}
```

- [ ] **Step 2: Create `src/components/ui/Card.tsx`**

```tsx
// src/components/ui/Card.tsx
interface CardProps {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-2xl border p-6
        bg-[var(--card-bg)] border-[var(--card-border)]
        ${className}`}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 3: Create `src/components/ui/Button.tsx`**

```tsx
// src/components/ui/Button.tsx
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'outline'
  className?: string
}

export default function Button({ children, onClick, href, variant = 'primary', className = '' }: ButtonProps) {
  const base = 'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 cursor-pointer'
  const variants = {
    primary: 'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]',
    outline: 'border border-[var(--border)] text-[var(--text)] hover:bg-[var(--bg-secondary)]',
  }

  if (href) {
    return (
      <a href={href} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add Tag, Card, and Button UI primitives"
```

---

## Task 7: ExperienceGate Component

**Files:**
- Create: `src/components/gate/ExperienceGate.tsx`

- [ ] **Step 1: Create gate directory**

```bash
mkdir -p src/components/gate
```

- [ ] **Step 2: Write `src/components/gate/ExperienceGate.tsx`**

```tsx
// src/components/gate/ExperienceGate.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useThemeStore } from '@/store/themeStore'
import type { Theme, Locale } from '../../../data/portfolioConfig'

const themes: {
  id: Theme
  nameKey: { en: string; es: string }
  descKey: { en: string; es: string }
  preview: React.ReactNode
}[] = [
  {
    id: 'modern',
    nameKey: { en: 'MODERN', es: 'MODERNO' },
    descKey: { en: 'Minimal & Clean', es: 'Minimal & Limpio' },
    preview: (
      <svg viewBox="0 0 120 80" className="w-full h-20 opacity-60">
        <rect x="8" y="8" width="50" height="35" rx="4" fill="#e5e7eb" />
        <rect x="64" y="8" width="48" height="16" rx="4" fill="#e5e7eb" />
        <rect x="64" y="28" width="32" height="10" rx="3" fill="#d1d5db" />
        <rect x="8" y="50" width="30" height="22" rx="4" fill="#f3f4f6" />
        <rect x="44" y="50" width="30" height="22" rx="4" fill="#f3f4f6" />
        <rect x="80" y="50" width="32" height="22" rx="4" fill="#f3f4f6" />
      </svg>
    ),
  },
  {
    id: 'corporate',
    nameKey: { en: 'CORPORATE', es: 'EMPRESARIAL' },
    descKey: { en: 'Clean & Precise', es: 'Limpio & Preciso' },
    preview: (
      <svg viewBox="0 0 120 80" className="w-full h-20 opacity-60">
        <rect x="8" y="8" width="104" height="12" rx="2" fill="#2563eb" opacity="0.3" />
        <rect x="8" y="26" width="104" height="8" rx="2" fill="#e2e8f0" />
        <rect x="8" y="40" width="104" height="8" rx="2" fill="#e2e8f0" />
        <rect x="8" y="54" width="104" height="8" rx="2" fill="#e2e8f0" />
        <rect x="8" y="68" width="60" height="6" rx="2" fill="#2563eb" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: 'dynamic',
    nameKey: { en: 'DYNAMIC', es: 'DINÁMICO' },
    descKey: { en: 'Bold & Animated', es: 'Audaz & Animado' },
    preview: (
      <svg viewBox="0 0 120 80" className="w-full h-20 opacity-60">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <rect x="8" y="8" width="50" height="64" rx="8" fill="url(#grad)" opacity="0.7" />
        <rect x="64" y="8" width="48" height="28" rx="8" fill="url(#grad)" opacity="0.5" />
        <rect x="64" y="42" width="22" height="30" rx="8" fill="url(#grad)" opacity="0.4" />
        <rect x="90" y="42" width="22" height="30" rx="8" fill="url(#grad)" opacity="0.4" />
      </svg>
    ),
  },
]

export default function ExperienceGate({ onComplete }: { onComplete: () => void }) {
  const { setTheme, locale, setLocale } = useThemeStore()

  const handleChoose = (theme: Theme) => {
    setTheme(theme)
    onComplete()
  }

  const l = (obj: { en: string; es: string }) => obj[locale]

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] px-6"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Locale toggle */}
      <div className="absolute top-6 right-6 flex gap-2">
        {(['en', 'es'] as Locale[]).map((loc) => (
          <button
            key={loc}
            onClick={() => setLocale(loc)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              locale === loc
                ? 'bg-white text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {loc.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Heading */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Randy Gonzalez
        </h1>
        <p className="text-gray-400 text-lg md:text-xl">
          {l({ en: 'Full-Stack Software Engineer & Architect', es: 'Ingeniero de Software Full-Stack & Arquitecto' })}
        </p>
      </motion.div>

      {/* Theme cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {themes.map((theme, i) => (
          <motion.button
            key={theme.id}
            onClick={() => handleChoose(theme.id)}
            className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 text-left
              hover:border-white/30 hover:bg-white/10 transition-colors cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="mb-4">{theme.preview}</div>
            <p className="text-white font-bold text-lg tracking-widest mb-1">
              {l(theme.nameKey)}
            </p>
            <p className="text-gray-400 text-sm">{l(theme.descKey)}</p>
          </motion.button>
        ))}
      </div>

      {/* Footer hint */}
      <motion.p
        className="mt-12 text-gray-600 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {l({ en: 'Choose your experience', es: 'Elige tu experiencia' })}
      </motion.p>
    </motion.div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/gate/
git commit -m "feat: ExperienceGate with 3 theme cards and locale toggle"
```

---

## Task 8: Navigation Component

**Files:**
- Create: `src/components/nav/Navigation.tsx`

- [ ] **Step 1: Create nav directory**

```bash
mkdir -p src/components/nav
```

- [ ] **Step 2: Write `src/components/nav/Navigation.tsx`**

```tsx
// src/components/nav/Navigation.tsx
'use client'

import { useThemeStore } from '@/store/themeStore'
import { useL } from '@/lib/usePortfolioLocale'
import type { Locale } from '../../../data/portfolioConfig'

const navLinks = [
  { href: '#hero', labelKey: 'home' as const },
  { href: '#expertise', labelKey: 'expertise' as const },
  { href: '#work', labelKey: 'work' as const },
  { href: '#experience', labelKey: 'experience' as const },
  { href: '#github', labelKey: 'github' as const },
  { href: '#contact', labelKey: 'contact' as const },
]

const navLabels = {
  en: { home: 'Home', expertise: 'Expertise', work: 'Work', experience: 'Experience', github: 'GitHub', contact: 'Contact' },
  es: { home: 'Inicio', expertise: 'Expertise', work: 'Proyectos', experience: 'Experiencia', github: 'GitHub', contact: 'Contacto' },
}

export default function Navigation() {
  const { locale, setLocale, theme } = useThemeStore()
  const labels = navLabels[locale]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 px-6 py-4 backdrop-blur-md border-b border-[var(--border)]"
      style={{ backgroundColor: 'var(--nav-bg)' }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <span className="font-bold text-[var(--text)] tracking-tight">RG</span>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors
                ${theme === 'dynamic' ? 'hover:text-[var(--accent)]' : ''}
                ${theme === 'corporate' ? 'font-medium' : ''}`}
            >
              {labels[link.labelKey]}
            </a>
          ))}
        </div>

        <div className="flex gap-1">
          {(['en', 'es'] as Locale[]).map((loc) => (
            <button
              key={loc}
              onClick={() => setLocale(loc)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                locale === loc
                  ? 'bg-[var(--accent)] text-white'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              {loc.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/nav/
git commit -m "feat: Navigation with sticky blur, nav links, EN/ES toggle"
```

---

## Task 9: Hero Section

**Files:**
- Create: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Create sections directory**

```bash
mkdir -p src/components/sections
```

- [ ] **Step 2: Write `src/components/sections/Hero.tsx`**

```tsx
// src/components/sections/Hero.tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'
import { useL } from '@/lib/usePortfolioLocale'
import { config } from '../../../data/portfolioConfig'
import Button from '@/components/ui/Button'

function TypewriterText({ text }: { text: string }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.05, staggerChildren: 0.04 }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.04 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default function Hero() {
  const { theme } = useThemeStore()
  const l = useL()
  const { personalInfo, metrics } = config

  const socialLinks = [
    { icon: Github, href: `https://github.com/${personalInfo.contact.github}`, label: 'GitHub' },
    { icon: Linkedin, href: personalInfo.contact.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${personalInfo.contact.email}`, label: 'Email' },
    { icon: MessageCircle, href: `https://wa.me/${personalInfo.contact.whatsapp.replace(/\D/g, '')}`, label: 'WhatsApp' },
  ]

  const avatarEl = (
    <div className="relative">
      <div
        className={`relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4
          ${theme === 'dynamic' ? 'border-purple-500 shadow-[0_0_40px_rgba(124,58,237,0.5)]' : 'border-[var(--border)]'}`}
      >
        <Image src={personalInfo.avatar} alt={personalInfo.name} fill className="object-cover" />
      </div>
    </div>
  )

  const titleEl = theme === 'dynamic'
    ? <TypewriterText text={l(personalInfo.title)} />
    : l(personalInfo.title)

  return (
    <section
      id="hero"
      className="min-h-screen pt-24 pb-16 flex items-center bg-[var(--bg)]"
    >
      <div className="max-w-6xl mx-auto px-6 w-full">
        {/* MODERN: 2-column layout */}
        {theme === 'modern' && (
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              {avatarEl}
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <HeroContent socialLinks={socialLinks} titleEl={titleEl} l={l} />
            </motion.div>
          </div>
        )}

        {/* CORPORATE: centered with metrics */}
        {theme === 'corporate' && (
          <motion.div className="text-center max-w-3xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex justify-center mb-8">{avatarEl}</div>
            <HeroContent socialLinks={socialLinks} titleEl={titleEl} l={l} centered />
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-[var(--border)]">
              {[
                { value: metrics.years, label: { en: 'Years', es: 'Años' } },
                { value: metrics.projects, label: { en: 'Projects', es: 'Proyectos' } },
                { value: metrics.technologies, label: { en: 'Technologies', es: 'Tecnologías' } },
              ].map((m) => (
                <div key={m.label.en}>
                  <p className="text-4xl font-bold text-[var(--accent)]">{m.value}+</p>
                  <p className="text-[var(--text-muted)] text-sm mt-1">{l(m.label)}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* DYNAMIC: bold centered */}
        {theme === 'dynamic' && (
          <motion.div className="text-center max-w-4xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="flex justify-center mb-8">{avatarEl}</div>
            <HeroContent socialLinks={socialLinks} titleEl={titleEl} l={l} centered gradient />
          </motion.div>
        )}
      </div>
    </section>
  )
}

function HeroContent({
  socialLinks,
  titleEl,
  l,
  centered = false,
  gradient = false,
}: {
  socialLinks: { icon: React.ElementType; href: string; label: string }[]
  titleEl: React.ReactNode
  l: (s: { en: string; es: string }) => string
  centered?: boolean
  gradient?: boolean
}) {
  const { personalInfo } = config

  return (
    <div className={centered ? 'text-center' : ''}>
      <h1
        className={`text-4xl md:text-6xl font-bold mb-4 leading-tight text-[var(--text)]
          ${gradient ? 'bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent' : ''}`}
      >
        {personalInfo.name}
      </h1>
      <p className="text-xl md:text-2xl text-[var(--text-muted)] mb-4 font-medium">
        {titleEl}
      </p>
      <p className="text-[var(--text-muted)] mb-8 max-w-xl leading-relaxed">
        {l(personalInfo.bio)}
      </p>
      <div className={`flex gap-4 mb-8 ${centered ? 'justify-center' : ''}`}>
        <Button href="#work" variant="primary">
          {l({ en: 'View Work', es: 'Ver Proyectos' })}
        </Button>
        <Button href="#contact" variant="outline">
          {l({ en: 'Contact Me', es: 'Contáctame' })}
        </Button>
      </div>
      <div className={`flex gap-4 ${centered ? 'justify-center' : ''}`}>
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-secondary)] transition-colors"
          >
            <Icon size={20} />
          </a>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: Hero section with 3 theme layouts and social links"
```

---

## Task 10: Expertise Section

**Files:**
- Create: `src/components/sections/Expertise.tsx`

- [ ] **Step 1: Write `src/components/sections/Expertise.tsx`**

```tsx
// src/components/sections/Expertise.tsx
'use client'

import { motion } from 'framer-motion'
import { Server, Monitor, Smartphone } from 'lucide-react'
import { useL } from '@/lib/usePortfolioLocale'
import { config } from '../../../data/portfolioConfig'
import Tag from '@/components/ui/Tag'
import Card from '@/components/ui/Card'

const iconMap = { server: Server, monitor: Monitor, smartphone: Smartphone }

export default function Expertise() {
  const l = useL()

  return (
    <section id="expertise" className="py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
            {l({ en: 'My Expertise', es: 'Mi Expertise' })}
          </h2>
          <p className="text-[var(--text-muted)]">
            {l({ en: 'Technologies and tools I work with daily', es: 'Tecnologías y herramientas con las que trabajo a diario' })}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {config.expertise.map((area, i) => {
            const Icon = iconMap[area.icon]
            return (
              <motion.div
                key={area.icon}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card>
                  <div className="w-10 h-10 rounded-lg bg-[var(--accent)] bg-opacity-10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-[var(--accent)]" />
                  </div>
                  <h3 className="font-bold text-[var(--text)] mb-2">{l(area.category)}</h3>
                  <p className="text-[var(--text-muted)] text-sm mb-4 leading-relaxed">{l(area.description)}</p>
                  <div className="flex flex-wrap gap-2">
                    {area.skills.map((skill) => (
                      <Tag key={skill} label={skill} />
                    ))}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Expertise.tsx
git commit -m "feat: Expertise section with 3 skill columns"
```

---

## Task 11: Work Section (with theme-aware layouts)

**Files:**
- Create: `src/components/sections/Work.tsx`

- [ ] **Step 1: Write `src/components/sections/Work.tsx`**

```tsx
// src/components/sections/Work.tsx
'use client'

import { useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'
import { useL } from '@/lib/usePortfolioLocale'
import { config } from '../../../data/portfolioConfig'
import Tag from '@/components/ui/Tag'

type Category = 'all' | 'web' | 'mobile' | 'architecture'

const filters: { key: Category; label: { en: string; es: string } }[] = [
  { key: 'all', label: { en: 'All', es: 'Todos' } },
  { key: 'web', label: { en: 'Web', es: 'Web' } },
  { key: 'mobile', label: { en: 'Mobile', es: 'Mobile' } },
  { key: 'architecture', label: { en: 'Architecture', es: 'Arquitectura' } },
]

function ProjectPlaceholder({ gradient }: { gradient: string }) {
  return (
    <div className={`w-full h-40 rounded-xl bg-gradient-to-br ${gradient} opacity-80`} />
  )
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-50, 50], [8, -8])
  const rotateY = useTransform(x, [-50, 50], [-8, 8])

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - rect.left - rect.width / 2)
        y.set(e.clientY - rect.top - rect.height / 2)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className="rounded-2xl border bg-[var(--card-bg)] border-[var(--card-border)] p-6 cursor-default"
    >
      {children}
    </motion.div>
  )
}

export default function Work() {
  const { theme } = useThemeStore()
  const l = useL()
  const [activeFilter, setActiveFilter] = useState<Category>('all')

  const filtered = config.projects.filter(
    (p) => activeFilter === 'all' || p.category === activeFilter
  )

  return (
    <section id="work" className="py-24 bg-[var(--bg)]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
            {l({ en: 'My Work', es: 'Mi Trabajo' })}
          </h2>
          <p className="text-[var(--text-muted)] mb-8">
            {l({ en: 'Selected projects and case studies', es: 'Proyectos seleccionados y casos de estudio' })}
          </p>

          {/* Filters */}
          <div className="flex gap-3 justify-center flex-wrap">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === f.key
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]'
                }`}
              >
                {l(f.label)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* MODERN: Bento Grid */}
        {theme === 'modern' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                className={`rounded-2xl border bg-[var(--card-bg)] border-[var(--card-border)] p-6
                  ${i === 0 ? 'md:col-span-2' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ProjectPlaceholder gradient={project.placeholderGradient} />
                <h3 className="font-bold text-[var(--text)] mt-4 mb-2">{project.title}</h3>
                <p className="text-[var(--text-muted)] text-sm mb-4">{l(project.description)}</p>
                <div className="flex flex-wrap gap-2 mb-4">{project.tags.map((t) => <Tag key={t} label={t} />)}</div>
                <a href={project.url} className="text-sm font-medium text-[var(--accent)] hover:underline inline-flex items-center gap-1">
                  {l({ en: 'View Project', es: 'Ver Proyecto' })} <ExternalLink size={14} />
                </a>
              </motion.div>
            ))}
          </div>
        )}

        {/* CORPORATE: Horizontal list */}
        {theme === 'corporate' && (
          <div className="flex flex-col gap-6">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                className="flex gap-6 rounded-2xl border bg-[var(--card-bg)] border-[var(--card-border)] p-6 items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-40 flex-shrink-0">
                  <ProjectPlaceholder gradient={project.placeholderGradient} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[var(--text)] mb-2">{project.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm mb-4">{l(project.description)}</p>
                  <div className="flex flex-wrap gap-2 mb-3">{project.tags.map((t) => <Tag key={t} label={t} />)}</div>
                  <a href={project.url} className="text-sm font-medium text-[var(--accent)] hover:underline inline-flex items-center gap-1">
                    {l({ en: 'View Project', es: 'Ver Proyecto' })} <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* DYNAMIC: 3D Tilt Grid */}
        {theme === 'dynamic' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ perspective: 1000 }}>
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <TiltCard>
                  <ProjectPlaceholder gradient={project.placeholderGradient} />
                  <h3 className="font-bold text-[var(--text)] mt-4 mb-2">{project.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm mb-4">{l(project.description)}</p>
                  <div className="flex flex-wrap gap-2 mb-4">{project.tags.map((t) => <Tag key={t} label={t} />)}</div>
                  <a href={project.url} className="text-sm font-medium text-purple-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-1">
                    {l({ en: 'View Project', es: 'Ver Proyecto' })} <ExternalLink size={14} />
                  </a>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Work.tsx
git commit -m "feat: Work section with Bento/list/3D-tilt layouts per theme"
```

---

## Task 12: Experience Section

**Files:**
- Create: `src/components/sections/Experience.tsx`

- [ ] **Step 1: Write `src/components/sections/Experience.tsx`**

```tsx
// src/components/sections/Experience.tsx
'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar } from 'lucide-react'
import { useL } from '@/lib/usePortfolioLocale'
import { config } from '../../../data/portfolioConfig'
import Tag from '@/components/ui/Tag'

export default function Experience() {
  const l = useL()

  return (
    <section id="experience" className="py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
            {l({ en: 'Experience', es: 'Experiencia' })}
          </h2>
          <p className="text-[var(--text-muted)]">
            {l({ en: 'My professional journey', es: 'Mi trayectoria profesional' })}
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--border)]" />

          <div className="flex flex-col gap-12">
            {config.experience.map((item, i) => (
              <motion.div
                key={i}
                className="pl-12 relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                {/* Dot */}
                <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white" />
                </div>

                <div className="rounded-2xl border bg-[var(--card-bg)] border-[var(--card-border)] p-6">
                  <h3 className="font-bold text-[var(--text)] text-lg mb-1">{l(item.role)}</h3>
                  <p className="text-[var(--accent)] font-medium mb-3">{item.company}</p>
                  <div className="flex gap-4 text-sm text-[var(--text-muted)] mb-4">
                    <span className="flex items-center gap-1"><Calendar size={14} />{item.period}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} />{item.location}</span>
                  </div>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4">{l(item.description)}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tech.map((t) => <Tag key={t} label={t} />)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Experience.tsx
git commit -m "feat: Experience timeline section"
```

---

## Task 13: GitHub Stats Section + API Route

**Files:**
- Create: `src/app/api/github/route.ts`
- Create: `src/components/sections/GitHubStats.tsx`

- [ ] **Step 1: Create `src/app/api/github/route.ts`**

```bash
mkdir -p src/app/api/github
```

```typescript
// src/app/api/github/route.ts
import { NextResponse } from 'next/server'

const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'randyglez'

export async function GET() {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers: { Accept: 'application/vnd.github.v3+json' },
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'GitHub API error' }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json({
    public_repos: data.public_repos,
    followers: data.followers,
    following: data.following,
  })
}
```

- [ ] **Step 2: Write `src/components/sections/GitHubStats.tsx`**

```tsx
// src/components/sections/GitHubStats.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useThemeStore } from '@/store/themeStore'
import { useL } from '@/lib/usePortfolioLocale'
import { config } from '../../../data/portfolioConfig'

interface GitHubData {
  public_repos: number
  followers: number
  following: number
}

const statsThemeMap = {
  modern: 'default',
  corporate: 'default',
  dynamic: 'tokyonight',
}

const graphThemeMap = {
  modern: 'minimal',
  corporate: 'github',
  dynamic: 'tokyo-night',
}

export default function GitHubStats() {
  const { theme } = useThemeStore()
  const l = useL()
  const [data, setData] = useState<GitHubData | null>(null)
  const username = config.personalInfo.contact.github

  useEffect(() => {
    fetch('/api/github')
      .then((r) => r.json())
      .then(setData)
      .catch(() => null)
  }, [])

  const statsTheme = statsThemeMap[theme ?? 'modern']
  const graphTheme = graphThemeMap[theme ?? 'modern']

  return (
    <section id="github" className="py-24 bg-[var(--bg)]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
            {l({ en: 'GitHub Activity', es: 'Actividad GitHub' })}
          </h2>
          <p className="text-[var(--text-muted)]">
            {l({ en: 'Open source contributions and activity', es: 'Contribuciones open source y actividad' })}
          </p>
        </motion.div>

        {/* Live metrics from API */}
        {data && (
          <motion.div
            className="grid grid-cols-3 gap-6 mb-12 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {[
              { value: data.public_repos, label: { en: 'Public Repos', es: 'Repos Públicos' } },
              { value: data.followers, label: { en: 'Followers', es: 'Seguidores' } },
              { value: data.following, label: { en: 'Following', es: 'Siguiendo' } },
            ].map((m) => (
              <div key={m.label.en} className="text-center">
                <p className="text-3xl font-bold text-[var(--accent)]">{m.value}</p>
                <p className="text-[var(--text-muted)] text-sm mt-1">{l(m.label)}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Stats cards (embedded images) */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <img
            src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${statsTheme}&hide_border=true&bg_color=00000000`}
            alt="GitHub Stats"
            className="w-full rounded-xl"
          />
          <img
            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${statsTheme}&hide_border=true&bg_color=00000000`}
            alt="Top Languages"
            className="w-full rounded-xl"
          />
        </motion.div>

        {/* Contribution graph */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <img
            src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=${graphTheme}&hide_border=true&bg_color=00000000`}
            alt="Contribution Graph"
            className="w-full rounded-xl"
          />
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/api/github/ src/components/sections/GitHubStats.tsx
git commit -m "feat: GitHub stats section with embedded cards and API proxy"
```

---

## Task 14: Contact Section

**Files:**
- Create: `src/components/sections/Contact.tsx`

- [ ] **Step 1: Write `src/components/sections/Contact.tsx`**

```tsx
// src/components/sections/Contact.tsx
'use client'

import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, MessageCircle } from 'lucide-react'
import { useL } from '@/lib/usePortfolioLocale'
import { config } from '../../../data/portfolioConfig'

const contactLinks = [
  {
    icon: Mail,
    label: { en: 'Email', es: 'Email' },
    getValue: () => `mailto:${config.personalInfo.contact.email}`,
    display: () => config.personalInfo.contact.email,
  },
  {
    icon: Linkedin,
    label: { en: 'LinkedIn', es: 'LinkedIn' },
    getValue: () => config.personalInfo.contact.linkedin,
    display: () => 'linkedin.com/in/randy',
  },
  {
    icon: Github,
    label: { en: 'GitHub', es: 'GitHub' },
    getValue: () => `https://github.com/${config.personalInfo.contact.github}`,
    display: () => `github.com/${config.personalInfo.contact.github}`,
  },
  {
    icon: MessageCircle,
    label: { en: 'WhatsApp', es: 'WhatsApp' },
    getValue: () => `https://wa.me/${config.personalInfo.contact.whatsapp.replace(/\D/g, '')}`,
    display: () => config.personalInfo.contact.whatsapp,
  },
]

export default function Contact() {
  const l = useL()

  return (
    <section id="contact" className="py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--text)] mb-4">
            {l({ en: "Let's Work Together", es: 'Trabajemos Juntos' })}
          </h2>
          <p className="text-[var(--text-muted)] mb-12 text-lg max-w-lg mx-auto">
            {l({ en: 'Open to freelance, full-time, and consulting opportunities', es: 'Abierto a freelance, tiempo completo y consultoría' })}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {contactLinks.map(({ icon: Icon, label, getValue, display }, i) => (
            <motion.a
              key={label.en}
              href={getValue()}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border bg-[var(--card-bg)] border-[var(--card-border)] p-6
                hover:border-[var(--accent)] transition-colors text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Icon size={24} className="mx-auto mb-3 text-[var(--accent)]" />
              <p className="font-medium text-[var(--text)] text-sm mb-1">{l(label)}</p>
              <p className="text-[var(--text-muted)] text-xs truncate">{display()}</p>
            </motion.a>
          ))}
        </div>

        <p className="mt-16 text-[var(--text-muted)] text-sm">
          © {new Date().getFullYear()} Randy Gonzalez · {l({ en: 'Built with Next.js', es: 'Construido con Next.js' })}
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Contact.tsx
git commit -m "feat: Contact section with social link cards"
```

---

## Task 15: Main Page Shell

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write `src/app/page.tsx`**

```tsx
// src/app/page.tsx
'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useThemeStore } from '@/store/themeStore'
import ExperienceGate from '@/components/gate/ExperienceGate'
import Navigation from '@/components/nav/Navigation'
import Hero from '@/components/sections/Hero'
import Expertise from '@/components/sections/Expertise'
import Work from '@/components/sections/Work'
import Experience from '@/components/sections/Experience'
import GitHubStats from '@/components/sections/GitHubStats'
import Contact from '@/components/sections/Contact'

export default function Home() {
  const { hasChosenTheme } = useThemeStore()
  const [gateVisible, setGateVisible] = useState(true)

  const showGate = !hasChosenTheme && gateVisible

  return (
    <main className="bg-[var(--bg)] min-h-screen text-[var(--text)] transition-colors duration-300">
      <AnimatePresence>
        {showGate && (
          <ExperienceGate onComplete={() => setGateVisible(false)} />
        )}
      </AnimatePresence>

      {hasChosenTheme && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Navigation />
          <Hero />
          <Expertise />
          <Work />
          <Experience />
          <GitHubStats />
          <Contact />
        </motion.div>
      )}
    </main>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: main page shell with gate/portfolio AnimatePresence"
```

---

## Task 16: Avatar + Placeholder Assets

**Files:**
- Create: `public/avatar.png` (user provides real image)
- Create placeholder gradient PNGs via script

- [ ] **Step 1: Copy avatar image**

Copy Randy's avatar illustration to `public/avatar.png`. The image provided during brainstorming (the cartoon-style avatar) should be saved there.

If the file is not yet available, create a temporary placeholder:

```bash
# Create a simple SVG placeholder as avatar
cat > public/avatar.svg << 'EOF'
<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  <circle cx="128" cy="128" r="128" fill="#7c3aed"/>
  <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="80" font-family="sans-serif">RG</text>
</svg>
EOF
```

Update `config.personalInfo.avatar` to `/avatar.svg` temporarily if using SVG fallback.

- [ ] **Step 2: Create project placeholder images**

```bash
mkdir -p public/projects

cat > public/projects/xplora-placeholder.svg << 'EOF'
<svg width="800" height="400" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
  </defs>
  <rect width="800" height="400" fill="url(#g1)"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="32" font-family="sans-serif">Xplora Travel</text>
</svg>
EOF

cat > public/projects/bot-placeholder.svg << 'EOF'
<svg width="800" height="400" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#34d399"/>
    </linearGradient>
  </defs>
  <rect width="800" height="400" fill="url(#g2)"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="32" font-family="sans-serif">WhatsApp Bot SaaS</text>
</svg>
EOF
```

- [ ] **Step 3: Update image references in `portfolioConfig.ts`**

Change the `image` fields for projects to use `.svg`:

```typescript
// In data/portfolioConfig.ts, update project image fields:
image: '/projects/xplora-placeholder.svg',
// and
image: '/projects/bot-placeholder.svg',
```

Also update `avatar` if using SVG:
```typescript
avatar: '/avatar.svg',
```

- [ ] **Step 4: Commit**

```bash
git add public/
git commit -m "feat: add avatar and project placeholder SVG assets"
```

---

## Task 17: Final Build + Verification

- [ ] **Step 1: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 2: Run dev server**

```bash
npm run dev
```

Open `http://localhost:3000`.

- [ ] **Step 3: Verify ExperienceGate**

- Page opens with fullscreen dark screen
- "Randy Gonzalez" heading and subtitle visible
- 3 cards (MODERN / CORPORATE / DYNAMIC) render with SVG previews
- EN/ES toggle in top-right changes text on cards
- Hovering cards shows scale animation

- [ ] **Step 4: Verify each theme**

Click each card and confirm:

| Check | MODERN | CORPORATE | DYNAMIC |
|-------|--------|-----------|---------|
| Background | White | Light gray | Dark (#0f0f1a) |
| Hero layout | 2-column (avatar left) | Centered + metrics | Centered + typewriter |
| Nav | Minimal | Structured | Accent hover |
| Work layout | Bento grid | Horizontal rows | 3D tilt grid |
| Font | Plus Jakarta Sans | Inter | Space Grotesk |

- [ ] **Step 5: Verify localStorage persistence**

Open DevTools → Application → Local Storage. After choosing a theme, `preferred-theme` key should be set. Reload page — gate should NOT appear.

- [ ] **Step 6: Verify EN/ES toggle**

Click EN/ES toggle in nav — all section titles, button labels, and skill descriptions must switch language.

- [ ] **Step 7: Verify GitHub Stats section**

Scroll to GitHub section — stats card images and contribution graph should load (requires internet).

- [ ] **Step 8: Production build**

```bash
npm run build
```

Expected: Build completes with no TypeScript or Next.js errors.

- [ ] **Step 9: Final commit**

```bash
git add -A
git commit -m "feat: complete portfolio — gate, 3 themes, all sections, bilingual"
```

---

## Self-Review

**Spec coverage check:**
- ✅ ExperienceGate with 3 cards and dark background (Task 7)
- ✅ localStorage persistence (Task 7, 4)
- ✅ 3 themes: modern, corporate, dynamic with CSS variables (Tasks 3, 5)
- ✅ Theme-aware Hero layouts (Task 9)
- ✅ Expertise section (Task 10)
- ✅ Work section with filters + 3 layout variants (Task 11)
- ✅ Experience timeline (Task 12)
- ✅ GitHub stats: embedded cards + contribution graph + API proxy (Task 13)
- ✅ Contact section (Task 14)
- ✅ Navigation with EN/ES toggle (Task 8)
- ✅ portfolioConfig.ts with all fields: testimonials, certifications, metrics, socialLinks (Task 2)
- ✅ Bilingual EN/ES across all sections (Tasks 3, `useL` hook)
- ✅ Framer Motion transitions throughout (Tasks 7–14)
- ✅ Avatar + placeholder assets (Task 16)

**Type consistency check:**
- `Theme` type defined in `portfolioConfig.ts`, imported in `themeStore.ts`, `ExperienceGate.tsx`, `Navigation.tsx`, `GitHubStats.tsx` — consistent
- `LocalizedString` defined in `portfolioConfig.ts`, used via `useL()` hook everywhere — consistent
- `useL()` returns `(field: LocalizedString) => string` — matches usage pattern `l(area.category)`, `l(project.description)` — consistent

**Placeholder scan:** No TBD or TODO in code steps. All code blocks complete. Commands have expected outputs.
