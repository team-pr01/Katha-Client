import Accordion from "../../Reusable/Accordion/Accordion";

interface FAQItem {
  title: string;
  description: string;
}

const BulkFAQ: React.FC = () => {
  const faqs: FAQItem[] = [
    {
      title: "What is the minimum order quantity for bulk orders?",
      description:
        "The minimum order quantity varies by product. Each product has a specified MOQ displayed on our product page. For bulk orders, you can also contact us for custom quantities.",
    },
    {
      title: "Do you offer discounts on bulk orders?",
      description:
        "Yes, we offer attractive volume-based discounts on bulk orders. The discount percentage increases with the order quantity. Contact us for a custom quote.",
    },
    {
      title: "How long does delivery take for bulk orders?",
      description:
        "Bulk orders typically take 7-15 business days depending on the quantity and customization requirements. We ensure timely delivery and provide tracking information.",
    },
    {
      title: "Can I customize products for bulk orders?",
      description:
        "Yes, we offer customization options for bulk orders. You can customize colors, materials, packaging, and add personalized branding or messages.",
    },
    {
      title: "What payment methods do you accept for bulk orders?",
      description:
        "We accept various payment methods including bank transfers, UPI, credit/debit cards, and corporate purchase orders. Contact us for detailed payment terms.",
    },
    {
      title: "Do you provide samples for bulk orders?",
      description:
        "Yes, we provide product samples for bulk orders. Sample charges may apply and are usually adjusted against the final order amount.",
    },
  ];

  return (
    <div className="my-25 font-Manrope">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-10">
          Frequently Asked titles
        </h2>
        <p className="text-neutral-45 mt-2">
          Everything you need to know about bulk ordering
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        <Accordion accordingData={faqs} />
      </div>
    </div>
  );
};

export default BulkFAQ;
