
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
}

const HVACConfigModal: React.FC<HVACConfigModalProps> = ({ isOpen, onClose, theme, zones, tempUnit }) => {
  const isDark = theme === 'dark';
  
  // Local state to simulate changes
  const [localZones, setLocalZones] = useState(zones);

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

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Climate Configuration" theme={theme}>
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
                    <h3 className="font-bold text-lg">System Override</h3>
                    <p className="text-xs opacity-60">Apply settings to all zones</p>
                </div>
            </div>
            <div className="flex gap-3">
                <button className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider ${
                    isDark ? 'bg-[#14213D] hover:bg-[#14213D]/80' : 'bg-white hover:bg-white/80'
                }`}>
                    Eco Mode
                </button>
                <button className="px-5 py-2.5 rounded-xl bg-[#FCA311] text-[#000000] text-xs font-bold uppercase tracking-wider">
                    Boost All
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
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
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
                                    <span className="uppercase">Fan: {zone.fanSpeed}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                             <div className="text-3xl font-light tabular-nums">
                                {toUnit(zone.currentTemp)}°
                             </div>
                             <div className="text-[10px] font-bold uppercase opacity-40">Current</div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between gap-6 pt-4 border-t border-current border-opacity-10">
                        <div className="flex items-center gap-2 opacity-60">
                            <Fan size={16} />
                            <span className="text-xs font-bold uppercase tracking-wide">Fan Speed</span>
                        </div>
                        
                        <div className={`flex items-center p-1 rounded-xl ${
                             isDark ? 'bg-black/20' : 'bg-white/50'
                        }`}>
                             <button 
                                onClick={() => adjustTemp(zone.id, -1)}
                                className="w-10 h-10 flex items-center justify-center hover:bg-current hover:bg-opacity-10 rounded-lg transition-colors"
                             >
                                 -
                             </button>
                             <div className="w-16 text-center font-bold text-lg tabular-nums">
                                 {toUnit(zone.targetTemp)}°
                             </div>
                             <button 
                                onClick={() => adjustTemp(zone.id, 1)}
                                className="w-10 h-10 flex items-center justify-center hover:bg-current hover:bg-opacity-10 rounded-lg transition-colors"
                             >
                                 +
                             </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <button 
            onClick={onClose}
            className={`w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] transition-all border border-current border-opacity-10 hover:border-opacity-30 ${
            isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'
            }`}
        >
            Close & Save
        </button>
      </div>
    </Modal>
  );
};

export default HVACConfigModal;
