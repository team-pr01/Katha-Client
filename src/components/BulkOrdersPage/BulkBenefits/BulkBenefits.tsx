import {
  FiAward,
  FiTruck,
  FiShield,
  FiClock,
  FiDollarSign,
  FiPackage,
} from "react-icons/fi";

interface BenefitItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BulkBenefits: React.FC = () => {
  const benefits: BenefitItem[] = [
    {
      icon: <FiDollarSign className="text-primary-10" size={24} />,
      title: "Bulk Discounts",
      description:
        "Get exclusive wholesale pricing on bulk orders. The more you order, the more you save.",
    },
    {
      icon: <FiAward className="text-primary-10" size={24} />,
      title: "Premium Quality",
      description:
        "All products are handcrafted with premium materials and traditional techniques.",
    },
    {
      icon: <FiTruck className="text-primary-10" size={24} />,
      title: "Pan India Delivery",
      description:
        "We deliver bulk orders across India with secure packaging and tracking.",
    },
    {
      icon: <FiShield className="text-primary-10" size={24} />,
      title: "Quality Assurance",
      description:
        "Every product undergoes strict quality checks before dispatch.",
    },
    {
      icon: <FiClock className="text-primary-10" size={24} />,
      title: "Timely Delivery",
      description:
        "We understand deadlines and ensure timely delivery of all bulk orders.",
    },
    {
      icon: <FiPackage className="text-primary-10" size={24} />,
      title: "Custom Packaging",
      description:
        "Get custom packaging options for your bulk orders. Perfect for gifting.",
    },
  ];

  return (
    <div className="my-25 font-Manrope">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-10">
          Why Order in Bulk?
        </h2>
        <p className="text-neutral-45 mt-2 max-w-2xl mx-auto">
          Enjoy premium quality products at wholesale prices with our bulk
          ordering service
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="group p-6 bg-white rounded-xl transition-all duration-300 hover:shadow-md"
          >
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 group-hover:bg-primary-10/10 transition-colors">
              {benefit.icon}
            </div>
            <h3 className="text-lg font-semibold text-neutral-10 mb-2">
              {benefit.title}
            </h3>
            <p className="text-sm text-neutral-45 leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BulkBenefits;
