import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/Reusable/Container/Container";
import Breadcrumb from "../../components/Reusable/Breadcrumb/Breadcrumb";
import BulkHero from "../../components/BulkOrdersPage/BulkHero/BulkHero";
import BulkBenefits from "../../components/BulkOrdersPage/BulkBenefits/BulkBenefits";
import BulkFAQ from "../../components/BulkOrdersPage/BulkFAQ/BulkFAQ";

const BulkOrders: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (formData: any) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Bulk Order Form Data:", formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2000);
  };

  // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Order in Bulk - Wholesale Handcrafted Products",
    description:
      "Order premium handcrafted products in bulk at wholesale prices. Perfect for businesses, events, and gifting needs.",
  };

  if (isSubmitted) {
    return (
      <>
        <title>Bulk Order Submitted - Hanji Finance</title>
        <meta
          name="description"
          content="Your bulk order enquiry has been submitted successfully. Our team will contact you shortly."
        />

        <div className="bg-neutral-20 min-h-screen py-12">
          <Container>
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <svg
                  className="text-green-600 text-5xl"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-neutral-10 mb-4">
                Enquiry Submitted Successfully! 🎉
              </h1>
              <p className="text-neutral-45 text-lg mb-2">
                Thank you for your bulk order enquiry.
              </p>
              <p className="text-neutral-45 mb-6">
                Our team will review your requirements and get back to you
                within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/"
                  className="px-6 py-3 bg-primary-10 text-white rounded-xl font-medium hover:bg-[#d4892a] transition-colors"
                >
                  Return to Home
                </Link>
                <Link
                  to="/products"
                  className="px-6 py-3 border border-neutral-50 text-neutral-10 rounded-xl font-medium hover:bg-neutral-20 transition-colors"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </>
    );
  }

  return (
    <>
      <title>
        Order in Bulk - Wholesale Handcrafted Products | Hanji Finance
      </title>
      <meta
        name="description"
        content="Order premium handcrafted products in bulk at wholesale prices. Perfect for businesses, events, and gifting needs."
      />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <div className="bg-neutral-20 min-h-screen py-6 md:py-8">
        <Container>
          {/* Breadcrumbs */}
          <Breadcrumb
            items={[
              { label: "Home", path: "/" },
              { label: "Order In Bulk", isActive: true },
            ]}
          />

          {/* Hero Section with Form */}
          <BulkHero onSubmit={handleSubmit} isSubmitting={isSubmitting} />

          {/* Benefits Section */}
          <div className="mt-8">
            <BulkBenefits />
          </div>

          {/* FAQ Section */}
          <div className="mt-8">
            <BulkFAQ />
          </div>
        </Container>
      </div>
    </>
  );
};

export default BulkOrders;
