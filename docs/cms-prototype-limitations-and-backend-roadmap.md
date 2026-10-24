# BÁO CÁO GIỚI HẠN PROTOTYPE & LỘ TRÌNH TRIỂN KHAI BACKEND PRODUCTION
## DỰ ÁN WEBSITE & CMS LẠC'S BEAUTY CENTER

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này xác định ranh giới kỹ thuật rõ ràng giữa:
1. **Hệ thống Quản trị Nội dung Mô phỏng (Professional CMS Simulation Prototype)** hiện đang chạy trên nền tảng Frontend (React, TypeScript, IndexedDB, LocalStorage).
2. **Hệ thống CMS Backend & E-commerce Production** cần được xây dựng khi làm việc với đối tác Sapo và đội ngũ kỹ thuật doanh nghiệp chính thức.

Tài liệu này giúp Ban Giám đốc và bộ phận phát triển hiểu đúng phạm vi của bản demo, tránh các hiểu lầm về mặt an toàn thông tin, tính pháp lý y khoa và cơ chế đồng bộ dữ liệu đa người dùng.

---

## 2. CÁC TUYÊN BỐ GIỚI HẠN CỦA PROTOTYPE HIỆN TẠI

> [!WARNING]
> **Các tính năng sau đây thuộc phạm vi Prototype cục bộ và CHƯA PHẢI là hệ thống Production:**

### 2.1. Xác thực người dùng (Authentication & RBAC)
- **Hiện trạng Prototype:** Truy cập trực tiếp tại `/demo-admin` để Ban Giám đốc và các bên liên quan dễ dàng kiểm thử giao diện mà không bị cản trở bởi bước đăng nhập mật khẩu.
- **Giới hạn:** Không có cơ chế mã hóa mật khẩu (bcrypt), phân quyền theo vai trò (Role-Based Access Control: Admin, Bác sĩ, Biên tập viên, CSKH), JWT Token, Refresh Token hoặc bảo vệ CSRF/CORS cấp máy chủ.

### 2.2. Lưu trữ dữ liệu & Đồng bộ đa người dùng
- **Hiện trạng Prototype:** Dữ liệu cấu hình, bác sĩ, sản phẩm, tin tức được lưu trong `LocalStorage` và hình ảnh/video được lưu trong `IndexedDB` của **chính trình duyệt và máy tính đang chạy**.
- **Giới hạn:** 
  - Dữ liệu **KHÔNG TỰ ĐỘNG ĐỒNG BỘ** giữa các máy tính, trình duyệt hoặc người dùng khác nhau trên mạng Internet.
  - Khi một người dùng thêm sản phẩm trên máy A, máy B sẽ không thấy sự thay đổi trừ khi xuất gói file JSON từ máy A và nhập vào máy B.
  - Không có cơ sở dữ liệu quan hệ tập trung (PostgreSQL / MySQL / MongoDB).

### 2.3. Tích hợp nền tảng bán hàng Sapo
- **Hiện trạng Prototype:** Danh mục sản phẩm, thương hiệu, mức giá và giỏ hàng được mô phỏng trực quan theo cấu trúc theme Bean Pharmacity của Sapo.
- **Giới hạn:**
  - Chưa kết nối trực tiếp với Sapo Open API.
  - Chưa đồng bộ tồn kho thời gian thực với kho hàng vật lý của Sapo POS.
  - Chưa liên kết cổng thanh toán trực tuyến (VNPAY, MoMo, ZaloPay, chuyển khoản ngân hàng tự động).
  - Không triển khai bán thuốc kê đơn trực tuyến (tuân thủ nghiêm ngặt Luật Dược Việt Nam).

### 2.4. Lưu trữ Media & Video
- **Hiện trạng Prototype:** Lưu trữ dưới dạng Blob nhị phân trong cơ sở dữ liệu cục bộ IndexedDB của trình duyệt.
- **Giới hạn:** File chưa được upload lên máy chủ tệp chuyên dụng (Object Storage như AWS S3, Cloudflare R2, Google Cloud Storage) hoặc mạng phân phối nội dung CDN toàn cầu.

### 2.5. Bảo mật Thông tin Y tế & Khách hẹn (Leads)
- **Hiện trạng Prototype:** Danh sách khách hẹn điền form được lưu trong LocalStorage phục vụ kiểm tra luồng trải nghiệm khách hàng.
- **Giới hạn:**
  - Chưa mã hóa dữ liệu cá nhân theo chuẩn an toàn thông tin y tế.
  - Form chưa tự động gửi thông báo SMS Brandname, Email tự động tới khách hàng hoặc webhook sang hệ thống CRM phòng khám.

---

## 3. LỘ TRÌNH KỸ THUẬT KHI TRIỂN KHAI PRODUCTION (BACKEND ROADMAP)

Khi chuyển giao sang giai đoạn triển khai chính thức cùng đối tác Sapo và đội ngũ phát triển Backend, các phân hệ sau đây cần được hoàn thiện:

```
[ Frontend Client / CMS Admin ]
             │
             ▼ (REST / GraphQL API + JWT)
[ API Gateway & Security Layer (Rate Limit, CORS, WAF) ]
             │
 ┌───────────┼───────────────────────────┬──────────────────────┐
 │           │                           │                      │
 ▼           ▼                           ▼                      ▼
[ Auth &    [ Core CMS & Content DB ]   [ Media Storage CDN ]  [ Sapo Integration ]
  RBAC ]     (PostgreSQL / Supabase)     (S3 / Cloudflare R2)   (Webhooks & POS Sync)
             │                                                  │
             ▼                                                  ▼
      [ Audit Log DB ]                                   [ CRM & SMS Gateway ]
```

### 3.1. Phân hệ Xác thực & Phân quyền (Auth & Security)
1. **Xác thực:** Triển khai OAuth2 / JWT / SSO với 2FA (xác thực 2 yếu tố qua OTP điện thoại/email) cho đội ngũ quản trị.
2. **Phân quyền người dùng (RBAC):**
   - **Super Admin:** Toàn quyền quản trị hệ thống, sao lưu và phân quyền nhân sự.
   - **Bác sĩ Trưởng khoa:** Phê duyệt phác đồ điều trị, duyệt bài viết y khoa và kết quả ca lâm sàng Before-After.
   - **Biên tập viên Marketing:** Quản lý bài viết tin tức, banner khuyến mãi, SEO meta.
   - **Nhân viên Lễ tân / CSKH:** Tiếp nhận và xử lý danh sách khách hẹn (Leads), gọi điện xác nhận lịch thăm khám.

### 3.2. Phân hệ Cơ sở dữ liệu tập trung (Central Database)
- **Hệ quản trị CSDL đề xuất:** PostgreSQL (hỗ trợ JSONB linh hoạt) hoặc Supabase/Firebase.
- **Schema Mapping:** Các Interface TypeScript đã định nghĩa chuẩn xác trong prototype (`DoctorProfile`, `ServiceItem`, `ProductItem`, `SlideItem`, `SiteConfig`, `BookingLead`) được thiết kế đồng bộ 1:1, sẵn sàng chuyển đổi thành Database Migration Scripts hoặc Prisma Schema.
- **Transaction & Locking:** Đảm bảo toàn vẹn dữ liệu khi nhiều quản trị viên cùng chỉnh sửa nội dung một lúc.

### 3.3. Phân hệ Quản lý Media & CDN (Cloud Storage)
- **Lưu trữ:** Thay thế IndexedDB bằng dịch vụ lưu trữ đám mây (AWS S3, Cloudflare R2, hoặc kho media của Sapo).
- **Tối ưu hình ảnh tự động:** Tự động nén ảnh, tạo phiên bản WebP/AVIF và sinh các kích thước thumbnail (Desktop 1600px, Tablet 1024px, Mobile 750px, Thumbnail 200px) qua Cloudflare Images hoặc ImageSharp.
- **Bảo mật tệp:** Kiểm tra mã độc (Antivirus scan), loại bỏ siêu dữ liệu nhạy cảm (EXIF location) trước khi xuất bản.

### 3.4. Phân hệ Đồng bộ Nền tảng Sapo (Sapo Omni-Channel Integration)
1. **Sapo Webhook:** Lắng nghe các sự kiện cập nhật sản phẩm, thay đổi giá bán và biến động tồn kho từ Sapo POS để tự động cập nhật website.
2. **Sapo Checkout & Cart:** Kết nối luồng đặt hàng dược mỹ phẩm với cổng thanh toán và hệ thống vận chuyển đối tác (GHTK, Viettel Post, GrabExpress).
3. **Tuân thủ quy chuẩn y tế:** Tách biệt rõ ràng giữa Dược mỹ phẩm không kê đơn (được bán online) và Thuốc điều trị chuyên khoa (chỉ được kê đơn trực tiếp tại cơ sở phòng khám).

### 3.5. Phân hệ Tiếp nhận Khách hẹn & Chăm sóc Khách hàng (CRM & Automation)
1. **SMS / Zalo ZNS Gateway:** Gửi tin nhắn xác nhận lịch khám tự động ngay khi khách điền form trên website.
2. **Đồng bộ phần mềm phòng khám:** Đẩy dữ liệu lịch hẹn vào phần mềm quản lý phòng khám (Clinic Management System / HIS) để phân bổ phòng khám và bác sĩ phụ trách.

---

## 4. KẾT LUẬN

Prototype CMS Lạc's Beauty Center hiện tại đã đạt mức độ hoàn thiện cao nhất về mặt trải nghiệm người dùng, tính năng biên tập nội dung, cấu trúc dữ liệu y tế chuẩn mực và khả năng phản ánh trực quan trên giao diện website. Đây là nền tảng vững chắc để Ban Giám đốc phê duyệt định hướng, thống nhất phạm vi triển khai và tiến hành làm việc hiệu quả với đối tác Sapo.
