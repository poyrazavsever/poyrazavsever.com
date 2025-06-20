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
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { t } = useTranslation('layout');

  // Dış tıklamayı dinle
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const items = menuKeys.map((key) => ({
    label: t(`menu.${key}.label`),
    description: t(`menu.${key}.description`),
    href: `/${key}`,
  }));

  return (
    <div className="relative" ref={dropdownRef}>
      {!mobile && (
        <button
          onClick={() => setOpen(!open)}
          className="transition hover:text-black dark:hover:text-white cursor-pointer"
        >
          {t('menu.others.label')}
        </button>
      )}

      <AnimatePresence>
        {open && !mobile && (
          <motion.div
            key="desktop-dropdown"
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
                onClick={() => setOpen(false)}
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

        {mobile && (
          <motion.div
            key="mobile-fullscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-white dark:bg-neutral-900 p-6 sm:hidden flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">{t('menu.others.label')}</h2>
              <button
                onClick={() => {
                  setOpen(false);
                  onClose();
                }}
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
                  onClick={() => {
                    setOpen(false);
                    onClose();
                  }}
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
    </div>
  );
};

export default DropdownMenu;
