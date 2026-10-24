import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionTitle } from '../components/common/SectionTitle';
import { Briefcase, MapPin, DollarSign, Clock, ArrowRight, Mail } from 'lucide-react';
import { useDemoData } from '../context/DemoDataContext';

export const CareersPage: React.FC = () => {
  const { siteConfig } = useDemoData();

  const jobs = [
    {
      title: "Bác sĩ Chuyên khoa Da liễu",
      department: "Khoa Da liễu",
      location: "TP. Cần Thơ (Cơ sở 01 & 02)",
      salary: "Thỏa thuận theo năng lực + Thưởng",
      type: "Toàn thời gian / Bán thời gian",
      requirements: "Tốt nghiệp Bác sĩ Chuyên khoa I hoặc Thạc sĩ Da liễu; có Chứng chỉ hành nghề KCB hợp pháp; kinh nghiệm tối thiểu 3 năm."
    },
    {
      title: "Điều dưỡng viên / Kỹ thuật viên Chăm sóc da",
      department: "Khối Điều trị",
      location: "Cơ sở 02 (388 Nguyễn Văn Cừ)",
      salary: "9.000.000 – 15.000.000 đ",
      type: "Toàn thời gian",
      requirements: "Tốt nghiệp Trung cấp/Cao đẳng Điều dưỡng hoặc chứng chỉ nghề chăm sóc da y khoa; tay nghề nặn mụn vô khuẩn tốt."
    },
    {
      title: "Dược sĩ Tư vấn Nhà thuốc GPP",
      department: "Nhà thuốc Chuyên khoa",
      location: "Cơ sở 01 (231T Đường 3/2)",
      salary: "8.000.000 – 12.000.000 đ",
      type: "Toàn thời gian theo ca",
      requirements: "Tốt nghiệp Cao đẳng/Đại học Dược; am hiểu dược mỹ phẩm da liễu; giao tiếp khéo léo và tận tâm với khách hàng."
    },
    {
      title: "Chuyên viên Tư vấn & Chăm sóc Khách hàng (CSKH)",
      department: "Phòng Marketing & CSKH",
      location: "TP. Cần Thơ",
      salary: "8.000.000 – 14.000.000 đ (Lương cứng + KPI)",
      type: "Toàn thời gian",
      requirements: "Giọng nói truyền cảm, có kinh nghiệm trực tổng đài/fanpage phòng khám da liễu hoặc spa; nhiệt tình, chu đáo."
    }
  ];

  return (
    <>
      <SEOHead
        title="Tuyển dụng Nhân sự Y tế & Chăm sóc da | Lạc's Beauty Center"
        description="Gia nhập đội ngũ y khoa chuyên nghiệp tại Lạc's Beauty Center Cần Thơ với môi trường làm việc chuẩn y tế, chế độ đãi ngộ hấp dẫn và cơ hội đào tạo nâng cao."
      />

      <Breadcrumbs items={[{ label: 'Tuyển dụng' }]} />

      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Cơ hội nghề nghiệp"
          title="Gia Nhập Đội Ngũ Y Khoa Lạc's Beauty Center"
          subtitle="Chúng tôi luôn chào đón những bác sĩ, dược sĩ và kỹ thuật viên tâm huyết với nghề, mong muốn đồng hành xây dựng chuẩn mực da liễu tại miền Tây."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-slate-100 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-4 medical-card-hover"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary-700 bg-primary-50 px-3 py-1 rounded-full">
                    {job.department}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{job.type}</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-900">{job.title}</h3>
                
                <div className="space-y-1.5 text-xs text-slate-600">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-primary-600" />
                    <span>{job.location}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <DollarSign className="w-3.5 h-3.5 text-primary-600" />
                    <span className="font-semibold text-slate-800">{job.salary}</span>
                  </p>
                </div>

                <p className="text-xs text-slate-500 pt-2 border-t border-slate-100 leading-relaxed">
                  <strong>Yêu cầu:</strong> {job.requirements}
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={`mailto:${siteConfig.email}?subject=Ứng tuyển vị trí ${encodeURIComponent(job.title)}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs text-center flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Nộp hồ sơ ứng tuyển (Email)</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
