import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { initialSiteConfig, SiteConfig } from '../data/siteConfig';
import { initialHomepageModules, HomepageModuleConfig } from '../data/homepageModules';
import { initialHeroSlides, initialSideBanners, SlideItem, SideBanner, HeroSliderSettings, defaultHeroSliderSettings } from '../data/heroSlider';
import { initialCoreValues, CoreValue } from '../data/coreValues';
import { initialPagesConfig, PageBannerConfig } from '../data/pagesConfig';
import { initialSpecialties, Specialty } from '../data/specialties';
import { initialServices, ServiceItem } from '../data/services';
import { initialDoctors, DoctorProfile } from '../data/doctors';
import { initialTechnologies, TechnologyItem } from '../data/technologies';
import { initialCaseStudies, CaseStudyItem } from '../data/caseStudies';
import { initialBrands, BrandItem } from '../data/brands';
import { initialProducts, ProductItem } from '../data/products';
import { initialProductCategories, ProductCategory } from '../data/categories';
import { initialArticles, ArticleItem } from '../data/articles';
import { initialLocations, LocationItem } from '../data/locations';
import { initialFAQs, FAQGroup } from '../data/faqs';
import { initialNavItems, NavItem } from '../data/navigation';
import { logAuditAction } from '../utils/auditLogger';

export interface BookingLead {
  id: string;
  fullName: string;
  phone: string;
  facility: string;
  serviceInterest: string;
  preferredDateTime: string;
  notes: string;
  consentAgreed: boolean;
  createdAt: string;
  status: "new" | "contacted" | "confirmed" | "cancelled";
  name?: string;
  email?: string;
  service?: string;
  preferredDate?: string;
  preferredTime?: string;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface SaveResult {
  success: boolean;
  error?: string;
  key?: string;
}

interface DemoDataContextType {
  siteConfig: SiteConfig;
  updateSiteConfig: (newConfig: Partial<SiteConfig>) => Promise<SaveResult>;
  
  homepageModules: HomepageModuleConfig[];
  toggleHomepageModule: (id: string) => Promise<SaveResult>;
  reorderHomepageModules: (newModules: HomepageModuleConfig[]) => Promise<SaveResult>;
  updateHomepageModule: (moduleOrId: string | HomepageModuleConfig, updates?: Partial<HomepageModuleConfig>) => Promise<SaveResult>;

  heroSlides: SlideItem[];
  updateHeroSlides: (slides: SlideItem[]) => Promise<SaveResult>;
  saveSlide: (item: SlideItem) => Promise<SaveResult>;
  deleteSlide: (id: string) => Promise<SaveResult>;
  duplicateSlide: (id: string) => Promise<SaveResult>;

  heroSliderSettings: HeroSliderSettings;
  updateHeroSliderSettings: (settings: Partial<HeroSliderSettings>) => Promise<SaveResult>;

  sideBanners: SideBanner[];
  updateSideBanners: (banners: SideBanner[]) => Promise<SaveResult>;
  saveSideBanner: (banner: SideBanner) => Promise<SaveResult>;
  deleteSideBanner: (id: string) => Promise<SaveResult>;

  coreValues: CoreValue[];
  updateCoreValues: (values: CoreValue[]) => Promise<SaveResult>;
  saveCoreValue: (item: CoreValue) => Promise<SaveResult>;
  deleteCoreValue: (id: string) => Promise<SaveResult>;

  pagesConfig: Record<string, PageBannerConfig>;
  updatePagesConfig: (configs: Record<string, PageBannerConfig>) => Promise<SaveResult>;
  updatePageConfig: (pageId: string, partial: Partial<PageBannerConfig>) => Promise<SaveResult>;

  specialties: Specialty[];
  updateSpecialties: (items: Specialty[]) => Promise<SaveResult>;
  saveSpecialty: (item: Specialty) => Promise<SaveResult>;
  deleteSpecialty: (id: string) => Promise<SaveResult>;

  services: ServiceItem[];
  saveService: (item: ServiceItem) => Promise<SaveResult>;
  deleteService: (id: string) => Promise<SaveResult>;
  duplicateService: (id: string) => Promise<SaveResult>;

  doctors: DoctorProfile[];
  saveDoctor: (item: DoctorProfile) => Promise<SaveResult>;
  deleteDoctor: (id: string) => Promise<SaveResult>;
  duplicateDoctor: (id: string) => Promise<SaveResult>;

  technologies: TechnologyItem[];
  saveTechnology: (item: TechnologyItem) => Promise<SaveResult>;
  deleteTechnology: (id: string) => Promise<SaveResult>;

  caseStudies: CaseStudyItem[];
  saveCaseStudy: (item: CaseStudyItem) => Promise<SaveResult>;
  deleteCaseStudy: (id: string) => Promise<SaveResult>;

  brands: BrandItem[];
  saveBrand: (item: BrandItem) => Promise<SaveResult>;
  deleteBrand: (id: string) => Promise<SaveResult>;

  products: ProductItem[];
  saveProduct: (item: ProductItem) => Promise<SaveResult>;
  deleteProduct: (id: string) => Promise<SaveResult>;
  duplicateProduct: (id: string) => Promise<SaveResult>;

  productCategories: ProductCategory[];
  updateProductCategories: (items: ProductCategory[]) => Promise<SaveResult>;
  saveProductCategory: (item: ProductCategory) => Promise<SaveResult>;
  deleteProductCategory: (id: string) => Promise<SaveResult>;

  articles: ArticleItem[];
  saveArticle: (item: ArticleItem) => Promise<SaveResult>;
  deleteArticle: (id: string) => Promise<SaveResult>;
  duplicateArticle: (id: string) => Promise<SaveResult>;

  locations: LocationItem[];
  updateLocations: (items: LocationItem[]) => Promise<SaveResult>;
  saveLocation: (item: LocationItem) => Promise<SaveResult>;
  deleteLocation: (id: string) => Promise<SaveResult>;

  faqs: FAQGroup[];
  updateFAQs: (items: FAQGroup[]) => Promise<SaveResult>;
  saveFAQ: (item: FAQGroup) => Promise<SaveResult>;
  deleteFAQ: (id: string) => Promise<SaveResult>;

  navItems: NavItem[];
  updateNavItems: (items: NavItem[]) => Promise<SaveResult>;
  saveNavItem: (item: NavItem) => Promise<SaveResult>;
  deleteNavItem: (id: string) => Promise<SaveResult>;

  bookingLeads: BookingLead[];
  addBookingLead: (lead: Omit<BookingLead, "id" | "createdAt" | "status">) => void;
  updateBookingLeadStatus: (id: string, status: BookingLead["status"]) => void;
  clearBookingLeads: () => void;

  cart: CartItem[];
  addToCart: (product: ProductItem, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Convenience aliases for pages
  siteInfo: SiteConfig;
  addLead: (lead: { name: string; phone: string; service?: string; facility?: string; date?: string; time?: string; note?: string }) => BookingLead;
  openCart: (productIdOrItem?: string | ProductItem, quantity?: number) => void;

  resetToDefaults: () => void;
  exportJSON: () => string;
  importJSON: (jsonString: string) => { success: boolean; message: string };

  // Neon Database & API Sync
  dbStatus: 'connected' | 'syncing' | 'error' | 'local';
  syncStatus: 'saved' | 'saving' | 'unsaved';
  adminToken: string;
  setAdminToken: (token: string) => void;
  saveKeyToNeon: (key: string, data: any, moduleName?: string, actionTitle?: string) => Promise<SaveResult>;
  syncAllToNeon: () => Promise<{ success: boolean; message: string }>;
  refreshFromNeon: () => Promise<{ success: boolean; message: string }>;
  clearLocalCache: () => void;
}

const DemoDataContext = createContext<DemoDataContextType | undefined>(undefined);

const STORAGE_PREFIX = "LBC_DEMO_";

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    if (!item) return defaultValue;
    const parsed = JSON.parse(item);
    if (Array.isArray(defaultValue) && (!Array.isArray(parsed) || parsed.length === 0)) {
      return defaultValue;
    }
    if (key === "siteConfig" && typeof defaultValue === "object" && defaultValue !== null) {
      return {
        ...defaultValue,
        ...parsed
      };
    }
    return parsed;
  } catch (e) {
    console.error(`Failed to load ${key} from localStorage`, e);
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error(`Failed to save ${key} to localStorage`, e);
  }
}

export const DemoDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => loadFromStorage("siteConfig", initialSiteConfig));
  const [homepageModules, setHomepageModules] = useState<HomepageModuleConfig[]>(() => loadFromStorage("homepageModules", initialHomepageModules));
  const [heroSlides, setHeroSlides] = useState<SlideItem[]>(() => loadFromStorage("heroSlides", initialHeroSlides));
  const [heroSliderSettings, setHeroSliderSettings] = useState<HeroSliderSettings>(() => loadFromStorage("heroSliderSettings", defaultHeroSliderSettings));
  const [sideBanners, setSideBanners] = useState<SideBanner[]>(() => loadFromStorage("sideBanners", initialSideBanners));
  const [coreValues, setCoreValues] = useState<CoreValue[]>(() => loadFromStorage("coreValues", initialCoreValues));
  const [specialties, setSpecialties] = useState<Specialty[]>(() => loadFromStorage("specialties", initialSpecialties));
  const [services, setServices] = useState<ServiceItem[]>(() => loadFromStorage("services", initialServices));
  const [doctors, setDoctors] = useState<DoctorProfile[]>(() => loadFromStorage("doctors", initialDoctors));
  const [technologies, setTechnologies] = useState<TechnologyItem[]>(() => loadFromStorage("technologies", initialTechnologies));
  const [caseStudies, setCaseStudies] = useState<CaseStudyItem[]>(() => loadFromStorage("caseStudies", initialCaseStudies));
  const [brands, setBrands] = useState<BrandItem[]>(() => loadFromStorage("brands", initialBrands));
  const [products, setProducts] = useState<ProductItem[]>(() => loadFromStorage("products", initialProducts));
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(() => loadFromStorage("productCategories", initialProductCategories));
  const [articles, setArticles] = useState<ArticleItem[]>(() => loadFromStorage("articles", initialArticles));
  const [locations, setLocations] = useState<LocationItem[]>(() => loadFromStorage("locations", initialLocations));
  const [faqs, setFaqs] = useState<FAQGroup[]>(() => loadFromStorage("faqs", initialFAQs));
  const [navItems, setNavItems] = useState<NavItem[]>(() => loadFromStorage("navItems", initialNavItems));
  const [pagesConfig, setPagesConfig] = useState<Record<string, PageBannerConfig>>(() => loadFromStorage("pagesConfig", initialPagesConfig));
  const [bookingLeads, setBookingLeads] = useState<BookingLead[]>(() => loadFromStorage("bookingLeads", []));
  const [cart, setCart] = useState<CartItem[]>(() => loadFromStorage("cart", []));
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Neon PostgreSQL Database Status
  const [dbStatus, setDbStatus] = useState<'connected' | 'syncing' | 'error' | 'local'>('local');
  const [syncStatus, setSyncStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [adminToken, setAdminTokenState] = useState<string>(() => {
    return localStorage.getItem('LBC_ADMIN_TOKEN') || 'lbc_admin_secret_998877';
  });

  const setAdminToken = (token: string) => {
    setAdminTokenState(token);
    localStorage.setItem('LBC_ADMIN_TOKEN', token);
  };

  const isHydratedRef = useRef(false);

  // 1. Core Persistence Engine: Save directly to Neon PostgreSQL first
  const saveKeyToNeon = async (
    key: string, 
    data: any, 
    moduleName?: string, 
    actionTitle?: string
  ): Promise<SaveResult> => {
    try {
      setSyncStatus('saving');
      const token = localStorage.getItem('LBC_ADMIN_TOKEN') || adminToken || 'lbc_admin_secret_998877';
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ key, data, moduleName, actionTitle })
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        const errMsg = errJson.message || errJson.error || `Lỗi máy chủ HTTP ${res.status}`;
        console.error(`Save ${key} to Neon failed:`, errMsg);
        setSyncStatus('unsaved');
        return { success: false, error: errMsg, key };
      }

      setSyncStatus('saved');
      setDbStatus('connected');
      // Save to localStorage mirror after successful backend write
      saveToStorage(key, data);
      return { success: true, key };
    } catch (e: any) {
      console.error(`Sync ${key} to Neon network error:`, e);
      setSyncStatus('unsaved');
      return { success: false, error: e.message || 'Lỗi kết nối máy chủ', key };
    }
  };

  // 2. Hydrate/refresh all content directly from Neon PostgreSQL
  const refreshFromNeon = async (): Promise<{ success: boolean; message: string }> => {
    try {
      setDbStatus('syncing');
      const res = await fetch('/api/content?_t=' + Date.now(), { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data && typeof data === 'object') {
        if (data.siteConfig) {
          setSiteConfig(data.siteConfig);
          saveToStorage("siteConfig", data.siteConfig);
        }
        if (data.homepageModules) {
          setHomepageModules(data.homepageModules);
          saveToStorage("homepageModules", data.homepageModules);
        }
        if (data.heroSlides) {
          setHeroSlides(data.heroSlides);
          saveToStorage("heroSlides", data.heroSlides);
        }
        if (data.heroSliderSettings) {
          const merged = { ...defaultHeroSliderSettings, ...data.heroSliderSettings };
          setHeroSliderSettings(merged);
          saveToStorage("heroSliderSettings", merged);
        }
        if (data.sideBanners) {
          setSideBanners(data.sideBanners);
          saveToStorage("sideBanners", data.sideBanners);
        }
        if (data.coreValues) {
          setCoreValues(data.coreValues);
          saveToStorage("coreValues", data.coreValues);
        }
        if (data.specialties) {
          setSpecialties(data.specialties);
          saveToStorage("specialties", data.specialties);
        }
        if (data.services) {
          setServices(data.services);
          saveToStorage("services", data.services);
        }
        if (data.doctors) {
          setDoctors(data.doctors);
          saveToStorage("doctors", data.doctors);
        }
        if (data.technologies) {
          setTechnologies(data.technologies);
          saveToStorage("technologies", data.technologies);
        }
        if (data.caseStudies) {
          setCaseStudies(data.caseStudies);
          saveToStorage("caseStudies", data.caseStudies);
        }
        if (data.brands) {
          setBrands(data.brands);
          saveToStorage("brands", data.brands);
        }
        if (data.products) {
          setProducts(data.products);
          saveToStorage("products", data.products);
        }
        if (data.productCategories) {
          setProductCategories(data.productCategories);
          saveToStorage("productCategories", data.productCategories);
        }
        if (data.articles) {
          setArticles(data.articles);
          saveToStorage("articles", data.articles);
        }
        if (data.locations) {
          setLocations(data.locations);
          saveToStorage("locations", data.locations);
        }
        if (data.faqs) {
          setFaqs(data.faqs);
          saveToStorage("faqs", data.faqs);
        }
        if (data.navItems) {
          setNavItems(data.navItems);
          saveToStorage("navItems", data.navItems);
        }
        if (data.pagesConfig) {
          setPagesConfig(data.pagesConfig);
          saveToStorage("pagesConfig", data.pagesConfig);
        }
        setDbStatus('connected');
        setSyncStatus('saved');
        return { success: true, message: "Đã làm mới dữ liệu thành công từ Neon PostgreSQL!" };
      }
      throw new Error("Dữ liệu nhận được không hợp lệ");
    } catch (e: any) {
      console.warn('Neon DB hydration fallback to local storage:', e);
      setDbStatus('local');
      return { success: false, message: `Không thể kết nối Neon: ${e.message}` };
    } finally {
      isHydratedRef.current = true;
    }
  };

  const clearLocalCache = () => {
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(STORAGE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
      window.location.reload();
    } catch (e) {
      console.error("Failed to clear local cache", e);
    }
  };

  useEffect(() => {
    refreshFromNeon();
  }, []);

  // Multi-tab storage synchronization
  useEffect(() => {
    const handleStorageEvent = (e: StorageEvent) => {
      if (!e.key || !e.newValue) return;
      try {
        if (e.key === STORAGE_PREFIX + "siteConfig") setSiteConfig(JSON.parse(e.newValue));
        else if (e.key === STORAGE_PREFIX + "homepageModules") setHomepageModules(JSON.parse(e.newValue));
        else if (e.key === STORAGE_PREFIX + "heroSlides") setHeroSlides(JSON.parse(e.newValue));
        else if (e.key === STORAGE_PREFIX + "heroSliderSettings") setHeroSliderSettings(JSON.parse(e.newValue));
        else if (e.key === STORAGE_PREFIX + "doctors") setDoctors(JSON.parse(e.newValue));
        else if (e.key === STORAGE_PREFIX + "services") setServices(JSON.parse(e.newValue));
        else if (e.key === STORAGE_PREFIX + "products") setProducts(JSON.parse(e.newValue));
      } catch {}
    };
    window.addEventListener("storage", handleStorageEvent);
    return () => window.removeEventListener("storage", handleStorageEvent);
  }, []);

  // Update favicon in browser tab dynamically
  useEffect(() => {
    const faviconHref = siteConfig.faviconUrl || siteConfig.favicon;
    if (faviconHref) {
      let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.getElementsByTagName("head")[0].appendChild(link);
      }
      link.href = faviconHref;
    }
  }, [siteConfig.faviconUrl, siteConfig.favicon]);

  // =========================================================================
  // ATOMIC UPDATER FUNCTIONS: Save to Neon first, then update state & storage
  // =========================================================================

  const updateSiteConfig = async (newConfig: Partial<SiteConfig>): Promise<SaveResult> => {
    const merged: SiteConfig = { ...siteConfig, ...newConfig };
    if (newConfig.logoUrl !== undefined) merged.logoHeader = newConfig.logoUrl;
    if (newConfig.logoHeader !== undefined) merged.logoUrl = newConfig.logoHeader;
    if (newConfig.logoFooterUrl !== undefined) merged.logoFooter = newConfig.logoFooterUrl;
    if (newConfig.logoFooter !== undefined) merged.logoFooterUrl = newConfig.logoFooter;
    if (newConfig.faviconUrl !== undefined) merged.favicon = newConfig.faviconUrl;
    if (newConfig.favicon !== undefined) merged.faviconUrl = newConfig.favicon;

    const result = await saveKeyToNeon("siteConfig", merged, "Hệ thống", "Cấu hình thương hiệu");
    if (result.success) {
      setSiteConfig(merged);
      logAuditAction("Hệ thống", "update", "Cấu hình thương hiệu", "Cập nhật logo và thông tin nhận diện");
    }
    return result;
  };

  const toggleHomepageModule = async (id: string): Promise<SaveResult> => {
    const updated = homepageModules.map(mod => mod.id === id ? { ...mod, enabled: !mod.enabled } : mod);
    const result = await saveKeyToNeon("homepageModules", updated, "Trang chủ", `Bật/tắt section ${id}`);
    if (result.success) {
      setHomepageModules(updated);
    }
    return result;
  };

  const reorderHomepageModules = async (newModules: HomepageModuleConfig[]): Promise<SaveResult> => {
    const result = await saveKeyToNeon("homepageModules", newModules, "Trang chủ", "Sắp xếp lại các Section");
    if (result.success) {
      setHomepageModules(newModules);
    }
    return result;
  };

  const updateHomepageModule = async (moduleOrId: string | HomepageModuleConfig, updates?: Partial<HomepageModuleConfig>): Promise<SaveResult> => {
    let next: HomepageModuleConfig[];
    let targetName = "";
    if (typeof moduleOrId === "object") {
      next = homepageModules.map(mod => mod.id === moduleOrId.id ? { ...mod, ...moduleOrId } : mod);
      targetName = moduleOrId.name;
    } else {
      next = homepageModules.map(mod => mod.id === moduleOrId ? { ...mod, ...(updates || {}) } : mod);
      targetName = moduleOrId;
    }
    const result = await saveKeyToNeon("homepageModules", next, "Trang chủ", `Cập nhật section ${targetName}`);
    if (result.success) {
      setHomepageModules(next);
      logAuditAction("Trang chủ", "update", targetName, "Cập nhật cấu hình section");
    }
    return result;
  };

  const updateHeroSliderSettings = async (settings: Partial<HeroSliderSettings>): Promise<SaveResult> => {
    const next: HeroSliderSettings = { ...heroSliderSettings, ...settings };
    const result = await saveKeyToNeon("heroSliderSettings", next, "Hero Banner", "Cấu hình chuyển slide");
    if (result.success) {
      setHeroSliderSettings(next);
      logAuditAction(
        "Hero Banner",
        "update",
        "Thời gian chuyển slide",
        `Tự động: ${next.autoplayEnabled ? 'Bật' : 'Tắt'}, Thời gian: ${next.autoplayInterval}s/slide`
      );
    }
    return result;
  };

  const saveSlide = async (item: SlideItem): Promise<SaveResult> => {
    const idx = heroSlides.findIndex(s => s.id === item.id);
    const next = idx >= 0 ? [...heroSlides] : [...heroSlides, item];
    if (idx >= 0) next[idx] = item;
    const result = await saveKeyToNeon("heroSlides", next, "Hero Banner", `Slide: ${item.title}`);
    if (result.success) {
      setHeroSlides(next);
      logAuditAction("Hero Banner", idx >= 0 ? "update" : "create", item.title || item.id, "Lưu slide hero");
    }
    return result;
  };

  const updateHeroSlides = async (slides: SlideItem[]): Promise<SaveResult> => {
    const result = await saveKeyToNeon("heroSlides", slides, "Hero Banner", "Cập nhật danh sách slide");
    if (result.success) {
      setHeroSlides(slides);
    }
    return result;
  };

  const deleteSlide = async (id: string): Promise<SaveResult> => {
    const next = heroSlides.filter(s => s.id !== id);
    const result = await saveKeyToNeon("heroSlides", next, "Hero Banner", "Xóa slide");
    if (result.success) {
      setHeroSlides(next);
      logAuditAction("Hero Banner", "delete", id, "Xóa slide hero");
    }
    return result;
  };

  const duplicateSlide = async (id: string): Promise<SaveResult> => {
    const found = heroSlides.find(s => s.id === id);
    if (!found) return { success: false, error: "Không tìm thấy slide" };
    const duplicated: SlideItem = {
      ...found,
      id: "slide-" + Date.now(),
      title: `${found.title} (Bản sao)`,
      badge: `${found.badge} [Copy]`
    };
    const next = [...heroSlides, duplicated];
    const result = await saveKeyToNeon("heroSlides", next, "Hero Banner", "Nhân bản slide hero");
    if (result.success) {
      setHeroSlides(next);
      logAuditAction("Hero Banner", "create", duplicated.title, "Nhân bản slide hero");
    }
    return result;
  };

  const saveSideBanner = async (item: SideBanner): Promise<SaveResult> => {
    const idx = sideBanners.findIndex(b => b.id === item.id);
    const next = idx >= 0 ? [...sideBanners] : [...sideBanners, item];
    if (idx >= 0) next[idx] = item;
    const result = await saveKeyToNeon("sideBanners", next, "Banner phụ", `Banner phụ: ${item.title}`);
    if (result.success) {
      setSideBanners(next);
      logAuditAction("Banner phụ", idx >= 0 ? "update" : "create", item.title || item.id, "Lưu banner phụ");
    }
    return result;
  };

  const updateSideBanners = async (banners: SideBanner[]): Promise<SaveResult> => {
    const result = await saveKeyToNeon("sideBanners", banners, "Banner phụ", "Cập nhật danh sách banner phụ");
    if (result.success) {
      setSideBanners(banners);
    }
    return result;
  };

  const deleteSideBanner = async (id: string): Promise<SaveResult> => {
    const next = sideBanners.filter(b => b.id !== id);
    const result = await saveKeyToNeon("sideBanners", next, "Banner phụ", "Xóa banner phụ");
    if (result.success) {
      setSideBanners(next);
      logAuditAction("Banner phụ", "delete", id, "Xóa banner phụ");
    }
    return result;
  };

  const saveCoreValue = async (item: CoreValue): Promise<SaveResult> => {
    const idx = coreValues.findIndex(v => v.id === item.id);
    const next = idx >= 0 ? [...coreValues] : [...coreValues, item];
    if (idx >= 0) next[idx] = item;
    const result = await saveKeyToNeon("coreValues", next, "Giá trị cốt lõi", `Giá trị: ${item.title}`);
    if (result.success) {
      setCoreValues(next);
      logAuditAction("Giá trị cốt lõi", idx >= 0 ? "update" : "create", item.title, "Lưu thẻ giá trị");
    }
    return result;
  };

  const updateCoreValues = async (values: CoreValue[]): Promise<SaveResult> => {
    const result = await saveKeyToNeon("coreValues", values, "Giá trị cốt lõi", "Cập nhật thứ tự thẻ giá trị");
    if (result.success) {
      setCoreValues(values);
    }
    return result;
  };

  const deleteCoreValue = async (id: string): Promise<SaveResult> => {
    const next = coreValues.filter(v => v.id !== id);
    const result = await saveKeyToNeon("coreValues", next, "Giá trị cốt lõi", "Xóa thẻ giá trị");
    if (result.success) {
      setCoreValues(next);
      logAuditAction("Giá trị cốt lõi", "delete", id, "Xóa thẻ giá trị");
    }
    return result;
  };

  const saveSpecialty = async (item: Specialty): Promise<SaveResult> => {
    const idx = specialties.findIndex(s => s.id === item.id);
    const next = idx >= 0 ? [...specialties] : [...specialties, item];
    if (idx >= 0) next[idx] = item;
    const result = await saveKeyToNeon("specialties", next, "Chuyên khoa", `Chuyên khoa: ${item.name}`);
    if (result.success) {
      setSpecialties(next);
      logAuditAction("Chuyên khoa", idx >= 0 ? "update" : "create", item.name, "Lưu chuyên khoa");
    }
    return result;
  };

  const updateSpecialties = async (items: Specialty[]): Promise<SaveResult> => {
    const result = await saveKeyToNeon("specialties", items, "Chuyên khoa", "Cập nhật danh sách chuyên khoa");
    if (result.success) {
      setSpecialties(items);
    }
    return result;
  };

  const deleteSpecialty = async (id: string): Promise<SaveResult> => {
    const next = specialties.filter(s => s.id !== id);
    const result = await saveKeyToNeon("specialties", next, "Chuyên khoa", "Xóa chuyên khoa");
    if (result.success) {
      setSpecialties(next);
      logAuditAction("Chuyên khoa", "delete", id, "Xóa chuyên khoa");
    }
    return result;
  };

  const saveService = async (item: ServiceItem): Promise<SaveResult> => {
    const idx = services.findIndex(s => s.id === item.id);
    const next = idx >= 0 ? [...services] : [...services, item];
    if (idx >= 0) next[idx] = item;
    const result = await saveKeyToNeon("services", next, "Dịch vụ", `Dịch vụ: ${item.name}`);
    if (result.success) {
      setServices(next);
      logAuditAction("Dịch vụ", idx >= 0 ? "update" : "create", item.name, "Lưu dịch vụ y khoa");
    }
    return result;
  };

  const deleteService = async (id: string): Promise<SaveResult> => {
    const next = services.filter(s => s.id !== id);
    const result = await saveKeyToNeon("services", next, "Dịch vụ", "Xóa dịch vụ");
    if (result.success) {
      setServices(next);
      logAuditAction("Dịch vụ", "delete", id, "Xóa dịch vụ");
    }
    return result;
  };

  const duplicateService = async (id: string): Promise<SaveResult> => {
    const found = services.find(s => s.id === id);
    if (!found) return { success: false, error: "Không tìm thấy dịch vụ" };
    const duplicated: ServiceItem = {
      ...found,
      id: "srv-" + Date.now(),
      name: `${found.name} (Bản sao)`,
      slug: `${found.slug}-copy-${Date.now().toString().slice(-4)}`
    };
    const next = [...services, duplicated];
    const result = await saveKeyToNeon("services", next, "Dịch vụ", "Nhân bản dịch vụ");
    if (result.success) {
      setServices(next);
      logAuditAction("Dịch vụ", "create", duplicated.name, "Nhân bản dịch vụ");
    }
    return result;
  };

  const saveDoctor = async (item: DoctorProfile): Promise<SaveResult> => {
    const idx = doctors.findIndex(d => d.id === item.id);
    const next = idx >= 0 ? [...doctors] : [...doctors, item];
    if (idx >= 0) next[idx] = item;
    const result = await saveKeyToNeon("doctors", next, "Bác sĩ", `Hồ sơ: ${item.formalTitle}`);
    if (result.success) {
      setDoctors(next);
      logAuditAction("Bác sĩ", idx >= 0 ? "update" : "create", item.name, `Lưu hồ sơ ${item.formalTitle}`);
    }
    return result;
  };

  const deleteDoctor = async (id: string): Promise<SaveResult> => {
    const next = doctors.filter(d => d.id !== id);
    const result = await saveKeyToNeon("doctors", next, "Bác sĩ", "Xóa hồ sơ bác sĩ");
    if (result.success) {
      setDoctors(next);
      logAuditAction("Bác sĩ", "delete", id, "Xóa hồ sơ bác sĩ");
    }
    return result;
  };

  const duplicateDoctor = async (id: string): Promise<SaveResult> => {
    const found = doctors.find(d => d.id === id);
    if (!found) return { success: false, error: "Không tìm thấy bác sĩ" };
    const duplicated: DoctorProfile = {
      ...found,
      id: "doc-" + Date.now(),
      name: `${found.name} (Bản sao)`,
      formalTitle: `${found.formalTitle} (Bản sao)`,
      slug: `bs-${found.slug.replace(/^bs-/, '')}-copy`
    };
    const next = [...doctors, duplicated];
    const result = await saveKeyToNeon("doctors", next, "Bác sĩ", "Nhân bản hồ sơ bác sĩ");
    if (result.success) {
      setDoctors(next);
      logAuditAction("Bác sĩ", "create", duplicated.name, "Nhân bản hồ sơ bác sĩ");
    }
    return result;
  };

  const saveTechnology = async (item: TechnologyItem): Promise<SaveResult> => {
    const idx = technologies.findIndex(t => t.id === item.id);
    const next = idx >= 0 ? [...technologies] : [...technologies, item];
    if (idx >= 0) next[idx] = item;
    const result = await saveKeyToNeon("technologies", next, "Công nghệ", `Thiết bị: ${item.name}`);
    if (result.success) {
      setTechnologies(next);
      logAuditAction("Công nghệ", idx >= 0 ? "update" : "create", item.name, "Lưu công nghệ");
    }
    return result;
  };

  const deleteTechnology = async (id: string): Promise<SaveResult> => {
    const next = technologies.filter(t => t.id !== id);
    const result = await saveKeyToNeon("technologies", next, "Công nghệ", "Xóa công nghệ");
    if (result.success) {
      setTechnologies(next);
      logAuditAction("Công nghệ", "delete", id, "Xóa công nghệ");
    }
    return result;
  };

  const saveCaseStudy = async (item: CaseStudyItem): Promise<SaveResult> => {
    const idx = caseStudies.findIndex(c => c.id === item.id);
    const next = idx >= 0 ? [...caseStudies] : [...caseStudies, item];
    if (idx >= 0) next[idx] = item;
    const result = await saveKeyToNeon("caseStudies", next, "Before-After", `Ca lâm sàng: ${item.serviceName} (${item.customerInitial})`);
    if (result.success) {
      setCaseStudies(next);
      logAuditAction("Before-After", idx >= 0 ? "update" : "create", item.serviceName, "Lưu ca lâm sàng");
    }
    return result;
  };

  const deleteCaseStudy = async (id: string): Promise<SaveResult> => {
    const next = caseStudies.filter(c => c.id !== id);
    const result = await saveKeyToNeon("caseStudies", next, "Before-After", "Xóa ca lâm sàng");
    if (result.success) {
      setCaseStudies(next);
      logAuditAction("Before-After", "delete", id, "Xóa ca lâm sàng");
    }
    return result;
  };

  const saveBrand = async (item: BrandItem): Promise<SaveResult> => {
    const idx = brands.findIndex(b => b.id === item.id);
    const next = idx >= 0 ? [...brands] : [...brands, item];
    if (idx >= 0) next[idx] = item;
    const result = await saveKeyToNeon("brands", next, "Thương hiệu", `Đối tác: ${item.name}`);
    if (result.success) {
      setBrands(next);
      logAuditAction("Thương hiệu", idx >= 0 ? "update" : "create", item.name, "Lưu thương hiệu");
    }
    return result;
  };

  const deleteBrand = async (id: string): Promise<SaveResult> => {
    const next = brands.filter(b => b.id !== id);
    const result = await saveKeyToNeon("brands", next, "Thương hiệu", "Xóa thương hiệu");
    if (result.success) {
      setBrands(next);
      logAuditAction("Thương hiệu", "delete", id, "Xóa thương hiệu");
    }
    return result;
  };

  const saveProduct = async (item: ProductItem): Promise<SaveResult> => {
    const idx = products.findIndex(p => p.id === item.id);
    const next = idx >= 0 ? [...products] : [...products, item];
    if (idx >= 0) next[idx] = item;
    const result = await saveKeyToNeon("products", next, "Sản phẩm", `Dược mỹ phẩm: ${item.name}`);
    if (result.success) {
      setProducts(next);
      logAuditAction("Sản phẩm", idx >= 0 ? "update" : "create", item.name, `Lưu sản phẩm (${item.price.toLocaleString("vi-VN")} ₫)`);
    }
    return result;
  };

  const deleteProduct = async (id: string): Promise<SaveResult> => {
    const next = products.filter(p => p.id !== id);
    const result = await saveKeyToNeon("products", next, "Sản phẩm", "Xóa sản phẩm");
    if (result.success) {
      setProducts(next);
      logAuditAction("Sản phẩm", "delete", id, "Xóa sản phẩm");
    }
    return result;
  };

  const duplicateProduct = async (id: string): Promise<SaveResult> => {
    const found = products.find(p => p.id === id);
    if (!found) return { success: false, error: "Không tìm thấy sản phẩm" };
    const duplicated: ProductItem = {
      ...found,
      id: "prd-" + Date.now(),
      name: `${found.name} (Bản sao)`,
      sku: `${found.sku}-COPY`,
      slug: `${found.slug}-copy-${Date.now().toString().slice(-4)}`
    };
    const next = [...products, duplicated];
    const result = await saveKeyToNeon("products", next, "Sản phẩm", "Nhân bản sản phẩm");
    if (result.success) {
      setProducts(next);
      logAuditAction("Sản phẩm", "create", duplicated.name, "Nhân bản sản phẩm");
    }
    return result;
  };

  const saveProductCategory = async (item: ProductCategory): Promise<SaveResult> => {
    const idx = productCategories.findIndex(c => c.id === item.id);
    const next = idx >= 0 ? [...productCategories] : [...productCategories, item];
    if (idx >= 0) next[idx] = item;
    const result = await saveKeyToNeon("productCategories", next, "Danh mục sản phẩm", `Danh mục: ${item.name}`);
    if (result.success) {
      setProductCategories(next);
      logAuditAction("Danh mục sản phẩm", idx >= 0 ? "update" : "create", item.name, "Lưu danh mục sản phẩm");
    }
    return result;
  };

  const updateProductCategories = async (items: ProductCategory[]): Promise<SaveResult> => {
    const result = await saveKeyToNeon("productCategories", items, "Danh mục sản phẩm", "Cập nhật danh mục sản phẩm");
    if (result.success) {
      setProductCategories(items);
    }
    return result;
  };

  const deleteProductCategory = async (id: string): Promise<SaveResult> => {
    const next = productCategories.filter(c => c.id !== id);
    const result = await saveKeyToNeon("productCategories", next, "Danh mục sản phẩm", "Xóa danh mục");
    if (result.success) {
      setProductCategories(next);
      logAuditAction("Danh mục sản phẩm", "delete", id, "Xóa danh mục");
    }
    return result;
  };

  const saveArticle = async (item: ArticleItem): Promise<SaveResult> => {
    const idx = articles.findIndex(a => a.id === item.id);
    const next = idx >= 0 ? [...articles] : [...articles, item];
    if (idx >= 0) next[idx] = item;
    const result = await saveKeyToNeon("articles", next, "Tin tức", `Bài viết: ${item.title}`);
    if (result.success) {
      setArticles(next);
      logAuditAction("Tin tức & Bài viết", idx >= 0 ? "update" : "create", item.title, "Lưu bài viết y khoa");
    }
    return result;
  };

  const deleteArticle = async (id: string): Promise<SaveResult> => {
    const next = articles.filter(a => a.id !== id);
    const result = await saveKeyToNeon("articles", next, "Tin tức", "Xóa bài viết");
    if (result.success) {
      setArticles(next);
      logAuditAction("Tin tức & Bài viết", "delete", id, "Xóa bài viết");
    }
    return result;
  };

  const duplicateArticle = async (id: string): Promise<SaveResult> => {
    const found = articles.find(a => a.id === id);
    if (!found) return { success: false, error: "Không tìm thấy bài viết" };
    const duplicated: ArticleItem = {
      ...found,
      id: "art-" + Date.now(),
      title: `${found.title} (Bản sao)`,
      slug: `${found.slug}-copy-${Date.now().toString().slice(-4)}`,
      publishedDate: new Date().toLocaleDateString("vi-VN")
    };
    const next = [...articles, duplicated];
    const result = await saveKeyToNeon("articles", next, "Tin tức", "Nhân bản bài viết");
    if (result.success) {
      setArticles(next);
      logAuditAction("Tin tức & Bài viết", "create", duplicated.title, "Nhân bản bài viết");
    }
    return result;
  };

  const saveLocation = async (item: LocationItem): Promise<SaveResult> => {
    const idx = locations.findIndex(l => l.id === item.id);
    const next = idx >= 0 ? [...locations] : [...locations, item];
    if (idx >= 0) next[idx] = item;
    const result = await saveKeyToNeon("locations", next, "Cơ sở", `Chi nhánh: ${item.name}`);
    if (result.success) {
      setLocations(next);
      logAuditAction("Hệ thống cơ sở", idx >= 0 ? "update" : "create", item.name, "Lưu cơ sở phòng khám");
    }
    return result;
  };

  const updateLocations = async (items: LocationItem[]): Promise<SaveResult> => {
    const result = await saveKeyToNeon("locations", items, "Cơ sở", "Cập nhật danh sách cơ sở");
    if (result.success) {
      setLocations(items);
    }
    return result;
  };

  const deleteLocation = async (id: string): Promise<SaveResult> => {
    const next = locations.filter(l => l.id !== id);
    const result = await saveKeyToNeon("locations", next, "Cơ sở", "Xóa cơ sở");
    if (result.success) {
      setLocations(next);
      logAuditAction("Hệ thống cơ sở", "delete", id, "Xóa cơ sở phòng khám");
    }
    return result;
  };

  const saveFAQ = async (item: FAQGroup): Promise<SaveResult> => {
    const idx = faqs.findIndex(f => f.id === item.id);
    const next = idx >= 0 ? [...faqs] : [...faqs, item];
    if (idx >= 0) next[idx] = item;
    const result = await saveKeyToNeon("faqs", next, "FAQ", `Nhóm câu hỏi: ${item.groupTitle}`);
    if (result.success) {
      setFaqs(next);
      logAuditAction("FAQ", idx >= 0 ? "update" : "create", item.groupTitle, "Lưu nhóm FAQ");
    }
    return result;
  };

  const updateFAQs = async (items: FAQGroup[]): Promise<SaveResult> => {
    const result = await saveKeyToNeon("faqs", items, "FAQ", "Cập nhật danh sách FAQ");
    if (result.success) {
      setFaqs(items);
    }
    return result;
  };

  const deleteFAQ = async (id: string): Promise<SaveResult> => {
    const next = faqs.filter(f => f.id !== id);
    const result = await saveKeyToNeon("faqs", next, "FAQ", "Xóa nhóm FAQ");
    if (result.success) {
      setFaqs(next);
      logAuditAction("FAQ", "delete", id, "Xóa nhóm FAQ");
    }
    return result;
  };

  const saveNavItem = async (item: NavItem): Promise<SaveResult> => {
    const idx = navItems.findIndex(n => n.id === item.id);
    const next = idx >= 0 ? [...navItems] : [...navItems, item];
    if (idx >= 0) next[idx] = item;
    const result = await saveKeyToNeon("navItems", next, "Menu", `Menu: ${item.title}`);
    if (result.success) {
      setNavItems(next);
      logAuditAction("Menu & Điều hướng", idx >= 0 ? "update" : "create", item.title, "Lưu mục menu");
    }
    return result;
  };

  const updateNavItems = async (items: NavItem[]): Promise<SaveResult> => {
    const result = await saveKeyToNeon("navItems", items, "Menu", "Cập nhật menu điều hướng");
    if (result.success) {
      setNavItems(items);
    }
    return result;
  };

  const deleteNavItem = async (id: string): Promise<SaveResult> => {
    const next = navItems.filter(n => n.id !== id);
    const result = await saveKeyToNeon("navItems", next, "Menu", "Xóa mục menu");
    if (result.success) {
      setNavItems(next);
      logAuditAction("Menu & Điều hướng", "delete", id, "Xóa mục menu");
    }
    return result;
  };

  const updatePagesConfig = async (configs: Record<string, PageBannerConfig>): Promise<SaveResult> => {
    const result = await saveKeyToNeon("pagesConfig", configs, "Quản lý Trang", "Cập nhật cấu hình banner các trang");
    if (result.success) {
      setPagesConfig(configs);
    }
    return result;
  };

  const updatePageConfig = async (pageId: string, partial: Partial<PageBannerConfig>): Promise<SaveResult> => {
    const current = pagesConfig[pageId] || initialPagesConfig[pageId] || {
      id: pageId,
      pageName: pageId,
      routePath: `/${pageId}`,
      enabled: true,
      badge: "",
      title: "",
      description: "",
      desktopImage: "",
      overlayOpacity: 70,
      overlayColor: "dark" as const,
      alignment: "center" as const
    };
    const updated = {
      ...pagesConfig,
      [pageId]: {
        ...current,
        ...partial
      }
    };
    const result = await saveKeyToNeon("pagesConfig", updated, "Quản lý Trang", `Cập nhật banner trang ${pageId}`);
    if (result.success) {
      setPagesConfig(updated);
      logAuditAction("Quản lý Trang", "update", current.pageName || pageId, `Cập nhật cấu hình banner trang ${pageId}`);
    }
    return result;
  };

  // Booking leads (separate endpoint /api/leads)
  const addBookingLead = (lead: Omit<BookingLead, "id" | "createdAt" | "status">) => {
    const newLead: BookingLead = {
      ...lead,
      id: "lead-" + Date.now(),
      createdAt: new Date().toLocaleString("vi-VN"),
      status: "new"
    };
    setBookingLeads(prev => [newLead, ...prev]);

    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLead)
    }).catch(e => console.warn('Failed to post lead to Neon:', e));

    return newLead;
  };

  const addLead = (lead: { name: string; phone: string; service?: string; facility?: string; date?: string; time?: string; note?: string }): BookingLead => {
    const newLead: BookingLead = {
      id: "lead-" + Date.now(),
      fullName: lead.name,
      phone: lead.phone,
      facility: lead.facility || "Cơ sở 01 Cần Thơ",
      serviceInterest: lead.service || "Khám da liễu",
      preferredDateTime: `${lead.date || ""} ${lead.time || ""}`.trim() || "Thỏa thuận",
      notes: lead.note || "",
      consentAgreed: true,
      createdAt: new Date().toLocaleString("vi-VN"),
      status: "new"
    };
    setBookingLeads(prev => [newLead, ...prev]);

    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLead)
    }).catch(e => console.warn('Failed to post lead to Neon:', e));

    return newLead;
  };

  const openCart = (productIdOrItem?: string | ProductItem, quantity = 1) => {
    if (productIdOrItem) {
      if (typeof productIdOrItem === "string") {
        const found = products.find(p => p.id === productIdOrItem || p.slug === productIdOrItem);
        if (found) addToCart(found, quantity);
      } else {
        addToCart(productIdOrItem, quantity);
      }
    }
    setIsCartOpen(true);
  };

  const updateBookingLeadStatus = (id: string, status: BookingLead["status"]) => {
    setBookingLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const clearBookingLeads = () => {
    setBookingLeads([]);
  };

  const addToCart = (product: ProductItem, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => item.product.id === productId ? { ...item, quantity } : item)
    );
  };

  const clearCart = () => setCart([]);

  const resetToDefaults = () => {
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(k);
      }
    });
    setSiteConfig(initialSiteConfig);
    setHomepageModules(initialHomepageModules);
    setHeroSlides(initialHeroSlides);
    setSideBanners(initialSideBanners);
    setCoreValues(initialCoreValues);
    setSpecialties(initialSpecialties);
    setServices(initialServices);
    setDoctors(initialDoctors);
    setTechnologies(initialTechnologies);
    setCaseStudies(initialCaseStudies);
    setBrands(initialBrands);
    setProducts(initialProducts);
    setArticles(initialArticles);
    setLocations(initialLocations);
    setFaqs(initialFAQs);
    setNavItems(initialNavItems);
    setBookingLeads([]);
    setCart([]);
  };

  const exportJSON = (): string => {
    const dump = {
      siteConfig,
      homepageModules,
      heroSlides,
      sideBanners,
      coreValues,
      specialties,
      services,
      doctors,
      technologies,
      caseStudies,
      brands,
      products,
      productCategories,
      articles,
      locations,
      faqs,
      navItems,
      bookingLeads
    };
    return JSON.stringify(dump, null, 2);
  };

  const importJSON = (jsonString: string): { success: boolean; message: string } => {
    try {
      const data = JSON.parse(jsonString);
      if (data.siteConfig) setSiteConfig(data.siteConfig);
      if (data.homepageModules) setHomepageModules(data.homepageModules);
      if (data.heroSlides) setHeroSlides(data.heroSlides);
      if (data.sideBanners) setSideBanners(data.sideBanners);
      if (data.coreValues) setCoreValues(data.coreValues);
      if (data.specialties) setSpecialties(data.specialties);
      if (data.services) setServices(data.services);
      if (data.doctors) setDoctors(data.doctors);
      if (data.technologies) setTechnologies(data.technologies);
      if (data.caseStudies) setCaseStudies(data.caseStudies);
      if (data.brands) setBrands(data.brands);
      if (data.products) setProducts(data.products);
      if (data.productCategories) setProductCategories(data.productCategories);
      if (data.articles) setArticles(data.articles);
      if (data.locations) setLocations(data.locations);
      if (data.faqs) setFaqs(data.faqs);
      if (data.navItems) setNavItems(data.navItems);
      if (data.bookingLeads) setBookingLeads(data.bookingLeads);
      return { success: true, message: "Đã nhập dữ liệu thành công!" };
    } catch (e: any) {
      return { success: false, message: `Lỗi định dạng JSON: ${e?.message || "Không hợp lệ"}` };
    }
  };

  const syncAllToNeon = async (): Promise<{ success: boolean; message: string }> => {
    try {
      setSyncStatus('saving');
      const token = localStorage.getItem('LBC_ADMIN_TOKEN') || adminToken || 'lbc_admin_secret_998877';
      const payload: Record<string, any> = {
        siteConfig,
        homepageModules,
        heroSlides,
        sideBanners,
        coreValues,
        specialties,
        services,
        doctors,
        technologies,
        caseStudies,
        brands,
        products,
        productCategories,
        articles,
        locations,
        faqs,
        navItems,
        pagesConfig
      };

      let allSuccess = true;
      for (const [key, data] of Object.entries(payload)) {
        const res = await fetch('/api/content', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ key, data, moduleName: "Đồng bộ hệ thống", actionTitle: `Đồng bộ ${key}` })
        });
        if (!res.ok) allSuccess = false;
      }

      if (allSuccess) {
        setSyncStatus('saved');
        setDbStatus('connected');
        return { success: true, message: "Toàn bộ dữ liệu đã được lưu trữ an toàn trên Neon PostgreSQL!" };
      } else {
        setSyncStatus('unsaved');
        return { success: false, message: "Một số module không thể đồng bộ lên Neon. Vui lòng kiểm tra quyền hoặc kết nối." };
      }
    } catch (e: any) {
      setSyncStatus('unsaved');
      return { success: false, message: `Lỗi đồng bộ Neon: ${e?.message || "Không thể kết nối"}` };
    }
  };

  return (
    <DemoDataContext.Provider
      value={{
        siteConfig,
        updateSiteConfig,
        homepageModules,
        toggleHomepageModule,
        reorderHomepageModules,
        updateHomepageModule,
        heroSlides,
        updateHeroSlides,
        saveSlide,
        deleteSlide,
        duplicateSlide,
        heroSliderSettings,
        updateHeroSliderSettings,
        sideBanners,
        updateSideBanners,
        saveSideBanner,
        deleteSideBanner,
        coreValues,
        updateCoreValues,
        saveCoreValue,
        deleteCoreValue,
        pagesConfig,
        updatePagesConfig,
        updatePageConfig,
        specialties,
        updateSpecialties,
        saveSpecialty,
        deleteSpecialty,
        services,
        saveService,
        deleteService,
        duplicateService,
        doctors,
        saveDoctor,
        deleteDoctor,
        duplicateDoctor,
        technologies,
        saveTechnology,
        deleteTechnology,
        caseStudies,
        saveCaseStudy,
        deleteCaseStudy,
        brands,
        saveBrand,
        deleteBrand,
        products,
        saveProduct,
        deleteProduct,
        duplicateProduct,
        productCategories,
        updateProductCategories,
        saveProductCategory,
        deleteProductCategory,
        articles,
        saveArticle,
        deleteArticle,
        duplicateArticle,
        locations,
        updateLocations,
        saveLocation,
        deleteLocation,
        faqs,
        updateFAQs,
        saveFAQ,
        deleteFAQ,
        navItems,
        updateNavItems,
        saveNavItem,
        deleteNavItem,
        bookingLeads,
        addBookingLead,
        updateBookingLeadStatus,
        clearBookingLeads,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        siteInfo: siteConfig,
        addLead,
        openCart,
        resetToDefaults,
        exportJSON,
        importJSON,
        dbStatus,
        syncStatus,
        adminToken,
        setAdminToken,
        saveKeyToNeon,
        syncAllToNeon,
        refreshFromNeon,
        clearLocalCache
      }}
    >
      {children}
    </DemoDataContext.Provider>
  );
};

export const useDemoData = (): DemoDataContextType => {
  const context = useContext(DemoDataContext);
  if (!context) {
    throw new Error("useDemoData must be used within a DemoDataProvider");
  }
  return context;
};
