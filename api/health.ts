import { getDb } from './_db';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const sql = getDb();
    const result = await sql`SELECT 1 as ping, NOW() as server_time;`;
    return res.status(200).json({
      status: 'ok',
      database: 'connected',
      timestamp: result[0]?.server_time || new Date().toISOString()
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      database: 'disconnected',
      message: error?.message || 'Database connection error'
    });
  }
}
