import Image from 'next/image';
import { FaBriefcase } from 'react-icons/fa';

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
    title: 'Fullstack Developer Stajer - Tarvina Yazılım Teknolojileri',
    duration: 'Ekim 2024 – Aralık 2024',
  },
];

const About = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-neutral-800 dark:text-neutral-200">
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
        <p className="text-sm text-blue-500">Ankara da yaşıyor, Üniversite öğrencisi</p>
      </div>

      {/* About Me */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-2">Hakkımda</h2>
        <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          Ortaokulda yazılımla tanıştığım andan beri bir şeyler öğrenmeye ve geliştirmeye çalışıyorum. Lise hayatımda öğrenme hevesim giderek arttı ve web alanında çeşitli teknolojileri öğrenme fırsatı yakalım. Lise hayatımın sonlarına doğru mobil dünyasına giriş yaptım. Şuan aktif olarak üretmeye, geliştirmeye ve en önemlisi öğrenmeye devam ediyorum. 
        </p>
      </div>

      {/* Experience */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Deneyim</h2>
        <ul className="space-y-4">
          {experiences.map((exp, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <FaBriefcase className="text-neutral-500 mt-1" />
              <div>
                <p className="text-sm font-medium">{exp.title}</p>
                <p className="text-xs text-neutral-500">{exp.duration}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default About;
