
import React from 'react';
import { Falconry } from '../../types';
import StatusCard from '../StatusCard';
import { Bird, Thermometer, Wind, Activity, Utensils } from 'lucide-react';

interface Props {
  data: Falconry;
  theme: 'dark' | 'light';
  tempUnit: 'C' | 'F';
  lang: 'en' | 'ar' | 'fr';
}

const FalconryModule: React.FC<Props> = ({ data, theme, tempUnit, lang }) => {
  const isDark = theme === 'dark';
  const isAr = lang === 'ar';
  const isFr = lang === 'fr';

  const labels = {
    title: isAr ? 'مركز الصقور' : (isFr ? 'Fauconnerie' : 'Falconry Center'),
    total: isAr ? 'عدد الصقور' : (isFr ? 'Total' : 'Total Falcons'),
    facility: isAr ? 'المنشأة' : (isFr ? 'Installation' : 'Facility'),
    temp: isAr ? 'الحرارة' : (isFr ? 'Temp' : 'Temp'),
    humidity: isAr ? 'الرطوبة' : (isFr ? 'Humidité' : 'Humidity'),
    fed: isAr ? 'تم الإطعام' : (isFr ? 'Nourri' : 'Fed'),
    pending: isAr ? 'معلق' : (isFr ? 'En attente' : 'Pending'),
    training: isAr ? 'تدريب' : (isFr ? 'Entraînement' : 'Training'),
    resting: isAr ? 'راحة' : (isFr ? 'Repos' : 'Resting'),
    medical: isAr ? 'عناية طبية' : (isFr ? 'Soins' : 'Medical')
  };

  const displayTemp = tempUnit === 'F' 
    ? Math.round((data.environmental.temperature * 9/5) + 32) 
    : data.environmental.temperature;

  return (
    <StatusCard title={labels.title} icon={Bird} theme={theme} accentColor="emerald" footer="Live Telemetry">
      <div className="space-y-6">
        {/* Header Summary */}
        <div className={`flex items-center gap-4 p-5 sm:p-6 rounded-3xl ${isDark ? 'bg-[#FCA311]/10' : 'bg-[#FCA311]/5'}`}>
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#FCA311]/20 flex items-center justify-center text-[#FCA311] flex-shrink-0">
            <Bird size={28} className="sm:w-[32px] sm:h-[32px]" />
          </div>
          <div>
            <div className={`text-2xl sm:text-3xl font-bold leading-none ${isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'}`}>
              {data.falcons.length}
            </div>
            <p className="text-xs uppercase tracking-wider opacity-50 mt-2">{data.facilityName}</p>
          </div>
        </div>

        {/* Environmental Mini-Grid */}
        <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-2xl flex items-center gap-3 ${isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'}`}>
                <Thermometer size={16} className="text-[#FCA311]" />
                <div>
                    <span className="text-lg font-bold tabular-nums">{displayTemp}°</span>
                    <span className="text-[10px] block opacity-40 uppercase">{labels.temp}</span>
                </div>
            </div>
            <div className={`p-4 rounded-2xl flex items-center gap-3 ${isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'}`}>
                <Wind size={16} className="text-[#FCA311]" />
                <div>
                    <span className="text-lg font-bold tabular-nums">{data.environmental.humidity}%</span>
                    <span className="text-[10px] block opacity-40 uppercase">{labels.humidity}</span>
                </div>
            </div>
        </div>

        {/* Falcon List */}
        <div className="space-y-3">
            {data.falcons.map((falcon) => (
                <div key={falcon.id} className={`p-4 rounded-2xl flex items-center justify-between transition-all ${
                    isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'
                }`}>
                    <div>
                        <div className="font-bold text-sm">{falcon.name}</div>
                        <div className="text-[10px] opacity-50 uppercase tracking-wide">{falcon.species} • {falcon.weight}g</div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            falcon.status === 'medical' ? 'bg-red-500/10 text-red-500' : 
                            falcon.status === 'training' ? 'bg-[#FCA311]/10 text-[#FCA311]' : 
                            'bg-current bg-opacity-10 opacity-60'
                        }`}>
                            {falcon.status === 'training' ? labels.training : falcon.status === 'medical' ? labels.medical : labels.resting}
                        </span>
                        <div className="flex items-center gap-1 opacity-50">
                            <Utensils size={10} />
                            <span className="text-[10px]">{falcon.feedStatus === 'fed' ? labels.fed : labels.pending}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </StatusCard>
  );
};

export default FalconryModule;
