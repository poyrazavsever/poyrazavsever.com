'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaInstagram, FaMedium, FaYoutube, FaBehance, FaGithub } from 'react-icons/fa';
import { PiCoffeeBold } from 'react-icons/pi';
import { FiX } from 'react-icons/fi';
import Image from 'next/image';

const socialLinks = [
  { href: 'https://www.linkedin.com/in/poyrazavsever/', icon: <FaLinkedin />, label: 'LinkedIn' },
  { href: 'https://www.instagram.com/pavori_/', icon: <FaInstagram />, label: '@Pavori_' },
  { href: 'https://medium.com/@poyrazavsever', icon: <FaMedium />, label: 'Medium' },
  { href: 'https://www.instagram.com/patitekno/', icon: <FaInstagram />, label: '@PatiTekno' },
  { href: 'http://youtube.com/@patitekno', icon: <FaYoutube />, label: '@PatiTekno' },
  { href: 'https://www.behance.net/slayeras', icon: <FaBehance />, label: 'Behance' },
  { href: 'https://www.buymeacoffee.com/poyrazavsever', icon: <PiCoffeeBold />, label: 'Buy Me a Coffee' },
  { href: 'https://www.github.com/poyrazavsever', icon: <FaGithub />, label: 'GitHub' },
];

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !(menuRef.current).contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar Button */}
      <div
        onClick={() => setOpen(!open)}
        className="transition-transform duration-200 sm:hover:scale-105 sm:hover:shadow-md hover:none rounded-full cursor-pointer flex items-center gap-2"
      >
        <Image
          src="/avatar.jpg"
          alt="profile"
          width={32}
          height={32}
          className="rounded-full border"
        />
        <span className='sm:hidden'>Sosyal Linkler</span>
      </div>

      {/* AnimatePresence for modal/dropdown */}
      <AnimatePresence>
        {open && (
          <>
            {/* Mobile: Fullscreen Menu */}
            <motion.div
              key="mobile-profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-white dark:bg-neutral-900 p-6 flex flex-col gap-6 text-neutral-800 dark:text-neutral-200 sm:hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-2xl text-neutral-600 dark:text-neutral-300"
                aria-label="Menüyü Kapat"
              >
                <FiX size={28} />
              </button>

              <h2 className="text-xl font-semibold mt-2">Sosyal Bağlantılar</h2>

              <div className="grid grid-cols-1 gap-4 mt-4">
                {socialLinks.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 text-base hover:text-black dark:hover:text-white transition-colors"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Desktop: Standard Dropdown */}
            <motion.div
              key="desktop-profile"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="hidden sm:grid absolute right-0 mt-3 z-50 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-900 rounded-xl shadow-xl p-4 grid-cols-2 gap-4 w-64"
            >
              {socialLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-200 hover:text-black dark:hover:text-neutral-400 transition-colors"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileMenu;
