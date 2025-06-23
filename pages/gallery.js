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
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 my-8 sm:my-16">
        {galleryImages.map((item, idx) => (
          <div key={idx} onClick={() => openModal(idx)} className="cursor-pointer">
            <img
              src={item.img}
              alt={`Gallery image ${idx + 1}`}
              className="object-cover h-64 w-full sm:w-64 rounded-md"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <div className="flex flex-col items-center gap-4 px-2">
              <motion.img
                src={galleryImages[currentIndex].img}
                alt={`Modal image ${currentIndex + 1}`}
                className="max-h-[80vh] max-w-[90vw] rounded-lg"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              />
              <span className="text-white text-center">
                {galleryImages[currentIndex].title}
              </span>
            </div>
            {/* Navigation */}
            <div
              className="absolute left-4 text-white text-4xl cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              ‹
            </div>
            <div
              className="absolute right-4 text-white text-4xl cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              ›
            </div>
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