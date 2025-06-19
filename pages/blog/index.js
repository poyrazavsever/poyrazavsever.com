'use client'

import React, { useEffect, useState } from 'react'
import BlogCard from '@/components/shared/BlogCard'
import { supabase } from '@/lib/supabaseClient'
import { useTranslation } from 'react-i18next'

const Blog = () => {
  const [posts, setPosts] = useState([])
  const { i18n } = useTranslation()
  const lang = i18n.language === 'tr' ? 'tr' : 'en'

  useEffect(() => {
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
    <div className="mt-8 w-full flex flex-col gap-8">
      <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
        Blog Yazılarım
      </h2>

      {posts.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400 text-sm italic">
          Şu anda herhangi bir blog yazım bulunmamakta.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              cardImage={post.cardImage}
              title={lang === 'tr' ? post.title_tr : post.title_en}
              description={lang === 'tr' ? post.desc_tr : post.desc_en}
              slug={post.slug}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Blog
