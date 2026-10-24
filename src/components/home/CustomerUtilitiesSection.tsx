import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, HelpCircle, MapPin, Truck, ArrowRight } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';

export const CustomerUtilitiesSection: React.FC = () => {
  const { siteConfig } = useDemoData();

  const utilities = [
    {
      id: "util-1",
      icon: <Calendar className="w-6 h-6 text-primary-600" />,
      title: "Đặt lịch khám online",
      desc: "Chủ động chọn ngày giờ và bác sĩ thăm khám mà không cần chờ đợi.",
      ctaText: "Đặt lịch ngay",
      path: "/dat-lich-kham"
    },
    {
      id: "util-2",
      icon: <HelpCircle className="w-6 h-6 text-primary-600" />,
      title: "Hỏi đáp chuyên gia",
      desc: "Giải đáp các thắc mắc thường gặp về liệu trình, thuốc và chi phí.",
      ctaText: "Xem giải đáp",
      path: "/cau-hoi-thuong-gap"
    },
    {
      id: "util-3",
      icon: <MapPin className="w-6 h-6 text-primary-600" />,
      title: "Hệ thống 2 cơ sở",
      desc: "Địa chỉ, bản đồ chỉ đường và giờ đón tiếp tại Cần Thơ.",
      ctaText: "Xem vị trí",
      path: "/he-thong-co-so"
    },
    {
      id: "util-4",
      icon: <Truck className="w-6 h-6 text-primary-600" />,
      title: "Tra cứu đơn hàng",
      desc: "Theo dõi tiến độ giao hàng dược mỹ phẩm chính hãng nhanh chóng.",
      ctaText: "Tra cứu ngay",
      path: "/cau-hoi-thuong-gap#don-hang"
    }
  ];

  return (
    <section className="py-8 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6">
        {utilities.map((u) => (
          <Link
            key={u.id}
            to={u.path}
            className="p-3.5 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between medical-card-hover group"
          >
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary-50 group-hover:bg-primary-600 text-primary-600 group-hover:text-white flex items-center justify-center transition-colors shadow-xs mb-3">
                {u.icon}
              </div>
              <h3 className="font-heading font-bold text-xs sm:text-base text-slate-900 group-hover:text-primary-700 transition-colors leading-snug">
                {u.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2 sm:line-clamp-none">
                {u.desc}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] sm:text-xs font-semibold text-primary-600 group-hover:text-primary-700 flex items-center gap-1">
              <span>{u.ctaText}</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
