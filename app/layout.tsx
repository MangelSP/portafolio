// app/layout.tsx
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Providers from '@/components/Providers'
import '@/styles/themes.css'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

export const metadata: Metadata = {
  title: 'Miguel Angel Sanchez Peralta — Senior Full-Stack Engineer & Architect',
  description: 'Portfolio of Miguel Angel Sanchez Peralta, Senior Full-Stack Software Engineer & Architect based in Dominican Republic.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
