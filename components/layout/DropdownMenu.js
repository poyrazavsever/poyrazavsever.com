'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiX } from 'react-icons/fi';

const items = [
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
  { label: 'Diğerleri', href: '/others', description: 'Bütün linkleri görüntüle' },
];

const DropdownMenu = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Dış tıklamayı dinle (masaüstü için)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !(dropdownRef.current).contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="transition hover:text-black dark:hover:text-white cursor-pointer"
      >
        Diğerleri
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Masaüstü Dropdown */}
            <motion.div
              key="desktop-dropdown"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="hidden sm:grid absolute right-0 mt-2 z-50 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-900 shadow-xl rounded-lg p-4 grid-cols-2 gap-4 w-[500px]"
            >
              {items.map(({ label, href, description }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="group block p-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition"
                >
                  <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-neutral-300">
                    {label}
                  </p>
                  <p className="text-xs text-neutral-500">{description}</p>
                </Link>
              ))}
            </motion.div>

            {/* Mobil Tam Ekran Menü */}
            <motion.div
              key="mobile-fullscreen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-white dark:bg-neutral-900 p-6 sm:hidden flex flex-col"
            >
              {/* Başlık ve Kapat Butonu */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">Tüm Sayfalar</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-2xl text-neutral-600 dark:text-neutral-300"
                  aria-label="Menüyü Kapat"
                >
                  <FiX size={28} />
                </button>
              </div>

              {/* Kaydırılabilir Link Listesi */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {items.map(({ label, href, description }) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="block p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                  >
                    <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white">
                      {label}
                    </p>
                    <p className="text-xs text-neutral-500">{description}</p>
                  </Link>
                ))}
              </div>
            </motion.div>

          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownMenu;
