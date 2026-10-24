require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);

async function run() {
  await sql`DELETE FROM cms_content WHERE key = 'test_key';`;
  await sql`DELETE FROM booking_leads WHERE full_name = 'Nguyễn Văn Test';`;
  console.log('Cleanup completed successfully.');
}

run().catch(console.error);
