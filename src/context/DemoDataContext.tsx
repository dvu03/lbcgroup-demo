import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { initialSiteConfig, SiteConfig } from '../data/siteConfig';
import { initialHomepageModules, HomepageModuleConfig } from '../data/homepageModules';
import { initialHeroSlides, initialSideBanners, SlideItem, SideBanner } from '../data/heroSlider';
import { initialCoreValues, CoreValue } from '../data/coreValues';
import { initialPagesConfig, PageBannerConfig } from '../data/pagesConfig';
import { initialSpecialties, Specialty } from '../data/specialties';
import { initialServices, ServiceItem } from '../data/services';
import { initialDoctors, DoctorProfile } from '../data/doctors';
import { initialTechnologies, TechnologyItem } from '../data/technologies';
import { initialCaseStudies, CaseStudyItem } from '../data/caseStudies';
import { initialBrands, BrandItem } from '../data/brands';
import { initialProducts, ProductItem } from '../data/products';
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

interface DemoDataContextType {
  siteConfig: SiteConfig;
  updateSiteConfig: (newConfig: Partial<SiteConfig>) => void;
  
  homepageModules: HomepageModuleConfig[];
  toggleHomepageModule: (id: string) => void;
  reorderHomepageModules: (newModules: HomepageModuleConfig[]) => void;
  updateHomepageModule: (moduleOrId: string | HomepageModuleConfig, updates?: Partial<HomepageModuleConfig>) => void;

  heroSlides: SlideItem[];
  updateHeroSlides: (slides: SlideItem[]) => void;
  saveSlide: (item: SlideItem) => void;
  deleteSlide: (id: string) => void;
  duplicateSlide: (id: string) => void;

  sideBanners: SideBanner[];
  updateSideBanners: (banners: SideBanner[]) => void;
  saveSideBanner: (banner: SideBanner) => void;
  deleteSideBanner: (id: string) => void;

  coreValues: CoreValue[];
  updateCoreValues: (values: CoreValue[]) => void;
  saveCoreValue: (item: CoreValue) => void;
  deleteCoreValue: (id: string) => void;

  pagesConfig: Record<string, PageBannerConfig>;
  updatePagesConfig: (configs: Record<string, PageBannerConfig>) => void;
  updatePageConfig: (pageId: string, partial: Partial<PageBannerConfig>) => void;

  specialties: Specialty[];
  updateSpecialties: (items: Specialty[]) => void;
  saveSpecialty: (item: Specialty) => void;
  deleteSpecialty: (id: string) => void;

  services: ServiceItem[];
  saveService: (item: ServiceItem) => void;
  deleteService: (id: string) => void;
  duplicateService: (id: string) => void;

  doctors: DoctorProfile[];
  saveDoctor: (item: DoctorProfile) => void;
  deleteDoctor: (id: string) => void;
  duplicateDoctor: (id: string) => void;

  technologies: TechnologyItem[];
  saveTechnology: (item: TechnologyItem) => void;
  deleteTechnology: (id: string) => void;

  caseStudies: CaseStudyItem[];
  saveCaseStudy: (item: CaseStudyItem) => void;
  deleteCaseStudy: (id: string) => void;

  brands: BrandItem[];
  saveBrand: (item: BrandItem) => void;
  deleteBrand: (id: string) => void;

  products: ProductItem[];
  saveProduct: (item: ProductItem) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => void;

  articles: ArticleItem[];
  saveArticle: (item: ArticleItem) => void;
  deleteArticle: (id: string) => void;
  duplicateArticle: (id: string) => void;

  locations: LocationItem[];
  updateLocations: (items: LocationItem[]) => void;
  saveLocation: (item: LocationItem) => void;
  deleteLocation: (id: string) => void;

  faqs: FAQGroup[];
  updateFAQs: (items: FAQGroup[]) => void;
  saveFAQ: (item: FAQGroup) => void;
  deleteFAQ: (id: string) => void;

  navItems: NavItem[];
  updateNavItems: (items: NavItem[]) => void;
  saveNavItem: (item: NavItem) => void;
  deleteNavItem: (id: string) => void;

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
  syncAllToNeon: () => Promise<{ success: boolean; message: string }>;
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
      const defaultObj = defaultValue as any;
      return {
        ...defaultValue,
        ...parsed,
        logoHeader: parsed.logoHeader || defaultObj.logoHeader || "/images/logo.svg",
        logoUrl: parsed.logoUrl || defaultObj.logoUrl || "/images/logo.svg",
        logoWhiteUrl: parsed.logoWhiteUrl || defaultObj.logoWhiteUrl || "/images/logo-white.svg",
        logoFooterUrl: parsed.logoFooterUrl || defaultObj.logoFooterUrl || "/images/logo-white.svg",
        bannerTopConfig: {
          ...defaultObj.bannerTopConfig,
          ...(parsed.bannerTopConfig || {})
        },
        headerMainConfig: {
          ...defaultObj.headerMainConfig,
          ...(parsed.headerMainConfig || {}),
          logoUrl: parsed.headerMainConfig?.logoUrl || defaultObj.headerMainConfig?.logoUrl || "/images/logo.svg",
          logoWhiteUrl: parsed.headerMainConfig?.logoWhiteUrl || defaultObj.headerMainConfig?.logoWhiteUrl || "/images/logo-white.svg"
        }
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
  const [sideBanners, setSideBanners] = useState<SideBanner[]>(() => loadFromStorage("sideBanners", initialSideBanners));
  const [coreValues, setCoreValues] = useState<CoreValue[]>(() => loadFromStorage("coreValues", initialCoreValues));
  const [specialties, setSpecialties] = useState<Specialty[]>(() => loadFromStorage("specialties", initialSpecialties));
  const [services, setServices] = useState<ServiceItem[]>(() => loadFromStorage("services", initialServices));
  const [doctors, setDoctors] = useState<DoctorProfile[]>(() => loadFromStorage("doctors", initialDoctors));
  const [technologies, setTechnologies] = useState<TechnologyItem[]>(() => loadFromStorage("technologies", initialTechnologies));
  const [caseStudies, setCaseStudies] = useState<CaseStudyItem[]>(() => loadFromStorage("caseStudies", initialCaseStudies));
  const [brands, setBrands] = useState<BrandItem[]>(() => loadFromStorage("brands", initialBrands));
  const [products, setProducts] = useState<ProductItem[]>(() => loadFromStorage("products", initialProducts));
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

  // 1. Hydrate all content from Neon PostgreSQL on initial load
  useEffect(() => {
    let active = true;
    async function hydrateFromNeon() {
      try {
        setDbStatus('syncing');
        const res = await fetch('/api/content');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (active && data && typeof data === 'object') {
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
          if (data.articles) setArticles(data.articles);
          if (data.locations) setLocations(data.locations);
          if (data.faqs) setFaqs(data.faqs);
          if (data.navItems) setNavItems(data.navItems);
          if (data.pagesConfig) setPagesConfig(data.pagesConfig);
          setDbStatus('connected');
          setSyncStatus('saved');
        }
      } catch (e) {
        console.warn('Neon DB hydration fallback to local storage:', e);
        setDbStatus('local');
      } finally {
        isHydratedRef.current = true;
      }
    }
    hydrateFromNeon();
    return () => { active = false; };
  }, []);

  // 2. Helper to sync any module to Neon
  const saveKeyToNeon = async (key: string, data: any, moduleName?: string, actionTitle?: string) => {
    if (!isHydratedRef.current) return;
    try {
      setSyncStatus('saving');
      const token = localStorage.getItem('LBC_ADMIN_TOKEN') || adminToken;
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ key, data, moduleName, actionTitle })
      });
      if (res.ok) {
        setSyncStatus('saved');
        setDbStatus('connected');
      } else {
        setSyncStatus('unsaved');
      }
    } catch (e) {
      console.warn(`Sync ${key} to Neon failed:`, e);
      setSyncStatus('unsaved');
    }
  };

  // Sync to localStorage
  useEffect(() => saveToStorage("siteConfig", siteConfig), [siteConfig]);
  useEffect(() => saveToStorage("homepageModules", homepageModules), [homepageModules]);
  useEffect(() => saveToStorage("heroSlides", heroSlides), [heroSlides]);
  useEffect(() => saveToStorage("sideBanners", sideBanners), [sideBanners]);
  useEffect(() => saveToStorage("coreValues", coreValues), [coreValues]);
  useEffect(() => saveToStorage("specialties", specialties), [specialties]);
  useEffect(() => saveToStorage("services", services), [services]);
  useEffect(() => saveToStorage("doctors", doctors), [doctors]);
  useEffect(() => saveToStorage("technologies", technologies), [technologies]);
  useEffect(() => saveToStorage("caseStudies", caseStudies), [caseStudies]);
  useEffect(() => saveToStorage("brands", brands), [brands]);
  useEffect(() => saveToStorage("products", products), [products]);
  useEffect(() => saveToStorage("articles", articles), [articles]);
  useEffect(() => saveToStorage("locations", locations), [locations]);
  useEffect(() => saveToStorage("faqs", faqs), [faqs]);
  useEffect(() => saveToStorage("navItems", navItems), [navItems]);
  useEffect(() => saveToStorage("pagesConfig", pagesConfig), [pagesConfig]);
  useEffect(() => saveToStorage("bookingLeads", bookingLeads), [bookingLeads]);
  useEffect(() => saveToStorage("cart", cart), [cart]);

  // Sync to Neon PostgreSQL whenever state updates after hydration
  useEffect(() => { if (isHydratedRef.current) saveKeyToNeon("siteConfig", siteConfig, "Hệ thống", "Cấu hình chung"); }, [siteConfig]);
  useEffect(() => { if (isHydratedRef.current) saveKeyToNeon("homepageModules", homepageModules, "Trang chủ", "Bố cục Section"); }, [homepageModules]);
  useEffect(() => { if (isHydratedRef.current) saveKeyToNeon("heroSlides", heroSlides, "Hero Banner", "Slide chính"); }, [heroSlides]);
  useEffect(() => { if (isHydratedRef.current) saveKeyToNeon("sideBanners", sideBanners, "Hero Banner", "Banner phụ"); }, [sideBanners]);
  useEffect(() => { if (isHydratedRef.current) saveKeyToNeon("coreValues", coreValues, "Giá trị cốt lõi", "Cốt lõi"); }, [coreValues]);
  useEffect(() => { if (isHydratedRef.current) saveKeyToNeon("specialties", specialties, "Chuyên khoa", "Danh mục chuyên khoa"); }, [specialties]);
  useEffect(() => { if (isHydratedRef.current) saveKeyToNeon("services", services, "Dịch vụ", "Danh mục dịch vụ"); }, [services]);
  useEffect(() => { if (isHydratedRef.current) saveKeyToNeon("doctors", doctors, "Đội ngũ Bác sĩ", "Hồ sơ bác sĩ"); }, [doctors]);
  useEffect(() => { if (isHydratedRef.current) saveKeyToNeon("technologies", technologies, "Công nghệ", "Thiết bị y tế"); }, [technologies]);
  useEffect(() => { if (isHydratedRef.current) saveKeyToNeon("caseStudies", caseStudies, "Before-After", "Ca lâm sàng"); }, [caseStudies]);
  useEffect(() => { if (isHydratedRef.current) saveKeyToNeon("brands", brands, "Thương hiệu", "Đối tác thương hiệu"); }, [brands]);
  useEffect(() => { if (isHydratedRef.current) saveKeyToNeon("products", products, "Dược mỹ phẩm", "Sản phẩm"); }, [products]);
  useEffect(() => { if (isHydratedRef.current) saveKeyToNeon("articles", articles, "Tin tức & Y khoa", "Bài viết chuyên môn"); }, [articles]);
  useEffect(() => { if (isHydratedRef.current) saveKeyToNeon("locations", locations, "Cơ sở", "Chi nhánh"); }, [locations]);
  useEffect(() => { if (isHydratedRef.current) saveKeyToNeon("faqs", faqs, "Câu hỏi thường gặp", "FAQ"); }, [faqs]);
  useEffect(() => { if (isHydratedRef.current) saveKeyToNeon("navItems", navItems, "Menu", "Menu điều hướng"); }, [navItems]);
  useEffect(() => { if (isHydratedRef.current) saveKeyToNeon("pagesConfig", pagesConfig, "Quản lý Trang", "Cấu hình Banner & Trang"); }, [pagesConfig]);

  // Multi-tab storage synchronization
  useEffect(() => {
    const handleStorageEvent = (e: StorageEvent) => {
      if (!e.key || !e.newValue) return;
      if (e.key === STORAGE_PREFIX + "siteConfig") {
        try {
          setSiteConfig(JSON.parse(e.newValue));
        } catch {}
      } else if (e.key === STORAGE_PREFIX + "homepageModules") {
        try {
          setHomepageModules(JSON.parse(e.newValue));
        } catch {}
      } else if (e.key === STORAGE_PREFIX + "heroSlides") {
        try {
          setHeroSlides(JSON.parse(e.newValue));
        } catch {}
      } else if (e.key === STORAGE_PREFIX + "doctors") {
        try {
          setDoctors(JSON.parse(e.newValue));
        } catch {}
      } else if (e.key === STORAGE_PREFIX + "services") {
        try {
          setServices(JSON.parse(e.newValue));
        } catch {}
      } else if (e.key === STORAGE_PREFIX + "products") {
        try {
          setProducts(JSON.parse(e.newValue));
        } catch {}
      }
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

  // Updater functions
  const updateSiteConfig = (newConfig: Partial<SiteConfig>) => {
    setSiteConfig(prev => {
      const merged: SiteConfig = { ...prev, ...newConfig };
      // Keep aliases in perfect sync
      if (newConfig.logoUrl !== undefined) merged.logoHeader = newConfig.logoUrl;
      if (newConfig.logoHeader !== undefined) merged.logoUrl = newConfig.logoHeader;
      if (newConfig.logoFooterUrl !== undefined) merged.logoFooter = newConfig.logoFooterUrl;
      if (newConfig.logoFooter !== undefined) merged.logoFooterUrl = newConfig.logoFooter;
      if (newConfig.faviconUrl !== undefined) merged.favicon = newConfig.faviconUrl;
      if (newConfig.favicon !== undefined) merged.faviconUrl = newConfig.favicon;
      
      logAuditAction("Hệ thống", "update", "Cấu hình thương hiệu", "Cập nhật logo và thông tin nhận diện");
      return merged;
    });
  };

  const toggleHomepageModule = (id: string) => {
    setHomepageModules(prev =>
      prev.map(mod => mod.id === id ? { ...mod, enabled: !mod.enabled } : mod)
    );
  };

  const reorderHomepageModules = (newModules: HomepageModuleConfig[]) => {
    setHomepageModules(newModules);
  };

  const updateHomepageModule = (moduleOrId: string | HomepageModuleConfig, updates?: Partial<HomepageModuleConfig>) => {
    if (typeof moduleOrId === "object") {
      setHomepageModules(prev =>
        prev.map(mod => mod.id === moduleOrId.id ? { ...mod, ...moduleOrId } : mod)
      );
      logAuditAction("Trang chủ", "update", moduleOrId.name, "Cập nhật cấu hình section");
    } else {
      setHomepageModules(prev =>
        prev.map(mod => mod.id === moduleOrId ? { ...mod, ...(updates || {}) } : mod)
      );
      logAuditAction("Trang chủ", "update", moduleOrId, "Cập nhật cấu hình section");
    }
  };

  // Slide & Banner CMS methods
  const saveSlide = (item: SlideItem) => {
    setHeroSlides(prev => {
      const idx = prev.findIndex(s => s.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = item;
        logAuditAction("Hero Banner", "update", item.title || item.badge || item.id, "Cập nhật slide hero");
        return next;
      }
      logAuditAction("Hero Banner", "create", item.title || item.badge || item.id, "Thêm mới slide hero");
      return [...prev, item];
    });
  };

  const deleteSlide = (id: string) => {
    setHeroSlides(prev => {
      const found = prev.find(s => s.id === id);
      logAuditAction("Hero Banner", "delete", found?.title || id, "Xóa slide hero");
      return prev.filter(s => s.id !== id);
    });
  };

  const duplicateSlide = (id: string) => {
    const found = heroSlides.find(s => s.id === id);
    if (!found) return;
    const duplicated: SlideItem = {
      ...found,
      id: "slide-" + Date.now(),
      title: `${found.title} (Bản sao)`,
      badge: `${found.badge} [Copy]`
    };
    setHeroSlides(prev => [...prev, duplicated]);
    logAuditAction("Hero Banner", "create", duplicated.title, "Nhân bản slide hero");
  };

  const saveSideBanner = (item: SideBanner) => {
    setSideBanners(prev => {
      const idx = prev.findIndex(b => b.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = item;
        logAuditAction("Banner phụ", "update", item.title || item.id, "Cập nhật banner phụ");
        return next;
      }
      logAuditAction("Banner phụ", "create", item.title || item.id, "Thêm banner phụ");
      return [...prev, item];
    });
  };

  const deleteSideBanner = (id: string) => {
    setSideBanners(prev => prev.filter(b => b.id !== id));
    logAuditAction("Banner phụ", "delete", id, "Xóa banner phụ");
  };

  const saveCoreValue = (item: CoreValue) => {
    setCoreValues(prev => {
      const idx = prev.findIndex(v => v.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = item;
        logAuditAction("Giá trị cốt lõi", "update", item.title, "Cập nhật thẻ giá trị");
        return next;
      }
      logAuditAction("Giá trị cốt lõi", "create", item.title, "Thêm thẻ giá trị mới");
      return [...prev, item];
    });
  };

  const deleteCoreValue = (id: string) => {
    setCoreValues(prev => {
      const found = prev.find(v => v.id === id);
      logAuditAction("Giá trị cốt lõi", "delete", found?.title || id, "Xóa thẻ giá trị");
      return prev.filter(v => v.id !== id);
    });
  };

  const saveSpecialty = (item: Specialty) => {
    setSpecialties(prev => {
      const idx = prev.findIndex(s => s.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = item;
        logAuditAction("Chuyên khoa", "update", item.name, "Cập nhật chuyên khoa");
        return next;
      }
      logAuditAction("Chuyên khoa", "create", item.name, "Thêm chuyên khoa mới");
      return [...prev, item];
    });
  };

  const deleteSpecialty = (id: string) => {
    setSpecialties(prev => {
      const found = prev.find(s => s.id === id);
      logAuditAction("Chuyên khoa", "delete", found?.name || id, "Xóa chuyên khoa");
      return prev.filter(s => s.id !== id);
    });
  };

  const saveService = (item: ServiceItem) => {
    setServices(prev => {
      const idx = prev.findIndex(s => s.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = item;
        logAuditAction("Dịch vụ", "update", item.name, "Cập nhật dịch vụ y khoa");
        return next;
      }
      logAuditAction("Dịch vụ", "create", item.name, "Thêm dịch vụ điều trị mới");
      return [...prev, item];
    });
  };

  const deleteService = (id: string) => {
    setServices(prev => {
      const found = prev.find(s => s.id === id);
      logAuditAction("Dịch vụ", "delete", found?.name || id, "Xóa dịch vụ");
      return prev.filter(s => s.id !== id);
    });
  };

  const duplicateService = (id: string) => {
    const found = services.find(s => s.id === id);
    if (!found) return;
    const duplicated: ServiceItem = {
      ...found,
      id: "srv-" + Date.now(),
      name: `${found.name} (Bản sao)`,
      slug: `${found.slug}-copy-${Date.now().toString().slice(-4)}`
    };
    setServices(prev => [...prev, duplicated]);
    logAuditAction("Dịch vụ", "create", duplicated.name, "Nhân bản dịch vụ");
  };

  const saveDoctor = (item: DoctorProfile) => {
    setDoctors(prev => {
      const idx = prev.findIndex(d => d.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = item;
        logAuditAction("Bác sĩ", "update", item.name, `Cập nhật hồ sơ ${item.formalTitle}`);
        return next;
      }
      logAuditAction("Bác sĩ", "create", item.name, `Thêm mới hồ sơ bác sĩ ${item.name}`);
      return [...prev, item];
    });
  };

  const deleteDoctor = (id: string) => {
    setDoctors(prev => {
      const found = prev.find(d => d.id === id);
      logAuditAction("Bác sĩ", "delete", found?.name || id, "Xóa hồ sơ bác sĩ");
      return prev.filter(d => d.id !== id);
    });
  };

  const duplicateDoctor = (id: string) => {
    const found = doctors.find(d => d.id === id);
    if (!found) return;
    const duplicated: DoctorProfile = {
      ...found,
      id: "doc-" + Date.now(),
      name: `${found.name} (Bản sao)`,
      formalTitle: `${found.formalTitle} (Bản sao)`,
      slug: `bs-${found.slug.replace(/^bs-/, '')}-copy`
    };
    setDoctors(prev => [...prev, duplicated]);
    logAuditAction("Bác sĩ", "create", duplicated.name, "Nhân bản hồ sơ bác sĩ");
  };

  const saveTechnology = (item: TechnologyItem) => {
    setTechnologies(prev => {
      const idx = prev.findIndex(t => t.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = item;
        logAuditAction("Công nghệ", "update", item.name, "Cập nhật công nghệ thẩm mỹ");
        return next;
      }
      logAuditAction("Công nghệ", "create", item.name, "Thêm mới công nghệ thẩm mỹ");
      return [...prev, item];
    });
  };

  const deleteTechnology = (id: string) => {
    setTechnologies(prev => {
      const found = prev.find(t => t.id === id);
      logAuditAction("Công nghệ", "delete", found?.name || id, "Xóa công nghệ");
      return prev.filter(t => t.id !== id);
    });
  };

  const saveCaseStudy = (item: CaseStudyItem) => {
    setCaseStudies(prev => {
      const idx = prev.findIndex(c => c.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = item;
        logAuditAction("Before-After", "update", item.serviceName, "Cập nhật ca lâm sàng");
        return next;
      }
      logAuditAction("Before-After", "create", item.serviceName, "Thêm mới ca lâm sàng");
      return [...prev, item];
    });
  };

  const deleteCaseStudy = (id: string) => {
    setCaseStudies(prev => {
      const found = prev.find(c => c.id === id);
      logAuditAction("Before-After", "delete", found?.serviceName || id, "Xóa ca lâm sàng");
      return prev.filter(c => c.id !== id);
    });
  };

  const saveBrand = (item: BrandItem) => {
    setBrands(prev => {
      const idx = prev.findIndex(b => b.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = item;
        logAuditAction("Thương hiệu", "update", item.name, "Cập nhật thương hiệu");
        return next;
      }
      logAuditAction("Thương hiệu", "create", item.name, "Thêm thương hiệu dược mỹ phẩm");
      return [...prev, item];
    });
  };

  const deleteBrand = (id: string) => {
    setBrands(prev => {
      const found = prev.find(b => b.id === id);
      logAuditAction("Thương hiệu", "delete", found?.name || id, "Xóa thương hiệu");
      return prev.filter(b => b.id !== id);
    });
  };

  const saveProduct = (item: ProductItem) => {
    setProducts(prev => {
      const idx = prev.findIndex(p => p.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = item;
        logAuditAction("Sản phẩm", "update", item.name, `Cập nhật sản phẩm (${item.price.toLocaleString("vi-VN")} ₫)`);
        return next;
      }
      logAuditAction("Sản phẩm", "create", item.name, `Thêm mới sản phẩm ${item.name}`);
      return [...prev, item];
    });
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => {
      const found = prev.find(p => p.id === id);
      logAuditAction("Sản phẩm", "delete", found?.name || id, "Xóa sản phẩm");
      return prev.filter(p => p.id !== id);
    });
  };

  const duplicateProduct = (id: string) => {
    const found = products.find(p => p.id === id);
    if (!found) return;
    const duplicated: ProductItem = {
      ...found,
      id: "prd-" + Date.now(),
      name: `${found.name} (Bản sao)`,
      sku: `${found.sku}-COPY`,
      slug: `${found.slug}-copy-${Date.now().toString().slice(-4)}`
    };
    setProducts(prev => [...prev, duplicated]);
    logAuditAction("Sản phẩm", "create", duplicated.name, "Nhân bản sản phẩm");
  };

  const saveArticle = (item: ArticleItem) => {
    setArticles(prev => {
      const idx = prev.findIndex(a => a.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = item;
        logAuditAction("Tin tức & Bài viết", "update", item.title, "Cập nhật bài viết y khoa");
        return next;
      }
      logAuditAction("Tin tức & Bài viết", "create", item.title, "Đăng bài viết y khoa mới");
      return [...prev, item];
    });
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => {
      const found = prev.find(a => a.id === id);
      logAuditAction("Tin tức & Bài viết", "delete", found?.title || id, "Xóa bài viết");
      return prev.filter(a => a.id !== id);
    });
  };

  const duplicateArticle = (id: string) => {
    const found = articles.find(a => a.id === id);
    if (!found) return;
    const duplicated: ArticleItem = {
      ...found,
      id: "art-" + Date.now(),
      title: `${found.title} (Bản sao)`,
      slug: `${found.slug}-copy-${Date.now().toString().slice(-4)}`,
      publishedDate: new Date().toLocaleDateString("vi-VN")
    };
    setArticles(prev => [...prev, duplicated]);
    logAuditAction("Tin tức & Bài viết", "create", duplicated.title, "Nhân bản bài viết");
  };

  const saveLocation = (item: LocationItem) => {
    setLocations(prev => {
      const idx = prev.findIndex(l => l.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = item;
        logAuditAction("Hệ thống cơ sở", "update", item.name, "Cập nhật cơ sở phòng khám");
        return next;
      }
      logAuditAction("Hệ thống cơ sở", "create", item.name, "Thêm mới cơ sở phòng khám");
      return [...prev, item];
    });
  };

  const deleteLocation = (id: string) => {
    setLocations(prev => prev.filter(l => l.id !== id));
    logAuditAction("Hệ thống cơ sở", "delete", id, "Xóa cơ sở phòng khám");
  };

  const saveFAQ = (item: FAQGroup) => {
    setFaqs(prev => {
      const idx = prev.findIndex(f => f.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = item;
        logAuditAction("FAQ", "update", item.groupTitle, "Cập nhật nhóm câu hỏi");
        return next;
      }
      logAuditAction("FAQ", "create", item.groupTitle, "Thêm nhóm câu hỏi mới");
      return [...prev, item];
    });
  };

  const deleteFAQ = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
    logAuditAction("FAQ", "delete", id, "Xóa nhóm FAQ");
  };

  const saveNavItem = (item: NavItem) => {
    setNavItems(prev => {
      const idx = prev.findIndex(n => n.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = item;
        logAuditAction("Menu & Điều hướng", "update", item.title, "Cập nhật menu");
        return next;
      }
      logAuditAction("Menu & Điều hướng", "create", item.title, "Thêm mục menu mới");
      return [...prev, item];
    });
  };

  const deleteNavItem = (id: string) => {
    setNavItems(prev => prev.filter(n => n.id !== id));
    logAuditAction("Menu & Điều hướng", "delete", id, "Xóa mục menu");
  };

  const updatePageConfig = (pageId: string, partial: Partial<PageBannerConfig>) => {
    setPagesConfig(prev => {
      const current = prev[pageId] || initialPagesConfig[pageId] || {
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
        ...prev,
        [pageId]: {
          ...current,
          ...partial
        }
      };
      logAuditAction("Quản lý Trang", "update", current.pageName || pageId, `Cập nhật cấu hình banner trang ${pageId}`);
      return updated;
    });
  };

  const addBookingLead = (lead: Omit<BookingLead, "id" | "createdAt" | "status">) => {
    const newLead: BookingLead = {
      ...lead,
      id: "lead-" + Date.now(),
      createdAt: new Date().toLocaleString("vi-VN"),
      status: "new"
    };
    setBookingLeads(prev => [newLead, ...prev]);

    // Sync to Neon PostgreSQL
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

    // Sync to Neon PostgreSQL
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
      const token = localStorage.getItem('LBC_ADMIN_TOKEN') || adminToken;
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
        updateHeroSlides: setHeroSlides,
        saveSlide,
        deleteSlide,
        duplicateSlide,
        sideBanners,
        updateSideBanners: setSideBanners,
        saveSideBanner,
        deleteSideBanner,
        coreValues,
        updateCoreValues: setCoreValues,
        saveCoreValue,
        deleteCoreValue,
        pagesConfig,
        updatePagesConfig: setPagesConfig,
        updatePageConfig,
        specialties,
        updateSpecialties: setSpecialties,
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
        articles,
        saveArticle,
        deleteArticle,
        duplicateArticle,
        locations,
        updateLocations: setLocations,
        saveLocation,
        deleteLocation,
        faqs,
        updateFAQs: setFaqs,
        saveFAQ,
        deleteFAQ,
        navItems,
        updateNavItems: setNavItems,
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
        syncAllToNeon
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
