/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { FiX, FiPlus, FiImage, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import TextInput from "../../../Reusable/TextInput/TextInput";
import {
  useAddVariantMutation,
  useUpdateVariantMutation,
} from "../../../../redux/Features/Product/productVariantApi";
import { useGetAllMaterialsQuery } from "../../../../redux/Features/Material/materialApi";
import type { TProductVariant } from "../../../../types/product.type";
import Button from "../../../Reusable/Button/Button";

type TDimension = {
  length: number;
  width: number;
  height: number;
  unit: "cm" | "mm" | "inch" | "m" | "ft";
};

type TMaterialRefForm = {
  materialId: string;
  materialVariantId: string;
  quantity: number;
  unit: string;
};

type TVariantForm = {
  name: string;
  description: string;
  design: string;
  size: string;
  color: string;
  packSize: string;
  weight: string;
  basePrice: number;
  discountedPrice?: number;
  bulkPrice?: number;
  stock: number;
  makingCost?: number;
  processingTime: string;
  dimensions: TDimension;
};

interface AddOrEditVariantModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string | null;
  variant?: TProductVariant | null;
}

const AddOrEditVariantModal = ({
  isOpen,
  onClose,
  productId,
  variant,
}: AddOrEditVariantModalProps) => {
  const isEditMode = Boolean(variant?._id);

  const [addVariant, { isLoading: isAddingVariant }] = useAddVariantMutation();
  const [updateVariant, { isLoading: isUpdatingVariant }] =
    useUpdateVariantMutation();

  const { data: materialsData } = useGetAllMaterialsQuery({});
  const materials: any[] = materialsData?.data?.data || [];

  const isLoading = isAddingVariant || isUpdatingVariant;
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Image state
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Chip states (package contents)
  const [packageContents, setPackageContents] = useState<string[]>([]);
  const [packageInput, setPackageInput] = useState("");

  // Materials state
  const [materialRefs, setMaterialRefs] = useState<TMaterialRefForm[]>([]);

  // RHF
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TVariantForm>({
    defaultValues: {
      name: "",
      description: "",
      design: "",
      size: "",
      color: "",
      packSize: "Single",
      weight: "",
      basePrice: 0,
      discountedPrice: undefined,
      bulkPrice: undefined,
      stock: 0,
      makingCost: 0,
      processingTime: "",
      dimensions: { length: 0, width: 0, height: 0, unit: "cm" },
    },
  });

  // Setting default values
  useEffect(() => {
    if (!isOpen) return;

    if (isEditMode && variant) {
      reset({
        name: variant.name || "",
        description: variant.description || "",
        design: variant.design || "",
        size: variant.size || "",
        color: variant.color || "",
        packSize: variant.packSize || "Single",
        weight: variant.weight || "",
        basePrice: variant.basePrice ?? 0,
        discountedPrice: variant.discountedPrice ?? undefined,
        bulkPrice: variant.bulkPrice ?? undefined,
        stock: variant.stock ?? 0,
        makingCost: variant.makingCost ?? 0,
        processingTime: (variant as any).processingTime || "",
        dimensions: variant.dimensions || {
          length: 0,
          width: 0,
          height: 0,
          unit: "cm",
        },
      });
      setPackageContents(variant.packageContents || []);
      setImagePreviews(variant.images || []);
      setImageFiles([]);
      setMaterialRefs(
        (variant.materials || []).map((m: any) => ({
          materialId: m.materialId || "",
          materialVariantId: m.materialVariantId || "",
          quantity: m.quantity ?? 0,
          unit: m.unit || "piece",
        })),
      );
    } else {
      reset();
      setPackageContents([]);
      setImagePreviews([]);
      setImageFiles([]);
      setMaterialRefs([]);
    }
  }, [isOpen, isEditMode, variant, reset]);

  // Image handlers─
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const valid = files.filter((f) => f.type.startsWith("image/"));
    if (valid.length !== files.length) {
      toast.error("Only image files are allowed");
    }
    const tooLarge = valid.find((f) => f.size > 5 * 1024 * 1024);
    if (tooLarge) {
      toast.error("Each image must be under 5MB");
      return;
    }

    setImageFiles((prev) => [...prev, ...valid]);
    setImagePreviews((prev) => [
      ...prev,
      ...valid.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeImage = (index: number) => {
    const existingCount = imagePreviews.length - imageFiles.length;

    setImagePreviews((prev) => prev.filter((_, i) => i !== index));

    if (index >= existingCount) {
      const fileIndex = index - existingCount;
      setImageFiles((prev) => prev.filter((_, i) => i !== fileIndex));
    }
  };

  // Package contents handlers
  const handlePackageKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = packageInput.trim();
      if (!value) return;
      if (packageContents.includes(value)) {
        toast.error("Already added");
        return;
      }
      setPackageContents((prev) => [...prev, value]);
      setPackageInput("");
    } else if (
      e.key === "Backspace" &&
      !packageInput &&
      packageContents.length
    ) {
      setPackageContents((prev) => prev.slice(0, -1));
    }
  };

  const removePackageContent = (item: string) => {
    setPackageContents((prev) => prev.filter((i) => i !== item));
  };

  // Material handlers
  const addMaterialRef = () => {
    setMaterialRefs((prev) => [
      ...prev,
      {
        materialId: "",
        materialVariantId: "",
        quantity: 1,
        unit: "piece",
      },
    ]);
  };

  const removeMaterialRef = (index: number) => {
    setMaterialRefs((prev) => prev.filter((_, i) => i !== index));
  };

  const updateMaterialRef = (
    index: number,
    patch: Partial<TMaterialRefForm>,
  ) => {
    setMaterialRefs((prev) =>
      prev.map((m, i) => (i === index ? { ...m, ...patch } : m)),
    );
  };

  // Submit
  const handleSubmitVariant = async (formData: TVariantForm) => {
    setSubmitError(null);

    if (!productId) {
      setSubmitError("Product ID is missing");
      return;
    }

    if (imageFiles.length === 0 && imagePreviews.length === 0) {
      setSubmitError("Please upload at least one image");
      return;
    }

    try {
      const formDataPayload = new FormData();

      // Simple fields
      formDataPayload.append("productId", productId);
      formDataPayload.append("name", formData.name.trim());
      formDataPayload.append("description", formData.description.trim());
      formDataPayload.append("design", formData.design.trim());
      formDataPayload.append("size", formData.size.trim());
      formDataPayload.append("color", formData.color.trim());
      formDataPayload.append("packSize", formData.packSize.trim() || "Single");
      formDataPayload.append("weight", formData.weight.trim());
      formDataPayload.append("basePrice", String(formData.basePrice));
      formDataPayload.append("stock", String(formData.stock));
      formDataPayload.append("processingTime", formData.processingTime.trim());

      if (
        formData.discountedPrice !== undefined &&
        formData.discountedPrice !== null
      ) {
        formDataPayload.append(
          "discountedPrice",
          String(formData.discountedPrice),
        );
      }
      if (formData.bulkPrice !== undefined && formData.bulkPrice !== null) {
        formDataPayload.append("bulkPrice", String(formData.bulkPrice));
      }
      if (formData.makingCost !== undefined && formData.makingCost !== null) {
        formDataPayload.append("makingCost", String(formData.makingCost));
      }

      // Complex fields as JSON strings
      formDataPayload.append(
        "dimensions",
        JSON.stringify({
          length: Number(formData.dimensions.length),
          width: Number(formData.dimensions.width),
          height: Number(formData.dimensions.height),
          unit: formData.dimensions.unit,
        }),
      );
      formDataPayload.append(
        "packageContents",
        JSON.stringify(packageContents),
      );
      formDataPayload.append("materials", JSON.stringify(materialRefs));

      // New image files (field name "files" as per your Postman screenshot)
      imageFiles.forEach((file) => {
        formDataPayload.append("files", file);
      });

      // Existing image URLs (for edit mode, to preserve/order)
      if (isEditMode) {
        const existingImages = imagePreviews.filter(
          (_, i) => i < imagePreviews.length - imageFiles.length,
        );
        formDataPayload.append(
          "existingImages",
          JSON.stringify(existingImages),
        );
      }

      if (isEditMode && variant?._id) {
        await updateVariant({
          productId,
          variantId: variant?._id,
          data: formDataPayload,
        }).unwrap();
        toast.success("Variant updated successfully!");
      } else {
        await addVariant({ id: productId, data: formDataPayload }).unwrap();
        toast.success("Variant added successfully!");
      }

      onClose();
    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        err?.error ||
        `Something went wrong while ${
          isEditMode ? "updating" : "adding"
        } the variant. Please try again.`;
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
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl my-8">
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
          <div className="p-5 md:p-6 space-y-6">
            {/* ═══ Images ═══ */}
            <section>
              <label className="block text-sm font-medium text-neutral-10 mb-2">
                Images <span className="text-red-500">*</span>
              </label>

              <div className="flex flex-wrap gap-3">
                {imagePreviews.map((src, i) => (
                  <div
                    key={i}
                    className="relative size-20 rounded-xl overflow-hidden border border-neutral-20 group"
                  >
                    <img
                      src={src}
                      alt={`Variant ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 size-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove image"
                    >
                      <FiX size={11} />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="size-20 rounded-xl border-2 border-dashed border-neutral-20 flex flex-col items-center justify-center text-neutral-45 hover:border-primary-10/40 hover:text-primary-10 transition-all"
                >
                  <FiImage size={20} />
                  <span className="text-[10px] mt-1">Add</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </section>

            {/* ═══ Basic Info ═══ */}
            <section>
              <h3 className="text-xs font-bold text-neutral-10 uppercase tracking-wider mb-4 pb-2 border-b border-neutral-20">
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <TextInput
                  label="Variant Name"
                  placeholder="e.g. Floral Wall Art Small"
                  error={errors.name}
                  {...register("name", {
                    required: "Variant name is required",
                    minLength: { value: 2, message: "Min 2 characters" },
                  })}
                />
                <TextInput
                  label="Design"
                  placeholder="e.g. Floral Pattern"
                  error={errors.design}
                  {...register("design", { required: "Design is required" })}
                />
                <TextInput
                  label="Size"
                  placeholder="e.g. Small"
                  error={errors.size}
                  {...register("size", { required: "Size is required" })}
                />
                <TextInput
                  label="Color"
                  placeholder="e.g. Brown"
                  error={errors.color}
                  {...register("color", { required: "Color is required" })}
                />
                <TextInput
                  label="Pack Size"
                  placeholder="e.g. Single"
                  error={errors.packSize}
                  {...register("packSize")}
                />
                <TextInput
                  label="Weight"
                  placeholder="e.g. 450g"
                  error={errors.weight}
                  {...register("weight", { required: "Weight is required" })}
                />
                <TextInput
                  label="Processing Time"
                  placeholder="e.g. 3-5 business days"
                  error={errors.processingTime}
                  {...register("processingTime")}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-neutral-10 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe this variant…"
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
            </section>

            {/* ═══ Dimensions ═══ */}
            <section>
              <h3 className="text-xs font-bold text-neutral-10 uppercase tracking-wider mb-4 pb-2 border-b border-neutral-20">
                Dimensions
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <TextInput
                  label="Length"
                  type="number"
                  placeholder="0"
                  error={errors.dimensions?.length}
                  {...register("dimensions.length", {
                    required: "Required",
                    min: { value: 0, message: "Must be ≥ 0" },
                    valueAsNumber: true,
                  })}
                />
                <TextInput
                  label="Width"
                  type="number"
                  placeholder="0"
                  error={errors.dimensions?.width}
                  {...register("dimensions.width", {
                    required: "Required",
                    min: { value: 0, message: "Must be ≥ 0" },
                    valueAsNumber: true,
                  })}
                />
                <TextInput
                  label="Height"
                  type="number"
                  placeholder="0"
                  error={errors.dimensions?.height}
                  {...register("dimensions.height", {
                    required: "Required",
                    min: { value: 0, message: "Must be ≥ 0" },
                    valueAsNumber: true,
                  })}
                />
                <div>
                  <label className="block text-sm font-medium text-neutral-10 mb-1">
                    Unit
                  </label>
                  <select
                    {...register("dimensions.unit")}
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
            </section>

            {/* ═══ Pricing & Stock ═══ */}
            <section>
              <h3 className="text-xs font-bold text-neutral-10 uppercase tracking-wider mb-4 pb-2 border-b border-neutral-20">
                Pricing & Stock
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <TextInput
                  label="Base Price (₹)"
                  type="number"
                  placeholder="0"
                  error={errors.basePrice}
                  {...register("basePrice", {
                    required: "Base price is required",
                    min: { value: 0, message: "Must be ≥ 0" },
                    valueAsNumber: true,
                  })}
                />
                <TextInput
                  label="Discounted (₹)"
                  type="number"
                  placeholder="Optional"
                  {...register("discountedPrice", { valueAsNumber: true })}
                />
                <TextInput
                  label="Bulk Price (₹)"
                  type="number"
                  placeholder="Optional"
                  {...register("bulkPrice", { valueAsNumber: true })}
                />
                <TextInput
                  label="Stock"
                  type="number"
                  placeholder="0"
                  error={errors.stock}
                  {...register("stock", {
                    required: "Stock is required",
                    min: { value: 0, message: "Must be ≥ 0" },
                    valueAsNumber: true,
                  })}
                />
                <TextInput
                  label="Making Cost (₹)"
                  type="number"
                  placeholder="Optional"
                  {...register("makingCost", { valueAsNumber: true })}
                />
              </div>
            </section>

            {/* ═══ Package Contents ═══ */}
            <section>
              <h3 className="text-xs font-bold text-neutral-10 uppercase tracking-wider mb-4 pb-2 border-b border-neutral-20">
                Package Contents
              </h3>

              {packageContents.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {packageContents.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-20 text-neutral-10 text-xs font-medium"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removePackageContent(item)}
                        className="text-neutral-45 hover:text-neutral-10"
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
                value={packageInput}
                onChange={(e) => setPackageInput(e.target.value)}
                onKeyDown={handlePackageKeyDown}
                placeholder="Type and press Enter — e.g. 1 Wall Art Piece"
                className="w-full px-4 py-2.5 border border-neutral-50 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent"
              />
            </section>

            {/* ═══ Materials ═══ */}
            <section>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-20">
                <h3 className="text-xs font-bold text-neutral-10 uppercase tracking-wider">
                  Materials
                </h3>
                <button
                  type="button"
                  onClick={addMaterialRef}
                  className="flex items-center gap-1.5 text-xs font-semibold text-primary-10 hover:text-[#d4892a] transition-colors"
                >
                  <FiPlus size={12} />
                  Add Material
                </button>
              </div>

              {materialRefs.length === 0 ? (
                <p className="text-xs text-neutral-45 text-center py-4">
                  No materials added yet
                </p>
              ) : (
                <div className="space-y-3">
                  {materialRefs.map((ref, index) => {
                    const selectedMaterial = materials.find(
                      (m: any) => m._id === ref.materialId,
                    );
                    const variants = selectedMaterial?.variants || [];

                    return (
                      <div
                        key={index}
                        className="bg-neutral-20/40 rounded-xl p-3 space-y-3"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {/* Material */}
                          <div>
                            <label className="block text-xs font-medium text-neutral-10 mb-1">
                              Material
                            </label>
                            <select
                              value={ref.materialId}
                              onChange={(e) =>
                                updateMaterialRef(index, {
                                  materialId: e.target.value,
                                  materialVariantId: "",
                                })
                              }
                              className="w-full px-3 py-2 border border-neutral-50 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent"
                            >
                              <option value="">Select material…</option>
                              {materials.map((m: any) => (
                                <option key={m._id} value={m._id}>
                                  {m.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Material Variant */}
                          <div>
                            <label className="block text-xs font-medium text-neutral-10 mb-1">
                              Variant
                            </label>
                            <select
                              value={ref.materialVariantId}
                              onChange={(e) =>
                                updateMaterialRef(index, {
                                  materialVariantId: e.target.value,
                                })
                              }
                              disabled={!selectedMaterial}
                              className="w-full px-3 py-2 border border-neutral-50 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent disabled:opacity-50"
                            >
                              <option value="">Select variant…</option>
                              {variants.map((v: any) => (
                                <option key={v._id} value={v._id}>
                                  {v.design} · {v.color} ·{" "}
                                  {v.dimensions?.length}
                                  {v.dimensions?.unit}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Quantity + Unit */}
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-neutral-10 mb-1">
                                Quantity
                              </label>
                              <input
                                type="number"
                                min={0}
                                step="0.1"
                                value={ref.quantity}
                                onChange={(e) =>
                                  updateMaterialRef(index, {
                                    quantity: Number(e.target.value),
                                  })
                                }
                                className="w-full px-3 py-2 border border-neutral-50 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-neutral-10 mb-1">
                                Unit
                              </label>
                              <input
                                type="text"
                                value={ref.unit}
                                onChange={(e) =>
                                  updateMaterialRef(index, {
                                    unit: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-neutral-50 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent"
                              />
                            </div>
                          </div>

                          {/* Remove */}
                          <div className="flex items-end">
                            <button
                              type="button"
                              onClick={() => removeMaterialRef(index)}
                              className="p-2 rounded-lg text-neutral-45 hover:text-red-500 hover:bg-red-50 transition-all"
                              aria-label="Remove material"
                            >
                              <FiTrash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Error */}
            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
                <FiX className="text-red-500 shrink-0 mt-0.5" size={14} />
                <p className="text-xs text-red-600">{submitError}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-neutral-20 flex items-center justify-end gap-3 sticky bottom-0 bg-white rounded-b-3xl">
            <Button
              onClick={onClose}
              label={"Cancel"}
              variant="secondary"
              className="px-6 py-2.5"
              icon={false}
            />
            <Button
              type="submit"
              label={isEditMode ? "Update Variant" : "Add Variant"}
              variant="primary"
              className="px-6 py-2.5"
              isLoading={isLoading}
              isDisabled={isLoading}
              icon={false}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrEditVariantModal;
