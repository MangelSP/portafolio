// components/sections/Hero.tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { GitFork, Globe, Mail, MessageCircle } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'
import { useL } from '@/lib/usePortfolioLocale'
import { config } from '@/data/portfolioConfig'
import Button from '@/components/ui/Button'

function TypewriterText({ text }: { text: string }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
    { icon: GitFork, href: `https://github.com/${personalInfo.contact.github}`, label: 'GitHub' },
    { icon: Globe, href: personalInfo.contact.linkedin, label: 'LinkedIn' },
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
