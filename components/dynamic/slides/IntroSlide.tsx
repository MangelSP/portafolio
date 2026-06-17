'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { GitFork, Globe, Mail, MessageCircle, Camera, ChevronDown } from 'lucide-react'
import { SlideCanvas } from '../SlideCanvas'
import { useThemeStore } from '@/store/themeStore'
import { config } from '@/data/portfolioConfig'

function Typewriter({ text }: { text: string }) {
  const [shown, setShown] = useState('')
  useEffect(() => {
    setShown('')
    let i = 0
    const id = setInterval(() => { i++; setShown(text.slice(0, i)); if (i >= text.length) clearInterval(id) }, 38)
    return () => clearInterval(id)
  }, [text])
  return <span>{shown}</span>
}

const fade = (delay = 0) => ({ initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay }, viewport: { once: true } })

export function IntroSlide() {
  const locale = useThemeStore((s) => s.locale)
  const { personalInfo } = config
  const socials = [
    { icon: GitFork,       href: `https://github.com/${personalInfo.contact.github}`,                    label: 'GitHub' },
    { icon: Globe,         href: personalInfo.contact.linkedin,                                           label: 'LinkedIn' },
    { icon: Mail,          href: `mailto:${personalInfo.contact.email}`,                                  label: 'Email' },
    { icon: MessageCircle, href: `https://wa.me/${personalInfo.contact.whatsapp.replace(/\D/g, '')}`,     label: 'WhatsApp' },
    { icon: Camera,     href: personalInfo.contact.instagram,                                          label: 'Camera' },
  ]

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#0f0f1a]">
      <SlideCanvas variant="intro" />
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.p {...fade(0)} className="text-sm tracking-[0.3em] uppercase text-[#8b5cf6] mb-4 font-medium">
          {locale === 'en' ? 'Portfolio' : 'Portafolio'}
        </motion.p>
        <motion.h1 {...fade(0.15)} className="text-5xl md:text-7xl font-bold mb-4 leading-tight bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          {personalInfo.name.split(' ').slice(0, 2).join(' ')}<br />
          <span className="text-white">{personalInfo.name.split(' ').slice(2).join(' ')}</span>
        </motion.h1>
        <motion.p {...fade(0.3)} className="text-lg md:text-xl text-[#94a3b8] mb-6">
          <Typewriter text={personalInfo.title[locale]} />
        </motion.p>
        <motion.p {...fade(0.45)} className="text-sm text-[#64748b] mb-8 leading-relaxed max-w-lg mx-auto">
          {personalInfo.bio[locale]}
        </motion.p>
        <motion.div {...fade(0.6)} className="flex justify-center gap-4 mb-10">
          {socials.map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              className="p-2.5 rounded-lg border border-[#2d2d4e] bg-[#1a1a2e] text-[#94a3b8] hover:text-[#8b5cf6] hover:border-[#8b5cf6] transition-all">
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
        <motion.div {...fade(0.75)} className="flex flex-col items-center gap-2 text-[#4c1d95]">
          <span className="text-xs tracking-widest uppercase">{locale === 'en' ? 'scroll' : 'desliza'}</span>
          <ChevronDown size={16} className="animate-bounce" />
        </motion.div>
      </div>
    </div>
  )
}
