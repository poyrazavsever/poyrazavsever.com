'use client';

import React, { useState, useRef, useEffect } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { supabase } from '@/lib/supabaseClient';

const Meeting = () => {
  const { t } = useTranslation('meeting');

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

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme === 'dark') {
      setCaptchaTheme('dark');
    } else {
      setCaptchaTheme('light');
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVerify = (token) => {
    setToken(token);
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) =>
    /^\+?\d{10,15}$/.test(phone.replace(/\s+/g, ''));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { full_name, phone, email, reason, meeting_date, meeting_time_slot } = form;

    if (!full_name || !phone || !email || !reason || !meeting_date || !meeting_time_slot) {
      toast.error(t('validation_error'));
      return;
    }

    if (!validateEmail(email)) {
      toast.error(t('email_error'));
      return;
    }

    if (!validatePhone(phone)) {
      toast.error(t('phone_error'));
      return;
    }

    if (!token) {
      toast.error(t('captcha_error'));
      return;
    }

    const { error } = await supabase.from('meetings').insert([{ full_name, phone, email, reason, meeting_date, meeting_time_slot }]);

    if (error) {
      toast.error(t('save_error'));
    } else {
      toast.success(t('save_success'));
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

  const timeSlots = ['18:00 - 18:30', '18:30 - 19:00', '19:00 - 19:30', '19:30 - 20:00'];

  const oneWeekFromNow = () => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      return d.toISOString().split('T')[0];
    });
  };

  return (
    <div className="w-full flex justify-center py-16">
      <div className="w-full max-w-6xl">
        <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-8">{t('title')}</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">{t('name')}</label>
              <input
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900/10 text-neutral-800 dark:text-neutral-100"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">{t('phone')}</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+90 555 123 4567"
                className="w-full px-4 py-2 border dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900/10 text-neutral-800 dark:text-neutral-100"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">{t('email')}</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="mail@ornek.com"
                className="w-full px-4 py-2 border dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900/10 text-neutral-800 dark:text-neutral-100"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">{t('date')}</label>
              <select
                name="meeting_date"
                value={form.meeting_date}
                onChange={handleChange}
                className="w-full px-4 py-2 border dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900/10 text-neutral-800 dark:text-neutral-100"
                required
              >
                <option value="">{t('select_date')}</option>
                {oneWeekFromNow().map((date) => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString('tr-TR')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">{t('reason')}</label>
            <textarea
              name="reason"
              rows={3}
              value={form.reason}
              onChange={handleChange}
              placeholder={t('reason_placeholder')}
              className="w-full px-4 py-2 border dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900/10 text-neutral-800 dark:text-neutral-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">{t('time')}</label>
            <select
              name="meeting_time_slot"
              value={form.meeting_time_slot}
              onChange={handleChange}
              className="w-full px-4 py-2 border dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900/10 text-neutral-800 dark:text-neutral-100"
              required
            >
              <option value="">{t('select_time')}</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-md border dark:border-neutral-600 p-4 bg-neutral-50 dark:bg-neutral-800">
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
            {t('submit')}
          </button>
        </form>
      </div>
    </div>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['meeting', 'layout']))
    }
  };
}

export default Meeting;
