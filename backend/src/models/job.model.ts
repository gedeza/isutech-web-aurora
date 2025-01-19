import mongoose from 'mongoose';

export interface IJob extends mongoose.Document {
  title: string;
  description: string;
  requirements: string[];
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  status: 'open' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: [{
    type: String,
    required: true,
  }],
  location: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'contract'],
    required: true,
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open',
  },
}, {
  timestamps: true,
});

export default mongoose.model<IJob>('Job', jobSchema); 