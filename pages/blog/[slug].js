import React from 'react';
import ReactMarkdown from 'react-markdown';

const DetailPage = ({
  bannerImage="/blog/banner1.png",
  title_tr = "Başlık başlık",
  title_en = "Header Header",
  desc_tr = "aasdadasdasdasdasd",
  desc_en = "a",
  content_tr = "z",
  content_en = "a",
  created_at = "11/10/2006",
  popular = true,
  category = "Yazılım & Teknoloji",
}) => {
  return (
    <div className="py-8">
      {/* Banner Görseli */}
      {bannerImage && (
        <img
          src={bannerImage}
          alt="Banner"
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
      )}

      {/* Başlık ve Açıklama */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-2">{title_tr || title_en}</h1>
        <p className="text-gray-600">{desc_tr || desc_en}</p>
        <p className="text-sm text-gray-400 mt-2">
          {new Date(created_at).toLocaleDateString()} • Kategori: {category}
          {popular && <span className="ml-2 text-red-500 font-semibold">Popüler</span>}
        </p>
      </div>

      {/* Markdown İçeriği */}
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>
          {content_tr || content_en || '*İçerik bulunamadı.*'}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default DetailPage;
