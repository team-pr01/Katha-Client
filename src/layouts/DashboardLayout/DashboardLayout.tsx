import { Outlet } from "react-router-dom";
import SideNavigation from "../../components/DashboardComponents/SideNavigation/SideNavigation";
import Navbar from "../../components/Shared/Navbar/Navbar";
import Footer from "../../components/Shared/Footer/Footer";
import Container from "../../components/Reusable/Container/Container";

const DashboardLayout = () => {
  return (
    <div className="bg-neutral-20">
      <Navbar />
      <Container>
        <div className="flex gap-10 w-full h-screen overflow-x-hidden py-10">
          <SideNavigation />

          <div
            className={`flex-1 w-full min-w-0 overflow-y-auto overflow-x-hidden`}
          >
            <Outlet />
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
