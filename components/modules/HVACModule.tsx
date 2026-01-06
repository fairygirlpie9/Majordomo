
import React from 'react';
import { HVACZone } from '../../types';
import StatusCard from '../StatusCard';
import { Thermometer, ChevronRight, Wind, Zap } from 'lucide-react';

interface Props {
  zones: HVACZone[];
  theme: 'dark' | 'light';
  tempUnit: 'C' | 'F';
  onOpenConfig: () => void;
}

const HVACModule: React.FC<Props> = ({ zones, theme, tempUnit, onOpenConfig }) => {
  const isDark = theme === 'dark';

  const toUnit = (temp: number) => {
    return tempUnit === 'F' ? Math.round((temp * 9/5) + 32) : temp;
  };

  const scaleMax = tempUnit === 'F' ? 104 : 40; // 40C or 104F approx max for bar

  return (
    <StatusCard title="Climate Control" icon={Thermometer} theme={theme} accentColor="rose" footer="00:15m ago">
      <div className="space-y-6">
        {zones.map((zone) => {
          const current = toUnit(zone.currentTemp);
          const target = toUnit(zone.targetTemp);
          const isActive = zone.mode !== 'off';
          
          return (
            <div 
              key={zone.id} 
              className={`p-6 rounded-[2rem] transition-all duration-300 group/zone ${
                isDark ? 'bg-[#E5E5E5]/5 hover:bg-[#E5E5E5]/10' : 'bg-[#000000]/5 hover:bg-[#000000]/10'
              }`}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className={`text-lg font-bold ${isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'}`}>{zone.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${
                      zone.status === 'optimal' ? 'text-[#FCA311] bg-[#FCA311]/10' : 'text-[#E5E5E5] bg-[#E5E5E5]/10'
                    }`}>
                      {zone.status}
                    </span>
                    <span className="text-[10px] opacity-50 uppercase font-bold">Auto Mode</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover/zone:scale-110 ${
                  isActive ? 'bg-[#FCA311]/20 text-[#FCA311]' : 'bg-current bg-opacity-10 text-current opacity-40'
                }`}>
                  {zone.mode === 'heat' ? <Zap size={20} /> : <Wind size={20} />}
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div className="flex items-baseline gap-1">
                  <span className={`text-5xl font-light tabular-nums ${isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'}`}>{current}°</span>
                  <span className="text-xs opacity-50 font-bold uppercase tracking-wide ml-1">Current</span>
                </div>
                
                <div className="flex flex-col items-end">
                  <span className="text-[10px] opacity-40 font-bold mb-1.5 uppercase tracking-wider">Target</span>
                  <div className="flex items-center gap-3">
                    <button className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${isDark ? 'bg-[#E5E5E5]/10 hover:bg-[#E5E5E5]/20' : 'bg-[#000000]/5 hover:bg-[#000000]/10'}`}>-</button>
                    <span className={`text-xl font-bold tabular-nums w-8 text-center ${isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'}`}>{target}°</span>
                    <button className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${isDark ? 'bg-[#E5E5E5]/10 hover:bg-[#E5E5E5]/20' : 'bg-[#000000]/5 hover:bg-[#000000]/10'}`}>+</button>
                  </div>
                </div>
              </div>

              {/* Visual Gauge */}
              <div className="mt-6 h-2 w-full bg-current bg-opacity-5 rounded-full overflow-hidden">
                 <div 
                   className={`h-full transition-all duration-1000 ${isActive ? 'bg-[#FCA311]' : 'bg-current opacity-20'}`}
                   style={{ width: `${(current / scaleMax) * 100}%` }}
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
          Configure All Zones
        </button>
      </div>
    </StatusCard>
  );
};

export default HVACModule;
