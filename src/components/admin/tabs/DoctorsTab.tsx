import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Image as ImageIcon,
  GraduationCap,
  Award,
  Calendar,
  Grid,
  List
} from "lucide-react";
import { useDemoData } from "../../../context/DemoDataContext";
import { DoctorProfile, DEFAULT_DOCTOR_AVATAR } from "../../../data/doctors";
import { MediaLibraryModal } from "../MediaLibraryModal";
import { ConfirmationModal } from "../ConfirmationModal";

export const DoctorsTab: React.FC = () => {
  const { doctors, saveDoctor, deleteDoctor, duplicateDoctor, specialties } = useDemoData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [editingDoc, setEditingDoc] = useState<DoctorProfile | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.formalTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.roleAtClinic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === "all" || doc.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());
    return matchesSearch && matchesSpecialty;
  });

  const handleCreateDoctor = () => {
    const newDoc: DoctorProfile = {
      id: `doc-${Date.now()}`,
      name: "Bác sĩ mới",
      degree: "Bác sĩ Chuyên khoa Da liễu",
      formalTitle: "BS. Bác sĩ mới",
      roleAtClinic: "Bác sĩ điều trị",
      specialty: specialties[0]?.name || "Da liễu – Thẩm mỹ Da",
      slug: `bs-moi-${Date.now()}`,
      licenseNumber: "Số CCHN: 098765/CTO-CCHN (Chờ xác nhận)",
      educationHistory: ["Tốt nghiệp Bác sĩ Đa khoa – Đại học Y Dược"],
      certifications: ["Chứng chỉ thực hành Da liễu"],
      experienceYears: 5,
      specialtyStrengths: ["Thăm khám và soi da đa tầng", "Điều trị da liễu thẩm mỹ"],
      philosophy: "Tận tâm chăm sóc sức khỏe làn da cho từng khách hàng.",
      shortSummary: "Bác sĩ chuyên khoa da liễu giàu kinh nghiệm và tận tụy.",
      fullBio: "Bác sĩ trực tiếp thăm khám và lên phác đồ cá nhân hóa chuẩn y khoa.",
      schedule: [{ facility: "Cơ sở Cần Thơ", days: "Thứ 2 - Thứ 7", hours: "08:30 - 18:00" }],
      avatarUrl: DEFAULT_DOCTOR_AVATAR,
      actionImages: [],
      hasConsentForm: true,
      isOfficialApproved: false,
      isVisible: true
    };
    setEditingDoc(newDoc);
  };

  const handleSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoc) return;
    setIsSaving(true);
    const res = await saveDoctor(editingDoc);
    setIsSaving(false);
    if (res.success) {
      showToast(`Đã lưu hồ sơ bác sĩ: "${editingDoc.formalTitle}"!`);
      setEditingDoc(null);
    } else {
      alert("Lỗi khi lưu hồ sơ bác sĩ: " + (res.error || "Không thể kết nối đến cơ sở dữ liệu"));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-neutral-900 font-heading flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-700" />
            <span>Quản lý Đội ngũ Bác sĩ & Chuyên gia</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
            Hồ sơ 100% Bác sĩ trình độ Sau Đại học trực tiếp thăm khám. Quản lý chức danh, học vị, ảnh đại diện, số năm kinh nghiệm và liên kết trang hồ sơ cá nhân.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleCreateDoctor}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Bác sĩ mới</span>
          </button>

          <Link
            to="/doi-ngu-bac-si"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Xem Danh sách Bác sĩ</span>
          </Link>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-fadeIn font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên bác sĩ..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
            />
          </div>

          {/* Specialty filter */}
          <div className="relative shrink-0">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-3 py-1.5 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-hidden font-medium text-neutral-700"
            >
              <option value="all">Tất cả chuyên khoa ({doctors.length})</option>
              {specialties.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl shrink-0 self-end sm:self-center">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-lg transition ${
              viewMode === "grid" ? "bg-white text-emerald-800 shadow-xs" : "text-neutral-500 hover:text-neutral-900"
            }`}
            title="Dạng lưới thẻ"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("table")}
            className={`p-1.5 rounded-lg transition ${
              viewMode === "table" ? "bg-white text-emerald-800 shadow-xs" : "text-neutral-500 hover:text-neutral-900"
            }`}
            title="Dạng bảng chi tiết"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                {/* Avatar and Top Badges */}
                <div className="relative h-56 bg-neutral-100 overflow-hidden">
                  <img
                    src={doc.avatarUrl || DEFAULT_DOCTOR_AVATAR}
                    alt={doc.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = DEFAULT_DOCTOR_AVATAR;
                    }}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 text-emerald-800 shadow-sm border border-neutral-200">
                      {doc.roleAtClinic}
                    </span>
                    {doc.isOfficialApproved ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow-xs">
                        Đã xác nhận
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-xs">
                        Hồ sơ demo
                      </span>
                    )}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 space-y-2">
                  <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
                    {doc.specialty}
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 font-heading">
                    {doc.formalTitle}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span className="truncate">{doc.degree}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                    <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{doc.experienceYears} năm kinh nghiệm chuyên môn</span>
                  </div>
                  <p className="text-xs text-neutral-500 line-clamp-2 pt-1 border-t border-neutral-100">
                    {doc.shortSummary || doc.philosophy}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
                <Link
                  to={`/bs-lac-kim-ngan`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                >
                  <span>Xem hồ sơ</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => duplicateDoctor(doc.id)}
                    className="p-1.5 rounded-lg text-neutral-500 hover:text-purple-700 hover:bg-purple-50 transition"
                    title="Nhân bản bác sĩ này"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingDoc({ ...doc })}
                    className="p-1.5 rounded-lg text-neutral-500 hover:text-blue-700 hover:bg-blue-50 transition"
                    title="Chỉnh sửa hồ sơ"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(doc.id)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition"
                    title="Xóa hồ sơ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs text-neutral-600">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-800 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3">Bác sĩ</th>
                <th className="p-3">Chuyên khoa & Vai trò</th>
                <th className="p-3">Học vị</th>
                <th className="p-3">Kinh nghiệm</th>
                <th className="p-3">Trạng thái</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredDoctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-neutral-50/70 transition">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={doc.avatarUrl || DEFAULT_DOCTOR_AVATAR}
                        alt={doc.name}
                        className="w-10 h-10 rounded-full object-cover border border-neutral-200 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-neutral-900">{doc.formalTitle}</div>
                        <div className="text-[11px] text-neutral-400 font-mono">Slug: {doc.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="font-medium text-neutral-800">{doc.specialty}</div>
                    <div className="text-[11px] text-neutral-500">{doc.roleAtClinic}</div>
                  </td>
                  <td className="p-3">{doc.degree}</td>
                  <td className="p-3">{doc.experienceYears} năm</td>
                  <td className="p-3">
                    {doc.isOfficialApproved ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Chính thức
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                        Demo
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => duplicateDoctor(doc.id)}
                        className="p-1.5 rounded-lg text-neutral-500 hover:text-purple-700 hover:bg-purple-50 transition"
                        title="Nhân bản"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingDoc({ ...doc })}
                        className="p-1.5 rounded-lg text-neutral-500 hover:text-blue-700 hover:bg-blue-50 transition"
                        title="Chỉnh sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(doc.id)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Doctor Modal */}
      {editingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8 overflow-hidden border border-neutral-200">
            <form onSubmit={handleSaveSubmit}>
              <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 font-heading">
                    Chỉnh sửa Hồ sơ Bác sĩ: {editingDoc.formalTitle}
                  </h3>
                  <span className="text-xs text-neutral-400 font-mono">ID: {editingDoc.id}</span>
                </div>
              </div>

              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                {/* Avatar Preview & Picker */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                  <img
                    src={editingDoc.avatarUrl || DEFAULT_DOCTOR_AVATAR}
                    alt={editingDoc.name}
                    className="w-20 h-20 rounded-xl object-cover border border-neutral-300 shrink-0"
                  />
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                      Ảnh đại diện Bác sĩ
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="url"
                        value={editingDoc.avatarUrl}
                        onChange={(e) => setEditingDoc({ ...editingDoc, avatarUrl: e.target.value })}
                        required
                        className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-xl focus:outline-hidden font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowMediaPicker(true)}
                        className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl shrink-0 transition"
                      >
                        Chọn từ Media
                      </button>
                    </div>
                    <span className="text-[11px] text-neutral-400 block">
                      Khuyến nghị ảnh chân dung đứng tỉ lệ 3:4 hoặc 1:1, phông nền sáng chuẩn y khoa.
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Họ và tên bác sĩ
                    </label>
                    <input
                      type="text"
                      value={editingDoc.name}
                      onChange={(e) => setEditingDoc({ ...editingDoc, name: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Danh xưng & Tên đầy đủ
                    </label>
                    <input
                      type="text"
                      value={editingDoc.formalTitle}
                      onChange={(e) => setEditingDoc({ ...editingDoc, formalTitle: e.target.value })}
                      placeholder="ThS.BS. Lạc Kim Ngân"
                      required
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Học vị chuyên môn
                    </label>
                    <input
                      type="text"
                      value={editingDoc.degree}
                      onChange={(e) => setEditingDoc({ ...editingDoc, degree: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Vai trò tại phòng khám
                    </label>
                    <input
                      type="text"
                      value={editingDoc.roleAtClinic}
                      onChange={(e) => setEditingDoc({ ...editingDoc, roleAtClinic: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Chuyên khoa
                    </label>
                    <select
                      value={editingDoc.specialty}
                      onChange={(e) => setEditingDoc({ ...editingDoc, specialty: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl bg-white focus:outline-hidden"
                    >
                      {specialties.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Số năm kinh nghiệm
                    </label>
                    <input
                      type="number"
                      value={editingDoc.experienceYears}
                      onChange={(e) => setEditingDoc({ ...editingDoc, experienceYears: Number(e.target.value) })}
                      min={1}
                      max={50}
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Tóm tắt ngắn (Hiển thị thẻ trang chủ)
                  </label>
                  <textarea
                    rows={2}
                    value={editingDoc.shortSummary}
                    onChange={(e) => setEditingDoc({ ...editingDoc, shortSummary: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Triết lý điều trị
                  </label>
                  <textarea
                    rows={2}
                    value={editingDoc.philosophy}
                    onChange={(e) => setEditingDoc({ ...editingDoc, philosophy: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden resize-none"
                  />
                </div>

                <div className="flex items-center gap-4 pt-2 border-t border-neutral-100">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="docApprovedCheck"
                      checked={editingDoc.isOfficialApproved}
                      onChange={(e) => setEditingDoc({ ...editingDoc, isOfficialApproved: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 rounded border-neutral-300 focus:ring-emerald-500"
                    />
                    <label htmlFor="docApprovedCheck" className="text-xs font-medium text-neutral-800 cursor-pointer">
                      Hồ sơ đã được phê duyệt y khoa chính thức
                    </label>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingDoc(null)}
                  className="px-4 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-100 transition"
                >
                  Hủy bỏ
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
                    <span>Lưu hồ sơ Bác sĩ</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deleteConfirmId}
        type="danger"
        title="Xóa hồ sơ Bác sĩ?"
        message="Hành động này sẽ xóa bác sĩ khỏi danh sách chuyên gia và các thẻ liên quan trên website."
        confirmLabel="Xóa Bác sĩ"
        cancelLabel="Hủy bỏ"
        onConfirm={async () => {
          if (deleteConfirmId) {
            const id = deleteConfirmId;
            setDeleteConfirmId(null);
            const res = await deleteDoctor(id);
            if (res.success) {
              showToast("Đã xóa hồ sơ bác sĩ thành công!");
            } else {
              alert("Lỗi khi xóa hồ sơ bác sĩ: " + (res.error || "Không thể xóa"));
            }
          }
        }}
        onCancel={() => setDeleteConfirmId(null)}
      />

      {/* Media Picker Modal */}
      <MediaLibraryModal
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelectMedia={(media) => {
          if (editingDoc) {
            setEditingDoc({ ...editingDoc, avatarUrl: media.url, altText: editingDoc.altText || media.alt });
          }
          setShowMediaPicker(false);
        }}
        title="Chọn ảnh đại diện Bác sĩ từ Media"
      />
    </div>
  );
};
