import mongoose, { Document, Schema } from 'mongoose';

export interface IDocumentation extends Document {
  title: string;
  slug: string;
  content: string;
  category: string;
  tags: string[];
  author: Schema.Types.ObjectId;
  isPublished: boolean;
  version?: string;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
}

const documentationSchema = new Schema<IDocumentation>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author is required'],
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  version: {
    type: String,
    trim: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Create slug from title before saving
documentationSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  next();
});

export default mongoose.model<IDocumentation>('Documentation', documentationSchema); 