
import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import { Zap, CheckCircle2, Loader2, AlertTriangle } from 'lucide-react';

interface PowerDiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
  lang: 'en' | 'ar' | 'fr';
}

const PowerDiagnosticModal: React.FC<PowerDiagnosticModalProps> = ({ isOpen, onClose, theme, lang }) => {
  const [step, setStep] = useState(0);
  const isDark = theme === 'dark';
  const isAr = lang === 'ar';
  const isFr = lang === 'fr';

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      const timers = [
        setTimeout(() => setStep(1), 1000), // Check Grid
        setTimeout(() => setStep(2), 2500), // Check Generator
        setTimeout(() => setStep(3), 4000), // Check UPS
        setTimeout(() => setStep(4), 5000), // Complete
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [isOpen]);

  const labels = {
    title: isAr ? 'تشخيص النظام' : (isFr ? 'Diagnostic Système' : 'System Diagnostic'),
    checking: isAr ? 'جاري الفحص...' : (isFr ? 'Vérification...' : 'Checking...'),
    nominal: isAr ? 'مثالي' : (isFr ? 'Nominal' : 'Nominal'),
    complete: isAr ? 'اكتمل الفحص بنجاح' : (isFr ? 'Diagnostic Terminé' : 'Diagnostic Complete Successfully'),
    close: isAr ? 'إغلاق' : (isFr ? 'Fermer' : 'Close')
  };

  const steps = [
    { label: isAr ? 'استقرار الشبكة' : (isFr ? 'Stabilité Réseau' : 'Grid Stability') },
    { label: isAr ? 'بادئ المولد' : (isFr ? 'Démarreur Générateur' : 'Generator Starter') },
    { label: isAr ? 'سلامة البطارية' : (isFr ? 'Intégrité Batterie' : 'Battery Integrity') },
    { label: isAr ? 'مزامنة الطور' : (isFr ? 'Synchro Phase' : 'Phase Synchronization') }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={labels.title} theme={theme}>
      <div className="space-y-6">
        <div className="flex justify-center py-8">
            <div className={`relative w-32 h-32 rounded-full flex items-center justify-center border-4 ${
                step === 4 ? 'border-[#FCA311]' : 'border-current border-opacity-10'
            }`}>
                {step === 4 ? (
                    <CheckCircle2 size={48} className="text-[#FCA311]" />
                ) : (
                    <Zap size={48} className={`opacity-50 ${step > 0 ? 'animate-pulse' : ''}`} />
                )}
            </div>
        </div>

        <div className="space-y-3">
            {steps.map((s, idx) => (
                <div key={idx} className={`p-4 rounded-xl flex items-center justify-between transition-colors ${
                    step > idx ? (isDark ? 'bg-[#FCA311]/10' : 'bg-[#FCA311]/5') : (isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5')
                }`}>
                    <span className="font-medium">{s.label}</span>
                    {step > idx ? (
                        <span className="text-xs font-bold uppercase text-[#FCA311] flex items-center gap-2">
                            {labels.nominal} <CheckCircle2 size={14} />
                        </span>
                    ) : step === idx ? (
                        <span className="text-xs font-bold uppercase opacity-60 flex items-center gap-2">
                            {labels.checking} <Loader2 size={14} className="animate-spin" />
                        </span>
                    ) : (
                        <span className="text-xs font-bold uppercase opacity-20">---</span>
                    )}
                </div>
            ))}
        </div>

        {step === 4 && (
            <div className={`p-4 rounded-xl text-center border border-[#FCA311]/20 bg-[#FCA311]/10 text-[#FCA311] font-bold`}>
                {labels.complete}
            </div>
        )}

        <button 
            onClick={onClose}
            className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest transition-all ${
                isDark ? 'bg-[#E5E5E5] text-[#000000]' : 'bg-[#000000] text-[#E5E5E5]'
            }`}
        >
            {labels.close}
        </button>
      </div>
    </Modal>
  );
};

export default PowerDiagnosticModal;
