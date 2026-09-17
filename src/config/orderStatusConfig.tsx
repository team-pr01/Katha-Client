import {
  FiClock,
  FiCheckCircle,
  FiPackage,
  FiTruck,
  FiXCircle,
  FiRotateCcw,
} from "react-icons/fi";
import type { TOrderStatus } from "../types/orders.types";

export const orderStatusConfig: Record<
  TOrderStatus,
  { label: string; className: string; dot: string; icon: React.ReactNode }
> = {
  pending: {
    label: "Pending",
    className: "bg-neutral-20 text-neutral-10",
    dot: "bg-neutral-45",
    icon: <FiClock size={12} />,
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-indigo-50 text-indigo-700",
    dot: "bg-indigo-500",
    icon: <FiCheckCircle size={12} />,
  },
  processing: {
    label: "Processing",
    className: "bg-amber-50 text-amber-700",
    dot: "bg-amber-500",
    icon: <FiPackage size={12} />,
  },
  shipped: {
    label: "Shipped",
    className: "bg-blue-50 text-blue-700",
    dot: "bg-blue-500",
    icon: <FiTruck size={12} />,
  },
  delivered: {
    label: "Delivered",
    className: "bg-green-50 text-green-700",
    dot: "bg-green-500",
    icon: <FiCheckCircle size={12} />,
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700",
    dot: "bg-red-500",
    icon: <FiXCircle size={12} />,
  },
  returned: {
    label: "Returned",
    className: "bg-orange-50 text-orange-700",
    dot: "bg-orange-500",
    icon: <FiRotateCcw size={12} />,
  },
};

export const orderStatusOptions: { value: TOrderStatus | "all"; label: string }[] = [
  { value: "all", label: "All statuses" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
  { value: "returned", label: "Returned" },
];