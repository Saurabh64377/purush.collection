import { useEffect, useState } from 'react';
import {
  PiPlusBold,
  PiPencilBold,
  PiTrashBold,
  PiSpinnerBold,
  PiFloppyDiskBold,
  PiXBold,
  PiImageBold,
  PiCheckBold,
} from 'react-icons/pi';
import api from '../lib/api';

const API_BASE = import.meta.env.VITE_API_URL || '';

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const fetchCollections = async () => {
    try {
      const res = await api.get('/categories');
      setCollections(res.data);
    } catch (err) {
      setError('Failed to load collections');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCollections(); }, []);

  const resetForm = () => {
    setName('');
    setDescription('');
    setTag('');
    setImage(null);
    setImagePreview('');
    setEditing(null);
    setError('');
  };

  const openCreate = () => {
    resetForm();
    setShowForm(true);
  };

  const openEdit = (collection) => {
    setEditing(collection);
    setName(collection.name);
    setDescription(collection.description || '');
    setTag(collection.tag || '');
    setImage(null);
    setImagePreview(collection.image ? (collection.image.startsWith('http') ? collection.image : `${API_BASE}${collection.image}`) : '');
    setShowForm(true);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!name.trim()) {
      setError('Collection name is required');
      return;
    }
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('description', description);
      formData.append('tag', tag);
      if (image) formData.append('image', image);

      if (editing) {
        await api.put(`/categories/${editing._id}`, formData);
        setSuccess('Collection updated!');
      } else {
        await api.post('/categories', formData);
        setSuccess('Collection created!');
      }

      fetchCollections();
      resetForm();
      setShowForm(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save collection');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this collection? Products in it must be reassigned first.')) return;
    try {
      await api.delete(`/categories/${id}`);
      fetchCollections();
      setSuccess('Collection deleted');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <PiSpinnerBold className="text-3xl text-pink animate-spin-slow" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-semibold text-gray-900">Collections</h2>
          <p className="text-gray-500 mt-1">{collections.length} collection{collections.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 rounded-xl bg-pink hover:bg-pink-deep text-white px-5 py-3 text-sm font-medium transition-colors">
          <PiPlusBold /> Add Collection
        </button>
      </div>

      {success && (
        <div className="rounded-xl bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-sm flex items-center gap-2">
          <PiCheckBold className="text-lg" /> {success}
        </div>
      )}
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="font-display font-semibold text-lg">{editing ? 'Edit Collection' : 'New Collection'}</h3>
              <button onClick={() => { setShowForm(false); resetForm(); }} className="p-2 rounded-lg hover:bg-gray-100">
                <PiXBold />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Oversized T-Shirts"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/30" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/30" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tag</label>
                <select value={tag} onChange={(e) => setTag(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/30">
                  <option value="">None</option>
                  <option value="Trending">Trending</option>
                  <option value="New">New</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <div className="flex items-center gap-4">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-20 w-20 rounded-xl object-cover" />
                  ) : (
                    <div className="h-20 w-20 rounded-xl bg-gray-100 flex items-center justify-center">
                      <PiImageBold className="text-2xl text-gray-400" />
                    </div>
                  )}
                  <label className="cursor-pointer rounded-xl border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-600 hover:border-pink hover:text-pink transition-colors">
                    Choose File
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setShowForm(false); resetForm(); }}
                  className="flex-1 rounded-xl border border-gray-300 text-gray-700 py-3 text-sm font-medium hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 rounded-xl bg-pink text-white py-3 text-sm font-medium hover:bg-pink-deep transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                  {saving ? <><PiSpinnerBold className="animate-spin-slow" /> Saving...</> : <><PiFloppyDiskBold /> {editing ? 'Update' : 'Create'}</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Collections Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {collections.map((col) => (
          <div key={col._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group">
            <div className="aspect-[4/3] bg-gray-100 relative">
              {col.image ? (
                <img src={col.image?.startsWith('http') ? col.image : `${API_BASE}${col.image}`} alt={col.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <PiImageBold className="text-4xl text-gray-300" />
                </div>
              )}
              {col.tag && (
                <span className={`absolute top-3 left-3 text-[10px] uppercase tracking-wide px-2 py-1 rounded-full font-medium ${
                  col.tag === 'Trending' ? 'bg-pink text-white' : 'bg-green-500 text-white'
                }`}>
                  {col.tag}
                </span>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => openEdit(col)} className="p-2 rounded-lg bg-white/90 hover:bg-white text-gray-700">
                  <PiPencilBold className="text-lg" />
                </button>
                <button onClick={() => handleDelete(col._id)} className="p-2 rounded-lg bg-white/90 hover:bg-red-50 hover:text-red-500 text-gray-700">
                  <PiTrashBold className="text-lg" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-display font-semibold text-gray-900">{col.name}</h3>
              <p className="text-xs text-gray-400 mt-1">{col.active ? 'Active' : 'Hidden'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}