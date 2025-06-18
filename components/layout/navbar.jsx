'use client';

import React from 'react';
import Link from 'next/link';
import DropdownMenu from './DropdownMenu';
import ProfileMenu from './ProfileMenu';

const Navbar = () => {
  return (
    <nav className="sticky top-0 left-0 z-50 w-full bg-white border-b border-neutral-200 py-3 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-black rounded-sm" />
        <span className="text-sm font-semibold text-neutral-800">
          poyrazavsever.com
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-5 text-sm text-neutral-600">
        <Link href="/" className="hover:text-black transition-colors duration-200">Ana Sayfa</Link>
        <Link href="/projects" className="hover:text-black transition-colors duration-200">Projelerim</Link>
        <Link href="/about" className="hover:text-black transition-colors duration-200">Hakkımda</Link>

        {/* Dropdown */}
        <DropdownMenu />

        <Link href="/contact" className="hover:text-black transition-colors duration-200">İletişim</Link>

        <button className="px-2 py-1 text-sm bg-neutral-100 rounded-full text-neutral-500 hover:bg-neutral-200 hover:text-neutral-800 transition-all duration-200 cursor-pointer">
          Özgeçmiş
        </button>

        <ProfileMenu />
      </div>
    </nav>
  );
};

export default Navbar;
