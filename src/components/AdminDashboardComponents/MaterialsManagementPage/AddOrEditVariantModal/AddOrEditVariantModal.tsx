/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import {
  useAddVariantMutation,
  useUpdateVariantMutation,
} from "../../../../redux/Features/Material/materialApi";
import type { TMaterialVariant } from "../../../../types/materials.type";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Button from "../../../Reusable/Button/Button";

// ─── Types ────────────────────────────────────────────────
type TVariantForm = {
  design: string;
  color: string;
  madeOf: string;
  stock: number;
  stockUnit: string;
  purchasePrice: number;
  length: number;
  width: number;
  height: number;
  unit: "cm" | "mm" | "inch" | "m" | "ft";
};

interface AddOrEditVariantModalProps {
  isOpen: boolean;
  onClose: () => void;
  materialId: string;
  variant?: TMaterialVariant | null;
  variantIndex?: number | null;
}

const AddOrEditVariantModal = ({
  isOpen,
  onClose,
  materialId,
  variant,
  variantIndex,
}: AddOrEditVariantModalProps) => {
  const isEditMode = variantIndex !== null && variantIndex !== undefined;

  const [addVariant, { isLoading: isAdding }] = useAddVariantMutation();
  const [updateVariant, { isLoading: isUpdating }] =
    useUpdateVariantMutation();
  const isLoading = isAdding || isUpdating;

  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TVariantForm>({
    defaultValues: {
      design: "",
      color: "",
      madeOf: "",
      stock: 0,
      stockUnit: "piece",
      purchasePrice: 0,
      length: 0,
      width: 0,
      height: 0,
      unit: "cm",
    },
  });

  // ─── Prefill ─────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    if (isEditMode && variant) {
      reset({
        design: variant.design || "",
        color: variant.color || "",
        madeOf: variant.madeOf || "",
        stock: variant.stock ?? 0,
        stockUnit: variant.stockUnit || "piece",
        purchasePrice: variant.purchasePrice ?? 0,
        length: variant.dimensions?.length ?? 0,
        width: variant.dimensions?.width ?? 0,
        height: variant.dimensions?.height ?? 0,
        unit: variant.dimensions?.unit ?? "cm",
      });
    } else {
      reset({
        design: "",
        color: "",
        madeOf: "",
        stock: 0,
        stockUnit: "piece",
        purchasePrice: 0,
        length: 0,
        width: 0,
        height: 0,
        unit: "cm",
      });
    }
    setSubmitError(null);
  }, [isOpen, isEditMode, variant, reset]);

  // ─── Submit ──────────────────────────────────────────
  const handleSubmitVariant = async (formData: TVariantForm) => {
    setSubmitError(null);

    try {
      const payload = {
        design: formData.design.trim(),
        color: formData.color.trim(),
        madeOf: formData.madeOf.trim(),
        stock: Number(formData.stock),
        stockUnit: formData.stockUnit.trim(),
        purchasePrice: Number(formData.purchasePrice),
        dimensions: {
          length: Number(formData.length),
          width: Number(formData.width),
          height: Number(formData.height),
          unit: formData.unit,
        },
      };

      if (isEditMode && variantIndex !== null && variantIndex !== undefined) {
        await updateVariant({
          id: materialId,
          variantIndex,
          data: payload,
        }).unwrap();
        toast.success("Variant updated successfully!");
      } else {
        await addVariant({ id: materialId, data: payload }).unwrap();
        toast.success("Variant added successfully!");
      }

      onClose();
    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        err?.error ||
        `Something went wrong while ${
          isEditMode ? "updating" : "adding"
        } the variant.`;
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

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl my-8">
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-20 flex items-center justify-between sticky top-0 bg-white rounded-t-3xl z-10">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-45 font-semibold">
              {isEditMode ? "Edit" : "New"}
            </p>
            <h2 className="text-lg font-bold text-neutral-10 tracking-tight mt-1">
              {isEditMode ? "Edit Variant" : "Add Variant"}
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
          onSubmit={handleSubmit(handleSubmitVariant)}
          className="max-h-[70vh] overflow-y-auto"
        >
          <div className="p-5 space-y-5">
            {/* Basic */}
            <div>
              <h3 className="text-xs font-bold text-neutral-10 uppercase tracking-wider mb-3 pb-2 border-b border-neutral-20">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TextInput
                  label="Design"
                  placeholder="e.g. Solid"
                  error={errors.design}
                  {...register("design", {
                    required: "Design is required",
                  })}
                />
                <TextInput
                  label="Color"
                  placeholder="e.g. White"
                  error={errors.color}
                  {...register("color", {
                    required: "Color is required",
                  })}
                />
                <TextInput
                  label="Made Of"
                  placeholder="e.g. Cotton"
                  error={errors.madeOf}
                  {...register("madeOf", {
                    required: "Made of is required",
                  })}
                />
              </div>
            </div>

            {/* Dimensions */}
            <div>
              <h3 className="text-xs font-bold text-neutral-10 uppercase tracking-wider mb-3 pb-2 border-b border-neutral-20">
                Dimensions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <TextInput
                  label="Length"
                  type="number"
                  placeholder="0"
                  error={errors.length}
                  {...register("length", {
                    required: "Required",
                    min: { value: 0, message: "≥ 0" },
                    valueAsNumber: true,
                  })}
                />
                <TextInput
                  label="Width"
                  type="number"
                  placeholder="0"
                  error={errors.width}
                  {...register("width", {
                    required: "Required",
                    min: { value: 0, message: "≥ 0" },
                    valueAsNumber: true,
                  })}
                />
                <TextInput
                  label="Height"
                  type="number"
                  placeholder="0"
                  error={errors.height}
                  {...register("height", {
                    required: "Required",
                    min: { value: 0, message: "≥ 0" },
                    valueAsNumber: true,
                  })}
                />
                <div>
                  <label className="block text-sm font-medium text-neutral-10 mb-1">
                    Unit
                  </label>
                  <select
                    {...register("unit")}
                    className="w-full px-4 py-2.5 border border-neutral-50 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent"
                  >
                    <option value="cm">cm</option>
                    <option value="mm">mm</option>
                    <option value="inch">inch</option>
                    <option value="m">m</option>
                    <option value="ft">ft</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Stock & Price */}
            <div>
              <h3 className="text-xs font-bold text-neutral-10 uppercase tracking-wider mb-3 pb-2 border-b border-neutral-20">
                Stock & Pricing
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TextInput
                  label="Stock"
                  type="number"
                  placeholder="0"
                  error={errors.stock}
                  {...register("stock", {
                    required: "Stock is required",
                    min: { value: 0, message: "≥ 0" },
                    valueAsNumber: true,
                  })}
                />
                <TextInput
                  label="Stock Unit"
                  placeholder="e.g. meter, piece, roll"
                  error={errors.stockUnit}
                  {...register("stockUnit", {
                    required: "Stock unit is required",
                  })}
                />
                <TextInput
                  label="Purchase Price (₹)"
                  type="number"
                  placeholder="0"
                  error={errors.purchasePrice}
                  {...register("purchasePrice", {
                    required: "Purchase price is required",
                    min: { value: 0, message: "≥ 0" },
                    valueAsNumber: true,
                  })}
                />
              </div>
            </div>

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
              label={isEditMode ? "Update Variant" : "Add Variant"}
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

export default AddOrEditVariantModal;