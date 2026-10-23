/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FiPlus, FiEye, FiPackage, FiTruck, FiXCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import type {
  TOrder,
  TOrdersKPI,
  TOrderStatus,
} from "../../../types/orders.types";
import OrderStatusBadge from "../../../components/AdminDashboardComponents/OrdersManagementPage/OrderStatusBadge/OrderStatusBadge";
import OrderDetailsModal from "../../../components/AdminDashboardComponents/OrdersManagementPage/OrderDetailsModal/OrderDetailsModal";
import AdminPageHeader from "../../../components/Reusable/AdminReusable/AdminPageHeader/AdminPageHeader";
import KPIStrip from "../../../components/Reusable/AdminReusable/KPIStrip/KPIStrip";
import DataFilters from "../../../components/Reusable/DataFilters/DataFilters";
import { orderStatusOptions } from "../../../config/orderStatusConfig";
import BulkActionBar from "../../../components/Reusable/AdminReusable/BulkActionBar/BulkActionBar";
import DataTableEmpty from "../../../components/Reusable/DataTable/DataTableEmpty";
import DataTable from "../../../components/Reusable/DataTable/DataTable";
import DataTablePagination from "../../../components/Reusable/DataTable/DataTablePagination";
import type { TKPIItem } from "../../../types/kpi.types";
import type { TDataTableColumn } from "../../../types/dataTable.types";
import { useGetAllOrdersForAdminQuery } from "../../../redux/Features/Order/orderApi";
import { formatDateTime } from "../../../utils/formatDate";

// const dateRangeOptions = [
//   { value: "all", label: "All Time" },
//   { value: "today", label: "Today" },
//   { value: "week", label: "This Week" },
//   { value: "month", label: "This Month" },
// ];

const paymentStatusOptions = [
  { value: "all", label: "All Payments" },
  { value: "pending", label: "Pending" },
  { value: "paid", label: "Paid" },
  { value: "failed", label: "Failed" },
  { value: "refunded", label: "Refunded" },
];

const OrdersManagement = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const skip = (page - 1) * limit;

  const [status, setStatus] = useState<TOrderStatus | "all">("all");
  const [paymentStatus, setPaymentStatus] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Details modal
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Pass paymentStatus to the query
  const { data } = useGetAllOrdersForAdminQuery({
    keyword: search,
    orderStatus: status,
    paymentStatus: paymentStatus, // Make sure your backend/API supports this param
    skip,
    limit,
  });

  const orders: TOrder[] = data?.data?.data || [];
  const meta = data?.data?.meta || {};

  const openDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsDetailsModalOpen(true);
  };

  // ─── KPI ─────────────────────────────────────────────
  const kpi: TOrdersKPI = {
    totalOrders: 1248,
    totalRevenue: 482300,
    avgOrderValue: 386,
    pendingOrders: 24,
    deliveredThisMonth: 189,
    revenueChange: 12.4,
  };

  const kpiItems: TKPIItem[] = [
    {
      id: "orders",
      label: "Total Orders",
      value: kpi.totalOrders.toLocaleString("en-IN"),
      icon: <FiPackage size={18} />,
      accent: "bg-blue-50 text-blue-600",
    },
    {
      id: "revenue",
      label: "Total Revenue",
      value: `₹${(kpi.totalRevenue / 1000).toFixed(1)}K`,
      icon: <FiPackage size={18} />,
      accent: "bg-primary-10/10 text-primary-10",
      trend: { value: kpi.revenueChange, label: "vs last month" },
    },
    {
      id: "aov",
      label: "Avg Order Value",
      value: `₹${kpi.avgOrderValue.toLocaleString("en-IN")}`,
      icon: <FiPackage size={18} />,
      accent: "bg-green-50 text-green-600",
    },
    {
      id: "pending",
      label: "Pending",
      value: kpi.pendingOrders.toString(),
      icon: <FiPackage size={18} />,
      accent: "bg-amber-50 text-amber-600",
    },
    {
      id: "delivered",
      label: "Delivered",
      value: kpi.deliveredThisMonth.toString(),
      icon: <FiPackage size={18} />,
      accent: "bg-neutral-20 text-neutral-10",
    },
  ];

  // ─── Columns ─────────────────────────────────────────
  const columns: TDataTableColumn<TOrder>[] = [
    {
      key: "order",
      header: "Order",
      render: (order: any) => (
        <div>
          <button
            onClick={() => openDetails(order?._id)}
            className="text-sm font-semibold text-neutral-10 hover:text-primary-10 transition-colors"
          >
            #{order.orderId}
          </button>
          <p className="text-[11px] text-neutral-45 mt-0.5">
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      render: (order: any) => {
        const addr = order.shippingAddress || {};
        return (
          <div>
            <p className="text-sm font-medium text-neutral-10 truncate max-w-45">
              {addr.firstName} {addr.lastName}
            </p>
            <p className="text-[11px] text-neutral-45 truncate max-w-45">
              {addr.email || "—"}
            </p>
          </div>
        );
      },
    },
    {
      key: "items",
      header: "Items",
      render: (order: any) => (
        <div>
          <p className="text-sm text-neutral-10">
            {order.orderedItems?.length || 0} item
            {(order.orderedItems?.length || 0) > 1 ? "s" : ""}
          </p>
          <p className="text-[11px] text-neutral-45 truncate max-w-35">
            {order.orderedItems?.[0]?.productId?.name || "—"}
            {(order.orderedItems?.length || 0) > 1
              ? ` +${order.orderedItems.length - 1}`
              : ""}
          </p>
        </div>
      ),
    },
    {
      key: "city",
      header: "Ship To",
      hiddenAt: "xl",
      render: (order: any) => (
        <div>
          <p className="text-xs text-neutral-10">
            {order.shippingAddress?.city || "—"}
          </p>
          <p className="text-[11px] text-neutral-45">
            {order.shippingAddress?.state || "—"}
          </p>
        </div>
      ),
    },
    {
      key: "payment",
      header: "Payment",
      hiddenAt: "lg",
      render: (order: any) => (
        <div>
          <p className="text-xs font-medium text-neutral-10">
            {order.paymentMethod}
          </p>
          <p
            className={`text-[11px] capitalize mt-0.5 ${
              order.paymentStatus === "paid"
                ? "text-green-600"
                : order.paymentStatus === "failed" ||
                    order.paymentStatus === "refunded"
                  ? "text-red-500"
                  : "text-amber-600"
            }`}
          >
            {order.paymentStatus}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (order: any) => <OrderStatusBadge status={order.orderStatus} />,
    },
    {
      key: "createdAt",
      header: "Placed On",
      render: (order: any) => (
        <p className="text-xs text-neutral-10">
          {formatDateTime(order.createdAt)}
        </p>
      ),
    },
    {
      key: "total",
      header: "Total",
      align: "right",
      render: (order: any) => (
        <span className="text-sm font-bold text-neutral-10">
          ₹{order.totalAmount.toLocaleString("en-IN")}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      align: "right",
      widthClass: "w-12",
      render: (order: any) => (
        <button
          onClick={() => openDetails(order._id)}
          className="p-1.5 rounded-lg text-neutral-45 hover:text-primary-10 hover:bg-primary-10/10 transition-all"
          title="View details"
          aria-label="View details"
        >
          <FiEye size={15} />
        </button>
      ),
    },
  ];

  // ─── Handlers ────────────────────────────────────────
  const handleClearFilters = () => {
    setSearch("");
    setStatus("all");
    setPaymentStatus("all");
    setDateRange("all");
    setPage(1);
  };

  const hasActiveFilters =
    search.trim() !== "" ||
    status !== "all" ||
    paymentStatus !== "all" ||
    dateRange !== "all";

  return (
    <div className="space-y-5 font-Manrope">
      <AdminPageHeader
        eyebrow="Commerce"
        title="Orders Management"
        description="View, filter, and manage all customer orders."
        actions={
          <Link
            to="/admin/orders/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-10 text-white text-sm font-medium hover:bg-[#d4892a] transition-all shadow-md shadow-primary-10/20"
          >
            <FiPlus size={16} />
            Add Order
          </Link>
        }
      />

      <KPIStrip items={kpiItems} />

      <DataFilters
        search={{
          value: search,
          onChange: (v) => {
            setSearch(v);
            setPage(1);
          },
          placeholder: "Search by order ID, customer, email, phone…",
        }}
        selects={[
          {
            id: "status",
            value: status,
            onChange: (v) => {
              setStatus(v as TOrderStatus | "all");
              setPage(1);
            },
            options: orderStatusOptions,
          },
          {
            id: "paymentStatus",
            value: paymentStatus,
            onChange: (v) => {
              setPaymentStatus(v);
              setPage(1);
            },
            options: paymentStatusOptions,
          },
          // {
          //   id: "range",
          //   value: dateRange,
          //   onChange: (v) => {
          //     setDateRange(v);
          //     setPage(1);
          //   },
          //   options: dateRangeOptions,
          // },
        ]}
        hasActiveFilters={hasActiveFilters}
        onClear={handleClearFilters}
      />

      <BulkActionBar
        selectedCount={selectedIds.length}
        onClearSelection={() => setSelectedIds([])}
        actions={[
          {
            id: "ship",
            label: "Mark as Shipped",
            onClick: () => console.log("Bulk ship"),
            icon: <FiTruck size={12} />,
          },
          {
            id: "view",
            label: "Print Labels",
            onClick: () => console.log("Print"),
            icon: <FiEye size={12} />,
          },
          {
            id: "cancel",
            label: "Cancel Orders",
            onClick: () => console.log("Bulk cancel"),
            variant: "danger",
            icon: <FiXCircle size={12} />,
          },
        ]}
      />

      {orders?.length === 0 ? (
        <DataTableEmpty
          icon={<FiPackage size={32} />}
          title="No orders found"
          description={
            hasActiveFilters
              ? "No orders match your current filters. Try adjusting them."
              : "You haven't received any orders yet."
          }
          variant={hasActiveFilters ? "no-match" : "no-data"}
          actionLabel="Clear filters"
          onAction={handleClearFilters}
        />
      ) : (
        <>
          <DataTable
            rows={orders}
            columns={columns}
            rowKey={(o: any) => o._id}
            selectable
            selectedIds={selectedIds}
            onSelectToggle={(id) =>
              setSelectedIds((prev) =>
                prev.includes(id)
                  ? prev.filter((i) => i !== id)
                  : [...prev, id],
              )
            }
            onSelectAll={(checked) =>
              setSelectedIds(checked ? orders?.map((o: any) => o._id) : [])
            }
          />

          <DataTablePagination
            currentPage={page}
            totalPages={meta?.pages ?? 1}
            totalItems={meta?.total ?? orders?.length ?? 0}
            itemsPerPage={limit}
            onPageChange={setPage}
            limit={limit}
            setLimit={setLimit}
          />
        </>
      )}

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedOrderId(null);
        }}
        orderId={selectedOrderId as string}
      />
    </div>
  );
};

export default OrdersManagement;
