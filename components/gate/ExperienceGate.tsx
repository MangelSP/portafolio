// components/gate/ExperienceGate.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useThemeStore } from '@/store/themeStore'
import type { Theme, Locale } from '@/data/portfolioConfig'

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
          Miguel Angel
        </h1>
        <p className="text-gray-400 text-lg md:text-xl">
          {l({ en: 'Senior Full-Stack Engineer & Architect', es: 'Ingeniero Full-Stack Senior & Arquitecto' })}
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
