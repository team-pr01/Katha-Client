import type { TProduct, TProductVariant } from "../types/product.type";


export const getProductTotalStock = (product: TProduct): number => {
    return product.variants.reduce((sum, v) => sum + (v.stock || 0), 0);
};

export const getProductPriceRange = (product: TProduct): string => {
    if (product.variants.length === 0) return "—";
    const prices = product.variants.map(
        (v) => v.discountedPrice ?? v.basePrice,
    );
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    if (min === max) return `₹${min.toLocaleString("en-IN")}`;
    return `₹${min.toLocaleString("en-IN")} – ₹${max.toLocaleString("en-IN")}`;
};

export const getPrimaryImage = (product: TProduct): string | null => {
    return product.variants[0]?.images?.[0] ?? null;
};

export const hasDiscount = (variant: TProductVariant): boolean => {
    return (
        !!variant.discountedPrice &&
        variant.discountedPrice < variant.basePrice
    );
};

export const getStockStatus = (
    product: TProduct,
): { label: string; className: string; dot: string } => {
    const total = getProductTotalStock(product);
    if (total === 0)
        return {
            label: "Out of stock",
            className: "bg-red-50 text-red-700",
            dot: "bg-red-500",
        };
    if (total <= 10)
        return {
            label: "Low stock",
            className: "bg-amber-50 text-amber-700",
            dot: "bg-amber-500",
        };
    return {
        label: "In stock",
        className: "bg-green-50 text-green-700",
        dot: "bg-green-500",
    };
};

export const slugify = (text: string): string =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");