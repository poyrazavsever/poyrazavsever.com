'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DropdownMenu from './DropdownMenu';
import ProfileMenu from './ProfileMenu';
import ThemeDropdown from './ThemeDropdown';
import LanguageDropdown from './LanguageDropdown';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { useTranslation } from 'next-i18next';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('layout');

  return (
    <nav className="sticky top-0 left-0 z-50 w-full bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-900 py-3">
      {/* Main Row */}
      <div className="flex justify-between items-center">
        {/* Sol */}
        <div className="flex items-center gap-3">
          <ThemeDropdown />
          <LanguageDropdown />
        </div>

        {/* Desktop Menü */}
        <div className="hidden md:flex items-center gap-5 text-sm text-neutral-600 dark:text-neutral-300">
          <Link href="/">{t('nav.home')}</Link>
          <Link href="/projects">{t('nav.projects')}</Link>
          <Link href="/about">{t('nav.about')}</Link>
          <DropdownMenu />
          <Link href="/contact">{t('nav.contact')}</Link>
          <Link
            href="/resume.pdf"
            target="_blank"
            download
            className="px-2 py-1 text-sm bg-neutral-100 dark:bg-neutral-700 rounded-full text-neutral-500 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-900 hover:text-neutral-800 dark:hover:text-neutral-300 transition-all duration-200"
          >
            {t('nav.resume')}
          </Link>
          <ProfileMenu />
        </div>

        {/* Mobile Menü Butonu */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Mobil Menüyü Aç/Kapat">
            {isOpen ? <FiX size={26} /> : <FiMenu size={26} className="text-neutral-800 dark:text-neutral-200" />}
          </button>
        </div>
      </div>

      {/* Fullscreen Mobile Menü */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white dark:bg-neutral-900 px-6 py-10 flex flex-col gap-6 text-lg text-neutral-800 dark:text-neutral-200 md:hidden"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4"
              aria-label="Menüyü Kapat"
            >
              <FiX size={28} />
            </button>

            <Link href="/" onClick={() => setIsOpen(false)}>{t('nav.home')}</Link>
            <Link href="/projects" onClick={() => setIsOpen(false)}>{t('nav.projects')}</Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>{t('nav.about')}</Link>
            <DropdownMenu mobile onClose={() => setIsOpen(false)} />
            <Link href="/contact" onClick={() => setIsOpen(false)}>{t('nav.contact')}</Link>
            <Link
              href="https://localhost:3000/resume.pdf"
              target="_blank"
              download
              onClick={() => setIsOpen(false)}
              className="bg-neutral-200 dark:bg-neutral-800 rounded-lg px-4 py-2 w-fit"
            >
              {t('nav.resume')}
            </Link>
            <ProfileMenu mobile onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
