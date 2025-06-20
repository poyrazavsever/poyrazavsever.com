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
      <div className="my-12 flex flex-col gap-8 w-full">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">{t('githubActivities')}</h3>
        {/* Contributions Chart */}
        <div className="flex flex-col gap-2">
          <span className="text-sm text-neutral-600 dark:text-neutral-400">{t('githubContributions')}</span>
          <div className="bg-white dark:bg-neutral-900/30 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700 w-full flex justify-center">
            <img
              src={`https://ghchart.rshah.org/${GITHUB_USERNAME}`}
              alt="GitHub contributions chart"
              className="w-full max-w-xl rounded"
              style={{ background: 'transparent' }}
            />
          </div>
        </div>
        {/* Repo Listesi */}
        <div className="w-full">
          <h4 className="text-md font-semibold mb-4 text-neutral-800 dark:text-neutral-200">{t('latestRepos')}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {repos && repos.length > 0 ? (
              repos.map(repo => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 bg-white dark:bg-neutral-900/30 hover:shadow-md transition hover:border-blue-400 dark:hover:border-blue-400"
                >
                  <div className="font-semibold text-neutral-800 dark:text-neutral-100 mb-1">{repo.name}</div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">{repo.description || '-'}</div>
                </a>
              ))
            ) : (
              <div className="col-span-full text-center text-neutral-500 dark:text-neutral-400">{t('loading')}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects