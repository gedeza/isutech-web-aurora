export interface Product {
  id: number;
  name: string;
  shortDesc: string;
  description: string;
  category: string;
  year: string;
  image: string;
  client: string;
  technologies?: string[];
  features?: string[];
  status?: 'completed' | 'ongoing';
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