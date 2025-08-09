import Navbar from './navbar';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const metaData = {
  index: {
    title: "Ana Sayfa | Poyraz Avsever",
    description: "Poyraz Avsever'in kişisel web sitesi. Teknoloji, yazılım ve tasarım üzerine içerikler."
  },
  about: {
    title: "Hakkımda | Poyraz Avsever",
    description: "Poyraz Avsever hakkında detaylı bilgi."
  },
  bookmark: {
    title: "Yer İmleri | Poyraz Avsever",
    description: "Poyraz Avsever'in favori bağlantıları."
  },
  certificates: {
    title: "Sertifikalar | Poyraz Avsever",
    description: "Poyraz Avsever'in aldığı sertifikalar."
  },
  contact: {
    title: "İletişim | Poyraz Avsever",
    description: "Poyraz Avsever ile iletişime geçin."
  },
  designs: {
    title: "Tasarım Çalışmaları | Poyraz Avsever",
    description: "Poyraz Avsever'in UI/UX tasarım çalışmaları."
  },
  gallery: {
    title: "Galeri | Poyraz Avsever",
    description: "Poyraz Avsever'in fotoğraf ve video galerisi."
  },
  gear: {
    title: "Kullandığım Ekipmanlar | Poyraz Avsever",
    description: "Poyraz Avsever'in kullandığı ekipmanlar."
  },
  medium: {
    title: "Medium Yazılarım | Poyraz Avsever",
    description: "Poyraz Avsever'in Medium'da yayımlanan yazıları."
  },
  meeting: {
    title: "Toplantı Planla | Poyraz Avsever",
    description: "Poyraz Avsever ile toplantı planlayın."
  },
  others: {
    title: "Diğer Linkler | Poyraz Avsever",
    description: "Poyraz Avsever'in diğer bağlantıları."
  },
  references: {
    title: "Referanslar | Poyraz Avsever",
    description: "Poyraz Avsever hakkında söylenenler."
  },
  stack: {
    title: "Teknoloji Yığınım | Poyraz Avsever",
    description: "Poyraz Avsever'in kullandığı teknolojiler."
  },
  volunteer: {
    title: "Gönüllülük | Poyraz Avsever",
    description: "Poyraz Avsever'in gönüllü olarak çalıştığı projeler."
  },
  blog: {
    title: "Blog | Poyraz Avsever",
    description: "Poyraz Avsever'in blog yazıları."
  },
  projects: {
    title: "Projeler | Poyraz Avsever",
    description: "Poyraz Avsever'in projeleri."
  }
};

const Layout = ({ children }) => {
  const router = useRouter();
  // Route'u al, başındaki /'yi kaldır, boşsa index yap
  const routeKey = router.pathname.replace('/', '') || 'index';
  const meta = metaData[routeKey] || metaData['index'];

  useEffect(() => {
    const cursor = document.querySelector('.cursor');
    
    const moveCursor = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    const addHoverClass = () => cursor.classList.add('hover');
    const removeHoverClass = () => cursor.classList.remove('hover');

    document.addEventListener('mousemove', moveCursor);
    
    const clickables = document.querySelectorAll('a, button, input, textarea');
    clickables.forEach(element => {
      element.addEventListener('mouseenter', addHoverClass);
      element.addEventListener('mouseleave', removeHoverClass);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      clickables.forEach(element => {
        element.removeEventListener('mouseenter', addHoverClass);
        element.removeEventListener('mouseleave', removeHoverClass);
      });
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto min-h-screen flex flex-col relative px-4 md:px-0 pb-16">
      <div className="cursor" />
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>

      <Toaster position='top-center'/>

      <main className="flex-1">{children}</main>

      <Navbar />
    </div>
  );
};

export default Layout;