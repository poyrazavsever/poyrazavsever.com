import Layout from '@/components/layout/layout';
import '../styles/globals.css';

export const metadata = {
  title: 'Poyraz Avsever',
  description: 'Portfolio website',
};

export default function RootLayout({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
