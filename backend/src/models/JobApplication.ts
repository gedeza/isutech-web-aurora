import mongoose, { Document, Schema } from 'mongoose';

export interface IJobApplication extends Document {
  job: Schema.Types.ObjectId;
  fullName: string;
  email: string;
  phone: string;
  coverLetter: string;
  resumeUrl: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  createdAt: Date;
  updatedAt: Date;
}

const jobApplicationSchema = new Schema<IJobApplication>({
  job: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: [true, 'Job reference is required'],
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  coverLetter: {
    type: String,
    required: [true, 'Cover letter is required'],
  },
  resumeUrl: {
    type: String,
    required: [true, 'Resume URL is required'],
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

export default mongoose.model<IJobApplication>('JobApplication', jobApplicationSchema); 