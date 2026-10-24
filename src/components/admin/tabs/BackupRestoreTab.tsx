import React, { useState } from "react";
import {
  HardDriveDownload,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ShieldCheck,
  FileCode,
  Copy,
  Database,
  RefreshCw,
  Key,
  Server
} from "lucide-react";
import { useDemoData } from "../../../context/DemoDataContext";
import { ConfirmationModal } from "../ConfirmationModal";

export const BackupRestoreTab: React.FC = () => {
  const {
    exportJSON,
    importJSON,
    resetToDefaults,
    doctors,
    services,
    products,
    heroSlides,
    articles,
    siteConfig,
    dbStatus,
    syncStatus,
    adminToken,
    setAdminToken,
    syncAllToNeon
  } = useDemoData();

  const [importJsonText, setImportJsonText] = useState("");
  const [parsedPreview, setParsedPreview] = useState<{
    doctors?: number;
    services?: number;
    products?: number;
    heroSlides?: number;
    articles?: number;
    siteConfigName?: string;
  } | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);
  const [showResetDefaultConfirm, setShowResetDefaultConfirm] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [isSyncingNeon, setIsSyncingNeon] = useState(false);
  const [isTestingDb, setIsTestingDb] = useState(false);
  const [healthStatus, setHealthStatus] = useState<string | null>(null);
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [tempToken, setTempToken] = useState(adminToken);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSyncNeon = async () => {
    setIsSyncingNeon(true);
    try {
      const res = await syncAllToNeon();
      showToast(res.message);
    } catch (e: any) {
      showToast("Lỗi đồng bộ: " + e.message);
    } finally {
      setIsSyncingNeon(false);
    }
  };

  const handleTestHealth = async () => {
    setIsTestingDb(true);
    setHealthStatus(null);
    try {
      const res = await fetch("/api/health");
      const data = await res.json();
      if (res.ok && data.status === "ok") {
        setHealthStatus(`✅ Kết nối Neon PostgreSQL thành công! (PG: ${data.timestamp || "Active"})`);
        showToast("Kết nối cơ sở dữ liệu Neon hoạt động hoàn hảo!");
      } else {
        setHealthStatus(`❌ Không thể kết nối: ${data.error || "Lỗi máy chủ"}`);
        showToast("Lỗi kết nối Neon DB: " + (data.error || "Không rõ"));
      }
    } catch (e: any) {
      setHealthStatus(`❌ Lỗi API: ${e.message}`);
      showToast("Lỗi kết nối API: " + e.message);
    } finally {
      setIsTestingDb(false);
    }
  };

  const handleSaveToken = () => {
    setAdminToken(tempToken);
    setShowTokenInput(false);
    showToast("Đã lưu khóa bảo mật Admin Secret!");
  };

  const handleDownloadBackup = () => {
    const jsonString = exportJSON();
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `lacs-beauty-cms-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("Đã tải xuống gói sao lưu JSON thành công!");
  };

  const handleCopyJSON = () => {
    const jsonString = exportJSON();
    navigator.clipboard.writeText(jsonString);
    showToast("Đã sao chép toàn bộ chuỗi JSON vào bộ nhớ đệm!");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setImportJsonText(text);
      validateJSON(text);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const validateJSON = (rawText: string) => {
    setValidationError(null);
    setParsedPreview(null);

    if (!rawText.trim()) return;

    try {
      const data = JSON.parse(rawText);
      if (!data || typeof data !== "object") {
        setValidationError("Dữ liệu JSON không hợp lệ (không phải là một Object).");
        return;
      }

      setParsedPreview({
        doctors: Array.isArray(data.doctors) ? data.doctors.length : 0,
        services: Array.isArray(data.services) ? data.services.length : 0,
        products: Array.isArray(data.products) ? data.products.length : 0,
        heroSlides: Array.isArray(data.heroSlides) ? data.heroSlides.length : 0,
        articles: Array.isArray(data.articles) ? data.articles.length : 0,
        siteConfigName: data.siteConfig?.brandName || "Không xác định"
      });
    } catch (err: any) {
      setValidationError(`Lỗi cú pháp JSON: ${err.message}`);
    }
  };

  const handleExecuteRestore = () => {
    try {
      const success = importJSON(importJsonText);
      if (success) {
        setShowRestoreConfirm(false);
        setImportJsonText("");
        setParsedPreview(null);
        showToast("Đã phục hồi dữ liệu CMS thành công!");
      } else {
        setValidationError("Cấu trúc JSON không chứa các trường dữ liệu CMS hợp lệ.");
      }
    } catch (err: any) {
      setValidationError(`Lỗi phục hồi: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-neutral-900 font-heading flex items-center gap-2">
            <HardDriveDownload className="w-5 h-5 text-emerald-700" />
            <span>Sao Lưu & Phục Hồi Dữ Liệu CMS Toàn Diện (JSON)</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
            Cho phép xuất toàn bộ nội dung (Bác sĩ, Dịch vụ, Dược mỹ phẩm, Banner, Bố cục) ra file JSON để lưu trữ hoặc chuyển đổi giữa các trình duyệt. Đồng thời hỗ trợ khôi phục về trạng thái gốc chuẩn Sapo theme.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setShowResetDefaultConfirm(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Khôi phục Cài đặt gốc</span>
          </button>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-fadeIn font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Neon Cloud Database Sync Card */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-neutral-900 text-sm font-heading">
                  Cơ Sở Dữ Liệu Đám Mây Neon PostgreSQL
                </h3>
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                    dbStatus === "connected"
                      ? "bg-emerald-100 text-emerald-800"
                      : dbStatus === "syncing"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {dbStatus === "connected" ? "🟢 Đã kết nối" : dbStatus === "syncing" ? "⏳ Đang kết nối" : "🟡 Cục bộ (Offline)"}
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                Dữ liệu được lưu trữ tự động trên máy chủ Neon PostgreSQL (4 bảng: <code>cms_content</code>, <code>media_library</code>, <code>booking_leads</code>, <code>audit_logs</code>).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              disabled={isTestingDb}
              onClick={handleTestHealth}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition"
            >
              {isTestingDb ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Server className="w-3.5 h-3.5" />}
              <span>Kiểm tra /api/health</span>
            </button>
            <button
              type="button"
              disabled={isSyncingNeon}
              onClick={handleSyncNeon}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 rounded-xl shadow-xs transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncingNeon ? "animate-spin" : ""}`} />
              <span>{isSyncingNeon ? "Đang đẩy lên Neon..." : "Đồng bộ toàn bộ lên Neon DB"}</span>
            </button>
          </div>
        </div>

        {healthStatus && (
          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-700 flex items-center justify-between">
            <span>{healthStatus}</span>
            <button
              type="button"
              onClick={() => setHealthStatus(null)}
              className="text-neutral-400 hover:text-neutral-600 text-[11px]"
            >
              Đóng
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-1">
          <div className="text-neutral-500">
            Trạng thái ghi tự động: <span className="font-semibold text-neutral-800">{syncStatus === "saving" ? "Đang gửi thay đổi..." : syncStatus === "saved" ? "Mọi thay đổi đã lưu lên Neon" : "Chưa đồng bộ"}</span>
          </div>

          <div className="flex items-center gap-2">
            {!showTokenInput ? (
              <button
                type="button"
                onClick={() => setShowTokenInput(true)}
                className="text-[11px] font-semibold text-emerald-700 hover:underline flex items-center gap-1"
              >
                <Key className="w-3 h-3" />
                <span>Cấu hình Admin Secret Token</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  value={tempToken}
                  onChange={(e) => setTempToken(e.target.value)}
                  placeholder="Nhập ADMIN_SECRET"
                  className="px-2.5 py-1 text-xs border border-neutral-300 rounded-lg focus:outline-hidden focus:border-emerald-600"
                />
                <button
                  type="button"
                  onClick={handleSaveToken}
                  className="px-2.5 py-1 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg"
                >
                  Lưu
                </button>
                <button
                  type="button"
                  onClick={() => setShowTokenInput(false)}
                  className="text-xs text-neutral-500 hover:text-neutral-700"
                >
                  Hủy
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Two Columns: Export on Left, Import on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Card */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
              <Download className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-neutral-900 text-sm font-heading">
                Xuất Gói Dữ Liệu CMS Hiện Tại
              </h3>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Tạo bản sao lưu toàn bộ dữ liệu đang hoạt động trên website. Gói dữ liệu bao gồm:
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                <span className="text-neutral-500">Bác sĩ chuyên gia:</span>
                <span className="font-bold text-neutral-900 ml-1">{doctors.length} bản ghi</span>
              </div>
              <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                <span className="text-neutral-500">Dịch vụ điều trị:</span>
                <span className="font-bold text-neutral-900 ml-1">{services.length} bản ghi</span>
              </div>
              <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                <span className="text-neutral-500">Sản phẩm dược mỹ phẩm:</span>
                <span className="font-bold text-neutral-900 ml-1">{products.length} bản ghi</span>
              </div>
              <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                <span className="text-neutral-500">Hero Banners & Slide:</span>
                <span className="font-bold text-neutral-900 ml-1">{heroSlides.length} bản ghi</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100 flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadBackup}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition"
            >
              <Download className="w-4 h-4" />
              <span>Tải file JSON về máy</span>
            </button>
            <button
              type="button"
              onClick={handleCopyJSON}
              className="px-3.5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-xs rounded-xl transition"
              title="Sao chép nội dung JSON"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Import & Restore Card */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
              <Upload className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-neutral-900 text-sm font-heading">
                Phục Hồi Dữ Liệu Từ JSON
              </h3>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Tải file backup JSON hoặc dán chuỗi JSON vào ô bên dưới. Hệ thống sẽ kiểm tra cú pháp và hiển thị số lượng bản ghi trước khi ghi đè.
            </p>

            {/* File upload button */}
            <div>
              <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-xl text-xs font-semibold text-neutral-700 cursor-pointer transition">
                <Upload className="w-3.5 h-3.5" />
                <span>Chọn file .json từ máy tính</span>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Textarea */}
            <textarea
              rows={4}
              value={importJsonText}
              onChange={(e) => {
                setImportJsonText(e.target.value);
                validateJSON(e.target.value);
              }}
              placeholder="Hoặc dán chuỗi JSON đã xuất tại đây..."
              className="w-full p-2.5 text-xs font-mono border border-neutral-300 rounded-xl focus:outline-hidden resize-none"
            />

            {/* Validation Error */}
            {validationError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2 font-medium">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Diff Preview */}
            {parsedPreview && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-1">
                <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Cấu trúc JSON hợp lệ & Sẵn sàng phục hồi:</span>
                </div>
                <div className="text-emerald-800 grid grid-cols-2 gap-1 pt-1 text-[11px]">
                  <span>&bull; Thương hiệu: <strong>{parsedPreview.siteConfigName}</strong></span>
                  <span>&bull; Bác sĩ: <strong>{parsedPreview.doctors}</strong></span>
                  <span>&bull; Dịch vụ: <strong>{parsedPreview.services}</strong></span>
                  <span>&bull; Sản phẩm: <strong>{parsedPreview.products}</strong></span>
                  <span>&bull; Hero Slide: <strong>{parsedPreview.heroSlides}</strong></span>
                  <span>&bull; Bài viết: <strong>{parsedPreview.articles}</strong></span>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-neutral-100">
            <button
              type="button"
              disabled={!parsedPreview || !!validationError}
              onClick={() => setShowRestoreConfirm(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-xs transition"
            >
              <Upload className="w-4 h-4" />
              <span>Xác nhận Phục hồi dữ liệu này</span>
            </button>
          </div>
        </div>
      </div>

      {/* Restore Confirmation Modal */}
      <ConfirmationModal
        isOpen={showRestoreConfirm}
        type="warning"
        title="Ghi đè dữ liệu CMS từ gói sao lưu?"
        message="Hành động này sẽ thay thế toàn bộ danh mục Bác sĩ, Dịch vụ, Dược mỹ phẩm và Bố cục hiện tại bằng dữ liệu từ file sao lưu."
        confirmLabel="Tiến hành phục hồi"
        cancelLabel="Hủy bỏ"
        onConfirm={handleExecuteRestore}
        onCancel={() => setShowRestoreConfirm(false)}
      />

      {/* Reset Default Confirmation Modal */}
      <ConfirmationModal
        isOpen={showResetDefaultConfirm}
        type="danger"
        title="Khôi phục toàn bộ Cài đặt gốc chuẩn Theme?"
        message="Hành động này sẽ xóa các chỉnh sửa cá nhân và đưa toàn bộ website về dữ liệu ban đầu chuẩn theo Brief và theme Sapo."
        confirmLabel="Khôi phục gốc"
        cancelLabel="Hủy bỏ"
        onConfirm={() => {
          resetToDefaults();
          setShowResetDefaultConfirm(false);
          showToast("Đã khôi phục toàn bộ dữ liệu về cài đặt gốc!");
        }}
        onCancel={() => setShowResetDefaultConfirm(false)}
      />
    </div>
  );
};
