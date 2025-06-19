'use client';

import Image from 'next/image';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Link from 'next/link';

const experiences = [
  {
    title: 'Fullstack Developer Stajyer - Omedya Bilişim A.Ş',
    duration: 'Haziran 2025 – Halen',
  },
  {
    title: 'Fullstack Developer Stajyer - ARC Foreign Trade',
    duration: 'Şubat 2025 – Haziran 2025',
  },
  {
    title: 'Fullstack Developer Stajyer - Tarvina Yazılım Teknolojileri',
    duration: 'Ekim 2024 – Aralık 2024',
  },
];

const education = [
  {
    school: 'Ostim Teknik Üniversitesi',
    degree: 'Yazılım Mühendisliği (Lisans)',
    duration: '2024 – Halen',
  },
  {
    school: 'TOBB Tuşba Fen Lisesi',
    degree: 'Fen Lisesi, Sayısal Bölüm',
    duration: '2020 – 2024',
  },
];

const About = () => {
  return (
    <motion.div
      className="max-w-6xl mx-auto py-16 text-neutral-800 dark:text-neutral-200"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Avatar */}
      <div className="flex flex-col items-center text-center">
        <Image
          src="/avatar.jpg"
          alt="Avatar"
          width={96}
          height={96}
          className="rounded-full shadow-md"
        />
        <h1 className="text-xl font-bold mt-4">Poyraz Avsever</h1>
        <p className="text-sm text-neutral-500">Fullstack Developer</p>
        <p className="text-sm text-blue-500 dark:text-blue-300">Ankara’da yaşıyor, Üniversite öğrencisi</p>
      </div>

      {/* Hakkımda */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-2">Hakkımda</h2>
        <p className="leading-relaxed text-neutral-700 dark:text-neutral-300">
          Ortaokulda yazılımla tanıştığım andan beri bir şeyler öğrenmeye ve geliştirmeye çalışıyorum. Lise hayatımda öğrenme hevesim giderek arttı ve web alanında çeşitli teknolojileri öğrenme fırsatı yakaladım. Lise sonlarına doğru mobil dünyasına giriş yaptım. Şu an aktif olarak üretmeye, geliştirmeye ve en önemlisi öğrenmeye devam ediyorum.
        </p>
      </div>

      {/* Eğitim Geçmişi */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Eğitim Geçmişi</h2>
        <ul className="space-y-4">
          {education.map((edu, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <FaGraduationCap className="text-neutral-500 mt-1" />
              <div>
                <p className="font-medium">{edu.school}</p>
                <p className="text-sm text-neutral-500">{edu.degree}</p>
                <p className="text-sm text-neutral-400">{edu.duration}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Deneyim */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Deneyim</h2>
        <ul className="space-y-4">
          {experiences.map((exp, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <FaBriefcase className="text-neutral-500 mt-1" />
              <div>
                <p className="font-medium">{exp.title}</p>
                <p className="text-sm text-neutral-500">{exp.duration}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Kariyer Vizyonu */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-2">Kariyer Hedefim</h2>
        <p className="leading-relaxed text-neutral-700 dark:text-neutral-300">
          Temiz kod yazma prensiplerine bağlı, çözüm odaklı ve takım çalışmasına uyumlu bir geliştirici olarak, yazılım alanında kendimi sürekli geliştirerek gerçek dünya problemlerine etkili çözümler üretmek istiyorum. Gelecekte kaliteli ekiplerde yer almayı ve fayda sağlayan projelerde bulunmayı hedefliyorum.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-12">
      <h2 className="text-lg font-semibold mb-2">Benimle çalışmak ister misin?</h2>
        <Link
          href="/contact"
          className="inline-block bg-neutral-700 text-white dark:bg-white dark:text-black px-5 py-2 rounded-md text-sm hover:opacity-90 transition"
        >
          İletişime Geç
        </Link>
      </div>
    </motion.div>
  );
};

export default About;
