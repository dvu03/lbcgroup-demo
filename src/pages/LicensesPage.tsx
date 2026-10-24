import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionTitle } from '../components/common/SectionTitle';
import { ShieldCheck, FileText, AlertCircle, Building2, UserCheck } from 'lucide-react';
import { useDemoData } from '../context/DemoDataContext';

export const LicensesPage: React.FC = () => {
  const { siteConfig } = useDemoData();

  const licenses = [
    {
      title: "Giấy phép Hoạt động Khám bệnh, Chữa bệnh (Cơ sở 01)",
      number: "Số 0123/CTO-GPHĐ",
      issuedBy: "Sở Y tế Thành phố Cần Thơ",
      issuedDate: "Cấp ngày 15/06/2023",
      scope: "Khám bệnh, chữa bệnh chuyên khoa Da liễu; thực hiện các kỹ thuật chăm sóc da, laser, tiểu phẫu da liễu theo danh mục kỹ thuật phê duyệt.",
      isSample: true
    },
    {
      title: "Giấy chứng nhận Đăng ký Doanh nghiệp",
      number: "Mã số doanh nghiệp: 1801234567",
      issuedBy: "Sở Kế hoạch và Đầu tư TP. Cần Thơ",
      issuedDate: "Đăng ký lần đầu ngày 10/05/2021",
      scope: `Pháp nhân: ${siteConfig.legalEntity}`,
      isSample: true
    },
    {
      title: "Giấy chứng nhận Đủ điều kiện Kinh doanh Dược (Nhà thuốc)",
      number: "Số 123/ĐKKDD-CTO",
      issuedBy: "Sở Y tế Thành phố Cần Thơ",
      issuedDate: "Cấp ngày 20/08/2023",
      scope: "Bán lẻ thuốc thành phẩm chuyên khoa da liễu đạt chuẩn GPP tại cơ sở khám chữa bệnh.",
      isSample: true
    },
    {
      title: "Chứng chỉ Hành nghề Khám bệnh, Chữa bệnh Bác sĩ Phụ trách",
      number: "Số CCHN: 012345/CTO-CCHN",
      issuedBy: "Sở Y tế Thành phố Cần Thơ",
      issuedDate: "Người chịu trách nhiệm chuyên môn: ThS.BS. Lạc Kim Ngân",
      scope: "Phạm vi hoạt động chuyên môn: Khám bệnh, chữa bệnh chuyên khoa Da liễu.",
      isSample: true
    }
  ];

  return (
    <>
      <SEOHead
        title="Giấy phép Hoạt động & Hồ sơ Pháp lý | Lạc's Beauty Center"
        description="Thông tin công khai minh bạch về Giấy phép hoạt động khám bệnh, chữa bệnh, đăng ký kinh doanh và chứng chỉ hành nghề của Phòng khám Da liễu Lạc's Beauty Center."
      />

      <Breadcrumbs items={[{ label: 'Giấy phép hoạt động' }]} />

      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Minh bạch pháp lý"
          title="Hồ Sơ Pháp Lý & Giấy Phép Hoạt Động Y Tế"
          subtitle="Tuân thủ nghiêm ngặt Luật Khám bệnh, Chữa bệnh và các quy định của Bộ Y tế Việt Nam nhằm bảo vệ quyền lợi và sức khỏe của khách hàng."
        />

        {/* Notice Disclaimer */}
        <div className="mb-10 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3 shadow-sm">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold">Lưu ý bản Prototype Demo:</span>
            <p>
              Các số hiệu giấy phép bên dưới là dữ liệu mô phỏng theo cấu trúc quy định của Sở Y tế để Ban Giám đốc duyệt bố cục. Trên website chính thức khi đưa vào vận hành, bản scan có dấu đỏ và watermark <strong>lbcgroup.vn</strong> sẽ được niêm yết công khai theo Nghị định 342/2025/NĐ-CP.
            </p>
          </div>
        </div>

        {/* License Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {licenses.map((lic, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-slate-100 shadow-md hover:shadow-xl transition-all space-y-4 relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-full uppercase tracking-wider inline-block mb-1.5">
                  Văn bản y tế
                </span>
                <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 leading-snug">
                  {lic.title}
                </h3>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-600">
                <p><strong>Số văn bản:</strong> <span className="text-slate-900 font-semibold">{lic.number}</span></p>
                <p><strong>Cơ quan cấp:</strong> {lic.issuedBy}</p>
                <p><strong>Ngày cấp:</strong> {lic.issuedDate}</p>
                <p className="pt-1 text-slate-500"><strong>Phạm vi:</strong> {lic.scope}</p>
              </div>

              {lic.isSample && (
                <div className="text-[11px] text-slate-400 italic">
                  * Bản scan chính thức sẽ được cập nhật sau khi thẩm định văn bản gốc.
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
