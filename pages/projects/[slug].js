import React from 'react';
import { projects } from '@/data/projects';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ProjectDetail = ({ project }) => {

  if (!project) {
    return <div className='min-h-[70vh] flex items-center justify-center text-5xl font-semibold text-neutral-800 dark:text-neutral-200'>404 - Proje bulunamadı</div>;
  }

  return (
    <div className="py-16">
      <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">{project.title}</h1>
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-64 object-cover object-center rounded-lg mb-6 shadow-sm"
      />
      <p className="text-neutral-600 dark:text-neutral-300 mb-6">{project.desc}</p>

      <article className="mdCustom">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {project.content}
      </ReactMarkdown>
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

export async function getStaticPaths({ locales }) {
  const paths = [];

  locales.forEach((locale) => {
    projects.forEach((project) => {
      paths.push({
        params: { slug: project.slug },
        locale,
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
}


export async function getStaticProps({ params, locale }) {
  const projectMeta = projects.find((p) => p.slug === params.slug);
  let markdownContent = '';

  if (projectMeta?.contentFolder) {
    const filePath = path.join(process.cwd(), 'content', projectMeta.contentFolder, `${locale}.md`);
    if (fs.existsSync(filePath)) {
      markdownContent = fs.readFileSync(filePath, 'utf8');
    }
  }

  return {
    props: {
      project: {
        ...projectMeta,
        content: markdownContent,
      },
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}


export default ProjectDetail;
