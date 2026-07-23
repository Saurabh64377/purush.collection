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
  PiMagnifyingGlassBold,
} from 'react-icons/pi';
import api from '../lib/api';

const API_BASE = import.meta.env.VITE_API_URL || '';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [stock, setStock] = useState('');
  const [sizes, setSizes] = useState('');
  const [colors, setColors] = useState('');
  const [featured, setFeatured] = useState(false);
  const [trending, setTrending] = useState(false);
  const [newArrival, setNewArrival] = useState(false);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);

  const fetchProducts = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (filter) params.category = filter;
      const res = await api.get('/products', { params });
      setProducts(res.data.products);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories?active=true');
      setCategories(res.data);
    } catch {}
  };

  useEffect(() => { fetchProducts(); fetchCategories(); }, []);
  useEffect(() => { fetchProducts(); }, [search, filter]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('');
    setPrice('');
    setDiscount('');
    setStock('');
    setSizes('');
    setColors('');
    setFeatured(false);
    setTrending(false);
    setNewArrival(false);
    setImages([]);
    setImagePreviews([]);
    setExistingImages([]);
    setRemovedImages([]);
    setEditing(null);
    setError('');
  };

  const openCreate = () => { resetForm(); setShowForm(true); };

  const openEdit = (product) => {
    setEditing(product);
    setTitle(product.title);
    setDescription(product.description || '');
    setCategory(product.category?._id || product.category || '');
    setPrice(product.price);
    setDiscount(product.discount || '');
    setStock(product.stock || '');
    setSizes((product.sizes || []).join(', '));
    setColors((product.colors || []).join(', '));
    setFeatured(product.featured);
    setTrending(product.trending);
    setNewArrival(product.newArrival);
    setImages([]);
    setImagePreviews([]);
    setExistingImages(product.images || []);
    setRemovedImages([]);
    setShowForm(true);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!title.trim()) { setError('Product title is required'); return; }
    if (!category) { setError('Category is required'); return; }
    if (!price) { setError('Price is required'); return; }
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('description', description);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('discount', discount || '0');
      formData.append('stock', stock || '0');
      formData.append('sizes', JSON.stringify(sizes.split(',').map((s) => s.trim()).filter(Boolean)));
      formData.append('colors', JSON.stringify(colors.split(',').map((c) => c.trim()).filter(Boolean)));
      formData.append('featured', featured);
      formData.append('trending', trending);
      formData.append('newArrival', newArrival);
      images.forEach((img) => formData.append('images', img));
      if (removedImages.length > 0) {
        formData.append('removeImages', JSON.stringify(removedImages));
      }

      if (editing) {
        await api.put(`/products/${editing._id}`, formData);
        setSuccess('Product updated!');
      } else {
        await api.post('/products', formData);
        setSuccess('Product created!');
      }

      fetchProducts();
      resetForm();
      setShowForm(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
      setSuccess('Product deleted');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    const previews = files.map((f) => URL.createObjectURL(f));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const removeNewImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (imgPath) => {
    setRemovedImages((prev) => [...prev, imgPath]);
    setExistingImages((prev) => prev.filter((i) => i !== imgPath));
  };

  const getImageUrl = (img) => img.startsWith('http') ? img : `${API_BASE}${img}`;

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
          <h2 className="text-2xl font-display font-semibold text-gray-900">Products</h2>
          <p className="text-gray-500 mt-1">{products.length} product{products.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 rounded-xl bg-pink hover:bg-pink-deep text-white px-5 py-3 text-sm font-medium transition-colors">
          <PiPlusBold /> Add Product
        </button>
      </div>

      {success && (
        <div className="rounded-xl bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-sm flex items-center gap-2">
          <PiCheckBold className="text-lg" /> {success}
        </div>
      )}
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">{error}</div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <PiMagnifyingGlassBold className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-300 pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/30" />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/30">
          <option value="">All Collections</option>
          {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
        </select>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="font-display font-semibold text-lg">{editing ? 'Edit Product' : 'New Product'}</h3>
              <button onClick={() => { setShowForm(false); resetForm(); }} className="p-2 rounded-lg hover:bg-gray-100"><PiXBold /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/30" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/30">
                    <option value="">Select...</option>
                    {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} min="0" step="any"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                  <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} min="0" max="100"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} min="0"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sizes (comma separated)</label>
                  <input type="text" value={sizes} onChange={(e) => setSizes(e.target.value)} placeholder="S, M, L, XL"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Colors (comma separated)</label>
                  <input type="text" value={colors} onChange={(e) => setColors(e.target.value)} placeholder="Black, White, Red"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/30" />
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="rounded accent-pink" /> Featured
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={trending} onChange={(e) => setTrending(e.target.checked)} className="rounded accent-pink" /> Trending
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={newArrival} onChange={(e) => setNewArrival(e.target.checked)} className="rounded accent-pink" /> New Arrival
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                <div className="flex flex-wrap gap-3 mb-3">
                  {existingImages.map((img) => (
                    <div key={img} className="relative h-20 w-20 rounded-xl overflow-hidden">
                      <img src={getImageUrl(img)} alt="" className="h-full w-full object-cover" />
                      <button type="button" onClick={() => removeExistingImage(img)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"><PiXBold /></button>
                    </div>
                  ))}
                  {imagePreviews.map((preview, i) => (
                    <div key={i} className="relative h-20 w-20 rounded-xl overflow-hidden">
                      <img src={preview} alt="" className="h-full w-full object-cover" />
                      <button type="button" onClick={() => removeNewImage(i)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"><PiXBold /></button>
                    </div>
                  ))}
                </div>
                <label className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-600 hover:border-pink hover:text-pink transition-colors">
                  <PiPlusBold /> Add Images
                  <input type="file" accept="image/*" multiple onChange={handleImagesChange} className="hidden" />
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setShowForm(false); resetForm(); }}
                  className="flex-1 rounded-xl border border-gray-300 text-gray-700 py-3 text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" disabled={saving}
                  className="flex-1 rounded-xl bg-pink text-white py-3 text-sm font-medium hover:bg-pink-deep transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                  {saving ? <><PiSpinnerBold className="animate-spin-slow" /> Saving...</> : <><PiFloppyDiskBold /> {editing ? 'Update' : 'Create'}</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-xs uppercase tracking-wide text-gray-500 font-medium">Product</th>
                  <th className="text-left px-6 py-4 text-xs uppercase tracking-wide text-gray-500 font-medium">Collection</th>
                  <th className="text-left px-6 py-4 text-xs uppercase tracking-wide text-gray-500 font-medium">Price</th>
                  <th className="text-left px-6 py-4 text-xs uppercase tracking-wide text-gray-500 font-medium">Stock</th>
                  <th className="text-left px-6 py-4 text-xs uppercase tracking-wide text-gray-500 font-medium">Flags</th>
                  <th className="text-right px-6 py-4 text-xs uppercase tracking-wide text-gray-500 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {p.images?.[0] ? (
                          <img src={getImageUrl(p.images[0])} alt="" className="h-10 w-10 rounded-lg object-cover" />
                        ) : (
                          <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center"><PiImageBold className="text-gray-400" /></div>
                        )}
                        <span className="font-medium text-gray-900 text-sm">{p.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{p.category?.name || '—'}</td>
                    <td className="px-6 py-4 text-sm font-medium">
                      {p.discount > 0 ? (
                        <span><span className="text-gray-400 line-through mr-1">₹{p.price}</span>₹{Math.round(p.price * (1 - p.discount / 100))}</span>
                      ) : (
                        <span>₹{p.price}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{p.stock}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        {p.featured && <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-50 text-purple-600 font-medium">Featured</span>}
                        {p.trending && <span className="text-[10px] px-1.5 py-0.5 rounded bg-pink/10 text-pink font-medium">Trending</span>}
                        {p.newArrival && <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-50 text-green-600 font-medium">New</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-pink">
                          <PiPencilBold />
                        </button>
                        <button onClick={() => handleDelete(p._id)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-red-500">
                          <PiTrashBold />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-10 text-center text-gray-400">
            <PiTShirtBold className="text-4xl mx-auto mb-3" />
            <p>No products found</p>
            <button onClick={openCreate} className="text-pink hover:text-pink-deep text-sm mt-1">Add your first product</button>
          </div>
        )}
      </div>
    </div>
  );
}