'use client'
import { CameraRig } from './CameraRig'
import { IntroZone } from './zones/IntroZone'
import { ProjectsZone } from './zones/ProjectsZone'
import { SkillsZone } from './zones/SkillsZone'
import { ExperienceZone } from './zones/ExperienceZone'
import { ContactZone } from './zones/ContactZone'

export function NetworkScene() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 10, 10]} intensity={1.5} color="#8b5cf6" />
      <pointLight position={[60, 5, 8]} intensity={0.8} color="#22d3ee" />
      <pointLight position={[120, 0, 10]} intensity={1.0} color="#8b5cf6" />

      <CameraRig />
      <IntroZone />
      <ProjectsZone />
      <SkillsZone />
      <ExperienceZone />
      <ContactZone />
    </>
  )
}
