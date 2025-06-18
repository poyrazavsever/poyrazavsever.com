import React from 'react';

const ProjectCard = ({ imageSrc, title, description}) => {
  return (
    <div className="rounded-xl overflow-hidden border border-neutral-200 p-4 w-full max-w-xs">
      <div className="relative w-full h-48 rounded-lg overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-sm text-gray-800 font-semibold">{title}</h3>
        <p className="text-sm text-neutral-600 mt-1">{description}</p>
        <a className="mt-3 text-sm text-sky-500 hover:underline">
            İncele
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
