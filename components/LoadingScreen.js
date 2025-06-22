import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const locale = router.locale || 'tr';
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Check if user has seen the loading screen before
    const hasSeenLoading = localStorage.getItem('hasSeenLoading');

    if (hasSeenLoading) {
      setShowLoading(false);
      document.body.style.overflow = 'auto';
    } else {
      // If first visit, set the flag in localStorage
      localStorage.setItem('hasSeenLoading', 'true');
    }
  }, []);

  if (!showLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-neutral-900"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2 }}
      onAnimationComplete={() => {
        document.body.style.overflow = 'auto';
        setShowLoading(false);
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.h1 
          className="text-4xl font-bold text-neutral-800 dark:text-neutral-200"
          animate={{ y: -50 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {t('hi')}
        </motion.h1>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;