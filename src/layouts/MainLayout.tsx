import Footer from './Footer';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-12">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
