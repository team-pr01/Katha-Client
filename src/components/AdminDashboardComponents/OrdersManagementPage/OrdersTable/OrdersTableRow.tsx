import { Link } from "react-router-dom";
import { FiEye, FiMoreVertical } from "react-icons/fi";
import type { TOrder } from "../../../../types/orders.types";
import OrderStatusBadge from "../OrderStatusBadge/OrderStatusBadge";

interface OrdersTableRowProps {
  order: TOrder;
  isSelected: boolean;
  onSelectToggle: (id: string) => void;
  onQuickAction: (id: string, action: "view" | "status") => void;
}

const OrdersTableRow = ({
  order,
  isSelected,
  onSelectToggle,
  onQuickAction,
}: OrdersTableRowProps) => {
  const createdDate = new Date(order.createdAt);
  const formattedDate = createdDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <tr
      className={`
        group border-b border-neutral-20 last:border-0
        transition-colors duration-150
        ${isSelected ? "bg-primary-10/5" : "hover:bg-neutral-20/40"}
      `}
    >
      {/* Checkbox */}
      <td className="px-4 py-3 w-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelectToggle(order._id)}
          className="
            size-4 rounded border-neutral-45 cursor-pointer
            text-primary-10 focus:ring-primary-10 focus:ring-offset-0
          "
        />
      </td>

      {/* Order ID */}
      <td className="px-4 py-3">
        <Link
          to={`/admin/orders/${order.orderId}`}
          className="text-sm font-semibold text-neutral-10 hover:text-primary-10 transition-colors"
        >
          #{order.orderId}
        </Link>
        <p className="text-[11px] text-neutral-45 mt-0.5">{formattedDate}</p>
      </td>

      {/* Customer */}
      <td className="px-4 py-3">
        <p className="text-sm font-medium text-neutral-10 truncate max-w-[180px]">
          {order.customer.name}
        </p>
        <p className="text-[11px] text-neutral-45 truncate max-w-[180px]">
          {order.customer.email}
        </p>
      </td>

      {/* Items */}
      <td className="px-4 py-3">
        <p className="text-sm text-neutral-10">
          {order.totalItems} item{order.totalItems > 1 ? "s" : ""}
        </p>
        <p className="text-[11px] text-neutral-45 truncate max-w-[140px]">
          {order.items[0]?.name}
          {order.totalItems > 1 ? ` +${order.totalItems - 1}` : ""}
        </p>
      </td>

      {/* City */}
      <td className="px-4 py-3 hidden xl:table-cell">
        <p className="text-xs text-neutral-10">{order.shippingCity}</p>
        <p className="text-[11px] text-neutral-45">{order.shippingState}</p>
      </td>

      {/* Payment */}
      <td className="px-4 py-3 hidden lg:table-cell">
        <p className="text-xs font-medium text-neutral-10">
          {order.paymentMethod}
        </p>
        <p
          className={`
            text-[11px] capitalize mt-0.5
            ${order.paymentStatus === "paid" ? "text-green-600" : "text-amber-600"}
          `}
        >
          {order.paymentStatus}
        </p>
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <OrderStatusBadge status={order.orderStatus} />
      </td>

      {/* Total */}
      <td className="px-4 py-3 text-right">
        <p className="text-sm font-bold text-neutral-10">
          ₹{order.totalAmount.toLocaleString("en-IN")}
        </p>
      </td>

      {/* Actions */}
      <td className="px-4 py-3 w-20">
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onQuickAction(order._id, "view")}
            className="p-2 rounded-lg text-neutral-45 hover:text-primary-10 hover:bg-primary-10/10 transition-colors"
            aria-label="View order"
          >
            <FiEye size={14} />
          </button>
          <button
            onClick={() => onQuickAction(order._id, "status")}
            className="p-2 rounded-lg text-neutral-45 hover:text-primary-10 hover:bg-primary-10/10 transition-colors"
            aria-label="More actions"
          >
            <FiMoreVertical size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default OrdersTableRow;