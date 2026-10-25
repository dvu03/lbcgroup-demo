import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Layers,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Image as ImageIcon
} from "lucide-react";
import { useDemoData } from "../../../context/DemoDataContext";
import { CaseStudyItem } from "../../../data/caseStudies";
import { ConfirmationModal } from "../ConfirmationModal";
import { MediaLibraryModal } from "../MediaLibraryModal";

export const CaseStudiesTab: React.FC = () => {
  const { caseStudies, saveCaseStudy, deleteCaseStudy, services } = useDemoData();
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCase, setEditingCase] = useState<CaseStudyItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [mediaTarget, setMediaTarget] = useState<"before" | "after" | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const filtered = caseStudies.filter((c) =>
    c.customerInitial.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.initialCondition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateNew = () => {
    const newCase: CaseStudyItem = {
      id: `ba-${Date.now()}`,
      code: `BA-0${caseStudies.length + 1}`,
      serviceId: services[0]?.id || "srv-01",
      serviceName: services[0]?.name || "Điều trị mụn chuẩn y khoa",
      customerInitial: "Khách hàng N.T.M (25 tuổi)",
      initialCondition: "Tình trạng da liễu trước khi điều trị.",
      protocolSummary: "Phác đồ cá nhân hóa chuẩn y khoa.",
      sessions: "Liệu trình 4 buổi",
      treatingDoctor: "ThS.BS. Lạc Kim Ngân",
      beforeImageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
      afterImageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
      hasConsentForm: true,
      notes: "Nội dung minh họa – Đã có biên bản thỏa thuận chia sẻ hình ảnh."
    };
    setEditingCase(newCase);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCase) return;
    setIsSaving(true);
    const res = await saveCaseStudy(editingCase);
    setIsSaving(false);
    if (res.success) {
      showToast(`Đã lưu ca điều trị Before-After: "${editingCase.customerInitial}"!`);
      setEditingCase(null);
    } else {
      alert("Lỗi khi lưu ca điều trị: " + (res.error || "Không thể kết nối đến cơ sở dữ liệu"));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-neutral-900 font-heading flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-700" />
            <span>Khách hàng Before – After (Người thật – Việc thật)</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
            Kết quả điều trị thực tế có biên bản cam kết chia sẻ hình ảnh ẩn danh. Quản lý ảnh trước/sau, phác đồ điều trị và bác sĩ phụ trách.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleCreateNew}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Ca điều trị</span>
          </button>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-fadeIn font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Dual Before / After Image comparison */}
              <div className="grid grid-cols-2 gap-2 h-44 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-200">
                <div className="relative h-full">
                  <img src={item.beforeImageUrl} alt="Trước" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/70 text-white">
                    TRƯỚC
                  </span>
                </div>
                <div className="relative h-full">
                  <img src={item.afterImageUrl} alt="Sau" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-700 text-white">
                    SAU
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">{item.serviceName}</span>
                  {item.hasConsentForm && (
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Có cam kết</span>
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-neutral-900 mt-1 font-heading">{item.customerInitial}</h3>
                <p className="text-xs text-neutral-500 line-clamp-2 mt-1">Trước: {item.initialCondition}</p>
                <p className="text-xs text-neutral-600 line-clamp-1 mt-0.5 font-medium">Phác đồ: {item.protocolSummary}</p>
              </div>

              <div className="text-[11px] text-neutral-400">
                Bác sĩ điều trị: <strong className="text-neutral-700">{item.treatingDoctor}</strong> &bull; {item.sessions}
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between mt-3">
              <span className="text-[11px] text-neutral-400 font-mono">ID: {item.code}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setEditingCase({ ...item })}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-blue-700 hover:bg-blue-50 transition"
                  title="Chỉnh sửa"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(item.id)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition"
                  title="Xóa"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full my-8 overflow-hidden border border-neutral-200">
            <form onSubmit={handleSave}>
              <div className="p-5 border-b border-neutral-200">
                <h3 className="text-base font-bold text-neutral-900 font-heading">
                  Chỉnh sửa Ca Before–After: {editingCase.customerInitial}
                </h3>
              </div>

              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Mã ca (Code)
                    </label>
                    <input
                      type="text"
                      value={editingCase.code}
                      onChange={(e) => setEditingCase({ ...editingCase, code: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Tên khách hàng ẩn danh
                    </label>
                    <input
                      type="text"
                      value={editingCase.customerInitial}
                      onChange={(e) => setEditingCase({ ...editingCase, customerInitial: e.target.value })}
                      required
                      placeholder="VD: Khách hàng N.T.M (26 tuổi)"
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-heading"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Dịch vụ điều trị
                  </label>
                  <select
                    value={editingCase.serviceId}
                    onChange={(e) => {
                      const srv = services.find((s) => s.id === e.target.value);
                      setEditingCase({
                        ...editingCase,
                        serviceId: e.target.value,
                        serviceName: srv ? srv.name : editingCase.serviceName
                      });
                    }}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-hidden"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Images */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                        Ảnh TRƯỚC (Before)
                      </label>
                      <button
                        type="button"
                        onClick={() => setMediaTarget("before")}
                        className="text-xs text-emerald-700 font-semibold"
                      >
                        Media
                      </button>
                    </div>
                    <input
                      type="url"
                      value={editingCase.beforeImageUrl}
                      onChange={(e) => setEditingCase({ ...editingCase, beforeImageUrl: e.target.value })}
                      required
                      className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-xl font-mono"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                        Ảnh SAU (After)
                      </label>
                      <button
                        type="button"
                        onClick={() => setMediaTarget("after")}
                        className="text-xs text-emerald-700 font-semibold"
                      >
                        Media
                      </button>
                    </div>
                    <input
                      type="url"
                      value={editingCase.afterImageUrl}
                      onChange={(e) => setEditingCase({ ...editingCase, afterImageUrl: e.target.value })}
                      required
                      className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Tình trạng ban đầu
                  </label>
                  <textarea
                    rows={2}
                    value={editingCase.initialCondition}
                    onChange={(e) => setEditingCase({ ...editingCase, initialCondition: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Tóm tắt phác đồ điều trị
                  </label>
                  <textarea
                    rows={2}
                    value={editingCase.protocolSummary}
                    onChange={(e) => setEditingCase({ ...editingCase, protocolSummary: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Số buổi / Thời lượng
                    </label>
                    <input
                      type="text"
                      value={editingCase.sessions}
                      onChange={(e) => setEditingCase({ ...editingCase, sessions: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Bác sĩ điều trị
                    </label>
                    <input
                      type="text"
                      value={editingCase.treatingDoctor}
                      onChange={(e) => setEditingCase({ ...editingCase, treatingDoctor: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="consentCheck"
                    checked={editingCase.hasConsentForm}
                    onChange={(e) => setEditingCase({ ...editingCase, hasConsentForm: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded border-neutral-300 focus:ring-emerald-500"
                  />
                  <label htmlFor="consentCheck" className="text-xs font-medium text-neutral-800 cursor-pointer">
                    Đã có văn bản đồng ý sử dụng hình ảnh phục vụ y khoa
                  </label>
                </div>
              </div>

              <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingCase(null)}
                  className="px-4 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-100 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl shadow-xs transition flex items-center gap-1.5"
                >
                  {isSaving ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Đang lưu...</span>
                    </>
                  ) : (
                    <span>Lưu ca điều trị</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={!!deleteConfirmId}
        type="danger"
        title="Xóa ca điều trị Before-After?"
        message="Hành động này sẽ xóa ca điều trị khỏi khối Người thật việc thật trên website."
        confirmLabel="Xóa"
        cancelLabel="Hủy"
        onConfirm={async () => {
          if (deleteConfirmId) {
            const id = deleteConfirmId;
            setDeleteConfirmId(null);
            const res = await deleteCaseStudy(id);
            if (res.success) {
              showToast("Đã xóa ca điều trị!");
            } else {
              alert("Lỗi khi xóa ca điều trị: " + (res.error || "Không thể xóa"));
            }
          }
        }}
        onCancel={() => setDeleteConfirmId(null)}
      />

      <MediaLibraryModal
        isOpen={!!mediaTarget}
        onClose={() => setMediaTarget(null)}
        onSelectMedia={(media) => {
          if (editingCase) {
            if (mediaTarget === "before") {
              setEditingCase({ ...editingCase, beforeImageUrl: media.url });
            } else if (mediaTarget === "after") {
              setEditingCase({ ...editingCase, afterImageUrl: media.url });
            }
          }
          setMediaTarget(null);
        }}
        title="Chọn ảnh Trước / Sau từ Media"
      />
    </div>
  );
};
