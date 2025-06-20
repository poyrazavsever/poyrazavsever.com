'use client';

import React, { useState, useRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { supabase } from '@/lib/supabaseClient';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['contact', 'layout'])),
    },
  };
};

const Contact = () => {
  const { t } = useTranslation('contact');
  const captchaRef = useRef(null);
  const [token, setToken] = useState('');
  const [form, setForm] = useState({
    name: '',
    mail: '',
    subject: '',
    content: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error(t('captchaError'));
      return;
    }

    const { error } = await supabase.from('messages').insert({
      name: form.name,
      mail: form.mail,
      subject: form.subject,
      content: form.content,
    });

    if (error) {
      toast.error(t('error'));
      console.error(error);
    } else {
      toast.success(t('success'));
      setForm({ name: '', mail: '', subject: '', content: '' });
      setToken('');
      if (captchaRef.current) {
        captchaRef.current.resetCaptcha();
      }
    }
  };

  return (
    <section className="py-20 flex justify-center text-neutral-800 dark:text-neutral-200">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">{t('title')}</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-12 max-w-xl">
          {t('description')}
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium mb-1">{t('nameLabel')}</label>
            <input
              type="text"
              id="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t('namePlaceholder')}
              required
              className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="mail" className="text-sm font-medium mb-1">{t('emailLabel')}</label>
            <input
              type="email"
              id="mail"
              value={form.mail}
              onChange={handleChange}
              placeholder={t('emailPlaceholder')}
              required
              className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition"
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label htmlFor="subject" className="text-sm font-medium mb-1">{t('subjectLabel')}</label>
            <input
              type="text"
              id="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder={t('subjectPlaceholder')}
              required
              className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition"
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label htmlFor="content" className="text-sm font-medium mb-1">{t('messageLabel')}</label>
            <textarea
              id="content"
              value={form.content}
              onChange={handleChange}
              rows={6}
              placeholder={t('messagePlaceholder')}
              required
              className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition resize-none"
            />
          </div>

          <div className="md:col-span-2">
            <HCaptcha
              sitekey={process.env.NEXT_PUBLIC_CAPTCHA_KEY}
              onVerify={setToken}
              ref={captchaRef}
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-neutral-800 dark:bg-neutral-300 text-white dark:text-black px-6 py-2 rounded-md text-sm font-medium hover:opacity-80 transition"
            >
              {t('button')}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
