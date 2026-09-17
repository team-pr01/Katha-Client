import type { TOrder } from "../../../../types/orders.types";
import OrdersTableRow from "./OrdersTableRow";

interface OrdersTableProps {
  orders: TOrder[];
  selectedIds: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectToggle: (id: string) => void;
  onQuickAction: (id: string, action: "view" | "status") => void;
}

const OrdersTable = ({
  orders,
  selectedIds,
  onSelectAll,
  onSelectToggle,
  onQuickAction,
}: OrdersTableProps) => {
  const allSelected = orders.length > 0 && selectedIds.length === orders.length;
  const someSelected = selectedIds.length > 0 && !allSelected;

  return (
    <div className="bg-white rounded-2xl border border-neutral-20 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-neutral-20/50 border-b border-neutral-20">
            <tr className="text-left text-[11px] uppercase tracking-wider text-neutral-45 font-semibold">
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="
                    size-4 rounded border-neutral-45 cursor-pointer
                    text-primary-10 focus:ring-primary-10 focus:ring-offset-0
                  "
                />
              </th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3 hidden xl:table-cell">Ship To</th>
              <th className="px-4 py-3 hidden lg:table-cell">Payment</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3 w-20 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrdersTableRow
                key={order._id}
                order={order}
                isSelected={selectedIds.includes(order._id)}
                onSelectToggle={onSelectToggle}
                onQuickAction={onQuickAction}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;