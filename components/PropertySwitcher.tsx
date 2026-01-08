import React from 'react';
import { Property } from '../types';
import { MapPin, CloudSun, AlertTriangle, Clock, ShieldCheck, Unlock } from 'lucide-react';

interface PropertySwitcherProps {
  properties: Property[];
  activeId: string;
  onSelect: (id: string) => void;
  theme: 'dark' | 'light';
  currentTime: Date;
  tempUnit: 'C' | 'F';
}

const PropertySwitcher: React.FC<PropertySwitcherProps> = ({ properties, activeId, onSelect, theme, currentTime, tempUnit }) => {
  const isDark = theme === 'dark';

  return (
    <div className="flex overflow-x-auto no-scrollbar gap-4 sm:gap-5 py-6 px-4 -mx-4">
      {properties.map((prop) => {
        const isActive = prop.id === activeId;
        const unreadAlerts = prop.alerts.filter(a => !a.acknowledged).length;

        // Calculate specific property time
        const localTime = currentTime.toLocaleTimeString([], { 
          timeZone: prop.timezone, 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false
        });

        // Convert temp
        const tempVal = tempUnit === 'F' 
          ? Math.round((prop.environmental.temperature * 9/5) + 32)
          : prop.environmental.temperature;

        return (
          <button
            key={prop.id}
            onClick={() => onSelect(prop.id)}
            className={`flex-shrink-0 w-72 sm:w-80 text-left rounded-3xl p-5 sm:p-6 transition-all duration-500 group relative border border-transparent ${
              isActive 
                ? (isDark 
                    ? 'bg-[#14213D] ring-1 ring-[#FCA311]/50 shadow-2xl shadow-[#000000]/50' 
                    : 'bg-white shadow-xl ring-1 ring-[#FCA311]/50') 
                : (isDark 
                    ? 'bg-[#14213D]/40 hover:bg-[#14213D]/60' 
                    : 'bg-white/40 hover:bg-white/80')
            }`}
          >
            <div className="flex flex-col h-full justify-between">
              <div className="flex justify-between items-start mb-4">
                 <div className="flex-1 pr-2">
                   <h3 className={`font-serif-display font-medium text-xl sm:text-2xl leading-tight transition-colors ${isActive ? (isDark ? 'text-[#E5E5E5]' : 'text-[#000000]') : 'opacity-60 text-current'}`}>
                     {prop.name}
                   </h3>
                   <div className="flex items-center gap-2 mt-2 opacity-60">
                      <MapPin size={14} />
                      <span className="text-xs sm:text-sm uppercase tracking-wide truncate max-w-[150px]">{prop.location.address.split(',')[1].trim()}</span>
                   </div>
                 </div>
                 <div className="flex flex-col items-end gap-2 flex-shrink-0 pt-1">
                  <div className={`flex items-center gap-2 tabular-nums text-sm font-bold ${isActive ? 'text-[#FCA311]' : 'opacity-40'}`}>
                     <Clock size={14} />
                     {localTime}
                   </div>
                   {unreadAlerts > 0 && (
                     <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FCA311]/20 text-[#FCA311] rounded-lg text-xs font-bold border border-[#FCA311]/30">
                       <AlertTriangle size={12} />
                       {unreadAlerts}
                     </div>
                   )}
                 </div>
              </div>

              <div className="flex items-end justify-between">
                <div className="flex items-center gap-3">
                  <CloudSun size={24} className={`sm:w-7 sm:h-7 ${isActive ? 'text-[#FCA311]' : 'text-current opacity-40'}`} />
                  <span className={`text-2xl sm:text-3xl font