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
    <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 p-4 w-full max-w-xs">
      <div className="relative w-full h-48 rounded-lg overflow-hidden">
        <Image
          src={cardImage}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="mt-4 flex flex-col gap-1 items-start">
        <h3 className="text-neutral-800 dark:text-neutral-200 font-semibold line-clamp-1">{title}</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-1">{description}</p>
        <Link href={`/${lang}/blog/${slug}`}>
          <span className="text-sm text-sky-500 dark:text-sky-400 underline hover:text-sky-800 transition-all cursor-pointer mt-2">
            {t('details')}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
