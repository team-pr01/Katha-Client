import React from "react";
import { Link } from "react-router-dom";
import {
  FiShoppingBag,
  FiPackage,
  FiUsers,
  FiStar,
  FiImage,
  FiTag,
  FiLayers,
  FiTrendingUp,
  FiTrendingDown,
  FiArrowUpRight,
  FiAlertCircle,
  FiDollarSign,
  FiActivity,
  FiGift,
} from "react-icons/fi";

// ─── Types ────────────────────────────────────────────────
interface KPI {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  accent: string; // tailwind bg color for icon circle
  path: string;
}

interface RecentOrder {
  orderId: string;
  customer: string;
  amount: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  time: string;
}

interface PersonalizedOrder {
  orderId: string;
  occasion: string;
  customer: string;
  budget: string;
  status: "new" | "in-review" | "quoted" | "confirmed";
  time: string;
}

interface ManagementCard {
  id: string;
  label: string;
  description: string;
  count: number | string;
  path: string;
  icon: React.ReactNode;
  accent: string;
}

interface ActivityItem {
  id: string;
  text: string;
  time: string;
  type: "order" | "user" | "review" | "content";
}

// ─── Component ────────────────────────────────────────────
const AdminDashboardHome = () => {
  // ─── Mock Data (replace with API) ────────────────────────
  const kpis: KPI[] = [
    {
      id: "revenue",
      label: "Total Revenue",
      value: "₹4,82,300",
      change: 12.4,
      changeLabel: "vs last month",
      icon: <FiDollarSign size={18} />,
      accent: "bg-primary-10/10 text-primary-10",
      path: "/admin/orders",
    },
    {
      id: "orders",
      label: "Total Orders",
      value: "1,248",
      change: 8.2,
      changeLabel: "vs last month",
      icon: <FiShoppingBag size={18} />,
      accent: "bg-blue-50 text-blue-600",
      path: "/admin/orders",
    },
    {
      id: "customers",
      label: "Customers",
      value: "3,842",
      change: 5.1,
      changeLabel: "vs last month",
      icon: <FiUsers size={18} />,
      accent: "bg-green-50 text-green-600",
      path: "/admin/users",
    },
    {
      id: "personalized",
      label: "Personalized Requests",
      value: "84",
      change: -3.6,
      changeLabel: "vs last month",
      icon: <FiGift size={18} />,
      accent: "bg-purple-50 text-purple-600",
      path: "/admin/personalized-orders",
    },
  ];

  const managementCards: ManagementCard[] = [
    {
      id: "hero",
      label: "Hero Banners",
      description: "Homepage carousel",
      count: "4 active",
      path: "/admin/heroes",
      icon: <FiImage size={18} />,
      accent: "bg-blue-50 text-blue-600",
    },
    {
      id: "occasions",
      label: "Occasions",
      description: "Gift occasions",
      count: "9 set up",
      path: "/admin/occasions",
      icon: <FiStar size={18} />,
      accent: "bg-pink-50 text-pink-600",
    },
    {
      id: "categories",
      label: "Categories",
      description: "Product categories",
      count: "12 active",
      path: "/admin/categories",
      icon: <FiTag size={18} />,
      accent: "bg-amber-50 text-amber-600",
    },
    {
      id: "products",
      label: "Products",
      description: "Catalog items",
      count: "182 listed",
      path: "/admin/products",
      icon: <FiPackage size={18} />,
      accent: "bg-primary-10/10 text-primary-10",
    },
    {
      id: "users",
      label: "Customers",
      description: "Registered accounts",
      count: "3,842 total",
      path: "/admin/users",
      icon: <FiUsers size={18} />,
      accent: "bg-green-50 text-green-600",
    },
    {
      id: "media",
      label: "Media Library",
      description: "Images & assets",
      count: "1,204 files",
      path: "/admin/media",
      icon: <FiLayers size={18} />,
      accent: "bg-indigo-50 text-indigo-600",
    },
  ];

  const recentOrders: RecentOrder[] = [
    {
      orderId: "K-923923",
      customer: "Rahul Sharma",
      amount: 1359,
      status: "confirmed",
      time: "2m ago",
    },
    {
      orderId: "K-923922",
      customer: "Priya Patel",
      amount: 2499,
      status: "shipped",
      time: "18m ago",
    },
    {
      orderId: "K-923921",
      customer: "Amit Kumar",
      amount: 899,
      status: "pending",
      time: "42m ago",
    },
    {
      orderId: "K-923920",
      customer: "Sneha Reddy",
      amount: 3499,
      status: "delivered",
      time: "1h ago",
    },
    {
      orderId: "K-923919",
      customer: "Vikram Singh",
      amount: 1199,
      status: "cancelled",
      time: "2h ago",
    },
  ];

  const personalizedOrders: PersonalizedOrder[] = [
    {
      orderId: "PO-2841",
      occasion: "Wedding",
      customer: "Aditya Mehta",
      budget: "₹5,000 - ₹10,000",
      status: "new",
      time: "5m ago",
    },
    {
      orderId: "PO-2840",
      occasion: "Anniversary",
      customer: "Nisha Verma",
      budget: "₹2,000 - ₹5,000",
      status: "in-review",
      time: "32m ago",
    },
    {
      orderId: "PO-2839",
      occasion: "Baby Shower",
      customer: "Karan Joshi",
      budget: "₹1,000 - ₹2,000",
      status: "quoted",
      time: "1h ago",
    },
    {
      orderId: "PO-2838",
      occasion: "Birthday",
      customer: "Meera Iyer",
      budget: "₹500 - ₹1,000",
      status: "confirmed",
      time: "3h ago",
    },
  ];

  const activity: ActivityItem[] = [
    { id: "1", text: "New order #K-923923 placed by Rahul Sharma", time: "2m", type: "order" },
    { id: "2", text: "New customer registered — Priya Patel", time: "14m", type: "user" },
    { id: "3", text: "Review added on 'Brass Elephant' by Sneha R.", time: "26m", type: "review" },
    { id: "4", text: "Hero banner 'Diwali Sale' published", time: "1h", type: "content" },
    { id: "5", text: "Personalized order PO-2841 submitted", time: "2h", type: "order" },
  ];

  const topProducts = [
    { name: "Brass Elephant Statue", sold: 42, revenue: 50358 },
    { name: "Wooden Wall Art", sold: 38, revenue: 45600 },
    { name: "Handcrafted Brass Diya", sold: 31, revenue: 27869 },
  ];

  const lowStockProducts = [
    { name: "Brass Peacock Showpiece", stock: 3 },
    { name: "Wooden Wall Art Medium", stock: 5 },
    { name: "Ribbon Packaging Premium", stock: 2 },
  ];

  // ─── Status config ───────────────────────────────────────
  const orderStatusConfig: Record<
    RecentOrder["status"],
    { label: string; className: string; dot: string }
  > = {
    pending: { label: "Pending", className: "bg-neutral-20 text-neutral-10", dot: "bg-neutral-45" },
    confirmed: { label: "Confirmed", className: "bg-indigo-50 text-indigo-700", dot: "bg-indigo-500" },
    shipped: { label: "Shipped", className: "bg-blue-50 text-blue-700", dot: "bg-blue-500" },
    delivered: { label: "Delivered", className: "bg-green-50 text-green-700", dot: "bg-green-500" },
    cancelled: { label: "Cancelled", className: "bg-red-50 text-red-700", dot: "bg-red-500" },
  };

  const personalizedStatusConfig: Record<
    PersonalizedOrder["status"],
    { label: string; className: string }
  > = {
    new: { label: "New", className: "bg-primary-10/10 text-primary-10" },
    "in-review": { label: "In Review", className: "bg-amber-50 text-amber-700" },
    quoted: { label: "Quoted", className: "bg-blue-50 text-blue-700" },
    confirmed: { label: "Confirmed", className: "bg-green-50 text-green-700" },
  };

  const activityIconConfig: Record<ActivityItem["type"], string> = {
    order: "bg-blue-50 text-blue-600",
    user: "bg-green-50 text-green-600",
    review: "bg-pink-50 text-pink-600",
    content: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="space-y-5 font-Manrope">
      {/* ═══════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════ */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-10 tracking-tight mt-1">
            Good morning, Admin 👋
          </h1>
          <p className="text-sm text-neutral-45 mt-1">
            Here's what's happening across your store today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/admin/analytics"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-neutral-20 text-sm font-medium text-neutral-10 hover:border-primary-10/40 transition-all"
          >
            <FiActivity size={15} />
            View Analytics
          </Link>
          <Link
            to="/admin/products/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-10 text-white text-sm font-medium hover:bg-[#d4892a] transition-all shadow-md shadow-primary-10/20"
          >
            <FiPackage size={15} />
            Add Product
          </Link>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          KPI ROW
      ═══════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const isPositive = kpi.change >= 0;
          return (
            <Link
              key={kpi.id}
              to={kpi.path}
              className="group bg-white rounded-2xl border border-neutral-20 p-5 hover:border-primary-10/40 hover:shadow-lg hover:shadow-neutral-10/5 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`size-10 rounded-xl flex items-center justify-center ${kpi.accent}`}>
                  {kpi.icon}
                </div>
                <FiArrowUpRight
                  size={16}
                  className="text-neutral-45 group-hover:text-primary-10 group-hover:rotate-45 transition-all"
                />
              </div>

              <p className="text-xs text-neutral-45">{kpi.label}</p>
              <p className="text-2xl font-bold text-neutral-10 tracking-tight mt-1">
                {kpi.value}
              </p>

              <div className="flex items-center gap-1.5 mt-3">
                <span
                  className={`
                    flex items-center gap-0.5 text-[11px] font-semibold
                    ${isPositive ? "text-green-600" : "text-red-500"}
                  `}
                >
                  {isPositive ? <FiTrendingUp size={11} /> : <FiTrendingDown size={11} />}
                  {isPositive ? "+" : ""}
                  {kpi.change}%
                </span>
                <span className="text-[11px] text-neutral-45">{kpi.changeLabel}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════
          MANAGEMENT GRID — jump to any section
      ═══════════════════════════════════════════════ */}
      <div className="bg-white rounded-2xl border border-neutral-20 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-neutral-10 tracking-tight">
              Manage everything
            </h2>
            <p className="text-xs text-neutral-45 mt-0.5">
              Direct access to all your store controls
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {managementCards.map((card) => (
            <Link
              key={card.id}
              to={card.path}
              className="group relative rounded-2xl border border-neutral-20 p-4 hover:border-primary-10/40 hover:bg-neutral-20/40 transition-all"
            >
              <div className={`size-9 rounded-xl flex items-center justify-center mb-3 ${card.accent}`}>
                {card.icon}
              </div>
              <p className="text-xs font-semibold text-neutral-10 truncate">
                {card.label}
              </p>
              <p className="text-[11px] text-neutral-45 mt-0.5 truncate">
                {card.count}
              </p>
              <FiArrowUpRight
                size={12}
                className="absolute top-3 right-3 text-neutral-45 opacity-0 group-hover:opacity-100 group-hover:text-primary-10 transition-all"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          MAIN GRID — 2/3 + 1/3
      ═══════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ─── LEFT: Recent Orders + Personalized Requests ─── */}
        <div className="lg:col-span-2 space-y-5">
          {/* Recent Orders */}
          <div className="bg-white rounded-2xl border border-neutral-20 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-20">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-xl bg-blue-50 flex items-center justify-center">
                  <FiShoppingBag size={15} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-10 tracking-tight">
                    Recent Orders
                  </h3>
                  <p className="text-[11px] text-neutral-45">Latest purchases</p>
                </div>
              </div>
              <Link
                to="/admin/orders"
                className="text-[11px] font-semibold text-primary-10 hover:text-[#d4892a] transition-colors flex items-center gap-1"
              >
                View all
                <FiArrowUpRight size={11} />
              </Link>
            </div>

            <div className="divide-y divide-neutral-20">
              {recentOrders.map((order) => {
                const cfg = orderStatusConfig[order.status];
                return (
                  <Link
                    key={order.orderId}
                    to={`/admin/orders/${order.orderId}`}
                    className="flex items-center gap-4 px-5 py-3 hover:bg-neutral-20/40 transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-neutral-10">
                          #{order.orderId}
                        </p>
                        <span
                          className={`flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${cfg.className}`}
                        >
                          <span className={`size-1 rounded-full ${cfg.dot}`} />
                          {cfg.label}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-45 mt-0.5 truncate">
                        {order.customer}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-neutral-10">
                        ₹{order.amount.toLocaleString("en-IN")}
                      </p>
                      <p className="text-[10px] text-neutral-45 mt-0.5">
                        {order.time}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Personalized Orders */}
          <div className="bg-white rounded-2xl border border-neutral-20 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-20">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-xl bg-purple-50 flex items-center justify-center">
                  <FiGift size={15} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-10 tracking-tight">
                    Personalized Requests
                  </h3>
                  <p className="text-[11px] text-neutral-45">
                    Custom gift enquiries
                  </p>
                </div>
              </div>
              <Link
                to="/admin/personalized-orders"
                className="text-[11px] font-semibold text-primary-10 hover:text-[#d4892a] transition-colors flex items-center gap-1"
              >
                View all
                <FiArrowUpRight size={11} />
              </Link>
            </div>

            <div className="divide-y divide-neutral-20">
              {personalizedOrders.map((order) => {
                const cfg = personalizedStatusConfig[order.status];
                return (
                  <Link
                    key={order.orderId}
                    to={`/admin/personalized-orders/${order.orderId}`}
                    className="flex items-center gap-4 px-5 py-3 hover:bg-neutral-20/40 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-neutral-10">
                          #{order.orderId}
                        </p>
                        <span
                          className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${cfg.className}`}
                        >
                          {cfg.label}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-45 mt-0.5 truncate">
                        {order.customer} · {order.occasion}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-medium text-neutral-10">
                        {order.budget}
                      </p>
                      <p className="text-[10px] text-neutral-45 mt-0.5">
                        {order.time}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── RIGHT: Activity Feed ─── */}
        <div className="space-y-5">
          {/* Activity */}
          <div className="bg-white rounded-2xl border border-neutral-20 p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="size-8 rounded-xl bg-primary-10/10 flex items-center justify-center">
                <FiActivity size={15} className="text-primary-10" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-10 tracking-tight">
                  Live Activity
                </h3>
                <p className="text-[11px] text-neutral-45">Right now</p>
              </div>
            </div>

            <div className="space-y-3.5 relative">
              {/* Vertical line */}
              <div className="absolute left-[15px] top-3 bottom-3 w-px bg-neutral-20" />

              {activity.map((item) => (
                <div key={item.id} className="flex items-start gap-3 relative">
                  <div
                    className={`size-8 rounded-full flex items-center justify-center shrink-0 relative z-10 ring-4 ring-white ${activityIconConfig[item.type]}`}
                  >
                    {item.type === "order" && <FiShoppingBag size={13} />}
                    {item.type === "user" && <FiUsers size={13} />}
                    {item.type === "review" && <FiStar size={13} />}
                    {item.type === "content" && <FiImage size={13} />}
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <p className="text-xs text-neutral-10 leading-snug">
                      {item.text}
                    </p>
                    <p className="text-[10px] text-neutral-45 mt-0.5">
                      {item.time} ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white rounded-2xl border border-neutral-20 p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="size-8 rounded-xl bg-red-50 flex items-center justify-center">
                <FiAlertCircle size={15} className="text-red-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-neutral-10 tracking-tight">
                  Low Stock Alert
                </h3>
                <p className="text-[11px] text-neutral-45">
                  {lowStockProducts.length} items need restocking
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {lowStockProducts.map((product) => (
                <Link
                  key={product.name}
                  to="/admin/products"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-20/60 transition-colors group"
                >
                  <p className="text-xs font-medium text-neutral-10 truncate pr-2">
                    {product.name}
                  </p>
                  <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-600">
                    {product.stock} left
                  </span>
                </Link>
              ))}
            </div>

            <Link
              to="/admin/products"
              className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-neutral-20 text-xs font-medium text-neutral-10 hover:bg-neutral-45/20 transition-colors"
            >
              Manage inventory
              <FiArrowUpRight size={11} />
            </Link>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-2xl border border-neutral-20 p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="size-8 rounded-xl bg-amber-50 flex items-center justify-center">
                <FiTrendingUp size={15} className="text-amber-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-10 tracking-tight">
                  Top Products
                </h3>
                <p className="text-[11px] text-neutral-45">Best sellers</p>
              </div>
            </div>

            <div className="space-y-3">
              {topProducts.map((product, i) => (
                <div key={product.name} className="flex items-center gap-3">
                  <div className="size-6 rounded-lg bg-neutral-20 flex items-center justify-center text-[10px] font-bold text-neutral-10 shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-neutral-10 truncate">
                      {product.name}
                    </p>
                    <p className="text-[10px] text-neutral-45">
                      {product.sold} sold
                    </p>
                  </div>
                  <p className="text-xs font-bold text-neutral-10 shrink-0">
                    ₹{(product.revenue / 1000).toFixed(1)}K
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          BOTTOM — Quick Stats (today vs yesterday)
      ═══════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Orders Today",
            value: "24",
            compare: "18 yesterday",
            positive: true,
          },
          {
            label: "Revenue Today",
            value: "₹48.2K",
            compare: "₹42.1K yesterday",
            positive: true,
          },
          {
            label: "New Customers",
            value: "17",
            compare: "21 yesterday",
            positive: false,
          },
          {
            label: "Personalized Req.",
            value: "6",
            compare: "4 yesterday",
            positive: true,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-neutral-20 p-4"
          >
            <p className="text-[10px] tracking-[0.15em] uppercase text-neutral-45 font-semibold">
              {stat.label}
            </p>
            <p className="text-xl font-bold text-neutral-10 tracking-tight mt-1.5">
              {stat.value}
            </p>
            <p
              className={`text-[11px] mt-1 ${
                stat.positive ? "text-green-600" : "text-red-500"
              }`}
            >
              {stat.compare}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardHome;