import { useState } from "react";
import {
  FiMapPin,
  FiEdit2,
  FiPlus,
  FiTrash2,
  FiUser,
  FiPhone,
  FiHome,
  FiCheck,
} from "react-icons/fi";
import Modal from "../../../components/Reusable/Modal copy/Modal";
import AddOrEditAddress from "../../../components/DashboardComponents/ManageAddressPage/AddOrEditAddress/AddOrEditAddress";

// Types
export interface TAddress {
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pinCode: string;
  addressType?: string;
  isDefault?: boolean;
}

const ManageAddress = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<TAddress | null>({
    fullName: "John Doe",
    phoneNumber: "9876543210",
    addressLine1: "123 Main Street",
    addressLine2: "Apartment 4B",
    city: "Mumbai",
    state: "Maharashtra",
    pinCode: "400001",
    addressType: "Home",
    isDefault: true,
  });

  const handleEditAddress = () => {
    setIsModalOpen(true);
  };

  const handleAddAddress = () => {
    setAddress(null);
    setIsModalOpen(true);
  };

  const handleSaveAddress = (data: TAddress) => {
    setAddress({ ...data, isDefault: true });
    setIsModalOpen(false);
  };

  const handleDeleteAddress = () => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddress(null);
    }
  };

  return (
    <div className="space-y-6 font-Manrope">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-10 flex items-center gap-2">
              <FiMapPin className="text-primary-10" size={24} />
              Manage Address
            </h1>
            <p className="text-sm text-neutral-45 mt-1">
              Add or update your delivery address
            </p>
          </div>

          {address && (
            <button
              onClick={handleAddAddress}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-10 text-white rounded-xl text-sm font-medium hover:bg-[#d4892a] transition-all shadow-sm hover:shadow-md"
            >
              <FiPlus size={16} />
              Add New Address
            </button>
          )}
        </div>
      </div>

      {/* Address Card */}
      {address ? (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-10/10 flex items-center justify-center">
                <FiMapPin className="text-primary-10" size={18} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-neutral-10 flex items-center gap-2">
                  Delivery Address
                  {address.isDefault && (
                    <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                      <FiCheck size={10} />
                      Default
                    </span>
                  )}
                </h3>
                <p className="text-xs text-neutral-45">
                  This is your primary delivery address
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleEditAddress}
                className="p-2 text-neutral-45 hover:text-primary-10 hover:bg-primary-10/5 rounded-lg transition-colors"
                aria-label="Edit address"
              >
                <FiEdit2 size={16} />
              </button>
              <button
                onClick={handleDeleteAddress}
                className="p-2 text-neutral-45 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Delete address"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>

          {/* Address Details */}
          <div className="bg-neutral-20/50 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <FiUser className="text-primary-10 flex-shrink-0" size={16} />
              <span className="font-medium text-neutral-10">
                {address.fullName}
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <FiPhone className="text-primary-10 flex-shrink-0" size={16} />
              <span className="text-neutral-10">{address.phoneNumber}</span>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <FiHome
                className="text-primary-10 flex-shrink-0 mt-0.5"
                size={16}
              />
              <div className="text-neutral-45 leading-relaxed">
                <p>{address.addressLine1}</p>
                {address.addressLine2 && <p>{address.addressLine2}</p>}
                <p>
                  {address.city}, {address.state} - {address.pinCode}
                </p>
              </div>
            </div>

            {address.addressType && (
              <div className="flex items-center gap-2 pt-2 border-t border-neutral-20">
                <span className="text-xs text-neutral-45">Address Type:</span>
                <span className="text-xs font-medium text-primary-10 bg-primary-10/10 px-2 py-0.5 rounded-full">
                  {address.addressType}
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 rounded-full bg-neutral-20 flex items-center justify-center mx-auto mb-6">
              <FiMapPin size={48} className="text-neutral-45" />
            </div>
            <h3 className="text-xl font-bold text-neutral-10 mb-2">
              No Address Added
            </h3>
            <p className="text-neutral-45 text-sm mb-6">
              Add a delivery address to receive your orders.
            </p>
            <button
              onClick={handleAddAddress}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-10 text-white rounded-xl font-medium hover:bg-[#d4892a] transition-all shadow-md hover:shadow-lg"
            >
              <FiPlus size={18} />
              Add Address
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Address Modal */}
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <AddOrEditAddress
          initialData={address}
          onSave={handleSaveAddress}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ManageAddress;
