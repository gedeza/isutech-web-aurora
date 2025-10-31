import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout; 