import { getDb, verifyAdmin } from './_db.js';

export default async function handler(req: any, res: any) {
  // GET: Public read for Client and Admin hydration
  if (req.method === 'GET') {
    try {
      const sql = getDb();
      const { key } = req.query || {};

      if (key && typeof key === 'string') {
        const rows = await sql`SELECT key, data, updated_at FROM cms_content WHERE key = ${key} LIMIT 1;`;
        if (rows.length === 0) {
          return res.status(404).json({ error: `Key ${key} not found` });
        }
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        return res.status(200).json(rows[0].data);
      }

      // Return all modules as a single dictionary
      const rows = await sql`SELECT key, data FROM cms_content;`;
      const dictionary: Record<string, any> = {};
      for (const row of rows) {
        dictionary[row.key] = row.data;
      }

      // Set strict no-cache headers so browser and Vercel Edge never return stale CMS data
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      return res.status(200).json(dictionary);
    } catch (error: any) {
      return res.status(500).json({ error: 'Failed to fetch content from database', details: error.message });
    }
  }

  // POST / PUT: Admin only write
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!verifyAdmin(req.headers.authorization)) {
      return res.status(401).json({ error: 'Unauthorized: Admin privileges required' });
    }

    const { key, data, moduleName, actionTitle } = req.body || {};

    if (!key || typeof key !== 'string' || key.length > 64) {
      return res.status(400).json({ error: 'Invalid or missing content key' });
    }

    if (data === undefined) {
      return res.status(400).json({ error: 'Missing content data payload' });
    }

    try {
      const sql = getDb();
      const jsonStr = JSON.stringify(data);

      // Parameterized upsert
      const result = await sql`
        INSERT INTO cms_content (key, data, updated_at, updated_by)
        VALUES (${key}, ${jsonStr}::jsonb, NOW(), 'admin')
        ON CONFLICT (key) DO UPDATE
        SET data = EXCLUDED.data, updated_at = NOW(), updated_by = 'admin'
        RETURNING key, updated_at;
      `;

      // Log action to audit_logs
      const logId = 'log-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
      await sql`
        INSERT INTO audit_logs (id, timestamp, module, action, record_title, details, author)
        VALUES (
          ${logId}, 
          NOW(), 
          ${moduleName || key}, 
          'update', 
          ${actionTitle || `Cập nhật module ${key}`}, 
          'Cập nhật dữ liệu từ CMS Admin lên Neon DB', 
          'Admin'
        );
      `.catch(e => console.warn('Audit log write error:', e));

      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
      return res.status(200).json({
        success: true,
        key: result[0].key,
        updated_at: result[0].updated_at
      });
    } catch (error: any) {
      return res.status(500).json({ error: 'Failed to update content', message: error.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
