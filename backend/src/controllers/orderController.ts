import { Response } from 'express';
import Order from '../models/Order';
import Cart from '../models/Cart';
import Product from '../models/Product';
import { AuthRequest } from '../middleware/auth';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (!orderItems || orderItems.length === 0) {
      res.status(400).json({ message: 'No order items' });
      return;
    }

    // Verify products and stock
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      
      if (!product) {
        res.status(404).json({ message: `Product ${item.product} not found` });
        return;
      }

      if (product.stock < item.quantity) {
        res.status(400).json({ 
          message: `Insufficient stock for ${product.name}` 
        });
        return;
      }
    }

    // Calculate prices
    const itemsPrice = orderItems.reduce(
      (acc: number, item: any) => acc + item.price * item.quantity,
      0
    );
    
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    // Update product stock
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock -= item.quantity;
        await product.save();
      }
    }

    // Clear user cart
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [] }
    );

    res.status(201).json(order);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
export const getMyOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    // Make sure user can only see their own orders
    if (order.user._id.toString() !== String(req.user._id) && req.user.role !== 'admin') {
      res.status(403).json({ message: 'Not authorized to view this order' });
      return;
    }

    res.json(order);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders/admin/all
// @access  Private/Admin
export const getAllOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    order.status = status;

    if (status === 'delivered') {
      order.isDelivered = true;
      order.deliveredAt = new Date();
    }

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
