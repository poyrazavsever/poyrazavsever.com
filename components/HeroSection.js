import React from 'react'
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const HeroSection = () => {

  const {t} = useTranslation('common')

  return (
    <div className="my-4 sm:my-24 px-6 sm:p-0 flex flex-col sm:flex-row gap-8 sm:gap-16 items-center justify-between max-w-6xl w-full">
        <img src="/hero/1.png" alt="hero section 1" className='rounded-xl'/>

        {/* Sağdaki Metin Alanı */}
        <div className="text-center sm:text-left space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800 dark:text-neutral-100">
            {t('hello')}
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Teknolojiye meraklı bir insanım. UI/UX tasarımı ve yazılım geliştirme konularına ilgi duyuyorum.
            Frontend geliştirmede Next.js ve Tailwind kullanıyorum.
            Eğer benimle bir konu hakkında konuşmak isterseniz;
          </p>

          <Link href="/contact" className="w-full block text-center bg-neutral-600 text-white px-4 py-2 rounded-md text-sm hover:bg-neutral-800 dark:hover:bg-neutral-700 transition cursor-pointer">
              İletişime Geç
          </Link>
        </div>
      </div>
  )
}


export default HeroSection