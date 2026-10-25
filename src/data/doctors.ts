export interface DoctorProfile {
  id: string;
  name: string;
  degree: string;
  formalTitle: string; // VD: ThS.BS.CKI. Lạc Thị Kim Ngân
  roleAtClinic: string;
  specialty: string;
  slug: string;
  licenseNumber: string;
  scopeOfPractice?: string;
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
    name: "Lạc Thị Kim Ngân",
    degree: "ThS.BS.CKI",
    formalTitle: "ThS.BS.CKI. Lạc Thị Kim Ngân",
    roleAtClinic: "Giám đốc Chuyên môn tại Phòng khám Da liễu Lạc's Beauty Center",
    specialty: "Da liễu",
    slug: "bs-lac-thi-kim-ngan",
    licenseNumber: "Đang cập nhật (Chờ xác nhận)",
    scopeOfPractice: "Khám bệnh, chữa bệnh chuyên khoa Da liễu",
    educationHistory: [
      "Trường Đại học Y Dược Cần Thơ - năm 2018 (BS đa khoa)",
      "Trường Đại học Y Dược Cần Thơ - năm 2021 (Bác sĩ nội trú và đào tạo chuyên khoa I chuyên ngành Da liễu)"
    ],
    certifications: [
      "Bằng Bác sĩ Y đa khoa",
      "Bằng Thạc sĩ Y học Nội khoa",
      "Bằng tốt nghiệp Chuyên khoa cấp I",
      "Bằng tốt nghiệp Bác sĩ Nội trú Bệnh viện",
      "Chứng chỉ chuyên khoa Phẫu thuật tạo hình thẩm mỹ",
      "Giấy chứng nhận - Ứng dụng Laser & Ánh sáng trong điều trị - chăm sóc da thẩm mỹ",
      "Chứng chỉ đào tạo liên tục - Thủ thuật cơ bản và tiểu phẫu da",
      "Chứng chỉ đào tạo liên tục - Kỹ thuật tiêm chất làm đầy trong thẩm mỹ",
      "Chứng chỉ đào tạo liên tục - Kỹ thuật tiêm Botulinum toxin trong thẩm mỹ",
      "Chứng chỉ đào tạo liên tục - Căng chỉ cơ bản trong thẩm mỹ da"
    ],
    experienceYears: 8,
    specialtyStrengths: [
      "Điều trị mụn – kể cả mụn kháng trị",
      "Điều trị sẹo",
      "Điều trị sắc tố – nám – tàn nhang – đồi mồi",
      "Điều trị rụng tóc",
      "Thẩm mỹ nội khoa",
      "Nâng cơ",
      "Chăm sóc da chuyên sâu",
      "Điều trị các bệnh về da khác"
    ],
    philosophy: "Làm đẹp hiệu quả và an toàn",
    shortSummary: "Giám đốc Chuyên môn tại Phòng khám Da liễu Lạc’s Beauty Center. Với 8 năm kinh nghiệm; 9 chứng chỉ, bằng cấp và chương trình đào tạo chuyên môn.",
    fullBio: "ThS.BS.CKI Lạc Thị Kim Ngân hiện đảm nhiệm vị trí Giám đốc Chuyên môn tại Phòng khám Da liễu Lạc’s Beauty Center. Ngoài ra hiện tại bác sĩ còn là Giảng viên bộ môn Da liễu và đang công tác tại trường Đại học Y Dược Cần Thơ.\n\nBác sĩ tốt nghiệp Bác sĩ đa khoa tại Trường Đại học Y Dược Cần Thơ năm 2018 với thành tích xuất sắc, sau đó bác sĩ tiếp tục tham gia chương trình đào tạo Bác sĩ nội trú Chuyên khoa I chuyên ngành Da liễu và hoàn thành chương trình vào năm 2021.\n\nBên cạnh nền tảng đào tạo y khoa, bác sĩ đã tham gia các chương trình đào tạo, bồi dưỡng chuyên môn với 8 chứng nhận/chứng chỉ. Đặc biệt, bác sĩ còn có 2 lần được Bộ trưởng Bộ Y tế vinh dự trao tặng Bằng khen vì đã có thành tích xuất sắc trong thực hiện nhiệm vụ, kế hoạch công tác y tế.\n\nVới định hướng đề cao hiệu quả và tính an toàn, bác sĩ hướng đến xây dựng giải pháp chăm sóc, điều trị da phù hợp với tình trạng và nhu cầu riêng của từng khách hàng.",
    schedule: [
      { facility: "Cơ sở 01 (Đường 3/2)", days: "Thứ 2, Thứ 4, Thứ 6, Thứ 7", hours: "08:30 – 17:30" },
      { facility: "Cơ sở 02 (Nguyễn Văn Cừ)", days: "Thứ 3, Thứ 5, Chủ Nhật", hours: "08:30 – 17:30" }
    ],
    avatarUrl: "https://bacsilackimngan.vn/wp-content/uploads/2025/05/Bac-Ngan-scaled.png",
    actionImages: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80"
    ],
    hasConsentForm: true,
    isOfficialApproved: false
  },
  {
    id: "doc-02",
    name: "Lê Thị Minh Thư",
    degree: "ThS.BS.CKI",
    formalTitle: "ThS.BS.CKI. Lê Thị Minh Thư",
    roleAtClinic: "Bác sĩ tại Phòng khám Da liễu Lạc's Beauty Center",
    specialty: "Da liễu",
    slug: "bs-le-thi-minh-thu",
    licenseNumber: "Đang cập nhật (Chờ xác nhận)",
    scopeOfPractice: "",
    educationHistory: [],
    certifications: [
      "Bằng Bác sĩ Y đa khoa",
      "Bằng Thạc sĩ Y học Nội khoa",
      "Bằng tốt nghiệp Chuyên khoa cấp I",
      "Bằng tốt nghiệp Bác sĩ Nội trú Bệnh viện"
    ],
    experienceYears: 4,
    specialtyStrengths: [],
    philosophy: "",
    shortSummary: "Bác sĩ tại Phòng khám Da liễu Lạc’s Beauty Center. Với 4 năm kinh nghiệm; 4 bằng cấp và chương trình đào tạo chuyên môn.",
    fullBio: "ThS.BS.CKI Lê Thị Minh Thư hiện công tác với vai trò Bác sĩ tại Phòng khám Da liễu Lạc’s Beauty Center. Với 4 năm kinh nghiệm công tác chuyên môn Da liễu, bác sĩ sở hữu nền tảng đào tạo bài bản với Bằng Bác sĩ Y đa khoa, Thạc sĩ Y học Nội khoa, Chuyên khoa cấp I và Bác sĩ Nội trú Bệnh viện.",
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
    name: "Trần Thị Ý Nhi",
    degree: "ThS.BS",
    formalTitle: "ThS.BS. Trần Thị Ý Nhi",
    roleAtClinic: "Bác sĩ tại Phòng khám Da liễu Lạc's Beauty Center",
    specialty: "Da liễu",
    slug: "bs-tran-thi-y-nhi",
    licenseNumber: "Đang cập nhật (Chờ xác nhận)",
    scopeOfPractice: "Khám bệnh, chữa bệnh nội khoa + Phạm vi hành nghề được bổ sung: chuyên khoa Da liễu.",
    educationHistory: [
      "Trường Đại học Y Dược Cần Thơ - năm 2020 (BS đa khoa)",
      "Trường Đại học Y Dược Cần Thơ - năm 2025 (ThS Da liễu)"
    ],
    certifications: [
      "Bằng Bác sĩ Y đa khoa",
      "Bằng Thạc sĩ Y học Nội khoa (Da liễu)",
      "Chứng chỉ đào tạo liên tục - Kỹ thuật tiêm chất làm đầy trong thẩm mỹ",
      "Chứng chỉ đào tạo liên tục - Kỹ thuật tiêm Botulinum toxin trong thẩm mỹ",
      "Chứng chỉ đào tạo liên tục - Ứng dụng Laser, ánh sáng và các thiết bị năng lượng vật lý trong điều trị da thẩm mỹ"
    ],
    experienceYears: 6,
    specialtyStrengths: [
      "Điều trị mụn – kể cả mụn kháng trị",
      "Điều trị sẹo",
      "Điều trị sắc tố – nám – tàn nhang – đồi mồi",
      "Điều trị rụng tóc",
      "Thẩm mỹ nội khoa",
      "Nâng cơ",
      "Chăm sóc da chuyên sâu",
      "Điều trị các bệnh về da khác"
    ],
    philosophy: "Chữa lành là nền tảng, thẩm mỹ là nghệ thuật và sự tự tin của người bệnh là giá trị cuối cùng.",
    shortSummary: "Bác sĩ tại Phòng khám Da liễu Lạc’s Beauty Center. Với 6 năm kinh nghiệm; 5 bằng cấp và chương trình đào tạo chuyên môn.",
    fullBio: "ThS.BS. Trần Thị Ý Nhi hiện công tác với vai trò bác sĩ tại Phòng khám Da liễu Lạc’s Beauty Center. Với 6 năm kinh nghiệm trong lĩnh vực Da liễu, bác sĩ tham gia thăm khám, tư vấn và điều trị các bệnh lý về da, đồng thời thực hiện các phương pháp chăm sóc và thẩm mỹ da.\n\nBác sĩ tốt nghiệp Bác sĩ đa khoa tại Trường Đại học Y Dược Cần Thơ năm 2020. Sau đó, bác sĩ tiếp tục theo học chương trình Thạc sĩ Da liễu tại Trường Đại học Y Dược Cần Thơ và hoàn thành vào năm 2025.\n\nĐể nâng cao kiến thức và kỹ năng thực hành, bác sĩ đã tham gia các chương trình đào tạo chuyên môn, bao gồm: Chứng chỉ đào tạo liên tục về “Kỹ thuật tiêm chất làm đầy trong thẩm mỹ”; Chứng chỉ đào tạo liên tục về “Kỹ thuật tiêm Botulinum toxin trong thẩm mỹ”; và Chứng chỉ đào tạo liên tục về “Ứng dụng Laser, ánh sáng và các thiết bị năng lượng vật lý trong điều trị da thẩm mỹ”. Các chứng chỉ này bổ sung kiến thức và kỹ năng ứng dụng kỹ thuật trong lĩnh vực da liễu và thẩm mỹ nội khoa.",
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
    name: "Nguyễn Thị Thủy Quyên",
    degree: "BS",
    formalTitle: "BS. Nguyễn Thị Thủy Quyên",
    roleAtClinic: "Bác sĩ tại Phòng khám Da liễu Lạc's Beauty Center",
    specialty: "Da liễu",
    slug: "bs-nguyen-thi-thuy-quyen",
    licenseNumber: "Đang cập nhật (Chờ xác nhận)",
    scopeOfPractice: "",
    educationHistory: [],
    certifications: [],
    experienceYears: 0,
    specialtyStrengths: [],
    philosophy: "",
    shortSummary: "Bác sĩ tại Phòng khám Da liễu Lạc's Beauty Center.",
    fullBio: "BS. Nguyễn Thị Thủy Quyên hiện công tác với vai trò Bác sĩ tại Phòng khám Da liễu Lạc's Beauty Center.",
    schedule: [
      { facility: "Cơ sở 01 (Đường 3/2)", days: "Thứ 3, Thứ 6", hours: "09:00 – 16:30" },
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
