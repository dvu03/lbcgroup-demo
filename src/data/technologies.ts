export interface TechnologyItem {
  id: string;
  code: string;
  name: string;
  deviceOrigin: string; // Tên thiết bị – hãng – xuất xứ
  appliedService: string;
  bannerTitle?: string;
  slug: string;
  principle: string; // Nguyên lý ≤ 50 từ, dễ hiểu
  benefits: string[]; // 3 lợi ích chính
  sessionProcess: string[]; // Quy trình 1 buổi
  certifications: string; // FDA/CE & số lưu hành TBYT
  imageUrl: string;
  actionImageUrl: string;
  showOnHomeBanner2: boolean;
  isVerified: boolean;
}

export const initialTechnologies: TechnologyItem[] = [
  {
    id: "cn-01",
    code: "CN-01",
    name: "Công nghệ Nâng cơ RF Jovena",
    deviceOrigin: "Hệ thống Jovena RF – Brera Medical Technologies – Ý",
    appliedService: "Dịch vụ Nâng cơ, trẻ hóa da, làm săn chắc vùng viền hàm và rãnh cười",
    bannerTitle: "Nâng cơ RF Jovena – Dịch vụ nâng cơ, trẻ hóa da",
    slug: "nang-co-rf-jovena",
    principle: "Sử dụng sóng tần số vô tuyến RF đa tầng tác động nhiệt có kiểm soát vào lớp biểu bì và trung bì sâu, kích thích tăng sinh tức thì mạng lưới collagen và elastin mới mà không gây tổn thương bề mặt.",
    benefits: [
      "Làm mờ rõ rệt nếp nhăn đuôi mắt, rãnh mũi má và săn chắc vùng nọng cằm",
      "Kích thích tái tạo tế bào tự thân, cải thiện kết cấu da mịn màng từ bên trong",
      "Quy trình điều trị êm ái, hoàn toàn không đau, không cần thời gian nghỉ dưỡng"
    ],
    sessionProcess: [
      "Bước 1: Làm sạch da chuyên sâu và thoa gel dẫn truyền năng lượng nhiệt y khoa",
      "Bước 2: Cài đặt mức năng lượng và tần số sóng RF phù hợp với độ dày từng vùng da",
      "Bước 3: Bác sĩ/chuyên viên di chuyển đầu máy theo vector nâng cơ khuôn mặt",
      "Bước 4: Đắp mặt nạ sinh học làm dịu da và thoa kem khóa ẩm phục hồi"
    ],
    certifications: "Đạt chứng nhận an toàn CE Châu Âu (Số lưu hành TBYT: Cần đối chiếu hồ sơ nhập khẩu)",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
    actionImageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
    showOnHomeBanner2: true,
    isVerified: false
  },
  {
    id: "cn-02",
    code: "CN-02",
    name: "Công nghệ Sóng siêu âm hội tụ HIFU",
    deviceOrigin: "Hệ thống HIFU vi điểm đa tầng – Hàn Quốc",
    appliedService: "Dịch vụ Nâng cơ thon gọn mặt, tạo đường nét V-line tự nhiên",
    bannerTitle: "Sóng siêu âm HIFU – Dịch vụ nâng cơ, săn chắc da",
    slug: "song-sieu-am-hifu",
    principle: "Hội tụ năng lượng sóng siêu âm cường độ cao tại độ sâu 3.0mm – 4.5mm đến tận lớp cân cơ nông SMAS, tạo các điểm đông nhiệt vi mô giúp co rút và nâng đỡ các vùng mô chùng nhão.",
    benefits: [
      "Tác động sâu đến tầng cân cơ tương đương phẫu thuật thẩm mỹ căng da",
      "Định hình đường viền hàm sắc nét, giảm mỡ má bầu và nọng cằm chảy xệ",
      "Hiệu quả duy trì dài lâu từ 6 đến 12 tháng chỉ sau 1 buổi liệu trình"
    ],
    sessionProcess: [
      "Bước 1: Bác sĩ định hình các điểm mốc giải phẫu trên khuôn mặt",
      "Bước 2: Ủ tê nhẹ nhàng tạo cảm giác thoải mái tối đa cho khách hàng",
      "Bước 3: Đi máy HIFU với số shot năng lượng được tính toán chuẩn xác",
      "Bước 4: Massage thư giãn và hướng dẫn cách duy trì độ săn chắc tại nhà"
    ],
    certifications: "Chứng nhận FDA Hoa Kỳ & KFDA Hàn Quốc (Chờ xác nhận hồ sơ lưu hành)",
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80",
    actionImageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
    showOnHomeBanner2: true,
    isVerified: false
  },
  {
    id: "cn-03",
    code: "CN-03",
    name: "Hệ thống Laser Quang học Điều trị Sắc tố",
    deviceOrigin: "Laser Q-Switched / Picosecond thế hệ mới – Hoa Kỳ/Hàn Quốc",
    appliedService: "Dịch vụ Điều trị nám, tàn nhang, đồi mồi, xóa xăm và thâm sau viêm",
    bannerTitle: "Laser quang học – Dịch vụ điều trị nám, sắc tố da",
    slug: "laser-dieu-tri-sac-to",
    principle: "Phát ra các xung năng lượng cực ngắn tính bằng nano hoặc pico giây, phá vỡ liên kết melanin thành các hạt siêu nhỏ để hệ thống đại thực bào cơ thể tự đào thải an toàn.",
    benefits: [
      "Tác động quang cơ có chọn lọc cao, không gây tổn thương hay bỏng biểu bì",
      "Xử lý hiệu quả cả nám mảng nông và các chân nám sâu dưới lớp trung bì",
      "Kích thích trẻ hóa bề mặt da, giúp da đều màu và sáng mịn tự nhiên"
    ],
    sessionProcess: [
      "Bước 1: Soi da đánh giá mật độ và độ sâu chân sắc tố trước khi bắn",
      "Bước 2: Làm sạch sâu và che mắt bảo vệ bằng kính quang học chuyên dụng",
      "Bước 3: Bác sĩ chuyên khoa trực tiếp điều chỉnh bước sóng và phát xung laser",
      "Bước 4: Chườm mát dịu da và thoa tinh chất ức chế sắc tố độc quyền"
    ],
    certifications: "Chứng nhận an toàn chuẩn CE & Giấy phép thiết bị y tế loại B (Bộ Y tế)",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
    actionImageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    showOnHomeBanner2: true,
    isVerified: false
  },
  {
    id: "cn-04",
    code: "CN-04",
    name: "Công nghệ Laser Vi điểm Fractional Tái tạo Sẹo",
    deviceOrigin: "Hệ thống Laser Fractional CO2 – Hãng thiết bị y tế Hoa Kỳ",
    appliedService: "Dịch vụ Điều trị sẹo rỗ, thu nhỏ lỗ chân lông và làm mịn bề mặt da",
    bannerTitle: "Laser Fractional vi điểm – Dịch vụ điều trị sẹo rỗ, tái tạo da",
    slug: "laser-fractional-tri-seo",
    principle: "Tạo ra hàng ngàn vi cột tổn thương nhiệt có kiểm soát xuyên sâu vào lớp biểu bì, khởi động cơ chế tự chữa lành của cơ thể để tái cấu trúc mạng lưới collagen làm đầy hố sẹo.",
    benefits: [
      "Cải thiện độ sâu sẹo rỗ rõ rệt, đặc biệt khi kết hợp kỹ thuật bóc tách đáy sẹo",
      "Tái tạo lớp sừng da mới, se khít lỗ chân lông và trẻ hóa toàn diện bề mặt",
      "Mức độ tổn thương được phân tách vi mô giúp thời gian lành thương nhanh hơn"
    ],
    sessionProcess: [
      "Bước 1: Bác sĩ sát khuẩn và ủ tê chuyên dụng 30 – 45 phút",
      "Bước 2: Bóc tách chân xơ sẹo co kéo dưới da bằng kim y khoa",
      "Bước 3: Chiếu vi điểm Laser Fractional CO2 đều khắp bề mặt vùng sẹo",
      "Bước 4: Điện di tinh chất tế bào gốc tăng trưởng và chiếu đèn làm dịu"
    ],
    certifications: "Chứng nhận FDA Hoa Kỳ (Chờ đối chiếu hồ sơ lưu hành TBYT)",
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80",
    actionImageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    showOnHomeBanner2: true,
    isVerified: false
  },
  {
    id: "cn-05",
    code: "CN-05",
    name: "Công nghệ Diode Laser Triệt lông Làm mát Thông minh",
    deviceOrigin: "Máy Diode Laser 808nm – Hàn Quốc",
    appliedService: "Dịch vụ Triệt lông sạch nang lông và hỗ trợ trị viêm nang lông",
    slug: "diode-laser-triet-long",
    principle: "Bước sóng 808nm hấp thụ chọn lọc bởi sắc tố melanin trong mầm nhú nang lông, chuyển thành nhiệt năng làm teo mạch máu nuôi dưỡng lông mà không gây rát bề mặt da.",
    benefits: [
      "Đầu làm mát bằng đá sapphire duy trì nhiệt độ -5°C, triệt lông hoàn toàn không đau",
      "Triệt sạch mọi vùng lông dày cứng đến lông tơ mảnh mà không kích ứng",
      "Hỗ trợ giảm thâm sạm và cải thiện tình trạng viêm lỗ chân lông"
    ],
    sessionProcess: [
      "Bước 1: Làm sạch và cạo sạch phần ngọn lông xuôi chiều",
      "Bước 2: Bôi một lớp gel dẫn truyền lạnh làm dịu da",
      "Bước 3: Bác sĩ/kỹ thuật viên di đầu xung laser trượt đều trên bề mặt da",
      "Bước 4: Vệ sinh sạch gel và thoa kem dưỡng ẩm phục hồi"
    ],
    certifications: "Chứng nhận CE & FDA (Chờ xác nhận hồ sơ lưu hành)",
    imageUrl: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=1000&q=80",
    actionImageUrl: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=1200&q=80",
    showOnHomeBanner2: false,
    isVerified: false
  },
  {
    id: "cn-06",
    code: "CN-06",
    name: "Hệ thống Soi Da & Phân tích Đa tầng VISIA 3D",
    deviceOrigin: "Canfield Scientific – Hoa Kỳ",
    appliedService: "Thăm khám, lập phác đồ cá nhân hóa và đo lường trước – sau điều trị",
    bannerTitle: "Soi da VISIA 3D – Dịch vụ phân tích da đa tầng, lập phác đồ",
    slug: "soi-da-visia-3d",
    principle: "Sử dụng công nghệ chụp ảnh ma trận ánh sáng phân cực chéo, phân cực song song và tia UV để quét toàn bộ khuôn mặt, đo lường chính xác 8 chỉ số sức khỏe của da.",
    benefits: [
      "Phát hiện chính xác tổn thương sắc tố, mạch máu và ổ vi khuẩn ẩn sâu dưới da",
      "Mô phỏng quá trình lão hóa da trong tương lai nếu không có phác đồ chăm sóc",
      "Định lượng chính xác tỷ lệ phần trăm cải thiện sau mỗi đợt điều trị"
    ],
    sessionProcess: [
      "Bước 1: Tẩy trang sạch toàn bộ khuôn mặt để da trở về trạng thái mộc tự nhiên",
      "Bước 2: Đặt cằm vào khoang chụp chuẩn ánh sáng của máy VISIA 3D",
      "Bước 3: Chụp 3 góc nghiêng (chính diện, trái, phải) trong vòng 2 phút",
      "Bước 4: Bác sĩ cùng khách hàng đọc báo cáo phân tích chi tiết trên màn hình lớn"
    ],
    certifications: "Hệ thống tiêu chuẩn vàng lâm sàng toàn cầu do Canfield Scientific chế tạo",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80",
    actionImageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    showOnHomeBanner2: true,
    isVerified: true
  }
];
