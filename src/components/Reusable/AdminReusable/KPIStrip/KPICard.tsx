import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import type { TKPIItem } from "../../../../types/kpi.types";

interface KPICardProps {
  kpi: TKPIItem;
}

const KPICard = ({ kpi }: KPICardProps) => {
  return (
    <div className="bg-white rounded-2xl border border-neutral-20 p-4">
      <div
        className={`size-9 rounded-xl flex items-center justify-center mb-3 ${kpi.accent}`}
      >
        {kpi.icon}
      </div>
      <p className="text-[11px] text-neutral-45">{kpi.label}</p>
      <p className="text-lg font-bold text-neutral-10 tracking-tight mt-0.5">
        {kpi.value}
      </p>
      {kpi.trend && (
        <div className="flex items-center gap-1 mt-1.5">
          <span
            className={`flex items-center gap-0.5 text-[10px] font-semibold ${
              kpi.trend.value >= 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {kpi.trend.value >= 0 ? (
              <FiTrendingUp size={10} />
            ) : (
              <FiTrendingDown size={10} />
            )}
            {kpi.trend.value >= 0 ? "+" : ""}
            {kpi.trend.value}%
          </span>
          <span className="text-[10px] text-neutral-45">{kpi.trend.label}</span>
        </div>
      )}
    </div>
  );
};

export default KPICard;