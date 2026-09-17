import {
  FiShoppingBag,
  FiDollarSign,
  FiClock,
  FiCheckCircle,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";
import type { TOrdersKPI } from "../../../../types/orders.types";


interface OrdersKPIStripProps {
  kpi: TOrdersKPI;
}

const OrdersKPIStrip = ({ kpi }: OrdersKPIStripProps) => {
  const cards = [
    {
      id: "orders",
      label: "Total Orders",
      value: kpi.totalOrders.toLocaleString("en-IN"),
      icon: <FiShoppingBag size={18} />,
      accent: "bg-blue-50 text-blue-600",
      sub: null,
    },
    {
      id: "revenue",
      label: "Total Revenue",
      value: `₹${(kpi.totalRevenue / 1000).toFixed(1)}K`,
      icon: <FiDollarSign size={18} />,
      accent: "bg-primary-10/10 text-primary-10",
      sub: {
        value: kpi.revenueChange,
        label: "vs last month",
      },
    },
    {
      id: "aov",
      label: "Avg Order Value",
      value: `₹${kpi.avgOrderValue.toLocaleString("en-IN")}`,
      icon: <FiTrendingUp size={18} />,
      accent: "bg-green-50 text-green-600",
      sub: null,
    },
    {
      id: "pending",
      label: "Pending",
      value: kpi.pendingOrders.toLocaleString("en-IN"),
      icon: <FiClock size={18} />,
      accent: "bg-amber-50 text-amber-600",
      sub: null,
    },
    {
      id: "delivered",
      label: "Delivered (This Month)",
      value: kpi.deliveredThisMonth.toLocaleString("en-IN"),
      icon: <FiCheckCircle size={18} />,
      accent: "bg-neutral-20 text-neutral-10",
      sub: null,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-2xl border border-neutral-20 p-4"
        >
          <div className={`size-9 rounded-xl flex items-center justify-center mb-3 ${card.accent}`}>
            {card.icon}
          </div>
          <p className="text-[11px] text-neutral-45">{card.label}</p>
          <p className="text-lg font-bold text-neutral-10 tracking-tight mt-0.5">
            {card.value}
          </p>
          {card.sub && (
            <div className="flex items-center gap-1 mt-1.5">
              <span
                className={`flex items-center gap-0.5 text-[10px] font-semibold ${
                  card.sub.value >= 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {card.sub.value >= 0 ? (
                  <FiTrendingUp size={10} />
                ) : (
                  <FiTrendingDown size={10} />
                )}
                {card.sub.value >= 0 ? "+" : ""}
                {card.sub.value}%
              </span>
              <span className="text-[10px] text-neutral-45">
                {card.sub.label}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrdersKPIStrip;