import axios from 'axios';
import { Product } from '@/types/products';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.isutech.co.za/api';

// Interfaces
export interface Service {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  shortDescription: string;
  features: string[];
  benefits: string[];
  process: Array<{
    title: string;
    description: string;
  }>;
  technologies: string[];
  price: {
    starter: number;
    professional: number;
    enterprise: number;
  };
  status: 'Published' | 'Draft' | 'Archived';
  createdBy: string;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'Active' | 'Inactive';
  lastLogin?: string;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
  updatedAt: string;
}

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const message = error.response.data.message || 'An error occurred';
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject(new Error('No response from server'));
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject(error);
    }
  }
);

// API methods for services
export const servicesApi = {
  getAll: () => api.get<any, Service[]>('/services'),
  getById: (id: string) => api.get<any, Service>(`/services/${id}`),
  create: (data: Partial<Service>) => api.post<any, Service>('/services', data),
  update: (id: string, data: Partial<Service>) => api.put<any, Service>(`/services/${id}`, data),
  delete: (id: string) => api.delete<any, void>(`/services/${id}`),
  updateStatus: (id: string, status: Service['status']) => 
    api.patch<any, Service>(`/services/${id}/status`, { status }),
};

// API methods for products
export const productsApi = {
  getAll: () => api.get<Product[]>('/products'),
  getById: (id: string) => api.get<Product>(`/products/${id}`),
  getBySlug: (slug: string) => api.get<Product>(`/products/slug/${slug}`),
  create: (data: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>) => api.post<Product>('/products', data),
  update: (id: string, data: Partial<Product>) => api.put<Product>(`/products/${id}`, data),
  updateStatus: (id: string, status: Product['status']) => api.patch<Product>(`/products/${id}/status`, { status }),
  delete: (id: string) => api.delete(`/products/${id}`),
  getCategories: () => api.get<{ categories: string[] }>('/products/categories'),
};

// API methods for users
export const usersApi = {
  getAll: () => api.get<any, User[]>('/users'),
  getById: (id: string) => api.get<any, User>(`/users/${id}`),
  create: (data: Partial<User>) => api.post<any, User>('/users', data),
  update: (id: string, data: Partial<User>) => api.put<any, User>(`/users/${id}`, data),
  delete: (id: string) => api.delete<any, void>(`/users/${id}`),
  updateStatus: (id: string, status: User['status']) => 
    api.patch<any, User>(`/users/${id}/status`, { status }),
};

// API methods for contact form
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export const contactApi = {
  submit: (data: ContactFormData) => api.post<any, { message: string }>('/contact', data),
  getAll: () => api.get<any, Contact[]>('/contact'),
  getById: (id: string) => api.get<any, Contact>(`/contact/${id}`),
  updateStatus: (id: string, status: Contact['status']) => 
    api.patch<any, Contact>(`/contact/${id}/status`, { status }),
  delete: (id: string) => api.delete<any, void>(`/contact/${id}`),
};

export default api; 