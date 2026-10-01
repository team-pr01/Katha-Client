/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiPackage,
  FiLayers,
  FiSearch,
  FiCheckCircle,
  FiPlusCircle,
} from "react-icons/fi";
import toast from "react-hot-toast";
import AdminPageHeader from "../../../components/Reusable/AdminReusable/AdminPageHeader/AdminPageHeader";
import DataTable from "../../../components/Reusable/DataTable/DataTable";
import DataTableEmpty from "../../../components/Reusable/DataTable/DataTableEmpty";
import DataTablePagination from "../../../components/Reusable/DataTable/DataTablePagination";
import DeleteConfirmationModal from "../../../components/Reusable/DeleteConfirmationModal/DeleteConfirmationModal";
import AddOrEditMaterialModal from "../../../components/AdminDashboardComponents/MaterialsManagementPage/AddOrEditMaterialModal/AddOrEditMaterialModal";
import AddOrEditVariantModal from "../../../components/AdminDashboardComponents/MaterialsManagementPage/AddOrEditVariantModal/AddOrEditVariantModal";
import MaterialVariantChips from "../../../components/AdminDashboardComponents/MaterialsManagementPage/MaterialVariantChips/MaterialVariantChips";
import {
  useGetAllMaterialsQuery,
  useDeleteMaterialMutation,
  useUpdateMaterialMutation,
} from "../../../redux/Features/Material/materialApi";
import type { TDataTableColumn } from "../../../types/dataTable.types";
import type {
  TMaterials,
  TMaterialVariant,
} from "../../../types/materials.type";
import ManageCategoriesDrawer from "../../../components/AdminDashboardComponents/MaterialsManagementPage/ManageCategoriesDrawer/ManageCategoriesDrawer";

const MaterialsManagement = () => {
  // ─── State ───────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const skip = (page - 1) * limit;

  // Material Add/Edit modal
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<TMaterials | null>(
    null,
  );

  // Variant Add/Edit modal
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const [activeMaterialId, setActiveMaterialId] = useState<string>("");
  const [editingVariant, setEditingVariant] = useState<TMaterialVariant | null>(
    null,
  );
  const [editingVariantIndex, setEditingVariantIndex] = useState<number | null>(
    null,
  );

  // Delete modals
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState<TMaterials | null>(
    null,
  );

  // ─── Queries & mutations ─────────────────────────────
  const {
    data: materialsData,
    isLoading: isMaterialsLoading,
    isFetching,
  } = useGetAllMaterialsQuery({ keyword: search, skip, limit });

  const meta = materialsData?.data?.meta || {};
  const materials: TMaterials[] = materialsData?.data?.data || [];

  const [deleteMaterial, { isLoading: isDeleting }] =
    useDeleteMaterialMutation();
  const [updateMaterial, { isLoading: isUpdatingMaterial }] =
    useUpdateMaterialMutation();
  //   const [deleteVariant] = useDeleteVariantMutation();

  // ─── Handlers ────────────────────────────────────────
  const handleAddMaterial = () => {
    setEditingMaterial(null);
    setIsMaterialModalOpen(true);
  };

  const handleEditMaterial = (material: TMaterials) => {
    setEditingMaterial(material);
    setIsMaterialModalOpen(true);
  };

  const handleDeleteClick = (material: TMaterials) => {
    setMaterialToDelete(material);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!materialToDelete) return;
    try {
      await deleteMaterial(materialToDelete._id).unwrap();
      toast.success("Material deleted successfully!");
      setIsDeleteModalOpen(false);
      setMaterialToDelete(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete material");
    }
  };

  const [togglingId, setTogglingId] = useState<string | null>(null);
  const handleToggleActive = async (material: TMaterials) => {
    setTogglingId(material._id);
    try {
      await updateMaterial({
        id: material._id,
        data: { isActive: !material.isActive },
      }).unwrap();
      toast.success(
        `Material ${!material.isActive ? "activated" : "deactivated"}`,
      );
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update status");
    } finally {
      setTogglingId(null);
    }
  };

  
  // Variant handlers
  const handleAddVariant = (materialId: string) => {
    setActiveMaterialId(materialId);
    setEditingVariant(null);
    setEditingVariantIndex(null);
    setIsVariantModalOpen(true);
  };

  //   const handleEditVariant = (
  //     materialId: string,
  //     variant: TMaterialVariant,
  //     index: number,
  //   ) => {
  //     setActiveMaterialId(materialId);
  //     setEditingVariant(variant);
  //     setEditingVariantIndex(index);
  //     setIsVariantModalOpen(true);
  //   };

  //   const handleDeleteVariant = async (materialId: string, index: number) => {
  //     if (!window.confirm("Delete this variant?")) return;
  //     try {
  //       await deleteVariant({ id: materialId, variantIndex: index }).unwrap();
  //       toast.success("Variant deleted successfully!");
  //     } catch (err: any) {
  //       toast.error(err?.data?.message || "Failed to delete variant");
  //     }
  //   };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleSelectToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(
      checked
        ? materials.map((m) => m._id).filter((id): id is string => Boolean(id))
        : [],
    );
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const loading = isMaterialsLoading || isFetching;

  // ─── Table columns ───────────────────────────────────
  const columns: TDataTableColumn<TMaterials>[] = [
    {
      key: "material",
      header: "Material",
      render: (material) => (
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-primary-10/10 flex items-center justify-center shrink-0">
            <FiPackage size={16} className="text-primary-10" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-neutral-10 truncate">
              {material.name}
            </p>
            <p className="text-[11px] text-neutral-45 truncate">
              {material.category} · {material.subCategory}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "variants",
      header: "Variants",
      render: (material) => (
        <MaterialVariantChips items={material.variants || []} maxVisible={2} />
      ),
    },
    {
      key: "count",
      header: "Count",
      align: "center",
      widthClass: "w-16",
      render: (material) => (
        <span className="text-xs font-semibold text-neutral-10">
          {(material.variants || []).length}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (material) => (
        <button
          type="button"
          onClick={() => handleToggleActive(material)}
          disabled={isUpdatingMaterial}
          className={`
    inline-flex items-center gap-1.5 text-[11px] font-medium 
    px-2.5 py-1 rounded-full transition-all cursor-pointer
    disabled:opacity-60 disabled:cursor-not-allowed
    ${
      material.isActive
        ? "bg-green-50 text-green-700 hover:bg-green-100"
        : "bg-neutral-20 text-neutral-45 hover:bg-neutral-45/20"
    }
  `}
          title={
            material.isActive ? "Click to deactivate" : "Click to activate"
          }
        >
          {togglingId === material._id ? (
            <>
              <span className="size-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <span
                className={`size-1.5 rounded-full ${
                  material.isActive ? "bg-green-500" : "bg-neutral-45"
                }`}
              />
              {material.isActive ? "Active" : "Inactive"}
            </>
          )}
        </button>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      widthClass: "w-32",
      render: (material) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => handleAddVariant(material._id)}
            className="p-1.5 rounded-lg text-neutral-45 hover:text-primary-10 hover:bg-primary-10/10 transition-all"
            title="Add variant"
            aria-label="Add variant"
          >
            <FiPlusCircle size={14} />
          </button>
          <button
            onClick={() => handleEditMaterial(material)}
            className="p-1.5 rounded-lg text-neutral-45 hover:text-primary-10 hover:bg-primary-10/10 transition-all"
            title="Edit material"
            aria-label="Edit material"
          >
            <FiEdit2 size={14} />
          </button>
          <button
            onClick={() => handleDeleteClick(material)}
            className="p-1.5 rounded-lg text-neutral-45 hover:text-red-500 hover:bg-red-50 transition-all"
            title="Delete material"
            aria-label="Delete material"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  const [isManageCategoriesDrawerOpen, setIsManageCategoriesDrawerOpen] =
    useState(false);

  return (
    <div className="space-y-5 font-Manrope">
      {/* Header */}
      <AdminPageHeader
        eyebrow="Catalog"
        title="Materials Management"
        description="Manage raw materials and their variants."
        actions={
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsManageCategoriesDrawerOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white hover:text-white text-neutral-5 text-sm font-medium hover:bg-[#d4892a] transition-all shadow-md"
            >
              Manage Categories
            </button>
            <button
              onClick={handleAddMaterial}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-10 text-white text-sm font-medium hover:bg-[#d4892a] transition-all shadow-md shadow-primary-10/20"
            >
              <FiPlus size={16} />
              Add Material
            </button>
          </div>
        }
      />

      {/* Stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          label="Total Materials"
          value={meta?.total ?? materials.length}
          icon={<FiPackage size={18} />}
          accent="bg-blue-50 text-blue-600"
        />
        <StatCard
          label="Total Variants"
          value={materials.reduce(
            (sum, m) => sum + (m.variants?.length || 0),
            0,
          )}
          icon={<FiLayers size={18} />}
          accent="bg-primary-10/10 text-primary-10"
        />
        <StatCard
          label="Active"
          value={materials.filter((m) => m.isActive).length}
          icon={<FiCheckCircle size={18} />}
          accent="bg-green-50 text-green-600"
        />
        <StatCard
          label="Avg Variants"
          value={
            materials.length
              ? (
                  materials.reduce(
                    (sum, m) => sum + (m.variants?.length || 0),
                    0,
                  ) / materials.length
                ).toFixed(1)
              : "0"
          }
          icon={<FiLayers size={18} />}
          accent="bg-amber-50 text-amber-600"
        />
      </div>

      {/* Search */}
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
            placeholder="Search materials…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-20/60 border border-transparent text-sm focus:outline-none focus:bg-white focus:border-primary-10/40 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <MaterialsTableSkeleton />
      ) : materials.length === 0 ? (
        <DataTableEmpty
          icon={<FiPackage size={32} />}
          title={search ? "No matching materials" : "No materials yet"}
          description={
            search
              ? "No materials match your search. Try a different term."
              : "Get started by adding your first material."
          }
          variant={search ? "no-match" : "no-data"}
          actionLabel={search ? "Clear search" : "Add Material"}
          onAction={search ? () => setSearch("") : handleAddMaterial}
        />
      ) : (
        <>
          <DataTable
            rows={materials}
            columns={columns}
            rowKey={(m) => m._id}
            selectable
            selectedIds={selectedIds}
            onSelectToggle={handleSelectToggle}
            onSelectAll={handleSelectAll}
            minWidth="900px"
          />

          <DataTablePagination
            currentPage={meta?.currentPage ?? page}
            totalPages={meta?.pages ?? 1}
            totalItems={meta?.total ?? materials.length}
            itemsPerPage={limit}
            onPageChange={setPage}
            limit={limit}
            setLimit={handleLimitChange}
          />
        </>
      )}

      {/* Modals */}
      <AddOrEditMaterialModal
        isOpen={isMaterialModalOpen}
        onClose={() => {
          setIsMaterialModalOpen(false);
          setEditingMaterial(null);
        }}
        material={editingMaterial}
      />

      <AddOrEditVariantModal
        isOpen={isVariantModalOpen}
        onClose={() => {
          setIsVariantModalOpen(false);
          setEditingVariant(null);
          setEditingVariantIndex(null);
        }}
        materialId={activeMaterialId}
        variant={editingVariant}
        variantIndex={editingVariantIndex}
      />

      <DeleteConfirmationModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        title="Delete this material?"
        description="Are you sure you want to delete this material? All its variants will also be removed. This action cannot be undone."
        confirmText="Yes, Delete"
        isLoading={isDeleting}
      />

      <ManageCategoriesDrawer
        isOpen={isManageCategoriesDrawerOpen}
        onClose={() => setIsManageCategoriesDrawerOpen(false)}
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
const MaterialsTableSkeleton = () => (
  <div className="bg-white rounded-2xl border border-neutral-20 overflow-hidden animate-pulse">
    <div className="bg-neutral-20/50 px-4 py-3 flex items-center gap-4">
      <div className="h-4 w-4 bg-neutral-20 rounded" />
      <div className="h-3 w-32 bg-neutral-20 rounded" />
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
        <div className="flex items-center gap-3 w-52">
          <div className="size-10 rounded-xl bg-neutral-20" />
          <div className="space-y-2">
            <div className="h-4 w-32 bg-neutral-20 rounded" />
            <div className="h-3 w-20 bg-neutral-20 rounded" />
          </div>
        </div>
        <div className="flex-1 flex gap-2">
          <div className="h-6 w-20 bg-neutral-20 rounded-lg" />
          <div className="h-6 w-16 bg-neutral-20 rounded-lg" />
        </div>
        <div className="h-6 w-8 bg-neutral-20 rounded" />
        <div className="h-6 w-20 bg-neutral-20 rounded-lg" />
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

export default MaterialsManagement;
