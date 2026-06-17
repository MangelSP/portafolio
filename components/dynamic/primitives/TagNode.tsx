'use client'
import { Html } from '@react-three/drei'

interface Props {
  position: [number, number, number]
  label: string
  color?: string
}

export function TagNode({ position, label, color = '#22d3ee' }: Props) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.18, 10, 10]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.1} />
      </mesh>
      <Html
        position={[0, 0.35, 0]}
        center
        distanceFactor={12}
        occlude
        style={{ pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap' }}
      >
        <div style={{ color: color, fontSize: 9, fontFamily: 'Montserrat, sans-serif', opacity: 0.9 }}>
          {label}
        </div>
      </Html>
    </group>
  )
}
