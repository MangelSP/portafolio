'use client'
import { useMemo } from 'react'
import { NetworkNode } from '../primitives/NetworkNode'
import { NetworkEdge } from '../primitives/NetworkEdge'
import { TagNode } from '../primitives/TagNode'
import { useThemeStore } from '@/store/themeStore'
import { config } from '@/data/portfolioConfig'
import type { Vector3Tuple } from 'three'

const OX = 60
const CLUSTER_CENTERS: Vector3Tuple[] = [
  [OX - 7, 3, 0],
  [OX,     0, 0],
  [OX + 7, 3, 0],
]
const CLUSTER_COLORS = ['#8b5cf6', '#22d3ee', '#a78bfa']

// Golden ratio sphere distribution
function goldenSphere(index: number, total: number, cx: number, cy: number, cz: number, r: number): Vector3Tuple {
  const phi = Math.acos(1 - (2 * (index + 0.5)) / total)
  const theta = (Math.PI * (1 + Math.sqrt(5)) * index)
  return [
    cx + r * Math.sin(phi) * Math.cos(theta),
    cy + r * Math.sin(phi) * Math.sin(theta),
    cz + r * Math.cos(phi),
  ]
}

export function SkillsZone() {
  const locale = useThemeStore((s) => s.locale)
  const { expertise } = config

  const clusters = useMemo(() =>
    expertise.map((e, ci) => {
      const [cx, cy, cz] = CLUSTER_CENTERS[ci]
      const skillNodes = e.skills.map((skill, si) => ({
        skill,
        pos: goldenSphere(si, e.skills.length, cx, cy, cz, 3.5),
      }))
      return { expertise: e, center: CLUSTER_CENTERS[ci], color: CLUSTER_COLORS[ci], skillNodes }
    }),
  [expertise])

  return (
    <group>
      {clusters.map(({ expertise: e, center, color, skillNodes }, ci) => (
        <group key={ci}>
          {/* Cluster center */}
          <NetworkNode
            position={center}
            label={e.category[locale]}
            color={color}
            radius={0.75}
          />

          {/* Inter-cluster edges */}
          {ci < clusters.length - 1 && (
            <NetworkEdge start={center} end={clusters[ci + 1].center} color="#4c1d95" opacity={0.2} />
          )}

          {/* Skill nodes */}
          {skillNodes.map(({ skill, pos }) => (
            <group key={skill}>
              <TagNode position={pos as Vector3Tuple} label={skill} color={color} />
              <NetworkEdge start={center} end={pos as Vector3Tuple} color={color} opacity={0.15} />
            </group>
          ))}
        </group>
      ))}
    </group>
  )
}
