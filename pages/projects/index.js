import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/shared/ProjectCard'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FiStar, FiGitBranch, FiEye, FiGithub } from 'react-icons/fi'
import { BiGitRepoForked } from 'react-icons/bi'
import { AiOutlineClockCircle } from 'react-icons/ai'

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
  const [search, setSearch] = useState('');
  const { t } = useTranslation('projects');
  const router = useRouter();
  const locale = router.locale || 'tr';

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`)
      .then(res => res.json())
      .then(data => setRepos(data));
  }, []);

  // Arama filtresi
  const filteredProjects = projects[locale]?.filter(project =>
    project.title.toLowerCase().includes(search.toLowerCase()) ||
    (project.desc && project.desc.toLowerCase().includes(search.toLowerCase()))
  ) || [];

  return (
    <div className='mt-8 max-w-6xl w-full flex flex-col gap-8 px-4 sm:px-6 lg:px-8'>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">{t('popularProject')}</h2>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full sm:w-64"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, idx) => (
            <div key={idx} className="flex justify-center">
              <ProjectCard
                imageSrc={project.image}
                title={project.title}
                description={project.desc}
                slug={project.slug}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-neutral-500 dark:text-neutral-400 text-center">{t('noProjectFound')}</div>
        )}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos && repos.length > 0 ? (
              repos.map(repo => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 bg-white/50 dark:bg-neutral-900/30 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-400"
                >
                  <div className="flex items-center gap-2 font-semibold text-neutral-800 dark:text-neutral-100 mb-3">
                    <FiGithub className="text-neutral-600 dark:text-neutral-400" />
                    <span className="truncate group-hover:text-blue-500 transition-colors">{repo.name}</span>
                  </div>
                  
                  <div className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 min-h-[40px] mb-4">
                    {repo.description || '-'}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                        <FiStar className="text-amber-500" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                        <BiGitRepoForked className="text-emerald-500" />
                        {repo.forks_count}
                      </span>
                      {repo.watchers_count > 0 && (
                        <span className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                          <FiEye className="text-blue-500" />
                          {repo.watchers_count}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
                      <AiOutlineClockCircle />
                      <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {repo.language && (
                    <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-700">
                      <span className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        {repo.language}
                      </span>
                    </div>
                  )}
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