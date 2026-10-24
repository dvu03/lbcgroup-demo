import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Phone,
  Clock,
  Image as ImageIcon
} from "lucide-react";
import { useDemoData } from "../../../context/DemoDataContext";
import { LocationItem } from "../../../data/locations";
import { ConfirmationModal } from "../ConfirmationModal";
import { MediaLibraryModal } from "../MediaLibraryModal";

export const LocationsTab: React.FC = () => {
  const { locations, saveLocation, deleteLocation } = useDemoData();
  const [editingLoc, setEditingLoc] = useState<LocationItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleCreateNew = () => {
    const newLoc: LocationItem = {
      id: `cs-${Date.now()}`,
      name: "Cơ sở mới – Lạc's Beauty Center",
      shortName: "Chi nhánh mới",
      address: "Số ..., Đường ..., TP. Cần Thơ",
      phone: "1900 6750",
      hours: "08:00 – 20:00 (Hằng ngày)",
      isMainFacility: false,
      imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
      mapEmbedUrl: "https://maps.google.com"
    };
    setEditingLoc(newLoc);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLoc) return;
    saveLocation(editingLoc);
    showToast(`Đã lưu cơ sở: "${editingLoc.shortName}"!`);
    setEditingLoc(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-neutral-900 font-heading flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-700" />
            <span>Hệ Thống Cơ Sở Phòng Khám & Chi Nhánh</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
            Hệ thống 2 cơ sở tại Cần Thơ: Cơ sở 01 (Đường 3/2) và Cơ sở 02 (Nguyễn Văn Cừ). Quản lý địa chỉ thực tế, giờ mở cửa, hotline và hình ảnh không gian đón tiếp.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleCreateNew}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Cơ sở mới</span>
          </button>

          <Link
            to="/he-thong-co-so"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Xem Trang Cơ sở</span>
          </Link>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-fadeIn font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Locations Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {locations.map((loc) => (
          <div
            key={loc.id}
            className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 bg-neutral-900">
                <img src={loc.imageUrl} alt={loc.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 text-emerald-900 shadow-xs">
                    {loc.shortName}
                  </span>
                  {loc.isMainFacility && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-700 text-white shadow-xs">
                      Trụ sở chính
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 space-y-2.5 text-xs">
                <h3 className="text-sm font-bold text-neutral-900 font-heading">{loc.name}</h3>
                <div className="flex items-start gap-2 text-neutral-600">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{loc.address}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600">
                  <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="font-mono font-bold text-emerald-900">{loc.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600">
                  <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{loc.hours}</span>
                </div>
                {loc.notes && (
                  <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg italic">
                    {loc.notes}
                  </p>
                )}
              </div>
            </div>

            <div className="px-5 py-3 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-[11px] text-neutral-400 font-mono">ID: {loc.id}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setEditingLoc({ ...loc })}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-blue-700 hover:bg-blue-50 transition"
                  title="Chỉnh sửa"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(loc.id)}
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

      {/* Edit Location Modal */}
      {editingLoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full my-8 overflow-hidden border border-neutral-200">
            <form onSubmit={handleSave}>
              <div className="p-5 border-b border-neutral-200">
                <h3 className="text-base font-bold text-neutral-900 font-heading">
                  Chỉnh sửa Cơ sở: {editingLoc.shortName}
                </h3>
              </div>

              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto text-xs">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Tên đầy đủ cơ sở
                  </label>
                  <input
                    type="text"
                    value={editingLoc.name}
                    onChange={(e) => setEditingLoc({ ...editingLoc, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl font-heading"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Tên gọi ngắn gọn
                    </label>
                    <input
                      type="text"
                      value={editingLoc.shortName}
                      onChange={(e) => setEditingLoc({ ...editingLoc, shortName: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Hotline chi nhánh
                    </label>
                    <input
                      type="text"
                      value={editingLoc.phone}
                      onChange={(e) => setEditingLoc({ ...editingLoc, phone: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Địa chỉ hành chính chi tiết
                  </label>
                  <input
                    type="text"
                    value={editingLoc.address}
                    onChange={(e) => setEditingLoc({ ...editingLoc, address: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Giờ hoạt động
                  </label>
                  <input
                    type="text"
                    value={editingLoc.hours}
                    onChange={(e) => setEditingLoc({ ...editingLoc, hours: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Ảnh cơ sở phòng khám
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={editingLoc.imageUrl}
                      onChange={(e) => setEditingLoc({ ...editingLoc, imageUrl: e.target.value })}
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
                    Ghi chú / Tình trạng pháp lý
                  </label>
                  <textarea
                    rows={2}
                    value={editingLoc.notes || ""}
                    onChange={(e) => setEditingLoc({ ...editingLoc, notes: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="locMainCheck"
                    checked={editingLoc.isMainFacility}
                    onChange={(e) => setEditingLoc({ ...editingLoc, isMainFacility: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded border-neutral-300 focus:ring-emerald-500"
                  />
                  <label htmlFor="locMainCheck" className="text-xs font-medium text-neutral-800 cursor-pointer">
                    Đặt làm Cơ sở chính / Trụ sở phòng khám
                  </label>
                </div>
              </div>

              <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingLoc(null)}
                  className="px-4 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-100 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
                >
                  Lưu cơ sở
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={!!deleteConfirmId}
        type="danger"
        title="Xóa Cơ sở phòng khám?"
        message="Hành động này sẽ xóa cơ sở khỏi danh sách địa chỉ phòng khám trên website."
        confirmLabel="Xóa"
        cancelLabel="Hủy"
        onConfirm={() => {
          if (deleteConfirmId) {
            deleteLocation(deleteConfirmId);
            setDeleteConfirmId(null);
            showToast("Đã xóa cơ sở!");
          }
        }}
        onCancel={() => setDeleteConfirmId(null)}
      />

      <MediaLibraryModal
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelectMedia={(media) => {
          if (editingLoc) {
            setEditingLoc({ ...editingLoc, imageUrl: media.url });
          }
          setShowMediaPicker(false);
        }}
        title="Chọn ảnh cơ sở từ Media"
      />
    </div>
  );
};
