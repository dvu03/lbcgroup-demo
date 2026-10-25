import React, { useState } from "react";
import {
  Scale,
  Save,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  ShieldAlert,
  Info
} from "lucide-react";
import { useDemoData } from "../../../context/DemoDataContext";
import { SiteConfig } from "../../../data/siteConfig";

export const LegalInfoTab: React.FC = () => {
  const { siteConfig, updateSiteConfig } = useDemoData();
  const [formData, setFormData] = useState<SiteConfig>({ ...siteConfig });
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const res = await updateSiteConfig(formData);
    setIsSaving(false);
    if (res.success) {
      showToast("Đã lưu thông tin pháp lý phòng khám thành công vào Neon PostgreSQL!");
    } else {
      alert("Lỗi khi lưu thông tin: " + (res.error || "Không thể kết nối đến cơ sở dữ liệu"));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-neutral-900 font-heading flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-700" />
            <span>Thông Tin Pháp Nhân & Hồ Sơ Pháp Lý Y Tế</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
            Quy định minh bạch thông tin pháp nhân doanh nghiệp, giấy phép hoạt động khám chữa bệnh và bác sĩ chịu trách nhiệm chuyên môn kỹ thuật theo quy định của Sở Y tế.
          </p>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-fadeIn font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Warning Notice about Demo Data */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-900">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block mb-0.5">Lưu ý tuân thủ pháp lý y khoa:</span>
          <span>
            Các trường giấy phép hoạt động và chứng chỉ hành nghề (CCHN) hiện tại mang tính chất mô phỏng demo. Khi triển khai hệ thống chính thức với đối tác Sapo, doanh nghiệp bắt buộc cập nhật chính xác số giấy phép do Sở Y tế TP. Cần Thơ cấp theo hồ sơ pháp lý thực tế.
          </span>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
            <FileCheck className="w-4 h-4 text-emerald-700" />
            <h3 className="font-bold text-neutral-900 text-sm font-heading">
              Pháp Nhân Doanh Nghiệp & Giấy Phép
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                Tên pháp nhân công ty
              </label>
              <input
                type="text"
                value={formData.legalEntity}
                onChange={(e) => setFormData({ ...formData, legalEntity: e.target.value })}
                required
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                Tên cơ sở khám bệnh, chữa bệnh
              </label>
              <input
                type="text"
                value={formData.facilityName}
                onChange={(e) => setFormData({ ...formData, facilityName: e.target.value })}
                required
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                Tên miền website chính thức
              </label>
              <input
                type="text"
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                required
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                Người chịu trách nhiệm chuyên môn kỹ thuật
              </label>
              <input
                type="text"
                defaultValue="ThS.BS. Lạc Kim Ngân (Giám đốc Chuyên môn)"
                readOnly
                className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-600"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl shadow-md transition"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Đang lưu vào Neon...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Lưu Thông tin Pháp lý</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
