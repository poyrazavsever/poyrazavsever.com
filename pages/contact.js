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
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 bg-clip-text text-transparent">{t('title')}</h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
            {t('description')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-800/50 rounded-2xl shadow-xl border border-neutral-200/50 dark:border-neutral-700/50 backdrop-blur-sm p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-1">
            <label htmlFor="name" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{t('nameLabel')}</label>
            <input
              type="text"
              id="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t('namePlaceholder')}
              required
              className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 text-neutral-800 dark:text-neutral-200"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="mail" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{t('emailLabel')}</label>
            <input
              type="email"
              id="mail"
              value={form.mail}
              onChange={handleChange}
              placeholder={t('emailPlaceholder')}
              required
              className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 text-neutral-800 dark:text-neutral-200"
            />
          </div>

          <div className="flex flex-col space-y-1 md:col-span-2">
            <label htmlFor="subject" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{t('subjectLabel')}</label>
            <input
              type="text"
              id="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder={t('subjectPlaceholder')}
              required
              className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 text-neutral-800 dark:text-neutral-200"
            />
          </div>

          <div className="flex flex-col space-y-1 md:col-span-2">
            <label htmlFor="content" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{t('messageLabel')}</label>
            <textarea
              id="content"
              value={form.content}
              onChange={handleChange}
              rows={6}
              placeholder={t('messagePlaceholder')}
              required
              className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 text-neutral-800 dark:text-neutral-200 resize-none"
            />
          </div>

          <div className="md:col-span-2 bg-neutral-50 dark:bg-neutral-800 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-x-auto">
            <div className="min-w-[300px] flex justify-center">
              <HCaptcha
                sitekey={process.env.NEXT_PUBLIC_CAPTCHA_KEY}
                onVerify={setToken}
                ref={captchaRef}
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 dark:shadow-blue-500/10"
            >
              {t('button')}
            </button>
          </div>
        </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
