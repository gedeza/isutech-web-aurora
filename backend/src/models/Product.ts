import mongoose, { Document, Schema } from 'mongoose';

interface ProductVariant {
  _id?: mongoose.Types.ObjectId;
  name: string;
  sku: string;
  price: number;
  stock: number;
  attributes: Record<string, string>;
  createdBy: mongoose.Types.ObjectId;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  status: 'Active' | 'Draft' | 'Archived';
  stock?: number;
  images: string[];
  variants: ProductVariant[];
  lastUpdated: Date;
  createdBy: mongoose.Types.ObjectId;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
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
      required: [true, 'Please add a description'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: [0, 'Price cannot be negative'],
    },
    status: {
      type: String,
      enum: ['Active', 'Draft', 'Archived'],
      default: 'Draft',
    },
    stock: {
      type: Number,
      min: [0, 'Stock cannot be negative'],
    },
    images: [{
      type: String,
    }],
    variants: [
      {
        name: {
          type: String,
          required: true,
        },
        sku: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: [0, 'Price cannot be negative'],
        },
        stock: {
          type: Number,
          required: true,
          min: [0, 'Stock cannot be negative'],
        },
        attributes: {
          type: Map,
          of: String,
        },
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
      },
    ],
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create slug from name before saving
productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-');
  }
  this.lastUpdated = new Date();
  next();
});

export const Product = mongoose.model<IProduct>('Product', productSchema); 