'use client';

import React, { useState } from 'react';

const Meeting = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    reason: '',
    date: '',
    time: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const timeSlots = [
    '18:00 - 18:30',
    '18:30 - 19:00',
    '19:00 - 19:30',
    '19:30 - 20:00',
  ];

  const oneWeekFromNow = () => {
    const today = new Date();
    const dates = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      dates.push(d.toISOString().split('T')[0]);
    }

    return dates;
  };

  return (
    <div className="w-full flex justify-center py-16">
      <div className="w-full max-w-6xl">
        <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-8">
          Toplantı Talebi Oluştur
        </h1>

        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Ad Soyad</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white focus:outline-none dark:bg-neutral-900/10 text-neutral-800 dark:text-neutral-100"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Telefon Numarası</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white focus:outline-none dark:bg-neutral-900/10 text-neutral-800 dark:text-neutral-100"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">E-posta</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white focus:outline-none dark:bg-neutral-900/10 text-neutral-800 dark:text-neutral-100"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Tarih Seçimi</label>
              <select
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white focus:outline-none dark:bg-neutral-900/10 text-neutral-800 dark:text-neutral-100"
                required
              >
                <option value="">Tarih seçin</option>
                {oneWeekFromNow().map((date) => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString('tr-TR')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Toplantı Sebebi</label>
            <textarea
              name="reason"
              rows={3}
              value={form.reason}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white focus:outline-none dark:bg-neutral-900/10 text-neutral-800 dark:text-neutral-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Saat Seçimi</label>
            <select
              name="time"
              value={form.time}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white focus:outline-none dark:bg-neutral-900/10 text-neutral-800 dark:text-neutral-100"
              required
            >
              <option value="">Saat seçin</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <div className="h-20 w-full bg-neutral-100 dark:bg-neutral-800 rounded-md flex items-center justify-center text-sm text-neutral-500 dark:text-neutral-400 border border-dashed border-neutral-300 dark:border-neutral-600">
            hCaptcha buraya entegre edilecek
          </div>

          <button
            type="submit"
            className="bg-neutral-800 dark:bg-neutral-100 text-white dark:text-neutral-900 px-6 py-3 rounded-md text-sm font-medium hover:opacity-90 transition"
          >
            Toplantı Talebini Gönder
          </button>
        </form>
      </div>
    </div>
  );
};

export default Meeting;
