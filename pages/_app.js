// pages/_app.js (veya _app.tsx)
import { appWithTranslation } from 'next-i18next';
import Layout from '@/components/layout/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default appWithTranslation(MyApp);
