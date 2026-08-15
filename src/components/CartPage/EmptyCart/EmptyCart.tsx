import { FiArrowRight, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 rounded-full bg-neutral-20 flex items-center justify-center mx-auto mb-6">
          <FiShoppingBag size={48} className="text-neutral-50" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-10 mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-neutral-45 mb-6">
          Looks like you haven't added any items to your cart yet. Start
          shopping now!
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-10 text-white rounded-xl font-medium hover:bg-[#d4892a] transition-colors"
        >
          Start Shopping
          <FiArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
