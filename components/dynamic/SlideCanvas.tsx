'use client'
import { useEffect, useRef } from 'react'

type Variant = 'intro' | 'projects' | 'skills' | 'experience' | 'contact'

interface Props { variant: Variant }

type DrawFn = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void

const DRAWS: Record<Variant, DrawFn> = {
  intro: (ctx, w, h, t) => {
    ctx.clearRect(0, 0, w, h)
    // Expanding rings
    for (let i = 0; i < 4; i++) {
      const r = ((t * 0.4 + i * 80) % 320)
      const alpha = Math.max(0, 0.25 - r / 1200)
      ctx.strokeStyle = `rgba(139,92,246,${alpha})`
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(w / 2, h / 2, r, 0, Math.PI * 2)
      ctx.stroke()
    }
    // Floating particles
    for (let i = 0; i < 40; i++) {
      const seed = i * 137.5
      const x = ((seed * 73) % w)
      const y = ((h - ((t * 0.06 + seed * 11) % h)))
      const alpha = 0.2 + 0.3 * Math.sin(t * 0.002 + i)
      ctx.fillStyle = `rgba(139,92,246,${alpha})`
      ctx.beginPath()
      ctx.arc(x, y, 1.5, 0, Math.PI * 2)
      ctx.fill()
    }
  },

  projects: (ctx, w, h, t) => {
    ctx.clearRect(0, 0, w, h)
    const cols = Math.ceil(w / 60) + 1
    const rows = Math.ceil(h / 60) + 1
    const offset = (t * 0.05) % 60
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const x = c * 60 - offset
        const y = r * 60 - offset
        const d = Math.hypot(x - w / 2, y - h / 2)
        const alpha = 0.04 + 0.04 * Math.sin(d * 0.02 - t * 0.003)
        ctx.strokeStyle = `rgba(34,211,238,${alpha})`
        ctx.lineWidth = 1
        ctx.strokeRect(x, y, 55, 55)
      }
    }
    // Cyan scan line
    const scanY = (t * 0.15) % h
    const grad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30)
    grad.addColorStop(0, 'rgba(34,211,238,0)')
    grad.addColorStop(0.5, 'rgba(34,211,238,0.06)')
    grad.addColorStop(1, 'rgba(34,211,238,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, scanY - 30, w, 60)
  },

  skills: (ctx, w, h, t) => {
    ctx.clearRect(0, 0, w, h)
    const cx = w / 2, cy = h / 2
    for (let ray = 0; ray < 12; ray++) {
      const angle = (ray / 12) * Math.PI * 2 + t * 0.001
      const len = 180 + 60 * Math.sin(t * 0.004 + ray)
      const alpha = 0.08 + 0.06 * Math.sin(t * 0.003 + ray)
      ctx.strokeStyle = `rgba(139,92,246,${alpha})`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len)
      ctx.stroke()
    }
    // Orbit dots
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2 + t * 0.0015
      const r = 120 + 40 * Math.sin(t * 0.002 + i * 0.7)
      const alpha = 0.35 + 0.25 * Math.sin(t * 0.003 + i)
      ctx.fillStyle = i % 3 === 0 ? `rgba(34,211,238,${alpha})` : `rgba(139,92,246,${alpha})`
      ctx.beginPath()
      ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 2, 0, Math.PI * 2)
      ctx.fill()
    }
  },

  experience: (ctx, w, h, t) => {
    ctx.clearRect(0, 0, w, h)
    // Horizontal wave lines
    for (let row = 0; row < 8; row++) {
      const y = (row / 7) * h
      ctx.beginPath()
      for (let x = 0; x <= w; x += 4) {
        const wave = 10 * Math.sin((x * 0.015) + t * 0.004 + row * 0.8)
        if (x === 0) ctx.moveTo(x, y + wave)
        else ctx.lineTo(x, y + wave)
      }
      const alpha = 0.04 + 0.03 * Math.sin(t * 0.002 + row)
      ctx.strokeStyle = `rgba(139,92,246,${alpha})`
      ctx.lineWidth = 1
      ctx.stroke()
    }
    // Vertical time markers
    for (let i = 0; i < 6; i++) {
      const x = (i / 5) * w
      const alpha = 0.05 + 0.03 * Math.sin(t * 0.002 + i)
      ctx.strokeStyle = `rgba(34,211,238,${alpha})`
      ctx.lineWidth = 1
      ctx.setLineDash([4, 8])
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, h)
      ctx.stroke()
      ctx.setLineDash([])
    }
  },

  contact: (ctx, w, h, t) => {
    ctx.clearRect(0, 0, w, h)
    // Constellation: static star positions + connecting lines
    const stars = Array.from({ length: 30 }, (_, i) => ({
      x: ((i * 173 + 50) % (w - 100)) + 50,
      y: ((i * 97 + 80) % (h - 100)) + 50,
    }))
    // Draw stars
    stars.forEach((s, i) => {
      const alpha = 0.3 + 0.2 * Math.sin(t * 0.003 + i)
      ctx.fillStyle = `rgba(167,139,250,${alpha})`
      ctx.beginPath()
      ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2)
      ctx.fill()
    })
    // Connect nearby stars
    stars.forEach((a, i) => {
      stars.slice(i + 1).forEach((b) => {
        const d = Math.hypot(a.x - b.x, a.y - b.y)
        if (d < 120) {
          const alpha = (0.08 * (1 - d / 120)) * (0.5 + 0.5 * Math.sin(t * 0.002 + i))
          ctx.strokeStyle = `rgba(139,92,246,${alpha})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      })
    })
  },
}

export function SlideCanvas({ variant }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = DRAWS[variant]
    const loop = (t: number) => {
      draw(ctx, canvas.width, canvas.height, t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [variant])

  return (
    <canvas
      ref={ref}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
    />
  )
}
