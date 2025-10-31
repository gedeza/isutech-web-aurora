import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { servicesApi, Service } from '../../../utils/api';

type SortField = 'name' | 'category' | 'status' | 'lastUpdated';
type SortOrder = 'asc' | 'desc';

const ServiceManagement = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | Service['status']>('all');

  // Sorting state
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesApi.getAll();
        setServices(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleStatusChange = async (id: string, status: Service['status']) => {
    try {
      await servicesApi.updateStatus(id, status);
      setServices(services.map(service => 
        service.id === id ? { ...service, status } : service
      ));
    } catch (err: any) {
      setError(err.message || 'Failed to update service status');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  // Filter and sort functions
  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (sortField === 'lastUpdated') {
      return sortOrder === 'asc' 
        ? new Date(aValue).getTime() - new Date(bValue).getTime()
        : new Date(bValue).getTime() - new Date(aValue).getTime();
    }
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedServices.length / itemsPerPage);
  const paginatedServices = sortedServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Get unique categories for filter
  const categories = ['all', ...new Set(services.map(s => s.category))];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Service Management</h1>
            <p className="text-muted-foreground mt-1">Manage your service offerings</p>
          </div>
          <button
            onClick={() => navigate('/admin/services/new')}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Service
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-card p-4 rounded-lg shadow-sm border border-border mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 rounded-md border border-border bg-background"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | Service['status'])}
                className="px-3 py-2 rounded-md border border-border bg-background"
              >
                <option value="all">All Status</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center">Loading services...</div>
        ) : (
          <>
            <div className="bg-card rounded-lg shadow-sm border border-border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th 
                        className="text-left p-4 font-medium cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSort('name')}
                      >
                        <div className="flex items-center gap-2">
                          Name
                          {sortField === 'name' && (
                            <span className="text-primary">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="text-left p-4 font-medium cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSort('category')}
                      >
                        <div className="flex items-center gap-2">
                          Category
                          {sortField === 'category' && (
                            <span className="text-primary">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th className="text-left p-4 font-medium">Pricing</th>
                      <th 
                        className="text-left p-4 font-medium cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSort('status')}
                      >
                        <div className="flex items-center gap-2">
                          Status
                          {sortField === 'status' && (
                            <span className="text-primary">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="text-left p-4 font-medium cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSort('lastUpdated')}
                      >
                        <div className="flex items-center gap-2">
                          Last Updated
                          {sortField === 'lastUpdated' && (
                            <span className="text-primary">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th className="text-right p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedServices.map((service) => (
                      <tr key={`service-${service.id}`} className="border-b border-border last:border-0 hover:bg-muted/50">
                        <td className="p-4">{service.name}</td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {service.category}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm">
                              Starter: {formatPrice(service.price.starter)}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              Pro: {formatPrice(service.price.professional)}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <select
                            value={service.status}
                            onChange={(e) => handleStatusChange(service.id, e.target.value as Service['status'])}
                            className="px-2 py-1 rounded-md border border-border bg-background"
                          >
                            <option key="published" value="Published">Published</option>
                            <option key="draft" value="Draft">Draft</option>
                            <option key="archived" value="Archived">Archived</option>
                          </select>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {new Date(service.lastUpdated).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => navigate(`/admin/services/${service.id}/edit`)}
                              className="p-2 text-primary hover:bg-primary/10 rounded-md transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedServices.length)} of {sortedServices.length} services
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md border border-border bg-background disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-md border border-border bg-background disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ServiceManagement; 