import { getDb, verifyAdmin } from './_db.js';

export default async function handler(req: any, res: any) {
  // GET: Read all media
  if (req.method === 'GET') {
    try {
      const sql = getDb();
      const rows = await sql`
        SELECT id, name, url, type, mime_type as "mimeType", 
               size_bytes as "sizeBytes", width, height, 
               alt_text as "altText", caption, created_at as "createdAt", 
               is_external as "isExternal"
        FROM media_library
        ORDER BY created_at DESC;
      `;
      return res.status(200).json(rows);
    } catch (error: any) {
      return res.status(500).json({ error: 'Failed to fetch media files', message: error.message });
    }
  }

  // POST: Add new media item (Admin only)
  if (req.method === 'POST') {
    if (!verifyAdmin(req.headers.authorization)) {
      return res.status(401).json({ error: 'Unauthorized: Admin privileges required' });
    }

    const item = req.body || {};
    const { id, name, url, type = 'image', mimeType, sizeBytes = 0, width, height, altText, caption, isExternal = false } = item;

    if (!id || !name || !url) {
      return res.status(400).json({ error: 'Missing required media fields: id, name, url' });
    }

    // Safety limit: Base64 data URLs shouldn't exceed 4MB
    if (url.startsWith('data:') && url.length > 4 * 1024 * 1024) {
      return res.status(413).json({ error: 'File size exceeds maximum allowed limit for direct database storage (4MB).' });
    }

    try {
      const sql = getDb();
      await sql`
        INSERT INTO media_library (
          id, name, url, type, mime_type, size_bytes, width, height, alt_text, caption, is_external, created_at
        ) VALUES (
          ${id}, ${name}, ${url}, ${type}, ${mimeType || null}, ${sizeBytes}, 
          ${width || null}, ${height || null}, ${altText || name}, ${caption || null}, ${Boolean(isExternal)}, NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          url = EXCLUDED.url,
          alt_text = EXCLUDED.alt_text;
      `;

      return res.status(201).json({ success: true, id, message: 'Media saved to Neon PostgreSQL' });
    } catch (error: any) {
      return res.status(500).json({ error: 'Failed to save media', message: error.message });
    }
  }

  // DELETE: Delete media item (Admin only)
  if (req.method === 'DELETE') {
    if (!verifyAdmin(req.headers.authorization)) {
      return res.status(401).json({ error: 'Unauthorized: Admin privileges required' });
    }

    const { id } = req.query || {};
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Missing media ID to delete' });
    }

    try {
      const sql = getDb();
      const result = await sql`DELETE FROM media_library WHERE id = ${id} RETURNING id;`;
      if (result.length === 0) {
        return res.status(404).json({ error: 'Media item not found' });
      }
      return res.status(200).json({ success: true, id });
    } catch (error: any) {
      return res.status(500).json({ error: 'Failed to delete media', message: error.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
