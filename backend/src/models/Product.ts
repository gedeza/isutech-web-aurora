import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  type: 'product' | 'service';
  category: string;
  features: string[];
  benefits: string[];
  imageUrl?: string;
  price?: {
    amount: number;
    currency: string;
    billingCycle?: 'one-time' | 'monthly' | 'yearly';
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  type: {
    type: String,
    enum: ['product', 'service'],
    required: [true, 'Product type is required'],
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    trim: true,
  },
  features: [{
    type: String,
    required: [true, 'At least one feature is required'],
  }],
  benefits: [{
    type: String,
    required: [true, 'At least one benefit is required'],
  }],
  imageUrl: {
    type: String,
  },
  price: {
    amount: {
      type: Number,
    },
    currency: {
      type: String,
      default: 'ZAR',
    },
    billingCycle: {
      type: String,
      enum: ['one-time', 'monthly', 'yearly'],
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model<IProduct>('Product', productSchema); 