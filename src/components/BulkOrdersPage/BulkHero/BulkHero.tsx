import { BsWhatsapp } from "react-icons/bs";
import { FiPackage, FiCheck } from "react-icons/fi";
import BulkOrderForm from "./BulkOrderForm";

interface BulkHeroProps {
  onSubmit: (formData: any) => void;
  isSubmitting: boolean;
}
const BulkHero: React.FC<BulkHeroProps> = () => {
  return (
    <div className="relative bg-linear-to-br from-secondary-10 to-[#2a2f3c] rounded-2xl overflow-hidden shadow-xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-10 rounded-full blur-3xl" />
      </div>

      <div className="relative p-6 md:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-primary-10/10 text-primary-10 px-4 py-1.5 rounded-full w-fit mb-4">
              <FiPackage size={16} />
              <span className="text-sm font-medium">Bulk Orders</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Order In{" "}
              <span className="text-primary-10 relative">
                Bulk
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary-10 rounded-full" />
              </span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg mt-4 max-w-lg">
              Get premium handcrafted products at wholesale prices. Perfect for
              businesses, events, and gifting needs.
            </p>

            {/* Features List */}
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center gap-2 text-gray-300">
                <FiCheck className="text-primary-10" size={18} />
                <span className="text-sm">Bulk Discounts</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <FiCheck className="text-primary-10" size={18} />
                <span className="text-sm">Custom Orders</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <FiCheck className="text-primary-10" size={18} />
                <span className="text-sm">Pan India Delivery</span>
              </div>
            </div>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/919876500000?text=Hi%2C%20I'm%20interested%20in%20bulk%20orders.%20Can%20you%20please%20share%20more%20details%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 w-fit px-6 py-3 mt-6 bg-[#25D366] text-white rounded-xl font-semibold hover:bg-[#1da851] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <BsWhatsapp size={20} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Right Content - Form */}
          <BulkOrderForm />
        </div>
      </div>
    </div>
  );
};

export default BulkHero;
