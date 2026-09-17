import { orderStatusConfig } from "../../../../config/orderStatusConfig";
import type { TOrderStatus } from "../../../../types/orders.types";

interface OrderStatusBadgeProps {
  status: TOrderStatus;
}

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const cfg = orderStatusConfig[status];
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 
        text-[11px] font-medium px-2.5 py-1 rounded-full
        ${cfg.className}
      `}
    >
      <span className={`size-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

export default OrderStatusBadge;