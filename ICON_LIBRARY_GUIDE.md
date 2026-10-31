# HƯỚNG DẪN SỬ DỤNG VÀ QUẢN TRỊ THƯ VIỆN ICON LBC

*Tài liệu dành cho Developers, UI/UX Designers và Quản trị viên CMS Lạc's Beauty Center*

---

## 1. CẤU TRÚC THƯ MỤC CHUẨN

Toàn bộ icon của hệ thống đã được tái cấu trúc vào thư mục:
```text
public/assets/icons/
├── brand/                    # A. Nhận diện thương hiệu & Mạng xã hội chính thức
├── medical-clinic/           # B. Phòng khám & Y khoa lâm sàng (Ống nghe, nhịp tim, bệnh án)
├── dermatology-services/     # C. Dịch vụ Da liễu & Thẩm mỹ (10 dịch vụ trọng tâm LBC)
├── specialties/              # D. Chuyên khoa & Hệ sinh thái (Da liễu, Lab, GPP, Đào tạo)
├── technology-equipment/     # E. Công nghệ & Thiết bị (VISIA 3D, RF Jovena, Laser Diode)
├── laboratory/               # F. Xét nghiệm & Phòng lab (Kính hiển vi, bình Erlenmeyer)
├── pharmacy-products/        # G. Nhà thuốc & Dược mỹ phẩm (Thuốc, serum, giỏ hàng, combo)
├── academy-training/         # H. Đào tạo & Học viện (Mũ tốt nghiệp, chứng chỉ, giáo trình)
├── doctors-team/             # I. Đội ngũ Bác sĩ (Bác sĩ chuyên khoa, học vị, hội đồng)
├── ui-navigation/            # J. Điều hướng & Giao diện (Menu, đóng, hotline, địa chỉ, lịch hẹn)
├── status-feedback/          # K. Trạng thái & Thông báo (Thành công, cảnh báo, lỗi, làm mới)
├── payment/                  # L. Phương thức thanh toán (Tiền mặt, chuyển khoản, thẻ POS)
├── shared/                   # M. Dùng chung & Công cụ quản trị CMS
├── all/                      # Thư mục phẳng chứa đầy đủ 153 file SVG để kéo thả nhanh
├── icon-manifest.json        # Danh mục dữ liệu tra cứu chi tiết
├── index.html                # Giao diện Web tra cứu trực quan (Tìm kiếm tiếng Việt, Dark mode)
└── lbc_icons_all.zip         # File nén trọn bộ 153 vector SVG
```

---

## 2. QUY TẮC ĐẶT TÊN FILE (FILE NAMING CONVENTION)

Tất cả các file SVG tuân thủ nghiêm ngặt quy tắc:
```text
[linh-vuc]-[chuc-nang].svg
```
- **Chữ thường (lowercase)**, không dấu, phân cách bằng dấu gạch ngang (`-`).
- **Phải bắt đầu bằng tên lĩnh vực**:
  - `brand-*`: Nhận diện thương hiệu
  - `medical-*`: Y tế và lâm sàng
  - `dermatology-*`: Dịch vụ da liễu và thẩm mỹ
  - `specialties-*`: 5 chuyên khoa hệ sinh thái LBC
  - `technology-*`: Máy móc công nghệ cao
  - `laboratory-*`: Xét nghiệm và phòng thí nghiệm
  - `pharmacy-*`: Nhà thuốc và sản phẩm bán lẻ
  - `academy-*`: Đào tạo nghề học viện
  - `doctors-*`: Đội ngũ y bác sĩ
  - `navigation-*`: Điều hướng và tiện ích
  - `status-*`: Phản hồi trạng thái
  - `payment-*`: Thanh toán chính thức
  - `shared-*`: Tiện ích CMS dùng chung

*Ví dụ:*
- Đúng: `dermatology-acne-care.svg`, `medical-stethoscope.svg`, `pharmacy-medicine.svg`.
- Sai: `acne.svg`, `pill.svg`, `icon1.svg`, `trị-mụn.svg`.

---

## 3. CÁCH SỬ DỤNG TRONG SOURCE CODE

### 3.1. Dùng qua component chuẩn `<DynamicIcon />` (Khuyên dùng)
Component `<DynamicIcon />` tự động hỗ trợ cả tên ngữ nghĩa, tên Lucide cũ và đường dẫn file trực tiếp:

```tsx
import { DynamicIcon } from '@/components/common/DynamicIcon';

// Cách 1: Gọi bằng tên ngữ nghĩa chuẩn LBC
<DynamicIcon name="dermatology-acne-care" className="w-6 h-6 text-primary-600" />

// Cách 2: Gọi bằng đường dẫn file tĩnh
<DynamicIcon url="/assets/icons/medical-clinic/medical-stethoscope.svg" className="w-5 h-5 text-teal-700" />

// Cách 3: Gọi icon thương hiệu (Tự động resolve đường dẫn)
<DynamicIcon name="brand-facebook" className="w-5 h-5" />
```

### 3.2. Dùng trực tiếp qua thẻ `<img>`
```html
<img 
  src="/assets/icons/dermatology-services/dermatology-scar-repair.svg" 
  alt="Trị sẹo rỗ kỹ thuật cao" 
  class="w-6 h-6 inline-block"
/>
```

---

## 4. HƯỚNG DẪN DÀNH CHO QUẢN TRỊ VIÊN CMS (`/demo-admin`)

Khi thay đổi icon cho **Dịch vụ**, **Chuyên khoa**, hoặc **Danh mục sản phẩm**:
1. Trong màn hình chỉnh sửa, bấm nút **"Đổi Icon"**.
2. Hộp thoại **"Chọn Icon từ Thư viện Chuẩn LBC"** sẽ hiển thị:
   - **Lọc theo lĩnh vực:** Bấm chọn các tab tiếng Việt như *Dịch vụ Da liễu, Y khoa & Phòng khám, Chuyên khoa, Công nghệ cao, Nhà thuốc...*
   - **Tìm kiếm thông minh:** Gõ từ khóa tiếng Việt có dấu hoặc không dấu (VD: *"mụn"*, *"sẹo"*, *"bác sĩ"*, *"kính hiển vi"*, *"thuốc"*, *"hotline"*...).
   - **Xem trước tức thì:** Icon đã chọn sẽ hiển thị ngay trong ô "Đang chọn".
3. Bấm **"Áp dụng Icon"** và nhấn **"Lưu thay đổi"** ở góc trên. Dữ liệu sẽ được lưu xuống cơ sở dữ liệu và giữ nguyên vĩnh viễn khi tải lại trang.

---

## 5. QUY CHUẨN KHI THÊM ICON MỚI VÀO THƯ VIỆN

Để đảm bảo chất lượng đồ họa và tính tương thích cao nhất, mọi icon bổ sung mới bắt buộc phải tuân theo tiêu chuẩn:

1. **Định dạng:** Vector SVG chuẩn XML.
2. **Kích thước chuẩn:** `viewBox="0 0 24 24"` (tỷ lệ vuông 1:1).
3. **Độ dày nét vẽ:** `stroke-width="2"`, bo góc tròn `stroke-linecap="round"` và `stroke-linejoin="round"`.
4. **Màu sắc nét vẽ:** Sử dụng `stroke="currentColor"` và `fill="none"` đối với icon outline để tự động nhận màu CSS cha (ví dụ màu Teal LBC `#0E7C86`).
5. **Tuyệt đối an toàn:** Không chứa thẻ `<script>`, các thuộc tính inline javascript `onload`, `onerror` hoặc mã độc XSS.
6. **Đăng ký vào manifest:** Bổ sung thông tin vào `icon-manifest.json` và cập nhật mapping trong `DynamicIcon.tsx`.
