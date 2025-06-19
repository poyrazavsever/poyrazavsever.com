'use client';

import React from 'react';

const Contact = () => {
  return (
    <section className="py-20 flex justify-center text-neutral-800 dark:text-neutral-200">
      <div className="w-full md:w-6xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">İletişim</h1>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-12 max-w-xl">
          Aşağıdaki formu doldurarak benimle iletişime geçebilirsiniz. Sorularınız, iş birliği
          teklifleriniz veya geri bildirimleriniz için her zaman ulaşabilirsiniz.
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ad Soyad */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium mb-1">
              Ad Soyad
            </label>
            <input
              type="text"
              id="name"
              placeholder="Adınızı girin"
              className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition"
            />
          </div>

          {/* E-posta */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium mb-1">
              E-posta
            </label>
            <input
              type="email"
              id="email"
              placeholder="E-posta adresinizi girin"
              className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition"
            />
          </div>

          {/* Konu (full width) */}
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="subject" className="text-sm font-medium mb-1">
              Konu
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Mesaj konusu"
              className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition"
            />
          </div>

          {/* Mesaj */}
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="message" className="text-sm font-medium mb-1">
              Mesaj
            </label>
            <textarea
              id="message"
              rows={6}
              placeholder="Mesajınızı buraya yazabilirsiniz..."
              className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition resize-none"
            ></textarea>
          </div>

          {/* Gönder Butonu */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-neutral-800 dark:bg-neutral-300 text-white dark:text-black px-6 py-2 rounded-md text-sm font-medium hover:opacity-80 transition cursor-pointer"
            >
              Gönder
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
