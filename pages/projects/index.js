import React from 'react'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/shared/ProjectCard'

const Projects = () => {
  return (
    <div className='mt-8 max-w-6xl w-full flex flex-col gap-8'>
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Popüler Projelerim</h2>

        <div className="flex flex-wrap gap-6 justify-center sm:justify-between">
        {projects.map((project, idx) => (
            <ProjectCard
            key={idx}
            imageSrc={project.image}
            title={project.title}
            description={project.desc}
            slug={project.slug}
            />
        ))}
        </div>
    </div>
  )
}

export default Projects