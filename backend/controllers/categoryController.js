import Category from '../models/Category.js';
import Product from '../models/Product.js';
import { cloudinary, extractPublicId } from '../config/cloudinary.js';

// GET /api/categories - Public
export const getCategories = async (req, res) => {
  try {
    const { active } = req.query;
    const filter = {};
    if (active === 'true') filter.active = true;

    const categories = await Category.find(filter).sort({ order: 1, name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching categories' });
  }
};

// GET /api/categories/:id - Public
export const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching category' });
  }
};

// POST /api/categories - Admin
export const createCategory = async (req, res) => {
  try {
    const { name, description, tag, order } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const exists = await Category.findOne({ name: name.trim() });
    if (exists) {
      return res.status(400).json({ message: 'A category with this name already exists' });
    }

    const category = await Category.create({
      name: name.trim(),
      description: description || '',
      image: req.file ? req.file.path : '',
      tag: tag || '',
      order: order || 0,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating category' });
  }
};

// PUT /api/categories/:id - Admin
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const { name, description, tag, order, active } = req.body;

    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({ message: 'Category name cannot be empty' });
      }
      const exists = await Category.findOne({ name: name.trim(), _id: { $ne: req.params.id } });
      if (exists) {
        return res.status(400).json({ message: 'A category with this name already exists' });
      }
      category.name = name.trim();
    }

    if (description !== undefined) category.description = description;
    if (tag !== undefined) category.tag = tag;
    if (order !== undefined) category.order = order;
    if (active !== undefined) category.active = active;

    // Update image if new file uploaded
    if (req.file) {
      // Delete old Cloudinary image if exists
      if (category.image && category.image.includes('cloudinary')) {
        const publicId = extractPublicId(category.image);
        if (publicId) {
          try { await cloudinary.uploader.destroy(publicId); } catch {}
        }
      }
      category.image = req.file.path;
    }

    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating category' });
  }
};

// DELETE /api/categories/:id - Admin
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if products exist in this category
    const productsCount = await Product.countDocuments({ category: req.params.id });
    if (productsCount > 0) {
      return res.status(400).json({
        message: `Cannot delete category with ${productsCount} products. Reassign or delete the products first.`,
      });
    }

    // Delete image from Cloudinary
    if (category.image && category.image.includes('cloudinary')) {
      const publicId = extractPublicId(category.image);
      if (publicId) {
        try { await cloudinary.uploader.destroy(publicId); } catch {}
      }
    }

    await category.deleteOne();
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting category' });
  }
};

// PUT /api/categories/reorder - Admin
export const reorderCategories = async (req, res) => {
  try {
    const { orderedIds } = req.body;

    if (!Array.isArray(orderedIds)) {
      return res.status(400).json({ message: 'orderedIds must be an array of category IDs' });
    }

    const operations = orderedIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order: index } },
      },
    }));

    await Category.bulkWrite(operations);

    const categories = await Category.find().sort({ order: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error reordering categories' });
  }
};