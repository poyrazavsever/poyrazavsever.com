import React from 'react';
import { projects } from '@/data/projects';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import fs from 'fs';
import path from 'path';

const ProjectDetail = ({ project, markdownContent }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const locale = router.locale || 'tr';

  if (!project) {
    return (
      <div className='min-h-[70vh] flex items-center justify-center text-5xl font-semibold text-neutral-800 dark:text-neutral-200'>
        {t('projectNotFound')}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-16">
      <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
        {project.title}
      </h1>
      
      <div className="relative w-full h-64 mb-6">
        <Image
          src={project.bannerImage}
          alt={project.title}
          fill
          className="object-cover object-center rounded-lg shadow-sm"
          priority
        />
      </div>

      <p className="text-neutral-600 dark:text-neutral-300 mb-6">
        {project.desc}
      </p>

      <article className="mdCustom">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {markdownContent}
        </ReactMarkdown>
      </article>

      <div className="mt-10">
        <Link
          href="/projects"
          locale={locale}
          className="text-sm text-neutral-500 hover:text-neutral-800 dark:hover:text-white underline"
        >
          {t('backToProjects')} ←
        </Link>
      </div>
    </div>
  );
};

export async function getStaticPaths({ locales }) {
  const paths = [];

  locales.forEach((locale) => {
    projects[locale]?.forEach((project) => {
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
  const project = projects[locale]?.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      notFound: true,
    };
  }

  // content klasöründen markdown dosyasını oku
  let markdownContent = '';
  try {
    const filePath = path.join(process.cwd(), 'content', project.contentFolder, `${locale}.md`);
    markdownContent = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Markdown file not found for ${project.slug} in ${locale}`);
  }

  return {
    props: {
      project,
      markdownContent,
      ...(await serverSideTranslations(locale, ['common', 'layout'])),
    },
  };
}

export default ProjectDetail;