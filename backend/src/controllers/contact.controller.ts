import { Request, Response } from 'express';
import Contact from '../models/contact.model';
import { sendEmail } from '../utils/email';

export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    // Create new contact
    const contact = new Contact({
      name,
      email,
      message,
    });

    await contact.save();

    // Send notification email to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'info@isutech.co.za',
      subject: 'New Contact Form Submission',
      text: `
        New contact form submission from ${name}
        Email: ${email}
        Message: ${message}
      `,
    });

    // Send confirmation email to user
    await sendEmail({
      to: email,
      subject: 'Thank you for contacting iSu Technologies',
      text: `
        Dear ${name},

        Thank you for contacting iSu Technologies. We have received your message and will get back to you shortly.

        Best regards,
        iSu Technologies Team
      `,
    });

    res.status(201).json({
      message: 'Contact form submitted successfully',
      contact,
    });
  } catch (error) {
    console.error('Submit contact error:', error);
    res.status(500).json({ message: 'Error submitting contact form' });
  }
};

export const getAllContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Error getting contacts' });
  }
};

export const getContactById = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({ message: 'Error getting contact' });
  }
};

export const updateContactStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({ message: 'Error updating contact status' });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ message: 'Error deleting contact' });
  }
}; 