import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  name: string;
  slug: string;
  category: string;
  description: string;
  shortDescription: string;
  features: string[];
  benefits: string[];
  process: Array<{
    title: string;
    description: string;
  }>;
  technologies: string[];
  price: {
    starter: number;
    professional: number;
    enterprise: number;
  };
  status: 'Published' | 'Draft' | 'Archived';
  createdBy: mongoose.Types.ObjectId;
  lastUpdated: Date;
}

const serviceSchema = new Schema<IService>({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required']
  },
  features: [{
    type: String,
    required: [true, 'Features are required']
  }],
  benefits: [{
    type: String,
    required: [true, 'Benefits are required']
  }],
  process: [{
    title: {
      type: String,
      required: [true, 'Process step title is required']
    },
    description: {
      type: String,
      required: [true, 'Process step description is required']
    }
  }],
  technologies: [{
    type: String,
    required: [true, 'Technologies are required']
  }],
  price: {
    starter: {
      type: Number,
      required: [true, 'Starter price is required']
    },
    professional: {
      type: Number,
      required: [true, 'Professional price is required']
    },
    enterprise: {
      type: Number,
      required: [true, 'Enterprise price is required']
    }
  },
  status: {
    type: String,
    enum: ['Published', 'Draft', 'Archived'],
    default: 'Draft'
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create slug from name before saving
serviceSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
  this.lastUpdated = new Date();
  next();
});

export default mongoose.model<IService>('Service', serviceSchema); 