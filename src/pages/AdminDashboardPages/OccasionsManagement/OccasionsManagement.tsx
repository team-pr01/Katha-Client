/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiStar,
  FiLayers,
  FiSearch,
  FiCheckCircle,
} from "react-icons/fi";
import toast from "react-hot-toast";
import AdminPageHeader from "../../../components/Reusable/AdminReusable/AdminPageHeader/AdminPageHeader";
import DataTable from "../../../components/Reusable/DataTable/DataTable";
import DataTableEmpty from "../../../components/Reusable/DataTable/DataTableEmpty";
import DataTablePagination from "../../../components/Reusable/DataTable/DataTablePagination";
import DeleteConfirmationModal from "../../../components/Reusable/DeleteConfirmationModal/DeleteConfirmationModal";
import {
  useDeleteOccasionMutation,
  useGetAllOccasionsQuery,
} from "../../../redux/Features/Occation/occasionApi";
import type { TDataTableColumn } from "../../../types/dataTable.types";
import type { TOccasion } from "../../../types/occasion.type";
import AddOrEditOccasionModal from "../../../components/AdminDashboardComponents/CategoriesManagementPage/OccasionsManagementPage/AddOrEditOccasionModal/AddOrEditOccasionModal";
import SubItemsPopover from "../../../components/Reusable/SubItemsPopover/SubItemsPopover";

const OccasionsManagement = () => {
  // ─── State ───────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const skip = (page - 1) * limit;

  // Add/Edit modal
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingOccasion, setEditingOccasion] = useState<TOccasion | null>(
    null,
  );

  // Delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [occasionToDelete, setOccasionToDelete] = useState<TOccasion | null>(
    null,
  );

  const {
    data: occasionData,
    isLoading: isOccasionsLoading,
    isFetching,
  } = useGetAllOccasionsQuery({ keyword: search, skip, limit });
  const meta = occasionData?.data?.meta || {};
  const occasions: TOccasion[] = occasionData?.data?.data || [];

  const [deleteOccasion, { isLoading: isDeleting }] =
    useDeleteOccasionMutation();

  // ─── Handlers ────────────────────────────────────────
  const handleAddOccasion = () => {
    setEditingOccasion(null);
    setIsFormModalOpen(true);
  };

  const handleEditOccasion = (occasion: TOccasion) => {
    setEditingOccasion(occasion);
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (occasion: TOccasion) => {
    setOccasionToDelete(occasion);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!occasionToDelete) return;
    try {
      await deleteOccasion(occasionToDelete._id).unwrap();
      toast.success("Occasion deleted successfully!");
      setIsDeleteModalOpen(false);
      setOccasionToDelete(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete occasion");
    }
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingOccasion(null);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1); // reset to page 1 on search
  };

  const handleSelectToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(
      checked
        ? occasions.map((o) => o._id).filter((id): id is string => Boolean(id))
        : [],
    );
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const loading = isOccasionsLoading || isFetching;

  // ─── Table columns ───────────────────────────────────
  const columns: TDataTableColumn<TOccasion>[] = [
    {
      key: "occasion",
      header: "Occasion",
      render: (occasion) => (
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl overflow-hidden bg-neutral-20 shrink-0">
            {occasion.imageUrl ? (
              <img
                src={occasion.imageUrl}
                alt={occasion.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FiStar size={16} className="text-neutral-45" />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-neutral-10 truncate">
              {occasion.name}
            </p>
            <p className="text-[11px] text-neutral-45 line-clamp-1 max-w-55">
              {occasion.description || "—"}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "subOccasions",
      header: "Sub-occasions",
      render: (occasion) => (
        <SubItemsPopover
          items={(occasion.subOccasions || []).map((s) => ({
            label: s.name,
            description: s.description,
          }))}
          maxVisible={2}
          itemLabel="sub-occasions"
        />
      ),
    },
    {
      key: "count",
      header: "Count",
      align: "center",
      widthClass: "w-16",
      render: (occasion) => (
        <span className="text-xs font-semibold text-neutral-10">
          {(occasion.subOccasions || []).length}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (occasion) => (
        <span
          className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full ${
            occasion.isActive
              ? "bg-green-50 text-green-700"
              : "bg-neutral-20 text-neutral-45"
          }`}
        >
          <span
            className={`size-1.5 rounded-full ${
              occasion.isActive ? "bg-green-500" : "bg-neutral-45"
            }`}
          />
          {occasion.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      widthClass: "w-24",
      render: (occasion) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => handleEditOccasion(occasion)}
            className="p-1.5 rounded-lg text-neutral-45 hover:text-primary-10 hover:bg-primary-10/10 transition-all"
            aria-label="Edit occasion"
          >
            <FiEdit2 size={14} />
          </button>
          <button
            onClick={() => handleDeleteClick(occasion)}
            className="p-1.5 rounded-lg text-neutral-45 hover:text-red-500 hover:bg-red-50 transition-all"
            aria-label="Delete occasion"
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
        title="Occasions Management"
        description="Manage gift occasions and their sub-occasions."
        actions={
          <button
            onClick={handleAddOccasion}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-10 text-white text-sm font-medium hover:bg-[#d4892a] transition-all shadow-md shadow-primary-10/20"
          >
            <FiPlus size={16} />
            Add Occasion
          </button>
        }
      />

      {/* Stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          label="Total Occasions"
          value={meta?.total ?? occasions.length}
          icon={<FiStar size={18} />}
          accent="bg-blue-50 text-blue-600"
        />
        <StatCard
          label="Total Sub-occasions"
          value={occasions.reduce(
            (sum, o) => sum + (o.subOccasions?.length || 0),
            0,
          )}
          icon={<FiLayers size={18} />}
          accent="bg-primary-10/10 text-primary-10"
        />
        <StatCard
          label="Active"
          value={occasions.filter((o) => o.isActive).length}
          icon={<FiCheckCircle size={18} />}
          accent="bg-green-50 text-green-600"
        />
        <StatCard
          label="Avg Sub-occasions"
          value={
            occasions.length
              ? (
                  occasions.reduce(
                    (sum, o) => sum + (o.subOccasions?.length || 0),
                    0,
                  ) / occasions.length
                ).toFixed(1)
              : "0"
          }
          icon={<FiLayers size={18} />}
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
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search occasions or sub-occasions…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-20/60 border border-transparent text-sm focus:outline-none focus:bg-white focus:border-primary-10/40 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <OccasionsTableSkeleton />
      ) : occasions.length === 0 ? (
        <DataTableEmpty
          icon={<FiStar size={32} />}
          title={search ? "No matching occasions" : "No occasions yet"}
          description={
            search
              ? "No occasions match your search. Try a different term."
              : "Get started by adding your first occasion."
          }
          variant={search ? "no-match" : "no-data"}
          actionLabel={search ? "Clear search" : "Add Occasion"}
          onAction={search ? () => setSearch("") : handleAddOccasion}
        />
      ) : (
        <>
          <DataTable
            rows={occasions}
            columns={columns}
            rowKey={(o) => o._id}
            selectable
            selectedIds={selectedIds}
            onSelectToggle={handleSelectToggle}
            onSelectAll={handleSelectAll}
            minWidth="800px"
          />

          <DataTablePagination
            currentPage={meta?.currentPage ?? page}
            totalPages={meta?.pages ?? 1}
            totalItems={meta?.total ?? occasions.length}
            itemsPerPage={limit}
            onPageChange={setPage}
            limit={limit}
            setLimit={handleLimitChange}
          />
        </>
      )}

      {/* Modals */}
      <AddOrEditOccasionModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        occasion={editingOccasion}
      />

      <DeleteConfirmationModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        title="Delete this occasion?"
        description="Are you sure you want to delete this occasion? This action cannot be undone."
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
const OccasionsTableSkeleton = () => (
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
          <div className="size-10 rounded-xl bg-neutral-20" />
          <div className="space-y-2">
            <div className="h-4 w-28 bg-neutral-20 rounded" />
            <div className="h-3 w-40 bg-neutral-20 rounded" />
          </div>
        </div>
        <div className="flex-1 flex gap-2">
          <div className="h-6 w-16 bg-neutral-20 rounded-lg" />
          <div className="h-6 w-20 bg-neutral-20 rounded-lg" />
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

export default OccasionsManagement;
