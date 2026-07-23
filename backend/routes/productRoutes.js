import { Router } from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStats,
} from '../controllers/productController.js';
import { protect } from '../middleware/auth.js';
import { uploadMultiple } from '../middleware/upload.js';

const router = Router();

// Public routes
router.get('/', getProducts);
router.get('/stats', getProductStats);
router.get('/:id', getProduct);

// Admin routes
router.post('/', protect, uploadMultiple, createProduct);
router.put('/:id', protect, uploadMultiple, updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;