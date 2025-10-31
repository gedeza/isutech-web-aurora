import mongoose from 'mongoose';

export interface IApplication extends mongoose.Document {
  job: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
  resumeUrl: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  coverLetter: {
    type: String,
    required: true,
  },
  resumeUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'shortlisted', 'rejected'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

export default mongoose.model<IApplication>('Application', applicationSchema); 