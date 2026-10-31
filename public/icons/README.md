# THƯ VIỆN TOÀN BỘ ICON TRÊN WEBSITE LẠC'S BEAUTY CENTER (LBC)

Tài liệu tổng hợp và lưu trữ toàn bộ **148 Icons** định dạng Vector SVG chuẩn, bao gồm logo thương hiệu, mạng xã hội, y khoa chuyên khoa, dịch vụ thẩm mỹ, dược mỹ phẩm, điều hướng giao diện và hệ thống quản trị CMS.

## 📂 CẤU TRÚC THƯ MỤC LƯU TRỮ

Bạn có thể truy cập toàn bộ icon ngay tại thư mục:
- Thư mục trên máy: `d:\Demo_LBC\icons\`
- Hoặc thư mục web: `d:\Demo_LBC\public\icons\` (xem trực tiếp trên trình duyệt tại `http://localhost:3000/icons/index.html`)

```text
icons/
├── index.html                  # Giao diện tra cứu trực quan, bấm để copy mã SVG hoặc tải về
├── manifest.json               # Dữ liệu JSON mô tả chi tiết 148 icon
├── all/                        # Thư mục phẳng chứa toàn bộ 148 file .svg để kéo thả nhanh
├── brand/                      # Logo LBC (Color, White, Emblem) và Mạng xã hội (Facebook, YouTube, Zalo, TikTok, Shopee, Messenger)
├── medical-clinical/           # Icon Y khoa & Chuyên khoa: Ống nghe, Kính hiển vi, Bình thí nghiệm, Viên thuốc, Khiên an toàn, v.v.
├── services-aesthetics/        # Icon Dịch vụ & Thẩm mỹ: Nâng cơ RF/HIFU (Zap), Lấp lánh (Sparkles), Trị nám (SunMedium), v.v.
├── products-commerce/          # Icon Sản phẩm & Bán hàng: Túi mua sắm, Giọt tinh chất serum, Hộp sản phẩm, Giá tiền, v.v.
├── ui-navigation/              # Icon Giao diện: Hotline Phone, Giờ mở cửa Clock, Địa chỉ MapPin, Lịch hẹn Calendar, v.v.
└── admin-system/               # Icon Quản trị: Settings, Edit, Trash2, Database, Upload, v.v.
```

## 📋 DANH SÁCH CHI TIẾT TỪNG ICON

| STT | Tên Icon | Danh mục | Tên file SVG | Ý nghĩa / Ứng dụng trên Website | Nơi sử dụng |
|:---:|:---|:---|:---|:---|:---|
| **1** | **Logo-LBC-Color** | brand | `logo-lbc-color.svg` | Logo Lạc's Beauty Center (Bản chuẩn) - Logo chính thức có chữ và biểu tượng hoa sen y khoa | `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx` (+1 nơi) |
| **2** | **Logo-LBC-White** | brand | `logo-lbc-white.svg` | Logo Lạc's Beauty Center (Bản trắng âm bản) - Logo phiên bản nền tối cho Header/Footer | `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx` (+1 nơi) |
| **3** | **Logo-Emblem-Medical-Lotus** | brand | `logo-emblem-medical-lotus.svg` | Biểu tượng Hoa Sen Y Khoa LBC (Monogram) - Biểu tượng chữ L cách điệu chữ thập y khoa và búp sen | `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx` (+1 nơi) |
| **4** | **Fallback-Clinic** | brand | `fallback-clinic.svg` | Hình ảnh đại diện Phòng khám (Fallback Graphic) - Hình minh họa đồ họa cơ sở phòng khám | `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx` (+1 nơi) |
| **5** | **Facebook** | brand | `facebook.svg` | Facebook Fanpage Icon - Biểu tượng Fanpage Facebook Lạc's Beauty Center | `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx` (+1 nơi) |
| **6** | **YouTube** | brand | `youtube.svg` | YouTube Channel Icon - Biểu tượng Kênh YouTube chính thức LBC | `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx` (+1 nơi) |
| **7** | **Zalo** | brand | `zalo.svg` | Zalo Official Account Icon - Biểu tượng Zalo OA Phòng khám Da liễu | `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx` (+1 nơi) |
| **8** | **TikTok** | brand | `tiktok.svg` | TikTok Channel Icon - Biểu tượng Kênh TikTok Lạc's Beauty Center | `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx` (+1 nơi) |
| **9** | **Shopee** | brand | `shopee.svg` | Shopee Mall Icon - Biểu tượng Gian hàng chính hãng Shopee Mall | `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx` (+1 nơi) |
| **10** | **Messenger** | brand | `messenger.svg` | Facebook Messenger Icon - Biểu tượng Chat Facebook Messenger phòng khám | `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx` (+1 nơi) |
| **11** | **Activity** | medical-clinical | `activity.svg` | Xung điện / Trị sẹo vi điểm - Dùng cho điều trị sẹo rỗ, phục hồi mô | `src/components/common/DynamicIcon.tsx`, `src/components/layout/MainNavigation.tsx` (+3 nơi) |
| **12** | **AlertCircle** | medical-clinical | `alert-circle.svg` | AlertCircle - Icon AlertCircle trên giao diện website Lạc's Beauty Center | `src/components/admin/IconPickerModal.tsx`, `src/components/admin/MediaLibraryModal.tsx` (+16 nơi) |
| **13** | **AlertTriangle** | medical-clinical | `alert-triangle.svg` | AlertTriangle - Icon AlertTriangle trên giao diện website Lạc's Beauty Center | `src/components/admin/ConfirmationModal.tsx`, `src/components/admin/tabs/AppearanceTab.tsx` (+9 nơi) |
| **14** | **AlignCenter** | admin-system | `align-center.svg` | AlignCenter - Icon AlignCenter trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/SpecialtiesTab.tsx` |
| **15** | **AlignJustify** | admin-system | `align-justify.svg` | AlignJustify - Icon AlignJustify trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/SpecialtiesTab.tsx` |
| **16** | **AlignLeft** | admin-system | `align-left.svg` | AlignLeft - Icon AlignLeft trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/SpecialtiesTab.tsx` |
| **17** | **ArrowDown** | ui-navigation | `arrow-down.svg` | ArrowDown - Icon ArrowDown trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/BannerTopHeaderTab.tsx`, `src/components/admin/tabs/HeroBannersTab.tsx` (+3 nơi) |
| **18** | **ArrowRight** | ui-navigation | `arrow-right.svg` | Mũi tên sang phải CTA - Dùng cho Xem chi tiết, Đặt lịch hẹn | `src/components/admin/tabs/DashboardOverviewTab.tsx`, `src/components/admin/tabs/PageBannersTab.tsx` (+37 nơi) |
| **19** | **ArrowUp** | ui-navigation | `arrow-up.svg` | Mũi tên cuộn lên đầu trang - Dùng cho Nút Back To Top | `src/components/admin/tabs/BannerTopHeaderTab.tsx`, `src/components/admin/tabs/BrandingIdentityTab.tsx` (+8 nơi) |
| **20** | **ArrowUpCircle** | ui-navigation | `arrow-up-circle.svg` | ArrowUpCircle - Icon ArrowUpCircle trên giao diện website Lạc's Beauty Center | `src/components/common/DynamicIcon.tsx`, `src/components/admin/IconPickerModal.tsx` |
| **21** | **ArrowUpRight** | ui-navigation | `arrow-up-right.svg` | ArrowUpRight - Icon ArrowUpRight trên giao diện website Lạc's Beauty Center | `src/components/common/DynamicIcon.tsx`, `src/components/home/CoreValuesSection.tsx` (+2 nơi) |
| **22** | **Award** | medical-clinical | `award.svg` | Huy hiệu chuyên môn - Dùng cho Bác sĩ trình độ Sau Đại học | `src/components/admin/tabs/DoctorsTab.tsx`, `src/components/admin/tabs/HomepageSectionsTab.tsx` (+8 nơi) |
| **23** | **Bell** | admin-system | `bell.svg` | Bell - Icon Bell trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminHeader.tsx` |
| **24** | **Bold** | admin-system | `bold.svg` | Bold - Icon Bold trên giao diện website Lạc's Beauty Center | `src/components/admin/RichTextEditor.tsx` |
| **25** | **BookOpen** | ui-navigation | `book-open.svg` | BookOpen - Icon BookOpen trên giao diện website Lạc's Beauty Center | `src/pages/NewsDetailPage.tsx`, `src/pages/NewsListPage.tsx` (+1 nơi) |
| **26** | **Box** | products-commerce | `box.svg` | Box - Icon Box trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/AppearanceTab.tsx` |
| **27** | **Briefcase** | ui-navigation | `briefcase.svg` | Briefcase - Icon Briefcase trên giao diện website Lạc's Beauty Center | `src/pages/CareersPage.tsx` |
| **28** | **Building** | ui-navigation | `building.svg` | Building - Icon Building trên giao diện website Lạc's Beauty Center | `src/pages/ContactPage.tsx` |
| **29** | **Building2** | ui-navigation | `building2.svg` | Building2 - Icon Building2 trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/ProductsTab.tsx`, `src/pages/BrandDetailPage.tsx` (+1 nơi) |
| **30** | **Calendar** | ui-navigation | `calendar.svg` | Lịch hẹn khám bệnh - Dùng cho Đặt lịch khám & Lịch bác sĩ | `src/components/admin/tabs/ArticlesTab.tsx`, `src/components/admin/tabs/BannerTopHeaderTab.tsx` (+26 nơi) |
| **31** | **CalendarCheck** | ui-navigation | `calendar-check.svg` | CalendarCheck - Icon CalendarCheck trên giao diện website Lạc's Beauty Center | `src/components/home/FeaturedServicesSection.tsx` |
| **32** | **CalendarCheck2** | ui-navigation | `calendar-check2.svg` | CalendarCheck2 - Icon CalendarCheck2 trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminSidebar.tsx`, `src/components/admin/tabs/DashboardOverviewTab.tsx` (+1 nơi) |
| **33** | **Check** | medical-clinical | `check.svg` | Check - Icon Check trên giao diện website Lạc's Beauty Center | `src/components/admin/IconPickerModal.tsx`, `src/components/admin/MediaLibraryModal.tsx` (+6 nơi) |
| **34** | **CheckCircle2** | medical-clinical | `check-circle2.svg` | CheckCircle2 - Icon CheckCircle2 trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminHeader.tsx`, `src/components/admin/IconPickerModal.tsx` (+31 nơi) |
| **35** | **ChevronDown** | ui-navigation | `chevron-down.svg` | ChevronDown - Icon ChevronDown trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminSidebar.tsx`, `src/components/admin/tabs/BannerTopHeaderTab.tsx` (+6 nơi) |
| **36** | **ChevronLeft** | ui-navigation | `chevron-left.svg` | ChevronLeft - Icon ChevronLeft trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminSidebar.tsx`, `src/components/home/HeroSliderSection.tsx` (+1 nơi) |
| **37** | **ChevronRight** | ui-navigation | `chevron-right.svg` | ChevronRight - Icon ChevronRight trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminSidebar.tsx`, `src/components/admin/tabs/AppearanceTab.tsx` (+10 nơi) |
| **38** | **ChevronUp** | ui-navigation | `chevron-up.svg` | Mũi tên nhọn hướng lên - Dùng cho Thu gọn danh mục & Back To Top | `src/components/common/DynamicIcon.tsx`, `src/components/layout/FloatingContact.tsx` (+1 nơi) |
| **39** | **ChevronsUp** | ui-navigation | `chevrons-up.svg` | ChevronsUp - Icon ChevronsUp trên giao diện website Lạc's Beauty Center | `src/components/common/DynamicIcon.tsx`, `src/components/admin/IconPickerModal.tsx` |
| **40** | **ClipboardList** | admin-system | `clipboard-list.svg` | ClipboardList - Icon ClipboardList trên giao diện website Lạc's Beauty Center | `src/components/layout/HeaderActions.tsx` |
| **41** | **Clock** | ui-navigation | `clock.svg` | Đồng hồ giờ làm việc - Dùng cho Giờ mở cửa 08:00 - 20:00 | `src/components/admin/tabs/ArticlesTab.tsx`, `src/components/admin/tabs/AuditLogTab.tsx` (+24 nơi) |
| **42** | **Code** | admin-system | `code.svg` | Code - Icon Code trên giao diện website Lạc's Beauty Center | `src/components/admin/RichTextEditor.tsx` |
| **43** | **Copy** | admin-system | `copy.svg` | Copy - Icon Copy trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/ArticlesTab.tsx`, `src/components/admin/tabs/BackupRestoreTab.tsx` (+5 nơi) |
| **44** | **Cpu** | medical-clinical | `cpu.svg` | Vi xử lý công nghệ cao - Dùng cho Giá trị cốt lõi: Tiên phong công nghệ | `src/components/admin/AdminSidebar.tsx`, `src/components/admin/tabs/DashboardOverviewTab.tsx` (+10 nơi) |
| **45** | **CreditCard** | products-commerce | `credit-card.svg` | CreditCard - Icon CreditCard trên giao diện website Lạc's Beauty Center | `src/pages/PolicyPage.tsx` |
| **46** | **Database** | admin-system | `database.svg` | Database - Icon Database trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/BackupRestoreTab.tsx` |
| **47** | **DollarSign** | products-commerce | `dollar-sign.svg` | Bảng giá niêm yết - Dùng cho Bảng giá dịch vụ, tuyển dụng | `src/components/admin/tabs/ProductsTab.tsx`, `src/components/common/DynamicIcon.tsx` (+2 nơi) |
| **48** | **Download** | admin-system | `download.svg` | Download - Icon Download trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/BackupRestoreTab.tsx`, `src/components/admin/tabs/LeadsTab.tsx` |
| **49** | **Droplet** | services-aesthetics | `droplet.svg` | Giọt tinh chất serum - Dùng cho Tinh chất đặc trị, phục hồi | `src/components/common/DynamicIcon.tsx`, `src/components/admin/IconPickerModal.tsx` |
| **50** | **Droplets** | services-aesthetics | `droplets.svg` | Giọt nước làm sạch sâu - Dùng cho Danh mục Sữa rửa mặt & Tẩy trang | `src/components/common/DynamicIcon.tsx`, `src/data/categories.ts` (+1 nơi) |
| **51** | **Edit** | admin-system | `edit.svg` | Edit - Icon Edit trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/ArticlesTab.tsx`, `src/components/admin/tabs/CaseStudiesTab.tsx` (+9 nơi) |
| **52** | **Edit3** | admin-system | `edit3.svg` | Edit3 - Icon Edit3 trên giao diện website Lạc's Beauty Center | `src/components/admin/RichTextEditor.tsx` |
| **53** | **ExternalLink** | ui-navigation | `external-link.svg` | ExternalLink - Icon ExternalLink trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminHeader.tsx`, `src/components/admin/AdminSidebar.tsx` (+18 nơi) |
| **54** | **Eye** | admin-system | `eye.svg` | Eye - Icon Eye trên giao diện website Lạc's Beauty Center | `src/components/admin/RichTextEditor.tsx`, `src/components/admin/tabs/AppearanceTab.tsx` (+7 nơi) |
| **55** | **EyeOff** | admin-system | `eye-off.svg` | EyeOff - Icon EyeOff trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/HeroBannersTab.tsx`, `src/components/admin/tabs/HomepageSectionsTab.tsx` (+1 nơi) |
| **56** | **Feather** | services-aesthetics | `feather.svg` | Lông vũ phục hồi dịu nhẹ - Dùng cho Dịch vụ Điều trị rụng tóc | `src/components/common/DynamicIcon.tsx`, `src/components/layout/MainNavigation.tsx` (+2 nơi) |
| **57** | **FileCheck** | medical-clinical | `file-check.svg` | FileCheck - Icon FileCheck trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/LegalInfoTab.tsx` |
| **58** | **FileCode** | admin-system | `file-code.svg` | FileCode - Icon FileCode trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/BackupRestoreTab.tsx` |
| **59** | **FileText** | admin-system | `file-text.svg` | FileText - Icon FileText trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminSidebar.tsx`, `src/components/admin/MediaLibraryModal.tsx` (+9 nơi) |
| **60** | **Film** | admin-system | `film.svg` | Film - Icon Film trên giao diện website Lạc's Beauty Center | `src/components/admin/MediaLibraryModal.tsx`, `src/components/admin/tabs/MediaLibraryTab.tsx` |
| **61** | **Filter** | admin-system | `filter.svg` | Filter - Icon Filter trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/AuditLogTab.tsx`, `src/components/admin/tabs/DoctorsTab.tsx` (+3 nơi) |
| **62** | **Fingerprint** | medical-clinical | `fingerprint.svg` | Vân tay cá nhân hóa - Dùng cho Y học Cá nhân hóa | `src/components/admin/tabs/HomepageSectionsTab.tsx`, `src/components/common/DynamicIcon.tsx` (+3 nơi) |
| **63** | **Flame** | services-aesthetics | `flame.svg` | Ngọn lửa sản phẩm hot - Dùng cho Dịch vụ/Sản phẩm bán chạy | `src/components/common/DynamicIcon.tsx`, `src/components/admin/IconPickerModal.tsx` |
| **64** | **FlaskConical** | medical-clinical | `flask-conical.svg` | Bình thí nghiệm hóa sinh - Dùng cho Khoa Xét nghiệm, Demodex, vi nấm | `src/components/common/DynamicIcon.tsx`, `src/components/layout/MainNavigation.tsx` (+2 nơi) |
| **65** | **FolderTree** | admin-system | `folder-tree.svg` | FolderTree - Icon FolderTree trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminSidebar.tsx`, `src/components/admin/tabs/ProductsTab.tsx` |
| **66** | **Globe** | ui-navigation | `globe.svg` | Globe - Icon Globe trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/BrandingIdentityTab.tsx`, `src/components/admin/tabs/ProductsTab.tsx` |
| **67** | **GraduationCap** | medical-clinical | `graduation-cap.svg` | Mũ học thuật / Đào tạo - Dùng cho Học viện Đào tạo LBC Academy | `src/components/admin/tabs/DoctorsTab.tsx`, `src/components/admin/tabs/HomepageSectionsTab.tsx` (+10 nơi) |
| **68** | **Grid** | admin-system | `grid.svg` | Grid - Icon Grid trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/DoctorsTab.tsx`, `src/components/admin/tabs/MediaLibraryTab.tsx` |
| **69** | **HardDrive** | admin-system | `hard-drive.svg` | HardDrive - Icon HardDrive trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminHeader.tsx`, `src/components/admin/MediaLibraryModal.tsx` (+2 nơi) |
| **70** | **HardDriveDownload** | admin-system | `hard-drive-download.svg` | HardDriveDownload - Icon HardDriveDownload trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminSidebar.tsx`, `src/components/admin/tabs/BackupRestoreTab.tsx` |
| **71** | **Heading1** | admin-system | `heading1.svg` | Heading1 - Icon Heading1 trên giao diện website Lạc's Beauty Center | `src/components/admin/RichTextEditor.tsx` |
| **72** | **Heading2** | admin-system | `heading2.svg` | Heading2 - Icon Heading2 trên giao diện website Lạc's Beauty Center | `src/components/admin/RichTextEditor.tsx` |
| **73** | **Heart** | services-aesthetics | `heart.svg` | Heart - Icon Heart trên giao diện website Lạc's Beauty Center | `src/components/layout/Footer.tsx`, `src/pages/ProductDetailPage.tsx` |
| **74** | **HeartHandshake** | medical-clinical | `heart-handshake.svg` | Trái tim tận tâm y đức - Dùng cho Sứ mệnh & Chăm sóc tận tâm | `src/components/admin/tabs/HomepageSectionsTab.tsx`, `src/components/common/DynamicIcon.tsx` (+7 nơi) |
| **75** | **HeartPulse** | medical-clinical | `heart-pulse.svg` | Nhịp tim sinh học - Dùng cho sức khỏe, phác đồ cá nhân | `src/components/common/DynamicIcon.tsx`, `src/components/admin/IconPickerModal.tsx` |
| **76** | **HelpCircle** | ui-navigation | `help-circle.svg` | HelpCircle - Icon HelpCircle trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/BannerTopHeaderTab.tsx`, `src/components/admin/tabs/ServicesTab.tsx` (+4 nơi) |
| **77** | **History** | admin-system | `history.svg` | History - Icon History trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminSidebar.tsx`, `src/components/admin/tabs/AuditLogTab.tsx` |
| **78** | **Home** | ui-navigation | `home.svg` | Home - Icon Home trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminSidebar.tsx`, `src/components/common/Breadcrumbs.tsx` (+1 nơi) |
| **79** | **Image** | admin-system | `image.svg` | Image - Icon Image trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminSidebar.tsx`, `src/components/admin/IconPickerModal.tsx` (+17 nơi) |
| **80** | **Info** | ui-navigation | `info.svg` | Info - Icon Info trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/AppearanceTab.tsx`, `src/components/admin/tabs/LegalInfoTab.tsx` (+3 nơi) |
| **81** | **Italic** | admin-system | `italic.svg` | Italic - Icon Italic trên giao diện website Lạc's Beauty Center | `src/components/admin/RichTextEditor.tsx` |
| **82** | **Key** | admin-system | `key.svg` | Key - Icon Key trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/BackupRestoreTab.tsx` |
| **83** | **Layers** | admin-system | `layers.svg` | Layers - Icon Layers trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminSidebar.tsx`, `src/components/admin/tabs/AppearanceTab.tsx` (+8 nơi) |
| **84** | **Layout** | admin-system | `layout.svg` | Layout - Icon Layout trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/BannerTopHeaderTab.tsx` |
| **85** | **LayoutDashboard** | admin-system | `layout-dashboard.svg` | LayoutDashboard - Icon LayoutDashboard trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminSidebar.tsx` |
| **86** | **Link** | ui-navigation | `link.svg` | Link - Icon Link trên giao diện website Lạc's Beauty Center | `src/components/admin/RichTextEditor.tsx`, `src/components/admin/tabs/HomepageSectionsTab.tsx` (+1 nơi) |
| **87** | **List** | admin-system | `list.svg` | List - Icon List trên giao diện website Lạc's Beauty Center | `src/components/admin/RichTextEditor.tsx`, `src/components/admin/tabs/DoctorsTab.tsx` (+2 nơi) |
| **88** | **ListOrdered** | admin-system | `list-ordered.svg` | ListOrdered - Icon ListOrdered trên giao diện website Lạc's Beauty Center | `src/components/admin/RichTextEditor.tsx` |
| **89** | **Lock** | admin-system | `lock.svg` | Lock - Icon Lock trên giao diện website Lạc's Beauty Center | `src/pages/PolicyPage.tsx` |
| **90** | **LogIn** | ui-navigation | `log-in.svg` | LogIn - Icon LogIn trên giao diện website Lạc's Beauty Center | `src/components/layout/HeaderActions.tsx` |
| **91** | **Mail** | ui-navigation | `mail.svg` | Mail - Icon Mail trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/BrandingIdentityTab.tsx`, `src/components/admin/tabs/LeadsTab.tsx` (+3 nơi) |
| **92** | **MapPin** | ui-navigation | `map-pin.svg` | Địa điểm cơ sở phòng khám - Dùng cho Cơ sở 1 và Cơ sở 2 | `src/components/admin/AdminSidebar.tsx`, `src/components/admin/tabs/BannerTopHeaderTab.tsx` (+13 nơi) |
| **93** | **Maximize2** | admin-system | `maximize2.svg` | Maximize2 - Icon Maximize2 trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminSidebar.tsx`, `src/components/admin/tabs/AppearanceTab.tsx` |
| **94** | **Megaphone** | admin-system | `megaphone.svg` | Megaphone - Icon Megaphone trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/BannerTopHeaderTab.tsx` |
| **95** | **Menu** | ui-navigation | `menu.svg` | Thanh điều hướng Menu - Dùng cho Menu mobile | `src/components/admin/AdminHeader.tsx`, `src/components/admin/AdminSidebar.tsx` (+4 nơi) |
| **96** | **MessageCircle** | ui-navigation | `message-circle.svg` | MessageCircle - Icon MessageCircle trên giao diện website Lạc's Beauty Center | `src/components/layout/FloatingContact.tsx`, `src/pages/FAQPage.tsx` |
| **97** | **Microscope** | medical-clinical | `microscope.svg` | Kính hiển vi soi tươi - Dùng cho dịch vụ soi da, vi sinh | `src/components/common/DynamicIcon.tsx`, `src/components/layout/MainNavigation.tsx` (+2 nơi) |
| **98** | **Monitor** | admin-system | `monitor.svg` | Monitor - Icon Monitor trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/BannerTopHeaderTab.tsx`, `src/components/admin/tabs/HeroBannersTab.tsx` |
| **99** | **MoveUp** | ui-navigation | `move-up.svg` | MoveUp - Icon MoveUp trên giao diện website Lạc's Beauty Center | `src/components/common/DynamicIcon.tsx`, `src/components/admin/IconPickerModal.tsx` |
| **100** | **Navigation** | ui-navigation | `navigation.svg` | Navigation - Icon Navigation trên giao diện website Lạc's Beauty Center | `src/pages/FacilitiesPage.tsx` |
| **101** | **Package** | products-commerce | `package.svg` | Hộp sản phẩm đóng gói - Dùng cho Bộ sản phẩm combo điều trị | `src/components/admin/tabs/ProductsTab.tsx`, `src/components/common/DynamicIcon.tsx` (+1 nơi) |
| **102** | **Palette** | admin-system | `palette.svg` | Palette - Icon Palette trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminSidebar.tsx`, `src/components/admin/tabs/AppearanceTab.tsx` (+3 nơi) |
| **103** | **PanelsTopLeft** | admin-system | `panels-top-left.svg` | PanelsTopLeft - Icon PanelsTopLeft trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminSidebar.tsx`, `src/components/admin/tabs/BannerTopHeaderTab.tsx` (+1 nơi) |
| **104** | **Pause** | services-aesthetics | `pause.svg` | Pause - Icon Pause trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/HeroBannersTab.tsx` |
| **105** | **Phone** | ui-navigation | `phone.svg` | Điện thoại Hotline - Dùng cho Hotline 1900 6750 | `src/components/admin/tabs/BannerTopHeaderTab.tsx`, `src/components/admin/tabs/BrandingIdentityTab.tsx` (+16 nơi) |
| **106** | **PhoneCall** | ui-navigation | `phone-call.svg` | PhoneCall - Icon PhoneCall trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminSidebar.tsx` |
| **107** | **Pill** | medical-clinical | `pill.svg` | Viên thuốc y tế chuẩn GPP - Dùng cho Nhà thuốc chuẩn GPP | `src/components/common/DynamicIcon.tsx`, `src/components/layout/MainNavigation.tsx` (+2 nơi) |
| **108** | **Play** | services-aesthetics | `play.svg` | Play - Icon Play trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/HeroBannersTab.tsx` |
| **109** | **Plus** | admin-system | `plus.svg` | Plus - Icon Plus trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminHeader.tsx`, `src/components/admin/tabs/ArticlesTab.tsx` (+12 nơi) |
| **110** | **PlusCircle** | admin-system | `plus-circle.svg` | PlusCircle - Icon PlusCircle trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/DashboardOverviewTab.tsx` |
| **111** | **Quote** | admin-system | `quote.svg` | Quote - Icon Quote trên giao diện website Lạc's Beauty Center | `src/components/admin/RichTextEditor.tsx` |
| **112** | **RefreshCw** | admin-system | `refresh-cw.svg` | RefreshCw - Icon RefreshCw trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminHeader.tsx`, `src/components/admin/MediaLibraryModal.tsx` (+3 nơi) |
| **113** | **RotateCcw** | products-commerce | `rotate-ccw.svg` | RotateCcw - Icon RotateCcw trên giao diện website Lạc's Beauty Center | `src/components/admin/ConfirmationModal.tsx`, `src/components/admin/tabs/AppearanceTab.tsx` (+9 nơi) |
| **114** | **Ruler** | admin-system | `ruler.svg` | Ruler - Icon Ruler trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminSidebar.tsx` |
| **115** | **Save** | admin-system | `save.svg` | Save - Icon Save trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/AppearanceTab.tsx`, `src/components/admin/tabs/BannerTopHeaderTab.tsx` (+4 nơi) |
| **116** | **Scale** | medical-clinical | `scale.svg` | Scale - Icon Scale trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminSidebar.tsx`, `src/components/admin/tabs/LegalInfoTab.tsx` |
| **117** | **Scissors** | services-aesthetics | `scissors.svg` | Scissors - Icon Scissors trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminSidebar.tsx`, `src/components/admin/tabs/DashboardOverviewTab.tsx` (+1 nơi) |
| **118** | **Search** | ui-navigation | `search.svg` | Kính lúp tìm kiếm - Dùng cho Tìm kiếm dịch vụ, bác sĩ, sản phẩm | `src/components/admin/AdminHeader.tsx`, `src/components/admin/AdminSidebar.tsx` (+21 nơi) |
| **119** | **Send** | admin-system | `send.svg` | Send - Icon Send trên giao diện website Lạc's Beauty Center | `src/pages/ContactPage.tsx` |
| **120** | **Server** | admin-system | `server.svg` | Server - Icon Server trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/BackupRestoreTab.tsx` |
| **121** | **Settings** | admin-system | `settings.svg` | Bánh răng cài đặt - Dùng cho Quản trị CMS LBC Admin | `src/components/common/DynamicIcon.tsx`, `src/components/layout/HeaderActions.tsx` (+2 nơi) |
| **122** | **Settings2** | admin-system | `settings2.svg` | Settings2 - Icon Settings2 trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/SpecialtiesTab.tsx` |
| **123** | **Share** | ui-navigation | `share.svg` | Share - Icon Share trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/BrandingIdentityTab.tsx` |
| **124** | **Share2** | ui-navigation | `share2.svg` | Share2 - Icon Share2 trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/BrandingIdentityTab.tsx`, `src/pages/NewsDetailPage.tsx` (+1 nơi) |
| **125** | **Shield** | medical-clinical | `shield.svg` | Khiên an toàn y tế - Dùng cho Minh bạch công nghệ & pháp lý | `src/components/admin/tabs/HomepageSectionsTab.tsx`, `src/components/common/DynamicIcon.tsx` (+2 nơi) |
| **126** | **ShieldAlert** | medical-clinical | `shield-alert.svg` | Khiên cảnh báo đặc trị mụn - Dùng cho Dịch vụ Trị mụn kháng trị | `src/components/admin/tabs/LegalInfoTab.tsx`, `src/components/common/DynamicIcon.tsx` (+6 nơi) |
| **127** | **ShieldCheck** | medical-clinical | `shield-check.svg` | Khiên bảo chứng chuẩn y khoa - Dùng cho Cam kết chính hãng, vô trùng | `src/components/admin/tabs/AppearanceTab.tsx`, `src/components/admin/tabs/BackupRestoreTab.tsx` (+27 nơi) |
| **128** | **ShoppingBag** | products-commerce | `shopping-bag.svg` | Túi mua sắm dược mỹ phẩm - Dùng cho Giỏ hàng & Danh mục sản phẩm | `src/components/admin/AdminSidebar.tsx`, `src/components/admin/tabs/BannerTopHeaderTab.tsx` (+11 nơi) |
| **129** | **Sliders** | admin-system | `sliders.svg` | Sliders - Icon Sliders trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminSidebar.tsx`, `src/components/admin/tabs/AppearanceTab.tsx` (+6 nơi) |
| **130** | **Smartphone** | admin-system | `smartphone.svg` | Smartphone - Icon Smartphone trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/BannerTopHeaderTab.tsx`, `src/components/admin/tabs/HeroBannersTab.tsx` |
| **131** | **Sparkle** | services-aesthetics | `sparkle.svg` | Tia sáng laser thẩm mỹ - Dùng cho Triệt lông, laser quang học | `src/components/common/DynamicIcon.tsx`, `src/components/layout/MainNavigation.tsx` (+2 nơi) |
| **132** | **Sparkles** | services-aesthetics | `sparkles.svg` | Lấp lánh trẻ hóa da - Dùng cho Dược mỹ phẩm, trẻ hóa làn da | `src/components/admin/AdminSidebar.tsx`, `src/components/admin/IconPickerModal.tsx` (+29 nơi) |
| **133** | **Star** | products-commerce | `star.svg` | Ngôi sao đánh giá 5 sao - Dùng cho Đánh giá chất lượng, hiệu quả | `src/components/admin/tabs/ArticlesTab.tsx`, `src/components/admin/tabs/ProductsTab.tsx` (+2 nơi) |
| **134** | **Stethoscope** | medical-clinical | `stethoscope.svg` | Ống nghe y khoa chuyên khoa - Dùng cho Khoa Da liễu, hồ sơ Bác sĩ | `src/components/admin/AdminSidebar.tsx`, `src/components/admin/tabs/HomepageSectionsTab.tsx` (+13 nơi) |
| **135** | **Sun** | services-aesthetics | `sun.svg` | Ánh nắng mặt trời - Dùng cho Chống nắng, làm sáng da | `src/components/common/DynamicIcon.tsx`, `src/components/admin/IconPickerModal.tsx` |
| **136** | **SunMedium** | services-aesthetics | `sun-medium.svg` | Mặt trời sắc tố & trị nám - Dùng cho Dịch vụ Trị rối loạn sắc tố | `src/components/common/DynamicIcon.tsx`, `src/components/layout/MainNavigation.tsx` (+3 nơi) |
| **137** | **Syringe** | medical-clinical | `syringe.svg` | Kim tiêm vi điểm y khoa - Dùng cho Tiêm vi điểm, Meso, Thẩm mỹ nội khoa | `src/components/common/DynamicIcon.tsx`, `src/components/layout/MainNavigation.tsx` (+2 nơi) |
| **138** | **Tag** | products-commerce | `tag.svg` | Nhãn thương hiệu chính ngạch - Dùng cho Phân loại thương hiệu | `src/components/admin/AdminSidebar.tsx`, `src/components/admin/tabs/HomepageSectionsTab.tsx` (+4 nơi) |
| **139** | **Trash2** | admin-system | `trash2.svg` | Trash2 - Icon Trash2 trên giao diện website Lạc's Beauty Center | `src/components/admin/ConfirmationModal.tsx`, `src/components/admin/MediaLibraryModal.tsx` (+18 nơi) |
| **140** | **Truck** | products-commerce | `truck.svg` | Truck - Icon Truck trên giao diện website Lạc's Beauty Center | `src/components/home/CustomerUtilitiesSection.tsx`, `src/pages/PolicyPage.tsx` (+1 nơi) |
| **141** | **Type** | admin-system | `type.svg` | Type - Icon Type trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminSidebar.tsx`, `src/components/admin/tabs/AppearanceTab.tsx` (+1 nơi) |
| **142** | **Upload** | admin-system | `upload.svg` | Upload - Icon Upload trên giao diện website Lạc's Beauty Center | `src/components/admin/IconPickerModal.tsx`, `src/components/admin/MediaLibraryModal.tsx` (+5 nơi) |
| **143** | **User** | ui-navigation | `user.svg` | User - Icon User trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/ArticlesTab.tsx`, `src/components/admin/tabs/AuditLogTab.tsx` (+8 nơi) |
| **144** | **UserCheck** | ui-navigation | `user-check.svg` | UserCheck - Icon UserCheck trên giao diện website Lạc's Beauty Center | `src/components/admin/tabs/ServicesTab.tsx`, `src/pages/LicensesPage.tsx` (+3 nơi) |
| **145** | **UserPlus** | ui-navigation | `user-plus.svg` | UserPlus - Icon UserPlus trên giao diện website Lạc's Beauty Center | `src/components/layout/HeaderActions.tsx` |
| **146** | **Users** | ui-navigation | `users.svg` | Users - Icon Users trên giao diện website Lạc's Beauty Center | `src/components/admin/AdminSidebar.tsx`, `src/components/admin/tabs/DashboardOverviewTab.tsx` (+1 nơi) |
| **147** | **X** | ui-navigation | `x.svg` | Đóng / Tắt cửa sổ - Dùng cho Đóng popup, đóng modal | `src/components/admin/AdminSidebar.tsx`, `src/components/admin/ConfirmationModal.tsx` (+9 nơi) |
| **148** | **Zap** | services-aesthetics | `zap.svg` | Năng lượng nâng cơ cao cấp - Dùng cho Nâng cơ RF Jovena, HIFU | `src/components/common/DynamicIcon.tsx`, `src/components/layout/MainNavigation.tsx` (+2 nơi) |
