import { Response } from 'express';
import Cart from '../models/Cart';
import Product from '../models/Product';
import { AuthRequest } from '../middleware/auth';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    let cart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product',
      'name slug price images stock'
    );

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    res.json(cart);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    if (product.stock < quantity) {
      res.status(400).json({ message: 'Insufficient stock' });
      return;
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
      });
    }

    await cart.save();
    
    cart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product',
      'name slug price images stock'
    );

    res.json(cart);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update cart item
// @route   PUT /api/cart/:itemId
// @access  Private
export const updateCartItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    const { quantity } = req.body;
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      return;
    }

    const item = cart.items.find((item: any) => item._id?.toString() === itemId);

    if (!item) {
      res.status(404).json({ message: 'Item not found in cart' });
      return;
    }

    const product = await Product.findById(item.product);

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    if (product.stock < quantity) {
      res.status(400).json({ message: 'Insufficient stock' });
      return;
    }

    item.quantity = quantity;

    await cart.save();

    const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product',
      'name slug price images stock'
    );

    res.json(updatedCart);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
export const removeFromCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      return;
    }

    cart.items = cart.items.filter((item: any) => item._id?.toString() !== itemId);

    await cart.save();

    const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product',
      'name slug price images stock'
    );

    res.json(updatedCart);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      return;
    }

    cart.items = [];
    await cart.save();

    res.json({ message: 'Cart cleared' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
