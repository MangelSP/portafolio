// components/gate/ExperienceGate.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useThemeStore } from '@/store/themeStore'
import { useEffect, useState } from 'react'
import type { Theme, Locale } from '@/data/portfolioConfig'

// ── Hot projects strip ──────────────────────────────────────────────────────
const HOT_PROJECTS = [
  {
    id: 'travel-rd',
    emoji: '✈️',
    nameKey: { en: 'Travel-RD', es: 'Travel-RD' },
    tagKey: { en: 'SaaS · Tourism · Flutter + NestJS', es: 'SaaS · Turismo · Flutter + NestJS' },
    color: '#06b6d4',
  },
  {
    id: 'loancore',
    emoji: '💳',
    nameKey: { en: 'LoanCore SaaS', es: 'LoanCore SaaS' },
    tagKey: { en: 'Loans · Multi-tenant · .NET + Next.js', es: 'Préstamos · Multi-tenant · .NET + Next.js' },
    color: '#7c3aed',
  },
  {
    id: 'domino',
    emoji: '🁣',
    nameKey: { en: 'Anotar Dominó', es: 'Anotar Dominó' },
    tagKey: { en: 'Mobile · Gemini AI · Flutter', es: 'Móvil · Gemini AI · Flutter' },
    color: '#f59e0b',
  },
]

// ── Floating tech particles ─────────────────────────────────────────────────
const TECH_WORDS = [
  '.NET', 'React', 'Flutter', 'NestJS', 'Azure', 'Docker',
  'Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Kubernetes',
  'GraphQL', 'Prisma', 'Tailwind', 'Node.js', 'Swift',
]

function Particle({ word, index }: { word: string; index: number }) {
  const x = (index * 137.5) % 100
  const duration = 18 + (index % 7) * 3
  const delay = -(index * 2.1)
  const size = 10 + (index % 3) * 2
  return (
    <motion.span
      className="absolute font-mono text-white/10 select-none pointer-events-none whitespace-nowrap"
      style={{ left: `${x}%`, fontSize: size, top: '110%' }}
      animate={{ top: '-10%' }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    >
      {word}
    </motion.span>
  )
}

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(124,58,237,0.18),transparent)]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      {TECH_WORDS.map((w, i) => <Particle key={w} word={w} index={i} />)}
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

// ── Theme data ──────────────────────────────────────────────────────────────
const themes: {
  id: Theme
  nameKey: { en: string; es: string }
  descKey: { en: string; es: string }
  accent: string
  emoji: string
  preview: React.ReactNode
}[] = [
  {
    id: 'modern',
    nameKey: { en: 'MODERN', es: 'MODERNO' },
    descKey: { en: 'Minimal & Clean', es: 'Minimal & Limpio' },
    accent: '#e5e7eb',
    emoji: '◻',
    preview: (
      <svg viewBox="0 0 120 80" className="w-full h-16 md:h-20 opacity-70">
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
    descKey: { en: 'Precise & Professional', es: 'Profesional & Preciso' },
    accent: '#2563eb',
    emoji: '▦',
    preview: (
      <svg viewBox="0 0 120 80" className="w-full h-16 md:h-20 opacity-70">
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
    emoji: '◈',
    preview: (
      <svg viewBox="0 0 120 80" className="w-full h-16 md:h-20 opacity-70">
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

// ── Typewriter subtitle ─────────────────────────────────────────────────────
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
        className="inline-block w-0.5 h-4 bg-purple-400 ml-0.5 align-middle"
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
    es: 'Ingeniero Full-Stack Senior & Arquitecto · Rep. Dominicana',
  })

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col bg-[#0a0a0a] overflow-y-auto overflow-x-hidden"
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5 }}
    >
      <GridBackground />

      {/* Locale toggle — top right */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        {(['en', 'es'] as Locale[]).map((loc) => (
          <button
            key={loc}
            onClick={() => setLocale(loc)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              locale === loc ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
            }`}
          >
            {loc.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Scrollable inner content — centered vertically on big screens */}
      <div className="relative z-10 flex flex-col items-center justify-start min-h-full px-4 sm:px-6 py-16 sm:py-20">

        {/* Heading */}
        <motion.div
          className="text-center mb-8 sm:mb-10 w-full max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.p
            className="text-purple-400 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {l({ en: '✦ Welcome to my portfolio', es: '✦ Bienvenido a mi portafolio' })}
          </motion.p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-3 tracking-tight leading-tight">
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

          <motion.p
            className="text-gray-400 text-sm sm:text-base md:text-lg min-h-[24px] px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <TypewriterSubtitle text={subtitle} />
          </motion.p>
        </motion.div>

        {/* Hot projects strip */}
        <motion.div
          className="w-full max-w-2xl mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <p className="text-center text-gray-600 text-xs uppercase tracking-[0.2em] mb-3">
            {l({ en: '— featured projects —', es: '— proyectos destacados —' })}
          </p>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {HOT_PROJECTS.map((p, i) => (
              <motion.div
                key={p.id}
                className="relative rounded-xl border border-white/8 bg-white/4 px-3 py-3 sm:px-4 sm:py-3 overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.08 }}
              >
                {/* color glow */}
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 80% 80% at 50% 100%, ${p.color}, transparent)` }}
                />
                <div className="relative">
                  <span className="text-xl sm:text-2xl block mb-1">{p.emoji}</span>
                  <p className="text-white font-semibold text-xs sm:text-sm leading-tight mb-0.5">
                    {l(p.nameKey)}
                  </p>
                  <p className="text-gray-500 text-[10px] sm:text-xs leading-tight hidden sm:block">
                    {l(p.tagKey)}
                  </p>
                  {/* colored dot accent */}
                  <span
                    className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full"
                    style={{ background: p.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.p
          className="text-gray-500 text-xs sm:text-sm mb-5 sm:mb-7 tracking-wide text-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          {l({ en: 'Choose your visual experience to continue', es: 'Elige tu experiencia visual para continuar' })}
        </motion.p>

        {/* Theme cards — horizontal on mobile, 3-col on md+ */}
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
          {themes.map((theme, i) => (
            <motion.button
              key={theme.id}
              onClick={() => handleChoose(theme.id)}
              onHoverStart={() => setHoveredId(theme.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="group relative rounded-2xl border border-white/10 bg-white/5
                hover:border-white/25 transition-all duration-300 cursor-pointer overflow-hidden
                text-left p-4 sm:p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Glow */}
              <AnimatePresence>
                {hoveredId === theme.id && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${theme.accent}22, transparent)` }}
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
                animate={hoveredId === theme.id ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Layout: on mobile = row (emoji + text), on sm+ = column with SVG preview */}
              <div className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-0">
                {/* SVG preview — hidden on xs, visible sm+ */}
                <div className="hidden sm:block w-full mb-4">
                  {theme.preview}
                </div>

                {/* Emoji badge — only on mobile */}
                <div
                  className="sm:hidden flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl border border-white/10"
                  style={{ background: `${theme.accent}18` }}
                >
                  {theme.emoji}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-base sm:text-lg tracking-widest mb-0.5 sm:mb-1">
                    {l(theme.nameKey)}
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm">{l(theme.descKey)}</p>
                </div>

                {/* Arrow */}
                <motion.span
                  className="flex-shrink-0 sm:absolute sm:bottom-5 sm:right-5 text-gray-600 text-lg"
                  animate={hoveredId === theme.id ? { x: 4, opacity: 1 } : { x: 0, opacity: 0.35 }}
                  transition={{ duration: 0.2 }}
                >
                  →
                </motion.span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Footer hint */}
        <motion.p
          className="mt-6 sm:mt-10 text-gray-700 text-xs text-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          {l({ en: 'You can change the style anytime from the menu', es: 'Puedes cambiar el estilo desde el menú en cualquier momento' })}
        </motion.p>

      </div>
    </motion.div>
  )
}
