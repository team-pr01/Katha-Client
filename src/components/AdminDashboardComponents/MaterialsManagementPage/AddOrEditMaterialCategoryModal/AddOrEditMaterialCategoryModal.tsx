/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Button from "../../../Reusable/Button/Button";
import Modal from "../../../Reusable/Modal/Modal";
import {
  useAddMaterialCategoryMutation,
  useUpdateMaterialCategoryMutation,
} from "../../../../redux/Features/Material/materialCategoryApi";

// ─── Types ────────────────────────────────────────────────
type TCategoryForm = {
  name: string;
};

interface TCategory {
  _id: string;
  name: string;
  subCategories?: string[];
}

interface AddOrEditMaterialCategoryModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  category?: TCategory | null;
  onClose?: () => void;
}

const AddOrEditMaterialCategoryModal = ({
  isModalOpen,
  setIsModalOpen,
  category,
  onClose,
}: AddOrEditMaterialCategoryModalProps) => {
  const isEditMode = Boolean(category?._id);

  const [addMaterialCategory, { isLoading: isAdding }] =
    useAddMaterialCategoryMutation();
  const [updateMaterialCategory, { isLoading: isUpdating }] =
    useUpdateMaterialCategoryMutation();
  const isLoading = isAdding || isUpdating;

  const [submitError, setSubmitError] = useState<string | null>(null);

  // Sub-categories chips
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [subInput, setSubInput] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCategoryForm>({
    defaultValues: { name: "" },
  });

  // ─── Prefill ─────────────────────────────────────────
  useEffect(() => {
    if (!isModalOpen) return;

    if (isEditMode && category) {
      reset({ name: category.name || "" });
      setSubCategories(category.subCategories || []);
    } else {
      reset({ name: "" });
      setSubCategories([]);
    }
    setSubInput("");
    setSubmitError(null);
  }, [isModalOpen, isEditMode, category, reset]);

  // ─── Chip handlers ───────────────────────────────────
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

  // ─── Submit ──────────────────────────────────────────
  const handleSubmitCategory = async (formData: TCategoryForm) => {
    setSubmitError(null);

    try {
      const payload = {
        name: formData.name.trim(),
        subCategories,
      };

      if (isEditMode && category?._id) {
        await updateMaterialCategory({ id: category._id, data: payload }).unwrap();
        toast.success("Category updated successfully!");
      } else {
        await addMaterialCategory(payload).unwrap();
        toast.success("Category added successfully!");
      }

      handleCancel();
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

  const handleCancel = () => {
    reset();
    setSubCategories([]);
    setSubInput("");
    setSubmitError(null);
    setIsModalOpen(false);
    onClose?.();
  };

  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <form onSubmit={handleSubmit(handleSubmitCategory)} className="font-Manrope">
        {/* Header */}
        <h2 className="text-2xl font-Satoshi font-semibold text-center text-neutral-10">
          {isEditMode ? "Edit Category" : "Add Category"}
        </h2>
        <p className="text-sm text-center text-neutral-45 mt-1 mb-6">
          {isEditMode
            ? "Update the category details"
            : "Create a new material category"}
        </p>

        {/* Form Fields */}
        <div className="flex flex-col gap-4">
          <TextInput
            label="Category Name"
            placeholder="e.g. Textiles"
            error={errors.name}
            {...register("name", {
              required: "Category name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
          />

          {/* Subcategories chips */}
          <div>
            <label className="block text-sm font-medium text-neutral-10 mb-2">
              Sub Categories{" "}
              <span className="text-neutral-45 font-normal">(optional)</span>
            </label>

            {subCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
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
              placeholder="Type and press Enter — e.g. Fabrics"
              className="w-full px-4 py-2.5 border border-neutral-50 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent"
            />
          </div>
        </div>

        {/* Error */}
        {submitError && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
            <FiX className="text-red-500 shrink-0 mt-0.5" size={14} />
            <p className="text-xs text-red-600">{submitError}</p>
          </div>
        )}

        {/* Actions */}
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
            label={
              isLoading
                ? isEditMode
                  ? "Updating..."
                  : "Adding..."
                : isEditMode
                  ? "Save Changes"
                  : "Add Category"
            }
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

export default AddOrEditMaterialCategoryModal;