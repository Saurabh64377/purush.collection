import { Router } from 'express';
import {
  uploadMedia,
  uploadMultipleMedia,
  getMedia,
  getFolders,
  deleteMedia,
} from '../controllers/mediaController.js';
import { protect } from '../middleware/auth.js';
import { uploadSingle, uploadMultiple } from '../middleware/upload.js';

const router = Router();

// All media routes are admin-protected
router.get('/', protect, getMedia);
router.get('/folders', protect, getFolders);
router.post('/upload', protect, uploadSingle, uploadMedia);
router.post('/upload-multiple', protect, uploadMultiple, uploadMultipleMedia);
router.delete('/:id', protect, deleteMedia);

export default router;