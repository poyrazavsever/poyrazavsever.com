import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import ProjectCard from '@/components/shared/ProjectCard';
import TechStack from '@/components/TechStack';
import BlogCard from '@/components/shared/BlogCard';
import { projects } from '@/data/projects';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const { t } = useTranslation("common");
  const [latestPosts, setLatestPosts] = useState([]);
  const router = useRouter();
  const lang = router.locale || 'tr';

  const populerProjects = projects[lang]?.filter(project => project.populer) || [];

  const sectionVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    offscreen: { y: 20, opacity: 0 },
    onscreen: { y: 0, opacity: 1 }
  };

  useEffect(() => {
    async function fetchPosts() {
      let selectFields = 'id, slug, cardImage';
      if (lang === 'tr') {
        selectFields += ', title_tr, desc_tr';
      } else {
        selectFields += ', title_en, desc_en';
      }
      const { data, error } = await supabase
        .from('posts')
        .select(selectFields)
        .order('created_at', { ascending: false })
        .limit(3);
      if (!error) setLatestPosts(data);
    }
    fetchPosts();
  }, [lang]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <HeroSection />
      </motion.div>

      {populerProjects.length > 0 && (
        <motion.div 
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
          className="my-12 max-w-6xl w-full flex flex-col gap-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 sm:justify-between">
            <h2 className="text-xl font-semibold text-blue-500 dark:text-blue-300">
              {t('popularProject')}
            </h2>
            <Link 
              href='/projects' 
              className='inline-flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm border border-blue-200 dark:border-blue-800 
                px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300 w-full sm:w-auto'
            >
              {t("all")}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
            {populerProjects.map((project, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="w-full"
              >
                <ProjectCard
                  imageSrc={project.image}
                  title={project.title}
                  description={project.desc}
                  slug={project.slug}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {latestPosts.length > 0 && (
        <motion.div 
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
          className="my-10 max-w-6xl w-full flex flex-col gap-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 sm:justify-between">
            <h2 className="text-xl font-semibold text-blue-500 dark:text-blue-300">{t('blog')}</h2>
            <Link 
              href='/blog' 
              className='inline-flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm border border-blue-200 dark:border-blue-800 
                px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300 w-full sm:w-auto'
            >
              {t("all")}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
            {latestPosts.map(post => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                className="w-full"
              >
                <BlogCard
                  cardImage={post.cardImage}
                  title={lang === 'tr' ? post.title_tr : post.title_en}
                  description={lang === 'tr' ? post.desc_tr : post.desc_en}
                  slug={post.slug}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div 
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
        className='flex flex-col items-start gap-8 w-full py-24 px-4 sm:px-6 md:px-0'
      >
        <h2 className="text-xl font-semibold text-blue-500 dark:text-blue-300">{t("usedTech")}</h2>
        <TechStack />
      </motion.div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'layout'])),
    },
  };
}

