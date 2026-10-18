import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { API_URL } from '@/utils/api';

type Status = 'checking' | 'ok' | 'denied';

export const clearSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Gate for everything under /admin (except /admin/login). The API enforces auth on every
 * call; this stops the admin shell rendering for anonymous visitors and sends stale or
 * non-admin sessions back to the login page.
 */
const AdminLayout = () => {
  const location = useLocation();
  const [status, setStatus] = useState<Status>(() => (localStorage.getItem('token') ? 'checking' : 'denied'));

  useEffect(() => {
    if (status !== 'checking') return;
    const controller = new AbortController();
    fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      signal: controller.signal,
    })
      .then(async (res) => {
        const me = res.ok ? await res.json() : null;
        if (me?.role === 'ADMIN') {
          setStatus('ok');
        } else {
          clearSession();
          setStatus('denied');
        }
      })
      .catch((err) => {
        if (err?.name !== 'AbortError') {
          clearSession();
          setStatus('denied');
        }
      });
    return () => controller.abort();
  }, [status]);

  if (status === 'denied') {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }
  if (status === 'checking') {
    return <div className="min-h-screen bg-background" aria-busy="true" />;
  }
  return (
    <div className="min-h-screen bg-background">
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
