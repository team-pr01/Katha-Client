import React from 'react';
import { FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface OrderSuccessProps {
  formData: any;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({ formData }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center">
      <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
        <FiCheck className="text-green-600 text-5xl" />
      </div>
      <h1 className="text-3xl font-bold text-neutral-10 mb-4">
        Order Submitted Successfully! 🎉
      </h1>
      <p className="text-neutral-45 text-lg mb-2">
        Thank you for choosing our personalized gifting service.
      </p>
      <p className="text-neutral-45 mb-6">
        Our expert team will review your requirements and get back to you within 24 hours.
      </p>
      <div className="bg-neutral-20 rounded-xl p-6 mb-8 text-left">
        <h3 className="font-semibold text-neutral-10 mb-3">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-45">Occasion</span>
            <span className="text-neutral-10 font-medium capitalize">{formData.occasion}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-45">Recipient</span>
            <span className="text-neutral-10 font-medium">{formData.recipientName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-45">Budget</span>
            <span className="text-neutral-10 font-medium">{formData.budget}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-45">Delivery Date</span>
            <span className="text-neutral-10 font-medium">{formData.deliveryDate}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/"
          className="px-6 py-3 bg-primary-10 text-white rounded-xl font-medium hover:bg-[#d4892a] transition-colors"
        >
          Return to Home
        </Link>
        <Link
          to="/products"
          className="px-6 py-3 border border-neutral-50 text-neutral-10 rounded-xl font-medium hover:bg-neutral-20 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;