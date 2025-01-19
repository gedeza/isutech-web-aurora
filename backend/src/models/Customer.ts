import mongoose, { Document, Schema } from 'mongoose';

interface Note {
  text: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

export interface ICustomer extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: 'Active' | 'Lead' | 'Inactive';
  notes: Note[];
  lastContact?: Date;
  lastUpdated: Date;
  createdBy: mongoose.Types.ObjectId;
}

const customerSchema = new Schema<ICustomer>(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
    },
    phone: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Lead', 'Inactive'],
      default: 'Lead',
    },
    notes: [
      {
        text: {
          type: String,
          required: true,
        },
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    lastContact: {
      type: Date,
    },
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

// Update lastUpdated on save
customerSchema.pre('save', function (next) {
  this.lastUpdated = new Date();
  next();
});

export const Customer = mongoose.model<ICustomer>('Customer', customerSchema); 