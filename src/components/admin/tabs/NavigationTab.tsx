import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Layers,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { useDemoData } from "../../../context/DemoDataContext";
import { NavItem } from "../../../data/navigation";
import { ConfirmationModal } from "../ConfirmationModal";

export const NavigationTab: React.FC = () => {
  const { navItems, saveNavItem, deleteNavItem } = useDemoData();
  const [editingItem, setEditingItem] = useState<NavItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleCreateNew = () => {
    const newItem: NavItem = {
      id: `nav-${Date.now()}`,
      title: "Menu mới",
      path: "/duong-dan-moi",
      children: []
    };
    setEditingItem(newItem);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setIsSaving(true);
    const res = await saveNavItem(editingItem);
    setIsSaving(false);
    if (res.success) {
      showToast(`Đã lưu menu: "${editingItem.title}"!`);
      setEditingItem(null);
    } else {
      alert("Lỗi khi lưu menu: " + (res.error || "Không thể kết nối đến cơ sở dữ liệu"));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-neutral-900 font-heading flex items-center gap-2">
            <Menu className="w-5 h-5 text-emerald-700" />
            <span>Quản lý Menu & Điều hướng Website</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
            Cấu hình các liên kết điều hướng trên thanh Navbar chính (Desktop & Mobile). Hỗ trợ menu đơn giản, menu cấp 2 dạng dropdown và Mega Menu động theo Chuyên khoa/Dịch vụ.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleCreateNew}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Mục Menu</span>
          </button>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-fadeIn font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Nav Items List */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="divide-y divide-neutral-200">
          {navItems.map((item, index) => (
            <div
              key={item.id}
              className="p-4 hover:bg-neutral-50/50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-neutral-100 text-neutral-600 font-bold text-xs flex items-center justify-center shrink-0">
                  {index + 1}
                </span>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-neutral-900">{item.title}</span>
                    {item.isMega && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                        Mega Menu: {item.megaType}
                      </span>
                    )}
                    {item.children && item.children.length > 0 && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-100 text-neutral-700">
                        {item.children.length} menu con
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-neutral-400 font-mono">{item.path}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => setEditingItem({ ...item })}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-blue-700 hover:bg-blue-50 transition"
                  title="Chỉnh sửa menu"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(item.id)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition"
                  title="Xóa menu"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full my-8 overflow-hidden border border-neutral-200">
            <form onSubmit={handleSave}>
              <div className="p-5 border-b border-neutral-200">
                <h3 className="text-base font-bold text-neutral-900 font-heading">
                  Chỉnh sửa Menu: {editingItem.title}
                </h3>
              </div>

              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto text-xs">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Nhãn hiển thị menu
                  </label>
                  <input
                    type="text"
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Đường dẫn liên kết (Path)
                  </label>
                  <input
                    type="text"
                    value={editingItem.path}
                    onChange={(e) => setEditingItem({ ...editingItem, path: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isMegaCheck"
                    checked={editingItem.isMega || false}
                    onChange={(e) => setEditingItem({ ...editingItem, isMega: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded border-neutral-300 focus:ring-emerald-500"
                  />
                  <label htmlFor="isMegaCheck" className="text-xs font-medium text-neutral-800 cursor-pointer">
                    Bật chế độ Mega Menu động
                  </label>
                </div>

                {editingItem.isMega && (
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Loại dữ liệu Mega Menu
                    </label>
                    <select
                      value={editingItem.megaType || "services"}
                      onChange={(e) => setEditingItem({ ...editingItem, megaType: e.target.value as any })}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl bg-white"
                    >
                      <option value="specialties">Chuyên khoa (Specialties)</option>
                      <option value="services">Dịch vụ (Services)</option>
                      <option value="brands">Thương hiệu (Brands)</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
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
                    <span>Lưu Menu</span>
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
        title="Xóa mục Menu này?"
        message="Hành động này sẽ xóa liên kết khỏi thanh điều hướng chính của website."
        confirmLabel="Xóa Menu"
        cancelLabel="Hủy"
        onConfirm={async () => {
          if (deleteConfirmId) {
            const id = deleteConfirmId;
            setDeleteConfirmId(null);
            const res = await deleteNavItem(id);
            if (res.success) {
              showToast("Đã xóa mục menu!");
            } else {
              alert("Lỗi khi xóa menu: " + (res.error || "Không thể xóa"));
            }
          }
        }}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
