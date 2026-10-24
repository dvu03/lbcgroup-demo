export interface BrandItem {
  id: string;
  name: string;
  slug: string;
  origin: string; // Pháp, Tây Ban Nha, Bulgaria
  description: string;
  logoUrl: string;
  bannerUrl: string;
  representativeProductIds: string[];
}

export const initialBrands: BrandItem[] = [
  {
    id: "br-01",
    name: "Bioderma",
    slug: "bioderma",
    origin: "Pháp",
    description: "Thương hiệu dược mỹ phẩm tiên phong ứng dụng công nghệ sinh học bảo vệ hệ sinh thái tự nhiên của làn da, nổi tiếng toàn cầu với dòng Sensibio dành riêng cho da nhạy cảm.",
    logoUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    representativeProductIds: ["prd-01", "prd-02"]
  },
  {
    id: "br-02",
    name: "Biotrade",
    slug: "biotrade",
    origin: "Bulgaria",
    description: "Tập đoàn dược mỹ phẩm da liễu hàng đầu Châu Âu với giải pháp trị mụn Acnaut chuyên biệt không chứa kháng sinh, kiểm soát bã nhờn và ức chế P.acnes hiệu quả cao.",
    logoUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
    representativeProductIds: ["prd-03", "prd-04"]
  },
  {
    id: "br-03",
    name: "PostQuam",
    slug: "postquam",
    origin: "Tây Ban Nha",
    description: "Thương hiệu dược mỹ phẩm chuyên nghiệp tại các phòng khám thẩm mỹ Châu Âu, dẫn đầu về công nghệ phục hồi da sau xâm lấn, serum peptide và chống lão hóa đa tầng.",
    logoUrl: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=400&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=1200&q=80",
    representativeProductIds: ["prd-05", "prd-06"]
  },
  {
    id: "br-04",
    name: "La Roche-Posay",
    slug: "la-roche-posay",
    origin: "Pháp",
    description: "Nhãn hàng dược mỹ phẩm được hơn 90.000 chuyên gia da liễu trên thế giới khuyên dùng, giàu nước khoáng nhiệt khoáng làm dịu da kích ứng và phục hồi màng bảo vệ.",
    logoUrl: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=400&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80",
    representativeProductIds: ["prd-07", "prd-08"]
  }
];
