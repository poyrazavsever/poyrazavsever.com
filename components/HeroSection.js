import React from 'react'
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const HeroSection = () => {

  const {t} = useTranslation('common')

  return (
    <div className="my-4 md:my-24 sm:p-0 flex flex-col md:flex-row gap-8 sm:gap-16 items-start md:items-center justify-between max-w-6xl w-full">
        <img src="/hero/1.png" alt="hero section 1" className='rounded-xl w-full'/>

        {/* Sağdaki Metin Alanı */}
        <div className="text-left space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800 dark:text-neutral-100">
            {t('hello')}
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {t('welcome')}
          </p>

          <Link href="/contact" className="w-full block text-center bg-neutral-600 text-white px-4 py-2 rounded-md text-sm hover:bg-neutral-800 dark:hover:bg-neutral-700 transition cursor-pointer">
            {t('contact')}
          </Link>
        </div>
      </div>
  )
}


export default HeroSection