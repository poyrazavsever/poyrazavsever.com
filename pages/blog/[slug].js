'use client';

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { supabase } from '@/lib/supabaseClient';
import { useParams } from 'next/navigation';

const DetailPage = () => {
  const [post, setPost] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [lang, setLang] = useState('en');
  const params = useParams();
  const slug = params?.slug;

  useEffect(() => {
    const storedLang = localStorage.getItem('language');
    setLang(storedLang === 'tr' ? 'tr' : 'en');

    const fetchPost = async () => {
      if (!slug) return;

      const { data: postData, error: postError } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();

      if (postError) {
        console.error('Post alınamadı:', postError);
        return;
      }

      setPost(postData);

      // kategori ID'ye göre kategori adı getir
      if (postData?.category) {
        const { data: categoryData, error: categoryError } = await supabase
          .from('categories')
          .select('*')
          .eq('id', postData.category)
          .single();

        if (!categoryError && categoryData) {
          setCategoryName(
            lang === 'tr' ? categoryData.name_tr : categoryData.name_en
          );
        } else {
          setCategoryName('Bilinmeyen');
        }
      }
    };

    fetchPost();
  }, [slug]);

  if (!post) {
    return <p className="text-center text-neutral-500 py-12">İçerik yükleniyor...</p>;
  }

  return (
    <div className="py-8">
      {/* Banner */}
      {post.bannerImage && (
        <img
          src={post.bannerImage}
          alt="Banner"
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
      )}

      {/* Başlık ve Açıklama */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-2">
          {lang === 'tr' ? post.title_tr : post.title_en}
        </h1>
        <p className="text-gray-600 break-words whitespace-normal leading-relaxed">
          {lang === 'tr' ? post.desc_tr : post.desc_en}
        </p>
        <p className="text-sm text-gray-400 mt-2">
          {new Date(post.created_at).toLocaleDateString()} • Kategori: {categoryName}
          {post.popular && <span className="ml-2 text-red-500 font-semibold">Popüler</span>}
        </p>
      </div>

      {/* İçerik */}
      <div className="mdCustom">
        <ReactMarkdown>
          {lang === 'tr' ? post.content_tr : post.content_en || '*İçerik bulunamadı.*'}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default DetailPage;
