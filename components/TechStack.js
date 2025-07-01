'use client';

import React, { useState } from 'react';
import { tech } from '@/data/tech';
import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const TechStack = () => {
  const [selectedCategory, setSelectedCategory] = useState('frontend');
  const [hoveredItem, setHoveredItem] = useState(null);
  const { t } = useTranslation("common")

  const filteredTech = tech.filter(item => item.category === selectedCategory);

  const categories = [
    { key: 'language', label: t('language') },
    { key: 'frontend', label: t('frontend') },
    { key: 'backend', label: t('backend') },
    { key: 'database', label: t('database') },
    { key: 'tool', label: t('tool') },
    { key: 'platform', label: t('platform') },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <div className="w-full max-w-6xl">
      {/* Kategori Butonları */}
      <motion.div 
        className="flex flex-wrap gap-3 justify-start mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {categories.map(cat => (
          <motion.button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-6 py-2.5 rounded-lg cursor-pointer text-sm font-medium relative overflow-hidden ${
              selectedCategory === cat.key
                ? 'text-white'
                : 'bg-white/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white'
            } backdrop-blur-sm transition-colors duration-300`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {selectedCategory === cat.key && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-neutral-700 to-neutral-800 dark:from-neutral-600 dark:to-neutral-700"
                layoutId="activeCategory"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{cat.label}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Kartlar */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 min-h-96"
        >
          {filteredTech.map((item, index) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              onHoverStart={() => setHoveredItem(item.title)}
              onHoverEnd={() => setHoveredItem(null)}
              className="group relative h-fit"
            >
              <motion.div
                className={`flex flex-col items-center text-center p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm
                  ${hoveredItem === item.title ? 'shadow-lg dark:shadow-neutral-900/30' : 'shadow-md dark:shadow-none'}
                `}
                whileHover={{ 
                  y: -5,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <motion.div
                  initial={false}
                  animate={{
                    scale: hoveredItem === item.title ? 1.1 : 1,
                    rotate: hoveredItem === item.title ? [0, -5, 5, 0] : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={`https://skillicons.dev/icons?i=${item.iconName}`}
                    alt={item.title}
                    className="h-12 mb-3 filter drop-shadow-md transition-transform duration-300"
                  />
                </motion.div>
                
                <motion.span 
                  className="text-sm font-medium text-neutral-800 dark:text-neutral-200 line-clamp-1 sm:line-clamp-none"
                  initial={false}
                  animate={{
                    scale: hoveredItem === item.title ? 1.05 : 1
                  }}
                >
                  {item.title}
                </motion.span>

                {/* Decorative gradient background */}
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-neutral-100/50 to-neutral-200/50 dark:from-neutral-700/30 dark:to-neutral-800/30 -z-10"
                  initial={false}
                  animate={{
                    opacity: hoveredItem === item.title ? 1 : 0
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TechStack;
