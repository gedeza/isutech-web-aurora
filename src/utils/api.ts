import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

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

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'Active' | 'Draft' | 'Archived';
  lastUpdated: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'Active' | 'Inactive';
  lastLogin?: string;
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
  getAll: () => api.get<any, Product[]>('/products'),
  getById: (id: string) => api.get<any, Product>(`/products/${id}`),
  create: (data: Partial<Product>) => api.post<any, Product>('/products', data),
  update: (id: string, data: Partial<Product>) => api.put<any, Product>(`/products/${id}`, data),
  delete: (id: string) => api.delete<any, void>(`/products/${id}`),
  updateStatus: (id: string, status: Product['status']) => 
    api.patch<any, Product>(`/products/${id}/status`, { status }),
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

export default api; 