import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const logos = [
  '/volunteer/munazara.png',
  '/volunteer/hsd.png',
  '/volunteer/gdg.png',
  '/volunteer/ottoqua.png'
];

const Volunteer = () => {
  const { t } = useTranslation('volunteer');
  const items = t('items', { returnObjects: true });

  return (
    <div className="w-full flex justify-center py-16">
      <div className="w-full max-w-6xl text-left">
        <h1 className="text-2xl font-semibold mb-8 text-neutral-800 dark:text-neutral-100">
          {t('title')}
        </h1>

        <div className="space-y-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900/10 min-h-36"
            >
              <img src={logos[index]} alt={item.name} className="w-16 h-16 rounded-md object-contain" />
              <div>
                <div className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">{item.name}</div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                  {item.category} • {item.date}
                </div>
                <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['volunteer', 'layout']))
    }
  };
}

export default Volunteer;
