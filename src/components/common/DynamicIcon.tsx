import React from 'react';
import {
  // Medical & Clinical
  Stethoscope,
  FlaskConical,
  Pill,
  Microscope,
  HeartPulse,
  HeartHandshake,
  Syringe,
  Activity,
  ShieldCheck,
  ShieldAlert,
  Shield,
  Award,
  SunMedium,
  Sun,
  Feather,
  Zap,
  Sparkle,
  Sparkles,
  GraduationCap,
  Fingerprint,
  Cpu,
  CheckCircle2,
  Check,
  
  // Product & Commerce
  Droplets,
  Droplet,
  ShoppingBag,
  Tag,
  Package,
  Star,
  DollarSign,
  Flame,
  
  // Back to Top & Navigation
  ArrowUp,
  ChevronUp,
  ArrowUpCircle,
  ChevronsUp,
  MoveUp,
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Search,
  User,
  Clock,
  Phone,
  MapPin,
  Calendar,
  Layers,
  Settings,
  HelpCircle
} from 'lucide-react';

export const ICON_REGISTRY: Record<string, React.ElementType> = {
  // Medical & Clinical
  Stethoscope,
  FlaskConical,
  Pill,
  Microscope,
  HeartPulse,
  HeartHandshake,
  Syringe,
  Activity,
  ShieldCheck,
  ShieldAlert,
  Shield,
  Award,
  SunMedium,
  Sun,
  Feather,
  Zap,
  Sparkle,
  Sparkles,
  GraduationCap,
  Fingerprint,
  Cpu,
  CheckCircle2,
  Check,
  
  // Products & Categories
  Droplets,
  Droplet,
  ShoppingBag,
  Tag,
  Package,
  Star,
  DollarSign,
  Flame,
  
  // Back to Top & Navigation
  ArrowUp,
  ChevronUp,
  ArrowUpCircle,
  ChevronsUp,
  MoveUp,
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Search,
  User,
  Clock,
  Phone,
  MapPin,
  Calendar,
  Layers,
  Settings,
  HelpCircle
};

export interface DynamicIconProps {
  name?: string;
  url?: string;
  className?: string;
  size?: number;
  style?: React.CSSProperties;
  fallback?: React.ReactNode;
  alt?: string;
}

/**
 * Validates and sanitizes image / SVG URL to prevent XSS.
 * Rejects unsafe protocols (javascript:, vbscript:, data:text/html) and malicious SVG scripts.
 */
export function isSafeIconUrl(url?: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim().toLowerCase();
  
  // Disallow javascript/vbscript/html
  if (
    trimmed.startsWith('javascript:') ||
    trimmed.startsWith('vbscript:') ||
    trimmed.startsWith('data:text/html') ||
    trimmed.startsWith('data:application/javascript')
  ) {
    return false;
  }

  // If data SVG, disallow embedded scripts
  if (trimmed.startsWith('data:image/svg+xml')) {
    if (
      trimmed.includes('<script') ||
      trimmed.includes('onload=') ||
      trimmed.includes('onerror=') ||
      trimmed.includes('javascript:')
    ) {
      return false;
    }
  }

  return true;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({
  name,
  url,
  className = "w-5 h-5",
  size,
  style,
  fallback,
  alt = "icon"
}) => {
  // 1. If safe image/SVG URL is provided, render image
  if (url && isSafeIconUrl(url)) {
    return (
      <img
        src={url}
        alt={alt}
        className={`${className} object-contain inline-block shrink-0`}
        style={{
          width: size ? `${size}px` : undefined,
          height: size ? `${size}px` : undefined,
          ...style
        }}
        onError={(e) => {
          // If image fails, hide or fallback
          e.currentTarget.style.display = 'none';
        }}
      />
    );
  }

  // 2. Otherwise lookup icon from Lucide registry
  if (name && ICON_REGISTRY[name]) {
    const Component = ICON_REGISTRY[name];
    return <Component className={className} size={size} style={style} />;
  }

  // 3. Fallback
  if (fallback) {
    return <>{fallback}</>;
  }

  // Default subtle fallback icon
  return <Sparkles className={className} size={size} style={style} />;
};
