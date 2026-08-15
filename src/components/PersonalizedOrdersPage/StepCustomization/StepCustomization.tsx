import React from 'react';
import FileUploader from '../FileUploader/FileUploader';

interface StepCustomizationProps {
  formData: any;
  uploadedFiles: File[];
  onChange: (field: keyof any, value: any) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileRemove: (index: number) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const StepCustomization: React.FC<StepCustomizationProps> = ({
  formData,
  uploadedFiles,
  onChange,
  onFileUpload,
  onFileRemove,
  fileInputRef,
}) => {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-xl font-semibold text-neutral-10 mb-2">Customization Details</h2>
      <p className="text-neutral-45 text-sm mb-6">Add personalized touches and delivery preferences.</p>

      {/* Custom Message */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-neutral-10 mb-2">
          Personalized Message
        </label>
        <textarea
          value={formData.customMessage}
          onChange={(e) => onChange('customMessage', e.target.value)}
          placeholder="Write a personal message to be included with the gift..."
          className="w-full px-4 py-3 border border-neutral-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent min-h-[80px]"
        />
        <p className="text-xs text-neutral-45 mt-1">
          {formData.customMessage.length}/500 characters
        </p>
      </div>

      {/* Delivery Date */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-neutral-10 mb-2">
          Desired Delivery Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={formData.deliveryDate}
          onChange={(e) => onChange('deliveryDate', e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className="w-full px-4 py-2.5 border border-neutral-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent"
          required
        />
        <p className="text-xs text-neutral-45 mt-1">Please allow at least 5-7 business days for personalized orders.</p>
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-neutral-10 mb-2">
          Reference Images
        </label>
        <FileUploader
          files={uploadedFiles}
          onFileUpload={onFileUpload}
          onFileRemove={onFileRemove}
          fileInputRef={fileInputRef}
        />
      </div>
    </div>
  );
};

export default StepCustomization;