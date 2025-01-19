import mongoose from 'mongoose';

export interface IDocumentation extends mongoose.Document {
  title: string;
  slug: string;
  content: string;
  summary: string;
  category: string;
  subcategory?: string;
  version: string;
  order: number;
  status: 'draft' | 'published';
  metadata: {
    author: string;
    lastUpdated: Date;
    tags: string[];
  };
  relatedDocs?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const documentationSchema = new mongoose.Schema({
  title: {
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
  content: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
    maxlength: 200,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  subcategory: {
    type: String,
    trim: true,
  },
  version: {
    type: String,
    required: true,
    default: '1.0.0',
  },
  order: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  metadata: {
    author: {
      type: String,
      required: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    tags: [{
      type: String,
      trim: true,
    }],
  },
  relatedDocs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Documentation',
  }],
}, {
  timestamps: true,
});

// Create slug from title before saving
documentationSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
  }
  next();
});

// Update lastUpdated timestamp before saving
documentationSchema.pre('save', function(this: IDocumentation, next) {
  if (this.isModified()) {
    this.metadata.lastUpdated = new Date();
  }
  next();
});

export default mongoose.model<IDocumentation>('Documentation', documentationSchema); 