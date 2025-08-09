'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { US, TR, DE, ES } from 'country-flag-icons/react/3x2';
import { useTranslation } from 'next-i18next';

const menuIcons = {
  blog: 'hugeicons:block-game',
  gallery: 'hugeicons:image-03',
  certificates: 'hugeicons:certificate-01',
  designs: 'hugeicons:pen-02',
  gear: 'hugeicons:keyboard',
  bookmarks: 'hugeicons:all-bookmark',
  stack: 'hugeicons:server-stack-03',
  references: 'hugeicons:user-group',
  medium: 'hugeicons:medium',
  meeting: 'hugeicons:meeting-room',
  volunteer: 'hugeicons:love-korean-finger',
  others: 'hugeicons:text-align-justify-right',
  learning: 'hugeicons:online-learning-01',
};

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
  'learning',
  'others',
];

// Social media links array
const socialLinks = [
  { href: 'https://www.linkedin.com/in/poyrazavsever/', icon: 'skill-icons:linkedin', label: 'LinkedIn' },
  { href: 'https://www.instagram.com/pavori_/', icon: 'skill-icons:instagram', label: '@Pavori_' },
  { href: 'https://www.instagram.com/poyraz_avsever/', icon: 'skill-icons:instagram', label: '@Poyraz_Avsever' },
  { href: 'http://youtube.com/@poyrazavsever', icon: 'logos:youtube-icon', label: 'Youtube' },
  { href: 'https://medium.com/@poyrazavsever', icon: 'logos:medium-icon', label: 'Medium' },
  { href: 'https://www.behance.net/poyrazavsever', icon: 'devicon:behance', label: 'Behance' },
  { href: 'https://www.buymeacoffee.com/poyrazavsever', icon: 'simple-icons:buymeacoffee', label: 'Buy Me a Coffee' },
  { href: 'https://www.github.com/poyrazavsever', icon: 'skill-icons:github-dark', label: 'GitHub' }
];

const Navbar = () => {
  const [activeTheme, setActiveTheme] = useState('system');
  const [activeLang, setActiveLang] = useState('en');
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const themeRef = useRef(null);
  const langRef = useRef(null);
  const socialRef = useRef(null);

  const router = useRouter();
  const { t } = useTranslation('layout');
  const { pathname } = router;

  const navigationItems = [
    { href: '/', icon: 'mdi:home-variant', label: t('nav.home') },
    { href: '/projects', icon: 'mdi:folder-multiple', label: t('nav.projects') },
    { href: '/about', icon: 'mdi:account-circle', label: t('nav.about') },
    { href: '/contact', icon: 'mdi:message-text', label: t('nav.contact') }
  ];

  const themes = [
    { id: 'light', icon: 'mdi:weather-sunny' },
    { id: 'dark', icon: 'mdi:weather-night' },
    { id: 'system', icon: 'mdi:monitor' }
  ];

  const languages = [
    { id: 'en', label: 'English', flag: US },
    { id: 'tr', label: 'Türkçe', flag: TR },
    { id: 'de', label: 'Deutsch', flag: DE },
    { id: 'es', label: 'Español', flag: ES }
  ];

  const handleThemeChange = (themeId) => {
    setActiveTheme(themeId);
    localStorage.setItem('theme', themeId);
    if (themeId === 'dark' || (themeId === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLanguageChange = (langId) => {
    setActiveLang(langId);
    localStorage.setItem('language', langId);
    router.push(router.asPath, router.asPath, { locale: langId });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'system';
    const savedLang = localStorage.getItem('language') || router.locale || 'en';
    setActiveTheme(savedTheme);
    setActiveLang(savedLang);
    handleThemeChange(savedTheme);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(event.target)) {
        setIsThemeOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
      if (socialRef.current && !socialRef.current.contains(event.target)) {
        setIsSocialOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
    
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg border border-neutral-200 dark:border-neutral-800 rounded-full px-4 py-2 shadow-lg">
          {/* Ana Navigasyon */}
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 p-2 rounded-full transition-all duration-200 ${
                      isActive
                        ? 'text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-blue-50 dark:hover:bg-blue-500/10'
                    }`}
                  >
                    <Icon icon={item.icon} className="w-5 h-5" />
                    <span className="text-sm font-medium hidden sm:block">{item.label}</span>
                  </Link>
                );
              })}
              
              {/* More Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 p-2 rounded-full transition-all duration-200 text-neutral-600 dark:text-neutral-400 hover:bg-blue-50 dark:hover:bg-blue-500/10"
              >
                <Icon icon="mdi:dots-horizontal" className="w-5 h-5" />
              </button>
            </div>
          </div>

          

          {/* More Menu (DropdownMenu) */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                ref={menuRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2, type: "spring", stiffness: 500, damping: 30 }}
                className="fixed inset-x-4 bottom-24 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-700 max-h-[70vh] overflow-y-auto w-[calc(100%-2rem)] sm:w-[460px] sm:mx-auto"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3">
                  {menuKeys.map((key) => (
                      <Link
                        key={key}
                        href={`/${key}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-500/10 border border-transparent transition-all group"
                      >
                        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/10">
                          <Icon icon={menuIcons[key]} className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 truncate">
                            {t(`menu.${key}.label`)}
                          </p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
                            {t(`menu.${key}.description`)}
                          </p>
                        </div>
                      </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Theme ve Language Switcher */}
      <div className="fixed top-4 right-4 flex items-center gap-3 sm:gap-4">
      {/* Theme Switcher */}
      <div className="relative" ref={themeRef}>
        <button
          onClick={() => {
            setIsThemeOpen(!isThemeOpen);
            setIsLangOpen(false);
          }}
          className="p-2 rounded-lg bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer"
        >
          <Icon icon="mdi:weather-night" className="text-neutral-600 dark:text-neutral-300 w-5 h-5" />
        </button>
        <AnimatePresence>
          {isThemeOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 p-2 min-w-[180px]"
            >
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    handleThemeChange(theme.id);
                    setIsThemeOpen(false);
                  }}
                  className={`w-full p-2 rounded-lg flex items-center gap-3 ${
                    activeTheme === theme.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  }`}
                >
                  <Icon icon={theme.icon} className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {t(`themes.${theme.id}`)}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Language Switcher */}
      <div className="relative" ref={langRef}>
        <button
          onClick={() => {
            setIsLangOpen(!isLangOpen);
            setIsThemeOpen(false);
          }}
          className="p-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer"
        >
          <Icon icon="mdi:translate" className="text-neutral-600 dark:text-neutral-300 w-5 h-5" />
        </button>
        <AnimatePresence>
          {isLangOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 p-2 min-w-[180px]"
            >
              {languages.map((lang) => {
                const Flag = lang.flag;
                return (
                  <button
                    key={lang.id}
                    onClick={() => {
                      handleLanguageChange(lang.id);
                      setIsLangOpen(false);
                    }}
                    className={`w-full p-2 rounded-lg flex items-center gap-3 ${
                      activeLang === lang.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                    }`}
                  >
                    <Flag className="w-5 h-5 rounded-sm" />
                    <span className="text-sm font-medium">{lang.label}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Social Media Links */}
      <div className="relative" ref={socialRef}>
        <button
          onClick={() => {
            setIsSocialOpen(!isSocialOpen);
            setIsLangOpen(false);
            setIsThemeOpen(false);
          }}
          className="p-2 rounded-lg bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer"
        >
          <Icon icon="mdi:share-variant" className="text-neutral-600 dark:text-neutral-300 w-5 h-5" />
        </button>

        <AnimatePresence>
          {isSocialOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 p-2 min-w-[180px]"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-2 rounded-lg flex items-center gap-3 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                  title={link.label}
                >
                  <Icon icon={link.icon} className="w-5 h-5" />
                  <span className="text-sm font-medium">{link.label}</span>
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
    </div>

    </>
  );
};

export default Navbar;