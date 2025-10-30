# AutoSlip Onboarding API Server

Backend API server for handling AutoSlip trial onboarding form submissions, SendGrid email notifications, and lead management.

## 📋 Features

- ✅ Form submission handling with validation
- ✅ SendGrid email notifications to admin team
- ✅ Lead storage in JSON database
- ✅ CSV/Excel export for lead management
- ✅ Status tracking (pending, contacted, onboarded, declined)
- ✅ Beautiful HTML email templates with WhatsApp/email CTAs

---

## 🚀 Quick Start

### 1. Install Dependencies

Already done! Dependencies were installed with:
```bash
npm install express @sendgrid/mail cors body-parser
```

### 2. Configure Environment Variables

Edit the `.env` file in the project root and add your SendGrid API key:

```bash
nano /Users/nhla/Desktop/PROJECTS/2025/isutech-web-aurora/.env
```

Replace `YOUR_SENDGRID_API_KEY_HERE` with your actual SendGrid API key.

### 3. Start the Server

```bash
npm run server
```

You should see:
```
🚀 AutoSlip API Server running on http://localhost:3001
📧 SendGrid email integration enabled
💾 Lead storage: /Users/nhla/Desktop/PROJECTS/2025/isutech-web-aurora/server/data/leads.json
✅ SendGrid API initialized
```

### 4. Start Frontend (Separate Terminal)

In a new terminal:
```bash
npm run dev
```

Frontend will run on http://localhost:8082 and connect to the API server at http://localhost:3001.

---

## 📡 API Endpoints

### POST `/api/autoslip/onboarding`

Submit a new lead from the onboarding form.

**Request Body:**
```json
{
  "businessName": "Example Company (Pty) Ltd",
  "contactPerson": "John Doe",
  "whatsapp": "+27821234567",
  "email": "john@example.co.za",
  "businessType": "company",
  "plan": "starter",
  "preferredStartDate": "2025-11-01",
  "billingDay": "1",
  "paymentMethod": "eft",
  "specialRequests": "Need help with onboarding",
  "status": "pending",
  "source": "landing_page"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Lead submitted successfully",
  "leadId": "LEAD-1730304000000-ABC123",
  "data": {
    "businessName": "Example Company (Pty) Ltd",
    "contactPerson": "John Doe",
    "email": "john@example.co.za",
    "plan": "starter",
    "submittedAt": "2025-10-30T18:00:00.000Z"
  }
}
```

**What Happens:**
1. ✅ Lead data validated
2. ✅ Lead saved to `server/data/leads.json`
3. ✅ Email notification sent to admin (info@isutech.co.za)
4. ✅ Success response returned to frontend

---

### GET `/api/autoslip/leads`

Retrieve all leads (admin only).

**Query Parameters:**
- `status` (optional): Filter by status (`pending`, `contacted`, `onboarded`, `declined`)

**Example:**
```bash
curl http://localhost:3001/api/autoslip/leads?status=pending
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "leads": [
    {
      "id": "LEAD-1730304000000-ABC123",
      "businessName": "Example Company",
      "contactPerson": "John Doe",
      "whatsapp": "+27821234567",
      "email": "john@example.co.za",
      "plan": "starter",
      "status": "pending",
      "submittedAt": "2025-10-30T18:00:00.000Z"
    }
  ]
}
```

---

### PUT `/api/autoslip/leads/:id`

Update lead status (admin only).

**Request Body:**
```json
{
  "status": "contacted",
  "notes": "Called client, scheduled onboarding for next week"
}
```

**Example:**
```bash
curl -X PUT http://localhost:3001/api/autoslip/leads/LEAD-1730304000000-ABC123 \
  -H "Content-Type: application/json" \
  -d '{"status":"contacted","notes":"Client confirmed interest"}'
```

---

## 📊 Lead Export to CSV/Excel

### Export All Leads

```bash
npm run export-leads
```

Output:
```
📊 Starting lead export...

📋 Total leads in database: 15

✅ Export completed successfully!
📁 File saved: /Users/nhla/Desktop/PROJECTS/2025/isutech-web-aurora/server/exports/autoslip-leads-2025-10-30.csv
📊 Records exported: 15

📈 Export Summary:
   - pending: 8
   - contacted: 4
   - onboarded: 3

💼 Plans Distribution:
   - starter: 10
   - business: 3
   - professional: 2
```

### Export Pending Leads Only

```bash
npm run export-leads:pending
```

### Advanced Export Options

```bash
# Filter by status
node server/scripts/export-leads.js --status contacted

# Filter by date range
node server/scripts/export-leads.js --from 2025-01-01 --to 2025-12-31

# Combined filters
node server/scripts/export-leads.js --status pending --from 2025-10-01
```

**CSV Output Columns:**
- Lead ID
- Business Name
- Contact Person
- WhatsApp Number
- Email
- Business Type
- Plan
- Monthly Rate
- Preferred Start Date
- Billing Day
- Payment Method
- Special Requests
- Status
- Source
- Submitted At
- Updated At
- Notes

---

## 📧 Email Notifications

### Email Template

When a lead submits the form, the admin team receives a beautiful HTML email with:

**Email Header:**
- Subject: `🎯 New AutoSlip Trial Request - [Business Name]`
- From: `AutoSlip System <noreply@isutech.co.za>`
- To: `info@isutech.co.za`

**Email Content:**
- Selected plan with pricing (Starter R299, Business R499, Professional R899)
- Business information (name, contact, WhatsApp, email, type)
- Billing details (start date, billing day, payment method)
- Special requests (if provided)
- Next steps checklist
- Quick action buttons:
  - 💬 Contact on WhatsApp (direct WhatsApp link)
  - 📧 Send Email (mailto link)

**Email Footer:**
- Lead ID for tracking
- Submission timestamp (South African timezone)
- ISU Technologies branding

---

## 🗄️ Data Storage

### Location

All leads are stored in:
```
/Users/nhla/Desktop/PROJECTS/2025/isutech-web-aurora/server/data/leads.json
```

### Structure

```json
{
  "leads": [
    {
      "id": "LEAD-1730304000000-ABC123",
      "businessName": "Example Company (Pty) Ltd",
      "contactPerson": "John Doe",
      "whatsapp": "+27821234567",
      "email": "john@example.co.za",
      "businessType": "company",
      "plan": "starter",
      "preferredStartDate": "2025-11-01",
      "billingDay": "1",
      "paymentMethod": "eft",
      "specialRequests": "Need onboarding help",
      "status": "pending",
      "source": "landing_page",
      "submittedAt": "2025-10-30T18:00:00.000Z",
      "updatedAt": "2025-10-30T18:00:00.000Z",
      "notes": ""
    }
  ]
}
```

### Lead Statuses

- `pending` - New lead, not yet contacted
- `contacted` - Admin team has reached out
- `onboarded` - Client successfully onboarded
- `declined` - Client decided not to proceed

---

## 🛠️ NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run server` | Start API server (production mode) |
| `npm run server:dev` | Start API server with auto-reload (development) |
| `npm run export-leads` | Export all leads to CSV |
| `npm run export-leads:pending` | Export pending leads only |
| `npm run dev` | Start Vite frontend dev server |

---

## 🔧 Troubleshooting

### Server Won't Start

**Error:** `SENDGRID_API_KEY not set`

**Fix:**
- Make sure `.env` file exists in project root
- Verify SendGrid API key is correctly set
- Restart the server after changing `.env`

---

### Email Not Sending

**Error:** Email notification fails but lead is saved

**Check:**
1. ✅ SendGrid API key is valid
2. ✅ Check SendGrid dashboard: https://app.sendgrid.com/
3. ✅ Verify sender email is verified in SendGrid
4. ✅ Check server logs for detailed error

**Test SendGrid Connection:**
The server will log email status on startup:
```
✅ SendGrid API initialized  (API key is valid)
⚠️  SENDGRID_API_KEY not set  (no API key configured)
```

---

### CORS Errors in Browser

**Error:** `Access to fetch at 'http://localhost:3001/...' has been blocked by CORS policy`

**Fix:**
This shouldn't happen as CORS is enabled for all origins in development. If it does:
1. Check that the server is running on port 3001
2. Verify frontend is using correct API URL
3. Restart both frontend and backend servers

---

### Leads Not Saving

**Check:**
1. Server has write permissions to `server/data/` directory
2. Check server console for error messages
3. Verify JSON file is not corrupted

**Manual Fix:**
```bash
# Reset leads file
echo '{"leads":[]}' > /Users/nhla/Desktop/PROJECTS/2025/isutech-web-aurora/server/data/leads.json
```

---

## 📁 File Structure

```
server/
├── index.js                    # Main server entry point
├── routes/
│   └── onboarding.js          # Onboarding API routes
├── scripts/
│   └── export-leads.js        # CSV export script
├── data/
│   └── leads.json             # Lead database (created automatically)
├── exports/                   # CSV export files (created automatically)
└── README.md                  # This file
```

---

## 🔒 Security Notes

- ✅ `.env` file is in `.gitignore` (never commit API keys!)
- ✅ CORS enabled for development (restrict in production)
- ✅ Input validation on all form fields
- ✅ SendGrid API key stored securely in environment variables

---

## 📞 Support

For questions or issues:
- **Email:** info@isutech.co.za
- **Documentation:** This README
- **AutoSlip Docs:** `/Users/nhla/Desktop/PROJECTS/2025/AutoSlip/DOCS/`

---

**Created:** October 30, 2025
**Version:** 1.0
**Author:** ISU Technologies
