import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: (req) => {
      const folder = req.body?.folder || 'general';
      return `purush_collection/${folder}`;
    },
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif', 'svg'],
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  },
});

// Utility: extract Cloudinary public_id from a full Cloudinary URL
// Example: https://res.cloudinary.com/cloud_name/image/upload/v1234567/folder/filename.jpg
// Returns: folder/filename
export function extractPublicId(url) {
  try {
    const urlParts = url.split('/');
    const uploadIndex = urlParts.indexOf('upload');
    if (uploadIndex === -1) return null;
    // Get everything after 'upload' and version number, remove file extension
    const pathParts = urlParts.slice(uploadIndex + 1);
    // Skip version part (starts with 'v' followed by numbers)
    const filtered = pathParts.filter(p => !p.startsWith('v') || !/^v\d+$/.test(p));
    const fullPath = filtered.join('/');
    // Remove file extension
    return fullPath.replace(/\.[^.]+$/, '');
  } catch {
    return null;
  }
}

export { cloudinary, storage };
