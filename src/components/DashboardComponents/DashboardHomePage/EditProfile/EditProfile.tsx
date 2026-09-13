import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiUser, FiCamera, FiX } from "react-icons/fi";
import { useUpdateProfileMutation } from "../../../../redux/Features/User/userApi";
import Modal from "../../../Reusable/Modal/Modal";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Button from "../../../Reusable/Button/Button";

// Types
export interface TUserProfile {
  _id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  avatar?: string;
}

interface EditProfileProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userData: TUserProfile | null;
}

const EditProfile = ({
  isModalOpen,
  setIsModalOpen,
  userData,
}: EditProfileProps) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUserProfile>({
    defaultValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      phoneNumber: userData?.phoneNumber || "",
    },
  });

  // Reset form and avatar when userData changes or modal opens
  useEffect(() => {
    if (userData && isModalOpen) {
      reset({
        name: userData.name || "",
        email: userData.email || "",
        phoneNumber: userData.phoneNumber || "",
      });
      setAvatarPreview(userData.avatar || "");
      setAvatarFile(null);
    }
  }, [userData, isModalOpen, reset]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(userData?.avatar || "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: TUserProfile) => {
    try {
      // 👇 Build FormData
      const formData = new FormData();
      formData.append("name", data.name.trim());
      formData.append("email", data.email.trim());
      formData.append("phoneNumber", data.phoneNumber.trim());

      // Only append file if a new one is selected
      if (avatarFile) {
        formData.append("file", avatarFile);
      }

      // Optional: debug — see what's being sent
      // for (const [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }

      const response = await updateProfile(formData).unwrap();

      if (response?.success) {
        toast.success("Profile updated successfully!");
        setIsModalOpen(false);
        setAvatarFile(null);
      }
    } catch (err: any) {
      console.error("Update profile error:", err);
      toast.error(
        err?.data?.message || "Failed to update profile. Please try again."
      );
    }
  };

  const handleCancel = () => {
    reset();
    setAvatarFile(null);
    setAvatarPreview(userData?.avatar || "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setIsModalOpen(false);
  };

  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <form onSubmit={handleSubmit(onSubmit)} className="font-Manrope">
        {/* Header */}
        <h2 className="text-2xl font-Satoshi font-semibold text-center text-neutral-10">
          Edit Profile
        </h2>
        <p className="text-sm text-center text-neutral-45 mt-1 mb-6">
          Update your personal information
        </p>

        {/* Avatar Upload */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            {/* Avatar Preview */}
            <div className="w-24 h-24 rounded-full overflow-hidden bg-primary-10/10 flex items-center justify-center border-4 border-white shadow-lg">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FiUser className="text-primary-10" size={40} />
              )}
            </div>

            {/* Camera Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary-10 text-white flex items-center justify-center hover:bg-[#d4892a] transition-all shadow-md"
              aria-label="Change avatar"
            >
              <FiCamera size={14} />
            </button>

            {/* Remove Button (only if a new file is selected) */}
            {avatarFile && (
              <button
                type="button"
                onClick={handleRemoveAvatar}
                className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-all shadow-md"
                aria-label="Remove avatar"
              >
                <FiX size={12} />
              </button>
            )}

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-3 text-xs text-primary-10 font-medium hover:text-[#d4892a] transition-colors"
          >
            {avatarFile ? "Change photo" : "Upload new photo"}
          </button>
          <p className="text-[10px] text-neutral-45 mt-1">
            JPG, PNG or GIF (Max 5MB)
          </p>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-4">
          {/* Name */}
          <TextInput
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.name}
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
          />

          {/* Email */}
          <TextInput
            label="Email Address"
            placeholder="you@example.com"
            type="email"
            error={errors.email}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
          />

          {/* Phone Number */}
          <TextInput
            label="Phone Number"
            placeholder="+91 98765 43210"
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
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-6">
          <Button
            type="button"
            label="Cancel"
            variant="secondary"
            className="flex-1 py-3"
            onClick={handleCancel}
            icon={false}
            isDisabled={isLoading}
          />
          <Button
            type="submit"
            label={isLoading ? "Updating..." : "Save Changes"}
            variant="primary"
            className="flex-1 py-3"
            isLoading={isLoading}
            isDisabled={isLoading}
            icon={false}
          />
        </div>
      </form>
    </Modal>
  );
};

export default EditProfile;