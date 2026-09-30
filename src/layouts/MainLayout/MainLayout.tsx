import { Outlet } from "react-router-dom";
import Navbar from "../../components/Shared/Navbar/Navbar";
import Footer from "../../components/Shared/Footer/Footer";
import PromoBar from "../../components/Shared/Navbar/PromoBar";
import FloatingWhatsApp from "../../components/Shared/FloatingWhatsApp/FloatingWhatsApp";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const MainLayout = () => {
  return (
    <div>
      <ScrollToTop/>
      <PromoBar/>
      <Navbar />
      <Outlet />
      <Footer />
      <FloatingWhatsApp/>
    </div>
  );
};

export default MainLayout;
