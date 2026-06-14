// app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google'
import Providers from '@/components/Providers'
import '@/styles/themes.css'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })

export const metadata: Metadata = {
  title: 'Miguel Angel Sanchez Peralta — Senior Full-Stack Engineer & Architect',
  description: 'Portfolio of Miguel Angel Sanchez Peralta, Senior Full-Stack Software Engineer & Architect based in Dominican Republic.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${plusJakarta.variable} ${spaceGrotesk.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
