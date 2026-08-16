import { useParams } from "react-router-dom";
import Container from "../../components/Reusable/Container/Container";
import ProductInfo from "../../components/CustomizeProductPage/ProductInfo/ProductInfo";
import CustomizationForm from "../../components/CustomizeProductPage/CustomizationForm/CustomizationForm";
import CustomizeOrderSummary from "../../components/CustomizeProductPage/CustomizeOrderSummary/CustomizeOrderSummary";
import Breadcrumb from "../../components/Reusable/Breadcrumb/Breadcrumb";

const CustomizeProduct: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  // Mock product data - Replace with actual product data from API
  const product = {
    id: productId || "1",
    name: "The Jewel Embedded Brass Elephant",
    image: "/api/placeholder/400/400",
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

  // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Customize Product - Personalized Gifts",
    description:
      "Customize your product with personalized options. Choose colors, materials, sizes, and more.",
  };

  return (
    <>
      <title>Customize Product - Katha</title>
      <meta
        name="description"
        content="Customize your product with personalized options. Choose from colors, materials, sizes, engravings, and more."
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
              { label: "Products", path: "/products" },
              {
                label: product.name.substring(0, 20) + "...",
                path: `/product/${product.id}`,
              },
              { label: "Customize", isActive: true },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Product Info & Customization */}
            <div className="lg:col-span-2">
              <ProductInfo />

              {/* Customization Form */}
              <CustomizationForm />
            </div>

            {/* Right Column - Summary */}
            <CustomizeOrderSummary />
          </div>
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

export default CustomizeProduct;
