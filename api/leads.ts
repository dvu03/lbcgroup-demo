import { getDb, verifyAdmin } from './_db.js';

export default async function handler(req: any, res: any) {
  // POST: Public appointment / lead submission
  if (req.method === 'POST') {
    const { fullName, phone, facility, serviceInterest, preferredDateTime, notes, consentAgreed } = req.body || {};

    // Validate inputs
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return res.status(400).json({ error: 'Họ và tên không hợp lệ (tối thiểu 2 ký tự)' });
    }

    const cleanPhone = (phone || '').replace(/[^0-9+]/g, '');
    if (cleanPhone.length < 9 || cleanPhone.length > 15) {
      return res.status(400).json({ error: 'Số điện thoại không hợp lệ (yêu cầu từ 9-12 chữ số)' });
    }

    const leadId = 'lead-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);

    try {
      const sql = getDb();
      await sql`
        INSERT INTO booking_leads (
          id, full_name, phone, facility, service_interest, preferred_datetime, notes, consent_agreed, status, created_at
        ) VALUES (
          ${leadId},
          ${fullName.trim().slice(0, 200)},
          ${cleanPhone},
          ${facility ? String(facility).slice(0, 100) : 'Cơ sở 1 – 231T Đường 3/2'},
          ${serviceInterest ? String(serviceInterest).slice(0, 200) : 'Khám & Soi da VISIA 3D'},
          ${preferredDateTime ? String(preferredDateTime).slice(0, 100) : ''},
          ${notes ? String(notes).slice(0, 1000) : ''},
          ${Boolean(consentAgreed !== false)},
          'new',
          NOW()
        );
      `;

      return res.status(201).json({
        success: true,
        id: leadId,
        message: 'Đăng ký đặt lịch thành công!'
      });
    } catch (error: any) {
      return res.status(500).json({ error: 'Không thể lưu lịch hẹn vào cơ sở dữ liệu', message: error.message });
    }
  }

  // GET: Admin only list all leads
  if (req.method === 'GET') {
    if (!verifyAdmin(req.headers.authorization)) {
      return res.status(401).json({ error: 'Unauthorized: Admin privileges required' });
    }

    try {
      const sql = getDb();
      const rows = await sql`
        SELECT id, full_name as "fullName", phone, facility, 
               service_interest as "serviceInterest", 
               preferred_datetime as "preferredDateTime", 
               notes, consent_agreed as "consentAgreed", 
               status, created_at as "createdAt"
        FROM booking_leads
        ORDER BY created_at DESC;
      `;
      return res.status(200).json(rows);
    } catch (error: any) {
      return res.status(500).json({ error: 'Failed to fetch leads', message: error.message });
    }
  }

  // PATCH: Admin only update status
  if (req.method === 'PATCH') {
    if (!verifyAdmin(req.headers.authorization)) {
      return res.status(401).json({ error: 'Unauthorized: Admin privileges required' });
    }

    const { id, status } = req.body || {};
    const validStatuses = ['new', 'contacted', 'confirmed', 'cancelled'];

    if (!id || !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid lead ID or status' });
    }

    try {
      const sql = getDb();
      const result = await sql`
        UPDATE booking_leads
        SET status = ${status}
        WHERE id = ${id}
        RETURNING id, status;
      `;

      if (result.length === 0) {
        return res.status(404).json({ error: 'Lead not found' });
      }

      return res.status(200).json({ success: true, lead: result[0] });
    } catch (error: any) {
      return res.status(500).json({ error: 'Failed to update lead status', message: error.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
