import React from 'react';

interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  light?: boolean;
  asH1?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
  light = false,
  asH1 = false
}) => {
  const alignmentClass = align === 'left' ? 'text-left items-start' : align === 'right' ? 'text-right items-end' : 'text-center items-center';
  const HeadingTag = asH1 ? 'h1' : 'h2';

  return (
    <div className={`flex flex-col mb-10 md:mb-14 ${alignmentClass} ${className}`}>
      {badge && (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 ${
          light 
            ? 'bg-white/15 text-white border border-white/20' 
            : 'bg-primary-100 text-primary-700 border border-primary-200'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-primary-600 animate-pulse"></span>
          {badge}
        </span>
      )}
      <HeadingTag className={`text-2xl sm:text-3xl md:text-4xl font-heading font-bold tracking-tight leading-tight ${
        light ? 'text-white' : 'text-slate-900'
      }`}>
        {title}
      </HeadingTag>
      {subtitle && (
        <p className={`mt-3 max-w-2xl text-sm sm:text-base leading-relaxed ${
          light ? 'text-slate-200' : 'text-slate-600'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
