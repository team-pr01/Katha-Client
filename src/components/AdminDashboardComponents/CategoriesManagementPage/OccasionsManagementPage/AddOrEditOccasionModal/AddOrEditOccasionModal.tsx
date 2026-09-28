/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiX, FiImage, FiPlus, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import type { TOccasion } from "../../../../../types/occasion.type";
import {
  useAddOccasionMutation,
  useUpdateOccasionMutation,
} from "../../../../../redux/Features/Occation/occasionApi";
import TextInput from "../../../../Reusable/TextInput/TextInput";
import Button from "../../../../Reusable/Button/Button";

// ─── Types ────────────────────────────────────────────────
type TOccasionForm = {
  name: string;
  description: string;
  isActive: boolean;
  subOccasionName: string;
  subOccasionDescription: string;
};

type TSubOccasionForm = {
  name: string;
  description?: string;
};

interface AddOrEditOccasionModalProps {
  isOpen: boolean;
  onClose: () => void;
  occasion?: TOccasion | null;
}

const AddOrEditOccasionModal = ({
  isOpen,
  onClose,
  occasion,
}: AddOrEditOccasionModalProps) => {
  const isEditMode = Boolean(occasion?._id);

  const [addOccasion, { isLoading: isAdding }] = useAddOccasionMutation();
  const [updateOccasion, { isLoading: isUpdating }] =
    useUpdateOccasionMutation();
  const isLoading = isAdding || isUpdating;

  const [submitError, setSubmitError] = useState<string | null>(null);

  // Sub-occasions list
  const [subOccasions, setSubOccasions] = useState<TSubOccasionForm[]>([]);

  // Image
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TOccasionForm>({
    defaultValues: {
      name: "",
      description: "",
      isActive: true,
      subOccasionName: "",
      subOccasionDescription: "",
    },
  });

  // Watch sub-occasion inputs
  const subNameInput = watch("subOccasionName");
  const subDescInput = watch("subOccasionDescription");

  // ─── Prefill ─────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    if (isEditMode && occasion) {
      reset({
        name: occasion.name || "",
        description: occasion.description || "",
        isActive: occasion.isActive ?? true,
        subOccasionName: "",
        subOccasionDescription: "",
      });
      setSubOccasions(
        (occasion.subOccasions || []).map((s) => ({
          name: s.name,
          description: s.description || "",
        })),
      );
      setImagePreview(occasion.imageUrl || "");
    } else {
      reset({
        name: "",
        description: "",
        isActive: true,
        subOccasionName: "",
        subOccasionDescription: "",
      });
      setSubOccasions([]);
      setImagePreview("");
    }

    setImageFile(null);
    setSubmitError(null);
  }, [isOpen, isEditMode, occasion, reset]);

  // ─── Sub-occasion handlers ───────────────────────────
  const handleAddSubOccasion = () => {
    const name = subNameInput?.trim();
    if (!name) return;

    if (subOccasions.some((s) => s.name.toLowerCase() === name.toLowerCase())) {
      toast.error("Sub-occasion already added");
      return;
    }

    setSubOccasions((prev) => [
      ...prev,
      { name, description: subDescInput?.trim() || "" },
    ]);

    // Clear the input fields via RHF
    setValue("subOccasionName", "");
    setValue("subOccasionDescription", "");
  };

  const removeSubOccasion = (index: number) => {
    setSubOccasions((prev) => prev.filter((_, i) => i !== index));
  };

  // ─── Image handler ───────────────────────────────────
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ─── Submit ──────────────────────────────────────────
  const handleSubmitOccasion = async (formData: TOccasionForm) => {
    setSubmitError(null);

    if (!isEditMode && !imageFile) {
      setSubmitError("Please upload an occasion image");
      return;
    }

    try {
      const payload = new FormData();
      payload.append("name", formData.name.trim());
      payload.append("description", formData.description.trim());
      payload.append("isActive", String(formData.isActive));
      payload.append("subOccasions", JSON.stringify(subOccasions));

      if (imageFile) {
        payload.append("file", imageFile);
      }

      if (isEditMode && occasion?._id) {
        await updateOccasion({ id: occasion._id, data: payload }).unwrap();
        toast.success("Occasion updated successfully!");
      } else {
        await addOccasion(payload).unwrap();
        toast.success("Occasion added successfully!");
      }

      onClose();
    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        err?.error ||
        `Something went wrong while ${
          isEditMode ? "updating" : "adding"
        } the occasion.`;
      setSubmitError(errorMessage);
      toast.error(errorMessage);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-neutral-10/50 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl my-8">
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-20 flex items-center justify-between sticky top-0 bg-white rounded-t-3xl z-10">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-45 font-semibold">
              {isEditMode ? "Edit" : "New"}
            </p>
            <h2 className="text-lg font-bold text-neutral-10 tracking-tight mt-1">
              {isEditMode ? "Edit Occasion" : "Add Occasion"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-45 hover:text-neutral-10 hover:bg-neutral-20 transition-all"
            aria-label="Close"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit(handleSubmitOccasion)}
          className="max-h-[70vh] overflow-y-auto"
        >
          <div className="p-5 space-y-5">
            {/* Image upload */}
            <div>
              <label className="block text-sm font-medium text-neutral-10 mb-2">
                Occasion Image{" "}
                {!isEditMode && <span className="text-red-500">*</span>}
              </label>

              <div className="flex items-center gap-4">
                <div className="relative size-20 rounded-xl overflow-hidden border border-neutral-20 bg-neutral-20 group shrink-0">
                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview}
                        alt="Occasion"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-1 right-1 size-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove image"
                      >
                        <FiX size={11} />
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-45">
                      <FiImage size={22} />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2.5 rounded-xl border-2 border-dashed border-neutral-20 text-sm font-medium text-neutral-10 hover:border-primary-10/40 hover:text-primary-10 transition-all"
                  >
                    {imagePreview ? "Change Image" : "Upload Image"}
                  </button>
                  <p className="text-[11px] text-neutral-45 mt-1.5">
                    JPG, PNG, WEBP · Max 5MB
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            <TextInput
              label="Occasion Name"
              placeholder="e.g. Wedding"
              error={errors.name}
              {...register("name", {
                required: "Occasion name is required",
                minLength: { value: 2, message: "Min 2 characters" },
              })}
            />

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-neutral-10 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Describe this occasion…"
                {...register("description", {
                  required: "Description is required",
                })}
                className="w-full px-4 py-3 border border-neutral-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent bg-white resize-none"
              />
              {errors.description && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Sub-occasions */}
            <div>
              <label className="block text-sm font-medium text-neutral-10 mb-3">
                Sub Occasions{" "}
                <span className="text-neutral-45 font-normal">(optional)</span>
              </label>

              {/* Existing sub-occasions list */}
              {subOccasions.length > 0 && (
                <div className="space-y-2 mb-3">
                  {subOccasions.map((sub, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 p-2.5 rounded-xl bg-neutral-20/60 border border-neutral-20"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-neutral-10">
                          {sub.name}
                        </p>
                        {sub.description && (
                          <p className="text-[11px] text-neutral-45 mt-0.5 line-clamp-2">
                            {sub.description}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSubOccasion(index)}
                        className="p-1.5 rounded-lg text-neutral-45 hover:text-red-500 hover:bg-red-50 transition-all shrink-0"
                        aria-label={`Remove ${sub.name}`}
                      >
                        <FiTrash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add new sub-occasion */}
              <div className="space-y-2 p-3 rounded-xl border border-dashed border-neutral-20">
                <TextInput
                  label="Sub Occasion Name"
                  placeholder="e.g. Haldi"
                  error={errors.subOccasionName}
                  {...register("subOccasionName")}
                />

                <TextInput
                  label="Description (optional)"
                  placeholder="e.g. Traditional pre-wedding ceremony"
                  error={errors.subOccasionDescription}
                  {...register("subOccasionDescription")}
                />

                <button
                  type="button"
                  onClick={handleAddSubOccasion}
                  disabled={!subNameInput?.trim()}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary-10 text-white text-xs font-semibold hover:bg-[#d4892a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiPlus size={12} />
                  Add Sub Occasion
                </button>
              </div>
            </div>

            {/* Active toggle */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("isActive")}
                className="size-4 rounded border-neutral-45 text-primary-10 focus:ring-primary-10 focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-sm text-neutral-10">
                Occasion is active
              </span>
            </label>

            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
                <FiX className="text-red-500 shrink-0 mt-0.5" size={14} />
                <p className="text-xs text-red-600">{submitError}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-neutral-20 flex items-center justify-end gap-3 sticky bottom-0 bg-white rounded-b-3xl">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl border-2 border-neutral-20 text-sm font-medium text-neutral-10 hover:bg-neutral-20 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <Button
              type="submit"
              label={isEditMode ? "Update Occasion" : "Add Occasion"}
              variant="primary"
              className="px-6 py-2.5"
              icon={false}
              isLoading={isLoading}
              isDisabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrEditOccasionModal;