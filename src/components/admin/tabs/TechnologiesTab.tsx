import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Cpu,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Image as ImageIcon
} from "lucide-react";
import { useDemoData } from "../../../context/DemoDataContext";
import { TechnologyItem } from "../../../data/technologies";
import { ConfirmationModal } from "../ConfirmationModal";
import { MediaLibraryModal } from "../MediaLibraryModal";

export const TechnologiesTab: React.FC = () => {
  const { technologies, saveTechnology, deleteTechnology } = useDemoData();
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTech, setEditingTech] = useState<TechnologyItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const filtered = technologies.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.deviceOrigin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.appliedService.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateNew = () => {
    const newTech: TechnologyItem = {
      id: `cn-${Date.now()}`,
      code: `CN-0${technologies.length + 1}`,
      name: "Công nghệ điều trị mới",
      deviceOrigin: "Tên thiết bị – Nhà sản xuất – Xuất xứ",
      appliedService: "Dịch vụ điều trị liên kết",
      slug: `cong-nghe-moi-${Date.now()}`,
      principle: "Nguyên lý tác động y khoa của công nghệ.",
      benefits: ["Lợi ích 1", "Lợi ích 2", "Lợi ích 3"],
      sessionProcess: ["Bước 1: Làm sạch", "Bước 2: Tiến hành máy", "Bước 3: Dưỡng phục hồi"],
      certifications: "Chứng nhận FDA / CE chuẩn y tế",
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
      actionImageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
      showOnHomeBanner2: true,
      isVerified: false
    };
    setEditingTech(newTech);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTech) return;
    saveTechnology(editingTech);
    showToast(`Đã lưu công nghệ: "${editingTech.name}"!`);
    setEditingTech(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-neutral-900 font-heading flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-700" />
            <span>Quản lý Công nghệ & Thiết bị Y tế</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
            Hệ thống máy móc công nghệ cao: VISIA 3D, RF Jovena, HIFU, Laser thẩm mỹ. Quản lý nguồn gốc xuất xứ, nguyên lý điều trị và chứng nhận lưu hành thiết bị.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleCreateNew}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Công nghệ</span>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="relative h-40 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                <img src={t.imageUrl} alt={t.name} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-white/90 text-emerald-900">
                  {t.code}
                </span>
                {t.showOnHomeBanner2 && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-700 text-white">
                    Slider Trang chủ
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-sm font-bold text-neutral-900 font-heading">{t.name}</h3>
                <p className="text-xs text-emerald-800 font-medium">{t.deviceOrigin}</p>
                <p className="text-xs text-neutral-500 line-clamp-2 mt-1">{t.principle}</p>
              </div>

              <div className="text-[11px] text-neutral-400">
                Chứng nhận: <strong className="text-neutral-700">{t.certifications}</strong>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between mt-3">
              <span className="text-[11px] text-neutral-400 font-mono">/{t.slug}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setEditingTech({ ...t })}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-blue-700 hover:bg-blue-50 transition"
                  title="Chỉnh sửa"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(t.id)}
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

      {/* Edit Tech Modal */}
      {editingTech && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full my-8 overflow-hidden border border-neutral-200">
            <form onSubmit={handleSave}>
              <div className="p-5 border-b border-neutral-200">
                <h3 className="text-base font-bold text-neutral-900 font-heading">
                  Chỉnh sửa Công nghệ: {editingTech.name}
                </h3>
              </div>

              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto text-xs">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Tên công nghệ
                  </label>
                  <input
                    type="text"
                    value={editingTech.name}
                    onChange={(e) => setEditingTech({ ...editingTech, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl font-heading"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Mã công nghệ
                    </label>
                    <input
                      type="text"
                      value={editingTech.code}
                      onChange={(e) => setEditingTech({ ...editingTech, code: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Slug URL
                    </label>
                    <input
                      type="text"
                      value={editingTech.slug}
                      onChange={(e) => setEditingTech({ ...editingTech, slug: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Thiết bị – Nhà sản xuất – Xuất xứ
                  </label>
                  <input
                    type="text"
                    value={editingTech.deviceOrigin}
                    onChange={(e) => setEditingTech({ ...editingTech, deviceOrigin: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Ảnh công nghệ
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={editingTech.imageUrl}
                      onChange={(e) => setEditingTech({ ...editingTech, imageUrl: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowMediaPicker(true)}
                      className="px-3 py-2 bg-neutral-100 rounded-xl text-xs font-semibold shrink-0"
                    >
                      Media
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Nguyên lý điều trị
                  </label>
                  <textarea
                    rows={2}
                    value={editingTech.principle}
                    onChange={(e) => setEditingTech({ ...editingTech, principle: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Chứng nhận & Tiêu chuẩn
                  </label>
                  <input
                    type="text"
                    value={editingTech.certifications}
                    onChange={(e) => setEditingTech({ ...editingTech, certifications: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="techBannerCheck"
                    checked={editingTech.showOnHomeBanner2}
                    onChange={(e) => setEditingTech({ ...editingTech, showOnHomeBanner2: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded border-neutral-300 focus:ring-emerald-500"
                  />
                  <label htmlFor="techBannerCheck" className="text-xs font-medium text-neutral-800 cursor-pointer">
                    Hiển thị trên Slider Công nghệ trang chủ
                  </label>
                </div>
              </div>

              <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingTech(null)}
                  className="px-4 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-100 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
                >
                  Lưu Công nghệ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={!!deleteConfirmId}
        type="danger"
        title="Xóa Công nghệ?"
        message="Hành động này sẽ xóa công nghệ khỏi danh sách máy móc điều trị."
        confirmLabel="Xóa"
        cancelLabel="Hủy"
        onConfirm={() => {
          if (deleteConfirmId) {
            deleteTechnology(deleteConfirmId);
            setDeleteConfirmId(null);
            showToast("Đã xóa công nghệ!");
          }
        }}
        onCancel={() => setDeleteConfirmId(null)}
      />

      <MediaLibraryModal
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelectMedia={(media) => {
          if (editingTech) {
            setEditingTech({ ...editingTech, imageUrl: media.url });
          }
          setShowMediaPicker(false);
        }}
        title="Chọn ảnh Công nghệ từ Media"
      />
    </div>
  );
};
