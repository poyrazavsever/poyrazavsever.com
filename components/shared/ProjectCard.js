import React from 'react';

const ProjectCard = ({ imageSrc, title, description, slug}) => {
  return (
    <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 p-4 w-full max-w-xs">
      <div className="relative w-full h-48 rounded-lg overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="mt-4 flex flex-col gap-1 items-start">
        <h3 className="text-sm text-neutral-800 dark:text-neutral-200 font-semibold">{title}</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-4">{description}</p>
        <a href={`/projects/${slug}`} className="text-sm text-sky-500 dark:text-sky-600 underline hover:text-sky-800 transition-all cursor-pointer">
            İncele
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
