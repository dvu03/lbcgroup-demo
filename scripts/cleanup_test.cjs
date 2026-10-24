require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);
sql`DELETE FROM cms_content WHERE key = 'test_key';`.then(() => console.log('Cleaned test_key'));
