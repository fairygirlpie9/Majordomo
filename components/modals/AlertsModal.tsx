
import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import { Alert } from '../../types';
import { AlertTriangle, Info, CheckCircle2, X, ChevronDown, ChevronUp } from 'lucide-react';

interface AlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
  lang: 'en' | 'ar' | 'fr';
  alerts: Alert[];
}

const AlertsModal: React.FC<AlertsModalProps> = ({ isOpen, onClose, theme, lang, alerts }) => {
  const isDark = theme === 'dark';
  const isAr = lang === 'ar';
  const isFr = lang === 'fr';

  // Local state to handle dismissal within the modal session
  const [visibleAlerts, setVisibleAlerts] = useState<Alert[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    setVisibleAlerts(alerts);
  }, [alerts, isOpen]);

  const handleDismiss = (id: string) => {
    setVisibleAlerts(prev => prev.filter(a => a.id !== id));
  };

  const toggleDetails = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const labels = {
    title: isAr ? 'مركز التنبيهات' : (isFr ? 'Centre d\'Alertes' : 'Alert Center'),
    noAlerts: isAr ? 'لا توجد تنبيهات نشطة' : (isFr ? 'Aucune alerte active' : 'No Active Alerts'),
    allSystems: isAr ? 'جميع الأنظمة تعمل بكفاءة' : (isFr ? 'Tous les systèmes sont nominaux' : 'All systems nominal'),
    clear: isAr ? 'مسح الكل' : (isFr ? 'Tout Effacer' : 'Clear All'),
    dismiss: isAr ? 'تجاهل' : (isFr ? 'Ignorer' : 'Dismiss'),
    details: isAr ? 'التفاصيل' : (isFr ? 'Détails' : 'Details'),
    context: isAr ? 'سياق النظام: تم الكشف عن حالة شاذة في قطاع الاستشعار 4. بدأ بروتوكول التشخيص.' : (isFr ? 'Contexte Système : Anomalie détectée dans le secteur de capteurs 4. Protocole de diagnostic initié.' : 'System Context: Anomaly detected in sensor sector 4. Diagnostic protocol initiated.')
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={labels.title} theme={theme}>
      <div className="space-y-4">
        {visibleAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center opacity-60">
            <CheckCircle2 size={64} className="text-[#FCA311] mb-4" />
            <h3 className="text-xl font-bold">{labels.noAlerts}</h3>
            <p className="text-sm mt-2">{labels.allSystems}</p>
          </div>
        ) : (
          <div className="space-y-3">
             {visibleAlerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-2xl transition-all ${
                    isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'
                }`}>
                    <div className="flex gap-4">
                        <div className={`p-3 rounded-xl h-fit ${
                            alert.severity === 'warning' ? 'bg-[#FCA311]/20 text-[#FCA311]' : 
                            alert.severity === 'critical' ? 'bg-red-500/20 text-red-500' :
                            'bg-blue-500/20 text-blue-500'
                        }`}>
                            {alert.severity === 'info' ? <Info size={20} /> : <AlertTriangle size={20} />}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                                    alert.severity === 'warning' ? 'text-[#FCA311]' : 
                                    alert.severity === 'critical' ? 'text-red-500' :
                                    'text-blue-500'
                                }`}>
                                    {alert.severity}
                                </span>
                                <span className="text-xs opacity-50 tabular-nums">
                                    {new Date(alert.timestamp).toLocaleTimeString()}
                                </span>
                            </div>
                            <p className="font-medium mt-1">{alert.message}</p>
                            
                            {/* Expanded Details */}
                            {expandedId === alert.id && (
                                <div className={`mt-3 p-3 rounded-xl text-xs leading-relaxed opacity-80 ${
                                    isDark ? 'bg-black/20' : 'bg-white/50'
                                }`}>
                                    <p>{labels.context}</p>
                                </div>
                            )}

                            <div className="flex gap-4 mt-3 pt-2 border-t border-current border-opacity-10">
                                <button 
                                    onClick={() => handleDismiss(alert.id)}
                                    className="text-xs font-bold uppercase opacity-60 hover:opacity-100 hover:text-red-500 transition-colors"
                                >
                                    {labels.dismiss}
                                </button>
                                <button 
                                    onClick={() => toggleDetails(alert.id)}
                                    className="text-xs font-bold uppercase opacity-60 hover:opacity-100 text-[#FCA311] transition-colors flex items-center gap-1"
                                >
                                    {labels.details}
                                    {expandedId === alert.id ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
             ))}
             <button 
                onClick={() => setVisibleAlerts([])}
                className="w-full py-4 mt-4 rounded-xl border border-current border-opacity-10 hover:bg-current hover:bg-opacity-5 font-bold uppercase text-xs tracking-widest transition-all"
             >
                {labels.clear}
             </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AlertsModal;
