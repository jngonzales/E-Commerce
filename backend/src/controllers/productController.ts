import { Response } from 'express';
import Product from '../models/Product';
import Category from '../models/Category';
import { AuthRequest } from '../middleware/auth';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const categorySlug = req.query.category as string;
    const search = req.query.search as string;
    const sort = req.query.sort as string;
    const featured = req.query.featured === 'true';

    let query: any = {};

    // If category slug is provided, find the category by slug and use its ID
    if (categorySlug) {
      const category = await Category.findOne({ slug: categorySlug });
      if (category) {
        query.category = category._id;
      } else {
        // If category not found, return empty results
        res.json({
          products: [],
          page,
          pages: 0,
          total: 0,
        });
        return;
      }
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    if (featured) {
      query.featured = true;
    }

    // Handle sorting - default to newest first
    let sortQuery: any = { createdAt: -1 };
    
    if (sort) {
      if (sort === 'price' || sort === '-price') {
        sortQuery = { price: sort === 'price' ? 1 : -1 };
      } else if (sort === 'name' || sort === '-name') {
        sortQuery = { name: sort === 'name' ? 1 : -1 };
      } else if (sort === '-createdAt' || sort === 'createdAt') {
        sortQuery = { createdAt: sort === '-createdAt' ? -1 : 1 };
      } else if (sort === '-rating' || sort === 'rating') {
        sortQuery = { rating: sort === '-rating' ? -1 : 1 };
      }
    }

    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort(sortQuery)
      .limit(limit)
      .skip(skip);

    const total = await Product.countDocuments(query);

    res.json({
      products,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name slug');

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      name,
      slug,
      description,
      price,
      compareAtPrice,
      category,
      images,
      stock,
      tags,
      featured,
    } = req.body;

    const product = await Product.create({
      name,
      slug,
      description,
      price,
      compareAtPrice,
      category,
      images,
      stock,
      tags,
      featured,
    });

    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    const {
      name,
      slug,
      description,
      price,
      compareAtPrice,
      category,
      images,
      stock,
      tags,
      featured,
    } = req.body;

    product.name = name || product.name;
    product.slug = slug || product.slug;
    product.description = description || product.description;
    product.price = price !== undefined ? price : product.price;
    product.compareAtPrice = compareAtPrice !== undefined ? compareAtPrice : product.compareAtPrice;
    product.category = category || product.category;
    product.images = images || product.images;
    product.stock = stock !== undefined ? stock : product.stock;
    product.tags = tags || product.tags;
    product.featured = featured !== undefined ? featured : product.featured;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    await product.deleteOne();

    res.json({ message: 'Product removed' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
