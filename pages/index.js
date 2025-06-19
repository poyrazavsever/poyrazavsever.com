import HeroSection from '@/components/HeroSection';
import ProjectCard from '@/components/shared/ProjectCard';
import TechStack from '@/components/TechStack';
import { projects } from '@/data/projects';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  const populerProjects = projects.filter(project => project.populer);

  return (
    <div className="w-full flex flex-col items-center justify-center">

      {/* Hero Section*/ }
      <HeroSection />
      
      {/* Popüler Projeler */}
      {populerProjects.length > 0 && (
        <div className="my-10 max-w-6xl w-full flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Popüler Projelerim</h2>

          <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
            {populerProjects.map((project, idx) => (
              <ProjectCard
                key={idx}
                imageSrc={project.image}
                title={project.title}
                description={project.desc}
              />
            ))}
          </div>

          <Link href='/project' className='bg-neutral-600 w-fit text-white px-4 py-2 rounded-md text-sm dark:hover:bg-neutral-700 hover:bg-neutral-800 transition cursor-pointer'>Bütün Projeleri Gör</Link>
        </div>
      )}

      {/* Tech Stack*/}
      <div className='flex flex-col items-start gap-8 w-full py-24'>
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Kullandığım Teknolojiler</h2>
        <TechStack />
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
