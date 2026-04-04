// Vercel Serverless Function for Contact Form
import sgMail from '@sendgrid/mail';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  try {
    const { name, email, company, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['name', 'email', 'message']
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    // Generate contact ID
    const contactId = `CONTACT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Send email notification if SendGrid is configured
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@isutech.co.za';

    if (SENDGRID_API_KEY) {
      sgMail.setApiKey(SENDGRID_API_KEY);

      const emailContent = {
        to: ADMIN_EMAIL,
        from: {
          email: 'nhlanhla@isutech.co.za',
          name: 'ISU Website Contact Form'
        },
        subject: `📬 New Contact Form Submission - ${name}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #9c7c0b 0%, #c99d1e 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; }
              .info-row { margin: 15px 0; padding: 15px; background: white; border-radius: 6px; border-left: 4px solid #9c7c0b; }
              .info-label { font-weight: bold; color: #666; }
              .message-box { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">📬 New Contact Form Submission</h1>
                <p style="margin: 10px 0 0 0;">Someone has reached out via your website</p>
              </div>
              <div class="content">
                <h2 style="color: #9c7c0b;">Contact Information</h2>
                <div class="info-row">
                  <span class="info-label">Name:</span> ${name}
                </div>
                <div class="info-row">
                  <span class="info-label">Email:</span> <a href="mailto:${email}">${email}</a>
                </div>
                ${company ? `<div class="info-row"><span class="info-label">Company:</span> ${company}</div>` : ''}
                <h2 style="color: #9c7c0b;">Message</h2>
                <div class="message-box">
                  ${message.replace(/\n/g, '<br>')}
                </div>
                <p><strong>Contact ID:</strong> ${contactId}</p>
                <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-ZA')}</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${company ? `Company: ${company}\n` : ''}
Message:
${message}

Contact ID: ${contactId}
Submitted: ${new Date().toLocaleString('en-ZA')}
        `
      };

      try {
        await sgMail.send(emailContent);
        console.log('✅ Email sent to:', ADMIN_EMAIL);
      } catch (emailError) {
        console.error('❌ Email failed:', emailError.message);
        // Continue even if email fails
      }
    } else {
      console.log('⚠️  SendGrid not configured, email not sent');
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully',
      contactId: contactId
    });

  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    return res.status(500).json({
      error: 'Failed to process contact form',
      message: error.message
    });
  }
}
