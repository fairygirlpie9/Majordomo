
import React from 'react';
import { WineCellar } from '../../types';
import StatusCard from '../StatusCard';
import { GlassWater, Thermometer, Droplets, Database, ChevronRight } from 'lucide-react';

interface Props {
  data: WineCellar;
  theme: 'dark' | 'light';
  tempUnit: 'C' | 'F';
  onOpenInventory: () => void;
}

const WineCellarModule: React.FC<Props> = ({ data, theme, tempUnit, onOpenInventory }) => {
  const isDark = theme === 'dark';

  const displayTemp = tempUnit === 'F' 
    ? Math.round((data.environmental.temperature * 9/5) + 32) 
    : data.environmental.temperature;

  return (
    <StatusCard title="Wine Cellar" icon={GlassWater} theme={theme} accentColor="rose" footer="Live Telemetry">
      <div className="space-y-6">
        {/* Inventory Summary */}
        <div className={`flex items-center justify-between p-6 rounded-3xl ${isDark ? 'bg-[#FCA311]/10' : 'bg-[#FCA311]/5'}`}>
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#FCA311]/20 flex items-center justify-center text-[#FCA311]">
              <Database size={32} />
            </div>
            <div>
              <div className={`text-3xl font-bold leading-none ${isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'}`}>
                {data.inventory.totalBottles}
              </div>
              <p className="text-xs uppercase tracking-wider opacity-50 mt-2">Total Collection</p>
            </div>
          </div>
          <div className="text-right">
             <div className="text-xl font-bold text-[#FCA311]">${(data.inventory.estimatedValue / 1000).toFixed(0)}k</div>
             <p className="text-[10px] opacity-40 uppercase font-bold mt-1">Est. Value</p>
          </div>
        </div>

        {/* Environmental Sliders */}
        <div className="grid grid-cols-2 gap-6">
          <div className={`p-6 rounded-3xl ${isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'}`}>
            <div className="flex items-center gap-2 mb-4 opacity-50">
              <Thermometer size={18} className="text-[#FCA311]" />
              <span className="text-xs uppercase font-bold tracking-wider">Temp</span>
            </div>
            <div className="text-3xl font-light tabular-nums">{displayTemp}°<span className="text-sm opacity-50">{tempUnit}</span></div>
            <div className="mt-5 h-2 w-full bg-[#FCA311]/10 rounded-full overflow-hidden">
               <div className="h-full bg-[#FCA311] w-[65%]" />
            </div>
          </div>
          <div className={`p-6 rounded-3xl ${isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'}`}>
            <div className="flex items-center gap-2 mb-4 opacity-50">
              <Droplets size={18} className="text-[#FCA311]" />
              <span className="text-xs uppercase font-bold tracking-wider">Humidity</span>
            </div>
            <div className="text-3xl font-light tabular-nums">{data.environmental.humidity}<span className="text-sm opacity-50">%</span></div>
            <div className="mt-5 h-2 w-full bg-[#FCA311]/10 rounded-full overflow-hidden">
               <div className="h-full bg-[#FCA311] w-[70%]" />
            </div>
          </div>
        </div>

        <button 
          onClick={onOpenInventory}
          className={`w-full group flex items-center justify-between p-6 rounded-3xl transition-all ${
            isDark ? 'bg-[#E5E5E5]/5 hover:bg-[#E5E5E5]/10' : 'bg-[#000000]/5 hover:bg-[#000000]/10'
          }`}
        >
          <span className="text-xs font-bold uppercase tracking-widest opacity-80">Full Inventory Management</span>
          <ChevronRight size={20} className="opacity-40 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </StatusCard>
  );
};

export default WineCellarModule;
