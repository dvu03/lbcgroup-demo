import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Layers,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Edit,
  Save,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  Sliders,
  Info
} from "lucide-react";
import { useDemoData } from "../../../context/DemoDataContext";
import { HomepageModuleConfig } from "../../../data/homepageModules";
import { ConfirmationModal } from "../ConfirmationModal";

export const HomepageSectionsTab: React.FC = () => {
  const {
    homepageModules,
    toggleHomepageModule,
    reorderHomepageModules,
    updateHomepageModule,
    resetToDefaults
  } = useDemoData();

  const [editingModule, setEditingModule] = useState<HomepageModuleConfig | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= homepageModules.length) return;

    const list = [...homepageModules];
    const [moved] = list.splice(index, 1);
    list.splice(targetIndex, 0, moved);

    // Reassign sequential order
    const updated = list.map((item, idx) => ({ ...item, order: idx + 1 }));
    reorderHomepageModules(updated);
    showToast(`Đã di chuyển section "${moved.name.split("–")[0]}" ${direction === "up" ? "lên" : "xuống"}!`);
  };

  const handleToggle = (id: string, name: string) => {
    toggleHomepageModule(id);
    showToast(`Đã cập nhật trạng thái hiển thị của "${name.split("–")[0]}"!`);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingModule) return;
    updateHomepageModule(editingModule);
    showToast(`Đã lưu thay đổi cho section "${editingModule.name}"!`);
    setEditingModule(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-neutral-900 font-heading flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-700" />
            <span>Quản lý Bố cục Section Trang chủ</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
            Cho phép bật/tắt, thay đổi thứ tự và chỉnh sửa tiêu đề các section trên trang chủ. Mọi điều chỉnh được cập nhật ngay lập tức trên giao diện website trực tiếp.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-600 hover:text-red-700 bg-neutral-100 hover:bg-red-50 rounded-xl transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Đặt lại thứ tự gốc</span>
          </button>

          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Xem Trang chủ Live</span>
          </Link>
        </div>
      </div>

      {/* Success Notice */}
      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-fadeIn font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Sections Table / Cards */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-neutral-50/70 border-b border-neutral-200 flex items-center justify-between text-xs font-semibold text-neutral-600">
          <span>Danh sách 12 Section Trang chủ ({homepageModules.filter(m => m.enabled).length} đang bật)</span>
          <span className="text-[11px] text-neutral-400">Sắp xếp theo thứ tự hiển thị từ trên xuống</span>
        </div>

        <div className="divide-y divide-neutral-200">
          {homepageModules.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === homepageModules.length - 1;

            return (
              <div
                key={item.id}
                className={`p-4 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  item.enabled ? "bg-white hover:bg-neutral-50/50" : "bg-neutral-50/60 opacity-70"
                }`}
              >
                {/* Left: Order badge + Name & Description */}
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <div className="flex flex-col items-center justify-center w-8 h-8 rounded-xl bg-neutral-100 font-extrabold text-neutral-700 text-xs shrink-0 border border-neutral-200 font-mono">
                    {index + 1}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-neutral-900 truncate">
                        {item.customTitle || item.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {item.themeMapping}
                      </span>
                      {!item.enabled && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-200 text-neutral-600">
                          Đã ẩn
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">
                      {item.customSubtitle || item.description}
                    </p>
                  </div>
                </div>

                {/* Right: Controls (Move Up/Down, Edit, Visibility Toggle) */}
                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                  {/* Move Up */}
                  <button
                    type="button"
                    disabled={isFirst}
                    onClick={() => handleMove(index, "up")}
                    className="p-1.5 rounded-lg text-neutral-500 hover:text-emerald-700 hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent transition"
                    title="Di chuyển lên trên"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>

                  {/* Move Down */}
                  <button
                    type="button"
                    disabled={isLast}
                    onClick={() => handleMove(index, "down")}
                    className="p-1.5 rounded-lg text-neutral-500 hover:text-emerald-700 hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent transition"
                    title="Di chuyển xuống dưới"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>

                  <div className="w-px h-4 bg-neutral-200 mx-1" />

                  {/* Edit */}
                  <button
                    type="button"
                    onClick={() => setEditingModule({ ...item })}
                    className="p-1.5 rounded-lg text-neutral-600 hover:text-blue-700 hover:bg-blue-50 transition"
                    title="Chỉnh sửa tiêu đề & thông tin"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  {/* Visibility Toggle */}
                  <button
                    type="button"
                    onClick={() => handleToggle(item.id, item.name)}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                      item.enabled
                        ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-neutral-200 hover:bg-neutral-300 text-neutral-700"
                    }`}
                    title={item.enabled ? "Bấm để ẩn khỏi trang chủ" : "Bấm để bật lên trang chủ"}
                  >
                    {item.enabled ? (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Đang bật</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Đã ẩn</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Section Modal */}
      {editingModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-neutral-200">
            <form onSubmit={handleSaveEdit}>
              <div className="p-6 border-b border-neutral-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-neutral-900 font-heading">
                    Chỉnh sửa Section: {editingModule.name.split("–")[0]}
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-mono">
                    ID: {editingModule.id}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Ánh xạ theme Sapo: {editingModule.themeMapping}
                </p>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Tiêu đề tùy chỉnh hiển thị
                  </label>
                  <input
                    type="text"
                    value={editingModule.customTitle || ""}
                    onChange={(e) => setEditingModule({ ...editingModule, customTitle: e.target.value })}
                    placeholder={editingModule.name}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
                  />
                  <span className="text-[11px] text-neutral-400 mt-1 block">
                    Để trống nếu muốn giữ nguyên tiêu đề mặc định.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Mô tả / Phụ đề section
                  </label>
                  <textarea
                    rows={3}
                    value={editingModule.customSubtitle || ""}
                    onChange={(e) => setEditingModule({ ...editingModule, customSubtitle: e.target.value })}
                    placeholder={editingModule.description}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="sectionEnabledCheck"
                    checked={editingModule.enabled}
                    onChange={(e) => setEditingModule({ ...editingModule, enabled: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded border-neutral-300 focus:ring-emerald-500"
                  />
                  <label htmlFor="sectionEnabledCheck" className="text-xs font-medium text-neutral-800 cursor-pointer">
                    Hiển thị section này trên trang chủ website
                  </label>
                </div>
              </div>

              <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingModule(null)}
                  className="px-4 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-100 transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      <ConfirmationModal
        isOpen={showResetConfirm}
        type="warning"
        title="Đặt lại thứ tự section gốc?"
        message="Hành động này sẽ khôi phục 12 section trang chủ về thứ tự và trạng thái ban đầu theo brief Sapo theme."
        confirmLabel="Khôi phục gốc"
        cancelLabel="Hủy bỏ"
        onConfirm={() => {
          resetToDefaults();
          setShowResetConfirm(false);
          showToast("Đã khôi phục bố cục trang chủ về ban đầu!");
        }}
        onCancel={() => setShowResetConfirm(false)}
      />
    </div>
  );
};
