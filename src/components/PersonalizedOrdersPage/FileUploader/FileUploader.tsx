import React from 'react';
import { FiUpload, FiX } from 'react-icons/fi';

interface FileUploaderProps {
  files: File[];
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileRemove: (index: number) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  files,
  onFileUpload,
  onFileRemove,
  fileInputRef,
}) => {
  return (
    <div>
      <div 
        className="border-2 border-dashed border-neutral-50 rounded-xl p-6 text-center hover:border-primary-10 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileUpload}
          accept="image/*"
          multiple
          className="hidden"
        />
        <FiUpload className="text-primary-10 text-3xl mx-auto mb-2" />
        <p className="text-sm text-neutral-50">Drop images here or click to upload</p>
        <p className="text-xs text-neutral-50 mt-1">PNG, JPG up to 5MB each</p>
      </div>
      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-neutral-20 px-3 py-2 rounded-lg">
              <span className="text-sm text-neutral-10">{file.name}</span>
              <button
                type="button"
                onClick={() => onFileRemove(index)}
                className="text-red-500 hover:text-red-600"
              >
                <FiX size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;