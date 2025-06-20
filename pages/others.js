'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaLinkedin,
  FaInstagram,
  FaMedium,
  FaYoutube,
  FaBehance,
  FaGithub,
} from 'react-icons/fa';
import { PiCoffeeBold } from 'react-icons/pi';

const categories = {
  Sayfalar: [
    { label: 'Blog', href: '/blog', description: 'Kişisel yazılarım ve notlarım' },
    { label: 'Galeri', href: '/gallery', description: 'Çektiğim fotoğraf ve videolar' },
    { label: 'Sertifikalar', href: '/certificates', description: 'Eğitim ve Başarı belgelerim' },
    { label: 'UI/UX Çalışmalarım', href: '/designs', description: 'Arayüz tasarımlarım' },
    { label: 'Ekipmanlarım', href: '/gear', description: 'Kullandığım donanım ve yazılımlar' },
    { label: 'Bookmarklarım', href: '/bookmarks', description: 'Favori bağlantılarım' },
    { label: 'Teknoloji Yığınım', href: '/stack', description: 'Projelerde kullandığım teknolojiler' },
    { label: 'Referanslar', href: '/references', description: 'Hakkımda söylenenler' },
    { label: 'Medium Yazılarım', href: '/medium', description: 'Medium’da yayımlanan yazılarım' },
    { label: 'Toplantı Ayarla', href: '/meeting', description: 'Benimle toplantı planlayın' },
    { label: 'Gönüllü Çalışmalar', href: '/volunteer', description: 'Gönüllü çalıştığım organizasyonlar' },
  ],
  Sosyal: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/poyrazavsever/', icon: <FaLinkedin /> },
    { label: '@Pavori_', href: 'https://www.instagram.com/pavori_/', icon: <FaInstagram /> },
    { label: 'Medium', href: 'https://medium.com/@poyrazavsever', icon: <FaMedium /> },
    { label: '@PatiTekno', href: 'https://www.instagram.com/patitekno/', icon: <FaInstagram /> },
    { label: '@PatiTekno', href: 'http://youtube.com/@patitekno', icon: <FaYoutube /> },
    { label: 'Behance', href: 'https://www.behance.net/slayeras', icon: <FaBehance /> },
    { label: 'Buy Me a Coffee', href: 'https://www.buymeacoffee.com/poyrazavsever', icon: <PiCoffeeBold /> },
    { label: 'GitHub', href: 'https://www.github.com/poyrazavsever', icon: <FaGithub /> },
  ],
};

const tabs = Object.keys(categories);

const Others = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section className="min-h-screen py-20 text-neutral-800 dark:text-neutral-200">
      <h1 className="text-3xl font-bold mb-6">Tüm Bağlantılar</h1>

      {/* Tabs */}
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

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {categories[activeTab].map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-500 transition"
            >
              <div className="flex items-center gap-3 mb-1">
                {item.icon && <span className="text-xl">{item.icon}</span>}
                <span className="font-semibold text-sm group-hover:text-black dark:group-hover:text-white">
                  {item.label}
                </span>
              </div>
              {item.description && <p className="text-xs text-neutral-500 dark:text-neutral-400">{item.description}</p>}
            </a>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Others;
