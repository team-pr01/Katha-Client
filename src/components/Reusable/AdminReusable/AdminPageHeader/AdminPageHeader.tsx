import type { ReactNode } from "react";

interface AdminPageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

const AdminPageHeader = ({
  eyebrow,
  title,
  description,
  actions,
}: AdminPageHeaderProps) => {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-45 font-semibold">
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-10 tracking-tight mt-1">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-neutral-45 mt-1">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
};

export default AdminPageHeader;
