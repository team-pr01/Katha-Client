import { useState } from "react";
import { IMAGES } from "../../../assets";
import {
  FiCheck,
  FiSend,
  FiInfo,
  FiPackage,
  FiDroplet,
  FiFeather,
  FiImage,
  FiX,
  FiPlus,
} from "react-icons/fi";
import { FaPencilRuler } from "react-icons/fa";
import Container from "../../Reusable/Container/Container";
import { Link } from "react-router-dom";

interface CustomizationForm {
  selectedFields: string[];
  customDescription: string;
  fullName: string;
  email: string;
  phone: string;
  additionalNotes: string;
}

const CustomizationForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedField, setSelectedField] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [formData, setFormData] = useState<CustomizationForm>({
    selectedFields: [],
    customDescription: "",
    fullName: "",
    email: "",
    phone: "",
    additionalNotes: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFieldSelect = (fieldId: string) => {
    setSelectedField(fieldId);
    setFormData((prev) => ({
      ...prev,
      selectedFields: prev.selectedFields.includes(fieldId)
        ? prev.selectedFields.filter((id) => id !== fieldId)
        : [...prev.selectedFields, fieldId],
    }));
  };

  const handleInputChange = (field: keyof CustomizationForm, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2000);
  };

  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const product = {
    id: "1",
    name: "The Jewel Embedded Brass Elephant",
    image: IMAGES.farewell,
    price: 200,
    originalPrice: 2000,
    rating: 4.5,
    reviews: 13,
    category: "BRASS",
    description:
      "Handcrafted brass elephant adorned with intricate jewel embellishments, bringing timeless elegance, cultural charm.",
    availableSizes: ["Classic", "Small", "Medium", "Large"],
    availableColors: ["Gold", "Antique Gold", "Rose Gold", "Silver"],
    availableMaterials: ["Brass", "Copper", "Bronze"],
  };

  const customizableFields = [
    {
      id: "color",
      label: "Color",
      type: "color",
      options: product.availableColors,
      required: true,
    },
    {
      id: "material",
      label: "Material",
      type: "material",
      options: product.availableMaterials,
      required: true,
    },
    {
      id: "size",
      label: "Size",
      type: "size",
      options: product.availableSizes,
      required: false,
    },
    {
      id: "engraving",
      label: "Engraving",
      type: "engraving",
      required: false,
    },
    {
      id: "finish",
      label: "Finish",
      type: "finish",
      options: ["Matte", "Glossy", "Antique", "Polished"],
      required: false,
    },
    {
      id: "custom",
      label: "Custom Requirement",
      type: "custom",
      required: false,
    },
  ];

  if (isSubmitted) {
    return (
      <>
        <title>Customization Request Submitted - Hanji Finance</title>
        <meta
          name="description"
          content="Your customization request has been submitted successfully. Our team will contact you shortly."
        />

        <div className="bg-neutral-20 min-h-screen py-12">
          <Container>
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <FiCheck className="text-green-600 text-5xl" />
              </div>
              <h1 className="text-3xl font-bold text-neutral-10 mb-4">
                Customization Request Submitted! 🎉
              </h1>
              <p className="text-neutral-45 text-lg mb-2">
                Thank you for your customization request.
              </p>
              <p className="text-neutral-45 mb-6">
                Our expert team will review your requirements and get back to
                you within 24-48 hours.
              </p>
              <div className="bg-neutral-20 rounded-xl p-6 mb-8 text-left">
                <h3 className="font-semibold text-neutral-10 mb-3">
                  Request Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-45">Product</span>
                    <span className="text-neutral-10 font-medium">
                      {product.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-45">Customizations</span>
                    <span className="text-neutral-10 font-medium">
                      {formData.selectedFields
                        .map(
                          (id) =>
                            customizableFields.find((f) => f.id === id)?.label,
                        )
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-45">Contact</span>
                    <span className="text-neutral-10 font-medium">
                      {formData.fullName}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to={`/product/${product.id}`}
                  className="px-6 py-3 bg-primary-10 text-white rounded-xl font-medium hover:bg-[#d4892a] transition-colors"
                >
                  Return to Product
                </Link>
                <Link
                  to="/products"
                  className="px-6 py-3 border border-neutral-50 text-neutral-10 rounded-xl font-medium hover:bg-neutral-20 transition-colors"
                >
                  Browse More Products
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-10">
            Customize Your Product
          </h2>
          <p className="text-sm text-neutral-45 mt-1">
            Select the options you want to customize and provide your
            requirements
          </p>
        </div>
        <div className="flex items-center gap-2 bg-neutral-20 px-3 py-1.5 rounded-lg">
          <span className="text-xs text-neutral-45">
            Step {currentStep} of 2
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Select Customizations */}
        {currentStep === 1 && (
          <div className="animate-fadeIn">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-neutral-10 mb-3">
                What would you like to customize?{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {customizableFields.map((field) => (
                  <button
                    key={field.id}
                    type="button"
                    onClick={() => handleFieldSelect(field.id)}
                    className={`
                                p-4 rounded-xl border-2 text-left transition-all relative
                                ${
                                  formData.selectedFields.includes(field.id)
                                    ? "border-primary-10 bg-primary-10/5 shadow-md"
                                    : "border-neutral-50 hover:border-primary-10 hover:bg-primary-10/5"
                                }
                              `}
                  >
                    <div className="flex items-center gap-3">
                      {field.type === "color" && (
                        <FiDroplet className="text-primary-10" size={18} />
                      )}
                      {field.type === "size" && (
                        <FaPencilRuler className="text-primary-10" size={18} />
                      )}
                      {field.type === "material" && (
                        <FiFeather className="text-primary-10" size={18} />
                      )}
                      {field.type === "engraving" && (
                        <FiInfo className="text-primary-10" size={18} />
                      )}
                      {field.type === "finish" && (
                        <FiPackage className="text-primary-10" size={18} />
                      )}
                      {field.type === "custom" && (
                        <FiPlus className="text-primary-10" size={18} />
                      )}
                      <div>
                        <div className="text-sm font-medium text-neutral-10">
                          {field.label}
                        </div>
                        {field.options && (
                          <div className="text-xs text-neutral-45 mt-0.5">
                            {field.options.join(", ")}
                          </div>
                        )}
                      </div>
                    </div>
                    {field.required && (
                      <span className="absolute top-2 right-2 text-xs text-red-500">
                        Required
                      </span>
                    )}
                    {formData.selectedFields.includes(field.id) && (
                      <div className="absolute bottom-2 right-2 bg-primary-10 text-white rounded-full p-0.5">
                        <FiCheck size={12} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              {formData.selectedFields.length === 0 && (
                <p className="text-xs text-red-500 mt-2">
                  Please select at least one customization option
                </p>
              )}
            </div>

            {/* Selected Customizations Preview */}
            {formData.selectedFields.length > 0 && (
              <div className="bg-neutral-20 rounded-xl p-4 mb-6">
                <h4 className="text-sm font-semibold text-neutral-10 mb-2">
                  Selected Customizations:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {formData.selectedFields.map((id) => {
                    const field = customizableFields.find((f) => f.id === id);
                    return field ? (
                      <span
                        key={id}
                        className="bg-white px-3 py-1 rounded-lg text-sm text-neutral-10 border border-neutral-50"
                      >
                        {field.label}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleNextStep}
                disabled={formData.selectedFields.length === 0}
                className={`
                            px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2
                            ${
                              formData.selectedFields.length > 0
                                ? "bg-primary-10 text-white hover:bg-[#d4892a] shadow-md hover:shadow-lg"
                                : "bg-neutral-50 text-neutral-45 cursor-not-allowed"
                            }
                          `}
              >
                Next Step
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Customization Details */}
        {currentStep === 2 && (
          <div className="animate-fadeIn">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-neutral-10 mb-3">
                Customization Details
              </label>
              <p className="text-sm text-neutral-45 mb-4">
                Please provide detailed information about your customization
                requirements for:
                <span className="font-medium text-neutral-10 ml-1">
                  {formData.selectedFields
                    .map(
                      (id) =>
                        customizableFields.find((f) => f.id === id)?.label,
                    )
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </p>
              <div>
                <label className="block text-sm font-medium text-neutral-10 mb-1">
                  Describe your requirements{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.customDescription}
                  onChange={(e) =>
                    handleInputChange("customDescription", e.target.value)
                  }
                  placeholder="E.g., I want the color in antique gold finish, size medium, with engraved initials 'AK'..."
                  className="w-full px-4 py-3 border border-neutral-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent min-h-[120px]"
                  required
                />
                <p className="text-xs text-neutral-45 mt-1">
                  Be as specific as possible. Include color codes, measurements,
                  engraving text, etc.
                </p>
              </div>
            </div>

            {/* Reference Images */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-10 mb-2">
                Reference Images (Optional)
              </label>
              <div
                className="border-2 border-dashed border-neutral-50 rounded-xl p-6 text-center hover:border-primary-10 transition-colors cursor-pointer"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
                <FiImage className="text-primary-10 text-3xl mx-auto mb-2" />
                <p className="text-sm text-neutral-45">
                  Upload reference images
                </p>
                <p className="text-xs text-neutral-45 mt-1">
                  PNG, JPG up to 5MB each
                </p>
              </div>
              {uploadedFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-neutral-20 px-3 py-2 rounded-lg"
                    >
                      <span className="text-sm text-neutral-10">
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="border-t border-neutral-50 pt-6 mb-6">
              <h3 className="text-sm font-semibold text-neutral-10 mb-4">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-10 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    className="w-full px-4 py-2.5 border border-neutral-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-10 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-2.5 border border-neutral-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-10 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-2.5 border border-neutral-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-10 mb-1">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) =>
                      handleInputChange("additionalNotes", e.target.value)
                    }
                    placeholder="Any additional requirements or special instructions..."
                    className="w-full px-4 py-3 border border-neutral-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent min-h-[80px]"
                  />
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6 border-t border-neutral-50">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-2.5 border border-neutral-50 rounded-lg font-medium hover:bg-neutral-20 transition-colors"
              >
                Previous
              </button>
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !formData.customDescription ||
                  !formData.fullName ||
                  !formData.email ||
                  !formData.phone
                }
                className={`
                            px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2
                            ${
                              !isSubmitting &&
                              formData.customDescription &&
                              formData.fullName &&
                              formData.email &&
                              formData.phone
                                ? "bg-primary-10 text-white hover:bg-[#d4892a] shadow-md hover:shadow-lg"
                                : "bg-neutral-50 text-neutral-45 cursor-not-allowed"
                            }
                          `}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FiSend size={18} />
                    Submit Customization Request
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CustomizationForm;
