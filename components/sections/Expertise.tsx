// components/sections/Expertise.tsx
'use client'

import { motion } from 'framer-motion'
import { Server, Monitor, Smartphone } from 'lucide-react'
import { useL } from '@/lib/usePortfolioLocale'
import { config } from '@/data/portfolioConfig'
import Tag from '@/components/ui/Tag'
import Card from '@/components/ui/Card'

const iconMap = { server: Server, monitor: Monitor, smartphone: Smartphone } as const

export default function Expertise() {
  const l = useL()

  return (
    <section id="expertise" className="py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
            {l({ en: 'My Expertise', es: 'Mi Expertise' })}
          </h2>
          <p className="text-[var(--text-muted)]">
            {l({ en: 'Technologies and tools I work with daily', es: 'Tecnologías y herramientas con las que trabajo a diario' })}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {config.expertise.map((area, i) => {
            const Icon = iconMap[area.icon as keyof typeof iconMap]
            return (
              <motion.div
                key={area.icon}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 border border-[var(--border)]"
                    style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)' }}>
                    <Icon size={20} className="text-[var(--accent)]" />
                  </div>
                  <h3 className="font-bold text-[var(--text)] mb-2">{l(area.category)}</h3>
                  <p className="text-[var(--text-muted)] text-sm mb-4 leading-relaxed">{l(area.description)}</p>
                  <div className="flex flex-wrap gap-2">
                    {area.skills.map((skill) => (
                      <Tag key={skill} label={skill} />
                    ))}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
