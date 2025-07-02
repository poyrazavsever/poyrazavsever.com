import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';

const ProjectCard = ({ imageSrc, title, description, slug }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const locale = router.locale || 'tr';

  return (
    <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 p-4 w-full md:max-w-xs group transition-all duration-300 hover:border-blue-200 dark:hover:border-blue-800">
      <div className="relative w-full h-52 md:h-48 rounded-lg overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex flex-col gap-1.5 items-start">
        <h3 className="text-sm text-neutral-800 dark:text-neutral-200 font-semibold transition-colors duration-300 group-hover:text-blue-700 dark:group-hover:text-blue-300">
          {title}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-4 break-words whitespace-normal">
          {description}
        </p>
        <Link
          href={`/projects/${slug}`}
          locale={locale}
          className="mt-2 text-sm inline-flex items-center border border-blue-200 dark:border-blue-800 px-4 py-1.5 rounded-lg
          text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300"
        >
          <span>{t('details')}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;