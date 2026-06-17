'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { SlideCanvas } from '../SlideCanvas'
import { useThemeStore } from '@/store/themeStore'
import { config } from '@/data/portfolioConfig'

const CATEGORY_COLOR: Record<string, string> = {
  web: '#22d3ee',
  mobile: '#a78bfa',
  architecture: '#8b5cf6',
}

export function ProjectsSlide() {
  const locale = useThemeStore((s) => s.locale)
  const { projects } = config

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a14] py-20">
      <SlideCanvas variant="projects" />
      <div className="relative z-10 w-full max-w-5xl px-6">
        <motion.h2
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-2 text-white"
        >
          {locale === 'en' ? 'Projects' : 'Proyectos'}
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.15 }} viewport={{ once: true }}
          className="h-0.5 w-16 bg-gradient-to-r from-purple-500 to-cyan-400 mb-8 origin-left"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }} viewport={{ once: true }}
            >
              <Link href={`/projects/${p.id}`}
                className="group block h-full rounded-xl border border-[#2d2d4e] bg-[#1a1a2e]/80 backdrop-blur-sm p-4 hover:border-[#8b5cf6] hover:bg-[#1a1a2e] transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full border"
                    style={{ color: CATEGORY_COLOR[p.category], borderColor: CATEGORY_COLOR[p.category] + '40' }}>
                    {p.category}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-sm mb-2 group-hover:text-[#a78bfa] transition-colors">{p.title}</h3>
                <p className="text-[#64748b] text-xs leading-relaxed mb-3 line-clamp-2">{p.description[locale]}</p>
                <div className="flex flex-wrap gap-1">
                  {p.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-[#2d2d4e] text-[#94a3b8]">{tag}</span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
