/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiX, FiImage } from "react-icons/fi";
import toast from "react-hot-toast";
import {
  useAddHeroMutation,
  useUpdateHeroMutation,
} from "../../../../redux/Features/Hero/heroApi";
import type { THero } from "../../../../types/hero.types";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Button from "../../../Reusable/Button/Button";

// ─── Types ────────────────────────────────────────────────
type THeroForm = {
  alt: string;
  link: string;
};

interface AddOrEditHeroModalProps {
  isOpen: boolean;
  onClose: () => void;
  hero?: THero | null;
}

const AddOrEditHeroModal = ({
  isOpen,
  onClose,
  hero,
}: AddOrEditHeroModalProps) => {
  const isEditMode = Boolean(hero?._id);

  const [addHero, { isLoading: isAdding }] = useAddHeroMutation();
  const [updateHero, { isLoading: isUpdating }] = useUpdateHeroMutation();
  const isLoading = isAdding || isUpdating;

  const [submitError, setSubmitError] = useState<string | null>(null);

  // Image
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<THeroForm>({
    defaultValues: {
      alt: "",
      link: "",
    },
  });

  // ─── Prefill ─────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    if (isEditMode && hero) {
      reset({
        alt: hero.alt || "",
        link: hero.link || "",
      });
      setImagePreview(hero.image || "");
    } else {
      reset({
        alt: "",
        link: "",
      });
      setImagePreview("");
    }
    setImageFile(null);
    setSubmitError(null);
  }, [isOpen, isEditMode, hero, reset]);

  // ─── Image handlers ──────────────────────────────────
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
  const handleSubmitHero = async (formData: THeroForm) => {
    setSubmitError(null);

    if (!isEditMode && !imageFile) {
      setSubmitError("Please upload a hero image");
      return;
    }

    try {
      const payload = new FormData();
      payload.append("alt", formData.alt.trim());
      payload.append("link", formData.link.trim());

      if (imageFile) {
        payload.append("file", imageFile); // field name per your backend
      }

      if (isEditMode && hero?._id) {
        await updateHero({ id: hero._id, data: payload }).unwrap();
        toast.success("Hero updated successfully!");
      } else {
        await addHero(payload).unwrap();
        toast.success("Hero added successfully!");
      }

      onClose();
    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        err?.error ||
        `Something went wrong while ${
          isEditMode ? "updating" : "adding"
        } the hero.`;
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
              {isEditMode ? "Edit Hero" : "Add Hero"}
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
          onSubmit={handleSubmit(handleSubmitHero)}
          className="p-5 space-y-5"
        >
          {/* Image upload */}
          <div>
            <label className="block text-sm font-medium text-neutral-10 mb-2">
              Hero Image{" "}
              {!isEditMode && <span className="text-red-500">*</span>}
            </label>

            <div className="space-y-3">
              <div className="relative w-full aspect-16/6 rounded-xl overflow-hidden border border-neutral-20 bg-neutral-20 group">
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Hero preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 size-7 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove image"
                    >
                      <FiX size={14} />
                    </button>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-neutral-45 gap-2">
                    <FiImage size={28} />
                    <span className="text-xs">No image selected</span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-dashed border-neutral-20 text-sm font-medium text-neutral-10 hover:border-primary-10/40 hover:text-primary-10 transition-all"
              >
                {imagePreview ? "Change Image" : "Upload Image"}
              </button>

              <p className="text-[11px] text-neutral-45">
                Recommended: 1920×800 (16:9 or wider) · JPG, PNG, WEBP · Max 5MB
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

          {/* Alt text */}
          <TextInput
            label="Alt Text"
            placeholder="e.g. Handcrafted brass jewelry collection"
            error={errors.alt}
            {...register("alt", {
              required: "Alt text is required",
              minLength: { value: 3, message: "Min 3 characters" },
            })}
          />

          {/* Link */}
          <TextInput
            label="Redirect Link"
            placeholder="e.g. /products?category=handicraft"
            error={errors.link}
            {...register("link")}
          />
          <p className="text-[11px] text-neutral-45 -mt-3">
            Where the hero banner should lead when clicked (optional). Use an
            internal path like <code>/products</code> or a full URL.
          </p>

          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
              <FiX className="text-red-500 shrink-0 mt-0.5" size={14} />
              <p className="text-xs text-red-600">{submitError}</p>
            </div>
          )}

          {/* Actions */}
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
              label={isEditMode ? "Update Hero" : "Add Hero"}
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

export default AddOrEditHeroModal;