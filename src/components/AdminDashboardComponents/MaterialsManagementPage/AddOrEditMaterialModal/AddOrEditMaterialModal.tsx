/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import {
  useAddMaterialMutation,
  useUpdateMaterialMutation,
} from "../../../../redux/Features/Material/materialApi";
import type { TMaterials } from "../../../../types/materials.type";
import TextInput from './../../../Reusable/TextInput/TextInput';
import Button from "../../../Reusable/Button/Button";

// ─── Types ────────────────────────────────────────────────
type TMaterialForm = {
  name: string;
  category: string;
  subCategory: string;
  isActive: boolean;
};

interface AddOrEditMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  material?: TMaterials | null;
}

const AddOrEditMaterialModal = ({
  isOpen,
  onClose,
  material,
}: AddOrEditMaterialModalProps) => {
  const isEditMode = Boolean(material?._id);

  const [addMaterial, { isLoading: isAdding }] = useAddMaterialMutation();
  const [updateMaterial, { isLoading: isUpdating }] =
    useUpdateMaterialMutation();
  const isLoading = isAdding || isUpdating;

  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TMaterialForm>({
    defaultValues: {
      name: "",
      category: "",
      subCategory: "",
      isActive: true,
    },
  });

  // ─── Prefill ─────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    if (isEditMode && material) {
      reset({
        name: material.name || "",
        category: material.category || "",
        subCategory: material.subCategory || "",
        isActive: material.isActive ?? true,
      });
    } else {
      reset({
        name: "",
        category: "",
        subCategory: "",
        isActive: true,
      });
    }
    setSubmitError(null);
  }, [isOpen, isEditMode, material, reset]);

  // ─── Submit ──────────────────────────────────────────
  const handleSubmitMaterial = async (formData: TMaterialForm) => {
    setSubmitError(null);

    try {
      const payload = {
        name: formData.name.trim(),
        category: formData.category.trim(),
        subCategory: formData.subCategory.trim(),
        isActive: formData.isActive,
      };

      if (isEditMode && material?._id) {
        await updateMaterial({ id: material._id, data: payload }).unwrap();
        toast.success("Material updated successfully!");
      } else {
        await addMaterial(payload).unwrap();
        toast.success("Material added successfully!");
      }

      onClose();
    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        err?.error ||
        `Something went wrong while ${
          isEditMode ? "updating" : "adding"
        } the material.`;
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

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl my-8">
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-20 flex items-center justify-between">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-45 font-semibold">
              {isEditMode ? "Edit" : "New"}
            </p>
            <h2 className="text-lg font-bold text-neutral-10 tracking-tight mt-1">
              {isEditMode ? "Edit Material" : "Add Material"}
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
          onSubmit={handleSubmit(handleSubmitMaterial)}
          className="p-5 space-y-5"
        >
          <TextInput
            label="Material Name"
            placeholder="e.g. Premium Cotton Fabric"
            error={errors.name}
            {...register("name", {
              required: "Material name is required",
              minLength: { value: 2, message: "Min 2 characters" },
            })}
          />

          <TextInput
            label="Category"
            placeholder="e.g. Textiles"
            error={errors.category}
            {...register("category", {
              required: "Category is required",
            })}
          />

          <TextInput
            label="Sub Category"
            placeholder="e.g. Fabrics"
            error={errors.subCategory}
            {...register("subCategory", {
              required: "Sub category is required",
            })}
          />

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("isActive")}
              className="size-4 rounded border-neutral-45 text-primary-10 focus:ring-primary-10 focus:ring-offset-0 cursor-pointer"
            />
            <span className="text-sm text-neutral-10">Material is active</span>
          </label>

          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
              <FiX className="text-red-500 shrink-0 mt-0.5" size={14} />
              <p className="text-xs text-red-600">{submitError}</p>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-xl border-2 border-neutral-20 text-sm font-medium text-neutral-10 hover:bg-neutral-20 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <Button
              type="submit"
              label={isEditMode ? "Update" : "Add Material"}
              variant="primary"
              className="flex-1 justify-center py-2.5"
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

export default AddOrEditMaterialModal;