import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usersApi } from '../../../utils/api';

interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
}

const initialFormData: UserFormData = {
  name: '',
  email: '',
  password: '',
  role: 'user',
  status: 'active',
};

const UserForm = () => {
  const [formData, setFormData] = useState<UserFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      loadUser();
    }
  }, [id]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const response = await usersApi.getById(id!);
      const user = response.data;
      setFormData({
        name: user.name,
        email: user.email,
        password: '', // Don't load password for editing
        role: user.role,
        status: user.status,
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load user');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');

      // Only include password in the request if it's provided (for editing)
      const userData = {
        ...formData,
        ...((!isEditing || formData.password) && { password: formData.password }),
      };

      if (isEditing) {
        await usersApi.update(id!, userData);
      } else {
        await usersApi.create(userData);
      }

      navigate('/admin/users');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save user');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">Loading user...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{isEditing ? 'Edit User' : 'Add User'}</h1>
          <p className="text-muted-foreground mt-1">
            {isEditing ? 'Update user details' : 'Create a new user account'}
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
              Full Name
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
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password {isEditing && '(leave blank to keep current password)'}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={!isEditing}
              minLength={6}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-2">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : isEditing ? 'Update User' : 'Create User'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/users')}
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

export default UserForm; 