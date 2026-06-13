'use client'

import { useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'

export default function Providers({ children }: { children: React.ReactNode }) {
  const initFromStorage = useThemeStore((s) => s.initFromStorage)

  useEffect(() => {
    initFromStorage()
  }, [initFromStorage])

  return <>{children}</>
}
