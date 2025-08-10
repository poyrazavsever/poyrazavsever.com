import React from 'react'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';
import { Icon } from '@iconify/react';

const services = [
  {
    icon: "fluent:window-dev-tools-24-regular",
    title: "Full-stack Development",
    description: "Modern and scalable web applications with latest technologies",
    features: ["React & Next.js", "Node.js & Express", "MongoDB & PostgreSQL", "RESTful APIs"]
  },
  {
    icon: "fluent:design-ideas-24-regular",
    title: "UI/UX Design",
    description: "User-friendly and responsive design solutions",
    features: ["Modern UI Design", "Responsive Layout", "Interactive Prototypes", "Design Systems"]
  },
  {
    icon: "fluent:mobile-optimized-24-regular",
    title: "Mobile Development",
    description: "Cross-platform mobile applications",
    features: ["React Native", "Mobile UI/UX", "Native Features", "App Store Deploy"]
  }
];

const Freelance = () => {
  const { t } = useTranslation('freelance');

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 bg-clip-text text-transparent">
            {t('pageTitle')}
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base">
            {t('pageDescription')}
          </p>
        </div>


        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-neutral-800/50 rounded-2xl shadow-xl border border-neutral-200/50 dark:border-neutral-700/50 backdrop-blur-sm p-6 hover:scale-105 transition-transform duration-300"
            >
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                <Icon icon={service.icon} className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-3">
                {service.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <Icon icon="fluent:checkmark-circle-24-regular" className="w-5 h-5 text-blue-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>


        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
            {t('cta.title')}
          </h3>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-xl text-sm font-medium transition-colors duration-200 shadow-lg shadow-blue-500/20 dark:shadow-blue-500/10"
          >
            <Icon icon="fluent:arrow-right-24-regular" className="w-5 h-5" />
            {t('cta.button')}
          </a>
        </div>
      </div>
    </section>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['freelance', 'layout']))
    }
  };
}

export default Freelance