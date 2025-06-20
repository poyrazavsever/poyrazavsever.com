import React from 'react'
import TechStack from '@/components/TechStack'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Stack = () => {
  const { t } = useTranslation('stack')

  return (
    <div className='flex flex-col items-start gap-8 w-full py-8 md:py-16'>
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">{t('usedTech')}</h2>
        <TechStack />
    </div>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'stack'])),
    },
  }
}

export default Stack

