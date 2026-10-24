import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Plus,
  Search,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  CheckCircle2,
  Image as ImageIcon,
  Tag,
  Star,
  DollarSign,
  Package,
  Layers,
  Building2,
  FolderTree,
  Globe,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { ProductItem } from "../../../data/products";
import { BrandItem } from "../../../data/brands";
import { ProductCategory } from "../../../data/categories";
import { useDemoData } from "../../../context/DemoDataContext";
import { DynamicIcon } from "../../common/DynamicIcon";
import { IconPickerModal } from "../IconPickerModal";
import { MediaLibraryModal } from "../MediaLibraryModal";
import { ConfirmationModal } from "../ConfirmationModal";

export interface ProductsTabProps {
  initialSubTab?: "products" | "brands" | "categories";
}

export const ProductsTab: React.FC<ProductsTabProps> = ({ initialSubTab = "products" }) => {
  const {
    products,
    saveProduct,
    deleteProduct,
    duplicateProduct,
    brands,
    saveBrand,
    deleteBrand,
    productCategories,
    saveProductCategory,
    deleteProductCategory
  } = useDemoData();

  const [activeSubTab, setActiveSubTab] = useState<"products" | "brands" | "categories">(initialSubTab);

  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  // Product states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showMediaPicker, setShowMediaPicker] = useState(false);

  // Brand states
  const [editingBrand, setEditingBrand] = useState<BrandItem | null>(null);
  const [deleteBrandConfirmId, setDeleteBrandConfirmId] = useState<string | null>(null);
  const [brandMediaPickerTarget, setBrandMediaPickerTarget] = useState<"logo" | "banner" | null>(null);

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Category states
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null);
  const [deleteCategoryConfirmId, setDeleteCategoryConfirmId] = useState<string | null>(null);
  const [showIconPickerForCategory, setShowIconPickerForCategory] = useState(false);

  const categories = productCategories;

  const filteredProducts = products.filter((p: ProductItem) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brandName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrand === "all" || p.brandName === selectedBrand;
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesBrand && matchesCategory;
  });

  // Product handlers
  const handleCreateNewProduct = () => {
    const newPrd: ProductItem = {
      id: `prd-${Date.now()}`,
      sku: `LBC-NEW-${Math.floor(100 + Math.random() * 900)}`,
      name: "Sản phẩm Dược mỹ phẩm mới",
      slug: `duoc-my-pham-moi-${Date.now()}`,
      brandId: brands[0]?.id || "br-01",
      brandName: brands[0]?.name || "Bioderma",
      category: "lam-sach",
      categoryName: "Làm sạch – tẩy trang",
      skinType: "Mọi loại da",
      spec: "Chai 200ml",
      price: 350000,
      originalPrice: 400000,
      shortDesc: "Mô tả ngắn về công dụng làm sạch hoặc phục hồi của sản phẩm.",
      uses: "Chăm sóc làn da dịu nhẹ, cân bằng độ pH và bảo vệ hàng rào sinh học.",
      mainIngredients: "Thành phần dược mỹ phẩm lành tính đạt chứng nhận quốc tế.",
      usageGuide: "Sử dụng 2 lần mỗi ngày vào buổi sáng và tối.",
      origin: "Pháp",
      imageUrls: [
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
      ],
      isFeatured: true,
      inStock: true,
      isVisible: true
    };
    setEditingProduct(newPrd);
  };

  const handleSaveProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    saveProduct(editingProduct);
    showToast(`Đã lưu sản phẩm: "${editingProduct.name}"!`);
    setEditingProduct(null);
  };

  // Brand handlers
  const handleCreateNewBrand = () => {
    const newBr: BrandItem = {
      id: `br-${Date.now()}`,
      name: "Thương hiệu Dược mỹ phẩm mới",
      slug: `thuong-hieu-moi-${Date.now()}`,
      origin: "Pháp",
      description: "Thương hiệu dược mỹ phẩm uy tín ứng dụng công nghệ sinh học và tiêu chuẩn y khoa quốc tế.",
      logoUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80",
      bannerUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
      representativeProductIds: []
    };
    setEditingBrand(newBr);
  };

  const handleSaveBrandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBrand) return;
    saveBrand(editingBrand);
    showToast(`Đã lưu thương hiệu: "${editingBrand.name}"!`);
    setEditingBrand(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-neutral-900 font-heading flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-700" />
            <span>Quản lý Dược mỹ phẩm & Thương hiệu Đối tác</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
            Hệ thống quản lý sản phẩm chính ngạch, đối tác thương hiệu (Bioderma, Biotrade, PostQuam...) và 5 nhóm phân loại dược mỹ phẩm y khoa Lạc's Beauty Center.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {activeSubTab === "products" && (
            <button
              type="button"
              onClick={handleCreateNewProduct}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Sản phẩm</span>
            </button>
          )}

          {activeSubTab === "brands" && (
            <button
              type="button"
              onClick={handleCreateNewBrand}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Thương hiệu</span>
            </button>
          )}

          <Link
            to="/duoc-my-pham"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Xem Cửa hàng Live</span>
          </Link>
        </div>
      </div>

      {/* SubTab Navigation */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveSubTab("products")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition ${
            activeSubTab === "products"
              ? "bg-emerald-700 text-white shadow-xs"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Sản phẩm Dược mỹ phẩm ({products.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("brands")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition ${
            activeSubTab === "brands"
              ? "bg-emerald-700 text-white shadow-xs"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Thương hiệu đối tác ({brands.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("categories")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition ${
            activeSubTab === "categories"
              ? "bg-emerald-700 text-white shadow-xs"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <FolderTree className="w-3.5 h-3.5" />
          <span>Danh mục & Phân loại ({categories.length})</span>
        </button>
      </div>

      {toastMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-fadeIn font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ===================== SUBTAB 1: PRODUCTS ===================== */}
      {activeSubTab === "products" && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white rounded-2xl p-4 border border-neutral-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 w-full sm:w-auto flex-wrap">
              {/* Search */}
              <div className="relative flex-1 sm:w-60">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm theo tên, SKU, hãng..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              {/* Brand Filter */}
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-3 py-1.5 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-hidden font-medium text-neutral-700"
              >
                <option value="all">Tất cả thương hiệu</option>
                {brands.map((b: BrandItem) => (
                  <option key={b.id} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1.5 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-hidden font-medium text-neutral-700"
              >
                <option value="all">Tất cả danh mục ({products.length})</option>
                {categories.map((c: ProductCategory) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-xs text-neutral-500 font-medium">
              Hiển thị <span className="font-bold text-neutral-800">{filteredProducts.length}</span> sản phẩm
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.map((prd: ProductItem) => (
              <div
                key={prd.id}
                className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  {/* Image & Badges */}
                  <div className="relative h-44 bg-neutral-100 overflow-hidden">
                    <img
                      src={prd.imageUrls[0] || "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"}
                      alt={prd.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 text-neutral-800 shadow-xs border border-neutral-200">
                        {prd.brandName}
                      </span>
                      {prd.isFeatured && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-white shadow-xs flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          <span>Nổi bật</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-1.5">
                    <div className="text-[10px] text-neutral-400 font-mono">SKU: {prd.sku}</div>
                    <h3 className="text-xs font-bold text-neutral-900 line-clamp-2 leading-snug font-heading">
                      {prd.name}
                    </h3>
                    <div className="text-[11px] text-neutral-500">{prd.spec} &bull; {prd.origin}</div>

                    <div className="pt-2 flex items-baseline gap-2">
                      <span className="text-sm font-extrabold text-emerald-800">
                        {prd.price.toLocaleString("vi-VN")} đ
                      </span>
                      {prd.originalPrice && prd.originalPrice > prd.price && (
                        <span className="text-xs text-neutral-400 line-through">
                          {prd.originalPrice.toLocaleString("vi-VN")} đ
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="px-4 py-2.5 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
                  <Link
                    to={`/san-pham/${prd.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                  >
                    <span>Xem</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => duplicateProduct(prd.id)}
                      className="p-1 rounded-lg text-neutral-500 hover:text-purple-700 hover:bg-purple-50 transition"
                      title="Nhân bản sản phẩm"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingProduct({ ...prd })}
                      className="p-1 rounded-lg text-neutral-500 hover:text-blue-700 hover:bg-blue-50 transition"
                      title="Chỉnh sửa sản phẩm"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(prd.id)}
                      className="p-1 rounded-lg text-neutral-500 hover:text-rose-700 hover:bg-rose-50 transition"
                      title="Xóa sản phẩm"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================== SUBTAB 2: BRANDS ===================== */}
      {activeSubTab === "brands" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {brands.map((brand: BrandItem) => {
              const brandProducts = products.filter(
                (p: ProductItem) => p.brandId === brand.id || p.brandName.toLowerCase() === brand.name.toLowerCase()
              );

              return (
                <div
                  key={brand.id}
                  className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    {/* Brand Banner */}
                    <div className="relative h-28 bg-neutral-900 overflow-hidden">
                      <img
                        src={brand.bannerUrl}
                        alt={`${brand.name} Banner`}
                        className="w-full h-full object-cover opacity-60"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                      
                      {/* Brand Logo & Name overlay */}
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-white p-1 shadow-md border border-white/50 shrink-0 overflow-hidden">
                            <img
                              src={brand.logoUrl}
                              alt={brand.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
                              <span>{brand.name}</span>
                              <span className="text-[10px] px-2 py-0.5 bg-emerald-600/90 text-white rounded-full font-sans font-semibold">
                                {brand.origin}
                              </span>
                            </h3>
                            <div className="text-[11px] text-white/80 font-mono">
                              /{brand.slug}
                            </div>
                          </div>
                        </div>

                        <span className="text-[11px] font-bold px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-lg text-white border border-white/30 shrink-0">
                          {brandProducts.length} sản phẩm
                        </span>
                      </div>
                    </div>

                    {/* Brand Description */}
                    <div className="p-4 space-y-3">
                      <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                        {brand.description}
                      </p>

                      {brand.representativeProductIds && brand.representativeProductIds.length > 0 && (
                        <div className="pt-2 border-t border-neutral-100 flex items-center gap-1 text-[11px] text-neutral-500">
                          <Star className="w-3 h-3 text-amber-500 shrink-0" />
                          <span>Đại diện: {brand.representativeProductIds.length} dòng sản phẩm chủ lực</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
                    <Link
                      to={`/thuong-hieu/${brand.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                    >
                      <span>Xem trang thương hiệu</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingBrand({ ...brand })}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Sửa</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteBrandConfirmId(brand.id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Xóa</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================== SUBTAB 3: CATEGORIES ===================== */}
      {activeSubTab === "categories" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-neutral-200 gap-3">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 font-heading">
                Quản lý Danh mục Dược mỹ phẩm & Icon ({categories.length} danh mục)
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Chỉnh sửa tên danh mục, mô tả và chọn icon hiển thị trên Menu, Mega menu và Trang Dược mỹ phẩm. Dữ liệu lưu trực tiếp vào Neon.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingCategory({
                  id: `cat-${Date.now()}`,
                  name: "Danh mục mới",
                  slug: `danh-muc-moi-${Date.now()}`,
                  description: "Mô tả phạm vi chăm sóc da của danh mục...",
                  iconName: "Sparkles",
                  order: categories.length + 1,
                  enabled: true
                });
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Danh mục Mới</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.map((cat: ProductCategory, idx: number) => {
              const catProducts = products.filter((p: ProductItem) => p.category === cat.id);

              return (
                <div
                  key={cat.id}
                  className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                          <DynamicIcon name={cat.iconName} url={cat.iconUrl} className="w-5 h-5 text-emerald-700" />
                        </div>
                        <span className="text-xs font-bold text-neutral-400 font-mono">
                          0{idx + 1}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setEditingCategory({ ...cat })}
                          className="p-1.5 rounded-lg text-neutral-500 hover:text-blue-700 hover:bg-blue-50 transition"
                          title="Chỉnh sửa danh mục & icon"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteCategoryConfirmId(cat.id)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-red-700 hover:bg-red-50 transition"
                          title="Xóa danh mục"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-sm font-bold text-neutral-900 font-heading">
                        {cat.name}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-100 text-neutral-700">
                        {catProducts.length} sản phẩm
                      </span>
                    </div>

                    <p className="text-xs text-neutral-500 leading-relaxed mb-4 line-clamp-2">
                      {cat.description || (cat as any).desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-neutral-400 truncate">
                      ID: {cat.id}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setActiveSubTab("products");
                      }}
                      className="py-1.5 px-3 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition flex items-center gap-1 shrink-0"
                    >
                      <span>Lọc sản phẩm</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================== EDIT PRODUCT MODAL ===================== */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn">
            <form onSubmit={handleSaveProductSubmit}>
              <div className="p-6 border-b border-neutral-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
                <h3 className="text-base font-bold text-neutral-900 font-heading flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-emerald-700" />
                  <span>
                    {editingProduct.id.startsWith("prd-") && !products.some((p: ProductItem) => p.id === editingProduct.id)
                      ? "Thêm Sản phẩm Dược mỹ phẩm"
                      : "Chỉnh sửa Sản phẩm"}
                  </span>
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4 text-xs">
                {/* Name & SKU */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-neutral-700 mb-1">Tên sản phẩm *</label>
                    <input
                      type="text"
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Mã SKU *</label>
                    <input
                      type="text"
                      value={editingProduct.sku}
                      onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden font-mono"
                    />
                  </div>
                </div>

                {/* Brand & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Thương hiệu *</label>
                    <select
                      value={editingProduct.brandName}
                      onChange={(e) => {
                        const selected = brands.find((b: BrandItem) => b.name === e.target.value);
                        setEditingProduct({
                          ...editingProduct,
                          brandName: e.target.value,
                          brandId: selected?.id || editingProduct.brandId,
                          origin: selected?.origin || editingProduct.origin
                        });
                      }}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-xl bg-white focus:outline-hidden font-medium"
                    >
                      {brands.map((b: BrandItem) => (
                        <option key={b.id} value={b.name}>
                          {b.name} ({b.origin})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Danh mục *</label>
                    <select
                      value={editingProduct.category}
                      onChange={(e) => {
                        const cat = categories.find((c: ProductCategory) => c.id === e.target.value);
                        setEditingProduct({
                          ...editingProduct,
                          category: e.target.value as ProductItem["category"],
                          categoryName: cat?.name || editingProduct.categoryName
                        });
                      }}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-xl bg-white focus:outline-hidden font-medium"
                    >
                      {categories.map((c: ProductCategory) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Xuất xứ</label>
                    <input
                      type="text"
                      value={editingProduct.origin}
                      onChange={(e) => setEditingProduct({ ...editingProduct, origin: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-xl focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Price & Spec */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Giá bán demo (VNĐ) *</label>
                    <input
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                      required
                      min={0}
                      step={1000}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-xl font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Giá gốc niêm yết (VNĐ)</label>
                    <input
                      type="number"
                      value={editingProduct.originalPrice || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) })}
                      min={0}
                      step={1000}
                      placeholder="Tùy chọn hiển thị giảm giá"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-xl font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Quy cách đóng gói</label>
                    <input
                      type="text"
                      value={editingProduct.spec}
                      onChange={(e) => setEditingProduct({ ...editingProduct, spec: e.target.value })}
                      placeholder="Chai 200ml, Tuýp 40ml..."
                      className="w-full px-3 py-2 border border-neutral-300 rounded-xl"
                    />
                  </div>
                </div>

                {/* Short Desc & Uses */}
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Mô tả ngắn</label>
                  <textarea
                    rows={2}
                    value={editingProduct.shortDesc}
                    onChange={(e) => setEditingProduct({ ...editingProduct, shortDesc: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-xl leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Công dụng chính</label>
                  <textarea
                    rows={2}
                    value={editingProduct.uses}
                    onChange={(e) => setEditingProduct({ ...editingProduct, uses: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-xl leading-relaxed"
                  />
                </div>

                {/* Images */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block font-semibold text-neutral-700">Hình ảnh sản phẩm</label>
                    <button
                      type="button"
                      onClick={() => setShowMediaPicker(true)}
                      className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Thêm ảnh từ Thư viện</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    {editingProduct.imageUrls.map((url, idx) => (
                      <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-neutral-200 group">
                        <img src={url} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = editingProduct.imageUrls.filter((_, i) => i !== idx);
                            setEditingProduct({ ...editingProduct, imageUrls: updated });
                          }}
                          className="absolute inset-0 bg-black/60 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                        >
                          Xóa
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div className="pt-2 flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="prdFeaturedCheck"
                      checked={editingProduct.isFeatured}
                      onChange={(e) => setEditingProduct({ ...editingProduct, isFeatured: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 rounded border-neutral-300 focus:ring-emerald-500"
                    />
                    <label htmlFor="prdFeaturedCheck" className="text-xs font-medium text-neutral-800 cursor-pointer">
                      Sản phẩm Nổi bật
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="prdInStockCheck"
                      checked={editingProduct.inStock !== false}
                      onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 rounded border-neutral-300 focus:ring-emerald-500"
                    />
                    <label htmlFor="prdInStockCheck" className="text-xs font-medium text-neutral-800 cursor-pointer">
                      Còn hàng trong kho demo
                    </label>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-100 transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
                >
                  Lưu sản phẩm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== EDIT BRAND MODAL ===================== */}
      {editingBrand && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn">
            <form onSubmit={handleSaveBrandSubmit}>
              <div className="p-6 border-b border-neutral-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
                <h3 className="text-base font-bold text-neutral-900 font-heading flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-emerald-700" />
                  <span>
                    {editingBrand.id.startsWith("br-") && !brands.some((b: BrandItem) => b.id === editingBrand.id)
                      ? "Thêm Thương hiệu Đối tác mới"
                      : `Chỉnh sửa Thương hiệu: ${editingBrand.name}`}
                  </span>
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingBrand(null)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4 text-xs">
                {/* Name & Origin */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Tên thương hiệu *</label>
                    <input
                      type="text"
                      value={editingBrand.name}
                      onChange={(e) => setEditingBrand({ ...editingBrand, name: e.target.value })}
                      required
                      placeholder="Bioderma, Biotrade..."
                      className="w-full px-3 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Quốc gia xuất xứ *</label>
                    <input
                      type="text"
                      value={editingBrand.origin}
                      onChange={(e) => setEditingBrand({ ...editingBrand, origin: e.target.value })}
                      required
                      placeholder="Pháp, Tây Ban Nha, Bulgaria..."
                      className="w-full px-3 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden font-medium"
                    />
                  </div>
                </div>

                {/* Slug */}
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Slug đường dẫn *</label>
                  <div className="flex items-center gap-1">
                    <span className="text-neutral-400 font-mono">/thuong-hieu/</span>
                    <input
                      type="text"
                      value={editingBrand.slug}
                      onChange={(e) => setEditingBrand({ ...editingBrand, slug: e.target.value })}
                      required
                      placeholder="bioderma"
                      className="flex-1 px-3 py-2 border border-neutral-300 rounded-xl font-mono focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Mô tả giới thiệu thương hiệu *</label>
                  <textarea
                    rows={3}
                    value={editingBrand.description}
                    onChange={(e) => setEditingBrand({ ...editingBrand, description: e.target.value })}
                    required
                    placeholder="Mô tả về lịch sử, triết lý sinh học và công nghệ của thương hiệu..."
                    className="w-full px-3 py-2 border border-neutral-300 rounded-xl leading-relaxed focus:outline-hidden"
                  />
                </div>

                {/* Logo & Banner URLs */}
                <div className="space-y-3 pt-2 border-t border-neutral-100">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block font-semibold text-neutral-700">Logo thương hiệu (URL)</label>
                      <button
                        type="button"
                        onClick={() => setBrandMediaPickerTarget("logo")}
                        className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Thư viện Media</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0 flex items-center justify-center p-1">
                        <img src={editingBrand.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                      </div>
                      <input
                        type="url"
                        value={editingBrand.logoUrl}
                        onChange={(e) => setEditingBrand({ ...editingBrand, logoUrl: e.target.value })}
                        required
                        className="flex-1 px-3 py-2 border border-neutral-300 rounded-xl font-mono focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block font-semibold text-neutral-700">Ảnh bìa Banner thương hiệu (URL)</label>
                      <button
                        type="button"
                        onClick={() => setBrandMediaPickerTarget("banner")}
                        className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Thư viện Media</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-10 rounded-xl bg-neutral-900 overflow-hidden shrink-0">
                        <img src={editingBrand.bannerUrl} alt="Banner" className="w-full h-full object-cover" />
                      </div>
                      <input
                        type="url"
                        value={editingBrand.bannerUrl}
                        onChange={(e) => setEditingBrand({ ...editingBrand, bannerUrl: e.target.value })}
                        required
                        className="flex-1 px-3 py-2 border border-neutral-300 rounded-xl font-mono focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingBrand(null)}
                  className="px-4 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-100 transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
                >
                  Lưu thương hiệu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Product Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deleteConfirmId}
        type="danger"
        title="Xóa Sản phẩm Dược mỹ phẩm?"
        message="Hành động này sẽ xóa sản phẩm khỏi danh mục phân phối trên website."
        confirmLabel="Xóa Sản phẩm"
        cancelLabel="Hủy bỏ"
        onConfirm={() => {
          if (deleteConfirmId) {
            deleteProduct(deleteConfirmId);
            setDeleteConfirmId(null);
            showToast("Đã xóa sản phẩm thành công!");
          }
        }}
        onCancel={() => setDeleteConfirmId(null)}
      />

      {/* Delete Brand Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deleteBrandConfirmId}
        type="danger"
        title="Xóa Thương hiệu Đối tác?"
        message="Hành động này sẽ xóa thương hiệu đối tác khỏi website demo LBC."
        confirmLabel="Xóa Thương hiệu"
        cancelLabel="Hủy bỏ"
        onConfirm={() => {
          if (deleteBrandConfirmId) {
            deleteBrand(deleteBrandConfirmId);
            setDeleteBrandConfirmId(null);
            showToast("Đã xóa thương hiệu đối tác thành công!");
          }
        }}
        onCancel={() => setDeleteBrandConfirmId(null)}
      />

      {/* Media Picker Modal for Product */}
      <MediaLibraryModal
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelectMedia={(media) => {
          if (editingProduct) {
            setEditingProduct({
              ...editingProduct,
              imageUrls: [...editingProduct.imageUrls, media.url]
            });
          }
          setShowMediaPicker(false);
        }}
        title="Chọn ảnh sản phẩm từ Thư viện Media"
      />

      {/* Media Picker Modal for Brand */}
      <MediaLibraryModal
        isOpen={!!brandMediaPickerTarget}
        onClose={() => setBrandMediaPickerTarget(null)}
        onSelectMedia={(media) => {
          if (editingBrand) {
            if (brandMediaPickerTarget === "logo") {
              setEditingBrand({ ...editingBrand, logoUrl: media.url });
            } else if (brandMediaPickerTarget === "banner") {
              setEditingBrand({ ...editingBrand, bannerUrl: media.url });
            }
          }
          setBrandMediaPickerTarget(null);
        }}
        title="Chọn ảnh thương hiệu từ Thư viện Media"
      />

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl animate-scaleIn border border-neutral-200 overflow-hidden">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveProductCategory(editingCategory);
                showToast(`Đã lưu danh mục "${editingCategory.name}" thành công!`);
                setEditingCategory(null);
              }}
            >
              <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/70">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
                    <DynamicIcon name={editingCategory.iconName} url={editingCategory.iconUrl} className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 font-heading">
                      {productCategories.some((c: ProductCategory) => c.id === editingCategory.id)
                        ? "Chỉnh sửa Danh mục & Icon"
                        : "Thêm Danh mục Dược mỹ phẩm"}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">Quản lý icon và thông tin danh mục</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Tên danh mục *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                    placeholder="VD: Làm sạch – Tẩy trang"
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl font-bold focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Mã ID / Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingCategory.slug || editingCategory.id}
                      onChange={(e) => setEditingCategory({ ...editingCategory, id: e.target.value, slug: e.target.value })}
                      placeholder="VD: lam-sach"
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Thứ tự hiển thị
                    </label>
                    <input
                      type="number"
                      value={editingCategory.order || 1}
                      onChange={(e) => setEditingCategory({ ...editingCategory, order: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono"
                    />
                  </div>
                </div>

                {/* Icon Selection Box */}
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-neutral-800 uppercase tracking-wider text-[11px]">
                      Biểu tượng hiển thị (Icon)
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowIconPickerForCategory(true)}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Đổi Icon / SVG</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white border border-neutral-300 flex items-center justify-center p-2 shadow-xs shrink-0">
                      <DynamicIcon name={editingCategory.iconName} url={editingCategory.iconUrl} className="w-6 h-6 text-emerald-700" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-mono font-bold text-neutral-900 block truncate">
                        {editingCategory.iconUrl ? "Icon Ảnh/SVG riêng" : `Lucide: ${editingCategory.iconName || "Sparkles"}`}
                      </span>
                      <span className="text-[11px] text-neutral-400 block truncate">
                        {editingCategory.iconUrl || "Biểu tượng vector chuẩn y khoa"}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Mô tả danh mục
                  </label>
                  <textarea
                    rows={3}
                    value={editingCategory.description || (editingCategory as any).desc || ""}
                    onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                    placeholder="Mô tả công dụng và phân loại sản phẩm thuộc danh mục này..."
                    className="w-full px-3 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="catEnabledCheck"
                    checked={editingCategory.enabled !== false}
                    onChange={(e) => setEditingCategory({ ...editingCategory, enabled: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded border-neutral-300 focus:ring-emerald-500"
                  />
                  <label htmlFor="catEnabledCheck" className="font-medium text-neutral-800 cursor-pointer text-xs">
                    Kích hoạt hiển thị danh mục này trên website
                  </label>
                </div>
              </div>

              <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-100 transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
                >
                  Lưu Danh Mục
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Category Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deleteCategoryConfirmId}
        type="danger"
        title="Xóa Danh mục Dược mỹ phẩm?"
        message="Hành động này sẽ xóa danh mục khỏi hệ thống website. Các sản phẩm thuộc danh mục này vẫn được giữ nguyên an toàn."
        confirmLabel="Xóa Danh mục"
        cancelLabel="Hủy bỏ"
        onConfirm={() => {
          if (deleteCategoryConfirmId) {
            deleteProductCategory(deleteCategoryConfirmId);
            setDeleteCategoryConfirmId(null);
            showToast("Đã xóa danh mục dược mỹ phẩm thành công!");
          }
        }}
        onCancel={() => setDeleteCategoryConfirmId(null)}
      />

      {/* Icon Picker Modal for Category */}
      <IconPickerModal
        isOpen={showIconPickerForCategory}
        onClose={() => setShowIconPickerForCategory(false)}
        selectedIconName={editingCategory?.iconName || "Sparkles"}
        selectedIconUrl={editingCategory?.iconUrl}
        recommendedCategory="product"
        title="Chọn Icon cho Danh mục Dược mỹ phẩm"
        onSelect={(name, url) => {
          if (editingCategory) {
            setEditingCategory({
              ...editingCategory,
              iconName: name,
              iconUrl: url
            });
          }
          setShowIconPickerForCategory(false);
          showToast(`Đã chọn icon "${name}" cho danh mục!`);
        }}
      />
    </div>
  );
};
