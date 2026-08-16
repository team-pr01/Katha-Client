import React, { useState, useRef, useEffect } from "react";
import {
  FiHeart,
  FiShoppingCart,
  FiShare2,
  FiMinus,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiMessageSquare,
  FiUser,
  FiCalendar,
  FiThumbsUp,
  FiFlag,
  FiSend,
} from "react-icons/fi";
import { FaStar, FaStarHalfAlt, FaRegStar, FaQuoteLeft } from "react-icons/fa";
import Container from "../../components/Reusable/Container/Container";
import { IMAGES } from "../../assets";
import YouMayAlsoLike from "../../components/ProductDetailsPage/YouMayAlsoLike/YouMayAlsoLike";
import PackagingStyle from "../../components/ProductDetailsPage/PackagingStyle/PackagingStyle";
import { Link } from "react-router-dom";

// Types
interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

interface SizeOption {
  label: string;
  value: string;
}

interface PackagingOption {
  label: string;
  value: string;
}

interface ProductAttribute {
  label: string;
  value: string;
}

interface Review {
  id: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  helpful: number;
  isVerified: boolean;
}

interface SuggestedProduct {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  isNew?: boolean;
}

const ProductDetails: React.FC = () => {
  // State
  const [selectedSize, setSelectedSize] = useState<string>("medium");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedPackaging, setSelectedPackaging] = useState<string>("regular");
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [zoomPosition, setZoomPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"details" | "reviews">("details");
  const [showWriteReview, setShowWriteReview] = useState<boolean>(false);
  const [reviewRating, setReviewRating] = useState<number>(0);
  const [reviewTitle, setReviewTitle] = useState<string>("");
  const [reviewComment, setReviewComment] = useState<string>("");
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  // Mock data - Replace with actual data from API
  const productImages: ProductImage[] = [
    { id: 1, src: IMAGES.wedding, alt: "Brass Elephant Front" },
    { id: 2, src: IMAGES.anniversary, alt: "Brass Elephant Side" },
    { id: 3, src: IMAGES.birthday, alt: "Brass Elephant Back" },
    { id: 4, src: IMAGES.farewell, alt: "Brass Elephant Detail" },
  ];

  const sizes: SizeOption[] = [
    { label: "Classic", value: "classic" },
    { label: "Small", value: "small" },
    { label: "Medium", value: "medium" },
    { label: "Large", value: "large" },
  ];

  const packagingOptions: PackagingOption[] = [
    { label: "Regular Packaging", value: "regular" },
    { label: "Ribbon", value: "ribbon" },
    { label: "Decorative Flowers", value: "flowers" },
    { label: "1 Ring Platter", value: "platter" },
  ];

  const productAttributes: ProductAttribute[] = [
    { label: "Material", value: "Brass" },
    { label: "MDF", value: "MDF" },
    { label: "Thickness", value: "6 mm" },
    { label: "Weight", value: "450gm" },
    { label: "Dimensions", value: "12 x 8 inch" },
  ];

  const reviews: Review[] = [
    {
      id: 1,
      userName: "Priya Sharma",
      rating: 5,
      date: "2 weeks ago",
      title: "Absolutely stunning piece!",
      comment:
        "The craftsmanship is exceptional. The brass elephant looks even more beautiful in person. Perfect for my living room decor.",
      helpful: 24,
      isVerified: true,
    },
    {
      id: 2,
      userName: "Amit Kumar",
      rating: 4,
      date: "1 month ago",
      title: "Great quality and design",
      comment:
        "Very well made and detailed. The jewel embellishments add a royal touch. Slightly heavy but that's expected with brass.",
      helpful: 18,
      isVerified: true,
    },
    {
      id: 3,
      userName: "Sneha Patel",
      rating: 5,
      date: "2 months ago",
      title: "Perfect gift for housewarming",
      comment:
        "Bought this as a gift and it was loved by everyone. The packaging was beautiful too. Will definitely buy again.",
      helpful: 31,
      isVerified: true,
    },
  ];

  // Auto carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === productImages.length - 1 ? 0 : prev + 1,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [productImages.length]);

  // Handlers
  const handlePrevImage = (): void => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1,
    );
  };

  const handleNextImage = (): void => {
    setCurrentImageIndex((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1,
    );
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!imageContainerRef.current) return;

    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
    setIsZoomed(!isZoomed);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!isZoomed || !imageContainerRef.current) return;

    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleMouseLeave = (): void => {
    setIsZoomed(false);
  };

  const handleQuantityChange = (delta: number): void => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleReviewSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // Submit review logic here
    console.log({
      rating: reviewRating,
      title: reviewTitle,
      comment: reviewComment,
    });
    setShowWriteReview(false);
    setReviewRating(0);
    setReviewTitle("");
    setReviewComment("");
  };

  const renderStars = (rating: number, size: number = 16) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5 text-primary-10">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} size={size} />
        ))}
        {hasHalfStar && <FaStarHalfAlt size={size} />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} size={size} />
        ))}
      </div>
    );
  };

  const getAverageRating = (): number => {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  };

  const getRatingDistribution = (): { [key: number]: number } => {
    const distribution: { [key: number]: number } = {};
    reviews.forEach((review) => {
      distribution[review.rating] = (distribution[review.rating] || 0) + 1;
    });
    return distribution;
  };

  return (
    <div className="bg-neutral-20 min-h-screen py-8 font-Manrope">
      <Container>
        {/* Main Product Section */}
        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Column - Images */}
            <div className="lg:w-1/2">
              {/* Main Image with Zoom */}
              <div
                ref={imageContainerRef}
                className="relative overflow-hidden rounded-xl bg-neutral-20 cursor-zoom-in h-[400px] md:h-[500px]"
                onClick={handleImageClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={productImages[currentImageIndex].src}
                  alt={productImages[currentImageIndex].alt}
                  className="w-full h-full object-contain transition-transform duration-300"
                  style={{
                    transform: isZoomed ? "scale(2.5)" : "scale(1)",
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                />

                {/* Navigation Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-neutral-10 p-2 rounded-full shadow-lg transition-all hover:scale-110"
                >
                  <FiChevronLeft size={20} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-neutral-10 p-2 rounded-full shadow-lg transition-all hover:scale-110"
                >
                  <FiChevronRight size={20} />
                </button>

                {/* Zoom indicator */}
                <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                  Click to zoom
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {productImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index
                        ? "border-primary-10"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="lg:w-1/2">
              {/* Breadcrumb */}
              <div className="text-sm text-neutral-45 mb-3">
                Home / Products / Brass Elephant
              </div>

              <div className="flex justify-between mb-2">
                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-10 max-w-[80%]">
                  The Jewel Embedded Brass Elephant
                </h1>

                <button className="p-2 border border-neutral-50 rounded-lg hover:bg-neutral-20 transition-colors h-fit">
                  <FiShare2 size={16} />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(getAverageRating())}
                  <span className="text-sm font-medium text-neutral-10 ml-1">
                    {getAverageRating().toFixed(1)}
                  </span>
                </div>
                <span className="text-sm text-neutral-45">
                  ({reviews.length} Reviews)
                </span>
                <span className="text-sm text-green-600">| 40 Sold</span>
              </div>

              {/* Description */}
              <p className="text-neutral-10 text-sm leading-relaxed mb-4">
                Handcrafted brass elephant adorned with intricate jewel
                embellishments, bringing timeless elegance, cultural charm.
              </p>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-neutral-10">
                    ₹200
                  </span>
                  <span className="text-lg text-neutral-45 line-through">
                    ₹2000
                  </span>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    10% OFF
                  </span>
                </div>
                <p className="text-xs text-neutral-45 mt-1">
                  inclusive of all taxes
                </p>
              </div>

              {/* Size Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-10 mb-2">
                  Select Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size.value}
                      onClick={() => setSelectedSize(size.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedSize === size.value
                          ? "bg-primary-10 text-white shadow-md"
                          : "bg-neutral-20 text-neutral-10 hover:bg-primary-10/10"
                      }`}
                    >
                      {size.label}
                    </button>
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
                  >
                    <FiMinus size={16} />
                  </button>
                  <span className="px-4 py-1.5 min-w-[40px] text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 py-1.5 hover:bg-neutral-20 transition-colors"
                  >
                    <FiPlus size={16} />
                  </button>
                </div>
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
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-primary-10 text-white rounded-lg hover:bg-[#d4892a] transition-all shadow-md hover:shadow-lg">
                  <FiShoppingCart size={18} />
                  Add to Cart
                </button>
                <Link to="/product/customize/1" className="p-2.5 border border-neutral-50 rounded-lg hover:bg-neutral-20 transition-colors">
                  <FiShare2 size={18} />
                   Customize
                </Link>
              </div>

              {/* Packaging Options */}
              <PackagingStyle />

              {/* Product Attributes */}
              <div className="border-t border-neutral-50 pt-4 mt-4">
                <h3 className="text-sm font-semibold text-neutral-10 mb-3">
                  PRODUCT DETAILS
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {productAttributes.map((attr) => (
                    <div
                      key={attr.label}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className="text-neutral-45">{attr.label}:</span>
                      <span className="text-neutral-10 font-medium">
                        {attr.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-8 mt-6">
          <div className="flex border-b border-neutral-50 mb-6">
            <button
              onClick={() => setActiveTab("details")}
              className={`px-6 py-3 font-medium transition-all relative ${
                activeTab === "details"
                  ? "text-primary-10"
                  : "text-neutral-45 hover:text-neutral-10"
              }`}
            >
              Product Details
              {activeTab === "details" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-10" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-6 py-3 font-medium transition-all relative ${
                activeTab === "reviews"
                  ? "text-primary-10"
                  : "text-neutral-45 hover:text-neutral-10"
              }`}
            >
              Reviews ({reviews.length})
              {activeTab === "reviews" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-10" />
              )}
            </button>
          </div>

          {/* Product Details Tab */}
          {activeTab === "details" && (
            <div className="prose max-w-none">
              <p className="text-neutral-10 leading-relaxed">
                This exquisite brass elephant statue is meticulously handcrafted
                by skilled artisans, featuring intricate jewel embellishments
                that add a touch of royalty and elegance. Perfect for home
                decor, gifting, or as a collectible piece.
              </p>
              <ul className="mt-4 space-y-2 text-neutral-10">
                <li>✓ Premium quality brass material</li>
                <li>✓ Handcrafted with intricate details</li>
                <li>✓ Jewel embellishments for enhanced beauty</li>
                <li>✓ Available in multiple sizes</li>
                <li>✓ Perfect for home decor and gifting</li>
              </ul>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div ref={reviewsRef}>
              {/* Rating Summary */}
              <div className="flex flex-col md:flex-row gap-8 mb-8 p-6 bg-neutral-20 rounded-xl">
                <div className="flex flex-col items-center justify-center min-w-[150px]">
                  <div className="text-5xl font-bold text-neutral-10">
                    {getAverageRating().toFixed(1)}
                  </div>
                  <div className="mt-2">
                    {renderStars(getAverageRating(), 20)}
                  </div>
                  <div className="text-sm text-neutral-45 mt-1">
                    Based on {reviews.length} reviews
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = getRatingDistribution()[star] || 0;
                    const percentage = (count / reviews.length) * 100;
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-sm text-neutral-45 min-w-[30px]">
                          {star}
                        </span>
                        <FaStar size={12} className="text-primary-10" />
                        <div className="flex-1 h-2 bg-neutral-50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-10 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-neutral-45 min-w-[30px]">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Write Review Button */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-neutral-10">
                  Customer Reviews
                </h3>
                <button
                  onClick={() => setShowWriteReview(!showWriteReview)}
                  className="px-4 py-2 bg-primary-10 text-white rounded-lg hover:bg-[#d4892a] transition-colors flex items-center gap-2"
                >
                  <FiMessageSquare size={16} />
                  Write a Review
                </button>
              </div>

              {/* Write Review Form */}
              {showWriteReview && (
                <div className="mb-8 p-6 border border-neutral-50 rounded-xl">
                  <h4 className="font-semibold text-neutral-10 mb-4">
                    Write Your Review
                  </h4>
                  <form onSubmit={handleReviewSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-neutral-10 mb-2">
                        Rating
                      </label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="text-2xl transition-colors"
                          >
                            {star <= (hoveredRating || reviewRating) ? (
                              <FaStar className="text-primary-10" />
                            ) : (
                              <FaRegStar className="text-neutral-50" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-neutral-10 mb-2">
                        Review Title
                      </label>
                      <input
                        type="text"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10"
                        placeholder="Summarize your experience"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-neutral-10 mb-2">
                        Review
                      </label>
                      <textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 min-h-[100px]"
                        placeholder="Share your experience with this product"
                        required
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-primary-10 text-white rounded-lg hover:bg-[#d4892a] transition-colors flex items-center gap-2"
                      >
                        <FiSend size={16} />
                        Submit Review
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowWriteReview(false)}
                        className="px-6 py-2 bg-neutral-20 text-neutral-10 rounded-lg hover:bg-neutral-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-neutral-50 pb-6 last:border-0"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary-10/10 flex items-center justify-center shrink-0">
                        <FiUser className="text-primary-10" size={18} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-neutral-10">
                            {review.userName}
                          </span>
                          {review.isVerified && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                              Verified Purchase
                            </span>
                          )}
                          <span className="text-xs text-neutral-45 flex items-center gap-1">
                            <FiCalendar size={12} />
                            {review.date}
                          </span>
                        </div>
                        <div className="mt-1">
                          {renderStars(review.rating, 14)}
                        </div>
                        <h4 className="font-semibold text-neutral-10 mt-1">
                          {review.title}
                        </h4>
                        <p className="text-neutral-10 text-sm mt-1 leading-relaxed">
                          {review.comment}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <button className="text-xs text-neutral-45 hover:text-primary-10 flex items-center gap-1 transition-colors">
                            <FiThumbsUp size={14} />
                            Helpful ({review.helpful})
                          </button>
                          <button className="text-xs text-neutral-45 hover:text-primary-10 flex items-center gap-1 transition-colors">
                            <FiFlag size={14} />
                            Report
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Suggested Products */}
        <YouMayAlsoLike />
      </Container>
    </div>
  );
};

export default ProductDetails;
