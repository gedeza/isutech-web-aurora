import { Request, Response } from 'express';
import { Customer, ICustomer } from '../models/Customer';

interface AuthRequest extends Request {
  user?: any;
}

// @desc    Get all customers
// @route   GET /api/customers
// @access  Private/Admin
export const getCustomers = async (req: AuthRequest, res: Response) => {
  try {
    const customers = await Customer.find().sort('-createdAt');
    res.json(customers);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single customer
// @route   GET /api/customers/:id
// @access  Private/Admin
export const getCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json(customer);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create customer
// @route   POST /api/customers
// @access  Private/Admin
export const createCustomer = async (req: AuthRequest, res: Response) => {
  try {
    const customer = await Customer.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json(customer);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update customer
// @route   PUT /api/customers/:id
// @access  Private/Admin
export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedCustomer);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete customer
// @route   DELETE /api/customers/:id
// @access  Private/Admin
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    await customer.deleteOne();
    res.json({ message: 'Customer removed' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add customer note
// @route   POST /api/customers/:id/notes
// @access  Private/Admin
export const addCustomerNote = async (req: AuthRequest, res: Response) => {
  try {
    const { note } = req.body;
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    customer.notes.push({
      text: note,
      createdBy: req.user._id,
      createdAt: new Date(),
    });

    await customer.save();
    res.json(customer);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update customer status
// @route   PATCH /api/customers/:id/status
// @access  Private/Admin
export const updateCustomerStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    customer.status = status;
    customer.lastUpdated = new Date();

    await customer.save();
    res.json(customer);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}; 