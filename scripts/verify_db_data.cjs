require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);

(async () => {
  const records = await sql`
    SELECT key, jsonb_typeof(data) as type, 
           CASE 
             WHEN jsonb_typeof(data) = 'array' THEN jsonb_array_length(data)
             ELSE 1
           END as item_count,
           updated_at
    FROM cms_content
    ORDER BY key;
  `;
  console.log("=== NEON CMS_CONTENT RECORD OVERVIEW ===");
  records.forEach(r => console.log(`- [${r.key}]: type=${r.type}, items=${r.item_count}, updated=${r.updated_at.toISOString()}`));
})();
