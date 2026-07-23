import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Media from '../models/Media.js';

const router = Router();

// GET /api/dashboard/stats - Admin
router.get('/stats', protect, async (req, res) => {
  try {
    const [
      totalCategories,
      totalProducts,
      totalMedia,
      recentCategories,
      recentProducts,
    ] = await Promise.all([
      Category.countDocuments({ active: true }),
      Product.countDocuments({ active: true }),
      Media.countDocuments(),
      Category.find().sort({ createdAt: -1 }).limit(5),
      Product.find()
        .populate('category', 'name')
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    res.json({
      totalCategories,
      totalProducts,
      totalMedia,
      recentCategories,
      recentProducts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching dashboard stats' });
  }
});

export default router;