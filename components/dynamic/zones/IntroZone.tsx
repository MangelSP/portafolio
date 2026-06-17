'use client'
import { NetworkNode } from '../primitives/NetworkNode'
import { NetworkEdge } from '../primitives/NetworkEdge'
import { useThemeStore } from '@/store/themeStore'
import { config } from '@/data/portfolioConfig'

const SOCIAL_NODES: { label: string; pos: [number, number, number] }[] = [
  { label: 'GitHub',    pos: [-4.5, -1.5,  1.0] },
  { label: 'LinkedIn',  pos: [-3.0, -3.5,  0.5] },
  { label: 'Email',     pos: [ 1.5, -3.5,  1.5] },
  { label: 'WhatsApp',  pos: [ 4.0, -2.0,  0.0] },
  { label: 'Instagram', pos: [ 3.5,  1.0, -1.5] },
]

export function IntroZone() {
  const locale = useThemeStore((s) => s.locale)
  const { personalInfo } = config

  return (
    <group>
      {/* Center: name */}
      <NetworkNode position={[0, 0, 0]} label={personalInfo.name} color="#8b5cf6" radius={0.9} />

      {/* Title */}
      <NetworkNode position={[-3, 2.5, -1]} label={personalInfo.title[locale]} color="#a78bfa" radius={0.45} />
      <NetworkEdge start={[0, 0, 0]} end={[-3, 2.5, -1]} color="#8b5cf6" opacity={0.3} />

      {/* Bio snippet */}
      <NetworkNode position={[3.5, 2, -2]} label="6+ years · .NET · Azure" sublabel="Full-Stack & Architecture" color="#7c3aed" radius={0.4} />
      <NetworkEdge start={[0, 0, 0]} end={[3.5, 2, -2]} color="#8b5cf6" opacity={0.25} />

      {/* Location */}
      <NetworkNode position={[-1, -3.5, -1]} label="📍 República Dominicana" color="#6d28d9" radius={0.3} />
      <NetworkEdge start={[0, 0, 0]} end={[-1, -3.5, -1]} color="#8b5cf6" opacity={0.2} />

      {/* Social nodes */}
      {SOCIAL_NODES.map((n) => (
        <group key={n.label}>
          <NetworkNode position={n.pos} label={n.label} color="#22d3ee" radius={0.28} />
          <NetworkEdge start={[0, 0, 0]} end={n.pos} color="#22d3ee" opacity={0.2} />
        </group>
      ))}
    </group>
  )
}
