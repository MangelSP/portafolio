// components/gate/ExperienceGate.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useThemeStore } from '@/store/themeStore'
import { useEffect, useRef, useState } from 'react'
import type { Theme, Locale } from '@/data/portfolioConfig'

// ── Floating tech particles in the background ──────────────────────────────
const TECH_WORDS = [
  '.NET', 'React', 'Flutter', 'NestJS', 'Azure', 'Docker',
  'Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Kubernetes',
  'GraphQL', 'Prisma', 'Tailwind', 'Node.js', 'Swift',
]

function Particle({ word, index }: { word: string; index: number }) {
  const x = (index * 137.5) % 100          // golden-angle spread
  const duration = 18 + (index % 7) * 3
  const delay = -(index * 2.1)
  const size = 10 + (index % 3) * 2

  return (
    <motion.span
      className="absolute font-mono text-white/10 select-none pointer-events-none whitespace-nowrap"
      style={{ left: `${x}%`, fontSize: size, top: '110%' }}
      animate={{ top: '-10%' }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {word}
    </motion.span>
  )
}

// ── Animated grid / mesh background ────────────────────────────────────────
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Radial glow center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(124,58,237,0.18),transparent)]" />
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

      {/* Floating particles */}
      {TECH_WORDS.map((w, i) => (
        <Particle key={w} word={w} index={i} />
      ))}

      {/* Animated orbiting ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-purple-500/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

// ── Theme card previews ─────────────────────────────────────────────────────
const themes: {
  id: Theme
  nameKey: { en: string; es: string }
  descKey: { en: string; es: string }
  accent: string
  preview: React.ReactNode
}[] = [
  {
    id: 'modern',
    nameKey: { en: 'MODERN', es: 'MODERNO' },
    descKey: { en: 'Minimal & Clean', es: 'Minimal & Limpio' },
    accent: '#e5e7eb',
    preview: (
      <svg viewBox="0 0 120 80" className="w-full h-20 opacity-70">
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
    descKey: { en: 'Clean & Precise', es: 'Profesional & Preciso' },
    accent: '#2563eb',
    preview: (
      <svg viewBox="0 0 120 80" className="w-full h-20 opacity-70">
        <rect x="8" y="8" width="104" height="12" rx="2" fill="#2563eb" opacity="0.5" />
        <rect x="8" y="26" width="104" height="8" rx="2" fill="#e2e8f0" />
        <rect x="8" y="40" width="104" height="8" rx="2" fill="#e2e8f0" />
        <rect x="8" y="54" width="104" height="8" rx="2" fill="#e2e8f0" />
        <rect x="8" y="68" width="60" height="6" rx="2" fill="#2563eb" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: 'dynamic',
    nameKey: { en: 'DYNAMIC', es: 'DINÁMICO' },
    descKey: { en: 'Bold & Animated', es: 'Audaz & Animado' },
    accent: '#7c3aed',
    preview: (
      <svg viewBox="0 0 120 80" className="w-full h-20 opacity-70">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <rect x="8" y="8" width="50" height="64" rx="8" fill="url(#grad)" opacity="0.8" />
        <rect x="64" y="8" width="48" height="28" rx="8" fill="url(#grad)" opacity="0.6" />
        <rect x="64" y="42" width="22" height="30" rx="8" fill="url(#grad)" opacity="0.5" />
        <rect x="90" y="42" width="22" height="30" rx="8" fill="url(#grad)" opacity="0.5" />
      </svg>
    ),
  },
]

// ── Typewriter for the subtitle ─────────────────────────────────────────────
function TypewriterSubtitle({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
    let i = 0
    const id = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, 35)
    return () => clearInterval(id)
  }, [text])

  return (
    <span>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-0.5 h-5 bg-purple-400 ml-0.5 align-middle"
      />
    </span>
  )
}

// ── Main gate ───────────────────────────────────────────────────────────────
export default function ExperienceGate({ onComplete }: { onComplete: () => void }) {
  const { setTheme, locale, setLocale } = useThemeStore()
  const [hoveredId, setHoveredId] = useState<Theme | null>(null)

  const handleChoose = (theme: Theme) => {
    setTheme(theme)
    onComplete()
  }

  const l = (obj: { en: string; es: string }) => obj[locale]

  const subtitle = l({
    en: 'Senior Full-Stack Engineer & Architect · Dominican Republic',
    es: 'Ingeniero Full-Stack Senior & Arquitecto · República Dominicana',
  })

  const cta = l({
    en: 'Choose your visual experience to continue',
    es: 'Elige tu experiencia visual para continuar',
  })

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] px-6 overflow-hidden"
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5 }}
    >
      <GridBackground />

      {/* Locale toggle */}
      <div className="absolute top-6 right-6 flex gap-2 z-10">
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

      {/* Heading block */}
      <motion.div
        className="text-center mb-14 z-10 relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Welcome tag */}
        <motion.p
          className="text-purple-400 text-sm font-mono tracking-[0.25em] uppercase mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {l({ en: '✦ Welcome to my portfolio', es: '✦ Bienvenido a mi portafolio' })}
        </motion.p>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-3 tracking-tight">
          {'Miguel Angel'.split('').map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.04, ease: 'easeOut' }}
            >
              {ch === ' ' ? ' ' : ch}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle typewriter */}
        <motion.p
          className="text-gray-400 text-base md:text-lg min-h-[28px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <TypewriterSubtitle text={subtitle} />
        </motion.p>
      </motion.div>

      {/* CTA label */}
      <motion.p
        className="text-gray-500 text-sm mb-8 z-10 tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        {cta}
      </motion.p>

      {/* Theme cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-4xl z-10">
        {themes.map((theme, i) => (
          <motion.button
            key={theme.id}
            onClick={() => handleChoose(theme.id)}
            onHoverStart={() => setHoveredId(theme.id)}
            onHoverEnd={() => setHoveredId(null)}
            className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 text-left
              hover:border-white/25 transition-all duration-300 cursor-pointer overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
            whileHover={{ scale: 1.04, y: -4 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Glow on hover */}
            <AnimatePresence>
              {hoveredId === theme.id && (
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${theme.accent}22, transparent)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>

            {/* Top accent line */}
            <motion.div
              className="absolute top-0 left-6 right-6 h-[2px] rounded-full"
              style={{ background: theme.accent }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={hoveredId === theme.id
                ? { scaleX: 1, opacity: 1 }
                : { scaleX: 0, opacity: 0 }
              }
              transition={{ duration: 0.3 }}
            />

            <div className="mb-4">{theme.preview}</div>

            <p className="text-white font-bold text-lg tracking-widest mb-1">
              {l(theme.nameKey)}
            </p>
            <p className="text-gray-400 text-sm">{l(theme.descKey)}</p>

            {/* Arrow hint */}
            <motion.span
              className="absolute bottom-5 right-5 text-gray-600 text-lg"
              animate={hoveredId === theme.id ? { x: 4, opacity: 1 } : { x: 0, opacity: 0.3 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </motion.button>
        ))}
      </div>

      {/* Footer */}
      <motion.p
        className="mt-10 text-gray-700 text-xs z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        {l({ en: 'You can change the style anytime from the menu', es: 'Puedes cambiar el estilo en cualquier momento desde el menú' })}
      </motion.p>
    </motion.div>
  )
}
