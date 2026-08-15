import React from 'react';
import { FiCheck } from 'react-icons/fi';

interface OrderProgressProps {
  currentStep: number;
}

const OrderProgress: React.FC<OrderProgressProps> = ({ currentStep }) => {
  const steps = [
    { id: 1, label: 'Gift Details' },
    { id: 2, label: 'Preferences' },
    { id: 3, label: 'Customization' },
    { id: 4, label: 'Contact Info' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-6">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex items-center gap-3">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all
                ${currentStep >= step.id 
                  ? 'bg-primary-10 text-white shadow-md' 
                  : 'bg-neutral-20 text-neutral-45'
                }
              `}>
                {currentStep > step.id ? <FiCheck size={18} /> : step.id}
              </div>
              <div className="hidden sm:block">
                <div className={`text-sm font-medium ${currentStep >= step.id ? 'text-neutral-10' : 'text-neutral-45'}`}>
                  {step.label}
                </div>
              </div>
            </div>
            {step.id < 4 && (
              <div className={`
                flex-1 h-0.5 mx-4 transition-all
                ${currentStep > step.id ? 'bg-primary-10' : 'bg-neutral-50'}
              `} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderProgress;