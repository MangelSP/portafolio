'use client'
import { motion } from 'framer-motion'
import { SlideCanvas } from '../SlideCanvas'
import { useThemeStore } from '@/store/themeStore'
import { config } from '@/data/portfolioConfig'

const ICON: Record<string, string> = { server: '⚙️', monitor: '🖥️', smartphone: '📱' }
const ACCENT = ['#8b5cf6', '#22d3ee', '#a78bfa']

export function SkillsSlide() {
  const locale = useThemeStore((s) => s.locale)
  const { expertise } = config

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0f0f1a] py-20">
      <SlideCanvas variant="skills" />
      <div className="relative z-10 w-full max-w-5xl px-6">
        <motion.h2
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-2 text-white"
        >
          {locale === 'en' ? 'Expertise' : 'Habilidades'}
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.15 }} viewport={{ once: true }}
          className="h-0.5 w-16 bg-gradient-to-r from-purple-500 to-cyan-400 mb-10 origin-left"
        />
        <div className="grid md:grid-cols-3 gap-6">
          {expertise.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }} viewport={{ once: true }}
              className="rounded-xl border border-[#2d2d4e] bg-[#1a1a2e]/70 backdrop-blur-sm p-5"
              style={{ borderColor: ACCENT[i] + '30' }}
            >
              <div className="text-3xl mb-3">{ICON[e.icon]}</div>
              <h3 className="text-white font-bold mb-2" style={{ color: ACCENT[i] }}>{e.category[locale]}</h3>
              <p className="text-[#64748b] text-xs leading-relaxed mb-4">{e.description[locale]}</p>
              <div className="flex flex-wrap gap-1.5">
                {e.skills.map((skill) => (
                  <span key={skill} className="text-[10px] px-2 py-0.5 rounded-full border text-[#94a3b8]"
                    style={{ borderColor: ACCENT[i] + '30', backgroundColor: ACCENT[i] + '10' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
