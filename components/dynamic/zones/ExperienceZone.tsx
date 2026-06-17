'use client'
import { useMemo } from 'react'
import { NetworkNode } from '../primitives/NetworkNode'
import { NetworkEdge } from '../primitives/NetworkEdge'
import { TagNode } from '../primitives/TagNode'
import { useThemeStore } from '@/store/themeStore'
import { config } from '@/data/portfolioConfig'
import type { Vector3Tuple } from 'three'

const OX = 90
const JOB_X_OFFSETS = [-6, 0, 6]
const JOB_COLORS = ['#8b5cf6', '#7c3aed', '#5b21b6']

export function ExperienceZone() {
  const locale = useThemeStore((s) => s.locale)
  const { experience } = config

  const jobs = useMemo(() =>
    experience.map((exp, i) => {
      const jobPos: Vector3Tuple = [OX + JOB_X_OFFSETS[i], 0, 0]
      const techNodes = exp.tech.slice(0, 5).map((tech, ti) => ({
        tech,
        pos: [
          jobPos[0] + (ti - 2) * 1.4,
          -2.5 - (ti % 2) * 0.8,
          (ti % 3) * 0.6 - 0.6,
        ] as Vector3Tuple,
      }))
      return { exp, pos: jobPos, color: JOB_COLORS[i], techNodes }
    }),
  [experience])

  return (
    <group>
      {jobs.map(({ exp, pos, color, techNodes }, i) => (
        <group key={i}>
          <NetworkNode
            position={pos}
            label={exp.company}
            sublabel={exp.role[locale]}
            color={color}
            radius={0.65}
          />

          {/* Chain edge to next job */}
          {i < jobs.length - 1 && (
            <NetworkEdge start={pos} end={jobs[i + 1].pos} color="#8b5cf6" opacity={0.4} />
          )}

          {/* Tech tag nodes below */}
          {techNodes.map(({ tech, pos: tpos }) => (
            <group key={tech}>
              <TagNode position={tpos} label={tech} color="#22d3ee" />
              <NetworkEdge start={pos} end={tpos} color="#22d3ee" opacity={0.15} />
            </group>
          ))}
        </group>
      ))}
    </group>
  )
}
