import Product from '../models/Product.js';
import { cloudinary, extractPublicId } from '../config/cloudinary.js';

// GET /api/products - Public
export const getProducts = async (req, res) => {
  try {
    const { category, featured, trending, newArrival, search, limit, page = 1 } = req.query;
    const filter = { active: true };

    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;
    if (trending === 'true') filter.trending = true;
    if (newArrival === 'true') filter.newArrival = true;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const perPage = limit ? parseInt(limit) : 20;
    const skip = (parseInt(page) - 1) * perPage;

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate('category', 'name')
        .sort({ sortOrder: 1, createdAt: -1 })
        .skip(skip)
        .limit(perPage),
      Product.countDocuments(filter),
    ]);

    res.json({
      products,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / perPage),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching products' });
  }
};

// GET /api/products/:id - Public
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching product' });
  }
};

// POST /api/products - Admin
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      discount,
      sizes,
      colors,
      stock,
      featured,
      trending,
      newArrival,
      sortOrder,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Product title is required' });
    }
    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }
    if (price === undefined || price < 0) {
      return res.status(400).json({ message: 'Valid price is required' });
    }

    const images = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        images.push(file.path); // Cloudinary URL
      });
    }

    const product = await Product.create({
      title: title.trim(),
      description: description || '',
      category,
      price: parseFloat(price),
      discount: discount ? parseFloat(discount) : 0,
      images,
      sizes: sizes ? (Array.isArray(sizes) ? sizes : JSON.parse(sizes)) : [],
      colors: colors ? (Array.isArray(colors) ? colors : JSON.parse(colors)) : [],
      stock: stock ? parseInt(stock) : 0,
      featured: featured === 'true' || featured === true,
      trending: trending === 'true' || trending === true,
      newArrival: newArrival === 'true' || newArrival === true,
      sortOrder: sortOrder ? parseInt(sortOrder) : 0,
    });

    await product.populate('category', 'name');
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating product' });
  }
};

// PUT /api/products/:id - Admin
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const {
      title,
      description,
      category,
      price,
      discount,
      sizes,
      colors,
      stock,
      featured,
      trending,
      newArrival,
      active,
      sortOrder,
      removeImages,
    } = req.body;

    if (title !== undefined) product.title = title.trim();
    if (description !== undefined) product.description = description;
    if (category !== undefined) product.category = category;
    if (price !== undefined) product.price = parseFloat(price);
    if (discount !== undefined) product.discount = parseFloat(discount);
    if (stock !== undefined) product.stock = parseInt(stock);
    if (featured !== undefined) product.featured = featured === 'true' || featured === true;
    if (trending !== undefined) product.trending = trending === 'true' || trending === true;
    if (newArrival !== undefined) product.newArrival = newArrival === 'true' || newArrival === true;
    if (active !== undefined) product.active = active === 'true' || active === true;
    if (sortOrder !== undefined) product.sortOrder = parseInt(sortOrder);

    if (sizes !== undefined) {
      product.sizes = Array.isArray(sizes) ? sizes : JSON.parse(sizes);
    }
    if (colors !== undefined) {
      product.colors = Array.isArray(colors) ? colors : JSON.parse(colors);
    }

    // Remove specific images from Cloudinary
    if (removeImages) {
      const toRemove = Array.isArray(removeImages) ? removeImages : JSON.parse(removeImages);
      for (const imgUrl of toRemove) {
        if (imgUrl.includes('cloudinary')) {
          const publicId = extractPublicId(imgUrl);
          if (publicId) {
            try { await cloudinary.uploader.destroy(publicId); } catch {}
          }
        }
      }
      product.images = product.images.filter((img) => !toRemove.includes(img));
    }

    // Add new images (Cloudinary URLs)
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => file.path);
      product.images = [...product.images, ...newImages];
    }

    await product.save();
    await product.populate('category', 'name');
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating product' });
  }
};

// DELETE /api/products/:id - Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete all images from Cloudinary
    for (const imgUrl of product.images) {
      if (imgUrl.includes('cloudinary')) {
        const publicId = extractPublicId(imgUrl);
        if (publicId) {
          try { await cloudinary.uploader.destroy(publicId); } catch {}
        }
      }
    }

    await product.deleteOne();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting product' });
  }
};

// GET /api/products/stats - Admin dashboard
export const getProductStats = async (req, res) => {
  try {
    const [totalProducts, activeProducts, featuredProducts, trendingProducts, newArrivals] =
      await Promise.all([
        Product.countDocuments(),
        Product.countDocuments({ active: true }),
        Product.countDocuments({ featured: true }),
        Product.countDocuments({ trending: true }),
        Product.countDocuments({ newArrival: true }),
      ]);

    const recentProducts = await Product.find()
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalProducts,
      activeProducts,
      featuredProducts,
      trendingProducts,
      newArrivals,
      recentProducts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching stats' });
  }
};