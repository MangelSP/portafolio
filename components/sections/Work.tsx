// components/sections/Work.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'
import { useL } from '@/lib/usePortfolioLocale'
import { config } from '@/data/portfolioConfig'
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

function ProjectLinks({
  project,
  l,
  variant,
}: {
  project: { id: string; url: string }
  l: (s: { en: string; es: string }) => string
  variant: 'modern' | 'corporate' | 'dynamic'
}) {
  const detailLabel = l({ en: 'View Details', es: 'Ver Detalles' })
  const externalLabel = l({ en: 'Live', es: 'Demo' })
  const dynamicColor = 'text-purple-400 hover:text-cyan-400'
  const defaultColor = 'text-[var(--accent)] hover:underline'

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <Link
        href={`/projects/${project.id}`}
        className={`text-sm font-medium transition-colors inline-flex items-center gap-1
          ${variant === 'dynamic' ? dynamicColor : defaultColor}`}
      >
        {detailLabel} <ArrowRight size={14} />
      </Link>
      {project.url && project.url !== '#' && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors inline-flex items-center gap-1"
        >
          {externalLabel} <ExternalLink size={13} />
        </a>
      )}
    </div>
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
        {(theme === 'modern' || theme === null) && (
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
                <ProjectLinks project={project} l={l} variant="modern" />
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
                  <ProjectLinks project={project} l={l} variant="corporate" />
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
                  <ProjectLinks project={project} l={l} variant="dynamic" />
                </TiltCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
