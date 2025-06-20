'use client'

import React, { useEffect, useState } from 'react'
import BlogCard from '@/components/shared/BlogCard'
import { supabase } from '@/lib/supabaseClient'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [lang, setLang] = useState<'tr' | 'en' | 'de' | 'es'>('en')
  const { t } = useTranslation('blog')

  useEffect(() => {
    const storedLang = localStorage.getItem('language')
    if (storedLang === 'tr' || storedLang === 'de' || storedLang === 'es') {
      setLang(storedLang)
    } else {
      setLang('en')
    }

    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Blog verileri alınamadı:', error)
      } else {
        setPosts(data || [])
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="my-8 w-full flex flex-col gap-8">
      <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
        {t('heading')}
      </h2>

      {posts.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400 text-sm italic">
          {t('noPosts')}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              cardImage={post.cardImage}
              title={post[`title_${lang}`]}
              description={post[`desc_${lang}`]}
              slug={post.slug}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Blog

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'layout', 'blog'])),
    },
  }
}
