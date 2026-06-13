// components/sections/Experience.tsx
'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar } from 'lucide-react'
import { useL } from '@/lib/usePortfolioLocale'
import { config } from '@/data/portfolioConfig'
import Tag from '@/components/ui/Tag'

export default function Experience() {
  const l = useL()

  return (
    <section id="experience" className="py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
            {l({ en: 'Experience', es: 'Experiencia' })}
          </h2>
          <p className="text-[var(--text-muted)]">
            {l({ en: 'My professional journey', es: 'Mi trayectoria profesional' })}
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--border)]" />

          <div className="flex flex-col gap-12">
            {config.experience.map((item, i) => (
              <motion.div
                key={i}
                className="pl-12 relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                {/* Dot */}
                <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white" />
                </div>

                <div className="rounded-2xl border bg-[var(--card-bg)] border-[var(--card-border)] p-6">
                  <h3 className="font-bold text-[var(--text)] text-lg mb-1">{l(item.role)}</h3>
                  <p className="text-[var(--accent)] font-medium mb-3">{item.company}</p>
                  <div className="flex gap-4 text-sm text-[var(--text-muted)] mb-4">
                    <span className="flex items-center gap-1"><Calendar size={14} />{item.period}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} />{item.location}</span>
                  </div>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4">{l(item.description)}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tech.map((t) => <Tag key={t} label={t} />)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
