export interface CoreValue {
  id: string;
  iconName: string;
  title: string;
  description: string;
  isProposed?: boolean; // đánh dấu đề xuất cần duyệt
}

export const initialCoreValues: CoreValue[] = [
  {
    id: "v-01",
    iconName: "Cpu",
    title: "Tiên phong Công nghệ cao",
    description: "Sở hữu máy soi da VISIA 3D và các thiết bị điều trị tiên tiến chuẩn quốc tế."
  },
  {
    id: "v-02",
    iconName: "Fingerprint",
    title: "Y học Cá nhân hóa",
    description: "Mỗi làn da là một phác đồ riêng biệt, thiết kế theo cơ địa và lối sống từng khách hàng."
  },
  {
    id: "v-03",
    iconName: "GraduationCap",
    title: "Bác sĩ Sau Đại học",
    description: "100% bác sĩ có trình độ sau đại học, trực tiếp thăm khám và theo dõi suốt liệu trình."
  },
  {
    id: "v-04",
    iconName: "ShieldCheck",
    title: "Phác đồ Chuẩn Y khoa",
    description: "Quy trình vô trùng nghiêm ngặt, kết hợp dược mỹ phẩm nhập khẩu chính hãng.",
    isProposed: true // Ô thứ 4 - nội dung đề xuất chờ duyệt theo Sheet 13
  }
];
