import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const BlogCard = ({ cardImage, title, description, slug }) => {
  const { t } = useTranslation('common');

  // Local storage'dan language çek
  let lang = 'tr';
  if (typeof window !== 'undefined') {
    lang = localStorage.getItem('language') || 'tr';
  }

  return (
    <Link href={`/${lang}/blog/${slug}`}>
      <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 p-4 w-full sm:max-w-xs group 
      transition-all duration-300 hover:border-blue-200 dark:hover:border-blue-800 cursor-pointer">
        <div className="relative w-full h-48 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          <Image
            src={cardImage}
            alt={title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="mt-4 flex flex-col gap-2 items-start">
          <h3 className="text-neutral-800 dark:text-neutral-200 font-semibold line-clamp-1 transition-colors duration-300 
            group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {title}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
            {description}
          </p>
          <div 
            className="mt-2 text-sm inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 
              group-hover:gap-3 transition-all duration-300 relative pointer-events-none"
          >
            <span className="border-b border-transparent group-hover:border-current transition-all duration-300">
              {t('details')}
            </span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 transition-transform duration-300 -translate-y-px"
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
