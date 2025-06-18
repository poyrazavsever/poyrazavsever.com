'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';
import Link from 'next/link';

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
  { label: 'Diğerleri', href: '/others/all', description: 'Bütün linkleri görüntüle' },  
];

const DropdownMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="transition hover:text-black dark:hover:text-white cursor-pointer"
      >
        Diğerleri
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 z-50 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-900 shadow-xl rounded-lg p-4 grid grid-cols-2 gap-4 w-[500px]"
          >
            {items.map(({ label, href, description }) => (
              <Link
                key={label}
                href={href}
                className="group block p-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition"
              >
                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-neutral-300">
                  {label}
                </p>
                <p className="text-xs text-neutral-500">{description}</p>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownMenu;
