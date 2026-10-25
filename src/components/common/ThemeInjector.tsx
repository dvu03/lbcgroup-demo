import React, { useEffect } from 'react';
import { useDemoData } from '../../context/DemoDataContext';
import { defaultThemeConfig } from '../../data/siteConfig';

export const ThemeInjector: React.FC = () => {
  const { siteConfig } = useDemoData();

  useEffect(() => {
    const theme = {
      ...defaultThemeConfig,
      ...(siteConfig.theme || {}),
      // Fallback for direct top-level fields
      primaryColor: siteConfig.primaryColor || siteConfig.theme?.primaryColor || defaultThemeConfig.primaryColor,
      secondaryColor: siteConfig.secondaryColor || siteConfig.theme?.secondaryColor || defaultThemeConfig.secondaryColor,
      fontHeading: siteConfig.fontHeading || siteConfig.theme?.fontHeading || defaultThemeConfig.fontHeading,
      fontBody: siteConfig.fontBody || siteConfig.theme?.fontBody || defaultThemeConfig.fontBody,
    };

    const root = document.documentElement;

    // 1. Inject Typography
    if (theme.fontHeading) root.style.setProperty('--font-heading', theme.fontHeading);
    if (theme.fontBody) root.style.setProperty('--font-body', theme.fontBody);
    if (theme.fontSizeBase) root.style.setProperty('--font-size-base', `${theme.fontSizeBase}px`);
    if (theme.fontSizeH1) root.style.setProperty('--heading-h1-size', theme.fontSizeH1);
    if (theme.fontSizeH2) root.style.setProperty('--heading-h2-size', theme.fontSizeH2);
    if (theme.fontSizeH3) root.style.setProperty('--heading-h3-size', theme.fontSizeH3);
    if (theme.lineHeightBase) root.style.setProperty('--line-height-base', `${theme.lineHeightBase}`);
    if (theme.letterSpacingHeading) root.style.setProperty('--letter-spacing-heading', theme.letterSpacingHeading);

    // 2. Inject Colors
    if (theme.primaryColor) root.style.setProperty('--primary', theme.primaryColor);
    if (theme.primaryHoverColor) root.style.setProperty('--primary-hover', theme.primaryHoverColor);
    if (theme.primaryLightColor) root.style.setProperty('--primary-light', theme.primaryLightColor);
    if (theme.textColorMain) root.style.setProperty('--text-charcoal', theme.textColorMain);
    if (theme.textColorMuted) root.style.setProperty('--text-muted', theme.textColorMuted);

    // 3. Inject Layout & Dimensions
    if (theme.containerMaxWidth) root.style.setProperty('--container-max-width', theme.containerMaxWidth);
    if (theme.cardBorderRadius) root.style.setProperty('--radius-card', theme.cardBorderRadius);
    if (theme.buttonBorderRadius) root.style.setProperty('--radius-btn', theme.buttonBorderRadius);

    // 4. Update Favicon dynamically
    const faviconUrl = siteConfig.faviconUrl || siteConfig.favicon;
    if (faviconUrl) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = faviconUrl;
    }
  }, [siteConfig]);

  return null;
};
