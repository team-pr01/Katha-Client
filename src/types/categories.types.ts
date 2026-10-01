
export type TCategories = {
  _id: string;
  name: string;
  areaName?: string; // e.g., "Handicraft", "Clothing", "Home Decor"
  imageUrl: string;
  description?: string;
  isActive: boolean;
  subCategories: string[];
  createdAt?: Date;
  updatedAt?: Date;
};