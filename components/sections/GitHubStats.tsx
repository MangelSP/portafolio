// components/sections/GitHubStats.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useThemeStore } from '@/store/themeStore'
import { useL } from '@/lib/usePortfolioLocale'
import { config } from '@/data/portfolioConfig'

interface GitHubData {
  public_repos: number
  followers: number
  following: number
}

const statsThemeMap: Record<string, string> = {
  modern: 'default',
  corporate: 'default',
  dynamic: 'tokyonight',
}

const graphThemeMap: Record<string, string> = {
  modern: 'minimal',
  corporate: 'github',
  dynamic: 'tokyo-night',
}

export default function GitHubStats() {
  const { theme } = useThemeStore()
  const l = useL()
  const [data, setData] = useState<GitHubData | null>(null)
  const username = config.personalInfo.contact.github

  useEffect(() => {
    fetch('/api/github')
      .then((r) => r.json())
      .then(setData)
      .catch(() => null)
  }, [])

  const statsTheme = statsThemeMap[theme ?? 'modern']
  const graphTheme = graphThemeMap[theme ?? 'modern']

  return (
    <section id="github" className="py-24 bg-[var(--bg)]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
            {l({ en: 'GitHub Activity', es: 'Actividad GitHub' })}
          </h2>
          <p className="text-[var(--text-muted)]">
            {l({ en: 'Open source contributions and activity', es: 'Contribuciones open source y actividad' })}
          </p>
        </motion.div>

        {/* Live metrics from API */}
        {data && (
          <motion.div
            className="grid grid-cols-3 gap-6 mb-12 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {[
              { value: data.public_repos, label: { en: 'Public Repos', es: 'Repos Públicos' } },
              { value: data.followers, label: { en: 'Followers', es: 'Seguidores' } },
              { value: data.following, label: { en: 'Following', es: 'Siguiendo' } },
            ].map((m) => (
              <div key={m.label.en} className="text-center">
                <p className="text-3xl font-bold text-[var(--accent)]">{m.value}</p>
                <p className="text-[var(--text-muted)] text-sm mt-1">{l(m.label)}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Stats cards (embedded images) */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${statsTheme}&hide_border=true&bg_color=00000000`}
            alt="GitHub Stats"
            className="w-full rounded-xl"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${statsTheme}&hide_border=true&bg_color=00000000`}
            alt="Top Languages"
            className="w-full rounded-xl"
          />
        </motion.div>

        {/* Contribution graph */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=${graphTheme}&hide_border=true&bg_color=00000000`}
            alt="Contribution Graph"
            className="w-full rounded-xl"
          />
        </motion.div>
      </div>
    </section>
  )
}
