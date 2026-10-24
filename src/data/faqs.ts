export interface FAQGroup {
  id: string;
  groupTitle: string;
  items: {
    question: string;
    answer: string;
  }[];
}

export const initialFAQs: FAQGroup[] = [
  {
    id: "dat-lich-tham-kham",
    groupTitle: "Đặt lịch & Thăm khám tại Phòng khám",
    items: [
      {
        question: "Phòng khám có cần đặt lịch hẹn trước khi đến không?",
        answer: "Quý khách nên đặt lịch trước qua website hoặc Hotline 1900 6750 để được sắp xếp bác sĩ chuyên khoa phù hợp và không phải chờ đợi lâu, đặc biệt vào các khung giờ cao điểm và cuối tuần."
      },
      {
        question: "Chi phí khám và soi da ban đầu là bao nhiêu?",
        answer: "Chi phí thăm khám trực tiếp cùng Bác sĩ Chuyên khoa Da liễu và phân tích da đa tầng bằng máy VISIA 3D được áp dụng theo bảng giá niêm yết công khai tại phòng khám. Vào các dịp đặc biệt hoặc đăng ký online, phòng khám thường có chính sách ưu đãi trải nghiệm soi da miễn phí."
      },
      {
        question: "Bác sĩ nào sẽ trực tiếp thăm khám cho tôi?",
        answer: "100% khách hàng tại Lạc's Beauty Center được trực tiếp Bác sĩ có trình độ sau đại học (Thạc sĩ, Bác sĩ Chuyên khoa I, II) thăm khám, phân tích phim soi da và lên phác đồ điều trị."
      },
      {
        question: "Hai cơ sở của phòng khám có khác nhau về dịch vụ không?",
        answer: "Cả 2 cơ sở (231T Đường 3/2 và 388 Nguyễn Văn Cừ) đều sở hữu đồng bộ hệ thống máy móc công nghệ cao, đội ngũ bác sĩ luân phiên làm việc theo lịch cố định và chất lượng dịch vụ đạt chuẩn y khoa như nhau."
      }
    ]
  },
  {
    id: "dich-vu-dieu-tri",
    groupTitle: "Dịch vụ Điều trị Da liễu & Thẩm mỹ",
    items: [
      {
        question: "Liệu trình trị mụn tại Lạc's kéo dài bao lâu?",
        answer: "Thời gian điều trị phụ thuộc vào mức độ mụn viêm, mụn ẩn và cơ địa từng người. Thông thường sau 2 – 3 buổi (khoảng 3 – 4 tuần), các ổ viêm se cồi rõ rệt; liệu trình hoàn chỉnh thường kéo dài từ 6 – 8 buổi."
      },
      {
        question: "Bóc tách đáy sẹo và bắn laser trị sẹo rỗ có đau không?",
        answer: "Trước khi thực hiện, khách hàng được ủ tê y tế chuyên dụng từ 30 – 45 phút nên quá trình thực hiện rất nhẹ nhàng, chỉ cảm thấy châm chích nhẹ và hoàn toàn trong ngưỡng chịu đựng được."
      },
      {
        question: "Sau khi trị nám bằng laser có bị tăng sắc tố dội ngược không?",
        answer: "Tại Lạc's, bác sĩ sử dụng bước sóng laser chọn lọc năng lượng thấp kết hợp phục hồi màng đáy và kem bôi ức chế tế bào hắc tố, giúp kiểm soát tối đa nguy cơ tăng sắc tố sau viêm (PIH)."
      },
      {
        question: "Nâng cơ RF Jovena và HIFU duy trì hiệu quả được bao lâu?",
        answer: "Hiệu quả săn chắc thon gọn viền hàm có thể thấy ngay sau buổi đầu tiên và tiếp tục tăng sinh collagen tối ưu trong 3 – 6 tháng tiếp theo, duy trì ổn định từ 8 đến 12 tháng tùy vào chế độ sinh hoạt."
      }
    ]
  },
  {
    id: "mua-hang-giao-hang",
    groupTitle: "Mua hàng Dược mỹ phẩm & Giao hàng",
    items: [
      {
        question: "Dược mỹ phẩm tại website có phải là hàng chính hãng 100% không?",
        answer: "Lạc's Beauty Center cam kết 100% sản phẩm phân phối là hàng chính ngạch nhập khẩu ủy quyền từ các thương hiệu Bioderma, Biotrade, PostQuam... Có đầy đủ tem chống hàng giả, tem phụ tiếng Việt và hóa đơn VAT."
      },
      {
        question: "Tôi ở các tỉnh miền Tây thì giao hàng mất bao lâu?",
        answer: "Đối với khu vực nội ô TP. Cần Thơ, phòng khám hỗ trợ giao hỏa tốc trong 2 – 4 giờ. Với các tỉnh miền Tây lân cận (Hậu Giang, Vĩnh Long, Sóc Trăng, An Giang...), thời gian nhận hàng từ 1 – 2 ngày làm việc."
      },
      {
        question: "Website có bán thuốc kê đơn trực tuyến không?",
        answer: "Theo quy định pháp luật y tế Việt Nam, Nhà thuốc Lạc's không bán thuốc kê đơn qua mạng. Website chỉ giới thiệu thông tin và cung cấp các dòng dược mỹ phẩm chăm sóc da không kê đơn."
      }
    ]
  },
  {
    id: "dao-tao-academy",
    groupTitle: "Đào tạo nghề – Lạc's Academy",
    items: [
      {
        question: "Học viên chưa biết gì về chăm sóc da có học được không?",
        answer: "Khóa đào tạo Kỹ thuật viên Chăm sóc da chuẩn y khoa được thiết kế bài bản từ cơ bản đến nâng cao, phù hợp cho cả người mới bắt đầu từ con số 0."
      },
      {
        question: "Thời gian thực hành trên người thật chiếm bao nhiêu phần trăm?",
        answer: "Chương trình đào tạo tại Lạc's Academy chú trọng thực chiến với hơn 80% thời lượng là thực hành trực tiếp trên mẫu thật dưới sự kèm cặp 1:1 của giảng viên và bác sĩ."
      },
      {
        question: "Sau khi tốt nghiệp có được cấp chứng chỉ hợp pháp không?",
        answer: "Học viên hoàn thành khóa học và đạt kỳ thi kiểm tra tay nghề sẽ được cấp Chứng chỉ đào tạo nghề sơ cấp có giá trị pháp lý toàn quốc để tự tin hành nghề hoặc mở cơ sở làm đẹp riêng."
      }
    ]
  }
];
