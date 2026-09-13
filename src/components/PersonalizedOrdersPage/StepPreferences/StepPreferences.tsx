import React from 'react';
import BudgetSelector from '../BudgetSelector/BudgetSelector';

interface StepPreferencesProps {
  formData: any;
  onChange: (field: keyof any, value: any) => void;
}

const StepPreferences: React.FC<StepPreferencesProps> = ({ 
  formData, 
  onChange,
}) => {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-xl font-semibold text-neutral-10 mb-2">Your Preferences</h2>
      <p className="text-neutral-45 text-sm mb-6">Let us know your budget and what interests the recipient.</p>

      {/* Budget */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-neutral-10 mb-3">
          Budget Range <span className="text-red-500">*</span>
        </label>
        <BudgetSelector
          selected={formData.budget}
          onChange={(value) => onChange('budget', value)}
        />
      </div>

      {/* Special Requests */}
      <div>
        <label className="block text-sm font-medium text-neutral-10 mb-2">
          Special Requirements
        </label>
        <textarea
          value={formData.specialRequests}
          onChange={(e) => onChange('specialRequests', e.target.value)}
          placeholder="Any specific requirements, themes, colors, or ideas you have in mind..."
          className="w-full px-4 py-3 border border-neutral-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent min-h-25"
        />
      </div>
    </div>
  );
};

export default StepPreferences;