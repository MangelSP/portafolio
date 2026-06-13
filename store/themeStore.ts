// store/themeStore.ts
import { create } from 'zustand'
import type { Theme, Locale } from '../data/portfolioConfig'

interface ThemeStore {
  theme: Theme | null
  locale: Locale
  hasChosenTheme: boolean
  setTheme: (theme: Theme) => void
  setLocale: (locale: Locale) => void
  initFromStorage: () => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: null,
  locale: 'en',
  hasChosenTheme: false,

  setTheme: (theme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-theme', theme)
      document.documentElement.setAttribute('data-theme', theme)
    }
    set({ theme, hasChosenTheme: true })
  },

  setLocale: (locale) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-locale', locale)
    }
    set({ locale })
  },

  initFromStorage: () => {
    if (typeof window === 'undefined') return
    const savedTheme = localStorage.getItem('preferred-theme') as Theme | null
    const savedLocale = (localStorage.getItem('preferred-locale') as Locale) ?? 'en'
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme)
      set({ theme: savedTheme, locale: savedLocale, hasChosenTheme: true })
    } else {
      set({ locale: savedLocale })
    }
  },
}))
