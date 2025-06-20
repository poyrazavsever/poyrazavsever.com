'use client'

import React, { useEffect, useState } from 'react'
import BlogCard from '@/components/shared/BlogCard'
import { supabase } from '@/lib/supabaseClient'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FiSearch } from 'react-icons/fi' // Search ikonu için

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [lang, setLang] = useState('en')
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

  // Filtreleme fonksiyonu
  const filteredPosts = posts.filter((post) => {
    const title = post[`title_${lang}`].toLowerCase()
    const description = post[`desc_${lang}`].toLowerCase()
    const search = searchTerm.toLowerCase()
    
    return title.includes(search) || description.includes(search)
  })

  return (
    <div className="my-8 w-full flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
          {t('heading')}
        </h2>

        {/* Arama Kutusu */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full md:w-80 pl-10 pr-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 
                     bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 
                     placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400 text-sm italic">
          {searchTerm ? t('noResults') : t('noPosts')}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
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
