import React from 'react';

interface StepContactInfoProps {
  formData: any;
  onChange: (field: keyof any, value: any) => void;
}

const StepContactInfo: React.FC<StepContactInfoProps> = ({ formData, onChange }) => {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-xl font-semibold text-neutral-10 mb-2">Contact Information</h2>
      <p className="text-neutral-45 text-sm mb-6">Fill in your details so we can reach out to you.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-10 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            placeholder="Your full name"
            className="w-full px-4 py-2.5 border border-neutral-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-10 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-2.5 border border-neutral-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-10 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full px-4 py-2.5 border border-neutral-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-10 mb-1">
            City
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => onChange('city', e.target.value)}
            placeholder="Enter city"
            className="w-full px-4 py-2.5 border border-neutral-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-10 mb-1">
            State
          </label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) => onChange('state', e.target.value)}
            placeholder="Enter state"
            className="w-full px-4 py-2.5 border border-neutral-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-10 mb-1">
            Pincode
          </label>
          <input
            type="text"
            value={formData.pincode}
            onChange={(e) => onChange('pincode', e.target.value)}
            placeholder="Enter pincode"
            className="w-full px-4 py-2.5 border border-neutral-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent"
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-neutral-10 mb-1">
          Delivery Address
        </label>
        <textarea
          value={formData.address}
          onChange={(e) => onChange('address', e.target.value)}
          placeholder="Enter full delivery address"
          className="w-full px-4 py-3 border border-neutral-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent min-h-[80px]"
        />
      </div>
    </div>
  );
};

export default StepContactInfo;