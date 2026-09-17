import { FiActivity } from "react-icons/fi";

const AdminStatusBar = () => {
  return (
    <footer className="px-6 pb-4">
      <div className="flex items-center justify-between text-[11px] text-neutral-45">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-green-500" />
            Live
          </span>
          <span className="hidden md:flex items-center gap-1.5">
            <FiActivity size={10} />
            All services operational
          </span>
        </div>
        <span>
          {new Date().toLocaleDateString("en-IN", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </footer>
  );
};

export default AdminStatusBar;