'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Medium = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/medium')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data)
        
      });

  }, []);

  return (
    <div className="py-16">
      <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-6">
        Medium Yazılarım
      </h1>

      <ul className="space-y-6 mb-6">
        {posts?.map((post, idx) => (
          <li
            key={idx}
            className="bg-neutral-50 dark:bg-neutral-700/10 p-5 rounded-xl border border-neutral-200 dark:border-neutral-700"
          >
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              {post.title}
            </a>
            <p className="text-sm text-neutral-500 mt-1">
              {new Date(post.pubDate).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>

      <Link
        href="https://www.medium.com/@poyrazavsever"
        target="_blank"
        className="bg-neutral-600 w-fit text-white px-4 py-2 rounded-md text-sm dark:hover:bg-neutral-700 hover:bg-neutral-800 transition cursor-pointer"
      >
        Tüm Yazılarımı Gör
      </Link>
    </div>
  );
};

export default Medium;
