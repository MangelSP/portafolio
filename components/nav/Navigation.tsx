// components/nav/Navigation.tsx
'use client'

import { Layers } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'
import type { Locale } from '@/data/portfolioConfig'

const navLabels = {
  en: { home: 'Home', expertise: 'Expertise', work: 'Work', experience: 'Experience', github: 'GitHub', contact: 'Contact' },
  es: { home: 'Inicio', expertise: 'Expertise', work: 'Proyectos', experience: 'Experiencia', github: 'GitHub', contact: 'Contacto' },
}

const navLinks = [
  { href: '#hero', labelKey: 'home' as const },
  { href: '#expertise', labelKey: 'expertise' as const },
  { href: '#work', labelKey: 'work' as const },
  { href: '#experience', labelKey: 'experience' as const },
  { href: '#github', labelKey: 'github' as const },
  { href: '#contact', labelKey: 'contact' as const },
]

export default function Navigation() {
  const { locale, setLocale, theme, openGate } = useThemeStore()
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

        <div className="flex items-center gap-2">
          <button
            onClick={openGate}
            title={locale === 'en' ? 'Change theme' : 'Cambiar tema'}
            className="p-2 rounded-md text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-secondary)] transition-colors"
          >
            <Layers size={16} />
          </button>
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
      </div>
    </nav>
  )
}
