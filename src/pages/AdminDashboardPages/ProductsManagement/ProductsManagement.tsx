import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiPackage,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiMoreVertical,
  FiCheckCircle,
  FiEdit3,
  FiAlertCircle,
  FiBox,
  FiDownload,
  FiUpload,
  FiStar,
  FiFile,
} from "react-icons/fi";
import type { TProduct, TProductVariant } from "../../../types/product.type";
import type { TKPIItem } from "../../../types/kpi.types";
import {
  getPrimaryImage,
  getProductPriceRange,
  getProductTotalStock,
  getStockStatus,
} from "../../../utils/productHelpers";
import type { TDataTableColumn } from "../../../types/dataTable.types";
import ProductStatusBadge from "../../../components/AdminDashboardComponents/ProductsManagementPage/ProductStatusBadge/ProductStatusBadge";
import AdminPageHeader from "../../../components/Reusable/AdminReusable/AdminPageHeader/AdminPageHeader";
import KPIStrip from "../../../components/Reusable/AdminReusable/KPIStrip/KPIStrip";
import DataFilters from "../../../components/Reusable/DataFilters/DataFilters";
import BulkActionBar from "../../../components/Reusable/AdminReusable/BulkActionBar/BulkActionBar";
import DataTableEmpty from "../../../components/Reusable/DataTable/DataTableEmpty";
import DataTable from "../../../components/Reusable/DataTable/DataTable";
import DataTablePagination from "../../../components/Reusable/DataTable/DataTablePagination";
import ProductVariantsDrawer from "../../../components/AdminDashboardComponents/ProductsManagementPage/ProductVariantsDrawer/ProductVariantsDrawer";
import ProductDeleteModal from "../../../components/AdminDashboardComponents/ProductsManagementPage/ProductDeleteModal/ProductDeleteModal";
import AddVariantModal from "../../../components/AdminDashboardComponents/ProductsManagementPage/AddVariantModal/AddVariantModal";

const ITEMS_PER_PAGE = 10;

const categoryOptions = [
  { value: "all", label: "All categories" },
  { value: "Handicraft", label: "Handicraft" },
  { value: "Home Decor", label: "Home Decor" },
  { value: "Jewelry", label: "Jewelry" },
];

const statusOptions = [
  { value: "all", label: "All statuses" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
  { value: "inactive", label: "Inactive" },
];

const sortOptions = [
  { value: "newest", label: "Newest first" },
  { value: "price-high", label: "Price: High → Low" },
  { value: "price-low", label: "Price: Low → High" },
  { value: "stock-low", label: "Stock: Low → High" },
  { value: "best-selling", label: "Best selling" },
];

const ProductsManagement = () => {
  const navigate = useNavigate();

  // ─── Filters & UI state ─────────────────────────────
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

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
    draftProducts: 22,
    outOfStock: 12,
    totalRevenue: 1248000,
    revenueChange: 9.4,
  };

  const products: TProduct[] = [
    {
      _id: "p1",
      name: "Handcrafted Wooden Wall Art",
      slug: "handcrafted-wooden-wall-art",
      category: "Home Decor",
      subCategory: "Wall Art",
      occasionNames: ["Wedding", "Housewarming"],
      subOccasionNames: ["Gift", "Decoration"],
      careInstructions: ["Wipe with dry cloth"],
      isCustomizationAvailable: true,
      processingTime: "3-5 business days",
      variants: [
        {
          _id: "v1",
          name: "Floral Wall Art Small",
          description: "Small floral wall art",
          packageContents: ["1 Wall Art", "2 Hooks"],
          images: ["/api/placeholder/80/80"],
          design: "Floral Pattern",
          size: "Small",
          color: "Brown",
          packSize: "Single",
          dimensions: { length: 12, width: 8, height: 1.5, unit: "inch" },
          weight: "450g",
          basePrice: 1499,
          discountedPrice: 1199,
          bulkPrice: 999,
          stock: 25,
          materials: [],
          makingCost: 400,
        },
      ],
      minPrice: 1499,
      maxPrice: 1499,
      minDiscountedPrice: 1199,
      reviews: [],
      averageRating: 4.6,
      totalReviews: 34,
      soldCount: 82,
      totalClicks: 1204,
      isActive: true,
      isFeatured: true,
      isPublished: true,
      tags: ["wooden", "wall art", "handicraft"],
      createdAt: "2026-09-01T10:00:00Z",
      updatedAt: "2026-09-13T09:00:00Z",
    },
    {
      _id: "p2",
      name: "The Jewel Embedded Brass Elephant",
      slug: "jewel-embedded-brass-elephant",
      category: "Handicraft",
      subCategory: "Brass",
      occasionNames: ["Wedding", "Anniversary"],
      subOccasionNames: [],
      careInstructions: ["Polish regularly"],
      isCustomizationAvailable: true,
      processingTime: "5-7 business days",
      variants: [
        {
          _id: "v2",
          name: "Brass Elephant Medium",
          description: "Medium brass elephant",
          packageContents: ["1 Elephant"],
          images: ["/api/placeholder/80/80"],
          design: "Classic",
          size: "Medium",
          color: "Gold",
          packSize: "Single",
          dimensions: { length: 12, width: 8, height: 6, unit: "inch" },
          weight: "1.2kg",
          basePrice: 2499,
          discountedPrice: 1999,
          stock: 8,
          materials: [],
          makingCost: 700,
        },
        {
          _id: "v3",
          name: "Brass Elephant Large",
          description: "Large brass elephant",
          packageContents: ["1 Elephant"],
          images: ["/api/placeholder/80/80"],
          design: "Classic",
          size: "Large",
          color: "Antique Gold",
          packSize: "Single",
          dimensions: { length: 18, width: 12, height: 9, unit: "inch" },
          weight: "2.1kg",
          basePrice: 3999,
          discountedPrice: 3299,
          stock: 0,
          materials: [],
          makingCost: 1200,
        },
      ],
      minPrice: 2499,
      maxPrice: 3999,
      minDiscountedPrice: 1999,
      reviews: [],
      averageRating: 4.5,
      totalReviews: 112,
      soldCount: 240,
      totalClicks: 3421,
      isActive: true,
      isFeatured: false,
      isPublished: true,
      tags: ["brass", "elephant", "home decor"],
      createdAt: "2026-08-20T10:00:00Z",
      updatedAt: "2026-09-10T09:00:00Z",
    },
    {
      _id: "p3",
      name: "Wooden Wall Art Floral",
      slug: "wooden-wall-art-floral",
      category: "Home Decor",
      subCategory: "Wall Art",
      occasionNames: ["Housewarming"],
      subOccasionNames: [],
      careInstructions: ["Keep away from moisture"],
      isCustomizationAvailable: false,
      processingTime: "2-3 business days",
      variants: [],
      minPrice: 0,
      maxPrice: 0,
      reviews: [],
      averageRating: 0,
      totalReviews: 0,
      soldCount: 0,
      totalClicks: 24,
      isActive: true,
      isFeatured: false,
      isPublished: false,
      tags: ["wooden", "wall art"],
      createdAt: "2026-09-12T10:00:00Z",
      updatedAt: "2026-09-12T10:00:00Z",
    },
  ];

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
      id: "draft",
      label: "Drafts",
      value: kpi.draftProducts.toLocaleString("en-IN"),
      icon: <FiEdit3 size={18} />,
      accent: "bg-amber-50 text-amber-600",
    },
    {
      id: "oos",
      label: "Out of Stock",
      value: kpi.outOfStock.toLocaleString("en-IN"),
      icon: <FiAlertCircle size={18} />,
      accent: "bg-red-50 text-red-600",
    },
    {
      id: "revenue",
      label: "Revenue",
      value: `₹${(kpi.totalRevenue / 100000).toFixed(2)}L`,
      icon: <FiBox size={18} />,
      accent: "bg-primary-10/10 text-primary-10",
      trend: { value: kpi.revenueChange, label: "vs last month" },
    },
  ];

  // ─── Filtering & sorting ────────────────────────────
  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    let result = products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (status === "published" && !p.isPublished) return false;
      if (status === "draft" && p.isPublished) return false;
      if (status === "inactive" && p.isActive) return false;
      if (q) {
        const matches =
          p.name.toLowerCase().includes(q) ||
          p?.slug?.toLowerCase().includes(q) ||
          p?.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    });

    if (sortBy === "price-high") {
      result = [...result].sort((a, b) => b.minPrice - a.minPrice);
    } else if (sortBy === "price-low") {
      result = [...result].sort((a, b) => a.minPrice - b.minPrice);
    } else if (sortBy === "stock-low") {
      result = [...result].sort(
        (a, b) => getProductTotalStock(a) - getProductTotalStock(b),
      );
    } else if (sortBy === "best-selling") {
      result = [...result].sort((a, b) => b.soldCount - a.soldCount);
    } else {
      result = [...result].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }

    return result;
  }, [products, search, category, status, sortBy]);

  // ─── Pagination ─────────────────────────────────────
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE),
  );
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // ─── Handlers ───────────────────────────────────────
  const handleClearFilters = () => {
    setSearch("");
    setCategory("all");
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

  const handleEditVariant = (variant: TProductVariant) => {
    console.log("Edit variant:", variant._id);
    // TODO: open edit variant modal
  };

  const handleDeleteVariant = (variantId: string) => {
    console.log("Delete variant:", variantId);
    // TODO: open variant delete confirmation
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
                to={`/admin/products/${p._id}`}
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
      key: "status",
      header: "Status",
      render: (p) => <ProductStatusBadge product={p} />,
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
    search.trim() !== "" || category !== "all" || status !== "all";

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
              to="/admin/products/new"
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
          value: search,
          onChange: (v) => {
            setSearch(v);
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
            options: categoryOptions,
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
        onExport={() => console.log("Export products")}
      />

      <BulkActionBar
        selectedCount={selectedIds.length}
        onClearSelection={() => setSelectedIds([])}
        actions={bulkActions}
      />

      {paginatedProducts.length === 0 ? (
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
            rows={paginatedProducts}
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
              setSelectedIds(checked ? paginatedProducts.map((p) => p._id) : [])
            }
            minWidth="1100px"
          />

          <DataTablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredProducts.length}
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
        onEditVariant={handleEditVariant}
        onDeleteVariant={handleDeleteVariant}
      />

      <ProductDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        productName={productToDelete?.name}
        isLoading={isDeleting}
      />

      <AddVariantModal
        isOpen={addVariantOpen}
        onClose={() => setAddVariantOpen(false)}
        productId={activeProduct?._id}
      />
    </div>
  );
};

export default ProductsManagement;
