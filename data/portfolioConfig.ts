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
    avatar: '/avatar.svg',
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
      image: '/projects/xplora-placeholder.svg',
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
      image: '/projects/bot-placeholder.svg',
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
