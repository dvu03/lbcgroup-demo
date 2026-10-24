import React, { useState } from "react";
import {
  CalendarCheck2,
  Search,
  Filter,
  Download,
  Trash2,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Calendar,
  AlertTriangle,
  User
} from "lucide-react";
import { useDemoData } from "../../../context/DemoDataContext";
import { ConfirmationModal } from "../ConfirmationModal";

export const LeadsTab: React.FC = () => {
  const { bookingLeads, updateBookingLeadStatus, clearBookingLeads } = useDemoData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const filteredLeads = bookingLeads.filter((lead) => {
    const matchesSearch =
      (lead.fullName || lead.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      (lead.email && lead.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.serviceInterest || lead.service || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || lead.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    if (bookingLeads.length === 0) {
      showToast("Không có dữ liệu khách hẹn để xuất!");
      return;
    }

    const headers = ["ID", "Họ tên", "Số điện thoại", "Email", "Dịch vụ", "Ngày giờ hẹn", "Cơ sở", "Ghi chú", "Trạng thái", "Thời gian gửi"];
    const rows = bookingLeads.map((l) => [
      l.id,
      `"${(l.fullName || l.name || "").replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email || ""}"`,
      `"${(l.serviceInterest || l.service || "").replace(/"/g, '""')}"`,
      `"${l.preferredDateTime || ""}"`,
      `"${(l.facility || "").replace(/"/g, '""')}"`,
      `"${(l.notes || "").replace(/"/g, '""')}"`,
      l.status,
      l.createdAt
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `khach-hen-lac-beauty-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Đã xuất file CSV danh sách khách hẹn!");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">Yêu cầu mới</span>;
      case "contacted":
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">Đã gọi điện</span>;
      case "confirmed":
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Đã chốt lịch</span>;
      case "cancelled":
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-200 text-neutral-600">Đã hủy</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-neutral-900 font-heading flex items-center gap-2">
            <CalendarCheck2 className="w-5 h-5 text-emerald-700" />
            <span>Khách Hẹn Khám & Đăng Ký Tư Vấn (Leads)</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
            Danh sách khách hàng điền form đăng ký soi da VISIA 3D và tư vấn dịch vụ từ website. Bạn có thể cập nhật trạng thái xử lý và xuất file CSV báo cáo.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Xuất CSV</span>
          </button>

          {bookingLeads.length > 0 && (
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xl transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa toàn bộ lead</span>
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
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên, SĐT, dịch vụ..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
            />
          </div>

          <div className="relative shrink-0">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-hidden font-medium text-neutral-700"
            >
              <option value="all">Tất cả trạng thái ({bookingLeads.length})</option>
              <option value="new">Yêu cầu mới</option>
              <option value="contacted">Đã liên hệ</option>
              <option value="confirmed">Đã chốt lịch</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-neutral-500 font-medium">
          Hiển thị <span className="font-bold text-neutral-800">{filteredLeads.length}</span> lượt đăng ký
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
        {filteredLeads.length === 0 ? (
          <div className="py-16 text-center text-xs text-neutral-400 space-y-2">
            <CalendarCheck2 className="w-8 h-8 text-neutral-300 mx-auto" />
            <p>Chưa có dữ liệu khách hẹn nào phù hợp bộ lọc.</p>
          </div>
        ) : (
          <table className="w-full text-left text-xs text-neutral-600">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-800 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Khách hàng</th>
                <th className="p-3">Dịch vụ yêu cầu</th>
                <th className="p-3">Thời gian hẹn</th>
                <th className="p-3">Cơ sở & Ghi chú</th>
                <th className="p-3">Trạng thái xử lý</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-neutral-50/70 transition">
                  <td className="p-3">
                    <div className="font-bold text-neutral-900 text-sm">{lead.fullName || lead.name}</div>
                    <div className="flex items-center gap-2 text-neutral-500 text-[11px] mt-0.5">
                      <span className="flex items-center gap-1 font-mono text-emerald-800 font-bold">
                        <Phone className="w-3 h-3" />
                        {lead.phone}
                      </span>
                      {lead.email && (
                        <span className="flex items-center gap-1 text-neutral-400">
                          <Mail className="w-3 h-3" />
                          {lead.email}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="font-medium text-neutral-800">{lead.serviceInterest || lead.service || "Soi da VISIA 3D"}</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">
                      Gửi lúc: {new Date(lead.createdAt).toLocaleString("vi-VN")}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="font-medium text-neutral-800">
                      {lead.preferredDateTime || "Linh hoạt theo phòng khám"}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="font-medium text-neutral-700">{lead.facility || "Cơ sở Cần Thơ"}</div>
                    {lead.notes && (
                      <p className="text-[11px] text-neutral-500 line-clamp-1 italic mt-0.5">"{lead.notes}"</p>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {getStatusBadge(lead.status)}
                      <select
                        value={lead.status}
                        onChange={(e) => {
                          updateBookingLeadStatus(lead.id, e.target.value as any);
                          showToast(`Đã chuyển trạng thái của "${lead.fullName || lead.name}"!`);
                        }}
                        className="px-2 py-1 text-[11px] border border-neutral-300 rounded-lg bg-white focus:outline-hidden"
                      >
                        <option value="new">Mới</option>
                        <option value="contacted">Đã liên hệ</option>
                        <option value="confirmed">Đã chốt lịch</option>
                        <option value="cancelled">Hủy</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Clear All Confirmation Modal */}
      <ConfirmationModal
        isOpen={showClearConfirm}
        type="danger"
        title="Xóa toàn bộ danh sách khách hẹn?"
        message="Hành động này sẽ xóa sạch tất cả bản ghi lead khách hẹn hiện có trong bộ nhớ demo."
        confirmLabel="Xóa sạch"
        cancelLabel="Hủy bỏ"
        onConfirm={() => {
          clearBookingLeads();
          setShowClearConfirm(false);
          showToast("Đã xóa toàn bộ danh sách khách hẹn!");
        }}
        onCancel={() => setShowClearConfirm(false)}
      />
    </div>
  );
};
