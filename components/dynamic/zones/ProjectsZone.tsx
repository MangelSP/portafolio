'use client'
import { useMemo } from 'react'
import { NetworkNode } from '../primitives/NetworkNode'
import { NetworkEdge } from '../primitives/NetworkEdge'
import { TagNode } from '../primitives/TagNode'
import { useThemeStore } from '@/store/themeStore'
import { config } from '@/data/portfolioConfig'
import type { Vector3Tuple } from 'three'

const OX = 30 // zone X offset

// Distribute 8 projects in two arcs around hub at (OX, 0, 0)
const PROJECT_OFFSETS: Vector3Tuple[] = [
  [-7,  5, -2],
  [-4,  7,  2],
  [ 0,  8, -3],
  [ 5,  7,  2],
  [ 8,  4, -1],
  [ 8, -3,  2],
  [ 4, -6, -2],
  [-3, -6,  1],
]

// For each project, place 3 tags in a small triangle around the project node
function tagOffsets(i: number): Vector3Tuple[] {
  const angle = (i * 137.5 * Math.PI) / 180
  return [
    [Math.cos(angle) * 2.2, Math.sin(angle) * 2.2, 0.8],
    [Math.cos(angle + 2.1) * 2.0, Math.sin(angle + 2.1) * 2.0, -0.8],
    [Math.cos(angle + 4.2) * 1.8, Math.sin(angle + 4.2) * 1.8, 0.4],
  ] as Vector3Tuple[]
}

export function ProjectsZone() {
  const locale = useThemeStore((s) => s.locale)
  const { projects } = config

  const items = useMemo(() =>
    projects.slice(0, 8).map((p, i) => {
      const [ox, oy, oz] = PROJECT_OFFSETS[i]
      const pos: Vector3Tuple = [OX + ox, oy, oz]
      const tags = p.tags.slice(0, 3).map((tag, ti) => {
        const [tx, ty, tz] = tagOffsets(i)[ti]
        return { tag, pos: [pos[0] + tx, pos[1] + ty, pos[2] + tz] as Vector3Tuple }
      })
      return { project: p, pos, tags }
    }),
  [projects])

  return (
    <group>
      {/* Hub node */}
      <NetworkNode
        position={[OX, 0, 0]}
        label={locale === 'en' ? 'Projects' : 'Proyectos'}
        color="#8b5cf6"
        radius={1.0}
      />

      {items.map(({ project, pos, tags }) => (
        <group key={project.id}>
          {/* Project node */}
          <NetworkNode
            position={pos}
            label={project.title}
            sublabel={project.category}
            color="#a78bfa"
            radius={0.5}
          />
          {/* Edge to hub */}
          <NetworkEdge start={[OX, 0, 0]} end={pos} color="#8b5cf6" opacity={0.25} />

          {/* Tag nodes */}
          {tags.map(({ tag, pos: tpos }) => (
            <group key={tag}>
              <TagNode position={tpos} label={tag} />
              <NetworkEdge start={pos} end={tpos} color="#22d3ee" opacity={0.2} />
            </group>
          ))}
        </group>
      ))}
    </group>
  )
}
