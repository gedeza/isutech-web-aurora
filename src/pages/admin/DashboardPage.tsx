import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { servicesApi } from '@/utils/api';

interface User {
  name: string;
  email: string;
  role: string;
}

const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const [servicesCount, setServicesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('DashboardPage mounted, checking authentication...');
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    console.log('Stored token:', token ? 'exists' : 'missing');
    console.log('Stored user data:', storedUser);

    if (!storedUser || !token) {
      console.log('No user data or token found, redirecting to login...');
      navigate('/admin/login');
      return;
    }

    try {
      const userData = JSON.parse(storedUser);
      console.log('Parsed user data:', userData);
      
      if (userData.role !== 'admin') {
        console.log('User is not an admin, redirecting to home...');
        navigate('/');
        return;
      }
      
      console.log('Setting user data in state...');
      setUser(userData);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const services = await servicesApi.getAll();
        setServicesCount(services.length);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  if (!user) {
    return null;
  }

  const stats = [
    {
      title: "Total Services",
      value: loading ? "..." : servicesCount,
      description: "Active services in the system",
      action: () => navigate('/admin/services')
    },
    {
      title: "Contact Submissions",
      value: "View All",
      description: "Manage contact form submissions",
      action: () => navigate('/admin/contacts')
    },
    // ... existing code ...
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {user.name}</h1>
              <p className="text-muted-foreground mt-1">Here's what's happening with your business today.</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin/settings')}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-destructive/10 text-destructive rounded-md hover:bg-destructive/20 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-card p-6 rounded-lg shadow-sm border border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                </div>
                <div className="p-3 bg-primary/10 text-primary rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {/* Add appropriate SVG for each stat */}
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-green-600 font-medium">↑ 12%</span>
                <span className="text-sm text-muted-foreground ml-2">from last month</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-card rounded-lg shadow-sm border border-border/50">
            <div className="p-6">
              <h2 className="text-lg font-semibold">Quick Actions</h2>
              <p className="text-muted-foreground text-sm mt-1">Access frequently used features</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button 
                  onClick={() => navigate('/admin/content')}
                  className="flex items-center gap-3 p-4 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors group"
                >
                  <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Content</h3>
                    <p className="text-sm text-muted-foreground">Manage website data</p>
                  </div>
                </button>

                <button 
                  onClick={() => navigate('/admin/crm')}
                  className="flex items-center gap-3 p-4 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors group"
                >
                  <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Manage CRM</h3>
                    <p className="text-sm text-muted-foreground">Customer relationships</p>
                  </div>
                </button>

                <button 
                  onClick={() => navigate('/admin/products')}
                  className="flex items-center gap-3 p-4 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors group"
                >
                  <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Products</h3>
                    <p className="text-sm text-muted-foreground">Manage inventory</p>
                  </div>
                </button>

                <button 
                  onClick={() => navigate('/admin/users')}
                  className="flex items-center gap-3 p-4 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors group"
                >
                  <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Users</h3>
                    <p className="text-sm text-muted-foreground">Manage accounts</p>
                  </div>
                </button>

                <button 
                  onClick={() => navigate('/admin/services')}
                  className="flex items-center gap-3 p-4 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors group"
                >
                  <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Services</h3>
                    <p className="text-sm text-muted-foreground">Manage offerings</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card rounded-lg shadow-sm border border-border/50">
            <div className="p-6">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <p className="text-muted-foreground text-sm mt-1">Latest updates and changes</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-500/10 text-green-500 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">New Customer Added</h3>
                      <span className="text-sm text-muted-foreground">2 mins ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">John Doe was added as a new customer</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-500/10 text-blue-500 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Product Updated</h3>
                      <span className="text-sm text-muted-foreground">1 hour ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Product "AI Solution" was updated</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-500/10 text-purple-500 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">New User Registered</h3>
                      <span className="text-sm text-muted-foreground">3 hours ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Jane Smith created an account</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 