/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useEffect, useState, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { useAddProductMutation } from "../../../redux/Features/Product/productApi";
import TextInput from "../../../components/Reusable/TextInput/TextInput";
import Button from "../../../components/Reusable/Button/Button";
import SelectDropdownWithSearch from "../../../components/Reusable/SelectDropdownWithSearch/SelectDropdownWithSearch";
import { useGetAllCategoriesQuery } from "../../../redux/Features/Category/categoryApi";
import { useGetAllOccasionsQuery } from "../../../redux/Features/Occation/occasionApi";
import type { TCategory } from "../../../types/categories.interface";

// ─── Types ────────────────────────────────────────────────
type TFormData = {
  name: string;
  category: string;
  subCategory: string;
  processingTime: string;
  isCustomizationAvailable: boolean;
  isFeatured: boolean;
};

// ─── Component ────────────────────────────────────────────
const AddProduct = () => {
  const navigate = useNavigate();
  const [addProduct, { isLoading }] = useAddProductMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);

  // ─── API data ────────────────────────────────────────
  const { data } = useGetAllCategoriesQuery({ page: 1, limit: 1000 });
  const { data: occasionData } = useGetAllOccasionsQuery({});

  const categories: TCategory[] = data?.data?.data || [];
  const occasions = occasionData?.data?.data || [];

  // ─── RHF ─────────────────────────────────────────────
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TFormData>({
    defaultValues: {
      name: "",
      category: "",
      subCategory: "",
      processingTime: "",
      isCustomizationAvailable: false,
      isFeatured: false,
    },
  });

  const selectedCategory = watch("category");
  const selectedSubCategory = watch("subCategory");

  // ─── Multi-select state (occasions) ──────────────────
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedSubOccasions, setSelectedSubOccasions] = useState<string[]>([]);

  // ─── Chip array state (care instructions + tags) ─────
  const [careInstructions, setCareInstructions] = useState<string[]>([]);
  const [careInput, setCareInput] = useState("");

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // ─── Subcategory options ─────────────────────────────
  const [subCategoryOptions, setSubCategoryOptions] = useState<string[]>([]);

  // ─── Validation flags (only show after submit attempt) ───
  const [showValidation, setShowValidation] = useState(false);

  useEffect(() => {
    if (!selectedCategory) {
      setSubCategoryOptions([]);
      return;
    }

    const matchedCategory = categories.find(
      (c: TCategory) => c.name === selectedCategory,
    );

    const rawSubs: any[] = matchedCategory?.subCategories || [];
    const normalized = rawSubs
      .map((sub) => (typeof sub === "string" ? sub : sub?.name))
      .filter((s): s is string => Boolean(s));

    setSubCategoryOptions(normalized);

    if (selectedSubCategory && !normalized.includes(selectedSubCategory)) {
      setValue("subCategory", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, categories]);

  // ─── Derive sub-occasion options from selected occasions ───
  const subOccasionOptions: string[] = (() => {
    const set = new Set<string>();
    selectedOccasions.forEach((name) => {
      const occ = occasions.find((o: any) => o.name === name);
      const subs = occ?.subOccasions || [];
      subs.forEach((s: any) => {
        const subName = typeof s === "string" ? s : s?.name;
        if (subName) set.add(subName);
      });
    });
    return Array.from(set);
  })();

  useEffect(() => {
    setSelectedSubOccasions((prev) =>
      prev.filter((s) => subOccasionOptions.includes(s)),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(subOccasionOptions)]);

  // ─── Chip helpers (Enter to add — no Add button) ─────
  const handleCareKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = careInput.trim();
      if (!value) return;
      if (careInstructions.includes(value)) {
        toast.error("Already added");
        return;
      }
      setCareInstructions((prev) => [...prev, value]);
      setCareInput("");
    } else if (e.key === "Backspace" && !careInput && careInstructions.length) {
      setCareInstructions((prev) => prev.slice(0, -1));
    }
  };

  const removeCareInstruction = (item: string) => {
    setCareInstructions((prev) => prev.filter((i) => i !== item));
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = tagInput.trim();
      if (!value) return;
      if (tags.includes(value)) {
        toast.error("Already added");
        return;
      }
      setTags((prev) => [...prev, value]);
      setTagInput("");
    } else if (e.key === "Backspace" && !tagInput && tags.length) {
      setTags((prev) => prev.slice(0, -1));
    }
  };

  const removeTag = (item: string) => {
    setTags((prev) => prev.filter((i) => i !== item));
  };

  // ─── Submit ──────────────────────────────────────────
  const handleAddProduct = async (formData: TFormData) => {
    setSubmitError(null);
    setShowValidation(true);

    // Custom validations
    if (selectedOccasions.length === 0) return;
    if (careInstructions.length === 0) return;

    try {
      const payload = {
        name: formData.name.trim(),
        category: formData.category.trim(),
        subCategory: formData.subCategory.trim(),
        occasionNames: selectedOccasions,
        subOccasionNames: selectedSubOccasions,
        careInstructions,
        tags,
        processingTime: formData.processingTime.trim() || null,
        isCustomizationAvailable: formData.isCustomizationAvailable,
        isFeatured: formData.isFeatured,
        variants: [],
      };

      const response = await addProduct(payload).unwrap();

      if (response?.success) {
        toast.success("Product created! Now add its variants.");
        reset();
        setSelectedOccasions([]);
        setSelectedSubOccasions([]);
        setCareInstructions([]);
        setTags([]);
        setShowValidation(false);

        const newProductId = response?.data?._id;
        navigate(
          newProductId
            ? `/admin/products/${newProductId}`
            : "/admin/products",
        );
      }
    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        err?.error ||
        "Something went wrong while adding the product. Please try again.";
      setSubmitError(errorMessage);
      toast.error(errorMessage);
    }
  };

  // ─── Derived validation errors (only shown after submit attempt) ───
  const occasionsError =
    showValidation && selectedOccasions.length === 0
      ? "Please select at least one occasion"
      : null;

  const careInstructionsError =
    showValidation && careInstructions.length === 0
      ? "Please add at least one care instruction"
      : null;

  return (
    <div className="space-y-5 font-Manrope">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-45 font-semibold">
            Catalog
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-10 tracking-tight mt-1">
            Add Product
          </h1>
          <p className="text-sm text-neutral-45 mt-1">
            Enter the product details. You can add variants after saving.
          </p>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-primary-10/5 border border-primary-10/20 rounded-2xl px-5 py-3.5 flex items-start gap-3">
        <div className="size-2 rounded-full bg-primary-10 mt-1.5 shrink-0" />
        <p className="text-xs text-neutral-10 leading-relaxed">
          <span className="font-semibold">Heads up:</span> Products are created
          without variants. After saving, you'll be redirected to the product
          page where you can add sizes, colors, prices, and stock.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleAddProduct)} className="space-y-5">
        <section className="bg-white rounded-2xl border border-neutral-20 p-5 md:p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-5 bg-primary-10 rounded-full" />
            <h2 className="text-sm font-bold text-neutral-10 uppercase tracking-wider">
              Basic Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <TextInput
              label="Product Name"
              placeholder="e.g. Handcrafted Wooden Wall Art"
              error={errors.name}
              {...register("name", {
                required: "Product name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
            />

            <SelectDropdownWithSearch
              label="Category"
              name="category"
              value={selectedCategory}
              options={categories.map((c: TCategory) => c.name)}
              onChange={(value) => setValue("category", value)}
              error={
                showValidation && !selectedCategory
                  ? "Please select a category"
                  : undefined
              }
            />

            <SelectDropdownWithSearch
              label="Sub Category"
              name="subCategory"
              value={selectedSubCategory}
              options={subCategoryOptions}
              onChange={(value) =>
                setValue("subCategory", value, { shouldValidate: true })
              }
              helperText={
                !selectedCategory
                  ? "Select a category first"
                  : subCategoryOptions.length === 0
                    ? "No subcategories available"
                    : undefined
              }
            />

            <TextInput
              label="Processing Time"
              placeholder="e.g. 3-5 business days"
              error={errors.processingTime}
              {...register("processingTime")}
            />
          </div>

          {/* ═══ OCCASIONS ═══ */}
          <div className="mt-6 pt-5 border-t border-neutral-20">
            <label className="block text-sm font-medium text-neutral-10 mb-3">
              Occasions <span className="text-red-500">*</span>
            </label>

            <div className="flex flex-wrap gap-2">
              {occasions.map((occ: any) => {
                const isSelected = selectedOccasions.includes(occ.name);
                return (
                  <button
                    key={occ._id || occ.name}
                    type="button"
                    onClick={() => {
                      setSelectedOccasions((prev) =>
                        isSelected
                          ? prev.filter((o) => o !== occ.name)
                          : [...prev, occ.name],
                      );
                    }}
                    className={`
                          px-3.5 py-2 rounded-xl text-xs font-medium border transition-all
                          ${
                            isSelected
                              ? "bg-neutral-10 text-white border-neutral-10 shadow-sm"
                              : "bg-white text-neutral-10 border-neutral-20 hover:border-neutral-45"
                          }
                        `}
                  >
                    {occ.name}
                  </button>
                );
              })}
              {occasions.length === 0 && (
                <p className="text-xs text-neutral-45">
                  No occasions available
                </p>
              )}
            </div>

            {/* Only shows after failed submit */}
            {occasionsError && (
              <p className="text-xs text-red-500 mt-2">{occasionsError}</p>
            )}
          </div>

          {/* ═══ SUB-OCCASIONS ═══ */}
          {selectedOccasions.length > 0 && (
            <div className="mt-5">
              <label className="block text-sm font-medium text-neutral-10 mb-3">
                Sub Occasions{" "}
                <span className="text-neutral-45 font-normal">(optional)</span>
              </label>

              {subOccasionOptions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {subOccasionOptions.map((sub) => {
                    const isSelected = selectedSubOccasions.includes(sub);
                    return (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => {
                          setSelectedSubOccasions((prev) =>
                            isSelected
                              ? prev.filter((s) => s !== sub)
                              : [...prev, sub],
                          );
                        }}
                        className={`
                          px-3.5 py-2 rounded-xl text-xs font-medium border transition-all
                          ${
                            isSelected
                              ? "bg-neutral-10 text-white border-neutral-10 shadow-sm"
                              : "bg-white text-neutral-10 border-neutral-20 hover:border-neutral-45"
                          }
                        `}
                      >
                        {sub}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-neutral-45">
                  No sub-occasions available for the selected occasions.
                </p>
              )}
            </div>
          )}

          {/* ═══ CARE INSTRUCTIONS (chip input, Enter only) ═══ */}
          <div className="mt-6 pt-5 border-t border-neutral-20">
            <label className="block text-sm font-medium text-neutral-10 mb-3">
              Care Instructions <span className="text-red-500">*</span>
            </label>

            {careInstructions.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {careInstructions.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-20 text-neutral-10 text-xs font-medium"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeCareInstruction(item)}
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
              value={careInput}
              onChange={(e) => setCareInput(e.target.value)}
              onKeyDown={handleCareKeyDown}
              placeholder="Type and press Enter — e.g. Wipe with dry cloth"
              className="w-full px-4 py-2.5 border border-neutral-50 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent"
            />

            {careInstructionsError && (
              <p className="text-xs text-red-500 mt-2">
                {careInstructionsError}
              </p>
            )}
          </div>

          {/* ═══ TAGS (chip input, Enter only) ═══ */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-neutral-10 mb-3">
               <span className="leading-4.5 text-[13px] md:text-sm font-medium tracking-[-0.16]">
              Tags{" "}
              <span className="text-primary-10">*</span>
            </span>
            </label>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-20 text-neutral-10 text-xs font-medium"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeTag(item)}
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
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Type and press Enter — e.g. wooden"
              className="w-full px-4 py-2.5 border border-neutral-50 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent"
            />
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-6 mt-6 pt-5 border-t border-neutral-20">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("isCustomizationAvailable")}
                className="size-4 rounded border-neutral-45 text-primary-10 focus:ring-primary-10 focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-sm text-neutral-10">
                Customization available
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("isFeatured")}
                className="size-4 rounded border-neutral-45 text-primary-10 focus:ring-primary-10 focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-sm text-neutral-10">Mark as featured</span>
            </label>
          </div>
        </section>

        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <FiX className="text-red-500 shrink-0 mt-0.5" size={16} />
            <p className="text-sm text-red-600">{submitError}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border-2 border-neutral-20 text-sm font-medium text-neutral-10 hover:bg-neutral-20 transition-all"
          >
            Cancel
          </button>
          <Button
            type="submit"
            label="Add Product"
            variant="primary"
            className="w-full sm:w-auto px-8 py-3"
            icon={true}
            isLoading={isLoading}
            isDisabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;