import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { servicesApi, Service } from '../../../utils/api';

type ServiceStatus = 'Published' | 'Draft' | 'Archived';

const ServicesDashboard = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | ServiceStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

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

  const filteredServices = services.filter(service => {
    const matchesFilter = filter === 'all' || service.status === filter;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.slug.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalServices = services.length;
  const publishedServices = services.filter(s => s.status === 'Published').length;
  const draftServices = services.filter(s => s.status === 'Draft').length;

  const handleStatusChange = async (id: string, newStatus: ServiceStatus) => {
    try {
      await servicesApi.updateStatus(id, newStatus);
      setServices(services.map(service => 
        service._id === id ? { ...service, status: newStatus } : service
      ));
    } catch (err: any) {
      setError(err.message || 'Failed to update service status');
    }
  };

  // Add a helper function for price formatting
  const formatPrice = (price?: number) => {
    if (price === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Services Management</h1>
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

        {loading ? (
          <div className="text-center">Loading services...</div>
        ) : (
          <div className="bg-card rounded-lg shadow-sm border border-border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium">Name</th>
                    <th className="text-left p-4 font-medium">Category</th>
                    <th className="text-left p-4 font-medium">Base Price</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-right p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service._id} className="border-b border-border last:border-0 hover:bg-muted/50">
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-muted-foreground">{service.slug}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {service.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{formatPrice(service.price?.starter)}</p>
                          <p className="text-xs text-muted-foreground">Starting price</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <select
                          value={service.status}
                          onChange={(e) => handleStatusChange(service._id, e.target.value as ServiceStatus)}
                          className="px-2 py-1 rounded-md border border-border bg-background"
                        >
                          <option value="Published">Published</option>
                          <option value="Draft">Draft</option>
                          <option value="Archived">Archived</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => navigate(`/admin/services/${service._id}/edit`)}
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
        )}
      </div>
    </div>
  );
};

export default ServicesDashboard; 