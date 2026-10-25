const fs = require('fs');
const path = require('path');

const data = [
  // ==========================================
  // 1. HEADER & TOPBAR (TOÀN TRANG)
  // ==========================================
  {
    stt: 1,
    page: "Toàn website (Header Topbar)",
    section: "Thanh thông báo đầu trang (Top Announcement Banner)",
    title: "Đơn vị sở hữu máy soi da VISIA 3D đầu tiên tại Việt Nam",
    type: "Thông báo nổi bật đầu trang",
    content: "Đơn vị sở hữu máy soi da VISIA 3D đầu tiên tại Việt Nam. Soi da công nghệ cao – Thấy được kết quả trước khi thực hiện.",
    note: "Có thể bật/tắt hoặc chỉnh màu, ảnh nền qua CMS Admin"
  },
  {
    stt: 2,
    page: "Toàn website (Header Topbar)",
    section: "Lời chào đầu trang (Welcome Messages xoay vòng)",
    title: "Thông điệp định vị LBC",
    type: "Lời chào & Định vị",
    content: "LBC xin chào. | Hướng đến Y học Cá nhân hóa. | Tiên phong trong ứng dụng công nghệ cao.",
    note: "Xoay vòng tự động mỗi 3-5 giây trên thanh tiện ích Header"
  },
  {
    stt: 3,
    page: "Toàn website (Header Navigation)",
    section: "Khẩu hiệu thương hiệu dưới Logo (Tagline)",
    title: "Tagline thương hiệu",
    type: "Khẩu hiệu thương hiệu",
    content: "Tiên phong công nghệ cao – Hướng đến Y học Cá nhân hóa",
    note: "Xuất hiện bên cạnh/dưới tên thương hiệu Lạc's Beauty Center"
  },

  // ==========================================
  // 2. TRANG CHỦ - HERO SLIDER (5 SLIDES)
  // ==========================================
  {
    stt: 4,
    page: "Trang chủ (/)",
    section: "Hero Slider - Slide 1",
    title: "Lạc's Beauty Center – Tiên phong Y học Cá nhân hóa",
    type: "Giới thiệu chung phòng khám",
    content: "[Badge: Phòng khám Chuyên khoa Da liễu]\nTiêu đề: Lạc's Beauty Center – Tiên phong Y học Cá nhân hóa\nMô tả: Chẩn đoán chính xác bằng hệ thống soi da VISIA 3D và phác đồ điều trị chuyên biệt cho từng làn da.",
    note: "Nút CTA: 'Tìm hiểu về phòng khám' điều hướng về /gioi-thieu"
  },
  {
    stt: 5,
    page: "Trang chủ (/)",
    section: "Hero Slider - Slide 2",
    title: "100% Bác sĩ trình độ Sau Đại học trực tiếp thăm khám",
    type: "Giới thiệu năng lực bác sĩ",
    content: "[Badge: Đội ngũ Chuyên môn Cấp cao]\nTiêu đề: 100% Bác sĩ trình độ Sau Đại học trực tiếp thăm khám\nMô tả: Thạc sĩ, Bác sĩ Chuyên khoa I & II giàu kinh nghiệm lâm sàng đồng hành suốt toàn bộ phác đồ điều trị.",
    note: "Nút CTA: 'Gặp gỡ đội ngũ bác sĩ' điều hướng về /doi-ngu-bac-si"
  },
  {
    stt: 6,
    page: "Trang chủ (/)",
    section: "Hero Slider - Slide 3",
    title: "Sở hữu máy soi da VISIA 3D đầu tiên tại Việt Nam",
    type: "Giới thiệu công nghệ",
    content: "[Badge: Công nghệ Thẩm mỹ Tiên tiến]\nTiêu đề: Sở hữu máy soi da VISIA 3D đầu tiên tại Việt Nam\nMô tả: Ứng dụng các công nghệ điều trị nâng cơ RF Jovena, HIFU và Laser vi điểm đạt chuẩn quốc tế.",
    note: "Nút CTA: 'Khám phá công nghệ' điều hướng về /cong-nghe"
  },
  {
    stt: 7,
    page: "Trang chủ (/)",
    section: "Hero Slider - Slide 4",
    title: "Chào đón Cơ sở 02 Lạc's Beauty Center tại Cần Thơ",
    type: "Giới thiệu mở rộng cơ sở",
    content: "[Badge: Mở rộng Hệ thống Y tế]\nTiêu đề: Chào đón Cơ sở 02 Lạc's Beauty Center tại Cần Thơ\nMô tả: Không gian chuẩn y khoa hiện đại, tiện nghi sẵn sàng phục vụ khách hàng trên toàn khu vực miền Tây.",
    note: "Nút CTA: 'Xem hệ thống cơ sở' điều hướng về /he-thong-co-so"
  },
  {
    stt: 8,
    page: "Trang chủ (/)",
    section: "Hero Slider - Slide 5",
    title: "Lạc's Academy – Đào tạo chăm sóc da chuẩn Y khoa",
    type: "Giới thiệu học viện đào tạo",
    content: "[Badge: Học viện Đào tạo Nghề]\nTiêu đề: Lạc's Academy – Đào tạo chăm sóc da chuẩn Y khoa\nMô tả: Chương trình thực hành trên 80% thời lượng, cấp chứng chỉ sơ cấp chính quy tự tin lập nghiệp.",
    note: "Nút CTA: 'Tư vấn khóa học' điều hướng về /dao-tao"
  },

  // ==========================================
  // 3. TRANG CHỦ - SIDE BANNERS
  // ==========================================
  {
    stt: 9,
    page: "Trang chủ (/)",
    section: "Side Banner 1 (Cạnh Hero Slider)",
    title: "Soi da đa tầng VISIA 3D",
    type: "Giới thiệu dịch vụ soi da",
    content: "[Tag: ĐẶT LỊCH NGAY]\nTiêu đề: Soi da đa tầng VISIA 3D\nMô tả: Đo lường 8 chỉ số sức khỏe làn da & tư vấn trực tiếp cùng Bác sĩ Chuyên khoa.",
    note: "Nút CTA: 'Đặt lịch thăm khám' (/dat-lich-kham)"
  },
  {
    stt: 10,
    page: "Trang chủ (/)",
    section: "Side Banner 2 (Cạnh Hero Slider)",
    title: "Dược mỹ phẩm Quốc tế",
    type: "Giới thiệu nhà thuốc & phân phối",
    content: "[Tag: 100% CHÍNH HÃNG]\nTiêu đề: Dược mỹ phẩm Quốc tế\nMô tả: Bioderma, Biotrade, PostQuam nhập khẩu chính ngạch bảo vệ da nhạy cảm.",
    note: "Nút CTA: 'Khám phá sản phẩm' (/duoc-my-pham)"
  },

  // ==========================================
  // 4. TRANG CHỦ - LỜI NGỎ VỀ LẠC'S BEAUTY CENTER
  // ==========================================
  {
    stt: 11,
    page: "Trang chủ (/)",
    section: "Section 'Về Lạc's Beauty Center' (AboutSummary)",
    title: "Lời ngỏ giới thiệu phòng khám",
    type: "Tuyên ngôn sứ mệnh & định vị",
    content: "Tọa lạc tại trung tâm thành phố Cần Thơ, Lạc's Beauty Center được xây dựng với định vị là phòng khám da liễu chuẩn y khoa chuyên sâu. Chúng tôi không chạy theo các trào lưu làm đẹp lột tẩy cấp tốc, mà kiên định theo đuổi triết lý Y học Cá nhân hóa: mỗi làn da cần một phác đồ khoa học riêng biệt dựa trên bằng chứng soi da vi thể và theo dõi sát sao của bác sĩ chuyên khoa sau đại học.",
    note: "Kèm số liệu: '10.000+ Ca điều trị chuẩn Y khoa' & 'VISIA 3D'"
  },
  {
    stt: 12,
    page: "Trang chủ (/)",
    section: "Section 'Về Lạc's Beauty Center' - Thẻ trọng tâm 1",
    title: "Đội ngũ Chuyên môn Sau Đại học",
    type: "Giới thiệu nhân sự y khoa",
    content: "100% bác sĩ có học vị Thạc sĩ, Bác sĩ Chuyên khoa I & II giàu kinh nghiệm, trực tiếp khám và lên phác đồ.",
    note: "Thẻ cam kết chuyên môn"
  },
  {
    stt: 13,
    page: "Trang chủ (/)",
    section: "Section 'Về Lạc's Beauty Center' - Thẻ trọng tâm 2",
    title: "Công nghệ Tiên tiến & Minh bạch",
    type: "Giới thiệu công nghệ",
    content: "Đơn vị sở hữu máy soi da VISIA 3D đầu tiên tại Việt Nam, máy nâng cơ RF Jovena, HIFU và Laser nhập khẩu chính hãng.",
    note: "Thẻ cam kết công nghệ chính hãng"
  },
  {
    stt: 14,
    page: "Trang chủ (/)",
    section: "Section 'Về Lạc's Beauty Center' - Thẻ trọng tâm 3",
    title: "Không gian Chuẩn Y khoa & Tận tâm",
    type: "Giới thiệu cơ sở vật chất & y đức",
    content: "Hệ thống 2 cơ sở khang trang, phòng thủ thuật vô trùng khép kín và phong cách phục vụ chu đáo, gần gũi với người miền Tây.",
    note: "Thẻ cam kết dịch vụ khách hàng"
  },

  // ==========================================
  // 5. TRANG CHỦ - 5 CHUYÊN KHOA TRỌNG TÂM
  // ==========================================
  {
    stt: 15,
    page: "Trang chủ (/) & /chuyen-khoa",
    section: "Section 5 Chuyên khoa - Tiêu đề chung",
    title: "5 Chuyên khoa & Lĩnh vực Trọng tâm",
    type: "Lời dẫn chuyên khoa",
    content: "Hệ sinh thái y tế toàn diện với 5 trụ cột chuyên môn khép kín, đảm bảo khách hàng nhận được sự chăm sóc chuẩn y khoa từ khâu chẩn đoán đến điều trị và phục hồi.",
    note: "Mẫu banner 5 thẻ ngang với nền ảnh phủ toàn bộ"
  },
  {
    stt: 16,
    page: "Trang chủ (/) & /khoa-da-lieu",
    section: "5 Chuyên khoa - Chuyên khoa 1: Khoa Da liễu",
    title: "Khoa Da liễu – Chẩn đoán chính xác, Điều trị tận gốc",
    type: "Giới thiệu chuyên khoa Da liễu",
    content: "[Tagline: Chẩn đoán chính xác – Điều trị tận gốc]\n[Mô tả ngắn]: Thăm khám và điều trị các bệnh lý da, mụn, nám và các vấn đề về da.\n[Mô tả đầy đủ]: Khoa Da liễu Lạc's Beauty Center là mũi nhọn chuyên môn của phòng khám. Dưới sự phụ trách trực tiếp của đội ngũ bác sĩ chuyên khoa da liễu trình độ sau đại học, khoa tiếp nhận và điều trị toàn diện các bệnh lý da liễu từ thường gặp đến phức tạp. Ứng dụng công nghệ soi da đa tầng VISIA 3D giúp phân tích sâu 8 chỉ số của da, từ đó xây dựng phác đồ cá nhân hóa cho từng khách hàng, kết hợp công nghệ cao và thuốc điều trị an toàn.\n[Dịch vụ chủ lực]: Điều trị mụn & mụn kháng trị; Điều trị sẹo rỗ kỹ thuật cao; Điều trị rối loạn sắc tố (nám, tàn nhang); Nâng cơ RF Jovena & HIFU; Thẩm mỹ nội khoa; Rụng tóc.",
    note: "Phụ trách: Bác sĩ chuyên khoa Da liễu sau đại học"
  },
  {
    stt: 17,
    page: "Trang chủ (/) & /khoa-xet-nghiem",
    section: "5 Chuyên khoa - Chuyên khoa 2: Khoa Xét nghiệm",
    title: "Khoa Xét nghiệm – Chuẩn xác, Nhanh chóng",
    type: "Giới thiệu chuyên khoa Xét nghiệm",
    content: "[Tagline: Chuẩn xác – Nhanh chóng – Hỗ trợ chẩn đoán tối ưu]\n[Mô tả ngắn]: Hỗ trợ chẩn đoán và theo dõi sức khỏe với quy trình xét nghiệm phù hợp.\n[Mô tả đầy đủ]: Khoa Xét nghiệm đóng vai trò nền tảng trong việc xác định chính xác nguyên nhân gốc rễ của các vấn đề da liễu dai dẳng. Được trang bị hệ thống kính hiển vi soi tươi độ phóng đại cao và thiết bị phân tích hiện đại, khoa cung cấp kết quả nhanh chóng, chính xác nhằm hỗ trợ bác sĩ kê đơn thuốc và phác đồ điều trị đúng hướng, tránh tình trạng điều trị mò hay lạm dụng corticoid.\n[Dịch vụ chủ lực]: Soi tươi tìm Demodex; Soi tươi & cấy vi nấm ngoài da; Kháng sinh đồ mụn mủ; Xét nghiệm máu cơ bản; Kiểm tra men gan/thận khi dùng thuốc đặc trị.",
    note: "Quy trình vô trùng nghiêm ngặt"
  },
  {
    stt: 18,
    page: "Trang chủ (/) & /nha-thuoc",
    section: "5 Chuyên khoa - Chuyên khoa 3: Nhà thuốc",
    title: "Nhà thuốc chuẩn GPP – Thuốc chuẩn, Tư vấn tận tâm",
    type: "Giới thiệu Nhà thuốc GPP",
    content: "[Tagline: Thuốc chuẩn GPP – Tư vấn tận tâm]\n[Mô tả ngắn]: Tư vấn và cung cấp thuốc theo quy định, phù hợp với nhu cầu điều trị.\n[Mô tả đầy đủ]: Nhà thuốc Chuyên khoa Da liễu Lạc's Beauty Center đạt chuẩn Thực hành tốt cơ sở bán lẻ thuốc (GPP). Nhà thuốc chuyên cung ứng các danh mục thuốc da liễu chuyên biệt, thuốc kháng sinh, kháng nấm, điều hòa miễn dịch và dưỡng ẩm y tế do chính bác sĩ phòng khám chỉ định. Lưu ý pháp lý: Nhà thuốc chỉ phục vụ cấp phát thuốc trực tiếp theo đơn hợp lệ tại phòng khám, không bán thuốc kê đơn trực tuyến qua mạng.",
    note: "Đạt chuẩn GPP Sở Y Tế Cần Thơ"
  },
  {
    stt: 19,
    page: "Trang chủ (/) & /duoc-my-pham",
    section: "5 Chuyên khoa - Chuyên khoa 4: Dược – Mỹ phẩm",
    title: "Dược – Mỹ phẩm – 100% Chính hãng, Nhập khẩu ủy quyền",
    type: "Giới thiệu phân phối Dược mỹ phẩm",
    content: "[Tagline: 100% Chính hãng – Nhập khẩu ủy quyền]\n[Mô tả ngắn]: Khám phá các dòng dược mỹ phẩm phù hợp với nhu cầu chăm sóc da.\n[Mô tả đầy đủ]: Lạc's Beauty Center là đối tác phân phối chính hãng của các tập đoàn dược mỹ phẩm danh tiếng từ Pháp, Tây Ban Nha, Bulgaria như Bioderma, Biotrade, PostQuam. Mọi sản phẩm đều có đầy đủ hóa đơn chứng từ, tem chống hàng giả và số phiếu công bố mỹ phẩm của Bộ Y tế. Các dòng sản phẩm được chọn lọc khắt khe dựa trên hiệu quả lâm sàng cho da mụn, da sau xâm lấn và da nhiễm độc corticoid.",
    note: "Đối tác chiến lược Bioderma, Biotrade, PostQuam"
  },
  {
    stt: 20,
    page: "Trang chủ (/) & /dao-tao",
    section: "5 Chuyên khoa - Chuyên khoa 5: Đào tạo nghề",
    title: "Đào tạo nghề – LBC Academy: Vững tay nghề, Chuẩn y khoa",
    type: "Giới thiệu Học viện Đào tạo",
    content: "[Tagline: Vững tay nghề – Chuẩn y khoa – Tự tin lập nghiệp]\n[Mô tả ngắn]: Đào tạo kỹ thuật viên và kiến thức chăm sóc da theo chương trình chuyên môn.\n[Mô tả đầy đủ]: Lạc's Academy là đơn vị đào tạo nghề trực thuộc hệ sinh thái LBC Group, chuyên cung cấp các khóa học chăm sóc da sơ cấp và nâng cao. Học viên được đào tạo trực tiếp bởi các bác sĩ da liễu và chuyên viên tay nghề cao, thực hành trên 80% thời lượng với hệ thống máy móc công nghệ hiện đại. Sau tốt nghiệp, học viên được cấp chứng chỉ nghề hợp pháp và có cơ hội làm việc ngay tại hệ thống phòng khám hoặc tự mở spa.",
    note: "Thực hành trên 80% thời lượng với máy móc hiện đại"
  },

  // ==========================================
  // 6. TRANG CHỦ & HỒ SƠ 4 BÁC SĨ THẬT
  // ==========================================
  {
    stt: 21,
    page: "Trang chủ (/) & /doi-ngu-bac-si",
    section: "Section Đội ngũ Bác sĩ - Tiêu đề chung",
    title: "Bác Sĩ Trình Độ Sau Đại Học",
    type: "Giới thiệu tiêu chuẩn chuyên môn",
    content: "100% Bác sĩ tại phòng khám tốt nghiệp chuyên khoa Da liễu sau đại học từ các trường Đại học Y Dược danh tiếng, trực tiếp thăm khám và theo dõi suốt phác đồ.",
    note: "Tiêu chí bắt buộc của thương hiệu"
  },
  {
    stt: 22,
    page: "Trang chủ (/) & /bs-lac-thi-kim-ngan",
    section: "Hồ sơ Bác sĩ 1: ThS.BS.CKI. Lạc Thị Kim Ngân",
    title: "ThS.BS.CKI. Lạc Thị Kim Ngân - Giám đốc Chuyên môn",
    type: "Tiểu sử & Triết lý bác sĩ",
    content: "[Tóm tắt hiển thị thẻ]: Giám đốc Chuyên môn tại Phòng khám Da liễu Lạc’s Beauty Center. Với 8 năm kinh nghiệm; 9 chứng chỉ, bằng cấp và chương trình đào tạo chuyên môn.\n\n[Tiểu sử đầy đủ]: ThS.BS.CKI Lạc Thị Kim Ngân hiện đảm nhiệm vị trí Giám đốc Chuyên môn tại Phòng khám Da liễu Lạc’s Beauty Center. Ngoài ra hiện tại bác sĩ còn là Giảng viên bộ môn Da liễu và đang công tác tại trường Đại học Y Dược Cần Thơ.\nBác sĩ tốt nghiệp Bác sĩ đa khoa tại Trường Đại học Y Dược Cần Thơ năm 2018 với thành tích xuất sắc, sau đó bác sĩ tiếp tục tham gia chương trình đào tạo Bác sĩ nội trú Chuyên khoa I chuyên ngành Da liễu và hoàn thành chương trình vào năm 2021.\nBên cạnh nền tảng đào tạo y khoa, bác sĩ đã tham gia các chương trình đào tạo, bồi dưỡng chuyên môn với 8 chứng nhận/chứng chỉ. Đặc biệt, bác sĩ còn có 2 lần được Bộ trưởng Bộ Y tế vinh dự trao tặng Bằng khen vì đã có thành tích xuất sắc trong thực hiện nhiệm vụ, kế hoạch công tác y tế.\nVới định hướng đề cao hiệu quả và tính an toàn, bác sĩ hướng đến xây dựng giải pháp chăm sóc, điều trị da phù hợp với tình trạng và nhu cầu riêng của từng khách hàng.\n\n[Triết lý hành nghề]: 'Làm đẹp hiệu quả và an toàn'",
    note: "Phạm vi: Khám bệnh, chữa bệnh chuyên khoa Da liễu. 8 năm KN."
  },
  {
    stt: 23,
    page: "Trang chủ (/) & /bs-le-thi-minh-thu",
    section: "Hồ sơ Bác sĩ 2: ThS.BS.CKI. Lê Thị Minh Thư",
    title: "ThS.BS.CKI. Lê Thị Minh Thư - Bác sĩ điều trị",
    type: "Tiểu sử bác sĩ",
    content: "[Tóm tắt hiển thị thẻ]: Bác sĩ tại Phòng khám Da liễu Lạc’s Beauty Center. Với 4 năm kinh nghiệm; 4 bằng cấp và chương trình đào tạo chuyên môn.\n\n[Tiểu sử đầy đủ]: ThS.BS.CKI Lê Thị Minh Thư hiện công tác với vai trò Bác sĩ tại Phòng khám Da liễu Lạc’s Beauty Center. Với 4 năm kinh nghiệm công tác chuyên môn Da liễu, bác sĩ sở hữu nền tảng đào tạo bài bản với Bằng Bác sĩ Y đa khoa, Thạc sĩ Y học Nội khoa, Chuyên khoa cấp I và Bác sĩ Nội trú Bệnh viện.",
    note: "4 năm kinh nghiệm lâm sàng da liễu."
  },
  {
    stt: 24,
    page: "Trang chủ (/) & /bs-tran-thi-y-nhi",
    section: "Hồ sơ Bác sĩ 3: ThS.BS. Trần Thị Ý Nhi",
    title: "ThS.BS. Trần Thị Ý Nhi - Bác sĩ điều trị",
    type: "Tiểu sử & Triết lý bác sĩ",
    content: "[Tóm tắt hiển thị thẻ]: Bác sĩ tại Phòng khám Da liễu Lạc’s Beauty Center. Với 6 năm kinh nghiệm; 5 bằng cấp và chương trình đào tạo chuyên môn.\n\n[Tiểu sử đầy đủ]: ThS.BS. Trần Thị Ý Nhi hiện công tác với vai trò bác sĩ tại Phòng khám Da liễu Lạc’s Beauty Center. Với 6 năm kinh nghiệm trong lĩnh vực Da liễu, bác sĩ tham gia thăm khám, tư vấn và điều trị các bệnh lý về da, đồng thời thực hiện các phương pháp chăm sóc và thẩm mỹ da.\nBác sĩ tốt nghiệp Bác sĩ đa khoa tại Trường Đại học Y Dược Cần Thơ năm 2020. Sau đó, bác sĩ tiếp tục theo học chương trình Thạc sĩ Da liễu tại Trường Đại học Y Dược Cần Thơ và hoàn thành vào năm 2025.\nĐể nâng cao kiến thức và kỹ năng thực hành, bác sĩ đã tham gia các chương trình đào tạo chuyên môn, bao gồm: Chứng chỉ đào tạo liên tục về “Kỹ thuật tiêm chất làm đầy trong thẩm mỹ”; Chứng chỉ đào tạo liên tục về “Kỹ thuật tiêm Botulinum toxin trong thẩm mỹ”; và Chứng chỉ đào tạo liên tục về “Ứng dụng Laser, ánh sáng và các thiết bị năng lượng vật lý trong điều trị da thẩm mỹ”. Các chứng chỉ này bổ sung kiến thức và kỹ năng ứng dụng kỹ thuật trong lĩnh vực da liễu và thẩm mỹ nội khoa.\n\n[Triết lý hành nghề]: 'Chữa lành là nền tảng, thẩm mỹ là nghệ thuật và sự tự tin của người bệnh là giá trị cuối cùng.'",
    note: "Phạm vi: Khám chữa bệnh nội khoa + bổ sung Da liễu. 6 năm KN."
  },
  {
    stt: 25,
    page: "Trang chủ (/) & /bs-nguyen-thi-thuy-quyen",
    section: "Hồ sơ Bác sĩ 4: BS. Nguyễn Thị Thủy Quyên",
    title: "BS. Nguyễn Thị Thủy Quyên - Bác sĩ điều trị",
    type: "Tiểu sử bác sĩ",
    content: "[Tóm tắt hiển thị thẻ]: Bác sĩ tại Phòng khám Da liễu Lạc's Beauty Center.\n\n[Tiểu sử đầy đủ]: BS. Nguyễn Thị Thủy Quyên hiện công tác với vai trò Bác sĩ tại Phòng khám Da liễu Lạc's Beauty Center.",
    note: "Các trường chi tiết khác đang để trống để người dùng bổ sung sau."
  },

  // ==========================================
  // 7. CÔNG NGHỆ CAO & TRANG THIẾT BỊ
  // ==========================================
  {
    stt: 26,
    page: "Trang chủ (/) & /cong-nghe",
    section: "Section Công nghệ - Tiêu đề chung",
    title: "Hệ Thống Thiết Bị & Công Nghệ Chuẩn Quốc Tế",
    type: "Giới thiệu hệ thống công nghệ",
    content: "Đầu tư đồng bộ trang thiết bị nhập khẩu chính hãng từ Mỹ, Châu Âu và Hàn Quốc, đáp ứng các tiêu chuẩn khắt khe của FDA và CE.",
    note: "Trang bị đầy đủ cho 2 cơ sở"
  },
  {
    stt: 27,
    page: "Trang chủ (/) & /cong-nghe/may-soi-da-visia-3d",
    section: "Công nghệ nổi bật: Máy Soi Da VISIA 3D",
    title: "Hệ thống Soi da Đa tầng VISIA 3D",
    type: "Giới thiệu thiết bị chẩn đoán",
    content: "[Xuất xứ: Canfield Scientific – Hoa Kỳ]\n[Nguyên lý]: Sử dụng hệ thống chụp đa phổ (ánh sáng trắng, ánh sáng phân cực chéo và tia UV) ghi lại hình ảnh bề mặt và dưới bề mặt da ở độ phân giải siêu cao, phân tích định lượng 8 chỉ số cốt lõi của làn da.\n[Lợi ích]: Thấy rõ tổn thương ẩn sâu dưới da; Đối chiếu chính xác kết quả trước – sau điều trị; Cá nhân hóa phác đồ chuẩn y khoa.",
    note: "Đơn vị sở hữu máy soi da VISIA 3D đầu tiên tại Việt Nam"
  },
  {
    stt: 28,
    page: "Trang chủ (/) & /cong-nghe/nang-co-rf-jovena",
    section: "Công nghệ nổi bật: Nâng cơ RF Jovena",
    title: "Công nghệ Nâng cơ RF Jovena",
    type: "Giới thiệu thiết bị nâng cơ",
    content: "[Xuất xứ: Brera Medical Technologies – Ý]\n[Nguyên lý]: Sử dụng sóng tần số vô tuyến RF đa tầng tác động nhiệt có kiểm soát vào lớp biểu bì và trung bì sâu, kích thích tăng sinh tức thì mạng lưới collagen và elastin mới mà không gây tổn thương bề mặt.\n[Lợi ích]: Làm mờ nếp nhăn rãnh cười, viền hàm; Tái tạo collagen tự thân săn chắc; Êm ái, không đau, không nghỉ dưỡng.",
    note: "Chứng nhận CE Châu Âu"
  },
  {
    stt: 29,
    page: "Trang chủ (/) & /cong-nghe/song-sieu-am-hifu",
    section: "Công nghệ nổi bật: Sóng siêu âm HIFU",
    title: "Công nghệ Sóng siêu âm hội tụ HIFU",
    type: "Giới thiệu thiết bị tạo hình V-line",
    content: "[Xuất xứ: Hàn Quốc]\n[Nguyên lý]: Hội tụ năng lượng sóng siêu âm cường độ cao tại độ sâu 3.0mm – 4.5mm đến tận lớp cân cơ nông SMAS, tạo các điểm đông nhiệt vi mô giúp co rút và nâng đỡ các vùng mô chùng nhão.\n[Lợi ích]: Nâng cơ tương đương phẫu thuật căng da; Định hình V-line sắc nét; Hiệu quả kéo dài 6-12 tháng.",
    note: "Tác động đến lớp cân cơ SMAS"
  },

  // ==========================================
  // 8. DỊCH VỤ ĐIỀU TRỊ CHUẨN Y KHOA
  // ==========================================
  {
    stt: 30,
    page: "Trang chủ (/) & /dich-vu",
    section: "Section Dịch vụ - Tiêu đề chung",
    title: "9 Dịch Vụ Điều Trị Da Liễu Chuyên Sâu",
    type: "Giới thiệu danh mục dịch vụ",
    content: "Tất cả các dịch vụ đều được bác sĩ chuyên khoa da liễu sau đại học trực tiếp thăm khám, lập phác đồ cá nhân hóa và theo dõi tiến trình hồi phục.",
    note: "Phác đồ cá nhân hóa theo từng ca"
  },
  {
    stt: 31,
    page: "Trang chủ (/) & /dich-vu/dieu-tri-mun",
    section: "Dịch vụ 1: Điều trị mụn – kể cả mụn kháng trị",
    title: "Tổng quan Điều trị mụn chuẩn Y khoa",
    type: "Giới thiệu dịch vụ Trị mụn",
    content: "Mụn trứng cá không đơn thuần là vấn đề thẩm mỹ mà là một bệnh lý da liễu mạn tính của hệ thống nang lông tuyến bã. Tại Phòng khám Chuyên khoa Da liễu Lạc's Beauty Center, chúng tôi áp dụng nguyên tắc Y học Cá nhân hóa: không dùng một công thức chung cho mọi khách hàng mà xây dựng phác đồ dựa trên kết quả soi da đa tầng VISIA 3D và tình trạng cơ địa thực tế. Quy trình vô trùng tuyệt đối, lấy nhân mụn chuẩn y khoa kết hợp chiếu ánh sáng sinh học và thuốc bôi/uống an toàn.",
    note: "Liệu trình từ 4 – 8 buổi tùy mức độ"
  },
  {
    stt: 32,
    page: "Trang chủ (/) & /dich-vu/dieu-tri-seo",
    section: "Dịch vụ 2: Điều trị sẹo rỗ, sẹo lõm đa mô thức",
    title: "Tổng quan Điều trị sẹo rỗ đa mô thức",
    type: "Giới thiệu dịch vụ Trị sẹo",
    content: "Kết hợp bóc tách đáy sẹo vi điểm, Laser Fractional CO2 tái tạo bề mặt và thoa yếu tố tăng trưởng sinh học tự thân (PRP/Serum phục hồi), giúp làm đầy đáy sẹo xơ cứng lâu năm và tái tạo cấu trúc da bằng phẳng mịn màng.",
    note: "Tác động đa tầng làm đầy sẹo vĩnh viễn"
  },
  {
    stt: 33,
    page: "Trang chủ (/) & /dich-vu/dieu-tri-sac-to",
    section: "Dịch vụ 3: Điều trị rối loạn sắc tố (Nám, tàn nhang)",
    title: "Tổng quan Điều trị rối loạn sắc tố",
    type: "Giới thiệu dịch vụ Trị nám",
    content: "Phác đồ ức chế hắc sắc tố Melanin đa tầng: sử dụng Laser Toning quang học phân rã hắc sắc tố mà không lột tẩy tổn thương da, kết hợp điện di dưỡng chất phục hồi màng đáy và kem chống nắng bảo vệ phổ rộng.",
    note: "Nói không với lột tẩy cấp tốc gây hại da"
  },

  // ==========================================
  // 9. 4 GIÁ TRỊ CỐT LÕI Y KHOA
  // ==========================================
  {
    stt: 34,
    page: "Trang chủ (/) & /gioi-thieu#gia-tri-cot-loi",
    section: "4 Giá Trị Cốt Lõi - Giá trị 1",
    title: "Tiên phong Công nghệ cao",
    type: "Giá trị cốt lõi",
    content: "Sở hữu máy soi da VISIA 3D và các thiết bị điều trị tiên tiến chuẩn quốc tế.",
    note: "Kim chỉ nam hoạt động"
  },
  {
    stt: 35,
    page: "Trang chủ (/) & /gioi-thieu#gia-tri-cot-loi",
    section: "4 Giá Trị Cốt Lõi - Giá trị 2",
    title: "Y học Cá nhân hóa",
    type: "Giá trị cốt lõi",
    content: "Mỗi làn da là một phác đồ riêng biệt, thiết kế theo cơ địa và lối sống từng khách hàng.",
    note: "Kim chỉ nam hoạt động"
  },
  {
    stt: 36,
    page: "Trang chủ (/) & /gioi-thieu#gia-tri-cot-loi",
    section: "4 Giá Trị Cốt Lõi - Giá trị 3",
    title: "Bác sĩ Sau Đại học",
    type: "Giá trị cốt lõi",
    content: "100% bác sĩ có trình độ sau đại học, trực tiếp thăm khám và theo dõi suốt liệu trình.",
    note: "Kim chỉ nam hoạt động"
  },
  {
    stt: 37,
    page: "Trang chủ (/) & /gioi-thieu#gia-tri-cot-loi",
    section: "4 Giá Trị Cốt Lõi - Giá trị 4",
    title: "Phác đồ Chuẩn Y khoa",
    type: "Giá trị cốt lõi",
    content: "Quy trình vô trùng nghiêm ngặt, kết hợp dược mỹ phẩm nhập khẩu chính hãng.",
    note: "Kim chỉ nam hoạt động"
  },

  // ==========================================
  // 10. TRANG GIỚI THIỆU CHI TIẾT (/gioi-thieu)
  // ==========================================
  {
    stt: 38,
    page: "Trang Giới thiệu (/gioi-thieu)",
    section: "Hero Banner Trang Giới thiệu",
    title: "Tiên Phong Công Nghệ Cao – Hướng Đến Y Học Cá Nhân Hóa",
    type: "Giới thiệu tổng quan thương hiệu",
    content: "[Badge: CÂU CHUYỆN THƯƠNG HIỆU]\nHành trình kiến tạo chuẩn mực điều trị da liễu chuyên sâu, mang giải pháp y khoa hiện đại và sự an tâm tuyệt đối đến cho cộng đồng miền Tây.",
    note: "Banner đầu trang Giới thiệu"
  },
  {
    stt: 39,
    page: "Trang Giới thiệu (/gioi-thieu)",
    section: "Câu chuyện thương hiệu (Khởi nguồn & Triết lý)",
    title: "Khát Vọng Mang Chuẩn Mực Da Liễu Hiện Đại Về Miền Tây",
    type: "Câu chuyện khởi nguồn thương hiệu",
    content: "Đoạn 1: Được thành lập bởi đội ngũ bác sĩ chuyên khoa da liễu giàu tâm huyết, Lạc's Beauty Center xuất phát từ niềm trăn trở trước thực trạng nhiều người dân tại Đồng bằng sông Cửu Long phải gánh chịu hậu quả nặng nề do sử dụng kem trộn, mỹ phẩm chứa corticoid hoặc điều trị tại các cơ sở thẩm mỹ không phép.\n\nĐoạn 2: Chúng tôi tin rằng, mỗi làn da là một thực thể sinh học độc bản với cấu trúc, tiền sử dị ứng và lối sống riêng. Việc điều trị da liễu không thể áp dụng máy móc một công thức chung cho tất cả. Bằng việc đầu tư hệ thống máy soi da đa tầng VISIA 3D hàng đầu thế giới và phác đồ điều trị đa mô thức, Lạc's Beauty Center giúp chẩn đoán chính xác nguyên nhân gốc rễ và đồng hành kiên trì cùng khách hàng.",
    note: "Kèm 2 số liệu: 10.000+ Khách hàng điều trị thành công & 100% Bác sĩ trình độ Sau Đại học"
  },
  {
    stt: 40,
    page: "Trang Giới thiệu (/gioi-thieu)",
    section: "Tầm nhìn chiến lược",
    title: "Tầm Nhìn Chiến Lược LBC",
    type: "Tầm nhìn thương hiệu",
    content: "Trở thành hệ thống phòng khám chuyên khoa da liễu và viện chăm sóc da công nghệ cao chuẩn mực, uy tín hàng đầu tại miền Tây; là địa chỉ tin cậy nhất của người dân khi cần thăm khám bệnh lý da liễu và làm đẹp an toàn chuẩn y khoa.",
    note: "Định hướng phát triển dài hạn"
  },
  {
    stt: 41,
    page: "Trang Giới thiệu (/gioi-thieu)",
    section: "Sứ mệnh phụng sự",
    title: "Sứ Mệnh Phụng Sự LBC",
    type: "Sứ mệnh thương hiệu",
    content: "Bảo vệ và phục hồi làn da khỏe đẹp tự nhiên bằng y đức, kiến thức y khoa chuyên sâu và công nghệ tiên tiến; đồng thời đào tạo nguồn nhân lực tay nghề cao, nâng tầm chuẩn mực nghề chăm sóc da tại Việt Nam.",
    note: "Tôn chỉ phụng sự cộng đồng"
  },
  {
    stt: 42,
    page: "Trang Giới thiệu (/gioi-thieu)",
    section: "Hành trình phát triển (Cột mốc 1)",
    title: "Giai đoạn khởi lập – Thành lập Cơ sở 01 tại 231T Đường 3/2, Cần Thơ",
    type: "Lịch sử phát triển",
    content: "Phòng khám chuyên khoa da liễu ra đời, tập trung chuyên sâu vào điều trị mụn kháng trị và sẹo rỗ phức tạp.",
    note: "Cơ sở đầu tiên"
  },
  {
    stt: 43,
    page: "Trang Giới thiệu (/gioi-thieu)",
    section: "Hành trình phát triển (Cột mốc 2)",
    title: "Mở rộng hệ sinh thái – Ra mắt Học viện Đào tạo nghề Lạc's Academy",
    type: "Lịch sử phát triển",
    content: "Đào tạo hàng trăm kỹ thuật viên chăm sóc da chuẩn y khoa, chuyển giao công nghệ cho các chủ spa miền Tây.",
    note: "Mở rộng mảng đào tạo nghề"
  },
  {
    stt: 44,
    page: "Trang Giới thiệu (/gioi-thieu)",
    section: "Hành trình phát triển (Cột mốc 3)",
    title: "Khai trương Cơ sở 02 tại 388 Nguyễn Văn Cừ, Cần Thơ",
    type: "Lịch sử phát triển",
    content: "Viện chăm sóc da công nghệ cao khang trang, ứng dụng máy soi da VISIA 3D và các giải pháp trẻ hóa toàn diện.",
    note: "Khai trương ngày 29/09/2026"
  },

  // ==========================================
  // 11. CÁC TRANG CHUYÊN MỤC PHỤ TRỢ
  // ==========================================
  {
    stt: 45,
    page: "Trang Ca điều trị thực tế (/ket-qua-dieu-tri)",
    section: "Banner & Lời giới thiệu mục Trước – Sau",
    title: "Hình Ảnh Trước – Sau & Ca Điều Trị Thực Tế",
    type: "Minh chứng lâm sàng",
    content: "100% hình ảnh thực tế từ khách hàng đã điều trị thành công tại Lạc's Beauty Center, được chụp và phân tích đối chiếu bằng máy VISIA 3D.",
    note: "Minh bạch kết quả điều trị"
  },
  {
    stt: 46,
    page: "Trang Tin tức & Y khoa (/tin-tuc)",
    section: "Banner & Lời giới thiệu cẩm nang y khoa",
    title: "Cẩm Nang Chăm Sóc Da & Kiến Thức Da Liễu",
    type: "Kiến thức y khoa",
    content: "Cập nhật bài viết chuyên môn từ các bác sĩ chuyên khoa da liễu, hướng dẫn chăm sóc da đúng cách và giải mã các trào lưu làm đẹp.",
    note: "Nội dung chuẩn y khoa do bác sĩ tham vấn"
  },
  {
    stt: 47,
    page: "Trang Hệ thống cơ sở (/he-thong-co-so)",
    section: "Banner & Lời giới thiệu 2 cơ sở",
    title: "Hệ Thống 2 Cơ Sở Tại TP. Cần Thơ",
    type: "Giới thiệu cơ sở vật chất",
    content: "Tọa lạc tại các trục đường huyết mạch thuận tiện di chuyển, trang bị đầy đủ máy móc công nghệ cao và phòng vô trùng đạt chuẩn y tế.\n• Cơ sở 01: 231T Đường 3/2, P. Hưng Lợi, Q. Ninh Kiều, Cần Thơ\n• Cơ sở 02: 388 Nguyễn Văn Cừ (nối dài), P. An Khánh, Q. Ninh Kiều, Cần Thơ",
    note: "Giờ mở cửa: 08:00 – 20:00 hằng ngày"
  },
  {
    stt: 48,
    page: "Trang Giấy phép hoạt động (/giay-phep-hoat-dong)",
    section: "Banner & Tuyên bố pháp lý",
    title: "Giấy Phép Hoạt Động & Pháp Lý Y Tế",
    type: "Minh bạch pháp lý",
    content: "Minh bạch hồ sơ pháp lý, giấy phép hoạt động khám chữa bệnh được cấp bởi Sở Y Tế và chứng chỉ hành nghề của đội ngũ chuyên môn.",
    note: "Cam kết tuân thủ quy định Bộ Y Tế"
  },
  {
    stt: 49,
    page: "Trang Câu hỏi thường gặp (/cau-hoi-thuong-gap)",
    section: "Banner & Giới thiệu mục FAQ",
    title: "Câu Hỏi Thường Gặp & Tư Vấn Y Khoa",
    type: "Giải đáp thắc mắc",
    content: "Tổng hợp các câu hỏi phổ biến nhất về chi phí, phác đồ điều trị, chăm sóc sau trị liệu và chính sách bảo hành.",
    note: "Hỗ trợ khách hàng trước khi đến khám"
  },

  // ==========================================
  // 12. FOOTER - CHÂN TRANG (TOÀN SITE)
  // ==========================================
  {
    stt: 50,
    page: "Toàn website (Footer Chân trang)",
    section: "Footer - Thông tin đơn vị & Tuyên bố pháp lý",
    title: "Tuyên ngôn pháp lý & Giấy phép tại chân trang",
    type: "Thông tin pháp nhân & giấy phép",
    content: "[Pháp nhân]: CÔNG TY TNHH VIỆN CHĂM SÓC DA LẠC'S BEAUTY CENTER\n[Cơ sở y tế]: Phòng khám Chuyên khoa Da liễu\n[Giới thiệu vắn tắt]: Tiên phong công nghệ cao – Hướng đến Y học Cá nhân hóa. Tiên phong ứng dụng công nghệ phân tích da đa tầng VISIA 3D và các giải pháp điều trị da liễu chuẩn y khoa tại Cần Thơ và Đồng bằng sông Cửu Long.\n[Pháp lý]: Giấy phép hoạt động KCB: 0123/CTO-GPHĐ do Sở Y tế TP. Cần Thơ cấp.\n[Chuyên môn]: Người chịu trách nhiệm chuyên môn kỹ thuật: ThS.BS. Lạc Kim Ngân.\n[Hotline]: 1900 6750 | [Email]: cskh@lbcgroup.vn",
    note: "Xuất hiện cố định ở chân tất cả các trang web"
  }
];

// Helper: Escape CSV string
function escapeCsv(str) {
  if (str === null || str === undefined) return '""';
  const text = String(str).replace(/"/g, '""');
  return `"${text}"`;
}

// 1. Generate CSV with UTF-8 BOM
const headers = [
  "STT",
  "Trang hiển thị trên Website",
  "Vị trí / Khu vực hiển thị",
  "Tiêu đề / Tên mục",
  "Loại nội dung",
  "Nội dung văn bản giới thiệu (Text nguyên văn)",
  "Ghi chú / Lưu ý bổ sung"
];

const csvRows = [
  headers.map(escapeCsv).join(",")
];

data.forEach(item => {
  const row = [
    item.stt,
    item.page,
    item.section,
    item.title,
    item.type,
    item.content,
    item.note
  ].map(escapeCsv).join(",");
  csvRows.push(row);
});

// UTF-8 BOM is \uFEFF
const csvContent = '\uFEFF' + csvRows.join("\r\n");
const csvPath = path.resolve('public', 'lbc_website_intro_texts.csv');
fs.writeFileSync(csvPath, csvContent, 'utf8');

const csvRootPath = path.resolve('lbc_website_intro_texts.csv');
fs.writeFileSync(csvRootPath, csvContent, 'utf8');

// 2. Generate TSV (Tab-Separated Values) for direct Copy-Paste into Google Sheets
const tsvRows = [
  headers.join("\t")
];

data.forEach(item => {
  // In TSV, replace newlines with space or \n, tabs with space
  const clean = str => String(str || '').replace(/\t/g, ' ').replace(/\r?\n/g, ' | ');
  const row = [
    item.stt,
    clean(item.page),
    clean(item.section),
    clean(item.title),
    clean(item.type),
    clean(item.content),
    clean(item.note)
  ].join("\t");
  tsvRows.push(row);
});

const tsvContent = '\uFEFF' + tsvRows.join("\r\n");
const tsvPath = path.resolve('public', 'lbc_website_intro_texts.tsv');
fs.writeFileSync(tsvPath, tsvContent, 'utf8');

console.log(`Generated ${data.length} records:`);
console.log(`- CSV saved to: ${csvPath}`);
console.log(`- CSV saved to: ${csvRootPath}`);
console.log(`- TSV saved to: ${tsvPath}`);
