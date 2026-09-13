import { BiArrowBack } from "react-icons/bi";
import {
  FiAlertCircle,
  FiBox,
  FiCalendar,
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiHome,
  FiMapPin,
  FiPackage,
  FiRotateCcw,
  FiTruck,
  FiXCircle,
} from "react-icons/fi";
import { formatDate } from "../../utils/formatDate";

const OrderTrackingData = ({ orderData, setOrderData }: any) => {
  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return <FiClock className="text-neutral-45" size={14} />;
      case "confirmed":
        return <FiCheckCircle className="text-indigo-600" size={14} />;
      case "processing":
        return <FiPackage className="text-yellow-600" size={14} />;
      case "shipped":
        return <FiTruck className="text-blue-600" size={14} />;
      case "delivered":
        return <FiCheckCircle className="text-green-600" size={14} />;
      case "cancelled":
        return <FiXCircle className="text-red-600" size={14} />;
      case "returned":
        return <FiRotateCcw className="text-orange-600" size={14} />;
      default:
        return <FiPackage className="text-neutral-45" size={14} />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-neutral-20 text-neutral-10 border-neutral-50";
      case "confirmed":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "processing":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "delivered":
        return "bg-green-50 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      case "returned":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-neutral-20 text-neutral-45 border-neutral-50";
    }
  };

  return (
    <div className="space-y-6">
      <button onClick={() => setOrderData(null)} className="text-neutral-45 hover:text-primary-10 flex items-center gap-2">
        {" "}
        <BiArrowBack size={16} /> Go back
      </button>
      {/* Order Summary Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-neutral-50">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-neutral-45 mb-1">
              Order ID
            </p>
            <h2 className="text-xl font-bold text-neutral-10 mb-3">
              {orderData.orderId}
            </h2>

            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`text-xs px-3 py-1 rounded-full border flex items-center gap-1.5 font-semibold ${getStatusColor(
                  orderData.orderStatus,
                )}`}
              >
                {getStatusIcon(orderData.orderStatus)}
                {orderData.orderStatus}
              </span>
              <span className="text-xs text-neutral-45 flex items-center gap-1">
                <FiCalendar size={12} />
                Expected: 
                {/* {orderData.expectedDelivery} */}
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs uppercase tracking-wider text-neutral-45 mb-1">
              Total Amount
            </p>
            <p className="text-2xl font-bold text-neutral-10">
              ₹{orderData.totalAmount}
            </p>
            {/* <p className="text-xs text-neutral-45 mt-1">
              {orderData.items} item{orderData.items > 1 ? "s" : ""}
            </p> */}
          </div>
        </div>

        {/* <div className="mt-5 pt-5 border-t border-neutral-20">
          <div className="flex items-center gap-2">
            <FiMapPin size={16} className="text-primary-10" />
            <div>
              <p className="text-xs text-neutral-45">Current Location</p>
              <p className="text-sm font-medium text-neutral-10">
                {orderData.currentLocation}
              </p>
            </div>
          </div>
        </div> */}
      </div>

      {/* Tracking Timeline */}
      <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-neutral-50">
        <h3 className="text-lg font-semibold text-neutral-10 mb-6 flex items-center gap-2">
          <FiPackage className="text-primary-10" size={20} />
          Tracking Timeline
        </h3>

        <div className="relative">
          <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-neutral-20" />

          <div className="space-y-6">
            {orderData.timeline.map((step: any) => (
              <div key={step.id} className="relative flex gap-4">
                <div
                  className={`
                                    relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0
                                    transition-all
                                    ${
                                      step.status === "completed"
                                        ? "bg-green-500 text-white shadow-md shadow-green-500/30"
                                        : step.status === "current"
                                          ? "bg-primary-10 text-white shadow-md shadow-primary-10/30 ring-4 ring-primary-10/20"
                                          : "bg-neutral-20 text-neutral-45"
                                    }
                                  `}
                >
                  {step.status === "completed" ? (
                    <FiCheckCircle size={18} />
                  ) : step.status === "current" ? (
                    <FiTruck size={18} />
                  ) : step.id === 1 ? (
                    <FiBox size={18} />
                  ) : step.id === 2 ? (
                    <FiPackage size={18} />
                  ) : step.id === 5 ? (
                    <FiMapPin size={18} />
                  ) : step.id === 6 ? (
                    <FiHome size={18} />
                  ) : (
                    <FiClock size={18} />
                  )}

                  {step.status === "current" && (
                    <span className="absolute inset-0 rounded-full bg-primary-10 animate-ping opacity-30" />
                  )}
                </div>

                <div className="flex-1 pb-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4
                      className={`
                                        text-sm font-semibold
                                        ${
                                          step.status === "pending"
                                            ? "text-neutral-45"
                                            : "text-neutral-10"
                                        }
                                      `}
                    >
                      {step.step}
                      {step.status === "current" && (
                        <span className="ml-2 text-xs bg-primary-10/10 text-primary-10 px-2 py-0.5 rounded-full font-medium">
                          Current
                        </span>
                      )}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-neutral-45">
                      <FiClock size={11} />
                      {step.date ? formatDate(step.date) : "Pending"}
                    </div>
                  </div>
                  <p className="text-xs mt-1 text-neutral-45">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-neutral-50">
          <h3 className="text-sm font-semibold text-neutral-10 mb-3 flex items-center gap-2">
            <FiMapPin className="text-primary-10" size={16} />
            Shipping Address
          </h3>
          <p className="text-sm text-neutral-45 leading-relaxed">
            {orderData.shippingAddress.addressLine1}, {orderData.shippingAddress.city}, {orderData.shippingAddress.state}, {orderData.shippingAddress.zipCode}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border border-neutral-50">
          <h3 className="text-sm font-semibold text-neutral-10 mb-3 flex items-center gap-2">
            <FiTruck className="text-primary-10" size={16} />
            Delivery Information
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-45">Courier</span>
              <span className="text-neutral-10 font-medium">
                {orderData.courier || "Not Available"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-45">Payment</span>
              <span className="text-neutral-10 font-medium">
                {orderData.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-45">Expected</span>
              <span className="text-neutral-10 font-medium">
                {orderData.expectedDelivery || "Not Available"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-neutral-50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-10/10 flex items-center justify-center shrink-0">
              <FiAlertCircle className="text-primary-10" size={18} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-10">
                Need help with your order?
              </h4>
              <p className="text-xs text-neutral-45 mt-0.5">
                Our support team is here to assist you
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-primary-10 text-white rounded-lg text-sm font-medium hover:bg-[#d4892a] transition-all flex items-center gap-1.5 whitespace-nowrap">
            Contact Support
            <FiChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingData;
