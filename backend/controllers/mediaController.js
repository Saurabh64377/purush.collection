import Media from '../models/Media.js';
import { cloudinary } from '../config/cloudinary.js';

// POST /api/media/upload - Admin
export const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { alt, folder } = req.body;

    // CloudinaryStorage provides: req.file.path = cloudinary URL, req.file.filename = public_id
    const media = await Media.create({
      filename: req.file.filename || req.file.originalname,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      url: req.file.path, // full Cloudinary URL
      publicId: req.file.filename, // Cloudinary public_id for deletion
      alt: alt || req.file.originalname,
      folder: folder || 'general',
    });

    res.status(201).json(media);
  } catch (error) {
    res.status(500).json({ message: 'Server error uploading file' });
  }
};

// POST /api/media/upload-multiple - Admin
export const uploadMultipleMedia = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const { folder } = req.body;

    const mediaItems = await Promise.all(
      req.files.map((file) =>
        Media.create({
          filename: file.filename || file.originalname,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          url: file.path,
          publicId: file.filename,
          alt: file.originalname,
          folder: folder || 'general',
        })
      )
    );

    res.status(201).json(mediaItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error uploading files' });
  }
};

// GET /api/media - Admin
export const getMedia = async (req, res) => {
  try {
    const { folder, search, page = 1, limit = 30 } = req.query;
    const filter = {};

    if (folder) filter.folder = folder;
    if (search) {
      filter.originalName = { $regex: search, $options: 'i' };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [media, total] = await Promise.all([
      Media.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      Media.countDocuments(filter),
    ]);

    res.json({
      media,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching media' });
  }
};

// GET /api/media/folders - Admin
export const getFolders = async (req, res) => {
  try {
    const folders = await Media.distinct('folder');
    res.json(folders);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching folders' });
  }
};

// DELETE /api/media/:id - Admin
export const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    // Delete from Cloudinary using public_id
    if (media.publicId) {
      try {
        await cloudinary.uploader.destroy(media.publicId);
      } catch (cloudErr) {
        console.error('Cloudinary delete error:', cloudErr.message);
        // Continue with DB deletion even if Cloudinary delete fails
      }
    }

    await media.deleteOne();
    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting media' });
  }
};