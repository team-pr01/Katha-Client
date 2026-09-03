import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ProductImages = ({
  productName,
  productImages,
}: {
  productName: string;
  productImages: string[];
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [zoomPosition, setZoomPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  // Auto carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === productImages?.length - 1 ? 0 : prev + 1,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [productImages?.length]);

  // Handlers
  const handlePrevImage = (): void => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? productImages?.length - 1 : prev - 1,
    );
  };

  const handleNextImage = (): void => {
    setCurrentImageIndex((prev) =>
      prev === productImages?.length - 1 ? 0 : prev + 1,
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
  return (
    <div className="lg:w-1/2">
      {/* Main Image with Zoom */}
      <div
        ref={imageContainerRef}
        className="relative overflow-hidden rounded-xl bg-neutral-20 cursor-zoom-in h-100 md:h-125"
        onClick={handleImageClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={productImages && productImages[currentImageIndex]}
          alt={productName}
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
        {productImages?.map((image: string, index: number) => (
          <button
            key={image}
            onClick={() => setCurrentImageIndex(index)}
            className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
              currentImageIndex === index
                ? "border-primary-10"
                : "border-transparent"
            }`}
          >
            <img
              src={image}
              alt={productName}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
