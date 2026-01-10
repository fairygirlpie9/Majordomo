
import React, { useState, useEffect, useMemo } from 'react';
import { PROPERTIES_EN, PROPERTIES_AR, PROPERTIES_FR } from './mockData';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PropertySwitcher from './components/PropertySwitcher';
import DashboardGrid from './components/DashboardGrid';
import HistoryModal from './components/modals/HistoryModal';
import BroadcastModal from './components/modals/BroadcastModal';
import HVACConfigModal from './components/modals/HVACConfigModal';
import WineInventoryModal from './components/modals/WineInventoryModal';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [lang, setLang] = useState<'en' | 'ar' | 'fr'>('en');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Determine which set of properties to use based on language
  const currentProperties = useMemo(() => {
    switch(lang) {
      case 'ar': return PROPERTIES_AR;
      case 'fr': return PROPERTIES_FR;
      default: return PROPERTIES_EN;
    }
  }, [lang]);

  // State for active property ID
  const [activePropertyId, setActivePropertyId] = useState<string>(currentProperties[0].id);

  // When properties change (due to lang change), reset to the first property in the new list
  useEffect(() => {
    setActivePropertyId(currentProperties[0].id);
  }, [currentProperties]);

  // Modal State
  const [activeModal, setActiveModal] = useState<'history' | 'broadcast' | 'hvac' | 'wine' | null>(null);

  // Clock update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeProperty = useMemo(() => 
    currentProperties.find(p => p.id === activePropertyId) || currentProperties[0]
  , [activePropertyId, currentProperties]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleTempUnit = () => setTempUnit(prev => prev === 'C' ? 'F' : 'C');
  
  const toggleLang = () => {
    setLang(prev => {
      if (prev === 'en') return 'ar';
      if (prev === 'ar') return 'fr';
      return 'en';
    });
  };

  // Palette: Dark (#000000 Background), Light (#E5E5E5 Background)
  return (
    <div 
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className={`min-h-screen transition-colors duration-700 ${theme === 'dark' ? 'bg-[#000000] text-[#E5E5E5]' : 'bg-[#E5E5E5] text-[#000000]'} ${lang === 'ar' ? 'font-sans' : 'font-sans'}`}
    >
      {/* Header */}
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        tempUnit={tempUnit}
        toggleTempUnit={toggleTempUnit}
        activeProperty={activeProperty}
        currentTime={currentTime}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        lang={lang}
        toggleLang={toggleLang}
      />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} theme={theme} lang={lang} />

      <main className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 pb-20 pt-24 md:pt-28">
        {/* Property Selection */}
        <section className="mb-6 md:mb-10">
          <PropertySwitcher 
            properties={currentProperties}
            activeId={activePropertyId}
            onSelect={setActivePropertyId}
            theme={theme}
            currentTime={currentTime}
            tempUnit={tempUnit}
            lang={lang}
          />
        </section>

        {/* Dynamic Grid */}
        <DashboardGrid 
          property={activeProperty} 
          theme={theme} 
          tempUnit={tempUnit}
          lang={lang}
          onOpenHistory={() => setActiveModal('history')}
          onOpenBroadcast={() => setActiveModal('broadcast')}
          onOpenHVAC={() => setActiveModal('hvac')}
          onOpenWine={() => setActiveModal('wine')}
        />
      </main>

      {/* Floating Alerts Summary for Mobile */}
      {activeProperty.alerts.filter(a => !a.acknowledged).length > 0 && (
        <div className={`fixed bottom-6 ${lang === 'ar' ? 'left-6' : 'right-6'} lg:hidden z-40`}>
          <button className="bg-[#FCA311] text-[#000000] p-4 rounded-full shadow-lg shadow-[#FCA311]/20 animate-pulse">
            <span className="sr-only">Active Alerts</span>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
              <span className="absolute -top-2 -right-2 bg-[#000000] text-[#FCA311] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {activeProperty.alerts.filter(a => !a.acknowledged).length}
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Modals */}
      <HistoryModal 
        isOpen={activeModal === 'history'} 
        onClose={() => setActiveModal(null)} 
        theme={theme} 
        lang={lang}
      />
      <BroadcastModal 
        isOpen={activeModal === 'broadcast'} 
        onClose={() => setActiveModal(null)} 
        theme={theme} 
        lang={lang}
      />
      <HVACConfigModal 
        isOpen={activeModal === 'hvac'} 
        onClose={() => setActiveModal(null)} 
        theme={theme} 
        zones={activeProperty.hvac}
        tempUnit={tempUnit}
        lang={lang}
      />
      <WineInventoryModal 
        isOpen={activeModal === 'wine'} 
        onClose={() => setActiveModal(null)} 
        theme={theme}
        lang={lang}
      />
    </div>
  );
};

export default App;
