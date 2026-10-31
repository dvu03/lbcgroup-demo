const fs = require('fs');
const path = require('path');

const ROOT_ICONS = path.resolve('icons');
const PUBLIC_ICONS = path.resolve('public', 'icons');
const TARGET_ASSETS = path.resolve('public', 'assets', 'icons');

// 1. Full 148-file migration mapping
const MAPPING = {
  "activity.svg": { cat: "dermatology-services", name: "dermatology-scar-repair", label: "Trị sẹo rỗ kỹ thuật cao", desc: "Tái tạo phục hồi mô xơ và bóc tách đáy sẹo" },
  "alert-circle.svg": { cat: "status-feedback", name: "status-error", label: "Thông báo lỗi / Cảnh báo", desc: "Biểu tượng cảnh báo lỗi nhập liệu hoặc trạng thái" },
  "alert-triangle.svg": { cat: "status-feedback", name: "status-warning", label: "Cảnh báo y khoa", desc: "Biểu tượng lưu ý chống chỉ định hoặc cảnh báo" },
  "align-center.svg": { cat: "shared", name: "editor-align-center", label: "Căn giữa văn bản", desc: "Định dạng căn giữa trình soạn thảo CMS" },
  "align-justify.svg": { cat: "shared", name: "editor-align-justify", label: "Căn đều văn bản", desc: "Định dạng căn đều hai bên CMS" },
  "align-left.svg": { cat: "shared", name: "editor-align-left", label: "Căn trái văn bản", desc: "Định dạng căn trái lề văn bản" },
  "arrow-down.svg": { cat: "ui-navigation", name: "navigation-arrow-down", label: "Mũi tên hướng xuống", desc: "Chỉ hướng cuộn trang hoặc menu mở rộng" },
  "arrow-right.svg": { cat: "ui-navigation", name: "navigation-arrow-right", label: "Mũi tên xem tiếp (CTA)", desc: "Kêu gọi hành động xem chi tiết, khám phá" },
  "arrow-up-circle.svg": { cat: "ui-navigation", name: "navigation-arrow-up-circle", label: "Nút cuộn tròn lên đầu", desc: "Nút Back To Top dạng vòng tròn" },
  "arrow-up-right.svg": { cat: "ui-navigation", name: "navigation-arrow-up-right", label: "Mũi tên mở liên kết ngoài", desc: "Chỉ thị liên kết ngoài website" },
  "arrow-up.svg": { cat: "ui-navigation", name: "navigation-back-to-top", label: "Nút cuộn lên đầu trang", desc: "Nút Back To Top chuẩn website" },
  "award.svg": { cat: "academy-training", name: "academy-certificate-award", label: "Chứng chỉ & Học vị", desc: "Biểu tượng bằng cấp và giải thưởng chuyên môn" },
  "bell.svg": { cat: "shared", name: "ui-notification-bell", label: "Chuông thông báo", desc: "Biểu tượng thông báo khách hàng và CMS" },
  "bold.svg": { cat: "shared", name: "editor-bold", label: "Chữ in đậm (B)", desc: "Định dạng chữ in đậm trong CMS" },
  "book-open.svg": { cat: "academy-training", name: "academy-curriculum-book", label: "Giáo trình đào tạo", desc: "Tài liệu học thuật và cẩm nang da liễu" },
  "box.svg": { cat: "pharmacy-products", name: "pharmacy-packaging-box", label: "Hộp đóng gói sản phẩm", desc: "Biểu tượng quy cách đóng gói dược mỹ phẩm" },
  "briefcase.svg": { cat: "shared", name: "ui-briefcase-career", label: "Cặp hồ sơ / Tuyển dụng", desc: "Biểu tượng cơ hội nghề nghiệp và tuyển dụng LBC" },
  "building.svg": { cat: "ui-navigation", name: "navigation-facility-building", label: "Tòa nhà cơ sở 1", desc: "Biểu tượng địa điểm cơ sở phòng khám" },
  "building2.svg": { cat: "payment", name: "payment-bank-transfer", label: "Chuyển khoản ngân hàng", desc: "Phương thức thanh toán qua ngân hàng / VietQR" },
  "calendar-check.svg": { cat: "dermatology-services", name: "dermatology-visia-booking", label: "Đặt lịch soi da VISIA 3D", desc: "Đăng ký khám và phân tích 8 chỉ số chuyên sâu" },
  "calendar-check2.svg": { cat: "ui-navigation", name: "navigation-schedule-confirm", label: "Xác nhận lịch hẹn", desc: "Lịch hẹn khám đã được tiếp nhận" },
  "calendar.svg": { cat: "ui-navigation", name: "navigation-appointment-calendar", label: "Lịch hẹn khám bệnh", desc: "Biểu tượng đặt lịch khám và thời gian biểu" },
  "check-circle2.svg": { cat: "status-feedback", name: "status-success", label: "Thành công / Hoàn tất", desc: "Trạng thái hoàn thành thành công" },
  "check.svg": { cat: "status-feedback", name: "status-check", label: "Dấu tích xác nhận", desc: "Biểu tượng tích chọn hoặc tiêu chí đã đạt" },
  "chevron-down.svg": { cat: "ui-navigation", name: "navigation-chevron-down", label: "Mũi tên mở rộng xuống", desc: "Mở menu thả xuống và câu hỏi thường gặp" },
  "chevron-left.svg": { cat: "ui-navigation", name: "navigation-chevron-left", label: "Mũi tên sang trái", desc: "Chuyển slide hoặc chuyển trang trước" },
  "chevron-right.svg": { cat: "ui-navigation", name: "navigation-chevron-right", label: "Mũi tên sang phải", desc: "Chuyển slide tiếp theo hoặc mục kế" },
  "chevron-up.svg": { cat: "ui-navigation", name: "navigation-chevron-up", label: "Mũi tên thu gọn lên", desc: "Thu gọn menu hoặc khối nội dung" },
  "chevrons-up.svg": { cat: "ui-navigation", name: "navigation-chevrons-up", label: "Mũi tên kép lên nhanh", desc: "Nút cuộn nhanh lên đầu trang" },
  "clipboard-list.svg": { cat: "shared", name: "ui-clipboard-checklist", label: "Bảng kiểm tra phác đồ", desc: "Danh sách quy trình và các bước điều trị" },
  "clock.svg": { cat: "ui-navigation", name: "navigation-hours-clock", label: "Giờ mở cửa (08:00 - 20:00)", desc: "Thời gian phục vụ và giờ tiếp nhận khách" },
  "code.svg": { cat: "shared", name: "system-code", label: "Mã nhúng HTML/SVG", desc: "Xem và biên tập mã nguồn nhúng" },
  "copy.svg": { cat: "shared", name: "system-copy", label: "Sao chép vào bộ nhớ", desc: "Nút copy nội dung hoặc mã SVG" },
  "cpu.svg": { cat: "technology-equipment", name: "technology-visia-3d", label: "Máy soi da đa tầng VISIA 3D", desc: "Hệ thống vi xử lý phân tích cấu trúc da chuẩn y khoa" },
  "credit-card.svg": { cat: "payment", name: "payment-credit-card", label: "Thẻ tín dụng / Ghi nợ", desc: "Thanh toán quẹt thẻ Visa/Mastercard/JCB" },
  "database.svg": { cat: "shared", name: "system-database", label: "Cơ sở dữ liệu hệ thống", desc: "Dữ liệu lưu trữ CMS và Neon DB" },
  "dollar-sign.svg": { cat: "payment", name: "payment-cash", label: "Tiền mặt tại quầy", desc: "Phương thức thanh toán tiền mặt tại quầy thu ngân" },
  "download.svg": { cat: "shared", name: "system-download", label: "Tải xuống tệp tin", desc: "Nút tải tài liệu, file SVG hoặc báo cáo" },
  "droplet.svg": { cat: "pharmacy-products", name: "pharmacy-serum-droplet", label: "Tinh chất serum phục hồi", desc: "Dưỡng chất tinh khiết tái tạo tế bào da" },
  "droplets.svg": { cat: "pharmacy-products", name: "pharmacy-cleanser-droplets", label: "Làm sạch & Nước tẩy trang", desc: "Nước tẩy trang và sữa rửa mặt dịu lành" },
  "edit.svg": { cat: "shared", name: "system-edit", label: "Chỉnh sửa bài viết", desc: "Nút biên tập dữ liệu trên CMS" },
  "edit3.svg": { cat: "shared", name: "system-edit-alt", label: "Soạn thảo văn bản", desc: "Biểu tượng bút viết và ghi chú" },
  "external-link.svg": { cat: "ui-navigation", name: "navigation-external-link", label: "Liên kết ngoài trang", desc: "Chuyển tiếp đến trang web thứ ba" },
  "eye-off.svg": { cat: "shared", name: "system-eye-off", label: "Ẩn hiển thị", desc: "Tắt trạng thái hiển thị của mục" },
  "eye.svg": { cat: "shared", name: "system-eye", label: "Xem trước / Hiển thị", desc: "Bật trạng thái hiển thị hoặc xem trước" },
  "facebook.svg": { cat: "brand", name: "brand-facebook", label: "Fanpage Facebook chính thức", desc: "Liên kết mạng xã hội Facebook LBC" },
  "fallback-clinic.svg": { cat: "brand", name: "brand-clinic-graphic", label: "Đồ họa cơ sở phòng khám", desc: "Hình minh họa cơ sở y tế phòng khám" },
  "feather.svg": { cat: "dermatology-services", name: "dermatology-hair-scalp", label: "Trị rụng tóc & Nang tóc", desc: "Kích thích nang tóc và phục hồi da đầu dịu nhẹ" },
  "file-check.svg": { cat: "medical-clinic", name: "medical-file-check", label: "Hồ sơ bệnh án thẩm định", desc: "Hồ sơ bệnh án được bác sĩ ký duyệt" },
  "file-code.svg": { cat: "shared", name: "system-file-code", label: "Tập tin mã nguồn", desc: "Biểu tượng tệp cấu hình và mã lập trình" },
  "file-text.svg": { cat: "shared", name: "system-file-text", label: "Tài liệu văn bản", desc: "Bài viết, chính sách và văn bản y tế" },
  "film.svg": { cat: "shared", name: "media-video-film", label: "Video clip giới thiệu", desc: "Biểu tượng video tư liệu điều trị" },
  "filter.svg": { cat: "shared", name: "system-filter", label: "Bộ lọc chuyên mục", desc: "Lọc theo danh mục và tiêu chí" },
  "fingerprint.svg": { cat: "medical-clinic", name: "medical-biometric", label: "Vân tay cá nhân hóa", desc: "Phác đồ điều trị y học cá nhân hóa độc bản" },
  "flame.svg": { cat: "pharmacy-products", name: "pharmacy-best-seller-flame", label: "Sản phẩm bán chạy", desc: "Biểu tượng mục hot, sản phẩm bán chạy nhất" },
  "flask-conical.svg": { cat: "laboratory", name: "laboratory-flask-conical", label: "Bình thí nghiệm hóa sinh", desc: "Dụng cụ xét nghiệm vi sinh và Demodex" },
  "folder-tree.svg": { cat: "shared", name: "system-folder-tree", label: "Cây thư mục danh mục", desc: "Cấu trúc cây danh mục chuyên khoa" },
  "globe.svg": { cat: "ui-navigation", name: "navigation-globe", label: "Website chính thức", desc: "Địa chỉ trang web trực tuyến và ngôn ngữ" },
  "graduation-cap.svg": { cat: "academy-training", name: "academy-graduation", label: "Tốt nghiệp học viện", desc: "Đào tạo nghề kỹ thuật viên chăm sóc da" },
  "grid.svg": { cat: "shared", name: "ui-grid-layout", label: "Bố cục lưới (Grid)", desc: "Chế độ hiển thị dạng lưới" },
  "hard-drive-download.svg": { cat: "shared", name: "system-backup-download", label: "Tải sao lưu dữ liệu", desc: "Tải file backup dữ liệu trang web" },
  "hard-drive.svg": { cat: "shared", name: "system-server-storage", label: "Bộ nhớ máy chủ", desc: "Dung lượng lưu trữ media máy chủ" },
  "heading1.svg": { cat: "shared", name: "editor-heading1", label: "Tiêu đề cấp 1 (H1)", desc: "Định dạng tiêu đề chính trong bài" },
  "heading2.svg": { cat: "shared", name: "editor-heading2", label: "Tiêu đề cấp 2 (H2)", desc: "Định dạng tiêu đề phụ trong bài" },
  "heart-handshake.svg": { cat: "medical-clinic", name: "medical-heart-care", label: "Trái tim tận tâm y đức", desc: "Sứ mệnh chăm sóc tận tâm và y đức bác sĩ" },
  "heart-pulse.svg": { cat: "medical-clinic", name: "medical-heart-pulse", label: "Nhịp tim sinh học", desc: "Biểu tượng sinh hiệu sức khỏe làn da" },
  "heart.svg": { cat: "shared", name: "ui-favorite-heart", label: "Mục yêu thích", desc: "Biểu tượng lưu dịch vụ/sản phẩm yêu thích" },
  "help-circle.svg": { cat: "status-feedback", name: "status-help", label: "Hỏi đáp & Trợ giúp", desc: "Giải đáp thắc mắc và câu hỏi thường gặp" },
  "history.svg": { cat: "shared", name: "system-audit-history", label: "Lịch sử cập nhật", desc: "Nhật ký kiểm tra và lịch sử thay đổi CMS" },
  "home.svg": { cat: "ui-navigation", name: "navigation-home", label: "Trang chủ LBC", desc: "Nút điều hướng về trang chủ website" },
  "image.svg": { cat: "shared", name: "media-image", label: "Hình ảnh / Media", desc: "Biểu tượng tệp hình ảnh trong thư viện" },
  "info.svg": { cat: "status-feedback", name: "status-info", label: "Thông tin chỉ dẫn", desc: "Ghi chú và thông tin hướng dẫn khách hàng" },
  "italic.svg": { cat: "shared", name: "editor-italic", label: "Chữ in nghiêng (I)", desc: "Định dạng chữ in nghiêng trong CMS" },
  "key.svg": { cat: "shared", name: "system-auth-key", label: "Mã khóa bảo mật", desc: "Mã xác thực bảo mật và phân quyền" },
  "layers.svg": { cat: "shared", name: "ui-layers-stack", label: "Phân tầng chuyên khoa", desc: "Các tầng dịch vụ và hệ sinh thái" },
  "layout-dashboard.svg": { cat: "shared", name: "system-dashboard", label: "Bảng điều khiển CMS", desc: "Tổng quan bảng quản trị hệ thống LBC" },
  "layout.svg": { cat: "shared", name: "ui-layout-template", label: "Giao diện trang mẫu", desc: "Bố cục giao diện trang chủ" },
  "link.svg": { cat: "ui-navigation", name: "navigation-link", label: "Đường dẫn liên kết", desc: "Sao chép hoặc chèn liên kết URL" },
  "list-ordered.svg": { cat: "shared", name: "editor-list-ordered", label: "Danh sách đánh số", desc: "Danh sách các bước có thứ tự" },
  "list.svg": { cat: "shared", name: "editor-list-bullet", label: "Danh sách gạch đầu dòng", desc: "Danh sách không theo thứ tự" },
  "lock.svg": { cat: "shared", name: "system-security-lock", label: "Khóa bảo mật an toàn", desc: "Bảo mật tài khoản và chứng chỉ SSL" },
  "log-in.svg": { cat: "ui-navigation", name: "navigation-auth-login", label: "Đăng nhập quản trị", desc: "Truy cập cổng quản trị CMS" },
  "logo-emblem-medical-lotus.svg": { cat: "brand", name: "brand-emblem-lotus", label: "Biểu tượng Hoa Sen Y Khoa", desc: "Monogram hoa sen y khoa LBC" },
  "logo-lbc-color.svg": { cat: "brand", name: "brand-logo-color", label: "Logo LBC bản chuẩn", desc: "Logo chính thức màu chuẩn của LBC" },
  "logo-lbc-white.svg": { cat: "brand", name: "brand-logo-white", label: "Logo LBC bản trắng", desc: "Logo âm bản cho Header/Footer nền tối" },
  "mail.svg": { cat: "ui-navigation", name: "navigation-mail", label: "Hòm thư Email", desc: "Địa chỉ liên hệ hỗ trợ chính thức" },
  "map-pin.svg": { cat: "ui-navigation", name: "navigation-location-pin", label: "Vị trí cơ sở phòng khám", desc: "Địa chỉ cơ sở 1 và cơ sở 2 Cần Thơ" },
  "maximize2.svg": { cat: "shared", name: "ui-fullscreen-maximize", label: "Phóng to toàn màn hình", desc: "Xem ảnh trước sau toàn màn hình" },
  "megaphone.svg": { cat: "shared", name: "ui-announcement-megaphone", label: "Thông báo nổi bật", desc: "Banner thông báo chương trình ưu đãi" },
  "menu.svg": { cat: "ui-navigation", name: "navigation-menu", label: "Thanh điều hướng Menu", desc: "Nút mở thanh điều hướng mobile" },
  "message-circle.svg": { cat: "ui-navigation", name: "navigation-chat-bubble", label: "Hộp thoại chat tư vấn", desc: "Biểu tượng trò chuyện trực tuyến" },
  "messenger.svg": { cat: "brand", name: "brand-messenger", label: "Facebook Messenger", desc: "Kênh chat tư vấn qua Messenger" },
  "microscope.svg": { cat: "laboratory", name: "laboratory-microscope", label: "Kính hiển vi soi tươi", desc: "Thiết bị soi da vi sinh và Demodex" },
  "monitor.svg": { cat: "shared", name: "ui-desktop-monitor", label: "Chế độ xem máy tính", desc: "Xem trước giao diện trên máy tính" },
  "move-up.svg": { cat: "ui-navigation", name: "navigation-move-up", label: "Nút cuộn di chuyển lên", desc: "Di chuyển vị trí lên trên" },
  "navigation.svg": { cat: "ui-navigation", name: "navigation-direction-arrow", label: "Mũi tên chỉ đường", desc: "Chỉ đường đến cơ sở phòng khám" },
  "package.svg": { cat: "pharmacy-products", name: "pharmacy-combo-package", label: "Combo liệu trình trọn gói", desc: "Bộ sản phẩm đóng gói chăm sóc da" },
  "palette.svg": { cat: "shared", name: "system-theme-palette", label: "Bảng màu thương hiệu", desc: "Tùy biến mã màu Teal #0E7C86 trên CMS" },
  "panels-top-left.svg": { cat: "shared", name: "ui-panels-sidebar", label: "Bảng điều hướng con", desc: "Khung điều hướng bên hông CMS" },
  "pause.svg": { cat: "shared", name: "media-player-pause", label: "Tạm dừng video", desc: "Nút tạm dừng phát video" },
  "phone-call.svg": { cat: "ui-navigation", name: "navigation-phone-call", label: "Yêu cầu gọi lại", desc: "Để lại số điện thoại để bác sĩ gọi lại" },
  "phone.svg": { cat: "ui-navigation", name: "navigation-hotline-phone", label: "Hotline 1900 6750", desc: "Điện thoại tư vấn trực tiếp 24/7" },
  "pill.svg": { cat: "pharmacy-products", name: "pharmacy-medicine", label: "Thuốc y tế chuẩn GPP", desc: "Viên thuốc điều trị da liễu kê đơn" },
  "play.svg": { cat: "shared", name: "media-player-play", label: "Phát video", desc: "Nút phát video hướng dẫn điều trị" },
  "plus-circle.svg": { cat: "shared", name: "ui-add-circle", label: "Thêm mới dạng nút tròn", desc: "Nút tạo mới mục trong danh sách" },
  "plus.svg": { cat: "shared", name: "ui-add-item", label: "Thêm mới mục", desc: "Nút thêm dịch vụ hoặc banner mới" },
  "quote.svg": { cat: "shared", name: "editor-quote", label: "Trích dẫn y khoa", desc: "Khối trích dẫn lời khuyên của bác sĩ" },
  "refresh-cw.svg": { cat: "status-feedback", name: "status-refresh-loading", label: "Đang làm mới dữ liệu", desc: "Biểu tượng đồng bộ và tải lại" },
  "rotate-ccw.svg": { cat: "shared", name: "ui-undo-rotate", label: "Khôi phục mặc định", desc: "Nút hoàn tác thiết lập ban đầu" },
  "ruler.svg": { cat: "shared", name: "ui-dimension-ruler", label: "Kích thước căn chỉnh", desc: "Thước đo tỷ lệ banner và khoảng cách" },
  "save.svg": { cat: "shared", name: "system-save", label: "Lưu thay đổi", desc: "Nút lưu thiết lập xuống cơ sở dữ liệu" },
  "scale.svg": { cat: "medical-clinic", name: "medical-clinical-scale", label: "Cân bằng điều trị & Pháp lý", desc: "Biểu tượng tính minh bạch và y đức" },
  "scissors.svg": { cat: "shared", name: "ui-scissors-trim", label: "Cắt chỉnh ảnh", desc: "Công cụ cắt ghép ảnh trước sau" },
  "search.svg": { cat: "ui-navigation", name: "navigation-search", label: "Kính lúp tìm kiếm", desc: "Tìm kiếm dịch vụ, bác sĩ, mỹ phẩm" },
  "send.svg": { cat: "ui-navigation", name: "navigation-send-message", label: "Gửi thông tin liên hệ", desc: "Nút gửi biểu mẫu đăng ký khám" },
  "server.svg": { cat: "shared", name: "system-server-node", label: "Máy chủ lưu trữ", desc: "Trạng thái vận hành máy chủ" },
  "settings.svg": { cat: "shared", name: "shared-settings", label: "Cài đặt hệ thống", desc: "Bánh răng cấu hình trang web CMS" },
  "settings2.svg": { cat: "shared", name: "shared-settings-advanced", label: "Cài đặt nâng cao", desc: "Tùy biến tham số chuyên sâu" },
  "share.svg": { cat: "ui-navigation", name: "navigation-share-alt", label: "Chia sẻ bài viết", desc: "Nút chia sẻ nhanh nội dung" },
  "share2.svg": { cat: "ui-navigation", name: "navigation-share", label: "Chia sẻ liên kết mạng", desc: "Chia sẻ phác đồ điều trị" },
  "shield-alert.svg": { cat: "dermatology-services", name: "dermatology-acne-care", label: "Đặc trị mụn kháng trị", desc: "Phác đồ điều trị mụn viêm, mụn ẩn chuyên sâu" },
  "shield-check.svg": { cat: "medical-clinic", name: "medical-safety-shield", label: "Khiên an toàn chuẩn y khoa", desc: "Cam kết vô trùng và an toàn tuyệt đối" },
  "shield.svg": { cat: "shared", name: "ui-security-shield", label: "Khiên bảo vệ thông tin", desc: "Chính sách bảo mật thông tin bệnh nhân" },
  "shopee.svg": { cat: "brand", name: "brand-shopee", label: "Shopee Mall chính hãng", desc: "Gian hàng dược mỹ phẩm Shopee Mall" },
  "shopping-bag.svg": { cat: "pharmacy-products", name: "pharmacy-shopping-bag", label: "Giỏ hàng dược mỹ phẩm", desc: "Túi mua sắm sản phẩm chăm sóc da" },
  "sliders.svg": { cat: "shared", name: "system-sliders-controls", label: "Thanh trượt điều khiển", desc: "Căn chỉnh độ sáng và độ mờ banner" },
  "smartphone.svg": { cat: "shared", name: "ui-mobile-smartphone", label: "Chế độ xem điện thoại", desc: "Xem trước giao diện responsive mobile" },
  "sparkle.svg": { cat: "dermatology-services", name: "dermatology-laser-hair-removal", label: "Triệt lông Diode Laser", desc: "Công nghệ Diode Laser làm mát sapphire" },
  "sparkles.svg": { cat: "dermatology-services", name: "dermatology-skin-facial", label: "Chăm sóc da & Trẻ hóa", desc: "Phục hồi hàng rào sinh học và trẻ hóa da" },
  "star.svg": { cat: "pharmacy-products", name: "pharmacy-quality-star", label: "Đánh giá chất lượng 5 sao", desc: "Đánh giá uy tín từ khách hàng" },
  "stethoscope.svg": { cat: "medical-clinic", name: "medical-stethoscope", label: "Ống nghe y khoa bác sĩ", desc: "Thăm khám lâm sàng chuyên khoa Da liễu" },
  "sun-medium.svg": { cat: "dermatology-services", name: "dermatology-pigment-sun", label: "Trị nám & Tàn nhang", desc: "Điều trị rối loạn sắc tố và làm đều màu da" },
  "sun.svg": { cat: "shared", name: "ui-weather-sun", label: "Chống nắng & Ánh sáng", desc: "Bảo vệ quang phổ rộng chống tia UV" },
  "syringe.svg": { cat: "dermatology-services", name: "dermatology-meso-injection", label: "Thẩm mỹ nội khoa (Meso)", desc: "Tiêm vi điểm trẻ hóa da và tiêm BAP" },
  "tag.svg": { cat: "pharmacy-products", name: "pharmacy-product-tag", label: "Nhãn thương hiệu chính hãng", desc: "Phân loại thương hiệu Bioderma, Biotrade" },
  "tiktok.svg": { cat: "brand", name: "brand-tiktok", label: "Kênh TikTok LBC", desc: "Video ngắn chia sẻ kiến thức da liễu" },
  "trash2.svg": { cat: "shared", name: "shared-trash", label: "Xóa dữ liệu (Thùng rác)", desc: "Xóa mục khỏi hệ thống CMS" },
  "truck.svg": { cat: "shared", name: "ui-delivery-truck", label: "Giao hàng tận nơi", desc: "Chính sách vận chuyển dược mỹ phẩm" },
  "type.svg": { cat: "shared", name: "shared-typography", label: "Định dạng chữ", desc: "Kiểu chữ và cỡ chữ trong CMS" },
  "upload.svg": { cat: "shared", name: "shared-upload", label: "Tải tệp tin lên", desc: "Tải ảnh hoặc tài liệu lên thư viện media" },
  "user-check.svg": { cat: "doctors-team", name: "doctors-verification-check", label: "Bác sĩ đã xác minh", desc: "Hồ sơ bác sĩ đã được thẩm định chứng chỉ" },
  "user-plus.svg": { cat: "shared", name: "ui-user-register", label: "Thêm thành viên mới", desc: "Đăng ký tài khoản khách hàng / kỹ thuật viên" },
  "user.svg": { cat: "doctors-team", name: "doctors-specialist", label: "Bác sĩ chuyên khoa", desc: "Hồ sơ cá nhân bác sĩ điều trị" },
  "users.svg": { cat: "doctors-team", name: "doctors-team-users", label: "Hội đồng bác sĩ LBC", desc: "Đội ngũ chuyên gia và cố vấn chuyên môn" },
  "x.svg": { cat: "ui-navigation", name: "navigation-close-x", label: "Nút đóng cửa sổ (X)", desc: "Đóng modal popup và thông báo" },
  "youtube.svg": { cat: "brand", name: "brand-youtube", label: "Kênh YouTube chính thức", desc: "Video bài giảng và quy trình điều trị" },
  "zalo.svg": { cat: "brand", name: "brand-zalo", label: "Zalo Official Account", desc: "Tư vấn trực tiếp qua Zalo OA phòng khám" },
  "zap.svg": { cat: "dermatology-services", name: "dermatology-lifting-contour", label: "Nâng cơ RF Jovena & HIFU", desc: "Nâng cơ trẻ hóa da viền hàm công nghệ cao" }
};

// Also define the 5 specialty ecosystem icons
const SPECIALTY_ICONS = [
  { fileSource: "stethoscope.svg", cat: "specialties", name: "specialties-dermatology", label: "Khoa Da liễu", desc: "Chuyên khoa mũi nhọn chẩn đoán và điều trị bệnh lý da" },
  { fileSource: "flask-conical.svg", cat: "specialties", name: "specialties-laboratory", label: "Khoa Xét nghiệm", desc: "Khoa xét nghiệm vi sinh, soi tươi Demodex và nấm da" },
  { fileSource: "pill.svg", cat: "specialties", name: "specialties-pharmacy", label: "Nhà thuốc chuẩn GPP", desc: "Nhà thuốc chuyên khoa cung cấp thuốc da liễu chuẩn GPP" },
  { fileSource: "sparkles.svg", cat: "specialties", name: "specialties-cosmeceuticals", label: "Dược – Mỹ phẩm chính ngạch", desc: "Phân phối dược mỹ phẩm nhập khẩu chính hãng từ châu Âu" },
  { fileSource: "graduation-cap.svg", cat: "specialties", name: "specialties-academy", label: "Đào tạo nghề – LBC Academy", desc: "Học viện đào tạo kỹ thuật viên spa và chăm sóc da chuẩn y khoa" }
];

console.log('Building complete mapping for all 148 icons...');

// Load audited file usage map
let auditUsageMap = new Map();
try {
  if (fs.existsSync('scripts/audit_results.json')) {
    const rawAudit = JSON.parse(fs.readFileSync('scripts/audit_results.json', 'utf8'));
    rawAudit.icons.forEach(ic => {
      // Map file path like "src/components/home/FeaturedServicesSection.tsx" to component basename
      const compNames = (ic.filesUsed || []).map(f => {
        const bn = path.basename(f, path.extname(f));
        return bn;
      });
      auditUsageMap.set(ic.file, Array.from(new Set(compNames)));
    });
  }
} catch (e) {
  console.warn('Could not load audit_results.json:', e.message);
}

// Copy each file to target directory with standardized naming
const fullManifest = [];

Object.entries(MAPPING).forEach(([legacyFile, info]) => {
  const sourcePath = path.join(ROOT_ICONS, 'all', legacyFile);
  if (!fs.existsSync(sourcePath)) {
    console.warn('Source file not found:', sourcePath);
    return;
  }

  const svgContent = fs.readFileSync(sourcePath, 'utf8');
  const targetCategoryDir = path.join(TARGET_ASSETS, info.cat);
  if (!fs.existsSync(targetCategoryDir)) fs.mkdirSync(targetCategoryDir, { recursive: true });

  const targetPath = path.join(targetCategoryDir, `${info.name}.svg`);
  fs.writeFileSync(targetPath, svgContent, 'utf8');

  // Also maintain in flat TARGET_ASSETS/all
  const flatTarget = path.join(TARGET_ASSETS, 'all');
  if (!fs.existsSync(flatTarget)) fs.mkdirSync(flatTarget, { recursive: true });
  fs.writeFileSync(path.join(flatTarget, `${info.name}.svg`), svgContent, 'utf8');

  const componentsUsed = auditUsageMap.get(legacyFile) || ['CmsAdmin'];
  if (info.cat === 'dermatology-services' && !componentsUsed.includes('FeaturedServicesSection')) {
    componentsUsed.unshift('FeaturedServicesSection');
  }

  // Vietnamese keywords generator
  const keywordsSet = new Set([
    info.name,
    info.label.toLowerCase(),
    info.cat,
    legacyFile.replace('.svg', ''),
    ...info.label.toLowerCase().split(/\s+/).filter(w => w.length > 2)
  ]);

  fullManifest.push({
    name: info.name,
    category: info.cat,
    label: info.label,
    description: info.desc,
    file: `/assets/icons/${info.cat}/${info.name}.svg`,
    usedIn: componentsUsed.length > 0 ? componentsUsed : ['CmsAdmin'],
    keywords: Array.from(keywordsSet)
  });
});

// Also write specialty icons
SPECIALTY_ICONS.forEach(s => {
  const sourcePath = path.join(ROOT_ICONS, 'all', s.fileSource);
  if (fs.existsSync(sourcePath)) {
    const svgContent = fs.readFileSync(sourcePath, 'utf8');
    const targetCategoryDir = path.join(TARGET_ASSETS, s.cat);
    if (!fs.existsSync(targetCategoryDir)) fs.mkdirSync(targetCategoryDir, { recursive: true });
    fs.writeFileSync(path.join(targetCategoryDir, `${s.name}.svg`), svgContent, 'utf8');
    fs.writeFileSync(path.join(TARGET_ASSETS, 'all', `${s.name}.svg`), svgContent, 'utf8');

    fullManifest.push({
      name: s.name,
      category: s.cat,
      label: s.label,
      description: s.desc,
      file: `/assets/icons/${s.cat}/${s.name}.svg`,
      usedIn: ['EcosystemSpecialtiesSection', 'SpecialtiesTab'],
      keywords: [s.name, s.label.toLowerCase(), s.cat, 'chuyên khoa', 'hệ sinh thái', 'lbc']
    });
  }
});

console.log(`Total icons packaged into public/assets/icons/: ${fullManifest.length}`);

// Write manifest
fs.writeFileSync('icon-manifest.json', JSON.stringify(fullManifest, null, 2), 'utf8');
fs.writeFileSync(path.join(TARGET_ASSETS, 'icon-manifest.json'), JSON.stringify(fullManifest, null, 2), 'utf8');

// Generate interactive HTML gallery preview for public/assets/icons/index.html
function generateGalleryHtml(manifest) {
  const categoryLabels = {
    all: 'Tất cả (' + manifest.length + ')',
    'dermatology-services': 'Dịch vụ Da liễu (' + manifest.filter(i => i.category === 'dermatology-services').length + ')',
    'medical-clinic': 'Y khoa & Phòng khám (' + manifest.filter(i => i.category === 'medical-clinic').length + ')',
    specialties: 'Chuyên khoa (' + manifest.filter(i => i.category === 'specialties').length + ')',
    'technology-equipment': 'Công nghệ cao (' + manifest.filter(i => i.category === 'technology-equipment').length + ')',
    laboratory: 'Xét nghiệm (' + manifest.filter(i => i.category === 'laboratory').length + ')',
    'pharmacy-products': 'Nhà thuốc & Dược mỹ phẩm (' + manifest.filter(i => i.category === 'pharmacy-products').length + ')',
    'academy-training': 'Đào tạo & Học viện (' + manifest.filter(i => i.category === 'academy-training').length + ')',
    'doctors-team': 'Đội ngũ Bác sĩ (' + manifest.filter(i => i.category === 'doctors-team').length + ')',
    'ui-navigation': 'Điều hướng & Tiện ích (' + manifest.filter(i => i.category === 'ui-navigation').length + ')',
    'status-feedback': 'Trạng thái & Phản hồi (' + manifest.filter(i => i.category === 'status-feedback').length + ')',
    payment: 'Thanh toán (' + manifest.filter(i => i.category === 'payment').length + ')',
    brand: 'Thương hiệu (' + manifest.filter(i => i.category === 'brand').length + ')',
    shared: 'Dùng chung & CMS (' + manifest.filter(i => i.category === 'shared').length + ')'
  };

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kho Thư Viện Icon Chuẩn Y Khoa Lạc's Beauty Center (LBC Assets)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=Fraunces:wght@600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #0E7C86;
      --primary-hover: #096068;
      --primary-light: #EEF7F8;
      --bg: #F8FAFC;
      --surface: #FFFFFF;
      --border: #E2E8F0;
      --text: #0F172A;
      --text-muted: #64748B;
    }
    .dark-mode {
      --primary: #14B8A6;
      --primary-hover: #2DD4BF;
      --primary-light: #134E4A;
      --bg: #0F172A;
      --surface: #1E293B;
      --border: #334155;
      --text: #F8FAFC;
      --text-muted: #94A3B8;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Be Vietnam Pro', system-ui, -apple-system, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.5;
      padding-bottom: 60px;
      transition: background-color 0.2s, color 0.2s;
    }
    .header {
      background-color: var(--surface);
      border-bottom: 1px solid var(--border);
      padding: 28px 20px;
      position: sticky;
      top: 0;
      z-index: 50;
      box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05);
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 20px;
    }
    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 20px;
    }
    .title-area h1 {
      font-family: 'Fraunces', serif;
      font-size: 24px;
      color: var(--primary);
      margin-bottom: 4px;
    }
    .title-area p {
      font-size: 13px;
      color: var(--text-muted);
    }
    .actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .btn {
      padding: 8px 16px;
      border-radius: 9999px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s;
    }
    .btn:hover {
      background: var(--primary-light);
      border-color: var(--primary);
      color: var(--primary);
    }
    .btn-primary {
      background: var(--primary);
      color: #FFFFFF;
      border-color: var(--primary);
    }
    .btn-primary:hover {
      background: var(--primary-hover);
      color: #FFFFFF;
    }
    .search-row {
      display: flex;
      gap: 12px;
      align-items: center;
      flex-wrap: wrap;
    }
    .search-input {
      flex: 1;
      min-width: 280px;
      padding: 12px 18px;
      border-radius: 14px;
      border: 1.5px solid var(--border);
      background: var(--surface);
      color: var(--text);
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .search-input:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(14, 124, 134, 0.15);
    }
    .category-tabs {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      margin-top: 14px;
    }
    .tab {
      padding: 5px 12px;
      border-radius: 9999px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text-muted);
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
    }
    .tab.active, .tab:hover {
      background: var(--primary);
      color: #FFFFFF;
      border-color: var(--primary);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 16px;
      margin-top: 24px;
    }
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 18px 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
      position: relative;
    }
    .card:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.08);
      border-color: var(--primary);
    }
    .icon-box {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: var(--primary-light);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;
      color: var(--primary);
      transition: transform 0.2s;
    }
    .card:hover .icon-box {
      transform: scale(1.1);
    }
    .icon-box svg {
      width: 26px;
      height: 26px;
    }
    .icon-box.brand-box {
      width: 64px;
      height: 52px;
      background: transparent;
    }
    .icon-box.brand-box svg {
      width: 100%;
      height: 100%;
      max-height: 48px;
    }
    .badge-cat {
      font-size: 9px;
      padding: 2px 8px;
      border-radius: 999px;
      background: rgba(14, 124, 134, 0.1);
      color: var(--primary);
      font-weight: 700;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .icon-name {
      font-weight: 700;
      font-size: 13px;
      margin-bottom: 3px;
      word-break: break-all;
    }
    .icon-title {
      font-size: 11px;
      color: var(--text-muted);
      margin-bottom: 8px;
      min-height: 32px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .btn-group {
      display: flex;
      gap: 6px;
      width: 100%;
    }
    .btn-action {
      flex: 1;
      padding: 6px 10px;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
    }
    .btn-action:hover {
      background: var(--primary);
      color: #FFFFFF;
      border-color: var(--primary);
    }
    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #0F172A;
      color: #FFFFFF;
      padding: 12px 20px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 600;
      box-shadow: 0 10px 30px rgba(0,0,0,0.25);
      z-index: 100;
      display: none;
      align-items: center;
      gap: 8px;
      animation: slideIn 0.3s ease;
    }
    @keyframes slideIn {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .stats-bar {
      display: flex;
      gap: 20px;
      align-items: center;
      font-size: 13px;
      color: var(--text-muted);
      margin-top: 14px;
      padding: 12px 16px;
      background: var(--surface);
      border-radius: 12px;
      border: 1px solid var(--border);
      flex-wrap: wrap;
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="container">
      <div class="header-top">
        <div class="title-area">
          <h1>Kho Thư Viện Icon Chuẩn Y Khoa Lạc's Beauty Center</h1>
          <p>Tổ chức theo 12 nhóm lĩnh vực chuyên môn LBC • Chuẩn Vector SVG • Naming [linh-vuc]-[chuc-nang].svg</p>
        </div>
        <div class="actions">
          <button class="btn" id="themeToggle" onclick="toggleTheme()">🌓 Đổi nền Sáng/Tối</button>
          <a class="btn btn-primary" href="./lbc_icons_all.zip" download="lbc_icons_all.zip" id="btnDownloadAll">📦 Tải Trọn Bộ ZIP (${manifest.length} Icons)</a>
        </div>
      </div>

      <div class="search-row">
        <input type="text" id="searchInput" class="search-input" placeholder="Tìm kiếm icon (VD: mụn, sẹo, nám, rụng tóc, nâng cơ, bác sĩ, thuốc, kính hiển vi, lịch hẹn, hotline)..." oninput="handleSearch()">
      </div>

      <div class="category-tabs" id="categoryTabs">
        ${Object.entries(categoryLabels).map(([key, label], idx) => `
          <button class="tab ${idx === 0 ? 'active' : ''}" data-cat="${key}" onclick="filterCategory('${key}', this)">${label}</button>
        `).join('')}
      </div>
    </div>
  </header>

  <main class="container">
    <div class="stats-bar">
      <span>Đang hiển thị: <strong id="visibleCount">${manifest.length}</strong> / ${manifest.length} icons</span>
      <span>• Định dạng: <strong>Vector SVG chuẩn y khoa</strong> (viewBox="0 0 24 24", currentColor)</span>
      <span>• Thư mục hệ thống: <code>public/assets/icons/[linh-vuc]/</code></span>
    </div>

    <div class="grid" id="iconGrid">
      ${manifest.map(item => {
        let svgContent = '';
        try {
          const filePath = path.join(TARGET_ASSETS, item.category, item.name + '.svg');
          if (fs.existsSync(filePath)) {
            svgContent = fs.readFileSync(filePath, 'utf8');
          }
        } catch (e) {}

        return `
        <div class="card" data-name="${item.name.toLowerCase()}" data-label="${(item.label || '').toLowerCase()}" data-desc="${(item.description || '').toLowerCase()}" data-cat="${item.category}" data-keywords="${(item.keywords || []).join(' ').toLowerCase()}">
          <div class="icon-box ${item.category === 'brand' ? 'brand-box' : ''}">
            ${svgContent}
          </div>
          <div class="badge-cat">${item.category}</div>
          <div class="icon-name">${item.name}.svg</div>
          <div class="icon-title" title="${item.description}">${item.label}</div>
          <div class="btn-group">
            <button class="btn-action" onclick="copySvgCode(this, '${item.name}')">Sao chép SVG</button>
            <a class="btn-action" href="./${item.category}/${item.name}.svg" download="${item.name}.svg" style="text-decoration:none;display:flex;align-items:center;justify-content:center;">Tải file</a>
          </div>
        </div>`;
      }).join('')}
    </div>
  </main>

  <div class="toast" id="toast">
    <span>✓</span>
    <span id="toastText">Đã sao chép mã SVG vào bộ nhớ tạm!</span>
  </div>

  <script>
    let currentCategory = 'all';

    function toggleTheme() {
      document.body.classList.toggle('dark-mode');
    }

    function filterCategory(cat, btn) {
      currentCategory = cat;
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    }

    function handleSearch() {
      applyFilters();
    }

    function applyFilters() {
      const q = document.getElementById('searchInput').value.trim().toLowerCase();
      const cards = document.querySelectorAll('.card');
      let count = 0;

      cards.forEach(card => {
        const cat = card.getAttribute('data-cat');
        const name = card.getAttribute('data-name');
        const label = card.getAttribute('data-label');
        const desc = card.getAttribute('data-desc');
        const keywords = card.getAttribute('data-keywords');

        const matchCat = currentCategory === 'all' || cat === currentCategory;
        const matchQuery = !q || name.includes(q) || label.includes(q) || desc.includes(q) || keywords.includes(q);

        if (matchCat && matchQuery) {
          card.style.display = 'flex';
          count++;
        } else {
          card.style.display = 'none';
        }
      });

      document.getElementById('visibleCount').innerText = count;
    }

    function copySvgCode(btn, name) {
      try {
        const card = btn.closest('.card');
        const svgEl = card.querySelector('.icon-box svg');
        if (!svgEl) throw new Error('Không tìm thấy SVG');
        const svgText = new XMLSerializer().serializeToString(svgEl);
        
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(svgText).then(() => {
            showToast('Đã sao chép mã SVG: ' + name);
          }).catch(() => fallbackCopy(svgText, name));
        } else {
          fallbackCopy(svgText, name);
        }
      } catch (e) {
        showToast('Lỗi khi sao chép: ' + e.message);
      }
    }

    function fallbackCopy(text, name) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        showToast('Đã sao chép mã SVG: ' + name);
      } catch (err) {
        showToast('Không thể sao chép');
      }
      document.body.removeChild(ta);
    }

    function showToast(msg) {
      const t = document.getElementById('toast');
      document.getElementById('toastText').innerText = msg;
      t.style.display = 'flex';
      setTimeout(() => {
        t.style.display = 'none';
      }, 2500);
    }
  </script>
</body>
</html>`;
}

const galleryHtmlContent = generateGalleryHtml(fullManifest);
fs.writeFileSync(path.join(TARGET_ASSETS, 'index.html'), galleryHtmlContent, 'utf8');
fs.writeFileSync(path.join(TARGET_ASSETS, 'preview.html'), galleryHtmlContent, 'utf8');
fs.writeFileSync(path.join(ROOT_ICONS, 'index.html'), galleryHtmlContent, 'utf8');
fs.writeFileSync(path.join(PUBLIC_ICONS, 'index.html'), galleryHtmlContent, 'utf8');

console.log('Manifest and HTML gallery generated successfully.');
