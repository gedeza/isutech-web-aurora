import mongoose from 'mongoose';

interface PricingTier {
  name: string;
  price: number;
  currency: string;
  features: string[];
  isPopular?: boolean;
}

export interface IService extends mongoose.Document {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  features: string[];
  benefits: string[];
  process: {
    title: string;
    description: string;
  }[];
  technologies: string[];
  pricingTiers: PricingTier[];
  category: string;
  status: 'draft' | 'published';
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new mongoose.Schema({
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
  process: [{
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  }],
  technologies: [{
    type: String,
    required: true,
  }],
  pricingTiers: [{
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'ZAR',
    },
    features: [{
      type: String,
      required: true,
    }],
    isPopular: {
      type: Boolean,
      default: false,
    },
  }],
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
  image: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Create slug from name before saving
serviceSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
  }
  next();
});

export default mongoose.model<IService>('Service', serviceSchema); 