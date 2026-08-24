import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading, isAdmin } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-ivory">
        <div className="w-10 h-10 border-4 border-muted-sage border-t-deep-olive rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={adminOnly ? '/admin/login' : '/login'} replace />;
  }

  if (adminOnly && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-ivory p-4 text-center">
        <div className="max-w-md bg-white p-8 rounded-2xl border border-red-200 shadow-luxury space-y-4">
          <ShieldAlert className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-charcoal">403 - Forbidden</h2>
          <p className="text-xs text-charcoal/80">
            Access denied. You do not have administrator permissions to view this dashboard.
          </p>
          <Navigate to="/login" replace />
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
