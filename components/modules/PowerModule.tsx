
import React from 'react';
import { Power } from '../../types';
import StatusCard from '../StatusCard';
import { Zap, Activity, Battery, History } from 'lucide-react';

interface Props {
  data: Power;
  theme: 'dark' | 'light';
  lang: 'en' | 'ar' | 'fr';
}

const PowerModule: React.FC<Props> = ({ data, theme, lang }) => {
  const isDark = theme === 'dark';
  const isAr = lang === 'ar';
  const isFr = lang === 'fr';
  const { generator } = data;

  const labels = {
    title: isAr ? 'أنظمة الطاقة' : (isFr ? 'Énergie' : 'Power Systems'),
    backup: isAr ? 'احتياطي الطاقة' : (isFr ? 'Réserve' : 'Backup Reserve'),
    grid: isAr ? 'الشبكة نشطة' : (isFr ? 'Réseau Actif' : 'Grid Active'),
    standby: isAr ? 'وضع الاستعداد' : (isFr ? 'En Veille' : 'Standby Mode'),
    capacity: isAr ? 'سعة الوقود' : (isFr ? 'Carburant' : 'Fuel Capacity'),
    remaining: isAr ? 'متبقي' : (isFr ? 'restant' : 'Remaining'),
    load: isAr ? 'الحمل' : (isFr ? 'Charge' : 'Load'),
    lastTest: isAr ? 'آخر اختبار' : (isFr ? 'Dernier Test' : 'Last Test'),
    diagnostic: isAr ? 'تشغيل الاختبار التشخيصي' : (isFr ? 'Lancer Diagnostic' : 'Run Diagnostic Test')
  };

  return (
    <StatusCard title={labels.title} icon={Zap} theme={theme} accentColor="amber" footer="05:00m ago">
      <div className="space-y-6 sm:space-y-8">
        {/* Main Status */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative">
              <Battery size={36} className="text-[#FCA311] sm:w-[36px] sm:h-[36px] w-[32px] h-[32px]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap size={14} className="text-[#000000]" />
              </div>
            </div>
            <div>
              <h3 className={`text-lg sm:text-xl font-bold leading-none ${isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'}`}>
                {generator.fuelLevel}%
              </h3>
              <p className="text-xs uppercase tracking-wider opacity-50 mt-1.5">{labels.backup}</p>
            </div>
          </div>
          <div className="text-right">
             <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FCA311]/10 text-[#FCA311] text-xs font-bold uppercase whitespace-nowrap">
               {labels.grid}
             </div>
             <p className="text-[10px] opacity-40 uppercase font-bold mt-1.5 whitespace-nowrap">{labels.standby}</p>
          </div>
        </div>

        {/* Fuel Level Gauge */}
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] uppercase font-bold opacity-40">
            <span>{labels.capacity}</span>
            <span>{generator.runtime} {labels.remaining}</span>
          </div>
          <div className={`h-3 w-full rounded-full overflow-hidden ${isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'}`}>
            <div 
              className="h-full bg-[#FCA311] transition-all duration-1000"
              style={{ width: `${generator.fuelLevel}%` }}
            />
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5">
           <div className={`p-4 sm:p-5 rounded-3xl ${isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'}`}>
             <div className="flex items-center gap-2 mb-2 opacity-40">
               <Activity size={14} />
               <span className="text-[10px] uppercase font-bold tracking-wider">{labels.load}</span>
             </div>
             <div className="text-lg sm:text-xl font-light tabular-nums">1.2 <span className="text-xs opacity-50">kW</span></div>
           </div>
           <div className={`p-4 sm:p-5 rounded-3xl ${isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'}`}>
             <div className="flex items-center gap-2 mb-2 opacity-40">
               <History size={14} />
               <span className="text-[10px] uppercase font-bold tracking-wider">{labels.lastTest}</span>
             </div>
             <div className="text-sm font-medium uppercase opacity-80">May 18</div>
           </div>
        </div>

        <button className={`w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] transition-all border border-current border-opacity-10 hover:border-opacity-30 ${
          isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'
        }`}>
          {labels.diagnostic}
        </button>
      </div>
    </StatusCard>
  );
};

export default PowerModule;
