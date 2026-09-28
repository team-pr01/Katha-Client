
export type TSubOccasion = {
  name: string;
  description?: string;
  _id: string;
};

export type TOccasion = {
  _id: string;
  name: string;
  subOccasions: TSubOccasion[];
  imageUrl: string;
  description: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};