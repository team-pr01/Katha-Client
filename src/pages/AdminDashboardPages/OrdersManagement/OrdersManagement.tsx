/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  FiPlus,
  FiEye,
  FiPackage,
  FiTruck,
  FiXCircle,
  FiTrendingUp,
  FiDollarSign,
  FiCalendar,
  FiCreditCard,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import type { TOrder, TOrderStatus } from "../../../types/orders.types";
import OrderStatusBadge from "../../../components/AdminDashboardComponents/OrdersManagementPage/OrderStatusBadge/OrderStatusBadge";
import OrderDetailsModal from "../../../components/AdminDashboardComponents/OrdersManagementPage/OrderDetailsModal/OrderDetailsModal";
import AdminPageHeader from "../../../components/Reusable/AdminReusable/AdminPageHeader/AdminPageHeader";
import DataFilters from "../../../components/Reusable/DataFilters/DataFilters";
import { orderStatusOptions } from "../../../config/orderStatusConfig";
import BulkActionBar from "../../../components/Reusable/AdminReusable/BulkActionBar/BulkActionBar";
import DataTableEmpty from "../../../components/Reusable/DataTable/DataTableEmpty";
import DataTable from "../../../components/Reusable/DataTable/DataTable";
import DataTablePagination from "../../../components/Reusable/DataTable/DataTablePagination";
import type { TDataTableColumn } from "../../../types/dataTable.types";
import {
  useGetAllOrdersForAdminQuery,
  useGetOrderStatsQuery,
} from "../../../redux/Features/Order/orderApi";
import { formatDateTime } from "../../../utils/formatDate";

const paymentStatusOptions = [
  { value: "all", label: "All Payments" },
  { value: "pending", label: "Pending" },
  { value: "paid", label: "Paid" },
  { value: "failed", label: "Failed" },
  { value: "refunded", label: "Refunded" },
];

const monthOptions = [
  { value: "1", label: "Jan" },
  { value: "2", label: "Feb" },
  { value: "3", label: "Mar" },
  { value: "4", label: "Apr" },
  { value: "5", label: "May" },
  { value: "6", label: "Jun" },
  { value: "7", label: "Jul" },
  { value: "8", label: "Aug" },
  { value: "9", label: "Sep" },
  { value: "10", label: "Oct" },
  { value: "11", label: "Nov" },
  { value: "12", label: "Dec" },
];

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 5 }, (_, i) => {
  const year = currentYear - i;
  return { value: year.toString(), label: year.toString() };
});

const OrdersManagement = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const skip = (page - 1) * limit;

  const [status, setStatus] = useState<TOrderStatus | "all">("all");
  const [paymentStatus, setPaymentStatus] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Stats View Toggle: "overall" or "monthly"
  const [statsView, setStatsView] = useState<"overall" | "monthly">("overall");
  const [filterMonth, setFilterMonth] = useState<string>(
    (new Date().getMonth() + 1).toString(),
  );
  const [filterYear, setFilterYear] = useState<string>(
    new Date().getFullYear().toString(),
  );

  // Details modal
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Table API
  const { data, isLoading: isTableLoading } = useGetAllOrdersForAdminQuery({
    keyword: search,
    orderStatus: status,
    paymentStatus: paymentStatus,
    skip,
    limit,
  });

  // Stats API
  const { data: orderStatsData } = useGetOrderStatsQuery({
    month: filterMonth,
    year: filterYear,
  });

  const orders: TOrder[] = data?.data?.data || [];
  const meta = data?.data?.meta || {};

  const stats = orderStatsData?.data || {};
  const overall = stats?.overall || {};
  const monthly = stats?.monthly || {};
  const timeBased = stats?.timeBased || {};
  const revenueComparison = stats?.revenueComparison || [];

  // Determine which data to show based on the toggle
  const activeData = statsView === "overall" ? overall : monthly;
  const activeLabel =
    statsView === "overall" ? "All Time" : monthly?.selectedMonth;

  const openDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsDetailsModalOpen(true);
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatus("all");
    setPaymentStatus("all");
    setPage(1);
  };

  const hasActiveFilters =
    search.trim() !== "" || status !== "all" || paymentStatus !== "all";
  const maxRevenue = Math.max(
    ...revenueComparison.map((r: any) => r.revenue),
    1,
  );

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
        >
          <FiEye size={15} />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6 font-Manrope pb-10">
      <AdminPageHeader
        eyebrow="Commerce"
        title="Orders Management"
        description="View, filter, and manage all customer orders."
        actions={
          <div className="flex flex-wrap items-center gap-3">
            {/* TOGGLE FOR OVERALL / MONTHLY */}
            <div className="flex items-center bg-neutral-20/80 p-1 rounded-xl">
              <button
                onClick={() => setStatsView("overall")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  statsView === "overall"
                    ? "bg-white text-neutral-10 shadow-sm"
                    : "text-neutral-45 hover:text-neutral-10"
                }`}
              >
                Overall
              </button>
              <button
                onClick={() => setStatsView("monthly")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  statsView === "monthly"
                    ? "bg-white text-neutral-10 shadow-sm"
                    : "text-neutral-45 hover:text-neutral-10"
                }`}
              >
                Monthly
              </button>
            </div>

            {/* STATS FILTER (Month/Year) - Disabled if Overall */}
            <div
              className={`flex items-center gap-2 bg-white border border-neutral-20 rounded-xl p-1 shadow-sm transition-opacity ${
                statsView === "overall" ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <span className="text-xs font-semibold text-neutral-45 px-2 flex items-center gap-1.5">
                <FiCalendar size={14} /> Stats:
              </span>
              <select
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                disabled={statsView === "overall"}
                className="px-2 py-1.5 rounded-lg bg-neutral-20/60 text-xs font-medium text-neutral-10 focus:outline-none hover:bg-neutral-20 transition-colors cursor-pointer"
              >
                {monthOptions.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                disabled={statsView === "overall"}
                className="px-2 py-1.5 rounded-lg bg-neutral-20/60 text-xs font-medium text-neutral-10 focus:outline-none hover:bg-neutral-20 transition-colors cursor-pointer"
              >
                {yearOptions.map((y) => (
                  <option key={y.value} value={y.value}>
                    {y.label}
                  </option>
                ))}
              </select>
            </div>

            <Link
              to="/admin/dashboard/order/add"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-10 text-white text-sm font-medium hover:bg-[#d4892a] transition-all shadow-md shadow-primary-10/20"
            >
              <FiPlus size={16} />
              Add Order
            </Link>
          </div>
        }
      />

      {/* ═══════════════ DASHBOARD STATS ═══════════════ */}
      <div className="space-y-4">
        {/* Top Hero Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Revenue Card */}
          <div className="bg-white border border-neutral-20 rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-10/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="size-8 rounded-lg bg-primary-10/10 flex items-center justify-center text-primary-10">
                    <FiDollarSign size={16} />
                  </div>
                  <span className="text-sm font-semibold text-neutral-10">
                    Total Revenue
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-neutral-10">
                  ₹{(activeData?.totalRevenue || 0).toLocaleString("en-IN")}
                </h2>
              </div>
              <span className="text-xs font-semibold bg-primary-10 text-white px-2.5 py-1 rounded-full shadow-sm">
                {activeLabel || "..."}
              </span>
            </div>

            {/* Time based stats shown only when Overall is selected (or always, up to you, keeping it here for context) */}
            <div className="mt-6 pt-4 border-t border-neutral-20 grid grid-cols-3 gap-2 relative z-10">
              <div>
                <p className="text-[10px] text-neutral-45 uppercase tracking-wider mb-1">
                  Today
                </p>
                <p className="text-sm font-bold text-neutral-10">
                  ₹{timeBased?.today?.revenue?.toLocaleString("en-IN") || 0}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-neutral-45 uppercase tracking-wider mb-1">
                  This Week
                </p>
                <p className="text-sm font-bold text-neutral-10">
                  ₹{timeBased?.thisWeek?.revenue?.toLocaleString("en-IN") || 0}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-neutral-45 uppercase tracking-wider mb-1">
                  Last Month
                </p>
                <p className="text-sm font-bold text-neutral-10">
                  ₹{timeBased?.lastMonth?.revenue?.toLocaleString("en-IN") || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Orders Card */}
          <div className="bg-white border border-neutral-20 rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="size-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <FiPackage size={16} />
                  </div>
                  <span className="text-sm font-semibold text-neutral-10">
                    Total Orders
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-neutral-10">
                  {(activeData?.totalOrders || 0).toLocaleString("en-IN")}
                </h2>
              </div>
              <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                {activeLabel || "..."}
              </span>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-20 grid grid-cols-3 gap-2 relative z-10">
              <div>
                <p className="text-[10px] text-neutral-45 uppercase tracking-wider mb-1">
                  Today
                </p>
                <p className="text-sm font-bold text-neutral-10">
                  {timeBased?.today?.orders || 0}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-neutral-45 uppercase tracking-wider mb-1">
                  This Week
                </p>
                <p className="text-sm font-bold text-neutral-10">
                  {timeBased?.thisWeek?.orders || 0}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-neutral-45 uppercase tracking-wider mb-1">
                  Last Month
                </p>
                <p className="text-sm font-bold text-neutral-10">
                  {timeBased?.lastMonth?.orders || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Counts Row */}
        <div className="bg-white border border-neutral-20 rounded-2xl p-4 shadow-sm">
          <h3 className="text-xs font-bold text-neutral-10 uppercase tracking-wider mb-3 flex items-center gap-2">
            Order Status Breakdown{" "}
            <span className="text-primary-10">({activeLabel})</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              {
                label: "Pending",
                count: activeData?.statusCounts?.pending || 0,
                dot: "bg-amber-500",
              },
              {
                label: "Confirmed",
                count: activeData?.statusCounts?.confirmed || 0,
                dot: "bg-indigo-500",
              },
              {
                label: "Processing",
                count: activeData?.statusCounts?.processing || 0,
                dot: "bg-blue-500",
              },
              {
                label: "Shipped",
                count: activeData?.statusCounts?.shipped || 0,
                dot: "bg-purple-500",
              },
              {
                label: "Delivered",
                count: activeData?.statusCounts?.delivered || 0,
                dot: "bg-green-500",
              },
              {
                label: "Cancelled",
                count: activeData?.statusCounts?.cancelled || 0,
                dot: "bg-red-500",
              },
              {
                label: "Returned",
                count: activeData?.statusCounts?.returned || 0,
                dot: "bg-orange-500",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-neutral-20/40 border border-neutral-20/50"
              >
                <span className={`size-2.5 rounded-full ${s.dot} shrink-0`} />
                <div>
                  <p className="text-[10px] text-neutral-45 font-medium truncate">
                    {s.label}
                  </p>
                  <p className="text-sm font-bold text-neutral-10">{s.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════ CHARTS SECTION ═══════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-20 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-sm font-bold text-neutral-10 flex items-center gap-2">
                <FiTrendingUp className="text-primary-10" />
                Revenue Comparison
              </h3>
              <p className="text-xs text-neutral-45 mt-0.5">
                Performance over the last 12 months
              </p>
            </div>
          </div>

          <div className="relative h-64 flex items-end justify-between gap-2">
            {revenueComparison.map((item: any, i: number) => {
              const heightPercent = Math.max(
                (item.revenue / maxRevenue) * 100,
                5,
              );
              const isSelectedMonth = item.month === monthly?.selectedMonth;

              return (
                <div
                  key={i}
                  className="flex flex-col items-center flex-1 group relative z-10 h-full justify-end"
                >
                  {/* Amount Label */}
                  <span
                    className={`text-[10px] font-bold mb-1.5 ${isSelectedMonth ? "text-primary-10" : "text-neutral-45"}`}
                  >
                    ₹{item.revenue}
                  </span>

                  {/* Bar */}
                  <div
                    className={`w-full max-w-[36px] rounded-t-md transition-all duration-300 ${
                      isSelectedMonth
                        ? "bg-gradient-to-t from-primary-10 to-[#f0b86e] shadow-[0_0_12px_rgba(235,158,58,0.3)]"
                        : "bg-neutral-20 group-hover:bg-primary-10/40"
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />

                  {/* Month Label */}
                  <span
                    className={`text-[10px] mt-2 font-semibold ${isSelectedMonth ? "text-primary-10" : "text-neutral-45"}`}
                  >
                    {item.month.split(" ")[0]}
                  </span>
                </div>
              );
            })}
            {revenueComparison.length === 0 && (
              <p className="text-sm text-neutral-45 w-full text-center pb-10">
                No revenue data.
              </p>
            )}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl border border-neutral-20 p-5 shadow-sm flex flex-col">
          <h3 className="text-sm font-bold text-neutral-10 mb-4 flex items-center gap-2">
            <FiCreditCard className="text-primary-10" />
            Payment Methods ({activeLabel})
          </h3>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-neutral-20/50 p-3 rounded-xl border border-neutral-20">
              <p className="text-[11px] text-neutral-45 font-medium mb-1">
                Paid
              </p>
              <p className="text-xl font-bold text-green-600">
                {activeData?.paymentCounts?.paid || 0}
              </p>
            </div>
            <div className="bg-neutral-20/50 p-3 rounded-xl border border-neutral-20">
              <p className="text-[11px] text-neutral-45 font-medium mb-1">
                Pending
              </p>
              <p className="text-xl font-bold text-amber-600">
                {activeData?.paymentCounts?.pending || 0}
              </p>
            </div>
            <div className="bg-neutral-20/50 p-3 rounded-xl border border-neutral-20">
              <p className="text-[11px] text-neutral-45 font-medium mb-1">
                Failed
              </p>
              <p className="text-xl font-bold text-red-600">
                {activeData?.paymentCounts?.failed || 0}
              </p>
            </div>
            <div className="bg-neutral-20/50 p-3 rounded-xl border border-neutral-20">
              <p className="text-[11px] text-neutral-45 font-medium mb-1">
                Refunded
              </p>
              <p className="text-xl font-bold text-neutral-45">
                {activeData?.paymentCounts?.refunded || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════ TABLE FILTERS ═══════════════ */}
      <div className="pt-2">
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
          ]}
          hasActiveFilters={hasActiveFilters}
          onClear={handleClearFilters}
        />
      </div>

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

      {/* ═══════════════ TABLE ═══════════════ */}
      {isTableLoading ? (
        <div className="bg-white rounded-2xl border border-neutral-20 p-10 flex flex-col items-center justify-center text-neutral-45">
          <div className="w-8 h-8 border-4 border-primary-10 border-t-transparent rounded-full animate-spin mb-4" />
          Loading orders...
        </div>
      ) : orders?.length === 0 ? (
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
