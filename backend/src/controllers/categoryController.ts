import { Response } from 'express';
import Category from '../models/Category';
import { AuthRequest } from '../middleware/auth';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const categories = await Category.find({}).sort({ name: 1 });
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
export const getCategoryById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.json(category);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, slug, description, image } = req.body;

    const categoryExists = await Category.findOne({ slug });

    if (categoryExists) {
      res.status(400).json({ message: 'Category already exists' });
      return;
    }

    const category = await Category.create({
      name,
      slug,
      description,
      image,
    });

    res.status(201).json(category);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    const { name, slug, description, image } = req.body;

    category.name = name || category.name;
    category.slug = slug || category.slug;
    category.description = description || category.description;
    category.image = image || category.image;

    const updatedCategory = await category.save();

    res.json(updatedCategory);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    await category.deleteOne();

    res.json({ message: 'Category removed' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
