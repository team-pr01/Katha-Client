import React, { useState, useRef } from "react";
import Container from "../../components/Reusable/Container/Container";
import StepPreferences from "../../components/PersonalizedOrdersPage/StepPreferences/StepPreferences";
import OrderSuccess from "../../components/PersonalizedOrdersPage/OrderSuccess/OrderSuccess";
import OrderProgress from "../../components/PersonalizedOrdersPage/OrderProgress/OrderProgress";
import TrustSupport from "../../components/PersonalizedOrdersPage/TrustSupport/TrustSupport";
import StepGiftDetails from "../../components/PersonalizedOrdersPage/StepGiftDetails/StepGiftDetails";
import StepContactInfo from "../../components/PersonalizedOrdersPage/StepContactInfo/StepContactInfo";
import StepCustomization from "../../components/PersonalizedOrdersPage/StepCustomization/StepCustomization";
import { FiClock, FiGift } from "react-icons/fi";
import Breadcrumb from "../../components/Reusable/Breadcrumb/Breadcrumb";

const PersonalizedOrders: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<any>({
    occasion: "",
    recipientName: "",
    recipientRelation: "",
    giftFor: "",
    ageGroup: "",
    interests: [],
    budget: "",
    deliveryDate: "",
    specialRequests: "",
    customMessage: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof any, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleInterestToggle = (interestId: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId],
    }));
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

  const handleNextStep = () => {
    if (currentStep < 4) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2000);
  };

  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!formData.occasion && !!formData.recipientName;
      case 2:
        return !!formData.budget && formData.interests.length > 0;
      case 3:
        return !!formData.deliveryDate;
      case 4:
        return !!formData.fullName && !!formData.email && !!formData.phone;
      default:
        return false;
    }
  };

  // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Personalized Orders - Custom Gifting Services",
    description:
      "Create personalized gifts for any occasion. Customize your order with our expert team.",
  };

  if (isSubmitted) {
    return (
      <>
        <title>Personalized Order Submitted - Hanji Finance</title>
        <meta
          name="description"
          content="Your personalized order has been submitted successfully. Our team will contact you shortly."
        />

        <div className="bg-neutral-20 min-h-screen py-12">
          <Container>
            <OrderSuccess formData={formData} />
          </Container>
        </div>
      </>
    );
  }

  return (
    <>
      <title>Personalized Orders - Custom Gifting | Hanji Finance</title>
      <meta
        name="description"
        content="Create personalized gifts for weddings, anniversaries, birthdays, and more. Tell us your requirements and we'll craft the perfect gift."
      />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <div className="bg-neutral-20 min-h-screen py-6 md:py-8 font-Manrope">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", path: "/" },
              { label: "Personalized Orders", isActive: true },
            ]}
          />

          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-neutral-10 flex items-center gap-3">
                  <FiGift className="text-primary-10" size={28} />
                  Personalized Orders
                </h1>
                <p className="text-neutral-45 mt-1">
                  Tell us what you need, and we'll create the perfect
                  personalized gift for any occasion
                </p>
              </div>
              <div className="flex items-center gap-2 bg-neutral-20 px-4 py-2 rounded-lg">
                <FiClock className="text-primary-10" />
                <span className="text-sm text-neutral-45">
                  Estimated Response: 12 hrs
                </span>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <OrderProgress currentStep={currentStep} />

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
              {/* Step 1: Gift Details */}
              {currentStep === 1 && (
                <StepGiftDetails
                  formData={formData}
                  onChange={handleInputChange}
                />
              )}

              {/* Step 2: Preferences */}
              {currentStep === 2 && (
                <StepPreferences
                  formData={formData}
                  onChange={handleInputChange}
                  onInterestToggle={handleInterestToggle}
                />
              )}

              {/* Step 3: Customization */}
              {currentStep === 3 && (
                <StepCustomization
                  formData={formData}
                  uploadedFiles={uploadedFiles}
                  onChange={handleInputChange}
                  onFileUpload={handleFileUpload}
                  onFileRemove={removeFile}
                  fileInputRef={fileInputRef}
                />
              )}

              {/* Step 4: Contact Information */}
              {currentStep === 4 && (
                <StepContactInfo
                  formData={formData}
                  onChange={handleInputChange}
                />
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8 pt-6 border-t border-neutral-50">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className={`
                    px-6 py-2.5 border border-neutral-50 rounded-lg font-medium transition-colors
                    ${currentStep === 1 ? "invisible" : "hover:bg-neutral-20"}
                  `}
                >
                  Previous
                </button>
                <div className="flex gap-3">
                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      disabled={!isStepComplete(currentStep)}
                      className={`
                        px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2
                        ${
                          isStepComplete(currentStep)
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
                  ) : (
                    <button
                      type="submit"
                      disabled={!isStepComplete(4) || isSubmitting}
                      className={`
                        px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2
                        ${
                          isStepComplete(4) && !isSubmitting
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
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                          </svg>
                          Submit Order
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>

          {/* Trust & Support Section */}
          <TrustSupport />
        </Container>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default PersonalizedOrders;
