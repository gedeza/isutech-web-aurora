import type {Request, Response, NextFunction}
from "express"
import jwt from "jsonwebtoken"
import User, { type IUser } from "../models/user.model"
import mongoose, { type Document, Schema } from "mongoose"

interface JwtPayload {
  id: string
  role: string
}

export interface AuthRequest extends Request {
  user?: IUser
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token: string | undefined

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
      req.user = await User.findById(decoded.id).select("-password")

      if (!req.user) {
        res.status(401).json({ message: "User not found" })
        return
      }

      next()
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" })
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" })
  }
}

export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role === "admin") {
    next()
  } else {
    res.status(403).json({ message: "Not authorized as admin" })
  }
}

export const generateToken = (id: mongoose.Types.ObjectId): string => {
  return jwt.sign({ id: id.toString() }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  })
}

export interface IProduct extends Document {
  name: string
  slug: string
  description: string
  shortDescription: string
  category: string
  price: number
  status: "Active" | "Draft" | "Archived"
  images: string[]
  technologies: string[]
  client?: string
  year?: string
  createdBy: mongoose.Types.ObjectId
  lastUpdated: Date
  createdAt: Date
  updatedAt: Date
  variants: Array<{
    _id?: mongoose.Types.ObjectId
    sku: string
    price: number
    inventory: number
  }>
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
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
      required: [true, "Description is required"],
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      maxlength: 200,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    technologies: [
      {
        type: String,
      },
    ],
    images: [
      {
        type: String,
        required: true,
      },
    ],
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    status: {
      type: String,
      enum: ["Active", "Draft", "Archived"],
      default: "Draft",
    },
    client: {
      type: String,
    },
    year: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    variants: [
      {
        sku: { type: String, required: true },
        price: { type: Number, required: true },
        inventory: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  },
)

productSchema.pre<IProduct>("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "-")
      .replace(/-+/g, "-")
  }
  this.lastUpdated = new Date()
  next()
})

const Product = mongoose.model<IProduct>("Product", productSchema)

export default Product