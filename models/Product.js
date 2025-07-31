const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['chicken', 'mutton', 'seafood', 'eggs', 'ready-to-cook'],
    lowercase: true
  },
  unit: {
    type: String,
    required: [true, 'Product unit is required'],
    enum: ['kg', 'piece', 'set'],
    default: 'kg'
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  images: [{
    url: String,
    alt: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [String],
  nutritionalInfo: {
    protein: Number,
    fat: Number,
    calories: Number
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ price: 1 });
productSchema.index({ createdAt: -1 });

// Virtual for formatted price
productSchema.virtual('formattedPrice').get(function() {
  return `₹${this.price}/${this.unit}`;
});

// Virtual for stock status
productSchema.virtual('stockStatus').get(function() {
  if (this.stock === 0) return 'out-of-stock';
  if (this.stock < 10) return 'low-stock';
  return 'in-stock';
});

module.exports = mongoose.model('Product', productSchema);