import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productsApi } from '../../../utils/api';

interface ProductVariant {
  name: string;
  sku: string;
  price: number;
  stock: number;
  attributes: Record<string, string>;
}

interface ProductFormData {
  name: string;
  slug: string;
  category: string;
  description: string;
  status: 'active' | 'draft' | 'archived';
  price: number;
  stock: number;
  variants: ProductVariant[];
  images: string[];
}

const initialFormData: ProductFormData = {
  name: '',
  slug: '',
  category: '',
  description: '',
  status: 'draft',
  price: 0,
  stock: 0,
  variants: [],
  images: [],
};

const emptyVariant: ProductVariant = {
  name: '',
  sku: '',
  price: 0,
  stock: 0,
  attributes: {},
};

const ProductForm = () => {
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [variantAttributes, setVariantAttributes] = useState<string[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await productsApi.getById(id!);
      const product = response.data;
      setFormData({
        name: product.name,
        slug: product.slug,
        category: product.category,
        description: product.description,
        status: product.status,
        price: product.price,
        stock: product.stock,
        variants: product.variants || [],
        images: product.images || [],
      });
      // Extract unique attribute names from variants
      const attributes = new Set<string>();
      product.variants?.forEach(variant => {
        Object.keys(variant.attributes).forEach(attr => attributes.add(attr));
      });
      setVariantAttributes(Array.from(attributes));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'price' || name === 'stock') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleVariantChange = (index: number, field: keyof ProductVariant, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map((variant, i) => {
        if (i === index) {
          return {
            ...variant,
            [field]: field === 'price' || field === 'stock' ? parseFloat(value as string) : value,
          };
        }
        return variant;
      }),
    }));
  };

  const handleVariantAttributeChange = (variantIndex: number, attribute: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map((variant, i) => {
        if (i === variantIndex) {
          return {
            ...variant,
            attributes: {
              ...variant.attributes,
              [attribute]: value,
            },
          };
        }
        return variant;
      }),
    }));
  };

  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, { ...emptyVariant }],
    }));
  };

  const removeVariant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const addVariantAttribute = () => {
    const attribute = prompt('Enter new attribute name (e.g., "Size", "Color"):');
    if (attribute && !variantAttributes.includes(attribute)) {
      setVariantAttributes(prev => [...prev, attribute]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // TODO: Implement image upload to cloud storage
    // For now, just store the file names
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files.map(file => file.name)],
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');

      if (isEditing) {
        await productsApi.update(id!, formData);
      } else {
        await productsApi.create(formData);
      }

      navigate('/admin/products');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">Loading product...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{isEditing ? 'Edit Product' : 'Add Product'}</h1>
          <p className="text-muted-foreground mt-1">
            {isEditing ? 'Update product details' : 'Create a new product'}
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
              Product Name
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-2">
                Base Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium mb-2">
                Base Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
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
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium">Product Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
              >
                Upload Images
              </label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    {/* Replace with actual image preview */}
                    <span className="text-sm text-gray-500">{image}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium">Product Variants</label>
              <div className="space-x-2">
                <button
                  type="button"
                  onClick={addVariantAttribute}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Add Attribute
                </button>
                <button
                  type="button"
                  onClick={addVariant}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Add Variant
                </button>
              </div>
            </div>

            {formData.variants.map((variant, variantIndex) => (
              <div key={variantIndex} className="border border-border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Variant {variantIndex + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeVariant(variantIndex)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Variant Name</label>
                    <input
                      type="text"
                      value={variant.name}
                      onChange={(e) => handleVariantChange(variantIndex, 'name', e.target.value)}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">SKU</label>
                    <input
                      type="text"
                      value={variant.sku}
                      onChange={(e) => handleVariantChange(variantIndex, 'sku', e.target.value)}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Price</label>
                    <input
                      type="number"
                      value={variant.price}
                      onChange={(e) => handleVariantChange(variantIndex, 'price', e.target.value)}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Stock</label>
                    <input
                      type="number"
                      value={variant.stock}
                      onChange={(e) => handleVariantChange(variantIndex, 'stock', e.target.value)}
                      required
                      min="0"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {variantAttributes.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Attributes</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {variantAttributes.map(attribute => (
                        <div key={attribute}>
                          <label className="block text-sm font-medium mb-2">{attribute}</label>
                          <input
                            type="text"
                            value={variant.attributes[attribute] || ''}
                            onChange={(e) => handleVariantAttributeChange(variantIndex, attribute, e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
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

export default ProductForm; 