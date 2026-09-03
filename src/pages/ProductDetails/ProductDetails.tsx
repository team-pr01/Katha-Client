import React, { useState } from "react";
import {
  FiHeart,
  FiShoppingCart,
  FiShare2,
  FiMinus,
  FiPlus,
} from "react-icons/fi";
import Container from "../../components/Reusable/Container/Container";
import PackagingStyle from "../../components/ProductDetailsPage/PackagingStyle/PackagingStyle";
import { Link, useParams } from "react-router-dom";
import { useGetSingleProductBySlugQuery } from "../../redux/Features/Product/productApi";
import Breadcrumb from "../../components/Reusable/Breadcrumb/Breadcrumb";
import ProductImages from "../../components/ProductDetailsPage/ProductImages/ProductImages";
import { ICONS } from "../../assets";
import ProductAttributes from "../../components/ProductDetailsPage/ProductAttributes/ProductAttributes";
import DetailTabs from "../../components/ProductDetailsPage/DetailTabs/DetailTabs";
import { renderRatingStars } from "../../utils/renderRatingStars";
import { calculateProductDiscountedPercentage } from "../../utils/calculateProductDiscountedPercentage";
import VariantCard from "../../components/ProductDetailsPage/VariantCard/VariantCard";
import type { TProductVariant } from "../../types/product.type";
import { useCart } from "../../providers/CartProvider/CartProvider";
import toast from "react-hot-toast";

const ProductDetails: React.FC = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const { data } = useGetSingleProductBySlugQuery(slug);
  const productData = data?.data || {};

  // State
  const [selectedVariant, setSelectedVariant] =
    useState<TProductVariant | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  const variants: TProductVariant[] = productData?.variants || [];

  // Set default variant when component loads
  React.useEffect(() => {
    if (variants.length > 0 && !selectedVariant) {
      setSelectedVariant(variants[0]);
    }
  }, [variants]);

  const dimensions = selectedVariant?.dimensions;

  const productAttributes = [
    { label: "Theme", value: selectedVariant?.design },
    { label: "Color", value: selectedVariant?.color },
    { label: "Size", value: selectedVariant?.size },
    {
      label: "Item Dimensions L x W x H",
      value: `${dimensions?.width} x ${dimensions?.height} x ${dimensions?.length} ${dimensions?.unit}`,
    },
    {
      label: "Item Weight",
      value: selectedVariant?.weight,
    },
    {
      label: "Material",
      value:
        selectedVariant?.materials
          ?.map((material: any) => material?.materialName || material?.name)
          .join(", ") || "All",
    },
    {
      label: "Package Contents",
      value: selectedVariant?.packageContents?.join(", "),
    },
    { label: "Pack Size", value: selectedVariant?.packSize },
    {
      label: "Occasions",
      value: productData?.occasionNames?.join(", ") || "All",
    },
    {
      label: "Care Instructions",
      value: productData?.careInstructions?.join(", ") || "All",
    },
    // {
    //   label: "Tags",
    //   value: productData?.tags?.join(", ") || "All",
    // },
  ];

  const handleQuantityChange = (delta: number): void => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  // Check if variant is in stock
  const isInStock = (variant: TProductVariant): boolean => {
    return variant.stock > 0;
  };

  const handleAddProductToCart = () => {
    if (!slug) return;

    const payload = {
      productId: productData?._id,
      name: productData?.name,
      image: selectedVariant?.images?.[0] || "",
      basePrice: selectedVariant?.basePrice as number,
      discountedPrice: selectedVariant?.discountedPrice as number,
      category: productData?.category,
      size: selectedVariant?.size ?? "",
      color: selectedVariant?.color ?? "",
      quantity: quantity,
      maxQuantity: selectedVariant?.stock ?? 0,
    };
    addToCart(payload);
    toast.success("Product added to cart!");
  };

  return (
    <div className="bg-neutral-20 min-h-screen py-8 font-Manrope">
      <Container>
        {/* Main Product Section */}
        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Column - Images */}
            <ProductImages
              productName={productData?.name}
              productImages={selectedVariant?.images as string[]}
            />

            {/* Right Column - Product Info */}
            <div className="lg:w-1/2">
              <Breadcrumb
                items={[
                  { label: "Home", path: "/" },
                  { label: "Products", path: "/products" },
                  { label: productData?.name, isActive: true },
                ]}
              />

              <div className="flex justify-between items-start mb-2">
                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-10 max-w-[75%]">
                  {productData?.name}
                </h1>

                <div className="flex gap-2">
                  <button className="p-2 border border-neutral-50 rounded-lg hover:bg-neutral-20 transition-colors">
                    <FiShare2 size={16} />
                  </button>
                </div>
              </div>

              {/* Rating | Sold Count */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {renderRatingStars(productData?.averageRating || 0)}
                  <span className="text-sm font-medium text-neutral-10 ml-1">
                    {productData?.averageRating?.toFixed(1) || "0.0"}
                  </span>
                </div>
                <span className="text-sm text-neutral-45">
                  ({productData?.totalReviews || 0} Reviews)
                </span>
                <span className="text-sm text-green-600">
                  | {productData?.soldCount || 0} Sold
                </span>
              </div>

              {/* Description */}
              <p className="text-neutral-10 text-sm leading-relaxed mb-4">
                {productData?.description}
              </p>

              {/* Price - Dynamic based on selected variant */}
              {selectedVariant && (
                <div className="mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-neutral-10">
                      ₹
                      {selectedVariant.discountedPrice ||
                        selectedVariant.basePrice}
                    </span>
                    {selectedVariant.discountedPrice && (
                      <>
                        <span className="text-lg text-neutral-45 line-through">
                          ₹{selectedVariant.basePrice}
                        </span>
                        <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                          {calculateProductDiscountedPercentage(
                            selectedVariant.basePrice,
                            selectedVariant.discountedPrice,
                          )}
                          % OFF
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-neutral-45 mt-1">
                    inclusive of all taxes
                  </p>
                  {selectedVariant.stock > 0 ? (
                    <p className="text-xs text-green-600 mt-1">
                      In Stock ({selectedVariant.stock} available)
                    </p>
                  ) : (
                    <p className="text-xs text-red-500 mt-1">Out of Stock</p>
                  )}
                </div>
              )}

              {/* Variants */}
              <div className="mb-6 w-full">
                <p className="text-sm">
                  Variant :{" "}
                  <span className="font-semibold">{selectedVariant?.name}</span>
                </p>

                <div className="flex gap-4 mt-2 w-full overflow-x-auto">
                  {productData?.variants?.map((variant: TProductVariant) => (
                    <VariantCard
                      key={variant._id}
                      variant={variant}
                      setSelectedVariant={setSelectedVariant}
                      selectedVariant={selectedVariant}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-4">
                <label className="text-sm font-medium text-neutral-10">
                  Qty:
                </label>
                <div className="flex items-center border border-neutral-50 rounded-lg overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-3 py-1.5 hover:bg-neutral-20 transition-colors"
                    disabled={!selectedVariant || !isInStock(selectedVariant)}
                  >
                    <FiMinus size={16} />
                  </button>
                  <span className="px-4 py-1.5 min-w-10 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 py-1.5 hover:bg-neutral-20 transition-colors"
                    disabled={
                      !selectedVariant ||
                      !isInStock(selectedVariant) ||
                      quantity >= selectedVariant.stock
                    }
                  >
                    <FiPlus size={16} />
                  </button>
                </div>
                {selectedVariant && (
                  <span className="text-xs text-neutral-45">
                    Max: {selectedVariant.stock}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${
                    isWishlisted
                      ? "bg-red-50 border-red-200 text-red-500"
                      : "bg-white border-neutral-50 text-neutral-10 hover:border-primary-10"
                  }`}
                >
                  <FiHeart className={isWishlisted ? "fill-current" : ""} />
                  Wishlist
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-primary-10 text-white rounded-lg hover:bg-[#d4892a] transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleAddProductToCart}
                  disabled={!selectedVariant || !isInStock(selectedVariant)}
                >
                  <FiShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>

              {/* Customize Button - Placed Separately */}
              <div className="mb-6">
                <Link
                  to={`/product/customize/${productData?._id || slug}`}
                  className="flex items-center justify-center gap-2 w-full px-6 py-2.5 border-2 border-dashed border-primary-10/30 text-primary-10 rounded-lg hover:bg-primary-10/5 hover:border-primary-10 transition-all"
                >
                  <img src={ICONS.customize} alt="" className="size-5" />
                  Customize This Product
                  <span className="text-xs text-neutral-45 font-normal">
                    (Choose your own design)
                  </span>
                </Link>
              </div>

              {/* Attributes  */}
              <ProductAttributes productAttributes={productAttributes} />

              {/* Packaging Options */}
              <PackagingStyle />
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <DetailTabs
          totalReviews={productData?.totalReviews}
          description={productData?.description}
          material={productData?.material}
          tags={productData?.tags}
        />
      </Container>
    </div>
  );
};

export default ProductDetails;
