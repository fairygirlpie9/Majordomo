import React from 'react';
import { Property } from '../types';
import { Sun, Moon, Bell, Shield, MapPin, Menu } from 'lucide-react';

interface HeaderProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  tempUnit: 'C' | 'F';
  toggleTempUnit: () => void;
  activeProperty: Property;
  currentTime: Date;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, tempUnit, toggleTempUnit, activeProperty, currentTime, toggleSidebar }) => {
  const isDark = theme === 'dark';

  // Format time for the specific timezone of the active property
  const propertyTime = currentTime.toLocaleTimeString([], { 
    timeZone: activeProperty.timezone, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    hour12: true 
  });

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isDark ? 'bg-[#14213D]/90 border-b border-[#E5E5E5]/5' : 'bg-white/90 border-b border-[#000000]/5'
    } backdrop-blur-xl`}>
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 h-20 md:h-24 flex items-center justify-between">
        
        {/* Left Side: Menu, Logo & Status */}
        <div className="flex items-center gap-3 sm:gap-6">
          <button 
            onClick={toggleSidebar}
            className={`p-2 -ml-2 rounded-xl transition-colors lg:hidden ${
              isDark ? 'text-[#E5E5E5] hover:bg-[#E5E5E5]/10' : 'text-[#000000] hover:bg-[#000000]/5'
            }`}
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FCA311] rounded-xl flex items-center justify-center shadow-lg shadow-[#FCA311]/20">
              <Shield className="text-[#000000] w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div className="flex flex-col">
              <h1 className={`text-xl sm:text-2xl font-serif-display font-medium leading-none ${isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'}`}>
                Majordomo
              </h1>
              <p className={`text-xs sm:text-sm opacity-60 mt-0.5 sm:mt-1 hidden xs:block`}>
                by Lux Ops
              </p>
            </div>
          </div>
        </div>

        {/* Center: Active Property Mini Info */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex flex-col items-center">
            <div className={`flex items-center gap-2 text-lg font-serif-display font-medium ${isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'}`}>
              <MapPin size={18} className="text-[#FCA311]" />
              {activeProperty.name}
            </div>
            <span className="text-sm tabular-nums opacity-60">
              {propertyTime}
            </span>
          </div>
        </div>

        {/* Right Side: Tools */}
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden sm:flex items-center gap-4 pr-6 sm:pr-8 border-r border-current border-opacity-10">
            <div className="text-right">
              <p className={`text-base font-medium tabular-nums ${isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'}`}>
                <span className="lg:hidden">
                  {currentTime.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                </span>
                <span className="hidden lg:inline">
                  {currentTime.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={toggleTempUnit}
              className={`w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full text-sm sm:text-base font-bold transition-colors border ${
                isDark ? 'bg-[#E5E5E5]/5 border-[#E5E5E5]/10 hover:bg-[#E5E5E5]/10 text-[#E5E5E5]' : 'bg-[#000000]/5 border-[#000000]/5 hover:bg-[#000000]/10 text-[#000000]'
              }`}
            >
              °{tempUnit}
            </button>

            <button 
              onClick={toggleTheme}
              className={`p-2 sm:p-3 rounded-full transition-colors ${
                isDark ? 'hover:bg-[#E5E5E5]/10 text-[#E5E5E5]' : 'hover:bg-[#000000]/5 text-[#000000]'
              }`}
            >
              {isDark ? <Sun size={20} className="sm:w-6 sm:h-6" /> : <Moon size={20} className="sm:w-6 sm:h-6" />}
            </button>

            <button className={`relative p-2 sm:p-3 rounded-full transition-colors ${
                isDark ? 'hover:bg-[#E5E5E5]/10 text-[#E5E5E5]' : 'hover:bg-[#000000]/5 text-[#000000]'
              }`}>
              <Bell size={20} className="sm:w-6 sm:h-6" />
              {activeProperty.alerts.some(a => !a.acknowledged) && (
                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-[#FCA311] rounded-full border-2 border-[#14213D]" />
              )}
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-4 ml-2 pl-6 border-l border-current border-opacity-10">
             <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#000000] to-[#14213D] flex items-center justify-center text-sm font-bold text-[#E5E5E5] shadow-inner ring-2 ring-[#E5E5E5]/20">
               JD
             </div>
             <div className="hidden lg:block">
               <p className={`text-sm font-bold leading-none ${isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'}`}>James</p>
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;