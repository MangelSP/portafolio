'use client'
import { useThemeStore } from '@/store/themeStore'

const SECTIONS = [
  { en: 'Intro',       es: 'Inicio',      start: 0,    end: 0.18 },
  { en: 'Projects',    es: 'Proyectos',   start: 0.18, end: 0.52 },
  { en: 'Skills',      es: 'Habilidades', start: 0.52, end: 0.68 },
  { en: 'Experience',  es: 'Experiencia', start: 0.68, end: 0.84 },
  { en: 'Contact',     es: 'Contacto',    start: 0.84, end: 1.01 },
]

export function ScrollProgress() {
  const scrollProgress = useThemeStore((s) => s.scrollProgress)
  const locale = useThemeStore((s) => s.locale)
  const section = SECTIONS.find((s) => scrollProgress >= s.start && scrollProgress < s.end) ?? SECTIONS[0]

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 32,
        right: 24,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 8,
        pointerEvents: 'none',
      }}
    >
      {/* Section name */}
      <div style={{
        color: '#8b5cf6',
        fontSize: 11,
        fontWeight: 700,
        fontFamily: 'Montserrat, sans-serif',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        textShadow: '0 0 12px #8b5cf6',
      }}>
        {section[locale]}
      </div>

      {/* Section dots */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {SECTIONS.map((s, i) => {
          const isActive = s === section
          return (
            <div
              key={i}
              style={{
                width: isActive ? 10 : 6,
                height: isActive ? 10 : 6,
                borderRadius: '50%',
                background: isActive ? '#8b5cf6' : '#2d2d4e',
                border: isActive ? '2px solid #a78bfa' : '1px solid #4c1d95',
                boxShadow: isActive ? '0 0 8px #8b5cf6' : 'none',
                transition: 'all 0.3s ease',
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
