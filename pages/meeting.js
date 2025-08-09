'use client';

import React, { useState, useRef, useEffect } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { supabase } from '@/lib/supabaseClient';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

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

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setForm({ ...form, meeting_date: date.toISOString().split('T')[0] });
    // Burada normalde backend'den müsait saatleri çekebilirsiniz
    setAvailableTimeSlots(timeSlots);
  };

  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const maxDate = new Date();
      maxDate.setDate(today.getDate() + 7);
      
      return date < today || date > maxDate || date.getDay() === 0; // Pazar günleri kapalı
    }
  };

  return (
    <div className="w-full flex justify-center py-16">
      <div className="w-full max-w-7xl">
        <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-8">
          {t("title")}
        </h1>

        <form
          className="flex flex-col lg:flex-row gap-8"
          onSubmit={handleSubmit}
        >
          {/* Sol Taraf - Takvim ve Saat Seçimi */}
          <div className="lg:w-1/2 space-y-6">
            <div className="bg-white dark:bg-neutral-800 p-4 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                tileDisabled={tileDisabled}
                minDate={new Date()}
                maxDate={(() => {
                  const d = new Date();
                  d.setDate(d.getDate() + 7);
                  return d;
                })()}
                className="w-full rounded-lg border-none"
              />
            </div>

            {selectedDate && (
              <div className="bg-white dark:bg-neutral-800 p-4 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                  {t("time")} - {selectedDate.toLocaleDateString("tr-TR")}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {availableTimeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() =>
                        setForm({ ...form, meeting_time_slot: slot })
                      }
                      className={`p-2 text-sm rounded-lg transition-colors ${
                        form.meeting_time_slot === slot
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                          : "bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-blue-50 dark:hover:bg-blue-900/50"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white dark:bg-neutral-800 p-4 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
              <HCaptcha
                sitekey={process.env.NEXT_PUBLIC_CAPTCHA_KEY}
                onVerify={handleVerify}
                ref={captchaRef}
                theme={captchaTheme}
              />
            </div>
          </div>

          {/* Sağ Taraf - Form Alanları */}
          <div className="lg:w-1/2 space-y-6">
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    {t("name")}
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900/10 text-neutral-800 dark:text-neutral-100"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    {t("phone")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+90 555 123 4567"
                    className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900/10 text-neutral-800 dark:text-neutral-100"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="mail@example.com"
                    className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900/10 text-neutral-800 dark:text-neutral-100"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    {t("reason")}
                  </label>
                  <textarea
                    name="reason"
                    rows={4}
                    value={form.reason}
                    onChange={handleChange}
                    placeholder={t("reason_placeholder")}
                    className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900/10 text-neutral-800 dark:text-neutral-100"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {t("submit")}
            </button>
          </div>
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
