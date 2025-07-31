const express = require('express');
const { body } = require('express-validator');
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Validation rules
const createOrderValidation = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one item'),
  body('items.*.product')
    .isMongoId()
    .withMessage('Invalid product ID'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('deliveryAddress.street')
    .trim()
    .notEmpty()
    .withMessage('Street address is required'),
  body('deliveryAddress.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('deliveryAddress.state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
  body('deliveryAddress.zipCode')
    .trim()
    .notEmpty()
    .withMessage('ZIP code is required'),
  body('deliveryAddress.phone')
    .isMobilePhone()
    .withMessage('Valid phone number is required')
];

const updateOrderStatusValidation = [
  body('status')
    .isIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'])
    .withMessage('Invalid order status')
];

// Protected routes
router.post('/', auth, createOrderValidation, orderController.createOrder);
router.get('/my-orders', auth, orderController.getUserOrders);
router.get('/:id', auth, orderController.getOrder);
router.put('/:id/cancel', auth, orderController.cancelOrder);

// Admin routes
router.get('/', auth, adminAuth, orderController.getAllOrders);
router.put('/:id/status', auth, adminAuth, updateOrderStatusValidation, orderController.updateOrderStatus);

module.exports = router;