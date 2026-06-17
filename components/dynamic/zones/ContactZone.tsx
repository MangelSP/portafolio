'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { NetworkNode } from '../primitives/NetworkNode'
import { NetworkEdge } from '../primitives/NetworkEdge'
import { config } from '@/data/portfolioConfig'
import { useThemeStore } from '@/store/themeStore'
import type { Group } from 'three'
import type { Vector3Tuple } from 'three'

const OX = 120

const CONTACT_NODES: { label: string; sublabel: string; pos: Vector3Tuple }[] = [
  { label: 'Email',     sublabel: 'yacalos_@hotmail.com',              pos: [OX - 6,  2, -1.5] },
  { label: 'LinkedIn',  sublabel: 'Miguel Sanchez',                    pos: [OX - 4, -3,  1.0] },
  { label: 'GitHub',    sublabel: 'MangelSP',                          pos: [OX + 2,  4,  1.5] },
  { label: 'WhatsApp',  sublabel: '+1 829 518 1341',                   pos: [OX + 5,  1, -1.0] },
  { label: 'Instagram', sublabel: '@mangeldevs',                       pos: [OX + 3, -3,  0.5] },
]

export function ContactZone() {
  const locale = useThemeStore((s) => s.locale)
  const centerRef = useRef<Group>(null)

  // Gentle pulse on the center node
  useFrame(({ clock }) => {
    if (centerRef.current) {
      const s = 1 + 0.08 * Math.sin(clock.elapsedTime * 2)
      centerRef.current.scale.setScalar(s)
    }
  })

  return (
    <group>
      {/* Pulsing center node */}
      <group ref={centerRef}>
        <NetworkNode
          position={[OX, 0, 0]}
          label={locale === 'en' ? "Let's Connect" : 'Conectemos'}
          sublabel="Miguel Angel"
          color="#8b5cf6"
          radius={1.0}
        />
      </group>

      {CONTACT_NODES.map(({ label, sublabel, pos }) => (
        <group key={label}>
          <NetworkNode position={pos} label={label} sublabel={sublabel} color="#22d3ee" radius={0.38} />
          <NetworkEdge start={[OX, 0, 0]} end={pos} color="#22d3ee" opacity={0.3} />
        </group>
      ))}
    </group>
  )
}
