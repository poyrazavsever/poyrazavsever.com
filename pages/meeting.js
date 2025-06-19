'use client';

import React, { useState, useRef, useEffect } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabaseClient';

const Meeting = () => {
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    email: '',
    reason: '',
    meeting_date: '',
    meeting_time_slot: '',
  });

  const [token, setToken] = useState('');
  const captchaRef = useRef(null);
  const [captchaTheme, setCaptchaTheme] = useState('light');


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVerify = (token) => {
    setToken(token);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localTheme = localStorage.getItem('theme');
      console.log(localTheme);
      if (localTheme === 'dark') {
        setCaptchaTheme('dark');
        console.log(captchaTheme);
        
      } else {
        // "light" ya da "system" varsa veya hiç yoksa "light"
        setCaptchaTheme('light');
      }
    }
  }, []);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) =>
    /^\+?\d{10,15}$/.test(phone.replace(/\s+/g, ''));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { full_name, phone, email, reason, meeting_date, meeting_time_slot } = form;

    // Validasyonlar
    if (!full_name || !phone || !email || !reason || !meeting_date || !meeting_time_slot) {
      toast.error('Lütfen tüm alanları doldurun.');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Geçerli bir e-posta adresi girin.');
      return;
    }

    if (!validatePhone(phone)) {
      toast.error('Geçerli bir telefon numarası girin.');
      return;
    }

    if (!token) {
      toast.error('Lütfen doğrulamayı tamamlayın.');
      return;
    }

    const { error } = await supabase.from('meetings').insert([
      { full_name, phone, email, reason, meeting_date, meeting_time_slot }
    ]);

    if (error) {
      toast.error('Veri kaydedilirken bir hata oluştu.');
      console.error('Supabase Error:', error.message);
    } else {
      toast.success('Toplantı talebiniz başarıyla iletildi.');
      setForm({
        full_name: '',
        phone: '',
        email: '',
        reason: '',
        meeting_date: '',
        meeting_time_slot: '',
      });
      setToken('');
      captchaRef.current.resetCaptcha();
    }
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

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Ad Soyad</label>
              <input
                type="text"
                name="full_name"
                value={form.full_name}
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
                placeholder="+90 555 123 4567"
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
                placeholder="mail@ornek.com"
                className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white focus:outline-none dark:bg-neutral-900/10 text-neutral-800 dark:text-neutral-100"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Tarih Seçimi</label>
              <select
                name="meeting_date"
                value={form.meeting_date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white focus:outline-none dark:bg-neutral-900/10 text-neutral-800 dark:text-neutral-100"
                required
              >
                <option value="" className='dark:bg-neutral-800 border dark:border-neutral-700'>Tarih seçin</option>
                {oneWeekFromNow().map((date) => (
                  <option key={date} value={date} className='dark:bg-neutral-800 border dark:border-neutral-700'>
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
              placeholder="Neden bir toplantı ayarlamak istiyorsunuz?"
              className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white focus:outline-none dark:bg-neutral-900/10 text-neutral-800 dark:text-neutral-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Saat Seçimi</label>
            <select
              name="meeting_time_slot"
              value={form.meeting_time_slot}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white focus:outline-none dark:bg-neutral-900/10 text-neutral-800 dark:text-neutral-100"
              required
            >
              <option value="" className='dark:bg-neutral-800 border dark:border-neutral-700'>Saat seçin</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot} className='dark:bg-neutral-800 border dark:border-neutral-700'>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-md border border-neutral-300 dark:border-neutral-600 p-4 bg-neutral-50 dark:bg-neutral-800">
            <HCaptcha
              sitekey={process.env.NEXT_PUBLIC_CAPTCHA_KEY}
              onVerify={handleVerify}
              ref={captchaRef}
              theme={captchaTheme}
            />
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
