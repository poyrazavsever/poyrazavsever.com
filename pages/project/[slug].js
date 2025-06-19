import React from 'react';
import { useRouter } from 'next/router';
import { projects } from '@/data/projects';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ProjectDetail = ({ project }) => {
  const router = useRouter();

  if (!project) {
    return <div className='min-h-[70vh] flex items-center justify-center text-5xl font-semibold text-neutral-800 dark:text-neutral-200'>404 - Proje bulunamadı</div>;
  }

  return (
    <div className="py-16">
      <h1 className="text-3xl font-bold text-neutral-800 dark:text-white mb-4">{project.title}</h1>
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-64 object-cover object-center rounded-lg mb-6 shadow-sm"
      />
      <p className="text-neutral-600 dark:text-neutral-300 mb-6">{project.desc}</p>

      <article className="prose dark:prose-invert max-w-none">
        <ReactMarkdown>{project.content}</ReactMarkdown>
      </article>

      <div className="mt-10">
        <Link
          href="/projects"
          className="text-sm text-neutral-500 hover:text-neutral-800 dark:hover:text-white underline"
        >
          ← Tüm projelere dön
        </Link>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  return {
    paths: projects.map((project) => ({
      params: { slug: project.slug },
    })),
    fallback: false, 
  };
}

export async function getStaticProps({ params, locale }) {
  const project = projects.find((p) => p.slug === params.slug);
  console.log(params, project);
  
  return {
    props: {
      project: project || null,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default ProjectDetail;
