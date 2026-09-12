import React, { useState } from "react";
import {
  FiPackage,
  FiChevronRight,
  FiChevronDown,
  FiChevronUp,
  FiCheckCircle,
  FiTruck,
  FiClock,
  FiXCircle,
  FiSearch,
  FiCalendar,
  FiMapPin,
  FiCreditCard,
  FiBox,
  FiEye,
} from "react-icons/fi";
import { Link } from "react-router-dom";

// Types
interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

interface Order {
  id: string;
  date: string;
  status: "Delivered" | "Shipped" | "Processing" | "Cancelled";
  total: number;
  items: OrderItem[];
  paymentMethod: string;
  address: string;
  trackingId?: string;
  deliveryDate?: string;
}

const MyOrders = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Mock orders data - Replace with API data
  const orders: Order[] = [
    {
      id: "ORD-2024-001",
      date: "12 Sep 2026",
      status: "Delivered",
      total: 1359,
      paymentMethod: "Cash on Delivery",
      address: "123 Main Street, Mumbai, Maharashtra 400001",
      trackingId: "TRK123456789",
      deliveryDate: "15 Sep 2026",
      items: [
        {
          id: "1",
          name: "The Jewel Embedded Brass Elephant",
          image: "/api/placeholder/80/80",
          price: 1199,
          quantity: 1,
          size: "Medium",
          color: "Brass",
        },
        {
          id: "2",
          name: "Handcrafted Brass Diya Set",
          image: "/api/placeholder/80/80",
          price: 160,
          quantity: 1,
          size: "Classic",
          color: "Gold",
        },
      ],
    },
    {
      id: "ORD-2024-002",
      date: "05 Sep 2026",
      status: "Shipped",
      total: 2499,
      paymentMethod: "UPI",
      address: "123 Main Street, Mumbai, Maharashtra 400001",
      trackingId: "TRK987654321",
      deliveryDate: "18 Sep 2026",
      items: [
        {
          id: "3",
          name: "Brass Peacock Showpiece",
          image: "/api/placeholder/80/80",
          price: 2499,
          quantity: 1,
          size: "Large",
          color: "Antique Gold",
        },
      ],
    },
    {
      id: "ORD-2024-003",
      date: "28 Aug 2026",
      status: "Processing",
      total: 899,
      paymentMethod: "Cash on Delivery",
      address: "123 Main Street, Mumbai, Maharashtra 400001",
      items: [
        {
          id: "4",
          name: "Wooden Wall Art - Floral Pattern",
          image: "/api/placeholder/80/80",
          price: 899,
          quantity: 1,
          size: "Medium",
          color: "Brown",
        },
      ],
    },
    {
      id: "ORD-2024-004",
      date: "15 Aug 2026",
      status: "Cancelled",
      total: 599,
      paymentMethod: "UPI",
      address: "123 Main Street, Mumbai, Maharashtra 400001",
      items: [
        {
          id: "5",
          name: "Brass Temple Bells Set",
          image: "/api/placeholder/80/80",
          price: 599,
          quantity: 1,
        },
      ],
    },
  ];

  const tabs = [
    { id: "all", label: "All Orders", count: orders.length },
    {
      id: "processing",
      label: "Processing",
      count: orders.filter((o) => o.status === "Processing").length,
    },
    {
      id: "shipped",
      label: "Shipped",
      count: orders.filter((o) => o.status === "Shipped").length,
    },
    {
      id: "delivered",
      label: "Delivered",
      count: orders.filter((o) => o.status === "Delivered").length,
    },
    {
      id: "cancelled",
      label: "Cancelled",
      count: orders.filter((o) => o.status === "Cancelled").length,
    },
  ];

  // Filter orders based on tab and search
  const filteredOrders = orders.filter((order) => {
    const matchesTab =
      activeTab === "all" ||
      order.status.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesTab && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <FiCheckCircle className="text-green-600" size={14} />;
      case "shipped":
        return <FiTruck className="text-blue-600" size={14} />;
      case "processing":
        return <FiClock className="text-yellow-600" size={14} />;
      case "cancelled":
        return <FiXCircle className="text-red-600" size={14} />;
      default:
        return <FiPackage className="text-neutral-45" size={14} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-50 text-green-700 border-green-200";
      case "shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "processing":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-neutral-20 text-neutral-45 border-neutral-50";
    }
  };

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="space-y-6 font-Manrope">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-10 flex items-center gap-2">
              <FiPackage className="text-primary-10" size={24} />
              My Orders
            </h1>
            <p className="text-sm text-neutral-45 mt-1">
              Track and manage all your orders in one place
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-45"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by order ID or product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-neutral-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm p-2 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-200 whitespace-nowrap
                ${
                  activeTab === tab.id
                    ? "bg-primary-10 text-white shadow-md"
                    : "text-neutral-10 hover:bg-neutral-20"
                }
              `}
            >
              {tab.label}
              <span
                className={`
                  text-xs px-2 py-0.5 rounded-full
                  ${
                    activeTab === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-neutral-20 text-neutral-45"
                  }
                `}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 rounded-full bg-neutral-20 flex items-center justify-center mx-auto mb-6">
              <FiPackage size={48} className="text-neutral-45" />
            </div>
            <h3 className="text-xl font-bold text-neutral-10 mb-2">
              No Orders Found
            </h3>
            <p className="text-neutral-45 text-sm">
              {searchQuery
                ? `No orders matching "${searchQuery}". Try a different search term.`
                : "You haven't placed any orders in this category yet."}
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary-10 text-white rounded-xl font-medium hover:bg-[#d4892a] transition-all shadow-md hover:shadow-lg"
            >
              Start Shopping
              <FiChevronRight size={18} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const isExpanded = expandedOrder === order.id;

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div className="p-5 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-base font-semibold text-neutral-10">
                          #{order.id}
                        </h3>
                        <span
                          className={`
                            text-xs px-2.5 py-1 rounded-full border
                            flex items-center gap-1.5 font-medium
                            ${getStatusColor(order.status)}
                          `}
                        >
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-neutral-45">
                        <span className="flex items-center gap-1.5">
                          <FiCalendar size={12} className="text-primary-10" />
                          Ordered on {order.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FiBox size={12} className="text-primary-10" />
                          {order.items.length} item
                          {order.items.length > 1 ? "s" : ""}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FiCreditCard
                            size={12}
                            className="text-primary-10"
                          />
                          {order.paymentMethod}
                        </span>
                      </div>
                    </div>

                    {/* Amount + Actions */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs text-neutral-45">Total Amount</p>
                        <p className="text-lg font-bold text-neutral-10">
                          ₹{order.total}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleOrderExpand(order.id)}
                        className="flex items-center gap-1.5 px-4 py-2 border-2 border-neutral-50 text-neutral-10 rounded-xl text-sm font-medium hover:border-primary-10 hover:bg-primary-10/5 transition-all"
                      >
                        {isExpanded ? (
                          <>
                            Hide Details
                            <FiChevronUp size={16} />
                          </>
                        ) : (
                          <>
                            View Details
                            <FiChevronDown size={16} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Product Preview (when collapsed) */}
                  {!isExpanded && (
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-neutral-20">
                      <div className="flex -space-x-3">
                        {order.items.slice(0, 3).map((item, index) => (
                          <img
                            key={index}
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover border-2 border-white bg-neutral-20"
                          />
                        ))}
                      </div>
                      <p className="text-sm text-neutral-45 flex-1 truncate">
                        {order.items[0].name}
                        {order.items.length > 1 &&
                          ` +${order.items.length - 1} more`}
                      </p>
                    </div>
                  )}
                </div>

                {/* Expanded Order Details */}
                {isExpanded && (
                  <div className="border-t border-neutral-20 bg-neutral-20/30 p-5 md:p-6 space-y-5">
                    {/* Order Items */}
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-10 mb-3 flex items-center gap-2">
                        <FiBox size={16} className="text-primary-10" />
                        Order Items
                      </h4>
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4 bg-white rounded-xl p-3"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded-lg object-cover bg-neutral-20"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-neutral-10 line-clamp-1">
                                {item.name}
                              </p>
                              <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-neutral-45">
                                {item.size && <span>Size: {item.size}</span>}
                                {item.color && <span>Color: {item.color}</span>}
                                <span>Qty: {item.quantity}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-neutral-10">
                                ₹{item.price * item.quantity}
                              </p>
                              <p className="text-xs text-neutral-45">
                                ₹{item.price} each
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery + Payment Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Shipping Address */}
                      <div className="bg-white rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-neutral-10 mb-2 flex items-center gap-2">
                          <FiMapPin size={16} className="text-primary-10" />
                          Shipping Address
                        </h4>
                        <p className="text-sm text-neutral-45 leading-relaxed">
                          {order.address}
                        </p>
                      </div>

                      {/* Delivery Info */}
                      <div className="bg-white rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-neutral-10 mb-2 flex items-center gap-2">
                          <FiTruck size={16} className="text-primary-10" />
                          Delivery Information
                        </h4>
                        <div className="space-y-1.5 text-sm">
                          {order.trackingId && (
                            <div className="flex justify-between">
                              <span className="text-neutral-45">
                                Tracking ID:
                              </span>
                              <span className="text-neutral-10 font-medium">
                                {order.trackingId}
                              </span>
                            </div>
                          )}
                          {order.deliveryDate && (
                            <div className="flex justify-between">
                              <span className="text-neutral-45">
                                {order.status === "Delivered"
                                  ? "Delivered on:"
                                  : "Expected by:"}
                              </span>
                              <span className="text-neutral-10 font-medium">
                                {order.deliveryDate}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-neutral-45">Status:</span>
                            <span
                              className={`font-medium flex items-center gap-1 ${
                                order.status === "Delivered"
                                  ? "text-green-600"
                                  : order.status === "Shipped"
                                    ? "text-blue-600"
                                    : order.status === "Processing"
                                      ? "text-yellow-600"
                                      : "text-red-600"
                              }`}
                            >
                              {getStatusIcon(order.status)}
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button className="flex items-center gap-2 px-5 py-2.5 bg-primary-10 text-white rounded-xl text-sm font-medium hover:bg-[#d4892a] transition-all shadow-sm hover:shadow-md">
                        <FiEye size={16} />
                        Track Order
                      </button>
                      {order.status === "Delivered" && (
                        <button className="flex items-center gap-2 px-5 py-2.5 border-2 border-neutral-50 text-neutral-10 rounded-xl text-sm font-medium hover:border-primary-10 hover:bg-primary-10/5 transition-all">
                          <FiPackage size={16} />
                          Buy Again
                        </button>
                      )}
                      <button className="flex items-center gap-2 px-5 py-2.5 border-2 border-neutral-50 text-neutral-10 rounded-xl text-sm font-medium hover:border-red-300 hover:bg-red-50 hover:text-red-500 transition-all ml-auto">
                        Need Help?
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;