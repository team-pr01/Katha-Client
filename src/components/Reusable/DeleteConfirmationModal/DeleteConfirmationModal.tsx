import { FiAlertTriangle, FiTrash2 } from "react-icons/fi";
import Modal from "../Modal copy/Modal";

interface DeleteConfirmationModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

const DeleteConfirmationModal = ({
  isModalOpen,
  setIsModalOpen,
  onConfirm,
  title = "Delete Confirmation",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmText = "Yes, Delete",
  cancelText = "Cancel",
  isLoading = false,
}: DeleteConfirmationModalProps) => {

  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className="flex flex-col items-center text-center font-Manrope">
        {/* Warning Icon */}
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-5">
          <FiAlertTriangle className="text-red-500" size={36} />
        </div>

        {/* Title */}
        <h2 className="text-xl font-Satoshi font-semibold text-neutral-10 mb-2">
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm text-neutral-45 max-w-sm mb-4">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full mt-2">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            disabled={isLoading}
            className="
              flex-1 px-5 py-3 border-2 border-neutral-50 
              text-neutral-10 rounded-xl text-sm font-medium 
              hover:bg-neutral-20 transition-all
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="
              flex-1 px-5 py-3 bg-red-500 text-white 
              rounded-xl text-sm font-semibold 
              hover:bg-red-600 transition-all 
              shadow-sm hover:shadow-md
              flex items-center justify-center gap-2
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <FiTrash2 size={16} />
                {confirmText}
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;