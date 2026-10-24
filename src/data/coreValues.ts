export interface CoreValue {
  id: string;
  iconName: string;
  imageUrl?: string;
  title: string;
  description: string;
  badge?: string; // Nhãn phụ (VD: "Đề xuất", "Nổi bật")
  isProposed?: boolean; // Tương thích dữ liệu cũ
  link?: string; // Link điều hướng nếu có
  enabled?: boolean; // Bật/tắt thẻ
  order?: number; // Thứ tự hiển thị
}

export const initialCoreValues: CoreValue[] = [
  {
    id: "v-01",
    iconName: "Cpu",
    title: "Tiên phong Công nghệ cao",
    description: "Sở hữu máy soi da VISIA 3D và các thiết bị điều trị tiên tiến chuẩn quốc tế.",
    badge: "Công nghệ",
    link: "/cong-nghe",
    enabled: true,
    order: 1
  },
  {
    id: "v-02",
    iconName: "Fingerprint",
    title: "Y học Cá nhân hóa",
    description: "Mỗi làn da là một phác đồ riêng biệt, thiết kế theo cơ địa và lối sống từng khách hàng.",
    badge: "Cá nhân hóa",
    link: "/gioi-thieu",
    enabled: true,
    order: 2
  },
  {
    id: "v-03",
    iconName: "GraduationCap",
    title: "Bác sĩ Sau Đại học",
    description: "100% bác sĩ có trình độ sau đại học, trực tiếp thăm khám và theo dõi suốt liệu trình.",
    badge: "Chuyên môn",
    link: "/doi-ngu-bac-si",
    enabled: true,
    order: 3
  },
  {
    id: "v-04",
    iconName: "ShieldCheck",
    title: "Phác đồ Chuẩn Y khoa",
    description: "Quy trình vô trùng nghiêm ngặt, kết hợp dược mỹ phẩm nhập khẩu chính hãng.",
    badge: "Đề xuất",
    isProposed: true,
    link: "/dich-vu",
    enabled: true,
    order: 4
  }
];
