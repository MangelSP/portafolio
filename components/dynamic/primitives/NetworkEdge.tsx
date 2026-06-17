'use client'
import { Line } from '@react-three/drei'
import type { Vector3Tuple } from 'three'

interface Props {
  start: Vector3Tuple
  end: Vector3Tuple
  color?: string
  opacity?: number
}

export function NetworkEdge({ start, end, color = '#8b5cf6', opacity = 0.35 }: Props) {
  return (
    <Line
      points={[start, end]}
      color={color}
      lineWidth={1}
      transparent
      opacity={opacity}
    />
  )
}
