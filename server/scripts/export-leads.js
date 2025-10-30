import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LEADS_FILE_PATH = join(__dirname, '..', 'data', 'leads.json');
const EXPORTS_DIR = join(__dirname, '..', 'exports');

// Convert JSON to CSV format
function jsonToCSV(leads) {
  if (!leads || leads.length === 0) {
    return 'No leads found';
  }

  // Define CSV headers
  const headers = [
    'Lead ID',
    'Business Name',
    'Contact Person',
    'WhatsApp Number',
    'Email',
    'Business Type',
    'Plan',
    'Monthly Rate',
    'Preferred Start Date',
    'Billing Day',
    'Payment Method',
    'Special Requests',
    'Status',
    'Source',
    'Submitted At',
    'Updated At',
    'Notes'
  ];

  // Create CSV rows
  const rows = leads.map(lead => {
    const planRates = {
      starter: 'R299',
      business: 'R499',
      professional: 'R899'
    };

    return [
      lead.id || '',
      lead.businessName || '',
      lead.contactPerson || '',
      lead.whatsapp || '',
      lead.email || '',
      lead.businessType || '',
      lead.plan || '',
      planRates[lead.plan] || '',
      lead.preferredStartDate || '',
      lead.billingDay || '',
      lead.paymentMethod || '',
      (lead.specialRequests || '').replace(/"/g, '""'), // Escape quotes
      lead.status || '',
      lead.source || '',
      lead.submittedAt || '',
      lead.updatedAt || '',
      (lead.notes || '').replace(/"/g, '""') // Escape quotes
    ];
  });

  // Combine headers and rows
  const csvContent = [
    headers.map(h => `"${h}"`).join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  return csvContent;
}

// Main export function
async function exportLeads(options = {}) {
  try {
    console.log('📊 Starting lead export...\n');

    // Read leads file
    const leadsData = JSON.parse(await fs.readFile(LEADS_FILE_PATH, 'utf8'));
    let leads = leadsData.leads || [];

    console.log(`📋 Total leads in database: ${leads.length}`);

    // Filter by status if provided
    if (options.status) {
      leads = leads.filter(lead => lead.status === options.status);
      console.log(`🔍 Filtered by status '${options.status}': ${leads.length} leads`);
    }

    // Filter by date range if provided
    if (options.startDate || options.endDate) {
      const startDate = options.startDate ? new Date(options.startDate) : new Date(0);
      const endDate = options.endDate ? new Date(options.endDate) : new Date();

      leads = leads.filter(lead => {
        const submitDate = new Date(lead.submittedAt);
        return submitDate >= startDate && submitDate <= endDate;
      });

      console.log(`📅 Date range filter: ${leads.length} leads`);
    }

    if (leads.length === 0) {
      console.log('\n⚠️  No leads to export');
      return;
    }

    // Ensure exports directory exists
    await fs.mkdir(EXPORTS_DIR, { recursive: true });

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    const statusSuffix = options.status ? `-${options.status}` : '';
    const filename = `autoslip-leads${statusSuffix}-${timestamp}.csv`;
    const filepath = join(EXPORTS_DIR, filename);

    // Convert to CSV and write file
    const csvContent = jsonToCSV(leads);
    await fs.writeFile(filepath, csvContent, 'utf8');

    console.log(`\n✅ Export completed successfully!`);
    console.log(`📁 File saved: ${filepath}`);
    console.log(`📊 Records exported: ${leads.length}`);

    // Display summary statistics
    console.log('\n📈 Export Summary:');
    const statusCounts = leads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {});

    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`   - ${status}: ${count}`);
    });

    const planCounts = leads.reduce((acc, lead) => {
      acc[lead.plan] = (acc[lead.plan] || 0) + 1;
      return acc;
    }, {});

    console.log('\n💼 Plans Distribution:');
    Object.entries(planCounts).forEach(([plan, count]) => {
      console.log(`   - ${plan}: ${count}`);
    });

    console.log('\n✨ Done!\n');

    return filepath;

  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('\n❌ Error: leads.json file not found');
      console.error('   Make sure the API server has been run at least once to create the file.\n');
    } else {
      console.error('\n❌ Export failed:', error.message);
    }
    throw error;
  }
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--status' || arg === '-s') {
      options.status = args[++i];
    } else if (arg === '--start-date' || arg === '--from') {
      options.startDate = args[++i];
    } else if (arg === '--end-date' || arg === '--to') {
      options.endDate = args[++i];
    } else if (arg === '--help' || arg === '-h') {
      console.log(`
📊 AutoSlip Lead Export Script

Usage:
  node export-leads.js [options]

Options:
  --status, -s <status>       Filter by status (pending, contacted, onboarded, declined)
  --start-date, --from <date> Filter from date (YYYY-MM-DD)
  --end-date, --to <date>     Filter to date (YYYY-MM-DD)
  --help, -h                  Show this help message

Examples:
  node export-leads.js
  node export-leads.js --status pending
  node export-leads.js --from 2025-01-01 --to 2025-12-31
  node export-leads.js --status pending --from 2025-01-01

Output:
  CSV file saved to: server/exports/autoslip-leads-[date].csv
      `);
      process.exit(0);
    }
  }

  return options;
}

// Run export if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const options = parseArgs();

  console.log('╔════════════════════════════════════════╗');
  console.log('║   AutoSlip Lead Export Script          ║');
  console.log('║   ISU Technologies                     ║');
  console.log('╚════════════════════════════════════════╝\n');

  exportLeads(options)
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error('Export failed:', error);
      process.exit(1);
    });
}

export { exportLeads, jsonToCSV };
