import { Link } from "react-router-dom";
import { useState } from "react";
import { FiZap, FiLogOut, FiHelpCircle } from "react-icons/fi";
import { adminNavGroups } from "../../../config/navConfig";

interface AdminIconRailProps {
  activeGroupId?: string;
  onLogout?: () => void;
}

const AdminIconRail = ({ activeGroupId, onLogout }: AdminIconRailProps) => {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  return (
    <aside className="sticky top-0 h-screen w-18 shrink-0 bg-neutral-10 flex flex-col items-center py-4 z-40">
      {/* Brand mark */}
      <Link
        to="/admin/dashboard"
        className="size-11 rounded-2xl bg-primary-10 flex items-center justify-center mb-6 shrink-0 shadow-lg shadow-primary-10/20"
        aria-label="Admin home"
      >
        <FiZap className="text-white" size={20} />
      </Link>

      {/* Nav groups */}
      <nav className="flex-1 flex flex-col gap-1.5">
        {adminNavGroups.map((group) => {
          const isActive = activeGroupId === group.id;
          return (
            <div
              key={group.id}
              className="relative group"
              onMouseEnter={() => setHoveredNav(group.id)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <button
                className={`
                  relative size-11 rounded-2xl flex items-center justify-center
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-primary-10 text-white shadow-md shadow-primary-10/30"
                      : "text-white/40 hover:text-white hover:bg-white/5"
                  }
                `}
                aria-label={group.label}
              >
                {group.icon}

                {isActive && (
                  <span className="absolute -left-3 top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-primary-10" />
                )}
              </button>

              {/* Tooltip */}
              {!isActive && (
                <div
                  className={`
                    absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50
                    bg-neutral-10 text-white text-xs font-medium rounded-lg
                    px-3 py-1.5 whitespace-nowrap pointer-events-none
                    transition-all duration-200
                    ${
                      hoveredNav === group.id
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-1"
                    }
                  `}
                >
                  {group.label}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="flex flex-col gap-1.5 pt-4 border-t border-white/10">
        <button
          className="size-11 rounded-2xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
          aria-label="Help"
        >
          <FiHelpCircle size={20} />
        </button>
        <button
          onClick={onLogout}
          className="size-11 rounded-2xl flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
          aria-label="Logout"
        >
          <FiLogOut size={20} />
        </button>
      </div>
    </aside>
  );
};

export default AdminIconRail;