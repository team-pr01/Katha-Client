import { FiCheck, FiPackage, FiClock, FiPhone } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";
import Container from "../../Reusable/Container/Container";
import { Link, useLocation, useParams } from "react-router-dom";
import Button from "../../Reusable/Button/Button";

const OrderSuccess = () => {
  const location = useLocation();
  const { orderId } = useParams();
  const totalAmount = location.state?.totalAmount || 0;

  return (
    <>
      <title>Order Confirmation - Hanji Finance</title>
      <meta
        name="description"
        content="Your order has been placed successfully. Thank you for shopping with us!"
      />

      <div className="bg-neutral-20 min-h-screen py-12 font-Manrope">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Success Card */}
            <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 text-center relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-10/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                {/* Success Animation */}
                <div className="relative w-28 h-28 mx-auto mb-6">
                  <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
                  <div className="relative w-28 h-28 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                    <FiCheck className="text-white text-5xl" />
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-neutral-10 mb-3">
                  Order Placed Successfully! 🎉
                </h1>
                <p className="text-neutral-45 text-lg mb-1">
                  Thank you for your order!
                </p>
                <p className="text-neutral-45 text-sm mb-6">
                  We'll send you a confirmation email with your order details
                  shortly.
                </p>

                {/* Order ID Badge */}
                <div className="inline-flex items-center gap-2 bg-neutral-20 px-4 py-2 rounded-full mb-6">
                  <FiPackage className="text-primary-10" size={16} />
                  <span className="text-sm text-neutral-45">Order #</span>
                  <span className="text-sm font-semibold text-neutral-10">
                    {orderId}
                  </span>
                </div>

                {/* Order Summary */}
                <div className="bg-linear-to-br from-neutral-20 to-white rounded-2xl p-6 md:p-8 mb-8 text-left border border-neutral-50">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-primary-10 rounded-full" />
                    <h3 className="font-semibold text-neutral-10">
                      Order Summary
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-neutral-50">
                      <span className="text-neutral-45 text-sm">
                        Order Number
                      </span>
                      <span className="text-neutral-10 font-semibold text-sm">
                        #{orderId}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-neutral-50">
                      <span className="text-neutral-45 text-sm">
                        Total Amount
                      </span>
                      <span className="font-bold text-xl text-primary-10">
                        ₹{totalAmount.toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-neutral-50">
                      <span className="text-neutral-45 text-sm">
                        Payment Method
                      </span>
                      <span className="text-neutral-10 font-medium text-sm capitalize">
                        Cash on Delivery
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-neutral-45 text-sm">
                        Estimated Delivery
                      </span>
                      <span className="text-neutral-10 font-medium text-sm flex items-center gap-1">
                        <FiClock className="text-primary-10" size={14} />
                        5-7 business days
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                  <Link to="/">
                    <Button label="Return to Home" variant="secondary" />
                  </Link>
                  <Link to="/products">
                    <Button label="Continue Shopping" />
                  </Link>
                </div>

                {/* WhatsApp Support */}
                <div className="flex items-center justify-center gap-2 text-sm text-neutral-45">
                  <span>Need help?</span>
                  <a
                    href="https://wa.me/919876500000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 font-medium hover:text-green-700 flex items-center gap-1 transition-colors"
                  >
                    <BsWhatsapp size={16} />
                    Chat with us
                  </a>
                  <span>•</span>
                  <a
                    href="tel:9876500000"
                    className="text-primary-10 font-medium hover:text-[#d4892a] flex items-center gap-1 transition-colors"
                  >
                    <FiPhone size={16} />
                    Call Us
                  </a>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-50 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary-10/10 flex items-center justify-center mx-auto mb-3">
                  <FiMail className="text-primary-10" size={22} />
                </div>
                <h4 className="text-sm font-semibold text-neutral-10">Confirmation Email</h4>
                <p className="text-xs text-neutral-45 mt-1">Check your email for order details</p>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-50 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary-10/10 flex items-center justify-center mx-auto mb-3">
                  <FiTruck className="text-primary-10" size={22} />
                </div>
                <h4 className="text-sm font-semibold text-neutral-10">Track Order</h4>
                <p className="text-xs text-neutral-45 mt-1">We'll update you on delivery status</p>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-50 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary-10/10 flex items-center justify-center mx-auto mb-3">
                  <FiDownload className="text-primary-10" size={22} />
                </div>
                <h4 className="text-sm font-semibold text-neutral-10">Invoice</h4>
                <p className="text-xs text-neutral-45 mt-1">Download invoice from email</p>
              </div>
            </div> */}
          </div>
        </Container>
      </div>
    </>
  );
};

export default OrderSuccess;
