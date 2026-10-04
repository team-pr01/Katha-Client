/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  FiPlus,
  FiImage,
  FiLink,
  FiLayers,
  FiSearch,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useDeleteHeroMutation, useGetAllHeroesQuery } from "../../../redux/Features/Hero/heroApi";
import type { THero } from "../../../types/hero.types";
import AdminPageHeader from "../../../components/Reusable/AdminReusable/AdminPageHeader/AdminPageHeader";
import DataTableEmpty from "../../../components/Reusable/DataTable/DataTableEmpty";
import HeroCard from "../../../components/AdminDashboardComponents/HeroManagementPage/HeroCard/HeroCard";
import AddOrEditHeroModal from "../../../components/AdminDashboardComponents/HeroManagementPage/AddOrEditHeroModal/AddOrEditHeroModal";
import DeleteConfirmationModal from "../../../components/Reusable/DeleteConfirmationModal/DeleteConfirmationModal";

const HeroManagement = () => {
  const { data, isLoading, isFetching } = useGetAllHeroesQuery({});
  console.log(data);
  const [deleteHero, { isLoading: isDeleting }] = useDeleteHeroMutation();

  const heroes: THero[] = data?.data?.data || [];

  // ─── State ───────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingHero, setEditingHero] = useState<THero | null>(null);

  // Delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [heroToDelete, setHeroToDelete] = useState<THero | null>(null);

  // ─── Filtering ───────────────────────────────────────
  const filteredHeroes = search.trim()
    ? heroes.filter((h) => {
        const q = search.trim().toLowerCase();
        return (
          (h.alt || "").toLowerCase().includes(q) ||
          (h.link || "").toLowerCase().includes(q)
        );
      })
    : heroes;

  // ─── Handlers ────────────────────────────────────────
  const handleAddHero = () => {
    setEditingHero(null);
    setIsFormModalOpen(true);
  };

  const handleEditHero = (hero: THero) => {
    setEditingHero(hero);
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (hero: THero) => {
    setHeroToDelete(hero);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!heroToDelete?._id) return;
    try {
      await deleteHero(heroToDelete._id).unwrap();
      toast.success("Hero deleted successfully!");
      setIsDeleteModalOpen(false);
      setHeroToDelete(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete hero");
    }
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingHero(null);
  };

  const loading = isLoading || isFetching;

  return (
    <div className="space-y-5 font-Manrope">
      {/* Header */}
      <AdminPageHeader
        eyebrow="Content"
        title="Hero Management"
        description="Manage the homepage hero carousel banners."
        actions={
          <button
            onClick={handleAddHero}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-10 text-white text-sm font-medium hover:bg-[#d4892a] transition-all shadow-md shadow-primary-10/20"
          >
            <FiPlus size={16} />
            Add Hero
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <StatCard
          label="Total Heroes"
          value={heroes.length}
          icon={<FiImage size={18} />}
          accent="bg-blue-50 text-blue-600"
        />
        <StatCard
          label="With Redirect"
          value={heroes.filter((h) => h.link).length}
          icon={<FiLink size={18} />}
          accent="bg-primary-10/10 text-primary-10"
        />
        <StatCard
          label="Slides Active"
          value={heroes.length > 1 ? `${heroes.length} rotating` : "1 static"}
          icon={<FiLayers size={18} />}
          accent="bg-green-50 text-green-600"
        />
      </div>

      {/* Search */}
      {heroes.length > 0 && (
        <div className="bg-white rounded-2xl border border-neutral-20 p-4">
          <div className="relative flex-1">
            <FiSearch
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-45"
              size={16}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by alt text or link…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-20/60 border border-transparent text-sm focus:outline-none focus:bg-white focus:border-primary-10/40 transition-all"
            />
          </div>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <HeroGridSkeleton />
      ) : heroes.length === 0 ? (
        <DataTableEmpty
          icon={<FiImage size={32} />}
          title="No hero banners yet"
          description="Add your first hero banner to display on the homepage."
          variant="no-data"
          actionLabel="Add Hero"
          onAction={handleAddHero}
        />
      ) : filteredHeroes.length === 0 ? (
        <DataTableEmpty
          icon={<FiSearch size={32} />}
          title="No matching heroes"
          description="No heroes match your search. Try a different term."
          variant="no-match"
          actionLabel="Clear search"
          onAction={() => setSearch("")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredHeroes.map((hero, index) => (
            <HeroCard
              key={hero._id}
              hero={hero}
              index={index}
              onEdit={handleEditHero}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <AddOrEditHeroModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        hero={editingHero}
      />

      <DeleteConfirmationModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        title="Delete this hero?"
        description="Are you sure you want to delete this hero banner? This action cannot be undone."
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
const HeroGridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="bg-white rounded-2xl border border-neutral-20 overflow-hidden animate-pulse"
      >
        <div className="w-full aspect-16/6 bg-neutral-20" />
        <div className="p-4 space-y-2">
          <div className="h-4 w-3/4 bg-neutral-20 rounded" />
          <div className="h-3 w-1/2 bg-neutral-20 rounded" />
        </div>
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

export default HeroManagement;