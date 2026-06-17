'use client'
import { motion } from 'framer-motion'
import { Mail, Globe, GitFork, MessageCircle, Camera, Download } from 'lucide-react'
import { SlideCanvas } from '../SlideCanvas'
import { useThemeStore } from '@/store/themeStore'
import { config } from '@/data/portfolioConfig'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay }, viewport: { once: true },
})

export function ContactSlide() {
  const locale = useThemeStore((s) => s.locale)
  const { personalInfo } = config

  const links = [
    { icon: Mail,          label: 'Email',     sub: personalInfo.contact.email,         href: `mailto:${personalInfo.contact.email}` },
    { icon: Globe,         label: 'LinkedIn',  sub: 'Miguel Angel Sanchez',             href: personalInfo.contact.linkedin },
    { icon: GitFork,       label: 'GitHub',    sub: `@${personalInfo.contact.github}`,  href: `https://github.com/${personalInfo.contact.github}` },
    { icon: MessageCircle, label: 'WhatsApp',  sub: personalInfo.contact.whatsapp,      href: `https://wa.me/${personalInfo.contact.whatsapp.replace(/\D/g, '')}` },
    { icon: Camera,     label: 'Camera', sub: '@mangeldevs',                      href: personalInfo.contact.instagram },
  ]

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0f0f1a] py-20">
      <SlideCanvas variant="contact" />
      <div className="relative z-10 w-full max-w-2xl px-6 text-center">
        <motion.p {...fade(0)} className="text-sm tracking-[0.3em] uppercase text-[#8b5cf6] mb-4 font-medium">
          {locale === 'en' ? "Let's build something" : 'Construyamos algo'}
        </motion.p>
        <motion.h2 {...fade(0.1)} className="text-4xl md:text-6xl font-bold mb-4 text-white">
          {locale === 'en' ? "Let's Connect" : 'Conectemos'}
        </motion.h2>
        <motion.div {...fade(0.2)} className="h-0.5 w-16 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto mb-10" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {links.map(({ icon: Icon, label, sub, href }, i) => (
            <motion.a
              key={label} href={href} target="_blank" rel="noopener noreferrer"
              {...fade(0.3 + i * 0.08)}
              className="group flex items-center gap-3 rounded-xl border border-[#2d2d4e] bg-[#1a1a2e]/80 p-3.5 hover:border-[#8b5cf6] hover:bg-[#1a1a2e] transition-all text-left"
            >
              <div className="p-2 rounded-lg bg-[#2d2d4e] group-hover:bg-[#8b5cf6]/20 transition-colors">
                <Icon size={16} className="text-[#8b5cf6]" />
              </div>
              <div>
                <p className="text-white text-xs font-semibold">{label}</p>
                <p className="text-[#64748b] text-[10px] truncate max-w-[160px]">{sub}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.a
          {...fade(0.75)}
          href="/Miguel Angel Sanchez Peralta Resume.docx" download
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8b5cf6] text-white text-sm font-semibold hover:bg-[#7c3aed] transition-colors shadow-[0_0_20px_rgba(139,92,246,0.3)]"
        >
          <Download size={15} />
          {locale === 'en' ? 'Download CV' : 'Descargar CV'}
        </motion.a>
      </div>
    </div>
  )
}
