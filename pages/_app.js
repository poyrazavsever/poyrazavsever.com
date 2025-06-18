import Layout from '@/components/layout/layout';
import '../styles/globals.css';

export const metadata = {
  title: 'Poyraz Avsever',
  description: 'Portfolio website',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
