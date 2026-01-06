
import React from 'react';
import Modal from '../Modal';
import { UserCheck, Shield, Thermometer, Zap, Droplets, AlertTriangle } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
}

const HISTORY_DATA = [
  { id: 1, icon: UserCheck, text: "Marcus Thorne entered Security Hub", time: "08:14 AM", date: "Today", type: "Staff", category: "access" },
  { id: 2, icon: Shield, text: "System armed to PERIMETER mode", time: "07:30 AM", date: "Today", type: "Security", category: "system" },
  { id: 3, icon: Thermometer, text: "HVAC Zone: Master Suite set to 22°C", time: "07:15 AM", date: "Today", type: "Climate", category: "environment" },
  { id: 4, icon: UserCheck, text: "Elena Rossi checked in (Main Kitchen)", time: "07:02 AM", date: "Today", type: "Staff", category: "access" },
  { id: 5, icon: Zap, text: "Weekly Generator Test Completed - Pass", time: "10:00 AM", date: "Yesterday", type: "Power", category: "system" },
  { id: 6, icon: Droplets, text: "Irrigation System Cycle Started (Zone 1-4)", time: "05:00 AM", date: "Yesterday", type: "Garden", category: "environment" },
  { id: 7, icon: AlertTriangle, text: "Network interruption detected - ISP 1", time: "02:14 PM", date: "May 18", type: "Network", category: "alert" },
  { id: 8, icon: Shield, text: "Main Gate opened for scheduled delivery", time: "01:30 PM", date: "May 18", type: "Security", category: "access" },
];

const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose, theme }) => {
  const isDark = theme === 'dark';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Activity Log" theme={theme}>
      <div className="relative border-l border-dashed border-current border-opacity-20 ml-4 space-y-8 py-2">
        {HISTORY_DATA.map((event) => (
          <div key={event.id} className="relative pl-10">
            {/* Timeline dot */}
            <div className={`absolute -left-3 top-1 w-6 h-6 rounded-full border-4 flex items-center justify-center ${
              isDark 
                ? 'bg-[#14213D] border-[#14213D] ring-1 ring-[#E5E5E5]/20' 
                : 'bg-white border-white ring-1 ring-[#000000]/20'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                event.category === 'alert' ? 'bg-red-500' : 
                event.category === 'system' ? 'bg-[#FCA311]' : 
                'bg-current opacity-40'
              }`} />
            </div>

            <div className={`p-5 rounded-2xl flex items-start gap-4 ${
               isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'
            }`}>
              <div className={`p-3 rounded-xl ${
                isDark ? 'bg-black/20' : 'bg-white/60'
              }`}>
                <event.icon size={20} className={event.category === 'alert' ? 'text-red-500' : 'opacity-70'} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-base font-bold">{event.text}</h4>
                  <span className="text-xs font-bold tabular-nums opacity-50 whitespace-nowrap ml-4">
                    {event.date}, {event.time}
                  </span>
                </div>
                <div className="flex gap-2 mt-2">
                   <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                     {event.type}
                   </span>
                   {event.category === 'alert' && (
                     <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-500/10 px-2 rounded">
                       Alert
                     </span>
                   )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default HistoryModal;
