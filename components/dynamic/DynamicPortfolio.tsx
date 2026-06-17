'use client'
import { IntroSlide } from './slides/IntroSlide'
import { ProjectsSlide } from './slides/ProjectsSlide'
import { SkillsSlide } from './slides/SkillsSlide'
import { ExperienceSlide } from './slides/ExperienceSlide'
import { ContactSlide } from './slides/ContactSlide'

export default function DynamicPortfolio() {
  return (
    <div className="w-full">
      <IntroSlide />
      <ProjectsSlide />
      <SkillsSlide />
      <ExperienceSlide />
      <ContactSlide />
    </div>
  )
}
