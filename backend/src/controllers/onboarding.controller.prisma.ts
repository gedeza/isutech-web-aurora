import { Request, Response } from 'express';
import { PrismaClient, LeadPlan, LeadStatus } from '@prisma/client';
import sgMail from '@sendgrid/mail';

const prisma = new PrismaClient();

// Initialize SendGrid
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

// Send email notification to admin team
async function sendAdminNotification(leadData: any) {
  const planDetails: Record<string, { name: string; price: string }> = {
    starter: { name: 'Starter', price: 'R299' },
    business: { name: 'Business', price: 'R499' },
    professional: { name: 'Professional', price: 'R899' }
  };

  const plan = planDetails[leadData.plan.toLowerCase()] || { name: leadData.plan, price: 'N/A' };

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
            <p><strong>Lead ID:</strong> ${leadData.leadId}</p>
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
3. Set up their WhatsApp number in AutoSlip
4. Send welcome email

Lead ID: ${leadData.leadId}
Submitted: ${new Date(leadData.submittedAt).toLocaleString('en-ZA')}

---
AutoSlip Onboarding System | ISU Technologies
    `
  };

  try {
    initializeSendGrid();

    if (process.env.SENDGRID_API_KEY) {
      await sgMail.send(emailContent);
      console.log('✅ Email sent to admin:', ADMIN_EMAIL);
      return { success: true, email: ADMIN_EMAIL };
    } else {
      console.log('\n📧 Email Notification (SendGrid not configured):');
      console.log('To:', ADMIN_EMAIL);
      console.log('Subject:', emailContent.subject);
      console.log('Lead:', leadData.businessName, '-', leadData.whatsapp);
      console.log('---\n');
      return { success: true, email: ADMIN_EMAIL, note: 'Email logged only (no SendGrid key)' };
    }
  } catch (error: any) {
    console.error('❌ Failed to send email:', error);
    if (error.response) {
      console.error('SendGrid error:', error.response.body);
    }
    throw error;
  }
}

// POST /api/autoslip/onboarding - Submit new lead
export const submitOnboarding = async (req: Request, res: Response) => {
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

    // Generate unique lead ID
    const leadId = `LEAD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Convert plan to uppercase for enum
    const planEnum = req.body.plan.toUpperCase() as LeadPlan;

    // Create lead in database
    const lead = await prisma.lead.create({
      data: {
        leadId,
        businessName: req.body.businessName,
        contactPerson: req.body.contactPerson,
        whatsapp: req.body.whatsapp,
        email: req.body.email,
        businessType: req.body.businessType,
        plan: planEnum,
        preferredStartDate: req.body.preferredStartDate,
        billingDay: req.body.billingDay,
        paymentMethod: req.body.paymentMethod,
        specialRequests: req.body.specialRequests || null,
        status: req.body.status ? (req.body.status.toUpperCase() as LeadStatus) : LeadStatus.PENDING,
        source: req.body.source || 'landing_page',
        submittedAt: req.body.submittedAt ? new Date(req.body.submittedAt) : new Date(),
      },
    });

    console.log('✅ Lead saved to database:', leadId);

    // Send email notification to admin
    try {
      const emailResult = await sendAdminNotification({
        ...lead,
        submittedAt: lead.submittedAt.toISOString()
      });
      console.log('📧 Email notification result:', emailResult);
    } catch (emailError: any) {
      console.error('⚠️  Email notification failed:', emailError.message);
    }

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Lead submitted successfully',
      leadId: leadId,
      data: {
        businessName: lead.businessName,
        contactPerson: lead.contactPerson,
        email: lead.email,
        plan: lead.plan,
        submittedAt: lead.submittedAt
      }
    });

    console.log('✅ Onboarding request completed successfully\n');

  } catch (error: any) {
    console.error('❌ Error processing onboarding:', error);
    res.status(500).json({
      error: 'Failed to process onboarding request',
      message: error.message
    });
  }
};

// GET /api/autoslip/leads - Get all leads (for admin)
export const getAllLeads = async (req: Request, res: Response) => {
  try {
    const status = req.query.status as string | undefined;

    const leads = await prisma.lead.findMany({
      where: status ? { status: status.toUpperCase() as LeadStatus } : undefined,
      orderBy: { submittedAt: 'desc' },
    });

    res.json({
      success: true,
      count: leads.length,
      leads: leads
    });
  } catch (error: any) {
    console.error('Error fetching leads:', error);
    res.status(500).json({
      error: 'Failed to fetch leads',
      message: error.message
    });
  }
};

// GET /api/autoslip/leads/:leadId - Get single lead
export const getLeadById = async (req: Request, res: Response) => {
  try {
    const { leadId } = req.params;

    const lead = await prisma.lead.findUnique({
      where: { leadId },
    });

    if (!lead) {
      return res.status(404).json({
        error: 'Lead not found',
        leadId
      });
    }

    res.json({
      success: true,
      lead
    });
  } catch (error: any) {
    console.error('Error fetching lead:', error);
    res.status(500).json({
      error: 'Failed to fetch lead',
      message: error.message
    });
  }
};

// PUT /api/autoslip/leads/:leadId - Update lead status
export const updateLead = async (req: Request, res: Response) => {
  try {
    const { leadId } = req.params;
    const { status, notes } = req.body;

    const updateData: any = {};
    if (status) updateData.status = status.toUpperCase() as LeadStatus;
    if (notes !== undefined) updateData.notes = notes;

    const lead = await prisma.lead.update({
      where: { leadId },
      data: updateData,
    });

    res.json({
      success: true,
      message: 'Lead updated successfully',
      lead
    });
  } catch (error: any) {
    console.error('Error updating lead:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'Lead not found',
        leadId: req.params.leadId
      });
    }
    res.status(500).json({
      error: 'Failed to update lead',
      message: error.message
    });
  }
};
