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
    console.log('✅ SendGrid API initialized');
    sendGridInitialized = true;
  } else {
    console.warn('⚠️  SENDGRID_API_KEY not set. Email notifications will be logged only.');
  }
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@isutech.co.za';
const LEADS_FILE_PATH = join(__dirname, '..', 'data', 'leads.json');

// Ensure data directory and leads.json file exist
async function ensureLeadsFile() {
  try {
    const dataDir = join(__dirname, '..', 'data');
    await fs.mkdir(dataDir, { recursive: true });

    try {
      await fs.access(LEADS_FILE_PATH);
    } catch {
      // File doesn't exist, create it with empty array
      await fs.writeFile(LEADS_FILE_PATH, JSON.stringify({ leads: [] }, null, 2));
      console.log('📝 Created leads.json file');
    }
  } catch (error) {
    console.error('Error ensuring leads file:', error);
    throw error;
  }
}

// Read leads from file
async function readLeads() {
  try {
    const data = await fs.readFile(LEADS_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading leads:', error);
    return { leads: [] };
  }
}

// Write leads to file
async function writeLeads(leadsData) {
  try {
    await fs.writeFile(LEADS_FILE_PATH, JSON.stringify(leadsData, null, 2));
  } catch (error) {
    console.error('Error writing leads:', error);
    throw error;
  }
}

// Send email notification to admin team
async function sendAdminNotification(leadData) {
  const planDetails = {
    starter: { name: 'Starter', price: 'R299' },
    business: { name: 'Business', price: 'R499' },
    professional: { name: 'Professional', price: 'R899' }
  };

  const plan = planDetails[leadData.plan] || { name: leadData.plan, price: 'N/A' };

  const emailContent = {
    to: ADMIN_EMAIL,
    from: {
      email: 'nhlanhla@isutech.co.za',
      name: 'AutoSlip System'
    },
    subject: `🎯 New AutoSlip Trial Request - ${leadData.businessName}`,
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
          .info-label { font-weight: bold; min-width: 140px; color: #666; }
          .info-value { color: #333; }
          .plan-badge { display: inline-block; background: #9c7c0b; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; margin: 10px 0; }
          .next-steps { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px; }
          .next-steps h3 { margin-top: 0; color: #856404; }
          .next-steps ol { margin: 10px 0; padding-left: 20px; }
          .next-steps li { margin: 8px 0; color: #856404; }
          .footer { text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 14px; }
          .cta-button { display: inline-block; background: #9c7c0b; color: white !important; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 10px 0; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">🎉 New AutoSlip Trial Request</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">A potential client has requested a free trial</p>
          </div>

          <div class="content">
            <div class="plan-badge">${plan.name} Plan - ${plan.price}/month</div>

            <h2 style="color: #9c7c0b; border-bottom: 2px solid #9c7c0b; padding-bottom: 10px;">Business Information</h2>

            <div class="info-row">
              <span class="info-label">Business Name:</span>
              <span class="info-value">${leadData.businessName}</span>
            </div>

            <div class="info-row">
              <span class="info-label">Contact Person:</span>
              <span class="info-value">${leadData.contactPerson}</span>
            </div>

            <div class="info-row">
              <span class="info-label">WhatsApp:</span>
              <span class="info-value"><a href="https://wa.me/${leadData.whatsapp.replace(/\+/g, '')}" style="color: #25D366; text-decoration: none; font-weight: bold;">${leadData.whatsapp}</a></span>
            </div>

            <div class="info-row">
              <span class="info-label">Email:</span>
              <span class="info-value"><a href="mailto:${leadData.email}" style="color: #9c7c0b;">${leadData.email}</a></span>
            </div>

            <div class="info-row">
              <span class="info-label">Business Type:</span>
              <span class="info-value">${leadData.businessType}</span>
            </div>

            <h2 style="color: #9c7c0b; border-bottom: 2px solid #9c7c0b; padding-bottom: 10px; margin-top: 30px;">Billing Details</h2>

            <div class="info-row">
              <span class="info-label">Preferred Start Date:</span>
              <span class="info-value">${leadData.preferredStartDate}</span>
            </div>

            <div class="info-row">
              <span class="info-label">Billing Day:</span>
              <span class="info-value">${leadData.billingDay} of each month</span>
            </div>

            <div class="info-row">
              <span class="info-label">Payment Method:</span>
              <span class="info-value">${leadData.paymentMethod.toUpperCase()}</span>
            </div>

            ${leadData.specialRequests ? `
              <h2 style="color: #9c7c0b; border-bottom: 2px solid #9c7c0b; padding-bottom: 10px; margin-top: 30px;">Special Requests</h2>
              <div class="info-row">
                <span class="info-value">${leadData.specialRequests}</span>
              </div>
            ` : ''}

            <div class="next-steps">
              <h3>📋 Next Steps:</h3>
              <ol>
                <li><strong>Contact the client within 24 hours</strong> via WhatsApp: <a href="https://wa.me/${leadData.whatsapp.replace(/\+/g, '')}" style="color: #25D366;">${leadData.whatsapp}</a></li>
                <li>Review client information and confirm trial details</li>
                <li>Follow the <strong>CLIENT_ONBOARDING_GUIDE.md</strong> checklist</li>
                <li>Set up their WhatsApp number in the AutoSlip system</li>
                <li>Send welcome email and onboarding instructions</li>
              </ol>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://wa.me/${leadData.whatsapp.replace(/\+/g, '')}" class="cta-button">💬 Contact on WhatsApp</a>
              <a href="mailto:${leadData.email}" class="cta-button" style="background: #0066cc;">📧 Send Email</a>
            </div>
          </div>

          <div class="footer">
            <p><strong>Lead ID:</strong> ${leadData.id}</p>
            <p><strong>Submitted:</strong> ${new Date(leadData.submittedAt).toLocaleString('en-ZA', {
              dateStyle: 'medium',
              timeStyle: 'short',
              timeZone: 'Africa/Johannesburg'
            })}</p>
            <p style="margin-top: 20px; color: #999; font-size: 12px;">
              Generated by AutoSlip Onboarding System | ISU Technologies<br/>
              <a href="https://isutech.co.za" style="color: #9c7c0b;">isutech.co.za</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
🎯 New AutoSlip Trial Request

Business: ${leadData.businessName}
Contact: ${leadData.contactPerson}
WhatsApp: ${leadData.whatsapp}
Email: ${leadData.email}
Business Type: ${leadData.businessType}

Plan: ${plan.name} (${plan.price}/month)
Start Date: ${leadData.preferredStartDate}
Billing Day: ${leadData.billingDay}
Payment Method: ${leadData.paymentMethod}

${leadData.specialRequests ? `Special Requests: ${leadData.specialRequests}\n` : ''}

Next Steps:
1. Contact client within 24 hours via WhatsApp: ${leadData.whatsapp}
2. Review client information and confirm trial details
3. Follow CLIENT_ONBOARDING_GUIDE.md checklist
4. Set up their WhatsApp number in AutoSlip
5. Send welcome email

Lead ID: ${leadData.id}
Submitted: ${new Date(leadData.submittedAt).toLocaleString('en-ZA')}

---
AutoSlip Onboarding System | ISU Technologies
    `
  };

  try {
    // Initialize SendGrid (lazy initialization)
    initializeSendGrid();

    if (process.env.SENDGRID_API_KEY) {
      await sgMail.send(emailContent);
      console.log('✅ Email sent to admin:', ADMIN_EMAIL);
      return { success: true, email: ADMIN_EMAIL };
    } else {
      // Log email content when SendGrid is not configured
      console.log('\n📧 Email Notification (SendGrid not configured):');
      console.log('To:', ADMIN_EMAIL);
      console.log('Subject:', emailContent.subject);
      console.log('Lead:', leadData.businessName, '-', leadData.whatsapp);
      console.log('---\n');
      return { success: true, email: ADMIN_EMAIL, note: 'Email logged only (no SendGrid key)' };
    }
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    if (error.response) {
      console.error('SendGrid error:', error.response.body);
    }
    throw error;
  }
}

// POST /api/autoslip/onboarding - Submit new lead
router.post('/onboarding', async (req, res) => {
  try {
    console.log('📥 Received onboarding request:', req.body.businessName);

    // Validate required fields
    const requiredFields = [
      'businessName',
      'contactPerson',
      'whatsapp',
      'email',
      'businessType',
      'plan',
      'preferredStartDate',
      'billingDay',
      'paymentMethod'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        missingFields
      });
    }

    // Ensure leads file exists
    await ensureLeadsFile();

    // Create lead object
    const leadId = `LEAD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const leadData = {
      id: leadId,
      ...req.body,
      status: req.body.status || 'pending',
      source: req.body.source || 'landing_page',
      submittedAt: req.body.submittedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Read existing leads
    const leadsFileData = await readLeads();

    // Add new lead
    leadsFileData.leads.push(leadData);

    // Write back to file
    await writeLeads(leadsFileData);

    console.log('✅ Lead saved to file:', leadId);

    // Send email notification to admin
    try {
      const emailResult = await sendAdminNotification(leadData);
      console.log('📧 Email notification result:', emailResult);
    } catch (emailError) {
      // Log email error but don't fail the request
      console.error('⚠️  Email notification failed:', emailError.message);
    }

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Lead submitted successfully',
      leadId: leadId,
      data: {
        businessName: leadData.businessName,
        contactPerson: leadData.contactPerson,
        email: leadData.email,
        plan: leadData.plan,
        submittedAt: leadData.submittedAt
      }
    });

    console.log('✅ Onboarding request completed successfully\n');

  } catch (error) {
    console.error('❌ Error processing onboarding:', error);
    res.status(500).json({
      error: 'Failed to process onboarding request',
      message: error.message
    });
  }
});

// GET /api/autoslip/leads - Get all leads (for admin)
router.get('/leads', async (req, res) => {
  try {
    await ensureLeadsFile();
    const leadsData = await readLeads();

    // Filter by status if provided
    const status = req.query.status;
    let leads = leadsData.leads;

    if (status) {
      leads = leads.filter(lead => lead.status === status);
    }

    res.json({
      success: true,
      count: leads.length,
      leads: leads
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({
      error: 'Failed to fetch leads',
      message: error.message
    });
  }
});

// PUT /api/autoslip/leads/:id - Update lead status
router.put('/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    await ensureLeadsFile();
    const leadsData = await readLeads();

    const leadIndex = leadsData.leads.findIndex(lead => lead.id === id);

    if (leadIndex === -1) {
      return res.status(404).json({
        error: 'Lead not found',
        leadId: id
      });
    }

    // Update lead
    if (status) leadsData.leads[leadIndex].status = status;
    if (notes) leadsData.leads[leadIndex].notes = notes;
    leadsData.leads[leadIndex].updatedAt = new Date().toISOString();

    await writeLeads(leadsData);

    res.json({
      success: true,
      message: 'Lead updated successfully',
      lead: leadsData.leads[leadIndex]
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({
      error: 'Failed to update lead',
      message: error.message
    });
  }
});

export default router;
