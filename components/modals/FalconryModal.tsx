
import React from 'react';
import Modal from '../Modal';
import { Falconry } from '../../types';
import { Bird, Weight, Activity, Utensils } from 'lucide-react';

interface FalconryModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
  lang: 'en' | 'ar' | 'fr';
  data: Falconry;
}

const FalconryModal: React.FC<FalconryModalProps> = ({ isOpen, onClose, theme, lang, data }) => {
  const isDark = theme === 'dark';
  const isAr = lang === 'ar';
  const isFr = lang === 'fr';

  const labels = {
    title: isAr ? 'تفاصيل السرب' : (isFr ? 'Détails de l\'Escadron' : 'Squadron Details'),
    weight: isAr ? 'الوزن' : (isFr ? 'Poids' : 'Weight'),
    status: isAr ? 'الحالة' : (isFr ? 'Statut' : 'Status'),
    feed: isAr ? 'سجل الغذاء' : (isFr ? 'Alimentation' : 'Feed Log'),
    schedule: isAr ? 'جدول التدريب' : (isFr ? 'Calendrier' : 'Training Schedule')
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={labels.title} theme={theme}>
      <div className="space-y-6">
        {data.falcons.map((falcon) => (
            <div key={falcon.id} className={`p-6 rounded-3xl ${
                isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'
            }`}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-[#FCA311]/20 flex items-center justify-center text-[#FCA311]">
                            <Bird size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">{falcon.name}</h3>
                            <p className="text-sm opacity-60 uppercase tracking-wide">{falcon.species}</p>
                        </div>
                    </div>
                    <div className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest ${
                         falcon.status === 'medical' ? 'bg-red-500/10 text-red-500' : 
                         falcon.status === 'training' ? 'bg-[#FCA311]/10 text-[#FCA311]' : 
                         'bg-current bg-opacity-10 opacity-60'
                    }`}>
                        {falcon.status}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className={`p-4 rounded-2xl text-center ${isDark ? 'bg-black/20' : 'bg-white/50'}`}>
                        <div className="flex justify-center mb-2 opacity-50"><Weight size={20} /></div>
                        <div className="text-lg font-bold tabular-nums">{falcon.weight}g</div>
                        <div className="text-[10px] uppercase font-bold opacity-40">{labels.weight}</div>
                    </div>
                    <div className={`p-4 rounded-2xl text-center ${isDark ? 'bg-black/20' : 'bg-white/50'}`}>
                        <div className="flex justify-center mb-2 opacity-50"><Activity size={20} /></div>
                        <div className="text-lg font-bold">98<span className="text-xs">%</span></div>
                        <div className="text-[10px] uppercase font-bold opacity-40">Vitals</div>
                    </div>
                    <div className={`p-4 rounded-2xl text-center ${isDark ? 'bg-black/20' : 'bg-white/50'}`}>
                        <div className="flex justify-center mb-2 opacity-50"><Utensils size={20} /></div>
                        <div className="text-lg font-bold capitalize">{falcon.feedStatus}</div>
                        <div className="text-[10px] uppercase font-bold opacity-40">Feeding</div>
                    </div>
                </div>
            </div>
        ))}

        <button className="w-full py-5 rounded-2xl bg-[#FCA311] text-[#000000] font-bold uppercase tracking-widest text-xs hover:bg-[#FCA311]/90 transition-colors">
            {isAr ? 'تحديث السجلات الطبية' : (isFr ? 'Mettre à jour dossiers' : 'Update Medical Records')}
        </button>
      </div>
    </Modal>
  );
};

export default FalconryModal;
