export interface LocationItem {
  id: string;
  name: string;
  shortName: string;
  address: string;
  phone: string;
  hours: string;
  isMainFacility: boolean;
  notes?: string;
  imageUrl: string;
  mapEmbedUrl: string;
}

export const initialLocations: LocationItem[] = [
  {
    id: "cs-01",
    name: "Cơ sở 01 – Phòng khám Chuyên khoa Da liễu Lạc's Beauty Center",
    shortName: "Cơ sở 01 (Đường 3/2)",
    address: "Số 231T, Đường 3/2, Phường Tân An, Quận Ninh Kiều, Thành phố Cần Thơ, Việt Nam",
    phone: "1900 6750 - 0292 3888 123",
    hours: "08:00 – 20:00 (Hằng ngày)",
    isMainFacility: true,
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    mapEmbedUrl: "https://maps.google.com/maps?q=231T+Đường+3/2+Ninh+Kiều+Cần+Thơ&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    id: "cs-02",
    name: "Cơ sở 02 – Viện Chăm sóc Da & Công nghệ cao Lạc's Beauty Center",
    shortName: "Cơ sở 02 (Nguyễn Văn Cừ)",
    address: "Số 388, Đường Nguyễn Văn Cừ, Phường An Khánh, Quận Ninh Kiều, Thành phố Cần Thơ",
    phone: "1900 6750 - 0292 3888 456",
    hours: "08:00 – 20:00 (Hằng ngày)",
    isMainFacility: false,
    notes: "Cơ sở khai trương ngày 29/09/2026 – Địa chỉ hành chính chi tiết cần rà soát với giấy phép Sở Y tế",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    mapEmbedUrl: "https://maps.google.com/maps?q=388+Nguyễn+Văn+Cừ+Cần+Thơ&t=&z=15&ie=UTF8&iwloc=&output=embed"
  }
];
