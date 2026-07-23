import { useEffect, useState, useRef } from 'react';
import {
  PiPlusBold,
  PiTrashBold,
  PiSpinnerBold,
  PiCheckBold,
  PiXBold,
  PiImageBold,
  PiCopyBold,
  PiMagnifyingGlassBold,
} from 'react-icons/pi';
import api from '../lib/api';

const API_BASE = import.meta.env.VITE_API_URL || '';

export default function Media() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const fileRef = useRef(null);

  const fetchMedia = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      const res = await api.get('/media', { params });
      setMedia(res.data.media);
    } catch (err) {
      setError('Failed to load media');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMedia(); }, []);
  useEffect(() => { fetchMedia(); }, [search]);

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      for (const file of files) {
        formData.append('images', file);
      }
      await api.post('/media/upload-multiple', formData);
      setSuccess('Files uploaded successfully!');
      fetchMedia();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this file permanently?')) return;
    try {
      await api.delete(`/media/${id}`);
      setMedia((prev) => prev.filter((m) => m._id !== id));
      if (selected?._id === id) setSelected(null);
      setSuccess('File deleted');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete file');
    }
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(`${API_BASE}${url}`);
    setSuccess('URL copied!');
    setTimeout(() => setSuccess(''), 2000);
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
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-display font-semibold text-gray-900">Media Library</h2>
          <p className="text-gray-500 mt-1">{media.length} file{media.length !== 1 ? 's' : ''}</p>
        </div>
        <div>
          <label className="cursor-pointer flex items-center gap-2 rounded-xl bg-green-500 hover:bg-green-600 text-white px-5 py-3 text-sm font-medium transition-colors">
            {uploading ? <><PiSpinnerBold className="animate-spin-slow" /> Uploading...</> : <><PiPlusBold /> Upload Images</>}
            <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
          </label>
        </div>
      </div>

      {success && (
        <div className="rounded-xl bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-sm flex items-center gap-2">
          <PiCheckBold className="text-lg" /> {success}
        </div>
      )}
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">{error}</div>
      )}

      {/* Search */}
      <div className="relative">
        <PiMagnifyingGlassBold className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Search files..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-300 pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/30" />
      </div>

      {/* Selected file preview */}
      {selected && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex gap-6">
          <img src={selected.url?.startsWith('http') ? selected.url : `${API_BASE}${selected.url}`} alt={selected.originalName} className="h-40 w-40 rounded-xl object-cover" />
          <div className="flex flex-col gap-2 flex-1">
            <p className="font-medium text-gray-900">{selected.originalName}</p>
            <p className="text-sm text-gray-500">Type: {selected.mimeType}</p>
            <p className="text-sm text-gray-500">Size: {(selected.size / 1024).toFixed(1)} KB</p>
            <p className="text-sm text-gray-500">URL: {API_BASE}{selected.url}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => copyUrl(selected.url)} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700">
                <PiCopyBold /> Copy URL
              </button>
              <button onClick={() => handleDelete(selected._id)} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600">
                <PiTrashBold /> Delete
              </button>
            </div>
          </div>
          <button onClick={() => setSelected(null)} className="p-2 hover:bg-gray-100 rounded-lg"><PiXBold /></button>
        </div>
      )}

      {/* Media Grid */}
      {media.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {media.map((m) => (
            <div
              key={m._id}
              onClick={() => setSelected(m)}
              className={`group relative aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                selected?._id === m._id ? 'border-pink ring-2 ring-pink/30' : 'border-transparent hover:border-gray-200'
              }`}
            >
              <img src={m.url?.startsWith('http') ? m.url : `${API_BASE}${m.url}`} alt={m.originalName} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(m._id); }}
                  className="opacity-0 group-hover:opacity-100 p-2 rounded-lg bg-white/90 hover:bg-red-50 hover:text-red-500 transition-all"
                >
                  <PiTrashBold className="text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <PiImageBold className="text-5xl mx-auto mb-4" />
          <p className="text-lg">No media files yet</p>
          <p className="text-sm mt-1">Upload images to use in collections and products</p>
        </div>
      )}
    </div>
  );
}