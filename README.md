# LẠC'S BEAUTY CENTER — WEBSITE DEMO PROTOTYPE
> **Dự án:** Xây dựng website thử nghiệm (Prototype) chuẩn y khoa cho **Phòng khám Chuyên khoa Da liễu Lạc's Beauty Center** trước khi triển khai chính thức trên nền tảng **Sapo Web**.  
> **Tên miền dự kiến:** `lbcgroup.vn`  
> **Theme tham chiếu:** Bean Pharmacity ([bean-pharmacity.mysapo.net](https://bean-pharmacity.mysapo.net/))  
> **Tài liệu căn cứ:** File Brief Excel `Brief_Website_lbcgroup.vn (2)(1).xlsx` (14 sheet chi tiết).

---

## 1. MỤC TIÊU VÀ ĐỊNH HƯỚNG DỰ ÁN
Website không phải là một landing page đơn giản, cũng không phải là bản sao website bán lẻ nhà thuốc. Website được thiết kế theo tỷ trọng **70% Thương hiệu & Dịch vụ Phòng khám Chuyên khoa Da liễu** và **30% Dược – Mỹ phẩm chính hãng hỗ trợ phác đồ điều trị**, thể hiện trọn vẹn **hệ sinh thái 5 lĩnh vực** của doanh nghiệp:
1. **Khoa Da liễu:** Điều trị mụn, sẹo rỗ, nám, trẻ hóa da công nghệ cao chuẩn Y khoa.
2. **Khoa Xét nghiệm:** Xét nghiệm máu, vi nấm, ký sinh trùng demodex, dị nguyên phục vụ chẩn đoán.
3. **Nhà thuốc GPP:** Cấp phát thuốc theo đơn bác sĩ, không bán thuốc kê đơn bừa bãi online.
4. **Dược – Mỹ phẩm:** Phân phối sản phẩm dược mỹ phẩm Châu Âu chính ngạch (Bioderma, Biotrade, PostQuam, La Roche-Posay).
5. **Đào tạo nghề – Lạc's Academy:** Đào tạo kỹ thuật viên spa, chăm sóc da chuẩn y khoa, cấp chứng chỉ hành nghề.

---

## 2. CÔNG NGHỆ SỬ DỤNG
- **Frontend Core:** React 19, TypeScript, Vite 6
- **Routing:** React Router v7 (Single Page Application đa trang mượt mà)
- **Styling:** Tailwind CSS 3 (Design system với mã màu thương hiệu `#0E7C86`, `#0A4F57`, `#EEF7F8`)
- **Typography:** Google Fonts: **Fraunces** (Heading cao cấp, sang trọng) & **Be Vietnam Pro** (Body rõ ràng, chuẩn tiếng Việt)
- **Icons:** Lucide React (Line mảnh, bo góc tinh tế)
- **State Management & Persistence:** React Context API + LocalStorage đồng bộ hai chiều
- **Không phụ thuộc Backend thật:** Độc lập hoàn toàn, dễ dàng demo offline hoặc chạy trên mọi máy tính.

---

## 3. HƯỚNG DẪN KHỞI CHẠY TRÊN LOCAL

### Yêu cầu hệ thống:
- Đã cài đặt **Node.js** (Khuyến nghị phiên bản v20 trở lên)
- Trình duyệt hiện đại (Chrome, Edge, Safari, Firefox)

### Các bước khởi chạy:
```bash
# 1. Di chuyển vào thư mục dự án
cd d:\Demo_LBC

# 2. Cài đặt các gói phụ thuộc (nếu chưa cài)
npm install

# 3. Khởi chạy máy chủ phát triển (Dev Server)
npm run dev
```
Website sẽ hoạt động tại: **`http://localhost:3000/`** (hoặc port được hiển thị trên terminal).

### Lệnh đóng gói kiểm thử (Production Build):
```bash
npm run build
```

---

## 4. DANH SÁCH TOÀN BỘ 25 ROUTE ĐÃ HOÀN THIỆN

| Nhóm trang | Đường dẫn (URL) | Mô tả chức năng |
| :--- | :--- | :--- |
| **Trang chủ** | `/` | Đầy đủ 12 module theo Sheet 2, hỗ trợ bật/tắt và đổi thứ tự trong Admin. |
| **Giới thiệu** | `/gioi-thieu` | Câu chuyện thương hiệu, tầm nhìn, sứ mệnh, 4 giá trị cốt lõi, hành trình. |
| **Cơ sở** | `/he-thong-co-so` | Thông tin Cơ sở 01 (Đường 3/2) & Cơ sở 02 đang hoàn thiện. |
| **Pháp lý** | `/giay-phep-hoat-dong` | Thông tin giấy phép Sở Y tế, chứng chỉ hành nghề (minh họa chờ duyệt). |
| **Tuyển dụng** | `/tuyen-dung` | Chính sách thu hút nhân tài bác sĩ, điều dưỡng, kỹ thuật viên da liễu. |
| **Chuyên khoa 1**| `/khoa-da-lieu` | Chuyên khoa mũi nhọn, phác đồ điều trị cá nhân hóa. |
| **Chuyên khoa 2**| `/khoa-xet-nghiem` | Phòng xét nghiệm vi sinh, sinh hóa da liễu. |
| **Chuyên khoa 3**| `/nha-thuoc` | Nhà thuốc đạt chuẩn GPP, quy định cấp phát thuốc kê đơn. |
| **Chuyên khoa 4**| `/duoc-my-pham-chuyen-khoa`| Giới thiệu lĩnh vực dược mỹ phẩm hỗ trợ điều trị. |
| **Chuyên khoa 5**| `/dao-tao` | Lạc's Academy: các khóa đào tạo nghề chăm sóc da, form đăng ký học viên. |
| **Danh mục DV** | `/dich-vu` | Danh sách 9 dịch vụ chuẩn y khoa từ Sheet 5 với bộ lọc nhóm bệnh lý. |
| **Chi tiết DV** | `/dich-vu/:slug` | 9 trang chi tiết: mụn, sẹo rỗ, nám, nâng cơ, phục hồi corticoid,... (quy trình 7 bước, B&A liên quan). |
| **Đội ngũ BS** | `/doi-ngu-bac-si` | Danh sách 4 bác sĩ sau đại học theo Sheet 6. |
| **Hồ sơ Bác sĩ**| `/bs-:slug` | Chi tiết quá trình đào tạo, kinh nghiệm, triết lý, lịch khám của từng bác sĩ. |
| **Công nghệ** | `/cong-nghe` | Danh mục 6 công nghệ máy móc điều trị từ Sheet 7. |
| **Chi tiết CN** | `/cong-nghe/:slug` | Nguyên lý hoạt động, ứng dụng lâm sàng, chứng nhận tiêu chuẩn thiết bị. |
| **Người thật việc thật**| `/before-after` | Bộ sưu tập ca lâm sàng Trước – Sau điều trị, có thanh trượt tương tác so sánh. |
| **Dược mỹ phẩm** | `/duoc-my-pham` | Danh mục sản phẩm & thương hiệu, giỏ hàng demo (không bán thuốc online). |
| **Thương hiệu** | `/thuong-hieu/:slug` | Trang đối tác chính ngạch: Bioderma, Biotrade, PostQuam, La Roche-Posay. |
| **Chi tiết SP** | `/san-pham/:slug` | Gallery ảnh, **Heading 6 ("Thông số sản phẩm")**, công dụng, thành phần, HDSD. |
| **Tin tức** | `/tin-tuc` | 12 bài viết chuẩn y khoa (Sheet 10) chia 2 danh mục: Chăm sóc da & Hoạt động. |
| **Chi tiết bài** | `/tin-tuc/:slug` | Mục lục tự động (TOC), bác sĩ tham vấn chuyên môn, khuyến cáo y khoa. |
| **Đặt lịch khám** | `/dat-lich-kham` | Form đặt hẹn chuẩn y khoa (Họ tên, SĐT, Dịch vụ, Cơ sở, Giờ hẹn, Đồng ý điều khoản). |
| **Liên hệ** | `/lien-he` | Bản đồ Google Map Cần Thơ, hotline, thông tin pháp nhân, form nhắn tin. |
| **Hỏi đáp** | `/cau-hoi-thuong-gap`| Accordion FAQ phân loại 4 nhóm câu hỏi và tìm kiếm trực tiếp. |
| **Chính sách** | `/chinh-sach/:slug` | 5 trang pháp lý: Bảo mật bệnh án, Thanh toán, Vận chuyển, Đổi trả, Điều khoản. |
| **Tìm kiếm** | `/tim-kiem` | Tìm kiếm toàn diện đa thực thể: Dịch vụ, Bác sĩ, Công nghệ, Bài viết, Sản phẩm. |
| **Demo Admin** | `/demo-admin` | **Bảng điều khiển quản trị prototype dành riêng cho Ban Giám đốc.** |
| **Lỗi 404** | `/404` & `*` | Trang báo lỗi thân thiện, chỉ dẫn quay về trang chủ hoặc đặt lịch khám. |

---

## 5. HỆ THỐNG QUẢN LÝ NỘI DUNG DEMO (`/demo-admin`)
Truy cập: **`http://localhost:3000/demo-admin`**

Khu vực này cho phép Ban Giám đốc trực tiếp thao tác và kiểm tra trải nghiệm biên tập:
1. **Module Trang Chủ:**
   - Dùng nút **Mũi tên Lên/Xuống** để thay đổi thứ tự xuất hiện của 12 section trên trang chủ.
   - Nhấn **Bật / Tắt** để ẩn bớt hoặc kích hoạt lại module ngay lập tức mà không cần sửa code.
2. **Thông Tin Thương Hiệu & Hotline:**
   - Chỉnh sửa Tên pháp nhân, Tên phòng khám, Hotline, Email, Giờ làm việc.
   - Thay đổi thông điệp thanh thông báo Topbar đầu trang.
3. **Hero Slider & Banner:**
   - Sửa tiêu đề, mô tả, nút bấm CTA và link liên kết của từng Slide.
4. **Quản Lý Bác Sĩ, Dịch Vụ, Sản Phẩm:**
   - Xem nhanh thông tin, đường dẫn hồ sơ và dữ liệu đồng bộ.
5. **Lead Đặt Hẹn Khám (Booking Leads):**
   - Danh sách toàn bộ các phiếu đặt hẹn do khách hàng điền tại `/dat-lich-kham`.
   - Cập nhật trạng thái: *Mới đăng ký → Đã liên hệ → Đã xác nhận hẹn*.
   - Nút xóa toàn bộ lead để test lại quy trình từ đầu.
6. **Sao Lưu & Xuất/Nhập Dữ Liệu (JSON Backup):**
   - **Xuất JSON (Export):** Sao chép toàn bộ cấu hình vào Clipboard để chia sẻ sang máy tính khác.
   - **Nhập JSON (Import):** Dán chuỗi JSON đã lưu để khôi phục trạng thái.
   - **Khôi phục gốc (Reset):** Xóa toàn bộ thay đổi và nạp lại 100% dữ liệu gốc từ file Excel ban đầu.

---

## 6. DANH MỤC TÀI LIỆU CHUYỂN GIAO TRONG THƯ MỤC `docs/`

Trong thư mục `docs/`, chúng tôi đã biên soạn đầy đủ 4 tài liệu chuyên sâu phục vụ làm việc với Ban Giám đốc và đối tác công nghệ Sapo:

1. **[`docs/theme-brief-mapping.md`](file:///d:/Demo_LBC/docs/theme-brief-mapping.md):**
   - Bảng đối chiếu chi tiết 26 hạng mục xuyên suốt 14 sheet của file Excel với theme Sapo Bean Pharmacity.
   - Chỉ rõ phần nào tái sử dụng, phần nào cần viết thêm CSS/JS, và dữ liệu nào cần xin cấp phép Sở Y tế.
2. **[`docs/sapo-handoff.md`](file:///d:/Demo_LBC/docs/sapo-handoff.md):**
   - Phân loại kỹ thuật theo 3 nhóm chuyển giao cho đội ngũ Sapo:
     - **Nhóm A (Chuẩn cấu hình Sapo):** Logo, header, banner slider, trang bài viết, danh mục sản phẩm, footer,...
     - **Nhóm B (Cần code Liquid / CSS bổ sung):** Mega menu 5 cột, giao diện 4 thẻ bác sĩ sau đại học, bộ lọc Before-After, bảng thông số Heading 6, CTA thanh nổi mobile.
     - **Nhóm C (Cần App Sapo hoặc Custom API riêng):** Form tiếp nhận lịch hẹn khám kết nối CRM/Zalo ZNS, phân quyền hồ sơ bác sĩ theo quy định Bộ Y tế.
3. **[`docs/pending-decisions.md`](file:///d:/Demo_LBC/docs/pending-decisions.md):**
   - Tổng hợp 13 quyết định còn bỏ ngỏ từ Sheet 13 của Excel, bao gồm: xác nhận danh sách 4 bác sĩ, phạm vi đào tạo Lạc's Academy, giấy phép lưu hành máy móc theo Nghị định 342, phương án tiếp nhận lead lịch hẹn.
4. **[`docs/responsive-testing-report.md`](file:///d:/Demo_LBC/docs/responsive-testing-report.md):**
   - Báo cáo kiểm thử responsive thực tế trên 7 kích thước màn hình từ Mobile nhỏ (320px) đến Desktop màn hình rộng (1440px+).

---

## 7. DANH SÁCH CHỨC NĂNG ĐÃ LÀM & GIỚI HẠN PROTOTYPE

### Các chức năng đã hoàn thành xuất sắc:
- [x] Đọc và số hóa 100% dữ liệu từ 14 sheet file Excel thành cấu trúc TypeScript sạch trong `src/data/`.
- [x] Thiết kế giao diện phòng khám da liễu cao cấp, loại bỏ triệt để các yếu tố bán lẻ xô bồ của theme nhà thuốc (như Flash sale, đồng hồ đếm ngược, mua thuốc kê đơn online bừa bãi).
- [x] Mega menu đa cấp 5 chuyên khoa và 9 dịch vụ điều trị chuẩn y khoa.
- [x] Bộ so sánh ảnh lâm sàng Before–After trực quan, có bộ lọc dịch vụ.
- [x] Khối dược mỹ phẩm có bảng thông số chuẩn (Heading 6 "Thông số sản phẩm").
- [x] Form đặt lịch khám có kiểm tra tính hợp lệ dữ liệu (validation), lưu trữ lead nội bộ và hiển thị màn hình xác nhận phiếu hẹn.
- [x] Trang tìm kiếm toàn diện (Universal Search) hoạt động tức thì trên tất cả dữ liệu.
- [x] Khu vực `/demo-admin` trực quan, cho phép kéo thả, bật/tắt module và sao lưu JSON.
- [x] Đáp ứng chuẩn Nghị định 342/2025/NĐ-CP: toàn bộ thông tin bác sĩ, giấy phép và công nghệ chưa có giấy tờ chính thức đều được gắn nhãn bảo vệ: *"Nội dung minh họa – cần xác nhận"*.

### Giới hạn kỹ thuật của bản Prototype:
- **Chưa có Backend/Database máy chủ thật:** Bản demo lưu trữ dữ liệu tại `LocalStorage` của trình duyệt người dùng. Khi chuyển sang giai đoạn chính thức với đối tác Sapo, dữ liệu sản phẩm sẽ nằm trên Sapo Web và lead lịch hẹn sẽ kết nối qua Webhook/CRM.
- **Giỏ hàng dược mỹ phẩm mang tính chất minh họa luồng:** Chưa tích hợp cổng thanh toán trực tuyến (VNPAY, Momo) hay đơn vị vận chuyển (GHTK, GHN).
- **Thuốc kê đơn không bán online:** Tuân thủ pháp luật Dược Việt Nam, danh mục thuốc chỉ để tham khảo và hướng dẫn người bệnh đến trực tiếp phòng khám.

---
*Tài liệu được lập bởi Senior Full-stack Developer, UI/UX Designer & Technical Lead dự án Lạc's Beauty Center.*
