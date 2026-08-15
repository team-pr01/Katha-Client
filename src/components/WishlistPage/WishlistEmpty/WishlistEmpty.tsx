import React from 'react';
import { FiHeart, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const WishlistEmpty: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 rounded-full bg-neutral-20 flex items-center justify-center mx-auto mb-6">
          <FiHeart size={48} className="text-neutral-50" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-10 mb-2">Your Wishlist is Empty</h2>
        <p className="text-neutral-45 mb-6">
          Start adding your favorite items to your wishlist. You'll find them here for easy access!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-10 text-white rounded-xl font-medium hover:bg-[#d4892a] transition-colors"
          >
            Start Shopping
            <FiArrowRight size={18} />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-50 text-neutral-10 rounded-xl font-medium hover:bg-neutral-20 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistEmpty;