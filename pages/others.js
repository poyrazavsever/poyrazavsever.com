'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { BiLink, BiNote, BiImage, BiCertification, BiPalette, BiCode, BiHeadphone,
  BiBookBookmark, BiGroup, BiNews, BiCalendarEvent, BiDonateHeart, BiCategory, BiBook } from 'react-icons/bi';
import {
  FaLinkedin,
  FaInstagram,
  FaMedium,
  FaYoutube,
  FaBehance,
  FaGithub,
  FaSearch,
  FaTimes
} from 'react-icons/fa';
import { PiCoffeeBold } from 'react-icons/pi';

const Others = () => {
  const { t } = useTranslation('others');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(t('tabs.pages'));
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const tabs = [t('tabs.pages'), t('tabs.social')];

  const pageItems = t('pages', { returnObjects: true });
  const socialItems = t('social', { returnObjects: true });

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
    learning: BiBook,
  };

  const socialIconMap = {
    LinkedIn: FaLinkedin,
    '@Pavori_': FaInstagram,
    Medium: FaMedium,
    '@PatiTekno': FaYoutube,
    Behance: FaBehance,
    GitHub: FaGithub,
    'Buy Me a Coffee': PiCoffeeBold
  };

  // Get items based on active tab
  const items = activeTab === t('tabs.pages') ? pageItems : socialItems;

  // Filter items based on search
  const filteredItems = items.filter(item => 
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation variants
  const fadeInVariants = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
        style={{ scaleX }}
      />

      <section className="min-h-screen py-20 px-4 text-neutral-800 dark:text-neutral-200">
        {/* Hero Section */}
        <motion.div 
          className="max-w-4xl mx-auto mb-12 text-center"
          variants={fadeInVariants}
          initial="hidden"
          animate="show"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {t('title')}
          </h1>

          {/* Search Bar */}
          <div 
            className={`relative max-w-md mx-auto mb-8 transition-all duration-300 ${
              isSearchFocused ? 'scale-105' : 'scale-100'
            }`}
          >
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-12 pr-12 py-3 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${tab === activeTab
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-blue-50 dark:hover:bg-blue-900/30'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Links Grid */}
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 dark:shadow-blue-500/10 group-hover:scale-110 transition-transform">
                  {activeTab === t('tabs.social') ? (
                    <span className="text-xl">
                      {socialIconMap[item.label] && React.createElement(socialIconMap[item.label])}
                    </span>
                  ) : (
                    <span className="text-xl">
                      {menuIcons[item.href.slice(1)] && React.createElement(menuIcons[item.href.slice(1)])}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-500 dark:group-hover:text-blue-400">
                  {item.label}
                </h3>
              </div>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <BiLink className="text-blue-500 text-xl" />
              </div>
            </a>
          ))}
          
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12 text-neutral-500 dark:text-neutral-400"
            >
              <p className="text-lg">{t('noResults')}</p>
            </motion.div>
          )}
        </motion.div>
      </section>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['others', 'layout']))
    }
  };
}

export default Others;
