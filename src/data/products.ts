export interface ProductItem {
  id: string;
  sku: string;
  name: string;
  slug: string;
  brandId: string;
  brandName: string;
  category: "lam-sach" | "dac-tri-mun" | "phuc-hoi-duong-am" | "chong-nang" | "sang-da-mo-tham";
  categoryName: string;
  skinType: string;
  spec: string; // Chai 500ml, Tuýp 50ml
  price: number;
  originalPrice?: number;
  shortDesc: string;
  uses: string;
  mainIngredients: string;
  usageGuide: string;
  origin: string;
  imageUrls: string[];
  isFeatured: boolean;
  inStock?: boolean;
  isVisible?: boolean;
  seoTitle?: string;
  metaDescription?: string;
  videoUrl?: string;
  displayOrder?: number;
}

export const initialProducts: ProductItem[] = [
  {
    id: "prd-01",
    sku: "BIO-SEN-500",
    name: "Nước tẩy trang Bioderma Sensibio H2O 500ml",
    slug: "bioderma-sensibio-h2o-500ml",
    brandId: "br-01",
    brandName: "Bioderma",
    category: "lam-sach",
    categoryName: "Làm sạch – tẩy trang",
    skinType: "Da nhạy cảm, da thường, da kích ứng",
    spec: "Chai 500ml",
    price: 495000,
    originalPrice: 520000,
    shortDesc: "Nước làm sạch và tẩy trang micellar water dịu nhẹ giúp loại bỏ lớp trang điểm, bụi mịn PM 2.5 mà không gây khô căng da.",
    uses: "Làm sạch sâu 99% lớp trang điểm và bã nhờn, bảo vệ lớp màng hydrolipid tự nhiên của da, làm dịu tức thì cảm giác châm chích.",
    mainIngredients: "Micelle sinh học tương thích với màng tế bào da, chiết xuất dưa chuột làm mát, phức hợp D.A.F tăng ngưỡng dung nạp.",
    usageGuide: "Thấm dung dịch ra bông tẩy trang, nhẹ nhàng lau khắp mặt và mắt môi cho đến khi bông sạch. Không cần rửa lại với nước.",
    origin: "Pháp",
    imageUrls: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true
  },
  {
    id: "prd-02",
    sku: "BIO-SEB-200",
    name: "Gel rửa mặt Bioderma Sébium Gel Moussant 200ml",
    slug: "bioderma-sebium-gel-moussant-200ml",
    brandId: "br-01",
    brandName: "Bioderma",
    category: "lam-sach",
    categoryName: "Làm sạch – tẩy trang",
    skinType: "Da dầu mụn, da hỗn hợp thiên dầu",
    spec: "Chai vòi nhấn 200ml",
    price: 385000,
    shortDesc: "Gel rửa mặt tạo bọt dịu nhẹ kiểm soát bã nhờn, ngăn ngừa bít tắc lỗ chân lông và ức chế sự sinh sôi của khuẩn mụn.",
    uses: "Làm sạch dịu nhẹ không chứa xà phòng, hạn chế tiết bã nhờn dư thừa nhờ phức hợp Fluidactiv™ độc quyền.",
    mainIngredients: "Kẽm Gluconate, Đồng Sulfate, Phức hợp Fluidactiv™",
    usageGuide: "Làm ướt mặt, lấy một lượng gel vừa đủ tạo bọt nhẹ và massage đều khắp mặt trong 60 giây, rửa sạch lại với nước mát.",
    origin: "Pháp",
    imageUrls: [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true
  },
  {
    id: "prd-03",
    sku: "BIO-ACN-30",
    name: "Dung dịch chấm mụn Biotrade Acnaut Active Lotion 30ml",
    slug: "biotrade-acnaut-active-lotion-30ml",
    brandId: "br-02",
    brandName: "Biotrade",
    category: "dac-tri-mun",
    categoryName: "Đặc trị mụn",
    skinType: "Da mụn bọc, mụn viêm, mụn mủ",
    spec: "Lọ 30ml",
    price: 590000,
    shortDesc: "Lotion đặc trị mụn bọc, mụn sưng viêm cấp tốc không chứa kháng sinh, gom cồi mụn nhanh chóng trong 24 – 48 giờ.",
    uses: "Giảm sưng viêm nhanh, gom khô cồi mụn mủ, tiêu diệt vi khuẩn P.acnes mà không làm chai đầu mụn.",
    mainIngredients: "PASC (phức hợp chống khuẩn không kháng sinh), Nước hoa hồng hữu cơ Rosa Damascena",
    usageGuide: "Dùng tăm bông chấm trực tiếp dung dịch lên các nốt mụn viêm 2 – 3 lần/ngày sau khi làm sạch da.",
    origin: "Bulgaria",
    imageUrls: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true
  },
  {
    id: "prd-04",
    sku: "BIO-ACN-HYD",
    name: "Kem dưỡng phục hồi da mụn Biotrade Acnaut Hydro Active 60ml",
    slug: "biotrade-acnaut-hydro-active-60ml",
    brandId: "br-02",
    brandName: "Biotrade",
    category: "phuc-hoi-duong-am",
    categoryName: "Phục hồi – dưỡng ẩm",
    skinType: "Da đang điều trị mụn, da bong tróc khô rát",
    spec: "Tuýp 60ml",
    price: 490000,
    shortDesc: "Kem dưỡng ẩm chuyên biệt cho da đang điều trị mụn với isotretinoin hoặc retinoids, cấp nước tức thì mà không gây bít tắc.",
    uses: "Làm dịu cảm giác khô căng châm chích, phục hồi màng ẩm tự nhiên, ngăn ngừa bong tróc da khi trị mụn.",
    mainIngredients: "Panthenol (Vitamin B5), Vitamin E, Glycerin, D-Panthenol",
    usageGuide: "Thoa một lớp mỏng lên toàn mặt 2 lần mỗi ngày vào buổi sáng và buổi tối.",
    origin: "Bulgaria",
    imageUrls: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true
  },
  {
    id: "prd-05",
    sku: "PQ-RES-30",
    name: "Serum phục hồi PostQuam Resveraderm 30ml",
    slug: "serum-postquam-resveraderm-30ml",
    brandId: "br-03",
    brandName: "PostQuam",
    category: "phuc-hoi-duong-am",
    categoryName: "Phục hồi – dưỡng ẩm",
    skinType: "Da sau laser, bóc tách sẹo, da nhiễm corticoid",
    spec: "Lọ hút 30ml",
    price: 850000,
    shortDesc: "Tinh chất phục hồi tế bào chứa Resveratrol đậm đặc và Hyaluronic acid phân tử nhỏ, phục hồi nhanh sau thủ thuật y khoa.",
    uses: "Làm lành nhanh các vi tổn thương, củng cố hàng rào lipid biểu bì, chống oxy hóa và ngăn ngừa lão hóa sớm.",
    mainIngredients: "Resveratrol tinh khiết, Sodium Hyaluronate đa kích thước, Chiết xuất rau má Centella Asiatica",
    usageGuide: "Lấy 3 – 4 giọt thoa đều lên da sau bước làm sạch, vỗ nhẹ cho tinh chất thẩm thấu sâu.",
    origin: "Tây Ban Nha",
    imageUrls: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true
  },
  {
    id: "prd-06",
    sku: "PQ-SUN-50",
    name: "Kem chống nắng PostQuam Sun Care SPF 50+ 75ml",
    slug: "postquam-sun-care-spf-50-75ml",
    brandId: "br-03",
    brandName: "PostQuam",
    category: "chong-nang",
    categoryName: "Chống nắng",
    skinType: "Mọi loại da, da nhạy cảm sau điều trị công nghệ cao",
    spec: "Tuýp 75ml",
    price: 680000,
    shortDesc: "Kem chống nắng phổ rộng bảo vệ da toàn diện trước tia UVA, UVB, ánh sáng xanh HEV, không nâng tông trắng bệch.",
    uses: "Bảo vệ màng tế bào khỏi tổn hại của gốc tự do, ngăn ngừa tái phát nám và sạm đen da dưới nắng miền Tây.",
    mainIngredients: "Màng lọc chống nắng thế hệ mới Tinosorb S & M, Vitamin E, Chiết xuất cúc La Mã",
    usageGuide: "Thoa đều trước khi ra ngoài 20 phút. Thoa lại sau mỗi 3 – 4 giờ nếu hoạt động liên tục ngoài trời.",
    origin: "Tây Ban Nha",
    imageUrls: [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true
  },
  {
    id: "prd-07",
    sku: "LRP-MEL-30",
    name: "Serum sáng da mờ thâm La Roche-Posay Mela B3 30ml",
    slug: "la-roche-posay-mela-b3-serum-30ml",
    brandId: "br-04",
    brandName: "La Roche-Posay",
    category: "sang-da-mo-tham",
    categoryName: "Sáng da – mờ thâm nám",
    skinType: "Da thâm mụn, da nám mảng, tàn nhang",
    spec: "Chai 30ml",
    price: 1100000,
    shortDesc: "Tinh chất đột phá với hoạt chất Melasyl™ độc quyền giúp ngăn chặn sự tích tụ hắc sắc tố melanin tại tế bào mầm.",
    uses: "Làm mờ rõ rệt thâm mụn đỏ, thâm nâu, vết nám đốm nâu và ngăn ngừa tái phát đốm sắc tố mới.",
    mainIngredients: "Melasyl™, Niacinamide 10% (Vitamin B3), LHA & Carnosine",
    usageGuide: "Dùng 3 – 4 giọt vào buổi sáng và tối trước kem dưỡng, luôn kết hợp kem chống nắng vào ban ngày.",
    origin: "Pháp",
    imageUrls: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true
  },
  {
    id: "prd-08",
    sku: "LRP-CIC-40",
    name: "Kem dưỡng phục hồi La Roche-Posay Cicaplast Baume B5+ 40ml",
    slug: "la-roche-posay-cicaplast-baume-b5-40ml",
    brandId: "br-04",
    brandName: "La Roche-Posay",
    category: "phuc-hoi-duong-am",
    categoryName: "Phục hồi – dưỡng ẩm",
    skinType: "Da kích ứng, nứt nẻ, da sau can thiệp laser",
    spec: "Tuýp 40ml",
    price: 365000,
    shortDesc: "Kem dưỡng phục hồi hàng rào biểu bì thế hệ mới với phức hợp Tribioma cân bằng hệ vi sinh vật trên da.",
    uses: "Làm dịu tức thì cảm giác rát buốt, phục hồi hàng rào bảo vệ da sau 1 giờ sử dụng, kháng viêm ngăn ngừa sẹo.",
    mainIngredients: "Panthenol 5% (B5), Madecassoside, Phức hợp khoáng Đồng – Kẽm – Mangan, Men vi sinh Tribioma",
    usageGuide: "Thoa 2 lần/ngày lên vùng da cần phục hồi sau khi làm sạch nhẹ nhàng.",
    origin: "Pháp",
    imageUrls: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true
  }
];
