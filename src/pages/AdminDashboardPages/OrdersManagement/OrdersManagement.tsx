import { useMemo, useState } from "react";
import { FiPlus, FiEye, FiPackage, FiTruck, FiXCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { TOrder, TOrdersKPI, TOrderStatus } from "../../../types/orders.types";
import OrderStatusBadge from "../../../components/AdminDashboardComponents/OrdersManagementPage/OrderStatusBadge/OrderStatusBadge";
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

const ITEMS_PER_PAGE = 10;

const dateRangeOptions = [
  { value: "all", label: "All time" },
  { value: "today", label: "Today" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
];

const OrdersManagement = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<TOrderStatus | "all">("all");
  const [dateRange, setDateRange] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // ─── Mock Data ───────────────────────────────────────
  const kpi: TOrdersKPI = {
    totalOrders: 1248,
    totalRevenue: 482300,
    avgOrderValue: 386,
    pendingOrders: 24,
    deliveredThisMonth: 189,
    revenueChange: 12.4,
  };

 const orders: TOrder[] = [
     {
       _id: "1",
       orderId: "K-923923",
       customer: { name: "Rahul Sharma", email: "rahul@example.com", phone: "9876543210" },
       items: [
         { productId: "p1", name: "Brass Elephant Statue", image: "/api/placeholder/60/60", variant: "Medium / Gold", price: 1199, quantity: 1 },
         { productId: "p2", name: "Brass Diya Set", image: "/api/placeholder/60/60", variant: "Classic", price: 160, quantity: 1 },
       ],
       totalItems: 2,
       subtotal: 1359,
       deliveryCharge: 0,
       discount: 0,
       totalAmount: 1359,
       paymentMethod: "Cash on Delivery",
       paymentStatus: "pending",
       orderStatus: "confirmed",
       createdAt: "2026-09-13T10:23:00Z",
       shippingCity: "Mumbai",
       shippingState: "Maharashtra",
     },
     {
       _id: "2",
       orderId: "K-923922",
       customer: { name: "Priya Patel", email: "priya@example.com", phone: "9876543211" },
       items: [
         { productId: "p3", name: "Wooden Wall Art", image: "/api/placeholder/60/60", variant: "Medium / Brown", price: 2499, quantity: 1 },
       ],
       totalItems: 1,
       subtotal: 2499,
       deliveryCharge: 0,
       discount: 0,
       totalAmount: 2499,
       paymentMethod: "UPI",
       paymentStatus: "paid",
       orderStatus: "shipped",
       createdAt: "2026-09-13T09:05:00Z",
       shippingCity: "Bangalore",
       shippingState: "Karnataka",
     },
     {
       _id: "3",
       orderId: "K-923921",
       customer: { name: "Amit Kumar", email: "amit@example.com", phone: "9876543212" },
       items: [
         { productId: "p4", name: "Handcrafted Brass Diya", image: "/api/placeholder/60/60", variant: "Set of 4", price: 899, quantity: 1 },
       ],
       totalItems: 1,
       subtotal: 899,
       deliveryCharge: 50,
       discount: 0,
       totalAmount: 949,
       paymentMethod: "Cash on Delivery",
       paymentStatus: "pending",
       orderStatus: "pending",
       createdAt: "2026-09-13T08:40:00Z",
       shippingCity: "Delhi",
       shippingState: "Delhi",
     },
     {
       _id: "4",
       orderId: "K-923920",
       customer: { name: "Sneha Reddy", email: "sneha@example.com", phone: "9876543213" },
       items: [
         { productId: "p5", name: "Brass Peacock Showpiece", image: "/api/placeholder/60/60", variant: "Large", price: 3499, quantity: 1 },
       ],
       totalItems: 1,
       subtotal: 3499,
       deliveryCharge: 0,
       discount: 100,
       totalAmount: 3399,
       paymentMethod: "UPI",
       paymentStatus: "paid",
       orderStatus: "delivered",
       createdAt: "2026-09-13T07:15:00Z",
       shippingCity: "Hyderabad",
       shippingState: "Telangana",
     },
     {
       _id: "5",
       orderId: "K-923919",
       customer: { name: "Vikram Singh", email: "vikram@example.com", phone: "9876543214" },
       items: [
         { productId: "p1", name: "Brass Elephant Statue", image: "/api/placeholder/60/60", variant: "Small / Silver", price: 1199, quantity: 1 },
       ],
       totalItems: 1,
       subtotal: 1199,
       deliveryCharge: 50,
       discount: 0,
       totalAmount: 1249,
       paymentMethod: "Cash on Delivery",
       paymentStatus: "pending",
       orderStatus: "cancelled",
       createdAt: "2026-09-12T18:22:00Z",
       shippingCity: "Chennai",
       shippingState: "Tamil Nadu",
     },
     {
       _id: "6",
       orderId: "K-923918",
       customer: { name: "Meera Iyer", email: "meera@example.com", phone: "9876543215" },
       items: [
         { productId: "p6", name: "Wooden Wall Art Floral", image: "/api/placeholder/60/60", variant: "Large", price: 1999, quantity: 2 },
       ],
       totalItems: 2,
       subtotal: 3998,
       deliveryCharge: 0,
       discount: 200,
       totalAmount: 3798,
       paymentMethod: "UPI",
       paymentStatus: "paid",
       orderStatus: "processing",
       createdAt: "2026-09-12T15:10:00Z",
       shippingCity: "Pune",
       shippingState: "Maharashtra",
     },
   ];

  // ─── KPI items ───────────────────────────────────────
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

  // ─── Filtering ───────────────────────────────────────
  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter((order) => {
      if (status !== "all" && order.orderStatus !== status) return false;
      if (q) {
        const matches =
          order.orderId.toLowerCase().includes(q) ||
          order.customer.name.toLowerCase().includes(q) ||
          order.customer.email.toLowerCase().includes(q) ||
          order.customer.phone.includes(q);
        if (!matches) return false;
      }
      if (dateRange !== "all") {
        const created = new Date(order.createdAt).getTime();
        const now = Date.now();
        const ranges: Record<string, number> = {
          today: 24 * 60 * 60 * 1000,
          week: 7 * 24 * 60 * 60 * 1000,
          month: 30 * 24 * 60 * 60 * 1000,
        };
        if (now - created > ranges[dateRange]) return false;
      }
      return true;
    });
  }, [orders, search, status, dateRange]);

  // ─── Pagination ──────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / ITEMS_PER_PAGE));

  // ─── Columns ─────────────────────────────────────────
  const columns: TDataTableColumn<TOrder>[] = [
    {
      key: "order",
      header: "Order",
      render: (order) => (
        <div>
          <Link
            to={`/admin/orders/${order.orderId}`}
            className="text-sm font-semibold text-neutral-10 hover:text-primary-10 transition-colors"
          >
            #{order.orderId}
          </Link>
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
      render: (order) => (
        <div>
          <p className="text-sm font-medium text-neutral-10 truncate max-w-45">
            {order.customer.name}
          </p>
          <p className="text-[11px] text-neutral-45 truncate max-w-45">
            {order.customer.email}
          </p>
        </div>
      ),
    },
    {
      key: "items",
      header: "Items",
      render: (order) => (
        <div>
          <p className="text-sm text-neutral-10">
            {order.totalItems} item{order.totalItems > 1 ? "s" : ""}
          </p>
          <p className="text-[11px] text-neutral-45 truncate max-w-35">
            {order.items[0]?.name}
            {order.totalItems > 1 ? ` +${order.totalItems - 1}` : ""}
          </p>
        </div>
      ),
    },
    {
      key: "city",
      header: "Ship To",
      hiddenAt: "xl",
      render: (order) => (
        <div>
          <p className="text-xs text-neutral-10">{order.shippingCity}</p>
          <p className="text-[11px] text-neutral-45">{order.shippingState}</p>
        </div>
      ),
    },
    {
      key: "payment",
      header: "Payment",
      hiddenAt: "lg",
      render: (order) => (
        <div>
          <p className="text-xs font-medium text-neutral-10">
            {order.paymentMethod}
          </p>
          <p
            className={`text-[11px] capitalize mt-0.5 ${
              order.paymentStatus === "paid" ? "text-green-600" : "text-amber-600"
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
      render: (order) => <OrderStatusBadge status={order.orderStatus} />,
    },
    {
      key: "total",
      header: "Total",
      align: "right",
      render: (order) => (
        <span className="text-sm font-bold text-neutral-10">
          ₹{order.totalAmount.toLocaleString("en-IN")}
        </span>
      ),
    },
  ];

  // ─── Handlers ────────────────────────────────────────
  const handleClearFilters = () => {
    setSearch("");
    setStatus("all");
    setDateRange("all");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    search.trim() !== "" || status !== "all" || dateRange !== "all";

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
            setCurrentPage(1);
          },
          placeholder: "Search by order ID, customer, email, phone…",
        }}
        selects={[
          {
            id: "status",
            value: status,
            onChange: (v) => {
              setStatus(v as TOrderStatus | "all");
              setCurrentPage(1);
            },
            options: orderStatusOptions,
          },
          {
            id: "range",
            value: dateRange,
            onChange: (v) => {
              setDateRange(v);
              setCurrentPage(1);
            },
            options: dateRangeOptions,
          },
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

      {filteredOrders.length === 0 ? (
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
            rows={filteredOrders}
            columns={columns}
            rowKey={(o) => o._id}
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
              setSelectedIds(
                checked ? filteredOrders.map((o) => o._id) : [],
              )
            }
          />

          <DataTablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredOrders.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {/* Revenue comparison */}

       <div className="bg-white rounded-2xl border border-neutral-20 p-5">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-sm font-bold text-neutral-10 tracking-tight">
              Revenue Comparison
            </h2>
            <p className="text-xs text-neutral-45 mt-0.5">
              Current month vs last month
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs text-neutral-45">
              <span className="size-2 rounded-full bg-primary-10" />
              This month
            </span>
            <span className="flex items-center gap-1.5 text-xs text-neutral-45">
              <span className="size-2 rounded-full bg-neutral-20" />
              Last month
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* This Month */}
          <div className="p-4 rounded-xl bg-primary-10/5 border border-primary-10/20">
            <p className="text-[10px] tracking-[0.2em] uppercase text-primary-10 font-semibold">
              This Month
            </p>
            <p className="text-2xl font-bold text-neutral-10 tracking-tight mt-1.5">
              ₹4,82,300
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[11px] font-semibold text-green-600">
                +12.4%
              </span>
              <span className="text-[11px] text-neutral-45">
                vs last month
              </span>
            </div>
          </div>

          {/* Last Month */}
          <div className="p-4 rounded-xl bg-neutral-20/50">
            <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-45 font-semibold">
              Last Month
            </p>
            <p className="text-2xl font-bold text-neutral-10 tracking-tight mt-1.5">
              ₹4,28,900
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[11px] text-neutral-45">
                Baseline
              </span>
            </div>
          </div>

          {/* Change */}
          <div className="p-4 rounded-xl bg-green-50 border border-green-200">
            <p className="text-[10px] tracking-[0.2em] uppercase text-green-700 font-semibold">
              Growth
            </p>
            <p className="text-2xl font-bold text-green-700 tracking-tight mt-1.5">
              +₹53,400
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[11px] font-semibold text-green-600">
                +12.4%
              </span>
              <span className="text-[11px] text-neutral-45">
                increase
              </span>
            </div>
          </div>
        </div>

        {/* Simple bar visualization */}
        <div className="mt-6 space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-medium text-neutral-10">
                This Month
              </span>
              <span className="text-[11px] font-semibold text-neutral-10">
                ₹4.82L
              </span>
            </div>
            <div className="h-2 rounded-full bg-neutral-20 overflow-hidden">
              <div
                className="h-full bg-primary-10 rounded-full transition-all duration-500"
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-medium text-neutral-10">
                Last Month
              </span>
              <span className="text-[11px] font-semibold text-neutral-10">
                ₹4.29L
              </span>
            </div>
            <div className="h-2 rounded-full bg-neutral-20 overflow-hidden">
              <div
                className="h-full bg-neutral-45 rounded-full transition-all duration-500"
                style={{ width: "89%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersManagement;