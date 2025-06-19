'use client';

import React from 'react';
import Link from 'next/link';
import DropdownMenu from './DropdownMenu';
import ProfileMenu from './ProfileMenu';

// System
import ThemeDropdown from './ThemeDropdown';
import LanguageDropdown from './LanguageDropdown';

const Navbar = () => {
  return (
    <nav className="sticky top-0 left-0 z-50 w-full bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-900 py-3 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <ThemeDropdown/>
        <LanguageDropdown/>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-5 text-sm text-neutral-600 dark:text-neutral-300">
        <Link href="/" className="hover:text-black dark:hover:text-neutral-50 transition-colors duration-200">Ana Sayfa</Link>
        <Link href="/projects" className="hover:text-black dark:hover:text-neutral-50 transition-colors duration-200">Projelerim</Link>
        <Link href="/about" className="hover:text-black dark:hover:text-neutral-50 transition-colors duration-200">Hakkımda</Link>

        {/* Dropdown */}
        <DropdownMenu />

        <Link href="/contact" className="hover:text-black dark:hover:text-neutral-50 transition-colors duration-200">İletişim</Link>

        <Link href="http://localhost:3000/resume.pdf" target='_blank' download={true} className="px-2 py-1 text-sm bg-neutral-100 dark:bg-neutral-700 rounded-full text-neutral-500 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-900 hover:text-neutral-800 dark:hover:text-neutral-300 transition-all duration-200 cursor-pointer">
          Özgeçmiş
        </Link>

        <ProfileMenu />
      </div>
    </nav>
  );
};

export default Navbar;
