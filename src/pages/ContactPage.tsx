import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDemoData } from "../context/DemoDataContext";
import { PageHeroBanner } from "../components/common/PageHeroBanner";
import { SEOHead } from "../components/common/SEOHead";
import { SectionTitle } from "../components/common/SectionTitle";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building,
  ShieldAlert,
  ArrowRight
} from "lucide-react";

export default function ContactPage() {
  const { siteInfo, locations, addLead } = useDemoData();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Tư vấn dịch vụ da liễu",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    addLead({
      name: formData.name,
      phone: formData.phone,
      service: formData.subject,
      facility: "CS01 - Cần Thơ",
      note: `Email: ${formData.email} | Nội dung: ${formData.message}`
    });

    setSubmitted(true);
  };

  return (
    <>
      <SEOHead
        title="Liên Hệ & Bản Đồ Chỉ Đường | Phòng Khám Lạc's Beauty Center"
        description="Thông tin liên hệ, hotline, email và bản đồ hệ thống 2 cơ sở Phòng khám Chuyên khoa Da liễu Lạc's Beauty Center tại Cần Thơ."
      />

      <PageHeroBanner
        pageId="lien-he"
        breadcrumbLabel="Liên hệ"
        defaultBadge="Kết nối cùng Lạc's"
        defaultTitle="Thông Tin Liên Hệ & Hỗ Trợ Khách Hàng"
        defaultDescription="Đội ngũ chuyên viên tư vấn và bác sĩ da liễu luôn sẵn sàng lắng nghe, giải đáp mọi băn khoăn về tình trạng làn da của bạn."
      />

      <section className="py-16 bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Col: Locations & Clinic Info (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Corporate Legal Info */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-2xl bg-primary-50 text-primary-700">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-lg md:text-xl text-slate-900">
                      {siteInfo.legalEntity}
                    </h2>
                    <p className="text-xs text-primary-700 font-semibold uppercase tracking-wider">
                      {siteInfo.facilityName}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm text-slate-600 mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary-600 shrink-0" />
                    <span>Hotline: <strong className="text-slate-900">{siteInfo.hotline}</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary-600 shrink-0" />
                    <span>Email: <strong className="text-slate-900">{siteInfo.email}</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-primary-600 shrink-0" />
                    <span>Giờ khám: <strong className="text-slate-900">{siteInfo.operatingHours}</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-primary-600 shrink-0" />
                    <span>Khu vực: <strong className="text-slate-900">TP. Cần Thơ, Miền Tây</strong></span>
                  </div>
                </div>
              </div>

              {/* 2 Facility Cards */}
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-xl text-slate-900">
                  Hệ Thống Cơ Sở Khám Chữa Bệnh
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {locations.map((loc) => (
                    <div
                      key={loc.id}
                      className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col relative overflow-hidden"
                    >
                      {loc.isMainFacility && (
                        <span className="absolute top-0 right-0 bg-primary-700 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                          Trụ sở chính
                        </span>
                      )}
                      
                      <h4 className="font-serif font-bold text-slate-900 text-base mb-2">
                        {loc.name}
                      </h4>
                      <div className="flex items-start gap-2 text-xs text-slate-600 mb-3 leading-relaxed">
                        <MapPin className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                        <span>{loc.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600 mb-4">
                        <Phone className="w-3.5 h-3.5 text-primary-600 shrink-0" />
                        <span>{loc.phone}</span>
                      </div>

                      {loc.notes && (
                        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-amber-700 bg-amber-50/60 -mx-6 -mb-6 p-3">
                          <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                          <span>{loc.notes}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Preview */}
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm p-4">
                <div className="flex items-center justify-between mb-3 px-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Bản đồ vị trí Cơ sở 01 Cần Thơ
                  </span>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-primary-700 font-semibold hover:underline flex items-center gap-1"
                  >
                    Xem trên Google Maps <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
                <div className="aspect-[16/9] rounded-2xl bg-slate-100 overflow-hidden relative border border-slate-200">
                  <iframe
                    title="Bản đồ Lạc's Beauty Center"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.841517726477!2d105.76842777589578!3d10.02993897251322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0629f6de3edb7%3A0x527f0d0501460599!2zxJDGsOG7nW5nIDMvMiwgTmluaCBLaeG7gXUsIEPhuqduIFRoxqEsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                  />
                </div>
              </div>

            </div>

            {/* Right Col: Contact Message Form (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md sticky top-28">
                <h3 className="font-serif font-bold text-2xl text-slate-900 mb-2">
                  Gửi Tin Nhắn Cho Phòng Khám
                </h3>
                <p className="text-xs md:text-sm text-slate-500 mb-6">
                  Để lại thông tin, đội ngũ chăm sóc khách hàng và tư vấn viên y khoa sẽ liên hệ hỗ trợ trong vòng 15 phút làm việc.
                </p>

                {submitted ? (
                  <div className="p-6 rounded-2xl bg-teal-50 border border-teal-200 text-center">
                    <CheckCircle2 className="w-12 h-12 text-teal-600 mx-auto mb-3" />
                    <h4 className="font-bold text-teal-950 text-base mb-1">Đã Gửi Thành Công!</h4>
                    <p className="text-teal-800 text-xs md:text-sm mb-4">
                      Thông tin liên hệ của quý khách đã được ghi nhận vào hệ thống demo. Tư vấn viên sẽ gọi lại số <strong>{formData.phone}</strong> sớm nhất.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", phone: "", email: "", subject: "Tư vấn dịch vụ da liễu", message: "" });
                      }}
                      className="btn-outline text-xs"
                    >
                      Gửi tin nhắn khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Họ và tên của bạn <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: Nguyễn Văn A"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Số điện thoại liên hệ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Ví dụ: 0912 345 678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Địa chỉ Email
                      </label>
                      <input
                        type="email"
                        placeholder="email@example.com (tùy chọn)"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Nội dung quan tâm
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50/50"
                      >
                        <option value="Tư vấn dịch vụ da liễu">Tư vấn dịch vụ da liễu</option>
                        <option value="Khám & xét nghiệm da liễu">Khám & xét nghiệm da liễu</option>
                        <option value="Tư vấn dược mỹ phẩm kê toa">Tư vấn dược mỹ phẩm kê toa</option>
                        <option value="Học nghề Lạc's Academy">Đào tạo nghề Lạc's Academy</option>
                        <option value="Liên hệ hợp tác & Đối tác">Liên hệ hợp tác & Đối tác</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Lời nhắn hoặc tình trạng da
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Mô tả sơ lược tình trạng da hoặc câu hỏi của bạn..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50/50"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-sm"
                    >
                      <Send className="w-4 h-4" />
                      <span>Gửi thông tin liên hệ</span>
                    </button>

                    <p className="text-[11px] text-slate-400 text-center leading-tight">
                      * Dữ liệu form lưu trữ trong môi trường prototype demo để kiểm tra luồng nhận lead của Ban Giám đốc.
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
