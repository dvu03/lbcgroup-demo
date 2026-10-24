require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

if (!process.env.DATABASE_URL) {
  console.error("ERROR: DATABASE_URL is not defined in .env.local");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

(async () => {
  try {
    const result = await sql`SELECT NOW() as current_time, version() as pg_version;`;
    console.log("=== NEON DB CONNECTION TEST ===");
    console.log("Status: SUCCESS");
    console.log("DB Time:", result[0].current_time);
    console.log("PostgreSQL Version:", result[0].pg_version?.split(" on ")[0]);

    // Check existing tables
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `;
    console.log("Existing Public Tables:", tables.map(t => t.table_name));
  } catch (err) {
    console.error("DB Connection FAILED:", err.message);
    process.exit(1);
  }
})();
