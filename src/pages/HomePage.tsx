import React from 'react';
import { useDemoData } from '../context/DemoDataContext';
import { SEOHead } from '../components/common/SEOHead';
import { HeroSliderSection } from '../components/home/HeroSliderSection';
import { CoreValuesSection } from '../components/home/CoreValuesSection';
import { AboutSummarySection } from '../components/home/AboutSummarySection';
import { EcosystemSpecialtiesSection } from '../components/home/EcosystemSpecialtiesSection';
import { FeaturedServicesSection } from '../components/home/FeaturedServicesSection';
import { TechnologiesSection } from '../components/home/TechnologiesSection';
import { DoctorsSection } from '../components/home/DoctorsSection';
import { BeforeAfterSection } from '../components/home/BeforeAfterSection';
import { BrandsSection } from '../components/home/BrandsSection';
import { FeaturedProductsSection } from '../components/home/FeaturedProductsSection';
import { NewsTabsSection } from '../components/home/NewsTabsSection';
import { CustomerUtilitiesSection } from '../components/home/CustomerUtilitiesSection';

export const HomePage: React.FC = () => {
  const { homepageModules, siteConfig } = useDemoData();

  // Sort active modules according to the configurable order
  const activeModules = [...homepageModules]
    .filter(m => m.enabled)
    .sort((a, b) => a.order - b.order);

  const renderModuleComponent = (id: string) => {
    switch (id) {
      case 'hero-slider':
        return <HeroSliderSection key={id} />;
      case 'core-values':
        return <CoreValuesSection key={id} />;
      case 'about-summary':
        return <AboutSummarySection key={id} />;
      case 'ecosystem-specialties':
        return <EcosystemSpecialtiesSection key={id} />;
      case 'featured-services':
        return <FeaturedServicesSection key={id} />;
      case 'technologies-banner':
        return <TechnologiesSection key={id} />;
      case 'doctors-section':
        return <DoctorsSection key={id} />;
      case 'before-after-section':
        return <BeforeAfterSection key={id} />;
      case 'brands-section':
        return <BrandsSection key={id} />;
      case 'featured-products':
        return <FeaturedProductsSection key={id} />;
      case 'news-tabs':
        return <NewsTabsSection key={id} />;
      case 'customer-utilities':
        return <CustomerUtilitiesSection key={id} />;
      default:
        return null;
    }
  };

  return (
    <>
      <SEOHead />
      <div className="space-y-2 sm:space-y-4">
        {activeModules.map(module => renderModuleComponent(module.id))}
      </div>
    </>
  );
};
