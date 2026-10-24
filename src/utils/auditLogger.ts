/**
 * Audit Logger for LBC CMS Activity Tracking
 * Records operations (create, update, delete, reorder, backup, reset) in localStorage
 */

export interface AuditLogEntry {
  id: string;
  timestamp: string; // ISO string
  formattedDate: string; // Vietnamese formatted date
  module: string; // "Bác sĩ", "Dịch vụ", "Sản phẩm", "Hero Banner", etc.
  action: 'create' | 'update' | 'delete' | 'reorder' | 'reset' | 'import';
  recordTitle: string;
  details?: string;
  author: string;
  description?: string;
  user?: string;
  recordName?: string;
}

const STORAGE_KEY = "LBC_DEMO_auditLogs";

export function getAuditLogs(): AuditLogEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedInitialAuditLogs();
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load audit logs", e);
    return [];
  }
}

export function logAuditAction(
  module: string,
  action: AuditLogEntry['action'],
  recordTitle: string,
  details?: string,
  author = "Admin Ban Giám đốc"
): AuditLogEntry {
  const now = new Date();
  const entry: AuditLogEntry = {
    id: "log-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
    timestamp: now.toISOString(),
    formattedDate: now.toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }),
    module,
    action,
    recordTitle,
    details,
    author,
    description: details || recordTitle,
    user: author,
    recordName: recordTitle
  };

  try {
    const current = getAuditLogs();
    const updated = [entry, ...current].slice(0, 100); // Keep last 100 entries
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to append audit log", e);
  }

  return entry;
}

export function clearAuditLogs(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Failed to clear audit logs", e);
  }
}

function seedInitialAuditLogs(): AuditLogEntry[] {
  const initial: AuditLogEntry[] = [
    {
      id: "log-seed-01",
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      formattedDate: new Date(Date.now() - 3600000 * 2).toLocaleString("vi-VN"),
      module: "Hệ thống",
      action: "import",
      recordTitle: "Khởi tạo dữ liệu gốc từ Brief Website lbcgroup.vn",
      details: "Tải thành công 14 sheet dữ liệu tiêu chuẩn y khoa và thương hiệu.",
      author: "Hệ thống"
    },
    {
      id: "log-seed-02",
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      formattedDate: new Date(Date.now() - 1800000).toLocaleString("vi-VN"),
      module: "Bác sĩ",
      action: "update",
      recordTitle: "Cập nhật hồ sơ ThS.BS. Lạc Kim Ngân",
      details: "Xác thực ảnh chân dung 200 OK và đồng bộ số CCHN Sở Y tế.",
      author: "Admin Ban Giám đốc"
    },
    {
      id: "log-seed-03",
      timestamp: new Date(Date.now() - 900000).toISOString(),
      formattedDate: new Date(Date.now() - 900000).toLocaleString("vi-VN"),
      module: "Hero Banner",
      action: "update",
      recordTitle: "Tối ưu hóa hiển thị banner di động và desktop",
      details: "Đồng bộ responsive 0 horizontal overflow trên 8 viewports.",
      author: "Admin Ban Giám đốc"
    }
  ];

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  } catch (e) {
    console.error(e);
  }

  return initial;
}
