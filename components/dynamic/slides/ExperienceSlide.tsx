'use client'
import { motion } from 'framer-motion'
import { SlideCanvas } from '../SlideCanvas'
import { useThemeStore } from '@/store/themeStore'
import { config } from '@/data/portfolioConfig'

export function ExperienceSlide() {
  const locale = useThemeStore((s) => s.locale)
  const { experience } = config

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a14] py-20">
      <SlideCanvas variant="experience" />
      <div className="relative z-10 w-full max-w-3xl px-6">
        <motion.h2
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-2 text-white"
        >
          {locale === 'en' ? 'Experience' : 'Experiencia'}
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.15 }} viewport={{ once: true }}
          className="h-0.5 w-16 bg-gradient-to-r from-purple-500 to-cyan-400 mb-10 origin-left"
        />
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}
            className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-[#8b5cf6] to-[#2d2d4e] origin-top"
          />
          <div className="space-y-8 pl-10">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }} viewport={{ once: true }}
                className="relative"
              >
                {/* Dot */}
                <div className="absolute -left-[2.45rem] top-1.5 w-3 h-3 rounded-full bg-[#8b5cf6] border-2 border-[#0f0f1a] shadow-[0_0_8px_#8b5cf6]" />
                <div className="rounded-xl border border-[#2d2d4e] bg-[#1a1a2e]/70 backdrop-blur-sm p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <h3 className="text-white font-bold text-sm">{exp.role[locale]}</h3>
                    <span className="text-[10px] text-[#64748b] shrink-0">{exp.period}</span>
                  </div>
                  <p className="text-[#8b5cf6] text-xs font-medium mb-3">{exp.company} · {exp.location}</p>
                  <div className="flex flex-wrap gap-1">
                    {exp.tech.slice(0, 6).map((t) => (
                      <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-[#2d2d4e] text-[#94a3b8]">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
