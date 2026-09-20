import { Link } from "react-router-dom";
import { FiChevronRight, FiPlus } from "react-icons/fi";
import type { TAdminNavGroup } from "../../../config/navConfig";

interface AdminSubPanelProps {
  group: TAdminNavGroup;
  currentPath: string;
  onQuickCreate?: () => void;
}

const AdminSubPanel = ({
  group,
  currentPath,
  onQuickCreate,
}: AdminSubPanelProps) => {
  const currentItem = group.items.find((i) =>
    currentPath.startsWith(i.path),
  );

  return (
    <aside className="sticky top-0 h-screen w-60 shrink-0 bg-white border-r border-neutral-20 flex flex-col z-30">
      {/* Panel header */}
      <div className="px-5 pt-6 pb-4">
        <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-45 font-semibold">
          {group.label}
        </p>
        <h2 className="text-lg font-bold text-neutral-10 mt-1.5 tracking-tight">
          {currentItem?.label || group.label}
        </h2>
      </div>

      {/* Sub-navigation */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {group.items.map((item) => {
          const active = currentPath === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-200 group
                ${
                  active
                    ? "bg-primary-10/10 text-primary-10"
                    : "text-neutral-45 hover:text-neutral-10 hover:bg-neutral-20"
                }
              `}
            >
              <span
                className={`
                  size-1.5 rounded-full transition-all duration-300
                  ${active ? "bg-primary-10 scale-100" : "bg-transparent scale-0"}
                `}
              />
              <span className="flex-1">{item.label}</span>
              {active && (
                <FiChevronRight size={14} className="text-primary-10" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Quick action */}
      <div className="p-3 border-t border-neutral-20">
        <button
          onClick={onQuickCreate}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-10 hover:bg-neutral-20 transition-all"
        >
          <div className="size-6 rounded-lg bg-primary-10 flex items-center justify-center">
            <FiPlus className="text-white" size={12} />
          </div>
          Quick Create
        </button>
      </div>
    </aside>
  );
};

export default AdminSubPanel;