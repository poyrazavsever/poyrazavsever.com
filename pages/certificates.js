'use client';

import Image from 'next/image';
import React from 'react';

const certificates = [
  {
    name: 'Frontend Development Bootcamp',
    organization: 'Kodluyoruz & Patika.dev',
    date: 'Mayıs 2024',
    description: 'HTML, CSS, JavaScript ve React.js konularında uygulamalı eğitim.',
    image: '/certificates/1.jpg',
  },
  {
    name: 'Fullstack Web Developer Eğitimi',
    organization: 'BTK Akademi',
    date: 'Mart 2024',
    description: 'Frontend ve backend teknolojilerini içeren kapsamlı bir yazılım eğitimi.',
    image: '/certificates/1.jpg',
  },
  {
    name: 'Advanced JavaScript',
    organization: 'Udemy',
    date: 'Ocak 2024',
    description: 'Asenkron programlama, modüler yapı ve performans optimizasyonu üzerine ileri seviye JS eğitimi.',
    image: '/certificates/1.jpg',
  },
];

const Certificates = () => {
  return (
    <div className="py-16 text-neutral-800 dark:text-neutral-200">
      <h1 className="text-2xl font-semibold mb-8">Sertifikalarım <span className='text-lg font-medium text-neutral-400'>({certificates.length} adet)</span></h1>
      
      <div className="grid md:grid-cols-2 gap-10">
        {certificates.map((cert, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-start gap-5 border border-neutral-200 dark:border-neutral-700 p-4 rounded-lg transition"
          >
            <div className="relative w-full sm:w-56 h-40 rounded-lg overflow-hidden">
              <Image
                src={cert.image}
                alt={cert.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 space-y-1">
              <h2 className="text-md font-semibold">{cert.name}</h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {cert.organization} – {cert.date}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                {cert.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
