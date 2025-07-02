'use client';

import React, { useState } from 'react';
import { tech } from '@/data/tech';
import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const TechStack = () => {
  const [selectedCategory, setSelectedCategory] = useState('frontend');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
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

  const currentCategory = categories.find(cat => cat.key === selectedCategory);

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

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <div className="w-full max-w-6xl">
      {/* Dropdown */}
      <div className="relative mb-8">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full sm:w-64 px-4 py-2.5 rounded-lg border border-blue-200 dark:border-blue-800 
            text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center justify-between
            hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span>{currentCategory.label}</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute mt-2 w-full sm:w-64 bg-white dark:bg-neutral-900 border border-blue-200 dark:border-blue-800 
                rounded-lg shadow-sm overflow-hidden z-50"
            >
              {categories.map(cat => (
                <motion.button
                  key={cat.key}
                  onClick={() => {
                    setSelectedCategory(cat.key);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm transition-colors duration-200
                    ${selectedCategory === cat.key 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  whileHover={{ x: 4 }}
                >
                  {cat.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 min-h-96"
        >
          {filteredTech.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              onHoverStart={() => setHoveredItem(item.title)}
              onHoverEnd={() => setHoveredItem(null)}
              className="group relative h-fit"
            >
              <motion.div
                className="flex flex-col items-center text-center p-6 rounded-xl border border-blue-200 dark:border-blue-900 
                  bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm"
                whileHover={{ 
                  y: -5,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <motion.div
                  initial={false}
                  animate={{
                    scale: hoveredItem === item.title ? 1.1 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={`https://skillicons.dev/icons?i=${item.iconName}`}
                    alt={item.title}
                    className="h-12 mb-3 transition-transform duration-300"
                  />
                </motion.div>
                
                <motion.span 
                  className="text-sm font-medium text-blue-900 dark:text-blue-100 line-clamp-1 sm:line-clamp-none"
                  initial={false}
                  animate={{
                    scale: hoveredItem === item.title ? 1.05 : 1
                  }}
                >
                  {item.title}
                </motion.span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TechStack;
