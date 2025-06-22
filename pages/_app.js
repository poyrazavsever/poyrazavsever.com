// pages/_app.js (veya _app.tsx)
import { appWithTranslation } from 'next-i18next';
import Layout from '@/components/layout/layout';
import '../styles/globals.css';
import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sayfa ilk yüklendiğinde loading'i true yap
    setLoading(true);
    
    // 3 saniye sonra loading'i false yap
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  );
}

export default appWithTranslation(MyApp);
