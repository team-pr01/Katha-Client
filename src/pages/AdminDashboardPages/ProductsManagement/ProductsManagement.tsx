import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiPackage,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiMoreVertical,
  FiCheckCircle,
  FiAlertCircle,
  FiDownload,
  FiUpload,
  FiStar,
  FiFile,
  FiEyeOff,
  FiZap,
  FiXCircle,
} from "react-icons/fi";
import type { TProduct } from "../../../types/product.type";
import type { TKPIItem } from "../../../types/kpi.types";
import {
  getPrimaryImage,
  getProductPriceRange,
  getProductTotalStock,
  getStockStatus,
} from "../../../utils/productHelpers";
import type { TDataTableColumn } from "../../../types/dataTable.types";
import AdminPageHeader from "../../../components/Reusable/AdminReusable/AdminPageHeader/AdminPageHeader";
import KPIStrip from "../../../components/Reusable/AdminReusable/KPIStrip/KPIStrip";
import DataFilters from "../../../components/Reusable/DataFilters/DataFilters";
import BulkActionBar from "../../../components/Reusable/AdminReusable/BulkActionBar/BulkActionBar";
import DataTableEmpty from "../../../components/Reusable/DataTable/DataTableEmpty";
import DataTable from "../../../components/Reusable/DataTable/DataTable";
import DataTablePagination from "../../../components/Reusable/DataTable/DataTablePagination";
import ProductVariantsDrawer from "../../../components/AdminDashboardComponents/ProductsManagementPage/ProductVariantsDrawer/ProductVariantsDrawer";
import ProductDeleteModal from "../../../components/AdminDashboardComponents/ProductsManagementPage/ProductDeleteModal/ProductDeleteModal";
import AddOrEditVariantModal from "../../../components/AdminDashboardComponents/ProductsManagementPage/AddOrEditVariantModal/AddOrEditVariantModal";
import { useGetAllProductsQuery } from "../../../redux/Features/Product/productApi";
import { useGetAllCategoriesQuery } from "../../../redux/Features/Category/categoryApi";

const ITEMS_PER_PAGE = 10;

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "published", label: "Published" },
  { value: "unpublished", label: "Not Published" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const sortOptions = [
  { value: "stock-low", label: "Stock: Low → High" },
  { value: "best-selling", label: "Best Selling" },
];

const ProductsManagement = () => {
  const navigate = useNavigate();

  const { data: categoryData } = useGetAllCategoriesQuery({});

  const categories = [
    { value: "", label: "All Categories" },
    ...(categoryData?.data?.data || []).map((category: any) => ({
      value: category?.name,
      label: category?.name,
    })),
  ];

  // ─── Filters & UI state ─────────────────────────────
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useGetAllProductsQuery({
    category: category ? [category] : [],
    // subCategory: selectedSubCategories,
    // occasionNames: selectedOccasions,
    // subOccasionNames: selectedSubOccasions,
    // material: selectedMaterials,
    // colors: selectedColors,
    keyword: keyword,
    status,
    // minPrice: minPrice as any,
    // maxPrice: maxPrice as any,
    // sortBy: sortBy as any,
  });
  console.log(data);
  const products = data?.data?.data || [];

  // ─── Drawer / Modal state ───────────────────────────
  const [variantsDrawerOpen, setVariantsDrawerOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<TProduct | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<TProduct | null>(null);
  const [addVariantOpen, setAddVariantOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // ─── Mock Data ──────────────────────────────────────
  const kpi = {
    totalProducts: 182,
    publishedProducts: 148,
    outOfStock: 12,
    notPublishedProducts: 34,
    activeProducts: 120,
    inactiveProducts: 12,
    featuredProducts: 12,
  };

  // ─── KPI items ──────────────────────────────────────
  const kpiItems: TKPIItem[] = [
    {
      id: "total",
      label: "Total Products",
      value: kpi.totalProducts.toLocaleString("en-IN"),
      icon: <FiPackage size={18} />,
      accent: "bg-blue-50 text-blue-600",
    },
    {
      id: "published",
      label: "Published",
      value: kpi.publishedProducts.toLocaleString("en-IN"),
      icon: <FiCheckCircle size={18} />,
      accent: "bg-green-50 text-green-600",
    },
    {
      id: "not-published",
      label: "Not Published",
      value: kpi.notPublishedProducts.toLocaleString("en-IN"),
      icon: <FiEyeOff size={18} />,
      accent: "bg-amber-50 text-amber-600",
    },
    {
      id: "active",
      label: "Active Products",
      value: kpi.activeProducts.toLocaleString("en-IN"),
      icon: <FiZap size={18} />,
      accent: "bg-emerald-50 text-emerald-600",
    },
    {
      id: "inactive",
      label: "Inactive Products",
      value: kpi.inactiveProducts.toLocaleString("en-IN"),
      icon: <FiXCircle size={18} />,
      accent: "bg-red-50 text-red-600",
    },
    {
      id: "featured",
      label: "Featured Products",
      value: kpi.featuredProducts.toLocaleString("en-IN"),
      icon: <FiStar size={18} />,
      accent: "bg-primary-10/10 text-primary-10",
    },
    {
      id: "oos",
      label: "Out of Stock",
      value: kpi.outOfStock.toLocaleString("en-IN"),
      icon: <FiAlertCircle size={18} />,
      accent: "bg-red-50 text-red-600",
    },
  ];

  // ─── Pagination ─────────────────────────────────────
  const totalPages = 1;

  // ─── Handlers ───────────────────────────────────────
  const handleClearFilters = () => {
    setKeyword("");
    setCategory("");
    setStatus("all");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const handleOpenVariants = (product: TProduct) => {
    setActiveProduct(product);
    setVariantsDrawerOpen(true);
  };

  const handleEditProduct = (product: TProduct) => {
    navigate(`/admin/products/${product._id}/edit`);
  };

  const handleDeleteClick = (product: TProduct) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      // TODO: await deleteProduct(productToDelete._id).unwrap();
      await new Promise((r) => setTimeout(r, 800));
      setDeleteModalOpen(false);
      setProductToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddVariant = () => {
    setAddVariantOpen(true);
  };

  // ─── Table columns ──────────────────────────────────
  const columns: TDataTableColumn<TProduct>[] = [
    {
      key: "product",
      header: "Product",
      render: (p) => {
        const img = getPrimaryImage(p);
        return (
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-xl bg-neutral-20 overflow-hidden shrink-0">
              {img ? (
                <img
                  src={img}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FiPackage size={18} className="text-neutral-45" />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <Link
                to={`/product/${p.slug}`}
                target="_blank"
                className="text-sm font-semibold text-neutral-10 hover:text-primary-10 transition-colors truncate block max-w-55"
              >
                {p.name}
              </Link>
              <p className="text-[11px] text-neutral-45 mt-0.5 truncate max-w-55">
                {p.slug}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      key: "category",
      header: "Category",
      hiddenAt: "lg",
      render: (p) => (
        <div>
          <p className="text-xs font-medium text-neutral-10">{p.category}</p>
          <p className="text-[11px] text-neutral-45 mt-0.5">{p.subCategory}</p>
        </div>
      ),
    },
    {
      key: "variants",
      header: "Variants",
      render: (p) => (
        <button
          onClick={() => handleOpenVariants(p)}
          className="flex items-center gap-1.5 text-xs font-medium text-neutral-10 hover:text-primary-10 transition-colors"
        >
          <span className="size-6 rounded-lg bg-neutral-20 flex items-center justify-center text-[10px] font-bold">
            {p.variants.length}
          </span>
          <span className="hidden sm:inline">
            {p.variants.length === 1 ? "variant" : "variants"}
          </span>
          <FiEye size={11} className="opacity-60" />
        </button>
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (p) => (
        <span className="text-xs font-semibold text-neutral-10">
          {getProductPriceRange(p)}
        </span>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      render: (p) => {
        const total = getProductTotalStock(p);
        const cfg = getStockStatus(p);
        return (
          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full ${cfg.className}`}
          >
            <span className={`size-1.5 rounded-full ${cfg.dot}`} />
            {total} · {cfg.label}
          </span>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      widthClass: "w-40",
      render: (p) => (
        <div className="flex items-center justify-end gap-1">
          {/* Add variant shortcut */}
          <button
            onClick={() => {
              setActiveProduct(p);
              handleAddVariant();
            }}
            className="p-1.5 rounded-lg text-neutral-45 hover:text-primary-10 hover:bg-primary-10/10 transition-all"
            title="Add variant"
            aria-label="Add variant"
          >
            <FiPlus size={14} />
          </button>

          <button
            onClick={() => handleEditProduct(p)}
            className="p-1.5 rounded-lg text-neutral-45 hover:text-primary-10 hover:bg-primary-10/10 transition-all"
            title="Edit product"
            aria-label="Edit product"
          >
            <FiEdit2 size={14} />
          </button>

          <button
            onClick={() => handleDeleteClick(p)}
            className="p-1.5 rounded-lg text-neutral-45 hover:text-red-500 hover:bg-red-50 transition-all"
            title="Delete product"
            aria-label="Delete product"
          >
            <FiTrash2 size={14} />
          </button>

          {/* More menu */}
          <div className="relative">
            <button
              onClick={() => setOpenMenuId(openMenuId === p._id ? null : p._id)}
              className="p-1.5 rounded-lg text-neutral-45 hover:text-neutral-10 hover:bg-neutral-20 transition-all"
              aria-label="More actions"
            >
              <FiMoreVertical size={14} />
            </button>

            {openMenuId === p._id && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setOpenMenuId(null)}
                />
                <div className="absolute right-0 top-full mt-1 z-20 w-44 bg-white rounded-xl border border-neutral-20 shadow-xl p-1">
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-neutral-10 hover:bg-neutral-20 transition-colors">
                    <FiEye size={12} />
                    Preview
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-neutral-10 hover:bg-neutral-20 transition-colors">
                    <FiUpload size={12} />
                    {p.isPublished ? "Unpublish" : "Publish"}
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-neutral-10 hover:bg-neutral-20 transition-colors">
                    <FiStar size={12} />
                    {p.isFeatured ? "Unfeature" : "Feature"}
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-neutral-10 hover:bg-neutral-20 transition-colors">
                    <FiDownload size={12} />
                    Duplicate
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ),
    },
  ];

  // ─── Bulk actions ───────────────────────────────────
  const bulkActions = [
    {
      id: "publish",
      label: "Publish",
      onClick: () => console.log("Bulk publish", selectedIds),
      icon: <FiUpload size={12} />,
    },
    {
      id: "feature",
      label: "Feature",
      onClick: () => console.log("Bulk feature", selectedIds),
      icon: <FiStar size={12} />,
    },
    {
      id: "delete",
      label: "Delete",
      variant: "danger" as const,
      onClick: () => console.log("Bulk delete", selectedIds),
      icon: <FiTrash2 size={12} />,
    },
  ];

  const hasActiveFilters =
    keyword.trim() !== "" || category !== "" || status !== "all";

  return (
    <div className="space-y-5 font-Manrope">
      <AdminPageHeader
        eyebrow="Commerce"
        title="Products Management"
        description="Manage your product catalog, variants, and inventory."
        actions={
          <>
            <button className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-neutral-20 text-sm font-medium text-neutral-10 hover:border-primary-10/40 transition-all">
              <FiFile size={15} />
              Generate Report
            </button>
            <Link
              to="/admin/dashboard/add-product"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-10 text-white text-sm font-medium hover:bg-[#d4892a] transition-all shadow-md shadow-primary-10/20"
            >
              <FiPlus size={16} />
              Add Product
            </Link>
          </>
        }
      />

      <KPIStrip items={kpiItems} />

      <DataFilters
        search={{
          value: keyword,
          onChange: (v) => {
            setKeyword(v);
            setCurrentPage(1);
          },
          placeholder: "Search by product name, slug, or tags…",
        }}
        selects={[
          {
            id: "category",
            value: category,
            onChange: (v) => {
              setCategory(v);
              setCurrentPage(1);
            },
            options: categories,
          },
          {
            id: "status",
            value: status,
            onChange: (v) => {
              setStatus(v);
              setCurrentPage(1);
            },
            options: statusOptions,
          },
          {
            id: "sort",
            value: sortBy,
            onChange: (v) => {
              setSortBy(v);
              setCurrentPage(1);
            },
            options: sortOptions,
          },
        ]}
        hasActiveFilters={hasActiveFilters}
        onClear={handleClearFilters}
      />

      <BulkActionBar
        selectedCount={selectedIds.length}
        onClearSelection={() => setSelectedIds([])}
        actions={bulkActions}
      />

      {products?.length === 0 ? (
        <DataTableEmpty
          icon={<FiPackage size={32} />}
          title="No products found"
          description={
            hasActiveFilters
              ? "No products match your current filters. Try adjusting them."
              : "Add your first product to start selling."
          }
          variant={hasActiveFilters ? "no-match" : "no-data"}
          actionLabel="Clear filters"
          onAction={handleClearFilters}
        />
      ) : (
        <>
          <DataTable
            rows={products}
            columns={columns}
            rowKey={(p) => p._id}
            selectable
            selectedIds={selectedIds}
            onSelectToggle={(id) =>
              setSelectedIds((prev) =>
                prev.includes(id)
                  ? prev.filter((i) => i !== id)
                  : [...prev, id],
              )
            }
            onSelectAll={(checked) =>
              setSelectedIds(
                checked ? products?.map((p: TProduct) => p._id) : [],
              )
            }
            minWidth="1100px"
          />

          <DataTablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={products?.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {/* ─── Drawers & Modals ─────────────────────────── */}
      <ProductVariantsDrawer
        isOpen={variantsDrawerOpen}
        onClose={() => setVariantsDrawerOpen(false)}
        product={activeProduct}
        onAddVariant={handleAddVariant}
      />

      <ProductDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        productName={productToDelete?.name}
        isLoading={isDeleting}
      />

      <AddOrEditVariantModal
        isOpen={addVariantOpen}
        onClose={() => setAddVariantOpen(false)}
        productId={activeProduct?._id}
      />
    </div>
  );
};

export default ProductsManagement;
