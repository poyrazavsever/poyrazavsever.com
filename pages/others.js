'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import {
  FaLinkedin,
  FaInstagram,
  FaMedium,
  FaYoutube,
  FaBehance,
  FaGithub
} from 'react-icons/fa';
import { PiCoffeeBold } from 'react-icons/pi';

const Others = () => {
  const { t } = useTranslation('others');

  const tabs = [t('tabs.pages'), t('tabs.social')];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const pageItems = t('pages', { returnObjects: true });
  const socialItems = t('social', { returnObjects: true });

  const iconMap = {
    LinkedIn: <FaLinkedin />,
    '@Pavori_': <FaInstagram />,
    Medium: <FaMedium />,
    '@PatiTekno': <FaInstagram />,
    Behance: <FaBehance />,
    GitHub: <FaGithub />,
    'Buy Me a Coffee': <PiCoffeeBold />,
    Youtube: <FaYoutube />
  };

  const items = activeTab === t('tabs.pages') ? pageItems : socialItems;

  return (
    <section className="min-h-screen py-20 text-neutral-800 dark:text-neutral-200">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>

      <div className="flex gap-4 mb-8 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm px-4 py-1.5 rounded-full border transition-all
              ${tab === activeTab
                ? 'bg-neutral-800 text-white dark:bg-neutral-200 dark:text-black'
                : 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-500 transition"
            >
              <div className="flex items-center gap-3 mb-1">
                {iconMap[item.label] && <span className="text-xl">{iconMap[item.label]}</span>}
                <span className="font-semibold text-sm group-hover:text-black dark:group-hover:text-white">
                  {item.label}
                </span>
              </div>
              {item.description && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{item.description}</p>
              )}
            </a>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
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
