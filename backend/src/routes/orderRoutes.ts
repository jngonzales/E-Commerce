import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} from '../controllers/orderController';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

router.route('/')
  .post(protect, createOrder)
  .get(protect, getMyOrders);

router.get('/admin/all', protect, admin, getAllOrders);

router.route('/:id')
  .get(protect, getOrderById);

router.put('/:id/status', protect, admin, updateOrderStatus);

export default router;
