'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-900 py-8 text-sm text-neutral-600 dark:text-neutral-400">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Sol - Logo & Açıklama */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-black dark:bg-white rounded-sm" />
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">poyrazavsever.com</span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-500">Kişisel portfolyo & dijital üretim alanım.</p>
        </div>

        {/* Orta - Kategoriler */}
        <div className="flex flex-wrap gap-4">
          <Link href="/projects" className="hover:text-black dark:hover:text-white transition">Projelerim</Link>
          <Link href="/blog" className="hover:text-black dark:hover:text-white transition">Blog</Link>
          <Link href="/gallery" className="hover:text-black dark:hover:text-white transition">Galeri</Link>
          <Link href="/contact" className="hover:text-black dark:hover:text-white transition">İletişim</Link>
        </div>

        {/* Sağ - Telif */}
        <div className="text-xs text-neutral-400 dark:text-neutral-500">
          © {new Date().getFullYear()} Poyraz Avsever. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
