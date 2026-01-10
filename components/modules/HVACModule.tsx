
import React from 'react';
import { HVACZone } from '../../types';
import StatusCard from '../StatusCard';
import { Thermometer, Wind, Zap, Snowflake, Power, Settings2 } from 'lucide-react';

interface Props {
  zones: HVACZone[];
  theme: 'dark' | 'light';
  tempUnit: 'C' | 'F';
  lang: 'en' | 'ar' | 'fr';
  onOpenConfig: () => void;
}

const HVACModule: React.FC<Props> = ({ zones, theme, tempUnit, lang, onOpenConfig }) => {
  const isDark = theme === 'dark';
  const isAr = lang === 'ar';
  const isFr = lang === 'fr';

  const labels = {
    title: isAr ? 'التحكم بالمناخ' : (isFr ? 'Climatisation' : 'Climate Control'),
    current: isAr ? 'الحالي' : (isFr ? 'Actuel' : 'Current'),
    target: isAr ? 'الهدف' : (isFr ? 'Cible' : 'Target'),
    systemOff: isAr ? 'النظام مغلق' : (isFr ? 'Arrêt' : 'System Off'),
    autoMode: isAr ? 'تلقائي' : (isFr ? 'Auto' : 'Auto Mode'),
    configure: isAr ? 'تكوين جميع المناطق' : (isFr ? 'Configurer les Zones' : 'Configure All Zones'),
    optimal: isAr ? 'مثالي' : 'optimal'
  };

  const toUnit = (temp: number) => {
    return tempUnit === 'F' ? Math.round((temp * 9/5) + 32) : temp;
  };

  const scaleMax = tempUnit === 'F' ? 104 : 40; 

  return (
    <StatusCard title={labels.title} icon={Thermometer} theme={theme} accentColor="rose" footer="00:15m ago">
      <div className="space-y-4 sm:space-y-5">
        {zones.map((zone) => {
          const current = toUnit(zone.currentTemp);
          const target = toUnit(zone.targetTemp);
          const isActive = zone.mode !== 'off';
          
          let ModeIcon = Wind;
          if (zone.mode === 'heat') ModeIcon = Zap;
          if (zone.mode === 'cool') ModeIcon = Snowflake;
          if (zone.mode === 'off') ModeIcon = Power;

          return (
            <div 
              key={zone.id} 
              className={`p-5 rounded-[2rem] transition-all duration-300 group/zone ${
                isDark ? 'bg-[#E5E5E5]/5 hover:bg-[#E5E5E5]/10' : 'bg-[#000000]/5 hover:bg-[#000000]/10'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`text-lg font-bold truncate ${isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'}`}>{zone.name}</h3>
                  <button 
                    onClick={onOpenConfig}
                    className="flex flex-wrap items-center gap-2 mt-1 group/btn text-left"
                  >
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded whitespace-nowrap ${
                      zone.status === 'optimal' ? 'text-[#FCA311] bg-[#FCA311]/10' : 'text-[#E5E5E5] bg-[#E5E5E5]/10'
                    }`}>
                      {zone.status === 'optimal' ? labels.optimal : zone.status}
                    </span>
                    <span className={`text-[10px] uppercase font-bold whitespace-nowrap flex items-center gap-1 transition-all ${
                        isDark ? 'text-[#E5E5E5] group-hover/btn:text-[#FCA311]' : 'text-[#000000] group-hover/btn:text-[#FCA311]'
                    }`}>
                        {zone.mode === 'off' ? labels.systemOff : labels.autoMode}
                        <Settings2 size={10} className="opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    </span>
                  </button>
                </div>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover/zone:scale-110 ${
                  isActive 
                    ? 'bg-[#FCA311]/20 text-[#FCA311]' 
                    : (isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black')
                }`}>
                  <ModeIcon size={18} />
                </div>
              </div>

              <div className="flex items-end justify-between gap-4">
                <div className="flex flex-col">
                  <span className={`text-4xl sm:text-5xl font-light tabular-nums leading-none ${isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'}`}>{current}°</span>
                  <span className="text-[10px] opacity-40 font-bold uppercase tracking-wider mt-2">{labels.current}</span>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className={`flex items-center gap-1 p-1 rounded-xl ${isDark ? 'bg-black/20' : 'bg-white/50'}`}>
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-current hover:bg-opacity-10 transition-colors text-lg font-medium">-</button>
                    <span className={`text-xl font-bold tabular-nums w-8 text-center ${isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'}`}>{target}°</span>
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-current hover:bg-opacity-10 transition-colors text-lg font-medium">+</button>
                  </div>
                  <span className={`text-[10px] opacity-40 font-bold uppercase tracking-wider mt-2 ${isAr ? 'ml-1' : 'mr-1'}`}>{labels.target}</span>
                </div>
              </div>

              {/* Visual Gauge */}
              <div className="mt-4 h-1.5 w-full bg-current bg-opacity-5 rounded-full overflow-hidden">
                 <div 
                   className={`h-full transition-all duration-1000 ${isActive ? 'bg-[#FCA311]' : 'bg-current opacity-20'}`}
                   style={{ width: `${Math.min(100, (current / scaleMax) * 100)}%` }}
                 />
              </div>
            </div>
          );
        })}

        <button 
          onClick={onOpenConfig}
          className={`w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] transition-all border border-current border-opacity-10 hover:border-opacity-30 ${
            isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'
          }`}
        >
          {labels.configure}
        </button>
      </div>
    </StatusCard>
  );
};

export default HVACModule;
