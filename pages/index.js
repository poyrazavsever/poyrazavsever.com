import HeroSection from '@/components/HeroSection';
import ProjectCard from '@/components/shared/ProjectCard';
import { projects } from '@/data/projects'; // path'ini doğru ayarla

export default function Home() {
  const populerProjects = projects.filter(project => project.populer);

  return (
    <div className="w-full flex flex-col items-center justify-center">

      {/* Hero Section*/ }
      <HeroSection />
      
      {/* Popüler Projeler */}
      {populerProjects.length > 0 && (
        <div className="my-10 max-w-6xl w-full">
          <h2 className="text-xl font-semibold mb-8 text-neutral-800">Popüler Projelerim</h2>

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

        </div>
      )}


    </div>
  );
}
