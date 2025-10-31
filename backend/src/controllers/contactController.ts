import { Request, Response } from 'express';
import Contact from '../models/Contact';
import nodemailer from 'nodemailer';

// Configure nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    // Create new contact submission
    const contact = new Contact({
      name,
      email,
      subject,
      message,
    });

    // Save to database
    await contact.save();

    // Send email notification
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'info@isutech.co.za',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Thank you for contacting iSuTech',
      html: `
        <h3>Thank you for contacting iSuTech</h3>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you shortly.</p>
        <p>Best regards,</p>
        <p>The iSuTech Team</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact,
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting contact form',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
};

export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
}; 