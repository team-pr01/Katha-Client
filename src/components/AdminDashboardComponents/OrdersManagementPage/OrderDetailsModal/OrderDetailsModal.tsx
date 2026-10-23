/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  FiX,
  FiUser,
  FiMapPin,
  FiMail,
  FiPhone,
  FiPackage,
  FiTruck,
  FiCreditCard,
  FiCalendar,
  FiHash,
  FiCopy,
  FiExternalLink,
} from "react-icons/fi";
import toast from "react-hot-toast";
import OrderStatusBadge from "../OrderStatusBadge/OrderStatusBadge";
import OrderStatusTimeline from "../OrderStatusTimeline/OrderStatusTimeline";
import { orderStatusOptions } from "../../../../config/orderStatusConfig";
import type { TOrderStatus } from "../../../../types/orders.types";
import {
  useGetSingleORderBySlugQuery,
  useUpdateOrderStatusMutation,
} from "../../../../redux/Features/Order/orderApi";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

const OrderDetailsModal = ({
  isOpen,
  onClose,
  orderId,
}: OrderDetailsModalProps) => {
  const { data, isLoading } = useGetSingleORderBySlugQuery(orderId);
  const order = data?.data || {};

  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

  const [statusDraft, setStatusDraft] = useState<TOrderStatus | "">("");

  if (!isOpen) return null;

  const addr = (order as any).shippingAddress || {};
  const items = (order as any).orderedItems || [];
  const customerName =
    `${addr.firstName || ""} ${addr.lastName || ""}`.trim() || "—";

  // ─── Handle order status change ──────────────────────
  const handleStatusUpdate = async () => {
    if (!statusDraft) {
      toast.error("Please select an order status");
      return;
    }

    const payload = {
      orderStatus: statusDraft,
    };

    try {
      await updateOrderStatus({
        id: (order as any)._id,
        data: payload,
      }).unwrap();
      toast.success("Order status updated!");
      setStatusDraft("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update order status");
    }
  };

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value).then(
      () => toast.success(`${label} copied`),
      () => toast.error("Copy failed"),
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-neutral-10/50 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl my-8 flex flex-col">
        {/* Header (Always visible) */}
        <div className="px-5 py-4 border-b border-neutral-20 flex items-center justify-between sticky top-0 bg-white rounded-t-3xl z-10 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-45 font-semibold">
                Order Details
              </p>
              <div className="flex items-center gap-2 mt-1">
                <h2 className="text-lg font-bold text-neutral-10 tracking-tight">
                  #{isLoading ? "..." : (order as any).orderId || "..."}
                </h2>
                {!isLoading && (
                  <>
                    <button
                      onClick={() =>
                        handleCopy((order as any).orderId, "Order ID")
                      }
                      className="p-1 rounded-lg text-neutral-45 hover:text-primary-10 hover:bg-primary-10/10 transition-all"
                      aria-label="Copy order ID"
                    >
                      <FiCopy size={13} />
                    </button>
                    <OrderStatusBadge status={(order as any).orderStatus} />
                  </>
                )}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-45 hover:text-neutral-10 hover:bg-neutral-20 transition-all shrink-0"
            aria-label="Close"
          >
            <FiX size={18} />
          </button>
        </div>

        {isLoading ? (
          /* ─── Full-height Loading State ─── */
          <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 space-y-4">
            <div className="w-10 h-10 border-4 border-primary-10 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-neutral-45">
              Fetching order details...
            </p>
          </div>
        ) : (
          /* ─── Body Content ─── */
          <div className="p-5 md:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* ═══ STATUS UPDATE ═══ */}
            <section className="bg-primary-10/5 border border-primary-10/20 rounded-2xl p-4 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-neutral-10 tracking-tight">
                    Update Order Status
                  </h3>
                  <p className="text-xs text-neutral-45 mt-0.5">
                    Current:{" "}
                    <OrderStatusBadge status={(order as any).orderStatus} />
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={statusDraft}
                    onChange={(e) =>
                      setStatusDraft(e.target.value as TOrderStatus)
                    }
                    className="px-3 py-2 rounded-xl border border-neutral-20 bg-white text-xs font-medium text-neutral-10 focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent cursor-pointer"
                  >
                    <option value="">Select new status…</option>
                    {orderStatusOptions
                      .filter((o) => o.value !== "all")
                      .map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                  </select>
                  <button
                    onClick={handleStatusUpdate}
                    disabled={!statusDraft || isUpdating}
                    className="px-4 py-2 rounded-xl bg-primary-10 text-white text-xs font-semibold hover:bg-[#d4892a] transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {isUpdating ? "Updating…" : "Update"}
                  </button>
                </div>
              </div>
            </section>

            {/* ═══ CUSTOMER + SHIPPING ═══ */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-neutral-20 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="size-8 rounded-xl bg-blue-50 flex items-center justify-center">
                    <FiUser size={14} className="text-blue-600" />
                  </div>
                  <h3 className="text-sm font-bold text-neutral-10">
                    Customer
                  </h3>
                </div>
                <div className="space-y-2.5 text-sm">
                  <div className="flex items-start gap-2.5">
                    <FiUser
                      size={14}
                      className="text-neutral-45 mt-0.5 shrink-0"
                    />
                    <span className="text-neutral-10">{customerName}</span>
                  </div>
                  {addr.email && (
                    <div className="flex items-start gap-2.5">
                      <FiMail
                        size={14}
                        className="text-neutral-45 mt-0.5 shrink-0"
                      />
                      <a
                        href={`mailto:${addr.email}`}
                        className="text-neutral-10 hover:text-primary-10 transition-colors truncate"
                      >
                        {addr.email}
                      </a>
                    </div>
                  )}
                  {addr.phoneNumber && (
                    <div className="flex items-start gap-2.5">
                      <FiPhone
                        size={14}
                        className="text-neutral-45 mt-0.5 shrink-0"
                      />
                      <a
                        href={`tel:${addr.phoneNumber}`}
                        className="text-neutral-10 hover:text-primary-10 transition-colors"
                      >
                        {addr.phoneNumber}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white border border-neutral-20 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="size-8 rounded-xl bg-primary-10/10 flex items-center justify-center">
                    <FiMapPin size={14} className="text-primary-10" />
                  </div>
                  <h3 className="text-sm font-bold text-neutral-10">
                    Shipping Address
                  </h3>
                </div>
                <div className="text-sm text-neutral-45 leading-relaxed">
                  <p className="text-neutral-10">{customerName}</p>
                  {addr.addressLine1 && <p>{addr.addressLine1}</p>}
                  {addr.addressLine2 && addr.addressLine2 !== "N/A" && (
                    <p>{addr.addressLine2}</p>
                  )}
                  <p>
                    {addr.city}
                    {addr.city && addr.state ? ", " : ""}
                    {addr.state}
                  </p>
                  {addr.pinCode && <p>PIN: {addr.pinCode}</p>}
                </div>
              </div>
            </section>

            {/* ═══ ORDER META ═══ */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <MetaCard
                icon={<FiHash size={14} />}
                label="Order ID"
                value={(order as any).orderId}
                accent="bg-blue-50 text-blue-600"
                onCopy={() => handleCopy((order as any).orderId, "Order ID")}
              />
              <MetaCard
                icon={<FiCalendar size={14} />}
                label="Placed On"
                value={new Date((order as any).createdAt).toLocaleString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  },
                )}
                accent="bg-primary-10/10 text-primary-10"
              />
              <MetaCard
                icon={<FiCreditCard size={14} />}
                label="Payment"
                value={`${(order as any).paymentMethod} · ${
                  (order as any).paymentStatus
                }`}
                accent="bg-green-50 text-green-600"
              />
              <MetaCard
                icon={<FiPackage size={14} />}
                label="Total Amount"
                value={`₹${(order as any).totalAmount?.toLocaleString("en-IN")}`}
                accent="bg-amber-50 text-amber-600"
              />
            </section>

            {/* ═══ TIMELINE ═══ */}
            <OrderStatusTimeline order={order as any} />

            {/* ═══ ITEMS ═══ */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="size-8 rounded-xl bg-neutral-20 flex items-center justify-center">
                  <FiPackage size={14} className="text-neutral-10" />
                </div>
                <h3 className="text-sm font-bold text-neutral-10">
                  Order Items ({items.length})
                </h3>
              </div>

              <div className="space-y-3">
                {items.map((item: any, idx: number) => {
                  const product = item.productId || {};
                  return (
                    <div
                      key={item._id || idx}
                      className="flex flex-col sm:flex-row gap-4 p-4 bg-white border border-neutral-20 rounded-2xl"
                    >
                      <div className="size-20 rounded-xl bg-neutral-20 overflow-hidden shrink-0">
                        {product.images?.[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FiPackage size={20} className="text-neutral-45" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-neutral-10">
                          {product.name || "Unknown product"}
                        </p>
                        {product.slug && (
                          <a
                            href={`/product/${product.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-primary-10 hover:underline inline-flex items-center gap-1 mt-0.5"
                          >
                            View product <FiExternalLink size={10} />
                          </a>
                        )}

                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                          {item.variantId && (
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-20 text-neutral-10">
                              Variant: {item.variantId.slice(-8)}
                            </span>
                          )}
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-20 text-neutral-10">
                            Qty: {item.quantity}
                          </span>
                          {item.packagingName && (
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary-10/10 text-primary-10">
                              {item.packagingName}{" "}
                              {item.packagingPrice > 0 &&
                                `(+₹${item.packagingPrice})`}
                            </span>
                          )}
                        </div>

                        {item.price && (
                          <p className="text-sm font-bold text-neutral-10 mt-2">
                            ₹{item.price.toLocaleString("en-IN")}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ═══ TRACKING ═══ */}
            {(order as any).trackingDetails && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <div className="size-8 rounded-xl bg-blue-50 flex items-center justify-center">
                    <FiTruck size={14} className="text-blue-600" />
                  </div>
                  <h3 className="text-sm font-bold text-neutral-10">
                    Tracking Details
                  </h3>
                </div>
                <div className="bg-white border border-neutral-20 rounded-2xl p-4 text-sm space-y-2">
                  {Object.entries((order as any).trackingDetails).map(
                    ([key, value]) => (
                      <div key={key} className="flex justify-between gap-4">
                        <span className="text-neutral-45 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}:
                        </span>
                        <span className="text-neutral-10 font-medium text-right">
                          {String(value)}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </section>
            )}

            {/* ═══ FOOTER META ═══ */}
            <section className="text-[11px] text-neutral-45 pt-4 border-t border-neutral-20 space-y-1">
              <p>
                <span className="font-medium">Internal ID:</span>{" "}
                {(order as any)._id}
              </p>
              <p>
                <span className="font-medium">Last updated:</span>{" "}
                {new Date((order as any).updatedAt).toLocaleString("en-IN")}
              </p>
              <p>
                <span className="font-medium">Coupon:</span>{" "}
                {(order as any).couponCodeId || "None"}
              </p>
              <p>
                <span className="font-medium">User ID:</span>{" "}
                {(order as any).userId || "Guest order"}
              </p>
              {(order as any).paidAt && (
                <p>
                  <span className="font-medium">Paid At:</span>{" "}
                  {new Date((order as any).paidAt).toLocaleString("en-IN")}
                </p>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Meta card ────────────────────────────────────────────
const MetaCard = ({
  icon,
  label,
  value,
  accent,
  onCopy,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: string;
  onCopy?: () => void;
}) => (
  <div className="bg-white border border-neutral-20 rounded-2xl p-3">
    <div
      className={`size-8 rounded-xl flex items-center justify-center mb-2 ${accent}`}
    >
      {icon}
    </div>
    <p className="text-[10px] uppercase tracking-wider text-neutral-45 font-semibold">
      {label}
    </p>
    <div className="flex items-center gap-1 mt-0.5">
      <p className="text-xs font-semibold text-neutral-10 truncate">{value}</p>
      {onCopy && (
        <button
          onClick={onCopy}
          className="p-0.5 rounded text-neutral-45 hover:text-primary-10 transition-colors shrink-0"
          aria-label="Copy"
        >
          <FiCopy size={10} />
        </button>
      )}
    </div>
  </div>
);

export default OrderDetailsModal;
