import type { TDimensions } from "./product.type";

export type TMaterialVariant = {
    _id: string;
    design: string;
    color: string;
    dimensions: TDimensions;
    stock: number;
    stockUnit: string; // e.g., "roll", "meter", "piece", "kg"
    purchasePrice: number;
    madeOf: string; // e.g., "Cotton", "Silk", "Brass", "Wood"
};

export type TMaterials = {
    _id: string;
    name: string;
    category: string;
    subCategory: string;
    variants: TMaterialVariant[];
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};