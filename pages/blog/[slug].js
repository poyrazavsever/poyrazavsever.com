import React from 'react';
import ReactMarkdown from 'react-markdown';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

const DetailPage = ({ post, categoryName }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const locale = router.locale || 'tr';

  if (!post) {
    return (
      <div className="text-center text-neutral-500 py-12">
        {t('contentLoading')}
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Banner */}
      {post.bannerImage && (
        <div className="relative w-full h-64 mb-6">
          <Image
            src={post.bannerImage}
            alt={locale === 'tr' ? post.title_tr : post.title_en}
            fill
            className="object-cover rounded-xl"
            priority
          />
        </div>
      )}

      {/* Başlık ve Açıklama */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-2">
          {locale === 'tr' ? post.title_tr : post.title_en}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 break-words whitespace-normal leading-relaxed">
          {locale === 'tr' ? post.desc_tr : post.desc_en}
        </p>
        <p className="text-sm text-neutral-400 mt-2">
          {new Date(post.created_at).toLocaleDateString(locale)} • {t('category')}: {categoryName}
          {post.popular && (
            <span className="ml-2 text-red-500 font-semibold">{t('popular')}</span>
          )}
        </p>
      </div>

      {/* İçerik */}
      <article className="mdCustom">
        <ReactMarkdown>
          {locale === 'tr' ? post.content_tr : post.content_en || t('contentNotFound')}
        </ReactMarkdown>
      </article>

      <div className="mt-10">
        <Link
          href="/blog"
          locale={locale}
          className="text-sm text-neutral-500 hover:text-neutral-800 dark:hover:text-white underline"
        >
          {t('backToBlog')} ←
        </Link>
      </div>
    </div>
  );
};

export async function getStaticPaths({ locales }) {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('slug');

  if (error) {
    return {
      paths: [],
      fallback: false
    };
  }

  const paths = [];
  
  locales.forEach(locale => {
    posts.forEach(post => {
      paths.push({
        params: { slug: post.slug },
        locale
      });
    });
  });

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params, locale }) {
  const { data: post, error: postError } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (postError || !post) {
    return {
      notFound: true
    };
  }

  let categoryName = 'Unknown';
  
  if (post.category) {
    const { data: categoryData } = await supabase
      .from('categories')
      .select('*')
      .eq('id', post.category)
      .single();

    if (categoryData) {
      categoryName = locale === 'tr' ? categoryData.name_tr : categoryData.name_en;
    }
  }

  return {
    props: {
      post,
      categoryName,
      ...(await serverSideTranslations(locale, ['layout', 'common'])),
    },
    revalidate: 60
  };
}

export default DetailPage;