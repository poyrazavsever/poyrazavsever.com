import Navbar from './navbar';
import Footer from './footer';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }) => {
  return (
    <div className="max-w-5xl mx-auto container min-h-screen flex flex-col relative">

      <Navbar />

      <Toaster position='top-center'/>

      <main className="flex-1">{children}</main>

      <Footer />

    </div>
  );
};

export default Layout;
