export interface ServiceItem {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  iconCode: string;
  iconName: string;
  iconUrl?: string;
  metaDescription: string;
  suitableFor: string[];
  protocolSteps: { step: number; title: string; desc: string }[];
  technologyIds: string[];
  duration: string;
  consultingDoctor: string;
  faqs: { question: string; answer: string }[];
  beforeAfterCaseIds: string[];
  coverImage: string;
  seoKeyword: string;
  contentMarkdown: string;
  isDoctorApproved: boolean;
  specialtyId?: string;
  isVisible?: boolean;
  displayOrder?: number;
  videoUrl?: string;
}

export const initialServices: ServiceItem[] = [
  {
    id: "srv-01",
    name: "Điều trị mụn – kể cả mụn kháng trị",
    shortName: "Trị mụn",
    slug: "dieu-tri-mun",
    iconCode: "ICO-D1",
    iconName: "dermatology-acne-care",
    iconUrl: "/assets/icons/dermatology-services/dermatology-acne-care.svg",
    metaDescription: "Thăm khám và điều trị mụn theo phác đồ cá nhân hóa tại Phòng khám Da liễu Lạc's Beauty Center, Cần Thơ – bác sĩ trực tiếp đánh giá và theo dõi.",
    suitableFor: [
      "Mụn bọc, mụn viêm sưng đỏ, mụn mủ dai dẳng",
      "Mụn ẩn, mụn đầu đen, bít tắc tuyến bã nhờn diện rộng",
      "Mụn kháng trị đã điều trị nhiều nơi nhưng liên tục tái phát",
      "Da yếu, mỏng đỏ do từng nhiễm corticoid hoặc kem trộn"
    ],
    protocolSteps: [
      { step: 1, title: "Soi da đa tầng VISIA 3D & Thăm khám", desc: "Bác sĩ trực tiếp kiểm tra cấu trúc da, ổ vi khuẩn P.acnes và mức độ bài tiết bã nhờn." },
      { step: 2, title: "Xét nghiệm vi sinh & Xác định nguyên nhân", desc: "Soi tươi tìm ký sinh trùng Demodex hoặc vi nấm nếu có biểu hiện ngứa rát, kháng trị." },
      { step: 3, title: "Thiết lập phác đồ cá nhân hóa", desc: "Kê đơn thuốc bôi, thuốc uống chuẩn y khoa kết hợp chỉ định liệu trình can thiệp tại chỗ." },
      { step: 4, title: "Lấy nhân mụn chuẩn y khoa & Chiếu ánh sáng", desc: "Quy trình vô trùng tuyệt đối, kết hợp chiếu ánh sáng sinh học Blue/Red Light kháng khuẩn, gom cồi mụn." },
      { step: 5, title: "Theo dõi & Hướng dẫn phục hồi tại nhà", desc: "Bác sĩ tái khám định kỳ mỗi 2 tuần, điều chỉnh phác đồ phù hợp theo tốc độ đáp ứng của da." }
    ],
    technologyIds: ["cn-06", "cn-03"],
    duration: "Liệu trình từ 4 – 8 buổi (tùy tình trạng mụn nặng hay nhẹ)",
    consultingDoctor: "ThS.BS. Chuyên khoa Da liễu (Nội dung minh họa – cần bác sĩ duyệt)",
    faqs: [
      { question: "Mụn kháng trị là gì?", answer: "Là tình trạng mụn mạn tính không đáp ứng với các phác đồ thông thường hoặc tái phát dữ dội sau khi dừng điều trị, thường do vi khuẩn kháng thuốc hoặc da tổn thương hàng rào sinh học nặng." },
      { question: "Bao lâu thì thấy cải thiện rõ rệt?", answer: "Thông thường sau 2 – 3 buổi (khoảng 3 – 4 tuần), các ổ viêm sẽ se cồi, giảm sưng đỏ và da dần ổn định, ít tiết dầu nhờn hơn." },
      { question: "Có cần kiêng ăn uống gì khi điều trị không?", answer: "Cần hạn chế thực phẩm có chỉ số đường huyết cao (đồ ngọt, trà sữa), sữa động vật và thức ăn nhiều dầu mỡ cay nóng; duy trì thói quen ngủ trước 23h." }
    ],
    beforeAfterCaseIds: ["ba-01", "ba-02"],
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    seoKeyword: "điều trị mụn Cần Thơ",
    contentMarkdown: `## Tổng quan về phương pháp điều trị mụn chuẩn y khoa tại Lạc's

Mụn trứng cá không đơn thuần là vấn đề thẩm mỹ mà là một bệnh lý da liễu mạn tính của hệ thống nang lông tuyến bã. Tại **Phòng khám Chuyên khoa Da liễu Lạc's Beauty Center**, chúng tôi áp dụng nguyên tắc **Y học Cá nhân hóa**: không dùng một công thức chung cho mọi khách hàng mà xây dựng phác đồ dựa trên kết quả soi da đa tầng VISIA 3D và tình trạng cơ địa thực tế.

### Tại sao mụn hay tái phát nếu không điều trị đúng cách?
- Tự ý cạy nặn làm vỡ bọc mụn dưới da, lây lan vi khuẩn sang các vùng nang lông lân cận.
- Sử dụng sản phẩm chứa corticoid mang lại hiệu quả nhanh ảo nhưng phá hủy hoàn toàn hàng rào bảo vệ da.
- Bỏ dở liệu trình khi vừa giảm sưng mà không xử lý triệt để bít tắc nang lông và thói quen sinh hoạt.

### Quy trình điều trị vô trùng nghiêm ngặt
Mỗi khách hàng được cấp một bộ dụng cụ tiệt trùng riêng biệt. Đội ngũ điều dưỡng được đào tạo chuyên sâu về kỹ thuật nặn mụn không để lại sẹo thâm, kết hợp các công nghệ quang học làm dịu da tức thì.`,
    isDoctorApproved: false
  },
  {
    id: "srv-02",
    name: "Điều trị sẹo rỗ, sẹo thâm kỹ thuật cao",
    shortName: "Trị sẹo",
    slug: "dieu-tri-seo",
    iconCode: "ICO-D2",
    iconName: "dermatology-scar-repair",
    iconUrl: "/assets/icons/dermatology-services/dermatology-scar-repair.svg",
    metaDescription: "Điều trị sẹo rỗ, sẹo đáy nhọn, sẹo lượn sóng bằng kỹ thuật bóc tách đáy sẹo kết hợp Laser vi điểm tại Lạc's Beauty Center Cần Thơ.",
    suitableFor: [
      "Sẹo rỗ lâu năm do di chứng mụn bọc, mụn nang để lại",
      "Sẹo đáy nhọn (ice pick), sẹo đáy vuông (boxcar), sẹo lượn sóng (rolling)",
      "Sẹo thâm đỏ, sẹo thâm nâu sau mụn dai dẳng khó mờ",
      "Bề mặt da sần sùi, lỗ chân lông to mất thẩm mỹ"
    ],
    protocolSteps: [
      { step: 1, title: "Thăm khám & Phân loại hình thái sẹo", desc: "Bác sĩ đánh giá độ sâu chân sẹo và mức độ xơ hóa dưới bề mặt biểu bì." },
      { step: 2, title: "Bóc tách đáy sẹo (Subcision)", desc: "Dùng kim y khoa chuyên dụng cắt đứt chân xơ sẹo đang kéo lõm bề mặt da." },
      { step: 3, title: "Công nghệ Laser vi điểm & RF siêu vi", desc: "Tác động vi nhiệt kích thích tăng sinh mạng lưới collagen và elastin mới." },
      { step: 4, title: "Thoa hoạt chất tái tạo & Tế bào sinh học", desc: "Cung cấp dưỡng chất peptide và yếu tố tăng trưởng để làm đầy hố sẹo nhanh chóng." },
      { step: 5, title: "Hướng dẫn phục hồi và bảo vệ da", desc: "Chăm sóc phục hồi tại nhà, bảo vệ chống nắng nghiêm ngặt tránh tăng sắc tố sau viêm." }
    ],
    technologyIds: ["cn-04", "cn-03"],
    duration: "Từ 3 – 5 buổi cách nhau 4 – 6 tuần",
    consultingDoctor: "Bác sĩ Chuyên khoa Da liễu (Nội dung minh họa – cần bác sĩ duyệt)",
    faqs: [
      { question: "Sẹo rỗ có thể đầy lại 100% không?", answer: "Không có phương pháp nào cam kết đầy sẹo 100% vĩnh viễn. Phác đồ kết hợp tại phòng khám có thể giúp cải thiện 70% – 85% độ sâu sẹo tùy vào độ tuổi sẹo và khả năng tăng sinh mô của từng người." },
      { question: "Sau khi bóc tách đáy sẹo da có bị bầm không?", answer: "Vùng điều trị có thể hơi đỏ và bầm nhẹ trong 3 – 5 ngày đầu, đây là phản ứng tự nhiên của cơ thể để giải phóng các yếu tố tăng trưởng kích thích làm đầy sẹo." }
    ],
    beforeAfterCaseIds: ["ba-03", "ba-04"],
    coverImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    seoKeyword: "trị sẹo rỗ Cần Thơ",
    contentMarkdown: `## Giải pháp phục hồi làn da phẳng mịn với phác đồ đa mô thức

Sẹo rỗ hình thành do cấu trúc collagen và elastin bị phá hủy nghiêm trọng sau tổn thương mụn hoặc thủy đậu. Bằng kỹ thuật bóc tách đáy sẹo giải phóng các bó xơ kết hợp công nghệ Laser Fractional CO2 vi điểm, mô da được đánh thức và tự tái sinh tự nhiên từ bên trong.`,
    isDoctorApproved: false
  },
  {
    id: "srv-03",
    name: "Điều trị sắc tố – Nám, tàn nhang, đồi mồi",
    shortName: "Trị nám – tàn nhang",
    slug: "dieu-tri-nam-tan-nhang",
    iconCode: "ICO-D3",
    iconName: "dermatology-pigment-sun",
    iconUrl: "/assets/icons/dermatology-services/dermatology-pigment-sun.svg",
    metaDescription: "Phác đồ điều trị nám má, tàn nhang, đồi mồi an toàn bằng công nghệ Laser chọn lọc kết hợp phục hồi màng đáy tại Cần Thơ.",
    suitableFor: [
      "Nám mảng, nám chân sâu, nám hỗn hợp sau sinh hoặc do nội tiết",
      "Tàn nhang bẩm sinh, đồi mồi do tác hại của ánh nắng mặt trời miền Tây",
      "Tăng sắc tố sau viêm do peel da hóa học sai cách hoặc tai biến laser",
      "Làn da xỉn màu, không đều màu, tăng sắc tố loang lổ"
    ],
    protocolSteps: [
      { step: 1, title: "Phân tích sắc tố VISIA 3D", desc: "Đo lường chính xác lượng melanin bề mặt và sắc tố tiềm ẩn sâu dưới lớp trung bì." },
      { step: 2, title: "Laser chọn lọc phá vỡ hạt sắc tố", desc: "Năng lượng laser tác động quang âm tán nhỏ melanin thành các hạt siêu mịn để đại thực bào đào thải." },
      { step: 3, title: "Phục hồi hàng rào màng đáy da", desc: "Ứng dụng hoạt chất làm dịu và phục hồi vi tuần hoàn, ngăn chặn melanin tái kích hoạt." },
      { step: 4, title: "Kết hợp thuốc bôi ức chế men Tyrosinase", desc: "Kê đơn kem đặc trị ức chế nám chuẩn y khoa, an toàn cho làn da châu Á." }
    ],
    technologyIds: ["cn-03", "cn-06"],
    duration: "Liệu trình 6 – 10 buổi tùy phân loại nám",
    consultingDoctor: "Bác sĩ Chuyên khoa Da liễu (Nội dung minh họa – cần bác sĩ duyệt)",
    faqs: [
      { question: "Nám có khỏi vĩnh viễn không?", answer: "Nám da chịu ảnh hưởng mạnh bởi nội tiết tố và tia UV. Điều trị giúp loại bỏ sắc tố hiện hữu và đưa da về trạng thái khỏe mạnh; việc duy trì chống nắng và dưỡng da là bắt buộc để ngăn ngừa tái phát." },
      { question: "Bắn laser trị nám có bị bỏng rát hay bong tróc không?", answer: "Công nghệ laser xung ngắn hiện đại chỉ tác động có chọn lọc lên hạt melanin mà không gây tổn thương mô xung quanh, không gây bong tróc lột tẩy da dữ dội." }
    ],
    beforeAfterCaseIds: ["ba-05", "ba-06"],
    coverImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
    seoKeyword: "trị nám Cần Thơ",
    contentMarkdown: `## Phác đồ trị nám an toàn – Không bào mòn, không tái phát dữ dội

Điều trị tăng sắc tố tại Lạc's Beauty Center tuyệt đối nói không với các biện pháp lột tẩy cấp tốc. Chúng tôi tập trung vào việc ổn định màng đáy và ức chế quá trình sản sinh melanin từ tế bào sắc tố, bảo vệ làn da khỏe đẹp bền vững.`,
    isDoctorApproved: false
  },
  {
    id: "srv-04",
    name: "Điều trị rụng tóc & Kích thích mọc tóc",
    shortName: "Trị rụng tóc",
    slug: "dieu-tri-rung-toc",
    iconCode: "ICO-D4",
    iconName: "dermatology-hair-scalp",
    iconUrl: "/assets/icons/dermatology-services/dermatology-hair-scalp.svg",
    metaDescription: "Thăm khám nguyên nhân rụng tóc từng mảng, hói đầu và liệu pháp Mesotherapy kích thích nang tóc tại Lạc's Beauty Center Cần Thơ.",
    suitableFor: [
      "Rụng tóc sau sinh, rụng tóc do stress hoặc rối loạn nội tiết",
      "Rụng tóc từng mảng (Alopecia Areata), rụng tóc kiểu hói nam/nữ",
      "Sợi tóc mảnh, yếu, dễ gãy rụng, da đầu nhiều gàu ngứa bã nhờn"
    ],
    protocolSteps: [
      { step: 1, title: "Soi da đầu và mật độ nang tóc", desc: "Đánh giá tình trạng teo nang tóc và kiểm tra mức độ viêm da đầu." },
      { step: 2, title: "Làm sạch sâu da đầu & Vô khuẩn", desc: "Loại bỏ mảng bám bã nhờn giúp nang tóc thông thoáng hấp thụ dưỡng chất." },
      { step: 3, title: "Mesotherapy vi điểm dưỡng chất nuôi nang", desc: "Đưa trực tiếp biotin, peptide, vitamin và yếu tố tăng trưởng vào tầng trung bì da đầu." },
      { step: 4, title: "Chiếu ánh sáng sinh học kích hoạt vi tuần hoàn", desc: "Tăng lưu lượng máu nuôi dưỡng nang tóc, rút ngắn giai đoạn nghỉ của tóc." }
    ],
    technologyIds: ["cn-06"],
    duration: "Liệu trình 6 – 8 buổi, mỗi buổi cách nhau 2 tuần",
    consultingDoctor: "Bác sĩ Chuyên khoa Da liễu (Nội dung minh họa – cần bác sĩ duyệt)",
    faqs: [
      { question: "Sau bao lâu thì thấy tóc con mọc lại?", answer: "Thông thường sau 4 – 6 tuần điều trị kiên trì, lượng tóc rụng giảm rõ rệt và các mầm tóc tơ bắt đầu xuất hiện tại các nang tóc được phục hồi." }
    ],
    beforeAfterCaseIds: ["ba-09"],
    coverImage: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80",
    seoKeyword: "trị rụng tóc Cần Thơ",
    contentMarkdown: `## Phục hồi mái tóc dày khỏe từ tế bào nang tóc

Rụng tóc cần được can thiệp sớm khi nang tóc còn hoạt động. Liệu pháp tiêm vi điểm hoạt chất sinh học tại Lạc's giúp nuôi dưỡng trực tiếp tế bào mầm tóc, mang lại mái tóc chắc khỏe và hạn chế tối đa gãy rụng.`,
    isDoctorApproved: false
  },
  {
    id: "srv-05",
    name: "Thẩm mỹ nội khoa – Trẻ hóa da vi điểm",
    shortName: "Thẩm mỹ nội khoa",
    slug: "tham-my-noi-khoa",
    iconCode: "ICO-D5",
    iconName: "dermatology-meso-injection",
    iconUrl: "/assets/icons/dermatology-services/dermatology-meso-injection.svg",
    metaDescription: "Dịch vụ thẩm mỹ nội khoa, tiêm vi điểm Mesotherapy, tiêm BAP, trẻ hóa da tự nhiên không phẫu thuật do bác sĩ da liễu trực tiếp thực hiện.",
    suitableFor: [
      "Làn da lão hóa, khô sần, chùng nhão, nếp nhăn li ti",
      "Lỗ chân lông to, da thiếu sức sống do suy giảm collagen",
      "Khách hàng mong muốn làm đẹp tinh tế, tự nhiên, không nghỉ dưỡng"
    ],
    protocolSteps: [
      { step: 1, title: "Bác sĩ tư vấn & Đánh giá giải phẫu khuôn mặt", desc: "Lựa chọn hoạt chất chính hãng phù hợp (Hyaluronic Acid, Peptide, Polynucleotide)." },
      { step: 2, title: "Ủ tê chuẩn y tế & Vô khuẩn da mặt", desc: "Đảm bảo quá trình thực hiện êm ái, an toàn tuyệt đối." },
      { step: 3, title: "Thực hiện kỹ thuật tiêm vi điểm chuẩn xác", desc: "Bác sĩ da liễu trực tiếp tiêm đúng lớp biểu bì hoặc trung bì nông." },
      { step: 4, title: "Đắp mặt nạ sinh học làm dịu & Hướng dẫn", desc: "Giảm đỏ nhanh chóng và bàn giao hướng dẫn chăm sóc sau thủ thuật." }
    ],
    technologyIds: ["cn-06"],
    duration: "Liệu trình 1 – 3 buổi tùy loại hoạt chất",
    consultingDoctor: "Bác sĩ Chuyên khoa Da liễu (Nội dung minh họa – cần bác sĩ duyệt)",
    faqs: [
      { question: "Tiêm meso có bị sưng hay bầm nhiều không?", answer: "Các nốt sần meso thường biến mất sau 12 – 24 giờ. Vết chích siêu nhỏ ít khi bầm và có thể trang điểm nhẹ nhàng sau 48 giờ." }
    ],
    beforeAfterCaseIds: [],
    coverImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
    seoKeyword: "thẩm mỹ nội khoa Cần Thơ",
    contentMarkdown: `## Đẹp tự nhiên – Chuẩn y khoa với tay nghề Bác sĩ chuyên khoa

Mọi thủ thuật thẩm mỹ nội khoa tại Lạc's Beauty Center đều do chính bác sĩ chuyên khoa da liễu sau đại học thực hiện, cam kết sử dụng 100% hoạt chất nhập khẩu chính ngạch có tem kiểm định của Bộ Y tế.`,
    isDoctorApproved: false
  },
  {
    id: "srv-06",
    name: "Nâng cơ trẻ hóa da công nghệ cao",
    shortName: "Nâng cơ",
    slug: "nang-co",
    iconCode: "ICO-D6",
    iconName: "dermatology-lifting-contour",
    iconUrl: "/assets/icons/dermatology-services/dermatology-lifting-contour.svg",
    metaDescription: "Nâng cơ thon gọn hàm, xóa nhăn trẻ hóa da bằng công nghệ sóng RF Jovena và HIFU không xâm lấn tại Lạc's Beauty Center Cần Thơ.",
    suitableFor: [
      "Khách hàng từ 28 tuổi trở lên có dấu hiệu chảy xệ cơ mặt, nọng cằm",
      "Vết chân chim đuôi mắt, rãnh cười sâu (rãnh mũi má)",
      "Đường viền hàm kém thon gọn, da mất độ đàn hồi săn chắc"
    ],
    protocolSteps: [
      { step: 1, title: "Soi da & Định hình vùng cơ chùng nhão", desc: "Xác định mật độ collagen và lập bản đồ vector nâng cơ." },
      { step: 2, title: "Làm sạch & Thoa gel dẫn truyền năng lượng", desc: "Tối ưu hóa khả năng hấp thụ sóng vi nhiệt vào lớp SMAS." },
      { step: 3, title: "Tiến hành nâng cơ với đầu máy công nghệ cao", desc: "Năng lượng tập trung làm co các sợi collagen chùng nhão tức thì." },
      { step: 4, title: "Dưỡng ẩm làm dịu & Đánh giá kết quả ngay sau buổi", desc: "Khách hàng cảm nhận ngay độ săn chắc viền hàm sau buổi đầu tiên." }
    ],
    technologyIds: ["cn-01", "cn-02"],
    duration: "1 buổi điều trị duy trì hiệu quả từ 6 – 12 tháng",
    consultingDoctor: "Bác sĩ Chuyên khoa Da liễu (Nội dung minh họa – cần bác sĩ duyệt)",
    faqs: [
      { question: "Nâng cơ RF/HIFU có đau không?", answer: "Công nghệ thế hệ mới kiểm soát nhiệt lượng thông minh, khách hàng chỉ cảm thấy ấm nóng và châm chích nhẹ vùng viền hàm, hoàn toàn không cần gây mê hay nghỉ dưỡng." }
    ],
    beforeAfterCaseIds: ["ba-07", "ba-08"],
    coverImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    seoKeyword: "nâng cơ trẻ hóa da Cần Thơ",
    contentMarkdown: `## Khôi phục đường nét thanh xuân không phẫu thuật

Sự kết hợp giữa công nghệ sóng RF đơn/đa cực Jovena và sóng siêu âm hội tụ HIFU tác động chuẩn xác vào tầng cân cơ nông (SMAS), kích hoạt quá trình tái tạo collagen tự thân giúp khuôn mặt thon gọn sắc nét.`,
    isDoctorApproved: false
  },
  {
    id: "srv-07",
    name: "Chăm sóc da chuyên sâu & Phục hồi hàng rào sinh học",
    shortName: "Chăm sóc da",
    slug: "cham-soc-da-chuyen-sau",
    iconCode: "ICO-D7",
    iconName: "dermatology-skin-facial",
    iconUrl: "/assets/icons/dermatology-services/dermatology-skin-facial.svg",
    metaDescription: "Dịch vụ chăm sóc da chuyên sâu chuẩn y khoa, cấp ẩm đa tầng và phục hồi da nhạy cảm bằng dược mỹ phẩm chính hãng tại Cần Thơ.",
    suitableFor: [
      "Da mệt mỏi, khô ráp, thiếu nước do môi trường điều hòa hoặc nắng gió",
      "Da nhạy cảm sau các liệu trình điều trị công nghệ cao",
      "Khách hàng muốn thư giãn và nuôi dưỡng làn da khỏe mạnh định kỳ"
    ],
    protocolSteps: [
      { step: 1, title: "Tẩy trang dịu nhẹ & Rửa mặt sạch sâu", desc: "Dùng dung dịch Bioderma Sensibio cân bằng sinh học da." },
      { step: 2, title: "Tẩy tế bào chết enzyme sinh học", desc: "Làm mềm lớp sừng nhẹ nhàng không gây rát da." },
      { step: 3, title: "Điện di tinh chất Hyaluronic Acid & Vitamin B5", desc: "Đẩy sâu dưỡng chất vào tầng đáy biểu bì da." },
      { step: 4, title: "Massage lưu thông hệ bạch huyết & Đắp mặt nạ y tế", desc: "Thư giãn cơ mặt và khóa ẩm chuyên sâu." }
    ],
    technologyIds: ["cn-06"],
    duration: "60 – 75 phút mỗi buổi, duy trì 1 – 2 tuần/lần",
    consultingDoctor: "Kỹ thuật viên Trưởng & Bác sĩ Da liễu",
    faqs: [
      { question: "Da mụn có làm chăm sóc da chuyên sâu được không?", answer: "Có, phòng khám có gói chăm sóc riêng cho da dầu mụn với sản phẩm kháng viêm và kiềm dầu an toàn." }
    ],
    beforeAfterCaseIds: [],
    coverImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    seoKeyword: "chăm sóc da Cần Thơ",
    contentMarkdown: `## Liệu trình chăm sóc da chuẩn y khoa giúp da tái sinh tràn đầy năng lượng

Không gian phòng khám thanh lịch, hương thơm tinh dầu dịu nhẹ cùng quy trình chăm sóc tỉ mỉ giúp giải tỏa căng thẳng và đưa làn da trở về trạng thái căng mọng, rạng rỡ nhất.`,
    isDoctorApproved: false
  },
  {
    id: "srv-08",
    name: "Điều trị các bệnh lý về da khác (Viêm da cơ địa, Vảy nến)",
    shortName: "Bệnh da khác",
    slug: "benh-da-lieu-khac",
    iconCode: "ICO-D8",
    iconName: "dermatology-exam-diagnosis",
    iconUrl: "/assets/icons/dermatology-services/dermatology-exam-diagnosis.svg",
    metaDescription: "Khám và điều trị các bệnh da liễu mạn tính: viêm da cơ địa, viêm da tiết bã, mề đay, vảy nến, chàm da tại Phòng khám Lạc's Beauty Center Cần Thơ.",
    suitableFor: [
      "Viêm da tiếp xúc, viêm da cơ địa ngứa ngáy, nứt nẻ chảy dịch",
      "Viêm da tiết bã vùng cánh mũi, chân mày, da đầu nhiều vảy nhờn",
      "Mề đay cấp và mạn tính, dị ứng thời tiết",
      "Vảy nến, dày sừng nang lông và các vấn đề nhiễm trùng da"
    ],
    protocolSteps: [
      { step: 1, title: "Khám lâm sàng toàn diện bởi Bác sĩ Sau đại học", desc: "Hỏi bệnh sử, tiền sử dị ứng và đánh giá thương tổn da." },
      { step: 2, title: "Xét nghiệm loại trừ nguyên nhân nhiễm trùng, vi nấm", desc: "Soi tìm bào tử nấm, kiểm tra dị nguyên khi cần." },
      { step: 3, title: "Kê đơn thuốc kiểm soát viêm & Chăm sóc dưỡng ẩm", desc: "Cân bằng điều trị kiểm soát đợt cấp và phòng ngừa tái phát mạn tính." },
      { step: 4, title: "Tư vấn chế độ sinh hoạt và bảo vệ da lâu dài", desc: "Hướng dẫn lựa chọn xà phòng, chất giặt tẩy và nhiệt độ nước tắm phù hợp." }
    ],
    technologyIds: ["cn-06"],
    duration: "Theo dõi định kỳ theo phác đồ từng bệnh lý",
    consultingDoctor: "Bác sĩ Chuyên khoa Da liễu (Nội dung minh họa – cần bác sĩ duyệt)",
    faqs: [
      { question: "Viêm da cơ địa có chữa dứt điểm được không?", answer: "Viêm da cơ địa có yếu tố di truyền và miễn dịch. Điều trị đúng cách giúp kiểm soát hoàn toàn triệu chứng, kéo dài thời gian lui bệnh và cải thiện chất lượng sống tối ưu cho bệnh nhân." }
    ],
    beforeAfterCaseIds: [],
    coverImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    seoKeyword: "khám bệnh da liễu Cần Thơ",
    contentMarkdown: `## Chăm sóc toàn diện cho bệnh nhân da liễu mạn tính

Chúng tôi thấu hiểu nỗi khổ của bệnh nhân mắc các bệnh da liễu mạn tính dai dẳng. Bác sĩ Lạc's luôn đồng hành kiên trì cùng người bệnh với phác đồ chuẩn y khoa và lời khuyên sinh hoạt khoa học.`,
    isDoctorApproved: false
  },
  {
    id: "srv-09",
    name: "Triệt lông công nghệ cao không đau rát",
    shortName: "Triệt lông",
    slug: "triet-long",
    iconCode: "ICO-D9",
    iconName: "dermatology-laser-hair-removal",
    iconUrl: "/assets/icons/dermatology-services/dermatology-laser-hair-removal.svg",
    metaDescription: "Triệt lông nách, tay chân, bikini bằng công nghệ Diode Laser làm mát thông minh không đau rát tại Lạc's Beauty Center Cần Thơ.",
    suitableFor: [
      "Khách hàng có nhu cầu dọn sạch nang lông vùng nách, mép, tay, chân, bikini",
      "Tình trạng viêm nang lông, lông mọc ngược sần sùi sẫm màu",
      "Vùng da dưới cánh tay bị thâm sạm và có mùi khó chịu"
    ],
    protocolSteps: [
      { step: 1, title: "Vệ sinh vùng da & Cạo lông xuôi chiều", desc: "Giữ lại chân nang lông để hấp thu năng lượng quang học tối đa." },
      { step: 2, title: "Bôi gel làm mát chuyên dụng", desc: "Làm dịu bề mặt da và tăng cường khúc xạ ánh sáng." },
      { step: 3, title: "Di chuyển đầu xung ánh sáng công nghệ Diode", desc: "Năng lượng làm teo mầm nhú nang lông, lông rụng tự nhiên sau vài ngày." },
      { step: 4, title: "Làm sạch gel & Thoa kem dưỡng ẩm dịu da", desc: "Se khít lỗ chân lông và làm sáng mịn vùng da vừa triệt." }
    ],
    technologyIds: ["cn-05"],
    duration: "Liệu trình 6 – 8 buổi, bảo hành định kỳ",
    consultingDoctor: "Kỹ thuật viên tay nghề cao & Bác sĩ cố vấn",
    faqs: [
      { question: "Triệt lông có vĩnh viễn không?", answer: "Theo quy định y khoa, triệt lông giúp phá hủy mầm nhú nang lông để lông mọc lại rất tơ, nhạt màu và thưa thớt, duy trì làn da sạch mịn lâu dài nhiều năm." }
    ],
    beforeAfterCaseIds: ["ba-10"],
    coverImage: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=1200&q=80",
    seoKeyword: "triệt lông Cần Thơ",
    contentMarkdown: `## Làn da láng mịn tự tin diện mọi trang phục

Công nghệ triệt lông với hệ thống làm mát bằng đá sapphire -5°C giúp quá trình điều trị hoàn toàn êm ái, hỗ trợ điều trị dứt điểm tình trạng viêm nang lông và se khít lỗ chân lông rõ rệt.`,
    isDoctorApproved: false
  }
];
