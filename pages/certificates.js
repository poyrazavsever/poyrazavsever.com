'use client';

import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['certificates', 'layout'])),
    },
  };
};

const Certificates = () => {
  const { t } = useTranslation('certificates');
  const certificates = t('list', { returnObjects: true });

  return (
    <div className="py-16 text-neutral-800 dark:text-neutral-200">
      <h1 className="text-2xl font-semibold mb-8">
        {t('title')}{" "}
        <span className="text-lg font-medium text-neutral-400">
          ({t('count', { count: certificates.length })})
        </span>
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        {certificates.map((cert, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-start gap-5 border border-neutral-200 dark:border-neutral-700 p-4 rounded-lg transition"
          >
            <div className="relative w-full sm:w-56 h-40 rounded-lg overflow-hidden">
              <Image
                src={cert.image}
                alt={cert.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 space-y-1">
              <h2 className="text-md font-semibold">{cert.name}</h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {cert.organization} – {cert.date}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                {cert.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
