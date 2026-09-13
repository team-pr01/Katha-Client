import { useForm } from "react-hook-form";
import type { TAddress } from "../../../../pages/Dashboard/ManageAddress/ManageAddress";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Button from "../../../Reusable/Button/Button";
import {
  useAddAddressMutation,
  useUpdateAddressMutation,
} from "../../../../redux/Features/Address/addressApi";
import { useEffect } from "react";

interface AddOrEditAddressProps {
  initialData?: TAddress | null;
  onCancel: () => void;
  modalType: "add" | "edit";
}

const AddOrEditAddress = ({
  initialData,
  onCancel,
  modalType,
}: AddOrEditAddressProps) => {
  const [addAddress] = useAddAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<TAddress>();

  useEffect(() => {
    if (modalType === "edit" && initialData) {
      setValue("name", initialData.name);
      setValue("phoneNumber", initialData.phoneNumber);
      setValue("email", initialData.email);
      setValue("addressLine1", initialData.addressLine1);
      setValue("addressLine2", initialData.addressLine2);
      setValue("city", initialData.city);
      setValue("state", initialData.state);
      setValue("pinCode", initialData.pinCode);
      setValue("addressType", initialData.addressType);
      setValue("isDefault", initialData.isDefault);
    } else {
      reset();
    }
  }, []);

  const onSubmit = async (data: TAddress) => {
    try {
      if (modalType === "edit") {
        await updateAddress(data).unwrap();
      } else {
        await addAddress(data).unwrap();
      }
      onCancel();
    } catch (error) {
      console.error("Error adding or updating address:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Header */}
      <h2 className="text-2xl font-Satoshi font-semibold text-center text-neutral-10">
        {modalType === "edit" ? "Edit Address" : "Add New Address"}
      </h2>
      <p className="text-sm text-center text-neutral-45 mt-1 mb-6">
        {modalType === "edit"
          ? "Update your delivery address details"
          : "Enter your delivery address details"}
      </p>

      {/* Form Fields */}
      <div className="flex flex-col gap-4">
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          error={errors.name}
          {...register("name", {
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
          label="Email"
          placeholder="Enter your email address"
          error={errors.email}
          {...register("email")}
          isRequired={false}
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
              <option value="Office">Office</option>
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
          label={modalType === "edit" ? "Update Address" : "Save Address"}
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
