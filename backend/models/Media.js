import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    url: { type: String, required: true },
    publicId: { type: String, default: '' },
    thumbnailUrl: { type: String, default: '' },
    alt: { type: String, default: '' },
    folder: { type: String, default: 'general' },
  },
  { timestamps: true }
);

export default mongoose.model('Media', mediaSchema);