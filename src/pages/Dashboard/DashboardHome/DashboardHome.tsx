import {
  FiUser,
  FiEdit2,
  FiMapPin,
  FiPackage,
  FiChevronRight,
  FiMail,
  FiPhone,
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiTruck,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useGetStatsQuery } from "../../../redux/Features/User/userApi";
import { formatDate } from "../../../utils/formatDate";
import EditProfile from "../../../components/DashboardComponents/DashboardHomePage/EditProfile/EditProfile";
import { useState } from "react";
import DashboardHomeSkeletonLoader from "../../../components/Loaders/DashboardHomeSkeletonLoader/DashboardHomeSkeletonLoader";

const DashboardHome = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const { data, isLoading, isFetching } = useGetStatsQuery({});
  const stats = data?.data || {};
  const user = stats?.user || {};
  const deliveryAddress = stats?.deliveryAddress || {};
  const orderStats = stats?.stats || {};
  const recentOrders = stats?.recentOrders || [];

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <FiCheckCircle className="text-green-600" size={14} />;
      case "shipped":
        return <FiTruck className="text-blue-600" size={14} />;
      case "processing":
        return <FiClock className="text-yellow-600" size={14} />;
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
      default:
        return "bg-neutral-20 text-neutral-45 border-neutral-50";
    }
  };

  if (isLoading || isFetching) {
    return <DashboardHomeSkeletonLoader />;
  }

  return (
    <div className="space-y-6 font-Manrope">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar */}
          <div className="size-24 rounded-full bg-primary-10/10 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
            {user?.profilePicture ? (
              <img
                src={user?.profilePicture}
                alt={user?.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <FiUser className="text-primary-10" size={40} />
            )}
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-neutral-10">
                  {user?.name}
                </h2>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-neutral-45">
                  <span className="flex items-center gap-1.5">
                    <FiMail size={14} className="text-primary-10" />
                    {user?.email || "N/A"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiPhone size={14} className="text-primary-10" />
                    {user?.phoneNumber}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiCalendar size={14} className="text-primary-10" />
                    Member since {formatDate(user?.memberSince)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="hidden md:flex items-center gap-2 px-4 py-2 border-2 border-primary-10 text-primary-10 rounded-xl text-sm font-medium hover:bg-primary-10 hover:text-white transition-all"
              >
                <FiEdit2 size={14} />
                Edit Profile
              </button>
            </div>

            {/* Mobile Edit Button */}
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="md:hidden flex items-center justify-center gap-2 mt-4 px-4 py-2 border-2 border-primary-10 text-primary-10 rounded-xl text-sm font-medium hover:bg-primary-10 hover:text-white transition-all w-full"
            >
              <FiEdit2 size={14} />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-10/10 flex items-center justify-center">
              <FiPackage className="text-primary-10" size={18} />
            </div>
            <div>
              <p className="text-xs text-neutral-45">Total Orders</p>
              <p className="text-lg font-bold text-neutral-10">
                {orderStats?.totalOrders}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
              <FiClock className="text-yellow-600" size={18} />
            </div>
            <div>
              <p className="text-xs text-neutral-45">Processing</p>
              <p className="text-lg font-bold text-neutral-10">
                {orderStats?.processing}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <FiTruck className="text-blue-600" size={18} />
            </div>
            <div>
              <p className="text-xs text-neutral-45">Shipped</p>
              <p className="text-lg font-bold text-neutral-10">
                {orderStats?.shipped}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <FiCheckCircle className="text-green-600" size={18} />
            </div>
            <div>
              <p className="text-xs text-neutral-45">Delivered</p>
              <p className="text-lg font-bold text-neutral-10">
                {orderStats?.delivered}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders + Address */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-10">
              Recent Orders
            </h3>
            <Link
              to="/dashboard/my-orders"
              className="text-sm text-primary-10 hover:text-[#d4892a] font-medium flex items-center gap-1 transition-colors"
            >
              View All
              <FiChevronRight size={16} />
            </Link>
          </div>

          <div className="space-y-3">
            {recentOrders?.map((order: any) => (
              <div
                key={order.orderId}
                className="flex items-center gap-4 p-3 rounded-xl border border-neutral-20 hover:border-primary-10/30 hover:bg-neutral-20/30 transition-all group cursor-pointer"
              >
                <img
                  src={order?.orderedItems[0].variant.images[0]}
                  alt={order?.orderId}
                  className="w-14 h-14 rounded-lg object-cover bg-neutral-20"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-neutral-10">
                      #{order?.orderId}
                    </p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 capitalize ${getStatusColor(
                        order?.orderStatus,
                      )}`}
                    >
                      {getStatusIcon(order?.orderStatus)}
                      {order?.orderStatus}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-45 mt-0.5">
                    {order?.itemCount} item{order?.itemCount > 1 ? "s" : ""} •{" "}
                    {formatDate(order?.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-neutral-10">
                    ₹{order?.totalAmount}
                  </p>
                  <FiChevronRight
                    size={16}
                    className="ml-auto mt-1 text-neutral-45 group-hover:text-primary-10 group-hover:translate-x-0.5 transition-all"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Address Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-10">
              Delivery Address
            </h3>
            <Link
              to="/dashboard/address"
              className="text-sm text-primary-10 hover:text-[#d4892a] font-medium flex items-center gap-1 transition-colors"
            >
              Edit
              <FiChevronRight size={16} />
            </Link>
          </div>

          <div className="flex items-start gap-3 p-4 bg-neutral-20/50 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-primary-10/10 flex items-center justify-center shrink-0">
              <FiMapPin className="text-primary-10" size={18} />
            </div>
            <div className="text-sm">
              <p className="font-medium text-neutral-10">
                {deliveryAddress?.name}
              </p>
              <p className="text-neutral-45 mt-1">
                {deliveryAddress?.addressLine1}
              </p>
              <p className="text-neutral-45">{deliveryAddress?.addressLine2}</p>
              <p className="text-neutral-45">
                {deliveryAddress?.city}, {deliveryAddress?.state}
              </p>
              <p className="text-neutral-45">
                Pincode: {deliveryAddress?.pinCode}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-4 pt-4 border-t border-neutral-20">
            <h4 className="text-sm font-semibold text-neutral-10 mb-3">
              Quick Actions
            </h4>
            <div className="space-y-2">
              <Link
                to="/track-order"
                className="flex items-center justify-between p-2.5 rounded-lg hover:bg-neutral-20 transition-colors group"
              >
                <span className="flex items-center gap-2 text-sm text-neutral-10">
                  <FiPackage size={16} className="text-primary-10" />
                  Track Orders
                </span>
                <FiChevronRight
                  size={16}
                  className="text-neutral-45 group-hover:text-primary-10 group-hover:translate-x-0.5 transition-all"
                />
              </Link>
              <Link
                to="/dashboard/address"
                className="flex items-center justify-between p-2.5 rounded-lg hover:bg-neutral-20 transition-colors group"
              >
                <span className="flex items-center gap-2 text-sm text-neutral-10">
                  <FiMapPin size={16} className="text-primary-10" />
                  Manage Address
                </span>
                <FiChevronRight
                  size={16}
                  className="text-neutral-45 group-hover:text-primary-10 group-hover:translate-x-0.5 transition-all"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <EditProfile
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        userData={user}
      />
    </div>
  );
};

export default DashboardHome;
