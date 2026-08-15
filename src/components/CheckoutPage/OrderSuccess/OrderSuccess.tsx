import { FiCheck } from "react-icons/fi";
import Container from "../../Reusable/Container/Container";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  const total = 1000;
  return (
    <>
      <title>Order Confirmation - Hanji Finance</title>
      <meta
        name="description"
        content="Your order has been placed successfully. Thank you for shopping with us!"
      />

      <div className="bg-[#F3F3F3] min-h-screen py-12">
        <Container>
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <FiCheck className="text-green-600 text-5xl" />
            </div>
            <h1 className="text-3xl font-bold text-[#333] mb-4">
              Order Placed Successfully! 🎉
            </h1>
            <p className="text-neutral-45 text-lg mb-2">
              Thank you for your order!
            </p>
            <p className="text-neutral-45 mb-6">
              We'll send you a confirmation email with your order details
              shortly.
            </p>
            <div className="bg-[#F3F3F3] rounded-xl p-6 mb-8 text-left">
              <h3 className="font-semibold text-[#333] mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-45">Order Number</span>
                  <span className="text-[#333] font-medium">#ORD-2024-001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-45">Total Amount</span>
                  <span className="text-[#333] font-bold">
                    ₹{total.toFixed(0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-45">Payment Method</span>
                  <span className="text-[#333] font-medium capitalize">
                    Cash on Delivery
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="px-6 py-3 bg-[#eb9e3a] text-white rounded-xl font-medium hover:bg-[#d4892a] transition-colors"
              >
                Return to Home
              </Link>
              <Link
                to="/products"
                className="px-6 py-3 border border-[#d4d4d4] text-[#333] rounded-xl font-medium hover:bg-[#F3F3F3] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default OrderSuccess;
