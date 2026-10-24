import React, { useEffect } from 'react';
import { useDemoData } from '../../context/DemoDataContext';

interface SEOHeadProps {
  title?: string;
  description?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ title, description }) => {
  const { siteConfig } = useDemoData();

  useEffect(() => {
    const fullTitle = title 
      ? `${title} | ${siteConfig.brandName}`
      : siteConfig.seoDefault.title;
    
    document.title = fullTitle;

    // Helper to update or create meta tags
    const setMetaTag = (nameAttr: string, nameValue: string, content: string) => {
      let meta = document.querySelector(`meta[${nameAttr}="${nameValue}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(nameAttr, nameValue);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    setMetaTag("name", "description", description || siteConfig.seoDefault.description);
    setMetaTag("name", "keywords", siteConfig.seoDefault.keywords);
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description || siteConfig.seoDefault.description);
    if (siteConfig.seoDefault.ogImage) {
      setMetaTag("property", "og:image", siteConfig.seoDefault.ogImage);
    }
  }, [title, description, siteConfig]);

  return null;
};
