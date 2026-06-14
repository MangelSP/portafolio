// app/projects/[id]/page.tsx
'use client'

import { notFound } from 'next/navigation'
import { use } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, GitFork } from 'lucide-react'
import { config } from '@/data/portfolioConfig'
import { useL } from '@/lib/usePortfolioLocale'
import Tag from '@/components/ui/Tag'

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const project = config.projects.find((p) => p.id === id)
  const l = useL()

  if (!project) notFound()

  const gradientMap: Record<string, string> = {
    'travel-rd': 'from-blue-600 via-cyan-500 to-teal-400',
    'travel-rd-mobile': 'from-cyan-600 via-teal-500 to-emerald-400',
    'domino-app': 'from-amber-600 via-orange-500 to-red-400',
    'appstore-resizer': 'from-sky-600 via-blue-500 to-green-400',
    'gestor-citas': 'from-emerald-700 via-green-500 to-teal-400',
    'barbershop-app': 'from-pink-700 via-rose-500 to-orange-400',
    'loancore': 'from-violet-700 via-purple-500 to-indigo-400',
  }
  const heroGradient = gradientMap[project.id] ?? 'from-gray-700 via-gray-500 to-gray-400'

  // adjacent projects for prev/next navigation
  const projects = config.projects
  const currentIdx = projects.findIndex((p) => p.id === id)
  const prevProject = currentIdx > 0 ? projects[currentIdx - 1] : null
  const nextProject = currentIdx < projects.length - 1 ? projects[currentIdx + 1] : null

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">

      {/* ── Hero banner ─────────────────────────────────────── */}
      <div className={`relative bg-gradient-to-br ${heroGradient} overflow-hidden`}>
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16 sm:pt-12 sm:pb-24">
          {/* Back button */}
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-8 sm:mb-12 transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {l({ en: 'Back to Portfolio', es: 'Volver al Portafolio' })}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category badge */}
            <span className="inline-block bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full uppercase tracking-widest mb-4">
              {project.category}
            </span>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {project.title}
            </h1>
            <p className="text-white/80 text-base sm:text-lg max-w-2xl mb-8 leading-relaxed">
              {l(project.description)}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((t) => (
                <span key={t} className="bg-white/15 text-white text-xs px-3 py-1 rounded-full border border-white/20">
                  {t}
                </span>
              ))}
            </div>

            {/* CTA links */}
            <div className="flex flex-wrap gap-3">
              {project.url && project.url !== '#' && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors text-sm"
                >
                  <ExternalLink size={15} />
                  {l({ en: 'Live Demo', es: 'Ver Demo' })}
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/15 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/25 border border-white/20 transition-colors text-sm"
                >
                  <GitFork size={15} />
                  GitHub
                </a>
              )}
              {project.appStore && (
                <a
                  href={project.appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/15 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/25 border border-white/20 transition-colors text-sm"
                >
                  App Store
                </a>
              )}
              {project.playStore && (
                <a
                  href={project.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/15 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/25 border border-white/20 transition-colors text-sm"
                >
                  Play Store
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-16 sm:space-y-24">

        {/* About */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionLabel label={l({ en: 'About the project', es: 'Sobre el proyecto' })} />
          <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed max-w-3xl">
            {l(project.longDescription)}
          </p>
        </motion.section>

        {/* Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionLabel label={l({ en: 'Key Features', es: 'Funcionalidades Clave' })} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {project.features.map((f, i) => (
              <motion.div
                key={i}
                className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 sm:p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <span className="text-2xl mb-3 block">{f.icon}</span>
                <h3 className="font-semibold text-[var(--text)] mb-2 text-sm sm:text-base">
                  {l(f.title)}
                </h3>
                <p className="text-[var(--text-muted)] text-xs sm:text-sm leading-relaxed">
                  {l(f.desc)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionLabel label={l({ en: 'Tech Stack', es: 'Stack Técnico' })} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {project.stack.map((layer, i) => (
              <motion.div
                key={i}
                className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 sm:p-6"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <h3 className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-3">
                  {l(layer.layer)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {layer.techs.map((t) => (
                    <Tag key={t} label={t} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Screenshots placeholder — ready for real images */}
        {project.screenshots.length === 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionLabel label={l({ en: 'Screenshots', es: 'Capturas de Pantalla' })} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className={`h-48 sm:h-56 rounded-2xl bg-gradient-to-br ${project.placeholderGradient} opacity-40 flex items-center justify-center`}
                >
                  <span className="text-white/60 text-sm">{l({ en: 'Screenshot coming soon', es: 'Próximamente' })}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Prev / Next navigation */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[var(--border)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.id}`}
              className="group flex flex-col gap-1 p-5 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--accent)] transition-colors"
            >
              <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                {l({ en: 'Previous', es: 'Anterior' })}
              </span>
              <span className="font-semibold text-[var(--text)] text-sm">{prevProject.title}</span>
            </Link>
          ) : <div />}

          {nextProject && (
            <Link
              href={`/projects/${nextProject.id}`}
              className="group flex flex-col gap-1 p-5 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--accent)] transition-colors text-right sm:items-end"
            >
              <span className="text-xs text-[var(--text-muted)] flex items-center gap-1 justify-end">
                {l({ en: 'Next', es: 'Siguiente' })}
                <ArrowLeft size={12} className="rotate-180 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="font-semibold text-[var(--text)] text-sm">{nextProject.title}</span>
            </Link>
          )}
        </motion.div>

      </div>
    </div>
  )
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl font-bold text-[var(--text)]">{label}</h2>
      <div className="flex-1 h-px bg-[var(--border)]" />
    </div>
  )
}
