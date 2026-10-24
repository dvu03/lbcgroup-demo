import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { PageHeroBanner } from '../components/common/PageHeroBanner';
import { SectionTitle } from '../components/common/SectionTitle';
import { useDemoData } from '../context/DemoDataContext';
import { 
  Award, 
  ShieldCheck, 
  Stethoscope, 
  Sparkles, 
  HeartHandshake, 
  Calendar, 
  ArrowRight,
  MapPin,
  Clock
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { siteConfig, coreValues, doctors, specialties, pagesConfig } = useDemoData();
  const pageConfig = pagesConfig?.['gioi-thieu'];

  return (
    <>
      <SEOHead
        title="Giới thiệu về Lạc's Beauty Center | Phòng khám Chuyên khoa Da liễu"
        description="Tìm hiểu câu chuyện thương hiệu, tầm nhìn, sứ mệnh, giá trị cốt lõi và hành trình phát triển của Lạc's Beauty Center tại Cần Thơ."
      />

      {/* Dynamic Hero Banner from CMS */}
      <PageHeroBanner
        pageId="gioi-thieu"
        breadcrumbLabel="Giới thiệu"
        defaultBadge="CÂU CHUYỆN THƯƠNG HIỆU"
        defaultTitle="Tiên Phong Công Nghệ Cao – Hướng Đến Y Học Cá Nhân Hóa"
        defaultDescription="Hành trình kiến tạo chuẩn mực điều trị da liễu chuyên sâu, mang giải pháp y khoa hiện đại và sự an tâm tuyệt đối đến cho cộng đồng miền Tây."
      />

      {/* Brand Story (Dynamic from CMS) */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">
              {pageConfig?.storyBadge || "Khởi nguồn & Triết lý"}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              {pageConfig?.storyTitle || "Khát Vọng Mang Chuẩn Mực Da Liễu Hiện Đại Về Miền Tây"}
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                {pageConfig?.storyParagraph1 || (
                  <>
                    Được thành lập bởi đội ngũ bác sĩ chuyên khoa da liễu giàu tâm huyết, <strong>{siteConfig.facilityName}</strong> xuất phát từ niềm trăn trở trước thực trạng nhiều người dân tại Đồng bằng sông Cửu Long phải gánh chịu hậu quả nặng nề do sử dụng kem trộn, mỹ phẩm chứa corticoid hoặc điều trị tại các cơ sở thẩm mỹ không phép.
                  </>
                )}
              </p>
              <p>
                {pageConfig?.storyParagraph2 || (
                  <>
                    Chúng tôi tin rằng, mỗi làn da là một thực thể sinh học độc bản với cấu trúc, tiền sử dị ứng và lối sống riêng. Việc điều trị da liễu không thể áp dụng máy móc một công thức chung cho tất cả. Bằng việc đầu tư hệ thống máy soi da đa tầng VISIA 3D hàng đầu thế giới và phác đồ điều trị đa mô thức, Lạc's Beauty Center giúp chẩn đoán chính xác nguyên nhân gốc rễ và đồng hành kiên trì cùng khách hàng.
                  </>
                )}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="p-4 rounded-2xl bg-primary-50/60 border border-primary-100">
                <span className="font-heading text-2xl sm:text-3xl font-bold text-primary-800 block">
                  {pageConfig?.stat1Number || "10.000+"}
                </span>
                <span className="text-xs text-slate-600 font-medium">
                  {pageConfig?.stat1Label || "Khách hàng điều trị thành công"}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-primary-50/60 border border-primary-100">
                <span className="font-heading text-2xl sm:text-3xl font-bold text-primary-800 block">
                  {pageConfig?.stat2Number || "100%"}
                </span>
                <span className="text-xs text-slate-600 font-medium">
                  {pageConfig?.stat2Label || "Bác sĩ trình độ Sau Đại học"}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80"
                alt="Không gian phòng khám Lạc's"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-14 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-900">Tầm Nhìn Chiến Lược</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Trở thành hệ thống phòng khám chuyên khoa da liễu và viện chăm sóc da công nghệ cao chuẩn mực, uy tín hàng đầu tại miền Tây; là địa chỉ tin cậy nhất của người dân khi cần thăm khám bệnh lý da liễu và làm đẹp an toàn chuẩn y khoa.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-900">Sứ Mệnh Phụng Sự</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Bảo vệ và phục hồi làn da khỏe đẹp tự nhiên bằng y đức, kiến thức y khoa chuyên sâu và công nghệ tiên tiến; đồng thời đào tạo nguồn nhân lực tay nghề cao, nâng tầm chuẩn mực nghề chăm sóc da tại Việt Nam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Values Anchor */}
      <section id="gia-tri-cot-loi" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Kim chỉ nam hoạt động"
          title="4 Giá Trị Cốt Lõi Y Khoa"
          subtitle="Những nguyên tắc bất di bất dịch định hình mọi quy trình thăm khám và chăm sóc khách hàng tại Lạc's Beauty Center."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val) => (
            <div
              key={val.id}
              className="p-6 rounded-3xl bg-white border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 space-y-3"
            >
              <h4 className="font-heading font-bold text-lg text-primary-800">{val.title}</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{val.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones / Hành trình phát triển */}
      <section className="py-14 bg-primary-50/50 border-t border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Dấu mốc phát triển"
            title="Hành Trình Khẳng Định Uy Tín"
            subtitle="Từng bước vững chắc xây dựng hệ sinh thái y tế 5 trụ cột phục vụ khách hàng."
          />

          <div className="relative border-l-2 border-primary-200 ml-4 md:ml-32 space-y-8 pl-6 md:pl-8">
            <div className="relative">
              <div className="absolute -left-[33px] md:-left-[41px] top-1 w-5 h-5 rounded-full bg-primary-600 border-4 border-white shadow"></div>
              <span className="text-xs font-bold text-primary-700 bg-white px-2.5 py-1 rounded-full border border-primary-200 inline-block mb-1">
                Giai đoạn khởi lập
              </span>
              <h4 className="font-heading font-bold text-base text-slate-900">
                Thành lập Cơ sở 01 tại 231T Đường 3/2, Cần Thơ
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Phòng khám chuyên khoa da liễu ra đời, tập trung chuyên sâu vào điều trị mụn kháng trị và sẹo rỗ phức tạp.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-[33px] md:-left-[41px] top-1 w-5 h-5 rounded-full bg-primary-600 border-4 border-white shadow"></div>
              <span className="text-xs font-bold text-primary-700 bg-white px-2.5 py-1 rounded-full border border-primary-200 inline-block mb-1">
                Mở rộng hệ sinh thái
              </span>
              <h4 className="font-heading font-bold text-base text-slate-900">
                Ra mắt Học viện Đào tạo nghề Lạc's Academy
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Đào tạo hàng trăm kỹ thuật viên chăm sóc da chuẩn y khoa, chuyển giao công nghệ cho các chủ spa miền Tây.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-[33px] md:-left-[41px] top-1 w-5 h-5 rounded-full bg-primary-600 border-4 border-white shadow"></div>
              <span className="text-xs font-bold text-primary-700 bg-white px-2.5 py-1 rounded-full border border-primary-200 inline-block mb-1">
                29/09/2026
              </span>
              <h4 className="font-heading font-bold text-base text-slate-900">
                Khai trương Cơ sở 02 tại 388 Nguyễn Văn Cừ, Cần Thơ
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Viện chăm sóc da công nghệ cao khang trang, ứng dụng máy soi da VISIA 3D và các giải pháp trẻ hóa toàn diện.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
