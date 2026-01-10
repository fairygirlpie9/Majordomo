
import React, { useState } from 'react';
import Modal from '../Modal';
import { HVACZone } from '../../types';
import { Thermometer, Wind, Power, Zap, Fan } from 'lucide-react';

interface HVACConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
  zones: HVACZone[];
  tempUnit: 'C' | 'F';
  lang?: 'en' | 'ar' | 'fr';
}

const HVACConfigModal: React.FC<HVACConfigModalProps> = ({ isOpen, onClose, theme, zones, tempUnit, lang = 'en' }) => {
  const isDark = theme === 'dark';
  const isAr = lang === 'ar';
  const isFr = lang === 'fr';
  
  // Local state to simulate changes
  const [localZones, setLocalZones] = useState(zones);
  const [activeGlobalMode, setActiveGlobalMode] = useState<'none' | 'eco' | 'boost'>('none');

  const toggleMode = (id: string) => {
    setLocalZones(prev => prev.map(z => {
      if (z.id === id) {
        return { ...z, mode: z.mode === 'off' ? 'heat' : 'off' };
      }
      return z;
    }));
  };

  const adjustTemp = (id: string, delta: number) => {
    setLocalZones(prev => prev.map(z => {
        if (z.id === id) {
            return { ...z, targetTemp: z.targetTemp + delta };
        }
        return z;
    }));
  };

  const toUnit = (temp: number) => {
    return tempUnit === 'F' ? Math.round((temp * 9/5) + 32) : temp;
  };

  const labels = {
      title: isAr ? 'إعدادات المناخ' : (isFr ? 'Configuration Climat' : 'Climate Configuration'),
      override: isAr ? 'تحكم شامل' : (isFr ? 'Contrôle Global' : 'System Override'),
      applyAll: isAr ? 'تطبيق على جميع المناطق' : (isFr ? 'Appliquer à toutes les zones' : 'Apply settings to all zones'),
      eco: isAr ? 'وضع توفير' : (isFr ? 'Mode Éco' : 'Eco Mode'),
      boost: isAr ? 'تنشيط الكل' : (isFr ? 'Boost Tout' : 'Boost All'),
      current: isAr ? 'الحالي' : (isFr ? 'Actuel' : 'Current'),
      fan: isAr ? 'المروحة' : (isFr ? 'Ventilation' : 'Fan Speed'),
      close: isAr ? 'حفظ وإغلاق' : (isFr ? 'Fermer et Enregistrer' : 'Close & Save')
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={labels.title} theme={theme}>
      <div className="space-y-8">
        {/* Global Controls */}
        <div className={`p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 ${
            isDark ? 'bg-[#FCA311]/10 border border-[#FCA311]/20' : 'bg-[#FCA311]/5 border border-[#FCA311]/10'
        }`}>
            <div className="flex items-center gap-4">
                <div className="p-3 bg-[#FCA311] text-[#000000] rounded-xl">
                    <Zap size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-lg">{labels.override}</h3>
                    <p className="text-xs opacity-60">{labels.applyAll}</p>
                </div>
            </div>
            <div className="flex gap-3">
                <button 
                    onClick={() => setActiveGlobalMode(prev => prev === 'eco' ? 'none' : 'eco')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                    activeGlobalMode === 'eco' 
                        ? 'bg-green-500 text-white border-green-500' 
                        : (isDark ? 'bg-[#14213D] border-transparent hover:border-[#E5E5E5]/20' : 'bg-white border-transparent hover:border-[#000000]/20')
                }`}>
                    {labels.eco}
                </button>
                <button 
                    onClick={() => setActiveGlobalMode(prev => prev === 'boost' ? 'none' : 'boost')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                    activeGlobalMode === 'boost'
                        ? 'bg-[#FCA311] text-[#000000] border-[#FCA311]'
                        : 'bg-[#FCA311] text-[#000000] border-[#FCA311] opacity-60 hover:opacity-100'
                }`}>
                    {labels.boost}
                </button>
            </div>
        </div>

        {/* Zone List */}
        <div className="grid grid-cols-1 gap-4">
            {localZones.map((zone) => (
                <div key={zone.id} className={`p-6 rounded-3xl transition-all ${
                    isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'
                }`}>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => toggleMode(zone.id)}
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shadow-lg active:scale-95 ${
                                    zone.mode !== 'off' 
                                    ? 'bg-[#FCA311] text-[#000000]' 
                                    : 'bg-current bg-opacity-10 opacity-50'
                                }`}
                            >
                                <Power size={20} />
                            </button>
                            <div>
                                <h4 className="text-lg font-bold">{zone.name}</h4>
                                <div className="flex items-center gap-2 text-xs opacity-50 font-medium">
                                    <span className="uppercase">{zone.mode}</span>
                                    <span>•</span>
                                    <span className="uppercase">{labels.fan}: {zone.fanSpeed}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                             <div className="text-3xl font-light tabular-nums">
                                {toUnit(zone.currentTemp)}°
                             </div>
                             <div className="text-[10px] font-bold uppercase opacity-40">{labels.current}</div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between gap-6 pt-4 border-t border-current border-opacity-10">
                        <div className="flex items-center gap-2 opacity-60">
                            <Fan size={16} />
                            <span className="text-xs font-bold uppercase tracking-wide">{labels.fan}</span>
                        </div>
                        
                        <div className={`flex items-center p-1 rounded-xl shadow-inner ${
                             isDark ? 'bg-black/20' : 'bg-white/50'
                        }`}>
                             <button 
                                onClick={() => adjustTemp(zone.id, -1)}
                                className="w-12 h-10 flex items-center justify-center hover:bg-current hover:bg-opacity-10 rounded-lg transition-colors active:bg-opacity-20"
                             >
                                 <span className="text-xl font-medium">-</span>
                             </button>
                             <div className="w-16 text-center font-bold text-lg tabular-nums">
                                 {toUnit(zone.targetTemp)}°
                             </div>
                             <button 
                                onClick={() => adjustTemp(zone.id, 1)}
                                className="w-12 h-10 flex items-center justify-center hover:bg-current hover:bg-opacity-10 rounded-lg transition-colors active:bg-opacity-20"
                             >
                                 <span className="text-xl font-medium">+</span>
                             </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <button 
            onClick={onClose}
            className={`w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] transition-all border border-current border-opacity-10 hover:border-opacity-30 active:scale-[0.99] ${
            isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'
            }`}
        >
            {labels.close}
        </button>
      </div>
    </Modal>
  );
};

export default HVACConfigModal;
