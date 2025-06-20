import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/shared/ProjectCard';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Designs = () => {
  const { t } = useTranslation('designs');
  const designProjects = projects.filter((project) => project.category === 'design');

  return (
    <div className="w-full flex flex-col items-center justify-center pt-4 pb-8 md:py-24 text-neutral-800 dark:text-neutral-200">
      
      {/* Hero Section */}
      <div className="max-w-6xl w-full flex flex-col sm:flex-row items-center gap-10 mb-16">
        <div className="relative w-full sm:w-1/2 h-72 rounded-xl overflow-hidden">
          <Image
            src="/designs/hero.png"
            alt="UI UX tasarım"
            fill
            className="object-cover"
          />
        </div>

        <div className="w-full sm:w-1/2 space-y-3 text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800 dark:text-neutral-100">
            {t('title')}
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {t('description')}
          </p>
          <Link
            href="/contact"
            className="w-full block text-center bg-neutral-600 text-white px-4 py-2 rounded-md text-sm hover:bg-neutral-800 dark:hover:bg-neutral-700 transition cursor-pointer"
          >
            {t('button')}
          </Link>
        </div>
      </div>

      {/* Design Projects */}
      {designProjects.length > 0 && (
        <div className="max-w-6xl w-full flex flex-col gap-6 mt-16">
          <h2 className="text-xl font-semibold">{t('sectionTitle')}</h2>

          <div className="flex flex-wrap gap-6 justify-center sm:justify-between">
            {designProjects.map((project, idx) => (
              <ProjectCard
                key={idx}
                imageSrc={project.bannerImage}
                title={project.title}
                description={project.desc}
                slug={project.slug}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['designs', 'layout'])),
    },
  };
}

export default Designs;
