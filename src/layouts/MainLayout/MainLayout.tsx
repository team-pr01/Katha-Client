import { Outlet } from "react-router-dom";
import Navbar from "../../components/Shared/Navbar/Navbar";
import Footer from "../../components/Shared/Footer/Footer";
import PromoBar from "../../components/Shared/Navbar/PromoBar";

const MainLayout = () => {
  return (
    <div>
      <PromoBar/>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
