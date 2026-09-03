import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export const renderRatingStars = (rating: number, size: number = 16) => {
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
