'use client';

import React from 'react';

const volunteerData = [
  {
    logo: '/volunteer/munazara.png',
    name: 'Ostim Teknik Üniversiteis Münazara Topluluğu',
    category: 'Eğitim',
    date: 'Ekim 2024 - Halen',
    content: 'Okulumuzda münazara alanında eğitimler veriyorum, turnuvalara katılacak takım arkadaşlarımızla yapılan çalışmaların organizasyonunu sağlıyorum. Kurucu Başkanlık görevini üstleniyorum.',
  },
  {
    logo: '/volunteer/hsd.png',
    name: 'Huawei Student Developers',
    category: 'Teknoloji',
    date: 'Şubat 2025 - Hala',
    content: 'Medium Araştırma, Sosyal Medya ve Proje ekiplerinde bir şeyler üretiyor ve geliştiriyorum. Proje ekibinde sosyal sorumluluk projelerinde takım çalışmasını deneyimliyorum.',
  },
  {
    logo: '/volunteer/gdg.png',
    name: 'Google Developers Group',
    category: 'Teknoloji',
    date: 'Aralık 2024 - Hala',
    content: 'Teknoloji departmanda görev alıyorum. Düzenlenen etkinliklerde teknik ekipte yer alıyorum. ',
  },
  {
    logo: '/volunteer/ottoqua.png',
    name: 'Ottoqua Teknoloji Takımı',
    category: 'Teknoloji',
    date: 'Kasım 2024 - Hala',
    content: 'Tubitak ve teknofest yarışmalarına katılıyor, yazılım çözümleri geliştiriyoruz. Web platformları ve mobil uygulamalar kodluyorum.',
  },
];

const Volunteer = () => {
  return (
    <div className="w-full flex justify-center py-16">
      <div className="w-full max-w-6xl text-left">
        <h1 className="text-2xl font-semibold mb-8 text-neutral-800 dark:text-neutral-100">Gönüllü Çalışmalar</h1>

        <div className="space-y-6">
          {volunteerData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900/10 min-h-36"
            >
              <img src={item.logo} alt={item.name} className="w-16 h-16 rounded-md object-contain" />
              <div>
                <div className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">{item.name}</div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                  {item.category} • {item.date}
                </div>
                <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
