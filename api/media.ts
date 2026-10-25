import { getDb, verifyAdmin } from './_db.js';

let blobPut: any = null;
let blobDel: any = null;

async function getBlobHelpers() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  if (!blobPut) {
    try {
      const blobModule = await import('@vercel/blob');
      blobPut = blobModule.put;
      blobDel = blobModule.del;
    } catch (e) {
      console.warn('Vercel Blob module not loaded:', e);
      return null;
    }
  }
  return { put: blobPut, del: blobDel };
}

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

    let finalUrl = url;
    let storageProvider = isExternal ? 'external' : 'neon-db';

    // If Vercel Blob is configured and file is Data URL, upload directly to Vercel Object Storage
    if (url.startsWith('data:') && process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blobHelpers = await getBlobHelpers();
        if (blobHelpers) {
          const matches = url.match(/^data:([A-Za-z0-9-+\/.]+);base64,(.+)$/);
          if (matches && matches.length === 3) {
            const detectedMime = matches[1];
            const base64Data = matches[2];
            const buffer = Buffer.from(base64Data, 'base64');
            const ext = detectedMime === 'image/webp' ? 'webp' : detectedMime === 'image/svg+xml' ? 'svg' : detectedMime === 'image/png' ? 'png' : 'jpg';
            const filename = `media/${id}.${ext}`;

            const blobResult = await blobHelpers.put(filename, buffer, {
              access: 'public',
              contentType: detectedMime
            });

            finalUrl = blobResult.url;
            storageProvider = 'vercel-blob';
          }
        }
      } catch (blobError: any) {
        console.warn('Vercel Blob upload fallback to Neon DB:', blobError?.message);
      }
    }

    // Safety limit: if still Base64, enforce a 3MB limit for database safety
    if (finalUrl.startsWith('data:') && finalUrl.length > 3 * 1024 * 1024) {
      return res.status(413).json({ error: 'Dung lượng ảnh vượt quá giới hạn an toàn (3MB). Vui lòng nén ảnh hoặc dùng ảnh WebP.' });
    }

    try {
      const sql = getDb();
      await sql`
        INSERT INTO media_library (
          id, name, url, type, mime_type, size_bytes, width, height, alt_text, caption, is_external, created_at
        ) VALUES (
          ${id}, ${name}, ${finalUrl}, ${type}, ${mimeType || null}, ${sizeBytes}, 
          ${width || null}, ${height || null}, ${altText || name}, ${caption || null}, ${Boolean(isExternal)}, NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          url = EXCLUDED.url,
          alt_text = EXCLUDED.alt_text,
          size_bytes = EXCLUDED.size_bytes;
      `;

      return res.status(201).json({
        success: true,
        id,
        url: finalUrl,
        storageProvider,
        message: storageProvider === 'vercel-blob' ? 'Media saved to Vercel Blob & Neon PostgreSQL' : 'Media saved to Neon PostgreSQL'
      });
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
      // If was stored on Vercel Blob, delete blob object as well
      const rows = await sql`SELECT url FROM media_library WHERE id = ${id} LIMIT 1;`;
      if (rows.length > 0 && rows[0].url && rows[0].url.includes('vercel-storage.com')) {
        const blobHelpers = await getBlobHelpers();
        if (blobHelpers) {
          try {
            await blobHelpers.del(rows[0].url);
          } catch (delErr) {
            console.warn('Failed to delete blob file from Vercel storage:', delErr);
          }
        }
      }

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
