'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiX } from 'react-icons/fi';
import { useTranslation } from 'next-i18next';

const menuKeys = [
  'blog',
  'gallery',
  'certificates',
  'designs',
  'gear',
  'bookmarks',
  'stack',
  'references',
  'medium',
  'meeting',
  'volunteer',
  'others',
];

const DropdownMenu = ({ mobile = false, onClose = () => {} }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { t } = useTranslation('layout');

  const items = menuKeys.map((key) => ({
    label: t(`menu.${key}.label`),
    description: t(`menu.${key}.description`),
    href: `/${key}`,
  }));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Sadece masaüstü versiyonunda ve dropdown açıkken event listener ekle
    if (!mobile && isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup function
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, mobile]);

  const handleDropdownClick = (e) => {
    e.preventDefault();
    setIsDropdownOpen(true);
  };

  const handleItemClick = () => {
    setIsDropdownOpen(false);
    onClose();
  };

  // Desktop version
  if (!mobile) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="transition hover:text-black dark:hover:text-white cursor-pointer"
        >
          {t('menu.others.label')}
        </button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="hidden sm:grid absolute right-0 mt-2 z-50 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-900 shadow-xl rounded-lg p-4 grid-cols-2 gap-4 w-[500px]"
            >
              {items.map(({ label, href, description }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setIsDropdownOpen(false)}
                  className="group block p-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition"
                >
                  <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-neutral-300">
                    {label}
                  </p>
                  <p className="text-xs text-neutral-500">{description}</p>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Mobile version
  return (
    <>
      <button
        onClick={handleDropdownClick}
        className="w-full text-left"
      >
        {t('menu.others.label')}
      </button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-white dark:bg-neutral-900 p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
                {t('menu.others.label')}
              </h2>
              <button
                onClick={() => setIsDropdownOpen(false)}
                className="text-2xl text-neutral-600 dark:text-neutral-300"
                aria-label="Menüyü Kapat"
              >
                <FiX size={28} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {items.map(({ label, href, description }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={handleItemClick}
                  className="block p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                >
                  <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-300">
                    {label}
                  </p>
                  <p className="text-xs text-neutral-500">{description}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DropdownMenu;
