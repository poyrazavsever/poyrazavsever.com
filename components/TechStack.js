'use client';

import React, { useState } from 'react';
import { tech } from '@/data/tech';

const categories = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'language', label: 'Programlama Dilleri' },
  { key: 'backend', label: 'Backend' },
  { key: 'database', label: 'Veri Tabanı' },
  { key: 'tool', label: 'Araçlar' },
  { key: 'platform', label: 'Platformlar' },
];

const TechStack = () => {
  const [selectedCategory, setSelectedCategory] = useState('frontend');

  const filteredTech = tech.filter(item => item.category === selectedCategory);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Kategori Butonları */}
      <div className="flex flex-wrap gap-3 justify-center sm:justify-start mb-6">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-4 py-2 rounded-md cursor-pointer text-sm font-medium border transition-all ${
              selectedCategory === cat.key
                ? 'bg-neutral-700 dark:bg-neutral-900 border-none text-white'
                : 'bg-white dark:bg-neutral-600 text-neutral-700 dark:text-neutral-200 border-neutral-300 dark:border-neutral-600'
            } transition`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Kartlar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredTech.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 rounded-md border border-neutral-300 dark:border-neutral-700"
          >
            <img
              src={`https://skillicons.dev/icons?i=${item.iconName}`}
              alt={item.title}
              className="h-10 mb-2"
            />
            <span className="text-sm font-medium text-neutral-800 dark:text-neutral-300">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
