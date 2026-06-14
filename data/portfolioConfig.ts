// data/portfolioConfig.ts

export type LocalizedString = { en: string; es: string }
export type Theme = 'modern' | 'corporate' | 'dynamic'
export type Locale = 'en' | 'es'

export const config = {
  personalInfo: {
    name: 'Miguel Angel Sanchez Peralta',
    title: {
      en: 'Senior Full-Stack Engineer & Architect',
      es: 'Ingeniero Full-Stack Senior & Arquitecto',
    } as LocalizedString,
    bio: {
      en: 'Engineer with 6+ years of experience in .NET, specialized in microservices design, cloud solutions on Azure, and scalable backend development. Skilled in React, Next.js, NestJS, and Flutter.',
      es: 'Ingeniero con más de 6 años de experiencia en .NET, especializado en diseño de microservicios, soluciones en la nube con Azure y desarrollo backend escalable. Hábil en React, Next.js, NestJS y Flutter.',
    } as LocalizedString,
    location: 'República Dominicana',
    avatar: '/avatar.png',
    contact: {
      email: 'yacalos_@hotmail.com',
      linkedin: 'https://www.linkedin.com/in/miguel-angel-sanchez-peralta-bb3941159/',
      instagram: 'https://www.instagram.com/mangeldevs/',
      github: process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'MangelSP',
      whatsapp: '+18295181341',
    },
  },

  expertise: [
    {
      category: { en: 'Backend & Architecture', es: 'Backend & Arquitectura' } as LocalizedString,
      icon: 'server' as const,
      description: {
        en: 'Building robust APIs, microservices, and cloud solutions with .NET Core, NestJS and Azure.',
        es: 'Construyendo APIs robustas, microservicios y soluciones en la nube con .NET Core, NestJS y Azure.',
      } as LocalizedString,
      skills: ['.NET Core', 'NestJS', 'Node.js', 'SQL Server', 'PostgreSQL', 'MongoDB', 'Azure Cloud', 'Microservices', 'RabbitMQ', 'Docker'],
    },
    {
      category: { en: 'Frontend', es: 'Frontend' } as LocalizedString,
      icon: 'monitor' as const,
      description: {
        en: 'Crafting fast, accessible, and interactive web experiences with React and Next.js.',
        es: 'Creando experiencias web rápidas, accesibles e interactivas con React y Next.js.',
      } as LocalizedString,
      skills: ['React', 'Next.js', 'Angular', 'TypeScript', 'Tailwind CSS', 'Redux', 'Styled Components'],
    },
    {
      category: { en: 'Mobile & DevOps', es: 'Mobile & DevOps' } as LocalizedString,
      icon: 'smartphone' as const,
      description: {
        en: 'Cross-platform mobile apps with Flutter, containerization with Docker and Kubernetes.',
        es: 'Apps móviles multiplataforma con Flutter, contenedores con Docker y Kubernetes.',
      } as LocalizedString,
      skills: ['Flutter', 'Swift', 'Docker', 'Kubernetes', 'Azure DevOps', 'Jest', 'TypeORM', 'Prisma'],
    },
  ],

  projects: [
    {
      id: 'travel-rd',
      title: 'Travel-RD',
      description: {
        en: 'Bilingual SaaS ecosystem for Dominican tourism: NestJS backend (25 modules), Next.js web app (60+ routes), and Flutter mobile app for iOS & Android with interactive maps, Stripe billing, FCM push notifications and real-time reservations.',
        es: 'Ecosistema SaaS bilingüe para el turismo dominicano: backend NestJS (25 módulos), app web Next.js (60+ rutas) y app móvil Flutter para iOS y Android con mapas interactivos, Stripe, notificaciones FCM y reservas en tiempo real.',
      } as LocalizedString,
      image: '/projects/travel-rd-placeholder.svg',
      placeholderGradient: 'from-blue-500 to-cyan-400',
      tags: ['NestJS', 'Next.js', 'Flutter', 'PostgreSQL', 'Stripe', 'Firebase', 'Redis', 'BullMQ'],
      category: 'web' as const,
      url: 'https://xplora-travel.net/trips',
    },
    {
      id: 'travel-rd-mobile',
      title: 'Travel-RD Mobile',
      description: {
        en: 'Native cross-platform Flutter app for Travel-RD with Clean Architecture, Riverpod, interactive maps, FCM push notifications, agency analytics dashboard, and offline image caching.',
        es: 'App Flutter multiplataforma para Travel-RD con Clean Architecture, Riverpod, mapas interactivos, notificaciones push FCM, panel de analíticas para agencias y caché de imágenes offline.',
      } as LocalizedString,
      image: '/projects/travel-rd-mobile-placeholder.svg',
      placeholderGradient: 'from-cyan-500 to-teal-400',
      tags: ['Flutter', 'Dart', 'Riverpod', 'Clean Architecture', 'Firebase', 'OpenStreetMap'],
      category: 'mobile' as const,
      url: 'https://xplora-travel.net/trips',
    },
    {
      id: 'domino-app',
      title: 'Anotar Dominó - Capicúa',
      description: {
        en: 'Flutter app for iOS & Android to track dominó matches. Features AI-powered tile detection via camera (Gemini), team/individual modes, special plays (Capicúa), match history, AdMob integration and dark/light themes.',
        es: 'App Flutter para iOS y Android para anotar partidas de dominó. Incluye detección de fichas por cámara con IA (Gemini), modos individual y parejas, jugadas especiales (Capicúa), historial, AdMob y temas oscuro/claro.',
      } as LocalizedString,
      image: '/projects/domino-placeholder.svg',
      placeholderGradient: 'from-amber-500 to-orange-400',
      tags: ['Flutter', 'Dart', 'Gemini AI', 'AdMob', 'Clean Architecture', 'Provider'],
      category: 'mobile' as const,
      url: '#',
    },
    {
      id: 'appstore-resizer',
      title: 'App Store Resizer',
      description: {
        en: '100% client-side web tool to resize screenshots, generate app icons, and create image sets for App Store Connect (iOS) and Google Play. Features an interactive crop editor, smart platform detection, bulk ZIP export, and supports all iOS/Android/watchOS/macOS icon sizes — no server, no uploads.',
        es: 'Herramienta web 100% client-side para redimensionar screenshots, generar íconos y crear image sets para App Store Connect (iOS) y Google Play. Incluye editor de recorte interactivo, detección automática de plataforma, exportación ZIP masiva y soporte completo de tamaños iOS/Android/watchOS/macOS — sin servidor ni subidas.',
      } as LocalizedString,
      image: '/projects/appstore-resizer-placeholder.svg',
      placeholderGradient: 'from-sky-500 to-green-400',
      tags: ['Next.js', 'TypeScript', 'Canvas API', 'JSZip', 'Tailwind CSS', 'Vercel'],
      category: 'web' as const,
      url: 'https://app-store-resizer.vercel.app/',
    },
    {
      id: 'gestor-citas',
      title: 'Gestor de Citas — API',
      description: {
        en: 'Multi-tenant backend API for barbershop & salon appointment management. Built with Express.js: full auth (email/username, refresh tokens), role-based user management, appointment CRUD, dynamic service pricing, real-time push notifications via FCM, email confirmation, and Swagger UI docs. Ready for Vercel deploy.',
        es: 'API backend multi-tenant para gestión de citas en barberías y salones de belleza. Construido con Express.js: autenticación completa (email/username, refresh tokens), gestión de usuarios por roles, CRUD de citas, precios dinámicos, notificaciones push en tiempo real vía FCM, confirmación por email y documentación Swagger UI.',
      } as LocalizedString,
      image: '/projects/gestor-citas-placeholder.svg',
      placeholderGradient: 'from-emerald-600 to-green-400',
      tags: ['Express.js', 'Node.js', 'JWT', 'FCM', 'Swagger', 'REST API', 'Multi-tenant'],
      category: 'web' as const,
      url: '#',
    },
    {
      id: 'barbershop-app',
      title: 'Barbershop Booking App',
      description: {
        en: 'Full-featured Flutter app for barbershop reservations with multi-role system (Client, Employee, Manager). Features OAuth (Google, Apple, Guest), dynamic pricing by age group, walk-in appointment creation, real-time FCM notifications, employee dashboards, and business analytics for managers.',
        es: 'App Flutter completa para reservas de barbería con sistema multi-rol (Cliente, Empleado, Manager). Incluye OAuth (Google, Apple, invitado), precios dinámicos por grupo de edad, citas walk-in, notificaciones FCM en tiempo real, panel para empleados y analíticas de negocio para managers.',
      } as LocalizedString,
      image: '/projects/barbershop-placeholder.svg',
      placeholderGradient: 'from-pink-600 to-orange-400',
      tags: ['Flutter', 'Dart', 'Firebase', 'FCM', 'Google OAuth', 'Clean Architecture', 'Provider'],
      category: 'mobile' as const,
      url: '#',
    },
    {
      id: 'loancore',
      title: 'LoanCore SaaS',
      description: {
        en: 'Multi-tenant loan & membership management platform built on Clean Architecture, DDD and CQRS. Features dual-gate authorization, concurrent session control, integrated helpdesk chat, and a Next.js 16 frontend with Shadcn UI.',
        es: 'Plataforma SaaS multi-tenant de gestión de préstamos y membresías bajo Clean Architecture, DDD y CQRS. Autorización dual, control de sesiones concurrentes, helpdesk integrado y frontend Next.js 16 con Shadcn UI.',
      } as LocalizedString,
      image: '/projects/loancore-placeholder.svg',
      placeholderGradient: 'from-violet-600 to-purple-400',
      tags: ['.NET Core', 'Clean Architecture', 'CQRS', 'DDD', 'Next.js', 'PostgreSQL', 'JWT', 'MediatR'],
      category: 'architecture' as const,
      url: 'https://portal.loancore.net/es',
    },
  ],

  experience: [
    {
      role: { en: 'Senior Fullstack Engineer', es: 'Ingeniero Fullstack Senior' } as LocalizedString,
      company: 'Humano Seguros',
      period: 'Feb 2024 – Present',
      location: 'República Dominicana (Remoto)',
      description: {
        en: 'Improved the codebase by fixing critical bugs with TypeScript and Jest. Designed and integrated services for mobile, web, and desktop platforms on Azure Cloud. Built high-performance backend apps with .NET Core and improved scalability via microservices architecture.',
        es: 'Mejoré el código base corrigiendo errores críticos con TypeScript y Jest. Diseñé e integré servicios para plataformas móvil, web y escritorio en Azure Cloud. Construí apps backend de alto rendimiento con .NET Core y mejoré la escalabilidad con arquitectura de microservicios.',
      } as LocalizedString,
      tech: ['.NET Core', 'React 18', 'Angular', 'NestJS', 'Node.js', 'SQL Server', 'MongoDB', 'PostgreSQL', 'Azure Cloud', 'Docker'],
    },
    {
      role: { en: 'Fullstack Engineer', es: 'Ingeniero Fullstack' } as LocalizedString,
      company: 'Wepsys SRL',
      period: 'Feb 2022 – Feb 2024',
      location: 'República Dominicana (Híbrido)',
      description: {
        en: 'Developed and maintained web apps with Angular and .NET Core. Implemented RabbitMQ messaging, BPMN.js process automation, and migrated to Microsoft services including Dynamics 365 CRM. Used Power BI for advanced analytics.',
        es: 'Desarrollé y mantuve aplicaciones web con Angular y .NET Core. Implementé mensajería con RabbitMQ, automatización con BPMN.js y migré a servicios Microsoft incluyendo Dynamics 365 CRM. Usé Power BI para análisis avanzado.',
      } as LocalizedString,
      tech: ['Angular', '.NET Core', 'Node.js', 'React', 'Flutter', 'Swift', 'Java', 'RabbitMQ', 'MongoDB', 'Docker'],
    },
    {
      role: { en: 'Backend Engineer / Dynamics 365 Developer', es: 'Ingeniero Backend / Desarrollador Dynamics 365' } as LocalizedString,
      company: 'LogicOne SRL',
      period: 'Aug 2017 – May 2022',
      location: 'República Dominicana (Presencial)',
      description: {
        en: 'Developed RESTful APIs as backend for web applications, improving scalability and reducing latency by 10%. Implemented Dynamics 365 CRM and Power BI solutions.',
        es: 'Desarrollé APIs RESTful como backend para aplicaciones web, mejorando la escalabilidad y reduciendo la latencia en un 10%. Implementé soluciones de Dynamics 365 CRM y Power BI.',
      } as LocalizedString,
      tech: ['.NET Core', 'C#', 'Azure', 'Dynamics 365 CRM', 'Power BI', 'SQL Server', 'MySQL'],
    },
  ],

  testimonials: [
    {
      quote: {
        en: 'Miguel delivered beyond expectations — clean code, on time, and great communication.',
        es: 'Miguel entregó más allá de las expectativas — código limpio, a tiempo y gran comunicación.',
      } as LocalizedString,
      author: 'Cliente',
      title: { en: 'CEO at Company', es: 'CEO en Empresa' } as LocalizedString,
    },
  ],

  certifications: [
    { name: 'JavaScript Moderno', issuer: 'Udemy', year: 2022, url: '#' },
    { name: 'React.js & Next.js', issuer: 'Udemy', year: 2022, url: '#' },
    { name: 'NestJS & Node.js', issuer: 'Udemy', year: 2023, url: '#' },
    { name: 'Flutter', issuer: 'Udemy', year: 2023, url: '#' },
    { name: 'Prompt Engineering', issuer: 'Platzi', year: 2024, url: '#' },
    { name: 'Unit Testing con C# y .NET', issuer: 'Platzi', year: 2024, url: '#' },
  ],

  education: [
    { institution: 'UNAPEC', degree: { en: 'Software Engineering', es: 'Ingeniería de Software' } as LocalizedString, year: '' },
    { institution: 'ITLA', degree: { en: 'Programming & SQL Server', es: 'Programación & SQL Server' } as LocalizedString, year: '' },
  ],

  metrics: {
    years: 6,
    projects: 15,
    technologies: 20,
  },
} as const
