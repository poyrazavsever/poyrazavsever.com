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
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="my-10 max-w-6xl w-full flex flex-col gap-4"
        >
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">{t('popularProject')}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center sm:justify-between">
            {populerProjects.map((project, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
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

          <Link href='/projects' className='bg-neutral-600 w-fit text-white px-4 py-2 rounded-md text-sm dark:hover:bg-neutral-700 hover:bg-neutral-800 transition cursor-pointer'>{t("all")}</Link>
        </motion.div>
      )}

      {latestPosts.length > 0 && (
        <motion.div 
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="my-10 max-w-6xl w-full flex flex-col gap-4"
        >
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">{t('blog')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center sm:justify-between">
            {latestPosts.map(post => (
              <motion.div
                key={post.id}
                variants={itemVariants}
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
          <Link href='/blog' className='bg-neutral-600 w-fit text-white px-4 py-2 rounded-md text-sm dark:hover:bg-neutral-700 hover:bg-neutral-800 transition cursor-pointer'>{t("all")}</Link>
        </motion.div>
      )}

      <motion.div 
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className='flex flex-col items-start gap-8 w-full py-24'
      >
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">{t("usedTech")}</h2>
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

