'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaInstagram, FaMedium, FaYoutube, FaBehance, FaGithub } from 'react-icons/fa';
import { PiCoffeeBold } from 'react-icons/pi';
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
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div
        onClick={() => setOpen(!open)}
        className="transition-transform duration-200 hover:scale-105 hover:shadow-md rounded-full cursor-pointer"
      >
        <Image
          src="/avatar.jpg"
          alt="profile"
          width={32}
          height={32}
          className="rounded-full border dark:grayscale"
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 z-50 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-900 rounded-xl shadow-xl p-4 grid grid-cols-2 gap-4 w-64"
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
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileMenu;
