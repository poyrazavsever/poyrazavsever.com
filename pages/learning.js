'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { BiBook, BiCheckCircle, BiTime, BiLink } from 'react-icons/bi';
import { SiNestjs, SiDocker } from 'react-icons/si';

const Learning = () => {
  const { t } = useTranslation('learning');
  
  const learningTracks = [
    {
      title: 'NestJS',
      icon: SiNestjs,
      progress: 45,
      startDate: '2025-06-15',
      status: 'in-progress',
      resources: [
        {
          title: 'NestJS Documentation',
          url: 'https://docs.nestjs.com/',
          type: 'documentation'
        },
        {
          title: 'NestJS Zero to Hero',
          url: 'https://www.udemy.com/course/nestjs-zero-to-hero/',
          type: 'course'
        },
        {
          title: 'NestJS GitHub Repository',
          url: 'https://github.com/nestjs/nest',
          type: 'github'
        }
      ],
      currentFocus: [
        'Controllers and Routing',
        'Dependency Injection',
        'Database Integration',
        'Authentication & Authorization'
      ],
      nextTopics: [
        'Microservices',
        'WebSockets',
        'Testing'
      ]
    },
    {
      title: 'Docker',
      icon: SiDocker,
      progress: 30,
      startDate: '2025-06-20',
      status: 'in-progress',
      resources: [
        {
          title: 'Docker Documentation',
          url: 'https://docs.docker.com/',
          type: 'documentation'
        },
        {
          title: 'Docker & Kubernetes: The Practical Guide',
          url: 'https://www.udemy.com/course/docker-kubernetes-the-practical-guide/',
          type: 'course'
        }
      ],
      currentFocus: [
        'Container Basics',
        'Dockerfile Creation',
        'Docker Compose',
        'Volume Management'
      ],
      nextTopics: [
        'Multi-Stage Builds',
        'Container Orchestration',
        'Docker Swarm'
      ]
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">{t('title')}</h1>

        <div className="grid gap-8">
          {learningTracks.map((track, index) => (
            <motion.div
              key={track.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-200 dark:border-neutral-700"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                  <track.icon size={24} />
                </div>                  <div>
                  <h2 className="text-2xl font-bold">{track.title}</h2>
                  <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                    <BiTime />
                    <span>{t('startedOn')} {new Date(track.startDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{t('progress')}</span>
                  <span className="text-sm font-medium">{track.progress}%</span>
                </div>
                <div className="h-2 bg-neutral-100 dark:bg-neutral-700 rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${track.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className="h-full bg-blue-500 rounded-full"
                  />
                </div>
              </div>

              {/* Current Focus */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">{t('currentlyLearning')}</h3>
                <div className="grid gap-2">
                  {track.currentFocus.map((topic, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <BiCheckCircle className="text-blue-500 flex-shrink-0" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Topics */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">{t('comingUpNext')}</h3>
                <div className="grid gap-2">
                  {track.nextTopics.map((topic, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <BiBook className="flex-shrink-0" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-lg font-semibold mb-3">{t('learningResources')}</h3>
                <div className="grid gap-2">
                  {track.resources.map((resource, i) => (
                    <a
                      key={i}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <BiLink className="flex-shrink-0" />
                      <span>{resource.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Learning;

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['learning', 'layout'])),
    },
  };
};
