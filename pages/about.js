import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['about', 'layout'])),
    },
  };
};

const About = () => {
  const { t } = useTranslation('about');
  const experiences = t('experiences', { returnObjects: true });
  const education = t('education', { returnObjects: true });

  return (
    <motion.div
      className="max-w-6xl mx-auto py-16 text-neutral-800 dark:text-neutral-200"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Avatar */}
      <div className="flex flex-col items-center text-center">
        <Image
          src="/avatar.png"
          alt="Avatar"
          width={96}
          height={96}
          className="rounded-full shadow-md"
        />
        <h1 className="text-xl font-bold mt-4">{t('name')}</h1>
        <p className="text-sm text-neutral-500">{t('role')}</p>
        <p className="text-sm text-blue-500 dark:text-blue-300">{t('location')}</p>
      </div>

      {/* Hakkımda */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-2">{t('aboutTitle')}</h2>
        <p className="leading-relaxed text-neutral-700 dark:text-neutral-300">
          {t('aboutDescription')}
        </p>
      </div>

      {/* Eğitim Geçmişi */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">{t('educationTitle')}</h2>
        <ul className="space-y-4">
          {education.map((edu, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <FaGraduationCap className="text-neutral-500 mt-1" />
              <div>
                <p className="font-medium">{edu.school}</p>
                <p className="text-sm text-neutral-500">{edu.degree}</p>
                <p className="text-sm text-neutral-400">{edu.duration}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Deneyim */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">{t('experienceTitle')}</h2>
        <ul className="space-y-4">
          {experiences.map((exp, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <FaBriefcase className="text-neutral-500 mt-1" />
              <div>
                <p className="font-medium">{exp.title}</p>
                <p className="text-sm text-neutral-500">{exp.duration}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Kariyer Hedefi */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-2">{t('careerTitle')}</h2>
        <p className="leading-relaxed text-neutral-700 dark:text-neutral-300">
          {t('careerDescription')}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{t('ctaTitle')}</h2>
        <Link
          href="/contact"
          className="inline-block bg-neutral-700 text-white dark:bg-white dark:text-black px-5 py-2 rounded-md text-sm hover:opacity-90 transition"
        >
          {t('ctaButton')}
        </Link>
      </div>
    </motion.div>
  );
};

export default About;
