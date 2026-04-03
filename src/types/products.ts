export interface Product {
  id: number;
  name: string;
  slug?: string;
  description: string;
  shortDescription: string;
  category: string;
  price?: number;
  status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED' | 'completed' | 'ongoing' | string;
  images?: string[];
  technologies?: string[];
  features?: string[];
  client?: string;
  year?: string;
  createdBy?: number;
  lastUpdated?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryItem {
  id: string;
  name: string;
  count: number;
}

export interface Category {
  name: string;
  description: string;
  items: CategoryItem[];
}

export interface Categories {
  [key: string]: Category;
}