import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0, max: 100 },
    images: [{ type: String }],
    sizes: [{ type: String, trim: true }],
    colors: [{ type: String, trim: true }],
    stock: { type: Number, default: 0, min: 0 },
    featured: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

productSchema.index({ category: 1, active: 1 });
productSchema.index({ featured: 1 });
productSchema.index({ trending: 1 });

export default mongoose.model('Product', productSchema);