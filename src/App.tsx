import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";

// Named export pages
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { FacilitiesPage } from "./pages/FacilitiesPage";
import { LicensesPage } from "./pages/LicensesPage";
import { CareersPage } from "./pages/CareersPage";
import { SpecialtyDetailPage } from "./pages/SpecialtyDetailPage";
import { ServicesListPage } from "./pages/ServicesListPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { DoctorsListPage } from "./pages/DoctorsListPage";
import { DoctorDetailPage } from "./pages/DoctorDetailPage";
import { TechnologiesListPage } from "./pages/TechnologiesListPage";
import { TechnologyDetailPage } from "./pages/TechnologyDetailPage";
import { BeforeAfterPage } from "./pages/BeforeAfterPage";
import { CosmeceuticalsPage } from "./pages/CosmeceuticalsPage";

// Default export pages
import BrandDetailPage from "./pages/BrandDetailPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import NewsListPage from "./pages/NewsListPage";
import NewsDetailPage from "./pages/NewsDetailPage";
import ContactPage from "./pages/ContactPage";
import BookingPage from "./pages/BookingPage";
import FAQPage from "./pages/FAQPage";
import PolicyPage from "./pages/PolicyPage";
import SearchPage from "./pages/SearchPage";
import DemoAdminPage from "./pages/DemoAdminPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Homepage */}
          <Route index element={<HomePage />} />

          {/* About & Facilities Group */}
          <Route path="gioi-thieu" element={<AboutPage />} />
          <Route path="he-thong-co-so" element={<FacilitiesPage />} />
          <Route path="giay-phep-hoat-dong" element={<LicensesPage />} />
          <Route path="tuyen-dung" element={<CareersPage />} />

          {/* Specialties (5 Ecosystem Pillars) */}
          <Route path="khoa-da-lieu" element={<SpecialtyDetailPage forcedSlug="khoa-da-lieu" />} />
          <Route path="khoa-xet-nghiem" element={<SpecialtyDetailPage forcedSlug="khoa-xet-nghiem" />} />
          <Route path="nha-thuoc" element={<SpecialtyDetailPage forcedSlug="nha-thuoc" />} />
          <Route path="duoc-my-pham-chuyen-khoa" element={<SpecialtyDetailPage forcedSlug="duoc-my-pham" />} />
          <Route path="dao-tao" element={<SpecialtyDetailPage forcedSlug="dao-tao" />} />
          <Route path="chuyen-khoa/:slug" element={<SpecialtyDetailPage />} />

          {/* Treatment Services (Sheet 1) */}
          <Route path="dich-vu" element={<ServicesListPage />} />
          <Route path="dich-vu/:slug" element={<ServiceDetailPage />} />
          <Route path="dieu-tri-mun" element={<ServiceDetailPage forcedSlug="dieu-tri-mun" />} />
          <Route path="dieu-tri-seo" element={<ServiceDetailPage forcedSlug="dieu-tri-seo" />} />
          <Route path="dieu-tri-nam-tan-nhang" element={<ServiceDetailPage forcedSlug="dieu-tri-nam-tan-nhang" />} />
          <Route path="dieu-tri-rung-toc" element={<ServiceDetailPage forcedSlug="dieu-tri-rung-toc" />} />
          <Route path="tham-my-noi-khoa" element={<ServiceDetailPage forcedSlug="tham-my-noi-khoa" />} />
          <Route path="nang-co" element={<ServiceDetailPage forcedSlug="nang-co" />} />
          <Route path="cham-soc-da-chuyen-sau" element={<ServiceDetailPage forcedSlug="cham-soc-da-chuyen-sau" />} />
          <Route path="benh-da-lieu-khac" element={<ServiceDetailPage forcedSlug="benh-da-lieu-khac" />} />
          <Route path="triet-long" element={<ServiceDetailPage forcedSlug="triet-long" />} />

          {/* Doctors Team */}
          <Route path="doi-ngu-bac-si" element={<DoctorsListPage />} />
          <Route path="bac-si/:slug" element={<DoctorDetailPage />} />
          <Route path="bs/:slug" element={<DoctorDetailPage />} />

          {/* Technologies */}
          <Route path="cong-nghe" element={<TechnologiesListPage />} />
          <Route path="cong-nghe/:slug" element={<TechnologyDetailPage />} />

          {/* Before & After Cases (Sheet 1 row 28) */}
          <Route path="ket-qua-dieu-tri" element={<BeforeAfterPage />} />
          <Route path="before-after" element={<Navigate to="/ket-qua-dieu-tri" replace />} />
          <Route path="nguoi-that-viec-that" element={<Navigate to="/ket-qua-dieu-tri" replace />} />

          {/* Cosmeceuticals, Brands & Products */}
          <Route path="duoc-my-pham" element={<CosmeceuticalsPage />} />
          <Route path="thuong-hieu/:slug" element={<BrandDetailPage />} />
          <Route path="san-pham/:slug" element={<ProductDetailPage />} />

          {/* News & Medical Knowledge */}
          <Route path="tin-tuc" element={<NewsListPage />} />
          <Route path="tin-tuc/:slug" element={<NewsDetailPage />} />

          {/* Contact, Booking & FAQs */}
          <Route path="lien-he" element={<ContactPage />} />
          <Route path="dat-lich-kham" element={<BookingPage />} />
          <Route path="cau-hoi-thuong-gap" element={<FAQPage />} />

          {/* Legal & Compliance Policies */}
          <Route path="chinh-sach/:slug" element={<PolicyPage />} />
          <Route path="chinh-sach-bao-mat" element={<PolicyPage />} />
          <Route path="chinh-sach-thanh-toan" element={<PolicyPage />} />
          <Route path="chinh-sach-giao-hang" element={<PolicyPage />} />
          <Route path="chinh-sach-doi-tra" element={<PolicyPage />} />
          <Route path="dieu-khoan-su-dung" element={<PolicyPage />} />

          {/* Universal Search */}
          <Route path="tim-kiem" element={<SearchPage />} />
          <Route path="search" element={<SearchPage />} />

          {/* Demo Admin Management Portal */}
          <Route path="demo-admin" element={<DemoAdminPage />} />

          {/* Direct Profile Route by slug (e.g. /bs-lac-kim-ngan) */}
          <Route path=":slug" element={<DoctorDetailPage />} />

          {/* 404 Not Found */}
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
