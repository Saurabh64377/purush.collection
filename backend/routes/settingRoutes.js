import { Router } from 'express';
import {
  getSetting,
  getAllSettings,
  updateSetting,
  updateBulkSettings,
} from '../controllers/settingController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/', getAllSettings);
router.get('/:key', getSetting);

// Admin routes
router.put('/bulk', protect, updateBulkSettings);
router.put('/:key', protect, updateSetting);

export default router;