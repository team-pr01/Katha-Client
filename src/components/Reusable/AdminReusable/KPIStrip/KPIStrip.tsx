import type { TKPIItem } from "../../../../types/kpi.types";
import KPICard from "./KPICard";

interface KPIStripProps {
  items: TKPIItem[];
}

const KPIStrip = ({ items }: KPIStripProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
      {items.map((kpi) => (
        <KPICard key={kpi.id} kpi={kpi} />
      ))}
    </div>
  );
};

export default KPIStrip;