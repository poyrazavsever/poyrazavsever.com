import React from 'react'
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const HeroSection = () => {
  const {t} = useTranslation('common')

  return (
    <div className="my-4 md:my-24 sm:p-0 flex flex-col md:flex-row gap-8 sm:gap-16 items-start md:items-center justify-between max-w-6xl w-full">
        <img 
          src="/hero/1.png" 
          alt="hero section 1" 
          className='rounded-xl w-full'
        />

        <div className="text-left space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-500 dark:text-blue-300">
            {t('hello')}
          </h1>
          <p className="text-sm text-blue-950/70 dark:text-blue-100 leading-relaxed">
            {t('welcome')}
          </p>

          <Link 
            href="/contact" 
            className="w-full block text-center bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm 
            hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 
            transition-colors duration-200 border border-blue-400 dark:border-blue-600">
            {t('contact')}
          </Link>
        </div>
    </div>
  )
}

export default HeroSection