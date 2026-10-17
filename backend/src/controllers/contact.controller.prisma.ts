import { Request, Response } from 'express';
import sgMail from '@sendgrid/mail';
import { ContactStatus } from '@prisma/client';
import prisma from '../lib/prisma';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@isutech.co.za';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'nhlanhla@isutech.co.za';

const LIMITS = { name: 100, email: 254, company: 150, subject: 150, message: 5000 };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Header values must never contain line breaks
const oneLine = (value: string): string => value.replace(/[\r\n]+/g, ' ').trim();

const asString = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

const fail = (res: Response, status: number, message: string) =>
  res.status(status).json({ error: message, message });

async function sendAdminNotification(contact: {
  id: number;
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  source: string;
  createdAt: Date;
}): Promise<void> {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.warn(`SENDGRID_API_KEY not set; contact #${contact.id} stored but no email sent`);
    return;
  }
  sgMail.setApiKey(apiKey);

  const submitted = contact.createdAt.toLocaleString('en-ZA');
  const rows = [
    ['Name', contact.name],
    ['Email', contact.email],
    ...(contact.company ? [['Company', contact.company]] : []),
    ...(contact.subject ? [['Subject', contact.subject]] : []),
    ['Source', contact.source],
  ];

  await sgMail.send({
    to: ADMIN_EMAIL,
    from: { email: FROM_EMAIL, name: 'ISU Website Contact Form' },
    replyTo: contact.email,
    subject: `New contact form submission - ${oneLine(contact.name)}`,
    text: [
      'New Contact Form Submission',
      '',
      ...rows.map(([label, value]) => `${label}: ${value}`),
      '',
      'Message:',
      contact.message,
      '',
      `Contact ID: ${contact.id}`,
      `Submitted: ${submitted}`,
    ].join('\n'),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
        <div style="background: #9c7c0b; color: #fff; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0;">New Contact Form Submission</h2>
        </div>
        <div style="background: #f9f9f9; padding: 24px; border: 1px solid #e0e0e0;">
          ${rows
            .map(
              ([label, value]) =>
                `<p style="margin: 8px 0;"><strong>${label}:</strong> ${escapeHtml(value)}</p>`
            )
            .join('')}
          <h3 style="color: #9c7c0b;">Message</h3>
          <div style="background: #fff; padding: 16px; border-radius: 6px;">
            ${escapeHtml(contact.message).replace(/\n/g, '<br>')}
          </div>
          <p style="color: #666; font-size: 13px;">Contact ID: ${contact.id} &middot; Submitted: ${escapeHtml(submitted)}</p>
        </div>
      </div>`,
  });
}

// Public: POST /api/contact
export const submitContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const name = asString(req.body?.name);
    const email = asString(req.body?.email);
    const company = asString(req.body?.company);
    const subject = asString(req.body?.subject);
    const message = asString(req.body?.message);
    const source = oneLine(asString(req.body?.source)).slice(0, 50) || 'website';

    if (!name || !email || !message) {
      fail(res, 400, 'Name, email and message are required');
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      fail(res, 400, 'Invalid email format');
      return;
    }
    if (
      name.length > LIMITS.name ||
      email.length > LIMITS.email ||
      company.length > LIMITS.company ||
      subject.length > LIMITS.subject ||
      message.length > LIMITS.message
    ) {
      fail(res, 400, 'One or more fields are too long');
      return;
    }

    // The Contact model has no subject column, so keep it with the message text
    const storedMessage = subject ? `Subject: ${subject}\n\n${message}` : message;

    const contact = await prisma.contact.create({
      data: { name, email, company: company || null, message: storedMessage },
    });

    // The submission is already stored, so an email failure must not fail the request
    try {
      await sendAdminNotification({ id: contact.id, name, email, company, subject, message, source, createdAt: contact.createdAt });
    } catch (emailError: any) {
      console.error(`Contact #${contact.id} email failed:`, emailError?.message || emailError);
    }

    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully',
      contactId: `CONTACT-${contact.id}`,
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    fail(res, 500, 'Failed to process contact form');
  }
};

// Shape expected by the admin dashboard (src/utils/api.ts Contact): string _id, lowercase status
const toDashboard = (c: { id: number; name: string; email: string; company: string | null; message: string; status: ContactStatus; createdAt: Date; updatedAt: Date }) => ({
  _id: String(c.id),
  name: c.name,
  email: c.email,
  company: c.company,
  message: c.message,
  status: c.status.toLowerCase(),
  createdAt: c.createdAt,
  updatedAt: c.updatedAt,
});

const parseId = (value: string): number | null => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

// Admin: GET /api/contact
export const getAllContacts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const contacts = await prisma.contact.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(contacts.map(toDashboard));
  } catch (error) {
    console.error('Error fetching contacts:', error);
    fail(res, 500, 'Failed to fetch contacts');
  }
};

// Admin: PATCH /api/contact/:id/status
export const updateContactStatus = async (req: Request, res: Response): Promise<void> => {
  const id = parseId(req.params.id);
  const status = asString(req.body?.status).toUpperCase();
  if (id === null || !(status in ContactStatus)) {
    fail(res, 400, 'Invalid id or status');
    return;
  }
  try {
    const contact = await prisma.contact.update({ where: { id }, data: { status: status as ContactStatus } });
    res.json(toDashboard(contact));
  } catch (error: any) {
    if (error?.code === 'P2025') {
      fail(res, 404, 'Contact not found');
      return;
    }
    console.error('Error updating contact:', error);
    fail(res, 500, 'Failed to update contact');
  }
};

// Admin: DELETE /api/contact/:id
export const deleteContact = async (req: Request, res: Response): Promise<void> => {
  const id = parseId(req.params.id);
  if (id === null) {
    fail(res, 400, 'Invalid id');
    return;
  }
  try {
    await prisma.contact.delete({ where: { id } });
    res.status(204).end();
  } catch (error: any) {
    if (error?.code === 'P2025') {
      fail(res, 404, 'Contact not found');
      return;
    }
    console.error('Error deleting contact:', error);
    fail(res, 500, 'Failed to delete contact');
  }
};
