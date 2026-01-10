
import React, { useState } from 'react';
import { Collections } from '../../types';
import StatusCard from '../StatusCard';
import { Car, Gem, BatteryCharging, Check, Disc } from 'lucide-react';

interface Props {
  collections: Collections;
  theme: 'dark' | 'light';
  lang: 'en' | 'ar' | 'fr';
}

const CollectionsModule: React.FC<Props> = ({ collections, theme, lang }) => {
  const isDark = theme === 'dark';
  const isAr = lang === 'ar';
  const isFr = lang === 'fr';
  const [activeTab, setActiveTab] = useState<'fleet' | 'vault'>('fleet');

  const labels = {
    title: isAr ? 'المقتنيات' : (isFr ? 'Collections' : 'Assets'),
    fleet: isAr ? 'الأسطول' : (isFr ? 'Flotte' : 'Fleet'),
    vault: isAr ? 'الخزنة' : (isFr ? 'Coffre' : 'Vault'),
    ready: isAr ? 'جاهز' : (isFr ? 'Prêt' : 'Ready'),
    service: isAr ? 'صيانة' : (isFr ? 'Entretien' : 'Service'),
    charging: isAr ? 'شحن' : (isFr ? 'En charge' : 'Charging'),
    secure: isAr ? 'مؤمن' : (isFr ? 'Sécurisé' : 'Secure'),
    accessed: isAr ? 'تم الدخول' : (isFr ? 'Accédé' : 'Accessed'),
    vaultEnv: isAr ? 'بيئة الخزنة' : (isFr ? 'Environnement' : 'Vault Environment'),
    humidityControl: isAr ? 'مراقبة الرطوبة' : (isFr ? 'Contrôle Humidité' : 'Humidity Control')
  };

  return (
    <StatusCard title={labels.title} icon={activeTab === 'fleet' ? Car : Gem} theme={theme} accentColor="sapphire" footer="Asset Monitoring">
      <div className="space-y-6">
        {/* Toggle */}
        <div className={`p-1 rounded-xl flex ${isDark ? 'bg-black/20' : 'bg-black/5'}`}>
            <button 
                onClick={() => setActiveTab('fleet')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                    activeTab === 'fleet' ? 'bg-[#FCA311] text-[#000000]' : 'opacity-50'
                }`}
            >
                {labels.fleet}
            </button>
            <button 
                onClick={() => setActiveTab('vault')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                    activeTab === 'vault' ? 'bg-[#FCA311] text-[#000000]' : 'opacity-50'
                }`}
            >
                {labels.vault}
            </button>
        </div>

        {/* Content */}
        <div className="space-y-3 min-h-[200px]">
            {activeTab === 'fleet' ? (
                collections.fleet.map((car) => (
                    <div key={car.id} className={`p-4 rounded-2xl flex items-center justify-between ${
                        isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'
                    }`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                isDark ? 'bg-white/10' : 'bg-black/5'
                            }`}>
                                <Car size={14} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">{car.name}</h4>
                                <span className="text-[10px] opacity-50 uppercase block">{car.location}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            {car.type === 'EV' && car.batteryLevel ? (
                                <div className="flex items-center gap-1 text-[#FCA311] text-xs font-bold">
                                    <BatteryCharging size={12} />
                                    <span>{car.batteryLevel}%</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1 opacity-50 text-xs font-bold">
                                    <Check size={12} />
                                    <span>{labels.ready}</span>
                                </div>
                            )}
                            <span className="text-[10px] opacity-40 uppercase mt-0.5 block">
                                {car.status === 'charging' ? labels.charging : car.status === 'service' ? labels.service : labels.ready}
                            </span>
                        </div>
                    </div>
                ))
            ) : (
                <>
                 <div className={`p-4 rounded-2xl flex items-center justify-between mb-2 ${
                        isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'
                    }`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                isDark ? 'bg-white/10' : 'bg-black/5'
                            }`}>
                                <Disc size={14} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">{labels.vaultEnv}</h4>
                                <span className="text-[10px] opacity-50 uppercase block">{labels.humidityControl}</span>
                            </div>
                        </div>
                        <div className="text-right">
                             <div className="text-lg font-bold tabular-nums">{collections.vault.humidity}%</div>
                             <div className="text-[10px] opacity-40 uppercase">RH</div>
                        </div>
                 </div>
                 {collections.vault.items.map((item) => (
                    <div key={item.id} className={`p-4 rounded-2xl flex items-center justify-between ${
                        isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'
                    }`}>
                        <div>
                            <h4 className="font-bold text-sm">{item.name}</h4>
                            <span className="text-[10px] opacity-50 uppercase">{item.category}</span>
                        </div>
                        <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                            item.status === 'secure' ? 'bg-[#FCA311]/10 text-[#FCA311]' : 'bg-red-500/10 text-red-500'
                        }`}>
                            {item.status === 'secure' ? labels.secure : labels.accessed}
                        </div>
                    </div>
                 ))}
                </>
            )}
        </div>
      </div>
    </StatusCard>
  );
};

export default CollectionsModule;
