export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  price: number;
  status: 'Active' | 'Draft' | 'Archived';
  images: string[];
  technologies: string[];
  client?: string;
  year?: string;
  createdBy: string;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
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