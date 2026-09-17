import { FiChevronRight, FiSearch, FiBell, FiCommand } from "react-icons/fi";

interface AdminTopBarProps {
  groupLabel?: string;
  currentLabel?: string;
  onSearchClick?: () => void;
  onBellClick?: () => void;
}

const AdminTopBar = ({
  groupLabel = "Admin",
  currentLabel = "Dashboard",
  onSearchClick,
  onBellClick,
}: AdminTopBarProps) => {
  return (
    <header className="sticky top-0 z-20 px-6 pt-4 pb-2 bg-neutral-20/80 backdrop-blur-md">
      <div className="flex items-center gap-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-45">
          <span className="text-neutral-10 font-medium">{groupLabel}</span>
          <FiChevronRight size={12} />
          <span className="text-neutral-10 font-semibold">{currentLabel}</span>
        </div>

        <div className="flex-1" />

        {/* Search */}
        <button
          onClick={onSearchClick}
          className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-neutral-20 text-sm text-neutral-45 hover:border-primary-10/40 transition-all"
        >
          <FiSearch size={14} />
          <span className="text-xs">Search…</span>
          <kbd className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded bg-neutral-20 text-neutral-45 ml-2">
            <FiCommand size={10} />K
          </kbd>
        </button>

        {/* Notifications */}
        <button
          onClick={onBellClick}
          className="relative p-2.5 rounded-xl bg-white border border-neutral-20 text-neutral-45 hover:border-primary-10/40 hover:text-primary-10 transition-all"
        >
          <FiBell size={16} />
          <span className="absolute top-2 right-2 size-1.5 rounded-full bg-primary-10" />
        </button>

        {/* Avatar */}
        <button className="flex items-center gap-2 p-1 pr-3 rounded-xl bg-white border border-neutral-20 hover:border-primary-10/40 transition-all">
          <div className="size-8 rounded-lg bg-linear-to-br from-primary-10 to-[#d4892a] flex items-center justify-center text-white font-semibold text-xs">
            A
          </div>
          <span className="text-xs font-medium text-neutral-10 hidden sm:inline">
            Admin
          </span>
        </button>
      </div>
    </header>
  );
};

export default AdminTopBar;