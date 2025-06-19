import React from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Ali Korkmaz',
    message:
      'Tam istediğim gibi bir site oldu. Düşünemediklerimi de düşünmesi ve her şeyi şeffaf bir şekilde açıklaması çalışmanın beklediğimden daha da iyi olmasını sağladı. Her şey için çok teşekkür ederim.',
    stars: 5,
    time: '2025',
    image: 'ali.png',
    link: '',
  },
  {
    id: 2,
    name: 'Halil İbrahim Sabo',
    message:
      'Poyraz çok başarılı ve çalışkan bir kardeşim. Çok dürüst ve şeffaf bir yaklaşımı var. Poyraz’ın başarılarının devamını görmekten mutluluk duyuyorum.',
    stars: 5,
    time: '2024',
    image: 'halil.png',
    link: 'https://www.linkedin.com/in/halil-ibrahim-sabo-18a03a251/',
  },
  {
    id: 3,
    name: 'myyhsky5345',
    message: 'Teşekkür ediyorum kaliteli bir iş gerçekleşti.',
    stars: 5,
    time: '2024',
    image: 'default.png',
    link: 'https://bionluk.com/poyrazavsever',
  },
  {
    id: 4,
    name: 'ysfszgn',
    message: 'Çok kaliteli, başarılı bir çalışma geldi elime, teşekkürler.',
    stars: 4.8,
    time: '2022',
    image: 'ysf.png',
    link: 'https://bionluk.com/poyrazavsever',
  },
];

const References = () => {
  return (
    <div className="py-16">
      <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-8">
        Referanslar
      </h1>

      <div className="grid sm:grid-cols-2 gap-8">
        {testimonials.map(({ id, name, message, stars, time, image, link }) => (
          <div
            key={id}
            className="bg-neutral-50/20 dark:bg-neutral-700/10 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700 transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={`/references/${image}`}
                alt={name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div>
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {name}
                  </a>
                ) : (
                  <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{name}</p>
                )}
                <p className="text-xs text-neutral-500">{time}</p>
              </div>
            </div>

            <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3 leading-relaxed">{message}</p>

            <div className="flex gap-1 text-yellow-500">
              {Array.from({ length: Math.floor(stars) }).map((_, idx) => (
                <FaStar key={idx} />
              ))}
              {stars % 1 !== 0 && <FaStar className="opacity-50" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default References;
