import React from "react";
import { FiShield, FiTruck, FiClock } from "react-icons/fi";

const TrustSupport: React.FC = () => {
  const trustItems = [
    {
      icon: <FiShield className="text-primary-10" size={20} />,
      title: "100% Satisfaction",
      description: "We ensure your gift is perfect",
    },
    {
      icon: <FiTruck className="text-primary-10" size={20} />,
      title: "Free Delivery",
      description: "On orders above ₹100",
    },
    {
      icon: <FiClock className="text-primary-10" size={20} />,
      title: "Quick Response",
      description: "We reply within 12 hours",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {trustItems.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-10/10 flex items-center justify-center shrink-0">
              {item.icon}
            </div>
            <div>
              <h4 className="font-semibold text-neutral-10 text-sm">
                {item.title}
              </h4>
              <p className="text-xs text-neutral-45">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustSupport;
