
import React from 'react';
import { Environmental } from '../../types';
import StatusCard from '../StatusCard';
import { CloudRain, Wind, Droplets, Sun, Sunrise, Sunset } from 'lucide-react';

interface Props {
  data: Environmental;
  theme: 'dark' | 'light';
  tempUnit: 'C' | 'F';
}

const EnvironmentalModule: React.FC<Props> = ({ data, theme, tempUnit }) => {
  const isDark = theme === 'dark';

  const displayTemp = tempUnit === 'F' ? Math.round((data.temperature * 9/5) + 32) : data.temperature;
  const displayFeelsLike = tempUnit === 'F' ? Math.round((data.feelsLike * 9/5) + 32) : data.feelsLike;

  return (
    <StatusCard title="Environment" icon={CloudRain} theme={theme} accentColor="blue" footer="02:15m ago">
      <div className="space-y-8">
        {/* Main Temperature Display */}
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-6xl lg:text-7xl font-light tabular-nums tracking-tighter ${isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'}`}>
              {displayTemp}°<span className="text-3xl opacity-40 ml-1">{tempUnit}</span>
            </div>
            <p className="text-base mt-2 opacity-50 font-medium tracking-wide">Feels like {displayFeelsLike}°</p>
          </div>
          <div className="text-right">
            <div className={`text-xl font-medium mb-2 ${isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'}`}>{data.condition}</div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FCA311]/10 text-[#FCA311] text-xs font-bold uppercase tracking-wide">
              Stable Condition
            </span>
          </div>
        </div>

        {/* Warning Banner if alerts exist */}
        {data.alerts.length > 0 && (
          <div className="bg-[#FCA311]/10 border border-[#FCA311]/20 rounded-2xl p-5 flex items-start gap-4">
            <div className="p-2 bg-[#FCA311] rounded-lg text-[#000000] mt-0.5">
              <Sun size={18} />
            </div>
            <p className="text-base text-[#FCA311] font-medium leading-relaxed">
              {data.alerts[0]}
            </p>
          </div>
        )}

        {/* Metric Grid */}
        <div className="grid grid-cols-2 gap-5">
          <div className={`p-6 rounded-3xl ${isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'}`}>
            <div className="flex items-center gap-2 mb-3 opacity-50">
              <Wind size={18} />
              <span className="text-xs uppercase font-bold tracking-wider">Wind</span>
            </div>
            <div className="text-2xl font-light tabular-nums">{data.windSpeed} <span className="text-base opacity-50">km/h</span></div>
          </div>
          <div className={`p-6 rounded-3xl ${isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'}`}>
            <div className="flex items-center gap-2 mb-3 opacity-50">
              <Droplets size={18} />
              <span className="text-xs uppercase font-bold tracking-wider">Humidity</span>
            </div>
            <div className="text-2xl font-light tabular-nums">{data.humidity}<span className="text-base opacity-50">%</span></div>
          </div>
        </div>

        {/* Solar Tracking */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-3">
            <Sunrise size={22} className="text-[#FCA311] opacity-80" />
            <div>
              <p className="text-[10px] opacity-40 uppercase font-bold">Sunrise</p>
              <p className="text-sm font-medium">06:42 AM</p>
            </div>
          </div>
          <div className="h-0.5 flex-1 mx-6 bg-gradient-to-r from-[#FCA311]/20 via-current to-[#FCA311]/20 rounded-full opacity-20" />
          <div className="flex items-center gap-3 text-right">
            <div>
              <p className="text-[10px] opacity-40 uppercase font-bold">Sunset</p>
              <p className="text-sm font-medium">08:14 PM</p>
            </div>
            <Sunset size={22} className="text-[#FCA311] opacity-80" />
          </div>
        </div>
      </div>
    </StatusCard>
  );
};

export default EnvironmentalModule;
