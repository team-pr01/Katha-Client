import { useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import {
  FiMessageSquare,
  FiUser,
  FiCalendar,
  FiThumbsUp,
  FiFlag,
} from "react-icons/fi";
import WriteReviewForm from "./WriteReviewForm/WriteReviewForm";
import { renderRatingStars } from "../../../../utils/renderRatingStars";

const reviews = [
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

const ReviewsTab = () => {
  const [showWriteReview, setShowWriteReview] = useState<boolean>(false);
  const reviewsRef = useRef<HTMLDivElement>(null);

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
    <div ref={reviewsRef}>
      {/* Rating Summary */}
      <div className="flex flex-col md:flex-row gap-8 mb-8 p-6 bg-neutral-20 rounded-xl">
        <div className="flex flex-col items-center justify-center min-w-37.5">
          <div className="text-5xl font-bold text-neutral-10">
            {getAverageRating().toFixed(1)}
          </div>
          <div className="mt-2">
            {renderRatingStars(getAverageRating(), 20)}
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
                <span className="text-sm text-neutral-45 min-w-7.5">
                  {star}
                </span>
                <FaStar size={12} className="text-primary-10" />
                <div className="flex-1 h-2 bg-neutral-50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-10 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-neutral-45 min-w-7.5">
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
        <WriteReviewForm setShowWriteReview={setShowWriteReview} />
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
                <div className="mt-1">{renderRatingStars(review.rating, 14)}</div>
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
  );
};

export default ReviewsTab;
