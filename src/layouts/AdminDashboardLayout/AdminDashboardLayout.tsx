import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { findActiveGroup, findActiveItem } from "../../config/navConfig";
import AdminIconRail from "../../components/AdminDashboardComponents/AdminIconRail/AdminIconRail";
import AdminSubPanel from "../../components/AdminDashboardComponents/AdminSubPanel/AdminSubPanel";
import AdminTopBar from "../../components/AdminDashboardComponents/AdminTopBar/AdminTopBar";
import AdminStatusBar from "../../components/AdminDashboardComponents/AdminStatusBar/AdminStatusBar";

const AdminDashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeGroup = findActiveGroup(location.pathname);
  const currentItem = findActiveItem(location.pathname);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleQuickCreate = () => {
    // TODO: wire to a create modal / route
    console.log("Quick create triggered");
  };

  const handleSearchClick = () => {
    // TODO: open command palette
    console.log("Search opened");
  };

  return (
    <div className="min-h-screen bg-neutral-20 font-Manrope flex">
      {/* Icon rail */}
      <AdminIconRail
        activeGroupId={activeGroup?.id}
        onLogout={handleLogout}
      />

      {/* Contextual sub-panel — only when a group is active */}
      {activeGroup && (
        <AdminSubPanel
          group={activeGroup}
          currentPath={location.pathname}
          onQuickCreate={handleQuickCreate}
        />
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopBar
          groupLabel={activeGroup?.label}
          currentLabel={currentItem?.label}
          onSearchClick={handleSearchClick}
        />

        <main className="flex-1 px-6 pb-8">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>

        <AdminStatusBar />
      </div>
    </div>
  );
};

export default AdminDashboardLayout;