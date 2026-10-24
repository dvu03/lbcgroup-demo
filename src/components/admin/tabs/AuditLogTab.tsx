import React, { useState } from "react";
import {
  History,
  Search,
  Filter,
  Trash2,
  Clock,
  User,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from "lucide-react";
import { getAuditLogs, clearAuditLogs, AuditLogEntry } from "../../../utils/auditLogger";
import { ConfirmationModal } from "../ConfirmationModal";

export const AuditLogTab: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogEntry[]>(getAuditLogs());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModule, setSelectedModule] = useState("all");
  const [selectedAction, setSelectedAction] = useState("all");
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleClear = () => {
    clearAuditLogs();
    setLogs([]);
    setShowClearConfirm(false);
    showToast("Đã xóa toàn bộ nhật ký chỉnh sửa!");
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      (log.description || log.recordTitle || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ((log.recordName || log.recordTitle || "").toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesModule = selectedModule === "all" || log.module === selectedModule;
    const matchesAction = selectedAction === "all" || log.action === selectedAction;
    return matchesSearch && matchesModule && matchesAction;
  });

  const getActionBadge = (action: string) => {
    switch (action) {
      case "create":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">Tạo mới</span>;
      case "update":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 uppercase">Cập nhật</span>;
      case "delete":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 uppercase">Đã xóa</span>;
      case "reorder":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 uppercase">Đổi thứ tự</span>;
      case "reset":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">Khôi phục</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-100 text-neutral-800 uppercase">{action}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-neutral-900 font-heading flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-700" />
            <span>Nhật ký Chỉnh sửa Nội dung (Audit Activity Logs)</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
            Ghi nhận toàn bộ thao tác thêm, sửa, xóa, nhân bản và sắp xếp các thành phần trên website trong phiên làm việc. Nhật ký được lưu trữ trong LocalStorage để kiểm tra đối soát.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {logs.length > 0 && (
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-red-50 hover:text-red-700 rounded-xl transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa nhật ký</span>
            </button>
          )}
        </div>
      </div>

      {toastMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-fadeIn font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 w-full sm:w-auto flex-wrap">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo mô tả, tên bản ghi..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
            />
          </div>

          <select
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
            className="px-3 py-1.5 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-hidden font-medium text-neutral-700"
          >
            <option value="all">Tất cả hành động</option>
            <option value="create">Tạo mới</option>
            <option value="update">Cập nhật</option>
            <option value="delete">Xóa</option>
            <option value="reorder">Đổi thứ tự</option>
            <option value="reset">Khôi phục</option>
          </select>

          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="px-3 py-1.5 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-hidden font-medium text-neutral-700"
          >
            <option value="all">Tất cả module ({logs.length})</option>
            <option value="Bác sĩ">Bác sĩ</option>
            <option value="Dịch vụ">Dịch vụ</option>
            <option value="Sản phẩm">Sản phẩm</option>
            <option value="Hero Slider">Hero Slider</option>
            <option value="Trang chủ">Trang chủ</option>
            <option value="Bài viết">Bài viết</option>
            <option value="Hệ thống">Hệ thống</option>
          </select>
        </div>

        <div className="text-xs text-neutral-500 font-medium">
          Hiển thị <span className="font-bold text-neutral-800">{filteredLogs.length}</span> sự kiện
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
        {filteredLogs.length === 0 ? (
          <div className="py-16 text-center text-xs text-neutral-400 space-y-2">
            <History className="w-8 h-8 text-neutral-300 mx-auto" />
            <p>Chưa có thao tác nào được ghi nhận trong phiên này.</p>
          </div>
        ) : (
          <table className="w-full text-left text-xs text-neutral-600">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-800 font-semibold uppercase text-[10px]">
              <tr>
                <th className="p-3">Thời gian</th>
                <th className="p-3">Hành động</th>
                <th className="p-3">Phân hệ (Module)</th>
                <th className="p-3">Nội dung chi tiết</th>
                <th className="p-3">Người thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-neutral-50/70 transition">
                  <td className="p-3 whitespace-nowrap text-neutral-400 font-mono text-[11px]">
                    {new Date(log.timestamp).toLocaleString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric"
                    })}
                  </td>
                  <td className="p-3">{getActionBadge(log.action)}</td>
                  <td className="p-3 font-semibold text-neutral-800">{log.module}</td>
                  <td className="p-3">
                    <div className="font-medium text-neutral-900">{log.description}</div>
                    {log.recordName && (
                      <div className="text-[11px] text-neutral-400">Bản ghi: {log.recordName}</div>
                    )}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-100 text-neutral-700">
                      {log.user || "Admin Demo"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Clear Confirmation Modal */}
      <ConfirmationModal
        isOpen={showClearConfirm}
        type="danger"
        title="Xóa toàn bộ nhật ký chỉnh sửa?"
        message="Hành động này sẽ xóa vĩnh viễn toàn bộ lịch sử thao tác đã ghi nhận trong bộ nhớ cục bộ."
        confirmLabel="Xóa nhật ký"
        cancelLabel="Hủy bỏ"
        onConfirm={handleClear}
        onCancel={() => setShowClearConfirm(false)}
      />
    </div>
  );
};
