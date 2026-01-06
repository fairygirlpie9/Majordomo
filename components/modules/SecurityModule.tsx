import React, { useState } from 'react';
import { Security } from '../../types';
import StatusCard from '../StatusCard';
import { Shield, ShieldCheck, DoorOpen, LayoutGrid, Camera, Eye, Lock, Unlock } from 'lucide-react';

interface Props {
  data: Security;
  theme: 'dark' | 'light';
}

const SecurityModule: React.FC<Props> = ({ data, theme }) => {
  const isDark = theme === 'dark';
  const [isArmed, setIsArmed] = useState(data.armed);

  return (
    <StatusCard title="Security" icon={Shield} theme={theme} accentColor="emerald" footer="Real-time Active">
      <div className="space-y-6 sm:space-y-8">
        {/* Arming Controls */}
        <div className={`p-1.5 rounded-2xl flex border ${
          isDark ? 'bg-black/20 border-white/5' : 'bg-black/5 border-black/5'
        }`}>
          <button 
            onClick={() => setIsArmed(true)}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
            isArmed 
              ? 'bg-[#FCA311] text-[#000000] shadow-lg shadow-[#FCA311]/20 scale-[1.02]' 
              : 'text-current opacity-40 hover:opacity-70'
          }`}>
            <ShieldCheck size={18} />
            <span>Armed</span>
          </button>
          
          <button 
            onClick={() => setIsArmed(false)}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
            !isArmed 
              ? (isDark ? 'bg-[#E5E5E5] text-[#000000]' : 'bg-white text-[#000000]') + ' shadow-lg scale-[1.02]'
              : 'text-current opacity-40 hover:opacity-70'
          }`}>
            <Unlock size={18} />
            <span>Disarmed</span>
          </button>
        </div>

        {/* Status Message */}
        <div className="text-center transition-all duration-300">
            <h3 className={`text-lg font-medium ${isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'}`}>
                {isArmed ? 'System Fully Secure' : 'Perimeter Monitoring Only'}
            </h3>
            <p className="text-xs opacity-50 mt-1">
                {isArmed ? 'All zones active and monitored' : 'Interior motion sensors bypassed'}
            </p>
        </div>

        {/* Sensor Matrix */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className={`p-4 sm:p-5 rounded-3xl flex flex-col items-center text-center ${isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'}`}>
            <DoorOpen size={20} className="mb-2 sm:mb-3 text-[#FCA311]" />
            <div className="text-xl sm:text-2xl font-light tabular-nums">{data.sensors.doors.total}</div>
            <p className="text-[10px] uppercase font-bold opacity-40">Entry Points</p>
          </div>
          <div className={`p-4 sm:p-5 rounded-3xl flex flex-col items-center text-center ${isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'}`}>
            <LayoutGrid size={20} className="mb-2 sm:mb-3 text-[#FCA311]" />
            <div className="text-xl sm:text-2xl font-light tabular-nums">{data.sensors.windows.total}</div>
            <p className="text-[10px] uppercase font-bold opacity-40">Windows</p>
          </div>
          <div className={`p-4 sm:p-5 rounded-3xl flex flex-col items-center text-center ${isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'}`}>
            <Eye size={20} className="mb-2 sm:mb-3 text-[#FCA311]" />
            <div className="text-xl sm:text-2xl font-light tabular-nums">{data.sensors.motion.active}</div>
            <p className="text-[10px] uppercase font-bold opacity-40">Motion Zones</p>
          </div>
          <div className={`p-4 sm:p-5 rounded-3xl flex flex-col items-center text-center ${isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'}`}>
            <Camera size={20} className="mb-2 sm:mb-3 text-[#FCA311]" />
            <div className="text-xl sm:text-2xl font-light tabular-nums">{data.sensors.cameras.online}</div>
            <p className="text-[10px] uppercase font-bold opacity-40">Live Feeds</p>
          </div>
        </div>

        {/* Quick Footer Message */}
        <div className="flex items-center justify-center gap-2 opacity-50">
          <Lock size={14} className="text-[#FCA311]" />
          <span className="text-xs uppercase font-bold tracking-widest text-center">
             {isArmed ? 'All perimeters sealed' : 'Zones ready to arm'}
          </span>
        </div>
      </div>
    </StatusCard>
  );
};

export default SecurityModule;