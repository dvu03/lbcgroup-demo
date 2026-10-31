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

/**
 * Mapping of semantic domain icon names to Lucide icon components
 * for seamless backward and forward compatibility.
 */
export const SEMANTIC_TO_LUCIDE_MAP: Record<string, string> = {
  // A. Dermatology Services (10 Services on Homepage)
  'dermatology-acne-care': 'ShieldAlert',
  'dermatology-scar-repair': 'Activity',
  'dermatology-pigment-sun': 'SunMedium',
  'dermatology-hair-scalp': 'Feather',
  'dermatology-meso-injection': 'Syringe',
  'dermatology-lifting-contour': 'Zap',
  'dermatology-skin-facial': 'Sparkles',
  'dermatology-exam-diagnosis': 'Microscope',
  'dermatology-laser-hair-removal': 'Sparkle',
  'dermatology-visia-booking': 'CalendarCheck',

  // B. Medical & Clinic
  'medical-stethoscope': 'Stethoscope',
  'medical-heart-pulse': 'HeartPulse',
  'medical-heart-care': 'HeartHandshake',
  'medical-safety-shield': 'ShieldCheck',
  'medical-biometric': 'Fingerprint',
  'medical-file-check': 'FileCheck',
  'medical-clinical-scale': 'Scale',

  // C. Specialties Ecosystem
  'specialties-dermatology': 'Stethoscope',
  'specialties-laboratory': 'FlaskConical',
  'specialties-pharmacy': 'Pill',
  'specialties-cosmeceuticals': 'Sparkles',
  'specialties-academy': 'GraduationCap',

  // D. Technology & Equipment
  'technology-visia-3d': 'Cpu',
  'technology-rf-jovena': 'Zap',
  'technology-laser': 'Sparkle',
  'technology-hardware-specs': 'Cpu',

  // E. Laboratory
  'laboratory-microscope': 'Microscope',
  'laboratory-flask-conical': 'FlaskConical',

  // F. Pharmacy & Products
  'pharmacy-medicine': 'Pill',
  'pharmacy-cleanser-droplets': 'Droplets',
  'pharmacy-serum-droplet': 'Droplet',
  'pharmacy-shopping-bag': 'ShoppingBag',
  'pharmacy-product-tag': 'Tag',
  'pharmacy-combo-package': 'Package',
  'pharmacy-best-seller-flame': 'Flame',
  'pharmacy-quality-star': 'Star',

  // G. Academy & Training
  'academy-graduation': 'GraduationCap',
  'academy-certificate-award': 'Award',
  'academy-curriculum-book': 'BookOpen',

  // H. Doctors Team
  'doctors-specialist': 'User',
  'doctors-team-users': 'Users',
  'doctors-degree-award': 'Award',
  'doctors-verification-check': 'UserCheck',

  // I. UI & Navigation
  'navigation-menu': 'Menu',
  'navigation-close-x': 'X',
  'navigation-search': 'Search',
  'navigation-hotline-phone': 'Phone',
  'navigation-phone-call': 'PhoneCall',
  'navigation-hours-clock': 'Clock',
  'navigation-location-pin': 'MapPin',
  'navigation-appointment-calendar': 'Calendar',
  'navigation-back-to-top': 'ArrowUp',
  'navigation-arrow-right': 'ArrowRight',
  'navigation-arrow-left': 'ArrowLeft',
  'navigation-chevron-down': 'ChevronDown',
  'navigation-chevron-up': 'ChevronUp',
  'navigation-mail': 'Mail',
  'navigation-share': 'Share2',
  'navigation-globe': 'Globe',

  // J. Status & Feedback
  'status-success': 'CheckCircle2',
  'status-check': 'Check',
  'status-warning': 'AlertTriangle',
  'status-error': 'AlertCircle',
  'status-info': 'Info',
  'status-help': 'HelpCircle',
  'status-refresh-loading': 'RefreshCw',

  // K. Payment
  'payment-cash': 'DollarSign',
  'payment-credit-card': 'CreditCard',
  'payment-bank-transfer': 'Building2',

  // L. Shared CMS Utilities
  'shared-settings': 'Settings',
  'shared-edit': 'Edit',
  'shared-trash': 'Trash2',
  'shared-database': 'Database',
  'shared-upload': 'Upload',
  'shared-download': 'Download',
  'shared-eye': 'Eye',
  'shared-eye-off': 'EyeOff',
  'shared-lock': 'Lock',
  'shared-palette': 'Palette',
  'shared-filter': 'Filter',
  'shared-copy': 'Copy',
  'shared-code': 'Code',
  'shared-typography': 'Type'
};

export const DynamicIcon: React.FC<DynamicIconProps> = ({
  name,
  url,
  className = "w-5 h-5",
  size,
  style,
  fallback,
  alt = "icon"
}) => {
  // 1. Auto-resolve brand icons to assets if no explicit url is given
  const resolvedUrl = url || (name && name.startsWith('brand-') ? `/assets/icons/brand/${name}.svg` : undefined);

  // 2. If safe image/SVG URL is provided, render image
  if (resolvedUrl && isSafeIconUrl(resolvedUrl)) {
    return (
      <img
        src={resolvedUrl}
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

  // 3. Resolve semantic name to Lucide name if applicable
  const effectiveName = name ? (SEMANTIC_TO_LUCIDE_MAP[name] || name) : '';

  // 4. Lookup icon from Lucide registry
  if (effectiveName && ICON_REGISTRY[effectiveName]) {
    const Component = ICON_REGISTRY[effectiveName];
    return <Component className={className} size={size} style={style} />;
  }

  // 5. Fallback
  if (fallback) {
    return <>{fallback}</>;
  }

  // Default subtle fallback icon
  return <Sparkles className={className} size={size} style={style} />;
};
