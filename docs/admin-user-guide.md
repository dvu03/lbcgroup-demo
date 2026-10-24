# HƯỚNG DẪN SỬ DỤNG HỆ THỐNG QUẢN TRỊ NỘI DUNG (CMS)
## PHÒNG KHÁM CHUYÊN KHOA DA LIỄU LẠC'S BEAUTY CENTER

Route quản trị: `http://localhost:3000/demo-admin`

---

## 1. TỔNG QUAN HỆ THỐNG CMS

Hệ thống quản trị nội dung của Lạc's Beauty Center được xây dựng dưới dạng **Professional Simulation CMS**, cho phép Ban Giám đốc và đội ngũ vận hành quản lý trực quan toàn bộ nội dung, bố cục, hình ảnh, bác sĩ và sản phẩm trực tiếp từ một giao diện quản trị thống nhất mà **không cần sửa mã nguồn thủ công**.

### Cơ chế lưu trữ dữ liệu đồng bộ
- **Dữ liệu cấu hình & Metadata:** Được lưu trữ trong `LocalStorage` của trình duyệt dưới tiền tố `LBC_DEMO_`, đảm bảo dữ liệu tồn tại vĩnh viễn qua các lần tải lại trang (`F5` / `Ctrl+R`).
- **Thư viện Media & File Uploads:** Được lưu trữ trong `IndexedDB` (`LBC_CMS_MEDIA_DB`) với dung lượng hỗ trợ lên đến 15MB/file, loại bỏ hoàn toàn giới hạn 5MB của LocalStorage thông thường.
- **Tính phản xạ tức thì (Reactive Single Source of Truth):** Mọi thay đổi thực hiện và lưu trong CMS được kết nối trực tiếp với website khách hàng (`http://localhost:3000/`) qua `DemoDataContext`. Khi bấm "Lưu", giao diện website sẽ phản ánh ngay lập tức.

---

## 2. BỐ CỤC DASHBOARD QUẢN TRỊ

### Desktop:
- **Sidebar bên trái:** Tổ chức theo 7 nhóm chuyên biệt, có nút thu gọn (`Collapse`) để mở rộng không gian làm việc.
- **Top Header:** Hiển thị Breadcrumb điều hướng, thanh tìm kiếm nhanh, trạng thái lưu trữ (`🟢 Đã lưu cục bộ`) và nút **"Xem Website Live"** mở tab mới.
- **Khu vực nội dung chính:** Card số liệu KPI động, bảng dữ liệu phân trang, lưới thẻ trực quan và các modal form biên tập.

### Mobile & Tablet:
- **Drawer Menu:** Sidebar tự động chuyển thành Drawer mở/đóng bằng nút Hamburger, có lớp phủ mờ (`backdrop blur`).
- **Form & Bảng dữ liệu:** Tự động co giãn chống tràn ngang (`zero horizontal overflow`), tối ưu thao tác chạm.

---

## 3. CÁC PHÂN HỆ QUẢN TRỊ CHI TIẾT

### 3.1. Dashboard Tổng quan (`TỔNG QUAN -> Dashboard`)
- **Chỉ số KPI tính toán thời gian thực:**
  - Tổng số Bác sĩ chuyên khoa (và số bác sĩ đã duyệt hồ sơ).
  - Tổng số Dịch vụ điều trị da liễu.
  - Tổng số Sản phẩm Dược mỹ phẩm phân phối.
  - Tổng số Bài viết & Cẩm nang y khoa.
  - Tổng số Hero Banner & Slide trình chiếu.
  - Tổng số Khách hẹn đặt lịch thăm khám (kèm huy hiệu thông báo lượt đặt mới).
- **Kiểm định chất lượng nội dung (Audit):**
  - Tự động quét nội dung thiếu ảnh hoặc mô tả chưa hoàn thiện.
- **Lối tắt thao tác nhanh:** Tạo mới bác sĩ, dịch vụ, sản phẩm, banner với 1 cú nhấp chuột.
- **Nhật ký thay đổi gần đây:** Hiển thị 6 sự kiện chỉnh sửa mới nhất.

### 3.2. Quản lý Bố cục Trang chủ (`NỘI DUNG WEBSITE -> Trang chủ & Section`)
- **Bật/Tắt Section:** Bấm nút "Đang bật" / "Đã ẩn" để ẩn hoặc hiển thị bất kỳ khối nào trong 12 section trang chủ.
- **Đổi thứ tự hiển thị:** Dùng 2 nút mũi tên **Lên (↑) / Xuống (↓)** để sắp xếp lại vị trí các module. Thứ tự ngoài trang chủ sẽ cập nhật tương ứng ngay lập tức.
- **Chỉnh sửa tiêu đề & mô tả:** Bấm nút chỉnh sửa để tùy biến tiêu đề và phụ đề hiển thị của từng section.
- **Khôi phục thứ tự gốc:** Bấm "Đặt lại thứ tự gốc" để hoàn nguyên về bố cục ban đầu theo Sapo theme.

### 3.3. Hero Banner & Slider (`THƯ VIỆN NỘI DUNG -> Banner & Slider`)
- **Slide chính (Hero Slider 5 ô):**
  - Quản lý tiêu đề chính, phụ đề, nhãn badge nổi bật.
  - Chọn ảnh Desktop (1600x600) và Mobile (750x450) từ Thư viện Media hoặc tải ảnh mới.
  - Thiết lập nút kêu gọi hành động (CTA label & CTA link).
  - Tích hợp khung **Xem trước trực tiếp (Desktop / Mobile Preview)** ngay trong form.
  - Hỗ trợ đổi thứ tự slide (Lên/Xuống), nhân bản (`Duplicate`) và xóa an toàn.
- **Banner phụ (2 Banner bên phải):**
  - Quản lý nội dung, hình ảnh và liên kết đặt lịch / dược mỹ phẩm.

### 3.4. Đội ngũ Bác sĩ (`DỮ LIỆU CHUYÊN MÔN -> Bác sĩ`)
- **Danh sách hồ sơ:** Hỗ trợ xem dạng lưới thẻ (`Grid`) hoặc dạng bảng chi tiết (`Table`).
- **Tìm kiếm & Lọc:** Tìm nhanh theo tên bác sĩ và lọc theo 4 chuyên khoa y tế.
- **Thông tin hồ sơ:**
  - Họ tên, chức danh y khoa (`formalTitle` e.g. "ThS.BS. Lạc Kim Ngân").
  - Học vị, vai trò tại phòng khám, số năm kinh nghiệm chuyên môn.
  - Ảnh đại diện bác sĩ (tích hợp Media Library, có ảnh fallback chuyên nghiệp nếu chưa có ảnh).
  - Tóm tắt ngắn, triết lý điều trị, quá trình đào tạo và chứng chỉ lâm sàng.
  - Trạng thái phê duyệt y khoa chính thức.
- **Thao tác:** Thêm mới, chỉnh sửa, nhân bản, xóa có xác nhận.

### 3.5. Danh mục Dịch vụ (`DỮ LIỆU CHUYÊN MÔN -> Dịch vụ`)
- **Quản lý 9 dịch vụ điều trị chủ lực + ô soi da VISIA 3D.**
- **Trình soạn thảo nội dung Rich Text (Markdown Editor):**
  - Hỗ trợ Heading, in đậm, in nghiêng, danh sách, trích dẫn.
  - Nút **"Chèn Media"** trực tiếp từ kho ảnh IndexedDB.
  - Tab "Xem trước" (Live Preview) giúp kiểm tra hiển thị trước khi lưu.
- **Biên tập chuyên sâu:**
  - Quy trình điều trị từng bước (thêm/xóa/sửa các bước phác đồ).
  - Hỏi đáp thường gặp FAQ theo từng dịch vụ.
  - Trạng thái duyệt chuyên môn y khoa của bác sĩ.

### 3.6. Dược mỹ phẩm Chính hãng (`THƯƠNG MẠI -> Sản phẩm`)
- **Quản lý danh mục mỹ phẩm chính ngạch:** Bioderma, Biotrade, PostQuam...
- **Thông tin chi tiết:**
  - Mã SKU, tên sản phẩm, thương hiệu, danh mục (Làm sạch, Trị mụn, Phục hồi, Chống nắng...).
  - Giá bán niêm yết, giá gốc so sánh, quy cách đóng gói, xuất xứ.
  - Bộ sưu tập nhiều ảnh sản phẩm.
  - Thành phần chính, công dụng chuẩn, hướng dẫn sử dụng.
  - Bật/tắt ghim sản phẩm lên khối tiêu biểu trang chủ và trạng thái còn hàng.

### 3.7. Tin tức & Kiến thức Y khoa (`MARKETING -> Tin tức & Bài viết`)
- **Soạn thảo bài viết chuyên môn:** Tích hợp Rich Text Markdown, mục lục tự động, thời gian đọc ước tính.
- **Tác giả & Tham vấn y khoa:** Ghi nhận bác sĩ xét duyệt chuyên môn nhằm tuân thủ chuẩn thông tin y tế.
- **Phân loại:** Chăm sóc da liễu / Tin tức hoạt động phòng khám.

### 3.8. Thư viện Media Cục bộ (`THƯ VIỆN NỘI DUNG -> Thư viện Media`)
- **Tải tệp từ máy tính:** Kéo thả hoặc bấm nút tải lên hỗ trợ JPG, PNG, WebP, SVG, MP4 (tối đa 15MB/tệp).
- **Lưu trữ IndexedDB:** Tệp ảnh/video được lưu thành Blob nhị phân trong cơ sở dữ liệu IndexedDB của trình duyệt, không bao giờ bị mất khi tải lại trang.
- **Thanh tra thông số tệp:** Xem kích thước px, dung lượng KB/MB, loại MIME, ngày tạo và Alt text SEO.
- **Thêm URL ngoài:** Nhập nhanh link ảnh Unsplash hoặc video YouTube/CDN.

### 3.9. Quản lý Khách hẹn & Leads (`MARKETING -> Form & Khách hẹn`)
- Danh sách khách hàng điền form đăng ký soi da VISIA 3D và tư vấn dịch vụ.
- Bộ lọc theo trạng thái: Yêu cầu mới, Đã liên hệ, Đã chốt lịch, Đã hủy.
- Chuyển đổi trạng thái trực tiếp trong bảng.
- Nút **"Xuất CSV"** hỗ trợ trích xuất dữ liệu ra file Excel có dấu tiếng Việt UTF-8 BOM.

### 3.10. Logo, Màu sắc & Nhận diện (`THƯ VIỆN NỘI DUNG -> Logo & Nhận diện`)
- Logo Header, Logo Footer, Favicon tab trình duyệt.
- Tên thương hiệu, khẩu hiệu, hotline tổng đài, email, giờ mở cửa.
- Mạng xã hội: Facebook, Zalo OA, TikTok Channel.
- Quy chuẩn hệ thống Font chữ: **Fraunces** (Heading) & **Be Vietnam Pro** (Body).

### 3.11. Nhật ký Chỉnh sửa (`HỆ THỐNG -> Nhật ký chỉnh sửa`)
- Ghi nhận tự động mọi thao tác: Tạo mới, Cập nhật, Xóa, Đổi thứ tự, Khôi phục dữ liệu.
- Lưu trữ mốc thời gian chi tiết đến từng giây kèm phân hệ và tên bản ghi.
- Hỗ trợ tìm kiếm và lọc theo loại thao tác / phân hệ.

### 3.12. Sao lưu & Phục hồi JSON (`HỆ THỐNG -> Sao lưu & Phục hồi`)
- **Xuất file JSON:** Bấm "Tải file JSON về máy" để tải file snapshot toàn bộ dữ liệu CMS.
- **Phục hồi từ JSON:** Tải file `.json` hoặc dán chuỗi JSON vào ô nhập liệu. Hệ thống tự động kiểm tra cú pháp, hiển thị số lượng bản ghi sẽ được cập nhật (Diff preview) và yêu cầu xác nhận an toàn trước khi ghi đè.
- **Khôi phục Cài đặt gốc:** Nút khôi phục đưa toàn bộ hệ sinh thái về cấu hình chuẩn theme ban đầu.

---

## 4. QUY TRÌNH THỰC HIỆN CÁC TÁC VỤ PHỔ BIẾN

### Thao tác 1: Thêm một Bác sĩ mới
1. Vào `DỮ LIỆU CHUYÊN MÔN` &rarr; `Bác sĩ`.
2. Bấm nút **"Thêm Bác sĩ mới"** ở góc phải trên.
3. Nhập họ tên, danh xưng (VD: `ThS.BS. Lê Hoàng Nam`), học vị, chuyên khoa, số năm kinh nghiệm.
4. Bấm **"Chọn từ Media"** để gán ảnh đại diện từ kho ảnh hoặc nhập URL ảnh chân dung.
5. Bấm **"Lưu hồ sơ Bác sĩ"**. Thông báo thành công sẽ xuất hiện.
6. Bấm **"Xem Website"** để kiểm tra bác sĩ vừa thêm đã xuất hiện trên trang chủ và trang `/doi-ngu-bac-si`.

### Thao tác 2: Đổi thứ tự hoặc Ẩn một Section Trang chủ
1. Vào `NỘI DUNG WEBSITE` &rarr; `Trang chủ & Section`.
2. Tìm section cần điều chỉnh (VD: Khối "Đội ngũ Bác sĩ").
3. Bấm nút **Mũi tên Lên (↑)** để đẩy khối lên vị trí cao hơn.
4. Hoặc bấm nút **"Đang bật"** để chuyển sang **"Đã ẩn"**.
5. Mở tab trang chủ website (`http://localhost:3000/`) để kiểm tra thứ tự và trạng thái hiển thị mới.

### Thao tác 3: Tải ảnh mới từ máy tính vào Thư viện
1. Vào `THƯ VIỆN NỘI DUNG` &rarr; `Thư viện Media`.
2. Bấm nút **"Tải tệp từ máy tính"** và chọn ảnh JPG/PNG/WebP từ ổ cứng của bạn.
3. Tệp được nạp tự động vào IndexedDB và hiển thị trên lưới media.
4. Bấm vào tệp để kiểm tra thông số kích thước, alt text và sao chép đường dẫn.
