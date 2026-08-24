import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Layers,
  Image as ImageIcon,
  Box,
  Settings,
  LogOut,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Leads Management', path: '/admin/leads', icon: Users },
    { name: 'Projects', path: '/admin/projects', icon: Briefcase },
    { name: 'Services', path: '/admin/services', icon: Layers },
    { name: 'Gallery Assets', path: '/admin/gallery', icon: ImageIcon },
    { name: '3D Models', path: '/admin/models', icon: Box },
    { name: 'Website Settings', path: '/admin/settings', icon: Settings }
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <aside className="w-64 bg-deep-olive text-white flex flex-col justify-between shrink-0 shadow-2xl min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-white/15 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white text-deep-olive font-serif font-bold text-xl flex items-center justify-center shadow-md">
            K
          </div>
          <div>
            <span className="font-serif text-lg font-bold tracking-tight block text-white leading-none">
              Karoli Admin
            </span>
            <span className="text-[10px] text-muted-sage uppercase tracking-widest block mt-1">Management Portal</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-muted-sage text-charcoal shadow-md font-bold'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Footer */}
      <div className="p-4 border-t border-white/15">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-red-600 text-white text-xs font-semibold transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out Admin</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
