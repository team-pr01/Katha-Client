/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  FiX,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiChevronDown,
  FiChevronUp,
  FiFolder,
} from "react-icons/fi";
import toast from "react-hot-toast";
import {
  useGetAllMaterialCategoriesQuery,
  useDeleteMaterialCategoryMutation,
} from "../../../../redux/Features/Material/materialCategoryApi";
import DeleteConfirmationModal from "../../../Reusable/DeleteConfirmationModal/DeleteConfirmationModal";
import AddOrEditMaterialCategoryModal from "../AddOrEditMaterialCategoryModal/AddOrEditMaterialCategoryModal";
import type { TMaterialCategory } from "../../../../types/materialCategory.types";

interface ManageCategoriesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManageCategoriesDrawer = ({
  isOpen,
  onClose,
}: ManageCategoriesDrawerProps) => {
  const { data, isLoading } = useGetAllMaterialCategoriesQuery({});
  const categories: TMaterialCategory[] = data?.data?.data || [];

  const [deleteMaterialCategory, { isLoading: isDeleting }] =
    useDeleteMaterialCategoryMutation();

  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Modal state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<TMaterialCategory | null>(null);

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<TMaterialCategory | null>(
    null,
  );

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsFormModalOpen(true);
  };

  const handleEditCategory = (category: TMaterialCategory) => {
    setEditingCategory(category);
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (category: TMaterialCategory) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await deleteMaterialCategory(categoryToDelete._id).unwrap();
      toast.success("Category deleted successfully!");
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete category");
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-neutral-10/40 backdrop-blur-sm
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Drawer — slides from LEFT */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-full sm:w-140 bg-white
          shadow-2xl flex flex-col
          transition-transform duration-500 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-20 flex items-center justify-between shrink-0">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-45 font-semibold">
              Manage
            </p>
            <h2 className="text-lg font-bold text-neutral-10 tracking-tight mt-1">
              Material Categories
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-45 hover:text-neutral-10 hover:bg-neutral-20 transition-all"
            aria-label="Close drawer"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Body — scrollable list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {isLoading ? (
            <CategoryListSkeleton />
          ) : categories.length === 0 ? (
            <div className="text-center py-12">
              <div className="size-16 rounded-full bg-neutral-20 flex items-center justify-center mx-auto mb-4">
                <FiFolder size={24} className="text-neutral-45" />
              </div>
              <h3 className="text-sm font-bold text-neutral-10">
                No categories yet
              </h3>
              <p className="text-xs text-neutral-45 mt-1">
                Add your first material category to get started.
              </p>
            </div>
          ) : (
            categories.map((category) => {
              const isExpanded = expandedId === category._id;
              const subs = category.subCategories || [];

              return (
                <div
                  key={category._id}
                  className="bg-white rounded-xl border border-neutral-20 overflow-hidden hover:border-primary-10/40 transition-all"
                >
                  {/* Category Row */}
                  <div className="flex items-center gap-3 p-3">
                    <button
                      type="button"
                      onClick={() => toggleExpand(category._id as string)}
                      className="flex items-center gap-3 flex-1 min-w-0 text-left group"
                    >
                      <div className="size-9 rounded-lg bg-primary-10/10 flex items-center justify-center shrink-0">
                        <FiFolder size={15} className="text-primary-10" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-neutral-10 truncate">
                          {category.name}
                        </p>
                        <p className="text-[11px] text-neutral-45">
                          {subs.length} sub-categor
                          {subs.length === 1 ? "y" : "ies"}
                        </p>
                      </div>
                      {subs.length > 0 && (
                        <span className="text-neutral-45 group-hover:text-primary-10 transition-colors">
                          {isExpanded ? (
                            <FiChevronUp size={16} />
                          ) : (
                            <FiChevronDown size={16} />
                          )}
                        </span>
                      )}
                    </button>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleEditCategory(category)}
                        className="p-1.5 rounded-lg text-neutral-45 hover:text-primary-10 hover:bg-primary-10/10 transition-all"
                        aria-label="Edit category"
                      >
                        <FiEdit2 size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(category)}
                        className="p-1.5 rounded-lg text-neutral-45 hover:text-red-500 hover:bg-red-50 transition-all"
                        aria-label="Delete category"
                      >
                        <FiTrash2 size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Subcategories — Accordion */}
                  {isExpanded && subs.length > 0 && (
                    <div className="px-3 pb-3 pt-0">
                      <div className="ml-6 pl-3 border-l-2 border-primary-10/20 space-y-1.5 pt-1">
                        {subs.map((sub, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-20/60 hover:bg-neutral-20 transition-colors"
                          >
                            <span className="size-1.5 rounded-full bg-primary-10 shrink-0" />
                            <span className="text-xs font-medium text-neutral-10">
                              {sub}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer — Add Category */}
        <div className="p-4 border-t border-neutral-20 shrink-0">
          <button
            type="button"
            onClick={handleAddCategory}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary-10 text-white text-sm font-semibold hover:bg-[#d4892a] transition-all shadow-md shadow-primary-10/20"
          >
            <FiPlus size={16} />
            Add Category
          </button>
        </div>
      </aside>

      {/* Add/Edit Modal */}
      <AddOrEditMaterialCategoryModal
        isModalOpen={isFormModalOpen}
        setIsModalOpen={setIsFormModalOpen}
        category={editingCategory as any}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingCategory(null);
        }}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmationModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        title="Delete this category?"
        description="Are you sure you want to delete this category? This action cannot be undone."
        confirmText="Yes, Delete"
        isLoading={isDeleting}
      />
    </>
  );
};

// ─── Inline skeleton ──────────────────────────────────────
const CategoryListSkeleton = () => (
  <div className="space-y-2 animate-pulse">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="bg-white rounded-xl border border-neutral-20 p-3 flex items-center gap-3"
      >
        <div className="size-9 rounded-lg bg-neutral-20" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 bg-neutral-20 rounded" />
          <div className="h-3 w-20 bg-neutral-20 rounded" />
        </div>
        <div className="size-6 bg-neutral-20 rounded" />
        <div className="size-6 bg-neutral-20 rounded" />
      </div>
    ))}
    <style>{`
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
    `}</style>
  </div>
);

export default ManageCategoriesDrawer;