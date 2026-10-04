import {
  FiCheckCircle,
  FiClock,
  FiTruck,
  FiXCircle,
  FiRotateCcw,
  FiHome,
} from "react-icons/fi";
import type { TOrderStatus } from "../../../../types/orders.types";

interface OrderStatusTimelineProps {
  order: any;
}

interface Step {
  status: TOrderStatus;
  label: string;
  timestamp?: string;
  icon: React.ReactNode;
}

const OrderStatusTimeline = ({ order }: OrderStatusTimelineProps) => {
  const allSteps: Step[] = [
    {
      status: "pending",
      label: "Order Placed",
      timestamp: order.createdAt,
      icon: <FiClock size={16} />,
    },
    {
      status: "confirmed",
      label: "Order Confirmed",
      timestamp: order.confirmedAt,
      icon: <FiCheckCircle size={16} />,
    },
    {
      status: "shipped",
      label: "Shipped",
      timestamp: order.shippedAt,
      icon: <FiTruck size={16} />,
    },
    {
      status: "delivered",
      label: "Delivered",
      timestamp: order.deliveredAt,
      icon: <FiHome size={16} />,
    },
  ];

  // Handle cancelled / returned — show as terminal step instead
  const isCancelled = order.orderStatus === "cancelled";
  const isReturned = order.orderStatus === "returned";

  const terminalStep = isCancelled
    ? {
        status: "cancelled" as TOrderStatus,
        label: "Cancelled",
        timestamp: order.cancelledAt,
        icon: <FiXCircle size={16} />,
      }
    : isReturned
      ? {
          status: "returned" as TOrderStatus,
          label: "Returned",
          timestamp: order.returnedAt,
          icon: <FiRotateCcw size={16} />,
        }
      : null;

  const steps = terminalStep ? [allSteps[0], terminalStep] : allSteps;

  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <div className="size-8 rounded-xl bg-neutral-20 flex items-center justify-center">
          <FiClock size={14} className="text-neutral-10" />
        </div>
        <h3 className="text-sm font-bold text-neutral-10">Order Timeline</h3>
      </div>

      <div className="bg-white border border-neutral-20 rounded-2xl p-5">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-2 bottom-2 w-px bg-neutral-20" />

          <div className="space-y-5">
            {steps.map((step, idx) => {
              const done = Boolean(step.timestamp);
              const isCurrent =
                order.orderStatus === step.status && !terminalStep;

              return (
                <div key={idx} className="relative flex items-start gap-4">
                  <div
                    className={`
                      relative z-10 size-8 rounded-full flex items-center justify-center shrink-0
                      ${
                        done
                          ? step.status === "cancelled"
                            ? "bg-red-500 text-white"
                            : step.status === "returned"
                              ? "bg-orange-500 text-white"
                              : "bg-green-500 text-white"
                          : "bg-neutral-20 text-neutral-45"
                      }
                      ${isCurrent ? "ring-4 ring-primary-10/20" : ""}
                    `}
                  >
                    {step.icon}
                  </div>

                  <div className="flex-1 pt-1">
                    <p
                      className={`text-sm font-semibold ${
                        done ? "text-neutral-10" : "text-neutral-45"
                      }`}
                    >
                      {step.label}
                      {isCurrent && (
                        <span className="ml-2 text-[10px] bg-primary-10/10 text-primary-10 px-2 py-0.5 rounded-full font-medium">
                          Current
                        </span>
                      )}
                    </p>
                    <p className="text-[11px] text-neutral-45 mt-0.5">
                      {step.timestamp
                        ? new Date(step.timestamp).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Pending"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderStatusTimeline;
