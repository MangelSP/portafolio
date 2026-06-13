// lib/usePortfolioLocale.ts
import { useThemeStore } from '@/store/themeStore'
import type { LocalizedString } from '../data/portfolioConfig'

export function useL() {
  const locale = useThemeStore((s) => s.locale)
  return (field: LocalizedString): string => field[locale]
}
