import { Router } from 'express';
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  reorderCategories,
} from '../controllers/categoryController.js';
import { protect } from '../middleware/auth.js';
import { uploadSingle } from '../middleware/upload.js';

const router = Router();

// Public routes
router.get('/', getCategories);
router.get('/:id', getCategory);

// Admin routes
router.post('/', protect, uploadSingle, createCategory);
router.put('/reorder', protect, reorderCategories);
router.put('/:id', protect, uploadSingle, updateCategory);
router.delete('/:id', protect, deleteCategory);

export default router;