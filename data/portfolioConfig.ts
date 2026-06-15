// data/portfolioConfig.ts

export type LocalizedString = { en: string; es: string }
export type Theme = 'modern' | 'corporate' | 'dynamic'
export type Locale = 'en' | 'es'

export interface ProjectDetail {
  id: string
  title: string
  description: LocalizedString
  longDescription: LocalizedString
  image: string
  placeholderGradient: string
  tags: readonly string[]
  category: 'web' | 'mobile' | 'architecture'
  url: string
  github?: string
  appStore?: string
  playStore?: string
  features: { icon: string; title: LocalizedString; desc: LocalizedString }[]
  stack: { layer: LocalizedString; techs: string[] }[]
  screenshots: string[]
}

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
      title: 'Xplora Travel',
      description: {
        en: 'Bilingual SaaS ecosystem for Dominican tourism: NestJS backend (25 modules), Next.js web app (60+ routes), and Flutter mobile app with interactive maps, Stripe billing and real-time reservations.',
        es: 'Ecosistema SaaS bilingüe para el turismo dominicano: backend NestJS (25 módulos), app web Next.js (60+ rutas) y app móvil Flutter con mapas interactivos, Stripe y reservas en tiempo real.',
      } as LocalizedString,
      longDescription: {
        en: 'Xplora Travel is a full-stack SaaS platform built to modernize the Dominican tourism industry. It connects travelers, agencies, and drivers in one bilingual ecosystem. The backend is a modular NestJS monolith with 25 independent modules covering auth, reservations, notifications, analytics, billing, and more. The web app has 60+ routes built with Next.js 14 App Router, server actions and optimistic UI. The mobile app is a Flutter application following Clean Architecture with Riverpod for state management.',
        es: 'Xplora Travel es una plataforma SaaS full-stack creada para modernizar el turismo dominicano. Conecta viajeros, agencias y conductores en un ecosistema bilingüe. El backend es un monolito modular NestJS con 25 módulos independientes que cubren auth, reservas, notificaciones, analíticas, facturación y más. La web tiene 60+ rutas construidas con Next.js 14 App Router, server actions y UI optimista. La app móvil usa Flutter con Clean Architecture y Riverpod.',
      } as LocalizedString,
      image: '/projects/travel-rd-placeholder.svg',
      placeholderGradient: 'from-blue-500 to-cyan-400',
      tags: ['NestJS', 'Next.js', 'Flutter', 'PostgreSQL', 'Stripe', 'Firebase', 'Redis', 'BullMQ'],
      category: 'web' as const,
      url: 'https://xplora-travel.net/trips',
      features: [
        {
          icon: '🗺️',
          title: { en: 'Interactive Maps', es: 'Mapas Interactivos' },
          desc: { en: 'OpenStreetMap with real-time driver tracking and route visualization.', es: 'OpenStreetMap con rastreo de conductores en tiempo real y visualización de rutas.' },
        },
        {
          icon: '💳',
          title: { en: 'Stripe Billing', es: 'Facturación Stripe' },
          desc: { en: 'Subscription plans, one-time payments and invoicing for agencies.', es: 'Planes de suscripción, pagos únicos y facturación para agencias.' },
        },
        {
          icon: '🔔',
          title: { en: 'Push Notifications', es: 'Notificaciones Push' },
          desc: { en: 'Real-time FCM notifications for reservation updates and alerts.', es: 'Notificaciones FCM en tiempo real para actualizaciones de reservas y alertas.' },
        },
        {
          icon: '📊',
          title: { en: 'Agency Analytics', es: 'Analíticas de Agencia' },
          desc: { en: 'Dashboard with revenue, bookings, and customer metrics per agency.', es: 'Panel con ingresos, reservas y métricas de clientes por agencia.' },
        },
        {
          icon: '🌐',
          title: { en: 'Bilingual (EN/ES)', es: 'Bilingüe (EN/ES)' },
          desc: { en: 'Full localization across web and mobile for English and Spanish.', es: 'Localización completa en web y móvil para inglés y español.' },
        },
        {
          icon: '⚡',
          title: { en: 'BullMQ Queues', es: 'Colas BullMQ' },
          desc: { en: 'Background jobs for email, notifications and async processing with Redis.', es: 'Jobs en background para emails, notificaciones y procesamiento asíncrono con Redis.' },
        },
      ],
      stack: [
        { layer: { en: 'Backend', es: 'Backend' }, techs: ['NestJS', 'Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'BullMQ', 'TypeORM', 'Docker'] },
        { layer: { en: 'Frontend', es: 'Frontend' }, techs: ['Next.js 14', 'React', 'Tailwind CSS', 'Zustand', 'Server Actions'] },
        { layer: { en: 'Mobile', es: 'Mobile' }, techs: ['Flutter', 'Dart', 'Riverpod', 'Clean Architecture', 'OpenStreetMap'] },
        { layer: { en: 'Services', es: 'Servicios' }, techs: ['Stripe', 'Firebase FCM', 'Azure Cloud', 'Vercel'] },
      ],
      screenshots: [
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-auth-login-2026-06-15-10_38_42.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-auth-register-2026-06-15-10_39_00.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-auth-forgot-password-2026-06-15-10_38_47.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-auth-disable-2fa-2026-06-15-10_38_53.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-trips-cmq70d9st000301nwtwf2nsn5-2026-06-15-10_37_29.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-trips-cmq70d9st000301nwtwf2nsn5-2026-06-15-10_37_39.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-trips-cmq70d9st000301nwtwf2nsn5-2026-06-15-10_37_52.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-trips-cmq70d9st000301nwtwf2nsn5-2026-06-15-10_37_59.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-trips-cmq70d9st000301nwtwf2nsn5-2026-06-15-10_38_09.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-trips-cmq70d9st000301nwtwf2nsn5-2026-06-15-10_38_34.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-overview-2026-06-15-10_39_15.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-overview-2026-06-15-10_39_20.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-overview-2026-06-15-10_45_14.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-calendar-2026-06-15-10_39_48.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-calendar-2026-06-15-10_39_56.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-trips-2026-06-15-10_39_32.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-trips-2026-06-15-10_39_38.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-trips-cmq70d9st000301nwtwf2nsn5-2026-06-15-10_45_41.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-trips-cmq70d9st000301nwtwf2nsn5-2026-06-15-10_46_06.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-trips-cmq70d9st000301nwtwf2nsn5-2026-06-15-10_46_26.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-my-trips-2026-06-15-10_40_05.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-my-trips-2026-06-15-10_40_10.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-my-trips-2026-06-15-10_40_29.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-my-trips-cmq70d9st000301nwtwf2nsn5-attendance-2026-06-15-10_40_19.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-my-trips-cmqfblsy2000g01od4rp3fb33-edit-2026-06-15-10_40_39.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-my-trips-cmqfblsy2000g01od4rp3fb33-edit-2026-06-15-10_40_46.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-private-trips-inbox-2026-06-15-10_41_30.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-analytics-2026-06-15-10_41_13.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-analytics-2026-06-15-10_41_25.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-cancellations-2026-06-15-10_42_13.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-customers-2026-06-15-10_42_18.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-customer-groups-2026-06-15-10_42_28.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-offers-2026-06-15-10_42_42.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-gallery-2026-06-15-10_42_52.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-reservations-2026-06-15-10_43_01.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-reservations-2026-06-15-10_46_15.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-support-2026-06-15-10_43_07.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-support-2026-06-15-10_47_18.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-support-2026-06-15-10_47_23.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-notifications-2026-06-15-10_43_13.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-notifications-2026-06-15-10_43_18.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-profile-2026-06-15-10_43_33.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-profile-2026-06-15-10_43_41.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-profile-2026-06-15-10_43_46.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-profile-2026-06-15-10_43_55.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-profile-2026-06-15-10_44_13.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-profile-2026-06-15-10_44_19.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-profile-2026-06-15-10_44_26.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-profile-2026-06-15-10_47_36.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-agency-cmplllra2000c01mmot2bkesq-2026-06-15-10_46_34.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-private-trips-2026-06-15-10_46_48.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-my-private-requests-2026-06-15-10_46_59.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-following-2026-06-15-10_47_03.png',
        '/projects/xplora-travel-images/web/screencapture-xplora-travel-net-dashboard-badges-2026-06-15-10_47_08.png',
      ],
    },
    {
      id: 'travel-rd-mobile',
      title: 'Xplora Travel Mobile',
      description: {
        en: 'Native cross-platform Flutter app for Xplora Travel with Clean Architecture, Riverpod, interactive maps, FCM push notifications, agency analytics dashboard, and offline image caching.',
        es: 'App Flutter multiplataforma para Xplora Travel con Clean Architecture, Riverpod, mapas interactivos, notificaciones push FCM, panel de analíticas para agencias y caché de imágenes offline.',
      } as LocalizedString,
      longDescription: {
        en: 'The Xplora Travel mobile app is the companion application for the Xplora Travel ecosystem, available for both iOS and Android. Built with Flutter and following Clean Architecture principles, it provides travelers and agencies with a seamless experience to browse destinations, book trips, track drivers in real time, and manage reservations. Offline-first caching ensures a smooth experience even with limited connectivity.',
        es: 'La app móvil de Xplora Travel es la aplicación complementaria del ecosistema Xplora Travel, disponible para iOS y Android. Construida con Flutter y siguiendo principios de Clean Architecture, ofrece a viajeros y agencias una experiencia fluida para explorar destinos, reservar viajes, rastrear conductores en tiempo real y gestionar reservas. El caché offline garantiza una experiencia suave incluso con conectividad limitada.',
      } as LocalizedString,
      image: '/projects/travel-rd-mobile-placeholder.svg',
      placeholderGradient: 'from-cyan-500 to-teal-400',
      tags: ['Flutter', 'Dart', 'Riverpod', 'Clean Architecture', 'Firebase', 'OpenStreetMap'],
      category: 'mobile' as const,
      url: 'https://xplora-travel.net/trips',
      features: [
        {
          icon: '🏗️',
          title: { en: 'Clean Architecture', es: 'Clean Architecture' },
          desc: { en: 'Domain, data and presentation layers fully decoupled for scalability.', es: 'Capas de dominio, datos y presentación totalmente desacopladas para escalabilidad.' },
        },
        {
          icon: '📍',
          title: { en: 'Real-time Tracking', es: 'Rastreo en Tiempo Real' },
          desc: { en: 'Live driver location on interactive OpenStreetMap.', es: 'Ubicación del conductor en vivo sobre OpenStreetMap interactivo.' },
        },
        {
          icon: '🔔',
          title: { en: 'FCM Notifications', es: 'Notificaciones FCM' },
          desc: { en: 'Push alerts for booking confirmations, updates and reminders.', es: 'Alertas push para confirmaciones de reserva, actualizaciones y recordatorios.' },
        },
        {
          icon: '📈',
          title: { en: 'Analytics Dashboard', es: 'Panel de Analíticas' },
          desc: { en: 'Agency-specific metrics: revenue, trips completed, ratings.', es: 'Métricas por agencia: ingresos, viajes completados, calificaciones.' },
        },
        {
          icon: '📦',
          title: { en: 'Offline Caching', es: 'Caché Offline' },
          desc: { en: 'Images and data cached locally for low-connectivity scenarios.', es: 'Imágenes y datos cacheados localmente para escenarios de baja conectividad.' },
        },
        {
          icon: '🔐',
          title: { en: 'Secure Auth', es: 'Auth Segura' },
          desc: { en: 'JWT with refresh token rotation and biometric unlock support.', es: 'JWT con rotación de refresh tokens y soporte de desbloqueo biométrico.' },
        },
      ],
      stack: [
        { layer: { en: 'Framework', es: 'Framework' }, techs: ['Flutter', 'Dart'] },
        { layer: { en: 'State Management', es: 'Estado' }, techs: ['Riverpod', 'Clean Architecture', 'Repository Pattern'] },
        { layer: { en: 'Maps & Location', es: 'Mapas & Ubicación' }, techs: ['flutter_map', 'OpenStreetMap', 'Geolocator'] },
        { layer: { en: 'Services', es: 'Servicios' }, techs: ['Firebase FCM', 'Dio', 'Hive (offline cache)'] },
      ],
      screenshots: [
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 09.36.54.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 09.37.46.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.14.42.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.14.47.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.14.52.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.14.57.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.15.03.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.15.07.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.15.11.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.15.21.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.15.27.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.15.37.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.15.45.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.15.59.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.16.18.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.16.35.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.17.17.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.17.35.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.17.45.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.18.24.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.18.27.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.18.32.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.18.37.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.18.59.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.19.27.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.19.46.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.19.49.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.19.58.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.20.06.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.20.12.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.20.20.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.20.26.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.20.34.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.20.48.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.21.03.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.21.11.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.21.18.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.21.29.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.21.40.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.22.22.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.22.27.png',
        '/projects/xplora-travel-images/mobile/Simulator Screenshot - iPhone 17 - 2026-06-15 at 10.22.32.png',
      ],
    },
    {
      id: 'domino-app',
      title: 'Anotar Dominó - Capicúa',
      description: {
        en: 'Flutter app for iOS & Android to track dominó matches. Team/individual modes, special plays (Capicúa), match history, AdMob integration and dark/light themes.',
        es: 'App Flutter para iOS y Android para anotar partidas de dominó. Modos individual y parejas, jugadas especiales (Capicúa), historial, AdMob y temas oscuro/claro.',
      } as LocalizedString,
      longDescription: {
        en: 'Anotar Dominó - Capicúa is a Flutter mobile app that digitizes the experience of tracking dominó games, the most popular card game in the Dominican Republic. The app supports individual and team modes, tracks special plays like Capicúa (winning with double ends), maintains full match history, and integrates AdMob for monetization.',
        es: 'Anotar Dominó - Capicúa es una app Flutter que digitaliza la experiencia de anotar partidas de dominó, el juego de mesa más popular en República Dominicana. La app soporta modos individual y parejas, registra jugadas especiales como Capicúa (ganar con extremos dobles), mantiene historial completo e integra AdMob para monetización.',
      } as LocalizedString,
      image: '/projects/domino-placeholder.svg',
      placeholderGradient: 'from-amber-500 to-orange-400',
      tags: ['Flutter', 'Dart', 'AdMob', 'Clean Architecture', 'Provider'],
      category: 'mobile' as const,
      url: '#',
      appStore: 'https://apps.apple.com/do/app/anota-domin%C3%B3/id6750581858?l=en-GB',
      playStore: 'https://play.google.com/store/apps/details?id=com.mangeldevs.anotar_domino_juega_capicua&pcampaignid=web_share',
      features: [
        {
          icon: '👥',
          title: { en: 'Team & Individual Modes', es: 'Modos Parejas & Individual' },
          desc: { en: 'Play 1v1, 2v2 or free-for-all with custom player names.', es: 'Juega 1v1, 2v2 o todos contra todos con nombres personalizados.' },
        },
        {
          icon: '🏆',
          title: { en: 'Capicúa & Special Plays', es: 'Capicúa & Jugadas Especiales' },
          desc: { en: 'Automatic detection of Capicúa and other bonus plays with score multipliers.', es: 'Detección automática de Capicúa y otras jugadas con multiplicadores de puntaje.' },
        },
        {
          icon: '📋',
          title: { en: 'Match History', es: 'Historial de Partidas' },
          desc: { en: 'Full log of past matches with scores, winner and duration.', es: 'Registro completo de partidas anteriores con puntajes, ganador y duración.' },
        },
        {
          icon: '💰',
          title: { en: 'AdMob Integration', es: 'Integración AdMob' },
          desc: { en: 'Banner and interstitial ads for sustainable app monetization.', es: 'Anuncios banner e intersticiales para monetización sostenible de la app.' },
        },
        {
          icon: '🌙',
          title: { en: 'Dark / Light Themes', es: 'Temas Oscuro / Claro' },
          desc: { en: 'Automatic theme detection with manual override option.', es: 'Detección automática del tema con opción de cambio manual.' },
        },
      ],
      stack: [
        { layer: { en: 'Framework', es: 'Framework' }, techs: ['Flutter', 'Dart'] },
        { layer: { en: 'State & Architecture', es: 'Estado & Arquitectura' }, techs: ['Provider', 'Clean Architecture', 'Repository Pattern'] },
        { layer: { en: 'Monetization', es: 'Monetización' }, techs: ['Google AdMob', 'In-app purchases'] },
      ],
      screenshots: [
        '/projects/domino-images/Simulator Screenshot - iPhone 17 - 2026-06-14 at 23.02.06.png',
        '/projects/domino-images/Simulator Screenshot - iPhone 17 - 2026-06-14 at 23.02.08.png',
        '/projects/domino-images/Simulator Screenshot - iPhone 17 - 2026-06-14 at 23.02.19.png',
        '/projects/domino-images/Simulator Screenshot - iPhone 17 - 2026-06-14 at 23.02.23.png',
        '/projects/domino-images/Simulator Screenshot - iPhone 17 - 2026-06-14 at 23.02.27.png',
        '/projects/domino-images/Simulator Screenshot - iPhone 17 - 2026-06-14 at 23.02.33.png',
        '/projects/domino-images/Simulator Screenshot - iPhone 17 - 2026-06-14 at 23.02.37.png',
        '/projects/domino-images/Simulator Screenshot - iPhone 17 - 2026-06-14 at 23.02.43.png',
        '/projects/domino-images/Simulator Screenshot - iPhone 17 - 2026-06-14 at 23.02.46.png',
        '/projects/domino-images/Simulator Screenshot - iPhone 17 - 2026-06-14 at 23.02.49.png',
      ],
    },
    {
      id: 'appstore-resizer',
      title: 'App Store Resizer',
      description: {
        en: '100% client-side web tool to resize screenshots, generate app icons, and create image sets for App Store Connect (iOS) and Google Play. No server, no uploads.',
        es: 'Herramienta web 100% client-side para redimensionar screenshots, generar íconos y crear image sets para App Store Connect (iOS) y Google Play. Sin servidor ni subidas.',
      } as LocalizedString,
      longDescription: {
        en: 'App Store Resizer is a privacy-first developer tool that runs entirely in the browser. All image processing happens locally using the Canvas API — no images are ever sent to a server. It was built to solve a real pain point: preparing screenshots and icons for App Store Connect and Google Play requires specific sizes for dozens of device types, which is tedious to do manually. The tool automates this completely, from a single source image to a ready-to-submit ZIP.',
        es: 'App Store Resizer es una herramienta para desarrolladores que prioriza la privacidad y funciona completamente en el navegador. Todo el procesamiento de imágenes ocurre localmente usando Canvas API — ninguna imagen se envía a un servidor. Fue creada para resolver un problema real: preparar screenshots e íconos para App Store Connect y Google Play requiere tamaños específicos para docenas de tipos de dispositivos, lo que es tedioso de hacer manualmente.',
      } as LocalizedString,
      image: '/projects/appstore-resizer-placeholder.svg',
      placeholderGradient: 'from-sky-500 to-green-400',
      tags: ['Next.js', 'TypeScript', 'Canvas API', 'JSZip', 'Tailwind CSS', 'Vercel'],
      category: 'web' as const,
      url: 'https://app-store-resizer.vercel.app/',
      features: [
        {
          icon: '🔒',
          title: { en: '100% Client-Side', es: '100% Client-Side' },
          desc: { en: 'All processing in-browser via Canvas API. No uploads, no servers, full privacy.', es: 'Todo el procesamiento en el navegador vía Canvas API. Sin subidas, sin servidores, privacidad total.' },
        },
        {
          icon: '✂️',
          title: { en: 'Interactive Crop Editor', es: 'Editor de Recorte Interactivo' },
          desc: { en: 'Visually adjust crop for each device size before exporting.', es: 'Ajusta visualmente el recorte para cada tamaño de dispositivo antes de exportar.' },
        },
        {
          icon: '🎯',
          title: { en: 'Smart Auto-Detection', es: 'Auto-Detección Inteligente' },
          desc: { en: 'Detects the best platform and resolution match for your input image.', es: 'Detecta la mejor plataforma y resolución para tu imagen de entrada.' },
        },
        {
          icon: '📦',
          title: { en: 'Bulk ZIP Export', es: 'Exportación ZIP Masiva' },
          desc: { en: 'Download all assets in one organized ZIP, ready for Xcode or Android Studio.', es: 'Descarga todos los assets en un ZIP organizado, listo para Xcode o Android Studio.' },
        },
        {
          icon: '📱',
          title: { en: 'All iOS Sizes', es: 'Todos los Tamaños iOS' },
          desc: { en: 'iPhone, iPad, Apple Watch Ultra, macOS icons and App Store screenshots.', es: 'iPhone, iPad, Apple Watch Ultra, íconos macOS y screenshots de App Store.' },
        },
        {
          icon: '🤖',
          title: { en: 'Full Android Support', es: 'Soporte Android Completo' },
          desc: { en: 'mdpi to xxxhdpi launcher icons, Play Store banner and all screen sizes.', es: 'Íconos launcher mdpi a xxxhdpi, banner Play Store y todos los tamaños de pantalla.' },
        },
      ],
      stack: [
        { layer: { en: 'Frontend', es: 'Frontend' }, techs: ['Next.js', 'TypeScript', 'Tailwind CSS'] },
        { layer: { en: 'Image Processing', es: 'Procesamiento de Imagen' }, techs: ['Canvas API', 'Browser File API', 'Blob API'] },
        { layer: { en: 'Export', es: 'Exportación' }, techs: ['JSZip', 'FileSaver.js'] },
        { layer: { en: 'Deployment', es: 'Despliegue' }, techs: ['Vercel', 'Edge Network'] },
      ],
      screenshots: [
        '/projects/appstore-resizer-images/web/screencapture-app-store-resizer-vercel-app-2026-06-15-11_44_39.png',
        '/projects/appstore-resizer-images/web/screencapture-app-store-resizer-vercel-app-2026-06-15-11_44_45.png',
        '/projects/appstore-resizer-images/web/screencapture-app-store-resizer-vercel-app-2026-06-15-11_44_50.png',
      ],
    },
    {
      id: 'gestor-citas',
      title: 'Gestor de Citas — API',
      description: {
        en: 'Multi-tenant backend API for barbershop & salon appointment management. Built with Express.js: full auth, role-based users, appointment CRUD, FCM push notifications and Swagger docs.',
        es: 'API backend multi-tenant para gestión de citas en barberías y salones. Construido con Express.js: auth completa, usuarios por roles, CRUD de citas, notificaciones FCM y Swagger.',
      } as LocalizedString,
      longDescription: {
        en: 'Gestor de Citas is a production-ready backend API for managing barbershop and beauty salon appointments. Built as a multi-tenant system, each barbershop has its own isolated data space. The API handles the complete lifecycle: client registration, service catalog, appointment booking, status updates, and automated reminders via Firebase Cloud Messaging. A Swagger UI is integrated for easy exploration and client integration.',
        es: 'Gestor de Citas es una API backend lista para producción para gestionar citas en barberías y salones de belleza. Construida como sistema multi-tenant, cada barbería tiene su propio espacio de datos aislado. La API maneja el ciclo completo: registro de clientes, catálogo de servicios, reserva de citas, actualizaciones de estado y recordatorios automatizados vía Firebase Cloud Messaging. Incluye Swagger UI para exploración y documentación.',
      } as LocalizedString,
      image: '/projects/gestor-citas-placeholder.svg',
      placeholderGradient: 'from-emerald-600 to-green-400',
      tags: ['Express.js', 'Node.js', 'JWT', 'FCM', 'Swagger', 'REST API', 'Multi-tenant'],
      category: 'web' as const,
      url: '#',
      features: [
        {
          icon: '🔐',
          title: { en: 'Complete Auth System', es: 'Sistema de Auth Completo' },
          desc: { en: 'Login with email or username, refresh tokens, logout and password recovery.', es: 'Login con email o username, refresh tokens, logout y recuperación de contraseña.' },
        },
        {
          icon: '🏢',
          title: { en: 'Multi-tenant', es: 'Multi-tenant' },
          desc: { en: 'Each barbershop has isolated data, staff and configuration.', es: 'Cada barbería tiene datos, personal y configuración aislados.' },
        },
        {
          icon: '📅',
          title: { en: 'Appointment CRUD', es: 'CRUD de Citas' },
          desc: { en: 'Full lifecycle: create, read, update, cancel with status tracking.', es: 'Ciclo completo: crear, leer, actualizar, cancelar con seguimiento de estado.' },
        },
        {
          icon: '💈',
          title: { en: 'Dynamic Pricing', es: 'Precios Dinámicos' },
          desc: { en: 'Service categories with configurable prices per salon and service type.', es: 'Categorías de servicios con precios configurables por salón y tipo de servicio.' },
        },
        {
          icon: '🔔',
          title: { en: 'FCM Notifications', es: 'Notificaciones FCM' },
          desc: { en: 'Real-time push alerts for appointment reminders and status changes.', es: 'Alertas push en tiempo real para recordatorios de citas y cambios de estado.' },
        },
        {
          icon: '📖',
          title: { en: 'Swagger UI Docs', es: 'Documentación Swagger UI' },
          desc: { en: 'Interactive API documentation for all endpoints with example payloads.', es: 'Documentación interactiva de todos los endpoints con payloads de ejemplo.' },
        },
      ],
      stack: [
        { layer: { en: 'API', es: 'API' }, techs: ['Express.js', 'Node.js', 'TypeScript'] },
        { layer: { en: 'Auth & Security', es: 'Auth & Seguridad' }, techs: ['JWT', 'bcrypt', 'Refresh Tokens', 'Role-based Access'] },
        { layer: { en: 'Database', es: 'Base de Datos' }, techs: ['PostgreSQL', 'Prisma ORM'] },
        { layer: { en: 'Services', es: 'Servicios' }, techs: ['Firebase FCM', 'Nodemailer', 'Swagger UI', 'Vercel'] },
      ],
      screenshots: [],
    },
    {
      id: 'barbershop-app',
      title: 'Barbershop Booking App',
      description: {
        en: 'Full-featured Flutter app for barbershop reservations with multi-role system (Client, Employee, Manager), OAuth, dynamic pricing by age group, walk-in appointments and real-time FCM notifications.',
        es: 'App Flutter completa para reservas de barbería con sistema multi-rol (Cliente, Empleado, Manager), OAuth, precios dinámicos por edad, citas walk-in y notificaciones FCM en tiempo real.',
      } as LocalizedString,
      longDescription: {
        en: 'Barbershop Booking App is the Flutter companion to the Gestor de Citas API. It provides three completely different experiences based on the user role: Clients browse services and book appointments, Employees manage their daily schedule and update appointment status, and Managers get a full business dashboard with walk-in creation, staff management, and analytics. Google and Apple OAuth are supported alongside traditional email/password login.',
        es: 'Barbershop Booking App es la app Flutter complementaria a la API Gestor de Citas. Provee tres experiencias completamente diferentes según el rol del usuario: los Clientes exploran servicios y reservan citas, los Empleados gestionan su agenda diaria y actualizan el estado de citas, y los Managers tienen un panel de negocio completo con creación de walk-ins, gestión de personal y analíticas.',
      } as LocalizedString,
      image: '/projects/barbershop-placeholder.svg',
      placeholderGradient: 'from-pink-600 to-orange-400',
      tags: ['Flutter', 'Dart', 'Firebase', 'FCM', 'Google OAuth', 'Clean Architecture', 'Provider'],
      category: 'mobile' as const,
      url: '#',
      features: [
        {
          icon: '👥',
          title: { en: 'Multi-Role System', es: 'Sistema Multi-Rol' },
          desc: { en: 'Client, Employee and Manager roles with completely different UX per role.', es: 'Roles Cliente, Empleado y Manager con UX completamente diferente por rol.' },
        },
        {
          icon: '🔐',
          title: { en: 'OAuth Login', es: 'Login OAuth' },
          desc: { en: 'Google, Apple and Guest access with full role-based permission control.', es: 'Acceso con Google, Apple e invitado con control de permisos por rol.' },
        },
        {
          icon: '🚶',
          title: { en: 'Walk-In System', es: 'Sistema Walk-In' },
          desc: { en: 'Managers create instant appointments for unregistered clients with minimal info.', es: 'Los managers crean citas instantáneas para clientes no registrados con info mínima.' },
        },
        {
          icon: '💰',
          title: { en: 'Dynamic Pricing by Age', es: 'Precios Dinámicos por Edad' },
          desc: { en: 'Automatic price calculation for child, teen and adult service tiers.', es: 'Cálculo automático de precios para niveles infantil, adolescente y adulto.' },
        },
        {
          icon: '🔔',
          title: { en: 'Real-time Notifications', es: 'Notificaciones en Tiempo Real' },
          desc: { en: 'FCM alerts for new bookings, status changes and walk-in assignments.', es: 'Alertas FCM para nuevas reservas, cambios de estado y asignaciones walk-in.' },
        },
        {
          icon: '📊',
          title: { en: 'Business Analytics', es: 'Analíticas de Negocio' },
          desc: { en: 'Manager dashboard with revenue, staff performance and appointment metrics.', es: 'Panel de manager con ingresos, rendimiento del personal y métricas de citas.' },
        },
      ],
      stack: [
        { layer: { en: 'Framework', es: 'Framework' }, techs: ['Flutter', 'Dart'] },
        { layer: { en: 'Auth', es: 'Auth' }, techs: ['Google OAuth', 'Apple Sign-In', 'Firebase Auth'] },
        { layer: { en: 'State & Architecture', es: 'Estado & Arquitectura' }, techs: ['Provider', 'Clean Architecture', 'Repository Pattern'] },
        { layer: { en: 'Services', es: 'Servicios' }, techs: ['Firebase FCM', 'REST API (Dio)', 'Google Maps'] },
      ],
      screenshots: [],
    },
    {
      id: 'loancore',
      title: 'LoanCore SaaS',
      description: {
        en: 'Multi-tenant loan & membership management platform built on Clean Architecture, DDD and CQRS. Features dual-gate authorization, concurrent session control, integrated helpdesk chat, and a Next.js frontend with Shadcn UI.',
        es: 'Plataforma SaaS multi-tenant de gestión de préstamos y membresías bajo Clean Architecture, DDD y CQRS. Autorización dual, control de sesiones concurrentes, helpdesk integrado y frontend Next.js con Shadcn UI.',
      } as LocalizedString,
      longDescription: {
        en: 'LoanCore is a production SaaS platform used by financial cooperatives and lending companies in the Dominican Republic. Built on .NET Core with Clean Architecture, DDD and CQRS via MediatR, it handles the complete loan lifecycle: member onboarding, credit evaluation, loan disbursement, payment tracking, and collections. The dual-gate authorization system separates platform-level admin from tenant-level manager access. Concurrent session control prevents account sharing.',
        es: 'LoanCore es una plataforma SaaS en producción usada por cooperativas financieras y empresas de préstamos en República Dominicana. Construido sobre .NET Core con Clean Architecture, DDD y CQRS vía MediatR, maneja el ciclo completo del préstamo: incorporación de socios, evaluación crediticia, desembolso, seguimiento de pagos y cobranza. El sistema de autorización dual separa el acceso admin a nivel plataforma del acceso manager a nivel tenant.',
      } as LocalizedString,
      image: '/projects/loancore-placeholder.svg',
      placeholderGradient: 'from-violet-600 to-purple-400',
      tags: ['.NET Core', 'Clean Architecture', 'CQRS', 'DDD', 'Next.js', 'PostgreSQL', 'JWT', 'MediatR'],
      category: 'architecture' as const,
      url: 'https://portal.loancore.net/es',
      features: [
        {
          icon: '🏗️',
          title: { en: 'Clean Arch + DDD + CQRS', es: 'Clean Arch + DDD + CQRS' },
          desc: { en: 'Fully decoupled layers with domain events, aggregates and MediatR command/query separation.', es: 'Capas totalmente desacopladas con eventos de dominio, agregados y separación comando/query con MediatR.' },
        },
        {
          icon: '🔐',
          title: { en: 'Dual-Gate Authorization', es: 'Autorización Dual' },
          desc: { en: 'Platform-level super-admin and tenant-level manager with separate JWT scopes.', es: 'Super-admin a nivel plataforma y manager a nivel tenant con scopes JWT separados.' },
        },
        {
          icon: '🔄',
          title: { en: 'Session Control', es: 'Control de Sesiones' },
          desc: { en: 'Concurrent session detection and enforcement — prevents account sharing.', es: 'Detección y control de sesiones concurrentes — previene el compartir cuentas.' },
        },
        {
          icon: '💬',
          title: { en: 'Helpdesk Chat', es: 'Chat de Helpdesk' },
          desc: { en: 'Integrated support chat between tenants and platform admin.', es: 'Chat de soporte integrado entre tenants y el admin de plataforma.' },
        },
        {
          icon: '💳',
          title: { en: 'Full Loan Lifecycle', es: 'Ciclo Completo de Préstamo' },
          desc: { en: 'Member onboarding, credit evaluation, disbursement, payments and collections.', es: 'Incorporación de socios, evaluación crediticia, desembolso, pagos y cobranza.' },
        },
        {
          icon: '🎨',
          title: { en: 'Next.js + Shadcn UI', es: 'Next.js + Shadcn UI' },
          desc: { en: 'Modern frontend with server components, dark mode and accessible UI components.', es: 'Frontend moderno con server components, modo oscuro y componentes UI accesibles.' },
        },
      ],
      stack: [
        { layer: { en: 'Backend', es: 'Backend' }, techs: ['.NET Core', 'C#', 'MediatR', 'Clean Architecture', 'CQRS', 'DDD'] },
        { layer: { en: 'Database', es: 'Base de Datos' }, techs: ['PostgreSQL', 'Entity Framework Core', 'Redis (sessions)'] },
        { layer: { en: 'Frontend', es: 'Frontend' }, techs: ['Next.js', 'TypeScript', 'Shadcn UI', 'Tailwind CSS'] },
        { layer: { en: 'Auth & Security', es: 'Auth & Seguridad' }, techs: ['JWT', 'Refresh Tokens', 'Role-based Access', 'Concurrent Session Control'] },
      ],
      screenshots: [],
    },
  ] as ProjectDetail[],

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
