// app/page.tsx
'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useThemeStore } from '@/store/themeStore'
import ExperienceGate from '@/components/gate/ExperienceGate'
import Navigation from '@/components/nav/Navigation'
import Hero from '@/components/sections/Hero'
import Expertise from '@/components/sections/Expertise'
import Work from '@/components/sections/Work'
import Experience from '@/components/sections/Experience'
import GitHubStats from '@/components/sections/GitHubStats'
import Contact from '@/components/sections/Contact'

export default function Home() {
  const { hasChosenTheme } = useThemeStore()
  const [gateVisible, setGateVisible] = useState(true)

  const showGate = !hasChosenTheme && gateVisible

  return (
    <main className="bg-[var(--bg)] min-h-screen text-[var(--text)] transition-colors duration-300">
      <AnimatePresence>
        {showGate && (
          <ExperienceGate onComplete={() => setGateVisible(false)} />
        )}
      </AnimatePresence>

      {hasChosenTheme && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Navigation />
          <Hero />
          <Expertise />
          <Work />
          <Experience />
          <GitHubStats />
          <Contact />
        </motion.div>
      )}
    </main>
  )
}
