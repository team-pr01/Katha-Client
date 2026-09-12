import { useForm } from "react-hook-form";
import type { TAddress } from "../../../../pages/Dashboard/ManageAddress/ManageAddress";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Button from "../../../Reusable/Button/Button";

interface AddOrEditAddressProps {
  initialData?: TAddress | null;
  onSave: (data: TAddress) => void;
  onCancel: () => void;
}

const AddOrEditAddress = ({
  initialData,
  onSave,
  onCancel,
}: AddOrEditAddressProps) => {
  const isEditMode = !!initialData;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TAddress>({
    defaultValues: {
      fullName: initialData?.fullName || "",
      phoneNumber: initialData?.phoneNumber || "",
      addressLine1: initialData?.addressLine1 || "",
      addressLine2: initialData?.addressLine2 || "",
      city: initialData?.city || "",
      state: initialData?.state || "",
      pinCode: initialData?.pinCode || "",
      addressType: initialData?.addressType || "Home",
      isDefault: initialData?.isDefault || true,
    },
  });

  const onSubmit = async (data: TAddress) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Header */}
      <h2 className="text-2xl font-Satoshi font-semibold text-center text-neutral-10">
        {isEditMode ? "Edit Address" : "Add New Address"}
      </h2>
      <p className="text-sm text-center text-neutral-45 mt-1 mb-6">
        {isEditMode
          ? "Update your delivery address details"
          : "Enter your delivery address details"}
      </p>

      {/* Form Fields */}
      <div className="flex flex-col gap-4">
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          error={errors.fullName}
          {...register("fullName", {
            required: "Full name is required",
          })}
        />

        <TextInput
          label="Phone Number"
          placeholder="Enter your phone number"
          type="tel"
          error={errors.phoneNumber}
          {...register("phoneNumber", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Please enter a valid 10-digit phone number",
            },
          })}
        />

        <TextInput
          label="Address Line 1"
          placeholder="House no., Building, Street"
          error={errors.addressLine1}
          {...register("addressLine1", {
            required: "Address is required",
          })}
        />

        <TextInput
          label="Address Line 2 (Optional)"
          placeholder="Apartment, Suite, Landmark"
          error={errors.addressLine2}
          {...register("addressLine2")}
        />

        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="City"
            placeholder="City"
            error={errors.city}
            {...register("city", {
              required: "City is required",
            })}
          />

          <TextInput
            label="State"
            placeholder="State"
            error={errors.state}
            {...register("state", {
              required: "State is required",
            })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="Pin Code"
            placeholder="110001"
            type="text"
            error={errors.pinCode}
            {...register("pinCode", {
              required: "Pin code is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Please enter a valid 6-digit pin code",
              },
            })}
          />

          <div className="flex flex-col">
            <label className="block text-sm font-medium text-neutral-10 mb-1">
              Address Type
            </label>
            <select
              {...register("addressType")}
              className="w-full px-4 py-2.5 border border-neutral-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent bg-white"
            >
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mt-6">
        <Button
          type="button"
          label="Cancel"
          variant="secondary"
          className="flex-1 py-3"
          onClick={onCancel}
          icon={false}
        />
        <Button
          type="submit"
          label={isEditMode ? "Update Address" : "Save Address"}
          variant="primary"
          className="flex-1 py-3"
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
          icon={false}
        />
      </div>
    </form>
  );
};

export default AddOrEditAddress;