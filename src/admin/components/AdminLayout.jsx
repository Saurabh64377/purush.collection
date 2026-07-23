import { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate, Navigate } from 'react-router-dom';
import {
  PiGridFourBold,
  PiSquaresFourBold,
  PiTShirtBold,
  PiGearBold,
  PiImageBold,
  PiSignOutBold,
  PiListBold,
  PiUserBold,
  PiSpinnerBold,
} from 'react-icons/pi';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: PiGridFourBold },
  { label: 'Collections', path: '/admin/collections', icon: PiSquaresFourBold },
  { label: 'Site Settings', path: '/admin/settings', icon: PiGearBold },
  { label: 'Media', path: '/admin/media', icon: PiImageBold },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <PiSpinnerBold className="text-3xl text-pink animate-spin-slow" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return (
    <div id="admin-panel" className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 lg:translate-x-0 lg:relative ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
          <div className="h-10 w-10 rounded-xl bg-pink flex items-center justify-center font-display font-bold text-white">
            P
          </div>
          <div>
            <p className="font-display font-semibold text-sm">Puपुरुष</p>
            <p className="text-xs text-white/50">Admin Panel</p>
          </div>
        </div>

        <nav className="p-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-pink text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="text-lg" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 inset-x-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 mb-3">
            <div className="h-8 w-8 rounded-full bg-pink/20 flex items-center justify-center">
              <PiUserBold className="text-pink text-sm" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name || 'Admin'}</p>
              <p className="text-xs text-white/40 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <PiSignOutBold className="text-lg" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <PiListBold className="text-xl" />
          </button>
          <h1 className="text-lg font-display font-semibold text-gray-900 flex-1">
            {navItems.find((i) => i.path === location.pathname)?.label || 'Admin'}
          </h1>
          <button
            onClick={logout}
            className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <PiSignOutBold />
            Logout
          </button>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}