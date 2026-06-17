'use client'
import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useThemeStore } from '@/store/themeStore'

const WAYPOINTS = [
  { scroll: 0.00, pos: new THREE.Vector3(0, 0, 20),    look: new THREE.Vector3(0, 0, 0) },
  { scroll: 0.12, pos: new THREE.Vector3(0, 0, 12),    look: new THREE.Vector3(0, 0, 0) },
  { scroll: 0.30, pos: new THREE.Vector3(30, 2, 18),   look: new THREE.Vector3(30, 0, 0) },
  { scroll: 0.50, pos: new THREE.Vector3(30, 0, 10),   look: new THREE.Vector3(30, 0, 0) },
  { scroll: 0.62, pos: new THREE.Vector3(60, 4, 20),   look: new THREE.Vector3(60, 0, 0) },
  { scroll: 0.72, pos: new THREE.Vector3(60, 0, 12),   look: new THREE.Vector3(60, 0, 0) },
  { scroll: 0.82, pos: new THREE.Vector3(90, 2, 18),   look: new THREE.Vector3(90, 0, 0) },
  { scroll: 0.90, pos: new THREE.Vector3(90, 0, 10),   look: new THREE.Vector3(90, 0, 0) },
  { scroll: 1.00, pos: new THREE.Vector3(120, 0, 14),  look: new THREE.Vector3(120, 0, 0) },
]

export function CameraRig() {
  const { camera } = useThree()
  const setScrollProgress = useThemeStore((s) => s.setScrollProgress)
  const progressRef = useRef(0)
  const targetPos = useRef(new THREE.Vector3(0, 0, 20))
  const lookRef = useRef(new THREE.Vector3(0, 0, 0))

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight
      if (maxScroll <= 0) return
      const p = Math.max(0, Math.min(1, window.scrollY / maxScroll))
      progressRef.current = p
      setScrollProgress(p)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [setScrollProgress])

  useFrame(() => {
    const t = progressRef.current

    let i = 0
    while (i < WAYPOINTS.length - 2 && t > WAYPOINTS[i + 1].scroll) i++
    const a = WAYPOINTS[i], b = WAYPOINTS[i + 1]
    const span = b.scroll - a.scroll
    const local = span > 0 ? Math.max(0, Math.min(1, (t - a.scroll) / span)) : 0

    targetPos.current.lerpVectors(a.pos, b.pos, local)
    lookRef.current.lerpVectors(a.look, b.look, local)

    camera.position.lerp(targetPos.current, 0.08)
    camera.lookAt(lookRef.current)
  })

  return null
}
