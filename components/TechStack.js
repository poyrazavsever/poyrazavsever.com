'use client';

import React, { useState } from 'react';
import { tech } from '@/data/tech';
import { useTranslation } from 'next-i18next';




const TechStack = () => {
  const [selectedCategory, setSelectedCategory] = useState('frontend');

  const filteredTech = tech.filter(item => item.category === selectedCategory);

  const {t} = useTranslation("common")

  const categories = [
    { key: 'language', label: t('language') },
    { key: 'frontend', label: t('frontend') },
    { key: 'backend', label: t('backend') },
    { key: 'database', label: t('database') },
    { key: 'tool', label: t('tool') },
    { key: 'platform', label: t('platform') },
  ]

  return (
    <div className="w-full max-w-6xl">
      {/* Kategori Butonları */}
      <div className="flex flex-wrap gap-3 justify-start mb-6">
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 min-h-96">
        {filteredTech.map((item, index) => (
          <div
            key={index}
            className="h-fit flex flex-col items-center text-center p-4 rounded-md border border-neutral-300 dark:border-neutral-700"
          >
            <img
              src={`https://skillicons.dev/icons?i=${item.iconName}`}
              alt={item.title}
              className="h-10 mb-2"
            />
            <span className="text-sm font-medium text-neutral-800 dark:text-neutral-300 line-clamp-1 sm:line-clamp-none">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
