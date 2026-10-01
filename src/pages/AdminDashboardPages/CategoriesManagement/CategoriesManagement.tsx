/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiTag,
  FiFolder,
  FiLayers,
  FiSearch,
} from "react-icons/fi";
import toast from "react-hot-toast";
import AdminPageHeader from "../../../components/Reusable/AdminReusable/AdminPageHeader/AdminPageHeader";
import DataTable from "../../../components/Reusable/DataTable/DataTable";
import DataTableEmpty from "../../../components/Reusable/DataTable/DataTableEmpty";
import DataTablePagination from "../../../components/Reusable/DataTable/DataTablePagination";
import AddOrEditCategoryModal from "../../../components/AdminDashboardComponents/CategoriesManagementPage/AddOrEditCategoryModal/AddOrEditCategoryModal";
import DeleteConfirmationModal from "../../../components/Reusable/DeleteConfirmationModal/DeleteConfirmationModal";
import {
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../../redux/Features/Category/categoryApi";
import type { TDataTableColumn } from "../../../types/dataTable.types";
import type { TCategories } from "../../../types/categories.types";
import SubItemsPopover, {
  type TSubItem,
} from "../../../components/Reusable/SubItemsPopover/SubItemsPopover";

const ITEMS_PER_PAGE = 10;

const CategoriesManagement = () => {
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  // ─── State ───────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const skip = (page - 1) * limit;

  // Add/Edit modal
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<TCategories | null>(
    null,
  );

  // Delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<TCategories | null>(
    null,
  );

  const [updateCategory, { isLoading: isUpdatingCategory }] =
      useUpdateCategoryMutation();

  const {
    data: categoryData,
    isLoading: isCategoriesLoading,
    isFetching,
  } = useGetAllCategoriesQuery({ keyword: search, skip, limit });
  const meta = categoryData?.data?.meta || {};

  const categories: TCategories[] = categoryData?.data?.data || [];

  const [togglingId, setTogglingId] = useState<string | null>(null);
  const handleToggleActive = async (category: TCategories) => {
    setTogglingId(category._id);
    try {
      await updateCategory({
        id: category._id,
        data: { isActive: !category.isActive },
      }).unwrap();
      toast.success(
        `Category ${!category.isActive ? "activated" : "deactivated"}`,
      );
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update status");
    } finally {
      setTogglingId(null);
    }
  };

  // ─── Helpers ─────────────────────────────────────────
  const getSubCategories = (category: TCategories): string[] => {
    return (category.subCategories || [])
      .map((s: any) => (typeof s === "string" ? s : s?.name))
      .filter(Boolean);
  };

  // ─── Handlers ────────────────────────────────────────
  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsFormModalOpen(true);
  };

  const handleEditCategory = (category: TCategories) => {
    setEditingCategory(category);
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (category: TCategories) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await deleteCategory(categoryToDelete._id).unwrap();
      toast.success("Category deleted successfully!");
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete category");
    }
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingCategory(null);
  };

  const handleSelectToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(
      checked
        ? categories
            .map((category) => category._id)
            .filter((id): id is string => id !== undefined)
        : [],
    );
  };

  const loading = isCategoriesLoading || isFetching;

  // ─── Table columns ───────────────────────────────────

  const columns: TDataTableColumn<TCategories>[] = [
    {
      key: "category",
      header: "Category",
      render: (category) => (
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl overflow-hidden bg-neutral-20 shrink-0">
            {category.imageUrl ? (
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FiTag size={16} className="text-neutral-45" />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-neutral-10 truncate">
              {category.name}
            </p>
            <p className="text-[11px] text-neutral-45 truncate">
              {category.areaName || "—"}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "description",
      header: "Description",
      hiddenAt: "lg",
      render: (category) => (
        <p className="text-xs text-neutral-45 line-clamp-2 max-w-55">
          {category.description || "—"}
        </p>
      ),
    },
    {
      key: "subCategories",
      header: "Sub-categories",
      render: (category) => {
        const items: TSubItem[] = (category.subCategories || []).map(
          (sub: any) => ({
            label: typeof sub === "string" ? sub : sub?.name,
          }),
        );

        return (
          <SubItemsPopover
            items={items}
            maxVisible={2}
            itemLabel="sub-categories"
          />
        );
      },
    },
    {
      key: "count",
      header: "Count",
      align: "center",
      widthClass: "w-16",
      render: (category) => (
        <span className="text-xs font-semibold text-neutral-10">
          {getSubCategories(category).length}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (category) => (
         <button
          type="button"
          onClick={() => handleToggleActive(category)}
          disabled={isUpdatingCategory}
          className={`
    inline-flex items-center gap-1.5 text-[11px] font-medium 
    px-2.5 py-1 rounded-full transition-all cursor-pointer
    disabled:opacity-60 disabled:cursor-not-allowed
    ${
      category.isActive
        ? "bg-green-50 text-green-700 hover:bg-green-100"
        : "bg-neutral-20 text-neutral-45 hover:bg-neutral-45/20"
    }
  `}
          title={
            category.isActive ? "Click to deactivate" : "Click to activate"
          }
        >
          {togglingId === category._id ? (
            <>
              <span className="size-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <span
                className={`size-1.5 rounded-full ${
                  category.isActive ? "bg-green-500" : "bg-neutral-45"
                }`}
              />
              {category.isActive ? "Active" : "Inactive"}
            </>
          )}
        </button>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      widthClass: "w-24",
      render: (category) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => handleEditCategory(category)}
            className="p-1.5 rounded-lg text-neutral-45 hover:text-primary-10 hover:bg-primary-10/10 transition-all"
            aria-label="Edit category"
          >
            <FiEdit2 size={14} />
          </button>
          <button
            onClick={() => handleDeleteClick(category)}
            className="p-1.5 rounded-lg text-neutral-45 hover:text-red-500 hover:bg-red-50 transition-all"
            aria-label="Delete category"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5 font-Manrope">
      {/* Header */}
      <AdminPageHeader
        eyebrow="Catalog"
        title="Categories Management"
        description="Organize products into categories and sub-categories."
        actions={
          <button
            onClick={handleAddCategory}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-10 text-white text-sm font-medium hover:bg-[#d4892a] transition-all shadow-md shadow-primary-10/20"
          >
            <FiPlus size={16} />
            Add Category
          </button>
        }
      />

      {/* Stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          label="Total Categories"
          value={categories.length}
          icon={<FiTag size={18} />}
          accent="bg-blue-50 text-blue-600"
        />
        <StatCard
          label="Total Sub-categories"
          value={categories.reduce(
            (sum, c) => sum + getSubCategories(c).length,
            0,
          )}
          icon={<FiFolder size={18} />}
          accent="bg-primary-10/10 text-primary-10"
        />
        <StatCard
          label="With Sub-categories"
          value={
            categories.filter((c) => getSubCategories(c).length > 0).length
          }
          icon={<FiLayers size={18} />}
          accent="bg-green-50 text-green-600"
        />
        <StatCard
          label="Avg Sub-categories"
          value={
            categories.length
              ? (
                  categories.reduce(
                    (sum, c) => sum + getSubCategories(c).length,
                    0,
                  ) / categories.length
                ).toFixed(1)
              : "0"
          }
          icon={<FiFolder size={18} />}
          accent="bg-amber-50 text-amber-600"
        />
      </div>

      {/* Search filter */}
      <div className="bg-white rounded-2xl border border-neutral-20 p-4">
        <div className="relative flex-1">
          <FiSearch
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-45"
            size={16}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search categories or sub-categories…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-20/60 border border-transparent text-sm focus:outline-none focus:bg-white focus:border-primary-10/40 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <CategoriesTableSkeleton />
      ) : categories?.length === 0 ? (
        <DataTableEmpty
          icon={<FiTag size={32} />}
          title={search ? "No matching categories" : "No categories yet"}
          description={
            search
              ? "No categories match your search. Try a different term."
              : "Get started by adding your first category."
          }
          variant={search ? "no-match" : "no-data"}
          actionLabel={search ? "Clear search" : "Add Category"}
          onAction={search ? () => setSearch("") : handleAddCategory}
        />
      ) : (
        <>
          <DataTable
            rows={categories}
            columns={columns}
            rowKey={(c) => c?._id || ""}
            selectable
            selectedIds={selectedIds}
            onSelectToggle={handleSelectToggle}
            onSelectAll={handleSelectAll}
            minWidth="800px"
          />

          <DataTablePagination
            currentPage={meta?.currentPage}
            totalPages={meta?.pages}
            totalItems={meta?.total}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setPage}
            limit={limit}
            setLimit={setLimit}
          />
        </>
      )}

      {/* Modals */}
      <AddOrEditCategoryModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        category={editingCategory}
      />

      <DeleteConfirmationModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        title="Delete this category?"
        description="Are you sure you want to delete this category? This action cannot be undone."
        confirmText="Yes, Delete"
        isLoading={isDeleting}
      />
    </div>
  );
};

// ─── Inline stat card ─────────────────────────────────────
const StatCard = ({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accent: string;
}) => (
  <div className="bg-white rounded-2xl border border-neutral-20 p-4">
    <div
      className={`size-9 rounded-xl flex items-center justify-center mb-3 ${accent}`}
    >
      {icon}
    </div>
    <p className="text-[11px] text-neutral-45">{label}</p>
    <p className="text-lg font-bold text-neutral-10 tracking-tight mt-0.5 truncate">
      {value}
    </p>
  </div>
);

// ─── Inline skeleton ──────────────────────────────────────
const CategoriesTableSkeleton = () => (
  <div className="bg-white rounded-2xl border border-neutral-20 overflow-hidden animate-pulse">
    <div className="bg-neutral-20/50 px-4 py-3 flex items-center gap-4">
      <div className="h-4 w-4 bg-neutral-20 rounded" />
      <div className="h-3 w-24 bg-neutral-20 rounded" />
      <div className="h-3 w-40 bg-neutral-20 rounded" />
      <div className="h-3 w-12 bg-neutral-20 rounded ml-auto" />
      <div className="h-3 w-16 bg-neutral-20 rounded" />
    </div>
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        className="px-4 py-4 border-b border-neutral-20 last:border-0 flex items-center gap-4"
      >
        <div className="size-4 bg-neutral-20 rounded" />
        <div className="flex items-center gap-3 w-48">
          <div className="size-9 rounded-xl bg-neutral-20" />
          <div className="h-4 w-28 bg-neutral-20 rounded" />
        </div>
        <div className="flex-1 flex gap-2">
          <div className="h-6 w-16 bg-neutral-20 rounded-lg" />
          <div className="h-6 w-20 bg-neutral-20 rounded-lg" />
          <div className="h-6 w-14 bg-neutral-20 rounded-lg" />
        </div>
        <div className="h-6 w-8 bg-neutral-20 rounded" />
        <div className="h-6 w-16 bg-neutral-20 rounded-lg" />
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

export default CategoriesManagement;
