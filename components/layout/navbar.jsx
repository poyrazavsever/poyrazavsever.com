'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { BiHomeAlt2, BiUser, BiFolder, BiMessageDetail, BiDotsHorizontalRounded, 
  BiBookBookmark, BiImage, BiCertification, BiPalette, BiCode, BiHeadphone,
  BiNote, BiGroup, BiNews, BiCalendarEvent, BiDonateHeart, BiCategory } from 'react-icons/bi';
import { LuSun, LuMoonStar, LuMonitor } from 'react-icons/lu';
import { FaLanguage, FaLinkedin, FaInstagram, FaMedium, FaYoutube, FaBehance, FaGithub } from 'react-icons/fa6';
import { PiCoffeeBold } from 'react-icons/pi';
import { US, TR, DE, ES } from 'country-flag-icons/react/3x2';
import { useTranslation } from 'next-i18next';

const menuIcons = {
  blog: BiNote,
  gallery: BiImage,
  certificates: BiCertification,
  designs: BiPalette,
  gear: BiHeadphone,
  bookmarks: BiBookBookmark,
  stack: BiCode,
  references: BiGroup,
  medium: BiNews,
  meeting: BiCalendarEvent,
  volunteer: BiDonateHeart,
  others: BiCategory,
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
  'others',
];

// Social media links array
const socialLinks = [
  { href: 'https://www.linkedin.com/in/poyrazavsever/', icon: FaLinkedin, label: 'LinkedIn' },
  { href: 'https://www.instagram.com/pavori_/', icon: FaInstagram, label: '@Pavori_' },
  { href: 'https://medium.com/@poyrazavsever', icon: FaMedium, label: 'Medium' },
  { href: 'https://www.instagram.com/patitekno/', icon: FaInstagram, label: '@PatiTekno' },
  { href: 'http://youtube.com/@patitekno', icon: FaYoutube, label: '@PatiTekno' },
  { href: 'https://www.behance.net/slayeras', icon: FaBehance, label: 'Behance' },
  { href: 'https://www.buymeacoffee.com/poyrazavsever', icon: PiCoffeeBold, label: 'Buy Me a Coffee' },
  { href: 'https://www.github.com/poyrazavsever', icon: FaGithub, label: 'GitHub' }
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
    { href: '/', icon: BiHomeAlt2, label: t('nav.home') },
    { href: '/projects', icon: BiFolder, label: t('nav.projects') },
    { href: '/about', icon: BiUser, label: t('nav.about') },
    { href: '/contact', icon: BiMessageDetail, label: t('nav.contact') }
  ];

  const themes = [
    { id: 'light', icon: LuSun },
    { id: 'dark', icon: LuMoonStar },
    { id: 'system', icon: LuMonitor }
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
    
      <nav className="fixed bottom-0 left-0 w-full z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-screen-lg mx-auto px-4">
          {/* Ana Navigasyon */}
          <div className="flex items-center justify-between py-2">
            <div className="flex-1 flex justify-between max-w-[400px] sm:max-w-[500px] mx-auto">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-blue-500 dark:text-blue-400 scale-105'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400 hover:scale-105'
                    }`}
                  >
                    <item.icon size={24} className="sm:w-6 sm:h-6" />
                    <span className="hidden sm:block sm:text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
              
              {/* More Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 text-neutral-600 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400 hover:scale-105"
              >
                <BiDotsHorizontalRounded size={24} className="sm:w-6 sm:h-6" />
                <span className="hidden sm:block sm:text-sm font-medium">{t('menu.others.label')}</span>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 p-2">
                  {menuKeys.map((key) => {
                    const Icon = menuIcons[key];
                    return (
                      <Link
                        key={key}
                        href={`/${key}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50/50 dark:hover:bg-blue-900/20 hover:border-blue-100 dark:hover:border-blue-800 border border-transparent transition-all group"
                      >
                        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 dark:shadow-blue-500/10 group-hover:scale-110 transition-transform">
                          <Icon size={20} />
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
                    );
                  })}
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
          <LuMoonStar size={20} className="text-neutral-600 dark:text-neutral-300 sm:w-5 sm:h-5" />
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
                  <theme.icon size={18} />
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
          <FaLanguage size={20} className="text-neutral-600 dark:text-neutral-300" />
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
          <BiCategory size={20} className="text-neutral-600 dark:text-neutral-300 sm:w-5 sm:h-5" />
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
                  <link.icon size={18} />
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