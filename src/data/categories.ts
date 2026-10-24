export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  iconUrl?: string;
  order: number;
  enabled: boolean;
}

export const initialProductCategories: ProductCategory[] = [
  {
    id: "lam-sach",
    name: "Làm sạch – Tẩy trang",
    slug: "lam-sach",
    description: "Nước tẩy trang, gel rửa mặt dịu lành cho da mẫn cảm và da sau can thiệp y khoa.",
    iconName: "Droplets",
    order: 1,
    enabled: true
  },
  {
    id: "dac-tri-mun",
    name: "Đặc trị mụn",
    slug: "dac-tri-mun",
    description: "Kiểm soát bã nhờn, ức chế vi khuẩn P.acnes không gây kháng thuốc hay khô rát.",
    iconName: "ShieldAlert",
    order: 2,
    enabled: true
  },
  {
    id: "phuc-hoi-duong-am",
    name: "Phục hồi – Dưỡng ẩm",
    slug: "phuc-hoi-duong-am",
    description: "Tái tạo hàng rào biểu bì sinh học, làm dịu tức thì kích ứng và tổn thương da.",
    iconName: "HeartHandshake",
    order: 3,
    enabled: true
  },
  {
    id: "chong-nang",
    name: "Chống nắng bảo vệ",
    slug: "chong-nang",
    description: "Màng lọc quang phổ rộng ngăn ngừa tăng sắc tố sau viêm và bảo vệ da tối ưu.",
    iconName: "SunMedium",
    order: 4,
    enabled: true
  },
  {
    id: "sang-da-mo-tham",
    name: "Sáng da – Mờ thâm",
    slug: "sang-da-mo-tham",
    description: "Dưỡng chất chống oxy hóa, làm đều màu da và mờ vết thâm nám an toàn chuẩn y khoa.",
    iconName: "Sparkles",
    order: 5,
    enabled: true
  }
];
