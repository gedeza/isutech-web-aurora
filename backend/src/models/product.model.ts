import mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  features: string[];
  benefits: string[];
  images: string[];
  pricing: {
    type: 'one-time' | 'subscription';
    amount: number;
    currency: string;
    interval?: 'monthly' | 'yearly';
  };
  category: string;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
    maxlength: 200,
  },
  features: [{
    type: String,
    required: true,
  }],
  benefits: [{
    type: String,
    required: true,
  }],
  images: [{
    type: String,
    required: true,
  }],
  pricing: {
    type: {
      type: String,
      enum: ['one-time', 'subscription'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'ZAR',
    },
    interval: {
      type: String,
      enum: ['monthly', 'yearly'],
      required: function(this: any) {
        return this.pricing.type === 'subscription';
      },
    },
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
}, {
  timestamps: true,
});

// Create slug from name before saving
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
  }
  next();
});

export default mongoose.model<IProduct>('Product', productSchema); 