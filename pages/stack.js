import React from 'react'
import TechStack from '@/components/TechStack'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { motion } from 'framer-motion'

const Stack = () => {
  const { t } = useTranslation(['common', 'stack'])

  const githubStats = [
    { language: 'JavaScript', percentage: 40, color: '#f1e05a' },
    { language: 'TypeScript', percentage: 25, color: '#2b7489' },
    { language: 'Python', percentage: 20, color: '#3572A5' },
    { language: 'HTML/CSS', percentage: 10, color: '#e34c26' },
    { language: 'Others', percentage: 5, color: '#8F8F8F' }
  ]

  const codingStats = [
    { title: t('stack:commitsThisYear'), value: '1,234+' },
    { title: t('stack:pullRequests'), value: '156' },
    { title: t('stack:projects'), value: '25+' },
    { title: t('stack:contributions'), value: '2,500+' }
  ]

  const developmentTools = [
    { 
      name: 'VS Code', 
      description: t('stack:vscodeDescription'), 
      icon: 'https://skillicons.dev/icons?i=vscode' 
    },
    { 
      name: 'GitHub Copilot', 
      description: t('stack:copilotDescription'), 
      icon: 'https://skillicons.dev/icons?i=github' 
    },
    { 
      name: 'Docker', 
      description: t('stack:dockerDescription'), 
      icon: 'https://skillicons.dev/icons?i=docker' 
    },
    { 
      name: 'Postman', 
      description: t('stack:postmanDescription'), 
      icon: 'https://skillicons.dev/icons?i=postman' 
    }
  ]

  return (
    <div className='flex flex-col items-start gap-12 w-full py-8 md:py-16'>
      {/* Tech Stack Section */}
      <section className="w-full">
        <motion.h2 
          className="text-2xl font-semibold text-blue-500 dark:text-blue-300 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('common:usedTech')}
        </motion.h2>
        <TechStack />
      </section>

      {/* GitHub Language Stats */}
      <section className="w-full">
        <motion.h2 
          className="text-2xl font-semibold text-blue-500 dark:text-blue-300 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t('stack:mostUsedLanguages')}
        </motion.h2>
        <motion.div 
          className="grid gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {githubStats.map((lang, index) => (
            <motion.div 
              key={lang.language}
              className="relative border border-blue-100 dark:border-blue-900 rounded-lg p-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-between mb-2">
                <span className="text-blue-900 dark:text-blue-100 font-medium">{lang.language}</span>
                <span className="text-blue-600 dark:text-blue-400">{lang.percentage}%</span>
              </div>
              <div className="h-2 bg-blue-50 dark:bg-blue-950 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full rounded-full"
                  style={{ backgroundColor: lang.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${lang.percentage}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Coding Statistics */}
      <section className="w-full">
        <motion.h2 
          className="text-2xl font-semibold text-blue-500 dark:text-blue-300 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {t('stack:codingStatistics')}
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {codingStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              className="border border-blue-100 dark:border-blue-900 rounded-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            >
              <motion.h3 
                className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.6 + index * 0.1 }}
              >
                {stat.value}
              </motion.h3>
              <p className="text-sm text-blue-900/70 dark:text-blue-100/70">{stat.title}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Development Tools */}
      <section className="w-full">
        <motion.h2 
          className="text-2xl font-semibold text-blue-500 dark:text-blue-300 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {t('stack:developmentEnvironment')}
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-4">
          {developmentTools.map((tool, index) => (
            <motion.div
              key={tool.name}
              className="border border-blue-100 dark:border-blue-900 rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-start gap-4">
                <img src={tool.icon} alt={tool.name} className="w-8 h-8" />
                <div>
                  <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-1">{tool.name}</h3>
                  <p className="text-sm text-blue-900/70 dark:text-blue-100/70">{tool.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GitHub Activity Calendar */}
      <section className="w-full">
        <motion.h2 
          className="text-2xl font-semibold text-blue-500 dark:text-blue-300 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {t('stack:githubActivity')}
        </motion.h2>
        <motion.div 
          className="border border-blue-100 dark:border-blue-900 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <img 
            src={`https://ghchart.rshah.org/0969DA/poyrazavsever`} 
            alt="GitHub Contribution Graph"
            className="w-full dark:opacity-90"
          />
        </motion.div>
      </section>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'stack'])),
    },
  }
}

export default Stack

