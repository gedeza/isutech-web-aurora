import express from 'express';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import sgMail from '@sendgrid/mail';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Initialize SendGrid - will be called lazily when first needed
let sendGridInitialized = false;

function initializeSendGrid() {
  if (sendGridInitialized) return;

  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  if (SENDGRID_API_KEY) {
    sgMail.setApiKey(SENDGRID_API_KEY);
    console.log('✅ SendGrid API initialized (contact)');
    sendGridInitialized = true;
  } else {
    console.warn('⚠️  SENDGRID_API_KEY not set. Email notifications will be logged only.');
  }
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@isutech.co.za';
const CONTACTS_FILE_PATH = join(__dirname, '..', 'data', 'contacts.json');

// Ensure data directory and contacts.json file exist
async function ensureContactsFile() {
  try {
    const dataDir = join(__dirname, '..', 'data');
    await fs.mkdir(dataDir, { recursive: true });

    try {
      await fs.access(CONTACTS_FILE_PATH);
    } catch {
      // File doesn't exist, create it with empty array
      await fs.writeFile(CONTACTS_FILE_PATH, JSON.stringify({ contacts: [] }, null, 2));
      console.log('📝 Created contacts.json file');
    }
  } catch (error) {
    console.error('Error ensuring contacts file:', error);
    throw error;
  }
}

// Read contacts from file
async function readContacts() {
  try {
    const data = await fs.readFile(CONTACTS_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading contacts:', error);
    return { contacts: [] };
  }
}

// Write contacts to file
async function writeContacts(contactsData) {
  try {
    await fs.writeFile(CONTACTS_FILE_PATH, JSON.stringify(contactsData, null, 2));
  } catch (error) {
    console.error('Error writing contacts:', error);
    throw error;
  }
}

// Send email notification to admin team
async function sendContactNotification(contactData) {
  const emailContent = {
    to: ADMIN_EMAIL,
    from: {
      email: 'nhlanhla@isutech.co.za',
      name: 'ISU Website Contact Form'
    },
    subject: `📬 New Contact Form Submission - ${contactData.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #9c7c0b 0%, #c99d1e 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
          .info-row { display: flex; margin: 15px 0; padding: 15px; background: white; border-radius: 6px; border-left: 4px solid #9c7c0b; }
          .info-label { font-weight: bold; min-width: 120px; color: #666; }
          .info-value { color: #333; }
          .message-box { background: white; padding: 20px; border-radius: 6px; border: 1px solid #e0e0e0; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 14px; }
          .cta-button { display: inline-block; background: #9c7c0b; color: white !important; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 10px 5px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">📬 New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Someone has reached out via your website</p>
          </div>

          <div class="content">
            <h2 style="color: #9c7c0b; border-bottom: 2px solid #9c7c0b; padding-bottom: 10px;">Contact Information</h2>

            <div class="info-row">
              <span class="info-label">Name:</span>
              <span class="info-value">${contactData.name}</span>
            </div>

            <div class="info-row">
              <span class="info-label">Email:</span>
              <span class="info-value"><a href="mailto:${contactData.email}" style="color: #9c7c0b;">${contactData.email}</a></span>
            </div>

            ${contactData.company ? `
              <div class="info-row">
                <span class="info-label">Company:</span>
                <span class="info-value">${contactData.company}</span>
              </div>
            ` : ''}

            ${contactData.subject ? `
              <div class="info-row">
                <span class="info-label">Subject:</span>
                <span class="info-value">${contactData.subject}</span>
              </div>
            ` : ''}

            <h2 style="color: #9c7c0b; border-bottom: 2px solid #9c7c0b; padding-bottom: 10px; margin-top: 30px;">Message</h2>

            <div class="message-box">
              ${contactData.message.replace(/\n/g, '<br>')}
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:${contactData.email}" class="cta-button">📧 Reply via Email</a>
            </div>
          </div>

          <div class="footer">
            <p><strong>Contact ID:</strong> ${contactData.id}</p>
            <p><strong>Submitted:</strong> ${new Date(contactData.submittedAt).toLocaleString('en-ZA', {
              dateStyle: 'medium',
              timeStyle: 'short',
              timeZone: 'Africa/Johannesburg'
            })}</p>
            <p style="margin-top: 20px; color: #999; font-size: 12px;">
              Generated by ISU Technologies Website Contact Form<br/>
              <a href="https://isutech.co.za" style="color: #9c7c0b;">isutech.co.za</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
📬 New Contact Form Submission

Name: ${contactData.name}
Email: ${contactData.email}
${contactData.company ? `Company: ${contactData.company}\n` : ''}
${contactData.subject ? `Subject: ${contactData.subject}\n` : ''}

Message:
${contactData.message}

---
Contact ID: ${contactData.id}
Submitted: ${new Date(contactData.submittedAt).toLocaleString('en-ZA')}

Reply to: ${contactData.email}

ISU Technologies Website Contact Form
    `
  };

  try {
    // Initialize SendGrid (lazy initialization)
    initializeSendGrid();

    if (process.env.SENDGRID_API_KEY) {
      await sgMail.send(emailContent);
      console.log('✅ Contact email sent to admin:', ADMIN_EMAIL);
      return { success: true, email: ADMIN_EMAIL };
    } else {
      // Log email content when SendGrid is not configured
      console.log('\n📧 Contact Email Notification (SendGrid not configured):');
      console.log('To:', ADMIN_EMAIL);
      console.log('Subject:', emailContent.subject);
      console.log('From:', contactData.name, '-', contactData.email);
      console.log('---\n');
      return { success: true, email: ADMIN_EMAIL, note: 'Email logged only (no SendGrid key)' };
    }
  } catch (error) {
    console.error('❌ Failed to send contact email:', error);
    if (error.response) {
      console.error('SendGrid error:', error.response.body);
    }
    throw error;
  }
}

// POST /api/contact - Submit new contact form
router.post('/', async (req, res) => {
  try {
    console.log('📥 Received contact form submission:', req.body.name);

    // Validate required fields
    const requiredFields = ['name', 'email', 'message'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        missingFields
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    // Ensure contacts file exists
    await ensureContactsFile();

    // Create contact object
    const contactId = `CONTACT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const contactData = {
      id: contactId,
      name: req.body.name,
      email: req.body.email,
      company: req.body.company || '',
      subject: req.body.subject || '',
      message: req.body.message,
      status: 'new',
      source: req.body.source || 'website_contact_form',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Read existing contacts
    const contactsFileData = await readContacts();

    // Add new contact
    contactsFileData.contacts.push(contactData);

    // Write back to file
    await writeContacts(contactsFileData);

    console.log('✅ Contact saved to file:', contactId);

    // Send email notification to admin
    try {
      const emailResult = await sendContactNotification(contactData);
      console.log('📧 Email notification result:', emailResult);
    } catch (emailError) {
      // Log email error but don't fail the request
      console.error('⚠️  Email notification failed:', emailError.message);
    }

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      contactId: contactId
    });

    console.log('✅ Contact form submission completed successfully\n');

  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    res.status(500).json({
      error: 'Failed to process contact form',
      message: error.message
    });
  }
});

// GET /api/contact - Get all contacts (for admin)
router.get('/', async (req, res) => {
  try {
    await ensureContactsFile();
    const contactsData = await readContacts();

    // Filter by status if provided
    const status = req.query.status;
    let contacts = contactsData.contacts;

    if (status) {
      contacts = contacts.filter(contact => contact.status === status);
    }

    res.json({
      success: true,
      count: contacts.length,
      contacts: contacts
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      error: 'Failed to fetch contacts',
      message: error.message
    });
  }
});

// PUT /api/contact/:id - Update contact status
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    await ensureContactsFile();
    const contactsData = await readContacts();

    const contactIndex = contactsData.contacts.findIndex(contact => contact.id === id);

    if (contactIndex === -1) {
      return res.status(404).json({
        error: 'Contact not found',
        contactId: id
      });
    }

    // Update contact
    if (status) contactsData.contacts[contactIndex].status = status;
    if (notes) contactsData.contacts[contactIndex].notes = notes;
    contactsData.contacts[contactIndex].updatedAt = new Date().toISOString();

    await writeContacts(contactsData);

    res.json({
      success: true,
      message: 'Contact updated successfully',
      contact: contactsData.contacts[contactIndex]
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({
      error: 'Failed to update contact',
      message: error.message
    });
  }
});

export default router;
