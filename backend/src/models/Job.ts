import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  experience: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  department: string;
  isActive: boolean;
  applicationDeadline: Date;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
  },
  requirements: [{
    type: String,
    required: [true, 'At least one requirement is required'],
  }],
  responsibilities: [{
    type: String,
    required: [true, 'At least one responsibility is required'],
  }],
  location: {
    type: String,
    required: [true, 'Job location is required'],
    trim: true,
  },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship'],
    required: [true, 'Job type is required'],
  },
  experience: {
    type: String,
    required: [true, 'Experience level is required'],
  },
  salary: {
    min: {
      type: Number,
      required: [true, 'Minimum salary is required'],
    },
    max: {
      type: Number,
      required: [true, 'Maximum salary is required'],
    },
    currency: {
      type: String,
      default: 'ZAR',
    },
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  applicationDeadline: {
    type: Date,
    required: [true, 'Application deadline is required'],
  },
}, {
  timestamps: true,
});

export default mongoose.model<IJob>('Job', jobSchema); 