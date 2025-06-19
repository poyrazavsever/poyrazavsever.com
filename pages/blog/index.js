import React from 'react'
import BlogCard from '@/components/shared/BlogCard'

const Blog = () => {
  return (
    <div className='mt-8 max-w-6xl w-full flex flex-col gap-8'>

        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Blog Yazılarım</h2>

        <BlogCard cardImage="/gallery/1.png" title="deneme deneme deneme deneme deneme" description="bu bir description yazısıdır. Denemek için birazcık da uzun yazacağım. Bakalım nasıl gözükecek?" slug="denemedeneme"/>

    </div>
  )
}

export default Blog