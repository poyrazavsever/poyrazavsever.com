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
  const populerProjects = projects.filter(project => project.populer);
  const { t } = useTranslation("common");
  const [latestPosts, setLatestPosts] = useState([]);
  const router = useRouter();
  const lang = router.locale || 'tr';

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

      {/* Hero Section*/ }
      <HeroSection />

      {/* Popüler Projeler */}
      {populerProjects.length > 0 && (
        <div className="my-10 max-w-6xl w-full flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">{t('popularProject')}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center sm:justify-between">
            {populerProjects.map((project, idx) => (
              <ProjectCard
                key={idx}
                imageSrc={project.image}
                title={project.title}
                description={project.desc}
                slug={project.slug}
              />
            ))}
          </div>

          <Link href='/projects' className='bg-neutral-600 w-fit text-white px-4 py-2 rounded-md text-sm dark:hover:bg-neutral-700 hover:bg-neutral-800 transition cursor-pointer'>{t("all")}</Link>
        </div>
      )}

      {/* Son Blog Yazılarım */}
      {latestPosts.length > 0 && (
        <div className="my-10 max-w-6xl w-full flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">{t('blog')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center sm:justify-between">
            {latestPosts.map(post => (
              <BlogCard
                key={post.id}
                cardImage={post.cardImage}
                title={lang === 'tr' ? post.title_tr : post.title_en}
                description={lang === 'tr' ? post.desc_tr : post.desc_en}
                slug={post.slug}
              />
            ))}
          </div>
          <Link href='/blog' className='bg-neutral-600 w-fit text-white px-4 py-2 rounded-md text-sm dark:hover:bg-neutral-700 hover:bg-neutral-800 transition cursor-pointer'>{t("all")}</Link>
        </div>
      )}

      {/* Tech Stack*/}
      <div className='flex flex-col items-start gap-8 w-full py-24'>
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">{t("usedTech")}</h2>
        <TechStack />
      </div>
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

