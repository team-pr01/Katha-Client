import { useEffect, useRef, useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { FiSearch, FiSend, FiX } from "react-icons/fi";

const mockProducts = [
  {
    id: "1",
    name: "Brass Elephant Statue",
    category: "Brass",
    price: 200,
    image: "/api/placeholder/60/60",
    minOrderQuantity: 50,
  },
  {
    id: "2",
    name: "Handcrafted Brass Diya",
    category: "Brass",
    price: 899,
    image: "/api/placeholder/60/60",
    minOrderQuantity: 100,
  },
  {
    id: "3",
    name: "Brass Peacock Showpiece",
    category: "Brass",
    price: 3499,
    image: "/api/placeholder/60/60",
    minOrderQuantity: 25,
  },
  {
    id: "4",
    name: "Wooden Wall Decor",
    category: "Wood",
    price: 1500,
    image: "/api/placeholder/60/60",
    minOrderQuantity: 50,
  },
  {
    id: "5",
    name: "Handcrafted Jewelry Box",
    category: "Jewelry",
    price: 2500,
    image: "/api/placeholder/60/60",
    minOrderQuantity: 30,
  },
  {
    id: "6",
    name: "Brass Temple Bells",
    category: "Brass",
    price: 1299,
    image: "/api/placeholder/60/60",
    minOrderQuantity: 100,
  },
];

const BulkOrderForm = () => {
  const [formData, setFormData] = useState<any>({
    productId: "",
    productName: "",
    quantity: 0,
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    message: "",
    preferredContact: "email",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showProductDropdown, setShowProductDropdown] =
    useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [searchPlaceholder, setSearchPlaceholder] = useState<string>(
    "Search for products...",
  );
  const [isSearchTyping, setIsSearchTyping] = useState<boolean>(true);
  const [searchDisplayText, setSearchDisplayText] = useState<string>("");
  const searchTimeoutRef = useRef<any | null>(null);

  const productSearchTerms = [
    "Brass Elephant",
    "Brass Diya",
    "Peacock Showpiece",
    "Wooden Decor",
    "Jewelry Box",
    "Temple Bells",
  ];

  // Search placeholder animation
  useEffect(() => {
    let currentIndex = 0;
    let currentText = "";
    let isDeleting = false;

    const animatePlaceholder = () => {
      if (isDeleting) {
        if (currentText.length > 0) {
          currentText = currentText.slice(0, -1);
          setSearchDisplayText(currentText);
          setTimeout(animatePlaceholder, 30);
        } else {
          isDeleting = false;
          currentIndex = (currentIndex + 1) % productSearchTerms.length;
          setTimeout(animatePlaceholder, 100);
        }
      } else {
        const fullText = productSearchTerms[currentIndex];
        if (currentText.length < fullText.length) {
          currentText = fullText.slice(0, currentText.length + 1);
          setSearchDisplayText(currentText);
          setTimeout(animatePlaceholder, 50);
        } else {
          isDeleting = true;
          setTimeout(animatePlaceholder, 3000);
        }
      }
    };

    setTimeout(animatePlaceholder, 500);
  }, []);

  // Filter products based on search
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = mockProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredProducts(filtered);
      setShowProductDropdown(true);
    } else {
      setFilteredProducts([]);
      setShowProductDropdown(false);
    }
  }, [searchTerm]);

  const handleProductSelect = (product: any) => {
    setSelectedProduct(product);
    setFormData((prev) => ({
      ...prev,
      productId: product.id,
      productName: product.name,
    }));
    setSearchTerm(product.name);
    setShowProductDropdown(false);
  };

  const handleInputChange = (field: keyof any, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleQuantityChange = (value: number) => {
    const minQty = selectedProduct?.minOrderQuantity || 1;
    if (value < minQty) {
      alert(`Minimum order quantity for this product is ${minQty}`);
      return;
    }
    setFormData((prev) => ({ ...prev, quantity: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) {
      alert("Please select a product");
      return;
    }
    if (formData.quantity < selectedProduct.minOrderQuantity) {
      alert(`Minimum order quantity is ${selectedProduct.minOrderQuantity}`);
      return;
    }
    // onSubmit(formData);
  };

  const getTotalPrice = () => {
    if (selectedProduct && formData.quantity) {
      return selectedProduct.price * formData.quantity;
    }
    return 0;
  };

  const getWhatsAppMessage = () => {
    const message =
      `Hi, I'm interested in bulk order:\n\n` +
      `Product: ${selectedProduct?.name || "Not selected"}\n` +
      `Quantity: ${formData.quantity || 0}\n` +
      `Total Price: ₹${getTotalPrice().toLocaleString()}\n\n` +
      `Name: ${formData.fullName}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Company: ${formData.companyName}\n\n` +
      `Message: ${formData.message}`;

    return encodeURIComponent(message);
  };
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
      <h2 className="text-xl font-bold text-[#333] mb-2">Get a Bulk Quote</h2>
      <p className="text-sm text-[#696767] mb-6">
        Fill in the details and we'll get back to you within 24 hours
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Search */}
        <div className="relative">
          <label className="block text-sm font-medium text-[#333] mb-1">
            Search Product <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#696767]"
              size={18}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => searchTerm.trim() && setShowProductDropdown(true)}
              placeholder={`Search for ${searchDisplayText}...`}
              className="w-full pl-10 pr-4 py-2.5 border border-[#d4d4d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb9e3a] focus:border-transparent"
              required
            />
            {selectedProduct && (
              <button
                type="button"
                onClick={() => {
                  setSelectedProduct(null);
                  setSearchTerm("");
                  setFormData((prev) => ({
                    ...prev,
                    productId: "",
                    productName: "",
                  }));
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#696767] hover:text-red-500"
              >
                <FiX size={16} />
              </button>
            )}
          </div>

          {/* Product Dropdown */}
          {showProductDropdown && filteredProducts.length > 0 && (
            <div className="absolute z-20 w-full mt-1 bg-white border border-[#d4d4d4] rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => handleProductSelect(product)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F3F3F3] transition-colors text-left"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#333]">
                      {product.name}
                    </div>
                    <div className="text-xs text-[#696767]">
                      {product.category} • ₹{product.price}/unit
                    </div>
                  </div>
                  <div className="text-xs text-[#eb9e3a] font-medium">
                    MOQ: {product.minOrderQuantity}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedProduct && (
          <div className="flex items-center gap-3 bg-[#F3F3F3] p-3 rounded-lg">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-12 h-12 rounded object-cover"
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-[#333]">
                {selectedProduct.name}
              </div>
              <div className="text-xs text-[#696767]">
                ₹{selectedProduct.price} per unit • MOQ:{" "}
                {selectedProduct.minOrderQuantity}
              </div>
            </div>
          </div>
        )}

        {/* Quantity & Price */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#333] mb-1">
              Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.quantity || ""}
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
              placeholder="Min 50"
              className="w-full px-4 py-2.5 border border-[#d4d4d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb9e3a] focus:border-transparent"
              min={selectedProduct?.minOrderQuantity || 1}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333] mb-1">
              Total Price
            </label>
            <div className="w-full px-4 py-2.5 bg-[#F3F3F3] border border-[#d4d4d4] rounded-lg text-[#333] font-bold">
              ₹{getTotalPrice().toLocaleString()}
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#333] mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              placeholder="Your full name"
              className="w-full px-4 py-2.5 border border-[#d4d4d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb9e3a] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333] mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              placeholder="Your company name"
              className="w-full px-4 py-2.5 border border-[#d4d4d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb9e3a] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333] mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2.5 border border-[#d4d4d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb9e3a] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333] mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-2.5 border border-[#d4d4d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb9e3a] focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-[#333] mb-1">
            Message / Requirements
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            placeholder="Tell us about your specific requirements..."
            className="w-full px-4 py-2.5 border border-[#d4d4d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb9e3a] focus:border-transparent min-h-[80px]"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
                    flex-1 px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2
                    ${
                      isSubmitting
                        ? "bg-[#d4d4d4] text-[#696767] cursor-not-allowed"
                        : "bg-[#eb9e3a] text-white hover:bg-[#d4892a] shadow-md hover:shadow-lg"
                    }
                  `}
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <FiSend size={18} />
                Submit Enquiry
              </>
            )}
          </button>
          {selectedProduct &&
            formData.quantity >= (selectedProduct?.minOrderQuantity || 1) && (
              <a
                href={`https://wa.me/919876500000?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <BsWhatsapp size={18} />
                WhatsApp
              </a>
            )}
        </div>
      </form>
    </div>
  );
};

export default BulkOrderForm;
