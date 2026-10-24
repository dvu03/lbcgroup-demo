import React from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu,
  Fingerprint,
  GraduationCap,
  ShieldCheck,
  Award,
  Shield,
  HeartHandshake,
  Sparkles,
  Stethoscope,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';

export const CoreValuesSection: React.FC = () => {
  const { coreValues } = useDemoData();

  // Filter active and sort by order
  const activeValues = [...coreValues]
    .filter((v) => v.enabled !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  if (activeValues.length === 0) return null;

  const renderIcon = (iconName: string, imageUrl?: string) => {
    if (imageUrl) {
      return (
        <img
          src={imageUrl}
          alt=""
          className="w-6 h-6 object-contain"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      );
    }
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />;
      case 'Fingerprint': return <Fingerprint className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />;
      case 'Award': return <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />;
      case 'Shield': return <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />;
      case 'Stethoscope': return <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />;
      default: return <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />;
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className={`grid grid-cols-2 ${activeValues.length >= 4 ? 'lg:grid-cols-4' : activeValues.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-2.5 sm:gap-4 lg:gap-6`}>
        {activeValues.map((val) => {
          const badgeText = val.badge || (val.isProposed ? "Đề xuất" : undefined);
          const CardContent = (
            <div className="p-3.5 sm:p-5 lg:p-6 rounded-2xl bg-primary-50/50 border border-primary-100 hover:border-primary-300 hover:bg-white hover:shadow-lg transition-all duration-300 medical-card-hover group relative overflow-hidden flex flex-col justify-between h-full">
              {badgeText && (
                <span className="absolute top-2 right-2 px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                  {badgeText}
                </span>
              )}
              <div>
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-white text-primary-600 flex items-center justify-center shadow-xs mb-3 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all">
                  {renderIcon(val.iconName, val.imageUrl)}
                </div>
                <h3 className="font-heading font-bold text-xs sm:text-base lg:text-lg text-slate-900 mb-1 group-hover:text-primary-700 transition-colors leading-snug flex items-center justify-between">
                  <span>{val.title}</span>
                  {val.link && (
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-primary-600 transition-colors opacity-0 group-hover:opacity-100 shrink-0 ml-1" />
                  )}
                </h3>
                <p className="text-[11px] sm:text-xs md:text-sm text-slate-600 leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {val.description}
                </p>
              </div>
            </div>
          );

          return val.link ? (
            <Link key={val.id} to={val.link} className="block h-full">
              {CardContent}
            </Link>
          ) : (
            <div key={val.id} className="h-full">
              {CardContent}
            </div>
          );
        })}
      </div>
    </section>
  );
};
