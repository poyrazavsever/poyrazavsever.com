'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const galleryImages = [
  '/gallery/1.png',
  '/gallery/2.png',
];

const Gallery = () => {
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 my-16">
        {galleryImages.map((src, idx) => (
          <div key={idx} onClick={() => openModal(idx)} className="cursor-pointer">
            <img
              src={src}
              alt={`Gallery image ${idx + 1}`}
              className="object-cover h-64 w-64 rounded-md"
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
            <motion.img
              src={galleryImages[currentIndex]}
              alt={`Modal image ${currentIndex + 1}`}
              className="max-h-[80vh] max-w-[90vw] rounded-lg"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()} // Modal dışında tıklama
            />
            {/* Navigation */}
            <div className="absolute left-4 text-white text-4xl cursor-pointer" onClick={(e) => { e.stopPropagation(); prevImage(); }}>{'‹'}</div>
            <div className="absolute right-4 text-white text-4xl cursor-pointer" onClick={(e) => { e.stopPropagation(); nextImage(); }}>{'›'}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
