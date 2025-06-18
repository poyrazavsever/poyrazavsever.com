import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full flex items-center justify-center">

      {/* Hero Section */ }
      <div className="my-4 sm:my-24 px-6 sm:p-0 flex flex-col sm:flex-row gap-8 sm:gap-16 items-center justify-between max-w-6xl w-full">
        
        <img src="/hero/1.png" alt="hero section 1" className='rounded-xl'/>

        {/* Sağdaki Metin Alanı */}
        <div className="text-center sm:text-left space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800">
            Hi, I'm Poyraz
          </h1>
          <p className="text-sm text-neutral-600 leading-relaxed">
            I am Poyraz. I have been interested in UI/UX design and software development. 
            I use Next.js and Tailwind in frontend development.
            If you'd like to talk to me about something;
          </p>

          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-neutral-600 text-white px-4 py-2 rounded-md text-sm shadow hover:bg-neutral-800 transition cursor-pointer"
            >
              Get in touch
            </motion.button>
          </Link>
        </div>
      </div>
      
    </div>
  );
}
