import React from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "../components/common/SEOHead";
import { Stethoscope, Home, Calendar, Search, ArrowRight } from "lucide-react";

export default function NotFoundPage() {
  return (
    <>
      <SEOHead
        title="404 — Không Tìm Thấy Trang | Lạc's Beauty Center"
        description="Trang bạn đang truy cập không tồn tại hoặc đã được thay đổi đường dẫn trên hệ thống website Lạc's Beauty Center."
      />

      <div className="min-h-[70vh] flex items-center justify-center py-20 bg-slate-50">
        <div className="container-custom">
          <div className="max-w-xl mx-auto text-center bg-white p-8 md:p-12 rounded-3xl border border-slate-200/80 shadow-sm">
            <div className="w-20 h-20 rounded-3xl bg-primary-50 text-primary-700 flex items-center justify-center mx-auto mb-6">
              <Stethoscope className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-primary-700 mb-2 block font-mono">
              Lỗi 404 — Trang không tồn tại
            </span>

            <h1 className="text-2xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
              Không Tìm Thấy Trang Yêu Cầu
            </h1>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8">
              Đường dẫn bạn vừa truy cập có thể đã được cập nhật, đổi tên hoặc tạm thời không khả dụng trong phiên bản thử nghiệm này.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <Link to="/" className="btn-primary flex items-center gap-2 text-sm">
                <Home className="w-4 h-4" />
                <span>Về trang chủ</span>
              </Link>
              <Link to="/dat-lich-kham" className="btn-outline flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4" />
                <span>Đặt lịch khám</span>
              </Link>
            </div>

            <div className="pt-6 border-t border-slate-100 text-xs text-slate-500">
              <p className="font-semibold text-slate-700 mb-2">Đường dẫn nhanh thường xem:</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/dich-vu" className="hover:text-primary-700 hover:underline">Dịch vụ điều trị</Link>
                <span>•</span>
                <Link to="/doi-ngu-bac-si" className="hover:text-primary-700 hover:underline">Đội ngũ bác sĩ</Link>
                <span>•</span>
                <Link to="/duoc-my-pham" className="hover:text-primary-700 hover:underline">Dược mỹ phẩm</Link>
                <span>•</span>
                <Link to="/cau-hoi-thuong-gap" className="hover:text-primary-700 hover:underline">Hỏi đáp FAQ</Link>
                <span>•</span>
                <Link to="/lien-he" className="hover:text-primary-700 hover:underline">Liên hệ cơ sở</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
