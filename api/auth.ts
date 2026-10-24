import { verifyAdmin } from './_db.js';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { secret } = req.body || {};
    const configuredSecret = process.env.ADMIN_SECRET || 'lbc_admin_secret_998877';

    if (!configuredSecret) {
      return res.status(500).json({ error: 'Server authentication is not configured' });
    }

    if (secret && secret === configuredSecret) {
      return res.status(200).json({
        success: true,
        token: configuredSecret,
        role: 'admin',
        message: 'Xác thực quản trị viên thành công'
      });
    }

    return res.status(401).json({
      success: false,
      error: 'Mật khẩu quản trị viên không chính xác'
    });
  }

  if (req.method === 'GET') {
    const isAuthed = verifyAdmin(req.headers.authorization);
    return res.status(isAuthed ? 200 : 401).json({
      authenticated: isAuthed
    });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
