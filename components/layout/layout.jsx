import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="max-w-5xl mx-auto container min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-1">{children}</main>

      <Footer />

    </div>
  );
};

export default Layout;
