'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Gallery = () => {
  const { t } = useTranslation('gallery');
  const galleryImages = t('images', { returnObjects: true });

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <>
      {/* Grid Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 my-8 sm:my-16">
        {galleryImages.map((item, idx) => (
          <motion.div
            key={idx}
            onClick={() => openModal(idx)}
            className="cursor-pointer relative group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={item.img}
                alt={`Gallery image ${idx + 1}`}
                className="object-cover h-64 w-full rounded-lg transition-all duration-300 group-hover:brightness-90"
                onLoad={() => setIsLoading(false)}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 !z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <div className="flex flex-col items-center gap-4 px-4 relative">
              <motion.img
                src={galleryImages[currentIndex].img}
                alt={`Modal image ${currentIndex + 1}`}
                className="max-h-[85vh] max-w-[95vw] rounded-lg"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              />
              <motion.span
                className="text-white text-lg font-light text-center"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ delay: 0.2 }}
              >
                {galleryImages[currentIndex].title}
              </motion.span>
            </div>
            {/* Navigation */}
            <motion.div
              className="absolute left-4 sm:left-8 p-3 text-white text-4xl cursor-pointer rounded-full hover:bg-white/10 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ‹
            </motion.div>
            <motion.div
              className="absolute right-4 sm:right-8 p-3 text-white text-4xl cursor-pointer rounded-full hover:bg-white/10 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ›
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['gallery', 'layout'])),
    },
  };
};