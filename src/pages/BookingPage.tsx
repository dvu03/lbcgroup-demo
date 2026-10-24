import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDemoData } from "../context/DemoDataContext";
import { PageHeroBanner } from "../components/common/PageHeroBanner";
import { SEOHead } from "../components/common/SEOHead";
import {
  Calendar,
  Clock,
  User,
  Phone,
  MapPin,
  Stethoscope,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  FileText
} from "lucide-react";

export default function BookingPage() {
  const { services, doctors, locations, addLead } = useDemoData();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: services[0]?.name || "Điều trị mụn chuẩn Y khoa",
    facility: "Cơ sở 01: 231T, Đường 3/2, P. Tân An, Cần Thơ",
    doctor: "Bác sĩ chỉ định phù hợp nhất",
    date: new Date().toISOString().split("T")[0],
    time: "09:00 - 10:00",
    note: "",
    consent: true
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successInfo, setSuccessInfo] = useState<{ id: string; name: string; phone: string; service: string; date: string; time: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim()) {
      setErrorMsg("Vui lòng nhập họ và tên của bạn.");
      return;
    }

    if (!formData.phone.trim() || formData.phone.length < 9) {
      setErrorMsg("Vui lòng nhập số điện thoại hợp lệ (tối thiểu 9 chữ số).");
      return;
    }

    if (!formData.consent) {
      setErrorMsg("Vui lòng đồng ý với chính sách xử lý dữ liệu y tế cá nhân để tiếp tục.");
      return;
    }

    // Save lead to LocalStorage context
    const lead = addLead({
      name: formData.name,
      phone: formData.phone,
      service: formData.service,
      facility: formData.facility,
      date: formData.date,
      time: formData.time,
      note: `Bác sĩ yêu cầu: ${formData.doctor} | Ghi chú: ${formData.note}`
    });

    setSuccessInfo({
      id: lead.id,
      name: formData.name,
      phone: formData.phone,
      service: formData.service,
      date: formData.date,
      time: formData.time
    });
  };

  return (
    <>
      <SEOHead
        title="Đặt Lịch Khám Da Liễu | Phòng Khám Lạc's Beauty Center"
        description="Đăng ký lịch khám và soi da trực tiếp cùng Bác sĩ Chuyên khoa Da liễu Lạc's Beauty Center tại Cần Thơ. Đặt hẹn nhanh chóng, không chờ đợi lâu."
      />

      <PageHeroBanner
        pageId="dat-lich-kham"
        breadcrumbLabel="Đặt lịch khám"
        defaultBadge="Dịch vụ y tế tận tâm"
        defaultTitle="Đặt Lịch Khám & Soi Da VISIA 3D Đa Tầng"
        defaultDescription="Chủ động chọn bác sĩ, khung giờ và cơ sở mong muốn. 100% ca khám và điều trị được thực hiện trực tiếp bởi Bác sĩ Chuyên khoa Da liễu trình độ sau đại học."
      />

      <section className="py-16 bg-slate-50 min-h-[70vh]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            
            {/* Medical compliance alert */}
            <div className="mb-8 p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 text-xs md:text-sm flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <strong>Quy trình tiếp nhận chuẩn Y khoa:</strong> Sau khi đăng ký, nhân viên y tế sẽ liên hệ xác nhận khung giờ trong vòng 15 phút. Khi đến phòng khám, quý khách sẽ được soi da đa tầng và lập bệnh án điện tử cá nhân hóa.
              </div>
            </div>

            {successInfo ? (
              /* Success Confirmation Card */
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-teal-200 text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-2">
                  Đăng Ký Đặt Hẹn Thành Công!
                </h2>
                <p className="text-slate-600 text-sm md:text-base max-w-lg mx-auto mb-8">
                  Cảm ơn quý khách <strong>{successInfo.name}</strong> đã tin tưởng lựa chọn Lạc's Beauty Center. Thông tin lịch hẹn của quý khách đã được ghi nhận:
                </p>

                <div className="bg-slate-50 rounded-2xl p-6 max-w-md mx-auto text-left space-y-3 text-xs md:text-sm mb-8 border border-slate-200">
                  <div className="flex justify-between border-b border-slate-200/80 pb-2">
                    <span className="text-slate-500">Mã phiếu hẹn:</span>
                    <strong className="text-primary-800 font-mono">{successInfo.id}</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/80 pb-2">
                    <span className="text-slate-500">Dịch vụ:</span>
                    <strong className="text-slate-800 text-right">{successInfo.service}</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/80 pb-2">
                    <span className="text-slate-500">Thời gian hẹn:</span>
                    <strong className="text-slate-800">{successInfo.time} ({successInfo.date})</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Số điện thoại:</span>
                    <strong className="text-slate-800">{successInfo.phone}</strong>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => setSuccessInfo(null)}
                    className="btn-outline text-xs"
                  >
                    Đặt thêm lịch hẹn khác
                  </button>
                  <Link to="/demo-admin" className="btn-primary text-xs">
                    Xem danh sách lead trong Demo Admin
                  </Link>
                </div>
              </div>
            ) : (
              /* Booking Form Card */
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-sm border border-slate-200/80">
                <div className="mb-6 sm:mb-8 border-b border-slate-100 pb-4 sm:pb-6">
                  <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 mb-1">
                    Thông Tin Phiếu Đặt Hẹn
                  </h2>
                  <p className="text-xs md:text-sm text-slate-500">
                    Vui lòng điền đầy đủ các mục đánh dấu (*) để chúng tôi sắp xếp bác sĩ chuyên môn phù hợp nhất.
                  </p>
                </div>

                {errorMsg && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs md:text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Họ và tên khách hàng <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          placeholder="Ví dụ: Nguyễn Thị Mai"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50/50"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Số điện thoại liên hệ <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          placeholder="Ví dụ: 0939 123 456"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50/50"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Service Selection */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Dịch vụ điều trị quan tâm <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50/50"
                      >
                        {services.map((svc) => (
                          <option key={svc.id} value={svc.name}>
                            {svc.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Facility Selection */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Cơ sở tiếp nhận khám <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.facility}
                        onChange={(e) => setFormData({ ...formData, facility: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50/50"
                      >
                        {locations.map((loc) => (
                          <option key={loc.id} value={`${loc.name}: ${loc.address}`}>
                            {loc.name} {loc.isMainFacility ? "(Trụ sở chính Cần Thơ)" : "(Đang hoàn thiện)"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Preferred Doctor */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Bác sĩ mong muốn (Tùy chọn)
                      </label>
                      <select
                        value={formData.doctor}
                        onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50/50"
                      >
                        <option value="Bác sĩ chỉ định phù hợp nhất">Bác sĩ chỉ định phù hợp nhất</option>
                        {doctors.map((doc) => (
                          <option key={doc.id} value={`${doc.formalTitle || doc.degree} ${doc.name}`}>
                            {doc.formalTitle || `${doc.degree} ${doc.name}`}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Ngày khám dự kiến
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50/50"
                      />
                    </div>

                    {/* Time Slot */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Khung giờ thuận tiện
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50/50"
                      >
                        <option value="08:00 - 09:00">08:00 - 09:00 (Sáng)</option>
                        <option value="09:00 - 10:00">09:00 - 10:00 (Sáng)</option>
                        <option value="10:00 - 11:30">10:00 - 11:30 (Trưa)</option>
                        <option value="13:30 - 15:00">13:30 - 15:00 (Chiều)</option>
                        <option value="15:00 - 17:00">15:00 - 17:00 (Chiều)</option>
                        <option value="17:00 - 19:30">17:00 - 19:30 (Tối)</option>
                      </select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Mô tả sơ lược tình trạng da hoặc yêu cầu đặc biệt
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Ví dụ: Mụn viêm nhiều ở vùng má, đã dùng thuốc bôi 2 tháng không đỡ..."
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50/50"
                    />
                  </div>

                  {/* Consent checkbox (Required) */}
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500"
                    />
                    <label htmlFor="consent" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                      Tôi đồng ý để Phòng khám Chuyên khoa Da liễu Lạc's Beauty Center lưu trữ thông tin liên hệ và tình trạng da nhằm phục vụ việc tư vấn, nhắc lịch hẹn y khoa theo quy định bảo mật thông tin người bệnh. <span className="text-red-500">*</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="submit"
                      className="btn-primary w-full sm:w-auto px-8 py-3.5 text-base flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-5 h-5" />
                      <span>Xác nhận gửi đăng ký khám</span>
                    </button>
                    <span className="text-xs text-slate-400">
                      * Hoặc gọi trực tiếp: <strong className="text-primary-700">0939 123 456</strong>
                    </span>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      </section>
    </>
  );
}
