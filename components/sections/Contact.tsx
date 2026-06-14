// components/sections/Contact.tsx
'use client'

import { motion } from 'framer-motion'
import { Mail, Globe, GitFork, MessageCircle } from 'lucide-react'
import { useL } from '@/lib/usePortfolioLocale'
import { config } from '@/data/portfolioConfig'

const contactLinks = [
  {
    icon: Mail,
    label: { en: 'Email', es: 'Email' },
    getValue: () => `mailto:${config.personalInfo.contact.email}`,
    display: () => config.personalInfo.contact.email,
  },
  {
    icon: Globe,
    label: { en: 'LinkedIn', es: 'LinkedIn' },
    getValue: () => config.personalInfo.contact.linkedin,
    display: () => 'linkedin.com/in/randy',
  },
  {
    icon: GitFork,
    label: { en: 'GitHub', es: 'GitHub' },
    getValue: () => `https://github.com/${config.personalInfo.contact.github}`,
    display: () => `github.com/${config.personalInfo.contact.github}`,
  },
  {
    icon: MessageCircle,
    label: { en: 'WhatsApp', es: 'WhatsApp' },
    getValue: () => `https://wa.me/${config.personalInfo.contact.whatsapp.replace(/\D/g, '')}`,
    display: () => config.personalInfo.contact.whatsapp,
  },
]

export default function Contact() {
  const l = useL()

  return (
    <section id="contact" className="py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--text)] mb-4">
            {l({ en: "Let's Work Together", es: 'Trabajemos Juntos' })}
          </h2>
          <p className="text-[var(--text-muted)] mb-12 text-lg max-w-lg mx-auto">
            {l({ en: 'Open to freelance, full-time, and consulting opportunities', es: 'Abierto a freelance, tiempo completo y consultoría' })}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {contactLinks.map(({ icon: Icon, label, getValue, display }, i) => (
            <motion.a
              key={label.en}
              href={getValue()}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border bg-[var(--card-bg)] border-[var(--card-border)] p-6
                hover:border-[var(--accent)] transition-colors text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Icon size={24} className="mx-auto mb-3 text-[var(--accent)]" />
              <p className="font-medium text-[var(--text)] text-sm mb-1">{l(label)}</p>
              <p className="text-[var(--text-muted)] text-xs truncate">{display()}</p>
            </motion.a>
          ))}
        </div>

        <p className="mt-16 text-[var(--text-muted)] text-sm">
          © {new Date().getFullYear()} Randy Gonzalez · {l({ en: 'Built with Next.js', es: 'Construido con Next.js' })}
        </p>
      </div>
    </section>
  )
}
