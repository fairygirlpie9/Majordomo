
import React from 'react';
import { Staff } from '../../types';
import StatusCard from '../StatusCard';
import { Users, Clock, MapPin } from 'lucide-react';

interface Props {
  staff: Staff[];
  theme: 'dark' | 'light';
  lang: 'en' | 'ar' | 'fr';
  onOpenBroadcast: () => void;
}

const StaffModule: React.FC<Props> = ({ staff, theme, lang, onOpenBroadcast }) => {
  const isDark = theme === 'dark';
  const isAr = lang === 'ar';
  const isFr = lang === 'fr';

  const labels = {
    title: isAr ? 'الموظفين' : (isFr ? 'Personnel' : 'Personnel'),
    broadcast: isAr ? 'إرسال تعميم' : (isFr ? 'Diffuser' : 'Broadcast Message'),
    checkin: isAr ? 'تسجيل دخول' : (isFr ? 'Pointage' : 'Check-in'),
    status: isAr ? 'في الموقع' : (isFr ? 'Sur place' : 'on-site')
  };

  return (
    <StatusCard title={labels.title} icon={Users} theme={theme} accentColor="sapphire" footer="Sync active">
      <div className="space-y-4 sm:space-y-5">
        {staff.map((person) => (
          <div 
            key={person.id} 
            className={`p-4 sm:p-5 rounded-3xl transition-all ${
              isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex gap-4 sm:gap-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#14213D] to-[#000000] flex items-center justify-center text-sm font-bold text-[#E5E5E5] uppercase shadow-inner border border-[#E5E5E5]/10 flex-shrink-0">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className={`text-sm sm:text-base font-bold ${isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'}`}>{person.name}</h3>
                  <p className="text-[10px] opacity-40 font-bold uppercase tracking-tighter mt-1">{person.role}</p>
                </div>
              </div>
              <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest whitespace-nowrap ${
                person.status === 'on-site' ? 'text-[#FCA311] bg-[#FCA311]/10' : 'text-current opacity-60 bg-current bg-opacity-5'
              }`}>
                {person.status === 'on-site' ? labels.status : person.status}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-8 mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-current border-opacity-5">
              <div className="flex items-center gap-2 opacity-50">
                <MapPin size={14} />
                <span className="text-xs font-medium truncate max-w-[120px]">{person.location}</span>
              </div>
              <div className="flex items-center gap-2 opacity-50">
                <Clock size={14} />
                <span className="text-xs font-medium tabular-nums whitespace-nowrap">{labels.checkin}: 08:00 AM</span>
              </div>
            </div>
          </div>
        ))}

        <button 
          onClick={onOpenBroadcast}
          className={`w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] transition-all border border-current border-opacity-10 hover:border-opacity-30 ${
            isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'
          }`}
        >
          {labels.broadcast}
        </button>
      </div>
    </StatusCard>
  );
};

export default StaffModule;
