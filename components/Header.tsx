
import React from 'react';
import { Property } from '../types';
import { Sun, Moon, Bell, Shield, MapPin, Menu, Globe } from 'lucide-react';

interface HeaderProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  tempUnit: 'C' | 'F';
  toggleTempUnit: () => void;
  activeProperty: Property;
  currentTime: Date;
  toggleSidebar: () => void;
  lang: 'en' | 'ar' | 'fr';
  toggleLang: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, tempUnit, toggleTempUnit, activeProperty, currentTime, toggleSidebar, lang, toggleLang }) => {
  const isDark = theme === 'dark';
  const isAr = lang === 'ar';
  const isFr = lang === 'fr';

  const labels = {
    brand: isAr ? 'الحاجب' : 'Majordomo',
    subtitle: isAr ? 'بواسطة لوكس أوبس' : (isFr ? 'par Lux Ops' : 'by Lux Ops'),
    telemetry: isAr ? 'القياس عن بعد' : (isFr ? 'Télémétrie en direct' : 'Live Telemetry')
  };

  const locale = isAr ? 'ar-SA' : (isFr ? 'fr-FR' : 'en-GB');

  // Format time for the specific timezone of the active property
  const propertyTime = currentTime.toLocaleTimeString(locale, { 
    timeZone: activeProperty.timezone, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    hour12: !isFr 
  });

  const displayDate = currentTime.toLocaleDateString(locale, { 
    day: 'numeric', 
    month: isAr || isFr ? 'long' : 'short', 
    year: 'numeric' 
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
            className={`p-2 rounded-xl transition-colors lg:hidden ${
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
                {labels.brand}
              </h1>
              <p className={`text-xs sm:text-sm opacity-60 mt-0.5 sm:mt-1 hidden xs:block`}>
                {labels.subtitle}
              </p>
            </div>
          </div>

          <div className={`hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border ${
            isDark ? 'bg-[#000000]/20 border-[#E5E5E5]/10' : 'bg-[#E5E5E5]/50 border-[#000000]/10'
          }`}>
            <div className={`w-2 h-2 rounded-full bg-[#FCA311] animate-pulse`} />
            <span className="opacity-70">{labels.telemetry}</span>
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
          <div className={`hidden sm:flex items-center gap-4 ${isAr ? 'pl-6 border-l' : 'pr-6 border-r'} border-current border-opacity-10`}>
            <div className="text-right">
              <p className={`text-base font-medium tabular-nums ${isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'}`}>
                {displayDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={toggleLang}
              className={`h-9 px-3 sm:h-11 sm:px-4 flex items-center gap-2 rounded-full text-sm sm:text-base font-bold transition-colors border ${
                isDark ? 'bg-[#E5E5E5]/5 border-[#E5E5E5]/10 hover:bg-[#E5E5E5]/10 text-[#E5E5E5]' : 'bg-[#000000]/5 border-[#000000]/5 hover:bg-[#000000]/10 text-[#000000]'
              }`}
            >
              <Globe size={18} />
              <span>{isAr ? 'En' : (isFr ? 'Fr' : 'عربي')}</span>
            </button>

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
        </div>
      </div>
    </header>
  );
};

export default Header;
