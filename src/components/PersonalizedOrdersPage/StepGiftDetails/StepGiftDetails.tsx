import React from 'react';
import OccasionSelector from '../OccasionSelector/OccasionSelector';

interface StepGiftDetailsProps {
  formData: any;
  onChange: (field: keyof any, value: any) => void;
}

const StepGiftDetails: React.FC<StepGiftDetailsProps> = ({ formData, onChange }) => {
  const ageGroups = [
    '0-1 year',
    '1-3 years',
    '4-7 years',
    '8-12 years',
    '13-17 years',
    '18-25 years',
    '26-35 years',
    '36-50 years',
    '50+ years',
  ];

  return (
    <div className="animate-fadeIn">
      <h2 className="text-xl font-semibold text-neutral-10 mb-2">Tell Us About the Gift</h2>
      <p className="text-neutral-45 text-sm mb-6">Help us understand who you're gifting to and for what occasion.</p>

      {/* Occasion Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-neutral-10 mb-3">
          What's the occasion? <span className="text-red-500">*</span>
        </label>
        <OccasionSelector
          selected={formData.occasion}
          onChange={(value) => onChange('occasion', value)}
        />
      </div>

      {/* Recipient Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-neutral-10 mb-1">
            Recipient's Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.recipientName}
            onChange={(e) => onChange('recipientName', e.target.value)}
            placeholder="Enter recipient name"
            className="w-full px-4 py-2.5 border border-neutral-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-10 mb-1">
            Relation to Recipient
          </label>
          <input
            type="text"
            value={formData.recipientRelation}
            onChange={(e) => onChange('recipientRelation', e.target.value)}
            placeholder="e.g., Friend, Family, Colleague"
            className="w-full px-4 py-2.5 border border-neutral-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-10 mb-1">
            Gift For
          </label>
          <select
            value={formData.giftFor}
            onChange={(e) => onChange('giftFor', e.target.value)}
            className="w-full px-4 py-2.5 border border-neutral-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent"
          >
            <option value="">Select...</option>
            <option value="self">Myself</option>
            <option value="partner">Partner/Spouse</option>
            <option value="family">Family Member</option>
            <option value="friend">Friend</option>
            <option value="colleague">Colleague</option>
            <option value="client">Client</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-10 mb-1">
            Age Group
          </label>
          <select
            value={formData.ageGroup}
            onChange={(e) => onChange('ageGroup', e.target.value)}
            className="w-full px-4 py-2.5 border border-neutral-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent"
          >
            <option value="">Select age group...</option>
            {ageGroups.map((age) => (
              <option key={age} value={age}>{age}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default StepGiftDetails;