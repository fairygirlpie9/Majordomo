
import React from 'react';
import { Security } from '../../types';
import StatusCard from '../StatusCard';
import { Shield, ShieldCheck, DoorOpen, LayoutGrid, Camera, Eye } from 'lucide-react';

interface Props {
  data: Security;
  theme: 'dark' | 'light';
}

const SecurityModule: React.FC<Props> = ({ data, theme }) => {
  const isDark = theme === 'dark';

  return (
    <StatusCard title="Security" icon={Shield} theme={theme} accentColor="emerald" footer="Real-time Active">
      <div className="space-y-8">
        {/* Arming Status */}
        <div className={`flex items-center justify-between p-5 rounded-3xl border ${
          data.armed 
            ? 'bg-[#FCA311]/10 border-[#FCA311]/20' 
            : 'bg-current bg-opacity-5 border-current border-opacity-10'
        }`}>
          <div className="flex items-center gap-5">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
              data.armed ? 'bg-[#FCA311] shadow-lg shadow-[#FCA311]/30' : 'bg-[#E5E5E5] text-[#000000]'
            }`}>
              {data.armed ? <ShieldCheck className="text-[#000000]" size={28} /> : <Shield className="text-[#000000]" size={28} />}
            </div>
            <div>
              <div className={`text-xl font-bold leading-none ${isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'}`}>
                {data.mode}
              </div>
              <p className="text-xs uppercase tracking-wider opacity-50 mt-1.5">System Secure</p>
            </div>
          </div>
          <button className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${
            data.armed 
              ? (isDark ? 'bg-[#E5E5E5]/10 hover:bg-[#E5E5E5]/20' : 'bg-[#000000]/5 hover:bg-[#000000]/10')
              : 'bg-[#FCA311] text-[#000000] hover:bg-[#FCA311]/90'
          }`}>
            {data.armed ? 'Disarm' : 'Arm'}
          </button>
        </div>

        {/* Sensor Matrix */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-5 rounded-3xl flex flex-col items-center text-center ${isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'}`}>
            <DoorOpen size={22} className="mb-3 text-[#FCA311]" />
            <div className="text-2xl font-light tabular-nums">{data.sensors.doors.total}</div>
            <p className="text-[10px] uppercase font-bold opacity-40">Entry Points</p>
          </div>
          <div className={`p-5 rounded-3xl flex flex-col items-center text-center ${isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'}`}>
            <LayoutGrid size={22} className="mb-3 text-[#FCA311]" />
            <div className="text-2xl font-light tabular-nums">{data.sensors.windows.total}</div>
            <p className="text-[10px] uppercase font-bold opacity-40">Windows</p>
          </div>
          <div className={`p-5 rounded-3xl flex flex-col items-center text-center ${isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'}`}>
            <Eye size={22} className="mb-3 text-[#FCA311]" />
            <div className="text-2xl font-light tabular-nums">{data.sensors.motion.active}</div>
            <p className="text-[10px] uppercase font-bold opacity-40">Motion Zones</p>
          </div>
          <div className={`p-5 rounded-3xl flex flex-col items-center text-center ${isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'}`}>
            <Camera size={22} className="mb-3 text-[#FCA311]" />
            <div className="text-2xl font-light tabular-nums">{data.sensors.cameras.online}</div>
            <p className="text-[10px] uppercase font-bold opacity-40">Live Feeds</p>
          </div>
        </div>

        {/* Quick Footer Message */}
        <div className="flex items-center justify-center gap-2 opacity-50">
          <ShieldCheck size={14} className="text-[#FCA311]" />
          <span className="text-xs uppercase font-bold tracking-widest">All perimeters sealed</span>
        </div>
      </div>
    </StatusCard>
  );
};

export default SecurityModule;
