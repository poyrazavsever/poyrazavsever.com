import React, { useEffect, useState } from 'react'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/shared/ProjectCard'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['projects', 'layout'])),
    },
  }
}

const GITHUB_USERNAME = "poyrazavsever";

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const { t } = useTranslation('projects');

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`)
      .then(res => res.json())
      .then(data => setRepos(data));
  }, []);

  return (
    <div className='mt-8 max-w-6xl w-full flex flex-col gap-8'>
      <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">{t('popularProject')}</h2>

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

      {/* GitHub Bölümü */}
      <div className="mt-12 flex flex-col gap-6 items-center">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">GitHub Aktivitelerim</h3>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          @{GITHUB_USERNAME} GitHub Profilim
        </a>
        {/* Contributions Chart */}
        <img
          src={`https://ghchart.rshah.org/${GITHUB_USERNAME}`}
          alt="GitHub contributions chart"
          className="w-full max-w-xl rounded border dark:border-neutral-700"
        />
        {/* Repo Listesi */}
        <div className="w-full max-w-xl">
          <h4 className="text-md font-semibold mb-2">Son GitHub Repolarım</h4>
          <ul className="space-y-2">
            {repos && repos.length > 0 ? (
              repos.map(repo => (
                <li key={repo.id}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {repo.name}
                  </a>
                  <span className="text-xs text-neutral-500 ml-2">{repo.description}</span>
                </li>
              ))
            ) : (
              <li>Yükleniyor...</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Projects