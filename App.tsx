
import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_PROPERTIES } from './mockData';
import { Property, Alert } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PropertySwitcher from './components/PropertySwitcher';
import DashboardGrid from './components/DashboardGrid';
import WineInventoryModal from './components/modals/WineInventoryModal';
import HistoryModal from './components/modals/HistoryModal';
import BroadcastModal from './components/modals/BroadcastModal';
import HVACConfigModal from './components/modals/HVACConfigModal';

const App: React.FC = () => {
  const [activePropertyId, setActivePropertyId] = useState<string>(MOCK_PROPERTIES[0].id);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Modal State
  const [activeModal, setActiveModal] = useState<'wine' | 'history' | 'broadcast' | 'hvac' | null>(null);

  // Clock update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeProperty = useMemo(() => 
    MOCK_PROPERTIES.find(p => p.id === activePropertyId) || MOCK_PROPERTIES[0]
  , [activePropertyId]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleTempUnit = () => setTempUnit(prev => prev === 'C' ? 'F' : 'C');

  // Palette: Dark (#000000 Background), Light (#E5E5E5 Background)
  return (
    <div className={`min-h-screen transition-colors duration-700 ${theme === 'dark' ? 'bg-[#000000] text-[#E5E5E5]' : 'bg-[#E5E5E5] text-[#000000]'}`}>
      {/* Header */}
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        tempUnit={tempUnit}
        toggleTempUnit={toggleTempUnit}
        activeProperty={activeProperty}
        currentTime={currentTime}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
      />

      <main className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 pb-20 pt-24">
        {/* Property Selection */}
        <section className="mb-10">
          <PropertySwitcher 
            properties={MOCK_PROPERTIES}
            activeId={activePropertyId}
            onSelect={setActivePropertyId}
            theme={theme}
            currentTime={currentTime}
            tempUnit={tempUnit}
          />
        </section>

        {/* Dynamic Grid */}
        <DashboardGrid 
          property={activeProperty} 
          theme={theme} 
          tempUnit={tempUnit}
          onOpenInventory={() => setActiveModal('wine')}
          onOpenHistory={() => setActiveModal('history')}
          onOpenBroadcast={() => setActiveModal('broadcast')}
          onOpenHVAC={() => setActiveModal('hvac')}
        />
      </main>

      {/* Floating Alerts Summary for Mobile - Using Orange #FCA311 */}
      {activeProperty.alerts.filter(a => !a.acknowledged).length > 0 && (
        <div className="fixed bottom-6 right-6 lg:hidden">
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
      <WineInventoryModal 
        isOpen={activeModal === 'wine'} 
        onClose={() => setActiveModal(null)} 
        theme={theme} 
      />
      <HistoryModal 
        isOpen={activeModal === 'history'} 
        onClose={() => setActiveModal(null)} 
        theme={theme} 
      />
      <BroadcastModal 
        isOpen={activeModal === 'broadcast'} 
        onClose={() => setActiveModal(null)} 
        theme={theme} 
      />
      <HVACConfigModal 
        isOpen={activeModal === 'hvac'} 
        onClose={() => setActiveModal(null)} 
        theme={theme} 
        zones={activeProperty.hvac}
        tempUnit={tempUnit}
      />
    </div>
  );
};

export default App;
