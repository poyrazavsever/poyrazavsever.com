import React from 'react';
import { useTranslation } from 'next-i18next';

const ProjectCard = ({ imageSrc, title, description, slug }) => {
  const { t } = useTranslation('common');

  // Local storage'dan language çek
  let lang = 'tr';
  if (typeof window !== 'undefined') {
    lang = localStorage.getItem('language') || 'tr';
  }

  return (
    <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 p-4 w-full md:max-w-xs">
      <div className="relative w-full h-52 md:h-48 rounded-lg overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="mt-4 flex flex-col gap-1 items-start">
        <h3 className="text-sm text-neutral-800 dark:text-neutral-200 font-semibold">{title}</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-4 break-words whitespace-normal">{description}</p>
        <a
          href={`/${lang}/projects/${slug}`}
          className="text-sm text-sky-500 dark:text-sky-600 underline hover:text-sky-800 transition-all cursor-pointer"
        >
          {t('details')}
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
