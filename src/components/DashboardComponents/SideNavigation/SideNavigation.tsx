import { Link, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiPackage,
  FiMapPin,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";

const SideNavigation = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const navLinks = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <FiGrid size={18} />,
    },
    {
      label: "My Orders",
      path: "/dashboard/my-orders",
      icon: <FiPackage size={18} />,
    },
    {
      label: "Address",
      path: "/dashboard/address",
      icon: <FiMapPin size={18} />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="w-80 h-fit bg-white rounded-2xl shadow-sm font-Manrope overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-neutral-20">
        <h2 className="text-lg font-semibold text-neutral-10">My Account</h2>
        <p className="text-xs text-neutral-45 mt-0.5">
          Manage your account settings
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="p-3">
        <ul className="space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <li key={link.label}>
                <Link
                  to={link.path}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                    transition-all duration-200 group
                    ${
                      isActive
                        ? "bg-primary-10 text-white shadow-md shadow-primary-10/20"
                        : "text-neutral-10 hover:bg-neutral-20 hover:text-primary-10"
                    }
                  `}
                >
                  <span
                    className={`
                      transition-colors duration-200
                      ${isActive ? "text-white" : "text-neutral-45 group-hover:text-primary-10"}
                    `}
                  >
                    {link.icon}
                  </span>
                  <span className="flex-1">{link.label}</span>
                  <FiChevronRight
                    size={16}
                    className={`
                      transition-all duration-200
                      ${
                        isActive
                          ? "text-white opacity-100"
                          : "text-neutral-45 opacity-0 group-hover:opacity-100 group-hover:text-primary-10"
                      }
                    `}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Section */}
      <div className="p-3 border-t border-neutral-20">
        <button
          onClick={handleLogout}
          className="
            flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium
            text-red-500 hover:bg-red-50 transition-all duration-200 group
          "
        >
          <FiLogOut
            size={18}
            className="text-red-500 group-hover:translate-x-0.5 transition-transform duration-200"
          />
          <span className="flex-1 text-left">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideNavigation;