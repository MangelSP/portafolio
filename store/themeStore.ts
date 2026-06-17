// store/themeStore.ts
import { create } from 'zustand'
import type { Theme, Locale } from '../data/portfolioConfig'

interface ThemeStore {
  theme: Theme | null
  locale: Locale
  darkMode: boolean
  hasChosenTheme: boolean
  gateOpen: boolean
  scrollProgress: number
  setTheme: (theme: Theme) => void
  setLocale: (locale: Locale) => void
  toggleDark: () => void
  openGate: () => void
  setScrollProgress: (p: number) => void
  initFromStorage: () => void
}

function applyDark(dark: boolean) {
  if (dark) {
    document.documentElement.setAttribute('data-dark', 'true')
  } else {
    document.documentElement.removeAttribute('data-dark')
  }
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: null,
  locale: 'en',
  darkMode: false,
  hasChosenTheme: false,
  gateOpen: true,
  scrollProgress: 0,

  setTheme: (theme) => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme)
    }
    set({ theme, hasChosenTheme: true, gateOpen: false })
  },

  toggleDark: () => {
    const next = !get().darkMode
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-dark', String(next))
      applyDark(next)
    }
    set({ darkMode: next })
  },

  openGate: () => {
    set({ gateOpen: true, hasChosenTheme: false })
  },

  setScrollProgress: (p) => set({ scrollProgress: p }),

  setLocale: (locale) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-locale', locale)
    }
    set({ locale })
  },

  initFromStorage: () => {
    if (typeof window === 'undefined') return
    const savedLocale = (localStorage.getItem('preferred-locale') as Locale) ?? 'en'
    const savedDark = localStorage.getItem('preferred-dark') === 'true'
    applyDark(savedDark)
    set({ locale: savedLocale, darkMode: savedDark })
  },
}))
