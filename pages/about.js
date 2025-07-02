import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

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
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto py-16 text-neutral-800 dark:text-neutral-200"
    >
      {/* Avatar */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur-sm"></div>
          <Image
            src="/avatar.png"
            alt="Avatar"
            width={96}
            height={96}
            className="rounded-full relative ring-2 ring-blue-500/20 dark:ring-blue-400/20"
          />
        </motion.div>
        <motion.h1 variants={itemVariants} className="text-2xl font-bold mt-4 text-neutral-800 dark:text-neutral-200">
          {t('name')}
        </motion.h1>
        <motion.p variants={itemVariants} className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          {t('role')}
        </motion.p>
        <motion.p variants={itemVariants} className="text-sm text-blue-600 dark:text-blue-400 mt-1">
          {t('location')}
        </motion.p>
      </motion.div>

      {/* Hakkımda */}
      <motion.div
        variants={itemVariants}
        className="mt-12 p-6 bg-white/50 dark:bg-neutral-900/30 backdrop-blur-sm rounded-xl border border-neutral-200/50 dark:border-neutral-700/50"
      >
        <h2 className="text-lg font-semibold mb-3 text-blue-950 dark:text-blue-200">
          {t('aboutTitle')}
        </h2>
        <p className="leading-relaxed text-neutral-700 dark:text-neutral-300">
          {t('aboutDescription')}
        </p>
      </motion.div>

      {/* Eğitim Geçmişi */}
      <motion.div
        variants={itemVariants}
        className="mt-10 p-6 bg-white/50 dark:bg-neutral-900/30 backdrop-blur-sm rounded-xl border border-neutral-200/50 dark:border-neutral-700/50"
      >
        <h2 className="text-lg font-semibold mb-4 text-blue-950 dark:text-blue-200">
          {t('educationTitle')}
        </h2>
        <ul className="space-y-6">
          {education.map((edu, idx) => (
            <motion.li
              key={idx}
              variants={itemVariants}
              className="group flex items-start gap-4 p-4 rounded-lg hover:bg-white/30 dark:hover:bg-neutral-800/30 transition-all duration-300"
            >
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <FaGraduationCap className="text-xl" />
              </div>
              <div>
                <p className="font-medium text-neutral-800 dark:text-neutral-200">{edu.school}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{edu.degree}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-1">{edu.duration}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Deneyim */}
      <motion.div
        variants={itemVariants}
        className="mt-10 p-6 bg-white/50 dark:bg-neutral-900/30 backdrop-blur-sm rounded-xl border border-neutral-200/50 dark:border-neutral-700/50"
      >
        <h2 className="text-lg font-semibold mb-4 text-blue-950 dark:text-blue-200">
          {t('experienceTitle')}
        </h2>
        <ul className="space-y-6">
          {experiences.map((exp, idx) => (
            <motion.li
              key={idx}
              variants={itemVariants}
              className="group flex items-start gap-4 p-4 rounded-lg hover:bg-white/30 dark:hover:bg-neutral-800/30 transition-all duration-300"
            >
              <div className="p-2 rounded-lg bg-blue-100/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <FaBriefcase className="text-xl" />
              </div>
              <div>
                <p className="font-medium text-neutral-800 dark:text-neutral-200">{exp.title}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{exp.duration}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Kariyer Hedefi */}
      <motion.div
        variants={itemVariants}
        className="mt-10 p-6 bg-white/50 dark:bg-neutral-900/30 backdrop-blur-sm rounded-xl border border-neutral-200/50 dark:border-neutral-700/50"
      >
        <h2 className="text-lg font-semibold mb-3 text-blue-950 dark:text-blue-200">
          {t('careerTitle')}
        </h2>
        <p className="leading-relaxed text-neutral-700 dark:text-neutral-300">
          {t('careerDescription')}
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div
        variants={itemVariants}
        className="mt-12 text-center"
      >
        <h2 className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400">
          {t('ctaTitle')}
        </h2>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href="/contact"
            className="inline-block bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            {t('ctaButton')}
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default About;
