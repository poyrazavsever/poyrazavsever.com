import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b border-neutral-200 px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-black rounded-sm" />
        <span className="text-sm font-semibold text-neutral-800">
          poyrazavsever.com
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-5">
        {['Home', 'Projects', 'About', "Other's", 'Contact'].map((item) => (
          <Link
            key={item}
            href={`/${item === 'Home' ? '' : item.toLowerCase()}`}
            className="transition-colors duration-200 text-sm text-neutral-600 hover:text-black"
          >
            {item}
          </Link>
        ))}

        <button className="px-3 py-1 text-sm text-neutral-500 bg-neutral-100 rounded-full hover:bg-neutral-200 hover:text-neutral-800 hover:scale-[1.01] transition-all duration-200  hover:shadow-xs cursor-pointer">
          Resume
        </button>

        <div className="transition-transform duration-200 hover:scale-105 hover:shadow-md rounded-full">
          <Image
            src="/avatar.jpg"
            alt="profile"
            width={32}
            height={32}
            className="rounded-full border"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
