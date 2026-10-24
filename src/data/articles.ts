export interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  category: "cham-soc-da" | "hoat-dong";
  categoryName: string;
  summary: string;
  author: string;
  consultingDoctor?: string; // Bác sĩ tham vấn / Người xét duyệt
  publishedDate: string;
  readTime: string;
  imageUrl: string;
  contentMarkdown: string;
  tableOfContents: { id: string; title: string; level: number }[];
  isFeatured?: boolean;
  status?: 'published' | 'draft' | 'review';
  isVisible?: boolean;
  seoTitle?: string;
  metaDescription?: string;
  videoUrl?: string;
}

export const initialArticles: ArticleItem[] = [
  {
    id: "art-01",
    title: "Mụn ẩn, mụn viêm, mụn kháng trị: phân biệt thế nào và khi nào cần gặp bác sĩ da liễu",
    slug: "mun-an-mun-viem-mun-khang-tri",
    category: "cham-soc-da",
    categoryName: "Chăm sóc da",
    summary: "Hướng dẫn nhận biết các cấp độ mụn từ mụn ẩn không viêm đến mụn bọc kháng trị và thời điểm vàng cần can thiệp y khoa để tránh sẹo rỗ vĩnh viễn.",
    author: "Ban Biên tập Y khoa LBC",
    consultingDoctor: "ThS.BS. Lạc Kim Ngân (Tham vấn chuyên môn)",
    publishedDate: "15/10/2026",
    readTime: "5 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true,
    tableOfContents: [
      { id: "phan-biet-cac-loai-mun", title: "1. Phân biệt các loại mụn thường gặp", level: 2 },
      { id: "the-nao-la-mun-khang-tri", title: "2. Thế nào được gọi là mụn kháng trị?", level: 2 },
      { id: "sai-lam-khi-tu-dieu-tri", title: "3. Những sai lầm tai hại khi tự chữa mụn", level: 2 },
      { id: "khi-nao-can-gap-bac-si", title: "4. Khi nào bạn bắt buộc phải gặp bác sĩ da liễu?", level: 2 }
    ],
    contentMarkdown: `## 1. Phân biệt các loại mụn thường gặp {#phan-biet-cac-loai-mun}

Mụn trứng cá là một trong những vấn đề da liễu phổ biến nhất nhưng thường bị xử lý sai cách do không phân biệt đúng hình thái tổn thương. Về cơ bản, mụn được chia làm hai nhóm chính:

- **Mụn không viêm (mụn ẩn, mụn đầu đen):** Hình thành do tế bào chết và bã nhờn tích tụ làm bít tắc lỗ chân lông. Chúng không gây đau nhức nhưng khiến bề mặt da sần sùi kém mịn màng.
- **Mụn viêm (mụn mủ, mụn bọc, mụn nang):** Khi vi khuẩn *Cutibacterium acnes* sinh sôi mạnh mẽ trong môi trường bít tắc, cơ thể phản ứng bằng tình trạng viêm sưng, tấy đỏ và tích mủ sâu dưới da.

## 2. Thế nào được gọi là mụn kháng trị? {#the-nao-la-mun-khang-tri}

Mụn kháng trị (*Recalcitrant Acne*) là tình trạng mụn mạn tính dai dẳng, không thuyên giảm sau khi đã áp dụng các phác đồ điều trị thông thường (như thuốc bôi kháng sinh, retinoid bôi hoặc thậm chí kháng sinh uống) trong ít nhất 8 – 12 tuần. Mụn thường tái phát dữ dội ngay khi ngừng thuốc hoặc có biểu hiện lan rộng thành các ổ áp-xe dưới da.

## 3. Những sai lầm tai hại khi tự chữa mụn {#sai-lam-khi-tu-dieu-tri}

Nhiều bạn trẻ tại miền Tây thường tìm đến các phương pháp truyền miệng như:
1. **Dùng kem trị mụn trôi nổi chứa corticoid:** Mụn xẹp rất nhanh sau 3 ngày nhưng sau đó bùng phát thành mụn viêm rỉ dịch, teo da và giãn mao mạch.
2. **Tự cạy nặn mụn tại nhà bằng móng tay:** Gây dập nát mô da, đưa thêm vi khuẩn tụ cầu vào ổ viêm dẫn đến sẹo rỗ vĩnh viễn.
3. **Lạm dụng các sản phẩm tẩy da chết nồng độ cao:** Phá hủy hàng rào bảo vệ sinh học tự nhiên, khiến da yếu và dễ nhiễm khuẩn hơn.

## 4. Khi nào bạn bắt buộc phải gặp bác sĩ da liễu? {#khi-nao-can-gap-bac-si}

Bạn nên đến cơ sở y tế chuyên khoa da liễu uy tín ngay khi:
- Mụn xuất hiện dạng bọc lớn, sưng đau nhức nhiều ngày.
- Mụn lan rộng xuống vùng cằm, quai hàm, cổ hoặc lưng.
- Đã thay đổi nhiều loại mỹ phẩm nhưng tình trạng mụn không cải thiện sau 2 tháng.
- Có dấu hiệu hình thành sẹo thâm sâu hoặc sẹo lõm sau mụn.`
  },
  {
    id: "art-02",
    title: "Vì sao mụn cứ tái đi tái lại? Những thói quen chăm sóc da cần xem lại",
    slug: "vi-sao-mun-cu-tai-di-tai-lai",
    category: "cham-soc-da",
    categoryName: "Chăm sóc da",
    summary: "Phân tích 5 nguyên nhân gốc rễ khiến mụn trứng cá liên tục quay trở lại dù đã chữa khỏi nhiều lần và cách thiết lập lối sống chuẩn y khoa.",
    author: "BSCKI. Nguyễn Văn An",
    consultingDoctor: "BSCKI. Nguyễn Văn An",
    publishedDate: "12/10/2026",
    readTime: "4 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80",
    tableOfContents: [
      { id: "nguyen-nhan-khien-mun-tai-phat", title: "1. Nguyên nhân vì sao mụn tái phát", level: 2 },
      { id: "thoi-quen-hang-ngay", title: "2. Những thói quen xấu vô tình nuôi dưỡng mụn", level: 2 },
      { id: "phac-do-duy-tri", title: "3. Phác đồ duy trì sau khi hết mụn", level: 2 }
    ],
    contentMarkdown: `## 1. Nguyên nhân vì sao mụn tái phát {#nguyen-nhan-khien-mun-tai-phat}
Mụn là bệnh lý liên quan mật thiết đến tuyến bã nhờn và nội tiết. Khi bạn dừng phác đồ điều trị mà không duy trì các bước chăm sóc củng cố, tuyến dầu sẽ nhanh chóng hoạt động mạnh trở lại và gây bít tắc mới.

## 2. Những thói quen xấu vô tình nuôi dưỡng mụn {#thoi-quen-hang-ngay}
- Thường xuyên chạm tay lên mặt hoặc không giặt vỏ gối, khẩu trang định kỳ.
- Thức khuya sau 23h làm tăng nồng độ cortisol, kích thích tuyến bã nhờn tiết dầu gấp đôi.
- Dung nạp nhiều đường tinh luyện, sữa bò và đồ chiên rán cay nóng.

## 3. Phác đồ duy trì sau khi hết mụn {#phac-do-duy-tri}
Sau giai đoạn tấn công, bác sĩ sẽ chuyển sang giai đoạn duy trì với hoạt chất bôi mỏng nhẹ (như Adapalene hoặc Azelaic acid) để giữ cho cổ nang lông luôn thông thoáng.`
  },
  {
    id: "art-03",
    title: "Nám, tàn nhang hay đồi mồi? Cách nhận biết các loại tăng sắc tố thường gặp",
    slug: "cach-nhan-biet-nam-tan-nhang-doi-moi",
    category: "cham-soc-da",
    categoryName: "Chăm sóc da",
    summary: "Hướng dẫn chi tiết phân biệt nám mảng, nám chân sâu, tàn nhang bẩm sinh và đồi mồi tuổi tác để lựa chọn đúng phác đồ điều trị bằng ánh sáng y khoa.",
    author: "ThS.BS. Trần Thị Bích Thảo",
    consultingDoctor: "ThS.BS. Trần Thị Bích Thảo",
    publishedDate: "10/10/2026",
    readTime: "6 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
    tableOfContents: [
      { id: "dac-diem-nam-da", title: "1. Đặc điểm nhận diện nám da (Melasma)", level: 2 },
      { id: "tan-nhang-doi-moi", title: "2. Tàn nhang và đồi mồi khác nhau thế nào?", level: 2 },
      { id: "phac-do-y-khoa", title: "3. Phác đồ điều trị sắc tố an toàn tại Lạc's", level: 2 }
    ],
    contentMarkdown: `## 1. Đặc điểm nhận diện nám da (Melasma) {#dac-diem-nam-da}
Nám thường xuất hiện đối xứng hai bên má, trán hoặc sống mũi dưới dạng các mảng màu nâu sẫm hoặc xám xanh. Nám liên quan sâu sắc đến sự biến động estrogen và tia cực tím.

## 2. Tàn nhang và đồi mồi khác nhau thế nào? {#tan-nhang-doi-moi}
- **Tàn nhang:** Đốm nhỏ từ 1 – 2mm, màu nâu nhạt, xuất hiện từ thời niên thiếu và đậm màu khi ra nắng.
- **Đồi mồi:** Đốm phẳng màu nâu hoặc đen, kích thước lớn hơn, thường xuất hiện ở người trên 35 tuổi do tác động tích lũy của ánh nắng mặt trời qua nhiều năm.

## 3. Phác đồ điều trị sắc tố an toàn tại Lạc's {#phac-do-y-khoa}
Kết hợp công nghệ laser chọn lọc phân rã hạt melanin cùng các hoạt chất phục hồi màng đáy, nói không với bào mòn hay lột da gây mất sắc tố.`
  },
  {
    id: "art-04",
    title: "Chống nắng đúng cách cho người sống và làm việc ở miền Tây",
    slug: "chong-nang-dung-cach-mien-tay",
    category: "cham-soc-da",
    categoryName: "Chăm sóc da",
    summary: "Đặc thù thời tiết nắng gắt quanh năm và độ ẩm cao tại miền Tây đòi hỏi phương pháp lựa chọn kem chống nắng phổ rộng và cách bôi dặm khoa học.",
    author: "Dược sĩ Chuyên môn Nhà thuốc LBC",
    consultingDoctor: "ThS.BS. Lạc Kim Ngân",
    publishedDate: "08/10/2026",
    readTime: "4 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=1200&q=80",
    tableOfContents: [
      { id: "dac-thu-tia-uv-mien-tay", title: "1. Chỉ số UV tại các tỉnh miền Tây", level: 2 },
      { id: "tieu-chi-chon-kem-chong-nang", title: "2. Tiêu chí chọn kem chống nắng chuẩn", level: 2 },
      { id: "cach-boi-lai-hieu-qua", title: "3. Cách bôi lại kem chống nắng khi ra nhiều mồ hôi", level: 2 }
    ],
    contentMarkdown: `## 1. Chỉ số UV tại các tỉnh miền Tây {#dac-thu-tia-uv-mien-tay}
Chỉ số UV tại Cần Thơ và Đồng bằng sông Cửu Long thường xuyên ở mức 9 – 11 (cực độ nguy hiểm) trong khoảng thời gian từ 10h sáng đến 15h chiều.

## 2. Tiêu chí chọn kem chống nắng chuẩn {#tieu-chi-chon-kem-chong-nang}
Nên chọn kem chống nắng có màng lọc phổ rộng SPF 50+, PA++++, kết cấu mỏng nhẹ chống thấm nước để không gây bết rít hay bít tắc mụn trong thời tiết nóng ẩm.`
  },
  {
    id: "art-05",
    title: "Sẹo rỗ sau mụn: các hướng điều trị tại phòng khám da liễu",
    slug: "huong-dieu-tri-seo-ro-sau-mun",
    category: "cham-soc-da",
    categoryName: "Chăm sóc da",
    summary: "Tổng hợp các kỹ thuật can thiệp sẹo rỗ hiện đại nhất hiện nay: bóc tách xơ sẹo, Laser Fractional CO2, vi điểm RF và PRP phục hồi mô.",
    author: "BSCKI. Nguyễn Văn An",
    consultingDoctor: "BSCKI. Nguyễn Văn An",
    publishedDate: "05/10/2026",
    readTime: "5 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    tableOfContents: [
      { id: "co-che-hinh-thanh-seo-ro", title: "1. Cơ chế hình thành sẹo rỗ xơ hóa", level: 2 },
      { id: "cac-ky-thuat-dieu-tri", title: "2. Các kỹ thuật điều trị chuẩn y khoa", level: 2 }
    ],
    contentMarkdown: `## 1. Cơ chế hình thành sẹo rỗ xơ hóa {#co-che-hinh-thanh-seo-ro}
Khi ổ mụn nang ăn sâu vào tầng trung bì, các mô liên kết bị hoại tử và thay thế bằng dải xơ cứng kéo bề mặt da lõm xuống.

## 2. Các kỹ thuật điều trị chuẩn y khoa {#cac-ky-thuat-dieu-tri}
Phải kết hợp bóc tách đáy sẹo để cắt đứt chân xơ, sau đó ứng dụng laser hoặc sóng vi nhiệt kích thích cơ thể sản sinh mô mới lấp đầy hố sẹo.`
  },
  {
    id: "art-06",
    title: "Rụng tóc nhiều: những nguyên nhân thường gặp và khi nào cần thăm khám",
    slug: "nguyen-nhan-rung-toc-nhieu",
    category: "cham-soc-da",
    categoryName: "Chăm sóc da",
    summary: "Phân biệt rụng tóc sinh lý dưới 100 sợi/ngày với rụng tóc bệnh lý từng mảng, hói đầu nội tiết và giải pháp tiêm meso nuôi nang tóc.",
    author: "BSCKII. Lê Hoàng Nam",
    consultingDoctor: "BSCKII. Lê Hoàng Nam",
    publishedDate: "03/10/2026",
    readTime: "4 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80",
    tableOfContents: [
      { id: "khi-nao-la-rung-toc-benh-ly", title: "1. Thế nào là rụng tóc bệnh lý?", level: 2 },
      { id: "phuong-phap-phuc-hoi", title: "2. Phương pháp phục hồi nang tóc suy yếu", level: 2 }
    ],
    contentMarkdown: `## 1. Thế nào là rụng tóc bệnh lý? {#khi-nao-la-rung-toc-benh-ly}
Nếu mỗi ngày tóc rụng trên 100 sợi, rụng thành từng mảng tròn lộ da đầu hoặc tóc con mọc lại rất mảnh yếu, bạn cần thăm khám da liễu sớm trước khi nang tóc teo hoàn toàn.`
  },
  {
    id: "art-07",
    title: "Quy trình chăm sóc da cơ bản cho da dầu mụn",
    slug: "quy-trinh-skincare-cho-da-dau-mun",
    category: "cham-soc-da",
    categoryName: "Chăm sóc da",
    summary: "Xây dựng chu trình chăm sóc da tối giản nhưng hiệu quả cao gồm 4 bước: Làm sạch kép, cân bằng ẩm, đặc trị và bảo vệ chống nắng.",
    author: "Ban Chuyên môn LBC",
    consultingDoctor: "ThS.BS. Lạc Kim Ngân",
    publishedDate: "01/10/2026",
    readTime: "4 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
    tableOfContents: [
      { id: "nguyen-tac-toi-gian", title: "1. Nguyên tắc tối giản cho da dầu mụn", level: 2 },
      { id: "bon-buoc-skincare", title: "2. Bốn bước chăm sóc da buổi sáng và tối", level: 2 }
    ],
    contentMarkdown: `## 1. Nguyên tắc tối giản cho da dầu mụn {#nguyen-tac-toi-gian}
Đừng bôi quá nhiều lớp dưỡng chất khiến lỗ chân lông bị nghẹt. Ưu tiên các sản phẩm dạng gel, lotion mỏng nhẹ có nhãn non-comedogenic.`
  },
  {
    id: "art-08",
    title: "Nâng cơ không xâm lấn là gì? Những điều cần biết trước khi thực hiện",
    slug: "nang-co-khong-xam-lan-la-gi",
    category: "cham-soc-da",
    categoryName: "Chăm sóc da",
    summary: "Tìm hiểu cơ chế trẻ hóa của công nghệ sóng tần số vô tuyến RF Jovena và siêu âm hội tụ HIFU giúp thon gọn gương mặt mà không cần phẫu thuật.",
    author: "ThS.BS. Lạc Kim Ngân",
    consultingDoctor: "ThS.BS. Lạc Kim Ngân",
    publishedDate: "28/09/2026",
    readTime: "5 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
    tableOfContents: [
      { id: "co-che-nang-co", title: "1. Cơ chế nâng cơ không phẫu thuật", level: 2 },
      { id: "ai-nen-thuc-hien", title: "2. Ai là đối tượng phù hợp nhất?", level: 2 }
    ],
    contentMarkdown: `## 1. Cơ chế nâng cơ không phẫu thuật {#co-che-nang-co}
Năng lượng sóng vi nhiệt làm co ngắn các sợi collagen chùng nhão ngay lập tức và kích thích quá trình tự chữa lành tạo mô nâng đỡ mới kéo dài trong 3 – 6 tháng.`
  },
  {
    id: "art-09",
    title: "Lạc's Beauty Center tưng bừng khai trương Cơ sở 02 (29/09/2026)",
    slug: "khai-truong-co-so-02-lacs-beauty-center",
    category: "hoat-dong",
    categoryName: "Hoạt động phòng khám",
    summary: "Đánh dấu cột mốc phát triển mới của LBC Group với cơ sở điều trị công nghệ cao tại số 388 Nguyễn Văn Cừ, TP. Cần Thơ.",
    author: "Ban Truyền thông LBC Group",
    publishedDate: "29/09/2026",
    readTime: "3 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    tableOfContents: [
      { id: "cot-moc-moi", title: "1. Cột mốc mở rộng hệ sinh thái y khoa LBC", level: 2 },
      { id: "co-so-vat-chat", title: "2. Không gian sang trọng và trang thiết bị tân tiến", level: 2 }
    ],
    contentMarkdown: `## 1. Cột mốc mở rộng hệ sinh thái y khoa LBC {#cot-moc-moi}
Ngày 29/09/2026, Lạc's Beauty Center chính thức khai trương Cơ sở 02 tại Cần Thơ nhằm đáp ứng nhu cầu thăm khám da liễu ngày càng tăng của người dân miền Tây.`
  },
  {
    id: "art-10",
    title: "Lạc's Academy: Lễ bế giảng và trao chứng chỉ khóa đào tạo Kỹ thuật viên Chăm sóc da",
    slug: "lacs-academy-lop-dao-tao-cham-soc-da",
    category: "hoat-dong",
    categoryName: "Hoạt động phòng khám",
    summary: "Chúc mừng các học viên xuất sắc hoàn thành khóa đào tạo sơ cấp Chăm sóc da chuyên sâu chuẩn y khoa và sẵn sàng gia nhập ngành làm đẹp.",
    author: "Ban Đào tạo Lạc's Academy",
    publishedDate: "25/09/2026",
    readTime: "3 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    tableOfContents: [
      { id: "chuong-trinh-hoc-thuc-te", title: "1. Chương trình thực hành trên 80% thời lượng", level: 2 },
      { id: "co-hoi-viec-lam", title: "2. Cam kết đầu ra và cơ hội việc làm", level: 2 }
    ],
    contentMarkdown: `## 1. Chương trình thực hành trên 80% thời lượng {#chuong-trinh-hoc-thuc-te}
Các học viên được rèn luyện trực tiếp dưới sự hướng dẫn 1:1 của các bác sĩ và chuyên viên tay nghề cao, nắm vững quy tắc vô trùng y khoa.`
  },
  {
    id: "art-11",
    title: "Đội ngũ Bác sĩ Lạc's tham dự Hội nghị Khoa học Da liễu Toàn quốc",
    slug: "bac-si-lacs-tham-du-hoi-nghi-chuyen-mon",
    category: "hoat-dong",
    categoryName: "Hoạt động phòng khám",
    summary: "Cập nhật các tiến bộ y học mới nhất về phác đồ cá nhân hóa và công nghệ laser thế hệ mới trong điều trị sắc tố da.",
    author: "Ban Biên tập Y khoa",
    publishedDate: "20/09/2026",
    readTime: "3 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    tableOfContents: [
      { id: "giao-luu-chuyen-mon", title: "1. Nâng cao trình độ chuyên môn liên tục", level: 2 }
    ],
    contentMarkdown: `## 1. Nâng cao trình độ chuyên môn liên tục {#giao-luu-chuyen-mon}
Đội ngũ bác sĩ tại Lạc's Beauty Center thường xuyên tham gia các hội thảo khoa học trong và ngoài nước để đưa những giải pháp y khoa tân tiến nhất về phục vụ bà con miền Tây.`
  },
  {
    id: "art-12",
    title: "Chương trình Thăm khám và Soi da miễn phí vì sức khỏe làn da cộng đồng miền Tây",
    slug: "hoat-dong-cong-dong-tu-van-da-mien-tay",
    category: "hoat-dong",
    categoryName: "Hoạt động phòng khám",
    summary: "Hơn 500 người dân đã được bác sĩ chuyên khoa soi da đa tầng và tư vấn cách phòng ngừa ung thư da cũng như tác hại của kem trộn chứa corticoid.",
    author: "Đoàn Công tác Xã hội LBC",
    publishedDate: "15/09/2026",
    readTime: "4 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    tableOfContents: [
      { id: "nang-cao-nhan-thuc", title: "1. Nâng cao nhận thức chăm sóc da an toàn", level: 2 }
    ],
    contentMarkdown: `## 1. Nâng cao nhận thức chăm sóc da an toàn {#nang-cao-nhan-thuc}
Chương trình thiện nguyện vì cộng đồng giúp bà con hiểu đúng về các bệnh da liễu thường gặp và tránh xa các sản phẩm thuốc bôi trôi nổi không rõ nguồn gốc.`
  }
];
