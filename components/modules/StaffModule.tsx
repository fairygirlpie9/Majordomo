
import React from 'react';
import { Staff } from '../../types';
import StatusCard from '../StatusCard';
import { Users, User, Clock, MapPin } from 'lucide-react';

interface Props {
  staff: Staff[];
  theme: 'dark' | 'light';
  onOpenBroadcast: () => void;
}

const StaffModule: React.FC<Props> = ({ staff, theme, onOpenBroadcast }) => {
  const isDark = theme === 'dark';

  return (
    <StatusCard title="Personnel" icon={Users} theme={theme} accentColor="sapphire" footer="Sync active">
      <div className="space-y-5">
        {staff.map((person) => (
          <div 
            key={person.id} 
            className={`p-5 rounded-3xl transition-all ${
              isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#14213D] to-[#000000] flex items-center justify-center text-sm font-bold text-[#E5E5E5] uppercase shadow-inner border border-[#E5E5E5]/10">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className={`text-base font-bold ${isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'}`}>{person.name}</h3>
                  <p className="text-[10px] opacity-40 font-bold uppercase tracking-tighter mt-1">{person.role}</p>
                </div>
              </div>
              <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                person.status === 'on-site' ? 'text-[#FCA311] bg-[#FCA311]/10' : 'text-current opacity-60 bg-current bg-opacity-5'
              }`}>
                {person.status}
              </div>
            </div>

            <div className="flex items-center gap-8 mt-5 pt-4 border-t border-current border-opacity-5">
              <div className="flex items-center gap-2 opacity-50">
                <MapPin size={14} />
                <span className="text-xs font-medium">{person.location}</span>
              </div>
              <div className="flex items-center gap-2 opacity-50">
                <Clock size={14} />
                <span className="text-xs font-medium tabular-nums">Check-in: 08:00 AM</span>
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
          Broadcast Message
        </button>
      </div>
    </StatusCard>
  );
};

export default StaffModule;
