import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PiSquaresFourBold,
  PiTShirtBold,
  PiImageBold,
  PiPlusBold,
  PiArrowRightBold,
  PiSpinnerBold,
} from 'react-icons/pi';
import api from '../lib/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/stats')
      .then((res) => setStats(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <PiSpinnerBold className="text-3xl text-pink animate-spin-slow" />
      </div>
    );
  }

  const statCards = [
    { label: 'Total Collections', value: stats?.totalCategories || 0, icon: PiSquaresFourBold, color: 'bg-pink/10 text-pink' },
    { label: 'Total Products', value: stats?.totalProducts || 0, icon: PiTShirtBold, color: 'bg-blue-500/10 text-blue-500' },
    { label: 'Media Files', value: stats?.totalMedia || 0, icon: PiImageBold, color: 'bg-green-500/10 text-green-500' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-display font-semibold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 mt-1">Welcome back. Here is what is happening with your store.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className={`h-12 w-12 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="text-xl" />
            </div>
            <p className="text-3xl font-display font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/admin/collections"
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-pink/30 transition-all group"
          >
            <PiPlusBold className="text-2xl text-pink mb-3" />
            <p className="font-display font-semibold text-gray-900">Add Collection</p>
            <p className="text-sm text-gray-500 mt-1">Create a new collection like T-Shirts, Hoodies, etc.</p>
          </Link>
          <Link
            to="/admin/media"
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-pink/30 transition-all group"
          >
            <PiPlusBold className="text-2xl text-blue-500 mb-3" />
            <p className="font-display font-semibold text-gray-900">Upload Media</p>
            <p className="text-sm text-gray-500 mt-1">Upload images to use in collections and products.</p>
          </Link>
          <Link
            to="/admin/settings"
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-pink/30 transition-all group"
          >
            <PiPlusBold className="text-2xl text-green-500 mb-3" />
            <p className="font-display font-semibold text-gray-900">Edit Site Settings</p>
            <p className="text-sm text-gray-500 mt-1">Update hero, about, footer, and other content.</p>
          </Link>
        </div>
      </div>

      {/* Recent Collections */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-display font-semibold text-gray-900">Recent Collections</h3>
          <Link to="/admin/collections" className="text-sm text-pink hover:text-pink-deep flex items-center gap-1">
            View All <PiArrowRightBold />
          </Link>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {stats?.recentCategories?.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-xs uppercase tracking-wide text-gray-500 font-medium">Collection</th>
                  <th className="text-left px-6 py-4 text-xs uppercase tracking-wide text-gray-500 font-medium">Description</th>
                  <th className="text-left px-6 py-4 text-xs uppercase tracking-wide text-gray-500 font-medium">Tag</th>
                  <th className="text-left px-6 py-4 text-xs uppercase tracking-wide text-gray-500 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentCategories.map((col) => (
                  <tr key={col._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {col.image ? (
                          <img 
                            src={col.image.startsWith('http') ? col.image : col.image} 
                            alt="" className="h-10 w-10 rounded-lg object-cover" 
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs">No img</div>
                        )}
                        <span className="font-medium text-gray-900 text-sm">{col.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{col.description?.slice(0, 40) || '—'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{col.tag || '—'}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        col.active ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {col.active ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-10 text-center text-gray-400">
              <PiSquaresFourBold className="text-3xl mx-auto mb-3" />
              <p>No collections yet</p>
              <Link to="/admin/collections" className="text-pink hover:text-pink-deep text-sm mt-1 inline-block">Add your first collection</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}