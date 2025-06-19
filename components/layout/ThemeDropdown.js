'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuSun, LuMoonStar, LuMonitor } from 'react-icons/lu';

const themes = [
  { id: 'light', label: 'Açık Mod', icon: <LuSun /> },
  { id: 'dark', label: 'Karanlık Mod', icon: <LuMoonStar /> },
  { id: 'system', label: 'Sistem Modu', icon: <LuMonitor /> },
];

const ThemeDropdown = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('system');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'system';
    setSelected(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (theme) => {
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleThemeChange = (themeId) => {
    localStorage.setItem('theme', themeId);
    setSelected(themeId);
    applyTheme(themeId);
    setOpen(false);
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
        <LuMoonStar className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-600 dark:hover:text-neutral-100" />
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
            {themes.map((theme) => (
              <div
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 transition ${
                  selected === theme.id ? 'text-black dark:text-white bg-neutral-200 dark:bg-neutral-700 font-semibold' : 'text-neutral-600 dark:text-neutral-300'
                }`}
              >
                <span className="text-lg">{theme.icon}</span>
                <span>{theme.label}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeDropdown;
