import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiGrid, FiPackage, FiMapPin, FiLogOut, FiTruck } from "react-icons/fi";
import { ICONS, IMAGES } from "../../../assets";
import { FaAngleDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  setUser,
  useCurrentUser,
  type TLoggedInUser,
} from "../../../redux/Features/Auth/authSlice";
import Cookies from "js-cookie";

interface UserDropdownProps {
  userName?: string;
  userImage?: string;
}

const UserDropdown = ({
  userName = "Rahul S...",
  userImage = IMAGES.babyShower,
}: UserDropdownProps) => {
  const navigate = useNavigate();
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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
      label: "Track Order",
      path: "/dashboard/track-order",
      icon: <FiTruck size={18} />,
    },
    {
      label: "Address",
      path: "/dashboard/address",
      icon: <FiMapPin size={18} />,
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    dispatch(setUser({ user: null, token: null }));
    Cookies.remove("accessToken");
    Cookies.remove("role");
    dispatch(logout());
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          bg-neutral-20 rounded-3xl text-neutral-10 text-sm 
          flex items-center gap-2 p-2 pr-1.5
          hover:bg-neutral-50 transition-all duration-200
          ${isOpen ? "bg-neutral-50 ring-2 ring-primary-10/20" : ""}
        `}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="size-7 rounded-full flex items-center justify-center bg-neutral-45 overflow-hidden">
          <img
            src={userImage}
            alt={userName}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <span className="font-medium">
          {user?.name?.slice(0, 9).concat("...")}
        </span>
        <img
          src={ICONS.arrowRight}
          alt=""
          className={`
            w-6 transition-transform duration-300
            ${isOpen ? "rotate-269" : "rotate-90"}
          `}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`
          absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl 
          shadow-xl border border-neutral-20 overflow-hidden
          font-Manrope z-50
          transition-all duration-300 ease-out
          origin-top-right
          ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }
        `}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-20">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full flex items-center justify-center bg-neutral-45 overflow-hidden shrink-0">
              <img
                src={userImage}
                alt={userName}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-neutral-10 truncate">
                {user?.name}
              </h3>
              <p className="text-xs text-neutral-45 truncate">
                {user?.email || user?.phoneNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-2">
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-xl 
                      text-sm font-medium transition-all duration-200 group
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
                        ${
                          isActive
                            ? "text-white"
                            : "text-neutral-45 group-hover:text-primary-10"
                        }
                      `}
                    >
                      {link.icon}
                    </span>
                    <span className="flex-1">{link.label}</span>
                    <FaAngleDown
                      size={14}
                      className={`
                        transition-all duration-200
                        ${
                          isActive
                            ? "text-white opacity-100"
                            : "text-neutral-45 opacity-0 group-hover:opacity-100 group-hover:text-primary-10 group-hover:translate-x-0.5"
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
        <div className="p-2 border-t border-neutral-20">
          <button
            onClick={handleLogout}
            className="
              flex items-center gap-3 w-full px-3 py-2.5 rounded-xl 
              text-sm font-medium text-red-500 
              hover:bg-red-50 transition-all duration-200 group
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
    </div>
  );
};

export default UserDropdown;
