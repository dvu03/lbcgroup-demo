export interface DoctorProfile {
  id: string;
  name: string;
  degree: string;
  formalTitle: string; // VD: ThS.BS. Lạc Kim Ngân
  roleAtClinic: string;
  specialty: string;
  slug: string;
  licenseNumber: string;
  educationHistory: string[];
  certifications: string[];
  experienceYears: number;
  specialtyStrengths: string[];
  philosophy: string;
  shortSummary: string;
  fullBio: string;
  schedule: {
    facility: string;
    days: string;
    hours: string;
  }[];
  avatarUrl: string;
  actionImages: string[];
  hasConsentForm: boolean;
  isOfficialApproved: boolean; // false means sample record
  videoUrl?: string;
  displayOrder?: number;
  isVisible?: boolean;
  seoTitle?: string;
  metaDescription?: string;
  altText?: string;
}

export const DEFAULT_DOCTOR_AVATAR = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80";

export const initialDoctors: DoctorProfile[] = [
  {
    id: "doc-01",
    name: "Lạc Kim Ngân",
    degree: "Thạc sĩ, Bác sĩ Chuyên khoa Da liễu",
    formalTitle: "ThS.BS. Lạc Kim Ngân",
    roleAtClinic: "Giám đốc Chuyên môn & Sáng lập",
    specialty: "Da liễu – Thẩm mỹ Da",
    slug: "bs-lac-kim-ngan",
    licenseNumber: "Số CCHN: 012345/CTO-CCHN (Nội dung minh họa – Chờ xác nhận)",
    educationHistory: [
      "Tốt nghiệp Bác sĩ Đa khoa – Trường Đại học Y Dược Cần Thơ",
      "Tốt nghiệp Thạc sĩ Chuyên ngành Da liễu – Đại học Y Dược TP. Hồ Chí Minh",
      "Tu nghiệp lâm sàng về Ứng dụng Laser & Năng lượng cao tại Hàn Quốc & Singapore"
    ],
    certifications: [
      "Chứng chỉ Ứng dụng Laser và Ánh sáng trong Da liễu (Bệnh viện Da liễu Trung ương)",
      "Chứng chỉ Kỹ thuật Tiêm vi điểm Mesotherapy & Thẩm mỹ Nội khoa",
      "Chứng nhận Đào tạo Quốc tế về Trẻ hóa da công nghệ RF & HIFU"
    ],
    experienceYears: 12,
    specialtyStrengths: [
      "Điều trị mụn kháng trị & sẹo rỗ phức tạp",
      "Phác đồ trẻ hóa da đa tầng bằng công nghệ cao",
      "Thẩm mỹ nội khoa tinh tế chuẩn y khoa",
      "Phục hồi da tổn thương nhiễm corticoid"
    ],
    philosophy: "Mỗi làn da là một tác phẩm độc bản. Y học chuẩn mực và sự tận tâm là chìa khóa mang lại vẻ đẹp tự tin bền vững.",
    shortSummary: "Hơn 12 năm kinh nghiệm điều trị da liễu và phục hồi da chuyên sâu cho hàng ngàn khách hàng tại miền Tây.",
    fullBio: "ThS.BS. Lạc Kim Ngân là người sáng lập và giữ cương vị Giám đốc Chuyên môn tại Phòng khám Chuyên khoa Da liễu Lạc's Beauty Center. Với nền tảng đào tạo sau đại học bài bản và hơn một thập kỷ thực hành lâm sàng, bác sĩ Ngân luôn tiên phong cập nhật các công nghệ điều trị mới nhất trên thế giới về ứng dụng tại miền Tây. Tôn chỉ làm việc của bác sĩ là chẩn đoán đúng gốc rễ, điều trị bằng sự thấu hiểu và nói không với các biện pháp làm đẹp cấp tốc gây hại cho da.",
    schedule: [
      { facility: "Cơ sở 01 (Đường 3/2)", days: "Thứ 2, Thứ 4, Thứ 6, Thứ 7", hours: "08:30 – 17:30" },
      { facility: "Cơ sở 02 (Nguyễn Văn Cừ)", days: "Thứ 3, Thứ 5, Chủ Nhật", hours: "08:30 – 17:30" }
    ],
    avatarUrl: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=1200&q=80",
    actionImages: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80"
    ],
    hasConsentForm: true,
    isOfficialApproved: false
  },
  {
    id: "doc-02",
    name: "Nguyễn Văn An",
    degree: "Bác sĩ Chuyên khoa I (BSCKI)",
    formalTitle: "BSCKI. Nguyễn Văn An",
    roleAtClinic: "Bác sĩ Điều trị Da liễu",
    specialty: "Da liễu – Laser Thẩm mỹ",
    slug: "bs-nguyen-van-an",
    licenseNumber: "Số CCHN: 023456/CTO-CCHN (Nội dung minh họa – Chờ xác nhận)",
    educationHistory: [
      "Tốt nghiệp Bác sĩ Y khoa – Đại học Y Dược Cần Thơ",
      "Bác sĩ Chuyên khoa I Da liễu – Đại học Y Dược TP. Hồ Chí Minh"
    ],
    certifications: [
      "Chứng chỉ Kỹ thuật Bóc tách đáy sẹo và Điều trị sẹo rỗ vi điểm",
      "Chứng nhận Sử dụng Công nghệ Laser Toning và Fractional CO2",
      "Hội viên Hội Da liễu Việt Nam"
    ],
    experienceYears: 9,
    specialtyStrengths: [
      "Điều trị sẹo rỗ đa mô thức",
      "Laser thẩm mỹ điều trị sắc tố tàn nhang, đồi mồi",
      "Kiểm soát viêm da tiết bã và mụn nang"
    ],
    philosophy: "Điều trị chuẩn y khoa là tôn trọng cấu trúc sinh học tự nhiên của làn da.",
    shortSummary: "Chuyên gia bóc tách đáy sẹo và ứng dụng laser quang học điều trị tổn thương da.",
    fullBio: "BSCKI. Nguyễn Văn An là bác sĩ điều trị chính tại khoa Da liễu Lạc's Beauty Center. Với tính cách cẩn trọng và tay nghề khéo léo trong các thủ thuật vi điểm, bác sĩ An đã giúp rất nhiều bạn trẻ giải quyết triệt để tình trạng sẹo rỗ xơ hóa lâu năm do mụn để lại, khôi phục bề mặt da mịn màng tự tin.",
    schedule: [
      { facility: "Cơ sở 01 (Đường 3/2)", days: "Thứ 3, Thứ 5, Thứ 7", hours: "08:00 – 19:30" },
      { facility: "Cơ sở 02 (Nguyễn Văn Cừ)", days: "Thứ 2, Thứ 4, Chủ Nhật", hours: "08:00 – 19:30" }
    ],
    avatarUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80",
    actionImages: [
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80"
    ],
    hasConsentForm: true,
    isOfficialApproved: false
  },
  {
    id: "doc-03",
    name: "Trần Thị Bích Thảo",
    degree: "Thạc sĩ, Bác sĩ Da liễu",
    formalTitle: "ThS.BS. Trần Thị Bích Thảo",
    roleAtClinic: "Bác sĩ Chuyên khoa Sắc tố & Trẻ hóa",
    specialty: "Rối loạn sắc tố da – Nám nội tiết",
    slug: "bs-tran-thi-bich-thao",
    licenseNumber: "Số CCHN: 034567/CTO-CCHN (Nội dung minh họa – Chờ xác nhận)",
    educationHistory: [
      "Tốt nghiệp Bác sĩ Y khoa chính quy",
      "Thạc sĩ Da liễu – Đại học Y Dược Cần Thơ",
      "Tham gia các khóa đào tạo nâng cao về Rối loạn sắc tố da tại Bangkok"
    ],
    certifications: [
      "Chứng chỉ Quản lý và Điều trị Nám mảng, Nám chân sâu",
      "Chứng chỉ Căng chỉ sinh học và Nâng cơ không phẫu thuật"
    ],
    experienceYears: 8,
    specialtyStrengths: [
      "Điều trị nám má, tàn nhang phụ nữ sau sinh",
      "Phác đồ ức chế melanin màng đáy không lột tẩy",
      "Trẻ hóa và phục hồi da nhạy cảm lão hóa sớm"
    ],
    philosophy: "Trị nám cần sự kiên nhẫn và khoa học. Lắng nghe làn da để tìm thấy sự cân bằng.",
    shortSummary: "Chuyên sâu về các ca tăng sắc tố khó, nám nội tiết và phục hồi hàng rào màng đáy.",
    fullBio: "ThS.BS. Trần Thị Bích Thảo luôn dành sự tận tâm tỉ mỉ cho từng bệnh nhân gặp vấn đề về rối loạn sắc tố. Bác sĩ Thảo nổi tiếng với phong cách giải thích cặn kẽ cơ chế hình thành nám và hướng dẫn bệnh nhân cách tự bảo vệ làn da khỏi tia cực tím miền Tây.",
    schedule: [
      { facility: "Cơ sở 01 (Đường 3/2)", days: "Thứ 2 đến Thứ 6", hours: "08:30 – 17:00" },
      { facility: "Cơ sở 02 (Nguyễn Văn Cừ)", days: "Thứ 7, Chủ Nhật", hours: "08:30 – 17:00" }
    ],
    avatarUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80",
    actionImages: [
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80"
    ],
    hasConsentForm: true,
    isOfficialApproved: false
  },
  {
    id: "doc-04",
    name: "Lê Hoàng Nam",
    degree: "Bác sĩ Chuyên khoa II (BSCKII)",
    formalTitle: "BSCKII. Lê Hoàng Nam",
    roleAtClinic: "Cố vấn Chuyên môn Cấp cao",
    specialty: "Da liễu Lâm sàng & Miễn dịch học",
    slug: "bs-le-hoang-nam",
    licenseNumber: "Số CCHN: 045678/CTO-CCHN (Nội dung minh họa – Chờ xác nhận)",
    educationHistory: [
      "Tốt nghiệp Bác sĩ Y khoa – Đại học Y Dược",
      "Bác sĩ Chuyên khoa I Da liễu",
      "Bác sĩ Chuyên khoa II Da liễu – Đại học Y Dược TP. Hồ Chí Minh"
    ],
    certifications: [
      "Hội viên Ban Chấp hành Hội Da liễu miền Nam",
      "Báo cáo viên tại các Hội nghị Da liễu toàn quốc"
    ],
    experienceYears: 20,
    specialtyStrengths: [
      "Chẩn đoán và hội chẩn các ca bệnh da liễu khó",
      "Viêm da cơ địa, vảy nến, dị ứng thuốc",
      "Định hướng phác đồ y học cá nhân hóa cho phòng khám"
    ],
    philosophy: "Y đức đi đầu, chuyên môn vững vàng, vì sức khỏe toàn diện của cộng đồng.",
    shortSummary: "Hơn 20 năm công tác chuyên môn da liễu, cố vấn các phác đồ y khoa phức tạp.",
    fullBio: "BSCKII. Lê Hoàng Nam là chuyên gia cố vấn chuyên môn cấp cao tại Lạc's Beauty Center. Với hơn hai thập kỷ kinh nghiệm tại các bệnh viện tuyến đầu, bác sĩ Nam trực tiếp tham gia hội chẩn các ca bệnh lý da liễu nặng, kháng trị và đào tạo định kỳ cho đội ngũ bác sĩ trẻ tại phòng khám.",
    schedule: [
      { facility: "Cơ sở 01 (Đường 3/2)", days: "Thứ 3, Thứ 6 (Hội chẩn chuyên gia)", hours: "09:00 – 16:30" },
      { facility: "Cơ sở 02 (Nguyễn Văn Cừ)", days: "Đặt lịch trước qua Hotline", hours: "Theo lịch hẹn" }
    ],
    avatarUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1200&q=80",
    actionImages: [
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80"
    ],
    hasConsentForm: true,
    isOfficialApproved: false
  }
];
