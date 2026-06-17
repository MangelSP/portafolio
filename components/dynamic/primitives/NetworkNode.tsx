'use client'
import { Html } from '@react-three/drei'
import type { Vector3 } from 'three'

interface Props {
  position: [number, number, number] | Vector3
  label: string
  sublabel?: string
  color?: string
  radius?: number
}

export function NetworkNode({ position, label, sublabel, color = '#8b5cf6', radius = 0.5 }: Props) {
  return (
    <group position={position as [number, number, number]}>
      <mesh>
        <sphereGeometry args={[radius, 24, 24]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.2} metalness={0.7} />
      </mesh>
      {/* glow shell */}
      <mesh scale={1.5}>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshStandardMaterial color={color} transparent opacity={0.06} />
      </mesh>
      <Html
        position={[0, radius + 0.4, 0]}
        center
        distanceFactor={10}
        occlude
        style={{ pointerEvents: 'none', userSelect: 'none', textAlign: 'center', whiteSpace: 'nowrap' }}
      >
        <div style={{ color: '#ffffff', fontSize: 13, fontWeight: 600, fontFamily: 'Montserrat, sans-serif', textShadow: `0 0 10px ${color}` }}>
          {label}
        </div>
        {sublabel && (
          <div style={{ color: '#94a3b8', fontSize: 10, marginTop: 2, fontFamily: 'Montserrat, sans-serif' }}>
            {sublabel}
          </div>
        )}
      </Html>
    </group>
  )
}
