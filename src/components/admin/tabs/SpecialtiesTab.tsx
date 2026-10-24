import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Layers,
  Image as ImageIcon
} from "lucide-react";
import { useDemoData } from "../../../context/DemoDataContext";
import { Specialty } from "../../../data/specialties";
import { ConfirmationModal } from "../ConfirmationModal";
import { MediaLibraryModal } from "../MediaLibraryModal";

export const SpecialtiesTab: React.FC = () => {
  const { specialties, saveSpecialty, deleteSpecialty } = useDemoData();
  const [searchQuery, setSearchQuery] = useState("");
  const [editingSpecialty, setEditingSpecialty] = useState<Specialty | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const filtered = specialties.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.tagline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateNew = () => {
    const newSpec: Specialty = {
      id: `spec-${Date.now()}`,
      code: `ICO-K${specialties.length + 1}`,
      name: "Chuyên khoa mới",
      slug: `chuyen-khoa-moi-${Date.now()}`,
      tagline: "Thông điệp y khoa chuyên môn",
      shortDesc: "Mô tả ngắn về phạm vi thăm khám và điều trị của chuyên khoa.",
      fullDesc: "Nội dung giới thiệu chi tiết về cơ sở vật chất và quy trình chuyên khoa...",
      iconName: "Stethoscope",
      ctaText: "Đặt lịch thăm khám",
      ctaLink: "/dat-lich-kham",
      servicesList: ["Dịch vụ điều trị 1", "Dịch vụ điều trị 2"],
      inChargePerson: "Bác sĩ Chuyên khoa",
      licenseInfo: "Số phép hoạt động y tế",
      operatingHours: "08:00 - 18:00 (Thứ 2 - Thứ 7)",
      heroImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
      galleryImages: []
    };
    setEditingSpecialty(newSpec);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSpecialty) return;
    saveSpecialty(editingSpecialty);
    showToast(`Đã lưu chuyên khoa: "${editingSpecialty.name}"!`);
    setEditingSpecialty(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-neutral-900 font-heading flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-emerald-700" />
            <span>Hệ sinh thái Chuyên khoa Phòng khám</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
            Quản lý 5 lĩnh vực trong hệ sinh thái Lạc's Beauty Center: Khoa Da liễu, Khoa Xét nghiệm, Nhà thuốc, Dược mỹ phẩm và Lạc's Academy hiển thị trên Banner 1 trang chủ.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleCreateNew}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Chuyên khoa</span>
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
        {filtered.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="relative h-36 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                <img src={s.heroImage} alt={s.name} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-white/90 text-emerald-900">
                  {s.code}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-neutral-900 font-heading">{s.name}</h3>
                <p className="text-xs text-emerald-800 font-medium">{s.tagline}</p>
                <p className="text-xs text-neutral-500 line-clamp-2 mt-1">{s.shortDesc}</p>
              </div>

              <div className="text-[11px] text-neutral-400">
                Phụ trách: <strong className="text-neutral-700">{s.inChargePerson}</strong>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between mt-3">
              <span className="text-[11px] text-neutral-400 font-mono">/{s.slug}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setEditingSpecialty({ ...s })}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-blue-700 hover:bg-blue-50 transition"
                  title="Chỉnh sửa"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(s.id)}
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

      {/* Edit Specialty Modal */}
      {editingSpecialty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full my-8 overflow-hidden border border-neutral-200">
            <form onSubmit={handleSave}>
              <div className="p-5 border-b border-neutral-200">
                <h3 className="text-base font-bold text-neutral-900 font-heading">
                  Chỉnh sửa Chuyên khoa: {editingSpecialty.name}
                </h3>
              </div>

              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto text-xs">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Tên chuyên khoa
                  </label>
                  <input
                    type="text"
                    value={editingSpecialty.name}
                    onChange={(e) => setEditingSpecialty({ ...editingSpecialty, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:outline-hidden font-heading"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Mã chuyên khoa
                    </label>
                    <input
                      type="text"
                      value={editingSpecialty.code}
                      onChange={(e) => setEditingSpecialty({ ...editingSpecialty, code: e.target.value })}
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
                      value={editingSpecialty.slug}
                      onChange={(e) => setEditingSpecialty({ ...editingSpecialty, slug: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Khẩu hiệu chuyên môn (Tagline)
                  </label>
                  <input
                    type="text"
                    value={editingSpecialty.tagline}
                    onChange={(e) => setEditingSpecialty({ ...editingSpecialty, tagline: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Ảnh đại diện Banner
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={editingSpecialty.heroImage}
                      onChange={(e) => setEditingSpecialty({ ...editingSpecialty, heroImage: e.target.value })}
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
                    Mô tả ngắn
                  </label>
                  <textarea
                    rows={2}
                    value={editingSpecialty.shortDesc}
                    onChange={(e) => setEditingSpecialty({ ...editingSpecialty, shortDesc: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Người phụ trách chuyên môn
                  </label>
                  <input
                    type="text"
                    value={editingSpecialty.inChargePerson}
                    onChange={(e) => setEditingSpecialty({ ...editingSpecialty, inChargePerson: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingSpecialty(null)}
                  className="px-4 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-100 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
                >
                  Lưu Chuyên khoa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={!!deleteConfirmId}
        type="danger"
        title="Xóa Chuyên khoa?"
        message="Hành động này sẽ xóa chuyên khoa khỏi danh sách hệ sinh thái phòng khám."
        confirmLabel="Xóa"
        cancelLabel="Hủy"
        onConfirm={() => {
          if (deleteConfirmId) {
            deleteSpecialty(deleteConfirmId);
            setDeleteConfirmId(null);
            showToast("Đã xóa chuyên khoa!");
          }
        }}
        onCancel={() => setDeleteConfirmId(null)}
      />

      <MediaLibraryModal
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelectMedia={(media) => {
          if (editingSpecialty) {
            setEditingSpecialty({ ...editingSpecialty, heroImage: media.url });
          }
          setShowMediaPicker(false);
        }}
        title="Chọn ảnh Chuyên khoa từ Media"
      />
    </div>
  );
};
