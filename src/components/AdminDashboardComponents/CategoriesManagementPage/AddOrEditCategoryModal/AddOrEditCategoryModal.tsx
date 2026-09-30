/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { FiX, FiImage } from "react-icons/fi";
import toast from "react-hot-toast";
import {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} from "../../../../redux/Features/Category/categoryApi";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Button from "../../../Reusable/Button/Button";
import type { TCategories } from "../../../../types/categories.types";

type TCategoryForm = {
  name: string;
  areaName: string;
  description: string;
  isActive: boolean;
};

interface AddOrEditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: TCategories | null;
}

const AddOrEditCategoryModal = ({
  isOpen,
  onClose,
  category,
}: AddOrEditCategoryModalProps) => {
  const isEditMode = Boolean(category?._id);

  const [addCategory, { isLoading: isAdding }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const isLoading = isAdding || isUpdating;

  const [submitError, setSubmitError] = useState<string | null>(null);

  // Subcategory chips
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [subInput, setSubInput] = useState("");

  // Image
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCategoryForm>({
    defaultValues: {
      name: "",
      areaName: "",
      description: "",
      isActive: true,
    },
  });

  // Prefill
  useEffect(() => {
    if (!isOpen) return;

    if (isEditMode && category) {
      reset({
        name: category.name || "",
        areaName: category.areaName || "",
        description: category.description || "",
        isActive: category.isActive ?? true,
      });
      setSubCategories(category.subCategories?.map((s: any) => s?.name) || []);
      setImagePreview(category.imageUrl || "");
    } else {
      reset({
        name: "",
        areaName: "",
        description: "",
        isActive: true,
      });
      setSubCategories([]);
      setImagePreview("");
    }

    setImageFile(null);
    setSubInput("");
    setSubmitError(null);
  }, [isOpen, isEditMode, category, reset]);

  // Chip handlers
  const handleSubKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = subInput.trim();
      if (!value) return;
      if (subCategories.includes(value)) {
        toast.error("Already added");
        return;
      }
      setSubCategories((prev) => [...prev, value]);
      setSubInput("");
    } else if (e.key === "Backspace" && !subInput && subCategories.length) {
      setSubCategories((prev) => prev.slice(0, -1));
    }
  };

  const removeSubCategory = (item: string) => {
    setSubCategories((prev) => prev.filter((s) => s !== item));
  };

  // Image handler
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

  // Submit
  const handleSubmitCategory = async (formData: TCategoryForm) => {
    setSubmitError(null);

    if (!isEditMode && !imageFile) {
      setSubmitError("Please upload a category image");
      return;
    }

    try {
      const payload = new FormData();
      payload.append("name", formData.name.trim());
      payload.append("areaName", formData.areaName.trim());
      payload.append("description", formData.description.trim());
      payload.append("isActive", String(formData.isActive));
      subCategories.forEach((sub) => {
        payload.append("subCategories", sub);
      });

      if (imageFile) {
        payload.append("file", imageFile);
      }

      if (isEditMode && category?._id) {
        await updateCategory({ id: category._id, data: payload }).unwrap();
        toast.success("Category updated successfully!");
      } else {
        await addCategory(payload).unwrap();
        toast.success("Category added successfully!");
      }

      onClose();
    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        err?.error ||
        `Something went wrong while ${
          isEditMode ? "updating" : "adding"
        } the category.`;
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
              {isEditMode ? "Edit Category" : "Add Category"}
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
          onSubmit={handleSubmit(handleSubmitCategory)}
          className="max-h-[70vh] overflow-y-auto"
        >
          <div className="p-5 space-y-5">
            {/* Image upload */}
            <div>
              <label className="block text-sm font-medium text-neutral-10 mb-2">
                Category Image{" "}
                {!isEditMode && <span className="text-red-500">*</span>}
              </label>

              <div className="flex items-center gap-4">
                <div className="relative size-20 rounded-xl overflow-hidden border border-neutral-20 bg-neutral-20 group shrink-0">
                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview}
                        alt="Category"
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
              label="Category Name"
              placeholder="e.g. Handicraft"
              error={errors.name}
              {...register("name", {
                required: "Category name is required",
                minLength: { value: 2, message: "Min 2 characters" },
              })}
            />

            <TextInput
              label="Area Name"
              placeholder="e.g. Home Decor"
              error={errors.areaName}
              {...register("areaName", {
                required: "Area name is required",
              })}
            />

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-neutral-10 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Describe this category…"
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

            {/* Subcategories chips */}
            <div>
              <label className="block text-sm font-medium text-neutral-10 mb-3">
                Sub Categories{" "}
              </label>

              {subCategories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {subCategories.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-20 text-neutral-10 text-xs font-medium"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeSubCategory(item)}
                        className="text-neutral-45 hover:text-neutral-10 transition-colors"
                        aria-label={`Remove ${item}`}
                      >
                        <FiX size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <input
                type="text"
                value={subInput}
                onChange={(e) => setSubInput(e.target.value)}
                onKeyDown={handleSubKeyDown}
                placeholder="Type and press Enter — e.g. Wooden"
                className="w-full px-4 py-2.5 border border-neutral-50 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent"
              />
            </div>

            {/* Active toggle */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("isActive")}
                className="size-4 rounded border-neutral-45 text-primary-10 focus:ring-primary-10 focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-sm text-neutral-10">
                Category is active
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
              label={isEditMode ? "Update Category" : "Add Category"}
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

export default AddOrEditCategoryModal;
