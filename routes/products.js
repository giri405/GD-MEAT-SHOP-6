const express = require('express');
const { body } = require('express-validator');
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Validation rules
const productValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Product name must be between 2 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('category')
    .isIn(['chicken', 'mutton', 'seafood', 'eggs', 'ready-to-cook'])
    .withMessage('Invalid category'),
  body('unit')
    .isIn(['kg', 'piece', 'set'])
    .withMessage('Invalid unit'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer')
];

// Public routes
router.get('/', productController.getAllProducts);
router.get('/category/:category', productController.getProductsByCategory);
router.get('/:id', productController.getProduct);

// Protected routes (Admin only)
router.post('/', auth, adminAuth, productValidation, productController.createProduct);
router.put('/:id', auth, adminAuth, productValidation, productController.updateProduct);
router.delete('/:id', auth, adminAuth, productController.deleteProduct);

module.exports = router;