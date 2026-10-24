import React from "react";
import { useParams, Link } from "react-router-dom";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { SEOHead } from "../components/common/SEOHead";
import { ShieldCheck, FileText, Lock, CreditCard, Truck, RotateCcw, ArrowRight } from "lucide-react";

interface PolicyContent {
  title: string;
  slug: string;
  icon: any;
  updatedDate: string;
  sections: { heading: string; body: string }[];
}

const policiesData: Record<string, PolicyContent> = {
  "chinh-sach-bao-mat": {
    title: "Chính Sách Bảo Mật Thông Tin & Hồ Sơ Bệnh Án",
    slug: "chinh-sach-bao-mat",
    icon: Lock,
    updatedDate: "20/10/2026",
    sections: [
      {
        heading: "1. Mục đích thu thập thông tin",
        body: "Phòng khám Chuyên khoa Da liễu Lạc's Beauty Center chỉ thu thập thông tin liên hệ (họ tên, số điện thoại, hình ảnh tình trạng da) nhằm phục vụ việc lưu trữ hồ sơ bệnh án, theo dõi tiến trình phác đồ điều trị và nhắc lịch tái khám định kỳ theo quy định của Luật Khám bệnh, chữa bệnh."
      },
      {
        heading: "2. Cam kết bảo mật dữ liệu y tế cá nhân",
        body: "Mọi thông tin bệnh án và hình ảnh Before–After của khách hàng đều được mã hóa trên hệ thống quản lý nội bộ. Tuyệt đối không chia sẻ, mua bán hoặc công khai hình ảnh khuôn mặt khách hàng lên các phương tiện truyền thông khi chưa có văn bản đồng ý bằng văn bản của khách hàng."
      },
      {
        heading: "3. Quyền của người bệnh đối với dữ liệu",
        body: "Khách hàng có quyền yêu cầu xem lại, điều chỉnh hoặc trích lục hồ sơ khám chữa bệnh của chính mình bằng cách liên hệ trực tiếp Bộ phận Tiếp đón tại cơ sở hoặc gửi email văn bản về phongkham@lbcgroup.vn."
      }
    ]
  },
  "chinh-sach-thanh-toan": {
    title: "Chính Sách & Phương Thức Thanh Toán",
    slug: "chinh-sach-thanh-toan",
    icon: CreditCard,
    updatedDate: "20/10/2026",
    sections: [
      {
        heading: "1. Các hình thức thanh toán được chấp nhận",
        body: "Quý khách có thể thanh toán viện phí khám bệnh, liệu trình điều trị da liễu và dược mỹ phẩm thông qua: Tiền mặt tại quầy thu ngân, Chuyển khoản ngân hàng qua mã VietQR, Thẻ tín dụng/ghi nợ (Visa, Mastercard, JCB) và Hỗ trợ trả góp 0% lãi suất cho các phác đồ điều trị dài hạn."
      },
      {
        heading: "2. Hóa đơn tài chính (Hóa đơn điện tử VAT)",
        body: "Phòng khám xuất hóa đơn điện tử hợp pháp cho mọi dịch vụ và sản phẩm theo quy định của Tổng cục Thuế. Hóa đơn sẽ được gửi trực tiếp qua email của khách hàng trong ngày làm việc."
      }
    ]
  },
  "chinh-sach-giao-hang": {
    title: "Chính Sách Vận Chuyển Dược – Mỹ Phẩm",
    slug: "chinh-sach-giao-hang",
    icon: Truck,
    updatedDate: "20/10/2026",
    sections: [
      {
        heading: "1. Phạm vi giao hàng",
        body: "Áp dụng giao hàng toàn quốc đối với các dòng Dược – Mỹ phẩm không kê toa (OTC) và sản phẩm chăm sóc da hỗ trợ phác đồ. Đối với thuốc kê toa, phòng khám chỉ cấp phát trực tiếp tại Nhà thuốc GPP theo đơn của Bác sĩ Da liễu, không bán online."
      },
      {
        heading: "2. Tiêu chuẩn đóng gói và thời gian vận chuyển",
        body: "Sản phẩm được đóng gói 3 lớp chống sốc và bảo quản nhiệt độ kiểm soát dưới 30°C. Khu vực nội ô Cần Thơ: Giao hỏa tốc trong 2 – 4 giờ. Các tỉnh miền Tây và toàn quốc: 1 – 3 ngày làm việc."
      }
    ]
  },
  "chinh-sach-doi-tra": {
    title: "Chính Sách Đổi Trả & Xử Lý Khiếu Nại",
    slug: "chinh-sach-doi-tra",
    icon: RotateCcw,
    updatedDate: "20/10/2026",
    sections: [
      {
        heading: "1. Điều kiện đổi trả dược mỹ phẩm",
        body: "Chấp nhận đổi mới miễn phí trong vòng 7 ngày kể từ ngày nhận hàng nếu: Sản phẩm bị lỗi do nhà sản xuất (vỡ bao bì, biến chất, đổi màu), giao sai sản phẩm so với tư vấn của bác sĩ, hoặc khách hàng có dấu hiệu kích ứng da được Bác sĩ Da liễu LBC xác nhận bằng phiếu khám."
      },
      {
        heading: "2. Quy trình xử lý khiếu nại",
        body: "Mọi thắc mắc và khiếu nại sẽ được Bộ phận Quản lý Chất lượng tiếp nhận và giải quyết trong vòng 24 giờ qua hotline chăm sóc khách hàng: 0939 123 456."
      }
    ]
  },
  "dieu-khoan-su-dung": {
    title: "Điều Khoản Sử Dụng Website lbcgroup.vn",
    slug: "dieu-khoan-su-dung",
    icon: FileText,
    updatedDate: "20/10/2026",
    sections: [
      {
        heading: "1. Bản quyền nội dung và sở hữu trí tuệ",
        body: "Toàn bộ bài viết y khoa, hình ảnh bác sĩ, nhãn hiệu Lạc's Beauty Center, Lạc's Academy và giao diện website thuộc sở hữu của CÔNG TY TNHH VIỆN CHĂM SÓC DA LẠC'S BEAUTY CENTER. Mọi hành vi sao chép nội dung nhằm mục đích thương mại khi chưa có sự đồng ý đều vi phạm pháp luật."
      },
      {
        heading: "2. Khước từ trách nhiệm y khoa online",
        body: "Các thông tin trên website lbcgroup.vn nhằm mục đích nâng cao nhận thức chăm sóc da khoa học, không thay thế cho việc chẩn đoán hoặc điều trị y tế trực tiếp tại phòng khám."
      }
    ]
  }
};

export default function PolicyPage() {
  const { slug } = useParams<{ slug: string }>();
  const currentKey = slug || "chinh-sach-bao-mat";
  const policy = policiesData[currentKey] || policiesData["chinh-sach-bao-mat"];
  const IconComponent = policy.icon;

  const policyList = [
    { title: "Chính sách bảo mật", slug: "chinh-sach-bao-mat" },
    { title: "Chính sách thanh toán", slug: "chinh-sach-thanh-toan" },
    { title: "Chính sách giao hàng", slug: "chinh-sach-giao-hang" },
    { title: "Chính sách đổi trả", slug: "chinh-sach-doi-tra" },
    { title: "Điều khoản sử dụng", slug: "dieu-khoan-su-dung" }
  ];

  return (
    <>
      <SEOHead
        title={`${policy.title} | Lạc's Beauty Center`}
        description={`Thông tin pháp lý và ${policy.title.toLowerCase()} tại Phòng khám Chuyên khoa Da liễu Lạc's Beauty Center.`}
      />

      <Breadcrumbs
        items={[
          { label: "Trang chủ", path: "/" },
          { label: "Thông tin pháp lý" },
          { label: policy.title }
        ]}
      />

      <div className="py-16 bg-slate-50 min-h-screen">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar Navigation (4 cols) */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm sticky top-28">
                <h3 className="font-serif font-bold text-lg text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary-600" />
                  Chính Sách & Quy Định
                </h3>
                <nav className="space-y-1.5">
                  {policyList.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/chinh-sach/${item.slug}`}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs md:text-sm font-semibold transition ${
                        currentKey === item.slug
                          ? "bg-primary-50 text-primary-800 border border-primary-200"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span>{item.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                    </Link>
                  ))}
                </nav>

                <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-500">
                  <p className="font-bold text-slate-700 mb-1">CÔNG TY TNHH VIỆN CHĂM SÓC DA LẠC'S BEAUTY CENTER</p>
                  <p>Mã số doanh nghiệp: Đang cập nhật</p>
                  <p>Cấp bởi Sở Kế hoạch và Đầu tư TP. Cần Thơ</p>
                </div>
              </div>
            </div>

            {/* Content Area (8 cols) */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/80 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-primary-50 text-primary-700">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="font-serif font-bold text-2xl md:text-3xl text-slate-900">
                      {policy.title}
                    </h1>
                    <span className="text-xs text-slate-400">
                      Cập nhật lần cuối: {policy.updatedDate}
                    </span>
                  </div>
                </div>

                <div className="prose prose-slate max-w-none space-y-8 mt-8 pt-6 border-t border-slate-100">
                  {policy.sections.map((sec, idx) => (
                    <div key={idx}>
                      <h2 className="text-lg md:text-xl font-serif font-bold text-slate-900 mb-2">
                        {sec.heading}
                      </h2>
                      <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                        {sec.body}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-12 pt-6 border-t border-slate-100 bg-slate-50 rounded-2xl p-6 text-xs text-slate-500">
                  Quý khách có bất kỳ câu hỏi nào về các chính sách trên, xin vui lòng gửi phản hồi qua email <strong className="text-primary-800">phongkham@lbcgroup.vn</strong> hoặc liên hệ hotline <strong className="text-primary-800">0939 123 456</strong> để được giải đáp cụ thể.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
