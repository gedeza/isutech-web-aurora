import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { servicesApi } from '../../../utils/api';

interface ServiceFormData {
  name: string;
  slug: string;
  category: string;
  status: 'Published' | 'Draft' | 'Archived';
  price: {
    starter: number;
    professional: number;
    enterprise: number;
  };
  description: string;
  features: string[];
  benefits: string[];
}

const initialFormData: ServiceFormData = {
  name: '',
  slug: '',
  category: '',
  status: 'Draft',
  price: {
    starter: 0,
    professional: 0,
    enterprise: 0,
  },
  description: '',
  features: [''],
  benefits: [''],
};

const ServiceForm = () => {
  const [formData, setFormData] = useState<ServiceFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      loadService();
    }
  }, [id]);

  const loadService = async () => {
    try {
      setLoading(true);
      const response = await servicesApi.getById(id!);
      const service = response.data;
      setFormData({
        name: service.name,
        slug: service.slug,
        category: service.category,
        status: service.status,
        price: service.price,
        description: service.description,
        features: service.features,
        benefits: service.benefits,
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load service');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('price.')) {
      const priceField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        price: {
          ...prev.price,
          [priceField]: parseFloat(value),
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleArrayChange = (index: number, value: string, field: 'features' | 'benefits') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field: 'features' | 'benefits') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeArrayItem = (index: number, field: 'features' | 'benefits') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');

      // Filter out empty array items
      const cleanedData = {
        ...formData,
        features: formData.features.filter(f => f.trim()),
        benefits: formData.benefits.filter(b => b.trim()),
      };

      if (isEditing) {
        await servicesApi.update(id!, cleanedData);
      } else {
        await servicesApi.create(cleanedData);
      }

      navigate('/admin/services');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save service');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">Loading service...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{isEditing ? 'Edit Service' : 'Add Service'}</h1>
          <p className="text-muted-foreground mt-1">
            {isEditing ? 'Update service details' : 'Create a new service'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Service Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium mb-2">
              Slug
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-2">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="price.starter" className="block text-sm font-medium mb-2">
                Starter Price
              </label>
              <input
                type="number"
                id="price.starter"
                name="price.starter"
                value={formData.price.starter}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="price.professional" className="block text-sm font-medium mb-2">
                Professional Price
              </label>
              <input
                type="number"
                id="price.professional"
                name="price.professional"
                value={formData.price.professional}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="price.enterprise" className="block text-sm font-medium mb-2">
                Enterprise Price
              </label>
              <input
                type="number"
                id="price.enterprise"
                name="price.enterprise"
                value={formData.price.enterprise}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Features</label>
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleArrayChange(index, e.target.value, 'features')}
                  className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter a feature"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem(index, 'features')}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('features')}
              className="text-primary hover:text-primary/80 text-sm font-medium"
            >
              + Add Feature
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Benefits</label>
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => handleArrayChange(index, e.target.value, 'benefits')}
                  className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter a benefit"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem(index, 'benefits')}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('benefits')}
              className="text-primary hover:text-primary/80 text-sm font-medium"
            >
              + Add Benefit
            </button>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : isEditing ? 'Update Service' : 'Create Service'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/services')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm; 