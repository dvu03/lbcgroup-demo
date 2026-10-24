export interface CaseStudyItem {
  id: string;
  code: string;
  serviceId: string;
  serviceName: string;
  customerInitial: string; // VD: N.T.M (26 tuổi)
  initialCondition: string; // Tình trạng ban đầu
  protocolSummary: string; // Phác đồ tóm tắt
  sessions: string; // Số buổi / thời gian
  treatingDoctor: string; // Bác sĩ điều trị
  beforeImageUrl: string;
  afterImageUrl: string;
  hasConsentForm: boolean;
  notes: string;
}

export const initialCaseStudies: CaseStudyItem[] = [
  {
    id: "ba-01",
    code: "BA-01",
    serviceId: "srv-01",
    serviceName: "Điều trị mụn – kể cả mụn kháng trị",
    customerInitial: "Khách hàng L.T.H (24 tuổi, Cần Thơ)",
    initialCondition: "Mụn nang viêm đỏ lan tỏa 2 bên má, nhiều ổ mụn mủ sâu tái phát kéo dài hơn 2 năm, da tăng tiết dầu nhờn quá mức.",
    protocolSummary: "Kháng sinh đường uống liều kiểm soát + Chiếu ánh sáng Blue Light + Lấy nhân mụn chuẩn y khoa + Bôi gel ức chế P.acnes",
    sessions: "Liệu trình 6 buổi trong 2.5 tháng",
    treatingDoctor: "ThS.BS. Lạc Kim Ngân",
    beforeImageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    afterImageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    hasConsentForm: true,
    notes: "Nội dung minh họa – Đã có biên bản thỏa thuận chia sẻ hình ảnh ẩn danh phục vụ mục đích y khoa."
  },
  {
    id: "ba-02",
    code: "BA-02",
    serviceId: "srv-01",
    serviceName: "Điều trị mụn – kể cả mụn kháng trị",
    customerInitial: "Khách hàng P.V.K (21 tuổi, Hậu Giang)",
    initialCondition: "Mụn ẩn, mụn đầu đen bít tắc toàn mặt, nhiều vết thâm đỏ sau nặn mụn sai cách tại nhà.",
    protocolSummary: "Peel sinh học BHA nồng độ thấp + Lấy nhân mụn vô khuẩn + Điện di phục hồi Hyaluronic Acid",
    sessions: "4 buổi trong 6 tuần",
    treatingDoctor: "BSCKI. Nguyễn Văn An",
    beforeImageUrl: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80",
    afterImageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    hasConsentForm: true,
    notes: "Bề mặt da giảm 85% nhân mụn ẩn, thu nhỏ lỗ chân lông và sáng đều màu."
  },
  {
    id: "ba-03",
    code: "BA-03",
    serviceId: "srv-02",
    serviceName: "Điều trị sẹo rỗ kỹ thuật cao",
    customerInitial: "Khách hàng N.H.N (28 tuổi, Cần Thơ)",
    initialCondition: "Sẹo rỗ hỗn hợp (đáy vuông và đáy nhọn) vùng 2 bên thái dương và má, đáy sẹo xơ cứng kéo lõm sâu.",
    protocolSummary: "Bóc tách đáy sẹo Subcision bằng kim y khoa + Laser vi điểm Fractional CO2 + Thoa huyết tương giàu tiểu cầu",
    sessions: "Liệu trình 4 buổi (mỗi buổi cách 5 tuần)",
    treatingDoctor: "BSCKI. Nguyễn Văn An",
    beforeImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    afterImageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    hasConsentForm: true,
    notes: "Độ sâu hố sẹo đầy lên khoảng 75% – 80%, da săn chắc và mịn màng hơn rõ rệt."
  },
  {
    id: "ba-04",
    code: "BA-04",
    serviceId: "srv-02",
    serviceName: "Điều trị sẹo rỗ kỹ thuật cao",
    customerInitial: "Khách hàng T.M.T (32 tuổi, Vĩnh Long)",
    initialCondition: "Sẹo lượn sóng rolling scars nông nhưng diện rộng, da sần sùi kém đàn hồi.",
    protocolSummary: "Sóng RF siêu vi điểm + Tiêm meso phục hồi màng đáy da + Bóc tách xơ sẹo nông",
    sessions: "3 buổi trong 3 tháng",
    treatingDoctor: "ThS.BS. Lạc Kim Ngân",
    beforeImageUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
    afterImageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    hasConsentForm: true,
    notes: "Làn da phẳng mịn, độ đàn hồi và sáng bóng cải thiện vượt bậc."
  },
  {
    id: "ba-05",
    code: "BA-05",
    serviceId: "srv-03",
    serviceName: "Điều trị sắc tố – Nám, tàn nhang",
    customerInitial: "Khách hàng V.T.M (38 tuổi, Sóc Trăng)",
    initialCondition: "Nám mảng hai gò má sau sinh 3 năm, màu nâu sẫm lan rộng do tiếp xúc nắng gió miền Tây.",
    protocolSummary: "Laser chọn lọc phá hạt melanin + Điện di dưỡng chất ức chế men Tyrosinase + Kem bôi chống oxy hóa",
    sessions: "8 buổi trong 4 tháng",
    treatingDoctor: "ThS.BS. Trần Thị Bích Thảo",
    beforeImageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    afterImageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    hasConsentForm: true,
    notes: "Vết nám mờ hơn 80%, không xuất hiện tình trạng mất sắc tố hay dội ngược sắc tố."
  },
  {
    id: "ba-06",
    code: "BA-06",
    serviceId: "srv-03",
    serviceName: "Điều trị sắc tố – Nám, tàn nhang",
    customerInitial: "Khách hàng Đ.T.K (27 tuổi, Cần Thơ)",
    initialCondition: "Tàn nhang bẩm sinh li ti tập trung vùng sống mũi và gò má, đậm màu vào mùa hè.",
    protocolSummary: "Xung ánh sáng laser quang âm chuyên biệt + Thoa serum phục hồi Biotrade",
    sessions: "3 buổi trong 6 tuần",
    treatingDoctor: "ThS.BS. Trần Thị Bích Thảo",
    beforeImageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
    afterImageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    hasConsentForm: true,
    notes: "Đốm tàn nhang mờ hẳn, làn da sáng trong trẻ trung."
  },
  {
    id: "ba-07",
    code: "BA-07",
    serviceId: "srv-06",
    serviceName: "Nâng cơ trẻ hóa da công nghệ cao",
    customerInitial: "Khách hàng N.T.T (45 tuổi, Cần Thơ)",
    initialCondition: "Cơ mặt chùng nhão, đường viền hàm mất nét, xuất hiện nọng cằm và rãnh cười sâu.",
    protocolSummary: "Liệu trình nâng cơ vi tầng RF Jovena kết hợp HIFU tác động lớp SMAS",
    sessions: "1 buổi duy nhất",
    treatingDoctor: "ThS.BS. Lạc Kim Ngân",
    beforeImageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
    afterImageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    hasConsentForm: true,
    notes: "Đường viền hàm thon gọn nâng cao tức thì 2cm, rãnh mũi má cạn đi trông thấy."
  },
  {
    id: "ba-08",
    code: "BA-08",
    serviceId: "srv-06",
    serviceName: "Nâng cơ trẻ hóa da công nghệ cao",
    customerInitial: "Khách hàng B.T.L (36 tuổi, An Giang)",
    initialCondition: "Vùng khóe miệng và đuôi mắt có nhiều nếp nhăn tĩnh, da kém săn chắc sau giảm cân.",
    protocolSummary: "Nâng cơ nhiệt sóng RF Jovena tập trung vùng trung và hạ mặt",
    sessions: "2 buổi cách nhau 1 tháng",
    treatingDoctor: "ThS.BS. Lạc Kim Ngân",
    beforeImageUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80",
    afterImageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    hasConsentForm: true,
    notes: "Da căng mọng tự nhiên, không bị đơ cứng biểu cảm khuôn mặt."
  },
  {
    id: "ba-09",
    code: "BA-09",
    serviceId: "srv-04",
    serviceName: "Điều trị rụng tóc & Kích thích mọc tóc",
    customerInitial: "Khách hàng H.Q.V (35 tuổi, Cần Thơ)",
    initialCondition: "Rụng tóc kiểu chữ M vùng trán và đỉnh đầu thưa tóc rõ rệt do căng thẳng công việc.",
    protocolSummary: "Mesotherapy vi điểm dưỡng chất nang tóc + Chiếu ánh sáng sinh học kích thích tuần hoàn",
    sessions: "6 buổi trong 3 tháng",
    treatingDoctor: "BSCKI. Nguyễn Văn An",
    beforeImageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    afterImageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    hasConsentForm: true,
    notes: "Chân tóc con mọc dày đặc tại vùng trán thưa, tóc chắc khỏe giảm rụng khi gội đầu."
  },
  {
    id: "ba-10",
    code: "BA-10",
    serviceId: "srv-09",
    serviceName: "Triệt lông công nghệ cao",
    customerInitial: "Khách hàng K.L.P (23 tuổi, Cần Thơ)",
    initialCondition: "Lông vùng nách rậm, da sần sùi và thâm sạm do thói quen dùng nhíp nhổ tại nhà.",
    protocolSummary: "Diode Laser làm mát sapphire -5°C + Thoa kem kiềm nang lông",
    sessions: "5 buổi",
    treatingDoctor: "Kỹ thuật viên Trưởng",
    beforeImageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    afterImageUrl: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
    hasConsentForm: true,
    notes: "Vùng nách trắng sáng, sạch lông hoàn toàn, lỗ chân lông se khít không còn viêm ngứa."
  }
];
