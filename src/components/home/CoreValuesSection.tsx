import React from 'react';
import { Cpu, Fingerprint, GraduationCap, ShieldCheck } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';

export const CoreValuesSection: React.FC = () => {
  const { coreValues } = useDemoData();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-6 h-6 text-primary-600" />;
      case 'Fingerprint': return <Fingerprint className="w-6 h-6 text-primary-600" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-primary-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-primary-600" />;
      default: return <ShieldCheck className="w-6 h-6 text-primary-600" />;
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6">
        {coreValues.map((val) => (
          <div
            key={val.id}
            className="p-3.5 sm:p-5 lg:p-6 rounded-2xl bg-primary-50/50 border border-primary-100 hover:border-primary-300 hover:bg-white hover:shadow-lg transition-all duration-300 medical-card-hover group relative overflow-hidden flex flex-col justify-between"
          >
            {val.isProposed && (
              <span className="absolute top-2 right-2 px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                Đề xuất
              </span>
            )}
            <div>
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-white text-primary-600 flex items-center justify-center shadow-xs mb-3 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all">
                {getIcon(val.iconName)}
              </div>
              <h3 className="font-heading font-bold text-xs sm:text-base lg:text-lg text-slate-900 mb-1 group-hover:text-primary-700 transition-colors leading-snug">
                {val.title}
              </h3>
              <p className="text-[11px] sm:text-xs md:text-sm text-slate-600 leading-relaxed line-clamp-3 sm:line-clamp-none">
                {val.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
