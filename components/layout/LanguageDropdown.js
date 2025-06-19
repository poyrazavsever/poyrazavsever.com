'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLanguage } from 'react-icons/fa6';

const languages = [
  { id: 'en', label: 'İngilizce' },
  { id: 'tr', label: 'Türkçe' },
  { id: 'de', label: 'Almanca' },
  { id: 'es', label: 'İspanyolca' },
];

const LanguageDropdown = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('en');
  const dropdownRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || router.locale || 'en';
    setSelected(savedLanguage);
  }, [router.locale]);

  const handleLanguageChange = (langId) => {
    localStorage.setItem('language', langId);
    setSelected(langId);
    setOpen(false);
    router.push(router.asPath, router.asPath, { locale: langId }); // locale değiştir
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer transition-transform hover:scale-105"
      >
        <FaLanguage className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-600 dark:hover:text-neutral-100" />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-3 z-50 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-900 rounded-xl shadow-lg p-2 w-48"
          >
            {languages.map((lang) => (
              <div
                key={lang.id}
                onClick={() => handleLanguageChange(lang.id)}
                className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 transition ${
                  selected === lang.id
                    ? 'text-black dark:text-white bg-neutral-200 dark:bg-neutral-700 font-semibold'
                    : 'text-neutral-600 dark:text-neutral-300'
                }`}
              >
                <span className="text-sm">{lang.label}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageDropdown;
