import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

const WriteReviewForm = ({
  setShowWriteReview,
}: {
  setShowWriteReview: (value: boolean) => void;
}) => {
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [reviewRating, setReviewRating] = useState<number>(0);
  const [reviewTitle, setReviewTitle] = useState<string>("");
  const [reviewComment, setReviewComment] = useState<string>("");

  const handleReviewSubmit = (): void => {
    // Handle review submission
  };
  return (
    <div className="mb-8 p-6 border border-neutral-50 rounded-xl">
      <h4 className="font-semibold text-neutral-10 mb-4">Write Your Review</h4>
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
            className="w-full px-4 py-2 border border-neutral-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 min-h-25"
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
  );
};

export default WriteReviewForm;
