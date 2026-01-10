
import React from 'react';
import { Environmental } from '../../types';
import StatusCard from '../StatusCard';
import { CloudRain, Wind, Droplets, Sun, Sunrise, Sunset } from 'lucide-react';

interface Props {
  data: Environmental;
  theme: 'dark' | 'light';
  tempUnit: 'C' | 'F';
  lang: 'en' | 'ar' | 'fr';
}

const EnvironmentalModule: React.FC<Props> = ({ data, theme, tempUnit, lang }) => {
  const isDark = theme === 'dark';
  const isAr = lang === 'ar';
  const isFr = lang === 'fr';

  const labels = {
    title: isAr ? 'البيئة الجوية' : (isFr ? 'Environnement' : 'Environment'),
    feelsLike: isAr ? 'الإحساس الفعلي' : (isFr ? 'Ressenti' : 'Feels like'),
    stable: isAr ? 'حالة مستقرة' : (isFr ? 'Stable' : 'Stable Condition'),
    wind: isAr ? 'الرياح' : (isFr ? 'Vent' : 'Wind'),
    humidity: isAr ? 'الرطوبة' : (isFr ? 'Humidité' : 'Humidity'),
    sunrise: isAr ? 'الشروق' : (isFr ? 'Lever' : 'Sunrise'),
    sunset: isAr ? 'الغروب' : (isFr ? 'Coucher' : 'Sunset')
  };

  const displayTemp = tempUnit === 'F' ? Math.round((data.temperature * 9/5) + 32) : data.temperature;
  const displayFeelsLike = tempUnit === 'F' ? Math.round((data.feelsLike * 9/5) + 32) : data.feelsLike;

  return (
    <StatusCard title={labels.title} icon={CloudRain} theme={theme} accentColor="blue" footer="02:15m ago">
      <div className="space-y-6 sm:space-y-8">
        {/* Main Temperature Display */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className={`text-5xl sm:text-6xl font-light tabular-nums tracking-tighter ${isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'}`}>
              {displayTemp}°<span className="text-2xl sm:text-3xl opacity-40 ml-1">{tempUnit}</span>
            </div>
            <p className="text-sm sm:text-base mt-2 opacity-50 font-medium tracking-wide">{labels.feelsLike} {displayFeelsLike}°</p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className={`text-lg sm:text-xl font-medium mb-2 ${isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'}`}>{data.condition}</div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FCA311]/10 text-[#FCA311] text-xs font-bold uppercase tracking-wide">
              {labels.stable}
            </span>
          </div>
        </div>

        {/* Warning Banner if alerts exist */}
        {data.alerts.length > 0 && (
          <div className="bg-[#FCA311]/10 border border-[#FCA311]/20 rounded-2xl p-4 flex items-start gap-4">
            <div className="flex-shrink-0 p-2 bg-[#FCA311] rounded-lg text-[#000000] mt-0.5">
              <Sun size={18} />
            </div>
            <p className="text-sm text-[#FCA311] font-medium leading-relaxed break-words">
              {data.alerts[0]}
            </p>
          </div>
        )}

        {/* Metric Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5">
          <div className={`p-4 sm:p-5 rounded-3xl flex flex-col items-center justify-center text-center ${isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'}`}>
            <div className="flex items-center gap-2 mb-3 opacity-50">
              <Wind size={18} />
              <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider">{labels.wind}</span>
            </div>
            <div className="text-xl sm:text-2xl font-light tabular-nums truncate">{data.windSpeed} <span className="text-sm sm:text-base opacity-50">km/h</span></div>
          </div>
          <div className={`p-4 sm:p-5 rounded-3xl flex flex-col items-center justify-center text-center ${isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'}`}>
            <div className="flex items-center gap-2 mb-3 opacity-50">
              <Droplets size={18} />
              <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider">{labels.humidity}</span>
            </div>
            <div className="text-xl sm:text-2xl font-light tabular-nums truncate">{data.humidity}<span className="text-sm sm:text-base opacity-50">%</span></div>
          </div>
        </div>

        {/* Solar Tracking */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Sunrise size={18} className="text-[#FCA311] opacity-80" />
            <div>
              <p className="text-[10px] opacity-40 uppercase font-bold">{labels.sunrise}</p>
              <p className="text-xs font-medium">05:42 AM</p>
            </div>
          </div>
          <div className="h-0.5 flex-1 mx-3 bg-gradient-to-r from-[#FCA311]/20 via-current to-[#FCA311]/20 rounded-full opacity-20" />
          <div className="flex items-center gap-2 text-right">
            <div>
              <p className="text-[10px] opacity-40 uppercase font-bold">{labels.sunset}</p>
              <p className="text-xs font-medium">06:50 PM</p>
            </div>
            <Sunset size={18} className="text-[#FCA311] opacity-80" />
          </div>
        </div>
      </div>
    </StatusCard>
  );
};

export default EnvironmentalModule;
