import Navbar from './navbar';
import Footer from './footer';

const Layout = ({ children }) => {
  return (
    <div className="max-w-5xl mx-auto container min-h-screen flex flex-col relative">

      <Navbar />

      <main className="flex-1">{children}</main>

      <Footer />

    </div>
  );
};

export default Layout;
