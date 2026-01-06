
import React from 'react';
import StatusCard from '../StatusCard';
import { ListChecks, UserCheck, Shield, Thermometer } from 'lucide-react';

interface Props {
  theme: 'dark' | 'light';
  onOpenHistory: () => void;
}

const ActivityModule: React.FC<Props> = ({ theme, onOpenHistory }) => {
  const isDark = theme === 'dark';

  const events = [
    { id: 1, icon: UserCheck, text: "Marcus Thorne entered Security Hub", time: "08:14 AM", type: "Staff" },
    { id: 2, icon: Shield, text: "System armed to PERIMETER mode", time: "07:30 AM", type: "Security" },
    { id: 3, icon: Thermometer, text: "HVAC Zone: Master Suite set to 22°C", time: "07:15 AM", type: "Climate" },
    { id: 4, icon: UserCheck, text: "Elena Rossi checked in (Main Kitchen)", time: "07:02 AM", type: "Staff" },
  ];

  return (
    <StatusCard title="Activity Log" icon={ListChecks} theme={theme} accentColor="emerald" footer="Historical View">
      <div className="space-y-8">
        <div className="relative space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-current before:opacity-10">
          {events.map((event) => (
            <div key={event.id} className="relative pl-9">
              <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full flex items-center justify-center z-10 ${
                isDark ? 'bg-[#14213D] border border-[#E5E5E5]/10' : 'bg-[#E5E5E5] border border-[#000000]/10'
              }`}>
                <event.icon size={12} className="opacity-60" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-sm font-medium leading-tight ${isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'}`}>
                    {event.text}
                  </p>
                  <span className="text-[10px] opacity-40 uppercase font-bold tracking-tighter mt-1.5 block">{event.type}</span>
                </div>
                <span className="text-[10px] tabular-nums opacity-40 font-bold whitespace-nowrap ml-5">{event.time}</span>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          onClick={onOpenHistory}
          className={`w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] transition-all border border-current border-opacity-10 hover:border-opacity-30 ${
            isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'
          }`}
        >
          View Full History
        </button>
      </div>
    </StatusCard>
  );
};

export default ActivityModule;
